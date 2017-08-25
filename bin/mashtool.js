#!/usr/bin/env node
'use strict';

const vorpal = require('vorpal')();

vorpal
  .command('errorset', 'Create probem+json Mashery errorset for an API based on adidas API Guidelines')
  .action(function (args, callback) {
    this.log('TODO');
    callback();
  });

vorpal
  .command('lsapi', 'List existing APIs')
  .action(function (args, callback) {
    this.log('TODO');
    callback();
  });

vorpal
  .delimiter('mashtool$')
  .show();
