const getIdlePort = require('./');

(async () => {
    const port = await getIdlePort({
        from: (+process.argv[2] || 80),
        end: 10000,
        increment: 1
    });

    console.log(`Port ${port} is available.`);
})();