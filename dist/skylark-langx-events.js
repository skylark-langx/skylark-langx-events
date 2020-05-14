/**
 * skylark-langx-events - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(n,t){var e=t.define,require=t.require,r="function"==typeof e&&e.amd,i=!r&&"undefined"!=typeof exports;if(!r&&!e){var s={};e=t.define=function(n,t,e){"function"==typeof e?(s[n]={factory:e,deps:t.map(function(t){return function(n,t){if("."!==n[0])return n;var e=t.split("/"),r=n.split("/");e.pop();for(var i=0;i<r.length;i++)"."!=r[i]&&(".."==r[i]?e.pop():e.push(r[i]));return e.join("/")}(t,n)}),resolved:!1,exports:null},require(n)):s[n]={factory:null,resolved:!0,exports:e}},require=t.require=function(n){if(!s.hasOwnProperty(n))throw new Error("Module "+n+" has not been defined");var module=s[n];if(!module.resolved){var e=[];module.deps.forEach(function(n){e.push(require(n))}),module.exports=module.factory.apply(t,e)||null,module.resolved=!0}return module.exports}}if(!e)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(n,require){n("skylark-langx-events/events",["skylark-langx-ns"],function(n){return n.attach("langx.events",{})}),n("skylark-langx-events/Event",["skylark-langx-objects","skylark-langx-funcs","skylark-langx-klass"],function(n,t,e){var r={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};function i(e,i){return!i&&e.isDefaultPrevented||(i||(i=e),n.each(r,function(n,r){var s=i[n];e[n]=function(){return this[r]=t.returnTrue,s&&s.apply(i,arguments)},e[r]=t.returnFalse})),e}class s extends CustomEvent{constructor(t,e){super(t,e),n.safeMixin(this,e),i(this)}}return s.compatible=i,s}),n("skylark-langx-events/Handler",["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-klass","./events","./Event"],function(n,t,e,r,i,s){Array.prototype.slice;var a=e.compact,o=(n.isDefined,n.isPlainObject,n.isFunction,n.isString),l=n.isEmptyObject,u=(t.mixin,t.safeMixin,r({listenTo:function(n,t,e,r){if(!n)return this;o(e)&&(e=this[e]),r?n.one(t,e,this):n.on(t,e,this);for(var i,s=this._listeningTo||(this._listeningTo=[]),a=0;a<s.length;a++)if(s[a].obj==n){i=s[a];break}i||s.push(i={obj:n,events:{}});var l=i.events,u=l[t]=l[t]||[];return-1==u.indexOf(e)&&u.push(e),this},listenToOnce:function(n,t,e){return this.listenTo(n,t,e,1)},unlistenTo:function(n,t,e){var r=this._listeningTo;if(!r)return this;for(var i=0;i<r.length;i++){var s=r[i];if(!n||n==s.obj){var o=s.events;for(var u in o)if(!t||t==u){for(var f=o[u],c=0;c<f.length;c++)e&&e!=f[i]||(s.obj.off(u,f[i],this),f[i]=null);f=o[u]=a(f),l(f)&&(o[u]=null)}l(o)&&(r[i]=null)}}return r=this._listeningTo=a(r),l(r)&&(this._listeningTo=null),this}}));return i.Handler=u}),n("skylark-langx-events/Emitter",["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-klass","./events","./Event","./Handler"],function(n,t,e,r,i,s,a){var o=Array.prototype.slice,l=e.compact,u=n.isDefined,f=n.isPlainObject,c=n.isFunction,h=n.isString,v=(n.isEmptyObject,t.mixin);t.safeMixin;function p(n){var t=(""+n).split(".");return{name:t[0],ns:t.slice(1).join(" ")}}var k=a.inherit({on:function(n,t,e,r,i,s){var a=this,o=this._hub||(this._hub={});return f(n)?(i=r,each(n,function(n,r){a.on(n,t,e,r,i,s)}),this):(h(t)||c(r)||(i=r,r=e,e=t,t=void 0),c(e)&&(i=r,r=e,e=null),h(n)&&(n=n.split(/\s/)),n.forEach(function(n){var a=p(n),l=a.name,u=a.ns;(o[l]||(o[l]=[])).push({fn:r,selector:t,data:e,ctx:i,ns:u,one:s})}),this)},one:function(n,t,e,r,i){return this.on(n,t,e,r,i,1)},emit:function(n){if(!this._hub)return this;var t=this;h(n)&&(n=new s(n)),Object.defineProperty(n,"target",{value:this});var e=o.call(arguments,1);return e=u(e)?[n].concat(e):[n],[n.type||n.name,"all"].forEach(function(r){var i=p(r),s=i.name,a=i.ns,o=t._hub[s];if(o){for(var u=o.length,f=!1,c=0;c<u;c++){if(n.isImmediatePropagationStopped&&n.isImmediatePropagationStopped())return this;var h=o[c];(!a||h.ns&&h.ns.startsWith(a))&&(n.data?h.data&&(n.data=v({},h.data,n.data)):n.data=h.data||null,h.fn.apply(h.ctx,e),h.one&&(o[c]=null,f=!0))}f&&(t._hub[r]=l(o))}}),this},listened:function(n){var t=(this._hub||(this._events={}))[n]||[];return t.length>0},off:function(n,t){var e=this._hub||(this._hub={});return h(n)&&(n=n.split(/\s/)),n.forEach(function(n){var r=p(n),i=r.name,s=r.ns,a=e[i];if(a){var o=[];if(t||s)for(var l=0,u=a.length;l<u;l++)t&&a[l].fn!==t&&a[l].fn._!==t?o.push(a[l]):!s||a[l].ns&&0==a[l].ns.indexOf(s)||o.push(a[l]);o.length?e[i]=o:delete e[i]}}),this},trigger:function(){return this.emit.apply(this,arguments)}});return i.Emitter=k}),n("skylark-langx-events/createEvent",["./events","./Event"],function(n,t){return n.createEvent=function(n,e){return new t(n,e)}}),n("skylark-langx-events/main",["./events","./Event","./Handler","./Emitter","./createEvent"],function(n){return n}),n("skylark-langx-events",["skylark-langx-events/main"],function(n){return n})}(e),!r){var a=require("skylark-langx-ns");i?module.exports=a:t.skylarkjs=a}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-langx-events.js.map
