import Client from "./index";

const cl = new Client("ws://localhost:8443", process.env.MPPNET_TOKEN);

cl.start();
cl.setChannel("✧𝓓𝓔𝓥 𝓡𝓸𝓸𝓶✧");

cl.on("a", msg => {
    console.log(`${msg.p.name}: ${msg.a}`);
});

cl.on("wserror", msg => {
    console.error(msg);
});
