import express from 'express';
import {
  log
} from 'debug';
import userRouter from './routes/api/v1/user.route';
import accountRouter from './routes/api/v1/account.route';

const app = express();
const port = process.env.PORT || 8009;

app.use(express.json());
app.use(express.urlencoded({
  limit: '50mb',
  extended: true
}));

app.get('/', (req, res) => {
  res.json({
    name: 'Kudi API',
    description: 'Kudi is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals.',
    verison: '1.0.0',
    author: 'Ridwan Onikoyi'
  });
});

app.use('/api/v1/auth', userRouter);
app.use('/api/v1', accountRouter);


app.listen(port, () => {
  log(`Server is running on port ${port}`);
});