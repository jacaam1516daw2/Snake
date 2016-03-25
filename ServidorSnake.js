var app = require('http').createServer(onRequest);
var io = require('socket.io').listen(app);
var fs = require('fs');
var url = require("url");

console.log('servidor iniciat');
app.listen(8888);

function onRequest(req, res) {
    var pathname = url.parse(req.url).pathname;
    if (pathname == '/') {
        fs.readFile(__dirname + '/index.html',
            function (err, data) {
                if (err) {
                    res.writeHead(500);
                    return res.end('Error carregant pàgina');
                }
                res.writeHead(200);
                res.end(data);
            });

    } else if (pathname == '/Snake.js') {
        fs.readFile(__dirname + '/Snake.js',
            function (err, data) {
                if (err) {
                    res.writeHead(500);
                    return res.end('Error carregant pàgina');
                }
                res.writeHead(200);
                res.end(data);
            });
    } else if (pathname == '/js/script.js') {
        fs.readFile(__dirname + '/js/script.js',
            function (err, data) {
                if (err) {
                    res.writeHead(500);
                    return res.end('Error carregant pàgina');
                }
                res.writeHead(200);
                res.end(data);
            });
    } else {
        res.writeHead(404, {
            "Content-Type": "text/html; charset=utf-8"
        });
        sortida = "404 NOT FOUND";
        res.write(sortida);
        res.end();
    }
}


function enviarMissatges(socket, data) {
    socket.emit('rgb', {
        r: data.r,
        g: data.g,
        b: data.b
    });
    socket.broadcast.emit('rgb', {
        r: data.r,
        g: data.g,
        b: data.b
    });
}
io.sockets.on('connection', function (socket) {
    socket.on('r', function (data) {
        console.log('SERVIDOR -> dades rebudes del client->' + data.r);
        enviarMissatges(socket, data);
    });
    socket.on('g', function (data) {
        console.log('SERVIDOR -> dades rebudes del client->' + data.g);
        enviarMissatges(socket, data);
    });
    socket.on('b', function (data) {
        console.log('SERVIDOR -> dades rebudes del client->' + data.b);
        enviarMissatges(socket, data);
    });

});
