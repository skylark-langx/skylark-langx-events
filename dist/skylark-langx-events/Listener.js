/**
 * skylark-langx-events - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-klass","./events","./Event"],function(n,i,t,s,e,r){Array.prototype.slice;var l=t.compact,o=(n.isDefined,n.isUndefined),a=(n.isPlainObject,n.isFunction,n.isBoolean),h=n.isString,f=n.isEmptyObject,u=(i.mixin,i.safeMixin,s({listenTo:function(i,t,s,e,r){if(!i)return this;if(a(e)?(r=e,e=s,s=null):a(s)?(r=s,e=s=null):o(e)&&(r=!1,e=s,s=null),n.isPlainObject(t)){var l=t;for(var f in l)this.listenTo(i,f,l[f],r);return this}e||(e="handleEvent"),h(e)&&(e=this[e]),r?s?i.one(t,s,e,this):i.one(t,e,this):s?i.on(t,s,e,this):i.on(t,e,this);for(var u,v=this._listeningTo||(this._listeningTo=[]),c=0;c<v.length;c++)if(v[c].obj==i){u=v[c];break}u||v.push(u={obj:i,events:{}});var g=u.events,k=g[t]=g[t]||[];return-1==k.indexOf(e)&&k.push(e),this},listenToOnce:function(n,i,t,s){return this.listenTo(n,i,t,s,1)},unlistenTo:function(n,i,t){var s=this._listeningTo;if(!s)return this;h(t)&&(t=this[t]);for(var e=0;e<s.length;e++){var r=s[e];if(!n||n==r.obj){var o=r.events;for(var a in o)if(!i||i==a){var u=o[a];if(u){for(var v=0;v<u.length;v++)t&&t!=u[e]||(r.obj.off(a,u[e],this),u[e]=null);u=o[a]=l(u),f(u)&&(o[a]=null)}}f(o)&&(s[e]=null)}}return s=this._listeningTo=l(s),f(s)&&(this._listeningTo=null),this}}));return e.Listener=u});
//# sourceMappingURL=sourcemaps/Listener.js.map
