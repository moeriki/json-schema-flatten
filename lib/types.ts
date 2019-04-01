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

export type JSONSchema =
  | JSONSchema4Object
  | JSONSchema6Object
  | JSONSchema7Object;
