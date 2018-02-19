import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../services/beans';
import {RedmineService} from '../../../../services/redmine.service';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'rm-ng-user-avatar',
    templateUrl: './user-avatar.component.html',
    styleUrls: ['./user-avatar.component.css']
})
export class RmNgUserAvatarComponent implements OnInit {

    public _user: User;

    constructor(private redmine: RedmineService) {
    }

    ngOnInit() {
    }

    @Input()
    set user(user: User) {
        this._user = user;
    }

    isConnected(): Observable<boolean> {
        return this.redmine.users.findConnected().map((page) => {
            return page.elements.indexOf(this._user.id) >= 0;
        });
    }
}
