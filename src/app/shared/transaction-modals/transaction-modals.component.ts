import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../blockchain/transaction.service';

@Component({
  selector: 'app-transaction-modals',
  templateUrl: './transaction-modals.component.html',
  styleUrls: ['./transaction-modals.component.css']
})
export class TransactionModalsComponent implements OnInit {
  
  txIsProcessing$ = this.txService.transactionCurrentlyProcessing$

  constructor(private txService: TransactionService) { }

  ngOnInit(): void {
  }

}
