/**
 * Builds the snippet the editor webview uses to decide which toolbar buttons
 * light up.
 *
 * It lives here rather than inline in the page HTML so it can be executed and
 * asserted on directly -- the link/underline clash it handles is subtle, and
 * buried inside a template literal it was neither visible nor testable.
 *
 * Defines `rnkitActiveFormats()` in the webview scope, returning the list of
 * active commands.
 *
 * @param toggleCommands commands answered by `queryCommandState` (bold, lists,
 *   alignment, …)
 * @param blockCommands block names compared against `queryCommandValue`
 *   ('formatBlock'), i.e. the headings
 */
export const buildFormatStateScript = (
  toggleCommands: readonly string[],
  blockCommands: readonly string[]
) => `
  function rnkitSelectionAncestor(tagName) {
    var selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return null;

    var node = selection.getRangeAt(0).startContainer;
    while (node && node !== editor) {
      if (node.nodeName === tagName) return node;
      node = node.parentNode;
    }
    return null;
  }

  function rnkitActiveFormats() {
    var formats = ${JSON.stringify(toggleCommands)}.filter(function (command) {
      // The stylesheet underlines every <a>, and queryCommandState reports
      // that as an active underline -- indistinguishable from a real <u>. So
      // inside a link, ask the DOM instead; otherwise the button latches on
      // the moment a link is inserted and can never be switched off.
      if (command === 'underline' && rnkitSelectionAncestor('A')) {
        return !!rnkitSelectionAncestor('U');
      }

      try {
        return document.queryCommandState(command);
      } catch (error) {
        // Browsers throw for commands they do not implement; treat those as
        // simply not active.
        return false;
      }
    });

    var block = '';
    try {
      block = String(document.queryCommandValue('formatBlock') || '')
        .toLowerCase();
    } catch (error) {
      block = '';
    }

    ${JSON.stringify(blockCommands)}.forEach(function (command) {
      if (block === command) formats.push(command);
    });

    return formats;
  }
`;
