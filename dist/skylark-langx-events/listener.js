/**
 * skylark-langx-events - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-klass","./events","./event"],function(c,n,i,e,t,s){Array.prototype.slice;var u=i.compact,g=(c.isDefined,c.isUndefined),T=(c.isPlainObject,c.isFunction,c.isBoolean),k=c.isString,f=c.isEmptyObject,i=(n.mixin,n.safeMixin,e({listenTo:function(n,i,e,t,s){if(n)if(c.isPlainObject(i)){c.isBoolean(e)?(s=e,e=null):c.isBoolean(t)&&(s=t);var l,r=i;for(l in r){var o=l.match(/^([\w:-]*)\s*(.*)$/),a=o[1],o=o[2]||e;o?this.listenTo(n,a,o,r[l],s):this.listenTo(n,a,r[l],s)}}else{T(t)?(s=t,t=e,e=null):T(e)?(s=e,t=e=null):g(t)&&(s=!1,t=e,e=null),k(t=t||"handleEvent")&&(t=this[t]);for(var h,u=this.ensureListenedEmitter(n),f=(s?e?u.one(i,e,t,this):u.one(i,t,this):e?u.on(i,e,t,this):u.on(i,t,this),this._listeningTo||(this._listeningTo=[])),v=0;v<f.length;v++)if(f[v].obj==n){h=f[v];break}h||f.push(h={obj:n,events:{}});u=h.events,u=u[i]=u[i]||[];-1==u.indexOf(t)&&u.push(t)}return this},listenToOnce:function(n,i,e,t){return this.listenTo(n,i,e,t,1)},unlistenTo:function(n,i,e){var t=this._listeningTo;if(t){k(e)&&(e=this[e]);for(var s=0;s<t.length;s++){var l=t[s];if(!n||n==l.obj){var r,o=l.events;for(r in o)if(!i||i==r){var a=o[r];if(a){for(var h=0;h<a.length;h++)e&&e!=a[s]||(this.ensureListenedEmitter(l.obj).off(r,a[s],this),a[s]=null);a=o[r]=u(a),f(a)&&(o[r]=null)}}f(o)&&(t[s]=null)}}t=this._listeningTo=u(t),f(t)&&(this._listeningTo=null)}return this},ensureListenedEmitter:function(n){return n}}));return t.Listener=i});
//# sourceMappingURL=sourcemaps/listener.js.map
