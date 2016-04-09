// Initialize "container"
var ioc = require('./ioc');

// Gets an instance of the player and requestHelper from the "container"
// I'm not really keen on the callback but maybe this could be changed.
// Alternatively, we shouldn't be directly accessing the container very often anyways.
ioc.getModules(['player', 'requestHelper'], function(player, requestHelper) {
    // Now that we have our instance, use it to our heart's content
    player.executeTest();
    
    // You can see the requestHelper used by the UI is the same as the
    // requestHelper used by the player.
    requestHelper.printAuthHeader();
});