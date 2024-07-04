const express = require('express');
const app = express();
const { connectMongoDB } = require('./connection');
const userRouter = require('./routes/user');
const { logRequest } = require('./middleware');

//Connection
connectMongoDB('mongodb://127.0.0.1:27017/users').then(() => {
    console.log("MongoDB connected!")
});

const PORT = 8001;

app.use(express.urlencoded({extended: false}));

app.use(logRequest('log.txt'));

app.use('/api/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server connected on PORT ${PORT}`);
})