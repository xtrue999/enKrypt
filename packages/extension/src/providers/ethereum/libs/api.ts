import { EthereumRawInfo } from "@/types/activity";
import { ProviderAPIInterface } from "@/types/provider";
import { isArray } from "lodash";
import { defineStore, StoreDefinition } from "pinia";
import { computed, ref, Ref } from "vue";
import Web3Eth from "web3-eth";
import { numberToHex, toBN } from "web3-utils";
import { ERC20TokenInfo } from "../types";
import erc20 from "./abi/erc20";

const stores: Record<string, StoreDefinition> = {};

class API implements ProviderAPIInterface {
  node: string;
  web3: Web3Eth;
  store: StoreDefinition;

  constructor(node: string) {
    this.node = node;
    this.web3 = new Web3Eth(this.node);
    this.store = stores[this.node]
      ? stores[this.node]
      : defineStore(`balances: ${this.node}`, () => {
          const balances: Record<string, Ref<string>> = {};
          const updateBalance = (address: string, balance: string) => {
            if (!balances[address]) balances[address] = ref("0");
            balances[address].value = balance;
          };
          const getBalance = computed(() => (address: string) => {
            if (!balances[address]) balances[address] = ref("0");
            return balances[address];
          });
          return { balances, updateBalance, getBalance };
        });
    stores[this.node] = this.store;
  }

  public get api() {
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async init(): Promise<void> {}
  async getTransactionStatus(hash: string): Promise<EthereumRawInfo | null> {
    try {
      const receipt = await this.web3.getTransactionReceipt(hash);
      if (!receipt) return null;
      const [tx, block] = await Promise.all([
        this.web3.getTransaction(hash),
        this.web3.getBlock(receipt.blockNumber, false),
      ]);
      const info: EthereumRawInfo = {
        blockHash: receipt.blockHash,
        blockNumber: numberToHex(receipt.blockNumber),
        contractAddress: receipt.contractAddress || null,
        data: tx.input,
        effectiveGasPrice: tx.gasPrice,
        from: tx.from,
        to: tx.to,
        gas: numberToHex(tx.gas),
        gasUsed: numberToHex(receipt.gasUsed),
        nonce: numberToHex(tx.nonce),
        status: receipt.status,
        timestamp: toBN(block.timestamp).toNumber(),
        transactionHash: tx.hash,
        value: numberToHex(tx.value),
      };
      return info;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  getBalance(address: string): Promise<string> {
    const store = this.store();
    return this.web3.getBalance(address).then((bal) => {
      store.updateBalance(address, bal);
      return bal;
    });
  }
  getBalanceRef(address: string): Promise<Ref<string>> {
    const store = this.store();
    this.web3.getBalance(address).then((balance) => {
      store.updateBalance(address, balance);
    });
    return store.getBalance(address);
  }
  getTokenInfo = async (contractAddress: string): Promise<ERC20TokenInfo> => {
    const contract = new this.web3.Contract(erc20 as any, contractAddress);
    try {
      const results = await Promise.all([
        contract.methods.name().call(),
        contract.methods.symbol().call(),
        contract.methods.decimals().call(),
      ]);
      const name = results[0];
      const symbol = results[1];
      const decimals = results[2];
      if (isArray(name) || isArray(symbol) || isArray(decimals)) throw "";
      return {
        name,
        symbol,
        decimals: parseInt(decimals),
      };
    } catch (e) {
      return {
        name: "Unknown",
        symbol: "UNKNWN",
        decimals: 18,
      };
    }
  };
}
export default API;
