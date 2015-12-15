/**
 * Created by kx1447 on 3/12/15.
 */
import {Component, View, NgFor, FORM_DIRECTIVES} from "angular2/angular2";
import {RxPipe} from "../util/RxPipe";

interface ItemOperation extends Function {
    (list: string[]): string[];
}

@Component({
    selector: "my-test"
})
@View({
    directives: [NgFor, FORM_DIRECTIVES],
    pipes: [RxPipe],
    template: `
    <div>
        <input type="text" [(ng-model)]="a"><button on-click="add()">add</button>
        <div *ng-for="#item of listStream | rx; #index=index">{{item}} <a href="#" on-click="delete(index)">x</a></div>
    </div>
    `
})

export class MyTest {
    a: string;
    aa: Rx.Observable<string>;
    bb: Rx.Observable<string>;
    list: string[] = [];
    listStream: Rx.Observable<string[]>;
    newItemStream: Rx.Subject<string> = new Rx.Subject<string>();
    updateStream: Rx.Subject<any> = new Rx.Subject<any>();
    addItemStream: Rx.Subject<string> = new Rx.Subject<string>();
    existingItemStream: Rx.Subject<number> = new Rx.Subject<number>();
    deleteItemStream: Rx.Subject<number> = new Rx.Subject<number>();
    constructor() {
        this.a = "";
        this.list = ["item 1"];
    }

    onInit(): void {
        this.aa = Rx.Observable.of(this.a);
        this.bb = this.aa.map((text: string) => { return text + " a"});
        this.bb.subscribe();

        this.listStream = this.updateStream.scan(this.list, (items: string[], operation: ItemOperation) => {
            return operation(items);
        }).startWith(this.list);

        this.addItemStream.map(
            function (item: string): ItemOperation {
                return (items: string[]) => {
                    return items.concat(item);
                }
            }
        )
        .subscribe(this.updateStream);

        this.newItemStream.subscribe(this.addItemStream);

        this.deleteItemStream.map(
            function (index:number): ItemOperation {
                return (items: string[]) => {
                    items.splice(index, 1);
                    return items;
                }
            }
        ).subscribe(this.updateStream);

        this.existingItemStream.subscribe(this.deleteItemStream);
    }

    add() {
        let newItem:string = String(this.a);
        this.newItemStream.onNext(newItem);
        this.a = "";
    }

    delete(index) {
        this.existingItemStream.onNext(index);
    }
}
