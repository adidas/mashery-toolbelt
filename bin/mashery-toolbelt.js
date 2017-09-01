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
  .command('create-errorset', 'CreateProblem Detail error set for a service, based on adidas API Guidelines.')
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
          let errorSetId = null;

          masheryClient.fetchService(input.serviceId)
            .then(json => {
              this.log(`Checking '${json.name}' service...`)
              return masheryClient.fetchAllServiceErrorSets(input.serviceId); // First, check existing error sets
            })
            .then(json => {
              json.forEach(errorSet => {
                if (errorSet.name === ProblemDetailErrorSet.name) {
                  throw Error('Problem Detail error set already exists');
                }
              })

              this.log(`Creating Problem Detail error set...`);
              return masheryClient.createErrorSet(input.serviceId, ProblemDetailErrorSet);  // Create the error set
            })
            .then(json => {
              errorSetId = json.id;

              this.log(chalk.green(`Error set 'Problem Detail' created successfully!`));
              this.log('Updating service endpoints to use the error set...');
              return masheryClient.fetchAllServiceEndpoints(input.serviceId); // Query Service endpoitns
            })
            .then(json => {
              // Iterate enpdoints and update them to use the Problem Detail Error Set
              let ids = [];
              json.forEach(endpoint => {
                ids.push(endpoint.id);
              });

              if (ids.length) {
                const endpointPayload = { "errors": { "errorSet": { "id": errorSetId } } }

                const updateEndpoint = endpointId => masheryClient.updateServiceEndpoint(input.serviceId, endpointId, endpointPayload)
                  .then(json => {
                    this.log(`Endpoint '${json.name}' updated`);
                  });

                return Promise.all(ids.map(updateEndpoint));
              }
            })
            .then(result => {
              s.stop();
              this.log(chalk.green('All endpoints updated.'));
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
          this.log(`\n\nList of services (${json.length}):\n-----------------------\n`);
          json.forEach(service => {
            this.log(chalk.magenta(`${service.name}`));
            this.log(`id: ${service.id}\n`);
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
