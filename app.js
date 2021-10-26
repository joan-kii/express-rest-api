const uuid =  require('uuid');
const uuidv4 = uuid.v4;
const express = require('express');
const models = require('./models/models');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.me = models.users[1];
  next();
});

app.get('/users', (req, res) => {
  res.send(Object.values(models.users));
});

app.get('/users/:userId', (req, res) => {
  res.send(models.users[req.params.userId]);
});

app.get('/messages', (req, res) => {
  res.send(Object.values(models.messages));
});

app.get('/messages/:messageId', (req, res) => {
  res.send(models.messages[req.params.messageId]);
});

app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id
  };
  models.messages[id] = message;
  res.send(message);
});

app.put('/users/:userId', (req, res) => {
 res.send(`PUT HTTP method on user/${req.params.userId} resource!`)
});

app.delete('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = models.messages;
  models.messages = otherMessages;
  res.send(message);
});

app.listen(process.env.PORT, () => {
  console.log('Listening!!!')
});
