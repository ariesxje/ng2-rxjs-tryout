/**
 * Created by kx1447 on 3/12/15.
 */
import {Component, View, NgFor, NgClass, FORM_DIRECTIVES} from "angular2/angular2";
import {RxPipe} from "../util/RxPipe";
import {Todo} from "../models";

interface ItemOperation extends Function {
    (list: Todo[]): Todo[];
}

@Component({
    selector: "my-test"
})
@View({
    directives: [NgFor, NgClass, FORM_DIRECTIVES],
    styles: [`
        .done {
            text-decoration: line-through;
        }
    `],
    pipes: [RxPipe],
    template: `
    <div>
        <input type="text" [(ng-model)]="newTodo"><button on-click="add()">add</button>
        <div *ng-for="#item of listStream | rx; #index=index">
            <input type="checkbox" [(ng-model)]="item.isDone">
            <span [ng-class]="{done: item.isDone}">{{item.text}}</span>
            <a href="#" on-click="delete(index)">x</a>
        </div>
    </div>
    `
})

export class MyTest {
    newTodo: string;
    list: Todo[] = [];
    listStream: Rx.Observable<Todo[]>;
    newItemStream: Rx.Subject<Todo> = new Rx.Subject<Todo>();
    updateStream: Rx.Subject<any> = new Rx.Subject<any>();
    addItemStream: Rx.Subject<Todo> = new Rx.Subject<Todo>();
    existingItemStream: Rx.Subject<number> = new Rx.Subject<number>();
    deleteItemStream: Rx.Subject<number> = new Rx.Subject<number>();
    constructor() {
        this.newTodo = "";
        this.list = [new Todo('item 1')];
    }

    onInit(): void {
        this.listStream = this.updateStream.scan(this.list, (items: Todo[], operation: ItemOperation) => {
            return operation(items);
        }).startWith(this.list);

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

    add() {
        let newItem:Todo = new Todo(String(this.newTodo));
        console.log(newItem);
        this.newItemStream.onNext(newItem);
        this.newTodo = "";
    }

    delete(index) {
        this.existingItemStream.onNext(index);
    }
}
