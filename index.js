// vendor modules

import cloneDeep from 'clone-deep'
import forEachDeep from 'for-each-deep/es5'

// private functions

/** */
function _flatten(schema, rootSchema = schema) {
  forEachDeep(schema, (value, key, obj, currentPath) => {
    if (value.type === 'object' && value.properties) {
      let objectRefName = null

      if (value.$schema) {
        objectRefName = value.$schema.match(/([\w_]+)(\.\w+)?\W*$/, '$1')[1]
      } else if (obj.type === 'array') {
        const pathParts = currentPath.split('.');
        objectRefName = (pathParts[pathParts.length - 2] || 'root') + 'Item'
      } else {
        objectRefName = key
      }

      rootSchema.definitions = rootSchema.definitions || {}
      if (rootSchema.definitions[objectRefName]) {
        let indexModifier = 1;
        while (schema.definitions[`${objectRefName}_${indexModifier}`] != null) {
          indexModifier++
        }
        objectRefName += `_${indexModifier}`
      }

      rootSchema.definitions[objectRefName] = obj[key]
      obj[key] = { $ref: `#/definitions/${objectRefName}` }

      _flatten(rootSchema.definitions[objectRefName], rootSchema)
    }
  });

  return schema;
}

// exports

/**
 * Flatten a JSON schema.
 * @param  {object} schema              JSON schema
 * @param  {object} [rootSchema=schema]
 * @return {object}                     new JSON schema with flattened object structure
 */
function flatten(schema, rootSchema) {
  return _flatten(cloneDeep(schema), rootSchema)
}

export default flatten
