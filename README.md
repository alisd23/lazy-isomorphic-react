# Isomorphic React with lazy loading

If you've used React and Flux, you'll know how powerful this combination is when
building single page applications. But how practical is it when building truly
large scale applications with multiple sections?

I thought it would be interesting to attempt to build a single page application
which behaves like a multi-page application, in a way that would make scaling it
a breeze. I wanted to avoid the 'load everything at launch' approach of many single
page applications and integrate **lazy loading** into the app, which allows the client
to load the components, styles for those components, and relevant Redux reducers
(or stores in flux) on demand, as the user traverses around the site, massively
reducing the initial load time of the application.


## Technologies to include

I wanted to see how well the isomorphic react method plays with other technologies,
meaning how easy it is to incorporate other technologies into the application. I
think this is an important gauge of how well this framework would work in practice.
So just for reference, here is the list of these technologies/techniques I used.

##### Typescript
Useful in large applications as the strongly typed nature of it allows you to catch
bugs earlier in the development cycle, making it harder to break things when making
a change.

##### React-router
Allowing routing to separate 'pages' in the application, almost guaranteed in a
large application.

##### Redux
A slightly different and more concrete implementation of the flux architecture
This is a big topic so I won't go into much detail in this blog post. If you want
to learn more about **Redux** first (which I recommend, its really cool) - check
this blog post out
[here](http://blog.scottlogic.com/2016/01/25/angular2-time-travel-with-redux.html).

##### Hot reloading
This is a hot topic at the moment (I stole that joke from [this blog post](http://blog.scottlogic.com/2016/01/27/a-case-for-hot-reloading.html)).
Allows you to streamline your React application development workflow, cutting the
time you need to wait for compilation, so definitely check out that blog post if you're
not familiar with the concept, maybe you'll warm to it (my joke).

##### Sass
And finally, Sass for stylesheets. People have been talking recently about getting
rid of the stylesheets in React applications, in favour of writing styles in
javascript then inserting them directly into the react component.
Maybe that's for another blog post, so for now, Sass.


## The application

I decided to take the basic redux shopping cart application as a start point, and adapt
it. This example is simple at the moment, but it has 2 pages which is enough to showcase
isomorphic React and code-splitting.  

The main layout of the website at the moment is as follows:

1. Main shop (Main page) - contains the list of products and the current cart.
This page sits at the base root - '/'.
2. Individual product page - This page contains information about a specific product,
given by the id in the url. This route has the path '/product/:id', where id is
the product id



## Why isomorphic?

An isomorphic application is one where the back-end (server) and front-end (client)
share the same code. In our React example this means the server and client are both
able to render the React components, allowing the client to receive a pre-rendered
web page, at which point the client can then take over and start handling the rendering
itself.

So why would you develop an isomorphic application?

##### Code reuse  

A big benefit is to able to reduce the amount of overall code in your application.
In a traditional multi-page web application you would use a *templating
engine* (such as Jade, Blade etc...) to render your markup on the server, and if
you wanted to update on the client afterwards you would need some client-side
javascript logic to do this.
With an isomorphic React application you can replace the traditional templating
engine with React, allowing you to the use the React components on both the
client and the server.

Rendering the application on the server:  
**server/app.tsx**

```javascript

match({ routes, location: req.url || '/' }, (error, redirectLocation, renderProps) => {
  // Compile an initial state
  const products = {};
  _products.forEach((p) => products[p.id] = p);
  const initialState = {
    products: products
  }
  const store = configureServer(reducerRegistry, initialState);
  const component = (
    <Provider store={store}>
      <div>
        <RouterContext {...renderProps} />
      </div>
    </Provider>
  );
});

// Render the initial html
// - Store: Place initial state on the browser window object for the client to read on load
// - assets: Load the relevant assets into the markup using webpackIsomorphicTools
// - component: The main component to render in the html root
const html = (
  <Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />
);

res
  .status(200)
  .send('<!doctype html>\n' + renderToString(html));
```

Rendering the application on the client:  
**client/app.tsx**

```javascript
match({ history: browserHistory, routes } as any, (error, redirectLocation, renderProps) => {

  const initialState = (window as any).__INITIAL_STATE__;
  const store = configureClient(reducerRegistry, DevTools, initialState);

  render(
    <Provider store={store}>
      <div>
        <Router {...renderProps} />
      </div>
    </Provider>,
    document.getElementById('root')
  );
});
```

The code above is simplified slightly but as you can see both the client are rendering
the exact component, so after this point React takes over and the rendering will be exactly
the same on both.

The server has to do a bit more work. It has to embed the assets (javascript, styles)
into the initial html and also assign the initial state onto the window object
so the client can pick it up and initialise its own store.


This code reuse could extend even further if you decided to build mobile apps
with **React native**, because this opens the door for you to share components
across different applications all together. Whether this is a good thing is still
up for debate. Is it a good idea to have multiple applications use the same React
component? What if you change a component to address something in the web application,
might that break something in your iOS app? Maybe something to consider.

##### Consistent data API across all applications  

Another great thing with an isomorphic approach is it allows you to be consistent
across all applications you may have (web and mobile). In a traditional web application
you might have post requests which require the server to render a whole new page
with the templating engine and then return it to the client.

With an isomorphic approach, you can allow all your web application to speak the
same language as your mobile apps, that of the data API. Once the web
application has loaded, all it needs to do is request raw data from the API,
then thanks to React all we have to do is force a re-render by updating the state
of the data store (or Redux reducers in my case).
Of course in an application with multiple pages we will still need to retrieve
new components and reducers as we traverse the site, but this can be done in
quite an elegant way, which I will cover later. Also once you have downloaded
the component for a page once, it's there, so you won't need to request anything
from the server again if you go back to that same page.

##### Search engine optimisation  

A problem with single page applications currently is that the markup received
from the server is pretty much blank, until the client loads and is then able to
render the content. This is an issue for web crawlers such as Google's, as all it
can go off initially is your blank page, which won't do wonders for your search engine
presence.  

Isomorphic applications solve this problem. By always rendering the page once
on the server side before sending it to the client, web crawlers can once again
access your real content, just as they would in a traditional multi-page application.


## Webpack

Webpack is an intelligent module bundler which resolves dependencies in your files
and generates the static assets to be delivered to the client. The really great thing
about webpack is that these dependencies don't have to just be standard javascript
imports or requires. By using specialist **loaders**, you can use webpack to bundle up
your sass into separate modules. You could even use webpack to replace the link of
`img` elements with base64 strings, hard-coding the image directly inside the react
component.


#### Sass compilation  

Here is an example of using webpack to configure sass compilation, with live reloading.

Webpack config is usually written in a `webpack.config.js` file, so here I tell webpack
which loaders to apply to the scss files:

```javascript
var config = {
  ...
  module: {
    loaders: [
      ...
      {
        // Only apply loaders to scss files
        test: /\.scss$/,
        // Apply loaders from right to left
        loaders: ['style', 'css', 'sass']
      }
      ...
    ]
  },

  // Config for the css-loader
  cssLoader: {
    // True enables local scoped css
    modules: false,
    // Which loaders should be applied to @imported resources (How many after the css loader)
    importLoaders: 1,
    sourceMap: true
  },
  // Config for the sass-loader
  sassLoader: {
    sourceMap: true,
    outputStyle: 'expanded'
  }
}
```

Then simply **require**-ing the sass file in your client side javascript is enough for
webpack to realise those styles need loading, so it will then bundle those for you.

So in my App.tsx top Level component I require the **common** styles stylesheet

```javascript
class App extends React.Component<IAppProps, {}> {

  render() : React.ReactElement<{}> {
    // Import stylesheet here
    require('../../../sass/common.scss');

    return (
      <div>
        <Helmet {...config.app.head}/>
        <Navbar />
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
```

#### Webpack thoughts

Webpack does a lot. As well as having tons of pluggable loaders to use, there is
a plethora of options and configurations, so it's no doubt that the documentation
is a bit... messy. In my opinion it was difficult to find out which configuration
options were needed to do certain things. Although the documentation has some decent
guides to help with common issues, from my experience there was always more
configuration options or things that needed to be done to actually get it working.
Often these things weren't mentioned in the documentation at all.

Of course the documentation is something that I'm sure will be improved in the
future as webpack becomes more popular and widely used. Also some of the difficulty
came from the fact that webpack and the cool things you can do with it
(hot-reloading for example) are fairly new, so the support community and forum
questions are lacking at the moment. Again, it's still early days, so the support
material online can only improve from here.


## Lazy-loading and Code splitting

With our isomorphic application having mulitple pages, there's no need for us to
load all the assets for the **whole site** on the initial load. We should only
load the resources needed for the current 'Page' we are on.

The assets we are interested in lazy loading are:
- **React components**  - To generate the markup for new pages
- **Stylesheets**       - To style the new components
- **Redux reducers**    - To add functionality to the react components if necessary.
In my application these reducer files also include any relevant action handlers
and action constants that apply to that specific reducer. This is called a **duck**
module, which can read more about [here](https://github.com/erikras/ducks-modular-redux).

Now ideally what we want is to group related assets together into what webpack calls
**chunks**, which is just a chunk of code to be sent to the client. **Code-splitting**
is the process of creating split points in the code which webpack can then parse
and create modularized output files from. You can tell webpack that there should be
a new chunk generated by adding a `require.ensure([], callback)` call into your code,
and then `require` modules inside the callback (including sass files if you have the
right webpack loader, mentioned above).

There are many plugins and loaders to help with efficiency and different optimization
strategies, which is out of the scope of this post, but I will show the basics of code
splitting later in this section.


##### React router

We'll do a quick run through of React router to explain how to set up multiple
pages in an application, and how it relates to the isomorphic React approach.

We can define routes using a React Router component like the following:


```javascript

import App from './containers/App';

<Route path="/" component={App}>
  <IndexRoute getComponent={(location, cb) => {
    // Load all required resources for shop page
  }} />
  <Route path="/product/:id" getComponent={(location, cb) => {
    // Load all required resources for product page
  }} />
</Route>
```

Then by navigating to different urls, React router then loads the correct component
and passes in any query parameters as React props. It also plugs easily into the browser
history, so the **back** and **forward** buttons work out of the box, transitioning
easily between different routes.


#### Time to be lazy

You'll notice for the nested routes that instead of using the `component` prop
like the top level **App** route, we supply a `getComponent` prop which is a
function, of which one parameter is a callback which the component is passed into.

In this function we can require all the modules we need before the React router
switches to the new component, which is exactly what we want. So we end up with a
routes file like this:

```javascript

import App from './containers/App';

<Route path="/" component={App}>
  <IndexRoute getComponent={(location, cb) => {
    require.ensure([], require => {
      // Retrieve main page component
      cb(null, require('./containers/Main').default);
    });
  }} />
  <Route path="/product/:id" getComponent={(location, cb) => {
    require.ensure([], require => {
      // Load the product page reducer and add it to the main store
      reducerRegistry.register({ ['productPage']: require('./reducers/productPage').default });
      // Retrieve product page component
      cb(null, require('./containers/Product').default);
    });
  }} />
</Route>
```

**NOTE** the styles are required inside the components themselves. This was a design
decision I made due to the fact that styles are so closely related to the React component
markup.

Whichever page we start on when loading the app, the correct chunk
will be loaded, along with any dependencies (including the stylesheets). Then when
you traverse to a different page, the relevant bundle and styles will be loaded for
that component too.


#### Requiring stylesheets on the server

With a standard webpack configuration, isomorphic applications do not work perfectly
in the situation where you want to require stylesheets on the server as well as on
the client.
Clearly its much more efficient to only include the styles for the initial page we've
loaded, then lazy load the other styles on demand. However that means we need to be able
to bundle stylesheets together on the server too.

**But wait, there's a problem**

This issue stumped me for a while. As node's require system doesn't allow you to
require `css` or `sass` files, the server render crashes.

However there is an answer. A helpful (but not particularly easy to implement in
my opinion) library called **webpackIsomorphicTools** solves this problem.
It collects all the assets in your components that you want to render, then allows
you to render them into the HTML before sending to the client.

This solution isn't very elegant or easy to find, but I think someone will come up
with an even better solution in the future as isomorphic applications grow in popularity.


## Conclusion

I really think that isomorphic applications are the future for multi-page applications,
and when combining React, Redux (or something similar), and the likes of webpack
with hot-reloading, you have a brilliant javascript framework with a clear,
structured developer workflow to play with.

However, this is one of the most difficult things I have attempted to build so far.
There is a lot of ground work to do before getting to a point where you have this
efficient workflow. But when you get there, it's worth it.

In terms of lazy-loading, I think the benefits are clear, and it makes building large
single page applications with multiple screens perfectly viable.

From what I've seen so far, a lot of this stuff is still quite 'cutting edge', so don't
expect a million stack overflow questions and tons of examples online. You might have
to go digging through some code... This also means it is very likely to change in the
future, so take that under consideration before starting a production application
in this way.

If you want to have a look at the code I'll leave a link to the github repository
(here)[]
