# Molecular Parser

Api available [here](https://w0jyxqe4x0.execute-api.us-east-2.amazonaws.com/Prod).

Example:
- [`H2O`](https://w0jyxqe4x0.execute-api.us-east-2.amazonaws.com/Prod?formula=H2O)
- [`K4[ON(SO3)2]2`](https://w0jyxqe4x0.execute-api.us-east-2.amazonaws.com/Prod?formula=K4%5BON(SO3)2%5D2)

## Local development

- installation: `npm run bootstrap` 
- tests: `npm test` 
- start api: `npm run start:api` 
- serve front: `npm run start:front` 

## Structure

This monorepo has 2 packages:
- `packages/api`: the api in NodeJS / Express in
- `packages/front`: the front end in React

## The original specification

### API

Create a simple API endpoint that takes a string representing a molecule as input,
counts the number of atoms of each element contained in the molecule,
and returns an object where keys correspond to atoms and values to the number of each atom in the molecule.

For example:

The input `'H2O'` must return `{'H': 2, 'O': 1}`

The input `'Mg(OH)2'` must return `{'Mg': 1, 'O': 2, 'H': 2}`

The input `'K4[ON(SO3)2]2'` must return `{'K': 4, 'O': 14, 'N': 2, 'S': 4}`

As you can see, some formulas have brackets in them. The index outside the brackets tells you that you have to multiply count of each atom inside the bracket on this index.
For example, in `Fe(NO3)2` you have one iron atom, two nitrogen atoms and six oxygen atoms.

Note that brackets may be round, square or curly and can also be nested. Index after the braces is optional.

Deploy this API on a platform like AWS, Google Cloud Platform, Heroku etc.

### Frontend

Create a mini app (web app or mobile app) with a simple search bar where users can enter a molecule.

When users validate their input, the app should call the API deployed above and display the number of atoms of each element contained in the molecule.

See examples [here](https://gist.githubusercontent.com/ahollocou/1d33116d172b9356aafb42847cc870ee/raw/afcc7060298db280ea2c6552b73f4568f417f115/app01.png)
and [here](https://gist.githubusercontent.com/ahollocou/1d33116d172b9356aafb42847cc870ee/raw/afcc7060298db280ea2c6552b73f4568f417f115/app02.png).
