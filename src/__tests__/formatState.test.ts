import vm from 'vm';
import {
  buildCommandScript,
  buildFormatStateScript,
} from '../TextEditor/formatState';

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

describe('buildCommandScript', () => {
  /** Runs a command against a stubbed document and returns the execCommand calls. */
  const run = (command: string, block = 'p') => {
    const calls: Array<[string, unknown, unknown]> = [];
    const context = vm.createContext({
      editor: { nodeName: 'DIV', parentNode: null, focus: () => {} },
      document: {
        execCommand: (name: string, ui: unknown, value: unknown) => {
          calls.push([name, ui, value]);
          return true;
        },
        queryCommandValue: () => block,
        queryCommandState: () => false,
      },
      window: { getSelection: () => null },
    });

    vm.runInContext(buildCommandScript(), context);
    vm.runInContext(`rnkitRunCommand(${JSON.stringify(command)})`, context);
    return calls;
  };

  it('runs an inline command as itself', () => {
    expect(run('bold')[0]?.[0]).toBe('bold');
  });

  it('routes a heading through formatBlock', () => {
    expect(run('h2')).toEqual([['formatBlock', false, '<h2>']]);
  });

  // removeFormat is defined to strip inline formatting only -- headings are
  // block level, so on its own it leaves an <h1> exactly as it found it.
  it('drops back to a paragraph when clearing a heading', () => {
    const calls = run('removeFormat', 'h1');

    expect(calls.map(([name]) => name)).toEqual([
      'removeFormat',
      'formatBlock',
    ]);
    expect(calls[1]?.[2]).toBe('<p>');
  });

  it('leaves the block alone when clearing plain text', () => {
    expect(run('removeFormat', 'p').map(([name]) => name)).toEqual([
      'removeFormat',
    ]);
  });

  it('clears a heading regardless of the case the browser reports', () => {
    expect(run('removeFormat', 'H3').map(([name]) => name)).toEqual([
      'removeFormat',
      'formatBlock',
    ]);
  });
});
