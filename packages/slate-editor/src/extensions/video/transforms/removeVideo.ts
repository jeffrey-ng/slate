import { EditorCommands } from '@prezly/slate-commons';
import { VideoNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

export function removeVideo(editor: Editor): VideoNode | null {
    return EditorCommands.removeNode<VideoNode>(editor, {
        match: VideoNode.isVideoNode,
    });
}
