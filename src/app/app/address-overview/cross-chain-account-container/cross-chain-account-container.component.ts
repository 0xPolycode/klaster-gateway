import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cross-chain-account-container',
  templateUrl: './cross-chain-account-container.component.html',
  styleUrls: ['./cross-chain-account-container.component.css']
})
export class CrossChainAccountContainerComponent implements OnInit {

  @Input() wallet!: string
  @Input() isCollapsed = true

  tooltipTextSub = new BehaviorSubject("Copy address")
  tooltipText$ = this.tooltipTextSub.asObservable()

  isCollapsedSub = new BehaviorSubject(this.isCollapsed)
  isCollapsed$ = this.isCollapsedSub.asObservable()

  constructor() { }

  ngOnInit(): void {
    this.isCollapsedSub.next(this.isCollapsed)
  }

  toggleVisibility() {
    this.isCollapsedSub.next(!this.isCollapsedSub.value)
  }

  copyAddress(address: string) {
    this.tooltipTextSub.next("Copied")
    navigator.clipboard.writeText(address)
    setTimeout(() => { this.tooltipTextSub.next("Copy address") }, 500)
  }

}
