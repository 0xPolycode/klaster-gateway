import { Component, OnInit } from '@angular/core';
import { SessionQuery } from '../shared/session.query';
import { SessionService } from '../shared/storage/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
  }

  reset() {
    this.sessionService.reset()
  }

}
