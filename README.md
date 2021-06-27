# Showcase: React for business applications

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

<a href='https://djcordhose.github.io/react-showcase/' target='_blank'>
<img src='./img/react-showcase.png'>
</a>

__Given the typical technical and structural requirements of a business application what are the recommended technology choices and architectural nuggets?__

## Architecture / Tech

This is my recommended tech stack for a typical enterprise application. Underlying assumptions of most important requirements
- Long service life (often more than 10 years) and thus good maintainability
- Development with several teams and members changing over the years 
- Good structuring possibilities for large and complex applications 
- Fast development speed

http://blog.embarc.de/spicker/#9

## Is architecture just clueless talking and useless Visios? (Well, it can be...)

Architecture is the sum of the important Processes, Structures, Patterns, Architectural Nuggets and Frameworks. Important can mean

* _hard to change, but somewhat risky_, 
* _affecting many teams/people or large parts of the software_, 
* _restricting what can be built reasonably_, 
* _having the potential to make the endeavor fail_. 

![Architecture](./img/architecture.png)

Idea of Architectural Nuggets taken from: https://pkruchten.files.wordpress.com/2020/06/kruchten-2020-northrop-award.pdf

Also from Kruchten: _The life of a software architect is a long and sometimes
painful succession of suboptimal decisions taken partly in the dark._

Definition of architecture inspired by: https://martinfowler.com/architecture/

## Most important Architectural decisions

### Framework

- https://2020.stateofjs.com/en-US/technologies/front-end-frameworks/
- https://tsh.io/state-of-frontend/#frameworks
- https://medium.com/javascript-in-plain-english/javascript-frameworks-performance-comparison-2020-cd881ac21fce
- https://djcordhose.github.io/spa-workshop/2020_arch.html#/frameworks
- https://reactjs.org/

### Macro-Structure of modules and dependencies
#### Development in a monorepo (multi-package repositories)
- optimizes the workflow around managing multi-package repositories with git and npm: https://lerna.js.org/
- optional: problematic with many CRA packages as versions might clash: https://classic.yarnpkg.com/en/docs/workspaces/
- docker container per package
  - https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
  - https://www.docker.com/blog/keep-nodejs-rockin-in-docker/
- compose different packages into one app
  - https://docs.docker.com/compose/
  - https://github.com/DJCordhose/frontend-monorepo/blob/main/docker-compose.yml
  - use env variables to tell dev from test from prod
    - https://docs.docker.com/compose/environment-variables/
    - https://docs.docker.com/compose/env-file/
    - alterantives
      - config in nginx
      - server writes config to index.html
      - js config file resolves differently
      - etc.
  - CRA allows for proxing in dev: https://create-react-app.dev/docs/proxying-api-requests-in-development/
- nginx as reverse proxy
  - solves auth and security
    - for browser all parts come from the same server
    - auth token shared in local storage or cookie
    - https://github.com/DJCordhose/frontend-monorepo/blob/main/packages/server/src/index.js
    - https://jwt.io/
    - can come from auth server
      - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials
      - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
      - standard auth server: https://www.keycloak.org/
	      - https://www.keycloak.org/getting-started/getting-started-docker
  - separate container for reverse proxy
    - proxies requests to sup apps
    - names are given in docker compose
  - https://hub.docker.com/_/nginx
  - http://nginx.org/en/docs/beginners_guide.html
  - https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/
  - https://www.nginx.com/resources/wiki/start/topics/examples/full/  

#### Build your own lib
- Make or buy lib?
- CSS or Component lib?
  - don't mix well
* https://github.com/DJCordhose/frontend-monorepo/tree/main/packages/zeigermann-component-lib
* Use Webpack for apps, and Rollup for libraries: https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c
  - https://github.com/rollup/plugins  
- https://blog.harveydelaney.com/creating-your-own-react-component-library/
-  modes of maintenance
  1. corporate: use is mandatory for all, high risk in quality and suitability of lib
  2. agile: use recommended, usage shows quality and suitability of lib
