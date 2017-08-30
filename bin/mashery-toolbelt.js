#!/usr/bin/env node
'use strict';

require('dotenv').config();

const vorpal = require('vorpal')();
const { URL } = require('url');
const fetch = require('node-fetch');
const spinner = require('../src/spinner');

const ProblemDetailErrorSet = require('../fixtures/problemDetailErrorSet.json');

const chalk = vorpal.chalk;

// Verify that required config variables are set up
function verifyConfig() {
  if (!process.env.MASHERY_HOST) {
    throw Error('No Mashery host (MASHERY_HOST)');
  }

  if (!process.env.MASHERY_KEY) {
    throw Error('No Mashery key (MASHERY_KEY)');
  }
}

// Fetch Error Handler
function handleHTTPError(response) {
  if (!response.ok) {
    var message = `(${response.status}) ${response.statusText}\n\n`;
    const headers = response.headers['_headers'];

    for (var key in headers) {
      message += `${key}: ${headers[key]}\n`;
    }

    // response.text().then(data => console.log(data));

    throw Error(message);
  }
  return response;
}

// Retrieve JSON body
function retrieveJSONResponse(response) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  throw new TypeError("Oops, we haven't got JSON!");
}

// Vorpal Error Handler
function handleError(ctx, s, cb) {
  return (e) => {
    if (s) {
      s.stop(true);
    }

    ctx.log(chalk.red(`\nError: ${e.message}`));
    if (Array.isArray(e.errors)) {
      e.errors.forEach(err => ctx.log(chalk.yellow(` ${err.dataPath}: ${err.message}`)));
    }
    cb();
  };
}

vorpal
  .command('create-errorset', 'Create probem+json Mashery errorset for an API based on adidas API Guidelines.')
  .action(function (args, callback) {
    try {
      verifyConfig();

      return this.prompt([{
        type: 'input',
        message: chalk.cyan('Enter API service id to set error set for: '),
        name: 'serviceId'
      }])
        .then(input => {
          const s = spinner();
          s.start();

          const url = new URL(`/v3/rest/services/${input.serviceId}`, process.env.MASHERY_HOST);
          const requestHeaders = new fetch.Headers({
            "Accept": "application/json",
            "Authorization": `Bearer ${process.env.MASHERY_KEY}`,
          });

          fetch(url.toString(), { headers: requestHeaders })
            .then(handleHTTPError)
            .then(retrieveJSONResponse)
            .then(json => {
              this.log(`Creating problem+json error set for '${json.name}'...`);

              // Create the error set
              const errorsetURL = new URL(`/v3/rest/services/${input.serviceId}/errorSets`, process.env.MASHERY_HOST);
              const errorsetRequestHeaders = new fetch.Headers({
                "Accept": "application/json",
                "Authorization": `Bearer ${process.env.MASHERY_KEY}`,
                "Content-Type": "application/json",                
              });

              fetch(errorsetURL.toString(), {
                method: "POST",
                headers: errorsetRequestHeaders,
                body: JSON.stringify(ProblemDetailErrorSet)
              })
              .then(handleHTTPError)
              .then(retrieveJSONResponse)
              .then(json => {
                s.stop();
                this.log(chalk.green(`Error set 'Problem Detail' created successfully!`));
                this.log(chalk.yellow(`Remember to set the Endpoint Errors to use this error set in the UI.`));
              });
            })
            .catch(handleError(this, s, callback));
        });
    }
    catch (error) {
      handleError(this, s, callback)(error);
    }

    callback();
  });

vorpal
  .command('ls', 'List existing API services and their ids.')
  .action(function (args, callback) {
    const s = spinner();
    s.start();

    try {
      verifyConfig();

      const url = new URL('/v3/rest/services', process.env.MASHERY_HOST);

      const requestHeaders = new fetch.Headers({
        "Accept": "application/json",
        "Authorization": `Bearer ${process.env.MASHERY_KEY}`,
      });

      fetch(url.toString(), { headers: requestHeaders })
        .then(handleHTTPError)
        .then(retrieveJSONResponse)
        .then(json => {
          // Print the list of existing services
          s.stop();
          this.log(`\n\nList of services (${json.length}):\n----------------\n`);
          json.forEach(service => {
            this.log(`'${service.name}'\n id: ${service.id}\n\n`);
          });
        })
        .catch(handleError(this, s, callback));
    }
    catch (error) {
      handleError(this, s, callback)(error);
    }

    callback();
  });

vorpal
  .command('config', 'Prints config information.')
  .action(function (args, callback) {
    this.log(`Mashery host: ${process.env.MASHERY_HOST}`);
    this.log(`Mashery key: ${process.env.MASHERY_KEY}`);
    // this.log(`error set: ${JSON.stringify(errorSet, "", 2)}`);
    callback();
  });

vorpal
  .delimiter('mashery-toolbelt$')
  .show();
