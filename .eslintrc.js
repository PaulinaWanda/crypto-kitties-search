// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
    },
    env: {
        browser: true,
    },
    extends: [
        'plugin:vue/recommended',
        'standard',
    ],
    plugins: [
        'vue'
    ],
    rules: {
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'indent': [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-var': 'error',
        'prefer-const': "error",
        'vue/html-indent': ["error", 4],
    }
}
