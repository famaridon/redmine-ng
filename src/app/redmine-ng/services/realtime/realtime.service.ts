import {Injectable} from '@angular/core';
import {SettingsService} from '../../../services/settings.service';

@Injectable()
export class RealtimeService {

    private readonly X_REDMINE_API_KEY = 'X-Redmine-API-Key';

    private ws: WebSocket;

    constructor(protected settingsService: SettingsService) {
        this.settingsService.getSettings().subscribe((settings) => {
            if (settings.isValide()) {
                this.connect(settings);
            } else {
                this.disconnect();
            }
        });

    }

    private connect(settings): void {
        let wsurl;
        if (settings.server.indexOf('https') >= 0) {
            wsurl = settings.server.replace('https', 'wss');
        } else if (settings.server.indexOf('http') >= 0) {
            wsurl = settings.server.replace('http', 'ws');
        }

        this.ws = new WebSocket(`${wsurl}/ws?${this.X_REDMINE_API_KEY}=${settings.api_key}`);
        this.ws.onmessage = this.onMessage;
        this.ws.onopen = this.onOpen;
        this.ws.onclose = this.onClose;
        this.ws.onerror = this.onError;
    }

    private onMessage(ev: MessageEvent) {
        console.log(`onMessage (gitev)`);
        console.dir(ev)
    }

    private onOpen(ev: Event) {
        console.log(`onOpen (${ev})`);
    }

    private onClose(ev: CloseEvent) {
        console.log(`onClose (${ev})`);

    }

    private onError(ev: ErrorEvent) {
        console.log(`onError (${ev})`);

    }

    private disconnect() {
        if (this.ws) {
            this.ws.close(1000);
            this.ws = null;
        }
    }
}
