// jsdom does not implement scrolling; the router's scrollBehavior calls it on every navigation.
// Server-rendering tests run in the Node environment, where there is no window at all.
if (typeof window !== 'undefined') window.scrollTo = () => {}
