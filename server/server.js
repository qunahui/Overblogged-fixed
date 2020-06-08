const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000; //heroku default process port 
// var contentDisposition = require('content-disposition')


const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

});

app.get('*', (req, res) => {
    let url = path.join(publicPath, 'index.html');
    if (!url.startsWith('/')) // since we're on local windows
        url = url.substring(1);
    res.sendFile(url);
});

app.listen(port, () => {
    console.log('Server is up !!!!');
});