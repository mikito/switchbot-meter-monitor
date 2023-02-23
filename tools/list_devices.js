const dotenv = require('dotenv');
const SwitchBotAPI = require('../switchbot-collector/switchbot-api');
dotenv.config();

const api = new SwitchBotAPI(process.env.SWITCHBOT_TOKEN, process.env.SWITCHBOT_SECRET);
api.request(
  "/v1.1/devices",
  "GET",
  (response) => {
    response["body"]["deviceList"].forEach((device) => {
      console.log(device);
    });
  },
  (error) => {
    console.error(error);
  }
)

