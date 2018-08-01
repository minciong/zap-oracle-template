//import { loadProvider, createProvider, createProviderCurve, getEndpointInfo, doBondage, doUnbondage } from "./provider";
const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const HDWalletProviderMem = require("truffle-hdwallet-provider");
const Web3 = require('web3');
import { ZapRegistry } from "@zapjs/registry";

import { initProvider, createProvider} from "./provider";


const mnemonic:string = "rally later assist feature wait primary addict sister remove language piece drink";
//"solid giraffe crowd become skin deliver screen receive balcony ask manual current"; //

async function main() {
	const INFURA_URL = "wss://kovan.infura.io/ws";
	const poopoo: any = new HDWalletProviderMem(mnemonic, "wss://kovan.infura.io/_ws");

	console.log("OK");
	const web3: any = new Web3(poopoo);	

	// Get the provider and contracts
	const { provider, contracts } = await initProvider(web3);

	const registry: ZapRegistry = provider.zapRegistry;

	const title = await registry.getProviderTitle(provider.providerOwner);

	if(title.length == 0){
		console.log("Initializing provider");
		createProvider(provider);
		
	} else {
		console.log("Oracle already exists");

		console.log('Filter', provider.listenQueries({}, function (err: any, data: any) {
			if ( err ) throw err;

			console.log('Query', data.returnValues.query, 'from', data.returnValues.subscriber);
			provider.zapDispatch.respond({ queryId: data.returnValues.id, responseParams: ['0x00'], from: provider.providerOwner, dynamic: false }).then((txid: any) => {
				console.log('Response Transaction', typeof txid == 'string' ? txid : txid.transactionHash);
			})
		}));
	}
}

main();

/*
async function main() {
	const reader: any = new Web3(new Web3.providers.WebsocketProvider(INFURA_URL));
	const writer: any = new Web3(new HDWalletProviderMem(mnemonic, INFURA_URL));	

	// Get the provider and contracts
	const { providerR, providerW, contracts } = await initProvider(reader, writer);

	const registry: ZapRegistry = providerR.zapRegistry;
	const title = await registry.getProviderTitle(providerR.providerOwner);

	if(title.length == 0){
		console.log("Initializing provider");
		createProvider(provider);
	} else {
		console.log("Oracle already exists");

		providerR.listenQueries({}, console.log);
	}
	

}*/