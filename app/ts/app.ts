/// <reference path="../typings/app.d.ts" />

/*
 * Angular
 */
import {Component, bootstrap, View} from "angular2/angular2";

/*
 * Components
 */
import {MyTest} from './components/MyTest';

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
  directives: [MyTest],
  template: `
  <div>
    <div class="container">
      <my-test></my-test>
    </div>
  </div>
  `
})
class ChatApp {
  constructor() {
  }
}

bootstrap(ChatApp, [ servicesInjectables, utilInjectables ]);
