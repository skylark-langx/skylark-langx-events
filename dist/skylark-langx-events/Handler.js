/**
 * skylark-langx-events - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-klass","./events","./Event"],function(n,i,t,s,e,r){Array.prototype.slice;var l=t.compact,o=(n.isDefined,n.isPlainObject,n.isFunction,n.isString),a=n.isEmptyObject,f=(i.mixin,i.safeMixin,s({listenTo:function(n,i,t,s){if(!n)return this;o(t)&&(t=this[t]),s?n.one(i,t,this):n.on(i,t,this);for(var e,r=this._listeningTo||(this._listeningTo=[]),l=0;l<r.length;l++)if(r[l].obj==n){e=r[l];break}e||r.push(e={obj:n,events:{}});var a=e.events,f=a[i]=a[i]||[];return-1==f.indexOf(t)&&f.push(t),this},listenToOnce:function(n,i,t){return this.listenTo(n,i,t,1)},unlistenTo:function(n,i,t){var s=this._listeningTo;if(!s)return this;for(var e=0;e<s.length;e++){var r=s[e];if(!n||n==r.obj){var o=r.events;for(var f in o)if(!i||i==f){for(var h=o[f],u=0;u<h.length;u++)t&&t!=h[e]||(r.obj.off(f,h[e],this),h[e]=null);h=o[f]=l(h),a(h)&&(o[f]=null)}a(o)&&(s[e]=null)}}return s=this._listeningTo=l(s),a(s)&&(this._listeningTo=null),this}}));return e.Handler=f});
//# sourceMappingURL=sourcemaps/Handler.js.map
