# mpp-client-net

This module is a fork of the [MPP client](https://github.com/multiplayerpiano/mpp-frontend-v1) with token-based authentication. This module is only meant for [MPP.net](https://multiplayerpiano.net), but it will work on any MPP site that uses token-based authentication in the same way as MPP.net.

This module is not officially affiliated with MPP.net.

## Usage

It is strongly recommended that you keep your tokens in a safe place where nobody else can access them.

```env
# .env
MPPNET_TOKEN=your token here
```

```js
// index.js

// Load environment variables into process.env
require('dotenv').config();

const Client = require('mpp-client-net');
let cl = new Client("wss://mppclone.com", process.env.MPPNET_TOKEN);

cl.start();
cl.setChannel('test/awkward');

cl.on('a', msg => {
    if (msg.a == "!ping") {
        cl.sendArray([{
            m: "a",
            message: "Pong!"
        }]);
    }
});
```
