const express = require('express');
const router = express.Router();
const uuid =  require('uuid');
const uuidv4 = uuid.v4;

router.get('/', (req, res) => {
  res.send(Object.values(req.context.models.messages));
});

router.get('/:messageId', (req, res) => {
  res.send(req.context.models.messages[req.params.messageId]);
});

router.post('/', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id
  };
  req.context.models.messages[id] = message;
  res.send(message);
});

router.delete('/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
    } = req.context.models.messages;
  req.context.models.messages = otherMessages;
  res.send(message);
});

module.exports = router;
