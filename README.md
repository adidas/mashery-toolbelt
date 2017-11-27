# Mashery Toolbelt
CLI tool for Mashery API Management provisioning.


## Functionality

- Provide various commands to run complex scenarios in Mashery
- App data are stored in `HOMEDIR/.mashery-toolbelt/*`


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
