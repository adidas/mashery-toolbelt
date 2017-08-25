'use strict';

const Spinner = require('cli-spinner').Spinner;

module.exports = function spinner() {
  const spin = Spinner({
    text: ' ',
    stream: process.stderr,
    onTick(msg) {
      this.clearLine(this.stream);
      this.stream.write(msg);
    }
  });
  spin.setSpinnerString('⣾⣽⣻⢿⡿⣟⣯⣷');
  return spin;
};
