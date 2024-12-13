const bot = require('../../dist/main');

exports.handler = async (event) => {
  try {
    // const update = JSON.parse(event.body);
    console.error('Received update:', event.body);

    // await bot.default.init();
    // await bot.default.updates.handleUpdate(update);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Update received and handled' }),
    };
  } catch (error) {
    console.error('Error processing update:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing webhook', error: error.message }),
    };
  }
};
