import {Pipe, PipeTransform} from '@angular/core';
import {IOption} from '../../states-inputs/states-inputs.module';

export class Paginable<T> {
  public total_count: number;
  public offset: number;
  public limit: number;

  public elements: Array<T> = [];

  constructor(json: any, elementAttribut: string, caster: (element) => T) {
    this.total_count = json.total_count;
    this.offset = json.offset;
    this.limit = json.limit;
    if (json[elementAttribut]) {
      json[elementAttribut].forEach((element) => {
        this.elements.push(caster(element));
      });
    }
  }
}

export abstract class AbstractRedmineBean implements IOption {

  public id: number;
  public name: string;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
  }

  getDisplayLabel(): string {
    return this.name;
  }

  getComparableValue() {
    return this.id;
  }

  protected parseDate(sDate: string | undefined): Date {
    if (sDate) {
      return new Date(sDate);
    }
    return null;
  }

  public stringify(): string {
    return JSON.stringify(this);
  }
}

export class Project extends AbstractRedmineBean {
  public identifier: string;
  public description: string;
  public status: number;
  public is_public: boolean;
  public created_on: Date;
  public updated_on: Date;
  public parent: Project;

  constructor(json: any) {
    super(json);
    this.identifier = json.identifier;
    this.description = json.description;
    this.is_public = json.is_public;
    this.created_on = this.parseDate(json.created_on);
    this.updated_on = this.parseDate(json.updated_on);

    if (json.parent) {
      this.parent = new Project(json.parent);
    }
  }
}

export class Query extends AbstractRedmineBean {
  public is_public: boolean;
  public project_id: number;

  constructor(json: any) {
    super(json);
    this.is_public = json.is_public;
    this.project_id = json.project_id;
  }
}

export class Issue extends AbstractRedmineBean {

  public project: Project;
  public tracker: Tracker;
  public status: Status;
  public priority: Priority;
  public author: User;
  public category: Category;
  public fixed_version: Version;
  public parent: Issue;
  public subject: string;
  public description: string;
  public start_date: Date;
  public due_date: Date;
  public done_ratio: number;
  public custom_fields: CustomField[] = [];
  public created_on: Date;
  public updated_on: Date;

  constructor(json: any) {
    super(json);
    if (json.project) {
      this.project = new Project(json.project);
    }
    this.tracker = new Tracker(json.tracker);
    this.status = new Status(json.status);
    this.priority = new Priority(json.priority);
    this.author = new User(json.author);
    this.category = new Category(json.category);
    this.fixed_version = new Version(json.fixed_version);
    if (json.parent) {
      this.parent = new Issue(json.parent);
    }
    this.subject = json.subject;
    this.description = json.description;
    this.start_date = this.parseDate(json.start_date);
    this.due_date = this.parseDate(json.due_date);
    this.done_ratio = json.done_ratio;
    if (json.custom_fields) {
      json.custom_fields.forEach((value) => {
        this.custom_fields.push(new CustomField(value));
      });
    }

    this.created_on = this.parseDate(json.created_on);
    this.updated_on = this.parseDate(json.updated_on);
  }
}

export class CustomField extends AbstractRedmineBean {
  public value: string;

  constructor(json: any) {
    super(json);
    this.value = json.value;
  }
}

export class User extends AbstractRedmineBean {
  public login: string;
  public firstname: string;
  public lastname: string;
  public mail: string;
  public created_on: Date;
  public last_login_on: Date;
  public api_key: string;
  public custom_fields: CustomField[] = [];

  constructor(json: any) {
    super(json);
    this.login = json.login;
    this.firstname = json.firstname;
    this.lastname = json.lastname;
    this.mail = json.mail;
    this.created_on = this.parseDate(json.created_on);
    this.last_login_on = this.parseDate(json.last_login_on);
    this.api_key = json.api_key;
    if (json.custom_fields) {
      json.custom_fields.forEach((value) => {
        this.custom_fields.push(new CustomField(value));
      });
    }
  }

}

export class Tracker extends AbstractRedmineBean {

}

export class Status extends AbstractRedmineBean {

}

export class Priority extends AbstractRedmineBean {

}

export class Category extends AbstractRedmineBean {

}

export class Version extends AbstractRedmineBean {

}


@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.name.toLowerCase().includes(searchText);
    });
  }
}
