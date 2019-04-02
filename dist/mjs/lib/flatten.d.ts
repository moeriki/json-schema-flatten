import { JSONSchema } from "./types";
/**
 * Check if a given object does conform to minimum JSON Schema shape.
 * @param  {object} obj an input object to test
 * @return {boolean}
 */
export declare function isJSONSchema(obj: object): boolean;
/**
 * Flatten a JSON schema.
 * @param  {object|JSONSchema} schema a JSON schema
 * @return {JSONSchema} new JSON schema with flattened object structure
 */
export declare function flatten(schema: object | JSONSchema): JSONSchema;
export default flatten;
