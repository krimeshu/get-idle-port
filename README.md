# get-idle-port

Detect from a specified port number, increase/decrease it until find a idle port number.

## Requirements

* [node.js](http://nodejs.org) `7.6+`

## Usage

```javascript
const getIdlePort = require('get-idle-port');

(async () => {
    const port = await getIdlePort({
        from: 8080,
        end: 10000,
        increment: 2
    });
    // Start webpack-dev-server or other service.
})();
```
