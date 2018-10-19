const net = require('net');
const {
    Socket
} = net;

module.exports = async function (options) {
    const {
        host = '127.0.0.1', from = 80, end = 9999, increment = 1,
    } = options;

    for (let i = from; i < end; i += increment) {
        const res = await isIDlePort(host, i);
        // console.log('Port ' + port + ':', res);
        if (!res.isRefused) return i;
    }
    throw new Error(`Didn't found idle port in range (${from}-${end}).`);
}

function isIDlePort(host, port) {
    const result = {
        isRefused: false,
        status: null,
        error: null,
    };

    return new Promise(rs => {
        var server = net.createServer();

        server.once('listening', () => {
            result.status = 'open';
            server.once('close', function (exception) {
                if (exception && !result.isRefused) {
                    result.error = exception;
                } else {
                    result.error = null;
                }
                rs(result);
            });    
            server.close();
        });

        server.once('error', (exception) => {
            result.error = exception;
            result.isRefused = true;
            result.status = 'closed';
            rs(result);
        });

        server.listen(port, host);
    });
}

// function isIDlePort(host, port) {
//     const timeout = 100;

//     const result = {
//         isRefused: false,
//         status: null, 
//         error: null,
//     };

//     return new Promise(rs => {
//         var socket = new Socket();

//         socket.on('connect', () => {
//             result.status = 'open';
//             socket.destroy();
//         });

//         socket.setTimeout(timeout);

//         socket.on('timeout', () => {
//             result.status = 'closed';
//             result.error = new Error(`Timeout (${timeout}ms) occurred waiting for ${host}:${port} to be available`)
//             socket.destroy();
//         });

//         socket.on('error', (exception) => {
//             if (exception.code !== 'ECONNREFUSED') {
//                 result.error = exception;
//             } else {
//                 result.isRefused = true;
//             }
//             result.status = 'closed';
//         });

//         socket.on('close', function (exception) {
//             if (exception && !result.isRefused) {
//                 result.error = result.error || exception;
//             } else {
//                 result.error = null;
//             }
//             rs(result);
//         });

//         socket.connect(port, host)
//     });
// }