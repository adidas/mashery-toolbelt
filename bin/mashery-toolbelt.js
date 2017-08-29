#!/usr/bin/env node
'use strict';

require('dotenv').config();

const vorpal = require('vorpal')();
const { URL } = require('url');
const fetch = require('node-fetch');
const spinner = require('../src/spinner');

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

    response.text().then(data => console.log(data));

    throw Error(message);
  }
  return response;
}

// Retrieve JSON body
function retrieveJSON(response) {
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
  .command('create-errorset', 'Create probem+json Mashery errorset for an API based on adidas API Guidelines')
  .action(function (args, callback) {
    this.log(chalk.yellow('TODO'));
    callback();
  });

vorpal
  .command('ls', 'List existing APIs')
  .action(function (args, callback) {
    const s = spinner();
    s.start();

    try {
      verifyConfig();

      const url = new URL('/v3/rest/services', process.env.MASHERY_HOST);
      this.log(`Querying ${url.toString()}`);

      const requestHeaders = new fetch.Headers({
        "Accept": "application/json",
        "Authorization": `Bearer ${process.env.MASHERY_KEY}`,
      });

      fetch(url.toString(), { headers: requestHeaders })
        .then(handleHTTPError)
        .then(retrieveJSON)
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
  .command('config', 'Prints config information')
  .action(function (args, callback) {
    this.log(`Mashery host: ${process.env.MASHERY_HOST}`);
    this.log(`Mashery key: ${process.env.MASHERY_KEY}`);
    callback();
  });

vorpal
  .delimiter('mashery-toolbelt$')
  .show();
