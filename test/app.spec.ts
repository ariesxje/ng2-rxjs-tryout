/// <reference path="../app/typings/app.d.ts" />
/// <reference path="../typings/jasmine/jasmine.d.ts" />

import {TodoService} from "../app/ts/services/services";
import {Calculator} from "calculator";

describe('Hello', () => {

  it('should test', () => {
    let m = TodoService;
  });

  it('should add', () => {
    let c = new Calculator();
    expect(true).toBe(true);
    expect(c.add(1,2)).toBe(3);
  });

});
