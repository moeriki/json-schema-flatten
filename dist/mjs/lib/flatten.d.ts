import { JSONSchema4, JSONSchema6, JSONSchema7 } from "json-schema";
export interface JSONSchema4Object extends JSONSchema4 {
    [propName: string]: any;
}
export interface JSONSchema6Object extends JSONSchema6 {
    [propName: string]: any;
}
export interface JSONSchema7Object extends JSONSchema7 {
    [propName: string]: any;
}
export declare type JSONSchema = JSONSchema4Object | JSONSchema6Object | JSONSchema7Object;
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
