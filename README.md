# Mashery Toolbelt
CLI tool for Mashery API Management provisioning.

## Functionality

```
    create-errorset    Create probem+json Mashery errorset for an API based on adidas API Guidelines.
    ls                 List existing API services and their ids.
    config             Prints config information.
```

## Installation
With Node.js v7.5.0 or higher installed, run

```bash
$ npm install -g mashery-toolbelt
```


# Use
To run the toolbelt simply execute:

```bash
$ mashery-toolbelt
```

or, if you don't have the `MASHERY_HOST` and `MASHERY_KEY` set (see the setup instructions):

```bash
$ MASHERY_HOST=https://api.mashery.com MASHERY_KEY=<API Key for Mashery V3 API> mashery-toolbelt
```

## Setup
Before you can start using the adidas Mashery toolbelt you need to generate your
Mashery token and set it as an environment variable. Refer to [Mashery Authentication Documentation](https://support.mashery.com/docs/read/mashery_api/30/Authentication) for 
details on how to obtain your token.


```bash
$ curl -k -v -i -u <API Key for Mashery V3>:<API Secret for Mashery V3> 'https://api.mashery.com/v3/token' -d 'grant_type=password&username=<Mashery User Id>&password=<Mashery Password>&scope=<Mashery Area UUID>'
```

```json
{
    "token_type": "bearer",
    "mapi": "<API Key for Mashery V3 API>",
    "access_token": "66mrpvtv4mvs6bz728nbaqmc",
    "expires_in": 3600,
    "refresh_token": "99cg9yrxqazk8nu58xsrqn2pm",
    "scope": "<Mashery Area UUID>"
}
```

```bash
export MASHERY_KEY=<API Key for Mashery V3 API>
```

# Development

```
$ git clone https://github.com/adidas-group/mashery-toolbelt.git
$ cd mashery-toolbelt
$ npm install
```

While developing `mashery-toolbelt` you can use `.env` file to store your 
environment variables.

## Debug 

### With Request Bin
Create a new bin at `https://requestb.in/` and set its URL as the `MASHERY_HOST`:

```bash
export MASHERY_HOST=https://requestb.in/1fym61s1
```

### With netcat
Run netcat `nc` locally and use it as `MASHERY_HOST`:

```bash
$ nc -l 8081
```

```bash
export MASHERY_HOST=http://localhost:8081/
```
