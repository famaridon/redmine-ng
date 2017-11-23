import {Pipe, PipeTransform} from '@angular/core';

export class Paginable<T> {
  public total_count: number;
  public offset: number;
  public limit: number;

  public elements: Array<T>;
}

export abstract class AbstractRedmineBean {
  public id: number;
  public name: string;
}

export class Project extends AbstractRedmineBean {
  public identifier: string;
  public description: string;
  public status: number;
  public is_public: boolean;
  public created_on: Date; // TODO : this is a date
  public updated_on: Date; // TODO : this is a date
  public parent: Project;
}

export class Query extends AbstractRedmineBean {
  public is_public: boolean;
  public project_id: number;
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
  public custom_fields: CustomField[];
  public created_on: string;
  public updated_on: string;
}

export class CustomField extends AbstractRedmineBean {
  public value: string;
}

export class User extends AbstractRedmineBean {
  public login: string;
  public firstname: string;
  public lastname: string;
  public mail: string;
  public created_on: string;
  public last_login_on: string;
  public api_key: string;
  public custom_fields: CustomField[];
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
