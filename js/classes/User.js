;(function(app) {

  /**
   * User class
   */
  app.User = (function() {

    var User = function(obj) {
      for (var prop in obj) this[prop] = obj[prop];
    };

    User.prototype = (function(){

      var _private = {

        _login: function() {
          app.userID = this._id;
        },

        _logout: function() {
          delete app.userID;
        }

      };

      return {

        constructor: User,

        /**
         * Simulate user login
         * @param  {Number} user ID
         */
        login: function() {
          _private._login.call(this);
        },

        /**
         * Simulate user logout
         */
        logout: function() {
          _private._logout.call(this);
        },

        /**
         * get user ID
         * @return {Number}
         */
        getID: function() {
          return this._id;
        },

        /**
         * get user name
         * @return {string}
         */
        getName: function() {
          return this.name;
        },

        /**
         * get user image
         * @return {string}
         */
        getImage: function() {
          return this.image;
        },

        /**
         * get user money
         * @return {Number}
         */
        getMoney: function() {
          return this.money;
        },

        /**
         * get user gifts
         * @return {array}
         */
        getGifts: function() {
          return this.gifts;
        },

        /**
         * get user gifts
         * @return {array}
         */
        setGifts: function(value) {
          this.gifts.push(value);
        }

      };

    })();

    return User;

  }());

}( window.app = window.app || {} ));
