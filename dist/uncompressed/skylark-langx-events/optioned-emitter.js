define([
    "skylark-langx-objects",
    "skylark-langx-events/Emitter",
    "./events"
], function(
    objects,
    Emitter, 
    events
) {
    "use strict";

    function parentClass(ctor){
        if (ctor.hasOwnProperty("superclass")) {
            return ctor.superclass;
        }

        return Object.getPrototypeOf(ctor);
    }

 
    var OptionedEmitter =   Emitter.inherit({
        klassName: "OptionedEmitter",

        _construct : function(options) {
           this._initOptions(options);
        },

        _initOptions : function(options) {
          var ctor = this.constructor,
              cache = ctor.cache = (ctor.hasOwnProperty("cache") ? ctor.cache : {}),
              defaults = cache.defaults;
          if (!defaults) {
            var  ctors = [];
            do {
              ctors.unshift(ctor);
              if (ctor === OptionedEmitter) {
                break;
              }
              ctor = parentClass(ctor);
            } while (ctor);

            defaults = cache.defaults = {};
            for (var i=0;i<ctors.length;i++) {
              ctor = ctors[i];
              if (ctor.prototype.hasOwnProperty("options")) {
                objects.mixin(defaults,ctor.prototype.options,true);
              }
              if (ctor.hasOwnProperty("options")) {
                objects.mixin(defaults,ctor.options,true);
              }
            }
          }
          Object.defineProperty(this,"options",{
            value :objects.mixin({},defaults,options,true)
          });

          //return this.options = langx.mixin({},defaults,options);
          return this.options;
        },


        option: function( key, value ) {
            var options = key;
            var parts;
            var curOption;
            var i;

            if ( arguments.length === 0 ) {

                // Don't return a reference to the internal hash
                return objects.mixin( {}, this.options );
            }

            if ( typeof key === "string" ) {

                // Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
                options = {};
                parts = key.split( "." );
                key = parts.shift();
                if ( parts.length ) {
                    curOption = options[ key ] = objects.mixin( {}, this.options[ key ] );
                    for ( i = 0; i < parts.length - 1; i++ ) {
                        curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
                        curOption = curOption[ parts[ i ] ];
                    }
                    key = parts.pop();
                    if ( arguments.length === 1 ) {
                        return curOption[ key ] === undefined ? null : curOption[ key ];
                    }
                    curOption[ key ] = value;
                } else {
                    if ( arguments.length === 1 ) {
                        return this.options[ key ] === undefined ? null : this.options[ key ];
                    }
                    options[ key ] = value;
                }
            }

            this._setOptions( options );

            return this;
        },

        _setOptions: function( options ) {
            var key;

            for ( key in options ) {
                this._setOption( key, options[ key ] );
            }

            return this;
        },

        _setOption: function( key, value ) {

            this.options[ key ] = value;

            return this;
        }
    });


    return  events.OptionedEmitter = OptionedEmitter;
});