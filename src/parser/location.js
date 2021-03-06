// @flow

import { getLineInfo } from "../util/location";
import CommentsParser from "./comments";

// This function is used to raise exceptions on parse errors. It
// takes an offset integer (into the current `input`) to indicate
// the location of the error, attaches the position to the end
// of the error message, and then raises a `SyntaxError` with that
// message.

export default class LocationParser extends CommentsParser {
  raise(pos: number, message: string): empty {
    const loc = getLineInfo(this.input, pos);
    message += ` (${loc.line}:${loc.column})`;
    // $FlowIgnore
    const err: SyntaxError & { pos: number, loc: Position } = new SyntaxError(message);
    err.pos = pos;
    err.loc = loc;
    throw err;
  }
}
