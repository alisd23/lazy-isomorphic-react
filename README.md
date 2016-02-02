# Isomorphic React with lazy loading

If you've used React and Flux, you'll know how powerful this combination is when
building single page applications. But how practical is it when building truly large scale
applications with multiple sections?

I thought it would be interesting to attempt to build a simple single page application
which behaves like a multi-page application. I wanted to avoid the 'load everything at launch'
approach of many single page applications and integrate **lazy loading** into the app,
which allows the client to load the components, styles for those components, and
relevant Redux reducers (or stores in flux) on demand, as the user traverses around the site,
massively reducing the initial load time of the application.
