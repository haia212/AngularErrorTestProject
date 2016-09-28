import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: (backend, options) => {
        // configure fake backend
        backend.connections.subscribe((connection: MockConnection) => {

            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // fake authenticate api end point
                if (connection.request.url.endsWith('/api/settings/static_lists/') && connection.request.method === RequestMethod.Get) {
                    
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: { result : "Settings" } })
                    ));
                  
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 401, body: { result : "Error login" } })
                    ));
                }
            }, 500);

        });

        return new Http(backend, options);
    },
    deps: [MockBackend, BaseRequestOptions]
};