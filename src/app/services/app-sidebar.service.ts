import { Injectable } from '@angular/core';

@Injectable()
export class AppSidebarService {

  public entries: Array<Entry> = new Array();

  constructor() {
  }

  public addEntry(label: string): Entry {
    const entry: Entry = new Entry('', label);
    this.entries.push(entry);
    return entry;
  }

}

export class Entry {

  public readonly label: string;
  id: string;
  icon: string;
  public readonly links: Array<Link> = [];

  constructor(id: string, label: string) {
    this.id = id;
    this.label = label;
  }

}

export class Link {
  label: string;
  href: string;
}
