var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import capitalize from "capitalize";
import get from "lodash/get";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";
import isObject from "lodash/isObject";
/**
 * Check if a given object does conform to minimum JSON Schema shape.
 * @param  {object} obj an input object to test
 * @return {boolean}
 */
export function isJSONSchema(obj) {
    return ((get(obj, "type") === "object" &&
        typeof get(obj, "properties") === "object") ||
        (get(obj, "type") === "array" && typeof get(obj, "items") === "object"));
}
/**
 * Flatten a JSON schema.
 * @param  {object|JSONSchema} schema a JSON schema
 * @return {JSONSchema} new JSON schema with flattened object structure
 */
export function flatten(schema) {
    var newSchema = __assign({ definitions: undefined }, cloneDeep(schema));
    var definitions = __assign({}, get(newSchema, "definitions"));
    if (get(newSchema, "definitions")) {
        set(newSchema, "definitions", undefined);
    }
    /**
     * Generate a unique definition name.
     * @param {string} name
     * @return {string}
     */
    function findFreeDefinitionName(name) {
        // Name doesn't exist in definitions, so add as is
        if (!definitions[name]) {
            return name;
        }
        // Add numbered suffix to name
        var index = 1;
        while (definitions[name + "_" + index]) {
            index++;
        }
        return name + "_" + index;
    }
    /**
     * Crawl the schema to locate all the ref definitions to then flatten.
     * @param {JSONSchema} obj
     * @param {CrawlOptions} options
     */
    function crawl(obj, options) {
        var _a = options || {
            basePath: "",
            refRedirects: {}
        }, _b = _a.basePath, basePath = _b === void 0 ? "" : _b, _c = _a.refRedirects, refRedirects = _c === void 0 ? {} : _c;
        if (obj.$ref) {
            Object.keys(refRedirects).forEach(function (refRedirectFrom) {
                if (obj.$ref === "#/definitions/" + refRedirectFrom) {
                    var refRedirectTo = refRedirects[refRedirectFrom];
                    obj.$ref = "#/definitions/" + refRedirectTo;
                }
            });
            return;
        }
        Object.keys(obj).forEach(function (key) {
            var prop = obj[key];
            if (isJSONSchema(prop)) {
                var refName = key;
                var refPath_1 = findFreeDefinitionName(basePath.length ? basePath + capitalize(refName) : refName);
                if (prop.type === "object") {
                    definitions[refPath_1] = prop;
                    obj[key] = { $ref: "#/definitions/" + refPath_1 };
                }
                else if (prop.type === "array") {
                    definitions[refPath_1] = prop.items;
                    prop.items = { $ref: "#/definitions/" + refPath_1 };
                }
                if (prop.definitions) {
                    refRedirects = __assign({}, refRedirects);
                    Object.keys(prop.definitions).forEach(function (propDefinitionName) {
                        var propDefinition = prop.definitions[propDefinitionName];
                        var prefixedPropDefinitionName = findFreeDefinitionName(refPath_1 + "Definition" + capitalize(propDefinitionName));
                        definitions[prefixedPropDefinitionName] = propDefinition;
                        refRedirects[propDefinitionName] = prefixedPropDefinitionName;
                        crawl(definitions[prefixedPropDefinitionName], {
                            basePath: prefixedPropDefinitionName,
                            refRedirects: refRedirects
                        });
                    });
                    delete prop.definitions;
                }
                crawl(definitions[refPath_1], { basePath: refPath_1, refRedirects: refRedirects });
            }
            else if (isObject(prop)) {
                crawl(prop, { basePath: basePath, refRedirects: refRedirects });
            }
        });
    }
    Object.keys(definitions).forEach(function (existingDefinitionName) {
        var existingDefinition = definitions[existingDefinitionName];
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
//# sourceMappingURL=flatten.js.map