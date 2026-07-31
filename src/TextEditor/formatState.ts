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

/** Block names that `removeFormat` cannot touch, so clearing must undo them. */
const BLOCK_LEVEL_FORMATS = ['h1', 'h2', 'h3'];

/**
 * Builds the snippet that runs a toolbar command inside the webview.
 *
 * Defines `rnkitRunCommand(command)`. Both platforms go through it -- iOS by
 * injecting a call, Android by calling it from the message handler -- so the
 * two paths cannot drift apart the way they had before.
 */
export const buildCommandScript = () => `
  function rnkitCurrentBlock() {
    try {
      return String(document.queryCommandValue('formatBlock') || '')
        .toLowerCase();
    } catch (error) {
      return '';
    }
  }

  function rnkitRunCommand(command) {
    if (/^h[1-3]$/.test(command)) {
      document.execCommand('formatBlock', false, '<' + command + '>');
      return;
    }

    if (command === 'removeFormat') {
      document.execCommand('removeFormat', false, '');

      // removeFormat is defined to strip inline formatting only, so a heading
      // survives it untouched. Drop the block back to a paragraph as well,
      // which is what "clear formatting" means to anyone pressing it.
      if (${JSON.stringify(BLOCK_LEVEL_FORMATS)}.indexOf(rnkitCurrentBlock()) !== -1) {
        document.execCommand('formatBlock', false, '<p>');
      }
      return;
    }

    document.execCommand(command, false, '');
  }
`;

/**
 * Builds the snippet that inserts or edits a hyperlink inside the webview.
 *
 * Defines `rnkitInsertLink(linkData)`. Both platforms call it -- iOS by
 * injecting a call, Android from its message handler. It used to exist twice,
 * once per platform, which is exactly how the two drifted apart before.
 */
export const buildLinkScript = () => `
  function rnkitFindLinkInRange(range) {
    var node = range.startContainer;
    while (node && node !== editor) {
      if (node.nodeName === 'A') return node;
      node = node.parentNode;
    }

    if (range.commonAncestorContainer.nodeType === 1) {
      return range.commonAncestorContainer.querySelector('a');
    }
    return null;
  }

  function rnkitReportContent() {
    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: 'content',
      html: editor.innerHTML,
      characterCount: editor.textContent.trim().length
    }));
  }

  function rnkitInsertLink(linkData) {
    editor.focus();

    var selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      rnkitReportContent();
      return;
    }

    var range = selection.getRangeAt(0);

    if (linkData.isExisting) {
      var existing = rnkitFindLinkInRange(range);
      if (existing) {
        existing.href = linkData.url;
        existing.textContent = linkData.text;
        range.setStartAfter(existing);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        rnkitReportContent();
        return;
      }
    }

    var link = document.createElement('a');
    link.href = linkData.url;
    link.textContent = linkData.text;
    link.target = '_blank';
    range.deleteContents();
    range.insertNode(link);

    // A trailing space gives the caret somewhere outside the anchor to land,
    // so the next keystroke is not swallowed into the link.
    var space = document.createTextNode(' ');
    if (link.parentNode) {
      link.parentNode.insertBefore(space, link.nextSibling);
      range.setStartAfter(space);
    } else {
      range.setStartAfter(link);
    }
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);

    rnkitReportContent();
  }
`;
