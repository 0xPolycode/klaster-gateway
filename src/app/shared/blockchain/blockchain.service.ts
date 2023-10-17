import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

import Onboard from '@web3-onboard/core'
import chains from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import safeModule from '@web3-onboard/gnosis'

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  readProvider = new ethers.providers.JsonRpcProvider('https://ethereum-sepolia.publicnode.com', 11155111)  

  safe = safeModule()

  wallets = [this.safe]

  chains = [
    {
      id: 1,
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: 'https://eth.llamarpc.com'
    },
    {
      id: 137,
      token: 'MATIC',
      label: 'Polygon Mainnet',
      rpcUrl: 'https://polygon.llamarpc.com'
    },
    {
      id: 43114,
      token: 'AVAX',
      label: 'Avalanche C-Chain',
      rpcUrl: 'https://avalanche.drpc.org'
    },
    {
      id: 42161,
      token: 'ETH',
      label: 'Arbitrum',
      rpcUrl: 'https://arbitrum.llamarpc.com'
    },
    {
      id: 10,
      token: 'ETH',
      label: 'Optimism',
      rpcUrl: 'https://optimism.llamarpc.com'
    },
    {
      id: 56,
      token: 'BSC',
      label: 'Binance Smart Chain',
      rpcUrl: 'https://binance.llamarpc.com'
    },
    {
      id: 8453,
      token: 'ETH',
      label: 'Base',
      rpcUrl: 'https://base.drpc.org'
    },
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
    chains: this.chains,
  })

  constructor() { }

  connectWallet() {
    this.onboard.connectWallet().then(wall => {
      
    })
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
}
