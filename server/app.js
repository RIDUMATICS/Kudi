import express from 'express';
import { log } from 'debug';

const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.json({
    name: 'Kudi API',
    description:
      'Kudi is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals.',
    verison: '1.0.0',
    author: 'Ridwan Onikoyi'
  });
});

app.listen(port, () => {
  log(`Server is running on port ${port}`);
});
