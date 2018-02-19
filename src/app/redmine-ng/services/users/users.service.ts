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
    private connectedUsers: BehaviorSubject<Paginable<number>>;

    constructor(http: HttpClient, settings: SettingsService, private realtimeService: RealtimeService) {
        super(http, settings);
        const empty = new Paginable<number>(
            {
                total_count: 0,
                offset: 0,
                limit: 0,
                elements: []
            }, (element: any) => {
                return <number>element;
            });
        this.connectedUsers = new BehaviorSubject<Paginable<number>>(empty);
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
        return this.connectedUsers.asObservable();
    }

    onOpen() {
        this.get(`/users/connected`).map((data: any) => {
            const page = this.connectedUsers.getValue();
            page.offset = data.offset;
            page.total_count = data.total_count;
            page.limit = data.limit;
            page.elements = data.elements;
            return page;
        }).subscribe((page) => {
            this.connectedUsers.next(page);
        });
    }

    onMessage(message: RealtimeMessage) {
        if (message.channel === 'userStatusChannel') {
            if (message.body === UserStatus.JOIN) {
                const page = this.connectedUsers.getValue();
                page.elements.push(message.sender)
                this.connectedUsers.next(page);
            } else if (message.body === UserStatus.LEAVE) {
                const page = this.connectedUsers.getValue();
                if (page.elements.indexOf(message.sender) > -1) {
                    page.elements.splice(page.elements.indexOf(message.sender), 1);
                    this.connectedUsers.next(page);
                }
            }
            console.dir(this.connectedUsers.getValue());
        }
    }

    onClose() {
    }

    getRootPath(): string {
        return 'users';
    }

    mapper(data: any): User {
        return new User(data);
    }

}
