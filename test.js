// vendor modules

import { expect } from 'chai'

// modules

import flatten from './index'

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
          }
        }
      }
    }

    // test
    const flatSchema = flatten(schema);

    // verify
    expect(flatSchema).to.deep.equal({
      type: 'object',
      properties: {
        name: {
          $ref: '#/definitions/name'
        }
      },
      definitions: {
        name: {
          type: 'object',
          properties: {
            first: { type: 'string' },
            last: { type: 'string' },
          }
        }
      }
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
          }
        }
      }
    }

    // test
    const flatSchema = flatten(schema);

    // verify
    expect(flatSchema).to.deep.equal({
      type: 'object',
      properties: {
        name: {
          $ref: '#/definitions/person'
        }
      },
      definitions: {
        person: {
          $schema: 'http://localhost:8080/schema/person.json#',
          type: 'object',
          properties: {
            first: { type: 'string' },
            last: { type: 'string' },
          }
        }
      }
    })
  })

  it('should use the array name if possible', () => {
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
            }
          }
        }
      }
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
            $ref: '#/definitions/emailItem'
          }
        }
      },
      definitions: {
        emailItem: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            address: { type: 'string' },
          }
        }
      }
    })
  })

  it('should use root if object is part of root array', () => {
    // setup
    const schema = {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          number: { type: 'number' }
        }
      }
    }

    // test
    const flatSchema = flatten(schema);

    // verify
    expect(flatSchema).to.deep.equal({
      type: 'array',
      items: { $ref: '#/definitions/rootItem' },
      definitions: {
        rootItem: {
          type: 'object',
          properties: {
            number: { type: 'number' }
          }
        }
      }
    })
  })

});
