;(function(app) {

  var fn = app.utils.fn,
      storage = app.utils.storage,
      User = app.classes.User,
      gifter = app.components.gifter;

  fn.ready(function() {
    // get fake users
    fn.request('data/users.json', function(data) {
      // save fake users at storage
      storage.set('users', data ? fn.indexBy(data, '_id') : {});
      // create test users
      var userA = new User(storage.get('users')[1]),
          userB = new User(storage.get('users')[4]);
      // login as user A
      userA.login();
      // initialize gifter component
      gifter.init(userA, userB);
    });
  });

}( window.app = window.app || {} ));
