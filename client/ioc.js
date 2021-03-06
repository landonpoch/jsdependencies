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

// Create our own container.  We have complete flexibility over which container we want to use
// currently using requirejs because I don't know of a better one to use yet.
var container = {
    register: requirejs.define,
    resolve: requirejs
}

// loads the 2 packages we need
var csl = require('services');
var apjs = require('player');

// Modules that the UI needs to decide should be registered in the UI project instead
// of in IoC modules within packages.
// Defines the requestHelper named dependency
// Takes priority over defaults wich may be registered by calling IoC on a given module
container.register('requestHelper', function() {
    // Calls the RequestHelper's constructor passing in no dependencies
    // You can choose which requestHelper you want to use in the executing assembly.
    
    return new csl.RequestHelper();
    //return new apjs.RequestHelper();
});

// This is an example of how we could register certain modules inside of our packages.
// This would be similar to the IoC modules we had in C#
apjs.IoC(container);

// We could create an IoC module for CSL also
// csl.IoC(container);

// Create a convenience method for getting a module / modules
var moduleGetter = function(modulesArray, callback) {
    requirejs(modulesArray, callback);
};
module.exports.getModule = moduleGetter;
module.exports.getModules = moduleGetter; 