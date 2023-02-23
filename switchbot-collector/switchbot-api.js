const crypto = require('crypto');
const https = require('https');
const { Guid } = require('js-guid');

class SwitchBotAPI {
  constructor(token, secret) {
    this.token = token;
    this.secret = secret;
  }

  makeRequestHeaders(token, secret) {
    const t = Date.now();
    const nonce = Guid.newGuid().toString();
    const data = token + t + nonce;
    const signTerm = crypto.createHmac('sha256', secret)
      .update(Buffer.from(data, 'utf-8'))
      .digest();
    const sign = signTerm.toString("base64");
    return {
      "Authorization": token,
      "sign": sign,
      "nonce": nonce,
      "t": t
    };
  }

  request(path, method, onSuccess, onError) {
    const options = {
      hostname: 'api.switch-bot.com',
      port: 443,
      path: path,
      method: method,
      headers: this.makeRequestHeaders(this.token, this.secret)
    };

    const req = https.request(options, res => {
      if (res.statusCode != 200) {
        onError(`switchbot api request error: http status code ${res.statusCode}`);
        return;
      }

      let responseBody = '';
      res.on('data', chunk => {
        responseBody += chunk;
      });

      res.on('end', () => {
        const json = JSON.parse(responseBody);
        if (json["statusCode"] == 100) {
          onSuccess(json);
        } else {
          onError(`switchbot api request error: ${json["message"]}(${json["statusCode"]})`)
        }
      });
    });

    req.on('error', error => {
      onError(error);
    });

    req.end();
  }
}

module.exports = SwitchBotAPI;
