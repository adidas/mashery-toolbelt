#!/usr/bin/env node
'use strict';

require('dotenv').config();

const vorpal = require('vorpal')();
const spinner = require('../src/spinner');
const masheryClient = require('../src/masheryClient');

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

          masheryClient.fetchService(input.serviceId)
          .then(json => {
            this.log(`Creating problem+json error set for '${json.name}'...`);
            return masheryClient.createErrorSet(input.serviceId, ProblemDetailErrorSet);
          })
          .then(json => {
            s.stop();
            this.log(chalk.green(`Error set 'Problem Detail' created successfully!`));
            this.log(chalk.yellow(`Remember to set the Endpoint Errors to use this error set in the UI.`));
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

      masheryClient.fetchAllServices()
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
