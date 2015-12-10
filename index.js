// vendor modules

import capitalize from 'capitalize'
import cloneDeep from 'clone-deep'

// private functions

/** */
function isJSONSchema(obj) {
  return typeof obj === 'object' && (
    (obj.type === 'object' && typeof obj.properties === 'object') ||
    (obj.type === 'array' && typeof obj.items === 'object')
  )
}

// exports

/**
 * Flatten a JSON schema.
 * @param  {object} data a JSON schema
 * @return {object}      new JSON schema with flattened object structure
 */
function flatten(schema) {
  const newSchema = cloneDeep(schema)

  const definitions = schema.definitions || {}
  schema.definitions = null

  /** */
  function crawl(obj, basePath = '') {
    Object.keys(obj).forEach((key) => {
      const prop = obj[key]

      if (isJSONSchema(prop)) {
        let refName = key
        if (prop.$schema) {
          refName = prop.$schema.match(/([\w_]+)(\.\w+)?\W*$/, '$1')[1]
        }

        const refPath = basePath.length !== 0 ? basePath + capitalize(refName) : refName
        if (definitions[refPath]) {
          throw new Error(`definition path already taken: ${refPath}`)
        }

        if (prop.type === 'object') {
          definitions[refPath] = prop
          obj[key] = { $ref: `#/definitions/${refPath}` }
        } else if (prop.type === 'array') {
          definitions[refPath] = prop.items
          prop.items = { $ref: `#/definitions/${refPath}` }
        }

        crawl(definitions[refPath], refPath)
      } else if (typeof prop === 'object') {
        crawl(prop, basePath)
      }
    })
  }

  crawl(newSchema)

  newSchema.definitions = definitions

  return newSchema
}

module.exports = flatten

export default flatten
