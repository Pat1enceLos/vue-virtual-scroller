(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = global || self, factory(global['vue-virtual-scroller'] = {}, global.vue));
}(this, (function (exports, vue) { 'use strict';

  var config = {
    itemsLimit: 1000
  };

  function getInternetExplorerVersion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');

    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');

    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');

    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    } // other browser


    return -1;
  }

  let isIE;

  function initCompat () {
    if (!initCompat.init) {
      initCompat.init = true;
      isIE = getInternetExplorerVersion() !== -1;
    }
  }

  var script = {
    name: 'ResizeObserver',

    props: {
      emitOnMount: {
        type: Boolean,
        default: false,
      },

      ignoreWidth: {
        type: Boolean,
        default: false,
      },

      ignoreHeight: {
        type: Boolean,
        default: false,
      },
    },

    emits: [
      'notify',
    ],

    mounted () {
      initCompat();
      vue.nextTick(() => {
        this._w = this.$el.offsetWidth;
        this._h = this.$el.offsetHeight;
        if (this.emitOnMount) {
          this.emitSize();
        }
      });
      const object = document.createElement('object');
      this._resizeObject = object;
      object.setAttribute('aria-hidden', 'true');
      object.setAttribute('tabindex', -1);
      object.onload = this.addResizeHandlers;
      object.type = 'text/html';
      if (isIE) {
        this.$el.appendChild(object);
      }
      object.data = 'about:blank';
      if (!isIE) {
        this.$el.appendChild(object);
      }
    },

    beforeUnmount () {
      this.removeResizeHandlers();
    },

    methods: {
      compareAndNotify () {
        if ((!this.ignoreWidth && this._w !== this.$el.offsetWidth) || (!this.ignoreHeight && this._h !== this.$el.offsetHeight)) {
          this._w = this.$el.offsetWidth;
          this._h = this.$el.offsetHeight;
          this.emitSize();
        }
      },

      emitSize () {
        this.$emit('notify', {
          width: this._w,
          height: this._h,
        });
      },

      addResizeHandlers () {
        this._resizeObject.contentDocument.defaultView.addEventListener('resize', this.compareAndNotify);
        this.compareAndNotify();
      },

      removeResizeHandlers () {
        if (this._resizeObject && this._resizeObject.onload) {
          if (!isIE && this._resizeObject.contentDocument) {
            this._resizeObject.contentDocument.defaultView.removeEventListener('resize', this.compareAndNotify);
          }
          this.$el.removeChild(this._resizeObject);
          this._resizeObject.onload = null;
          this._resizeObject = null;
        }
      },
    },
  };

  const _withId = /*#__PURE__*/vue.withScopeId("data-v-b329ee4c");

  vue.pushScopeId("data-v-b329ee4c");
  const _hoisted_1 = {
    class: "resize-observer",
    tabindex: "-1"
  };
  vue.popScopeId();

  const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
    return (vue.openBlock(), vue.createBlock("div", _hoisted_1))
  });

  script.render = render;
  script.__scopeId = "data-v-b329ee4c";
  script.__file = "src/components/ResizeObserver.vue";

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function processOptions(value) {
    var options;

    if (typeof value === 'function') {
      // Simple options (callback-only)
      options = {
        callback: value
      };
    } else {
      // Options object
      options = value;
    }

    return options;
  }
  function throttle(callback, delay) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var timeout;
    var lastState;
    var currentArgs;

    var throttled = function throttled(state) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      currentArgs = args;
      if (timeout && state === lastState) return;
      var leading = options.leading;

      if (typeof leading === 'function') {
        leading = leading(state, lastState);
      }

      if ((!timeout || state !== lastState) && leading) {
        callback.apply(void 0, [state].concat(_toConsumableArray(currentArgs)));
      }

      lastState = state;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        callback.apply(void 0, [state].concat(_toConsumableArray(currentArgs)));
        timeout = 0;
      }, delay);
    };

    throttled._clear = function () {
      clearTimeout(timeout);
      timeout = null;
    };

    return throttled;
  }
  function deepEqual(val1, val2) {
    if (val1 === val2) return true;

    if (_typeof(val1) === 'object') {
      for (var key in val1) {
        if (!deepEqual(val1[key], val2[key])) {
          return false;
        }
      }

      return true;
    }

    return false;
  }

  var VisibilityState = /*#__PURE__*/function () {
    function VisibilityState(el, options, vnode) {
      _classCallCheck(this, VisibilityState);

      this.el = el;
      this.observer = null;
      this.frozen = false;
      this.createObserver(options, vnode);
    }

    _createClass(VisibilityState, [{
      key: "createObserver",
      value: function createObserver(options, vnode) {
        var _this = this;

        if (this.observer) {
          this.destroyObserver();
        }

        if (this.frozen) return;
        this.options = processOptions(options);

        this.callback = function (result, entry) {
          _this.options.callback(result, entry);

          if (result && _this.options.once) {
            _this.frozen = true;

            _this.destroyObserver();
          }
        }; // Throttle


        if (this.callback && this.options.throttle) {
          var _ref = this.options.throttleOptions || {},
              _leading = _ref.leading;

          this.callback = throttle(this.callback, this.options.throttle, {
            leading: function leading(state) {
              return _leading === 'both' || _leading === 'visible' && state || _leading === 'hidden' && !state;
            }
          });
        }

        this.oldResult = undefined;
        this.observer = new IntersectionObserver(function (entries) {
          var entry = entries[0];

          if (entries.length > 1) {
            var intersectingEntry = entries.find(function (e) {
              return e.isIntersecting;
            });

            if (intersectingEntry) {
              entry = intersectingEntry;
            }
          }

          if (_this.callback) {
            // Use isIntersecting if possible because browsers can report isIntersecting as true, but intersectionRatio as 0, when something very slowly enters the viewport.
            var result = entry.isIntersecting && entry.intersectionRatio >= _this.threshold;
            if (result === _this.oldResult) return;
            _this.oldResult = result;

            _this.callback(result, entry);
          }
        }, this.options.intersection); // Wait for the element to be in document

        vue.nextTick(function () {
          if (_this.observer) {
            _this.observer.observe(_this.el);
          }
        });
      }
    }, {
      key: "destroyObserver",
      value: function destroyObserver() {
        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        } // Cancel throttled call


        if (this.callback && this.callback._clear) {
          this.callback._clear();

          this.callback = null;
        }
      }
    }, {
      key: "threshold",
      get: function get() {
        return this.options.intersection && typeof this.options.intersection.threshold === 'number' ? this.options.intersection.threshold : 0;
      }
    }]);

    return VisibilityState;
  }();

  function beforeMount(el, _ref2, vnode) {
    var value = _ref2.value;
    if (!value) return;

    if (typeof IntersectionObserver === 'undefined') {
      console.warn('[vue-observe-visibility] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/w3c/IntersectionObserver/tree/master/polyfill');
    } else {
      var state = new VisibilityState(el, value, vnode);
      el._vue_visibilityState = state;
    }
  }

  function updated(el, _ref3, vnode) {
    var value = _ref3.value,
        oldValue = _ref3.oldValue;
    if (deepEqual(value, oldValue)) return;
    var state = el._vue_visibilityState;

    if (!value) {
      unmounted(el);
      return;
    }

    if (state) {
      state.createObserver(value, vnode);
    } else {
      beforeMount(el, {
        value: value
      }, vnode);
    }
  }

  function unmounted(el) {
    var state = el._vue_visibilityState;

    if (state) {
      state.destroyObserver();
      delete el._vue_visibilityState;
    }
  }

  var ObserveVisibility = {
    beforeMount: beforeMount,
    updated: updated,
    unmounted: unmounted
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var scrollparent = createCommonjsModule(function (module) {
  (function (root, factory) {
    if ( module.exports) {
      module.exports = factory();
    } else {
      root.Scrollparent = factory();
    }
  }(commonjsGlobal, function () {
    var regex = /(auto|scroll)/;

    var parents = function (node, ps) {
      if (node.parentNode === null) { return ps; }

      return parents(node.parentNode, ps.concat([node]));
    };

    var style = function (node, prop) {
      return getComputedStyle(node, null).getPropertyValue(prop);
    };

    var overflow = function (node) {
      return style(node, "overflow") + style(node, "overflow-y") + style(node, "overflow-x");
    };

    var scroll = function (node) {
     return regex.test(overflow(node));
    };

    var scrollParent = function (node) {
      if (!(node instanceof HTMLElement || node instanceof SVGElement)) {
        return ;
      }

      var ps = parents(node.parentNode, []);

      for (var i = 0; i < ps.length; i += 1) {
        if (scroll(ps[i])) {
          return ps[i];
        }
      }

      return document.scrollingElement || document.documentElement;
    };

    return scrollParent;
  }));
  });

  function _typeof$1(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof$1 = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof$1 = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof$1(obj);
  }

  var props = {
    items: {
      type: Array,
      required: true
    },
    keyField: {
      type: String,
      default: 'id'
    },
    direction: {
      type: String,
      default: 'vertical',
      validator: function validator(value) {
        return ['vertical', 'horizontal'].includes(value);
      }
    }
  };
  function simpleArray() {
    return this.items.length && _typeof$1(this.items[0]) !== 'object';
  }

  var supportsPassive = false;

  if (typeof window !== 'undefined') {
    supportsPassive = false;

    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function get() {
          supportsPassive = true;
        }
      });
      window.addEventListener('test', null, opts);
    } catch (e) {}
  }

  let uid = 0;

  var script$1 = {
    name: 'RecycleScroller',

    components: {
      ResizeObserver: script,
    },

    directives: {
      ObserveVisibility,
    },

    props: {
      ...props,

      itemSize: {
        type: Number,
        default: null,
      },

      minItemSize: {
        type: [Number, String],
        default: null,
      },

      sizeField: {
        type: String,
        default: 'size',
      },

      typeField: {
        type: String,
        default: 'type',
      },

      buffer: {
        type: Number,
        default: 200,
      },

      pageMode: {
        type: Boolean,
        default: false,
      },

      prerender: {
        type: Number,
        default: 0,
      },

      emitUpdate: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['scrolledtoend', 'scrolledtobegin'],

    data () {
      return {
        pool: [],
        totalSize: 0,
        ready: false,
        hoverKey: null,
      }
    },

    computed: {
      sizes () {
        if (this.itemSize === null) {
          const sizes = {
            '-1': { accumulator: 0 },
          };
          const items = this.items;
          const field = this.sizeField;
          const minItemSize = this.minItemSize;
          let computedMinSize = 10000;
          let accumulator = 0;
          let current;
          for (let i = 0, l = items.length; i < l; i++) {
            current = items[i][field] || minItemSize;
            if (current < computedMinSize) {
              computedMinSize = current;
            }
            accumulator += current;
            sizes[i] = { accumulator, size: current };
          }
          // eslint-disable-next-line
          this.$_computedMinItemSize = computedMinSize;
          return sizes
        }
        return []
      },

      simpleArray,
    },

    watch: {
      items () {
        this.updateVisibleItems(true);
      },

      pageMode () {
        this.applyPageMode();
        this.updateVisibleItems(false);
      },

      sizes: {
        handler () {
          this.updateVisibleItems(false);
        },
        deep: true,
      },
    },

    created () {
      this.$_startIndex = 0;
      this.$_endIndex = 0;
      this.$_views = new Map();
      this.$_unusedViews = new Map();
      this.$_scrollDirty = false;
      this.$_lastUpdateScrollPosition = 0;

      // In SSR mode, we also prerender the same number of item for the first render
      // to avoir mismatch between server and client templates
      if (this.prerender) {
        this.$_prerender = true;
        this.updateVisibleItems(false);
      }
    },

    mounted () {
      this.applyPageMode();
      this.$nextTick(() => {
        // In SSR mode, render the real number of visible items
        this.$_prerender = false;
        this.updateVisibleItems(true);
        this.ready = true;
      });
    },

    beforeUnmount () {
      this.removeListeners();
    },

    methods: {
      addView (pool, index, item, key, type) {
        const view = vue.shallowReactive({
          item,
          position: 0,
          nr: {
            id: uid++,
            index,
            used: true,
            key,
            type,
          },
        });
        pool.push(view);
        return view
      },

      unuseView (view, fake = false) {
        const unusedViews = this.$_unusedViews;
        const type = view.nr.type;
        let unusedPool = unusedViews.get(type);
        if (!unusedPool) {
          unusedPool = [];
          unusedViews.set(type, unusedPool);
        }
        unusedPool.push(view);
        if (!fake) {
          view.nr.used = false;
          view.position = -9999;
          this.$_views.delete(view.nr.key);
        }
      },

      handleResize () {
        this.$emit('resize');
        if (this.ready) this.updateVisibleItems(false);
      },

      handleScroll (event) {
        if (!this.$_scrollDirty) {
          this.$_scrollDirty = true;
          requestAnimationFrame(() => {
            this.$_scrollDirty = false;
            const { continuous } = this.updateVisibleItems(false, true);

            // It seems sometimes chrome doesn't fire scroll event :/
            // When non continous scrolling is ending, we force a refresh
            if (!continuous) {
              clearTimeout(this.$_refreshTimout);
              this.$_refreshTimout = setTimeout(this.handleScroll, 100);
            }
          });
        }
      },

      handleVisibilityChange (isVisible, entry) {
        if (this.ready) {
          if (isVisible || entry.boundingClientRect.width !== 0 || entry.boundingClientRect.height !== 0) {
            this.$emit('visible');
            requestAnimationFrame(() => {
              this.updateVisibleItems(false);
            });
          } else {
            this.$emit('hidden');
          }
        }
      },

      updateVisibleItems (checkItem, checkPositionDiff = false) {
        const itemSize = this.itemSize;
        const minItemSize = this.$_computedMinItemSize;
        const typeField = this.typeField;
        const keyField = this.simpleArray ? null : this.keyField;
        const items = this.items;
        const count = items.length;
        const sizes = this.sizes;
        const views = this.$_views;
        const unusedViews = this.$_unusedViews;
        const pool = this.pool;
        let startIndex, endIndex;
        let totalSize;

        if (!count) {
          startIndex = endIndex = totalSize = 0;
        } else if (this.$_prerender) {
          startIndex = 0;
          endIndex = this.prerender;
          totalSize = null;
        } else {
          const scroll = this.getScroll();

          // Skip update if use hasn't scrolled enough
          if (checkPositionDiff) {
            let positionDiff = scroll.start - this.$_lastUpdateScrollPosition;
            if (positionDiff < 0) positionDiff = -positionDiff;
            if ((itemSize === null && positionDiff < minItemSize) || positionDiff < itemSize) {
              return {
                continuous: true,
              }
            }
          }
          this.$_lastUpdateScrollPosition = scroll.start;

          const buffer = this.buffer;
          scroll.start -= buffer;
          scroll.end += buffer;

          // Variable size mode
          if (itemSize === null) {
            let h;
            let a = 0;
            let b = count - 1;
            let i = ~~(count / 2);
            let oldI;

            // Searching for startIndex
            do {
              oldI = i;
              h = sizes[i].accumulator;
              if (h < scroll.start) {
                a = i;
              } else if (i < count - 1 && sizes[i + 1].accumulator > scroll.start) {
                b = i;
              }
              i = ~~((a + b) / 2);
            } while (i !== oldI)
            i < 0 && (i = 0);
            startIndex = i;

            // For container style
            totalSize = sizes[count - 1].accumulator;

            // Searching for endIndex
            for (endIndex = i; endIndex < count && sizes[endIndex].accumulator < scroll.end; endIndex++);
            if (endIndex === -1) {
              endIndex = items.length - 1;
            } else {
              endIndex++;
              // Bounds
              endIndex > count && (endIndex = count);
            }
          } else {
            // Fixed size mode
            startIndex = ~~(scroll.start / itemSize);
            endIndex = Math.ceil(scroll.end / itemSize);

            // Bounds
            startIndex < 0 && (startIndex = 0);
            endIndex > count && (endIndex = count);

            totalSize = count * itemSize;
          }
        }

        if (endIndex - startIndex > config.itemsLimit) {
          this.itemsLimitError();
        }

        this.totalSize = totalSize;

        let view;

        const continuous = startIndex <= this.$_endIndex && endIndex >= this.$_startIndex;

        if (this.$_continuous !== continuous) {
          if (continuous) {
            views.clear();
            unusedViews.clear();
            for (let i = 0, l = pool.length; i < l; i++) {
              view = pool[i];
              this.unuseView(view);
            }
          }
          this.$_continuous = continuous;
        } else if (continuous) {
          for (let i = 0, l = pool.length; i < l; i++) {
            view = pool[i];
            if (view.nr.used) {
              // Update view item index
              if (checkItem) {
                view.nr.index = items.findIndex(
                  item => keyField ? item[keyField] === view.item[keyField] : item === view.item,
                );
              }

              // Check if index is still in visible range
              if (
                view.nr.index === -1 ||
                view.nr.index < startIndex ||
                view.nr.index >= endIndex
              ) {
                this.unuseView(view);
              }
            }
          }
        }

        const unusedIndex = continuous ? null : new Map();

        let item, type, unusedPool;
        let v;
        for (let i = startIndex; i < endIndex; i++) {
          item = items[i];
          const key = keyField ? item[keyField] : item;
          if (key == null) {
            throw new Error(`Key is ${key} on item (keyField is '${keyField}')`)
          }
          view = views.get(key);

          if (!itemSize && !sizes[i].size) {
            if (view) this.unuseView(view);
            continue
          }

          // No view assigned to item
          if (!view) {
            if (i === items.length - 1) this.$emit('scrolledtoend');
            if (i === 0) this.$emit('scrolledtobegin');

            type = item[typeField];
            unusedPool = unusedViews.get(type);

            if (continuous) {
              // Reuse existing view
              if (unusedPool && unusedPool.length) {
                view = unusedPool.pop();
                view.item = item;
                view.nr.used = true;
                view.nr.index = i;
                view.nr.key = key;
                view.nr.type = type;
              } else {
                view = this.addView(pool, i, item, key, type);
              }
            } else {
              // Use existing view
              // We don't care if they are already used
              // because we are not in continous scrolling
              v = unusedIndex.get(type) || 0;

              if (!unusedPool || v >= unusedPool.length) {
                view = this.addView(pool, i, item, key, type);
                this.unuseView(view, true);
                unusedPool = unusedViews.get(type);
              }

              view = unusedPool[v];
              view.item = item;
              view.nr.used = true;
              view.nr.index = i;
              view.nr.key = key;
              view.nr.type = type;
              unusedIndex.set(type, v + 1);
              v++;
            }
            views.set(key, view);
          } else {
            view.nr.used = true;
            view.item = item;
          }

          // Update position
          if (itemSize === null) {
            view.position = sizes[i - 1].accumulator;
          } else {
            view.position = i * itemSize;
          }
        }

        this.$_startIndex = startIndex;
        this.$_endIndex = endIndex;

        if (this.emitUpdate) this.$emit('update', startIndex, endIndex);

        // After the user has finished scrolling
        // Sort views so text selection is correct
        clearTimeout(this.$_sortTimer);
        this.$_sortTimer = setTimeout(this.sortViews, 300);

        return {
          continuous,
        }
      },

      getListenerTarget () {
        let target = scrollparent(this.$el);
        // Fix global scroll target for Chrome and Safari
        if (window.document && (target === window.document.documentElement || target === window.document.body)) {
          target = window;
        }
        return target
      },

      getScroll () {
        const { $el: el, direction } = this;
        const isVertical = direction === 'vertical';
        let scrollState;

        if (this.pageMode) {
          const bounds = el.getBoundingClientRect();
          const boundsSize = isVertical ? bounds.height : bounds.width;
          let start = -(isVertical ? bounds.top : bounds.left);
          let size = isVertical ? window.innerHeight : window.innerWidth;
          if (start < 0) {
            size += start;
            start = 0;
          }
          if (start + size > boundsSize) {
            size = boundsSize - start;
          }
          scrollState = {
            start,
            end: start + size,
          };
        } else if (isVertical) {
          scrollState = {
            start: el.scrollTop,
            end: el.scrollTop + el.clientHeight,
          };
        } else {
          scrollState = {
            start: el.scrollLeft,
            end: el.scrollLeft + el.clientWidth,
          };
        }

        return scrollState
      },

      applyPageMode () {
        if (this.pageMode) {
          this.addListeners();
        } else {
          this.removeListeners();
        }
      },

      addListeners () {
        this.listenerTarget = this.getListenerTarget();
        this.listenerTarget.addEventListener('scroll', this.handleScroll, supportsPassive ? {
          passive: true,
        } : false);
        this.listenerTarget.addEventListener('resize', this.handleResize);
      },

      removeListeners () {
        if (!this.listenerTarget) {
          return
        }

        this.listenerTarget.removeEventListener('scroll', this.handleScroll);
        this.listenerTarget.removeEventListener('resize', this.handleResize);

        this.listenerTarget = null;
      },

      scrollToItem (index) {
        let scroll;
        if (this.itemSize === null) {
          scroll = index > 0 ? this.sizes[index - 1].accumulator : 0;
        } else {
          scroll = index * this.itemSize;
        }
        this.scrollToPosition(scroll);
      },

      scrollToPosition (position) {
        if (this.direction === 'vertical') {
          this.$el.scrollTop = position;
        } else {
          this.$el.scrollLeft = position;
        }
      },

      itemsLimitError () {
        setTimeout(() => {
          console.log('It seems the scroller element isn\'t scrolling, so it tries to render all the items at once.', 'Scroller:', this.$el);
          console.log('Make sure the scroller has a fixed height (or width) and \'overflow-y\' (or \'overflow-x\') set to \'auto\' so it can scroll correctly and only render the items visible in the scroll viewport.');
        });
        throw new Error('Rendered items limit reached')
      },

      sortViews () {
        this.pool.sort((viewA, viewB) => viewA.nr.index - viewB.nr.index);
      },
    },
  };

  const _hoisted_1$1 = {
    key: 0,
    class: "vue-recycle-scroller__slot"
  };
  const _hoisted_2 = {
    key: 1,
    class: "vue-recycle-scroller__slot"
  };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_ResizeObserver = vue.resolveComponent("ResizeObserver");
    const _directive_observe_visibility = vue.resolveDirective("observe-visibility");

    return vue.withDirectives((vue.openBlock(), vue.createBlock("div", {
      class: ["vue-recycle-scroller", {
        ready: $data.ready,
        'page-mode': $props.pageMode,
        [`direction-${_ctx.direction}`]: true,
      }],
      onScrollPassive: _cache[2] || (_cache[2] = (...args) => ($options.handleScroll && $options.handleScroll(...args)))
    }, [
      (_ctx.$slots.before)
        ? (vue.openBlock(), vue.createBlock("div", _hoisted_1$1, [
            vue.renderSlot(_ctx.$slots, "before")
          ]))
        : vue.createCommentVNode("v-if", true),
      vue.createVNode("div", {
        ref: "wrapper",
        style: { [_ctx.direction === 'vertical' ? 'minHeight' : 'minWidth']: $data.totalSize + 'px' },
        class: "vue-recycle-scroller__item-wrapper"
      }, [
        (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($data.pool, (view) => {
          return (vue.openBlock(), vue.createBlock("div", {
            key: view.nr.id,
            style: $data.ready ? { transform: `translate${_ctx.direction === 'vertical' ? 'Y' : 'X'}(${view.position}px)` } : null,
            class: ["vue-recycle-scroller__item-view", { hover: $data.hoverKey === view.nr.key }],
            onMouseenter: $event => ($data.hoverKey = view.nr.key),
            onMouseleave: _cache[1] || (_cache[1] = $event => ($data.hoverKey = null))
          }, [
            vue.renderSlot(_ctx.$slots, "default", {
              item: view.item,
              index: view.nr.index,
              active: view.nr.used
            })
          ], 46 /* CLASS, STYLE, PROPS, HYDRATE_EVENTS */, ["onMouseenter"]))
        }), 128 /* KEYED_FRAGMENT */))
      ], 4 /* STYLE */),
      (_ctx.$slots.after)
        ? (vue.openBlock(), vue.createBlock("div", _hoisted_2, [
            vue.renderSlot(_ctx.$slots, "after")
          ]))
        : vue.createCommentVNode("v-if", true),
      vue.createVNode(_component_ResizeObserver, { onNotify: $options.handleResize }, null, 8 /* PROPS */, ["onNotify"])
    ], 34 /* CLASS, HYDRATE_EVENTS */)), [
      [_directive_observe_visibility, $options.handleVisibilityChange]
    ])
  }

  script$1.render = render$1;
  script$1.__file = "src/components/RecycleScroller.vue";

  var script$2 = {
    name: 'DynamicScroller',

    components: {
      RecycleScroller: script$1,
    },

    inheritAttrs: false,

    provide () {
      if (typeof ResizeObserver !== 'undefined') {
        this.$_resizeObserver = new ResizeObserver(entries => {
          for (const entry of entries) {
            if (entry.target) {
              const event = new CustomEvent(
                'resize',
                {
                  detail: {
                    contentRect: entry.contentRect,
                  },
                },
              );
              entry.target.dispatchEvent(event);
            }
          }
        });
      }

      return {
        vscrollData: this.vscrollData,
        vscrollParent: this,
        vscrollResizeObserver: this.$_resizeObserver,
      }
    },

    props: {
      ...props,

      minItemSize: {
        type: [Number, String],
        required: true,
      },
    },

    data () {
      return {
        vscrollData: {
          active: true,
          sizes: {},
          validSizes: {},
          keyField: this.keyField,
          simpleArray: false,
        },
      }
    },

    computed: {
      simpleArray,

      itemsWithSize () {
        const result = [];
        const { items, keyField, simpleArray } = this;
        const sizes = this.vscrollData.sizes;
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const id = simpleArray ? i : item[keyField];
          let size = sizes[id];
          if (typeof size === 'undefined' && !this.$_undefinedMap[id]) {
            size = 0;
          }
          result.push({
            item,
            id,
            size,
          });
        }
        return result
      },

    },

    watch: {
      items () {
        this.forceUpdate(false);
      },

      simpleArray: {
        handler (value) {
          this.vscrollData.simpleArray = value;
        },
        immediate: true,
      },

      direction (value) {
        this.forceUpdate(true);
      },
    },

    created () {
      this.$_updates = [];
      this.$_undefinedSizes = 0;
      this.$_undefinedMap = {};
    },

    activated () {
      this.vscrollData.active = true;
    },

    deactivated () {
      this.vscrollData.active = false;
    },
    emits: ['vscroll:update', 'resize', 'visible'],

    methods: {
      onScrollerResize () {
        const scroller = this.$refs.scroller;
        if (scroller) {
          this.forceUpdate();
        }
        this.$emit('resize');
      },

      onScrollerVisible () {
        this.$emit('vscroll:update', { force: false });
        this.$emit('visible');
      },

      forceUpdate (clear = true) {
        if (clear || this.simpleArray) {
          this.vscrollData.validSizes = {};
        }
        this.$emit('vscroll:update', { force: true });
      },

      scrollToItem (index) {
        const scroller = this.$refs.scroller;
        if (scroller) scroller.scrollToItem(index);
      },

      getItemSize (item, index = undefined) {
        const id = this.simpleArray ? (index != null ? index : this.items.indexOf(item)) : item[this.keyField];
        return this.vscrollData.sizes[id] || 0
      },

      scrollToBottom () {
        if (this.$_scrollingToBottom) return
        this.$_scrollingToBottom = true;
        const el = this.$el;
        // Item is inserted to the DOM
        this.$nextTick(() => {
          el.scrollTop = el.scrollHeight + 5000;
          // Item sizes are computed
          const cb = () => {
            el.scrollTop = el.scrollHeight + 5000;
            requestAnimationFrame(() => {
              el.scrollTop = el.scrollHeight + 5000;
              if (this.$_undefinedSizes === 0) {
                this.$_scrollingToBottom = false;
              } else {
                requestAnimationFrame(cb);
              }
            });
          };
          requestAnimationFrame(cb);
        });
      },
    },
  };

  function render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_RecycleScroller = vue.resolveComponent("RecycleScroller");

    return (vue.openBlock(), vue.createBlock(_component_RecycleScroller, vue.mergeProps({
      ref: "scroller",
      items: $options.itemsWithSize,
      "min-item-size": $props.minItemSize,
      direction: _ctx.direction,
      "key-field": "id"
    }, _ctx.$attrs, {
      onResize: $options.onScrollerResize,
      onVisible: $options.onScrollerVisible
    }), {
      default: vue.withCtx(({ item: itemWithSize, index, active }) => [
        vue.renderSlot(_ctx.$slots, "default", {
            item: itemWithSize.item,
            index,
            active,
            itemWithSize
          })
      ]),
      before: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "before")
      ]),
      after: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "after")
      ]),
      _: 1 /* STABLE */
    }, 16 /* FULL_PROPS */, ["items", "min-item-size", "direction", "onResize", "onVisible"]))
  }

  script$2.render = render$2;
  script$2.__file = "src/components/DynamicScroller.vue";

  var script$3 = {
    name: 'DynamicScrollerItem',

    inject: [
      'vscrollData',
      'vscrollParent',
      'vscrollResizeObserver',
    ],

    props: {
      // eslint-disable-next-line vue/require-prop-types
      item: {
        required: true,
      },

      watchData: {
        type: Boolean,
        default: false,
      },

      /**
       * Indicates if the view is actively used to display an item.
       */
      active: {
        type: Boolean,
        required: true,
      },

      index: {
        type: Number,
        default: undefined,
      },

      sizeDependencies: {
        type: [Array, Object],
        default: null,
      },

      emitResize: {
        type: Boolean,
        default: false,
      },

      tag: {
        type: String,
        default: 'div',
      },
    },

    computed: {
      id () {
        return this.vscrollData.simpleArray ? this.index : this.item[this.vscrollData.keyField]
      },

      size () {
        return (this.vscrollData.validSizes[this.id] && this.vscrollData.sizes[this.id]) || 0
      },

      finalActive () {
        return this.active && this.vscrollData.active
      },
    },

    watch: {
      watchData: 'updateWatchData',

      id () {
        if (!this.size) {
          this.onDataUpdate();
        }
      },

      finalActive (value) {
        if (!this.size) {
          if (value) {
            if (!this.vscrollParent.$_undefinedMap[this.id]) {
              this.vscrollParent.$_undefinedSizes++;
              this.vscrollParent.$_undefinedMap[this.id] = true;
            }
          } else {
            if (this.vscrollParent.$_undefinedMap[this.id]) {
              this.vscrollParent.$_undefinedSizes--;
              this.vscrollParent.$_undefinedMap[this.id] = false;
            }
          }
        }

        if (this.vscrollResizeObserver) {
          if (value) {
            this.observeSize();
          } else {
            this.unobserveSize();
          }
        } else if (value && this.$_pendingVScrollUpdate === this.id) {
          this.updateSize();
        }
      },
    },
    emits: ['vscroll:update', 'vscroll:update-size'],

    created () {
      if (this.$isServer) return

      this.$_forceNextVScrollUpdate = null;
      this.updateWatchData();

      if (!this.vscrollResizeObserver) {
        for (const k in this.sizeDependencies) {
          this.$watch(() => this.sizeDependencies[k], this.onDataUpdate);
        }

        this.vscrollParent.$on('vscroll:update', this.onVscrollUpdate);
        this.vscrollParent.$on('vscroll:update-size', this.onVscrollUpdateSize);
      }
    },

    mounted () {
      if (this.vscrollData.active) {
        this.updateSize();
        this.observeSize();
      }
    },

    beforeUnmount () {
      this.vscrollParent.$off('vscroll:update', this.onVscrollUpdate);
      this.vscrollParent.$off('vscroll:update-size', this.onVscrollUpdateSize);
      this.unobserveSize();
    },

    methods: {
      updateSize () {
        if (this.finalActive) {
          if (this.$_pendingSizeUpdate !== this.id) {
            this.$_pendingSizeUpdate = this.id;
            this.$_forceNextVScrollUpdate = null;
            this.$_pendingVScrollUpdate = null;
            this.computeSize(this.id);
          }
        } else {
          this.$_forceNextVScrollUpdate = this.id;
        }
      },

      updateWatchData () {
        if (this.watchData) {
          this.$_watchData = this.$watch('data', () => {
            this.onDataUpdate();
          }, {
            deep: true,
          });
        } else if (this.$_watchData) {
          this.$_watchData();
          this.$_watchData = null;
        }
      },

      onVscrollUpdate ({ force }) {
        // If not active, sechedule a size update when it becomes active
        if (!this.finalActive && force) {
          this.$_pendingVScrollUpdate = this.id;
        }

        if (this.$_forceNextVScrollUpdate === this.id || force || !this.size) {
          this.updateSize();
        }
      },

      onDataUpdate () {
        this.updateSize();
      },

      computeSize (id) {
        this.$nextTick(() => {
          if (this.id === id) {
            const width = this.$el.offsetWidth;
            const height = this.$el.offsetHeight;
            this.applySize(width, height);
          }
          this.$_pendingSizeUpdate = null;
        });
      },

      applySize (width, height) {
        const size = Math.round(this.vscrollParent.direction === 'vertical' ? height : width);
        if (size && this.size !== size) {
          if (this.vscrollParent.$_undefinedMap[this.id]) {
            this.vscrollParent.$_undefinedSizes--;
            this.vscrollParent.$_undefinedMap[this.id] = undefined;
          }
          this.vscrollData.sizes[this.id] = size;
          this.vscrollData.validSizes[this.id] = true;
          // this.$set(this.vscrollData.sizes, this.id, size)
          // this.$set(this.vscrollData.validSizes, this.id, true)
          if (this.emitResize) this.$emit('resize', this.id);
        }
      },

      observeSize () {
        if (!this.vscrollResizeObserver) return
        this.vscrollResizeObserver.observe(this.$el.parentNode);
        this.$el.parentNode.addEventListener('resize', this.onResize);
      },

      unobserveSize () {
        if (!this.vscrollResizeObserver) return
        this.vscrollResizeObserver.unobserve(this.$el.parentNode);
        this.$el.parentNode.removeEventListener('resize', this.onResize);
      },

      onResize (event) {
        const { width, height } = event.detail.contentRect;
        this.applySize(width, height);
      },
    },

    render () {
      return vue.h(this.tag, this.$slots.default())
    },
  };

  script$3.__file = "src/components/DynamicScrollerItem.vue";

  function IdState () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$idProp = _ref.idProp,
        idProp = _ref$idProp === void 0 ? function (vm) {
      return vm.item.id;
    } : _ref$idProp;

    var store = vue.reactive({}); // @vue/component

    return {
      data: function data() {
        return {
          idState: null
        };
      },
      created: function created() {
        var _this = this;

        this.$_id = null;

        if (typeof idProp === 'function') {
          this.$_getId = function () {
            return idProp.call(_this, _this);
          };
        } else {
          this.$_getId = function () {
            return _this[idProp];
          };
        }

        this.$watch(this.$_getId, {
          handler: function handler(value) {
            var _this2 = this;

            this.$nextTick(function () {
              _this2.$_id = value;
            });
          },
          immediate: true
        });
        this.$_updateIdState();
      },
      beforeUpdate: function beforeUpdate() {
        this.$_updateIdState();
      },
      methods: {
        /**
         * Initialize an idState
         * @param {number|string} id Unique id for the data
         */
        $_idStateInit: function $_idStateInit(id) {
          var factory = this.$options.idState;

          if (typeof factory === 'function') {
            var data = factory.call(this, this);
            store[id] = data;
            this.$_id = id;
            return data;
          } else {
            throw new Error('[mixin IdState] Missing `idState` function on component definition.');
          }
        },

        /**
         * Ensure idState is created and up-to-date
         */
        $_updateIdState: function $_updateIdState() {
          var id = this.$_getId();

          if (id == null) {
            console.warn("No id found for IdState with idProp: '".concat(idProp, "'."));
          }

          if (id !== this.$_id) {
            if (!store[id]) {
              this.$_idStateInit(id);
            }

            this.idState = store[id];
          }
        }
      }
    };
  }

  function registerComponents(Vue, prefix) {
    Vue.component("".concat(prefix, "recycle-scroller"), script$1);
    Vue.component("".concat(prefix, "RecycleScroller"), script$1);
    Vue.component("".concat(prefix, "dynamic-scroller"), script$2);
    Vue.component("".concat(prefix, "DynamicScroller"), script$2);
    Vue.component("".concat(prefix, "dynamic-scroller-item"), script$3);
    Vue.component("".concat(prefix, "DynamicScrollerItem"), script$3);
  }

  var plugin = {
    // eslint-disable-next-line no-undef
    version: "1.0.17",
    install: function install(Vue, options) {
      var finalOptions = Object.assign({}, {
        installComponents: true,
        componentsPrefix: ''
      }, options);

      for (var key in finalOptions) {
        if (typeof finalOptions[key] !== 'undefined') {
          config[key] = finalOptions[key];
        }
      }

      if (finalOptions.installComponents) {
        registerComponents(Vue, finalOptions.componentsPrefix);
      }
    }
  };

  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  exports.DynamicScroller = script$2;
  exports.DynamicScrollerItem = script$3;
  exports.IdState = IdState;
  exports.RecycleScroller = script$1;
  exports.default = plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vue-virtual-scroller.umd.js.map
