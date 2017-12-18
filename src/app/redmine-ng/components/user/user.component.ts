import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../services/beans';

@Component({
  selector: 'rm-ng-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class RmNgUserComponent implements OnInit {

  @Input()
  public user: User;

  constructor() { }

  ngOnInit() {
  }

}
