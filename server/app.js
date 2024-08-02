const express = require('express');
const cors = require('cors'); // Import the cors package
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors()); // This will allow all origins. You can configure it more specifically if needed.

app.use(express.json());
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
