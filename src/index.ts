const { ApiPromise } = require('@polkadot/api');
const { HttpProvider } = require('@polkadot/rpc-provider');

// const provider = new HttpProvider('http://localhost:9933')
const provider = new HttpProvider('https://crab-rpc.darwinia.network');

main();

async function main() {
    let api = await ApiPromise.create({ provider });
    let at = (await api.rpc.chain.getBlockHash()).toString();
    console.log("at: {:?}", at);
}

