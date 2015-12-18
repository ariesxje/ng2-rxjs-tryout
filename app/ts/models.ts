import {uuid} from "./util/uuid";

export class Todo {
  text: string;
  isDone: boolean;
   constructor(text?: string) {
     this.text = text || '';
     this.isDone = false;
   }
}