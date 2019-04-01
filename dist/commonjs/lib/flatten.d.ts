import { JSONSchema4, JSONSchema6, JSONSchema7 } from "json-schema";
interface JSONSchema4Object extends JSONSchema4 {
    [propName: string]: any;
}
interface JSONSchema6Object extends JSONSchema6 {
    [propName: string]: any;
}
interface JSONSchema7Object extends JSONSchema7 {
    [propName: string]: any;
}
declare type JSONSchema = JSONSchema4Object | JSONSchema6Object | JSONSchema7Object;
/**
 * Check if a given object does conform to minimum JSON Schema shape.
 * @param  {object} obj an input object to test
 * @return {boolean}
 */
export declare function isJSONSchema(obj: object): boolean;
/**
 * Flatten a JSON schema.
 * @param  {object} schema a JSON schema
 * @return {object} new JSON schema with flattened object structure
 */
export default function flatten(schema: object | JSONSchema): JSONSchema;
export {};
