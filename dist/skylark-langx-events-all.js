/**
 * skylark-langx-events - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(n,t){var r=t.define,require=t.require,e="function"==typeof r&&r.amd,i=!e&&"undefined"!=typeof exports;if(!e&&!r){var a={};r=t.define=function(n,t,r){"function"==typeof r?(a[n]={factory:r,deps:t.map(function(t){return function(n,t){if("."!==n[0])return n;var r=t.split("/"),e=n.split("/");r.pop();for(var i=0;i<e.length;i++)"."!=e[i]&&(".."==e[i]?r.pop():r.push(e[i]));return r.join("/")}(t,n)}),resolved:!1,exports:null},require(n)):a[n]={factory:null,resolved:!0,exports:r}},require=t.require=function(n){if(!a.hasOwnProperty(n))throw new Error("Module "+n+" has not been defined");var module=a[n];if(!module.resolved){var r=[];module.deps.forEach(function(n){r.push(require(n))}),module.exports=module.factory.apply(t,r)||null,module.resolved=!0}return module.exports}}if(!r)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(n,require){n("skylark-langx-ns/_attach",[],function(){return function(n,t,r){"string"==typeof t&&(t=t.split("."));for(var e=t.length,i=n,a=0,o=t[a++];a<e;)i=i[o]=i[o]||{},o=t[a++];return i[o]=r}}),n("skylark-langx-ns/ns",["./_attach"],function(n){var t={attach:function(r,e){return n(t,r,e)}};return t}),n("skylark-langx-ns/main",["./ns"],function(n){return n}),n("skylark-langx-ns",["skylark-langx-ns/main"],function(n){return n}),n("skylark-langx-events/events",["skylark-langx-ns"],function(n){return n.attach("langx.events",{})}),n("skylark-langx-types/types",["skylark-langx-ns"],function(n){var t,r=Array.isArray,e={}.toString,i=(t={},"Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").forEach(function(n){t["[object "+n+"]"]=n.toLowerCase()}),function(n){return null==n?String(n):t[e.call(n)]||"object"}),a=r||function(n){return object&&object.constructor===Array};function o(n){var t;for(t in n)if(null!==n[t])return!1;return!0}function u(n){return"function"==i(n)}function s(n){return n&&n.nodeType}function l(n){return"number"==typeof n}function c(n){var t=typeof n;return"function"===t||"object"===t&&!!n}function f(n){return"string"==typeof n}function p(n){return n&&n==n.window}return n.attach("langx.types",{isArray:a,isArrayLike:function(n){return!f(n)&&!s(n)&&"number"==typeof n.length&&!u(n)},isBoolean:function(n){return!0===n||!1===n||"[object Boolean]"===e.call(n)},isDefined:function(n){return void 0!==n},isDocument:function(n){return null!=n&&n.nodeType==n.DOCUMENT_NODE},isElement:function(n){return!(!n||1!==n.nodeType)},isEmpty:o,isEmptyObject:o,isFunction:u,isHtmlNode:s,isNaN:function(n){return isNaN(n)},isNull:function(n){return null===n},isNumber:l,isNumeric:l,isObject:c,isPlainObject:function(n){return c(n)&&!p(n)&&Object.getPrototypeOf(n)==Object.prototype},isString:f,isSameOrigin:function(n){if(n){var t=location.protocol+"//"+location.hostname;return location.port&&(t+=":"+location.port),n.startsWith(t)}},isSymbol:function(n){return"symbol"==typeof n||isObjectLike(n)&&objectToString.call(n)==symbolTag},isUndefined:function(n){return void 0===n},isWindow:p,type:i})}),n("skylark-langx-types/main",["./types"],function(n){return n}),n("skylark-langx-types",["skylark-langx-types/main"],function(n){return n}),n("skylark-langx-numbers/numbers",["skylark-langx-ns","skylark-langx-types"],function(n,t){var r=t.isObject,e=t.isSymbol,i=1/0,a=1.7976931348623157e308,o=NaN,u=/^\s+|\s+$/g,s=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,c=/^0o[0-7]+$/i,f=parseInt;function p(n){if(!n)return 0===n?n:0;if((n=y(n))===i||n===-i){var t=n<0?-1:1;return t*a}return n==n?n:0}function y(n){if("number"==typeof n)return n;if(e(n))return o;if(r(n)){var t="function"==typeof n.valueOf?n.valueOf():n;n=r(t)?t+"":t}if("string"!=typeof n)return 0===n?n:+n;n=n.replace(u,"");var i=l.test(n);return i||c.test(n)?f(n.slice(2),i?2:8):s.test(n)?o:+n}return n.attach("langx.numbers",{toFinite:p,toNumber:y,toInteger:function(n){var t=p(n),r=t%1;return t==t?r?t-r:t:0}})}),n("skylark-langx-numbers/main",["./numbers"],function(n){return n}),n("skylark-langx-numbers",["skylark-langx-numbers/main"],function(n){return n}),n("skylark-langx-objects/objects",["skylark-langx-ns/ns","skylark-langx-ns/_attach","skylark-langx-types","skylark-langx-numbers"],function(n,t,r,e){var i,a,o=Object.prototype.hasOwnProperty,u=Array.prototype.slice,s=r.isBoolean,l=r.isFunction,c=r.isObject,f=r.isPlainObject,p=r.isArray,y=r.isArrayLike,h=r.isString,v=e.toInteger;var g,k,x="undefined"!=typeof Symbol?Symbol.prototype:null;function b(n){if(!c(n))return[];var t=[];for(var r in n)t.push(r);return t}function d(n,t){if(!p(t))return null!=n&&o.call(n,t);for(var r=t.length,e=0;e<r;e++){var i=t[e];if(null==n||!o.call(n,i))return!1;n=n[i]}return!!r}function m(n,t,r,e){for(var i in t)e&&void 0!==n[i]||(r&&(f(t[i])||p(t[i]))?(f(t[i])&&!f(n[i])&&(n[i]={}),p(t[i])&&!p(n[i])&&(n[i]=[]),m(n[i],t[i],r,e)):void 0!==t[i]&&(n[i]=t[i]));return n}function _(n){var t=u.call(arguments,0),r=t.shift(),e=!1;return s(t[t.length-1])&&(e=t.pop()),{target:r,sources:t,deep:e}}function j(){var n=_.apply(this,arguments);return n.sources.forEach(function(t){m(n.target,t,n.deep,!1)}),n.target}function O(n){for(var t=b(n),r=t.length,e=Array(r),i=0;i<r;i++)e[i]=n[t[i]];return e}return i=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return!1;if(n!=n)return t!=t;var i=typeof n;return("function"===i||"object"===i||"object"==typeof t)&&a(n,t,r,e)},a=function(n,t,r,e){var a=toString.call(n);if(a!==toString.call(t))return!1;switch(a){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!=+n?+t!=+t:0==+n?1/+n==1/t:+n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object Symbol]":return x.valueOf.call(n)===x.valueOf.call(t)}var o="[object Array]"===a;if(!o){if("object"!=typeof n||"object"!=typeof t)return!1;var u=n.constructor,s=t.constructor;if(u!==s&&!(l(u)&&u instanceof u&&l(s)&&s instanceof s)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),o){if((c=n.length)!==t.length)return!1;for(;c--;)if(!i(n[c],t[c],r,e))return!1}else{var f,p=Object.keys(n);if(c=p.length,Object.keys(t).length!==c)return!1;for(;c--;)if(f=p[c],void 0===t[f]||!i(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0},n.attach("langx.objects",{allKeys:b,attach:t,clone:function n(t,r){var e;if(void 0===t||null===t)e=t;else if(r&&t.clone)e=t.clone();else if(p(t)){e=[];for(var i=0;i<t.length;i++)e.push(n(t[i]))}else if(f(t))for(var a in e={},t)e[a]=n(t[a]);else e=t;return e},defaults:(g=b,k=!0,function(n){var t=arguments.length;if(k&&(n=Object(n)),t<2||null==n)return n;for(var r=1;r<t;r++)for(var e=arguments[r],i=g(e),a=i.length,o=0;o<a;o++){var u=i[o];k&&void 0!==n[u]||(n[u]=e[u])}return n}),each:function(n,t,r){var e,i,a,o;if(n)if(void 0===(e=n.length)){for(i in n)if(n.hasOwnProperty(i)&&(o=n[i],!1===(r?t.call(o,o,i):t.call(o,i,o))))break}else for(a=0;a<e&&(o=n[a],!1!==(r?t.call(o,o,a):t.call(o,a,o)));a++);return this},extend:function(n){var t,r=u.call(arguments,1);"boolean"==typeof n&&(t=n,n=r.shift());0==r.length&&(r=[n],n=this);return r.forEach(function(r){j(n,r,t)}),n},has:d,isEqual:function(n,t){return i(n,t)},includes:function(n,t,r,e){n=y(n)?n:O(n),r=r&&!e?v(r):0;var i=n.length;r<0&&(r=nativeMax(i+r,0));return h(n)?r<=i&&n.indexOf(t,r)>-1:!!i&&baseIndexOf(n,t,r)>-1},isMatch:function(n,t){var r=r(t),e=r.length;if(null==n)return!e;for(var i=Object(n),a=0;a<e;a++){var o=r[a];if(t[o]!==i[o]||!(o in i))return!1}return!0},keys:function(n){if(c(n))return[];var t=[];for(var r in n)d(n,r)&&t.push(r);return t},mixin:j,omit:function(n,t,r){if(!n)return null;for(var e=j({},n),i=1;i<arguments.length;i++){var a=arguments[i];a in n&&delete e[a]}return e},pick:function(n,t,r){if(!n)return null;for(var e={},i=1;i<arguments.length;i++){var a=arguments[i];a in n&&(e[a]=n[a])}return e},removeItem:function(n,t){if(p(n)){var r=n.indexOf(t);-1!=r&&n.splice(r,1)}else if(f(n))for(var e in n)if(n[e]==t){delete n[e];break}return this},result:function(n,t,r){p(t)||(t=t.split("."));var e=t.length;if(!e)return l(r)?r.call(n):r;for(var i=0;i<e;i++){var a=null==n?void 0:n[t[i]];void 0===a&&(a=r,i=e),n=l(a)?a.call(n):a}return n},safeMixin:function(){var n=_.apply(this,arguments);return n.sources.forEach(function(t){m(n.target,t,n.deep,!0)}),n.target},values:O})}),n("skylark-langx-objects/main",["./objects"],function(n){return n}),n("skylark-langx-objects",["skylark-langx-objects/main"],function(n){return n}),n("skylark-langx-funcs/funcs",["skylark-langx-ns/ns","skylark-langx-types","skylark-langx-objects"],function(n,t,r){var e=r.mixin,i=Array.prototype.slice,a=t.isFunction,o=t.isString;function u(n,t){var r=2 in arguments&&i.call(arguments,2);if(a(n)){return function(){return n.apply(t,r?r.concat(i.call(arguments)):arguments)}}if(o(t))return r?(r.unshift(n[t],n),u.apply(null,r)):u(n[t],n);throw new TypeError("expected function")}var s=function(){function n(){}return function(t,r){n.prototype=t;var i=new n;return n.prototype=null,r&&e(i,r),i}}(),l={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g},c=/(.)^/,f={"'":"'","\\":"\\","\r":"r","\n":"n","\t":"t","\u2028":"u2028","\u2029":"u2029"},p=/\\|'|\r|\n|\t|\u2028|\u2029/g;return n.attach("langx.funcs",{bind:u,debounce:function(n,t){var r;return function(){var e=this,i=arguments;r&&clearTimeout(r),r=setTimeout(function(){r=null,n.apply(e,i)},t)}},delegate:s,defer:function(n){requestAnimationFrame?requestAnimationFrame(n):setTimeoutout(n);return this},negate:function(n){if("function"!=typeof n)throw new TypeError("Expected a function");return function(...t){return!n.apply(this,t)}},noop:function(){},proxy:u,returnTrue:function(){return!0},returnFalse:function(){return!1},templateSettings:l,template:function(n,t,e){var i;e=r.defaults({},e,l);var a=RegExp([(e.escape||c).source,(e.interpolate||c).source,(e.evaluate||c).source].join("|")+"|$","g"),o=0,s="__p+='";n.replace(a,function(t,r,e,i,a){return s+=n.slice(o,a).replace(p,function(n){return"\\"+f[n]}),r&&(s+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(s+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),i&&(s+="';\n"+i+"\n__p+='"),o=a+t.length,t}),s+="';\n",e.variable||(s="with(obj||{}){\n"+s+"}\n");s="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+s+"return __p;\n";try{i=new Function(e.variable||"obj","_",s)}catch(n){throw n.source=s,n}if(t)return i(t,this);var y=u(function(n){return i.call(this,n,this)},this),h=e.variable||"obj";return y.source="function("+h+"){\n"+s+"}",y}})}),n("skylark-langx-funcs/main",["./funcs"],function(n){return n}),n("skylark-langx-funcs",["skylark-langx-funcs/main"],function(n){return n}),n("skylark-langx-arrays/arrays",["skylark-langx-ns/ns","skylark-langx-types","skylark-langx-objects"],function(n,t,r){var e=Array.prototype.filter,i=Array.prototype.find,a=t.isArrayLike;function o(n,t,r,e){for(var i=n.length,a=r+(e?1:-1);e?a--:++a<i;)if(t(n[a],a,n))return a;return-1}function u(n){return n!=n}function s(n){if(a(n)){for(var t=[],r=0;r<n.length;r++){var e=n[r];if(a(e))for(var i=0;i<e.length;i++)t.push(e[i]);else t.push(e)}return t}return n}return n.attach("langx.arrays",{baseFindIndex:o,baseIndexOf:function(n,t,r){if(t!=t)return o(n,u,r);var e=r-1,i=n.length;for(;++e<i;)if(n[e]===t)return e;return-1},compact:function(n){return e.call(n,function(n){return null!=n})},first:function(n,t){return t?n.slice(0,t):n[0]},filter:function(n,t){return e.call(n,t)},find:function(n,t){return i.call(n,t)},flatten:s,grep:function(n,t){var e=[];return r.each(n,function(n,r){t(r,n)&&e.push(r)}),e},inArray:function(n,t){if(!t)return-1;var r;if(t.indexOf)return t.indexOf(n);r=t.length;for(;r--;)if(t[r]===n)return r;return-1},makeArray:function(n,t,r){if(a(n))return(r||[]).concat(Array.prototype.slice.call(n,t||0));return[n]},merge:function(n,t){var r=t.length,e=n.length,i=0;if("number"==typeof r)for(;i<r;i++)n[e++]=t[i];else for(;void 0!==t[i];)n[e++]=t[i++];return n.length=e,n},forEach:function(n,t){if(n.forEach)return n.forEach(t);for(var r=0;r<n.length;r++)t(n[r],r)},map:function(n,t){var r,e,i,o=[];if(a(n))for(e=0;e<n.length;e++)null!=(r=t.call(n[e],n[e],e))&&o.push(r);else for(i in n)null!=(r=t.call(n[i],n[i],i))&&o.push(r);return s(o)},reduce:function(n,t,r){return Array.prototype.reduce.call(n,t,r)},uniq:function(n){return e.call(n,function(t,r){return n.indexOf(t)==r})}})}),n("skylark-langx-arrays/main",["./arrays"],function(n){return n}),n("skylark-langx-arrays",["skylark-langx-arrays/main"],function(n){return n}),n("skylark-langx-klass/klass",["skylark-langx-ns/ns","skylark-langx-types","skylark-langx-objects","skylark-langx-arrays"],function(n,t,r,e){var i=e.uniq,a=r.has,o=r.mixin,u=t.isArray,s=t.isDefined;var l=function(){function n(){return this._construct?this._construct.apply(this,arguments):this.init?this.init.apply(this,arguments):void 0}return function r(e,l,c,f){u(l)&&(f=c,c=l,l=null),l=l||Object,s(c)&&!u(c)&&(f=c,c=!1);var p=l;c&&(c=function(n,t){var r=[];return t.forEach(function(n){if(a(n,"__mixins__"))throw new Error("nested mixins");for(var t=[];n;)t.unshift(n),n=n.superclass;r=r.concat(t)}),(r=(r=i(r)).filter(function(t){for(var r=n;r;){if(t===r)return!1;if(a(r,"__mixins__"))for(var e=r.__mixins__,i=0;i<e.length;i++)if(e[i]===t)return!1;r=r.superclass}return!0})).length>0&&r}(p,c)),c&&(p=function(n,t){for(var r=n,e=0;e<t.length;e++){var i=new Function;i.prototype=Object.create(r.prototype),i.__proto__=r,i.superclass=null,o(i.prototype,t[e].prototype),i.prototype.__mixin__=t[e],r=i}return r}(p,c));var y=e.klassName||"",h=new Function("return function "+y+"() {var inst = this, ctor = arguments.callee;if (!(inst instanceof ctor)) {inst = Object.create(ctor.prototype);}return ctor._constructor.apply(inst, arguments) || inst;}")();return h.prototype=Object.create(p.prototype),h.prototype.constructor=h,h.superclass=l,h.__proto__=p,h._constructor||(h._constructor=n),c&&(h.__mixins__=c),h.partial||(h.partial=function(n,r){return function(n,r,e){var i=n.prototype,a=n.superclass.prototype,o=e&&e.noOverrided;e&&e.overrides;for(var u in r)if("constructor"!==u){var s=r[u];"function"==typeof r[u]?i[u]=s._constructor||o||"function"!=typeof a[u]?s:function(n,t,r){return function(){var n=this.overrided;this.overrided=r;var e=t.apply(this,arguments);return this.overrided=n,e}}(0,s,a[u]):t.isPlainObject(s)&&null!==s&&s.get?Object.defineProperty(i,u,s):i[u]=s}return n}(this,n,r)}),h.inherit||(h.inherit=function(n,t,e){return r(n,this,t,e)}),h.partial(e,f),h}}();return n.attach("langx.klass",l)}),n("skylark-langx-klass/main",["./klass"],function(n){return n}),n("skylark-langx-klass",["skylark-langx-klass/main"],function(n){return n}),n("skylark-langx-events/Event",["skylark-langx-objects","skylark-langx-funcs","skylark-langx-klass"],function(n,t,r){var e={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};function i(r,i){return!i&&r.isDefaultPrevented||(i||(i=r),n.each(e,function(n,e){var a=i[n];r[n]=function(){return this[e]=t.returnTrue,a&&a.apply(i,arguments)},r[e]=t.returnFalse})),r}class a extends CustomEvent{constructor(t,r){super(t,r),n.safeMixin(this,r),i(this)}}return a.compatible=i,a}),n("skylark-langx-events/Listener",["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-klass","./events","./Event"],function(n,t,r,e,i,a){Array.prototype.slice;var o=r.compact,u=(n.isDefined,n.isPlainObject,n.isFunction,n.isString),s=n.isEmptyObject,l=(t.mixin,t.safeMixin,e({listenTo:function(n,t,r,e){if(!n)return this;u(r)&&(r=this[r]),e?n.one(t,r,this):n.on(t,r,this);for(var i,a=this._listeningTo||(this._listeningTo=[]),o=0;o<a.length;o++)if(a[o].obj==n){i=a[o];break}i||a.push(i={obj:n,events:{}});var s=i.events,l=s[t]=s[t]||[];return-1==l.indexOf(r)&&l.push(r),this},listenToOnce:function(n,t,r){return this.listenTo(n,t,r,1)},unlistenTo:function(n,t,r){var e=this._listeningTo;if(!e)return this;for(var i=0;i<e.length;i++){var a=e[i];if(!n||n==a.obj){var u=a.events;for(var l in u)if(!t||t==l){for(var c=u[l],f=0;f<c.length;f++)r&&r!=c[i]||(a.obj.off(l,c[i],this),c[i]=null);c=u[l]=o(c),s(c)&&(u[l]=null)}s(u)&&(e[i]=null)}}return e=this._listeningTo=o(e),s(e)&&(this._listeningTo=null),this}}));return i.Listener=l}),n("skylark-langx-events/Emitter",["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-klass","./events","./Event","./Listener"],function(n,t,r,e,i,a,o){var u=Array.prototype.slice,s=r.compact,l=n.isDefined,c=n.isPlainObject,f=n.isFunction,p=n.isString,y=(n.isEmptyObject,t.mixin);t.safeMixin;function h(n){var t=(""+n).split(".");return{name:t[0],ns:t.slice(1).join(" ")}}var v=o.inherit({on:function(n,t,r,e,i,a){var o=this,u=this._hub||(this._hub={});if(c(n))return i=e,each(n,function(n,e){o.on(n,t,r,e,i,a)}),this;if(p(t)||f(e)||(i=e,e=r,r=t,t=void 0),f(r)&&(i=e,e=r,r=null),!e)throw new Error("No callback function");if(!f(e))throw new Error("The callback  is not afunction");return p(n)&&(n=n.split(/\s/)),n.forEach(function(n){var o=h(n),s=o.name,l=o.ns;(u[s]||(u[s]=[])).push({fn:e,selector:t,data:r,ctx:i,ns:l,one:a})}),this},one:function(n,t,r,e,i){return this.on(n,t,r,e,i,1)},emit:function(n){if(!this._hub)return this;var t=this;p(n)&&(n=new a(n)),Object.defineProperty(n,"target",{value:this});var r=u.call(arguments,1);return r=l(r)?[n].concat(r):[n],[n.type||n.name,"all"].forEach(function(e){var i=h(e),a=i.name,o=i.ns,u=t._hub[a];if(u){for(var l=u.length,c=!1,f=0;f<l;f++){if(n.isImmediatePropagationStopped&&n.isImmediatePropagationStopped())return this;var p=u[f];(!o||p.ns&&p.ns.startsWith(o))&&(n.data?p.data&&(n.data=y({},p.data,n.data)):n.data=p.data||null,p.fn.apply(p.ctx,r),p.one&&(u[f]=null,c=!0))}c&&(t._hub[e]=s(u))}}),this},listened:function(n){var t=(this._hub||(this._events={}))[n]||[];return t.length>0},off:function(n,t){var r=this._hub||(this._hub={});return p(n)&&(n=n.split(/\s/)),n.forEach(function(n){var e=h(n),i=e.name,a=e.ns,o=r[i];if(o){var u=[];if(t||a)for(var s=0,l=o.length;s<l;s++)t&&o[s].fn!==t&&o[s].fn._!==t?u.push(o[s]):!a||o[s].ns&&0==o[s].ns.indexOf(a)||u.push(o[s]);u.length?r[i]=u:delete r[i]}}),this},trigger:function(){return this.emit.apply(this,arguments)}});return i.Emitter=v}),n("skylark-langx-events/createEvent",["./events","./Event"],function(n,t){return n.createEvent=function(n,r){return new t(n,r)}}),n("skylark-langx-events/main",["./events","./Event","./Listener","./Emitter","./createEvent"],function(n){return n}),n("skylark-langx-events",["skylark-langx-events/main"],function(n){return n})}(r),!e){var o=require("skylark-langx-ns");i?module.exports=o:t.skylarkjs=o}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-langx-events-all.js.map
