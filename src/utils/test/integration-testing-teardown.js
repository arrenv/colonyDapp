/* eslint-disable flowtype/require-valid-file-annotation, no-console */

const chalk = require('chalk');
const rimraf = require('rimraf');
const util = require('util');

const remove = util.promisify(rimraf);

module.exports = async () => {
  /*
   * Stop the ganache server
   */
  await global.ganacheServer.stop();
  console.log(chalk.green.bold('Ganache Server Stopped'));

  /*
   * Cleanup
   */
  console.log(chalk.green.bold('Cleaning up unneeded files'));
  const cleanupPaths = [
    'ganache-accounts.json',
    `${global.submodules.network.path}/build/contracts`,
  ];
  cleanupPaths.map(async path => {
    await remove(path, { disableGlob: true });
  });
};
