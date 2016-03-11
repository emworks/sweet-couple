;(function(app) {

  var fn = app.fn,
      storage = app.storage,
      gifter = app.gifter;

  fn.ready(function() {
    // get fake users
    fn.request('data/users.json', function(data) {
      // save fake users at storage
      storage.set('users', data ? fn.indexBy(data, '_id') : {});
      // create test users
      var userA = new app.User(storage.get('users')[1]),
          userB = new app.User(storage.get('users')[4]);
      // login as user A
      userA.login();
      // initialize gifter component
      gifter.init(userA, userB);
    });
  });

}( window.app = window.app || {} ));
