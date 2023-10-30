import { Injectable } from '@angular/core';
import { Chainlink } from 'dev3-sdk';
import { RPC } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class PriceFeedService {

  constructor() { }

  async getPrice() {
    return ''
  }
}
