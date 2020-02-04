# THIS PROJECT IS DEPRECATED AND NOT MAINTAINED ANYMORE

# Mashery Toolbelt

CLI tool for Mashery API Management provisioning.



## Functionality

- Provide various commands to run complex scenarios in Mashery
- App data are stored in `HOMEDIR/.mashery-toolbelt/` directory
  - osx: `/Users/[HOME]/.mashery-toolbelt/`
  - linux: `/home/[HOME]/.mashery-toolbelt/`
  - windows: `C:\Users\[USERNAME]\.mashery-toolbelt\`



## Installation

With Node.js v7.5.0 or higher installed, run

```
$ npm install -g mashery-toolbelt
```



## Commands

run `mashery-toolbelt` or `mashery-toolbelt -h` to get actual list of commands


### #auth

```
mashery-toolbelt auth
```

- runs interactive wizard to enter credentials
- credentials except password are stored in `credentials.json`
- Need to run just for first time. Then it can handle refresh tokens itself
  - Rerun only on serious issues
- optionally can receive the credentials from environment variables instead of the wizard way:

  export MASHERY_USERNAME=<username>
  
  export MASHERY_PASSWORD=<password>
  
  export MASHERY_KEY=<key>
  
  export MASHERY_SECRET=<secret>
  
  export MASHERY_SCOPE=<scope>


### #dir

```
mashery-toolbelt dir
```

- print path to mashery-toolbelt directory


### #ls

```
mashery-toolbelt ls [name]
```

- list all services
- optional argument `name` to filter services by name


### #backup

```
mashery-toolbelt backup <serviceId> [backupName]
```

- download snapshot of service current state into `[MASHERY_DIR]/backup/[serviceId]/[backupName].json`
- when no `backupName` is given, then current timestamp is used


### #restore

```
mashery-toolbelt restore <serviceId> <backupName>
```

- Restore service to state from given snapshot in `[MASHERY_DIR]/backup/[serviceId]/[backupName].json`


### #promote

**Adidas specific feature**


```
mashery-toolbelt promote <serviceId> --name='replaceValue' [--serviceName='replaceValue'] \
                                     --trafficDomain='replaceValue' \
                                     --publicDomain='replaceValue' [--publicPath='replaceValue'] \
                                     --endpointDomain='replaceValue' [--endpointPath='replaceValue'] \
                                     [--update='updateServiceId']
