/**
 * skylark-langx-events - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-objects","skylark-langx-funcs","skylark-langx-klass","skylark-langx-hoster","./events"],function(n,s,e,t){var o={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};function a(a,r){return!r&&a.isDefaultPrevented||(r=r||a,n.each(o,function(e,t){var n=r[e];a[e]=function(){return this[t]=s.returnTrue,n&&n.apply(r,arguments)},a[t]=s.returnFalse})),a}class r extends CustomEvent{constructor(e,t){super(e,t),n.safeMixin(this,t),a(this)}}return r.compatible=a,t.Event=r});
//# sourceMappingURL=sourcemaps/event.js.map
