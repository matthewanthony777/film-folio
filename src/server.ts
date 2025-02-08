
import express from 'express';
import subscribeHandler from './pages/api/subscribe';

const app = express();
const PORT = 3001;

app.use('/api/subscribe', subscribeHandler);

app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});
