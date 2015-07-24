#[DEMO](http://lapanoid.github.io/redux-remote)

Most importantly that I am not resend all actions but listen store updates and send it to another redux instance which updates itself. 

Some diff algorithm can be implemented on top of it.

It can be used in webworkers or on servers to relieve client from costly computations.

Syncing can be used for realtime collaboration apps.

# TODO
- move to Redux 1.0 RC
- extract code from example to src
- publish npm 
- add doc
- add demo build script
