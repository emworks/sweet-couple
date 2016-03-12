;(function(app) {

  /**
   * PubSub module
   */
  app.utils = app.utils || {};
  app.utils.pubsub = (function() {

    /**
     * private properties and methods
     * @type {Object}
     */
    var _private = {
      topics: {}
    };

    /**
     * public properties and methods
     */
    return {
      topics: {},
      subscribe: function(topic, listener) {
        if(!_private.topics[topic]) _private.topics[topic] = [];
        _private.topics[topic].push(listener);
      },
      publish: function(topic, data) {
        if(!_private.topics[topic] || _private.topics[topic].length < 1) return;
        app.utils.fn.forEach(_private.topics[topic], function(listener) {
          listener(data || {});
        });
      }
    }

  }());

}( window.app = window.app || {} ));
