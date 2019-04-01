import flatten from "../lib/flatten";
import testSchema from "./test-schema.json";
import testSchemaFlat from "./test-schema-flat.json";

describe("flatten", () => {
  it("should flatten a nested object type", () => {
    // setup
    const schema = {
      type: "object",
      properties: {
        name: {
          type: "object",
          properties: {
            first: { type: "string" },
            last: { type: "string" }
          }
        }
      }
    };

    // test
    const flatSchema = flatten(schema);

    // verify
    expect(flatSchema).toMatchInlineSnapshot(`
Object {
  "definitions": Object {
    "name": Object {
      "properties": Object {
        "first": Object {
          "type": "string",
        },
        "last": Object {
          "type": "string",
        },
      },
      "type": "object",
    },
  },
  "properties": Object {
    "name": Object {
      "$ref": "#/definitions/name",
    },
  },
  "type": "object",
}
`);
  });

  it("should flatten a nested array type", () => {
    // setup
    const schema = {
      type: "object",
      properties: {
        email: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { type: "string" },
              address: { type: "string" }
            }
          }
        }
      }
    };

    // test
    const flatSchema = flatten(schema);

    // verify
    expect(flatSchema).toMatchInlineSnapshot(`
Object {
  "definitions": Object {
    "email": Object {
      "properties": Object {
        "address": Object {
          "type": "string",
        },
        "type": Object {
          "type": "string",
        },
      },
      "type": "object",
    },
  },
  "properties": Object {
    "email": Object {
      "items": Object {
        "$ref": "#/definitions/email",
      },
      "type": "array",
    },
  },
  "type": "object",
}
`);
  });

  it("should do nothing on random objects", () => {
    // setup
    const obj = {
      one: 1,
      two: 0x2,
      three: Boolean,
      four: false,
      five: null,
      six: undefined
    };

    // test
    const resultObj = flatten(obj);

    // verify
    expect(resultObj).toMatchInlineSnapshot(`
Object {
  "five": null,
  "four": false,
  "one": 1,
  "six": undefined,
  "three": [Function],
  "two": 2,
}
`);
  });

  it("should flatten a nested object type in an existing definition", () => {
    // setup
    const schema = {
      type: "object",
      properties: {
        person: { $ref: "#/definitions/person" }
      },
      definitions: {
        person: {
          type: "object",
          properties: {
            name: {
              type: "object",
              properties: {
                first: { type: "string" },
                last: { type: "string" }
              }
            }
          }
        }
      }
    };

    // test
    const flatSchema = flatten(schema);

    // verify
    expect(flatSchema).toMatchInlineSnapshot(`
Object {
  "definitions": Object {
    "person": Object {
      "properties": Object {
        "name": Object {
          "$ref": "#/definitions/personName",
        },
      },
      "type": "object",
    },
    "personName": Object {
      "properties": Object {
        "first": Object {
          "type": "string",
        },
        "last": Object {
          "type": "string",
        },
      },
      "type": "object",
    },
  },
  "properties": Object {
    "person": Object {
      "$ref": "#/definitions/person",
    },
  },
  "type": "object",
}
`);
  });

  it("should take definitions from nested objects and put them prefixed on the root", () => {
    // setup
    const schema = {
      type: "object",
      properties: {
        name: {
          type: "object",
          properties: {
            first: { $ref: "#/definitions/str" },
            last: { $ref: "#/definitions/str" }
          },
          definitions: {
            str: { type: "string" }
          }
        }
      }
    };

    // test
    const flatSchema = flatten(schema);

    // verify
    expect(flatSchema).toMatchInlineSnapshot(`
Object {
  "definitions": Object {
    "name": Object {
      "properties": Object {
        "first": Object {
          "$ref": "#/definitions/nameDefinitionStr",
        },
        "last": Object {
          "$ref": "#/definitions/nameDefinitionStr",
        },
      },
      "type": "object",
    },
    "nameDefinitionStr": Object {
      "type": "string",
    },
  },
  "properties": Object {
    "name": Object {
      "$ref": "#/definitions/name",
    },
  },
  "type": "object",
}
`);
  });

  it("should flatten nested objects in definitions in nested objects", () => {
    // setup
    const schema = {
      type: "object",
      properties: {
        family: {
          type: "object",
          properties: {
            father: { $ref: "#/definitions/person" }
          },
          definitions: {
            person: {
              type: "object",
              properties: {
                name: {
                  type: "object",
                  properties: {
                    first: { type: "string" },
                    last: { type: "string" }
                  }
                }
              }
            }
          }
        }
      }
    };

    // test
    const flatSchema = flatten(schema);

    // verify
    expect(flatSchema).toMatchInlineSnapshot(`
Object {
  "definitions": Object {
    "family": Object {
      "properties": Object {
        "father": Object {
          "$ref": "#/definitions/familyDefinitionPerson",
        },
      },
      "type": "object",
    },
    "familyDefinitionPerson": Object {
      "properties": Object {
        "name": Object {
          "$ref": "#/definitions/familyDefinitionPersonName",
        },
      },
      "type": "object",
    },
    "familyDefinitionPersonName": Object {
      "properties": Object {
        "first": Object {
          "type": "string",
        },
        "last": Object {
          "type": "string",
        },
      },
      "type": "object",
    },
  },
  "properties": Object {
    "family": Object {
      "$ref": "#/definitions/family",
    },
  },
  "type": "object",
}
`);
  });

  it.skip("should flatten a complex schema", () => {
    // test
    const flatSchema = flatten(testSchema);
    const flatSchemaReference = JSON.stringify(testSchemaFlat, undefined, "  ");

    // verify
    expect(JSON.stringify(flatSchema, undefined, "  ")).toBe(
      flatSchemaReference
    );
  });
});
