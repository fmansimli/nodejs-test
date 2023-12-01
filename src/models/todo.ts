export class Todo {
  public _id?: string;
  public title: string;
  public completed: boolean;
  public createdAt = new Date();
  public updatedAt: Date;

  constructor(attrs: Partial<Todo>) {
    Object.assign(this, attrs);
  }
}
