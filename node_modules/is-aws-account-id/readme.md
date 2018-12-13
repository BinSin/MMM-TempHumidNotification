# is-aws-account-id [![Build Status](https://travis-ci.org/SamVerschueren/is-aws-account-id.svg?branch=master)](https://travis-ci.org/SamVerschueren/is-aws-account-id)

> Check if a string is an [AWS Account ID](http://docs.aws.amazon.com/general/latest/gr/acct-identifiers.html)


## Install

```
$ npm install --save is-aws-account-id
```


## Usage

```js
const isAwsAccountId = require('is-aws-account-id');

isAwsAccountId('123456789012');
//=> true

isAwsAccountId('abc123456789');
//=> false
```


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
