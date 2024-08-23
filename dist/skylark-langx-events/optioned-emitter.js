/**
 * skylark-langx-events - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-objects","skylark-langx-events/Emitter","./events"],function(p,t,i){"use strict";var h=t.inherit({klassName:"OptionedEmitter",_construct:function(t){this._initOptions(t)},_initOptions:function(t){var i,n=this.constructor,o=n.cache=n.hasOwnProperty("cache")?n.cache:{};if(!(e=o.defaults)){var s=[];do{if(s.unshift(n),n===h)break;n=(i=n).hasOwnProperty("superclass")?i.superclass:Object.getPrototypeOf(i)}while(n);for(var e=o.defaults={},r=0;r<s.length;r++)(n=s[r]).prototype.hasOwnProperty("options")&&p.mixin(e,n.prototype.options,!0),n.hasOwnProperty("options")&&p.mixin(e,n.options,!0)}return Object.defineProperty(this,"options",{value:p.mixin({},e,t,!0)}),this.options},option:function(t,i){var n,o,s,e=t;if(0===arguments.length)return p.mixin({},this.options);if("string"==typeof t)if(e={},t=(n=t.split(".")).shift(),n.length){for(o=e[t]=p.mixin({},this.options[t]),s=0;s<n.length-1;s++)o[n[s]]=o[n[s]]||{},o=o[n[s]];if(t=n.pop(),1===arguments.length)return void 0===o[t]?null:o[t];o[t]=i}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];e[t]=i}return this._setOptions(e),this},_setOptions:function(t){for(var i in t)this._setOption(i,t[i]);return this},_setOption:function(t,i){return this.options[t]=i,this}});return i.OptionedEmitter=h});
//# sourceMappingURL=sourcemaps/optioned-emitter.js.map
