# JSON Schema Flatten

Flatten a JSON schema separating all nested objects into referenced definitions.

## Usage

```javascript
var flatten = require('json-schema-flatten/es5');

var schema = {
  type: 'object',
  properties: {
    name: {
      type: 'object', //= nested object
      properties: {
        first: { type: 'string' },
        last: { type: 'string' },
      }
    }
  }
};

console.log(flatten(schema));
```

Will output.

```JSON
{
  "type": "object",
  "properties": {
    "name": {
      "$ref": "#/definitions/name"
    }
  },
  "definitions": {
    "name": {
      "type": "object",
      "properties": {
        "first": { "type": "string" },
        "last": { "type": "string" }
      }
    }
  }
}
```

## Why

[Swagger UI](https://github.com/swagger-api/swagger-ui) doesn't generate documentation well when you have nested object structures. Running it through this fixes it for me.

## API

```javascript
var flatten = require('json-schema-flatten');
```

**flatten(** schema *:object* **)** *:object*

* schema — a JSON schema. Won't be modified.
