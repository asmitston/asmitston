import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send({ message: 'Hello from sample-node-app with Jenkins!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});