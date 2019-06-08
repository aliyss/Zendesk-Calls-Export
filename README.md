# Zendesk/BaseCRM-Calls-Export
Exports the calls from BaseCRM / Zendesk Sell using the Zendesk Sell API and request.

## Download

- git clone https://github.com/Aliyss/Zendesk-Calls-Export.git

## Setup

Go to server.js

- Edit ``[API_KEY]`` to your API-Key you get from the BaseCRM or Zendesk Sell. Replace API_KEY and remove the brackets.
- Edit ``max = 400`` to the amount of pages you expect to download recordings from. Each page is about 20 recordings. The maximum amount is limited to 1000.
- Edit ``wait_time = 5000`` to the time you want to wait between each iteration. This will wait 5 seconds before executing the code and 5 seconds between each iteration of 5 pages as a batch. I recommend keeping it at 5 seconds, but if you download less than 20 pages you can edit it to 0.

## Running

- npm install
- npm start

In case of issues feel free to make an issue and inform me. It should theoretically work easily.
