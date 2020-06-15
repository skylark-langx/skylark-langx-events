/**
 * skylark-langx-events - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(n,r){var t=r.define,require=r.require,e="function"==typeof t&&t.amd,i=!e&&"undefined"!=typeof exports;if(!e&&!t){var o={};t=r.define=function(n,r,t){"function"==typeof t?(o[n]={factory:t,deps:r.map(function(r){return function(n,r){if("."!==n[0])return n;var t=r.split("/"),e=n.split("/");t.pop();for(var i=0;i<e.length;i++)"."!=e[i]&&(".."==e[i]?t.pop():t.push(e[i]));return t.join("/")}(r,n)}),resolved:!1,exports:null},require(n)):o[n]={factory:null,resolved:!0,exports:t}},require=r.require=function(n){if(!o.hasOwnProperty(n))throw new Error("Module "+n+" has not been defined");var module=o[n];if(!module.resolved){var t=[];module.deps.forEach(function(n){t.push(require(n))}),module.exports=module.factory.apply(r,t)||null,module.resolved=!0}return module.exports}}if(!t)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(n,require){n("skylark-langx-ns/_attach",[],function(){return function(n,r,t){"string"==typeof r&&(r=r.split("."));for(var e=r.length,i=n,o=0,a=r[o++];o<e;)i=i[a]=i[a]||{},a=r[o++];return i[a]=t}}),n("skylark-langx-ns/ns",["./_attach"],function(n){var r={attach:function(t,e){return n(r,t,e)}};return r}),n("skylark-langx-ns/main",["./ns"],function(n){return n}),n("skylark-langx-ns",["skylark-langx-ns/main"],function(n){return n}),n("skylark-langx-events/events",["skylark-langx-ns"],function(n){return n.attach("langx.events",{})}),n("skylark-langx-types/types",["skylark-langx-ns"],function(n){var r,t=Array.isArray,e={}.toString,i=(r={},"Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").forEach(function(n){r["[object "+n+"]"]=n.toLowerCase()}),function(n){return null==n?String(n):r[e.call(n)]||"object"}),o=t||function(n){return object&&object.constructor===Array};function a(n){var r;for(r in n)if(null!==n[r])return!1;return!0}function s(n){return"function"==i(n)}function u(n){return n&&n.nodeType}function l(n){return"number"==typeof n}function c(n){var r=typeof n;return"function"===r||"object"===r&&!!n}function f(n){return"string"==typeof n}function p(n){return n&&n==n.window}return n.attach("langx.types",{isArray:o,isArrayLike:function(n){return!f(n)&&!u(n)&&"number"==typeof n.length&&!s(n)},isBoolean:function(n){return!0===n||!1===n||"[object Boolean]"===e.call(n)},isDefined:function(n){return void 0!==n},isDocument:function(n){return null!=n&&n.nodeType==n.DOCUMENT_NODE},isElement:function(n){return!(!n||1!==n.nodeType)},isEmpty:a,isEmptyObject:a,isFunction:s,isHtmlNode:u,isNaN:function(n){return isNaN(n)},isNull:function(n){return null===n},isNumber:l,isNumeric:l,isObject:c,isPlainObject:function(n){return c(n)&&!p(n)&&Object.getPrototypeOf(n)==Object.prototype},isString:f,isSameOrigin:function(n){if(n){var r=location.protocol+"//"+location.hostname;return location.port&&(r+=":"+location.port),n.startsWith(r)}},isSymbol:function(n){return"symbol"==typeof n||isObjectLike(n)&&objectToString.call(n)==symbolTag},isUndefined:function(n){return void 0===n},isWindow:p,type:i})}),n("skylark-langx-types/main",["./types"],function(n){return n}),n("skylark-langx-types",["skylark-langx-types/main"],function(n){return n}),n("skylark-langx-numbers/numbers",["skylark-langx-ns","skylark-langx-types"],function(n,r){var t=r.isObject,e=r.isSymbol,i=1/0,o=1.7976931348623157e308,a=NaN,s=/^\s+|\s+$/g,u=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,c=/^0o[0-7]+$/i,f=parseInt;function p(n){if(!n)return 0===n?n:0;if((n=y(n))===i||n===-i){var r=n<0?-1:1;return r*o}return n==n?n:0}function y(n){if("number"==typeof n)return n;if(e(n))return a;if(t(n)){var r="function"==typeof n.valueOf?n.valueOf():n;n=t(r)?r+"":r}if("string"!=typeof n)return 0===n?n:+n;n=n.replace(s,"");var i=l.test(n);return i||c.test(n)?f(n.slice(2),i?2:8):u.test(n)?a:+n}return n.attach("langx.numbers",{toFinite:p,toNumber:y,toInteger:function(n){var r=p(n),t=r%1;return r==r?t?r-t:r:0}})}),n("skylark-langx-numbers/main",["./numbers"],function(n){return n}),n("skylark-langx-numbers",["skylark-langx-numbers/main"],function(n){return n}),n("skylark-langx-objects/objects",["skylark-langx-ns/ns","skylark-langx-ns/_attach","skylark-langx-types","skylark-langx-numbers"],function(n,r,t,e){var i,o,a=Object.prototype.hasOwnProperty,s=Array.prototype.slice,u=t.isBoolean,l=t.isFunction,c=t.isObject,f=t.isPlainObject,p=t.isArray,y=t.isArrayLike,v=t.isString,h=e.toInteger;var g,k,d="undefined"!=typeof Symbol?Symbol.prototype:null;function b(n){if(!c(n))return[];var r=[];for(var t in n)r.push(t);return r}function x(n,r){if(!p(r))return null!=n&&a.call(n,r);for(var t=r.length,e=0;e<t;e++){var i=r[e];if(null==n||!a.call(n,i))return!1;n=n[i]}return!!t}function m(n,r,t,e){for(var i in r)e&&void 0!==n[i]||(t&&f(r[i])?(f(n[i])||(n[i]={}),m(n[i],r[i],t,e)):void 0!==r[i]&&(n[i]=r[i]));return n}function _(n){var r=s.call(arguments,0),t=r.shift(),e=!1;return u(r[r.length-1])&&(e=r.pop()),{target:t,sources:r,deep:e}}function j(){var n=_.apply(this,arguments);return n.sources.forEach(function(r){m(n.target,r,n.deep,!1)}),n.target}function w(n){for(var r=b(n),t=r.length,e=Array(t),i=0;i<t;i++)e[i]=n[r[i]];return e}return i=function(n,r,t,e){if(n===r)return 0!==n||1/n==1/r;if(null==n||null==r)return!1;if(n!=n)return r!=r;var i=typeof n;return("function"===i||"object"===i||"object"==typeof r)&&o(n,r,t,e)},o=function(n,r,t,e){var o=toString.call(n);if(o!==toString.call(r))return!1;switch(o){case"[object RegExp]":case"[object String]":return""+n==""+r;case"[object Number]":return+n!=+n?+r!=+r:0==+n?1/+n==1/r:+n==+r;case"[object Date]":case"[object Boolean]":return+n==+r;case"[object Symbol]":return d.valueOf.call(n)===d.valueOf.call(r)}var a="[object Array]"===o;if(!a){if("object"!=typeof n||"object"!=typeof r)return!1;var s=n.constructor,u=r.constructor;if(s!==u&&!(l(s)&&s instanceof s&&l(u)&&u instanceof u)&&"constructor"in n&&"constructor"in r)return!1}t=t||[],e=e||[];for(var c=t.length;c--;)if(t[c]===n)return e[c]===r;if(t.push(n),e.push(r),a){if((c=n.length)!==r.length)return!1;for(;c--;)if(!i(n[c],r[c],t,e))return!1}else{var f,p=Object.keys(n);if(c=p.length,Object.keys(r).length!==c)return!1;for(;c--;)if(f=p[c],void 0===r[f]||!i(n[f],r[f],t,e))return!1}return t.pop(),e.pop(),!0},n.attach("langx.objects",{allKeys:b,attach:r,clone:function n(r,t){var e;if(void 0===r||null===r)e=r;else if(t&&r.clone)e=r.clone();else if(p(r)){e=[];for(var i=0;i<r.length;i++)e.push(n(r[i]))}else if(f(r))for(var o in e={},r)e[o]=n(r[o]);else e=r;return e},defaults:(g=b,k=!0,function(n){var r=arguments.length;if(k&&(n=Object(n)),r<2||null==n)return n;for(var t=1;t<r;t++)for(var e=arguments[t],i=g(e),o=i.length,a=0;a<o;a++){var s=i[a];k&&void 0!==n[s]||(n[s]=e[s])}return n}),each:function(n,r,t){var e,i,o,a;if(n)if(void 0===(e=n.length)){for(i in n)if(n.hasOwnProperty(i)&&(a=n[i],!1===(t?r.call(a,a,i):r.call(a,i,a))))break}else for(o=0;o<e&&(a=n[o],!1!==(t?r.call(a,a,o):r.call(a,o,a)));o++);return this},extend:function(n){var r,t=s.call(arguments,1);"boolean"==typeof n&&(r=n,n=t.shift());0==t.length&&(t=[n],n=this);return t.forEach(function(t){j(n,t,r)}),n},has:x,isEqual:function(n,r){return i(n,r)},includes:function(n,r,t,e){n=y(n)?n:w(n),t=t&&!e?h(t):0;var i=n.length;t<0&&(t=nativeMax(i+t,0));return v(n)?t<=i&&n.indexOf(r,t)>-1:!!i&&baseIndexOf(n,r,t)>-1},isMatch:function(n,r){var t=t(r),e=t.length;if(null==n)return!e;for(var i=Object(n),o=0;o<e;o++){var a=t[o];if(r[a]!==i[a]||!(a in i))return!1}return!0},keys:function(n){if(c(n))return[];var r=[];for(var t in n)x(n,t)&&r.push(t);return r},mixin:j,omit:function(n,r,t){if(!n)return null;for(var e=j({},n),i=1;i<arguments.length;i++){var o=arguments[i];o in n&&delete e[o]}return e},pick:function(n,r,t){if(!n)return null;for(var e={},i=1;i<arguments.length;i++){var o=arguments[i];o in n&&(e[o]=n[o])}return e},removeItem:function(n,r){if(p(n)){var t=n.indexOf(r);-1!=t&&n.splice(t,1)}else if(f(n))for(var e in n)if(n[e]==r){delete n[e];break}return this},result:function(n,r,t){p(r)||(r=r.split("."));var e=r.length;if(!e)return l(t)?t.call(n):t;for(var i=0;i<e;i++){var o=null==n?void 0:n[r[i]];void 0===o&&(o=t,i=e),n=l(o)?o.call(n):o}return n},safeMixin:function(){var n=_.apply(this,arguments);return n.sources.forEach(function(r){m(n.target,r,n.deep,!0)}),n.target},values:w})}),n("skylark-langx-objects/main",["./objects"],function(n){return n}),n("skylark-langx-objects",["skylark-langx-objects/main"],function(n){return n}),n("skylark-langx-funcs/funcs",["skylark-langx-ns/ns","skylark-langx-types","skylark-langx-objects"],function(n,r,t){var e=t.mixin,i=Array.prototype.slice,o=r.isFunction,a=r.isString;function s(n,r){var t=2 in arguments&&i.call(arguments,2);if(o(n)){return function(){return n.apply(r,t?t.concat(i.call(arguments)):arguments)}}if(a(r))return t?(t.unshift(n[r],n),s.apply(null,t)):s(n[r],n);throw new TypeError("expected function")}var u=function(){function n(){}return function(r,t){n.prototype=r;var i=new n;return n.prototype=null,t&&e(i,t),i}}(),l={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g},c=/(.)^/,f={"'":"'","\\":"\\","\r":"r","\n":"n","\t":"t","\u2028":"u2028","\u2029":"u2029"},p=/\\|'|\r|\n|\t|\u2028|\u2029/g;return n.attach("langx.funcs",{bind:s,debounce:function(n,r){var t;return function(){var e=this,i=arguments;t&&clearTimeout(t),t=setTimeout(function(){t=null,n.apply(e,i)},r)}},delegate:u,defer:function(n){requestAnimationFrame?requestAnimationFrame(n):setTimeoutout(n);return this},negate:function(n){if("function"!=typeof n)throw new TypeError("Expected a function");return function(...r){return!n.apply(this,r)}},noop:function(){},proxy:s,returnTrue:function(){return!0},returnFalse:function(){return!1},templateSettings:l,template:function(n,r,e){var i;e=t.defaults({},e,l);var o=RegExp([(e.escape||c).source,(e.interpolate||c).source,(e.evaluate||c).source].join("|")+"|$","g"),a=0,u="__p+='";n.replace(o,function(r,t,e,i,o){return u+=n.slice(a,o).replace(p,function(n){return"\\"+f[n]}),t&&(u+="'+\n((__t=("+t+"))==null?'':_.escape(__t))+\n'"),e&&(u+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),i&&(u+="';\n"+i+"\n__p+='"),a=o+r.length,r}),u+="';\n",e.variable||(u="with(obj||{}){\n"+u+"}\n");u="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+u+"return __p;\n";try{i=new Function(e.variable||"obj","_",u)}catch(n){throw n.source=u,n}if(r)return i(r,this);var y=s(function(n){return i.call(this,n,this)},this),v=e.variable||"obj";return y.source="function("+v+"){\n"+u+"}",y}})}),n("skylark-langx-funcs/main",["./funcs"],function(n){return n}),n("skylark-langx-funcs",["skylark-langx-funcs/main"],function(n){return n}),n("skylark-langx-arrays/arrays",["skylark-langx-ns/ns","skylark-langx-types","skylark-langx-objects"],function(n,r,t){var e=Array.prototype.filter,i=Array.prototype.find,o=r.isArrayLike;function a(n,r,t,e){for(var i=n.length,o=t+(e?1:-1);e?o--:++o<i;)if(r(n[o],o,n))return o;return-1}function s(n){return n!=n}function u(n){if(o(n)){for(var r=[],t=0;t<n.length;t++){var e=n[t];if(o(e))for(var i=0;i<e.length;i++)r.push(e[i]);else r.push(e)}return r}return n}return n.attach("langx.arrays",{baseFindIndex:a,baseIndexOf:function(n,r,t){if(r!=r)return a(n,s,t);var e=t-1,i=n.length;for(;++e<i;)if(n[e]===r)return e;return-1},compact:function(n){return e.call(n,function(n){return null!=n})},first:function(n,r){return r?n.slice(0,r):n[0]},filter:function(n,r){return e.call(n,r)},find:function(n,r){return i.call(n,r)},flatten:u,grep:function(n,r){var e=[];return t.each(n,function(n,t){r(t,n)&&e.push(t)}),e},inArray:function(n,r){if(!r)return-1;var t;if(r.indexOf)return r.indexOf(n);t=r.length;for(;t--;)if(r[t]===n)return t;return-1},makeArray:function(n,r,t){if(o(n))return(t||[]).concat(Array.prototype.slice.call(n,r||0));return[n]},merge:function(n,r){var t=r.length,e=n.length,i=0;if("number"==typeof t)for(;i<t;i++)n[e++]=r[i];else for(;void 0!==r[i];)n[e++]=r[i++];return n.length=e,n},forEach:function(n,r){if(n.forEach)return n.forEach(r);for(var t=0;t<n.length;t++)r(n[t],t)},map:function(n,r){var t,e,i,a=[];if(o(n))for(e=0;e<n.length;e++)null!=(t=r.call(n[e],n[e],e))&&a.push(t);else for(i in n)null!=(t=r.call(n[i],n[i],i))&&a.push(t);return u(a)},reduce:function(n,r,t){return Array.prototype.reduce.call(n,r,t)},uniq:function(n){return e.call(n,function(r,t){return n.indexOf(r)==t})}})}),n("skylark-langx-arrays/main",["./arrays"],function(n){return n}),n("skylark-langx-arrays",["skylark-langx-arrays/main"],function(n){return n}),n("skylark-langx-klass/klass",["skylark-langx-ns/ns","skylark-langx-types","skylark-langx-objects","skylark-langx-arrays"],function(n,r,t,e){var i=e.uniq,o=t.has,a=t.mixin,s=r.isArray,u=r.isDefined;var l=function(){function n(){return this._construct?this._construct.apply(this,arguments):this.init?this.init.apply(this,arguments):void 0}return function t(e,l,c,f){s(l)&&(f=c,c=l,l=null),l=l||Object,u(c)&&!s(c)&&(f=c,c=!1);var p=l;c&&(c=function(n,r){var t=[];return r.forEach(function(n){if(o(n,"__mixins__"))throw new Error("nested mixins");for(var r=[];n;)r.unshift(n),n=n.superclass;t=t.concat(r)}),(t=(t=i(t)).filter(function(r){for(var t=n;t;){if(r===t)return!1;if(o(t,"__mixins__"))for(var e=t.__mixins__,i=0;i<e.length;i++)if(e[i]===r)return!1;t=t.superclass}return!0})).length>0&&t}(p,c)),c&&(p=function(n,r){for(var t=n,e=0;e<r.length;e++){var i=new Function;i.prototype=Object.create(t.prototype),i.__proto__=t,i.superclass=null,a(i.prototype,r[e].prototype),i.prototype.__mixin__=r[e],t=i}return t}(p,c));var y=e.klassName||"",v=new Function("return function "+y+"() {var inst = this, ctor = arguments.callee;if (!(inst instanceof ctor)) {inst = Object.create(ctor.prototype);}return ctor._constructor.apply(inst, arguments) || inst;}")();return v.prototype=Object.create(p.prototype),v.prototype.constructor=v,v.superclass=l,v.__proto__=p,v._constructor||(v._constructor=n),c&&(v.__mixins__=c),v.partial||(v.partial=function(n,t){return function(n,t,e){var i=n.prototype,o=n.superclass.prototype,a=e&&e.noOverrided;e&&e.overrides;for(var s in t)if("constructor"!==s){var u=t[s];"function"==typeof t[s]?i[s]=u._constructor||a||"function"!=typeof o[s]?u:function(n,r,t){return function(){var n=this.overrided;this.overrided=t;var e=r.apply(this,arguments);return this.overrided=n,e}}(0,u,o[s]):r.isPlainObject(u)&&null!==u&&u.get?Object.defineProperty(i,s,u):i[s]=u}return n}(this,n,t)}),v.inherit||(v.inherit=function(n,r,e){return t(n,this,r,e)}),v.partial(e,f),v}}();return n.attach("langx.klass",l)}),n("skylark-langx-klass/main",["./klass"],function(n){return n}),n("skylark-langx-klass",["skylark-langx-klass/main"],function(n){return n}),n("skylark-langx-hoster/hoster",["skylark-langx-ns"],function(n){var r={isBrowser:!0,isNode:null,global:this,browser:null,node:null};"object"==typeof process&&process.versions&&process.versions.node&&process.versions.v8&&(r.isNode=!0,r.isBrowser=!1),r.global=function(){return"undefined"!=typeof global&&"function"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:this}();var t=null;if(Object.defineProperty(r,"document",function(){if(!t){var n="undefined"==typeof window?require("html-element"):window;t=n.document}return t}),void 0===r.global.CustomEvent&&(r.global.CustomEvent=function(n,r){this.type=n,this.props=r}),Object.defineProperty(r,"document",function(){if(!t){var n="undefined"==typeof window?require("html-element"):window;t=n.document}return t}),r.isBrowser){var e=function(n){n=n.toLowerCase();var r=/(chrome)[ \/]([\w.]+)/.exec(n)||/(webkit)[ \/]([\w.]+)/.exec(n)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(n)||/(msie) ([\w.]+)/.exec(n)||n.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(n)||[];return{browser:r[1]||"",version:r[2]||"0"}}(navigator.userAgent),i=r.browser={};e.browser&&(i[e.browser]=!0,i.version=e.version),i.chrome?i.webkit=!0:i.webkit&&(i.safari=!0)}return n.attach("langx.hoster",r)}),n("skylark-langx-hoster/main",["./hoster"],function(n){return n}),n("skylark-langx-hoster",["skylark-langx-hoster/main"],function(n){return n}),n("skylark-langx-events/Event",["skylark-langx-objects","skylark-langx-funcs","skylark-langx-klass","skylark-langx-hoster"],function(n,r,t){var e={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};function i(t,i){return!i&&t.isDefaultPrevented||(i||(i=t),n.each(e,function(n,e){var o=i[n];t[n]=function(){return this[e]=r.returnTrue,o&&o.apply(i,arguments)},t[e]=r.returnFalse})),t}class o extends CustomEvent{constructor(r,t){super(r,t),n.safeMixin(this,t),i(this)}}return o.compatible=i,o}),n("skylark-langx-events/Listener",["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-klass","./events","./Event"],function(n,r,t,e,i,o){Array.prototype.slice;var a=t.compact,s=(n.isDefined,n.isPlainObject,n.isFunction,n.isBoolean),u=n.isString,l=n.isEmptyObject,c=(r.mixin,r.safeMixin,e({listenTo:function(r,t,e,i){if(!r)return this;if(s(e)&&(i=e,e=null),n.isPlainObject(t)){var o=t;for(var a in o)this.listeningTo(r,a,o[a],i);return this}e||(e="handleEvent"),u(e)&&(e=this[e]),i?r.one(t,e,this):r.on(t,e,this);for(var l,c=this._listeningTo||(this._listeningTo=[]),f=0;f<c.length;f++)if(c[f].obj==r){l=c[f];break}l||c.push(l={obj:r,events:{}});var p=l.events,y=p[t]=p[t]||[];return-1==y.indexOf(e)&&y.push(e),this},listenToOnce:function(n,r,t){return this.listenTo(n,r,t,1)},unlistenTo:function(n,r,t){var e=this._listeningTo;if(!e)return this;u(t)&&(t=this[t]);for(var i=0;i<e.length;i++){var o=e[i];if(!n||n==o.obj){var s=o.events;for(var c in s)if(!r||r==c){for(var f=s[c],p=0;p<f.length;p++)t&&t!=f[i]||(o.obj.off(c,f[i],this),f[i]=null);f=s[c]=a(f),l(f)&&(s[c]=null)}l(s)&&(e[i]=null)}}return e=this._listeningTo=a(e),l(e)&&(this._listeningTo=null),this}}));return i.Listener=c}),n("skylark-langx-events/Emitter",["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-klass","./events","./Event","./Listener"],function(n,r,t,e,i,o,a){var s=Array.prototype.slice,u=t.compact,l=n.isDefined,c=n.isPlainObject,f=n.isFunction,p=n.isString,y=(n.isEmptyObject,r.mixin);r.safeMixin;function v(n){var r=(""+n).split(".");return{name:r[0],ns:r.slice(1).join(" ")}}var h=a.inherit({on:function(n,r,t,e,i,o){var a=this,s=this._hub||(this._hub={});if(c(n))return i=e,each(n,function(n,e){a.on(n,r,t,e,i,o)}),this;if(p(r)||f(e)||(i=e,e=t,t=r,r=void 0),f(t)&&(i=e,e=t,t=null),!e)throw new Error("No callback function");if(!f(e))throw new Error("The callback  is not afunction");return p(n)&&(n=n.split(/\s/)),n.forEach(function(n){var a=v(n),u=a.name,l=a.ns;(s[u]||(s[u]=[])).push({fn:e,selector:r,data:t,ctx:i,ns:l,one:o})}),this},one:function(n,r,t,e,i){return this.on(n,r,t,e,i,1)},emit:function(n){if(!this._hub)return this;var r=this;p(n)&&(n=new o(n)),Object.defineProperty(n,"target",{value:this});var t=s.call(arguments,1);return t=l(t)?[n].concat(t):[n],[n.type||n.name,"all"].forEach(function(e){var i=v(e),o=i.name,a=i.ns,s=r._hub[o];if(s){for(var l=s.length,c=!1,f=0;f<l;f++){if(n.isImmediatePropagationStopped&&n.isImmediatePropagationStopped())return this;var p=s[f];(!a||p.ns&&p.ns.startsWith(a))&&(n.data?p.data&&(n.data=y({},p.data,n.data)):n.data=p.data||null,p.fn.apply(p.ctx,t),p.one&&(s[f]=null,c=!0))}c&&(r._hub[e]=u(s))}}),this},listened:function(n){var r=(this._hub||(this._events={}))[n]||[];return r.length>0},off:function(n,r){var t=this._hub||(this._hub={});return p(n)&&(n=n.split(/\s/)),n.forEach(function(n){var e=v(n),i=e.name,o=e.ns,a=t[i];if(a){var s=[];if(r||o)for(var u=0,l=a.length;u<l;u++)r&&a[u].fn!==r&&a[u].fn._!==r?s.push(a[u]):!o||a[u].ns&&0==a[u].ns.indexOf(o)||s.push(a[u]);s.length?t[i]=s:delete t[i]}}),this},trigger:function(){return this.emit.apply(this,arguments)}});return i.Emitter=h}),n("skylark-langx-events/createEvent",["./events","./Event"],function(n,r){return n.createEvent=function(n,t){return new r(n,t)}}),n("skylark-langx-events/main",["./events","./Event","./Listener","./Emitter","./createEvent"],function(n){return n}),n("skylark-langx-events",["skylark-langx-events/main"],function(n){return n})}(t,require),!e){var a=require("skylark-langx-ns");i?module.exports=a:r.skylarkjs=a}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-langx-events-all.js.map
