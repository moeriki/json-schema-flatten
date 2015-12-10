// vendor modules

import { expect } from 'chai'

// modules

import flatten from './index'

import testSchema from './test-schema.json'
import testSchemaFlat from './test-schema-flat.json'

// tests

describe('flatten', () => {

  it('should flatten a nested object type', () => {
    // setup
    const schema = {
      type: 'object',
      properties: {
        name: {
          type: 'object',
          properties: {
            first: { type: 'string' },
            last: { type: 'string' },
          },
        },
      },
    }

    // test
    const flatSchema = flatten(schema)
    // console.log(JSON.stringify(flatSchema, null, 4))

    // verify
    expect(flatSchema).to.deep.equal({
      type: 'object',
      properties: {
        name: {
          $ref: '#/definitions/name',
        },
      },
      definitions: {
        name: {
          type: 'object',
          properties: {
            first: { type: 'string' },
            last: { type: 'string' },
          },
        },
      },
    })
  })

  it('should use the $schema name if possible', () => {
    // setup
    const schema = {
      type: 'object',
      properties: {
        name: {
          $schema: 'http://localhost:8080/schema/person.json#',
          type: 'object',
          properties: {
            first: { type: 'string' },
            last: { type: 'string' },
          },
        },
      },
    }

    // test
    const flatSchema = flatten(schema)

    // verify
    expect(flatSchema).to.deep.equal({
      type: 'object',
      properties: {
        name: {
          $ref: '#/definitions/person',
        },
      },
      definitions: {
        person: {
          $schema: 'http://localhost:8080/schema/person.json#',
          type: 'object',
          properties: {
            first: { type: 'string' },
            last: { type: 'string' },
          },
        },
      },
    })
  })

  it('should flatten a nested array type', () => {
    // setup
    const schema = {
      type: 'object',
      properties: {
        email: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              address: { type: 'string' },
            },
          },
        },
      },
    }

    // test
    const flatSchema = flatten(schema)

    // verify
    expect(flatSchema).to.deep.equal({
      type: 'object',
      properties: {
        email: {
          type: 'array',
          items: {
            $ref: '#/definitions/email',
          },
        },
      },
      definitions: {
        email: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            address: { type: 'string' },
          },
        },
      },
    })
  })

  it('should flatten a complex schema', () => {
    // test
    const flatSchema = flatten(testSchema)

    // verify
    expect(flatSchema).to.deep.equal(testSchemaFlat)
  })

})
