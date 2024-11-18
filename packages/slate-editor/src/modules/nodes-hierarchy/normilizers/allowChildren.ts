import { Node } from 'slate';

import type { HierarchyFixer, HierarchyNormalizer, HierarchyNodeQuery } from '../types';

export function allowChildren(
    isAllowed: HierarchyNodeQuery,
    fix: HierarchyFixer,
): HierarchyNormalizer {
    return (editor, node, path) => {
        if ('children' in node) {
            // @ts-expect-error TODO: FIx this
            for (const [childNode, childPath] of Node.children(editor, path)) {
                if (!isAllowed(childNode, childPath, editor)) {
                    return fix(editor, [childNode, childPath]);
                }
            }
        }

        return false;
    };
}
