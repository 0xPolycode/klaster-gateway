import { Injectable } from '@angular/core';
import { BigNumberish, ethers } from 'ethers';

import Onboard from '@web3-onboard/core'
import chains from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import safeModule from '@web3-onboard/gnosis'
import { RPC } from '../variables';

import { Alchemy, Network } from "alchemy-sdk";

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  readProvider = 
    new ethers.providers.JsonRpcProvider('https://ethereum-sepolia.publicnode.com', 11155111)
  
  assetsProviders = 
    [new ethers.providers.JsonRpcProvider(RPC.ethRPC, 1)]

  safe = safeModule()
  injected = injectedModule()

  wallets = [this.safe, this.injected]

  apiKey = 'sB2CDInJN_t6g0Id2SkYHG5nBycaQMK9'

  prodChains: ChainInfo[] = [
    {
      id: 1,
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: 'https://eth.llamarpc.com',
      network: Network.ETH_MAINNET
    },
    {
      id: 137,
      token: 'MATIC',
      label: 'Polygon Mainnet',
      rpcUrl: 'https://polygon.llamarpc.com',
      network: Network.MATIC_MAINNET

    },
    {
      id: 42161,
      token: 'ETH',
      label: 'Arbitrum',
      rpcUrl: 'https://arbitrum.llamarpc.com',
      network: Network.ARB_MAINNET

    },
    {
      id: 10,
      token: 'ETH',
      label: 'Optimism',
      rpcUrl: 'https://optimism.llamarpc.com',
      network: Network.OPT_MAINNET

    },
    {
      id: 8453,
      token: 'ETH',
      label: 'Base',
      rpcUrl: 'https://base.drpc.org',
      network: Network.BASE_MAINNET

    },
  ]

  testChains: ChainInfo[] = [
    {
      id: 11155111,
      token: 'SepETH',
      label: 'Seplia ETH',
      rpcUrl: 'https://endpoints.omniatech.io/v1/eth/sepolia/public',
      network: Network.ETH_SEPOLIA
    },
    {
      id: 420,
      token: 'ETH',
      label: 'Optimism Goerli',
      rpcUrl: 'https://goerli.optimism.io',
      network: Network.OPT_GOERLI
    }
  ]

  appMetadata = {
    name: 'Klaster Gateway',
    icon: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>  
    `,
    logo: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
    `,
    description: '',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' }
    ]
  }

  onboard = Onboard({
    wallets: this.wallets,
    chains: this.prodChains.map(chain => {
      return {
        id: chain.id,
        token: chain.token,
        label: chain.label,
        rpcUrl: chain.rpcUrl,
      }
    }),
  })

  constructor() { 

  }

  connectWallet() {
    return this.onboard.connectWallet()
  }

  private getKlasterProxyFactory() {
    const proxyFactory = require('../../../assets/abis/KlasterProxyFactory.json')
    return new ethers.Contract('0xe31eb0adfD645a2Fe39e3732683791738151AE11', proxyFactory, this.readProvider)
  }

  async calculateAddress(address: string, salt: string) {
    const klasterProxy = this.getKlasterProxyFactory()

    return await klasterProxy['calculateAddress'](
      address,
      salt
    )
  }

  getSDK(chainID: number) {
      const chain = this.prodChains.find(chain => chain.id === chainID)!
      return new Alchemy({
        apiKey: this.apiKey,
        network: chain.network
      })
  }

  async getPortfolio(address: string, chainID: number) {
    const sdk = this.getSDK(chainID)
    return await sdk?.core.getTokenBalances(
      address
    )
  }

  async getTokenMetadata(address: string, chainID: number) {
    const sdk = this.getSDK(chainID)
    return await sdk?.core.getTokenMetadata(address)
  }
}

interface TokenBalanceModel {
  nativeTokenBalance: string,
  result: [
    {
      address: string,
      decimals: number,
      name: string,
      quantityIn: number,
      quantityOut: number,
      symbol: string,
      totalBalance: BigNumberish
    }
  ]
}

interface ChainInfo {
  id: number,
  token: string,
  label: string,
  rpcUrl: string
  network: Network
}