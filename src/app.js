const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/itemRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const i18nMiddleware = require('./middleware/i18nMiddleware');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

app.use(i18nMiddleware);
app.use(cookieParser());
app.use(bodyParser.json());


app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});