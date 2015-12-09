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

/** */
function flatten(schema) {
  return _flatten(cloneDeep(schema))
}

export default flatten
