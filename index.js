const Alexa = require(`ask-sdk-core`);
const skillBuilder = Alexa.SkillBuilders.custom();
const skillEventHandler = require('./src/handlers/skillEventHandler');

exports.handler = skillBuilder
  .addRequestHandlers(
    skillEventHandler
  )
  .lambda();
