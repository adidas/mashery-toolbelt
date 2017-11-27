const program = require('commander')
const Auth = require('./auth')

program
  .version('0.0.1')
  .description('Mashery remote command tool');

program
  .command('auth', /* <username> <password> <key> <secret> <areauuid> */)
	// .option('-arg, --argument', 'Some argument')
  .description('Authenticate to mashery API with simple wizard')
  .action(() => Auth())

program.parse(process.argv)

if (program.args.length === 0) {
	program.help()
}
