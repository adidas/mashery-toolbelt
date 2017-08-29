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
    throw Error('missing MASHERY_HOST');
  }

  if (!process.env.MASHERY_KEY) {
    throw Error('missing MASHERY_KEY');
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
    //response.text().then(data => console.log(data));

    throw Error(message);
  }
  return response;
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

      const url = new URL('/rest/services/', process.env.MASHERY_HOST);
      this.log(`Querying ${url.toString()}`);

      fetch(url.toString())
        .then(handleHTTPError)
        .then(response => ctx.log(response))
        .catch(handleError(this, s, callback));
    }
    catch (error) {
      handleError(this, s, callback)(error);
    }

  });

vorpal
  .command('dbg-info', 'Prints debug information')
  .action(function (args, callback) {
    this.log(`Mashery host: ${process.env.MASHERY_HOST}`);
    this.log(`Mashery token: ${process.env.MASHERY_KEY}`);
    callback();
  });

vorpal
  .delimiter('mashery-toolbelt$')
  .show();
