const { createWriteStream } = require('fs');
const { resolve } = require('path');

module.exports = (type, msg) => {
  const options = {
    flags: 'a',
    encoding: null
  }

  const logErrors = () => {
    const message = 
    `        ${new Date().toISOString()}
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ${msg}  \n${msg.stack}\n\n`

    const errorStream = createWriteStream(resolve(__dirname, 'errors.log'), options);
    return errorStream.write(message);
  };

  const logDebugInfo = () => {
    const message = 
    `        ${new Date().toISOString()}
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ${msg}\n\n`

    const debugStream = createWriteStream(resolve(__dirname, 'debug.log'), options);
    return debugStream.write(message);
  };

  if(type === 'error') {
    logErrors();
  } else if (type === 'debug') {
    logDebugInfo();
  }
};