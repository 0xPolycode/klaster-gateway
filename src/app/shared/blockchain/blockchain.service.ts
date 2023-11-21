import { Injectable } from '@angular/core';
import { BigNumber, BigNumberish, ethers } from 'ethers';

import Onboard from '@web3-onboard/core'
import chains from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import safeModule from '@web3-onboard/gnosis'
import { ChainSelectors, RPC, logoSvg } from '../variables';

import { Alchemy, Network } from "alchemy-sdk";
import { formatBytes32String } from 'ethers/lib/utils';
import { BehaviorSubject, combineLatest, from, map, of, switchMap, tap } from 'rxjs';
import { SessionQuery } from '../session.query';
import { SessionService } from '../storage/session.service';
import SafeAppsSDK from '@safe-global/safe-apps-sdk/dist/src/sdk';
import { SafeAppProvider } from '@safe-global/safe-apps-provider';

const PROVIDER_STORAGE_ID = "io.klaster.gateway.provider-storage-id-key"

const KLASTER_SINLGETON_TESTNET_ADDRESS = '0x1096998f9531DE5cbF43A772dCa38c17E7F7dFD1'
const KLASTER_SINLGETON_MAINNET_ADDRESS = '0xef3c8e083De1AE85afecdAf5D6AbC15427f5AbcB'

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {


  safeSDK = new SafeAppsSDK()

  private connectedProviderSub = new BehaviorSubject<ethers.providers.Web3Provider | null>(null)
  connectedProvider$ = this.connectedProviderSub.asObservable().pipe(
    tap(provider => {
      provider?.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
            window.location.reload();
        }
    });
    })
  )

  address$ = this.connectedProvider$.pipe(
    switchMap(provider => {
      if(!provider) return of(null)
      return from(provider!.send('eth_requestAccounts', []))
    }),
    map(accounts => {
      return accounts?.at(0) as string | null | undefined
    })
  )

  safe = safeModule()
  injected = injectedModule()

  safeInfo$ = from(this.safeSDK.safe.getInfo())

  connectedNetworkChainID$ = this.connectedProvider$.pipe(
    switchMap(provider => {
      return provider?.network.chainId ? 
        of(provider.network.chainId) : 
        this.safeInfo$.pipe(map(info => info.chainId))
    })
  )

  isInSafe$ = this.safeInfo$.pipe(
    map(info => {
      return info.chainId
    })
  )

  gasBalance$ = combineLatest([
    this.connectedProvider$,
    from(this.getAddress())
  ]).pipe(
    switchMap(([provider, address]) => {
      return provider ? 
        from(provider.getBalance(address)) : of(null)
    })
  )

  wallets = [this.safe, this.injected]

  apiKey = 'sB2CDInJN_t6g0Id2SkYHG5nBycaQMK9'

  prodChains: ChainInfo[] = [
    {
      id: 1,
      token: 'ETH',
      label: 'Ethereum',
      rpcUrl: RPC.ethRPC!,
      network: Network.ETH_MAINNET,
      logoUri: 'ethereum.svg',
      selector: ChainSelectors.ETH
    },
    {
      id: 137,
      token: 'MATIC',
      label: 'Polygon',
      rpcUrl: RPC.maticRPC!,
      network: Network.MATIC_MAINNET,
      logoUri: 'matic.svg',
      selector: ChainSelectors.MATIC
    },
    {
      id: 42161,
      token: 'ETH',
      label: 'Arbitrum',
      rpcUrl: RPC.arbRPC!,
      network: Network.ARB_MAINNET,
      logoUri: 'arbitrum.svg',
      selector: ChainSelectors.ARB
    },
    {
      id: 10,
      token: 'ETH',
      label: 'Optimism',
      rpcUrl: RPC.opRPC!,
      network: Network.OPT_MAINNET,
      logoUri: 'optimism.svg',
      selector: ChainSelectors.OP
    },
    {
      id: 8453,
      token: 'ETH',
      label: 'Base',
      rpcUrl: RPC.baseRPC!,
      network: Network.BASE_MAINNET,
      logoUri: 'base.svg',
      selector: ChainSelectors.BASE
    },
  ]

  readProviders = this.prodChains.map(chain => {
    return new ethers.providers.JsonRpcProvider(chain.rpcUrl, chain.id)
  })

  testChains: ChainInfo[] = [
    {
      id: 11155111,
      token: 'SepETH',
      label: 'Seplia ETH',
      rpcUrl: 'https://radial-broken-spring.ethereum-sepolia.quiknode.pro/76fbf006752985130ff77d32d2284d2356438b61/',
      network: Network.ETH_SEPOLIA,
      selector: ChainSelectors.SEPETH
    }
  ]

  chains = this.prodChains

  appMetadata = {
    name: 'Klaster Gateway',
    icon: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>  
    `,
    logo: logoSvg,
    description: 'Klaster enables any wallet to create cross-chain accounts',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' }
    ]
  }

  onboard = Onboard({
    wallets: this.wallets,
    appMetadata: this.appMetadata,
    chains: this.chains.map(chain => {
      return {
        id: chain.id,
        token: chain.token,
        label: chain.label,
        rpcUrl: chain.rpcUrl,
      }
    }),
  })

  constructor(private query: SessionQuery, private sessionService: SessionService) { 
  }

  logOut() {
    this.sessionService.setLogin(false)
    this.connectedProviderSub.next(null)
  }

  async getAddress() {
    const accounts = await this.connectedProviderSub.value?.send('eth_requestAccounts', [])
    return accounts?.at(0)
  }

  connectWallet() {
    const walletPromise = this.onboard.connectWallet()
    walletPromise.then(res => {
      this.connectedProviderSub.next(new ethers.providers.Web3Provider(res[0].provider))
      this.sessionService.setLogin(true)
    })
    return walletPromise
  }

  getKlasterSingletonSigner() {
    const providerOrSigner = this.connectedProviderSub.value?.getSigner()
    const proxyFactory = require('../../../assets/abis/KlasterGatewaySingleton.json')
    if(!providerOrSigner) { return null }
    return new ethers.Contract(
      KLASTER_SINLGETON_MAINNET_ADDRESS, 
      proxyFactory, 
      providerOrSigner ?? undefined)
  }

  private getKlasterSingletonForNetwork(provider: ethers.providers.Provider) {
    const signleton = require('../../../assets/abis/KlasterGatewaySingleton.json')
    return new ethers.Contract(
      KLASTER_SINLGETON_MAINNET_ADDRESS,
      signleton,
      provider
    )
  }

  setNetworkToSepolia() {
    const provider = this.connectedProviderSub.value?.provider
    if(!provider?.request) { return }
    
    provider.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: ethers.utils.hexlify(this.testChains[0].id),
        rpcUrls: [this.testChains[0].rpcUrl],
        chainName: 'Eth Sepolia',
        nativeCurrency: {
          name: 'SepETH',
          symbol: 'ETH',
          decimals: 18
        },
        blockExplorerUrls: ['https://sepolia.etherscan.io/']
      }]
    })
  }

  async calculateAddress(address: string, salt: string) {
    const klasterProxy = this.getKlasterSingletonSigner()
    if(!klasterProxy) { return }
    return await klasterProxy['calculateAddress'](
      address,
      salt
    )
  }

  getSDK(chainID: number) {
      const chain = this.chains.find(chain => chain.id === chainID)
      if(!chain) { return null }
      return new Alchemy({
        apiKey: this.apiKey,
        network: chain.network
      })
  }

  async getPortfolio(address: string, chainID: number) {
    if(!address) { return }
    const sdk = this.getSDK(chainID)
    const tokenBalances = await sdk?.core.getTokenBalances(
      address
    )
    return {...tokenBalances, tokenBalances: tokenBalances?.tokenBalances.map(balance => {
      return {...balance, chainID: chainID}
    })}
  }

  async getTokenMetadata(address: string, chainID: number) {
    const sdk = this.getSDK(chainID)
    return await sdk?.core.getTokenMetadata(address)
  }

  // NOTE: If the user has deployed the contract through some other method (not)
  // this frontend, then this method cannot be used to derive the "next" salt.
  async getNextDeploymentSalt() {
    const klaster = this.getKlasterSingletonSigner()
    if(!klaster) { alert("No contract"); return }
    const address = await this.getAddress()
    const accounts = await klaster['getDeployedWallets'](address) as string[]
    return accounts.length ?? 0
  }

  async getDeployedWallets() {
    const klaster = this.getKlasterSingletonSigner()
    const address = await this.getAddress()
    if(!address) { return [] }
    if(!klaster) { return }
    return await klaster['getDeployedWallets'](address) as string[]
  }

  async calculateDeploymentFee(selectedChains: string[], salt: string) {
    const klaster = this.getKlasterSingletonSigner()
    const address = await this.getAddress()
    if(!address) { alert("No address"); return 0 }
    if(!klaster) { alert("No contract"); return 0 }
    return await klaster['calculateExecuteFee'](
      await address,
      selectedChains,
      salt,
      await address,
      0,
      [],
      BigNumber.from("2000000"),
      formatBytes32String("")
    )
  }

  async checkDeploymentStatusForNetwork(chainID: number, address: string) {
    const readProvider = this.readProviders.find(provider => provider.network.chainId === chainID)
    if(!readProvider) { alert(`Provider not found for network ${chainID}`); return null }
    const klaster = this.getKlasterSingletonForNetwork(readProvider)

    const connectedWallet = await this.getAddress()

    const wallets = await klaster['getDeployedWallets'](connectedWallet) as string[]

    return wallets.includes(address)
  }

  async executeContractDeployments(selectedChains: string[], salt: string, fee: string) {
    const klaster = this.getKlasterSingletonSigner()
    if(!klaster) { return }
    return await klaster['execute'](
      selectedChains,
      salt,
      await this.getAddress(),
      0,
      [],
      BigNumber.from("2000000"),
      formatBytes32String(""),
      {
        value: BigNumber.from(fee)
      }
    )
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
  network: Network,
  logoUri?: string
  selector: string
}