import type { Events } from '@prezly/events';
import type { Extension, OnKeyDown } from '@prezly/slate-commons';
import type { PlateEditor } from '@udecode/plate-common/react';
import { createPlateEditor } from '@udecode/plate-common/react';
import type { KeyboardEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Editor } from 'slate';

import { useLatest } from '#lib';

import type { EditorEventMap } from '../events';
import { withEvents } from '../events';

interface Parameters {
    events: Events<EditorEventMap>;
    extensions: Extension[];
    onKeyDown?: (event: KeyboardEvent) => void;
    plugins?: (<T extends Editor>(editor: T) => T)[] | undefined;
}

interface State {
    editor: PlateEditor;
    onKeyDownList: OnKeyDown[];
}

type NonUndefined<T> = T extends undefined ? never : T;

const DEFAULT_PLUGINS: NonUndefined<Parameters['plugins']> = [];

export function useCreateEditor({
    events,
    extensions,
    onKeyDown,
    plugins = DEFAULT_PLUGINS,
}: Parameters): State {
    const onKeyDownList: OnKeyDown[] = [];

    if (onKeyDown) {
        onKeyDownList.push(onKeyDown);
    }

    // We have to make sure that editor is created only once.
    // We do it by ensuring dependencies of `useMemo` returning the editor never change.
    const extensionsRef = useLatest<Extension[]>(extensions);
    const getExtensions = useCallback(() => extensionsRef.current, [extensionsRef]);
    const [userPlugins] = useState(plugins);
    const finalPlugins = useMemo(() => [withEvents(events), ...userPlugins], [userPlugins, events]);
    const editor = useMemo(() => {
        return createPlateEditor({
            plugins: [],
        });
    }, [getExtensions, finalPlugins]);

    useEffect(() => {
        if (plugins !== userPlugins) {
            console.warn(
                'EditorV4: "plugins" prop has changed. This will have no effect (plugins are initialized on mount only).',
            );
        }
    }, [plugins, userPlugins]);

    return {
        editor,
        onKeyDownList,
    };
}
