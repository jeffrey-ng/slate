import type { SlateEditor } from '@udecode/plate-common';
// import { getPointBefore } from '@udecode/plate-core';
import type { Point /*, Range*/ } from 'slate';

import type { MatchRange } from '../types';

// import { isPreviousCharacterEmpty } from './isPreviousCharacterEmpty';

type MatchPoints = {
    beforeStartMatchPoint: Point | undefined;
    afterStartMatchPoint: Point | undefined;
    beforeEndMatchPoint: Point;
};

export function getMatchPoints(
    _: SlateEditor,
    // { start, end }: MatchRange,
    __: MatchRange,
): MatchPoints | undefined {
    // const selection = editor.selection as Range;

    // TODO: Fix this
    return undefined;
    // let beforeEndMatchPoint = selection.anchor;
    // if (end) {
    //     beforeEndMatchPoint = getPointBefore(editor, selection, {
    //         matchString: end,
    //     });

    //     if (!beforeEndMatchPoint) return;
    // }

    // let afterStartMatchPoint: Point | undefined;
    // let beforeStartMatchPoint: Point | undefined;

    // if (start) {
    //     afterStartMatchPoint = getPointBefore(editor, beforeEndMatchPoint, {
    //         matchString: start,
    //         skipInvalid: true,
    //         afterMatch: true,
    //     });

    //     if (!afterStartMatchPoint) return;

    //     beforeStartMatchPoint = getPointBefore(editor, beforeEndMatchPoint, {
    //         matchString: start,
    //         skipInvalid: true,
    //     });

    //     if (!isPreviousCharacterEmpty(editor, beforeStartMatchPoint as Point)) return;
    // }

    // return {
    //     afterStartMatchPoint,
    //     beforeStartMatchPoint,
    //     beforeEndMatchPoint,
    // };
}
