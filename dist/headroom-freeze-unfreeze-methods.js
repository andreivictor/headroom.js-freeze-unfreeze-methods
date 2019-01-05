/*!
 * headroom.js-freeze-unfreeze-methods v1.0.0 - Extends Headroom.js plugin by adding methods to freeze/unfreeze the current headroom's state.
 * Copyright (c) 2019 Andrei Bulearca - https://github.com/andreivictor/headroom.js-freeze-unfreeze-methods#readme
 * License: MIT
 */

(function(root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    }
    else if (typeof exports === 'object') {
        // COMMONJS
        module.exports = factory();
    }
    else {
        // BROWSER
        root.Headroom = factory();
    }
}(this, function() {
    'use strict';

    /**
     * Check if object is part of the DOM
     * @constructor
     * @param {Object} obj element to check
     */
    function isDOMElement(obj) {
        return obj && typeof window !== 'undefined' && (obj === window || obj.nodeType);
    }

    /**
     * Helper function for extending objects
     */
    function extend (object /*, objectN ... */) {
        if(arguments.length <= 0) {
            throw new Error('Missing arguments in extend function');
        }

        var result = object || {},
            key,
            i;

        for (i = 1; i < arguments.length; i++) {
            var replacement = arguments[i] || {};

            for (key in replacement) {
                // Recurse into object except if the object is a DOM element
                if(typeof result[key] === 'object' && ! isDOMElement(result[key])) {
                    result[key] = extend(result[key], replacement[key]);
                }
                else {
                    result[key] = result[key] || replacement[key];
                }
            }
        }

        return result;
    }

    if (typeof Headroom === 'undefined') {
        throw new Error('Headroom must be included first!');
    }

    /**
     * Adding the new 'frozen' class
     */
    Headroom.options = extend({}, Headroom.options, {
        classes: {
            frozen : 'headroom--frozen'
        }
    });

    /**
     * Freezes the current state of the widget
     */
    Headroom.prototype.freeze = function() {
        if (this.frozen === true) return;
        this.frozen = true;
        this.elem.classList.add(this.classes.frozen);
    };

    /**
     * Re-enables the default behaviour of the widget
     */
    Headroom.prototype.unfreeze = function() {
        if (this.frozen === undefined || this.frozen === false) return;
        this.frozen = false;
        this.elem.classList.remove(this.classes.frozen);
    };

    /**
     * Extends the update function
     */
    var _update = Headroom.prototype.update;

    Headroom.prototype.update = function() {
        var currentScrollY  = this.getScrollY();

        if(this.isOutOfBounds(currentScrollY)) { // Ignore bouncy scrolling in OSX
            return;
        }

        if (this.frozen === true) {
            this.lastKnownScrollY = currentScrollY;
            return;
        }

        // invoke parent method
        _update.apply(this);
    };

    return Headroom;
}));