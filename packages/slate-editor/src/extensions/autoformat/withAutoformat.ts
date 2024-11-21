import { EditorCommands } from '@prezly/slate-commons';
import { isParagraphNode } from '@prezly/slate-types';
import type { HistoryEditor, SlateEditor } from '@udecode/plate-common';

import { autoformatBlock, autoformatMark, autoformatText } from './transforms';
import type { AutoformatRule } from './types';

export function withAutoformat<T extends SlateEditor & HistoryEditor>(
    editor: T,
    rules: AutoformatRule[],
): T {
    const { insertText } = editor;

    const autoformatters = {
        block: autoformatBlock,
        mark: autoformatMark,
        text: autoformatText,
    };

    editor.insertText = (text) => {
        insertText(text);

        if (text !== ' ') {
            return;
        }

        const textBefore = EditorCommands.getPrevChars(editor, 2).slice(0, -1);

        for (const rule of rules) {
            const { mode = 'text', query } = rule;

            if (query && !query(editor, { ...rule, text })) continue;

            if (editor.selection) {
                const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) ?? [];

                if (mode === 'block' && !isParagraphNode(currentNode)) {
                    continue;
                }

                const formatter = autoformatters[mode];

                const formatResult = formatter?.(editor, {
                    ...(rule as any),
                    text: textBefore,
                });

                if (formatResult) {
                    return;
                }
            }
        }
    };

    return editor;
}
