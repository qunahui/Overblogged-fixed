const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000; //heroku default process port 
var contentDisposition = require('content-disposition')


const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is up !!!!');
});