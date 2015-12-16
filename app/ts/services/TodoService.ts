import {Injectable, bind} from "angular2/angular2";
import * as Rx from "rx";
import {Todo} from "../models"

interface ItemOperation extends Function {
    (list: Todo[]): Todo[];
}

@Injectable()
export class TodoService {
    list: Todo[] = [];
    listStream: Rx.Observable<Todo[]>;
    newItemStream: Rx.Subject<Todo> = new Rx.Subject<Todo>();
    updateStream: Rx.Subject<any> = new Rx.Subject<any>();
    addItemStream: Rx.Subject<Todo> = new Rx.Subject<Todo>();
    existingItemStream: Rx.Subject<number> = new Rx.Subject<number>();
    deleteItemStream: Rx.Subject<number> = new Rx.Subject<number>();

    constructor() {
        this.list = [new Todo('item 1')];

        this.listStream = this.updateStream.scan(this.list, (items: Todo[], operation: ItemOperation) => {
            return operation(items);
        })
            .startWith(this.list)
            .shareReplay(1);//cache

        this.addItemStream.map(
            function (item: Todo): ItemOperation {
                return (items: Todo[]) => {
                    return items.concat(item);
                }
            }
        )
            .subscribe(this.updateStream);

        this.newItemStream.subscribe(this.addItemStream);

        this.deleteItemStream.map(
            function (index:number): ItemOperation {
                return (items: Todo[]) => {
                    items.splice(index, 1);
                    return items;
                }
            }
        ).subscribe(this.updateStream);

        this.existingItemStream.subscribe(this.deleteItemStream);
    }

    add(text) {
        let newItem:Todo = new Todo(text);
        this.newItemStream.onNext(newItem);
    }

    delete(index) {
        this.existingItemStream.onNext(index);
    }
}

export var todoServiceInjectables: Array<any> = [
    bind(TodoService).toClass(TodoService)
];
