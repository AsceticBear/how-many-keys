const { ApiPromise } = require('@polkadot/api');
const { HttpProvider } = require('@polkadot/rpc-provider');
const { xxhashAsHex } = require('@polkadot/util-crypto');

// const provider = new HttpProvider('http://127.0.0.1:9933')
const provider = new HttpProvider('https://pangolin-rpc.darwinia.network');

main();

async function main() {
    let api = await ApiPromise.create({ provider });

    let prefixes: Array<any> = new Array();
    
    let metadata = await api.rpc.state.getMetadata();
    let metadata_pallets = metadata.asLatest.pallets;

    let total_pairs = 0;
    for (let pallet of metadata_pallets) {
        let prefix = xxhashAsHex(pallet.name, 128);
        prefixes.push(prefix);

        let pairs = await cal_single_pallet(prefix);        
        console.log("The " + pallet.name + "pallet has " + pairs + " keys");
        total_pairs += pairs;
    }

    console.log("total pairs: ", total_pairs);
}

async function cal_single_pallet(prefix: any) {
    const pairs = await provider.send('state_getPairs', [prefix]);
    return pairs.length;
}

