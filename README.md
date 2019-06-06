# Visual Investigative Scenarios 2

VIS2 is a corporate network visualisation editor for investigators. The goal is
to make it easy for reporters to sketch out a scene that involves companies,
people, land and similar entities as well as their relationships.

VIS2 is inspired by VIS1, but does not aim to offer a precise re-write.

VIS2 uses the `followthemoney` ontology, via the `followthemoney.js` library.
This means all the entity types known in VIS2 are compatible with those used in
the Aleph data search platform.

## Structure

This repository includes 2 packages, `vislib` and `app`.

Vislib is a set of utility functions and React components. For more details see
`vislib/README.MD`

App is standalone use case of vis2 implemented via vislib. 
For more details see `app/README.MD`

## Development

To start development for `app` you must create a `npm link` of `vislib`

`make install build`

or, to run a dev server:

`make dev`
