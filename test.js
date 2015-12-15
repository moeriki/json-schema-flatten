require('babel-polyfill')

// vendor modules

import { expect } from 'chai'
import deepFreeze from 'deep-freeze'

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
    const flatSchema = flatten(deepFreeze(schema))

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

  it('should use the id name if possible', () => {
    // setup
    const schema = {
      type: 'object',
      properties: {
        name: {
          id: 'http://localhost:8080/schema/person.json#',
          type: 'object',
          properties: {
            first: { type: 'string' },
            last: { type: 'string' },
          },
        },
      },
    }

    // test
    const flatSchema = flatten(deepFreeze(schema))

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
          id: 'http://localhost:8080/schema/person.json#',
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
    const flatSchema = flatten(deepFreeze(schema))

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
    const flatSchema = flatten(deepFreeze(testSchema))

    // verify
    expect(flatSchema).to.deep.equal(testSchemaFlat)
  })

  it('should do nothing on random objects', () => {
    // setup
    const obj = {
      one: 1,
      two: 0x2,
      three: Boolean,
      four: false,
      five: null,
      six: undefined,
    }

    // test
    const resultObj = flatten(deepFreeze(obj))

    // verify
    expect(resultObj).to.deep.equal(obj)
  })

  it('should flatten a nested object type in an existing definition', () => {
    // setup
    const schema = {
      type: 'object',
      properties: {
        person: { $ref: '#/definitions/person' },
      },
      definitions: {
        person: {
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
        },
      },
    }

    // test
    const flatSchema = flatten(deepFreeze(schema))

    // verify
    expect(flatSchema).to.deep.equal({
      type: 'object',
      properties: {
        person: { $ref: '#/definitions/person' },
      },
      definitions: {
        person: {
          type: 'object',
          properties: {
            name: { $ref: '#/definitions/personName' },
          },
        },
        personName: {
          type: 'object',
          properties: {
            first: { type: 'string' },
            last: { type: 'string' },
          },
        },
      },
    })
  })

  it('should take definitions from nested objects and put them prefixed on the root', () => {
    // setup
    const schema = {
      type: 'object',
      properties: {
        name: {
          type: 'object',
          properties: {
            first: { $ref: '#/definitions/str' },
            last: { $ref: '#/definitions/str' },
          },
          definitions: {
            str: { type: 'string' },
          },
        },
      },
    }

    // test
    const flatSchema = flatten(deepFreeze(schema))

    // verify
    expect(flatSchema).to.deep.equal({
      type: 'object',
      properties: {
        name: { $ref: '#/definitions/name' },
      },
      definitions: {
        name: {
          type: 'object',
          properties: {
            first: { $ref: '#/definitions/nameStr' },
            last: { $ref: '#/definitions/nameStr' },
          },
        },
        nameStr: {
          type: 'string',
        },
      },
    })
  })

  it('should flatten nested objects in definitions in nested objects', () => {
    // setup
    const schema = {
      type: 'object',
      properties: {
        family: {
          type: 'object',
          properties: {
            father: { $ref: '#/definitions/person' },
          },
          definitions: {
            person: {
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
            },
          },
        },
      },
    }

    // test
    const flatSchema = flatten(deepFreeze(schema))

    // verify
    expect(flatSchema).to.deep.equal({
      type: 'object',
      properties: {
        family: { $ref: '#/definitions/family' },
      },
      definitions: {
        family: {
          type: 'object',
          properties: {
            father: { $ref: '#/definitions/familyPerson' },
          },
        },
        familyPerson: {
          type: 'object',
          properties: {
            name: { $ref: '#/definitions/familyPersonName' },
          },
        },
        familyPersonName: {
          type: 'object',
          properties: {
            first: { type: 'string' },
            last: { type: 'string' },
          },
        },
      },
    })
  })

})
