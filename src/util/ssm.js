const AWS = require(`aws-sdk`);
const ssm = new AWS.SSM();
const MAX_RESULTS = 10;
const SSM = {
  getParametersByPath: async (paramPath, withDecryption = false) => {
    const params = {
      Path: paramPath, /* required */
      MaxResults: MAX_RESULTS,
      Recursive: true,
      WithDecryption: withDecryption
    };
    let data;

    try {
      data = await ssm.getParametersByPath(params).promise();
    } catch (e) {
      console.error(`Parameter service failed: `, e);
      throw e;
    }

    return data.Parameters.reduce((ret, param) => {
      const name = param.Name.match(/\w+$/g)[0];
      ret[name] = param.Type === `StringList`
        ? param.Value.split(`,`).map((value) => value.trim()).filter((value) => value !== ``)
        : param.Value;

      return ret;
    }, {});
  }
};

module.exports = SSM;