-  ownership?
-  What to publish?
   - JS
    - either just the source files
      - problematic if people just want JS
    - bundle with mappings
      - esm preferred    
      - https://github.com/DJCordhose/frontend-monorepo/blob/main/packages/zeigermann-component-lib/rollup.config.js
      - properly specify in package.json: https://github.com/DJCordhose/frontend-monorepo/blob/main/packages/zeigermann-component-lib/package.json#L5
   - Typings
      - https://medium.com/@martin_hotell/typescript-library-tips-rollup-your-types-995153cc81c7
      - creates d.ts files for everthing: https://github.com/ezolenko/rollup-plugin-typescript2
      - standard TS plugin (but sucks with declaration files): https://www.npmjs.com/package/@rollup/plugin-typescript
   - CSS
     - standard rollup plugin: https://www.npmjs.com/package/rollup-plugin-postcss
     - can create nice css.d.ts files: https://github.com/flying-sheep/rollup-plugin-postcss-modules
     - https://github.com/DJCordhose/frontend-monorepo/blob/main/packages/zeigermann-component-lib/rollup.config.js#L23

#### Micro Frontends
- https://micro-frontends.org/
- https://the-tractor.store/
  - https://github.com/naltatis/micro-frontends-in-action-code
- Server-Side Integration
  - SSI (Server-Side Include): http://nginx.org/en/docs/http/ngx_http_ssi_module.html 
  - Pure Verticals: Separate apps using classic links
- Client-Side Integration
  - iFrame: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
  - WebComponent: https://developer.mozilla.org/en-US/docs/Web/Web_Components
  - AppShell: https://developers.google.com/web/fundamentals/architecture/app-shell 

### Micro-Structure within a module / Modular Monolith
#### Structure module into features
  - one folder per feature
    - https://github.com/DJCordhose/frontend-monorepo/tree/main/packages/counter/src/features
  - do not separate by technicalities
  - single slice file containing all logic
  - https://redux.js.org/style-guide/style-guide#structure-files-as-feature-folders-with-single-file-logic
- Keep tests together with application code
  - https://create-react-app.dev/docs/running-tests/#filename-conventions

####  Separate components into smart and dumb
  - indicate type of component by folder or file name
  - if you decide against this sort of category at least are aware of the concept
  - Smart Component 
    - manages state and logic (might delegate to state management lib)
    - orchestrates other components
    - triggers side effects (like loading or saving data)
    - logic makes them domain specific
    - https://github.com/DJCordhose/frontend-monorepo/blob/main/packages/counter/src/features/counter/Counter.tsx
  - Dumb Components
    - layout
    - relaying events to smart components 
    - https://github.com/DJCordhose/frontend-monorepo/blob/main/packages/zeigermann-component-lib/src/AriaButton.tsx
    - probably reusable
    - document properties
  - Reference (German)
    - http://blog.embarc.de/spicker/#9
    - https://djcordhose.github.io/spa-workshop/2020_arch.html#/innere-struktur

#### Component Size and structure    
- each component should do a minimal task
  - thus be kept at minimal size
  - anything larger than 100 lines might be a smell
- a file can contain more than one component
  - you can have private components only used in the main component
    - will show as a component in tooling
    - can be tested separately
  - a fragment can also be stored in a local variable
    - does not show in tooling and can not be tested in isolation

#### Code Splitting 
  - https://create-react-app.dev/docs/code-splitting
  - https://reactjs.org/docs/code-splitting.html#route-based-code-splitting

#### Routing

- https://github.com/ReactTraining/react-router
- Routing and Redux
  - Deprecated: https://github.com/reactjs/react-router-redux
  - "official" answer - don't: https://stackoverflow.com/questions/36722584/how-to-sync-redux-state-and-url-hash-tag-params/36749963#36749963



### State Management

this is all about flow of control and data

- https://2020.stateofjs.com/en-US/technologies/datalayer/
- https://djcordhose.github.io/spa-workshop/2020_arch.html#/innere-struktur (German)
- https://djcordhose.github.io/spa-workshop/2020_arch.html#/state-management (German)
- https://nilshartmann.github.io/react-training/2020_1211_react.html#/t-state (German)

