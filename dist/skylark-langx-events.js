/**
 * skylark-langx-events - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals,define,require) {
  var isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define("skylark-langx-events/events",["skylark-langx-ns"],function(t){return t.attach("langx.events",{})}),define("skylark-langx-events/event",["skylark-langx-objects","skylark-langx-funcs","skylark-langx-klass","skylark-langx-hoster","./events"],function(e,r,t,n){var a={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};function i(i,s){return!s&&i.isDefaultPrevented||(s=s||i,e.each(a,function(t,n){var e=s[t];i[t]=function(){return this[n]=r.returnTrue,e&&e.apply(s,arguments)},i[n]=r.returnFalse})),i}class s extends CustomEvent{constructor(t,n){super(t,n),e.safeMixin(this,n),i(this)}}return s.compatible=i,n.Event=s}),define("skylark-langx-events/listener",["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-klass","./events","./event"],function(p,t,n,e,i,s){Array.prototype.slice;var h=n.compact,v=(p.isDefined,p.isUndefined),g=(p.isPlainObject,p.isFunction,p.isBoolean),d=p.isString,f=p.isEmptyObject,n=(t.mixin,t.safeMixin,e({listenTo:function(t,n,e,i,s){if(t)if(p.isPlainObject(n)){p.isBoolean(e)?(s=e,e=null):p.isBoolean(i)&&(s=i);var r,a=n;for(r in a){var o=r.match(/^([\w:-]*)\s*(.*)$/),l=o[1],o=o[2]||e;o?this.listenTo(t,l,o,a[r],s):this.listenTo(t,l,a[r],s)}}else{g(i)?(s=i,i=e,e=null):g(e)?(s=e,i=e=null):v(i)&&(s=!1,i=e,e=null),d(i=i||"handleEvent")&&(i=this[i]);for(var u,h=this.ensureListenedEmitter(t),f=(s?e?h.one(n,e,i,this):h.one(n,i,this):e?h.on(n,e,i,this):h.on(n,i,this),this._listeningTo||(this._listeningTo=[])),c=0;c<f.length;c++)if(f[c].obj==t){u=f[c];break}u||f.push(u={obj:t,events:{}});h=u.events,h=h[n]=h[n]||[];-1==h.indexOf(i)&&h.push(i)}return this},listenToOnce:function(t,n,e,i){return this.listenTo(t,n,e,i,1)},unlistenTo:function(t,n,e){var i=this._listeningTo;if(i){d(e)&&(e=this[e]);for(var s=0;s<i.length;s++){var r=i[s];if(!t||t==r.obj){var a,o=r.events;for(a in o)if(!n||n==a){var l=o[a];if(l){for(var u=0;u<l.length;u++)e&&e!=l[s]||(this.ensureListenedEmitter(r.obj).off(a,l[s],this),l[s]=null);l=o[a]=h(l),f(l)&&(o[a]=null)}}f(o)&&(i[s]=null)}}i=this._listeningTo=h(i),f(i)&&(this._listeningTo=null)}return this},ensureListenedEmitter:function(t){return t}}));return i.Listener=n}),define("skylark-langx-events/emitter",["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-klass","./events","./event","./listener"],function(t,n,e,i,s,r,a){var o=Array.prototype.slice,c=e.compact,l=t.isDefined,p=t.isPlainObject,u=t.isFunction,v=t.isString,g=(t.isEmptyObject,n.mixin);n.safeMixin;function d(t){t=(""+t).split(".");return{name:t[0],ns:t.slice(1).join(" ")}}var h=new Map,e=a.inherit({_prepareArgs:function(t,n){return n=l(n)?[t].concat(n):[t]},on:function(t,e,i,s,r,a){var o=this,l=this._hub||(this._hub={});if(p(t))r=s,each(t,function(t,n){o.on(t,e,i,n,r,a)});else{if(v(e)||u(s)||(r=s,s=i,i=e,e=void 0),u(i)&&(r=s,s=i,i=null),!s)throw new Error("No callback function");if(!u(s))throw new Error("The callback  is not afunction");(t=v(t)?t.split(/\s/):t).forEach(function(t){var t=d(t),n=t.name,t=t.ns;(l[n]||(l[n]=[])).push({fn:s,selector:e,data:i,ctx:r,ns:t,one:a})})}return this},one:function(t,n,e,i,s){return this.on(t,n,e,i,s,1)},emit:function(u){var h,f;return this._hub&&(h=this,v(u)&&(u=new r(u)),Object.defineProperty(u,"target",{value:this}),f=o.call(arguments,1),f=this._prepareArgs(u,f),[u.type||u.name,"all"].forEach(function(t){var n=d(t),e=n.name,i=n.ns,s=h._hub[e];if(s){for(var r=s.length,a=!1,o=0;o<r;o++){if(u.isImmediatePropagationStopped&&u.isImmediatePropagationStopped())return this;var l=s[o];(!i||l.ns&&l.ns.startsWith(i))&&(l.data&&(u.data=g({},l.data,u.data)),2==f.length&&p(f[1])&&(u.data=u.data||{},g(u.data,f[1])),l.fn.apply(l.ctx,f),l.one)&&(a=!(s[o]=null))}a&&(h._hub[t]=c(s))}})),this},queueEmit:function(t){var n=t.type||t;let e=h.get(this);e||(e=new Map,h.set(this,e));var i=e.get(n),i=(e.delete(n),window.clearTimeout(i),window.setTimeout(()=>{0===e.size&&(e=null,h.delete(this)),this.trigger(t)},0));e.set(n,i)},listened:function(t){return 0<((this._hub||(this._events={}))[t]||[]).length},off:function(t,o){var l;if(t)return l=this._hub||(this._hub={}),(t=v(t)?t.split(/\s/):t).forEach(function(t){var t=d(t),n=t.name,e=t.ns,i=l[n];if(i){var s=[];if(o||e)for(var r=0,a=i.length;r<a;r++)(!o||i[r].fn===o||i[r].fn._===o)&&(!e||i[r].ns&&0==i[r].ns.indexOf(e))||s.push(i[r]);s.length?l[n]=s:delete l[n]}}),this;this._hub=null},trigger:function(){return this.emit.apply(this,arguments)},queueTrigger:function(t){return this.queueEmit.apply(this,arguments)}});return s.Emitter=e}),define("skylark-langx-events/create-event",["./events","./event"],function(t,e){return t.createEvent=function(t,n){return new e(t,n)}}),define("skylark-langx-events/Emitter",["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-klass","./events","./event","./listener"],function(t,n,e,i,s,r,a){var o=Array.prototype.slice,c=e.compact,l=t.isDefined,p=t.isPlainObject,u=t.isFunction,v=t.isString,g=(t.isEmptyObject,n.mixin);n.safeMixin;function d(t){t=(""+t).split(".");return{name:t[0],ns:t.slice(1).join(" ")}}var h=new Map,e=a.inherit({_prepareArgs:function(t,n){return n=l(n)?[t].concat(n):[t]},on:function(t,e,i,s,r,a){var o=this,l=this._hub||(this._hub={});if(p(t))r=s,each(t,function(t,n){o.on(t,e,i,n,r,a)});else{if(v(e)||u(s)||(r=s,s=i,i=e,e=void 0),u(i)&&(r=s,s=i,i=null),!s)throw new Error("No callback function");if(!u(s))throw new Error("The callback  is not afunction");(t=v(t)?t.split(/\s/):t).forEach(function(t){var t=d(t),n=t.name,t=t.ns;(l[n]||(l[n]=[])).push({fn:s,selector:e,data:i,ctx:r,ns:t,one:a})})}return this},one:function(t,n,e,i,s){return this.on(t,n,e,i,s,1)},emit:function(u){var h,f;return this._hub&&(h=this,v(u)&&(u=new r(u)),Object.defineProperty(u,"target",{value:this}),f=o.call(arguments,1),f=this._prepareArgs(u,f),[u.type||u.name,"all"].forEach(function(t){var n=d(t),e=n.name,i=n.ns,s=h._hub[e];if(s){for(var r=s.length,a=!1,o=0;o<r;o++){if(u.isImmediatePropagationStopped&&u.isImmediatePropagationStopped())return this;var l=s[o];(!i||l.ns&&l.ns.startsWith(i))&&(l.data&&(u.data=g({},l.data,u.data)),2==f.length&&p(f[1])&&(u.data=u.data||{},g(u.data,f[1])),l.fn.apply(l.ctx,f),l.one)&&(a=!(s[o]=null))}a&&(h._hub[t]=c(s))}})),this},queueEmit:function(t){var n=t.type||t;let e=h.get(this);e||(e=new Map,h.set(this,e));var i=e.get(n),i=(e.delete(n),window.clearTimeout(i),window.setTimeout(()=>{0===e.size&&(e=null,h.delete(this)),this.trigger(t)},0));e.set(n,i)},listened:function(t){return 0<((this._hub||(this._events={}))[t]||[]).length},off:function(t,o){var l;if(t)return l=this._hub||(this._hub={}),(t=v(t)?t.split(/\s/):t).forEach(function(t){var t=d(t),n=t.name,e=t.ns,i=l[n];if(i){var s=[];if(o||e)for(var r=0,a=i.length;r<a;r++)(!o||i[r].fn===o||i[r].fn._===o)&&(!e||i[r].ns&&0==i[r].ns.indexOf(e))||s.push(i[r]);s.length?l[n]=s:delete l[n]}}),this;this._hub=null},trigger:function(){return this.emit.apply(this,arguments)},queueTrigger:function(t){return this.queueEmit.apply(this,arguments)}});return s.Emitter=e}),define("skylark-langx-events/optioned-emitter",["skylark-langx-objects","skylark-langx-events/Emitter","./events"],function(o,t,n){"use strict";var l=t.inherit({klassName:"OptionedEmitter",_construct:function(t){this._initOptions(t)},_initOptions:function(t){var n,e=this.constructor,i=e.cache=e.hasOwnProperty("cache")?e.cache:{};if(!(r=i.defaults)){var s=[];do{if(s.unshift(e),e===l)break;e=(n=e).hasOwnProperty("superclass")?n.superclass:Object.getPrototypeOf(n)}while(e);for(var r=i.defaults={},a=0;a<s.length;a++)(e=s[a]).prototype.hasOwnProperty("options")&&o.mixin(r,e.prototype.options,!0),e.hasOwnProperty("options")&&o.mixin(r,e.options,!0)}return Object.defineProperty(this,"options",{value:o.mixin({},r,t,!0)}),this.options},option:function(t,n){var e,i,s,r=t;if(0===arguments.length)return o.mixin({},this.options);if("string"==typeof t)if(r={},t=(e=t.split(".")).shift(),e.length){for(i=r[t]=o.mixin({},this.options[t]),s=0;s<e.length-1;s++)i[e[s]]=i[e[s]]||{},i=i[e[s]];if(t=e.pop(),1===arguments.length)return void 0===i[t]?null:i[t];i[t]=n}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];r[t]=n}return this._setOptions(r),this},_setOptions:function(t){for(var n in t)this._setOption(n,t[n]);return this},_setOption:function(t,n){return this.options[t]=n,this}});return n.OptionedEmitter=l}),define("skylark-langx-events/main",["./events","./event","./listener","./emitter","./create-event","./optioned-emitter"],function(t){return t}),define("skylark-langx-events",["skylark-langx-events/main"],function(t){return t});
},this,define,require);
//# sourceMappingURL=sourcemaps/skylark-langx-events.js.map
