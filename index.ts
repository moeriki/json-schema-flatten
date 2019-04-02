export * from "./lib/types";
import * as libFlatten from "./lib/flatten";

export const flatten = libFlatten.flatten;
export const isJSONSchema = libFlatten.isJSONSchema;
export default flatten;