#### Context
  - https://reactjs.org/docs/context.html
    - _Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language._
  - use sparingly and only with smart components
    - we lose explicit visibility of the application's dataflow
    - passing through properties is an explicitly recommended practice
    - you can also pass complete components: https://reactjs.org/docs/context.html#before-you-use-context

#### Redux
  - https://redux.js.org/
    - https://redux.js.org/introduction/getting-started#basic-example
  - https://redux.js.org/introduction/getting-started#should-you-use-redux
  - https://redux.js.org/recipes/usage-with-typescript
  - https://redux.js.org/faq/code-structure#how-should-i-split-my-logic-between-reducers-and-action-creators-where-should-my-business-logic-go
    - "Find the balance between these two extremes, and you will master Redux."
  - https://github.com/DJCordhose/frontend-monorepo/tree/main/packages/counter
  - Effects ngrx-style: https://github.com/davidkpiano/useEffectReducer

#### Redux Toolkit (RTK)
  - https://redux-toolkit.js.org/
  - Motivation
    - "Configuring a Redux store is too complicated"
    - "I have to add a lot of packages to get Redux to do anything useful"
    - "Redux requires too much boilerplate code"
  - https://redux.js.org/introduction/getting-started#redux-toolkit-example  
  - https://redux-toolkit.js.org/usage/usage-with-typescript
    - typing can be a beast, maybe reading and using is enough to begin with
    - needed to understand all kinds of typing if you want to go deeper 
      - https://www.typescriptlang.org/docs/handbook/2/generics.html
      - https://www.typescriptlang.org/docs/handbook/utility-types.html

#### MobX
   - https://mobx.js.org/the-gist-of-mobx.html
   - https://hackernoon.com/the-fundamental-principles-behind-mobx-7a725f71f3e8
     - That recurring theme is “predictability”. If a framework runs your code twice, or with a delay, it becomes hard to debug it. Or to reason about it. Even ‘simple’ abstractions like promises are notoriously hard to debug due to their async nature.
  - https://mobx.js.org/react-integration.html
  - https://michel.codes/blogs/mobx6
  - https://nilshartmann.github.io/react-training/2020_1211_react.html#/t-mobx (German)
  - different types of state and combination of stores: https://mobx.js.org/defining-data-stores.html
  - https://github.com/DJCordhose/frontend-monorepo/tree/main/packages/cra-ts-mobx

#### What's next?
- XState
   - not big, yet, but might be the next big thing
  - https://github.com/davidkpiano/xstate
  - https://github.com/davidkpiano/xstate/tree/master/packages/xstate-react
  - https://codesandbox.io/s/xstate-react-typescript-template-wjdvn?file=/src/index.tsx
- Comparison based on single/multi and direct/indirect: https://twitter.com/DavidKPiano/status/1353712136372039682
  - "state management is the wild west and the categories aren't mutually exclusive (and can become each other with abstractions/convention), so it's a rough categorization"

  
#### MobX vs. Redux
  - Redux rather functional programming, MobX rather OO
  - A lot of freedom with MobX...
  - ...but also a lot of "magic
  - For large models sometimes difficult to understand what is actually "observed" where and how
  -  Observer components rather untypical for React (yet)
  - Developer tooling not as good as Redux
  - Docs, StackOverflow etc. much less comprehensive than Redux
  - 👉 Both libraries good choice and can be used
  - 👉 "No one has been fired for Redux yet".

### Testing

[Dedicated document](./testing.md)


### Styling

* styling is a global concern 
* often underestimated
* a real architectural decision
* don't mix different approaches

#### Options for writing styles
* using globally shared CSS
  * maybe using CSS framework
    * https://tailwindcss.com
      * https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss
      * https://tailwindcss.com/docs/optimizing-for-production
      * https://github.com/DJCordhose/frontend-monorepo/blob/main/packages/counter/tailwind.config.js
    * don't mix with component library
  * https://github.com/DJCordhose/frontend-monorepo/blob/main/packages/counter/src/index.tsx#L3
* CSS modules
  * mainstream
  * https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/
  * https://github.com/DJCordhose/frontend-monorepo/blob/main/packages/zeigermann-component-lib/src/LoadingIndicator.tsx
