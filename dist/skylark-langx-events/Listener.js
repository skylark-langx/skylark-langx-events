/**
 * skylark-langx-events - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-klass","./events","./Event"],function(n,i,t,s,e,r){Array.prototype.slice;var l=t.compact,o=(n.isDefined,n.isPlainObject,n.isFunction,n.isString),a=n.isEmptyObject,h=(i.mixin,i.safeMixin,s({listenTo:function(n,i,t,s){if(!n)return this;o(t)&&(t=this[t]),s?n.one(i,t,this):n.on(i,t,this);for(var e,r=this._listeningTo||(this._listeningTo=[]),l=0;l<r.length;l++)if(r[l].obj==n){e=r[l];break}e||r.push(e={obj:n,events:{}});var a=e.events,h=a[i]=a[i]||[];return-1==h.indexOf(t)&&h.push(t),this},listenToOnce:function(n,i,t){return this.listenTo(n,i,t,1)},unlistenTo:function(n,i,t){var s=this._listeningTo;if(!s)return this;o(t)&&(t=this[t]);for(var e=0;e<s.length;e++){var r=s[e];if(!n||n==r.obj){var h=r.events;for(var f in h)if(!i||i==f){for(var u=h[f],v=0;v<u.length;v++)t&&t!=u[e]||(r.obj.off(f,u[e],this),u[e]=null);u=h[f]=l(u),a(u)&&(h[f]=null)}a(h)&&(s[e]=null)}}return s=this._listeningTo=l(s),a(s)&&(this._listeningTo=null),this}}));return e.Listener=h});
//# sourceMappingURL=sourcemaps/Listener.js.map
