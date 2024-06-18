import { EditorCommands } from '@prezly/slate-commons';
import type { CalloutNode } from '@prezly/slate-types';
import { isQuoteNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

const shape: Record<keyof CalloutNode, true> = {
    type: true,
    align: true,
    icon: true,
    children: true,
};

const ALLOWED_ATTRIBUTES = Object.keys(shape);

export function normalizeRedundantAttributes(editor: Editor, [node, path]: NodeEntry): boolean {
    if (isQuoteNode(node)) {
        return EditorCommands.normalizeRedundantAttributes(
            editor,
            [node, path],
            ALLOWED_ATTRIBUTES,
        );
    }

    return false;
}
