---
title: Template
parent: Packages
---

# Template of a service in the modular monolith

This is a skeleton of a service in the modular monolith architecture as described [here](https://tractable.atlassian.net/wiki/spaces/UP/pages/4112809995/Unified+Stack+Architecture+Design+Review). It contains examples for the layers described (service layer, client layer, etc).

See also the [architecture docs](https://github.com/tractableai/typescript-boilerplate-service/tree/main/docs/architecture) in the TypeScript boilerplate repo which also define these layers.

To use this as a template for a new service:

1. Do `npm init -w ./packages/<new service name>` to create a new [NPM workspace](https://docs.npmjs.com/cli/v10/using-npm/workspaces). Give it the name `@repo/<new service name>` when prompted.
1. Copy over everything from this template directory to the newly created directory, remove what you don't need, and use that as a base to work on. Make sure to change back the `name` field in `package.json` if you overwrote it.

To have another service or app use functions exported from this service's service layer, first you need to add what you want to export to the `exports` field in `package.json`. See the included example for exporting `TemplateService`. Note that only code in the service layer should be exported, as this is the only code that should be used by other services. Next you need to make sure this service is a dependency of the service that uses it. To do this, go to the directory for the service that will use it and run

``` shell
npm i @repo/template
```

Then in the code of the service that uses it, you can do

``` typescript
import { TemplateService } from "@repo/template/templateService";
```

