import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../blockchain/transaction.service';

@Component({
  selector: 'app-transaction-modals',
  templateUrl: './transaction-modals.component.html',
  styleUrls: ['./transaction-modals.component.css']
})
export class TransactionModalsComponent implements OnInit {
  
  txState$ = this.txService.txState$

  constructor(private txService: TransactionService) { }

  ngOnInit(): void {
  }

  minimizeTx() {
    this.txService.setTransactionState('minimized')
  }

}
