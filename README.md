# Angular 2 RxJS

> This app using [Angular 2](https://angular.io/), [RxJS](https://github.com/Reactive-Extensions/RxJS), [Webpack](https://webpack.github.io/), [TypeScript](http://www.typescriptlang.org/), Services, Injectables, [Karma](http://karma-runner.github.io/), Forms, [SCSS](http://sass-lang.com/), and [tslint](http://palantir.github.io/tslint/) originally by the [ng-book 2 team](https://ng-book.com/2)

This repo shows an example application using RxJS and Angular 2. The goal is to show how to use the Observables data architecture pattern within Angular 2. It also features:

* Webpack configuration with TypeScript, Karma, SCSS, and tslint
* Writing async components that work with RxJS
* How to write injectable services in Angular 2
* And much more

## Quick start

```bash
# clone the repo
git clone https://github.com/solnetdigital/ng2-rxjs.git

# change into the repo directory
cd angular2-rxjs-todo

# install 
npm install

# run
npm run server
```

Then visit [http://localhost:8080](http://localhost:8080) in your browser. 

## Architecture

The app has 1 model1:

* [`Todo`](app/ts/models.ts#L3) - holds individual TODO items

And there is one service:

* [`TodoService`](app/ts/services/TodoService.ts) - manages streams of `Todo`s

## Services Manage Observables

The service publishes data as RxJS streams. The service clients subscribe to these streams to be notified of changes. 

The `TodoService` is the backbone of the application. All new todos are added to the `addItemStream` stream and, more or less, all streams are derived from listening to `addItemStream`.

Vice versa, the `removeItemStream` and `toggleDoneStream` would emit items to `updateStream` to modify the `listStream`.

## File Structure

Here's an overview of how the files are laid out in this project:

```
angular2-rxjs-todo/
├── Makefile                        * Easy access to common tasks
├── README.md                       * This file
├── app/                            * Where our application code is stored
│   ├── css/                        * Contains our CSS and SCSS files
|   | 
│   ├── images/                     * Stores app images
|   | 
│   ├── index.html                  * HTML entry point
|   | 
│   ├── ts/                         * All of our TypeScript is here
|   |   |
│   │   ├── app.ts                  * App entry point
|   |   |
│   │   ├── components/             * Components go here
|   |   |   |
│   │   │   └── MyTodo.ts           * Todo Window Component
|   |   |
│   │   ├── models.ts               * Our models go here
|   |   |
│   │   ├── services/               * Services here
|   |   |   |
│   │   │   ├── TodoService.ts      * Manage our Todo list
│   │   │   └── services.ts         * Exports all services
|   |   |
│   │   └── util/                   * Pipes and various utilities
|   | 
│   ├── typings/                    * Self-managed type definitions here
|   | 
│   └── vendor.js                   * Vendor js requires for webpack
|   | 
├── karma.conf.js                   * Our unit testing configuration
├── package.json                    * Our javascript dependencies
├── test/                           * Our tests go here
├── test.bundle.js                  * Some hacks to get TypeScript tests
├── tsconfig.json                   * Configures the TypeScript compiler
├── tsd.json                        * Configures tsd (type definitions packages)
├── tslint.json                     * Configures our TypeScript linter 
├── typings/                        * tsd managed typings
├── vendor/                         * Various vendored code
└── webpack.config.js               * Our Webpack configuration
```

## Detailed Installation

**Step 1: Install Node.js from the [Node Website](http://nodejs.org/).**

We recommend Node version 0.12 or above. You can check your node version by running this:

```bash
$ node -v
v0.12...
```

**Step 2: Install Dependencies**

```bash
npm install
```

## Running the App

```bash
npm run server
```

Then visit [http://localhost:8080](http://localhost:8080) in your browser. 

## Running the Tests

You can run the unit tests with:

```bash
npm run test
```

## Future Plans

There are two big changes we plan to make to this repo:

### 1. Add HTTP Requests

Currently the TODOs are all client-side and there are no HTTP requests involved. 

Will try to move the TODOs to a server and integrate API requests into this project once the Angular 2 HTTP client development has settled down.

### 2. `ON_PUSH` change detection

Because we're using observables, we can improve the performance of these components by using `ON_PUSH` change detection. Again, once Angular 2 development stabilizes, we'll be making this change.

## License
 [MIT](/LICENSE.md)


