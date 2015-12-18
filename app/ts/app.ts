/// <reference path="../typings/app.d.ts" />

/*
 * Angular
 */
import {Component, bootstrap, View} from "angular2/angular2";

/*
 * Components
 */
import {MyTodo} from './components/MyTodo';

/*
 * Injectables
 */
import {servicesInjectables} from "./services/services";
import {utilInjectables} from "./util/util";

/*
 * Services
 */

/*
 * Webpack
 */
require("css/styles.scss");

@Component({
  selector: "chat-app"
})
@View({
  directives: [MyTodo],
  template: `
  <div>
    <div class="container">
      <my-test></my-test>
    </div>
  </div>
  `
})
class TODOApp {
  constructor() {
  }
}

bootstrap(TODOApp, [ servicesInjectables, utilInjectables ]);
