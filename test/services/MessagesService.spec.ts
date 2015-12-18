/// <reference path="../../app/typings/app.d.ts" />
/// <reference path="../../typings/jasmine/jasmine.d.ts" />

import {TodoService} from "../../app/ts/services/services";
import {Todo} from "../../app/ts/models";
import {RxPipe} from "../../app/ts/util/RxPipe";

describe("TodoService", () => {
  it("should be able to add new item to TODO list", () => {
    let todoService = new TodoService();

    let todo1: string = 'item 2';
    let todo2: string = 'item 3';

    let currentSize = 1;
    let currentNewItem = todo1;

    todoService.addItemStream.subscribe((item:Todo) => {
      expect(item.text).toBe(currentNewItem);
    })

    todoService.listStream.subscribe((list:Todo[]) => {
      expect(list.length).toBe(currentSize);
    })

    currentSize++;
    currentNewItem = todo1;
    todoService.add(todo1);
    currentSize++;
    currentNewItem = todo2;
    todoService.add(todo2);
  })

  it("should be able to delete item from TODO list", () => {
    let todoService = new TodoService();

    let todo1: string = 'item 2';
    let todo2: string = 'item 3';

    let currentSize = 1;
    let currentDeletedItem;

    todoService.listStream.subscribe((list:Todo[]) => {
      expect(list.length).toBe(currentSize);
    })

    currentSize++;
    todoService.add(todo1);
    currentSize++;
    todoService.add(todo2);

    todoService.deleteItemStream.subscribe((index:number) => {
      expect(index).toBe(currentDeletedItem);
    })

    currentDeletedItem = 1;
    currentSize--;
    todoService.delete(currentDeletedItem);
    currentDeletedItem = 0;
    currentSize--;
    todoService.delete(currentDeletedItem);
  })

  it("should be able to toggle isDone of a TODO item", () => {
    let todoService = new TodoService();

    let todo1: string = 'item 2';
    let todo2: string = 'item 3';

    let currentSize = 1;
    let currentToggledItemIndex;
    let currentToggledItemIsDone;

    todoService.listStream.subscribe((list:Todo[]) => {
      expect(list.length).toBe(currentSize);
      if (currentToggledItemIndex) {
        expect(list[currentToggledItemIndex].isDone).toBe(currentToggledItemIsDone);
      }
    })

    currentSize++;
    todoService.add(todo1);
    currentSize++;
    todoService.add(todo2);

    todoService.toggleDoneStream.subscribe((index:number) => {
      expect(index).toBe(currentToggledItemIndex);
    })

    currentToggledItemIndex = 0;
    currentToggledItemIsDone = true;
    todoService.toggleDone(currentToggledItemIndex);
    currentToggledItemIndex = 0;
    currentToggledItemIsDone = false;
    todoService.toggleDone(currentToggledItemIndex);

    currentToggledItemIndex = 1;
    currentToggledItemIsDone = true;
    todoService.toggleDone(currentToggledItemIndex);
  })

  it("should have a DONE list observing the TODO list", () => {
    let todoService = new TodoService();

    let todo1: string = 'item 2';
    let todo2: string = 'item 3';

    let currentSize = 1;
    let currentToggledItemIndex;
    let currentToggledItemIsDone;

    let currentDoneSize = 0;

    todoService.listStream.subscribe((list:Todo[]) => {
      expect(list.length).toBe(currentSize);
      if (currentToggledItemIndex) {
        expect(list[currentToggledItemIndex].isDone).toBe(currentToggledItemIsDone);
      }
    })

    todoService.doneListStream.subscribe((list:Todo[]) => {
      expect(list.length).toBe(currentDoneSize);
    })

    currentSize++;
    todoService.add(todo1);
    currentSize++;
    todoService.add(todo2);

    currentToggledItemIndex = 0;
    currentToggledItemIsDone = true;
    currentDoneSize++;
    todoService.toggleDone(currentToggledItemIndex);
    currentToggledItemIndex = 0;
    currentToggledItemIsDone = false;
    currentDoneSize--;
    todoService.toggleDone(currentToggledItemIndex);

    currentToggledItemIndex = 1;
    currentToggledItemIsDone = true;
    currentDoneSize++;
    todoService.toggleDone(currentToggledItemIndex);
  })
});
