const express = require('express');
const { WebPubSubServiceClient } = require('@azure/web-pubsub');

const app = express();
const port = process.env.PORT || 8080;

let service = new WebPubSubServiceClient(process.env.CONNECTION_STRING, process.env.HUB_NAME);

app.get('/', (req, res) => res.send('Application is running'));

app.get('/negotiate', async (req, res) => {
  let id = req.query.id;
  if (!id) {
    res.status(400).send('missing user id');
    return;
  }
  let token = await service.getClientAccessToken({ userId: id });
  res.json({
    url: token.url
  });
});

app.listen(port, () => console.log('Server started'));
