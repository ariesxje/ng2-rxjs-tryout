/**
 * Created by kx1447 on 3/12/15.
 */
import {Component, View, NgFor, NgClass, FORM_DIRECTIVES} from "angular2/angular2";
import {RxPipe} from "../util/RxPipe";
import {Todo} from "../models";
import {TodoService} from "../services/services";

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
    listStream: Rx.Observable<Todo[]>;
    constructor(public todoService: TodoService) {
        this.newTodo = "";
        this.listStream = todoService.listStream;
    }

    add() {
        let newItem:string = String(this.newTodo);
        this.todoService.add(newItem);
        this.newTodo = "";
    }

    delete(index) {
        this.todoService.delete(index);
    }
}
