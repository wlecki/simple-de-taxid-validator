# simple-de-taxid-validator

## Important

Code of this validator is taken (with small changes like optimization or removing not needed elements) from [THIS REPOSITORY](https://github.com/koblas/stdnum-js). Super thank you guys, you did a great job.

## About
This simple package helps you with validating Steuerliche Identifikationsnummer (German personal tax number) according to [THIS OFFICIAL DOCUMENT](https://ec.europa.eu/taxation_customs/tin/specs/FS-TIN%20Algorithms-Public.docx).  

### IdNr (Steuerliche Identifikationsnummer, German personal tax number).
The IdNr (or Steuer-IdNr) is a personal identification number that is assigned to individuals in Germany for tax purposes and is meant to replace the Steuernummer. The number consists of 11 digits and does not embed any personal information.  
Sources:
- https://de.wikipedia.org/wiki/Steuerliche_Identifikationsnummer
- http://www.identifikationsmerkmal.de/

## Installation
simple-de-taxid-validator is available as an [npm package](https://www.npmjs.com/package/simple-de-taxid-validator).

```sh
// with npm
npm i simple-de-taxid-validator
```

```sh
// with yarn
yarn add simple-de-taxid-validator
```
## Usage
```ts
import { deTaxIdValidator } from 'simple-de-taxid-validator';

const { isValid } = deTaxIdValidator.validate(value);
const formattedTaxIdNumber = deTaxIdValidator.format(value);
```

## License

This project is licensed under the terms of the
[MIT license](/LICENSE.md).