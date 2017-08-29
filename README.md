# Mashery Toolbelt
CLI tool for Mashery API Management provisioning

# Using
## Setup
Before you can start using the adidas Mashery toolbelt you need to generate your
Mashery token and set it as an environment variable. 

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

## Debug with netcat

```bash
$ nc -l 8081
```

```bash
export MASHERY_HOST=http://localhost:8081/
```
