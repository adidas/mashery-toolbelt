const Spinner = require('cli-spinner').Spinner;

const spinner = Spinner({
  text: ' ',
  stream: process.stderr,
  onTick(msg) {
    this.clearLine(this.stream);
    this.stream.write(msg);
  }
});

spinner.setSpinnerString('⣾⣽⣻⢿⡿⣟⣯⣷');

const origStart = spinner.start
const origStop = spinner.stop
// Allow us to send start/stop to callbacks and promises
spinner.start = () =>  origStart.call(spinner)
spinner.stop = () => origStop.call(spinner, true)

module.exports = spinner
