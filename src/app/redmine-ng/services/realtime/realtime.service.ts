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

        this.ws = new WebSocket(`${wsurl}/ws?${this.X_REDMINE_API_KEY}=${settings.api_key}`);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onerror = this.onError.bind(this);
    }

    private onMessage(ev: MessageEvent) {
        this.listeners.forEach((l) => {
            l.onMessage(ev.data);
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

    }

    private onError(ev: ErrorEvent) {
        console.error(`onError (${ev})`);

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

    onMessage(message: Message);

    onClose();
}

export class Message {
    public author: number;
    public channel: string;
    public body: any;
}

export class StatusListener implements RealtimeListener {

    private status: Status = Status.DISCONECTED;

    onOpen() {
        this.status = Status.CONNECTED;
    }

    onMessage(message: Message) {
    }

    onClose() {
        this.status = Status.DISCONECTED;
    }

    public getStatus(): Status {
        return this.status;
    }

}

export class LogListener implements RealtimeListener {

    private status: Status = Status.DISCONECTED;

    onOpen() {
        console.debug('ws connected');
    }

    onMessage(message: Message) {
        console.debug(`message ${message}`);
    }

    onClose() {
        console.debug('ws disconnected');
    }

    public getStatus(): Status {
        return this.status;
    }

}

enum Status {
    CONNECTED,
    DISCONECTED
}
