const axios = require(`axios`);
const handlerUtil = require('../util/handlerUtil');
const ALEXA_SKILL_EVENT_REGEX = /AlexaSkillEvent/g;
const SSM = require(`../util/ssm`);

const skillEventHandler = {
  canHandle (handlerInput) {
    return handlerUtil.checkRequestTypeMatchRegex(handlerInput, ALEXA_SKILL_EVENT_REGEX);
  },

  handle: async (handlerInput) => {
    
    
    const params = await SSM.getParametersByPath(`/VA/PERS/${process.env.ENVIRONMENT}/OAuth/`, true);
    const clientId = params.ClientID;
    const clientKey = params.ClientKey;
    const client = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': `application/json`,
        'clientId': clientId,
        'clientKey': clientKey
      }
    });
    try {
       // const res = await client.post("https://webhook.site/78ae3657-c2ba-4097-86f0-bc39d0218023?", handlerInput);
      const res = await client.post(process.env.GC_URL, handlerInput);
    } catch (error) {
      console.error(`Error calling GC endpoint : ${error}`);
    }
  }

};

module.exports = skillEventHandler;
