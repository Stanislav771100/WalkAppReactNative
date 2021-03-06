module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier',
    'prettier/react'
  ],
  env: {
    jest: true
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-param-reassign': ['error', { props: false }],
    'react/prop-types': 'off',
    'no-console': 'off',
    'no-prototype-builtins': 'off',
    "no-inline-comments": 'off',
  },
  parser: 'babel-eslint'
};