/**
 * skylark-langx-events - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-klass","./events","./event","./listener"],function(t,n,e,i,r,a,s){var o=Array.prototype.slice,f=e.compact,u=t.isDefined,p=t.isPlainObject,h=t.isFunction,d=t.isString,g=(t.isEmptyObject,n.mixin);n.safeMixin;function m(t){t=(""+t).split(".");return{name:t[0],ns:t.slice(1).join(" ")}}var l=new Map,e=s.inherit({_prepareArgs:function(t,n){return n=u(n)?[t].concat(n):[t]},on:function(t,e,i,r,a,s){var o=this,u=this._hub||(this._hub={});if(p(t))a=r,each(t,function(t,n){o.on(t,e,i,n,a,s)});else{if(d(e)||h(r)||(a=r,r=i,i=e,e=void 0),h(i)&&(a=r,r=i,i=null),!r)throw new Error("No callback function");if(!h(r))throw new Error("The callback  is not afunction");(t=d(t)?t.split(/\s/):t).forEach(function(t){var t=m(t),n=t.name,t=t.ns;(u[n]||(u[n]=[])).push({fn:r,selector:e,data:i,ctx:a,ns:t,one:s})})}return this},one:function(t,n,e,i,r){return this.on(t,n,e,i,r,1)},emit:function(h){var l,c;return this._hub&&(l=this,d(h)&&(h=new a(h)),Object.defineProperty(h,"target",{value:this}),c=o.call(arguments,1),c=this._prepareArgs(h,c),[h.type||h.name,"all"].forEach(function(t){var n=m(t),e=n.name,i=n.ns,r=l._hub[e];if(r){for(var a=r.length,s=!1,o=0;o<a;o++){if(h.isImmediatePropagationStopped&&h.isImmediatePropagationStopped())return this;var u=r[o];(!i||u.ns&&u.ns.startsWith(i))&&(u.data&&(h.data=g({},u.data,h.data)),2==c.length&&p(c[1])&&(h.data=h.data||{},g(h.data,c[1])),u.fn.apply(u.ctx,c),u.one)&&(s=!(r[o]=null))}s&&(l._hub[t]=f(r))}})),this},queueEmit:function(t){var n=t.type||t;let e=l.get(this);e||(e=new Map,l.set(this,e));var i=e.get(n),i=(e.delete(n),window.clearTimeout(i),window.setTimeout(()=>{0===e.size&&(e=null,l.delete(this)),this.trigger(t)},0));e.set(n,i)},listened:function(t){return 0<((this._hub||(this._events={}))[t]||[]).length},off:function(t,o){var u;if(t)return u=this._hub||(this._hub={}),(t=d(t)?t.split(/\s/):t).forEach(function(t){var t=m(t),n=t.name,e=t.ns,i=u[n];if(i){var r=[];if(o||e)for(var a=0,s=i.length;a<s;a++)(!o||i[a].fn===o||i[a].fn._===o)&&(!e||i[a].ns&&0==i[a].ns.indexOf(e))||r.push(i[a]);r.length?u[n]=r:delete u[n]}}),this;this._hub=null},trigger:function(){return this.emit.apply(this,arguments)},queueTrigger:function(t){return this.queueEmit.apply(this,arguments)}});return r.Emitter=e});
//# sourceMappingURL=sourcemaps/emitter.js.map
