import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../services/beans';
import {RedmineService} from '../../../../services/redmine.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from "rxjs/Subject";

@Component({
    selector: 'rm-ng-user-avatar',
    templateUrl: './user-avatar.component.html',
    styleUrls: ['./user-avatar.component.css']
})
export class RmNgUserAvatarComponent implements OnInit {

    public _user: User;

    @Input()
    public withFullName = false;

    @Input()
    set user(user: User) {
        this.redmine.users.find(user.id).subscribe((u) => {
            this._user = u;
        });
    }

    constructor(private redmine: RedmineService) {
    }

    ngOnInit() {
    }

    isConnected(): Observable<boolean> {
        return this.redmine.users.findConnected().map((page) => {
            return page.elements.indexOf(this._user.id) >= 0;
        });
    }
}
