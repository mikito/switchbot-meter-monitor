SwitchBot Meter Monitor
==============

This is a simple web application that provides a dedicated dashboard for monitoring temperature and humidity values from SwitchBot [Meter](https://www.switchbot.jp/products/switchbot-meter)/[Meter Plus](https://www.switchbot.jp/products/switchbot-meter-plus).

<img src="https://user-images.githubusercontent.com/1071168/221242819-45d5c8e0-46dd-4736-9d37-fd53955250ee.JPG" width="50%">

Features
-------
- The backend server fetches and saves the status data of the target device every minute via the SwitchBot API.
- The frontend application periodically communicates with the backend server to display the latest temperature and humidity data.
- The retrieved data from the SwitchBot API is stored on the server side for 24 hours and displayed as a trend graph.
- By adding it to your smartphone's home screen, it can be used like a mobile application.
- The server can be easily launched with the docker compose command.

### Supported Models
- Meter
- Meter Plus
- Humidifier

NOTE:
- You will need additional network-connected devices, such as the Hub Mini.
- The application has been tested only with the Meter Plus device.

Server Setup
-----------
Please complete the SwitchBot account setup and integrate your device with the SwitchBot mobile app beforehand. 
Also, since security verification is not sufficient, it is recommended to build the server on a PC on the local network.

### 1. Obtain SwitchBot Open API Token/Secret
Follow the official documentation to obtain SwitchBot API Token and Secret.
https://github.com/OpenWonderLabs/SwitchBotAPI#getting-started

### 2. Enable Cloud Services
Make sure to enable the Cloud Services setting for the target device using the SwitchBot app.

### 3. Obtain Device Id
If you already know the device ID of the target device, skip this step.

After cloning the repository, copy the .env.sample file as shown below:
```shell
$ cp .env.sample .env
```

Enter the API Token and Secret obtained in Step 1 into the .env file as shown below:
```
SWITCHBOT_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
SWITCHBOT_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
SWITCHBOT_METOR_DEVICE_ID=[YOUR_DEVICE_ID]
APP_PORT=3000
```

Run the following command:
```shell
$ docker compose up devices
```

The list of devices in your home will be displayed as follows. Please take note of the deviceId for your Meter/MeterPlus.
```shell
switchbot-meter-monitor-devices-1  | {
switchbot-meter-monitor-devices-1  |   deviceId: 'XXXXXXXXXXXX',
switchbot-meter-monitor-devices-1  |   deviceName: 'Hub Mini`',
switchbot-meter-monitor-devices-1  |   deviceType: 'Hub Mini',
switchbot-meter-monitor-devices-1  |   enableCloudService: true,
switchbot-meter-monitor-devices-1  |   hubDeviceId: '000000000000'
switchbot-meter-monitor-devices-1  | }
switchbot-meter-monitor-devices-1  | {
switchbot-meter-monitor-devices-1  |   deviceId: 'XXXXXXXXXXXX',
switchbot-meter-monitor-devices-1  |   deviceName: 'MeterPlus',
switchbot-meter-monitor-devices-1  |   deviceType: 'MeterPlus',
switchbot-meter-monitor-devices-1  |   enableCloudService: true,
switchbot-meter-monitor-devices-1  |   hubDeviceId: 'XXXXXXXXXXXX'
switchbot-meter-monitor-devices-1  | }
```

### 4. Starting the server

Enter obtained API Token, Secret, and deviceId in the .env file. You can also change the APP_PORT according to your needs.
```
SWITCHBOT_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
SWITCHBOT_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
SWITCHBOT_METOR_DEVICE_ID=XXXXXXXXXXXX
APP_PORT=3000
```

Execute the following command to start the server.
```shell
$ docker compose up -d --build 
```

This will launch the server in the background as a detached process. You can now access the web application on your local machine by visiting http://localhost:3000 in your web browser.

Access and usage (Web App Mode on iOS)
---------
Access the URL of the server, and tap the bottom menu.

<img src="https://user-images.githubusercontent.com/1071168/221236242-94770093-4433-48ad-ab8a-b9f8d10db836.png" width="30%">

Then, tap "Add to Home Screen".

<img src="https://user-images.githubusercontent.com/1071168/221236306-baa6015f-7f1c-4787-8564-a1b8f94fb6d1.png" width="30%">

The icon will be added to the home screen, so launch it from there next time.

<img src="https://user-images.githubusercontent.com/1071168/221236399-c5873137-dd6e-43ed-be84-ac77a8225eab.PNG" width="30%">

License
--------
This library is under the MIT License.
