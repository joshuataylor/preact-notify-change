# NOTE: This is a pre-release work in progress build and things are bound to change. 

# preact-notify-change
preact-notify-change is a component for alerting your users when a new update has been made to the site, and to refresh by clicking on the alert (or manually). You can also refresh on route change if using preact-router.

No more asking users to force refresh, or asking if they are on the latest version - this will always show the latest version.

## How it works
Service Workers can check for updates to sw.js, which in turn checks for updates to the linked js/css.

This does mean you will need to be using a Service Worker with your app; this will work out of the box with [preact-cli](https://github.com/developit/preact-cli) as that uses Service Workers by default.

To call it, simply import and call it in your app:

```
import NotifyChange from 'preact-notify-change';
...
<NotifyChange />
```