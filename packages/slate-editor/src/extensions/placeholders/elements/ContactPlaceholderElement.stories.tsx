import { createPlateEditor } from '@udecode/plate-common/react';
import * as React from 'react';
import { type RenderElementProps, Slate } from 'slate-react';

import { PlaceholdersExtension } from '#extensions/placeholders';
import { createEditor } from '#modules/editor';

import { PlaceholderNode } from '../PlaceholderNode';

import { ContactPlaceholderElement } from './ContactPlaceholderElement';

const extensions = [PlaceholdersExtension()];
const editor = createEditor(createPlateEditor(), () => extensions);

const placeholder: PlaceholderNode<PlaceholderNode.Type.CONTACT> = {
    type: PlaceholderNode.Type.CONTACT,
    uuid: 'e57a4e5c-7769-4cbd-a159-a68be9373d26',
    children: [{ text: '' }],
};

const attributes: RenderElementProps['attributes'] = {
    'data-slate-node': 'element',
    'data-slate-void': true,
    ref: () => null,
};

export default {
    title: 'Extensions/Placeholders/elements',
    decorators: [
        (Story: React.ComponentType) => (
            <Slate editor={editor} initialValue={[placeholder]}>
                <div style={{ width: 680, height: 400 }}>
                    <Story />
                </div>
            </Slate>
        ),
    ],
};

export function ContactPlaceholder() {
    return (
        <ContactPlaceholderElement
            attributes={attributes}
            element={placeholder}
            removable
            renderPlaceholder={() => null}
        >
            {''}
        </ContactPlaceholderElement>
    );
}
