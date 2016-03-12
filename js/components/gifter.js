;(function(app) {

  var fn = app.utils.fn,
      pubsub = app.utils.pubsub,
      storage = app.utils.storage;

  app.components = app.components || {};

  /**
   * Gifter component
   */
  app.components.gifter = (function() {

    /**
     * private properties and methods
     * @type {Object}
     */
    var _private = {

      container: document.getElementById('gifter'),

      // render component
      render: function(user) {

        // render users
        var userContainer = this.container.querySelectorAll('.content')[0],
            userImg = userContainer.querySelectorAll('img')[0],
            userLink = userContainer.querySelectorAll('.content_link')[0];
        userImg.setAttribute('src', user.getImage());
        userLink.innerHTML = user.getName();

        // render gifts
        var giftsContainer = this.container.querySelectorAll('.footer')[0],
            giftElement = null,
            data = storage.get('gifts');
        fn.forEach(data, function(gift) {
          giftElement = document.createElement('a');
          var giftImg = document.createElement('img'),
              giftBtn = document.createElement('div'),
              giftPrice = document.createElement('div');
          giftElement.className = 'cake';
          giftElement.setAttribute('href', 'javascript:void(0);');
          giftElement.setAttribute('data-id', gift._id);
          giftImg.setAttribute('src', gift.image);
          giftElement.appendChild(giftImg);
          giftBtn.className = 'btn btn-send';
          giftBtn.innerHTML = 'Отправить';
          giftElement.appendChild(giftBtn);
          giftPrice.className = 'gift_price';
          giftPrice.innerHTML = gift.price ? gift.price + ' ФМ' : 'Бесплатно';
          giftElement.appendChild(giftPrice);
          giftsContainer.appendChild(giftElement);
          giftElement = null;
        });
      },

      // bind component events
      bind: function(userA, userB) {
        // subscribe to target event (receiver already sent a gift)
        pubsub.subscribe('sweet-couple', _private.notify);
        // on gift sending
        fn.forEach(this.container.querySelectorAll('.cake'), function(el) {
          fn.addEventListener(el, 'click', function() {
            // update userB and users storage
            userB.setGifts({
              "_id": el.getAttribute('data-id'), // gift ID
              "from": userA.getID()
            });

            // here we can send data to the server
            // all data is available at storage.users

            // check if user A has gifts from user B
            if (!!~fn.inArray(storage.get('userGifts'), userB.getID())) {
              // publish target event (receiver already sent a gift)
              pubsub.publish('sweet-couple', {});
            }
          });
        });
      },

      // receiver already sent a gift => notify user
      notify: function() {
        var notification = document.getElementById('notification'),
            notificationClass = 'invisible';
        fn.removeClass(notification, notificationClass);
        fn.addEventListener(notification.querySelectorAll('form')[0], 'submit',
          function(event) {
            event.preventDefault();
            fn.addClass(notification, notificationClass);
            fn.removeEventListener(notification.querySelectorAll('form')[0], 'submit');
          }
        );
      }

    };

    // public properties and methods
    return {

      // initialize gifter component
      init: function(userA, userB) {
        // get fake gifts for render and binding
        fn.request('data/gifts.json', function(data) {
          // save fake gifts at storage
          storage.set('gifts', data);
          // save gifts received by current user
          storage.set('userGifts', fn.pluck(userA.getGifts(), 'from'));
          _private.render(userB);
          _private.bind(userA, userB);
        });
      }

    }

  }());

}( window.app = window.app || {} ));
