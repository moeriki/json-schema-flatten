/* eslint no-inline-comments:0, no-magic-numbers:0 */

module.exports = {

  'parser': 'babel-eslint',

  'env': {
    'browser': true,
    'es6': true,
    'node': true,
    'mocha': true,
  },

  'ecmaFeatures': {
    'arrowFunctions': true,
    'binaryLiterals': false,
    'blockBindings': true,
    'classes': true,
    'defaultParams': true,
    'destructuring': true,
    'forOf': true,
    'generators': true,
    'modules': true,
    'objectLiteralComputedProperties': true,
    'objectLiteralDuplicateProperties': false,
    'objectLiteralShorthandMethods': true,
    'objectLiteralShorthandProperties': true,
    'octalLiterals': true,
    'regexUFlag': true,
    'regexYFlag': true,
    'restParams': true,
    'spread': true,
    'superInFunctions': true,
    'unicodeCodePointEscapes': true,
    'globalReturn': false,
    'templateStrings': true,
    'jsx': true,
    'experimentalObjectRestSpread': false,
  },

  'rules': {

    /**
     * Possible errors
     */
    'comma-dangle': [1,                  // http://eslint.org/docs/rules/comma-dangle
      'always-multiline',
    ],
    'no-cond-assign': 1,                 // http://eslint.org/docs/rules/no-cond-assign
    'no-console': 1,                     // http://eslint.org/docs/rules/no-console
    'no-constant-condition': 1,          // http://eslint.org/docs/rules/no-constant-condition
    'no-control-regex': 2,               // http://eslint.org/docs/rules/no-control-regex
    'no-debugger': 1,                    // http://eslint.org/docs/rules/no-debugger
    'no-dupe-args': 2,                   // http://eslint.org/docs/rules/no-dupe-args
    'no-dupe-keys': 2,                   // http://eslint.org/docs/rules/no-dupe-keys
    'no-duplicate-case': 2,              // http://eslint.org/docs/rules/no-duplicate-case
    'no-empty-character-class': 2,       // http://eslint.org/docs/rules/no-empty-character-class
    'no-empty': 1,                       // http://eslint.org/docs/rules/no-empty
    'no-ex-assign': 2,                   // http://eslint.org/docs/rules/no-ex-assign
    'no-extra-boolean-cast': 1,          // http://eslint.org/docs/rules/no-extra-boolean-cast
    'no-extra-parens': [1, 'functions'], // http://eslint.org/docs/rules/no-extra-parens
    'no-extra-semi': 2,                  // http://eslint.org/docs/rules/no-extra-semi
    'no-func-assign': 2,                 // http://eslint.org/docs/rules/no-func-assign
    'no-inner-declarations': 2,          // http://eslint.org/docs/rules/no-inner-declarations
    'no-invalid-regexp': 2,              // http://eslint.org/docs/rules/no-invalid-regexp
    'no-irregular-whitespace': 1,        // http://eslint.org/docs/rules/no-irregular-whitespace
    'no-negated-in-lhs': 2,              // http://eslint.org/docs/rules/no-negated-in-lhs
    'no-obj-calls': 2,                   // http://eslint.org/docs/rules/no-obj-calls
    'no-regex-spaces': 1,                // http://eslint.org/docs/rules/no-regex-spaces
    'no-sparse-arrays': 2,               // http://eslint.org/docs/rules/no-sparse-arrays
    'no-unreachable': 2,                 // http://eslint.org/docs/rules/no-unreachable
    'use-isnan': 2,                      // http://eslint.org/docs/rules/use-isnan
    'valid-jsdoc': 0,                    // http://eslint.org/docs/rules/valid-jsdoc
    'valid-typeof': 2,                   // http://eslint.org/docs/rules/valid-typeof
    'no-unexpected-multiline': 1,        // http://eslint.org/docs/rules/no-unexpected-multiline

    /**
     * Best practices
     */
    'accessor-pairs': 1,                 // http://eslint.org/docs/rules/accessor-pairs
    'block-scoped-var': 0,               // http://eslint.org/docs/rules/block-scoped-var
    'complexity': [1, 9],                // http://eslint.org/docs/rules/complexity
    'consistent-return': 1,              // http://eslint.org/docs/rules/consistent-return
    'curly': [1, 'multi-line'],          // http://eslint.org/docs/rules/curly
    'default-case': 0,                   // http://eslint.org/docs/rules/default-case
    'dot-notation': [2, {                // http://eslint.org/docs/rules/dot-notation
      'allowKeywords': true,
    }],
    'dot-location': [1, 'property'],     // http://eslint.org/docs/rules/dot-location
    'eqeqeq': [1, 'smart'],              // http://eslint.org/docs/rules/eqeqeq
    'guard-for-in': 1,                   // http://eslint.org/docs/rules/guard-for-in
    'no-alert': 2,                       // http://eslint.org/docs/rules/no-alert
    'no-caller': 2,                      // http://eslint.org/docs/rules/no-caller
    'no-case-declarations': 0,           // http://eslint.org/docs/rules/no-case-declarations
    'no-div-regex': 1,                   // http://eslint.org/docs/rules/no-div-regex
    'no-empty-label': 0,                 // http://eslint.org/docs/rules/no-empty-label
    'no-empty-pattern': 1,               // http://eslint.org/docs/rules/no-empty-pattern
    'no-else-return': 1,                 // http://eslint.org/docs/rules/no-else-return
    'no-eq-null': 0,                     // http://eslint.org/docs/rules/no-eq-null
    'no-eval': 2,                        // http://eslint.org/docs/rules/no-eval
    'no-extend-native': 2,               // http://eslint.org/docs/rules/no-extend-native
    'no-extra-bind': 2,                  // http://eslint.org/docs/rules/no-extra-bind
    'no-fallthrough': 2,                 // http://eslint.org/docs/rules/no-fallthrough
    'no-floating-decimal': 1,            // http://eslint.org/docs/rules/no-floating-decimal
    'no-implicit-coercion': 2,           // http://eslint.org/docs/rules/no-implicit-coercion
    'no-implied-eval': 2,                // http://eslint.org/docs/rules/no-implied-eval
    'no-invalid-this': 1,                // http://eslint.org/docs/rules/no-invalid-this
    'no-iterator': 2,                    // http://eslint.org/docs/rules/no-iterator
    'no-labels': 2,                      // http://eslint.org/docs/rules/no-labels
    'no-lone-blocks': 2,                 // http://eslint.org/docs/rules/no-lone-blocks
    'no-loop-func': 2,                   // http://eslint.org/docs/rules/no-loop-func
    'no-magic-numbers': [1, {            // http://eslint.org/docs/rules/no-magic-numbers
      'enforceConst': true,
    }],
    'no-multi-spaces': 1,                // http://eslint.org/docs/rules/no-multi-spaces
    'no-multi-str': 2,                   // http://eslint.org/docs/rules/no-multi-str
    'no-native-reassign': 2,             // http://eslint.org/docs/rules/no-native-reassign
    'no-new-func': 2,                    // http://eslint.org/docs/rules/no-new-func
    'no-new-wrappers': 2,                // http://eslint.org/docs/rules/no-new-wrappers
    'no-new': 2,                         // http://eslint.org/docs/rules/no-new
    'no-octal-escape': 2,                // http://eslint.org/docs/rules/no-octal-escape
    'no-octal': 2,                       // http://eslint.org/docs/rules/no-octal
    'no-param-reassign': 0,              // http://eslint.org/docs/rules/no-param-reassign
    'no-process-env': 0,                 // http://eslint.org/docs/rules/no-process-env
    'no-proto': 2,                       // http://eslint.org/docs/rules/no-proto
    'no-redeclare': 2,                   // http://eslint.org/docs/rules/no-redeclare
    'no-return-assign': 1,               // http://eslint.org/docs/rules/no-return-assign
    'no-script-url': 2,                  // http://eslint.org/docs/rules/no-script-url
    'no-self-compare': 2,                // http://eslint.org/docs/rules/no-self-compare
    'no-sequences': 2,                   // http://eslint.org/docs/rules/no-sequences
    'no-throw-literal': 2,               // http://eslint.org/docs/rules/no-throw-literal
    'no-unused-expressions': 2,          // http://eslint.org/docs/rules/no-unused-expressions
    'no-useless-call': 2,                // http://eslint.org/docs/rules/no-useless-call
    'no-void': 2,                        // http://eslint.org/docs/rules/no-void
    'no-warning-comments': 1,            // http://eslint.org/docs/rules/no-warning-comments
    'no-with': 2,                        // http://eslint.org/docs/rules/no-with
    'radix': 2,                          // http://eslint.org/docs/rules/radix
    'vars-on-top': 0,                    // http://eslint.org/docs/rules/vars-on-top
    'wrap-iife': 1,                      // http://eslint.org/docs/rules/wrap-iife
    'yoda': 2,                           // http://eslint.org/docs/rules/yoda

    /**
     * Strict mode. Babel inserts 'use strict'; for us.
     */
    'strict': [2, 'never'],              // http://eslint.org/docs/rules/strict

    /**
     * Variables
     */
    'init-declarations': [1, 'always'],  // http://eslint.org/docs/rules/init-declarations
    'no-catch-shadow': 2,                // http://eslint.org/docs/rules/no-catch-shadow
    'no-delete-var': 2,                  // http://eslint.org/docs/rules/no-delete-var
    'no-label-var': 2,                   // http://eslint.org/docs/rules/no-label-var
    'no-shadow-restricted-names': 2,     // http://eslint.org/docs/rules/no-shadow-restricted-names
    'no-shadow': 2,                      // http://eslint.org/docs/rules/no-shadow
    'no-undef-init': 2,                  // http://eslint.org/docs/rules/no-undef-init
    'no-undef': 2,                       // http://eslint.org/docs/rules/no-undef
    'no-undefined': 0,                   // http://eslint.org/docs/rules/no-undefined
    'no-unused-vars': [1, {              // http://eslint.org/docs/rules/no-unused-vars
      'vars': 'local',
      'args': 'after-used',
    }],
    'no-use-before-define': [2,          // http://eslint.org/docs/rules/no-use-before-define
      'nofunc',
    ],

    /**
     * NodeJS
     */
    'callback-return': [2,               // http://eslint.org/docs/rules/callback-return
        ['callback', 'cb', 'next', 'done'],
    ],
    'global-require': 1,                 // http://eslint.org/docs/rules/global-require
    'handle-callback-err': 2,            // http://eslint.org/docs/rules/handle-callback-err
    'no-mixed-requires': 2,              // http://eslint.org/docs/rules/no-mixed-requires
    'no-new-require': 2,                 // http://eslint.org/docs/rules/no-new-require
    'no-path-concat': 2,                 // http://eslint.org/docs/rules/no-path-concat
    'no-process-exit': 2,                // http://eslint.org/docs/rules/no-process-exit
    'no-restricted-modules': 0,          // http://eslint.org/docs/rules/no-restricted-modules
    'no-sync': 2,                        // http://eslint.org/docs/rules/no-sync
    /**
     * Style
     */
    'array-bracket-spacing': [1,         // http://eslint.org/docs/rules/array-bracket-spacing
        'never',
    ],
    'block-spacing': [1, 'always'],      // http://eslint.org/docs/rules/block-spacing
    'brace-style': [1,                   // http://eslint.org/docs/rules/brace-style
      '1tbs', { 'allowSingleLine': true },
    ],
    'camelcase': [1, {                   // http://eslint.org/docs/rules/camelcase
      'properties': 'never',
    }],
    'comma-spacing': [1, {               // http://eslint.org/docs/rules/comma-spacing
      'before': false,
      'after': true,
    }],
    'comma-style': [1, 'last'],          // http://eslint.org/docs/rules/comma-style
    'computed-property-spacing': [1,     // http://eslint.org/docs/rules/computed-property-spacing
        'never',
    ],
    'consistent-this': [2,               // http://eslint.org/docs/rules/consistent-this
        'dont_do_this',
    ],
    'eol-last': 1,                       // http://eslint.org/docs/rules/eol-last
    'func-names': 1,                     // http://eslint.org/docs/rules/func-names
    'func-style': 0,                     // http://eslint.org/docs/rules/func-style
    'id-length': [1, {                   // http://eslint.org/docs/rules/id-length
      'min': 2,
      'max': 32,
      'exceptions': [
        'i', 'e', 'cb', '_', '$', 'q',
      ],
    }],
    'id-match': 0,                       // http://eslint.org/docs/rules/id-match
    'indent': [1, 2, {                   // http://eslint.org/docs/rules/indent
      'SwitchCase': 1,
    }],
    'jsx-quotes': 0,                     // http://eslint.org/docs/rules/jsx-quotes
    'key-spacing': [1, {                 // http://eslint.org/docs/rules/key-spacing
      'beforeColon': false,
      'afterColon': true,
    }],
    'lines-around-comment': [1, {        // http://eslint.org/docs/rules/lines-around-comment
      'beforeBlockComment': true,
      'afterBlockComment': false,
      'beforeLineComment': false,
      'afterLineComment': false,
      'allowBlockStart': true,
      'allowBlockEnd': true,
    }],
    'linebreak-style': [1, 'unix'],      // http://eslint.org/docs/rules/linebreak-style
    'max-nested-callbacks': [1, 3],      // http://eslint.org/docs/rules/max-nested-callbacks
    'new-cap': [1, {                     // http://eslint.org/docs/rules/new-cap
      'capIsNew': true,
      'newIsCap': true,
    }],
    'new-parens': 1,                     // http://eslint.org/docs/rules/new-parens
    'newline-after-var': 0,              // http://eslint.org/docs/rules/newline-after-var
    'no-array-constructor': 1,           // http://eslint.org/docs/rules/no-array-constructor
    'no-continue': 1,                    // http://eslint.org/docs/rules/no-continue
    'no-inline-comments': 1,             // http://eslint.org/docs/rules/no-inline-comments
    'no-lonely-if': 1,                   // http://eslint.org/docs/rules/no-lonely-if
    'no-mixed-spaces-and-tabs': 1,       // http://eslint.org/docs/rules/no-mixed-spaces-and-tabs
    'no-multiple-empty-lines': [1, {     // http://eslint.org/docs/rules/no-multiple-empty-lines
      'max': 1,
    }],
    'no-nested-ternary': 1,              // http://eslint.org/docs/rules/no-nested-ternary
    'no-new-object': 1,                  // http://eslint.org/docs/rules/no-new-object
    'no-restricted-syntax': 0,           // http://eslint.org/docs/rules/no-restricted-syntax
    'no-spaced-func': 1,                 // http://eslint.org/docs/rules/no-spaced-func
    'no-ternary': 0,                     // http://eslint.org/docs/rules/no-ternary
    'no-trailing-spaces': 1,             // http://eslint.org/docs/rules/no-trailing-spaces
    'no-underscore-dangle': 0,           // http://eslint.org/docs/rules/no-underscore-dangle
    'no-unneeded-ternary': 1,            // http://eslint.org/docs/rules/no-unneeded-ternary
    'object-curly-spacing': [1,          // http://eslint.org/docs/rules/object-curly-spacing
      'always', {
        'objectsInObjects': true,
        'arraysInObjects': true,
      },
    ],
    'one-var': [1, {                     // http://eslint.org/docs/rules/one-var
      'uninitialized': 'always',
      'initialized': 'never',
    }],
    'operator-assignment': [1,           // http://eslint.org/docs/rules/operator-assignment
        'always',
    ],
    'operator-linebreak': [1, 'after'],  // http://eslint.org/docs/rules/operator-linebreak
    'padded-blocks': 0,                  // http://eslint.org/docs/rules/padded-blocks
    'quote-props': [1, 'consistent'],    // http://eslint.org/docs/rules/quote-props
    'quotes': [1,                        // http://eslint.org/docs/rules/quotes
        'single',
        'avoid-escape',
    ],
    'require-jsdoc': 1,                  // http://eslint.org/docs/rules/require-jsdoc
    'semi-spacing': [1, {                // http://eslint.org/docs/rules/semi-spacing
      'before': false,
      'after': true,
    }],
    'semi': [1, 'never'],                // http://eslint.org/docs/rules/semi
    'sort-vars': 0,                      // http://eslint.org/docs/rules/sort-vars
    'space-after-keywords': 1,           // http://eslint.org/docs/rules/space-after-keywords
    'space-before-keywords': 1,          // http://eslint.org/docs/rules/space-before-keywords
    'space-before-blocks': 1,            // http://eslint.org/docs/rules/space-before-blocks
    'space-before-function-paren': [1, {
      'anonymous': 'always',             // http://eslint.org/docs/rules/space-before-function-paren
      'named': 'never',
    }],
    'space-in-parens': 1,                // http://eslint.org/docs/rules/space-in-parens
    'space-infix-ops': 1,                // http://eslint.org/docs/rules/space-infix-ops
    'space-return-throw-case': 1,        // http://eslint.org/docs/rules/space-return-throw-case
    'space-unary-ops': 1,                // http://eslint.org/docs/rules/space-unary-ops
    'spaced-comment': 1,                 // http://eslint.org/docs/rules/spaced-line-comment
    'wrap-regex': 1,                     // http://eslint.org/docs/rules/wrap-regex

    /**
     * ES6
     */
    'arrow-body-style': 1,               // http://eslint.org/docs/rules/arrow-body-style
    'arrow-parens': 1,                   // http://eslint.org/docs/rules/arrow-parens*/
    'arrow-spacing': 1,                  // http://eslint.org/docs/rules/arrow-spacing
    'constructor-super': 2,              // http://eslint.org/docs/rules/constructor-super
    'generator-star-spacing': 1,         // http://eslint.org/docs/rules/generator-star-spacing
    'no-arrow-condition': 2,             // http://eslint.org/docs/rules/no-arrow-condition
    'no-class-assign': 2,                // http://eslint.org/docs/rules/no-class-assign
    'no-const-assign': 2,                // http://eslint.org/docs/rules/no-const-assign
    'no-dupe-class-members': 2,          // http://eslint.org/docs/rules/no-dupe-class-members
    'no-this-before-super': 2,           // http://eslint.org/docs/rules/no-this-before-super
    'no-var': 2,                         // http://eslint.org/docs/rules/no-var
    'object-shorthand': [1, 'always'],   // http://eslint.org/docs/rules/object-shorthand
    'prefer-arrow-callback': 1,          // http://eslint.org/docs/rules/prefer-arrow-callback
    'prefer-const': 1,                   // http://eslint.org/docs/rules/prefer-const
    'prefer-spread': 1,                  // http://eslint.org/docs/rules/prefer-spread
    'prefer-reflect': 0,                 // http://eslint.org/docs/rules/prefer-reflect
    'prefer-template': 0,                // http://eslint.org/docs/rules/prefer-template
    'require-yield': 1,                  // http://eslint.org/docs/rules/require-yield

  },

}
