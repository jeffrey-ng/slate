import type { VariableNode } from '@prezly/slate-types';
import { isVariableNode } from '@prezly/slate-types';
import { pick } from '@technically/lodash';
import type { SlateEditor } from '@udecode/plate-common';

export function updateVariable(
    editor: SlateEditor,
    attrs: Partial<Pick<VariableNode, 'fallback' | 'key'>>,
) {
    const changes = pick(attrs, ['fallback', 'key']);

    editor.setNodes<VariableNode>(changes, {
        match: isVariableNode,
    });
}
