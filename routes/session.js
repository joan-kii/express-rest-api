const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(req.context.models.users[req.context.me.id]);
});

module.exports = router;
