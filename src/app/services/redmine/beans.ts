import { Pipe, PipeTransform } from '@angular/core';

export class Paginable<T> {
  public total_count: number;
  public offset: number;
  public limit: number;

  public elements: Array<T>;
}


export class Project {

  public id: number;
  public identifier: string;

  public name: string;
  public description: string;
  public status: number;
  public is_public: boolean;
  public created_on: string; // TODO : this is a date
  public updated_on: string; // TODO : this is a date
  public parent: Project;
}


@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) {
      return [];
    }
    if(!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.name.toLowerCase().includes(searchText);
    });
  }
}
