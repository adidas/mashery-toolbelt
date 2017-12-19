# Mashery Toolbelt

CLI tool for Mashery API Management provisioning.


## Functionality

- Provide various commands to run complex scenarios in Mashery
- App data are stored in `HOMEDIR/.mashery-toolbelt/` directory
  - osx: `/Users/[HOME]/.mashery-toolbelt/`
  - linux: `/home/[HOME]/.mashery-toolbelt/`
  - windows: `C:\Users\[USERNAME]\.mashery-toolbelt\`


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
mashery-toolbelt promote <serviceId> <environment> --name='replaceValue' --trafficDomain='replaceValue' \
                                                   --publicDomain='replaceValue' [--publicPath='replaceValue'] \
                                                   --endpointDomain='replaceValue' [--endpointPath='replaceValue'] \
                                                   [--ignoreOtherEnv]
```

- Clone given service to new environment
- Available environments are DEV => QA, QA => PRD
- Option `--ignoreOtherEnv` will suppress error when current service contain endpoint from different environment than source one
- Changing values is via options `name`, `trafficDomain`, `publicDomain`, `publicPath`, `endpointDomain`, `endpointPath`
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
- Before creating new API, app will print changes in schema and you have to confirm it.


Example:

```
mashery-toolbelt promote h9tygfmjttuf9sb6ah8kjftd QA \
  --name='DEV*:QA*' --name='*:QA *' \
  --trafficDomain=qa.apiinternal.adidas.com \
  --publicDomain='qa.apiinternal.adidas.com' \
  --endpointDomain='staging.coredam-s3-facade-service.staging.he.k8s.emea.adsint.biz
```

- More examples in [file with tests](test/workflow/adidas/promoteApi.test.js)


### #errorset <subcommand>

### #add

```
mashery-toolbelt errorset add <serviceId> <errorSetPath>
```

- Add given errorSet to service


## Installation

With Node.js v7.5.0 or higher installed, run

```
$ npm install -g mashery-toolbelt
```


## Development

```
$ git clone https://github.com/adidas-group/mashery-toolbelt.git
$ cd mashery-toolbelt
$ npm install
```


## TODO

- [ ] Listing of backups
  - `mashery-toolbelt snapshots` to list all list all
  - When restoring by `serviceId` without `backupName`, then give user UI to choose one
- [ ] Add stats for restoring of service like: `endpoints(created:2, updated:1, deleted:3)`
