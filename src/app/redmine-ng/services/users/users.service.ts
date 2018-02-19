import {Injectable} from '@angular/core';
import {AbstractRedmineService} from '../abstract.redmine.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Paginable, Status, User} from '../beans';
import {SettingsService} from '../../../services/settings.service';
import {RealtimeMessage, RealtimeListener, RealtimeService, UserStatus} from '../realtime/realtime.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UsersService extends AbstractRedmineService<User> implements RealtimeListener {

    private static readonly CURRENT_USER_ID = -255;
    private userCache: Map<number, Observable<User>> = new Map();
    private connectedUsers: BehaviorSubject<number[]>;

    constructor(http: HttpClient, settings: SettingsService, private realtimeService: RealtimeService) {
        super(http, settings);
        this.connectedUsers = new BehaviorSubject<number[]>([]);
        this.realtimeService.registerListener(this);
    }

    findCurrent(): Observable<User> {
        this.get(`/users/current`).map((data: any) => {
            const user = this.mapper(data);
            return user;
        }).subscribe((user) => {
            this.asObservable(user.id, user);
            this.findSubject(UsersService.CURRENT_USER_ID).next(user);
            this.find(user.id);
        }, (error) => {
            this.asObservable(UsersService.CURRENT_USER_ID, null);
        });

        return this.asObservable(UsersService.CURRENT_USER_ID);
    }

    find(id: number): Observable<User> {
        if (!this.userCache.has(id)) {
            this.userCache.set(id, super.find(id));
        }
        return this.userCache.get(id);
    }

    findConnected(): Observable<Paginable<number>> {
        return this.get(`/users/connected`).map((data: any) => {
            const page = new Paginable<number>(data, (element: any) => {
                return <number>element;
            });
            return page;
        });
    }

    onOpen() {
        this.findConnected().subscribe((page) => {
            this.connectedUsers.next(page.elements);
        });
    }

    onMessage(message: RealtimeMessage) {
        if (message.channel === 'userStatusChannel') {
            if (message.body === UserStatus.JOIN) {
                const users = this.connectedUsers.getValue();
                users.push(message.sender)
                this.connectedUsers.next(users);
            } else if (message.body === UserStatus.LEAVE) {
                const users = this.connectedUsers.getValue();
                if (users.indexOf(message.sender) > -1) {
                    users.splice(users.indexOf(message.sender), 1)
                }
                this.connectedUsers.next(users);
            }
            console.dir(this.connectedUsers.getValue());
        }
    }

    onClose() {
        this.connectedUsers.next([]);
    }

    getRootPath(): string {
        return 'users';
    }

    mapper(data: any): User {
        return new User(data);
    }

}
