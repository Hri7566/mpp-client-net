# mpp-client-net

This module is a fork of the [MPP client](https://github.com/multiplayerpiano/mpp-frontend-v1) with token-based authentication. This module is only meant for [MPP.net](https://multiplayerpiano.net), but it will work on any MPP site that uses token-based authentication in the same way as MPP.net.

This module is not officially affiliated with MPP.net.

## Usage

It is strongly recommended that you keep your tokens in a safe place where nobody else can access them.

```env
# .env
MPPNET_TOKEN=your token here
```

```ts
// index.ts

// Load environment variables into process.env
import { configDotenv } from "dotenv";
configDotenv();

import { Client } from "mpp-client-net";

// Instnatiate a new client
const client = new Client("wss://mppclone.com", process.env.MPPNET_TOKEN);

client.start();
client.setChannel('test/awkward');

// Listen for chat messages
client.on('a', msg => {
    if (msg.a == "!ping") {
        // Send a chat message back
        client.sendArray([{
            m: "a",
            message: "Pong!"
        }]);
    }
});
```
