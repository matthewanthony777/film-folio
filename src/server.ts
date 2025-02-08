
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

// Add this line to parse JSON bodies
app.use(express.json());

app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});
