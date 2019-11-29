const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

//init middleware for access req.body data
app.use(express.json({extended: false}))

app.get('/', (req, res) => res.send('API Running'));

//Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

