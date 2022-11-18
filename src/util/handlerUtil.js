const handlerUtil = {
  getRequestType: (handlerInput) => handlerInput.requestEnvelope?.request?.type,

  checkRequestTypeMatchRegex: (handlerInput, regex) => handlerUtil.getRequestType(handlerInput).match(regex)
};

module.exports = handlerUtil;
