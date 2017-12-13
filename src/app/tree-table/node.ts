export class Node<T> {

  public id: string;
  public element: T;
  public children: Node<T>[];
  public status: 'expended' | 'colapsed' = 'expended';

  constructor(element: T) {
    this.element = element;
    this.children = [];
  }

  public switchMode() {
    this.status = this.status === 'expended' ? 'colapsed' : 'expended';
  }

}
