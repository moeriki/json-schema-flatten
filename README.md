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

**flatten(** schema *:object*, [rootSchema=schema *:object*] **)** *:object*

* schema — a JSON schema. Won't be modified.
* rootSchema — optional — the root schema is optional and will default to your schema. The root schema will be used to extend `{ definitions: … }` on

*Note*: you don't have to pass a *strict* schema. We'll just iterate all properties and look for `{ type: 'object', properties: … }`. For example you can pass an array of definitions like this.

```javascript
var myDefinitionsList = [ … ];
var mySchema = loadMySchema();

var flatSchema = flatten(myDefinitionsList, mySchema);
```
