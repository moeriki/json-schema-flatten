// vendor modules

import capitalize from 'capitalize'
import cloneDeep from 'clone-deep'

// private functions

/** */
function isObject(obj) {
  return obj === Object(obj)
}

/** */
function isJSONSchema(obj) {
  return isObject(obj) && (
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

  const definitions = newSchema.definitions || {}

  if (newSchema.definitions) {
    newSchema.definitions = null
  }

  /** */
  function crawl(obj, {
    basePath = '',
    refRedirects = {},
  } = {
    basePath: '',
    refRedirects: {},
  }) {
    if (obj.$ref) {
      Object.keys(refRedirects).forEach((refRedirectFrom) => {
        if (obj.$ref === `#/definitions/${refRedirectFrom}`) {
          const refRedirectTo = refRedirects[refRedirectFrom]
          obj.$ref = `#/definitions/${refRedirectTo}`
        }
      })
      return
    }

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

        if (prop.definitions) {
          refRedirects = Object.assign({}, refRedirects)

          Object.keys(prop.definitions).forEach((propDefinitionName) => {
            const propDefinition = prop.definitions[propDefinitionName]
            const prefixedPropDefinitionName = refPath + capitalize(propDefinitionName)

            definitions[prefixedPropDefinitionName] = propDefinition

            refRedirects[propDefinitionName] = prefixedPropDefinitionName

            crawl(definitions[prefixedPropDefinitionName], {
              basePath: prefixedPropDefinitionName,
              refRedirects,
            })
          })
          delete prop.definitions
        }

        crawl(definitions[refPath], { basePath: refPath, refRedirects })
      } else if (isObject(prop)) {
        crawl(prop, { basePath, refRedirects })
      }
    })
  }

  Object.keys(definitions).forEach((existingDefinitionName) => {
    const existingDefinition = definitions[existingDefinitionName]
    crawl(existingDefinition, { basePath: existingDefinitionName })
  })

  crawl(newSchema)

  if (Object.keys(definitions).length !== 0) {
    newSchema.definitions = definitions
  }

  return newSchema
}

module.exports = flatten

export default flatten