* SASS
  * Generally, we recommend that you don’t reuse the same CSS classes across different components. For example, instead of using a .Button CSS class in `<AcceptButton>` and `<RejectButton>` components, we recommend creating a `<Button>` component with its own .Button styles, that both `<AcceptButton>` and `<RejectButton>` can render (but not inherit).
  * can be used for global CSS
  * https://create-react-app.dev/docs/adding-a-sass-stylesheet/
  * https://github.com/DJCordhose/frontend-monorepo/blob/main/packages/counter/src/common/components/LoadingIndicator.tsx
* Styled Components
  * https://styled-components.com/
  * https://github.com/DJCordhose/frontend-monorepo/blob/main/packages/counter/src/features/hello/Hello.tsx  

#### Tooling
* https://postcss.org/
  * checks CSS and adds browser specific prefixes
  * can also bundle, minimize, source maps
* styling with TS
  * generic type declarations needed for CSS: https://github.com/DJCordhose/frontend-monorepo/blob/main/packages/zeigermann-component-lib/src/react-app-env.d.ts#L58
  * specific types can be generated
    * https://github.com/DJCordhose/frontend-monorepo/blob/main/packages/zeigermann-component-lib/src/AriaButton.module.css.d.ts
    * https://github.com/DJCordhose/frontend-monorepo/blob/main/packages/zeigermann-component-lib/rollup.config.js#L10

### Typing

- https://2020.stateofjs.com/en-US/technologies/javascript-flavors/
  - Flow most likely is no longer an alternative: https://twitter.com/cpojer/status/1397434763774885891
- Intro
  - TS for JS programmers: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html  
  - TS for Java and C# programmers: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html
  - Tooling: https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html
- https://djcordhose.github.io/spa-workshop/2020_arch.html#/ts
- https://djcordhose.github.io/spa-workshop/2020_js_ts_intro.html#/ts
  - https://djcordhose.github.io/typescript-intro/2021_js_ts.html#/should-you
- https://www.typescriptlang.org/
- https://www.typescriptlang.org/docs/handbook/react.html
- https://react-typescript-cheatsheet.netlify.app/
- https://github.com/piotrwitek/react-redux-typescript-guide#react--redux-in-typescript---complete-guide
- Advise
  - Don't overdo it
    - You can go a long way, but you probably shouldn't: https://github.com/gcanti/fp-ts
  - Libraries (shared code, also completely internal) can benefit from a lot of typing
  - Application code mainly benefits from typing
    - Often simply making a component TS can bring a huge benefit without adding any type information at all
- Type vs Interface: 
  - https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
  - https://nilshartmann.github.io/typescript-intro/2021_js_ts.html#type-vs-interface
  - interfaces at the moment still better in external libs: https://twitter.com/orta/status/1307692799807164417
  - interfaces can be extended
  - inteface has a clear position in error messages
  - type is just an alias
  - Confusion: Java interface != TS Interface
- How to type properties in FCs
  - https://github.com/typescript-cheatsheets/react#function-components
- CRA with TS
  - TS with RTK: https://github.com/reduxjs/cra-template-redux-typescript
  - Just TS: https://create-react-app.dev/docs/adding-typescript/  
  - make TS as strict as possible: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

## Less important technical recommendations

### Component Style (classes vs functional components w/ hooks)
* classes and functional components are pretty similar
  * State: re-render
  * Properties
  * Component returns UI
  * Declarative
  * Lifecycle: render and commit phase
  * Classes and functions can be mixed in one app
  * Classes are not deprecated
    * https://reactjs.org/docs/hooks-faq.html#do-i-need-to-rewrite-all-my-class-components
* but  
  * new/future React features may only be available for functions
    * https://reactjs.org/docs/hooks-faq.html#should-i-use-hooks-classes-or-a-mix-of-both 
  * error boundaries only work for classes: https://reactjs.org/docs/error-boundaries.html
  * life-cycle methods in classes hurt cohesion of code and are error prone
  * useEffect can replace all of them in functional components (but also have a weird api)
  * setState and this-binding of callbacks in classes can be confusing
  * hooks might allow to better extract reusable code (rather than subclassing)
