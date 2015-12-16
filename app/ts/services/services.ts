import {messagesServiceInjectables} from "./MessagesService";
import {threadsServiceInjectables} from "./ThreadsService";
import {userServiceInjectables} from "./UserService";
import {todoServiceInjectables} from "./TodoService";

export * from "./MessagesService";
export * from "./ThreadsService";
export * from "./UserService";
export * from "./TodoService";

export var servicesInjectables: Array<any> = [
  messagesServiceInjectables,
  threadsServiceInjectables,
  userServiceInjectables,
  todoServiceInjectables
];
