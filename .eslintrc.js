module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],

        "no-console":[
            "off"
        ],

        "no-control-regex":[
            "off"
        ],

        "no-useless-escape":[
            "off"
        ],

        "no-unused-vars":[
            "off"
        ]

    }
};