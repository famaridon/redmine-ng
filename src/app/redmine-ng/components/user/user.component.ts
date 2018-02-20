import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../services/beans';
import {RedmineService} from '../../services/redmine.service';
import {SiSelectComponent} from '../../../states-inputs/components/si-select/si-select.component';
import {Observable} from 'rxjs/Observable';
import {zip} from 'rxjs/observable/zip';
import {Subject} from 'rxjs/Subject';

@Component({
    selector: 'rm-ng-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class RmNgUserComponent extends SiSelectComponent<User> implements OnInit {

    @Input()
    public project_id: number;

    @Input()
    set user(user: User) {
        this.value = user;
    };

    constructor(private redmine: RedmineService) {
        super();
        this.isAsync = true;
    }

    load(): Observable<User[]> {
        const subject = new Subject<User[]>();
        const membershipPage = this.redmine.projects.findMembershipsByIdAndPermission(this.project_id, 'edit_issues');
        membershipPage.subscribe((page) => {
            const members = page.elements;
            const users$ = new Array<Observable<User>>();
            members.forEach((memeber) => {
                if (memeber.user) {
                    // TODO : don't support group
                    // users$.push(this.redmine.users.find(memeber.user.id));
                    users$.push(this.redmine.users.find(memeber.user.id).filter((u) => {
                            return u !== null;
                        }
                    ));
                }
            });
            return zip(...users$).subscribe((results) => {
                console.dir(results);
                subject.next(results);
            });
        });
        return subject.asObservable();
    }

    ngOnInit() {
        if (this.value) {
            // reload user with completed datas
            this.redmine.users.find(this.value.id).subscribe((u) => {
                this.value = u;
            });
        }
    }

}
