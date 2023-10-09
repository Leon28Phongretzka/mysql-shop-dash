const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config();

const authRouter = require('./routes/auth'); 
const dataRouter = require('./routes/data');
const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Ecommerce API',
            description: 'Ecommerce API Information',
            contact: {
                name: 'J4son Tind4ll'
            },
            servers: ['http://localhost:3000']
        }
    },
    apis: ['./routes/auth.js', './routes/data.js']
};



const swaggerDocs = swaggerJSDoc(swaggerOptions);
// console.log(swaggerDocs);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/api',  authRouter); 
app.use('/data', dataRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// app listening
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});

module.exports = app;