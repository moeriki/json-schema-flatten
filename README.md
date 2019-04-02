# JSON Schema Flatten

Flatten a JSON schema separating all nested objects into referenced definitions.

## Usage

```typescript
import flatten, { JSONSchema } from "json-schema-flatten";

const schema: JSONSchema = {
  type: "object",
  properties: {
    name: {
      type: "object", //= nested object
      properties: {
        first: { type: "string" },
        last: { type: "string" }
      }
    }
  }
};

console.log(flatten(schema));
```

Will output:

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
// Common JS
const { flatten } = require("json-schema-flatten");

// ES6 Module
import flatten from "json-schema-flatten";
```

**flatten(** schema _:object | JSONSchema_ **)** _:JSONSchema_

- `schema` — a JSON schema. Won't be modified.
