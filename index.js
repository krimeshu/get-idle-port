const net = require('net');

module.exports = async function (options) {
    const {
        from = 80, end = 9999, increment = 1,
    } = options;

    for (let i = from; i < end; i += increment) {
        if (await isIDlePort(i)) return i;
    }
    throw new Error(`Didn't found idle port in range (${from}-${end}).`);
}

function isIDlePort(portNum) {
    return new Promise(rs => {
        var server = net.createServer().listen(portNum);
        server.on('listening', () => {
            server.close();
            rs(true);
        });
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                // console.log(`Port: ${portNum} is busy, please change other port.`)
                rs(false);
            }
        });
    });
}