### Data Fetching and Synchronization
- low level
  - just fetch (built-in): https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
  - axios (isomporphic): https://axios-http.com/
  - fair comparison of both: https://blog.logrocket.com/axios-or-fetch-api/
- high level
  - for redux toolkit: https://redux-toolkit.js.org/rtk-query/overview
  - Alternatives: https://react-query.tanstack.com/comparison
- Polling
  - Long Polling
    - make call to server in useEffect
    - once call comes back, do it again
    - can be done in Redux Action Creator
  - Short Polling
    - simple: schedule call to server every x ms using setInterval
    - use lib like:
      - https://react-query.tanstack.com/examples/auto-refetching
      - https://redux-toolkit.js.org/rtk-query/usage/polling
  - Web Sockets
    - https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications
    - useEffect: https://www.pluralsight.com/guides/using-web-sockets-in-your-reactredux-app
    - Redux Middleware: https://dev.to/aduranil/how-to-use-websockets-with-redux-a-step-by-step-guide-to-writing-understanding-connecting-socket-middleware-to-your-project-km3
  - Server-Sent Events
    - only one direction
    - patterns for receiving like Web Sockets
    - https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
  - Abstraction over all methods: 
    - https://socket.io/
      - Java Implementation exists, but might be complex: https://github.com/socketio/socket.io-client-java
      - More server side implementations: https://socket.io/docs/v4/#What-Socket-IO-is
    - https://github.com/sockjs/sockjs-client

### i18n, l10n

- https://react.i18next.com/
  - https://www.i18next.com/translation-function/interpolation
  - https://github.com/i18next/react-i18next
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
- Deprecated
  - https://momentjs.com/
  - http://numeraljs.com/

### Build / Deployment

- `yarn build`
- https://create-react-app.dev/docs/deployment/ 
- https://create-react-app.dev/docs/deployment/#github-pages

### Component Libraries

- https://material-ui.com/
- https://github.com/microsoft/fluentui


### Performance
* web vitals
  * https://create-react-app.dev/docs/measuring-performance/
  * https://web.dev/vitals/
  * https://github.com/DJCordhose/frontend-monorepo/blob/main/packages/counter/src/index.tsx#L33
* Profiling Tools Browser
  * Standard Dev Tools
  * React Profiler: https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html
  * Lighthouse (more high level): https://developers.google.com/web/tools/lighthouse

## Create React App

* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.
* https://create-react-app.dev/
* https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
* Create new projects with CRA
* Leave existing projects as they are and only rethink once you reach a hard boundary
  - also applies to webpack by hand
* Do not create a build from scratch unless you have to
  * you keep spending a lot of time maintaining
  * mostly still is out of data or you make bad choices
  * libs often need different builds and do not work well with CRA
    * rollup might be more desirable here
  * do it to learn a bit more
    * might want to start with CRA and eject to see what is going on

### Creation
- https://github.com/reduxjs/cra-template-redux-typescript
  - yarn create react-app my-app --template redux-typescript
- yarn upgrade typescript --latest

### Tooling and Integration
- https://create-react-app.dev/docs/debugging-tests/

### When CRA starts to become limiting

- You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
- Alternatives to CRA: https://reactjs.org/docs/create-a-new-react-app.html#more-flexible-toolchains

#### Options
1. eject and ajust config by hand
   - this will feel worse and worse over time
1. build your own react-template or scripts
   - fork the original template in git and adapt it, then you can still eject, but in case of doubt also merge new features
   - https://create-react-app.dev/docs/alternatives-to-ejecting
   - https://create-react-app.dev/docs/custom-templates/
2. https://www.npmjs.com/package/react-app-rewired
   - a tool that deeply interferes with the internals is problematic
   - not even the authors would use it and since CRA 2 it is hardly maintained
   - https://www.npmjs.com/package/react-app-rewired
   - https://github.com/arackaf/customize-cra
4. write a post-install-script for npm that adjusts the webpack config in node_modules/react-scripts
    - this is only a temporary solution, at the same time open issue and hope for fix
