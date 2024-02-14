import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { ErrorService } from 'src/app/shared/error.service';

@Component({
  selector: 'app-cross-chain-transfer',
  templateUrl: './cross-chain-transfer.component.html',
  styleUrls: ['./cross-chain-transfer.component.css'],
})
export class CrossChainTransferComponent implements OnInit {
  networks = this.blockchainService.chains;

  // UI Element Togglers
  sourceChainSelectorToggledSub = new BehaviorSubject(false);
  sourceChainSelectorToggled$ =
    this.sourceChainSelectorToggledSub.asObservable();

  destChainSelectorToggledSub = new BehaviorSubject(false);
  destChainSelectorToggled$ = this.destChainSelectorToggledSub.asObservable();

  tokenSelectorToggledSub = new BehaviorSubject(false);
  tokenSelectorToggled$ = this.tokenSelectorToggledSub.asObservable();
  //

  sourceChainSub = new BehaviorSubject(this.networks.at(0));
  sourceChain$ = this.sourceChainSub
    .asObservable()
    .pipe(tap((_) => this.sourceChainSelectorToggledSub.next(false)));

  destChainSub = new BehaviorSubject(this.networks.at(0));
  destChain$ = this.destChainSub
    .asObservable()
    .pipe(tap((_) => this.destChainSelectorToggledSub.next(false)));

  tokens = [
    { name: 'ccToken', symbol: 'CCT', address: "1" },
    { name: 'USD Coin', symbol: 'USDC', address: "2" },
    { name: 'Dai', symbol: 'DAI', address: "3" },
    { name: 'AAVE', symbol: 'AAVE', address: "4" },
    { name: 'Curve Finance', symbol: 'CRV', address: "5" },
  ];

  selectedTokenSub = new BehaviorSubject(this.tokens.at(0))
  selectedToken$ = this.selectedTokenSub.asObservable().pipe(
    tap(_ => this.tokenSelectorToggledSub.next(false))
  )

  constructor(
    private blockchainService: BlockchainService,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {}

  toggleSourceChainSelector() {
    this.sourceChainSelectorToggledSub.next(
      !this.sourceChainSelectorToggledSub.value,
    );
  }

  toggleDestChainSelector() {
    this.destChainSelectorToggledSub.next(
      !this.destChainSelectorToggledSub.value,
    );
  }

  toggleTokenSelector() {
    this.tokenSelectorToggledSub.next(!this.tokenSelectorToggledSub.value);
  }

  selectChain(type: 'source' | 'dest', chainId: number) {
    const chain = this.networks.find((chain) => chainId === chain.id);
    if (!chain) {
      this.errorService.showSimpleError(
        'Klaster app error: Unsupported chain selected. Please contact team',
      );
    }
    type === 'source'
      ? this.sourceChainSub.next(chain)
      : this.destChainSub.next(chain);
  }

  selectToken(tokenAddress: string) {
    const token = this.tokens.find(token => token.address == tokenAddress)
    if(!token) {
      this.errorService.showSimpleError(
        'Klaster app error: Token not detected. Please contact team'
      )
    }
    this.selectedTokenSub.next(token)
  }
}
