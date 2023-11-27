import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionQuery } from 'src/app/shared/session.query';
import { TxQueueService } from './tx-queue.service';

@Component({
  selector: 'app-tx-queue',
  templateUrl: './tx-queue.component.html',
  styleUrls: ['./tx-queue.component.css']
})
export class TxQueueComponent implements OnInit {

  isTxQueueExpandedSub = new BehaviorSubject(false)
  isTxQueueExpanded$ = this.isTxQueueExpandedSub.asObservable()

  txHistory$ = this.query.ccTxHistory$
  

  constructor(private query: SessionQuery,
    private txQueueService: TxQueueService) { }

  ngOnInit(): void {
  }

  toggleTxQueue() {
    this.isTxQueueExpandedSub.next(!this.isTxQueueExpandedSub.value)
  }

}
