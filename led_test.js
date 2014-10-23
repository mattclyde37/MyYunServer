console.log('blink start ...');

var ledPin = 13;

var firmata = require('firmata');
var board = new firmata.Board("../../../../../dev/ttyATH0",function(err) {
    if (err)
    {
        console.log(err);
        board.reset();
        return;
    }
    else
    {
        console.log('connected');
        var boardInfo = 'Firmware: ';
        boardInfo = boardInfo + board.firmware.name;
        boardInfo = '-';
        boardInfo = boardInfo + board.firmware.version.major;
        boardInfo = '.';
        boardInfo = boardInfo + board.firmware.version.minor;
        console.log(boardInfo);

        var ledOn = true;
        board.pinMode(ledPin, board.MODES.OUTPUT);
        var strings = require('querystring');
        var http = require('http');
        http.createServer(function(request, response)
        {
            console.log(strings.parse(request.url).value);
            if ((strings.parse(request.url).value) == 'HIGH')
            {
                board.digitalWrite(ledPin, board.HIGH);
            }
            else
            {
                board.digitalWrite(ledPin, board.LOW);
            }
            response.writeHead(200);
            response.write("Hello this is David");
            response.end();
        }).listen(8080);
        console.log('Listening on port 8080 ...');
    }
});