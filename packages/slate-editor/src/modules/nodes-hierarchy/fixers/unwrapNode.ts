import { stubTrue } from '@technically/lodash';
import { Editor, Element, Transforms } from 'slate';
import type { NodeEntry, Ancestor } from 'slate';

export function unwrapNode(
    editor: Editor,
    [node, path]: NodeEntry,
    match: (entry: NodeEntry, ancestor: NodeEntry<Ancestor>) => boolean = stubTrue,
) {
    const ancestor = Editor.above(editor, { at: path });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode] = ancestor;

    if (!Element.isElement(ancestorNode)) {
        return false;
    }

    if (match([node, path], ancestor)) {
        Transforms.unwrapNodes(editor, { at: path });
        return true;
    }

    return false;
}
