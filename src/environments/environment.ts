// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  soundcloud: {
    client_id: 'GYvpZm3S6Z8m7IRExO0VgEi10Y8AoT64'
  },

  // Your web app's Firebase configuration
  firebase: {
    apiKey: 'AIzaSyABVekkzuuK_38qA4BAJkxRxOZTmZTeiwI',
    authDomain: 'soundcloudqueue.firebaseapp.com',
    databaseURL: 'https://soundcloudqueue.firebaseio.com',
    projectId: 'soundcloudqueue',
    storageBucket: 'soundcloudqueue.appspot.com',
    messagingSenderId: '213615826367',
    appId: '1:213615826367:web:d6c18f7816d0f68f'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
