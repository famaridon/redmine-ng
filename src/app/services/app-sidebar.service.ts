import {Injectable} from '@angular/core';

@Injectable()
export class AppSidebarService {

  public entries: Array<Entry> = new Array();

  constructor() {
  }

  public addEntry(label: string, id?: string): Entry {
    const entry: Entry = new Entry(id ? id : '', label);
    this.entries.push(entry);
    return entry;
  }

  public findEntry(id: string): Entry | null {
    return this.entries.find((element) => {
      return element.id === id;
    });
  }

}

export class Entry {

  public readonly label: string;
  id: string;
  icon: string;
  link: string;
  entries: Entry[];

  constructor(id: string, label: string) {
    this.id = id;
    this.label = label;
  }

}

