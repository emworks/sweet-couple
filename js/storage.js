;(function(app) {

  app.storage = (function() {

    /**
     * private properties and methods
     * @type {Object}
     */
    var _private = {};

    /**
     * public properties and methods
     */
    return {

      /**
       * get data from storage
       * @param  {string} key
       * @return {[type]}     [description]
       */
      get: function(key) {
        return _private[key];
      },

      /**
       * add data to storage
       * @param  {string} key
       * @param  {[type]} data [description]
       */
      set: function(key, data) {
        _private[key] = data;
      },

      /**
       * remove from storage
       * @param  {string} key
       */
      remove: function(key) {
        delete _private[key];
      }

    }

  }());

}( window.app = window.app || {} ));
