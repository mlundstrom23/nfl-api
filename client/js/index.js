
// nothing to see here yet.

// this won't be running on server
// this is a static file that we expect to run on the client

function startup() {
    // eslint-disable-next-line no-undef
    document.body.innerHTML = 'Taken Over on Startup</p>'    
}

window.onload = function () {
    console.log('App has started up')
};