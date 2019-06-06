VIS2

we at least have something in common

This repository includes 2 packages, `vislib` and `app`.

Vislib is a set of utility functions and React components. 
For more details see `vislib/README.MD`

App is standalone use case of vis2 implemented via vislib. 
For more details see `app/README.MD`


### Development
To start development for `app` you must create a `npm link` of `vislib`
1. `src/$ npm link`
2. `app/$ npm install` # only if not installed yet
2. `app/$ npm link @alephdata/vislib`
