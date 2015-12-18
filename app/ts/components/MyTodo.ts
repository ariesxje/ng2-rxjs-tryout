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
        <div style="display: inline-block; vertical-align: top; width: 50%">
            <h3>My TODO List</h3>
            <input type="text" [(ng-model)]="newTodo" (keydown.enter)="add()"><button on-click="add()">add</button>
            <div *ng-for="#item of listStream | rx; #index=index">
                <input type="checkbox" [(ng-model)]="item.isDone">
                <span style="cursor: pointer" [ng-class]="{done: item.isDone}" (click)="toggleDone(index)">{{item.text}}</span>
                <a href="#" on-click="delete(index)">x</a>
            </div>
        </div><!--
        !--><div style="display: inline-block; vertical-align: top; width: 50%">
            <h3>Done</h3>
            <div *ng-for="#item of doneListStream | rx">
                <span>{{item.text}}</span>
            </div>
        </div>
    </div>
    `
})

export class MyTodo {
    newTodo: string;
    listStream: Rx.Observable<Todo[]>;
    doneListStream: Rx.Observable<Todo[]>;
    constructor(public todoService: TodoService) {
        this.newTodo = "";
        this.listStream = todoService.listStream;
        this.doneListStream = todoService.doneListStream;
    }

    add() {
        if (this.newTodo) {
            let newItem:string = String(this.newTodo);
            this.todoService.add(newItem);
            this.newTodo = "";
        }
    }

    delete(index) {
        this.todoService.delete(index);
    }

    toggleDone(index) {
        this.todoService.toggleDone(index);
    }
}
