/// <reference path="../../typings/app.d.ts" />
import {Injectable, bind} from "angular2/angular2";
import * as Rx from "rx";
import {Todo} from "../models"

interface ItemOperation extends Function {
    (list: Todo[]): Todo[];
}

@Injectable()
export class TodoService {
    listStream: Rx.Observable<Todo[]>;
    doneListStream: Rx.Observable<Todo[]>;
    newItemStream: Rx.Subject<Todo> = new Rx.Subject<Todo>();
    updateStream: Rx.Subject<ItemOperation> = new Rx.Subject<ItemOperation>();
    addItemStream: Rx.Subject<Todo> = new Rx.Subject<Todo>();
    toBeDeletedItemStream: Rx.Subject<number> = new Rx.Subject<number>();
    deleteItemStream: Rx.Subject<number> = new Rx.Subject<number>();
    toBeToggledDoneStream: Rx.Subject<number> = new Rx.Subject<number>();
    toggleDoneStream: Rx.Subject<number> = new Rx.Subject<number>();

    constructor() {
        let initialList = [new Todo('item 1')];

        this.listStream = this.updateStream.scan(initialList, (items: Todo[], operation: ItemOperation) => {
            return operation(items);
        })
            .startWith(initialList)
            .shareReplay(1);//cache

        this.doneListStream = this.listStream.map((list:Todo[]) => {
            return list.filter((item: Todo) => {
                return item.isDone;
            })
        })

        this.addItemStream.map(
            function (item: Todo): ItemOperation {
                return (items: Todo[]) => {
                    return items.concat(item);
                }
            }
        ).subscribe(this.updateStream);

        this.newItemStream.subscribe(this.addItemStream);

        this.deleteItemStream.map(
            function (index:number): ItemOperation {
                return (items: Todo[]) => {
                    items.splice(index, 1);
                    return items;
                }
            }
        ).subscribe(this.updateStream);

        this.toBeDeletedItemStream.subscribe(this.deleteItemStream);

        this.toggleDoneStream.map(
            function (index:number): ItemOperation {
                return (items:Todo[]) => {
                    let isDone = items[index].isDone;
                    items[index].isDone = !isDone;
                    return items;
                }
            }
        ).subscribe(this.updateStream);

        this.toBeToggledDoneStream.subscribe(this.toggleDoneStream);
    }

    add(text) {
        let newItem:Todo = new Todo(text);
        this.newItemStream.onNext(newItem);
    }

    delete(index) {
        this.toBeDeletedItemStream.onNext(index);
    }

    toggleDone(index) {
        this.toBeToggledDoneStream.onNext(index);
    }
}

export var todoServiceInjectables: Array<any> = [
    bind(TodoService).toClass(TodoService)
];
