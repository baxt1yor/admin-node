const bot = require('../../dist/main');

exports.handler = async (event) => {
    // const update = JSON.parse(event.body);
    new Error(event.body);
    console.error('Received update:', event.body);

    // await bot.default.init();
    // await bot.default.updates.handleUpdate(update);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Update received and handled' }),
    };
  
};
