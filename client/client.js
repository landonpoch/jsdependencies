'use strict';

// Uses CommonJS (which is a node.js built in function) to
// get a handle on the requirejs library.
// see: http://requirejs.org/docs/node.html
// 
// Here we are using CommonJS to load "files", but we are using
// requirejs to create named instances of services that can
// be swapped out by using a different CommonJS module
// 
// Kind of nasty but it works and things are decoupled.
// Not sure if this is a viable option yet because CommonJS is not
// yet used in APJS.  Maybe we don't really need CommonJS, or maybe
// the UI codebases can add a reference to CommonJS fairly easily.
var requirejs = require('requirejs');

// Defines the requestHelper named dependency
requirejs.define('requestHelper', function() {
    // Calls the RequestHelper's constructor passing in no dependencies
    // You can choose which requestHelper you want to use in the executing assembly.
    // We have below one module called player (which represents an APJS npm package)
    // and another module called services (which represents a CSL npm package)
    
    //return require('./node_modules/player/requestHelper')();
    return require('./node_modules/services/requestHelper')();
});

// Defines the player named dependency.  Player requires a requestHelper
requirejs.define('player', ['requestHelper'], function(requestHelper) {
    // Calls the Player's constructor passing it the RequestHelper as a dependency
    return require('./node_modules/player/player')(requestHelper);
});

// Gets an instance of the player from the "container"
requirejs(['player'], function(player) {
    
    // Now that we have our instance, use it to our heart's content
    player.executeTest();
});