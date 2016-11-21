angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array
firebase.database().ref('chats').once('value').then(function(snapshot) {
  var ids = snapshot.val()[1].lastText;
  console.log("ids malade**********:",ids);
});
console.log("azertytrezazerty:",firebase.database().ref('chats'));

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
