/**
 * skylark-langx-events - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-klass","./events","./event"],function(n,i,t,e,s,r){Array.prototype.slice;var l=t.compact,o=(n.isDefined,n.isUndefined),a=(n.isPlainObject,n.isFunction,n.isBoolean),h=n.isString,u=n.isEmptyObject,f=(i.mixin,i.safeMixin,e({listenTo:function(i,t,e,s,r){if(!i)return this;if(n.isPlainObject(t)){n.isBoolean(e)?(r=e,e=null):n.isBoolean(s)&&(r=s);var l=t;for(var u in l){var f=u.match(/^([\w:-]*)\s*(.*)$/),v=f[1],c=f[2]||e;c?this.listenTo(i,v,c,l[u],r):this.listenTo(i,v,l[u],r)}return this}a(s)?(r=s,s=e,e=null):a(e)?(r=e,s=e=null):o(s)&&(r=!1,s=e,e=null),s||(s="handleEvent"),h(s)&&(s=this[s]);var g=this.ensureListenedEmitter(i);r?e?g.one(t,e,s,this):g.one(t,s,this):e?g.on(t,e,s,this):g.on(t,s,this);for(var T,k=this._listeningTo||(this._listeningTo=[]),b=0;b<k.length;b++)if(k[b].obj==i){T=k[b];break}T||k.push(T={obj:i,events:{}});var d=T.events,y=d[t]=d[t]||[];return-1==y.indexOf(s)&&y.push(s),this},listenToOnce:function(n,i,t,e){return this.listenTo(n,i,t,e,1)},unlistenTo:function(n,i,t){var e=this._listeningTo;if(!e)return this;h(t)&&(t=this[t]);for(var s=0;s<e.length;s++){var r=e[s];if(!n||n==r.obj){var o=r.events;for(var a in o)if(!i||i==a){var f=o[a];if(f){for(var v=0;v<f.length;v++)if(!t||t==f[s]){this.ensureListenedEmitter(r.obj).off(a,f[s],this),f[s]=null}f=o[a]=l(f),u(f)&&(o[a]=null)}}u(o)&&(e[s]=null)}}return e=this._listeningTo=l(e),u(e)&&(this._listeningTo=null),this},ensureListenedEmitter:function(n){return n}}));return s.Listener=f});
//# sourceMappingURL=sourcemaps/listener.js.map
