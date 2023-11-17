import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiscModalsServiceService {

  private deployCrossChainModalVisibleSub = new BehaviorSubject(false)
  deployCrossChainModalVisible$ = this.deployCrossChainModalVisibleSub.asObservable()

  openDeployModal() {
    this.deployCrossChainModalVisibleSub.next(true)
  }

  dismissDeployModal() {
    this.deployCrossChainModalVisibleSub.next(false)
  }

  constructor() { }
}
