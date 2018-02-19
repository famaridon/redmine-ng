import {Injectable} from '@angular/core';
import {SettingsService} from '../../../services/settings.service';

@Injectable()
export class RealtimeService {

    private readonly X_REDMINE_API_KEY = 'X-Redmine-API-Key';

    private ws: WebSocket;

    private statusListener: StatusListener = new StatusListener();

    private listeners: RealtimeListener[] = [];

    constructor(protected settingsService: SettingsService) {
        this.registerListener(this.statusListener);
        this.registerListener(new LogListener());
        this.reconnect();
    }

    private reconnect() {
        this.settingsService.getSettings().subscribe((settings) => {
            if (settings.isValide()) {
                this.connect(settings);
            } else {
                this.disconnect();
            }
        });
    }

    public registerListener(listener: RealtimeListener) {
        this.listeners.push(listener)
    }

    private connect(settings): void {
        let wsurl;
        if (settings.server.indexOf('https') >= 0) {
            wsurl = settings.server.replace('https', 'wss');
        } else if (settings.server.indexOf('http') >= 0) {
            wsurl = settings.server.replace('http', 'ws');
        }

        console.debug(`ws try to  connect to ${wsurl}`);

        this.ws = new WebSocket(`${wsurl}/ws?${this.X_REDMINE_API_KEY}=${settings.api_key}`);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onerror = this.onError.bind(this);
    }

    private onMessage(ev: MessageEvent) {
        this.listeners.forEach((l) => {
            l.onMessage(JSON.parse(ev.data));
        });
    }

    private onOpen(ev: Event) {
        this.listeners.forEach((l) => {
            l.onOpen();
        });
    }

    private onClose(ev: CloseEvent) {
        this.listeners.forEach((l) => {
            l.onClose();
        });
        // Try to reconnect in 5 seconds
        setTimeout(() => {
            this.reconnect()
        }, 5000);

    }

    private onError(ev: ErrorEvent) {
        console.debug(`onError (${ev})`);
    }

    private disconnect() {
        if (this.ws) {
            this.ws.close(1000);
            this.ws = null;
        }
    }
}

export interface RealtimeListener {
    onOpen();

    onMessage(message: RealtimeMessage);

    onClose();
}

export class RealtimeMessage {
    public sender: number;
    public channel: Channel;
    public body: any;
}

export class StatusListener implements RealtimeListener {

    private status: UserStatus = UserStatus.DISCONNECTED;

    onOpen() {
        this.status = UserStatus.CONNECTED;
    }

    onMessage(message: RealtimeMessage) {
    }

    onClose() {
        this.status = UserStatus.DISCONNECTED;
    }

    public getStatus(): UserStatus {
        return this.status;
    }

}

export class LogListener implements RealtimeListener {

    onOpen() {
        console.debug('ws connected');
    }

    onMessage(message: RealtimeMessage) {
        console.debug(`message ${message}`);
    }

    onClose() {
        console.debug('ws disconnected');
    }
}

type Channel = 'userStatusChannel' | 'issues';
export enum UserStatus {
    JOIN = 'JOIN',
    LEAVE = 'LEAVE',
    CONNECTED = 'CONNECTED',
    DISCONNECTED = 'DISCONNECTED'
}
