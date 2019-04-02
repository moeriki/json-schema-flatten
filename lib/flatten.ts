import capitalize from "capitalize";
import get from "lodash/get";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";
import isObject from "lodash/isObject";
import { JSONSchema } from "./types";

interface CrawlOptions {
  basePath?: string;
  refRedirects?: {
    [propName: string]: any;
  };
}

/**
 * Check if a given object does conform to minimum JSON Schema shape.
 * @param  {object} obj an input object to test
 * @return {boolean}
 */
export function isJSONSchema(obj: object) {
  return (
    (get(obj, "type") === "object" &&
      typeof get(obj, "properties") === "object") ||
    (get(obj, "type") === "array" && typeof get(obj, "items") === "object")
  );
}

/**
 * Flatten a JSON schema.
 * @param  {object|JSONSchema} schema a JSON schema
 * @return {JSONSchema} new JSON schema with flattened object structure
 */
export function flatten(schema: object | JSONSchema): JSONSchema {
  const newSchema: JSONSchema = {
    definitions: undefined,
    ...cloneDeep(schema)
  };

  const definitions: JSONSchema = { ...get(newSchema, "definitions") };

  if (get(newSchema, "definitions")) {
    set(newSchema, "definitions", undefined);
  }

  /**
   * Generate a unique definition name.
   * @param {string} name
   * @return {string}
   */
  function findFreeDefinitionName(name: string): string {
    // Name doesn't exist in definitions, so add as is
    if (!definitions[name]) {
      return name;
    }

    // Add numbered suffix to name
    let index = 1;
    while (definitions[`${name}_${index}`]) {
      index++;
    }
    return `${name}_${index}`;
  }

  /**
   * Crawl the schema to locate all the ref definitions to then flatten.
   * @param {JSONSchema} obj
   * @param {CrawlOptions} options
   */
  function crawl(obj: JSONSchema, options?: CrawlOptions) {
    let { basePath = "", refRedirects = {} } = options || {
      basePath: "",
      refRedirects: {}
    };

    if (obj.$ref) {
      Object.keys(refRedirects).forEach(refRedirectFrom => {
        if (obj.$ref === `#/definitions/${refRedirectFrom}`) {
          const refRedirectTo = refRedirects[refRedirectFrom];
          obj.$ref = `#/definitions/${refRedirectTo}`;
        }
      });
      return;
    }

    Object.keys(obj).forEach(key => {
      const prop = obj[key];

      if (isJSONSchema(prop)) {
        const refName = key;

        const refPath = findFreeDefinitionName(
          basePath.length ? basePath + capitalize(refName) : refName
        );

        if (prop.type === "object") {
          definitions[refPath] = prop;
          obj[key] = { $ref: `#/definitions/${refPath}` };
        } else if (prop.type === "array") {
          definitions[refPath] = prop.items;
          prop.items = { $ref: `#/definitions/${refPath}` };
        }

        if (prop.definitions) {
          refRedirects = { ...refRedirects };

          Object.keys(prop.definitions).forEach(propDefinitionName => {
            const propDefinition = prop.definitions[propDefinitionName];
            const prefixedPropDefinitionName = findFreeDefinitionName(
              `${refPath}Definition` + capitalize(propDefinitionName)
            );

            definitions[prefixedPropDefinitionName] = propDefinition;

            refRedirects[propDefinitionName] = prefixedPropDefinitionName;

            crawl(definitions[prefixedPropDefinitionName], {
              basePath: prefixedPropDefinitionName,
              refRedirects
            });
          });
          delete prop.definitions;
        }

        crawl(definitions[refPath], { basePath: refPath, refRedirects });
      } else if (isObject(prop)) {
        crawl(prop, { basePath, refRedirects });
      }
    });
  }

  Object.keys(definitions).forEach(existingDefinitionName => {
    const existingDefinition = definitions[existingDefinitionName];
    crawl(existingDefinition, { basePath: existingDefinitionName });
  });

  crawl(newSchema);

  if (Object.keys(definitions).length) {
    newSchema.definitions = definitions;
  }

  if (!newSchema.definitions || !Object.keys(newSchema.definitions).length) {
    delete newSchema.definitions;
  }

  return newSchema;
}

export default flatten;
