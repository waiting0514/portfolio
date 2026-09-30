// jsdom does not implement scrolling; the router's scrollBehavior calls it on every navigation.
window.scrollTo = () => {}
