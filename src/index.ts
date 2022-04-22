const { ApiPromise } = require('@polkadot/api');
const { HttpProvider } = require('@polkadot/rpc-provider');
const { xxhashAsHex } = require('@polkadot/util-crypto');

const provider = new HttpProvider('http://127.0.0.1:9933')
// const provider = new HttpProvider('https://crab-rpc.darwinia.network');

main();

async function main() {
    let api = await ApiPromise.create({ provider });

    let all_runtime_pallets: Array<any> = new Array();
    let prefixes: Array<any> = new Array();
    
    let metadata = await api.rpc.state.getMetadata();
    let metadata_pallets = metadata.asLatest.pallets;

    let total_pairs;
    metadata_pallets.forEach( async pallet => {
        let prefix = xxhashAsHex(pallet.name, 128);
        prefixes.push(prefix);

        let pairs = await cal_single_pallet(prefix);        
        total_pairs += pairs;
    });

    console.log("total pairs: ", total_pairs);
}

async function cal_single_pallet(prefix: any) {
    const pairs = await provider.send('state_getPairs', [prefix]);
    return pairs.length;
}

