const schedule = require('node-schedule');
const SwitchBotAPI = require('./switchbot-api');

class MeterDataCollector {
  // Compatible device : Meter, Meter Plus, Humidifier
  constructor(dataStore, token, secret, deviceId) {
    this.api = new SwitchBotAPI(token, secret);
    this.dataStore = dataStore;
    this.deviceId = deviceId;
  }

  activate() {
    // Daily request limit is 10000. (https://github.com/OpenWonderLabs/SwitchBotAPI#request-limit)
    // 24*60=1440 times.
    schedule.scheduleJob('0 * * * * *', (date) => {
      this.requestToSwitchBotAPI(date);
    });
  }

  requestToSwitchBotAPI(date) {
    this.api.request(
      `/v1.1/devices/${this.deviceId}/status`,
      "GET",
      (response) => {
        console.log("switchbot api request success");
        this.putData(response, date);
      },
      (error) => {
        console.error(error);
      }
    )
  }

  putData(response, checkTime) {
    const entry = {
      datetime: checkTime,
      temperature: response["body"]["temperature"],
      humidity: response["body"]["humidity"]
    }
    this.dataStore.append(entry);
  }
}

module.exports = MeterDataCollector;

