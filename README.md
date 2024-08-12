# mpp-client-net

This module is a fork of the [MPP.net client](https://github.com/mppnet/frontend). This module is only meant for [MPP.net](https://multiplayerpiano.net), but it will likely work on any MPP site that uses token-based authentication in the same way as MPP.net.

This is not meant to work in the browser. It is for independent runtimes like Bun, Deno, or Node.js.

## Usage

It is strongly recommended that you keep your bot tokens in a safe place where nobody else can access them.
Personally, I keep mine in a `.env` file in the root of my project, as that is a typical place for project secrets.

For more information on how to interact with the server, see the [MPP.net Protocol Documentation](https://github.com/mppnet/frontend/blob/main/docs/protocol.md).

```env
# .env
MPPNET_TOKEN=your token here
```

```ts
// index.ts

// Load environment variables into process.env (not required for bun)
import { configDotenv } from "dotenv";
configDotenv();

import { Client } from "mpp-client-net";

// Instantiate a new client
const client = new Client("wss://mppclone.com", process.env.MPPNET_TOKEN);

// Connect to the server
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
