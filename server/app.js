import express from 'express';
import {
  log
} from 'debug';
import helmet from 'helmet';
import userRouter from './routes/api/v1/user.route';
import accountRouter from './routes/api/v1/account.route';
import transactionRouter from './routes/api/v1/transaction.route';
import ResponseGenerator from './utils/ResponseGenerator';

const app = express();
const response = new ResponseGenerator();
const port = process.env.PORT || 8009;

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({
  limit: '50mb',
  extended: true
}));

app.get('api/v1', (req, res) => {
  res.json({
    name: 'Kudi API',
    description: 'Kudi is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals.',
    verison: '1.0.0',
    author: 'Ridwan Onikoyi'
  });
});

app.use('/api/v1/auth', userRouter);
app.use('/api/v1', accountRouter);
app.use('/api/v1', transactionRouter);

app.use((req, res, next) => {
  const error = new Error(`Uh Oh! We lost this page ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  response.sendError(res, statusCode, error.message);
});

app.listen(port, () => {
  log(`Server is running on port ${port}`);
});