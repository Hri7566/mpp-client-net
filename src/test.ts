import Client from "../build";

const cl = new Client("wss://mppclone.com:8443", process.env.MPPNET_TOKEN);

cl.start();
cl.setChannel("✧𝓓𝓔𝓥 𝓡𝓸𝓸𝓶✧");

cl.on("a", msg => {
    console.log(`${msg.p.name}: ${msg.a}`);
});
