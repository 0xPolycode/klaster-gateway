import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  provider = new ethers.providers.JsonRpcProvider('https://ethereum-sepolia.publicnode.com', 11155111)  

  constructor() { }

  private getKlasterProxyFactory() {
    const proxyFactory = require('../../../assets/abis/KlasterProxyFactory.json')
    return new ethers.Contract('0xe31eb0adfD645a2Fe39e3732683791738151AE11', proxyFactory, this.provider)
  }

  async calculateAddress(address: string, salt: string) {
    const klasterProxy = this.getKlasterProxyFactory()

    return await klasterProxy['calculateAddress'](
      address,
      salt
    )
  }
}
