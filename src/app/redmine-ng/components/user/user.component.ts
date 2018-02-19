import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../services/beans';
import {RedmineService} from '../../services/redmine.service';
import {RealtimeService} from "../../services/realtime/realtime.service";

@Component({
  selector: 'rm-ng-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class RmNgUserComponent implements OnInit {

  @Input()
  public user: User;

  constructor(private redmine: RedmineService) {
  }

  ngOnInit() {
    if (this.user) {
      // reload user with completed datas
      this.redmine.users.find(this.user.id).subscribe((u) => {
        this.user = u;
      });
    }
  }

}
