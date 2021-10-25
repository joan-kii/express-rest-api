const express = require('express');

require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.send('Received a GET HTTP method!')
});

app.post('/', (req, res) => {
  res.send('Received a POST HTTP method!')
});

app.put('/users/:userId', (req, res) => {
 res.send(`PUT HTTP method on user/${req.params.userId} resource!`)
});

app.delete('/users/:userId', (req, res) => {
  res.send(`DELETE HTTP method on user/${req.params.userId} resource!`)
});

app.listen(process.env.PORT, () => {
  console.log('Listening!!!')
});
