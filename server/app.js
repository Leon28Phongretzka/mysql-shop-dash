const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index'); 
const dataRouter = require('./routes/data');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/api', indexRouter); 
app.use('/data', dataRouter);

// app listening
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});

module.exports = app;