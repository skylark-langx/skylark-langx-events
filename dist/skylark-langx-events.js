/**
 * skylark-langx-events - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(n,t){var e=t.define,require=t.require,r="function"==typeof e&&e.amd,i=!r&&"undefined"!=typeof exports;if(!r&&!e){var s={};e=t.define=function(n,t,e){"function"==typeof e?(s[n]={factory:e,deps:t.map(function(t){return function(n,t){if("."!==n[0])return n;var e=t.split("/"),r=n.split("/");e.pop();for(var i=0;i<r.length;i++)"."!=r[i]&&(".."==r[i]?e.pop():e.push(r[i]));return e.join("/")}(t,n)}),resolved:!1,exports:null},require(n)):s[n]={factory:null,resolved:!0,exports:e}},require=t.require=function(n){if(!s.hasOwnProperty(n))throw new Error("Module "+n+" has not been defined");var module=s[n];if(!module.resolved){var e=[];module.deps.forEach(function(n){e.push(require(n))}),module.exports=module.factory.apply(t,e)||null,module.resolved=!0}return module.exports}}if(!e)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(n,require){n("skylark-langx-events/events",["skylark-langx-ns"],function(n){return n.attach("langx.events",{})}),n("skylark-langx-events/Event",["skylark-langx-objects","skylark-langx-funcs","skylark-langx-klass","skylark-langx-hoster","./events"],function(n,t,e,r){var i={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};function s(e,r){return!r&&e.isDefaultPrevented||(r||(r=e),n.each(i,function(n,i){var s=r[n];e[n]=function(){return this[i]=t.returnTrue,s&&s.apply(r,arguments)},e[i]=t.returnFalse})),e}class a extends CustomEvent{constructor(t,e){super(t,e),n.safeMixin(this,e),s(this)}}return a.compatible=s,r.Event=a}),n("skylark-langx-events/Listener",["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-klass","./events","./Event"],function(n,t,e,r,i,s){Array.prototype.slice;var a=e.compact,o=(n.isDefined,n.isUndefined),l=(n.isPlainObject,n.isFunction,n.isBoolean),u=n.isString,f=n.isEmptyObject,h=(t.mixin,t.safeMixin,r({listenTo:function(t,e,r,i,s){if(!t)return this;if(l(i)?(s=i,i=r,r=null):l(r)?(s=r,i=r=null):o(i)&&(s=!1,i=r,r=null),n.isPlainObject(e)){var a=e;for(var f in a)this.listenTo(t,f,a[f],s);return this}i||(i="handleEvent"),u(i)&&(i=this[i]),s?r?t.one(e,r,i,this):t.one(e,i,this):r?t.on(e,r,i,this):t.on(e,i,this);for(var h,c=this._listeningTo||(this._listeningTo=[]),v=0;v<c.length;v++)if(c[v].obj==t){h=c[v];break}h||c.push(h={obj:t,events:{}});var p=h.events,k=p[e]=p[e]||[];return-1==k.indexOf(i)&&k.push(i),this},listenToOnce:function(n,t,e,r){return this.listenTo(n,t,e,r,1)},unlistenTo:function(n,t,e){var r=this._listeningTo;if(!r)return this;u(e)&&(e=this[e]);for(var i=0;i<r.length;i++){var s=r[i];if(!n||n==s.obj){var o=s.events;for(var l in o)if(!t||t==l){var h=o[l];if(h){for(var c=0;c<h.length;c++)e&&e!=h[i]||(s.obj.off(l,h[i],this),h[i]=null);h=o[l]=a(h),f(h)&&(o[l]=null)}}f(o)&&(r[i]=null)}}return r=this._listeningTo=a(r),f(r)&&(this._listeningTo=null),this}}));return i.Listener=h}),n("skylark-langx-events/Emitter",["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-klass","./events","./Event","./Listener"],function(n,t,e,r,i,s,a){var o=Array.prototype.slice,l=e.compact,u=n.isDefined,f=n.isPlainObject,h=n.isFunction,c=n.isString,v=(n.isEmptyObject,t.mixin);t.safeMixin;function p(n){var t=(""+n).split(".");return{name:t[0],ns:t.slice(1).join(" ")}}var k=a.inherit({_prepareArgs:function(n,t){return t=u(t)?[n].concat(t):[n]},on:function(n,t,e,r,i,s){var a=this,o=this._hub||(this._hub={});if(f(n))return i=r,each(n,function(n,r){a.on(n,t,e,r,i,s)}),this;if(c(t)||h(r)||(i=r,r=e,e=t,t=void 0),h(e)&&(i=r,r=e,e=null),!r)throw new Error("No callback function");if(!h(r))throw new Error("The callback  is not afunction");return c(n)&&(n=n.split(/\s/)),n.forEach(function(n){var a=p(n),l=a.name,u=a.ns;(o[l]||(o[l]=[])).push({fn:r,selector:t,data:e,ctx:i,ns:u,one:s})}),this},one:function(n,t,e,r,i){return this.on(n,t,e,r,i,1)},emit:function(n){if(!this._hub)return this;var t=this;c(n)&&(n=new s(n)),Object.defineProperty(n,"target",{value:this});var e=o.call(arguments,1);return e=this._prepareArgs(n,e),[n.type||n.name,"all"].forEach(function(r){var i=p(r),s=i.name,a=i.ns,o=t._hub[s];if(o){for(var u=o.length,h=!1,c=0;c<u;c++){if(n.isImmediatePropagationStopped&&n.isImmediatePropagationStopped())return this;var k=o[c];(!a||k.ns&&k.ns.startsWith(a))&&(k.data&&(n.data=v({},k.data,n.data)),2==e.length&&f(e[1])&&(n.data=n.data||{},v(n.data,e[1])),k.fn.apply(k.ctx,e),k.one&&(o[c]=null,h=!0))}h&&(t._hub[r]=l(o))}}),this},listened:function(n){var t=(this._hub||(this._events={}))[n]||[];return t.length>0},off:function(n,t){if(n){var e=this._hub||(this._hub={});return c(n)&&(n=n.split(/\s/)),n.forEach(function(n){var r=p(n),i=r.name,s=r.ns,a=e[i];if(a){var o=[];if(t||s)for(var l=0,u=a.length;l<u;l++)t&&a[l].fn!==t&&a[l].fn._!==t?o.push(a[l]):!s||a[l].ns&&0==a[l].ns.indexOf(s)||o.push(a[l]);o.length?e[i]=o:delete e[i]}}),this}this._hub=null},trigger:function(){return this.emit.apply(this,arguments)}});return i.Emitter=k}),n("skylark-langx-events/createEvent",["./events","./Event"],function(n,t){return n.createEvent=function(n,e){return new t(n,e)}}),n("skylark-langx-events/main",["./events","./Event","./Listener","./Emitter","./createEvent"],function(n){return n}),n("skylark-langx-events",["skylark-langx-events/main"],function(n){return n})}(e),!r){var a=require("skylark-langx-ns");i?module.exports=a:t.skylarkjs=a}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-langx-events.js.map
