;(function(app) {

  app.utils = app.utils || {};

  /**
   * IE8+ helpful functions
   * @type {Object}
   */
  app.utils.fn = {

    /**
     * forEach
     * @param  {array}    array
     * @param  {Function} fn
     */
    forEach: function(array, fn) {
      for (var i = 0; i < array.length; i++)
        fn(array[i], i);
    },

    /**
     * find some item in array
     * @param  {array} array
     * @param  {string} item
     * @return {Number}
     */
    inArray: function(array, item) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] === item)
          return i;
      }
      return -1;
    },

    /**
     * index objects in array by key
     * and convert it to object
     * @param  {array} array  array of objects
     * @param  {string} key   target key
     * @return {object}
     */
    indexBy: function(array, key) {
      var result = {};
      this.forEach(array, function(obj) {
        result[obj[key]] = obj;
      });
      return result;
    },

    /**
     * create array from objects properties by key
     * @param  {array} array  array of objects
     * @param  {string} key   target key
     * @return {array}
     */
    pluck: function(array, key) {
      var result = [];
      this.forEach(array, function(obj) {
        result.push(obj[key]);
      });
      return result;
    },

    /**
     * create array from objects
     * may be used to revert indexBy result
     * @param  {object} obj
     * @return {array}
     */
    toArray: function(obj) {
      var result = [];
      for (var item in obj) {
        result.push(obj[item]);
      }
      return result;
    },

    /**
     * add class to element
     * @param  {[type]} el
     */
    addClass: function(el, className) {
      el.classList
        ? el.classList.add(className)
        : el.className += ' ' + className;
    },

    /**
     * remove class from element
     * @param  {[type]} el
     */
    removeClass: function(el, className) {
      el.classList
        ? el.classList.remove(className)
        : el.className = el.className.replace(new RegExp('(^|\\b)' +
          className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    },

    /**
     * console.log
     */
    log: function() {
      app.log = app.log || [];
      app.log.push(arguments);
      if (window.console) {
        console.log( Array.prototype.slice.call(arguments) );
      }
    },

    /**
     * XMLHttpRequest
     *
     * @param  {string}   url     requested url
     * @param  {Function} fn      callback function
     * @param  {boolean}  async   by default set to true
     */
    request: function(url, fn, async) {
      var self = this,
          request = new XMLHttpRequest(),
          response = {};
      request.open('GET', url, async || true);
      request.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status >= 200 && this.status < 400) {
            fn(JSON.parse(this.responseText));
          } else {
            self.log(this);
          }
        }
      };
      request.send();
      request = null;
    },

    /**
     * addEventListener
     * @param  {[type]} el
     * @param  {string} eventName
     * @param  {Function} handler
     */
    addEventListener: function(el, eventName, handler) {
      el.addEventListener
        ? el.addEventListener(eventName, handler)
        : el.attachEvent('on' + eventName, function(){
            handler.call(el);
          });
    },

    /**
     * removeEventListener
     * @param  {[type]} el
     * @param  {string} eventName
     * @param  {Function} handler
     */
    removeEventListener: function(el, eventName, handler) {
      el.removeEventListener
        ? el.removeEventListener(eventName, handler)
        : el.dettachEvent('on' + eventName, handler);
    },

    /**
     * document.ready function
     * @param  {Function} fn
     */
    ready: function(fn) {
      if (document.readyState != 'loading'){
        fn();
      } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
      } else {
        document.attachEvent('onreadystatechange', function() {
          if (document.readyState != 'loading')
            fn();
        });
      }
    }

  };

}( window.app = window.app || {} ));
