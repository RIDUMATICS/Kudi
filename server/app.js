import '@babel/polyfill';
import express from 'express';
import {
  log
} from 'debug';
import cors from 'cors';
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

const corsOptions = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get('/', cors(), (req, res) => {
  res.redirect('/api/v1');
});

app.get('/api/v1', cors(), (req, res) => {
  res.json({
    name: 'Kudi API',
    description: 'Kudi is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals.',
    verison: '1.0.0',
    author: 'Ridwan Onikoyi'
  });
});

app.use('/api/v1/auth', cors(corsOptions), userRouter);
app.use('/api/v1', cors(corsOptions), accountRouter);
app.use('/api/v1', cors(corsOptions), transactionRouter);

app.use((req, res, next) => {
  const error = new Error(`Uh Oh! We lost this page ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  response.sendError(res, statusCode, error.message);
});

app.listen(port, () => {
  log(`Server is running on port ${port}`);
});