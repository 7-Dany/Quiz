import express from 'express';
import config from './config';
import errorMiddleware from './middleware/error.middleware';
import pageNotFoundMiddleware from './middleware/notfound.middleware';
import routes from './routes';

const app: express.Application = express();

app.use(express.json());

app.use('/', routes);
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(config.port, () => {
  console.log(`App is listening on http://localhost:${config.port}`);
});

app.use(errorMiddleware);
app.use(pageNotFoundMiddleware);

export default app;