```

- Clone given service with changes defined by other arguments
- Changing values is via options `name`, `serviceName`, `trafficDomain`, `publicDomain`, `publicPath`, `endpointDomain`, `endpointPath`
  - when `serviceName` is not provided then `name` is used to replace service name
  - `publicPath` and `endpointPath` are optional
  - each options accept `replaceValue` which can be one of following types
  - **simple** - `--publicDomain='new.domain.com'`
    - Replace all public domains with new one
  - **multi** - `--endpointDomain='old.domain.com:new.domain.com'` (colon pattern)
    - Get value on left side of colon and replace all matching endpoint domains with new one
    - Allow multiple patterns `--endpointDomain='old.com:new.com' --endpointDomain='older.com:newer.com'`
  - **pattern** - `--endpointPath='wip/*/dev/*:*/qa/*'`
    - Expand `*` into simple matcher.
    - `wip/*/dev/*` will match `/wip/root/users/dev/id/{id}` and change it to `root/users/qa/id/{id}`
  - if you want to match colon (`:`) just escape it `--publicDomain='my.domain.com\:3000`
- `--update=updateServiceId` - id of service you want to update with promot (use with same arguments as before)
- Before creating new API, app will print changes in schema and you have to confirm it.


Example:

```
mashery-toolbelt promote h9tygfmjttuf9sb6ah8kjftd \
  --name='DEV*:QA*' --name='*:QA *' \
  --trafficDomain=qa.apiinternal.adidas.com \
  --publicDomain='qa.apiinternal.adidas.com' \
  --endpointDomain='staging.coredam-s3-facade-service.staging.he.k8s.emea.adsint.biz
```

- More examples in [file with tests](test/workflow/adidas/promoteApi.test.js)

### #swagger-import

```
mashery-toolbelt swagger-import <fileOrUrl> \
                                [--blueprint='blueprintFile'] \
                                [--organisation='organisationId'] [--multiMethodEndpoint] [--https] \
                                --name='replaceValue' [--serviceName='replaceValue'] \
                                --trafficDomain='replaceValue' \
                                --publicDomain='replaceValue' [--publicPath='replaceValue'] \
                                --endpointDomain='replaceValue' [--endpointPath='replaceValue'] \
                                [--update='updateServiceId']
```

- Creates service and endpoints from swagger file (local file or url)
- `--organisation=organisationId` (`-o organisationId`) id of existing organisation under mashery scope (area)
- `--multiMethodEndpoint` generates just one endpoint for resource and its multiple HTTP methods.
  - Default is one endpoint per resource and HTTP method.
- `--https` protocol of endpoints. Default **http**
- `--update=updateServiceId` - id of service you want to update from swagger (use with same arguments as before)
- Modifier attributes same as **promote** command
- `--blueprint=bluePrintFile`
  - File with default values for endpoint and endpoint methods.
  - Supported format **yaml** or **json**
  - When user input is required (like for credentials). set value to "INPUT!"
  - Definition of valid props and values is in [this source file](https://github.com/adidas-group/mashery-toolbelt/blob/master/src/workflow/adidas/utils/blueprintPropTypes.js#L13)
  - **example of blueprint.yaml**:

```yaml
endpoint:
  publicDomains:
    -
      address: "adidas.api.mashery.com"
  systemDomains:
    -
      address: "adidas.api.mashery.com"
  trafficDomain: "adidas.api.mashery.com"
  systemDomainAuthentication:
    type: httpBasic
    username: INPUT!
    password: INPUT!
  methods:
    - name: "My first method"
      sampleJsonResponse: "{...}"
    - name: "My second method"
```



### #errorset-add

```
mashery-toolbelt errorset-add <serviceId> <errorSetPath>
```

- Create given errorSet within service and assign it to each endpoint


## Notes

Internaly we represent mashery data in structure called "API" which looks like:

```js
const api = {
  service: {
    id: "service uuid",
    ...restOfServiceProps,
    organisation: {
      id: "organisation uuid",
      ...restOfOrganisationProps
    },
    endpoints: [
      {
        id: "endpoint uuid",
        ...restOfEndpointProps,
        methods: [
          {
            id: "endpoint method uuid",
            ...restOfMethodProps
          }
        ]
      }
    ],
    errorSets: [
      {
        id: "error set uuid",
        ...restOfErrorSetProps
      }
    ]
  }
}
```


## Development

```
$ git clone https://github.com/adidas-group/mashery-toolbelt.git
$ cd mashery-toolbelt
$ npm install
```

### NPM commands

- `npm run test` - runs linter (standard) and jest tests. For CI or generally validate quality and Functionality
- `npm run tdd` - runs tests with watching. Must have during development for quick check if something is broken
- `npm run lint` - runs linter
- `npm run lint:fix` - runs linter and fix what can be fixed
- Before each commit code is automatically fixed with linter and formatted with prettier.


## Intended Use Cases

This project is intended for configuration of the Mashery API management accordingly to the adidas guidelines.

adidas is not responsible for the usage of this software for different purposes that the ones described in the use cases.

## License and Software Information
 
© adidas AG

adidas AG publishes this software and accompanied documentation (if any) subject to the terms of the MIT license with the aim of helping the community with our tools and libraries which we think can be also useful for other people. You will find a copy of the MIT license in the root folder of this package. All rights not explicitly granted to you under the MIT license remain the sole and exclusive property of adidas AG.
 
NOTICE: The software has been designed solely for the purpose of configuration of the Mashery API management accordingly to the adidas guidelines. The software is NOT designed, tested or verified for productive use whatsoever, nor or for any use related to high risk environments, such as health care, highly or fully autonomous driving, power plants, or other critical infrastructures or services.
 
If you want to contact adidas regarding the software, you can mail us at _software.engineering@adidas.com_.
 
For further information open the [adidas terms and conditions](https://github.com/adidas/adidas-contribution-guidelines/wiki/Terms-and-conditions) page.

### License

[MIT](/LICENSE)
