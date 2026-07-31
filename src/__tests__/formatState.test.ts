import vm from 'vm';
import { buildFormatStateScript } from '../TextEditor/formatState';

const TOGGLES = ['bold', 'italic', 'underline', 'strikeThrough'];
const BLOCKS = ['h1', 'h2', 'h3'];

type Node = { nodeName: string; parentNode: Node | null };

/**
 * Evaluate the snippet against a stubbed DOM. `ancestors` is the chain from the
 * caret upward, so ['U', 'A'] means the caret sits in an underline inside a
 * link.
 */
const activeFormats = ({
  states = {},
  block = '',
  ancestors = [],
}: {
  states?: Record<string, boolean>;
  block?: string;
  ancestors?: string[];
}) => {
  const editor: Node = { nodeName: 'DIV', parentNode: null };
  let caret: Node = editor;
  [...ancestors].reverse().forEach((nodeName) => {
    caret = { nodeName, parentNode: caret };
  });

  const context = vm.createContext({
    editor,
    document: {
      queryCommandState: (command: string) => states[command] ?? false,
      queryCommandValue: () => block,
    },
    window: {
      getSelection: () => ({
        rangeCount: 1,
        getRangeAt: () => ({ startContainer: caret }),
      }),
    },
  });

  vm.runInContext(buildFormatStateScript(TOGGLES, BLOCKS), context);
  return vm.runInContext('rnkitActiveFormats()', context) as string[];
};

describe('buildFormatStateScript toggles', () => {
  it('reports the commands the document says are on', () => {
    expect(activeFormats({ states: { bold: true, italic: true } })).toEqual([
      'bold',
      'italic',
    ]);
  });

  it('reports nothing when the document says nothing is on', () => {
    expect(activeFormats({})).toEqual([]);
  });

  it('survives a command the browser refuses to answer for', () => {
    const context = vm.createContext({
      editor: { nodeName: 'DIV', parentNode: null },
      document: {
        queryCommandState: () => {
          throw new Error('unsupported');
        },
        queryCommandValue: () => '',
      },
      window: { getSelection: () => null },
    });
    vm.runInContext(buildFormatStateScript(TOGGLES, BLOCKS), context);

    expect(vm.runInContext('rnkitActiveFormats()', context)).toEqual([]);
  });
});

describe('buildFormatStateScript underline inside a link', () => {
  // The editor stylesheet underlines every <a>, and queryCommandState cannot
  // tell that apart from a real <u> -- which is why the underline button used
  // to latch on after inserting a link and never let go.
  it('ignores the stylesheet underline a link carries', () => {
    expect(
      activeFormats({ states: { underline: true }, ancestors: ['A'] })
    ).toEqual([]);
  });

  it('still reports underline when a real <u> wraps the caret in a link', () => {
    expect(
      activeFormats({ states: { underline: true }, ancestors: ['U', 'A'] })
    ).toEqual(['underline']);
  });

  it('trusts the document when the caret is not in a link', () => {
    expect(activeFormats({ states: { underline: true } })).toEqual([
      'underline',
    ]);
  });

  it('leaves the other toggles alone inside a link', () => {
    expect(
      activeFormats({
        states: { bold: true, underline: true },
        ancestors: ['A'],
      })
    ).toEqual(['bold']);
  });
});

describe('buildFormatStateScript blocks', () => {
  it('reports the current heading', () => {
    expect(activeFormats({ block: 'h2' })).toEqual(['h2']);
  });

  it('matches the heading case-insensitively', () => {
    expect(activeFormats({ block: 'H1' })).toEqual(['h1']);
  });

  it('reports no heading for a plain paragraph', () => {
    expect(activeFormats({ block: 'p' })).toEqual([]);
  });
});
