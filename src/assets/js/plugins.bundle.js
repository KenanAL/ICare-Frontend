/*!
 * Bootstrap v4.5.2 (https://getbootstrap.com/)
 * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports, require("jquery"))
    : "function" == typeof define && define.amd
    ? define(["exports", "jquery"], e)
    : e(
        ((t =
          "undefined" != typeof globalThis ? globalThis : t || self).bootstrap =
          {}),
        t.jQuery
      );
})(this, function (t, e) {
  "use strict";
  function n(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(t, i.key, i);
    }
  }
  function i(t, e, i) {
    return e && n(t.prototype, e), i && n(t, i), t;
  }
  function o() {
    return (o =
      Object.assign ||
      function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var i in n)
            Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
        return t;
      }).apply(this, arguments);
  }
  e = e && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  var r = {
    TRANSITION_END: "bsTransitionEnd",
    getUID: function (t) {
      do {
        t += ~~(1e6 * Math.random());
      } while (document.getElementById(t));
      return t;
    },
    getSelectorFromElement: function (t) {
      var e = t.getAttribute("data-target");
      if (!e || "#" === e) {
        var n = t.getAttribute("href");
        e = n && "#" !== n ? n.trim() : "";
      }
      try {
        return document.querySelector(e) ? e : null;
      } catch (t) {
        return null;
      }
    },
    getTransitionDurationFromElement: function (t) {
      if (!t) return 0;
      var n = e(t).css("transition-duration"),
        i = e(t).css("transition-delay"),
        o = parseFloat(n),
        r = parseFloat(i);
      return o || r
        ? ((n = n.split(",")[0]),
          (i = i.split(",")[0]),
          1e3 * (parseFloat(n) + parseFloat(i)))
        : 0;
    },
    reflow: function (t) {
      return t.offsetHeight;
    },
    triggerTransitionEnd: function (t) {
      e(t).trigger("transitionend");
    },
    supportsTransitionEnd: function () {
      return Boolean("transitionend");
    },
    isElement: function (t) {
      return (t[0] || t).nodeType;
    },
    typeCheckConfig: function (t, e, n) {
      for (var i in n)
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          var o = n[i],
            s = e[i],
            a =
              s && r.isElement(s)
                ? "element"
                : null === (l = s) || void 0 === l
                ? "" + l
                : {}.toString
                    .call(l)
                    .match(/\s([a-z]+)/i)[1]
                    .toLowerCase();
          if (!new RegExp(o).test(a))
            throw new Error(
              t.toUpperCase() +
                ': Option "' +
                i +
                '" provided type "' +
                a +
                '" but expected type "' +
                o +
                '".'
            );
        }
      var l;
    },
    findShadowRoot: function (t) {
      if (!document.documentElement.attachShadow) return null;
      if ("function" == typeof t.getRootNode) {
        var e = t.getRootNode();
        return e instanceof ShadowRoot ? e : null;
      }
      return t instanceof ShadowRoot
        ? t
        : t.parentNode
        ? r.findShadowRoot(t.parentNode)
        : null;
    },
    jQueryDetection: function () {
      if (void 0 === e)
        throw new TypeError(
          "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
        );
      var t = e.fn.jquery.split(" ")[0].split(".");
      if (
        (t[0] < 2 && t[1] < 9) ||
        (1 === t[0] && 9 === t[1] && t[2] < 1) ||
        t[0] >= 4
      )
        throw new Error(
          "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
        );
    },
  };
  r.jQueryDetection(),
    (e.fn.emulateTransitionEnd = function (t) {
      var n = this,
        i = !1;
      return (
        e(this).one(r.TRANSITION_END, function () {
          i = !0;
        }),
        setTimeout(function () {
          i || r.triggerTransitionEnd(n);
        }, t),
        this
      );
    }),
    (e.event.special[r.TRANSITION_END] = {
      bindType: "transitionend",
      delegateType: "transitionend",
      handle: function (t) {
        if (e(t.target).is(this))
          return t.handleObj.handler.apply(this, arguments);
      },
    });
  var s = "alert",
    a = e.fn[s],
    l = (function () {
      function t(t) {
        this._element = t;
      }
      var n = t.prototype;
      return (
        (n.close = function (t) {
          var e = this._element;
          t && (e = this._getRootElement(t)),
            this._triggerCloseEvent(e).isDefaultPrevented() ||
              this._removeElement(e);
        }),
        (n.dispose = function () {
          e.removeData(this._element, "bs.alert"), (this._element = null);
        }),
        (n._getRootElement = function (t) {
          var n = r.getSelectorFromElement(t),
            i = !1;
          return (
            n && (i = document.querySelector(n)),
            i || (i = e(t).closest(".alert")[0]),
            i
          );
        }),
        (n._triggerCloseEvent = function (t) {
          var n = e.Event("close.bs.alert");
          return e(t).trigger(n), n;
        }),
        (n._removeElement = function (t) {
          var n = this;
          if ((e(t).removeClass("show"), e(t).hasClass("fade"))) {
            var i = r.getTransitionDurationFromElement(t);
            e(t)
              .one(r.TRANSITION_END, function (e) {
                return n._destroyElement(t, e);
              })
              .emulateTransitionEnd(i);
          } else this._destroyElement(t);
        }),
        (n._destroyElement = function (t) {
          e(t).detach().trigger("closed.bs.alert").remove();
        }),
        (t._jQueryInterface = function (n) {
          return this.each(function () {
            var i = e(this),
              o = i.data("bs.alert");
            o || ((o = new t(this)), i.data("bs.alert", o)),
              "close" === n && o[n](this);
          });
        }),
        (t._handleDismiss = function (t) {
          return function (e) {
            e && e.preventDefault(), t.close(this);
          };
        }),
        i(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
        ]),
        t
      );
    })();
  e(document).on(
    "click.bs.alert.data-api",
    '[data-dismiss="alert"]',
    l._handleDismiss(new l())
  ),
    (e.fn[s] = l._jQueryInterface),
    (e.fn[s].Constructor = l),
    (e.fn[s].noConflict = function () {
      return (e.fn[s] = a), l._jQueryInterface;
    });
  var c = e.fn.button,
    h = (function () {
      function t(t) {
        this._element = t;
      }
      var n = t.prototype;
      return (
        (n.toggle = function () {
          var t = !0,
            n = !0,
            i = e(this._element).closest('[data-toggle="buttons"]')[0];
          if (i) {
            var o = this._element.querySelector('input:not([type="hidden"])');
            if (o) {
              if ("radio" === o.type)
                if (o.checked && this._element.classList.contains("active"))
                  t = !1;
                else {
                  var r = i.querySelector(".active");
                  r && e(r).removeClass("active");
                }
              t &&
                (("checkbox" !== o.type && "radio" !== o.type) ||
                  (o.checked = !this._element.classList.contains("active")),
                e(o).trigger("change")),
                o.focus(),
                (n = !1);
            }
          }
          this._element.hasAttribute("disabled") ||
            this._element.classList.contains("disabled") ||
            (n &&
              this._element.setAttribute(
                "aria-pressed",
                !this._element.classList.contains("active")
              ),
            t && e(this._element).toggleClass("active"));
        }),
        (n.dispose = function () {
          e.removeData(this._element, "bs.button"), (this._element = null);
        }),
        (t._jQueryInterface = function (n) {
          return this.each(function () {
            var i = e(this).data("bs.button");
            i || ((i = new t(this)), e(this).data("bs.button", i)),
              "toggle" === n && i[n]();
          });
        }),
        i(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
        ]),
        t
      );
    })();
  e(document)
    .on("click.bs.button.data-api", '[data-toggle^="button"]', function (t) {
      var n = t.target,
        i = n;
      if (
        (e(n).hasClass("btn") || (n = e(n).closest(".btn")[0]),
        !n || n.hasAttribute("disabled") || n.classList.contains("disabled"))
      )
        t.preventDefault();
      else {
        var o = n.querySelector('input:not([type="hidden"])');
        if (
          o &&
          (o.hasAttribute("disabled") || o.classList.contains("disabled"))
        )
          return void t.preventDefault();
        ("LABEL" !== i.tagName || (o && "checkbox" !== o.type)) &&
          h._jQueryInterface.call(e(n), "toggle");
      }
    })
    .on(
      "focus.bs.button.data-api blur.bs.button.data-api",
      '[data-toggle^="button"]',
      function (t) {
        var n = e(t.target).closest(".btn")[0];
        e(n).toggleClass("focus", /^focus(in)?$/.test(t.type));
      }
    ),
    e(window).on("load.bs.button.data-api", function () {
      for (
        var t = [].slice.call(
            document.querySelectorAll('[data-toggle="buttons"] .btn')
          ),
          e = 0,
          n = t.length;
        e < n;
        e++
      ) {
        var i = t[e],
          o = i.querySelector('input:not([type="hidden"])');
        o.checked || o.hasAttribute("checked")
          ? i.classList.add("active")
          : i.classList.remove("active");
      }
      for (
        var r = 0,
          s = (t = [].slice.call(
            document.querySelectorAll('[data-toggle="button"]')
          )).length;
        r < s;
        r++
      ) {
        var a = t[r];
        "true" === a.getAttribute("aria-pressed")
          ? a.classList.add("active")
          : a.classList.remove("active");
      }
    }),
    (e.fn.button = h._jQueryInterface),
    (e.fn.button.Constructor = h),
    (e.fn.button.noConflict = function () {
      return (e.fn.button = c), h._jQueryInterface;
    });
  var u = "carousel",
    f = e.fn[u],
    d = {
      interval: 5e3,
      keyboard: !0,
      slide: !1,
      pause: "hover",
      wrap: !0,
      touch: !0,
    },
    p = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      slide: "(boolean|string)",
      pause: "(string|boolean)",
      wrap: "boolean",
      touch: "boolean",
    },
    m = { TOUCH: "touch", PEN: "pen" },
    g = (function () {
      function t(t, e) {
        (this._items = null),
          (this._interval = null),
          (this._activeElement = null),
          (this._isPaused = !1),
          (this._isSliding = !1),
          (this.touchTimeout = null),
          (this.touchStartX = 0),
          (this.touchDeltaX = 0),
          (this._config = this._getConfig(e)),
          (this._element = t),
          (this._indicatorsElement = this._element.querySelector(
            ".carousel-indicators"
          )),
          (this._touchSupported =
            "ontouchstart" in document.documentElement ||
            navigator.maxTouchPoints > 0),
          (this._pointerEvent = Boolean(
            window.PointerEvent || window.MSPointerEvent
          )),
          this._addEventListeners();
      }
      var n = t.prototype;
      return (
        (n.next = function () {
          this._isSliding || this._slide("next");
        }),
        (n.nextWhenVisible = function () {
          !document.hidden &&
            e(this._element).is(":visible") &&
            "hidden" !== e(this._element).css("visibility") &&
            this.next();
        }),
        (n.prev = function () {
          this._isSliding || this._slide("prev");
        }),
        (n.pause = function (t) {
          t || (this._isPaused = !0),
            this._element.querySelector(
              ".carousel-item-next, .carousel-item-prev"
            ) && (r.triggerTransitionEnd(this._element), this.cycle(!0)),
            clearInterval(this._interval),
            (this._interval = null);
        }),
        (n.cycle = function (t) {
          t || (this._isPaused = !1),
            this._interval &&
              (clearInterval(this._interval), (this._interval = null)),
            this._config.interval &&
              !this._isPaused &&
              (this._interval = setInterval(
                (document.visibilityState
                  ? this.nextWhenVisible
                  : this.next
                ).bind(this),
                this._config.interval
              ));
        }),
        (n.to = function (t) {
          var n = this;
          this._activeElement = this._element.querySelector(
            ".active.carousel-item"
          );
          var i = this._getItemIndex(this._activeElement);
          if (!(t > this._items.length - 1 || t < 0))
            if (this._isSliding)
              e(this._element).one("slid.bs.carousel", function () {
                return n.to(t);
              });
            else {
              if (i === t) return this.pause(), void this.cycle();
              var o = t > i ? "next" : "prev";
              this._slide(o, this._items[t]);
            }
        }),
        (n.dispose = function () {
          e(this._element).off(".bs.carousel"),
            e.removeData(this._element, "bs.carousel"),
            (this._items = null),
            (this._config = null),
            (this._element = null),
            (this._interval = null),
            (this._isPaused = null),
            (this._isSliding = null),
            (this._activeElement = null),
            (this._indicatorsElement = null);
        }),
        (n._getConfig = function (t) {
          return (t = o({}, d, t)), r.typeCheckConfig(u, t, p), t;
        }),
        (n._handleSwipe = function () {
          var t = Math.abs(this.touchDeltaX);
          if (!(t <= 40)) {
            var e = t / this.touchDeltaX;
            (this.touchDeltaX = 0), e > 0 && this.prev(), e < 0 && this.next();
          }
        }),
        (n._addEventListeners = function () {
          var t = this;
          this._config.keyboard &&
            e(this._element).on("keydown.bs.carousel", function (e) {
              return t._keydown(e);
            }),
            "hover" === this._config.pause &&
              e(this._element)
                .on("mouseenter.bs.carousel", function (e) {
                  return t.pause(e);
                })
                .on("mouseleave.bs.carousel", function (e) {
                  return t.cycle(e);
                }),
            this._config.touch && this._addTouchEventListeners();
        }),
        (n._addTouchEventListeners = function () {
          var t = this;
          if (this._touchSupported) {
            var n = function (e) {
                t._pointerEvent && m[e.originalEvent.pointerType.toUpperCase()]
                  ? (t.touchStartX = e.originalEvent.clientX)
                  : t._pointerEvent ||
                    (t.touchStartX = e.originalEvent.touches[0].clientX);
              },
              i = function (e) {
                t._pointerEvent &&
                  m[e.originalEvent.pointerType.toUpperCase()] &&
                  (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX),
                  t._handleSwipe(),
                  "hover" === t._config.pause &&
                    (t.pause(),
                    t.touchTimeout && clearTimeout(t.touchTimeout),
                    (t.touchTimeout = setTimeout(function (e) {
                      return t.cycle(e);
                    }, 500 + t._config.interval)));
              };
            e(this._element.querySelectorAll(".carousel-item img")).on(
              "dragstart.bs.carousel",
              function (t) {
                return t.preventDefault();
              }
            ),
              this._pointerEvent
                ? (e(this._element).on("pointerdown.bs.carousel", function (t) {
                    return n(t);
                  }),
                  e(this._element).on("pointerup.bs.carousel", function (t) {
                    return i(t);
                  }),
                  this._element.classList.add("pointer-event"))
                : (e(this._element).on("touchstart.bs.carousel", function (t) {
                    return n(t);
                  }),
                  e(this._element).on("touchmove.bs.carousel", function (e) {
                    return (function (e) {
                      e.originalEvent.touches &&
                      e.originalEvent.touches.length > 1
                        ? (t.touchDeltaX = 0)
                        : (t.touchDeltaX =
                            e.originalEvent.touches[0].clientX - t.touchStartX);
                    })(e);
                  }),
                  e(this._element).on("touchend.bs.carousel", function (t) {
                    return i(t);
                  }));
          }
        }),
        (n._keydown = function (t) {
          if (!/input|textarea/i.test(t.target.tagName))
            switch (t.which) {
              case 37:
                t.preventDefault(), this.prev();
                break;
              case 39:
                t.preventDefault(), this.next();
            }
        }),
        (n._getItemIndex = function (t) {
          return (
            (this._items =
              t && t.parentNode
                ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item"))
                : []),
            this._items.indexOf(t)
          );
        }),
        (n._getItemByDirection = function (t, e) {
          var n = "next" === t,
            i = "prev" === t,
            o = this._getItemIndex(e),
            r = this._items.length - 1;
          if (((i && 0 === o) || (n && o === r)) && !this._config.wrap)
            return e;
          var s = (o + ("prev" === t ? -1 : 1)) % this._items.length;
          return -1 === s
            ? this._items[this._items.length - 1]
            : this._items[s];
        }),
        (n._triggerSlideEvent = function (t, n) {
          var i = this._getItemIndex(t),
            o = this._getItemIndex(
              this._element.querySelector(".active.carousel-item")
            ),
            r = e.Event("slide.bs.carousel", {
              relatedTarget: t,
              direction: n,
              from: o,
              to: i,
            });
          return e(this._element).trigger(r), r;
        }),
        (n._setActiveIndicatorElement = function (t) {
          if (this._indicatorsElement) {
            var n = [].slice.call(
              this._indicatorsElement.querySelectorAll(".active")
            );
            e(n).removeClass("active");
            var i = this._indicatorsElement.children[this._getItemIndex(t)];
            i && e(i).addClass("active");
          }
        }),
        (n._slide = function (t, n) {
          var i,
            o,
            s,
            a = this,
            l = this._element.querySelector(".active.carousel-item"),
            c = this._getItemIndex(l),
            h = n || (l && this._getItemByDirection(t, l)),
            u = this._getItemIndex(h),
            f = Boolean(this._interval);
          if (
            ("next" === t
              ? ((i = "carousel-item-left"),
                (o = "carousel-item-next"),
                (s = "left"))
              : ((i = "carousel-item-right"),
                (o = "carousel-item-prev"),
                (s = "right")),
            h && e(h).hasClass("active"))
          )
            this._isSliding = !1;
          else if (
            !this._triggerSlideEvent(h, s).isDefaultPrevented() &&
            l &&
            h
          ) {
            (this._isSliding = !0),
              f && this.pause(),
              this._setActiveIndicatorElement(h);
            var d = e.Event("slid.bs.carousel", {
              relatedTarget: h,
              direction: s,
              from: c,
              to: u,
            });
            if (e(this._element).hasClass("slide")) {
              e(h).addClass(o), r.reflow(h), e(l).addClass(i), e(h).addClass(i);
              var p = parseInt(h.getAttribute("data-interval"), 10);
              p
                ? ((this._config.defaultInterval =
                    this._config.defaultInterval || this._config.interval),
                  (this._config.interval = p))
                : (this._config.interval =
                    this._config.defaultInterval || this._config.interval);
              var m = r.getTransitionDurationFromElement(l);
              e(l)
                .one(r.TRANSITION_END, function () {
                  e(h)
                    .removeClass(i + " " + o)
                    .addClass("active"),
                    e(l).removeClass("active " + o + " " + i),
                    (a._isSliding = !1),
                    setTimeout(function () {
                      return e(a._element).trigger(d);
                    }, 0);
                })
                .emulateTransitionEnd(m);
            } else
              e(l).removeClass("active"),
                e(h).addClass("active"),
                (this._isSliding = !1),
                e(this._element).trigger(d);
            f && this.cycle();
          }
        }),
        (t._jQueryInterface = function (n) {
          return this.each(function () {
            var i = e(this).data("bs.carousel"),
              r = o({}, d, e(this).data());
            "object" == typeof n && (r = o({}, r, n));
            var s = "string" == typeof n ? n : r.slide;
            if (
              (i || ((i = new t(this, r)), e(this).data("bs.carousel", i)),
              "number" == typeof n)
            )
              i.to(n);
            else if ("string" == typeof s) {
              if (void 0 === i[s])
                throw new TypeError('No method named "' + s + '"');
              i[s]();
            } else r.interval && r.ride && (i.pause(), i.cycle());
          });
        }),
        (t._dataApiClickHandler = function (n) {
          var i = r.getSelectorFromElement(this);
          if (i) {
            var s = e(i)[0];
            if (s && e(s).hasClass("carousel")) {
              var a = o({}, e(s).data(), e(this).data()),
                l = this.getAttribute("data-slide-to");
              l && (a.interval = !1),
                t._jQueryInterface.call(e(s), a),
                l && e(s).data("bs.carousel").to(l),
                n.preventDefault();
            }
          }
        }),
        i(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
          {
            key: "Default",
            get: function () {
              return d;
            },
          },
        ]),
        t
      );
    })();
  e(document).on(
    "click.bs.carousel.data-api",
    "[data-slide], [data-slide-to]",
    g._dataApiClickHandler
  ),
    e(window).on("load.bs.carousel.data-api", function () {
      for (
        var t = [].slice.call(
            document.querySelectorAll('[data-ride="carousel"]')
          ),
          n = 0,
          i = t.length;
        n < i;
        n++
      ) {
        var o = e(t[n]);
        g._jQueryInterface.call(o, o.data());
      }
    }),
    (e.fn[u] = g._jQueryInterface),
    (e.fn[u].Constructor = g),
    (e.fn[u].noConflict = function () {
      return (e.fn[u] = f), g._jQueryInterface;
    });
  var v = "collapse",
    _ = e.fn[v],
    b = { toggle: !0, parent: "" },
    y = { toggle: "boolean", parent: "(string|element)" },
    w = (function () {
      function t(t, e) {
        (this._isTransitioning = !1),
          (this._element = t),
          (this._config = this._getConfig(e)),
          (this._triggerArray = [].slice.call(
            document.querySelectorAll(
              '[data-toggle="collapse"][href="#' +
                t.id +
                '"],[data-toggle="collapse"][data-target="#' +
                t.id +
                '"]'
            )
          ));
        for (
          var n = [].slice.call(
              document.querySelectorAll('[data-toggle="collapse"]')
            ),
            i = 0,
            o = n.length;
          i < o;
          i++
        ) {
          var s = n[i],
            a = r.getSelectorFromElement(s),
            l = [].slice
              .call(document.querySelectorAll(a))
              .filter(function (e) {
                return e === t;
              });
          null !== a &&
            l.length > 0 &&
            ((this._selector = a), this._triggerArray.push(s));
        }
        (this._parent = this._config.parent ? this._getParent() : null),
          this._config.parent ||
            this._addAriaAndCollapsedClass(this._element, this._triggerArray),
          this._config.toggle && this.toggle();
      }
      var n = t.prototype;
      return (
        (n.toggle = function () {
          e(this._element).hasClass("show") ? this.hide() : this.show();
        }),
        (n.show = function () {
          var n,
            i,
            o = this;
          if (
            !(
              this._isTransitioning ||
              e(this._element).hasClass("show") ||
              (this._parent &&
                0 ===
                  (n = [].slice
                    .call(this._parent.querySelectorAll(".show, .collapsing"))
                    .filter(function (t) {
                      return "string" == typeof o._config.parent
                        ? t.getAttribute("data-parent") === o._config.parent
                        : t.classList.contains("collapse");
                    })).length &&
                (n = null),
              n &&
                (i = e(n).not(this._selector).data("bs.collapse")) &&
                i._isTransitioning)
            )
          ) {
            var s = e.Event("show.bs.collapse");
            if ((e(this._element).trigger(s), !s.isDefaultPrevented())) {
              n &&
                (t._jQueryInterface.call(e(n).not(this._selector), "hide"),
                i || e(n).data("bs.collapse", null));
              var a = this._getDimension();
              e(this._element).removeClass("collapse").addClass("collapsing"),
                (this._element.style[a] = 0),
                this._triggerArray.length &&
                  e(this._triggerArray)
                    .removeClass("collapsed")
                    .attr("aria-expanded", !0),
                this.setTransitioning(!0);
              var l = "scroll" + (a[0].toUpperCase() + a.slice(1)),
                c = r.getTransitionDurationFromElement(this._element);
              e(this._element)
                .one(r.TRANSITION_END, function () {
                  e(o._element)
                    .removeClass("collapsing")
                    .addClass("collapse show"),
                    (o._element.style[a] = ""),
                    o.setTransitioning(!1),
                    e(o._element).trigger("shown.bs.collapse");
                })
                .emulateTransitionEnd(c),
                (this._element.style[a] = this._element[l] + "px");
            }
          }
        }),
        (n.hide = function () {
          var t = this;
          if (!this._isTransitioning && e(this._element).hasClass("show")) {
            var n = e.Event("hide.bs.collapse");
            if ((e(this._element).trigger(n), !n.isDefaultPrevented())) {
              var i = this._getDimension();
              (this._element.style[i] =
                this._element.getBoundingClientRect()[i] + "px"),
                r.reflow(this._element),
                e(this._element)
                  .addClass("collapsing")
                  .removeClass("collapse show");
              var o = this._triggerArray.length;
              if (o > 0)
                for (var s = 0; s < o; s++) {
                  var a = this._triggerArray[s],
                    l = r.getSelectorFromElement(a);
                  null !== l &&
                    (e([].slice.call(document.querySelectorAll(l))).hasClass(
                      "show"
                    ) ||
                      e(a).addClass("collapsed").attr("aria-expanded", !1));
                }
              this.setTransitioning(!0), (this._element.style[i] = "");
              var c = r.getTransitionDurationFromElement(this._element);
              e(this._element)
                .one(r.TRANSITION_END, function () {
                  t.setTransitioning(!1),
                    e(t._element)
                      .removeClass("collapsing")
                      .addClass("collapse")
                      .trigger("hidden.bs.collapse");
                })
                .emulateTransitionEnd(c);
            }
          }
        }),
        (n.setTransitioning = function (t) {
          this._isTransitioning = t;
        }),
        (n.dispose = function () {
          e.removeData(this._element, "bs.collapse"),
            (this._config = null),
            (this._parent = null),
            (this._element = null),
            (this._triggerArray = null),
            (this._isTransitioning = null);
        }),
        (n._getConfig = function (t) {
          return (
            ((t = o({}, b, t)).toggle = Boolean(t.toggle)),
            r.typeCheckConfig(v, t, y),
            t
          );
        }),
        (n._getDimension = function () {
          return e(this._element).hasClass("width") ? "width" : "height";
        }),
        (n._getParent = function () {
          var n,
            i = this;
          r.isElement(this._config.parent)
            ? ((n = this._config.parent),
              void 0 !== this._config.parent.jquery &&
                (n = this._config.parent[0]))
            : (n = document.querySelector(this._config.parent));
          var o =
              '[data-toggle="collapse"][data-parent="' +
              this._config.parent +
              '"]',
            s = [].slice.call(n.querySelectorAll(o));
          return (
            e(s).each(function (e, n) {
              i._addAriaAndCollapsedClass(t._getTargetFromElement(n), [n]);
            }),
            n
          );
        }),
        (n._addAriaAndCollapsedClass = function (t, n) {
          var i = e(t).hasClass("show");
          n.length &&
            e(n).toggleClass("collapsed", !i).attr("aria-expanded", i);
        }),
        (t._getTargetFromElement = function (t) {
          var e = r.getSelectorFromElement(t);
          return e ? document.querySelector(e) : null;
        }),
        (t._jQueryInterface = function (n) {
          return this.each(function () {
            var i = e(this),
              r = i.data("bs.collapse"),
              s = o({}, b, i.data(), "object" == typeof n && n ? n : {});
            if (
              (!r &&
                s.toggle &&
                "string" == typeof n &&
                /show|hide/.test(n) &&
                (s.toggle = !1),
              r || ((r = new t(this, s)), i.data("bs.collapse", r)),
              "string" == typeof n)
            ) {
              if (void 0 === r[n])
                throw new TypeError('No method named "' + n + '"');
              r[n]();
            }
          });
        }),
        i(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
          {
            key: "Default",
            get: function () {
              return b;
            },
          },
        ]),
        t
      );
    })();
  e(document).on(
    "click.bs.collapse.data-api",
    '[data-toggle="collapse"]',
    function (t) {
      "A" === t.currentTarget.tagName && t.preventDefault();
      var n = e(this),
        i = r.getSelectorFromElement(this),
        o = [].slice.call(document.querySelectorAll(i));
      e(o).each(function () {
        var t = e(this),
          i = t.data("bs.collapse") ? "toggle" : n.data();
        w._jQueryInterface.call(t, i);
      });
    }
  ),
    (e.fn[v] = w._jQueryInterface),
    (e.fn[v].Constructor = w),
    (e.fn[v].noConflict = function () {
      return (e.fn[v] = _), w._jQueryInterface;
    });
  var E =
      "undefined" != typeof window &&
      "undefined" != typeof document &&
      "undefined" != typeof navigator,
    T = (function () {
      for (var t = ["Edge", "Trident", "Firefox"], e = 0; e < t.length; e += 1)
        if (E && navigator.userAgent.indexOf(t[e]) >= 0) return 1;
      return 0;
    })(),
    C =
      E && window.Promise
        ? function (t) {
            var e = !1;
            return function () {
              e ||
                ((e = !0),
                window.Promise.resolve().then(function () {
                  (e = !1), t();
                }));
            };
          }
        : function (t) {
            var e = !1;
            return function () {
              e ||
                ((e = !0),
                setTimeout(function () {
                  (e = !1), t();
                }, T));
            };
          };
  function S(t) {
    return t && "[object Function]" === {}.toString.call(t);
  }
  function D(t, e) {
    if (1 !== t.nodeType) return [];
    var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
    return e ? n[e] : n;
  }
  function N(t) {
    return "HTML" === t.nodeName ? t : t.parentNode || t.host;
  }
  function k(t) {
    if (!t) return document.body;
    switch (t.nodeName) {
      case "HTML":
      case "BODY":
        return t.ownerDocument.body;
      case "#document":
        return t.body;
    }
    var e = D(t),
      n = e.overflow,
      i = e.overflowX,
      o = e.overflowY;
    return /(auto|scroll|overlay)/.test(n + o + i) ? t : k(N(t));
  }
  function A(t) {
    return t && t.referenceNode ? t.referenceNode : t;
  }
  var I = E && !(!window.MSInputMethodContext || !document.documentMode),
    O = E && /MSIE 10/.test(navigator.userAgent);
  function x(t) {
    return 11 === t ? I : 10 === t ? O : I || O;
  }
  function j(t) {
    if (!t) return document.documentElement;
    for (
      var e = x(10) ? document.body : null, n = t.offsetParent || null;
      n === e && t.nextElementSibling;

    )
      n = (t = t.nextElementSibling).offsetParent;
    var i = n && n.nodeName;
    return i && "BODY" !== i && "HTML" !== i
      ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) &&
        "static" === D(n, "position")
        ? j(n)
        : n
      : t
      ? t.ownerDocument.documentElement
      : document.documentElement;
  }
  function L(t) {
    return null !== t.parentNode ? L(t.parentNode) : t;
  }
  function P(t, e) {
    if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
    var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
      i = n ? t : e,
      o = n ? e : t,
      r = document.createRange();
    r.setStart(i, 0), r.setEnd(o, 0);
    var s,
      a,
      l = r.commonAncestorContainer;
    if ((t !== l && e !== l) || i.contains(o))
      return "BODY" === (a = (s = l).nodeName) ||
        ("HTML" !== a && j(s.firstElementChild) !== s)
        ? j(l)
        : l;
    var c = L(t);
    return c.host ? P(c.host, e) : P(t, L(e).host);
  }
  function F(t) {
    var e =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top",
      n = "top" === e ? "scrollTop" : "scrollLeft",
      i = t.nodeName;
    if ("BODY" === i || "HTML" === i) {
      var o = t.ownerDocument.documentElement,
        r = t.ownerDocument.scrollingElement || o;
      return r[n];
    }
    return t[n];
  }
  function R(t, e) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      i = F(e, "top"),
      o = F(e, "left"),
      r = n ? -1 : 1;
    return (
      (t.top += i * r),
      (t.bottom += i * r),
      (t.left += o * r),
      (t.right += o * r),
      t
    );
  }
  function H(t, e) {
    var n = "x" === e ? "Left" : "Top",
      i = "Left" === n ? "Right" : "Bottom";
    return (
      parseFloat(t["border" + n + "Width"]) +
      parseFloat(t["border" + i + "Width"])
    );
  }
  function M(t, e, n, i) {
    return Math.max(
      e["offset" + t],
      e["scroll" + t],
      n["client" + t],
      n["offset" + t],
      n["scroll" + t],
      x(10)
        ? parseInt(n["offset" + t]) +
            parseInt(i["margin" + ("Height" === t ? "Top" : "Left")]) +
            parseInt(i["margin" + ("Height" === t ? "Bottom" : "Right")])
        : 0
    );
  }
  function B(t) {
    var e = t.body,
      n = t.documentElement,
      i = x(10) && getComputedStyle(n);
    return { height: M("Height", e, n, i), width: M("Width", e, n, i) };
  }
  var q = function (t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    },
    Q = (function () {
      function t(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      return function (e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
      };
    })(),
    W = function (t, e, n) {
      return (
        e in t
          ? Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[e] = n),
        t
      );
    },
    U =
      Object.assign ||
      function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var i in n)
            Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
        return t;
      };
  function V(t) {
    return U({}, t, { right: t.left + t.width, bottom: t.top + t.height });
  }
  function Y(t) {
    var e = {};
    try {
      if (x(10)) {
        e = t.getBoundingClientRect();
        var n = F(t, "top"),
          i = F(t, "left");
        (e.top += n), (e.left += i), (e.bottom += n), (e.right += i);
      } else e = t.getBoundingClientRect();
    } catch (t) {}
    var o = {
        left: e.left,
        top: e.top,
        width: e.right - e.left,
        height: e.bottom - e.top,
      },
      r = "HTML" === t.nodeName ? B(t.ownerDocument) : {},
      s = r.width || t.clientWidth || o.width,
      a = r.height || t.clientHeight || o.height,
      l = t.offsetWidth - s,
      c = t.offsetHeight - a;
    if (l || c) {
      var h = D(t);
      (l -= H(h, "x")), (c -= H(h, "y")), (o.width -= l), (o.height -= c);
    }
    return V(o);
  }
  function z(t, e) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      i = x(10),
      o = "HTML" === e.nodeName,
      r = Y(t),
      s = Y(e),
      a = k(t),
      l = D(e),
      c = parseFloat(l.borderTopWidth),
      h = parseFloat(l.borderLeftWidth);
    n && o && ((s.top = Math.max(s.top, 0)), (s.left = Math.max(s.left, 0)));
    var u = V({
      top: r.top - s.top - c,
      left: r.left - s.left - h,
      width: r.width,
      height: r.height,
    });
    if (((u.marginTop = 0), (u.marginLeft = 0), !i && o)) {
      var f = parseFloat(l.marginTop),
        d = parseFloat(l.marginLeft);
      (u.top -= c - f),
        (u.bottom -= c - f),
        (u.left -= h - d),
        (u.right -= h - d),
        (u.marginTop = f),
        (u.marginLeft = d);
    }
    return (
      (i && !n ? e.contains(a) : e === a && "BODY" !== a.nodeName) &&
        (u = R(u, e)),
      u
    );
  }
  function X(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      n = t.ownerDocument.documentElement,
      i = z(t, n),
      o = Math.max(n.clientWidth, window.innerWidth || 0),
      r = Math.max(n.clientHeight, window.innerHeight || 0),
      s = e ? 0 : F(n),
      a = e ? 0 : F(n, "left"),
      l = {
        top: s - i.top + i.marginTop,
        left: a - i.left + i.marginLeft,
        width: o,
        height: r,
      };
    return V(l);
  }
  function K(t) {
    var e = t.nodeName;
    if ("BODY" === e || "HTML" === e) return !1;
    if ("fixed" === D(t, "position")) return !0;
    var n = N(t);
    return !!n && K(n);
  }
  function G(t) {
    if (!t || !t.parentElement || x()) return document.documentElement;
    for (var e = t.parentElement; e && "none" === D(e, "transform"); )
      e = e.parentElement;
    return e || document.documentElement;
  }
  function $(t, e, n, i) {
    var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
      r = { top: 0, left: 0 },
      s = o ? G(t) : P(t, A(e));
    if ("viewport" === i) r = X(s, o);
    else {
      var a = void 0;
      "scrollParent" === i
        ? "BODY" === (a = k(N(e))).nodeName &&
          (a = t.ownerDocument.documentElement)
        : (a = "window" === i ? t.ownerDocument.documentElement : i);
      var l = z(a, s, o);
      if ("HTML" !== a.nodeName || K(s)) r = l;
      else {
        var c = B(t.ownerDocument),
          h = c.height,
          u = c.width;
        (r.top += l.top - l.marginTop),
          (r.bottom = h + l.top),
          (r.left += l.left - l.marginLeft),
          (r.right = u + l.left);
      }
    }
    var f = "number" == typeof (n = n || 0);
    return (
      (r.left += f ? n : n.left || 0),
      (r.top += f ? n : n.top || 0),
      (r.right -= f ? n : n.right || 0),
      (r.bottom -= f ? n : n.bottom || 0),
      r
    );
  }
  function J(t) {
    return t.width * t.height;
  }
  function Z(t, e, n, i, o) {
    var r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === t.indexOf("auto")) return t;
    var s = $(n, i, r, o),
      a = {
        top: { width: s.width, height: e.top - s.top },
        right: { width: s.right - e.right, height: s.height },
        bottom: { width: s.width, height: s.bottom - e.bottom },
        left: { width: e.left - s.left, height: s.height },
      },
      l = Object.keys(a)
        .map(function (t) {
          return U({ key: t }, a[t], { area: J(a[t]) });
        })
        .sort(function (t, e) {
          return e.area - t.area;
        }),
      c = l.filter(function (t) {
        var e = t.width,
          i = t.height;
        return e >= n.clientWidth && i >= n.clientHeight;
      }),
      h = c.length > 0 ? c[0].key : l[0].key,
      u = t.split("-")[1];
    return h + (u ? "-" + u : "");
  }
  function tt(t, e, n) {
    var i =
        arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
      o = i ? G(e) : P(e, A(n));
    return z(n, o, i);
  }
  function et(t) {
    var e = t.ownerDocument.defaultView.getComputedStyle(t),
      n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
      i = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
    return { width: t.offsetWidth + i, height: t.offsetHeight + n };
  }
  function nt(t) {
    var e = { left: "right", right: "left", bottom: "top", top: "bottom" };
    return t.replace(/left|right|bottom|top/g, function (t) {
      return e[t];
    });
  }
  function it(t, e, n) {
    n = n.split("-")[0];
    var i = et(t),
      o = { width: i.width, height: i.height },
      r = -1 !== ["right", "left"].indexOf(n),
      s = r ? "top" : "left",
      a = r ? "left" : "top",
      l = r ? "height" : "width",
      c = r ? "width" : "height";
    return (
      (o[s] = e[s] + e[l] / 2 - i[l] / 2),
      (o[a] = n === a ? e[a] - i[c] : e[nt(a)]),
      o
    );
  }
  function ot(t, e) {
    return Array.prototype.find ? t.find(e) : t.filter(e)[0];
  }
  function rt(t, e, n) {
    return (
      (void 0 === n
        ? t
        : t.slice(
            0,
            (function (t, e, n) {
              if (Array.prototype.findIndex)
                return t.findIndex(function (t) {
                  return t[e] === n;
                });
              var i = ot(t, function (t) {
                return t[e] === n;
              });
              return t.indexOf(i);
            })(t, "name", n)
          )
      ).forEach(function (t) {
        t.function &&
          console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
        var n = t.function || t.fn;
        t.enabled &&
          S(n) &&
          ((e.offsets.popper = V(e.offsets.popper)),
          (e.offsets.reference = V(e.offsets.reference)),
          (e = n(e, t)));
      }),
      e
    );
  }
  function st() {
    if (!this.state.isDestroyed) {
      var t = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {},
      };
      (t.offsets.reference = tt(
        this.state,
        this.popper,
        this.reference,
        this.options.positionFixed
      )),
        (t.placement = Z(
          this.options.placement,
          t.offsets.reference,
          this.popper,
          this.reference,
          this.options.modifiers.flip.boundariesElement,
          this.options.modifiers.flip.padding
        )),
        (t.originalPlacement = t.placement),
        (t.positionFixed = this.options.positionFixed),
        (t.offsets.popper = it(this.popper, t.offsets.reference, t.placement)),
        (t.offsets.popper.position = this.options.positionFixed
          ? "fixed"
          : "absolute"),
        (t = rt(this.modifiers, t)),
        this.state.isCreated
          ? this.options.onUpdate(t)
          : ((this.state.isCreated = !0), this.options.onCreate(t));
    }
  }
  function at(t, e) {
    return t.some(function (t) {
      var n = t.name;
      return t.enabled && n === e;
    });
  }
  function lt(t) {
    for (
      var e = [!1, "ms", "Webkit", "Moz", "O"],
        n = t.charAt(0).toUpperCase() + t.slice(1),
        i = 0;
      i < e.length;
      i++
    ) {
      var o = e[i],
        r = o ? "" + o + n : t;
      if (void 0 !== document.body.style[r]) return r;
    }
    return null;
  }
  function ct() {
    return (
      (this.state.isDestroyed = !0),
      at(this.modifiers, "applyStyle") &&
        (this.popper.removeAttribute("x-placement"),
        (this.popper.style.position = ""),
        (this.popper.style.top = ""),
        (this.popper.style.left = ""),
        (this.popper.style.right = ""),
        (this.popper.style.bottom = ""),
        (this.popper.style.willChange = ""),
        (this.popper.style[lt("transform")] = "")),
      this.disableEventListeners(),
      this.options.removeOnDestroy &&
        this.popper.parentNode.removeChild(this.popper),
      this
    );
  }
  function ht(t) {
    var e = t.ownerDocument;
    return e ? e.defaultView : window;
  }
  function ut() {
    this.state.eventsEnabled ||
      (this.state = (function (t, e, n, i) {
        (n.updateBound = i),
          ht(t).addEventListener("resize", n.updateBound, { passive: !0 });
        var o = k(t);
        return (
          (function t(e, n, i, o) {
            var r = "BODY" === e.nodeName,
              s = r ? e.ownerDocument.defaultView : e;
            s.addEventListener(n, i, { passive: !0 }),
              r || t(k(s.parentNode), n, i, o),
              o.push(s);
          })(o, "scroll", n.updateBound, n.scrollParents),
          (n.scrollElement = o),
          (n.eventsEnabled = !0),
          n
        );
      })(this.reference, this.options, this.state, this.scheduleUpdate));
  }
  function ft() {
    var t, e;
    this.state.eventsEnabled &&
      (cancelAnimationFrame(this.scheduleUpdate),
      (this.state =
        ((t = this.reference),
        (e = this.state),
        ht(t).removeEventListener("resize", e.updateBound),
        e.scrollParents.forEach(function (t) {
          t.removeEventListener("scroll", e.updateBound);
        }),
        (e.updateBound = null),
        (e.scrollParents = []),
        (e.scrollElement = null),
        (e.eventsEnabled = !1),
        e)));
  }
  function dt(t) {
    return "" !== t && !isNaN(parseFloat(t)) && isFinite(t);
  }
  function pt(t, e) {
    Object.keys(e).forEach(function (n) {
      var i = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) &&
        dt(e[n]) &&
        (i = "px"),
        (t.style[n] = e[n] + i);
    });
  }
  var mt = E && /Firefox/i.test(navigator.userAgent);
  function gt(t, e, n) {
    var i = ot(t, function (t) {
        return t.name === e;
      }),
      o =
        !!i &&
        t.some(function (t) {
          return t.name === n && t.enabled && t.order < i.order;
        });
    if (!o) {
      var r = "`" + e + "`",
        s = "`" + n + "`";
      console.warn(
        s +
          " modifier is required by " +
          r +
          " modifier in order to work, be sure to include it before " +
          r +
          "!"
      );
    }
    return o;
  }
  var vt = [
      "auto-start",
      "auto",
      "auto-end",
      "top-start",
      "top",
      "top-end",
      "right-start",
      "right",
      "right-end",
      "bottom-end",
      "bottom",
      "bottom-start",
      "left-end",
      "left",
      "left-start",
    ],
    _t = vt.slice(3);
  function bt(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      n = _t.indexOf(t),
      i = _t.slice(n + 1).concat(_t.slice(0, n));
    return e ? i.reverse() : i;
  }
  var yt = {
      placement: "bottom",
      positionFixed: !1,
      eventsEnabled: !0,
      removeOnDestroy: !1,
      onCreate: function () {},
      onUpdate: function () {},
      modifiers: {
        shift: {
          order: 100,
          enabled: !0,
          fn: function (t) {
            var e = t.placement,
              n = e.split("-")[0],
              i = e.split("-")[1];
            if (i) {
              var o = t.offsets,
                r = o.reference,
                s = o.popper,
                a = -1 !== ["bottom", "top"].indexOf(n),
                l = a ? "left" : "top",
                c = a ? "width" : "height",
                h = {
                  start: W({}, l, r[l]),
                  end: W({}, l, r[l] + r[c] - s[c]),
                };
              t.offsets.popper = U({}, s, h[i]);
            }
            return t;
          },
        },
        offset: {
          order: 200,
          enabled: !0,
          fn: function (t, e) {
            var n,
              i = e.offset,
              o = t.placement,
              r = t.offsets,
              s = r.popper,
              a = r.reference,
              l = o.split("-")[0];
            return (
              (n = dt(+i)
                ? [+i, 0]
                : (function (t, e, n, i) {
                    var o = [0, 0],
                      r = -1 !== ["right", "left"].indexOf(i),
                      s = t.split(/(\+|\-)/).map(function (t) {
                        return t.trim();
                      }),
                      a = s.indexOf(
                        ot(s, function (t) {
                          return -1 !== t.search(/,|\s/);
                        })
                      );
                    s[a] &&
                      -1 === s[a].indexOf(",") &&
                      console.warn(
                        "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
                      );
                    var l = /\s*,\s*|\s+/,
                      c =
                        -1 !== a
                          ? [
                              s.slice(0, a).concat([s[a].split(l)[0]]),
                              [s[a].split(l)[1]].concat(s.slice(a + 1)),
                            ]
                          : [s];
                    return (
                      (c = c.map(function (t, i) {
                        var o = (1 === i ? !r : r) ? "height" : "width",
                          s = !1;
                        return t
                          .reduce(function (t, e) {
                            return "" === t[t.length - 1] &&
                              -1 !== ["+", "-"].indexOf(e)
                              ? ((t[t.length - 1] = e), (s = !0), t)
                              : s
                              ? ((t[t.length - 1] += e), (s = !1), t)
                              : t.concat(e);
                          }, [])
                          .map(function (t) {
                            return (function (t, e, n, i) {
                              var o = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                                r = +o[1],
                                s = o[2];
                              if (!r) return t;
                              if (0 === s.indexOf("%")) {
                                var a = void 0;
                                switch (s) {
                                  case "%p":
                                    a = n;
                                    break;
                                  case "%":
                                  case "%r":
                                  default:
                                    a = i;
                                }
                                return (V(a)[e] / 100) * r;
                              }
                              return "vh" === s || "vw" === s
                                ? (("vh" === s
                                    ? Math.max(
                                        document.documentElement.clientHeight,
                                        window.innerHeight || 0
                                      )
                                    : Math.max(
                                        document.documentElement.clientWidth,
                                        window.innerWidth || 0
                                      )) /
                                    100) *
                                    r
                                : r;
                            })(t, o, e, n);
                          });
                      })).forEach(function (t, e) {
                        t.forEach(function (n, i) {
                          dt(n) && (o[e] += n * ("-" === t[i - 1] ? -1 : 1));
                        });
                      }),
                      o
                    );
                  })(i, s, a, l)),
              "left" === l
                ? ((s.top += n[0]), (s.left -= n[1]))
                : "right" === l
                ? ((s.top += n[0]), (s.left += n[1]))
                : "top" === l
                ? ((s.left += n[0]), (s.top -= n[1]))
                : "bottom" === l && ((s.left += n[0]), (s.top += n[1])),
              (t.popper = s),
              t
            );
          },
          offset: 0,
        },
        preventOverflow: {
          order: 300,
          enabled: !0,
          fn: function (t, e) {
            var n = e.boundariesElement || j(t.instance.popper);
            t.instance.reference === n && (n = j(n));
            var i = lt("transform"),
              o = t.instance.popper.style,
              r = o.top,
              s = o.left,
              a = o[i];
            (o.top = ""), (o.left = ""), (o[i] = "");
            var l = $(
              t.instance.popper,
              t.instance.reference,
              e.padding,
              n,
              t.positionFixed
            );
            (o.top = r), (o.left = s), (o[i] = a), (e.boundaries = l);
            var c = e.priority,
              h = t.offsets.popper,
              u = {
                primary: function (t) {
                  var n = h[t];
                  return (
                    h[t] < l[t] &&
                      !e.escapeWithReference &&
                      (n = Math.max(h[t], l[t])),
                    W({}, t, n)
                  );
                },
                secondary: function (t) {
                  var n = "right" === t ? "left" : "top",
                    i = h[n];
                  return (
                    h[t] > l[t] &&
                      !e.escapeWithReference &&
                      (i = Math.min(
                        h[n],
                        l[t] - ("right" === t ? h.width : h.height)
                      )),
                    W({}, n, i)
                  );
                },
              };
            return (
              c.forEach(function (t) {
                var e =
                  -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
                h = U({}, h, u[e](t));
              }),
              (t.offsets.popper = h),
              t
            );
          },
          priority: ["left", "right", "top", "bottom"],
          padding: 5,
          boundariesElement: "scrollParent",
        },
        keepTogether: {
          order: 400,
          enabled: !0,
          fn: function (t) {
            var e = t.offsets,
              n = e.popper,
              i = e.reference,
              o = t.placement.split("-")[0],
              r = Math.floor,
              s = -1 !== ["top", "bottom"].indexOf(o),
              a = s ? "right" : "bottom",
              l = s ? "left" : "top",
              c = s ? "width" : "height";
            return (
              n[a] < r(i[l]) && (t.offsets.popper[l] = r(i[l]) - n[c]),
              n[l] > r(i[a]) && (t.offsets.popper[l] = r(i[a])),
              t
            );
          },
        },
        arrow: {
          order: 500,
          enabled: !0,
          fn: function (t, e) {
            var n;
            if (!gt(t.instance.modifiers, "arrow", "keepTogether")) return t;
            var i = e.element;
            if ("string" == typeof i) {
              if (!(i = t.instance.popper.querySelector(i))) return t;
            } else if (!t.instance.popper.contains(i))
              return (
                console.warn(
                  "WARNING: `arrow.element` must be child of its popper element!"
                ),
                t
              );
            var o = t.placement.split("-")[0],
              r = t.offsets,
              s = r.popper,
              a = r.reference,
              l = -1 !== ["left", "right"].indexOf(o),
              c = l ? "height" : "width",
              h = l ? "Top" : "Left",
              u = h.toLowerCase(),
              f = l ? "left" : "top",
              d = l ? "bottom" : "right",
              p = et(i)[c];
            a[d] - p < s[u] && (t.offsets.popper[u] -= s[u] - (a[d] - p)),
              a[u] + p > s[d] && (t.offsets.popper[u] += a[u] + p - s[d]),
              (t.offsets.popper = V(t.offsets.popper));
            var m = a[u] + a[c] / 2 - p / 2,
              g = D(t.instance.popper),
              v = parseFloat(g["margin" + h]),
              _ = parseFloat(g["border" + h + "Width"]),
              b = m - t.offsets.popper[u] - v - _;
            return (
              (b = Math.max(Math.min(s[c] - p, b), 0)),
              (t.arrowElement = i),
              (t.offsets.arrow =
                (W((n = {}), u, Math.round(b)), W(n, f, ""), n)),
              t
            );
          },
          element: "[x-arrow]",
        },
        flip: {
          order: 600,
          enabled: !0,
          fn: function (t, e) {
            if (at(t.instance.modifiers, "inner")) return t;
            if (t.flipped && t.placement === t.originalPlacement) return t;
            var n = $(
                t.instance.popper,
                t.instance.reference,
                e.padding,
                e.boundariesElement,
                t.positionFixed
              ),
              i = t.placement.split("-")[0],
              o = nt(i),
              r = t.placement.split("-")[1] || "",
              s = [];
            switch (e.behavior) {
              case "flip":
                s = [i, o];
                break;
              case "clockwise":
                s = bt(i);
                break;
              case "counterclockwise":
                s = bt(i, !0);
                break;
              default:
                s = e.behavior;
            }
            return (
              s.forEach(function (a, l) {
                if (i !== a || s.length === l + 1) return t;
                (i = t.placement.split("-")[0]), (o = nt(i));
                var c = t.offsets.popper,
                  h = t.offsets.reference,
                  u = Math.floor,
                  f =
                    ("left" === i && u(c.right) > u(h.left)) ||
                    ("right" === i && u(c.left) < u(h.right)) ||
                    ("top" === i && u(c.bottom) > u(h.top)) ||
                    ("bottom" === i && u(c.top) < u(h.bottom)),
                  d = u(c.left) < u(n.left),
                  p = u(c.right) > u(n.right),
                  m = u(c.top) < u(n.top),
                  g = u(c.bottom) > u(n.bottom),
                  v =
                    ("left" === i && d) ||
                    ("right" === i && p) ||
                    ("top" === i && m) ||
                    ("bottom" === i && g),
                  _ = -1 !== ["top", "bottom"].indexOf(i),
                  b =
                    !!e.flipVariations &&
                    ((_ && "start" === r && d) ||
                      (_ && "end" === r && p) ||
                      (!_ && "start" === r && m) ||
                      (!_ && "end" === r && g)),
                  y =
                    !!e.flipVariationsByContent &&
                    ((_ && "start" === r && p) ||
                      (_ && "end" === r && d) ||
                      (!_ && "start" === r && g) ||
                      (!_ && "end" === r && m)),
                  w = b || y;
                (f || v || w) &&
                  ((t.flipped = !0),
                  (f || v) && (i = s[l + 1]),
                  w &&
                    (r = (function (t) {
                      return "end" === t ? "start" : "start" === t ? "end" : t;
                    })(r)),
                  (t.placement = i + (r ? "-" + r : "")),
                  (t.offsets.popper = U(
                    {},
                    t.offsets.popper,
                    it(t.instance.popper, t.offsets.reference, t.placement)
                  )),
                  (t = rt(t.instance.modifiers, t, "flip")));
              }),
              t
            );
          },
          behavior: "flip",
          padding: 5,
          boundariesElement: "viewport",
          flipVariations: !1,
          flipVariationsByContent: !1,
        },
        inner: {
          order: 700,
          enabled: !1,
          fn: function (t) {
            var e = t.placement,
              n = e.split("-")[0],
              i = t.offsets,
              o = i.popper,
              r = i.reference,
              s = -1 !== ["left", "right"].indexOf(n),
              a = -1 === ["top", "left"].indexOf(n);
            return (
              (o[s ? "left" : "top"] =
                r[n] - (a ? o[s ? "width" : "height"] : 0)),
              (t.placement = nt(e)),
              (t.offsets.popper = V(o)),
              t
            );
          },
        },
        hide: {
          order: 800,
          enabled: !0,
          fn: function (t) {
            if (!gt(t.instance.modifiers, "hide", "preventOverflow")) return t;
            var e = t.offsets.reference,
              n = ot(t.instance.modifiers, function (t) {
                return "preventOverflow" === t.name;
              }).boundaries;
            if (
              e.bottom < n.top ||
              e.left > n.right ||
              e.top > n.bottom ||
              e.right < n.left
            ) {
              if (!0 === t.hide) return t;
              (t.hide = !0), (t.attributes["x-out-of-boundaries"] = "");
            } else {
              if (!1 === t.hide) return t;
              (t.hide = !1), (t.attributes["x-out-of-boundaries"] = !1);
            }
            return t;
          },
        },
        computeStyle: {
          order: 850,
          enabled: !0,
          fn: function (t, e) {
            var n = e.x,
              i = e.y,
              o = t.offsets.popper,
              r = ot(t.instance.modifiers, function (t) {
                return "applyStyle" === t.name;
              }).gpuAcceleration;
            void 0 !== r &&
              console.warn(
                "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
              );
            var s,
              a,
              l = void 0 !== r ? r : e.gpuAcceleration,
              c = j(t.instance.popper),
              h = Y(c),
              u = { position: o.position },
              f = (function (t, e) {
                var n = t.offsets,
                  i = n.popper,
                  o = n.reference,
                  r = Math.round,
                  s = Math.floor,
                  a = function (t) {
                    return t;
                  },
                  l = r(o.width),
                  c = r(i.width),
                  h = -1 !== ["left", "right"].indexOf(t.placement),
                  u = -1 !== t.placement.indexOf("-"),
                  f = e ? (h || u || l % 2 == c % 2 ? r : s) : a,
                  d = e ? r : a;
                return {
                  left: f(
                    l % 2 == 1 && c % 2 == 1 && !u && e ? i.left - 1 : i.left
                  ),
                  top: d(i.top),
                  bottom: d(i.bottom),
                  right: f(i.right),
                };
              })(t, window.devicePixelRatio < 2 || !mt),
              d = "bottom" === n ? "top" : "bottom",
              p = "right" === i ? "left" : "right",
              m = lt("transform");
            if (
              ((a =
                "bottom" === d
                  ? "HTML" === c.nodeName
                    ? -c.clientHeight + f.bottom
                    : -h.height + f.bottom
                  : f.top),
              (s =
                "right" === p
                  ? "HTML" === c.nodeName
                    ? -c.clientWidth + f.right
                    : -h.width + f.right
                  : f.left),
              l && m)
            )
              (u[m] = "translate3d(" + s + "px, " + a + "px, 0)"),
                (u[d] = 0),
                (u[p] = 0),
                (u.willChange = "transform");
            else {
              var g = "bottom" === d ? -1 : 1,
                v = "right" === p ? -1 : 1;
              (u[d] = a * g), (u[p] = s * v), (u.willChange = d + ", " + p);
            }
            var _ = { "x-placement": t.placement };
            return (
              (t.attributes = U({}, _, t.attributes)),
              (t.styles = U({}, u, t.styles)),
              (t.arrowStyles = U({}, t.offsets.arrow, t.arrowStyles)),
              t
            );
          },
          gpuAcceleration: !0,
          x: "bottom",
          y: "right",
        },
        applyStyle: {
          order: 900,
          enabled: !0,
          fn: function (t) {
            var e, n;
            return (
              pt(t.instance.popper, t.styles),
              (e = t.instance.popper),
              (n = t.attributes),
              Object.keys(n).forEach(function (t) {
                !1 !== n[t] ? e.setAttribute(t, n[t]) : e.removeAttribute(t);
              }),
              t.arrowElement &&
                Object.keys(t.arrowStyles).length &&
                pt(t.arrowElement, t.arrowStyles),
              t
            );
          },
          onLoad: function (t, e, n, i, o) {
            var r = tt(o, e, t, n.positionFixed),
              s = Z(
                n.placement,
                r,
                e,
                t,
                n.modifiers.flip.boundariesElement,
                n.modifiers.flip.padding
              );
            return (
              e.setAttribute("x-placement", s),
              pt(e, { position: n.positionFixed ? "fixed" : "absolute" }),
              n
            );
          },
          gpuAcceleration: void 0,
        },
      },
    },
    wt = (function () {
      function t(e, n) {
        var i = this,
          o =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        q(this, t),
          (this.scheduleUpdate = function () {
            return requestAnimationFrame(i.update);
          }),
          (this.update = C(this.update.bind(this))),
          (this.options = U({}, t.Defaults, o)),
          (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
          (this.reference = e && e.jquery ? e[0] : e),
          (this.popper = n && n.jquery ? n[0] : n),
          (this.options.modifiers = {}),
          Object.keys(U({}, t.Defaults.modifiers, o.modifiers)).forEach(
            function (e) {
              i.options.modifiers[e] = U(
                {},
                t.Defaults.modifiers[e] || {},
                o.modifiers ? o.modifiers[e] : {}
              );
            }
          ),
          (this.modifiers = Object.keys(this.options.modifiers)
            .map(function (t) {
              return U({ name: t }, i.options.modifiers[t]);
            })
            .sort(function (t, e) {
              return t.order - e.order;
            })),
          this.modifiers.forEach(function (t) {
            t.enabled &&
              S(t.onLoad) &&
              t.onLoad(i.reference, i.popper, i.options, t, i.state);
          }),
          this.update();
        var r = this.options.eventsEnabled;
        r && this.enableEventListeners(), (this.state.eventsEnabled = r);
      }
      return (
        Q(t, [
          {
            key: "update",
            value: function () {
              return st.call(this);
            },
          },
          {
            key: "destroy",
            value: function () {
              return ct.call(this);
            },
          },
          {
            key: "enableEventListeners",
            value: function () {
              return ut.call(this);
            },
          },
          {
            key: "disableEventListeners",
            value: function () {
              return ft.call(this);
            },
          },
        ]),
        t
      );
    })();
  (wt.Utils = ("undefined" != typeof window ? window : global).PopperUtils),
    (wt.placements = vt),
    (wt.Defaults = yt);
  var Et = "dropdown",
    Tt = e.fn[Et],
    Ct = new RegExp("38|40|27"),
    St = {
      offset: 0,
      flip: !0,
      boundary: "scrollParent",
      reference: "toggle",
      display: "dynamic",
      popperConfig: null,
    },
    Dt = {
      offset: "(number|string|function)",
      flip: "boolean",
      boundary: "(string|element)",
      reference: "(string|element)",
      display: "string",
      popperConfig: "(null|object)",
    },
    Nt = (function () {
      function t(t, e) {
        (this._element = t),
          (this._popper = null),
          (this._config = this._getConfig(e)),
          (this._menu = this._getMenuElement()),
          (this._inNavbar = this._detectNavbar()),
          this._addEventListeners();
      }
      var n = t.prototype;
      return (
        (n.toggle = function () {
          if (
            !this._element.disabled &&
            !e(this._element).hasClass("disabled")
          ) {
            var n = e(this._menu).hasClass("show");
            t._clearMenus(), n || this.show(!0);
          }
        }),
        (n.show = function (n) {
          if (
            (void 0 === n && (n = !1),
            !(
              this._element.disabled ||
              e(this._element).hasClass("disabled") ||
              e(this._menu).hasClass("show")
            ))
          ) {
            var i = { relatedTarget: this._element },
              o = e.Event("show.bs.dropdown", i),
              s = t._getParentFromElement(this._element);
            if ((e(s).trigger(o), !o.isDefaultPrevented())) {
              if (!this._inNavbar && n) {
                if (void 0 === wt)
                  throw new TypeError(
                    "Bootstrap's dropdowns require Popper.js (https://popper.js.org/)"
                  );
                var a = this._element;
                "parent" === this._config.reference
                  ? (a = s)
                  : r.isElement(this._config.reference) &&
                    ((a = this._config.reference),
                    void 0 !== this._config.reference.jquery &&
                      (a = this._config.reference[0])),
                  "scrollParent" !== this._config.boundary &&
                    e(s).addClass("position-static"),
                  (this._popper = new wt(
                    a,
                    this._menu,
                    this._getPopperConfig()
                  ));
              }
              "ontouchstart" in document.documentElement &&
                0 === e(s).closest(".navbar-nav").length &&
                e(document.body).children().on("mouseover", null, e.noop),
                this._element.focus(),
                this._element.setAttribute("aria-expanded", !0),
                e(this._menu).toggleClass("show"),
                e(s)
                  .toggleClass("show")
                  .trigger(e.Event("shown.bs.dropdown", i));
            }
          }
        }),
        (n.hide = function () {
          if (
            !this._element.disabled &&
            !e(this._element).hasClass("disabled") &&
            e(this._menu).hasClass("show")
          ) {
            var n = { relatedTarget: this._element },
              i = e.Event("hide.bs.dropdown", n),
              o = t._getParentFromElement(this._element);
            e(o).trigger(i),
              i.isDefaultPrevented() ||
                (this._popper && this._popper.destroy(),
                e(this._menu).toggleClass("show"),
                e(o)
                  .toggleClass("show")
                  .trigger(e.Event("hidden.bs.dropdown", n)));
          }
        }),
        (n.dispose = function () {
          e.removeData(this._element, "bs.dropdown"),
            e(this._element).off(".bs.dropdown"),
            (this._element = null),
            (this._menu = null),
            null !== this._popper &&
              (this._popper.destroy(), (this._popper = null));
        }),
        (n.update = function () {
          (this._inNavbar = this._detectNavbar()),
            null !== this._popper && this._popper.scheduleUpdate();
        }),
        (n._addEventListeners = function () {
          var t = this;
          e(this._element).on("click.bs.dropdown", function (e) {
            e.preventDefault(), e.stopPropagation(), t.toggle();
          });
        }),
        (n._getConfig = function (t) {
          return (
            (t = o({}, this.constructor.Default, e(this._element).data(), t)),
            r.typeCheckConfig(Et, t, this.constructor.DefaultType),
            t
          );
        }),
        (n._getMenuElement = function () {
          if (!this._menu) {
            var e = t._getParentFromElement(this._element);
            e && (this._menu = e.querySelector(".dropdown-menu"));
          }
          return this._menu;
        }),
        (n._getPlacement = function () {
          var t = e(this._element.parentNode),
            n = "bottom-start";
          return (
            t.hasClass("dropup")
              ? (n = e(this._menu).hasClass("dropdown-menu-right")
                  ? "top-end"
                  : "top-start")
              : t.hasClass("dropright")
              ? (n = "right-start")
              : t.hasClass("dropleft")
              ? (n = "left-start")
              : e(this._menu).hasClass("dropdown-menu-right") &&
                (n = "bottom-end"),
            n
          );
        }),
        (n._detectNavbar = function () {
          return e(this._element).closest(".navbar").length > 0;
        }),
        (n._getOffset = function () {
          var t = this,
            e = {};
          return (
            "function" == typeof this._config.offset
              ? (e.fn = function (e) {
                  return (
                    (e.offsets = o(
                      {},
                      e.offsets,
                      t._config.offset(e.offsets, t._element) || {}
                    )),
                    e
                  );
                })
              : (e.offset = this._config.offset),
            e
          );
        }),
        (n._getPopperConfig = function () {
          var t = {
            placement: this._getPlacement(),
            modifiers: {
              offset: this._getOffset(),
              flip: { enabled: this._config.flip },
              preventOverflow: { boundariesElement: this._config.boundary },
            },
          };
          return (
            "static" === this._config.display &&
              (t.modifiers.applyStyle = { enabled: !1 }),
            o({}, t, this._config.popperConfig)
          );
        }),
        (t._jQueryInterface = function (n) {
          return this.each(function () {
            var i = e(this).data("bs.dropdown");
            if (
              (i ||
                ((i = new t(this, "object" == typeof n ? n : null)),
                e(this).data("bs.dropdown", i)),
              "string" == typeof n)
            ) {
              if (void 0 === i[n])
                throw new TypeError('No method named "' + n + '"');
              i[n]();
            }
          });
        }),
        (t._clearMenus = function (n) {
          if (!n || (3 !== n.which && ("keyup" !== n.type || 9 === n.which)))
            for (
              var i = [].slice.call(
                  document.querySelectorAll('[data-toggle="dropdown"]')
                ),
                o = 0,
                r = i.length;
              o < r;
              o++
            ) {
              var s = t._getParentFromElement(i[o]),
                a = e(i[o]).data("bs.dropdown"),
                l = { relatedTarget: i[o] };
              if ((n && "click" === n.type && (l.clickEvent = n), a)) {
                var c = a._menu;
                if (
                  e(s).hasClass("show") &&
                  !(
                    n &&
                    (("click" === n.type &&
                      /input|textarea/i.test(n.target.tagName)) ||
                      ("keyup" === n.type && 9 === n.which)) &&
                    e.contains(s, n.target)
                  )
                ) {
                  var h = e.Event("hide.bs.dropdown", l);
                  e(s).trigger(h),
                    h.isDefaultPrevented() ||
                      ("ontouchstart" in document.documentElement &&
                        e(document.body)
                          .children()
                          .off("mouseover", null, e.noop),
                      i[o].setAttribute("aria-expanded", "false"),
                      a._popper && a._popper.destroy(),
                      e(c).removeClass("show"),
                      e(s)
                        .removeClass("show")
                        .trigger(e.Event("hidden.bs.dropdown", l)));
                }
              }
            }
        }),
        (t._getParentFromElement = function (t) {
          var e,
            n = r.getSelectorFromElement(t);
          return n && (e = document.querySelector(n)), e || t.parentNode;
        }),
        (t._dataApiKeydownHandler = function (n) {
          if (
            !(/input|textarea/i.test(n.target.tagName)
              ? 32 === n.which ||
                (27 !== n.which &&
                  ((40 !== n.which && 38 !== n.which) ||
                    e(n.target).closest(".dropdown-menu").length))
              : !Ct.test(n.which)) &&
            !this.disabled &&
            !e(this).hasClass("disabled")
          ) {
            var i = t._getParentFromElement(this),
              o = e(i).hasClass("show");
            if (o || 27 !== n.which) {
              if (
                (n.preventDefault(),
                n.stopPropagation(),
                !o || (o && (27 === n.which || 32 === n.which)))
              )
                return (
                  27 === n.which &&
                    e(i.querySelector('[data-toggle="dropdown"]')).trigger(
                      "focus"
                    ),
                  void e(this).trigger("click")
                );
              var r = [].slice
                .call(
                  i.querySelectorAll(
                    ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
                  )
                )
                .filter(function (t) {
                  return e(t).is(":visible");
                });
              if (0 !== r.length) {
                var s = r.indexOf(n.target);
                38 === n.which && s > 0 && s--,
                  40 === n.which && s < r.length - 1 && s++,
                  s < 0 && (s = 0),
                  r[s].focus();
              }
            }
          }
        }),
        i(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
          {
            key: "Default",
            get: function () {
              return St;
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return Dt;
            },
          },
        ]),
        t
      );
    })();
  e(document)
    .on(
      "keydown.bs.dropdown.data-api",
      '[data-toggle="dropdown"]',
      Nt._dataApiKeydownHandler
    )
    .on(
      "keydown.bs.dropdown.data-api",
      ".dropdown-menu",
      Nt._dataApiKeydownHandler
    )
    .on("click.bs.dropdown.data-api keyup.bs.dropdown.data-api", Nt._clearMenus)
    .on("click.bs.dropdown.data-api", '[data-toggle="dropdown"]', function (t) {
      t.preventDefault(),
        t.stopPropagation(),
        Nt._jQueryInterface.call(e(this), "toggle");
    })
    .on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
      t.stopPropagation();
    }),
    (e.fn[Et] = Nt._jQueryInterface),
    (e.fn[Et].Constructor = Nt),
    (e.fn[Et].noConflict = function () {
      return (e.fn[Et] = Tt), Nt._jQueryInterface;
    });
  var kt = e.fn.modal,
    At = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
    It = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      focus: "boolean",
      show: "boolean",
    },
    Ot = (function () {
      function t(t, e) {
        (this._config = this._getConfig(e)),
          (this._element = t),
          (this._dialog = t.querySelector(".modal-dialog")),
          (this._backdrop = null),
          (this._isShown = !1),
          (this._isBodyOverflowing = !1),
          (this._ignoreBackdropClick = !1),
          (this._isTransitioning = !1),
          (this._scrollbarWidth = 0);
      }
      var n = t.prototype;
      return (
        (n.toggle = function (t) {
          return this._isShown ? this.hide() : this.show(t);
        }),
        (n.show = function (t) {
          var n = this;
          if (!this._isShown && !this._isTransitioning) {
            e(this._element).hasClass("fade") && (this._isTransitioning = !0);
            var i = e.Event("show.bs.modal", { relatedTarget: t });
            e(this._element).trigger(i),
              this._isShown ||
                i.isDefaultPrevented() ||
                ((this._isShown = !0),
                this._checkScrollbar(),
                this._setScrollbar(),
                this._adjustDialog(),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                e(this._element).on(
                  "click.dismiss.bs.modal",
                  '[data-dismiss="modal"]',
                  function (t) {
                    return n.hide(t);
                  }
                ),
                e(this._dialog).on("mousedown.dismiss.bs.modal", function () {
                  e(n._element).one("mouseup.dismiss.bs.modal", function (t) {
                    e(t.target).is(n._element) && (n._ignoreBackdropClick = !0);
                  });
                }),
                this._showBackdrop(function () {
                  return n._showElement(t);
                }));
          }
        }),
        (n.hide = function (t) {
          var n = this;
          if (
            (t && t.preventDefault(), this._isShown && !this._isTransitioning)
          ) {
            var i = e.Event("hide.bs.modal");
            if (
              (e(this._element).trigger(i),
              this._isShown && !i.isDefaultPrevented())
            ) {
              this._isShown = !1;
              var o = e(this._element).hasClass("fade");
              if (
                (o && (this._isTransitioning = !0),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                e(document).off("focusin.bs.modal"),
                e(this._element).removeClass("show"),
                e(this._element).off("click.dismiss.bs.modal"),
                e(this._dialog).off("mousedown.dismiss.bs.modal"),
                o)
              ) {
                var s = r.getTransitionDurationFromElement(this._element);
                e(this._element)
                  .one(r.TRANSITION_END, function (t) {
                    return n._hideModal(t);
                  })
                  .emulateTransitionEnd(s);
              } else this._hideModal();
            }
          }
        }),
        (n.dispose = function () {
          [window, this._element, this._dialog].forEach(function (t) {
            return e(t).off(".bs.modal");
          }),
            e(document).off("focusin.bs.modal"),
            e.removeData(this._element, "bs.modal"),
            (this._config = null),
            (this._element = null),
            (this._dialog = null),
            (this._backdrop = null),
            (this._isShown = null),
            (this._isBodyOverflowing = null),
            (this._ignoreBackdropClick = null),
            (this._isTransitioning = null),
            (this._scrollbarWidth = null);
        }),
        (n.handleUpdate = function () {
          this._adjustDialog();
        }),
        (n._getConfig = function (t) {
          return (t = o({}, At, t)), r.typeCheckConfig("modal", t, It), t;
        }),
        (n._triggerBackdropTransition = function () {
          var t = this;
          if ("static" === this._config.backdrop) {
            var n = e.Event("hidePrevented.bs.modal");
            if ((e(this._element).trigger(n), n.defaultPrevented)) return;
            var i =
              this._element.scrollHeight >
              document.documentElement.clientHeight;
            i || (this._element.style.overflowY = "hidden"),
              this._element.classList.add("modal-static");
            var o = r.getTransitionDurationFromElement(this._dialog);
            e(this._element).off(r.TRANSITION_END),
              e(this._element)
                .one(r.TRANSITION_END, function () {
                  t._element.classList.remove("modal-static"),
                    i ||
                      e(t._element)
                        .one(r.TRANSITION_END, function () {
                          t._element.style.overflowY = "";
                        })
                        .emulateTransitionEnd(t._element, o);
                })
                .emulateTransitionEnd(o),
              this._element.focus();
          } else this.hide();
        }),
        (n._showElement = function (t) {
          var n = this,
            i = e(this._element).hasClass("fade"),
            o = this._dialog ? this._dialog.querySelector(".modal-body") : null;
          (this._element.parentNode &&
            this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
            document.body.appendChild(this._element),
            (this._element.style.display = "block"),
            this._element.removeAttribute("aria-hidden"),
            this._element.setAttribute("aria-modal", !0),
            this._element.setAttribute("role", "dialog"),
            e(this._dialog).hasClass("modal-dialog-scrollable") && o
              ? (o.scrollTop = 0)
              : (this._element.scrollTop = 0),
            i && r.reflow(this._element),
            e(this._element).addClass("show"),
            this._config.focus && this._enforceFocus();
          var s = e.Event("shown.bs.modal", { relatedTarget: t }),
            a = function () {
              n._config.focus && n._element.focus(),
                (n._isTransitioning = !1),
                e(n._element).trigger(s);
            };
          if (i) {
            var l = r.getTransitionDurationFromElement(this._dialog);
            e(this._dialog).one(r.TRANSITION_END, a).emulateTransitionEnd(l);
          } else a();
        }),
        (n._enforceFocus = function () {
          var t = this;
          e(document)
            .off("focusin.bs.modal")
            .on("focusin.bs.modal", function (n) {
              document !== n.target &&
                t._element !== n.target &&
                0 === e(t._element).has(n.target).length &&
                t._element.focus();
            });
        }),
        (n._setEscapeEvent = function () {
          var t = this;
          this._isShown
            ? e(this._element).on("keydown.dismiss.bs.modal", function (e) {
                t._config.keyboard && 27 === e.which
                  ? (e.preventDefault(), t.hide())
                  : t._config.keyboard ||
                    27 !== e.which ||
                    t._triggerBackdropTransition();
              })
            : this._isShown || e(this._element).off("keydown.dismiss.bs.modal");
        }),
        (n._setResizeEvent = function () {
          var t = this;
          this._isShown
            ? e(window).on("resize.bs.modal", function (e) {
                return t.handleUpdate(e);
              })
            : e(window).off("resize.bs.modal");
        }),
        (n._hideModal = function () {
          var t = this;
          (this._element.style.display = "none"),
            this._element.setAttribute("aria-hidden", !0),
            this._element.removeAttribute("aria-modal"),
            this._element.removeAttribute("role"),
            (this._isTransitioning = !1),
            this._showBackdrop(function () {
              e(document.body).removeClass("modal-open"),
                t._resetAdjustments(),
                t._resetScrollbar(),
                e(t._element).trigger("hidden.bs.modal");
            });
        }),
        (n._removeBackdrop = function () {
          this._backdrop &&
            (e(this._backdrop).remove(), (this._backdrop = null));
        }),
        (n._showBackdrop = function (t) {
          var n = this,
            i = e(this._element).hasClass("fade") ? "fade" : "";
          if (this._isShown && this._config.backdrop) {
            if (
              ((this._backdrop = document.createElement("div")),
              (this._backdrop.className = "modal-backdrop"),
              i && this._backdrop.classList.add(i),
              e(this._backdrop).appendTo(document.body),
              e(this._element).on("click.dismiss.bs.modal", function (t) {
                n._ignoreBackdropClick
                  ? (n._ignoreBackdropClick = !1)
                  : t.target === t.currentTarget &&
                    n._triggerBackdropTransition();
              }),
              i && r.reflow(this._backdrop),
              e(this._backdrop).addClass("show"),
              !t)
            )
              return;
            if (!i) return void t();
            var o = r.getTransitionDurationFromElement(this._backdrop);
            e(this._backdrop).one(r.TRANSITION_END, t).emulateTransitionEnd(o);
          } else if (!this._isShown && this._backdrop) {
            e(this._backdrop).removeClass("show");
            var s = function () {
              n._removeBackdrop(), t && t();
            };
            if (e(this._element).hasClass("fade")) {
              var a = r.getTransitionDurationFromElement(this._backdrop);
              e(this._backdrop)
                .one(r.TRANSITION_END, s)
                .emulateTransitionEnd(a);
            } else s();
          } else t && t();
        }),
        (n._adjustDialog = function () {
          var t =
            this._element.scrollHeight > document.documentElement.clientHeight;
          !this._isBodyOverflowing &&
            t &&
            (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
            this._isBodyOverflowing &&
              !t &&
              (this._element.style.paddingRight = this._scrollbarWidth + "px");
        }),
        (n._resetAdjustments = function () {
          (this._element.style.paddingLeft = ""),
            (this._element.style.paddingRight = "");
        }),
        (n._checkScrollbar = function () {
          var t = document.body.getBoundingClientRect();
          (this._isBodyOverflowing =
            Math.round(t.left + t.right) < window.innerWidth),
            (this._scrollbarWidth = this._getScrollbarWidth());
        }),
        (n._setScrollbar = function () {
          var t = this;
          if (this._isBodyOverflowing) {
            var n = [].slice.call(
                document.querySelectorAll(
                  ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
                )
              ),
              i = [].slice.call(document.querySelectorAll(".sticky-top"));
            e(n).each(function (n, i) {
              var o = i.style.paddingRight,
                r = e(i).css("padding-right");
              e(i)
                .data("padding-right", o)
                .css("padding-right", parseFloat(r) + t._scrollbarWidth + "px");
            }),
              e(i).each(function (n, i) {
                var o = i.style.marginRight,
                  r = e(i).css("margin-right");
                e(i)
                  .data("margin-right", o)
                  .css(
                    "margin-right",
                    parseFloat(r) - t._scrollbarWidth + "px"
                  );
              });
            var o = document.body.style.paddingRight,
              r = e(document.body).css("padding-right");
            e(document.body)
              .data("padding-right", o)
              .css(
                "padding-right",
                parseFloat(r) + this._scrollbarWidth + "px"
              );
          }
          e(document.body).addClass("modal-open");
        }),
        (n._resetScrollbar = function () {
          var t = [].slice.call(
            document.querySelectorAll(
              ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
            )
          );
          e(t).each(function (t, n) {
            var i = e(n).data("padding-right");
            e(n).removeData("padding-right"), (n.style.paddingRight = i || "");
          });
          var n = [].slice.call(document.querySelectorAll(".sticky-top"));
          e(n).each(function (t, n) {
            var i = e(n).data("margin-right");
            void 0 !== i &&
              e(n).css("margin-right", i).removeData("margin-right");
          });
          var i = e(document.body).data("padding-right");
          e(document.body).removeData("padding-right"),
            (document.body.style.paddingRight = i || "");
        }),
        (n._getScrollbarWidth = function () {
          var t = document.createElement("div");
          (t.className = "modal-scrollbar-measure"),
            document.body.appendChild(t);
          var e = t.getBoundingClientRect().width - t.clientWidth;
          return document.body.removeChild(t), e;
        }),
        (t._jQueryInterface = function (n, i) {
          return this.each(function () {
            var r = e(this).data("bs.modal"),
              s = o({}, At, e(this).data(), "object" == typeof n && n ? n : {});
            if (
              (r || ((r = new t(this, s)), e(this).data("bs.modal", r)),
              "string" == typeof n)
            ) {
              if (void 0 === r[n])
                throw new TypeError('No method named "' + n + '"');
              r[n](i);
            } else s.show && r.show(i);
          });
        }),
        i(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
          {
            key: "Default",
            get: function () {
              return At;
            },
          },
        ]),
        t
      );
    })();
  e(document).on(
    "click.bs.modal.data-api",
    '[data-toggle="modal"]',
    function (t) {
      var n,
        i = this,
        s = r.getSelectorFromElement(this);
      s && (n = document.querySelector(s));
      var a = e(n).data("bs.modal")
        ? "toggle"
        : o({}, e(n).data(), e(this).data());
      ("A" !== this.tagName && "AREA" !== this.tagName) || t.preventDefault();
      var l = e(n).one("show.bs.modal", function (t) {
        t.isDefaultPrevented() ||
          l.one("hidden.bs.modal", function () {
            e(i).is(":visible") && i.focus();
          });
      });
      Ot._jQueryInterface.call(e(n), a, this);
    }
  ),
    (e.fn.modal = Ot._jQueryInterface),
    (e.fn.modal.Constructor = Ot),
    (e.fn.modal.noConflict = function () {
      return (e.fn.modal = kt), Ot._jQueryInterface;
    });
  var xt = [
      "background",
      "cite",
      "href",
      "itemtype",
      "longdesc",
      "poster",
      "src",
      "xlink:href",
    ],
    jt = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
    Lt =
      /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
  function Pt(t, e, n) {
    if (0 === t.length) return t;
    if (n && "function" == typeof n) return n(t);
    for (
      var i = new window.DOMParser().parseFromString(t, "text/html"),
        o = Object.keys(e),
        r = [].slice.call(i.body.querySelectorAll("*")),
        s = function (t, n) {
          var i = r[t],
            s = i.nodeName.toLowerCase();
          if (-1 === o.indexOf(i.nodeName.toLowerCase()))
            return i.parentNode.removeChild(i), "continue";
          var a = [].slice.call(i.attributes),
            l = [].concat(e["*"] || [], e[s] || []);
          a.forEach(function (t) {
            (function (t, e) {
              var n = t.nodeName.toLowerCase();
              if (-1 !== e.indexOf(n))
                return (
                  -1 === xt.indexOf(n) ||
                  Boolean(t.nodeValue.match(jt) || t.nodeValue.match(Lt))
                );
              for (
                var i = e.filter(function (t) {
                    return t instanceof RegExp;
                  }),
                  o = 0,
                  r = i.length;
                o < r;
                o++
              )
                if (n.match(i[o])) return !0;
              return !1;
            })(t, l) || i.removeAttribute(t.nodeName);
          });
        },
        a = 0,
        l = r.length;
      a < l;
      a++
    )
      s(a);
    return i.body.innerHTML;
  }
  var Ft = "tooltip",
    Rt = e.fn[Ft],
    Ht = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
    Mt = ["sanitize", "whiteList", "sanitizeFn"],
    Bt = {
      animation: "boolean",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
      delay: "(number|object)",
      html: "boolean",
      selector: "(string|boolean)",
      placement: "(string|function)",
      offset: "(number|string|function)",
      container: "(string|element|boolean)",
      fallbackPlacement: "(string|array)",
      boundary: "(string|element)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      whiteList: "object",
      popperConfig: "(null|object)",
    },
    qt = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: "right",
      BOTTOM: "bottom",
      LEFT: "left",
    },
    Qt = {
      animation: !0,
      template:
        '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      selector: !1,
      placement: "top",
      offset: 0,
      container: !1,
      fallbackPlacement: "flip",
      boundary: "scrollParent",
      sanitize: !0,
      sanitizeFn: null,
      whiteList: {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
      popperConfig: null,
    },
    Wt = {
      HIDE: "hide.bs.tooltip",
      HIDDEN: "hidden.bs.tooltip",
      SHOW: "show.bs.tooltip",
      SHOWN: "shown.bs.tooltip",
      INSERTED: "inserted.bs.tooltip",
      CLICK: "click.bs.tooltip",
      FOCUSIN: "focusin.bs.tooltip",
      FOCUSOUT: "focusout.bs.tooltip",
      MOUSEENTER: "mouseenter.bs.tooltip",
      MOUSELEAVE: "mouseleave.bs.tooltip",
    },
    Ut = (function () {
      function t(t, e) {
        if (void 0 === wt)
          throw new TypeError(
            "Bootstrap's tooltips require Popper.js (https://popper.js.org/)"
          );
        (this._isEnabled = !0),
          (this._timeout = 0),
          (this._hoverState = ""),
          (this._activeTrigger = {}),
          (this._popper = null),
          (this.element = t),
          (this.config = this._getConfig(e)),
          (this.tip = null),
          this._setListeners();
      }
      var n = t.prototype;
      return (
        (n.enable = function () {
          this._isEnabled = !0;
        }),
        (n.disable = function () {
          this._isEnabled = !1;
        }),
        (n.toggleEnabled = function () {
          this._isEnabled = !this._isEnabled;
        }),
        (n.toggle = function (t) {
          if (this._isEnabled)
            if (t) {
              var n = this.constructor.DATA_KEY,
                i = e(t.currentTarget).data(n);
              i ||
                ((i = new this.constructor(
                  t.currentTarget,
                  this._getDelegateConfig()
                )),
                e(t.currentTarget).data(n, i)),
                (i._activeTrigger.click = !i._activeTrigger.click),
                i._isWithActiveTrigger()
                  ? i._enter(null, i)
                  : i._leave(null, i);
            } else {
              if (e(this.getTipElement()).hasClass("show"))
                return void this._leave(null, this);
              this._enter(null, this);
            }
        }),
        (n.dispose = function () {
          clearTimeout(this._timeout),
            e.removeData(this.element, this.constructor.DATA_KEY),
            e(this.element).off(this.constructor.EVENT_KEY),
            e(this.element)
              .closest(".modal")
              .off("hide.bs.modal", this._hideModalHandler),
            this.tip && e(this.tip).remove(),
            (this._isEnabled = null),
            (this._timeout = null),
            (this._hoverState = null),
            (this._activeTrigger = null),
            this._popper && this._popper.destroy(),
            (this._popper = null),
            (this.element = null),
            (this.config = null),
            (this.tip = null);
        }),
        (n.show = function () {
          var t = this;
          if ("none" === e(this.element).css("display"))
            throw new Error("Please use show on visible elements");
          var n = e.Event(this.constructor.Event.SHOW);
          if (this.isWithContent() && this._isEnabled) {
            e(this.element).trigger(n);
            var i = r.findShadowRoot(this.element),
              o = e.contains(
                null !== i ? i : this.element.ownerDocument.documentElement,
                this.element
              );
            if (n.isDefaultPrevented() || !o) return;
            var s = this.getTipElement(),
              a = r.getUID(this.constructor.NAME);
            s.setAttribute("id", a),
              this.element.setAttribute("aria-describedby", a),
              this.setContent(),
              this.config.animation && e(s).addClass("fade");
            var l =
                "function" == typeof this.config.placement
                  ? this.config.placement.call(this, s, this.element)
                  : this.config.placement,
              c = this._getAttachment(l);
            this.addAttachmentClass(c);
            var h = this._getContainer();
            e(s).data(this.constructor.DATA_KEY, this),
              e.contains(
                this.element.ownerDocument.documentElement,
                this.tip
              ) || e(s).appendTo(h),
              e(this.element).trigger(this.constructor.Event.INSERTED),
              (this._popper = new wt(
                this.element,
                s,
                this._getPopperConfig(c)
              )),
              e(s).addClass("show"),
              "ontouchstart" in document.documentElement &&
                e(document.body).children().on("mouseover", null, e.noop);
            var u = function () {
              t.config.animation && t._fixTransition();
              var n = t._hoverState;
              (t._hoverState = null),
                e(t.element).trigger(t.constructor.Event.SHOWN),
                "out" === n && t._leave(null, t);
            };
            if (e(this.tip).hasClass("fade")) {
              var f = r.getTransitionDurationFromElement(this.tip);
              e(this.tip).one(r.TRANSITION_END, u).emulateTransitionEnd(f);
            } else u();
          }
        }),
        (n.hide = function (t) {
          var n = this,
            i = this.getTipElement(),
            o = e.Event(this.constructor.Event.HIDE),
            s = function () {
              "show" !== n._hoverState &&
                i.parentNode &&
                i.parentNode.removeChild(i),
                n._cleanTipClass(),
                n.element.removeAttribute("aria-describedby"),
                e(n.element).trigger(n.constructor.Event.HIDDEN),
                null !== n._popper && n._popper.destroy(),
                t && t();
            };
          if ((e(this.element).trigger(o), !o.isDefaultPrevented())) {
            if (
              (e(i).removeClass("show"),
              "ontouchstart" in document.documentElement &&
                e(document.body).children().off("mouseover", null, e.noop),
              (this._activeTrigger.click = !1),
              (this._activeTrigger.focus = !1),
              (this._activeTrigger.hover = !1),
              e(this.tip).hasClass("fade"))
            ) {
              var a = r.getTransitionDurationFromElement(i);
              e(i).one(r.TRANSITION_END, s).emulateTransitionEnd(a);
            } else s();
            this._hoverState = "";
          }
        }),
        (n.update = function () {
          null !== this._popper && this._popper.scheduleUpdate();
        }),
        (n.isWithContent = function () {
          return Boolean(this.getTitle());
        }),
        (n.addAttachmentClass = function (t) {
          e(this.getTipElement()).addClass("bs-tooltip-" + t);
        }),
        (n.getTipElement = function () {
          return (this.tip = this.tip || e(this.config.template)[0]), this.tip;
        }),
        (n.setContent = function () {
          var t = this.getTipElement();
          this.setElementContent(
            e(t.querySelectorAll(".tooltip-inner")),
            this.getTitle()
          ),
            e(t).removeClass("fade show");
        }),
        (n.setElementContent = function (t, n) {
          "object" != typeof n || (!n.nodeType && !n.jquery)
            ? this.config.html
              ? (this.config.sanitize &&
                  (n = Pt(n, this.config.whiteList, this.config.sanitizeFn)),
                t.html(n))
              : t.text(n)
            : this.config.html
            ? e(n).parent().is(t) || t.empty().append(n)
            : t.text(e(n).text());
        }),
        (n.getTitle = function () {
          var t = this.element.getAttribute("data-original-title");
          return (
            t ||
              (t =
                "function" == typeof this.config.title
                  ? this.config.title.call(this.element)
                  : this.config.title),
            t
          );
        }),
        (n._getPopperConfig = function (t) {
          var e = this;
          return o(
            {},
            {
              placement: t,
              modifiers: {
                offset: this._getOffset(),
                flip: { behavior: this.config.fallbackPlacement },
                arrow: { element: ".arrow" },
                preventOverflow: { boundariesElement: this.config.boundary },
              },
              onCreate: function (t) {
                t.originalPlacement !== t.placement &&
                  e._handlePopperPlacementChange(t);
              },
              onUpdate: function (t) {
                return e._handlePopperPlacementChange(t);
              },
            },
            this.config.popperConfig
          );
        }),
        (n._getOffset = function () {
          var t = this,
            e = {};
          return (
            "function" == typeof this.config.offset
              ? (e.fn = function (e) {
                  return (
                    (e.offsets = o(
                      {},
                      e.offsets,
                      t.config.offset(e.offsets, t.element) || {}
                    )),
                    e
                  );
                })
              : (e.offset = this.config.offset),
            e
          );
        }),
        (n._getContainer = function () {
          return !1 === this.config.container
            ? document.body
            : r.isElement(this.config.container)
            ? e(this.config.container)
            : e(document).find(this.config.container);
        }),
        (n._getAttachment = function (t) {
          return qt[t.toUpperCase()];
        }),
        (n._setListeners = function () {
          var t = this;
          this.config.trigger.split(" ").forEach(function (n) {
            if ("click" === n)
              e(t.element).on(
                t.constructor.Event.CLICK,
                t.config.selector,
                function (e) {
                  return t.toggle(e);
                }
              );
            else if ("manual" !== n) {
              var i =
                  "hover" === n
                    ? t.constructor.Event.MOUSEENTER
                    : t.constructor.Event.FOCUSIN,
                o =
                  "hover" === n
                    ? t.constructor.Event.MOUSELEAVE
                    : t.constructor.Event.FOCUSOUT;
              e(t.element)
                .on(i, t.config.selector, function (e) {
                  return t._enter(e);
                })
                .on(o, t.config.selector, function (e) {
                  return t._leave(e);
                });
            }
          }),
            (this._hideModalHandler = function () {
              t.element && t.hide();
            }),
            e(this.element)
              .closest(".modal")
              .on("hide.bs.modal", this._hideModalHandler),
            this.config.selector
              ? (this.config = o({}, this.config, {
                  trigger: "manual",
                  selector: "",
                }))
              : this._fixTitle();
        }),
        (n._fixTitle = function () {
          var t = typeof this.element.getAttribute("data-original-title");
          (this.element.getAttribute("title") || "string" !== t) &&
            (this.element.setAttribute(
              "data-original-title",
              this.element.getAttribute("title") || ""
            ),
            this.element.setAttribute("title", ""));
        }),
        (n._enter = function (t, n) {
          var i = this.constructor.DATA_KEY;
          (n = n || e(t.currentTarget).data(i)) ||
            ((n = new this.constructor(
              t.currentTarget,
              this._getDelegateConfig()
            )),
            e(t.currentTarget).data(i, n)),
            t &&
              (n._activeTrigger["focusin" === t.type ? "focus" : "hover"] = !0),
            e(n.getTipElement()).hasClass("show") || "show" === n._hoverState
              ? (n._hoverState = "show")
              : (clearTimeout(n._timeout),
                (n._hoverState = "show"),
                n.config.delay && n.config.delay.show
                  ? (n._timeout = setTimeout(function () {
                      "show" === n._hoverState && n.show();
                    }, n.config.delay.show))
                  : n.show());
        }),
        (n._leave = function (t, n) {
          var i = this.constructor.DATA_KEY;
          (n = n || e(t.currentTarget).data(i)) ||
            ((n = new this.constructor(
              t.currentTarget,
              this._getDelegateConfig()
            )),
            e(t.currentTarget).data(i, n)),
            t &&
              (n._activeTrigger["focusout" === t.type ? "focus" : "hover"] =
                !1),
            n._isWithActiveTrigger() ||
              (clearTimeout(n._timeout),
              (n._hoverState = "out"),
              n.config.delay && n.config.delay.hide
                ? (n._timeout = setTimeout(function () {
                    "out" === n._hoverState && n.hide();
                  }, n.config.delay.hide))
                : n.hide());
        }),
        (n._isWithActiveTrigger = function () {
          for (var t in this._activeTrigger)
            if (this._activeTrigger[t]) return !0;
          return !1;
        }),
        (n._getConfig = function (t) {
          var n = e(this.element).data();
          return (
            Object.keys(n).forEach(function (t) {
              -1 !== Mt.indexOf(t) && delete n[t];
            }),
            "number" ==
              typeof (t = o(
                {},
                this.constructor.Default,
                n,
                "object" == typeof t && t ? t : {}
              )).delay && (t.delay = { show: t.delay, hide: t.delay }),
            "number" == typeof t.title && (t.title = t.title.toString()),
            "number" == typeof t.content && (t.content = t.content.toString()),
            r.typeCheckConfig(Ft, t, this.constructor.DefaultType),
            t.sanitize &&
              (t.template = Pt(t.template, t.whiteList, t.sanitizeFn)),
            t
          );
        }),
        (n._getDelegateConfig = function () {
          var t = {};
          if (this.config)
            for (var e in this.config)
              this.constructor.Default[e] !== this.config[e] &&
                (t[e] = this.config[e]);
          return t;
        }),
        (n._cleanTipClass = function () {
          var t = e(this.getTipElement()),
            n = t.attr("class").match(Ht);
          null !== n && n.length && t.removeClass(n.join(""));
        }),
        (n._handlePopperPlacementChange = function (t) {
          (this.tip = t.instance.popper),
            this._cleanTipClass(),
            this.addAttachmentClass(this._getAttachment(t.placement));
        }),
        (n._fixTransition = function () {
          var t = this.getTipElement(),
            n = this.config.animation;
          null === t.getAttribute("x-placement") &&
            (e(t).removeClass("fade"),
            (this.config.animation = !1),
            this.hide(),
            this.show(),
            (this.config.animation = n));
        }),
        (t._jQueryInterface = function (n) {
          return this.each(function () {
            var i = e(this).data("bs.tooltip"),
              o = "object" == typeof n && n;
            if (
              (i || !/dispose|hide/.test(n)) &&
              (i || ((i = new t(this, o)), e(this).data("bs.tooltip", i)),
              "string" == typeof n)
            ) {
              if (void 0 === i[n])
                throw new TypeError('No method named "' + n + '"');
              i[n]();
            }
          });
        }),
        i(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
          {
            key: "Default",
            get: function () {
              return Qt;
            },
          },
          {
            key: "NAME",
            get: function () {
              return Ft;
            },
          },
          {
            key: "DATA_KEY",
            get: function () {
              return "bs.tooltip";
            },
          },
          {
            key: "Event",
            get: function () {
              return Wt;
            },
          },
          {
            key: "EVENT_KEY",
            get: function () {
              return ".bs.tooltip";
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return Bt;
            },
          },
        ]),
        t
      );
    })();
  (e.fn[Ft] = Ut._jQueryInterface),
    (e.fn[Ft].Constructor = Ut),
    (e.fn[Ft].noConflict = function () {
      return (e.fn[Ft] = Rt), Ut._jQueryInterface;
    });
  var Vt = "popover",
    Yt = e.fn[Vt],
    zt = new RegExp("(^|\\s)bs-popover\\S+", "g"),
    Xt = o({}, Ut.Default, {
      placement: "right",
      trigger: "click",
      content: "",
      template:
        '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    }),
    Kt = o({}, Ut.DefaultType, { content: "(string|element|function)" }),
    Gt = {
      HIDE: "hide.bs.popover",
      HIDDEN: "hidden.bs.popover",
      SHOW: "show.bs.popover",
      SHOWN: "shown.bs.popover",
      INSERTED: "inserted.bs.popover",
      CLICK: "click.bs.popover",
      FOCUSIN: "focusin.bs.popover",
      FOCUSOUT: "focusout.bs.popover",
      MOUSEENTER: "mouseenter.bs.popover",
      MOUSELEAVE: "mouseleave.bs.popover",
    },
    $t = (function (t) {
      var n, o;
      function r() {
        return t.apply(this, arguments) || this;
      }
      (o = t),
        ((n = r).prototype = Object.create(o.prototype)),
        (n.prototype.constructor = n),
        (n.__proto__ = o);
      var s = r.prototype;
      return (
        (s.isWithContent = function () {
          return this.getTitle() || this._getContent();
        }),
        (s.addAttachmentClass = function (t) {
          e(this.getTipElement()).addClass("bs-popover-" + t);
        }),
        (s.getTipElement = function () {
          return (this.tip = this.tip || e(this.config.template)[0]), this.tip;
        }),
        (s.setContent = function () {
          var t = e(this.getTipElement());
          this.setElementContent(t.find(".popover-header"), this.getTitle());
          var n = this._getContent();
          "function" == typeof n && (n = n.call(this.element)),
            this.setElementContent(t.find(".popover-body"), n),
            t.removeClass("fade show");
        }),
        (s._getContent = function () {
          return (
            this.element.getAttribute("data-content") || this.config.content
          );
        }),
        (s._cleanTipClass = function () {
          var t = e(this.getTipElement()),
            n = t.attr("class").match(zt);
          null !== n && n.length > 0 && t.removeClass(n.join(""));
        }),
        (r._jQueryInterface = function (t) {
          return this.each(function () {
            var n = e(this).data("bs.popover"),
              i = "object" == typeof t ? t : null;
            if (
              (n || !/dispose|hide/.test(t)) &&
              (n || ((n = new r(this, i)), e(this).data("bs.popover", n)),
              "string" == typeof t)
            ) {
              if (void 0 === n[t])
                throw new TypeError('No method named "' + t + '"');
              n[t]();
            }
          });
        }),
        i(r, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
          {
            key: "Default",
            get: function () {
              return Xt;
            },
          },
          {
            key: "NAME",
            get: function () {
              return Vt;
            },
          },
          {
            key: "DATA_KEY",
            get: function () {
              return "bs.popover";
            },
          },
          {
            key: "Event",
            get: function () {
              return Gt;
            },
          },
          {
            key: "EVENT_KEY",
            get: function () {
              return ".bs.popover";
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return Kt;
            },
          },
        ]),
        r
      );
    })(Ut);
  (e.fn[Vt] = $t._jQueryInterface),
    (e.fn[Vt].Constructor = $t),
    (e.fn[Vt].noConflict = function () {
      return (e.fn[Vt] = Yt), $t._jQueryInterface;
    });
  var Jt = "scrollspy",
    Zt = e.fn[Jt],
    te = { offset: 10, method: "auto", target: "" },
    ee = { offset: "number", method: "string", target: "(string|element)" },
    ne = (function () {
      function t(t, n) {
        var i = this;
        (this._element = t),
          (this._scrollElement = "BODY" === t.tagName ? window : t),
          (this._config = this._getConfig(n)),
          (this._selector =
            this._config.target +
            " .nav-link," +
            this._config.target +
            " .list-group-item," +
            this._config.target +
            " .dropdown-item"),
          (this._offsets = []),
          (this._targets = []),
          (this._activeTarget = null),
          (this._scrollHeight = 0),
          e(this._scrollElement).on("scroll.bs.scrollspy", function (t) {
            return i._process(t);
          }),
          this.refresh(),
          this._process();
      }
      var n = t.prototype;
      return (
        (n.refresh = function () {
          var t = this,
            n =
              this._scrollElement === this._scrollElement.window
                ? "offset"
                : "position",
            i = "auto" === this._config.method ? n : this._config.method,
            o = "position" === i ? this._getScrollTop() : 0;
          (this._offsets = []),
            (this._targets = []),
            (this._scrollHeight = this._getScrollHeight()),
            [].slice
              .call(document.querySelectorAll(this._selector))
              .map(function (t) {
                var n,
                  s = r.getSelectorFromElement(t);
                if ((s && (n = document.querySelector(s)), n)) {
                  var a = n.getBoundingClientRect();
                  if (a.width || a.height) return [e(n)[i]().top + o, s];
                }
                return null;
              })
              .filter(function (t) {
                return t;
              })
              .sort(function (t, e) {
                return t[0] - e[0];
              })
              .forEach(function (e) {
                t._offsets.push(e[0]), t._targets.push(e[1]);
              });
        }),
        (n.dispose = function () {
          e.removeData(this._element, "bs.scrollspy"),
            e(this._scrollElement).off(".bs.scrollspy"),
            (this._element = null),
            (this._scrollElement = null),
            (this._config = null),
            (this._selector = null),
            (this._offsets = null),
            (this._targets = null),
            (this._activeTarget = null),
            (this._scrollHeight = null);
        }),
        (n._getConfig = function (t) {
          if (
            "string" !=
              typeof (t = o({}, te, "object" == typeof t && t ? t : {}))
                .target &&
            r.isElement(t.target)
          ) {
            var n = e(t.target).attr("id");
            n || ((n = r.getUID(Jt)), e(t.target).attr("id", n)),
              (t.target = "#" + n);
          }
          return r.typeCheckConfig(Jt, t, ee), t;
        }),
        (n._getScrollTop = function () {
          return this._scrollElement === window
            ? this._scrollElement.pageYOffset
            : this._scrollElement.scrollTop;
        }),
        (n._getScrollHeight = function () {
          return (
            this._scrollElement.scrollHeight ||
            Math.max(
              document.body.scrollHeight,
              document.documentElement.scrollHeight
            )
          );
        }),
        (n._getOffsetHeight = function () {
          return this._scrollElement === window
            ? window.innerHeight
            : this._scrollElement.getBoundingClientRect().height;
        }),
        (n._process = function () {
          var t = this._getScrollTop() + this._config.offset,
            e = this._getScrollHeight(),
            n = this._config.offset + e - this._getOffsetHeight();
          if ((this._scrollHeight !== e && this.refresh(), t >= n)) {
            var i = this._targets[this._targets.length - 1];
            this._activeTarget !== i && this._activate(i);
          } else {
            if (
              this._activeTarget &&
              t < this._offsets[0] &&
              this._offsets[0] > 0
            )
              return (this._activeTarget = null), void this._clear();
            for (var o = this._offsets.length; o--; )
              this._activeTarget !== this._targets[o] &&
                t >= this._offsets[o] &&
                (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) &&
                this._activate(this._targets[o]);
          }
        }),
        (n._activate = function (t) {
          (this._activeTarget = t), this._clear();
          var n = this._selector.split(",").map(function (e) {
              return (
                e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
              );
            }),
            i = e([].slice.call(document.querySelectorAll(n.join(","))));
          i.hasClass("dropdown-item")
            ? (i
                .closest(".dropdown")
                .find(".dropdown-toggle")
                .addClass("active"),
              i.addClass("active"))
            : (i.addClass("active"),
              i
                .parents(".nav, .list-group")
                .prev(".nav-link, .list-group-item")
                .addClass("active"),
              i
                .parents(".nav, .list-group")
                .prev(".nav-item")
                .children(".nav-link")
                .addClass("active")),
            e(this._scrollElement).trigger("activate.bs.scrollspy", {
              relatedTarget: t,
            });
        }),
        (n._clear = function () {
          [].slice
            .call(document.querySelectorAll(this._selector))
            .filter(function (t) {
              return t.classList.contains("active");
            })
            .forEach(function (t) {
              return t.classList.remove("active");
            });
        }),
        (t._jQueryInterface = function (n) {
          return this.each(function () {
            var i = e(this).data("bs.scrollspy");
            if (
              (i ||
                ((i = new t(this, "object" == typeof n && n)),
                e(this).data("bs.scrollspy", i)),
              "string" == typeof n)
            ) {
              if (void 0 === i[n])
                throw new TypeError('No method named "' + n + '"');
              i[n]();
            }
          });
        }),
        i(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
          {
            key: "Default",
            get: function () {
              return te;
            },
          },
        ]),
        t
      );
    })();
  e(window).on("load.bs.scrollspy.data-api", function () {
    for (
      var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')),
        n = t.length;
      n--;

    ) {
      var i = e(t[n]);
      ne._jQueryInterface.call(i, i.data());
    }
  }),
    (e.fn[Jt] = ne._jQueryInterface),
    (e.fn[Jt].Constructor = ne),
    (e.fn[Jt].noConflict = function () {
      return (e.fn[Jt] = Zt), ne._jQueryInterface;
    });
  var ie = e.fn.tab,
    oe = (function () {
      function t(t) {
        this._element = t;
      }
      var n = t.prototype;
      return (
        (n.show = function () {
          var t = this;
          if (
            !(
              (this._element.parentNode &&
                this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                e(this._element).hasClass("active")) ||
              e(this._element).hasClass("disabled")
            )
          ) {
            var n,
              i,
              o = e(this._element).closest(".nav, .list-group")[0],
              s = r.getSelectorFromElement(this._element);
            if (o) {
              var a =
                "UL" === o.nodeName || "OL" === o.nodeName
                  ? "> li > .active"
                  : ".active";
              i = (i = e.makeArray(e(o).find(a)))[i.length - 1];
            }
            var l = e.Event("hide.bs.tab", { relatedTarget: this._element }),
              c = e.Event("show.bs.tab", { relatedTarget: i });
            if (
              (i && e(i).trigger(l),
              e(this._element).trigger(c),
              !c.isDefaultPrevented() && !l.isDefaultPrevented())
            ) {
              s && (n = document.querySelector(s)),
                this._activate(this._element, o);
              var h = function () {
                var n = e.Event("hidden.bs.tab", { relatedTarget: t._element }),
                  o = e.Event("shown.bs.tab", { relatedTarget: i });
                e(i).trigger(n), e(t._element).trigger(o);
              };
              n ? this._activate(n, n.parentNode, h) : h();
            }
          }
        }),
        (n.dispose = function () {
          e.removeData(this._element, "bs.tab"), (this._element = null);
        }),
        (n._activate = function (t, n, i) {
          var o = this,
            s = (
              !n || ("UL" !== n.nodeName && "OL" !== n.nodeName)
                ? e(n).children(".active")
                : e(n).find("> li > .active")
            )[0],
            a = i && s && e(s).hasClass("fade"),
            l = function () {
              return o._transitionComplete(t, s, i);
            };
          if (s && a) {
            var c = r.getTransitionDurationFromElement(s);
            e(s)
              .removeClass("show")
              .one(r.TRANSITION_END, l)
              .emulateTransitionEnd(c);
          } else l();
        }),
        (n._transitionComplete = function (t, n, i) {
          if (n) {
            e(n).removeClass("active");
            var o = e(n.parentNode).find("> .dropdown-menu .active")[0];
            o && e(o).removeClass("active"),
              "tab" === n.getAttribute("role") &&
                n.setAttribute("aria-selected", !1);
          }
          if (
            (e(t).addClass("active"),
            "tab" === t.getAttribute("role") &&
              t.setAttribute("aria-selected", !0),
            r.reflow(t),
            t.classList.contains("fade") && t.classList.add("show"),
            t.parentNode && e(t.parentNode).hasClass("dropdown-menu"))
          ) {
            var s = e(t).closest(".dropdown")[0];
            if (s) {
              var a = [].slice.call(s.querySelectorAll(".dropdown-toggle"));
              e(a).addClass("active");
            }
            t.setAttribute("aria-expanded", !0);
          }
          i && i();
        }),
        (t._jQueryInterface = function (n) {
          return this.each(function () {
            var i = e(this),
              o = i.data("bs.tab");
            if (
              (o || ((o = new t(this)), i.data("bs.tab", o)),
              "string" == typeof n)
            ) {
              if (void 0 === o[n])
                throw new TypeError('No method named "' + n + '"');
              o[n]();
            }
          });
        }),
        i(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
        ]),
        t
      );
    })();
  e(document).on(
    "click.bs.tab.data-api",
    '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    function (t) {
      t.preventDefault(), oe._jQueryInterface.call(e(this), "show");
    }
  ),
    (e.fn.tab = oe._jQueryInterface),
    (e.fn.tab.Constructor = oe),
    (e.fn.tab.noConflict = function () {
      return (e.fn.tab = ie), oe._jQueryInterface;
    });
  var re = e.fn.toast,
    se = { animation: "boolean", autohide: "boolean", delay: "number" },
    ae = { animation: !0, autohide: !0, delay: 500 },
    le = (function () {
      function t(t, e) {
        (this._element = t),
          (this._config = this._getConfig(e)),
          (this._timeout = null),
          this._setListeners();
      }
      var n = t.prototype;
      return (
        (n.show = function () {
          var t = this,
            n = e.Event("show.bs.toast");
          if ((e(this._element).trigger(n), !n.isDefaultPrevented())) {
            this._clearTimeout(),
              this._config.animation && this._element.classList.add("fade");
            var i = function () {
              t._element.classList.remove("showing"),
                t._element.classList.add("show"),
                e(t._element).trigger("shown.bs.toast"),
                t._config.autohide &&
                  (t._timeout = setTimeout(function () {
                    t.hide();
                  }, t._config.delay));
            };
            if (
              (this._element.classList.remove("hide"),
              r.reflow(this._element),
              this._element.classList.add("showing"),
              this._config.animation)
            ) {
              var o = r.getTransitionDurationFromElement(this._element);
              e(this._element).one(r.TRANSITION_END, i).emulateTransitionEnd(o);
            } else i();
          }
        }),
        (n.hide = function () {
          if (this._element.classList.contains("show")) {
            var t = e.Event("hide.bs.toast");
            e(this._element).trigger(t),
              t.isDefaultPrevented() || this._close();
          }
        }),
        (n.dispose = function () {
          this._clearTimeout(),
            this._element.classList.contains("show") &&
              this._element.classList.remove("show"),
            e(this._element).off("click.dismiss.bs.toast"),
            e.removeData(this._element, "bs.toast"),
            (this._element = null),
            (this._config = null);
        }),
        (n._getConfig = function (t) {
          return (
            (t = o(
              {},
              ae,
              e(this._element).data(),
              "object" == typeof t && t ? t : {}
            )),
            r.typeCheckConfig("toast", t, this.constructor.DefaultType),
            t
          );
        }),
        (n._setListeners = function () {
          var t = this;
          e(this._element).on(
            "click.dismiss.bs.toast",
            '[data-dismiss="toast"]',
            function () {
              return t.hide();
            }
          );
        }),
        (n._close = function () {
          var t = this,
            n = function () {
              t._element.classList.add("hide"),
                e(t._element).trigger("hidden.bs.toast");
            };
          if (
            (this._element.classList.remove("show"), this._config.animation)
          ) {
            var i = r.getTransitionDurationFromElement(this._element);
            e(this._element).one(r.TRANSITION_END, n).emulateTransitionEnd(i);
          } else n();
        }),
        (n._clearTimeout = function () {
          clearTimeout(this._timeout), (this._timeout = null);
        }),
        (t._jQueryInterface = function (n) {
          return this.each(function () {
            var i = e(this),
              o = i.data("bs.toast");
            if (
              (o ||
                ((o = new t(this, "object" == typeof n && n)),
                i.data("bs.toast", o)),
              "string" == typeof n)
            ) {
              if (void 0 === o[n])
                throw new TypeError('No method named "' + n + '"');
              o[n](this);
            }
          });
        }),
        i(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return se;
            },
          },
          {
            key: "Default",
            get: function () {
              return ae;
            },
          },
        ]),
        t
      );
    })();
  (e.fn.toast = le._jQueryInterface),
    (e.fn.toast.Constructor = le),
    (e.fn.toast.noConflict = function () {
      return (e.fn.toast = re), le._jQueryInterface;
    }),
    (t.Alert = l),
    (t.Button = h),
    (t.Carousel = g),
    (t.Collapse = w),
    (t.Dropdown = Nt),
    (t.Modal = Ot),
    (t.Popover = $t),
    (t.Scrollspy = ne),
    (t.Tab = oe),
    (t.Toast = le),
    (t.Tooltip = Ut),
    (t.Util = r),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
//! moment.js
//! version : 2.18.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e.moment = t());
})(this, function () {
  "use strict";
  function e() {
    return tt.apply(null, arguments);
  }
  function t(e) {
    return (
      e instanceof Array ||
      "[object Array]" === Object.prototype.toString.call(e)
    );
  }
  function n(e) {
    return null != e && "[object Object]" === Object.prototype.toString.call(e);
  }
  function s(e) {
    return void 0 === e;
  }
  function i(e) {
    return (
      "number" == typeof e ||
      "[object Number]" === Object.prototype.toString.call(e)
    );
  }
  function r(e) {
    return (
      e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
    );
  }
  function a(e, t) {
    var n,
      s = [];
    for (n = 0; n < e.length; ++n) s.push(t(e[n], n));
    return s;
  }
  function o(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  function u(e, t) {
    for (var n in t) o(t, n) && (e[n] = t[n]);
    return (
      o(t, "toString") && (e.toString = t.toString),
      o(t, "valueOf") && (e.valueOf = t.valueOf),
      e
    );
  }
  function l(e, t, n, s) {
    return Me(e, t, n, s, !0).utc();
  }
  function d(e) {
    return (
      null == e._pf &&
        (e._pf = {
          empty: !1,
          unusedTokens: [],
          unusedInput: [],
          overflow: -2,
          charsLeftOver: 0,
          nullInput: !1,
          invalidMonth: null,
          invalidFormat: !1,
          userInvalidated: !1,
          iso: !1,
          parsedDateParts: [],
          meridiem: null,
          rfc2822: !1,
          weekdayMismatch: !1,
        }),
      e._pf
    );
  }
  function h(e) {
    if (null == e._isValid) {
      var t = d(e),
        n = nt.call(t.parsedDateParts, function (e) {
          return null != e;
        }),
        s =
          !isNaN(e._d.getTime()) &&
          t.overflow < 0 &&
          !t.empty &&
          !t.invalidMonth &&
          !t.invalidWeekday &&
          !t.nullInput &&
          !t.invalidFormat &&
          !t.userInvalidated &&
          (!t.meridiem || (t.meridiem && n));
      if (
        (e._strict &&
          (s =
            s &&
            0 === t.charsLeftOver &&
            0 === t.unusedTokens.length &&
            void 0 === t.bigHour),
        null != Object.isFrozen && Object.isFrozen(e))
      )
        return s;
      e._isValid = s;
    }
    return e._isValid;
  }
  function c(e) {
    var t = l(NaN);
    return null != e ? u(d(t), e) : (d(t).userInvalidated = !0), t;
  }
  function f(e, t) {
    var n, i, r;
    if (
      (s(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject),
      s(t._i) || (e._i = t._i),
      s(t._f) || (e._f = t._f),
      s(t._l) || (e._l = t._l),
      s(t._strict) || (e._strict = t._strict),
      s(t._tzm) || (e._tzm = t._tzm),
      s(t._isUTC) || (e._isUTC = t._isUTC),
      s(t._offset) || (e._offset = t._offset),
      s(t._pf) || (e._pf = d(t)),
      s(t._locale) || (e._locale = t._locale),
      st.length > 0)
    )
      for (n = 0; n < st.length; n++) s((r = t[(i = st[n])])) || (e[i] = r);
    return e;
  }
  function m(t) {
    f(this, t),
      (this._d = new Date(null != t._d ? t._d.getTime() : NaN)),
      this.isValid() || (this._d = new Date(NaN)),
      !1 === it && ((it = !0), e.updateOffset(this), (it = !1));
  }
  function _(e) {
    return e instanceof m || (null != e && null != e._isAMomentObject);
  }
  function y(e) {
    return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
  }
  function g(e) {
    var t = +e,
      n = 0;
    return 0 !== t && isFinite(t) && (n = y(t)), n;
  }
  function p(e, t, n) {
    var s,
      i = Math.min(e.length, t.length),
      r = Math.abs(e.length - t.length),
      a = 0;
    for (s = 0; s < i; s++)
      ((n && e[s] !== t[s]) || (!n && g(e[s]) !== g(t[s]))) && a++;
    return a + r;
  }
  function w(t) {
    !1 === e.suppressDeprecationWarnings &&
      "undefined" != typeof console &&
      console.warn &&
      console.warn("Deprecation warning: " + t);
  }
  function v(t, n) {
    var s = !0;
    return u(function () {
      if ((null != e.deprecationHandler && e.deprecationHandler(null, t), s)) {
        for (var i, r = [], a = 0; a < arguments.length; a++) {
          if (((i = ""), "object" == typeof arguments[a])) {
            for (var o in ((i += "\n[" + a + "] "), arguments[0]))
              i += o + ": " + arguments[0][o] + ", ";
            i = i.slice(0, -2);
          } else i = arguments[a];
          r.push(i);
        }
        w(
          t +
            "\nArguments: " +
            Array.prototype.slice.call(r).join("") +
            "\n" +
            new Error().stack
        ),
          (s = !1);
      }
      return n.apply(this, arguments);
    }, n);
  }
  function M(t, n) {
    null != e.deprecationHandler && e.deprecationHandler(t, n),
      rt[t] || (w(n), (rt[t] = !0));
  }
  function S(e) {
    return (
      e instanceof Function ||
      "[object Function]" === Object.prototype.toString.call(e)
    );
  }
  function k(e, t) {
    var s,
      i = u({}, e);
    for (s in t)
      o(t, s) &&
        (n(e[s]) && n(t[s])
          ? ((i[s] = {}), u(i[s], e[s]), u(i[s], t[s]))
          : null != t[s]
          ? (i[s] = t[s])
          : delete i[s]);
    for (s in e) o(e, s) && !o(t, s) && n(e[s]) && (i[s] = u({}, i[s]));
    return i;
  }
  function D(e) {
    null != e && this.set(e);
  }
  function Y(e, t) {
    var n = e.toLowerCase();
    ot[n] = ot[n + "s"] = ot[t] = e;
  }
  function O(e) {
    return "string" == typeof e ? ot[e] || ot[e.toLowerCase()] : void 0;
  }
  function x(e) {
    var t,
      n,
      s = {};
    for (n in e) o(e, n) && (t = O(n)) && (s[t] = e[n]);
    return s;
  }
  function T(e, t) {
    ut[e] = t;
  }
  function b(t, n) {
    return function (s) {
      return null != s
        ? (W(this, t, s), e.updateOffset(this, n), this)
        : P(this, t);
    };
  }
  function P(e, t) {
    return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
  }
  function W(e, t, n) {
    e.isValid() && e._d["set" + (e._isUTC ? "UTC" : "") + t](n);
  }
  function R(e, t, n) {
    var s = "" + Math.abs(e),
      i = t - s.length;
    return (
      (e >= 0 ? (n ? "+" : "") : "-") +
      Math.pow(10, Math.max(0, i)).toString().substr(1) +
      s
    );
  }
  function C(e, t, n, s) {
    var i = s;
    "string" == typeof s &&
      (i = function () {
        return this[s]();
      }),
      e && (ct[e] = i),
      t &&
        (ct[t[0]] = function () {
          return R(i.apply(this, arguments), t[1], t[2]);
        }),
      n &&
        (ct[n] = function () {
          return this.localeData().ordinal(i.apply(this, arguments), e);
        });
  }
  function F(e) {
    return e.match(/\[[\s\S]/)
      ? e.replace(/^\[|\]$/g, "")
      : e.replace(/\\/g, "");
  }
  function U(e, t) {
    return e.isValid()
      ? ((t = H(t, e.localeData())),
        (ht[t] =
          ht[t] ||
          (function (e) {
            var t,
              n,
              s = e.match(lt);
            for (t = 0, n = s.length; t < n; t++)
              ct[s[t]] ? (s[t] = ct[s[t]]) : (s[t] = F(s[t]));
            return function (t) {
              var i,
                r = "";
              for (i = 0; i < n; i++) r += S(s[i]) ? s[i].call(t, e) : s[i];
              return r;
            };
          })(t)),
        ht[t](e))
      : e.localeData().invalidDate();
  }
  function H(e, t) {
    function n(e) {
      return t.longDateFormat(e) || e;
    }
    var s = 5;
    for (dt.lastIndex = 0; s >= 0 && dt.test(e); )
      (e = e.replace(dt, n)), (dt.lastIndex = 0), (s -= 1);
    return e;
  }
  function L(e, t, n) {
    bt[e] = S(t)
      ? t
      : function (e, s) {
          return e && n ? n : t;
        };
  }
  function G(e, t) {
    return o(bt, e)
      ? bt[e](t._strict, t._locale)
      : new RegExp(
          (function (e) {
            return V(
              e
                .replace("\\", "")
                .replace(
                  /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
                  function (e, t, n, s, i) {
                    return t || n || s || i;
                  }
                )
            );
          })(e)
        );
  }
  function V(e) {
    return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }
  function N(e, t) {
    var n,
      s = t;
    for (
      "string" == typeof e && (e = [e]),
        i(t) &&
          (s = function (e, n) {
            n[t] = g(e);
          }),
        n = 0;
      n < e.length;
      n++
    )
      Pt[e[n]] = s;
  }
  function j(e, t) {
    N(e, function (e, n, s, i) {
      (s._w = s._w || {}), t(e, s._w, s, i);
    });
  }
  function A(e, t, n) {
    null != t && o(Pt, e) && Pt[e](t, n._a, n, e);
  }
  function E(e, t) {
    return new Date(Date.UTC(e, t + 1, 0)).getUTCDate();
  }
  function I(e, t, n) {
    var s,
      i,
      r,
      a = e.toLocaleLowerCase();
    if (!this._monthsParse)
      for (
        this._monthsParse = [],
          this._longMonthsParse = [],
          this._shortMonthsParse = [],
          s = 0;
        s < 12;
        ++s
      )
        (r = l([2e3, s])),
          (this._shortMonthsParse[s] = this.monthsShort(
            r,
            ""
          ).toLocaleLowerCase()),
          (this._longMonthsParse[s] = this.months(r, "").toLocaleLowerCase());
    return n
      ? "MMM" === t
        ? -1 !== (i = Nt.call(this._shortMonthsParse, a))
          ? i
          : null
        : -1 !== (i = Nt.call(this._longMonthsParse, a))
        ? i
        : null
      : "MMM" === t
      ? -1 !== (i = Nt.call(this._shortMonthsParse, a))
        ? i
        : -1 !== (i = Nt.call(this._longMonthsParse, a))
        ? i
        : null
      : -1 !== (i = Nt.call(this._longMonthsParse, a))
      ? i
      : -1 !== (i = Nt.call(this._shortMonthsParse, a))
      ? i
      : null;
  }
  function Z(e, t) {
    var n;
    if (!e.isValid()) return e;
    if ("string" == typeof t)
      if (/^\d+$/.test(t)) t = g(t);
      else if (!i((t = e.localeData().monthsParse(t)))) return e;
    return (
      (n = Math.min(e.date(), E(e.year(), t))),
      e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n),
      e
    );
  }
  function z(t) {
    return null != t
      ? (Z(this, t), e.updateOffset(this, !0), this)
      : P(this, "Month");
  }
  function $() {
    function e(e, t) {
      return t.length - e.length;
    }
    var t,
      n,
      s = [],
      i = [],
      r = [];
    for (t = 0; t < 12; t++)
      (n = l([2e3, t])),
        s.push(this.monthsShort(n, "")),
        i.push(this.months(n, "")),
        r.push(this.months(n, "")),
        r.push(this.monthsShort(n, ""));
    for (s.sort(e), i.sort(e), r.sort(e), t = 0; t < 12; t++)
      (s[t] = V(s[t])), (i[t] = V(i[t]));
    for (t = 0; t < 24; t++) r[t] = V(r[t]);
    (this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i")),
      (this._monthsShortRegex = this._monthsRegex),
      (this._monthsStrictRegex = new RegExp("^(" + i.join("|") + ")", "i")),
      (this._monthsShortStrictRegex = new RegExp(
        "^(" + s.join("|") + ")",
        "i"
      ));
  }
  function q(e) {
    return J(e) ? 366 : 365;
  }
  function J(e) {
    return (e % 4 == 0 && e % 100 != 0) || e % 400 == 0;
  }
  function B(e, t, n, s, i, r, a) {
    var o = new Date(e, t, n, s, i, r, a);
    return (
      e < 100 && e >= 0 && isFinite(o.getFullYear()) && o.setFullYear(e), o
    );
  }
  function Q(e) {
    var t = new Date(Date.UTC.apply(null, arguments));
    return (
      e < 100 && e >= 0 && isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e),
      t
    );
  }
  function X(e, t, n) {
    var s = 7 + t - n;
    return -((7 + Q(e, 0, s).getUTCDay() - t) % 7) + s - 1;
  }
  function K(e, t, n, s, i) {
    var r,
      a,
      o = 1 + 7 * (t - 1) + ((7 + n - s) % 7) + X(e, s, i);
    return (
      o <= 0
        ? (a = q((r = e - 1)) + o)
        : o > q(e)
        ? ((r = e + 1), (a = o - q(e)))
        : ((r = e), (a = o)),
      { year: r, dayOfYear: a }
    );
  }
  function ee(e, t, n) {
    var s,
      i,
      r = X(e.year(), t, n),
      a = Math.floor((e.dayOfYear() - r - 1) / 7) + 1;
    return (
      a < 1
        ? (s = a + te((i = e.year() - 1), t, n))
        : a > te(e.year(), t, n)
        ? ((s = a - te(e.year(), t, n)), (i = e.year() + 1))
        : ((i = e.year()), (s = a)),
      { week: s, year: i }
    );
  }
  function te(e, t, n) {
    var s = X(e, t, n),
      i = X(e + 1, t, n);
    return (q(e) - s + i) / 7;
  }
  function ne(e, t, n) {
    var s,
      i,
      r,
      a = e.toLocaleLowerCase();
    if (!this._weekdaysParse)
      for (
        this._weekdaysParse = [],
          this._shortWeekdaysParse = [],
          this._minWeekdaysParse = [],
          s = 0;
        s < 7;
        ++s
      )
        (r = l([2e3, 1]).day(s)),
          (this._minWeekdaysParse[s] = this.weekdaysMin(
            r,
            ""
          ).toLocaleLowerCase()),
          (this._shortWeekdaysParse[s] = this.weekdaysShort(
            r,
            ""
          ).toLocaleLowerCase()),
          (this._weekdaysParse[s] = this.weekdays(r, "").toLocaleLowerCase());
    return n
      ? "dddd" === t
        ? -1 !== (i = Nt.call(this._weekdaysParse, a))
          ? i
          : null
        : "ddd" === t
        ? -1 !== (i = Nt.call(this._shortWeekdaysParse, a))
          ? i
          : null
        : -1 !== (i = Nt.call(this._minWeekdaysParse, a))
        ? i
        : null
      : "dddd" === t
      ? -1 !== (i = Nt.call(this._weekdaysParse, a))
        ? i
        : -1 !== (i = Nt.call(this._shortWeekdaysParse, a))
        ? i
        : -1 !== (i = Nt.call(this._minWeekdaysParse, a))
        ? i
        : null
      : "ddd" === t
      ? -1 !== (i = Nt.call(this._shortWeekdaysParse, a))
        ? i
        : -1 !== (i = Nt.call(this._weekdaysParse, a))
        ? i
        : -1 !== (i = Nt.call(this._minWeekdaysParse, a))
        ? i
        : null
      : -1 !== (i = Nt.call(this._minWeekdaysParse, a))
      ? i
      : -1 !== (i = Nt.call(this._weekdaysParse, a))
      ? i
      : -1 !== (i = Nt.call(this._shortWeekdaysParse, a))
      ? i
      : null;
  }
  function se() {
    function e(e, t) {
      return t.length - e.length;
    }
    var t,
      n,
      s,
      i,
      r,
      a = [],
      o = [],
      u = [],
      d = [];
    for (t = 0; t < 7; t++)
      (n = l([2e3, 1]).day(t)),
        (s = this.weekdaysMin(n, "")),
        (i = this.weekdaysShort(n, "")),
        (r = this.weekdays(n, "")),
        a.push(s),
        o.push(i),
        u.push(r),
        d.push(s),
        d.push(i),
        d.push(r);
    for (a.sort(e), o.sort(e), u.sort(e), d.sort(e), t = 0; t < 7; t++)
      (o[t] = V(o[t])), (u[t] = V(u[t])), (d[t] = V(d[t]));
    (this._weekdaysRegex = new RegExp("^(" + d.join("|") + ")", "i")),
      (this._weekdaysShortRegex = this._weekdaysRegex),
      (this._weekdaysMinRegex = this._weekdaysRegex),
      (this._weekdaysStrictRegex = new RegExp("^(" + u.join("|") + ")", "i")),
      (this._weekdaysShortStrictRegex = new RegExp(
        "^(" + o.join("|") + ")",
        "i"
      )),
      (this._weekdaysMinStrictRegex = new RegExp(
        "^(" + a.join("|") + ")",
        "i"
      ));
  }
  function ie() {
    return this.hours() % 12 || 12;
  }
  function re(e, t) {
    C(e, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), t);
    });
  }
  function ae(e, t) {
    return t._meridiemParse;
  }
  function oe(e) {
    return e ? e.toLowerCase().replace("_", "-") : e;
  }
  function ue(e) {
    var t = null;
    if (!nn[e] && "undefined" != typeof module && module && module.exports)
      try {
        (t = Kt._abbr), require("./locale/" + e), le(t);
      } catch (e) {}
    return nn[e];
  }
  function le(e, t) {
    var n;
    return e && (n = s(t) ? he(e) : de(e, t)) && (Kt = n), Kt._abbr;
  }
  function de(e, t) {
    if (null !== t) {
      var n = tn;
      if (((t.abbr = e), null != nn[e]))
        M(
          "defineLocaleOverride",
          "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
        ),
          (n = nn[e]._config);
      else if (null != t.parentLocale) {
        if (null == nn[t.parentLocale])
          return (
            sn[t.parentLocale] || (sn[t.parentLocale] = []),
            sn[t.parentLocale].push({ name: e, config: t }),
            null
          );
        n = nn[t.parentLocale]._config;
      }
      return (
        (nn[e] = new D(k(n, t))),
        sn[e] &&
          sn[e].forEach(function (e) {
            de(e.name, e.config);
          }),
        le(e),
        nn[e]
      );
    }
    return delete nn[e], null;
  }
  function he(e) {
    var n;
    if ((e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e))
      return Kt;
    if (!t(e)) {
      if ((n = ue(e))) return n;
      e = [e];
    }
    return (function (e) {
      for (var t, n, s, i, r = 0; r < e.length; ) {
        for (
          t = (i = oe(e[r]).split("-")).length,
            n = (n = oe(e[r + 1])) ? n.split("-") : null;
          t > 0;

        ) {
          if ((s = ue(i.slice(0, t).join("-")))) return s;
          if (n && n.length >= t && p(i, n, !0) >= t - 1) break;
          t--;
        }
        r++;
      }
      return null;
    })(e);
  }
  function ce(e) {
    var t,
      n = e._a;
    return (
      n &&
        -2 === d(e).overflow &&
        ((t =
          n[Rt] < 0 || n[Rt] > 11
            ? Rt
            : n[Ct] < 1 || n[Ct] > E(n[Wt], n[Rt])
            ? Ct
            : n[Ft] < 0 ||
              n[Ft] > 24 ||
              (24 === n[Ft] && (0 !== n[Ut] || 0 !== n[Ht] || 0 !== n[Lt]))
            ? Ft
            : n[Ut] < 0 || n[Ut] > 59
            ? Ut
            : n[Ht] < 0 || n[Ht] > 59
            ? Ht
            : n[Lt] < 0 || n[Lt] > 999
            ? Lt
            : -1),
        d(e)._overflowDayOfYear && (t < Wt || t > Ct) && (t = Ct),
        d(e)._overflowWeeks && -1 === t && (t = Gt),
        d(e)._overflowWeekday && -1 === t && (t = Vt),
        (d(e).overflow = t)),
      e
    );
  }
  function fe(e) {
    var t,
      n,
      s,
      i,
      r,
      a,
      o = e._i,
      u = rn.exec(o) || an.exec(o);
    if (u) {
      for (d(e).iso = !0, t = 0, n = un.length; t < n; t++)
        if (un[t][1].exec(u[1])) {
          (i = un[t][0]), (s = !1 !== un[t][2]);
          break;
        }
      if (null == i) return void (e._isValid = !1);
      if (u[3]) {
        for (t = 0, n = ln.length; t < n; t++)
          if (ln[t][1].exec(u[3])) {
            r = (u[2] || " ") + ln[t][0];
            break;
          }
        if (null == r) return void (e._isValid = !1);
      }
      if (!s && null != r) return void (e._isValid = !1);
      if (u[4]) {
        if (!on.exec(u[4])) return void (e._isValid = !1);
        a = "Z";
      }
      (e._f = i + (r || "") + (a || "")), pe(e);
    } else e._isValid = !1;
  }
  function me(e) {
    var t,
      n,
      s,
      i,
      r,
      a,
      o,
      u = {
        " GMT": " +0000",
        " EDT": " -0400",
        " EST": " -0500",
        " CDT": " -0500",
        " CST": " -0600",
        " MDT": " -0600",
        " MST": " -0700",
        " PDT": " -0700",
        " PST": " -0800",
      };
    if (
      ((t = e._i
        .replace(/\([^\)]*\)|[\n\t]/g, " ")
        .replace(/(\s\s+)/g, " ")
        .replace(/^\s|\s$/g, "")),
      (n = hn.exec(t)))
    ) {
      if (
        ((s = n[1] ? "ddd" + (5 === n[1].length ? ", " : " ") : ""),
        (i = "D MMM " + (n[2].length > 10 ? "YYYY " : "YY ")),
        (r = "HH:mm" + (n[4] ? ":ss" : "")),
        n[1])
      ) {
        var l = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
          new Date(n[2]).getDay()
        ];
        if (n[1].substr(0, 3) !== l)
          return (d(e).weekdayMismatch = !0), void (e._isValid = !1);
      }
      switch (n[5].length) {
        case 2:
          0 === o
            ? (a = " +0000")
            : (a =
                ((o =
                  "YXWVUTSRQPONZABCDEFGHIKLM".indexOf(n[5][1].toUpperCase()) -
                  12) < 0
                  ? " -"
                  : " +") +
                ("" + o).replace(/^-?/, "0").match(/..$/)[0] +
                "00");
          break;
        case 4:
          a = u[n[5]];
          break;
        default:
          a = u[" GMT"];
      }
      (n[5] = a),
        (e._i = n.splice(1).join("")),
        " ZZ",
        (e._f = s + i + r + " ZZ"),
        pe(e),
        (d(e).rfc2822 = !0);
    } else e._isValid = !1;
  }
  function _e(e, t, n) {
    return null != e ? e : null != t ? t : n;
  }
  function ye(t) {
    var n = new Date(e.now());
    return t._useUTC
      ? [n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()]
      : [n.getFullYear(), n.getMonth(), n.getDate()];
  }
  function ge(e) {
    var t,
      n,
      s,
      i,
      r = [];
    if (!e._d) {
      for (
        s = ye(e),
          e._w &&
            null == e._a[Ct] &&
            null == e._a[Rt] &&
            (function (e) {
              var t, n, s, i, r, a, o, u;
              if (null != (t = e._w).GG || null != t.W || null != t.E)
                (r = 1),
                  (a = 4),
                  (n = _e(t.GG, e._a[Wt], ee(Se(), 1, 4).year)),
                  (s = _e(t.W, 1)),
                  ((i = _e(t.E, 1)) < 1 || i > 7) && (u = !0);
              else {
                (r = e._locale._week.dow), (a = e._locale._week.doy);
                var l = ee(Se(), r, a);
                (n = _e(t.gg, e._a[Wt], l.year)),
                  (s = _e(t.w, l.week)),
                  null != t.d
                    ? ((i = t.d) < 0 || i > 6) && (u = !0)
                    : null != t.e
                    ? ((i = t.e + r), (t.e < 0 || t.e > 6) && (u = !0))
                    : (i = r);
              }
              s < 1 || s > te(n, r, a)
                ? (d(e)._overflowWeeks = !0)
                : null != u
                ? (d(e)._overflowWeekday = !0)
                : ((o = K(n, s, i, r, a)),
                  (e._a[Wt] = o.year),
                  (e._dayOfYear = o.dayOfYear));
            })(e),
          null != e._dayOfYear &&
            ((i = _e(e._a[Wt], s[Wt])),
            (e._dayOfYear > q(i) || 0 === e._dayOfYear) &&
              (d(e)._overflowDayOfYear = !0),
            (n = Q(i, 0, e._dayOfYear)),
            (e._a[Rt] = n.getUTCMonth()),
            (e._a[Ct] = n.getUTCDate())),
          t = 0;
        t < 3 && null == e._a[t];
        ++t
      )
        e._a[t] = r[t] = s[t];
      for (; t < 7; t++)
        e._a[t] = r[t] = null == e._a[t] ? (2 === t ? 1 : 0) : e._a[t];
      24 === e._a[Ft] &&
        0 === e._a[Ut] &&
        0 === e._a[Ht] &&
        0 === e._a[Lt] &&
        ((e._nextDay = !0), (e._a[Ft] = 0)),
        (e._d = (e._useUTC ? Q : B).apply(null, r)),
        null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
        e._nextDay && (e._a[Ft] = 24);
    }
  }
  function pe(t) {
    if (t._f !== e.ISO_8601)
      if (t._f !== e.RFC_2822) {
        (t._a = []), (d(t).empty = !0);
        var n,
          s,
          i,
          r,
          a,
          o = "" + t._i,
          u = o.length,
          l = 0;
        for (i = H(t._f, t._locale).match(lt) || [], n = 0; n < i.length; n++)
          (r = i[n]),
            (s = (o.match(G(r, t)) || [])[0]) &&
              ((a = o.substr(0, o.indexOf(s))).length > 0 &&
                d(t).unusedInput.push(a),
              (o = o.slice(o.indexOf(s) + s.length)),
              (l += s.length)),
            ct[r]
              ? (s ? (d(t).empty = !1) : d(t).unusedTokens.push(r), A(r, s, t))
              : t._strict && !s && d(t).unusedTokens.push(r);
        (d(t).charsLeftOver = u - l),
          o.length > 0 && d(t).unusedInput.push(o),
          t._a[Ft] <= 12 &&
            !0 === d(t).bigHour &&
            t._a[Ft] > 0 &&
            (d(t).bigHour = void 0),
          (d(t).parsedDateParts = t._a.slice(0)),
          (d(t).meridiem = t._meridiem),
          (t._a[Ft] = (function (e, t, n) {
            var s;
            return null == n
              ? t
              : null != e.meridiemHour
              ? e.meridiemHour(t, n)
              : null != e.isPM
              ? ((s = e.isPM(n)) && t < 12 && (t += 12),
                s || 12 !== t || (t = 0),
                t)
              : t;
          })(t._locale, t._a[Ft], t._meridiem)),
          ge(t),
          ce(t);
      } else me(t);
    else fe(t);
  }
  function we(e) {
    var n = e._i,
      s = e._f;
    return (
      (e._locale = e._locale || he(e._l)),
      null === n || (void 0 === s && "" === n)
        ? c({ nullInput: !0 })
        : ("string" == typeof n && (e._i = n = e._locale.preparse(n)),
          _(n)
            ? new m(ce(n))
            : (r(n)
                ? (e._d = n)
                : t(s)
                ? (function (e) {
                    var t, n, s, i, r;
                    if (0 === e._f.length)
                      return (
                        (d(e).invalidFormat = !0), void (e._d = new Date(NaN))
                      );
                    for (i = 0; i < e._f.length; i++)
                      (r = 0),
                        (t = f({}, e)),
                        null != e._useUTC && (t._useUTC = e._useUTC),
                        (t._f = e._f[i]),
                        pe(t),
                        h(t) &&
                          ((r += d(t).charsLeftOver),
                          (r += 10 * d(t).unusedTokens.length),
                          (d(t).score = r),
                          (null == s || r < s) && ((s = r), (n = t)));
                    u(e, n || t);
                  })(e)
                : s
                ? pe(e)
                : ve(e),
              h(e) || (e._d = null),
              e))
    );
  }
  function ve(o) {
    var u = o._i;
    s(u)
      ? (o._d = new Date(e.now()))
      : r(u)
      ? (o._d = new Date(u.valueOf()))
      : "string" == typeof u
      ? (function (t) {
          var n = dn.exec(t._i);
          null !== n
            ? (t._d = new Date(+n[1]))
            : (fe(t),
              !1 === t._isValid &&
                (delete t._isValid,
                me(t),
                !1 === t._isValid &&
                  (delete t._isValid, e.createFromInputFallback(t))));
        })(o)
      : t(u)
      ? ((o._a = a(u.slice(0), function (e) {
          return parseInt(e, 10);
        })),
        ge(o))
      : n(u)
      ? (function (e) {
          if (!e._d) {
            var t = x(e._i);
            (e._a = a(
              [
                t.year,
                t.month,
                t.day || t.date,
                t.hour,
                t.minute,
                t.second,
                t.millisecond,
              ],
              function (e) {
                return e && parseInt(e, 10);
              }
            )),
              ge(e);
          }
        })(o)
      : i(u)
      ? (o._d = new Date(u))
      : e.createFromInputFallback(o);
  }
  function Me(e, s, i, r, a) {
    var o = {};
    return (
      (!0 !== i && !1 !== i) || ((r = i), (i = void 0)),
      ((n(e) &&
        (function (e) {
          var t;
          for (t in e) return !1;
          return !0;
        })(e)) ||
        (t(e) && 0 === e.length)) &&
        (e = void 0),
      (o._isAMomentObject = !0),
      (o._useUTC = o._isUTC = a),
      (o._l = i),
      (o._i = e),
      (o._f = s),
      (o._strict = r),
      (function (e) {
        var t = new m(ce(we(e)));
        return t._nextDay && (t.add(1, "d"), (t._nextDay = void 0)), t;
      })(o)
    );
  }
  function Se(e, t, n, s) {
    return Me(e, t, n, s, !1);
  }
  function ke(e, n) {
    var s, i;
    if ((1 === n.length && t(n[0]) && (n = n[0]), !n.length)) return Se();
    for (s = n[0], i = 1; i < n.length; ++i)
      (n[i].isValid() && !n[i][e](s)) || (s = n[i]);
    return s;
  }
  function De(e) {
    var t = x(e),
      n = t.year || 0,
      s = t.quarter || 0,
      i = t.month || 0,
      r = t.week || 0,
      a = t.day || 0,
      o = t.hour || 0,
      u = t.minute || 0,
      l = t.second || 0,
      d = t.millisecond || 0;
    (this._isValid = (function (e) {
      for (var t in e)
        if (-1 === mn.indexOf(t) || (null != e[t] && isNaN(e[t]))) return !1;
      for (var n = !1, s = 0; s < mn.length; ++s)
        if (e[mn[s]]) {
          if (n) return !1;
          parseFloat(e[mn[s]]) !== g(e[mn[s]]) && (n = !0);
        }
      return !0;
    })(t)),
      (this._milliseconds = +d + 1e3 * l + 6e4 * u + 1e3 * o * 60 * 60),
      (this._days = +a + 7 * r),
      (this._months = +i + 3 * s + 12 * n),
      (this._data = {}),
      (this._locale = he()),
      this._bubble();
  }
  function Ye(e) {
    return e instanceof De;
  }
  function Oe(e) {
    return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e);
  }
  function xe(e, t) {
    C(e, 0, 0, function () {
      var e = this.utcOffset(),
        n = "+";
      return (
        e < 0 && ((e = -e), (n = "-")),
        n + R(~~(e / 60), 2) + t + R(~~e % 60, 2)
      );
    });
  }
  function Te(e, t) {
    var n = (t || "").match(e);
    if (null === n) return null;
    var s = ((n[n.length - 1] || []) + "").match(_n) || ["-", 0, 0],
      i = 60 * s[1] + g(s[2]);
    return 0 === i ? 0 : "+" === s[0] ? i : -i;
  }
  function be(t, n) {
    var s, i;
    return n._isUTC
      ? ((s = n.clone()),
        (i = (_(t) || r(t) ? t.valueOf() : Se(t).valueOf()) - s.valueOf()),
        s._d.setTime(s._d.valueOf() + i),
        e.updateOffset(s, !1),
        s)
      : Se(t).local();
  }
  function Pe(e) {
    return 15 * -Math.round(e._d.getTimezoneOffset() / 15);
  }
  function We() {
    return !!this.isValid() && this._isUTC && 0 === this._offset;
  }
  function Re(e, t) {
    var n,
      s,
      r,
      a = e,
      u = null;
    return (
      Ye(e)
        ? (a = { ms: e._milliseconds, d: e._days, M: e._months })
        : i(e)
        ? ((a = {}), t ? (a[t] = e) : (a.milliseconds = e))
        : (u = yn.exec(e))
        ? ((n = "-" === u[1] ? -1 : 1),
          (a = {
            y: 0,
            d: g(u[Ct]) * n,
            h: g(u[Ft]) * n,
            m: g(u[Ut]) * n,
            s: g(u[Ht]) * n,
            ms: g(Oe(1e3 * u[Lt])) * n,
          }))
        : (u = gn.exec(e))
        ? ((n = "-" === u[1] ? -1 : 1),
          (a = {
            y: Ce(u[2], n),
            M: Ce(u[3], n),
            w: Ce(u[4], n),
            d: Ce(u[5], n),
            h: Ce(u[6], n),
            m: Ce(u[7], n),
            s: Ce(u[8], n),
          }))
        : null == a
        ? (a = {})
        : "object" == typeof a &&
          ("from" in a || "to" in a) &&
          ((r = (function (e, t) {
            var n;
            return e.isValid() && t.isValid()
              ? ((t = be(t, e)),
                e.isBefore(t)
                  ? (n = Fe(e, t))
                  : (((n = Fe(t, e)).milliseconds = -n.milliseconds),
                    (n.months = -n.months)),
                n)
              : { milliseconds: 0, months: 0 };
          })(Se(a.from), Se(a.to))),
          ((a = {}).ms = r.milliseconds),
          (a.M = r.months)),
      (s = new De(a)),
      Ye(e) && o(e, "_locale") && (s._locale = e._locale),
      s
    );
  }
  function Ce(e, t) {
    var n = e && parseFloat(e.replace(",", "."));
    return (isNaN(n) ? 0 : n) * t;
  }
  function Fe(e, t) {
    var n = { milliseconds: 0, months: 0 };
    return (
      (n.months = t.month() - e.month() + 12 * (t.year() - e.year())),
      e.clone().add(n.months, "M").isAfter(t) && --n.months,
      (n.milliseconds = +t - +e.clone().add(n.months, "M")),
      n
    );
  }
  function Ue(e, t) {
    return function (n, s) {
      var i;
      return (
        null === s ||
          isNaN(+s) ||
          (M(
            t,
            "moment()." +
              t +
              "(period, number) is deprecated. Please use moment()." +
              t +
              "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
          ),
          (i = n),
          (n = s),
          (s = i)),
        He(this, Re((n = "string" == typeof n ? +n : n), s), e),
        this
      );
    };
  }
  function He(t, n, s, i) {
    var r = n._milliseconds,
      a = Oe(n._days),
      o = Oe(n._months);
    t.isValid() &&
      ((i = null == i || i),
      r && t._d.setTime(t._d.valueOf() + r * s),
      a && W(t, "Date", P(t, "Date") + a * s),
      o && Z(t, P(t, "Month") + o * s),
      i && e.updateOffset(t, a || o));
  }
  function Le(e) {
    var t;
    return void 0 === e
      ? this._locale._abbr
      : (null != (t = he(e)) && (this._locale = t), this);
  }
  function Ge() {
    return this._locale;
  }
  function Ve(e, t) {
    C(0, [e, e.length], 0, t);
  }
  function Ne(e, t, n, s, i) {
    var r;
    return null == e
      ? ee(this, s, i).year
      : (t > (r = te(e, s, i)) && (t = r), je.call(this, e, t, n, s, i));
  }
  function je(e, t, n, s, i) {
    var r = K(e, t, n, s, i),
      a = Q(r.year, 0, r.dayOfYear);
    return (
      this.year(a.getUTCFullYear()),
      this.month(a.getUTCMonth()),
      this.date(a.getUTCDate()),
      this
    );
  }
  function Ae(e, t) {
    t[Lt] = g(1e3 * ("0." + e));
  }
  function Ee(e) {
    return e;
  }
  function Ie(e, t, n, s) {
    var i = he(),
      r = l().set(s, t);
    return i[n](r, e);
  }
  function Ze(e, t, n) {
    if ((i(e) && ((t = e), (e = void 0)), (e = e || ""), null != t))
      return Ie(e, t, n, "month");
    var s,
      r = [];
    for (s = 0; s < 12; s++) r[s] = Ie(e, s, n, "month");
    return r;
  }
  function ze(e, t, n, s) {
    "boolean" == typeof e
      ? (i(t) && ((n = t), (t = void 0)), (t = t || ""))
      : ((n = t = e), (e = !1), i(t) && ((n = t), (t = void 0)), (t = t || ""));
    var r = he(),
      a = e ? r._week.dow : 0;
    if (null != n) return Ie(t, (n + a) % 7, s, "day");
    var o,
      u = [];
    for (o = 0; o < 7; o++) u[o] = Ie(t, (o + a) % 7, s, "day");
    return u;
  }
  function $e(e, t, n, s) {
    var i = Re(t, n);
    return (
      (e._milliseconds += s * i._milliseconds),
      (e._days += s * i._days),
      (e._months += s * i._months),
      e._bubble()
    );
  }
  function qe(e) {
    return e < 0 ? Math.floor(e) : Math.ceil(e);
  }
  function Je(e) {
    return (4800 * e) / 146097;
  }
  function Be(e) {
    return (146097 * e) / 4800;
  }
  function Qe(e) {
    return function () {
      return this.as(e);
    };
  }
  function Xe(e) {
    return function () {
      return this.isValid() ? this._data[e] : NaN;
    };
  }
  function Ke(e, t, n, s, i) {
    return i.relativeTime(t || 1, !!n, e, s);
  }
  function et() {
    if (!this.isValid()) return this.localeData().invalidDate();
    var e,
      t,
      n = zn(this._milliseconds) / 1e3,
      s = zn(this._days),
      i = zn(this._months);
    (e = y(n / 60)), (t = y(e / 60)), (n %= 60), (e %= 60);
    var r = y(i / 12),
      a = (i %= 12),
      o = s,
      u = t,
      l = e,
      d = n,
      h = this.asSeconds();
    return h
      ? (h < 0 ? "-" : "") +
          "P" +
          (r ? r + "Y" : "") +
          (a ? a + "M" : "") +
          (o ? o + "D" : "") +
          (u || l || d ? "T" : "") +
          (u ? u + "H" : "") +
          (l ? l + "M" : "") +
          (d ? d + "S" : "")
      : "P0D";
  }
  var tt,
    nt = Array.prototype.some
      ? Array.prototype.some
      : function (e) {
          for (var t = Object(this), n = t.length >>> 0, s = 0; s < n; s++)
            if (s in t && e.call(this, t[s], s, t)) return !0;
          return !1;
        },
    st = (e.momentProperties = []),
    it = !1,
    rt = {};
  (e.suppressDeprecationWarnings = !1), (e.deprecationHandler = null);
  var at = Object.keys
      ? Object.keys
      : function (e) {
          var t,
            n = [];
          for (t in e) o(e, t) && n.push(t);
          return n;
        },
    ot = {},
    ut = {},
    lt =
      /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
    dt = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
    ht = {},
    ct = {},
    ft = /\d/,
    mt = /\d\d/,
    _t = /\d{3}/,
    yt = /\d{4}/,
    gt = /[+-]?\d{6}/,
    pt = /\d\d?/,
    wt = /\d\d\d\d?/,
    vt = /\d\d\d\d\d\d?/,
    Mt = /\d{1,3}/,
    St = /\d{1,4}/,
    kt = /[+-]?\d{1,6}/,
    Dt = /\d+/,
    Yt = /[+-]?\d+/,
    Ot = /Z|[+-]\d\d:?\d\d/gi,
    xt = /Z|[+-]\d\d(?::?\d\d)?/gi,
    Tt =
      /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
    bt = {},
    Pt = {},
    Wt = 0,
    Rt = 1,
    Ct = 2,
    Ft = 3,
    Ut = 4,
    Ht = 5,
    Lt = 6,
    Gt = 7,
    Vt = 8,
    Nt = Array.prototype.indexOf
      ? Array.prototype.indexOf
      : function (e) {
          var t;
          for (t = 0; t < this.length; ++t) if (this[t] === e) return t;
          return -1;
        };
  C("M", ["MM", 2], "Mo", function () {
    return this.month() + 1;
  }),
    C("MMM", 0, 0, function (e) {
      return this.localeData().monthsShort(this, e);
    }),
    C("MMMM", 0, 0, function (e) {
      return this.localeData().months(this, e);
    }),
    Y("month", "M"),
    T("month", 8),
    L("M", pt),
    L("MM", pt, mt),
    L("MMM", function (e, t) {
      return t.monthsShortRegex(e);
    }),
    L("MMMM", function (e, t) {
      return t.monthsRegex(e);
    }),
    N(["M", "MM"], function (e, t) {
      t[Rt] = g(e) - 1;
    }),
    N(["MMM", "MMMM"], function (e, t, n, s) {
      var i = n._locale.monthsParse(e, s, n._strict);
      null != i ? (t[Rt] = i) : (d(n).invalidMonth = e);
    });
  var jt = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
    At =
      "January_February_March_April_May_June_July_August_September_October_November_December".split(
        "_"
      ),
    Et = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    It = Tt,
    Zt = Tt;
  C("Y", 0, 0, function () {
    var e = this.year();
    return e <= 9999 ? "" + e : "+" + e;
  }),
    C(0, ["YY", 2], 0, function () {
      return this.year() % 100;
    }),
    C(0, ["YYYY", 4], 0, "year"),
    C(0, ["YYYYY", 5], 0, "year"),
    C(0, ["YYYYYY", 6, !0], 0, "year"),
    Y("year", "y"),
    T("year", 1),
    L("Y", Yt),
    L("YY", pt, mt),
    L("YYYY", St, yt),
    L("YYYYY", kt, gt),
    L("YYYYYY", kt, gt),
    N(["YYYYY", "YYYYYY"], Wt),
    N("YYYY", function (t, n) {
      n[Wt] = 2 === t.length ? e.parseTwoDigitYear(t) : g(t);
    }),
    N("YY", function (t, n) {
      n[Wt] = e.parseTwoDigitYear(t);
    }),
    N("Y", function (e, t) {
      t[Wt] = parseInt(e, 10);
    }),
    (e.parseTwoDigitYear = function (e) {
      return g(e) + (g(e) > 68 ? 1900 : 2e3);
    });
  var zt = b("FullYear", !0);
  C("w", ["ww", 2], "wo", "week"),
    C("W", ["WW", 2], "Wo", "isoWeek"),
    Y("week", "w"),
    Y("isoWeek", "W"),
    T("week", 5),
    T("isoWeek", 5),
    L("w", pt),
    L("ww", pt, mt),
    L("W", pt),
    L("WW", pt, mt),
    j(["w", "ww", "W", "WW"], function (e, t, n, s) {
      t[s.substr(0, 1)] = g(e);
    });
  C("d", 0, "do", "day"),
    C("dd", 0, 0, function (e) {
      return this.localeData().weekdaysMin(this, e);
    }),
    C("ddd", 0, 0, function (e) {
      return this.localeData().weekdaysShort(this, e);
    }),
    C("dddd", 0, 0, function (e) {
      return this.localeData().weekdays(this, e);
    }),
    C("e", 0, 0, "weekday"),
    C("E", 0, 0, "isoWeekday"),
    Y("day", "d"),
    Y("weekday", "e"),
    Y("isoWeekday", "E"),
    T("day", 11),
    T("weekday", 11),
    T("isoWeekday", 11),
    L("d", pt),
    L("e", pt),
    L("E", pt),
    L("dd", function (e, t) {
      return t.weekdaysMinRegex(e);
    }),
    L("ddd", function (e, t) {
      return t.weekdaysShortRegex(e);
    }),
    L("dddd", function (e, t) {
      return t.weekdaysRegex(e);
    }),
    j(["dd", "ddd", "dddd"], function (e, t, n, s) {
      var i = n._locale.weekdaysParse(e, s, n._strict);
      null != i ? (t.d = i) : (d(n).invalidWeekday = e);
    }),
    j(["d", "e", "E"], function (e, t, n, s) {
      t[s] = g(e);
    });
  var $t = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
      "_"
    ),
    qt = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    Jt = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    Bt = Tt,
    Qt = Tt,
    Xt = Tt;
  C("H", ["HH", 2], 0, "hour"),
    C("h", ["hh", 2], 0, ie),
    C("k", ["kk", 2], 0, function () {
      return this.hours() || 24;
    }),
    C("hmm", 0, 0, function () {
      return "" + ie.apply(this) + R(this.minutes(), 2);
    }),
    C("hmmss", 0, 0, function () {
      return "" + ie.apply(this) + R(this.minutes(), 2) + R(this.seconds(), 2);
    }),
    C("Hmm", 0, 0, function () {
      return "" + this.hours() + R(this.minutes(), 2);
    }),
    C("Hmmss", 0, 0, function () {
      return "" + this.hours() + R(this.minutes(), 2) + R(this.seconds(), 2);
    }),
    re("a", !0),
    re("A", !1),
    Y("hour", "h"),
    T("hour", 13),
    L("a", ae),
    L("A", ae),
    L("H", pt),
    L("h", pt),
    L("k", pt),
    L("HH", pt, mt),
    L("hh", pt, mt),
    L("kk", pt, mt),
    L("hmm", wt),
    L("hmmss", vt),
    L("Hmm", wt),
    L("Hmmss", vt),
    N(["H", "HH"], Ft),
    N(["k", "kk"], function (e, t, n) {
      var s = g(e);
      t[Ft] = 24 === s ? 0 : s;
    }),
    N(["a", "A"], function (e, t, n) {
      (n._isPm = n._locale.isPM(e)), (n._meridiem = e);
    }),
    N(["h", "hh"], function (e, t, n) {
      (t[Ft] = g(e)), (d(n).bigHour = !0);
    }),
    N("hmm", function (e, t, n) {
      var s = e.length - 2;
      (t[Ft] = g(e.substr(0, s))),
        (t[Ut] = g(e.substr(s))),
        (d(n).bigHour = !0);
    }),
    N("hmmss", function (e, t, n) {
      var s = e.length - 4,
        i = e.length - 2;
      (t[Ft] = g(e.substr(0, s))),
        (t[Ut] = g(e.substr(s, 2))),
        (t[Ht] = g(e.substr(i))),
        (d(n).bigHour = !0);
    }),
    N("Hmm", function (e, t, n) {
      var s = e.length - 2;
      (t[Ft] = g(e.substr(0, s))), (t[Ut] = g(e.substr(s)));
    }),
    N("Hmmss", function (e, t, n) {
      var s = e.length - 4,
        i = e.length - 2;
      (t[Ft] = g(e.substr(0, s))),
        (t[Ut] = g(e.substr(s, 2))),
        (t[Ht] = g(e.substr(i)));
    });
  var Kt,
    en = b("Hours", !0),
    tn = {
      calendar: {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L",
      },
      longDateFormat: {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A",
      },
      invalidDate: "Invalid date",
      ordinal: "%d",
      dayOfMonthOrdinalParse: /\d{1,2}/,
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        ss: "%d seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years",
      },
      months: At,
      monthsShort: Et,
      week: { dow: 0, doy: 6 },
      weekdays: $t,
      weekdaysMin: Jt,
      weekdaysShort: qt,
      meridiemParse: /[ap]\.?m?\.?/i,
    },
    nn = {},
    sn = {},
    rn =
      /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    an =
      /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    on = /Z|[+-]\d\d(?::?\d\d)?/,
    un = [
      ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
      ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
      ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
      ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
      ["YYYY-DDD", /\d{4}-\d{3}/],
      ["YYYY-MM", /\d{4}-\d\d/, !1],
      ["YYYYYYMMDD", /[+-]\d{10}/],
      ["YYYYMMDD", /\d{8}/],
      ["GGGG[W]WWE", /\d{4}W\d{3}/],
      ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
      ["YYYYDDD", /\d{7}/],
    ],
    ln = [
      ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
      ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
      ["HH:mm:ss", /\d\d:\d\d:\d\d/],
      ["HH:mm", /\d\d:\d\d/],
      ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
      ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
      ["HHmmss", /\d\d\d\d\d\d/],
      ["HHmm", /\d\d\d\d/],
      ["HH", /\d\d/],
    ],
    dn = /^\/?Date\((\-?\d+)/i,
    hn =
      /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;
  (e.createFromInputFallback = v(
    "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
    function (e) {
      e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
    }
  )),
    (e.ISO_8601 = function () {}),
    (e.RFC_2822 = function () {});
  var cn = v(
      "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
      function () {
        var e = Se.apply(null, arguments);
        return this.isValid() && e.isValid() ? (e < this ? this : e) : c();
      }
    ),
    fn = v(
      "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
      function () {
        var e = Se.apply(null, arguments);
        return this.isValid() && e.isValid() ? (e > this ? this : e) : c();
      }
    ),
    mn = [
      "year",
      "quarter",
      "month",
      "week",
      "day",
      "hour",
      "minute",
      "second",
      "millisecond",
    ];
  xe("Z", ":"),
    xe("ZZ", ""),
    L("Z", xt),
    L("ZZ", xt),
    N(["Z", "ZZ"], function (e, t, n) {
      (n._useUTC = !0), (n._tzm = Te(xt, e));
    });
  var _n = /([\+\-]|\d\d)/gi;
  e.updateOffset = function () {};
  var yn = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
    gn =
      /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
  (Re.fn = De.prototype),
    (Re.invalid = function () {
      return Re(NaN);
    });
  var pn = Ue(1, "add"),
    wn = Ue(-1, "subtract");
  (e.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ"),
    (e.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]");
  var vn = v(
    "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
    function (e) {
      return void 0 === e ? this.localeData() : this.locale(e);
    }
  );
  C(0, ["gg", 2], 0, function () {
    return this.weekYear() % 100;
  }),
    C(0, ["GG", 2], 0, function () {
      return this.isoWeekYear() % 100;
    }),
    Ve("gggg", "weekYear"),
    Ve("ggggg", "weekYear"),
    Ve("GGGG", "isoWeekYear"),
    Ve("GGGGG", "isoWeekYear"),
    Y("weekYear", "gg"),
    Y("isoWeekYear", "GG"),
    T("weekYear", 1),
    T("isoWeekYear", 1),
    L("G", Yt),
    L("g", Yt),
    L("GG", pt, mt),
    L("gg", pt, mt),
    L("GGGG", St, yt),
    L("gggg", St, yt),
    L("GGGGG", kt, gt),
    L("ggggg", kt, gt),
    j(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, n, s) {
      t[s.substr(0, 2)] = g(e);
    }),
    j(["gg", "GG"], function (t, n, s, i) {
      n[i] = e.parseTwoDigitYear(t);
    }),
    C("Q", 0, "Qo", "quarter"),
    Y("quarter", "Q"),
    T("quarter", 7),
    L("Q", ft),
    N("Q", function (e, t) {
      t[Rt] = 3 * (g(e) - 1);
    }),
    C("D", ["DD", 2], "Do", "date"),
    Y("date", "D"),
    T("date", 9),
    L("D", pt),
    L("DD", pt, mt),
    L("Do", function (e, t) {
      return e
        ? t._dayOfMonthOrdinalParse || t._ordinalParse
        : t._dayOfMonthOrdinalParseLenient;
    }),
    N(["D", "DD"], Ct),
    N("Do", function (e, t) {
      t[Ct] = g(e.match(pt)[0]);
    });
  var Mn = b("Date", !0);
  C("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
    Y("dayOfYear", "DDD"),
    T("dayOfYear", 4),
    L("DDD", Mt),
    L("DDDD", _t),
    N(["DDD", "DDDD"], function (e, t, n) {
      n._dayOfYear = g(e);
    }),
    C("m", ["mm", 2], 0, "minute"),
    Y("minute", "m"),
    T("minute", 14),
    L("m", pt),
    L("mm", pt, mt),
    N(["m", "mm"], Ut);
  var Sn = b("Minutes", !1);
  C("s", ["ss", 2], 0, "second"),
    Y("second", "s"),
    T("second", 15),
    L("s", pt),
    L("ss", pt, mt),
    N(["s", "ss"], Ht);
  var kn,
    Dn = b("Seconds", !1);
  for (
    C("S", 0, 0, function () {
      return ~~(this.millisecond() / 100);
    }),
      C(0, ["SS", 2], 0, function () {
        return ~~(this.millisecond() / 10);
      }),
      C(0, ["SSS", 3], 0, "millisecond"),
      C(0, ["SSSS", 4], 0, function () {
        return 10 * this.millisecond();
      }),
      C(0, ["SSSSS", 5], 0, function () {
        return 100 * this.millisecond();
      }),
      C(0, ["SSSSSS", 6], 0, function () {
        return 1e3 * this.millisecond();
      }),
      C(0, ["SSSSSSS", 7], 0, function () {
        return 1e4 * this.millisecond();
      }),
      C(0, ["SSSSSSSS", 8], 0, function () {
        return 1e5 * this.millisecond();
      }),
      C(0, ["SSSSSSSSS", 9], 0, function () {
        return 1e6 * this.millisecond();
      }),
      Y("millisecond", "ms"),
      T("millisecond", 16),
      L("S", Mt, ft),
      L("SS", Mt, mt),
      L("SSS", Mt, _t),
      kn = "SSSS";
    kn.length <= 9;
    kn += "S"
  )
    L(kn, Dt);
  for (kn = "S"; kn.length <= 9; kn += "S") N(kn, Ae);
  var Yn = b("Milliseconds", !1);
  C("z", 0, 0, "zoneAbbr"), C("zz", 0, 0, "zoneName");
  var On = m.prototype;
  (On.add = pn),
    (On.calendar = function (t, n) {
      var s = t || Se(),
        i = be(s, this).startOf("day"),
        r = e.calendarFormat(this, i) || "sameElse",
        a = n && (S(n[r]) ? n[r].call(this, s) : n[r]);
      return this.format(a || this.localeData().calendar(r, this, Se(s)));
    }),
    (On.clone = function () {
      return new m(this);
    }),
    (On.diff = function (e, t, n) {
      var s, i, r, a;
      return this.isValid()
        ? (s = be(e, this)).isValid()
          ? ((i = 6e4 * (s.utcOffset() - this.utcOffset())),
            "year" === (t = O(t)) || "month" === t || "quarter" === t
              ? ((a = (function (e, t) {
                  var n,
                    s,
                    i = 12 * (t.year() - e.year()) + (t.month() - e.month()),
                    r = e.clone().add(i, "months");
                  return (
                    t - r < 0
                      ? ((n = e.clone().add(i - 1, "months")),
                        (s = (t - r) / (r - n)))
                      : ((n = e.clone().add(i + 1, "months")),
                        (s = (t - r) / (n - r))),
                    -(i + s) || 0
                  );
                })(this, s)),
                "quarter" === t ? (a /= 3) : "year" === t && (a /= 12))
              : ((r = this - s),
                (a =
                  "second" === t
                    ? r / 1e3
                    : "minute" === t
                    ? r / 6e4
                    : "hour" === t
                    ? r / 36e5
                    : "day" === t
                    ? (r - i) / 864e5
                    : "week" === t
                    ? (r - i) / 6048e5
                    : r)),
            n ? a : y(a))
          : NaN
        : NaN;
    }),
    (On.endOf = function (e) {
      return void 0 === (e = O(e)) || "millisecond" === e
        ? this
        : ("date" === e && (e = "day"),
          this.startOf(e)
            .add(1, "isoWeek" === e ? "week" : e)
            .subtract(1, "ms"));
    }),
    (On.format = function (t) {
      t || (t = this.isUtc() ? e.defaultFormatUtc : e.defaultFormat);
      var n = U(this, t);
      return this.localeData().postformat(n);
    }),
    (On.from = function (e, t) {
      return this.isValid() && ((_(e) && e.isValid()) || Se(e).isValid())
        ? Re({ to: this, from: e }).locale(this.locale()).humanize(!t)
        : this.localeData().invalidDate();
    }),
    (On.fromNow = function (e) {
      return this.from(Se(), e);
    }),
    (On.to = function (e, t) {
      return this.isValid() && ((_(e) && e.isValid()) || Se(e).isValid())
        ? Re({ from: this, to: e }).locale(this.locale()).humanize(!t)
        : this.localeData().invalidDate();
    }),
    (On.toNow = function (e) {
      return this.to(Se(), e);
    }),
    (On.get = function (e) {
      return S(this[(e = O(e))]) ? this[e]() : this;
    }),
    (On.invalidAt = function () {
      return d(this).overflow;
    }),
    (On.isAfter = function (e, t) {
      var n = _(e) ? e : Se(e);
      return (
        !(!this.isValid() || !n.isValid()) &&
        ("millisecond" === (t = O(s(t) ? "millisecond" : t))
          ? this.valueOf() > n.valueOf()
          : n.valueOf() < this.clone().startOf(t).valueOf())
      );
    }),
    (On.isBefore = function (e, t) {
      var n = _(e) ? e : Se(e);
      return (
        !(!this.isValid() || !n.isValid()) &&
        ("millisecond" === (t = O(s(t) ? "millisecond" : t))
          ? this.valueOf() < n.valueOf()
          : this.clone().endOf(t).valueOf() < n.valueOf())
      );
    }),
    (On.isBetween = function (e, t, n, s) {
      return (
        ("(" === (s = s || "()")[0]
          ? this.isAfter(e, n)
          : !this.isBefore(e, n)) &&
        (")" === s[1] ? this.isBefore(t, n) : !this.isAfter(t, n))
      );
    }),
    (On.isSame = function (e, t) {
      var n,
        s = _(e) ? e : Se(e);
      return (
        !(!this.isValid() || !s.isValid()) &&
        ("millisecond" === (t = O(t || "millisecond"))
          ? this.valueOf() === s.valueOf()
          : ((n = s.valueOf()),
            this.clone().startOf(t).valueOf() <= n &&
              n <= this.clone().endOf(t).valueOf()))
      );
    }),
    (On.isSameOrAfter = function (e, t) {
      return this.isSame(e, t) || this.isAfter(e, t);
    }),
    (On.isSameOrBefore = function (e, t) {
      return this.isSame(e, t) || this.isBefore(e, t);
    }),
    (On.isValid = function () {
      return h(this);
    }),
    (On.lang = vn),
    (On.locale = Le),
    (On.localeData = Ge),
    (On.max = fn),
    (On.min = cn),
    (On.parsingFlags = function () {
      return u({}, d(this));
    }),
    (On.set = function (e, t) {
      if ("object" == typeof e)
        for (
          var n = (function (e) {
              var t = [];
              for (var n in e) t.push({ unit: n, priority: ut[n] });
              return (
                t.sort(function (e, t) {
                  return e.priority - t.priority;
                }),
                t
              );
            })((e = x(e))),
            s = 0;
          s < n.length;
          s++
        )
          this[n[s].unit](e[n[s].unit]);
      else if (S(this[(e = O(e))])) return this[e](t);
      return this;
    }),
    (On.startOf = function (e) {
      switch ((e = O(e))) {
        case "year":
          this.month(0);
        case "quarter":
        case "month":
          this.date(1);
        case "week":
        case "isoWeek":
        case "day":
        case "date":
          this.hours(0);
        case "hour":
          this.minutes(0);
        case "minute":
          this.seconds(0);
        case "second":
          this.milliseconds(0);
      }
      return (
        "week" === e && this.weekday(0),
        "isoWeek" === e && this.isoWeekday(1),
        "quarter" === e && this.month(3 * Math.floor(this.month() / 3)),
        this
      );
    }),
    (On.subtract = wn),
    (On.toArray = function () {
      var e = this;
      return [
        e.year(),
        e.month(),
        e.date(),
        e.hour(),
        e.minute(),
        e.second(),
        e.millisecond(),
      ];
    }),
    (On.toObject = function () {
      var e = this;
      return {
        years: e.year(),
        months: e.month(),
        date: e.date(),
        hours: e.hours(),
        minutes: e.minutes(),
        seconds: e.seconds(),
        milliseconds: e.milliseconds(),
      };
    }),
    (On.toDate = function () {
      return new Date(this.valueOf());
    }),
    (On.toISOString = function () {
      if (!this.isValid()) return null;
      var e = this.clone().utc();
      return e.year() < 0 || e.year() > 9999
        ? U(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        : S(Date.prototype.toISOString)
        ? this.toDate().toISOString()
        : U(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
    }),
    (On.inspect = function () {
      if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
      var e = "moment",
        t = "";
      this.isLocal() ||
        ((e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone"),
        (t = "Z"));
      var n = "[" + e + '("]',
        s = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
        i = t + '[")]';
      return this.format(n + s + "-MM-DD[T]HH:mm:ss.SSS" + i);
    }),
    (On.toJSON = function () {
      return this.isValid() ? this.toISOString() : null;
    }),
    (On.toString = function () {
      return this.clone()
        .locale("en")
        .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    }),
    (On.unix = function () {
      return Math.floor(this.valueOf() / 1e3);
    }),
    (On.valueOf = function () {
      return this._d.valueOf() - 6e4 * (this._offset || 0);
    }),
    (On.creationData = function () {
      return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict,
      };
    }),
    (On.year = zt),
    (On.isLeapYear = function () {
      return J(this.year());
    }),
    (On.weekYear = function (e) {
      return Ne.call(
        this,
        e,
        this.week(),
        this.weekday(),
        this.localeData()._week.dow,
        this.localeData()._week.doy
      );
    }),
    (On.isoWeekYear = function (e) {
      return Ne.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
    }),
    (On.quarter = On.quarters =
      function (e) {
        return null == e
          ? Math.ceil((this.month() + 1) / 3)
          : this.month(3 * (e - 1) + (this.month() % 3));
      }),
    (On.month = z),
    (On.daysInMonth = function () {
      return E(this.year(), this.month());
    }),
    (On.week = On.weeks =
      function (e) {
        var t = this.localeData().week(this);
        return null == e ? t : this.add(7 * (e - t), "d");
      }),
    (On.isoWeek = On.isoWeeks =
      function (e) {
        var t = ee(this, 1, 4).week;
        return null == e ? t : this.add(7 * (e - t), "d");
      }),
    (On.weeksInYear = function () {
      var e = this.localeData()._week;
      return te(this.year(), e.dow, e.doy);
    }),
    (On.isoWeeksInYear = function () {
      return te(this.year(), 1, 4);
    }),
    (On.date = Mn),
    (On.day = On.days =
      function (e) {
        if (!this.isValid()) return null != e ? this : NaN;
        var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != e
          ? ((e = (function (e, t) {
              return "string" != typeof e
                ? e
                : isNaN(e)
                ? "number" == typeof (e = t.weekdaysParse(e))
                  ? e
                  : null
                : parseInt(e, 10);
            })(e, this.localeData())),
            this.add(e - t, "d"))
          : t;
      }),
    (On.weekday = function (e) {
      if (!this.isValid()) return null != e ? this : NaN;
      var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
      return null == e ? t : this.add(e - t, "d");
    }),
    (On.isoWeekday = function (e) {
      if (!this.isValid()) return null != e ? this : NaN;
      if (null != e) {
        var t = (function (e, t) {
          return "string" == typeof e
            ? t.weekdaysParse(e) % 7 || 7
            : isNaN(e)
            ? null
            : e;
        })(e, this.localeData());
        return this.day(this.day() % 7 ? t : t - 7);
      }
      return this.day() || 7;
    }),
    (On.dayOfYear = function (e) {
      var t =
        Math.round(
          (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
        ) + 1;
      return null == e ? t : this.add(e - t, "d");
    }),
    (On.hour = On.hours = en),
    (On.minute = On.minutes = Sn),
    (On.second = On.seconds = Dn),
    (On.millisecond = On.milliseconds = Yn),
    (On.utcOffset = function (t, n, s) {
      var i,
        r = this._offset || 0;
      if (!this.isValid()) return null != t ? this : NaN;
      if (null != t) {
        if ("string" == typeof t) {
          if (null === (t = Te(xt, t))) return this;
        } else Math.abs(t) < 16 && !s && (t *= 60);
        return (
          !this._isUTC && n && (i = Pe(this)),
          (this._offset = t),
          (this._isUTC = !0),
          null != i && this.add(i, "m"),
          r !== t &&
            (!n || this._changeInProgress
              ? He(this, Re(t - r, "m"), 1, !1)
              : this._changeInProgress ||
                ((this._changeInProgress = !0),
                e.updateOffset(this, !0),
                (this._changeInProgress = null))),
          this
        );
      }
      return this._isUTC ? r : Pe(this);
    }),
    (On.utc = function (e) {
      return this.utcOffset(0, e);
    }),
    (On.local = function (e) {
      return (
        this._isUTC &&
          (this.utcOffset(0, e),
          (this._isUTC = !1),
          e && this.subtract(Pe(this), "m")),
        this
      );
    }),
    (On.parseZone = function () {
      if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);
      else if ("string" == typeof this._i) {
        var e = Te(Ot, this._i);
        null != e ? this.utcOffset(e) : this.utcOffset(0, !0);
      }
      return this;
    }),
    (On.hasAlignedHourOffset = function (e) {
      return (
        !!this.isValid() &&
        ((e = e ? Se(e).utcOffset() : 0), (this.utcOffset() - e) % 60 == 0)
      );
    }),
    (On.isDST = function () {
      return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
      );
    }),
    (On.isLocal = function () {
      return !!this.isValid() && !this._isUTC;
    }),
    (On.isUtcOffset = function () {
      return !!this.isValid() && this._isUTC;
    }),
    (On.isUtc = We),
    (On.isUTC = We),
    (On.zoneAbbr = function () {
      return this._isUTC ? "UTC" : "";
    }),
    (On.zoneName = function () {
      return this._isUTC ? "Coordinated Universal Time" : "";
    }),
    (On.dates = v("dates accessor is deprecated. Use date instead.", Mn)),
    (On.months = v("months accessor is deprecated. Use month instead", z)),
    (On.years = v("years accessor is deprecated. Use year instead", zt)),
    (On.zone = v(
      "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
      function (e, t) {
        return null != e
          ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this)
          : -this.utcOffset();
      }
    )),
    (On.isDSTShifted = v(
      "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
      function () {
        if (!s(this._isDSTShifted)) return this._isDSTShifted;
        var e = {};
        if ((f(e, this), (e = we(e))._a)) {
          var t = e._isUTC ? l(e._a) : Se(e._a);
          this._isDSTShifted = this.isValid() && p(e._a, t.toArray()) > 0;
        } else this._isDSTShifted = !1;
        return this._isDSTShifted;
      }
    ));
  var xn = D.prototype;
  (xn.calendar = function (e, t, n) {
    var s = this._calendar[e] || this._calendar.sameElse;
    return S(s) ? s.call(t, n) : s;
  }),
    (xn.longDateFormat = function (e) {
      var t = this._longDateFormat[e],
        n = this._longDateFormat[e.toUpperCase()];
      return t || !n
        ? t
        : ((this._longDateFormat[e] = n.replace(
            /MMMM|MM|DD|dddd/g,
            function (e) {
              return e.slice(1);
            }
          )),
          this._longDateFormat[e]);
    }),
    (xn.invalidDate = function () {
      return this._invalidDate;
    }),
    (xn.ordinal = function (e) {
      return this._ordinal.replace("%d", e);
    }),
    (xn.preparse = Ee),
    (xn.postformat = Ee),
    (xn.relativeTime = function (e, t, n, s) {
      var i = this._relativeTime[n];
      return S(i) ? i(e, t, n, s) : i.replace(/%d/i, e);
    }),
    (xn.pastFuture = function (e, t) {
      var n = this._relativeTime[e > 0 ? "future" : "past"];
      return S(n) ? n(t) : n.replace(/%s/i, t);
    }),
    (xn.set = function (e) {
      var t, n;
      for (n in e) S((t = e[n])) ? (this[n] = t) : (this["_" + n] = t);
      (this._config = e),
        (this._dayOfMonthOrdinalParseLenient = new RegExp(
          (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            "|" +
            /\d{1,2}/.source
        ));
    }),
    (xn.months = function (e, n) {
      return e
        ? t(this._months)
          ? this._months[e.month()]
          : this._months[
              (this._months.isFormat || jt).test(n) ? "format" : "standalone"
            ][e.month()]
        : t(this._months)
        ? this._months
        : this._months.standalone;
    }),
    (xn.monthsShort = function (e, n) {
      return e
        ? t(this._monthsShort)
          ? this._monthsShort[e.month()]
          : this._monthsShort[jt.test(n) ? "format" : "standalone"][e.month()]
        : t(this._monthsShort)
        ? this._monthsShort
        : this._monthsShort.standalone;
    }),
    (xn.monthsParse = function (e, t, n) {
      var s, i, r;
      if (this._monthsParseExact) return I.call(this, e, t, n);
      for (
        this._monthsParse ||
          ((this._monthsParse = []),
          (this._longMonthsParse = []),
          (this._shortMonthsParse = [])),
          s = 0;
        s < 12;
        s++
      ) {
        if (
          ((i = l([2e3, s])),
          n &&
            !this._longMonthsParse[s] &&
            ((this._longMonthsParse[s] = new RegExp(
              "^" + this.months(i, "").replace(".", "") + "$",
              "i"
            )),
            (this._shortMonthsParse[s] = new RegExp(
              "^" + this.monthsShort(i, "").replace(".", "") + "$",
              "i"
            ))),
          n ||
            this._monthsParse[s] ||
            ((r = "^" + this.months(i, "") + "|^" + this.monthsShort(i, "")),
            (this._monthsParse[s] = new RegExp(r.replace(".", ""), "i"))),
          n && "MMMM" === t && this._longMonthsParse[s].test(e))
        )
          return s;
        if (n && "MMM" === t && this._shortMonthsParse[s].test(e)) return s;
        if (!n && this._monthsParse[s].test(e)) return s;
      }
    }),
    (xn.monthsRegex = function (e) {
      return this._monthsParseExact
        ? (o(this, "_monthsRegex") || $.call(this),
          e ? this._monthsStrictRegex : this._monthsRegex)
        : (o(this, "_monthsRegex") || (this._monthsRegex = Zt),
          this._monthsStrictRegex && e
            ? this._monthsStrictRegex
            : this._monthsRegex);
    }),
    (xn.monthsShortRegex = function (e) {
      return this._monthsParseExact
        ? (o(this, "_monthsRegex") || $.call(this),
          e ? this._monthsShortStrictRegex : this._monthsShortRegex)
        : (o(this, "_monthsShortRegex") || (this._monthsShortRegex = It),
          this._monthsShortStrictRegex && e
            ? this._monthsShortStrictRegex
            : this._monthsShortRegex);
    }),
    (xn.week = function (e) {
      return ee(e, this._week.dow, this._week.doy).week;
    }),
    (xn.firstDayOfYear = function () {
      return this._week.doy;
    }),
    (xn.firstDayOfWeek = function () {
      return this._week.dow;
    }),
    (xn.weekdays = function (e, n) {
      return e
        ? t(this._weekdays)
          ? this._weekdays[e.day()]
          : this._weekdays[
              this._weekdays.isFormat.test(n) ? "format" : "standalone"
            ][e.day()]
        : t(this._weekdays)
        ? this._weekdays
        : this._weekdays.standalone;
    }),
    (xn.weekdaysMin = function (e) {
      return e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
    }),
    (xn.weekdaysShort = function (e) {
      return e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
    }),
    (xn.weekdaysParse = function (e, t, n) {
      var s, i, r;
      if (this._weekdaysParseExact) return ne.call(this, e, t, n);
      for (
        this._weekdaysParse ||
          ((this._weekdaysParse = []),
          (this._minWeekdaysParse = []),
          (this._shortWeekdaysParse = []),
          (this._fullWeekdaysParse = [])),
          s = 0;
        s < 7;
        s++
      ) {
        if (
          ((i = l([2e3, 1]).day(s)),
          n &&
            !this._fullWeekdaysParse[s] &&
            ((this._fullWeekdaysParse[s] = new RegExp(
              "^" + this.weekdays(i, "").replace(".", ".?") + "$",
              "i"
            )),
            (this._shortWeekdaysParse[s] = new RegExp(
              "^" + this.weekdaysShort(i, "").replace(".", ".?") + "$",
              "i"
            )),
            (this._minWeekdaysParse[s] = new RegExp(
              "^" + this.weekdaysMin(i, "").replace(".", ".?") + "$",
              "i"
            ))),
          this._weekdaysParse[s] ||
            ((r =
              "^" +
              this.weekdays(i, "") +
              "|^" +
              this.weekdaysShort(i, "") +
              "|^" +
              this.weekdaysMin(i, "")),
            (this._weekdaysParse[s] = new RegExp(r.replace(".", ""), "i"))),
          n && "dddd" === t && this._fullWeekdaysParse[s].test(e))
        )
          return s;
        if (n && "ddd" === t && this._shortWeekdaysParse[s].test(e)) return s;
        if (n && "dd" === t && this._minWeekdaysParse[s].test(e)) return s;
        if (!n && this._weekdaysParse[s].test(e)) return s;
      }
    }),
    (xn.weekdaysRegex = function (e) {
      return this._weekdaysParseExact
        ? (o(this, "_weekdaysRegex") || se.call(this),
          e ? this._weekdaysStrictRegex : this._weekdaysRegex)
        : (o(this, "_weekdaysRegex") || (this._weekdaysRegex = Bt),
          this._weekdaysStrictRegex && e
            ? this._weekdaysStrictRegex
            : this._weekdaysRegex);
    }),
    (xn.weekdaysShortRegex = function (e) {
      return this._weekdaysParseExact
        ? (o(this, "_weekdaysRegex") || se.call(this),
          e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
        : (o(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Qt),
          this._weekdaysShortStrictRegex && e
            ? this._weekdaysShortStrictRegex
            : this._weekdaysShortRegex);
    }),
    (xn.weekdaysMinRegex = function (e) {
      return this._weekdaysParseExact
        ? (o(this, "_weekdaysRegex") || se.call(this),
          e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
        : (o(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Xt),
          this._weekdaysMinStrictRegex && e
            ? this._weekdaysMinStrictRegex
            : this._weekdaysMinRegex);
    }),
    (xn.isPM = function (e) {
      return "p" === (e + "").toLowerCase().charAt(0);
    }),
    (xn.meridiem = function (e, t, n) {
      return e > 11 ? (n ? "pm" : "PM") : n ? "am" : "AM";
    }),
    le("en", {
      dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
      ordinal: function (e) {
        var t = e % 10;
        return (
          e +
          (1 === g((e % 100) / 10)
            ? "th"
            : 1 === t
            ? "st"
            : 2 === t
            ? "nd"
            : 3 === t
            ? "rd"
            : "th")
        );
      },
    }),
    (e.lang = v("moment.lang is deprecated. Use moment.locale instead.", le)),
    (e.langData = v(
      "moment.langData is deprecated. Use moment.localeData instead.",
      he
    ));
  var Tn = Math.abs,
    bn = Qe("ms"),
    Pn = Qe("s"),
    Wn = Qe("m"),
    Rn = Qe("h"),
    Cn = Qe("d"),
    Fn = Qe("w"),
    Un = Qe("M"),
    Hn = Qe("y"),
    Ln = Xe("milliseconds"),
    Gn = Xe("seconds"),
    Vn = Xe("minutes"),
    Nn = Xe("hours"),
    jn = Xe("days"),
    An = Xe("months"),
    En = Xe("years"),
    In = Math.round,
    Zn = { ss: 44, s: 45, m: 45, h: 22, d: 26, M: 11 },
    zn = Math.abs,
    $n = De.prototype;
  return (
    ($n.isValid = function () {
      return this._isValid;
    }),
    ($n.abs = function () {
      var e = this._data;
      return (
        (this._milliseconds = Tn(this._milliseconds)),
        (this._days = Tn(this._days)),
        (this._months = Tn(this._months)),
        (e.milliseconds = Tn(e.milliseconds)),
        (e.seconds = Tn(e.seconds)),
        (e.minutes = Tn(e.minutes)),
        (e.hours = Tn(e.hours)),
        (e.months = Tn(e.months)),
        (e.years = Tn(e.years)),
        this
      );
    }),
    ($n.add = function (e, t) {
      return $e(this, e, t, 1);
    }),
    ($n.subtract = function (e, t) {
      return $e(this, e, t, -1);
    }),
    ($n.as = function (e) {
      if (!this.isValid()) return NaN;
      var t,
        n,
        s = this._milliseconds;
      if ("month" === (e = O(e)) || "year" === e)
        return (
          (t = this._days + s / 864e5),
          (n = this._months + Je(t)),
          "month" === e ? n : n / 12
        );
      switch (((t = this._days + Math.round(Be(this._months))), e)) {
        case "week":
          return t / 7 + s / 6048e5;
        case "day":
          return t + s / 864e5;
        case "hour":
          return 24 * t + s / 36e5;
        case "minute":
          return 1440 * t + s / 6e4;
        case "second":
          return 86400 * t + s / 1e3;
        case "millisecond":
          return Math.floor(864e5 * t) + s;
        default:
          throw new Error("Unknown unit " + e);
      }
    }),
    ($n.asMilliseconds = bn),
    ($n.asSeconds = Pn),
    ($n.asMinutes = Wn),
    ($n.asHours = Rn),
    ($n.asDays = Cn),
    ($n.asWeeks = Fn),
    ($n.asMonths = Un),
    ($n.asYears = Hn),
    ($n.valueOf = function () {
      return this.isValid()
        ? this._milliseconds +
            864e5 * this._days +
            (this._months % 12) * 2592e6 +
            31536e6 * g(this._months / 12)
        : NaN;
    }),
    ($n._bubble = function () {
      var e,
        t,
        n,
        s,
        i,
        r = this._milliseconds,
        a = this._days,
        o = this._months,
        u = this._data;
      return (
        (r >= 0 && a >= 0 && o >= 0) ||
          (r <= 0 && a <= 0 && o <= 0) ||
          ((r += 864e5 * qe(Be(o) + a)), (a = 0), (o = 0)),
        (u.milliseconds = r % 1e3),
        (e = y(r / 1e3)),
        (u.seconds = e % 60),
        (t = y(e / 60)),
        (u.minutes = t % 60),
        (n = y(t / 60)),
        (u.hours = n % 24),
        (a += y(n / 24)),
        (o += i = y(Je(a))),
        (a -= qe(Be(i))),
        (s = y(o / 12)),
        (o %= 12),
        (u.days = a),
        (u.months = o),
        (u.years = s),
        this
      );
    }),
    ($n.get = function (e) {
      return (e = O(e)), this.isValid() ? this[e + "s"]() : NaN;
    }),
    ($n.milliseconds = Ln),
    ($n.seconds = Gn),
    ($n.minutes = Vn),
    ($n.hours = Nn),
    ($n.days = jn),
    ($n.weeks = function () {
      return y(this.days() / 7);
    }),
    ($n.months = An),
    ($n.years = En),
    ($n.humanize = function (e) {
      if (!this.isValid()) return this.localeData().invalidDate();
      var t = this.localeData(),
        n = (function (e, t, n) {
          var s = Re(e).abs(),
            i = In(s.as("s")),
            r = In(s.as("m")),
            a = In(s.as("h")),
            o = In(s.as("d")),
            u = In(s.as("M")),
            l = In(s.as("y")),
            d = (i <= Zn.ss && ["s", i]) ||
              (i < Zn.s && ["ss", i]) ||
              (r <= 1 && ["m"]) ||
              (r < Zn.m && ["mm", r]) ||
              (a <= 1 && ["h"]) ||
              (a < Zn.h && ["hh", a]) ||
              (o <= 1 && ["d"]) ||
              (o < Zn.d && ["dd", o]) ||
              (u <= 1 && ["M"]) ||
              (u < Zn.M && ["MM", u]) ||
              (l <= 1 && ["y"]) || ["yy", l];
          return (d[2] = t), (d[3] = +e > 0), (d[4] = n), Ke.apply(null, d);
        })(this, !e, t);
      return e && (n = t.pastFuture(+this, n)), t.postformat(n);
    }),
    ($n.toISOString = et),
    ($n.toString = et),
    ($n.toJSON = et),
    ($n.locale = Le),
    ($n.localeData = Ge),
    ($n.toIsoString = v(
      "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
      et
    )),
    ($n.lang = vn),
    C("X", 0, 0, "unix"),
    C("x", 0, 0, "valueOf"),
    L("x", Yt),
    L("X", /[+-]?\d+(\.\d{1,3})?/),
    N("X", function (e, t, n) {
      n._d = new Date(1e3 * parseFloat(e, 10));
    }),
    N("x", function (e, t, n) {
      n._d = new Date(g(e));
    }),
    (e.version = "2.18.1"),
    (function (e) {
      tt = e;
    })(Se),
    (e.fn = On),
    (e.min = function () {
      var e = [].slice.call(arguments, 0);
      return ke("isBefore", e);
    }),
    (e.max = function () {
      var e = [].slice.call(arguments, 0);
      return ke("isAfter", e);
    }),
    (e.now = function () {
      return Date.now ? Date.now() : +new Date();
    }),
    (e.utc = l),
    (e.unix = function (e) {
      return Se(1e3 * e);
    }),
    (e.months = function (e, t) {
      return Ze(e, t, "months");
    }),
    (e.isDate = r),
    (e.locale = le),
    (e.invalid = c),
    (e.duration = Re),
    (e.isMoment = _),
    (e.weekdays = function (e, t, n) {
      return ze(e, t, n, "weekdays");
    }),
    (e.parseZone = function () {
      return Se.apply(null, arguments).parseZone();
    }),
    (e.localeData = he),
    (e.isDuration = Ye),
    (e.monthsShort = function (e, t) {
      return Ze(e, t, "monthsShort");
    }),
    (e.weekdaysMin = function (e, t, n) {
      return ze(e, t, n, "weekdaysMin");
    }),
    (e.defineLocale = de),
    (e.updateLocale = function (e, t) {
      if (null != t) {
        var n,
          s = tn;
        null != nn[e] && (s = nn[e]._config),
          ((n = new D((t = k(s, t)))).parentLocale = nn[e]),
          (nn[e] = n),
          le(e);
      } else
        null != nn[e] &&
          (null != nn[e].parentLocale
            ? (nn[e] = nn[e].parentLocale)
            : null != nn[e] && delete nn[e]);
      return nn[e];
    }),
    (e.locales = function () {
      return at(nn);
    }),
    (e.weekdaysShort = function (e, t, n) {
      return ze(e, t, n, "weekdaysShort");
    }),
    (e.normalizeUnits = O),
    (e.relativeTimeRounding = function (e) {
      return void 0 === e ? In : "function" == typeof e && ((In = e), !0);
    }),
    (e.relativeTimeThreshold = function (e, t) {
      return (
        void 0 !== Zn[e] &&
        (void 0 === t ? Zn[e] : ((Zn[e] = t), "s" === e && (Zn.ss = t - 1), !0))
      );
    }),
    (e.calendarFormat = function (e, t) {
      var n = e.diff(t, "days", !0);
      return n < -6
        ? "sameElse"
        : n < -1
        ? "lastWeek"
        : n < 0
        ? "lastDay"
        : n < 1
        ? "sameDay"
        : n < 2
        ? "nextDay"
        : n < 7
        ? "nextWeek"
        : "sameElse";
    }),
    (e.prototype = On),
    e
  );
});
!(function (t, e) {
  if ("function" == typeof define && define.amd)
    define(["moment", "jquery"], function (t, a) {
      return (
        a.fn || (a.fn = {}),
        "function" != typeof t &&
          t.hasOwnProperty("default") &&
          (t = t.default),
        e(t, a)
      );
    });
  else if ("object" == typeof module && module.exports) {
    var a = "undefined" != typeof window ? window.jQuery : void 0;
    a || (a = require("jquery")).fn || (a.fn = {});
    var i =
      "undefined" != typeof window && void 0 !== window.moment
        ? window.moment
        : require("moment");
    module.exports = e(i, a);
  } else t.daterangepicker = e(t.moment, t.jQuery);
})(this, function (t, e) {
  var a = function (a, i, s) {
    if (
      ((this.parentEl = "body"),
      (this.element = e(a)),
      (this.startDate = t().startOf("day")),
      (this.endDate = t().endOf("day")),
      (this.minDate = !1),
      (this.maxDate = !1),
      (this.maxSpan = !1),
      (this.autoApply = !1),
      (this.singleDatePicker = !1),
      (this.showDropdowns = !1),
      (this.minYear = t().subtract(100, "year").format("YYYY")),
      (this.maxYear = t().add(100, "year").format("YYYY")),
      (this.showWeekNumbers = !1),
      (this.showISOWeekNumbers = !1),
      (this.showCustomRangeLabel = !0),
      (this.timePicker = !1),
      (this.timePicker24Hour = !1),
      (this.timePickerIncrement = 1),
      (this.timePickerSeconds = !1),
      (this.linkedCalendars = !0),
      (this.autoUpdateInput = !0),
      (this.alwaysShowCalendars = !1),
      (this.ranges = {}),
      (this.opens = "right"),
      this.element.hasClass("pull-right") && (this.opens = "left"),
      (this.drops = "down"),
      this.element.hasClass("dropup") && (this.drops = "up"),
      (this.buttonClasses = "btn btn-sm"),
      (this.applyButtonClasses = "btn-primary"),
      (this.cancelButtonClasses = "btn-default"),
      (this.locale = {
        direction: "ltr",
        format: t.localeData().longDateFormat("L"),
        separator: " - ",
        applyLabel: "Apply",
        cancelLabel: "Cancel",
        weekLabel: "W",
        customRangeLabel: "Custom Range",
        daysOfWeek: t.weekdaysMin(),
        monthNames: t.monthsShort(),
        firstDay: t.localeData().firstDayOfWeek(),
      }),
      (this.callback = function () {}),
      (this.isShowing = !1),
      (this.leftCalendar = {}),
      (this.rightCalendar = {}),
      ("object" == typeof i && null !== i) || (i = {}),
      "string" == typeof (i = e.extend(this.element.data(), i)).template ||
        i.template instanceof e ||
        (i.template =
          '<div class="daterangepicker"><div class="ranges"></div><div class="drp-calendar left"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-calendar right"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-buttons"><span class="drp-selected"></span><button class="cancelBtn" type="button"></button><button class="applyBtn" disabled="disabled" type="button"></button> </div></div>'),
      (this.parentEl =
        i.parentEl && e(i.parentEl).length ? e(i.parentEl) : e(this.parentEl)),
      (this.container = e(i.template).appendTo(this.parentEl)),
      "object" == typeof i.locale &&
        ("string" == typeof i.locale.direction &&
          (this.locale.direction = i.locale.direction),
        "string" == typeof i.locale.format &&
          (this.locale.format = i.locale.format),
        "string" == typeof i.locale.separator &&
          (this.locale.separator = i.locale.separator),
        "object" == typeof i.locale.daysOfWeek &&
          (this.locale.daysOfWeek = i.locale.daysOfWeek.slice()),
        "object" == typeof i.locale.monthNames &&
          (this.locale.monthNames = i.locale.monthNames.slice()),
        "number" == typeof i.locale.firstDay &&
          (this.locale.firstDay = i.locale.firstDay),
        "string" == typeof i.locale.applyLabel &&
          (this.locale.applyLabel = i.locale.applyLabel),
        "string" == typeof i.locale.cancelLabel &&
          (this.locale.cancelLabel = i.locale.cancelLabel),
        "string" == typeof i.locale.weekLabel &&
          (this.locale.weekLabel = i.locale.weekLabel),
        "string" == typeof i.locale.customRangeLabel))
    ) {
      (m = document.createElement("textarea")).innerHTML =
        i.locale.customRangeLabel;
      var n = m.value;
      this.locale.customRangeLabel = n;
    }
    if (
      (this.container.addClass(this.locale.direction),
      "string" == typeof i.startDate &&
        (this.startDate = t(i.startDate, this.locale.format)),
      "string" == typeof i.endDate &&
        (this.endDate = t(i.endDate, this.locale.format)),
      "string" == typeof i.minDate &&
        (this.minDate = t(i.minDate, this.locale.format)),
      "string" == typeof i.maxDate &&
        (this.maxDate = t(i.maxDate, this.locale.format)),
      "object" == typeof i.startDate && (this.startDate = t(i.startDate)),
      "object" == typeof i.endDate && (this.endDate = t(i.endDate)),
      "object" == typeof i.minDate && (this.minDate = t(i.minDate)),
      "object" == typeof i.maxDate && (this.maxDate = t(i.maxDate)),
      this.minDate &&
        this.startDate.isBefore(this.minDate) &&
        (this.startDate = this.minDate.clone()),
      this.maxDate &&
        this.endDate.isAfter(this.maxDate) &&
        (this.endDate = this.maxDate.clone()),
      "string" == typeof i.applyButtonClasses &&
        (this.applyButtonClasses = i.applyButtonClasses),
      "string" == typeof i.applyClass &&
        (this.applyButtonClasses = i.applyClass),
      "string" == typeof i.cancelButtonClasses &&
        (this.cancelButtonClasses = i.cancelButtonClasses),
      "string" == typeof i.cancelClass &&
        (this.cancelButtonClasses = i.cancelClass),
      "object" == typeof i.maxSpan && (this.maxSpan = i.maxSpan),
      "object" == typeof i.dateLimit && (this.maxSpan = i.dateLimit),
      "string" == typeof i.opens && (this.opens = i.opens),
      "string" == typeof i.drops && (this.drops = i.drops),
      "boolean" == typeof i.showWeekNumbers &&
        (this.showWeekNumbers = i.showWeekNumbers),
      "boolean" == typeof i.showISOWeekNumbers &&
        (this.showISOWeekNumbers = i.showISOWeekNumbers),
      "string" == typeof i.buttonClasses &&
        (this.buttonClasses = i.buttonClasses),
      "object" == typeof i.buttonClasses &&
        (this.buttonClasses = i.buttonClasses.join(" ")),
      "boolean" == typeof i.showDropdowns &&
        (this.showDropdowns = i.showDropdowns),
      "number" == typeof i.minYear && (this.minYear = i.minYear),
      "number" == typeof i.maxYear && (this.maxYear = i.maxYear),
      "boolean" == typeof i.showCustomRangeLabel &&
        (this.showCustomRangeLabel = i.showCustomRangeLabel),
      "boolean" == typeof i.singleDatePicker &&
        ((this.singleDatePicker = i.singleDatePicker),
        this.singleDatePicker && (this.endDate = this.startDate.clone())),
      "boolean" == typeof i.timePicker && (this.timePicker = i.timePicker),
      "boolean" == typeof i.timePickerSeconds &&
        (this.timePickerSeconds = i.timePickerSeconds),
      "number" == typeof i.timePickerIncrement &&
        (this.timePickerIncrement = i.timePickerIncrement),
      "boolean" == typeof i.timePicker24Hour &&
        (this.timePicker24Hour = i.timePicker24Hour),
      "boolean" == typeof i.autoApply && (this.autoApply = i.autoApply),
      "boolean" == typeof i.autoUpdateInput &&
        (this.autoUpdateInput = i.autoUpdateInput),
      "boolean" == typeof i.linkedCalendars &&
        (this.linkedCalendars = i.linkedCalendars),
      "function" == typeof i.isInvalidDate &&
        (this.isInvalidDate = i.isInvalidDate),
      "function" == typeof i.isCustomDate &&
        (this.isCustomDate = i.isCustomDate),
      "boolean" == typeof i.alwaysShowCalendars &&
        (this.alwaysShowCalendars = i.alwaysShowCalendars),
      0 != this.locale.firstDay)
    )
      for (var r = this.locale.firstDay; r > 0; )
        this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()), r--;
    var o, h, l;
    if (
      void 0 === i.startDate &&
      void 0 === i.endDate &&
      e(this.element).is(":text")
    ) {
      var c = e(this.element).val(),
        d = c.split(this.locale.separator);
      (o = h = null),
        2 == d.length
          ? ((o = t(d[0], this.locale.format)),
            (h = t(d[1], this.locale.format)))
          : this.singleDatePicker &&
            "" !== c &&
            ((o = t(c, this.locale.format)), (h = t(c, this.locale.format))),
        null !== o && null !== h && (this.setStartDate(o), this.setEndDate(h));
    }
    if ("object" == typeof i.ranges) {
      for (l in i.ranges) {
        (o =
          "string" == typeof i.ranges[l][0]
            ? t(i.ranges[l][0], this.locale.format)
            : t(i.ranges[l][0])),
          (h =
            "string" == typeof i.ranges[l][1]
              ? t(i.ranges[l][1], this.locale.format)
              : t(i.ranges[l][1])),
          this.minDate &&
            o.isBefore(this.minDate) &&
            (o = this.minDate.clone());
        var m,
          p = this.maxDate;
        if (
          (this.maxSpan &&
            p &&
            o.clone().add(this.maxSpan).isAfter(p) &&
            (p = o.clone().add(this.maxSpan)),
          p && h.isAfter(p) && (h = p.clone()),
          !(
            (this.minDate &&
              h.isBefore(this.minDate, this.timepicker ? "minute" : "day")) ||
            (p && o.isAfter(p, this.timepicker ? "minute" : "day"))
          ))
        )
          ((m = document.createElement("textarea")).innerHTML = l),
            (n = m.value),
            (this.ranges[n] = [o, h]);
      }
      var f = "<ul>";
      for (l in this.ranges)
        f += '<li data-range-key="' + l + '">' + l + "</li>";
      this.showCustomRangeLabel &&
        (f +=
          '<li data-range-key="' +
          this.locale.customRangeLabel +
          '">' +
          this.locale.customRangeLabel +
          "</li>"),
        (f += "</ul>"),
        this.container.find(".ranges").prepend(f);
    }
    "function" == typeof s && (this.callback = s),
      this.timePicker ||
        ((this.startDate = this.startDate.startOf("day")),
        (this.endDate = this.endDate.endOf("day")),
        this.container.find(".calendar-time").hide()),
      this.timePicker && this.autoApply && (this.autoApply = !1),
      this.autoApply && this.container.addClass("auto-apply"),
      "object" == typeof i.ranges && this.container.addClass("show-ranges"),
      this.singleDatePicker &&
        (this.container.addClass("single"),
        this.container.find(".drp-calendar.left").addClass("single"),
        this.container.find(".drp-calendar.left").show(),
        this.container.find(".drp-calendar.right").hide(),
        !this.timePicker &&
          this.autoApply &&
          this.container.addClass("auto-apply")),
      ((void 0 === i.ranges && !this.singleDatePicker) ||
        this.alwaysShowCalendars) &&
        this.container.addClass("show-calendar"),
      this.container.addClass("opens" + this.opens),
      this.container.find(".applyBtn, .cancelBtn").addClass(this.buttonClasses),
      this.applyButtonClasses.length &&
        this.container.find(".applyBtn").addClass(this.applyButtonClasses),
      this.cancelButtonClasses.length &&
        this.container.find(".cancelBtn").addClass(this.cancelButtonClasses),
      this.container.find(".applyBtn").html(this.locale.applyLabel),
      this.container.find(".cancelBtn").html(this.locale.cancelLabel),
      this.container
        .find(".drp-calendar")
        .on("click.daterangepicker", ".prev", e.proxy(this.clickPrev, this))
        .on("click.daterangepicker", ".next", e.proxy(this.clickNext, this))
        .on(
          "mousedown.daterangepicker",
          "td.available",
          e.proxy(this.clickDate, this)
        )
        .on(
          "mouseenter.daterangepicker",
          "td.available",
          e.proxy(this.hoverDate, this)
        )
        .on(
          "change.daterangepicker",
          "select.yearselect",
          e.proxy(this.monthOrYearChanged, this)
        )
        .on(
          "change.daterangepicker",
          "select.monthselect",
          e.proxy(this.monthOrYearChanged, this)
        )
        .on(
          "change.daterangepicker",
          "select.hourselect,select.minuteselect,select.secondselect,select.ampmselect",
          e.proxy(this.timeChanged, this)
        ),
      this.container
        .find(".ranges")
        .on("click.daterangepicker", "li", e.proxy(this.clickRange, this)),
      this.container
        .find(".drp-buttons")
        .on(
          "click.daterangepicker",
          "button.applyBtn",
          e.proxy(this.clickApply, this)
        )
        .on(
          "click.daterangepicker",
          "button.cancelBtn",
          e.proxy(this.clickCancel, this)
        ),
      this.element.is("input") || this.element.is("button")
        ? this.element.on({
            "click.daterangepicker": e.proxy(this.show, this),
            "focus.daterangepicker": e.proxy(this.show, this),
            "keyup.daterangepicker": e.proxy(this.elementChanged, this),
            "keydown.daterangepicker": e.proxy(this.keydown, this),
          })
        : (this.element.on("click.daterangepicker", e.proxy(this.toggle, this)),
          this.element.on(
            "keydown.daterangepicker",
            e.proxy(this.toggle, this)
          )),
      this.updateElement();
  };
  return (
    (a.prototype = {
      constructor: a,
      setStartDate: function (e) {
        "string" == typeof e && (this.startDate = t(e, this.locale.format)),
          "object" == typeof e && (this.startDate = t(e)),
          this.timePicker || (this.startDate = this.startDate.startOf("day")),
          this.timePicker &&
            this.timePickerIncrement &&
            this.startDate.minute(
              Math.round(this.startDate.minute() / this.timePickerIncrement) *
                this.timePickerIncrement
            ),
          this.minDate &&
            this.startDate.isBefore(this.minDate) &&
            ((this.startDate = this.minDate.clone()),
            this.timePicker &&
              this.timePickerIncrement &&
              this.startDate.minute(
                Math.round(this.startDate.minute() / this.timePickerIncrement) *
                  this.timePickerIncrement
              )),
          this.maxDate &&
            this.startDate.isAfter(this.maxDate) &&
            ((this.startDate = this.maxDate.clone()),
            this.timePicker &&
              this.timePickerIncrement &&
              this.startDate.minute(
                Math.floor(this.startDate.minute() / this.timePickerIncrement) *
                  this.timePickerIncrement
              )),
          this.isShowing || this.updateElement(),
          this.updateMonthsInView();
      },
      setEndDate: function (e) {
        "string" == typeof e && (this.endDate = t(e, this.locale.format)),
          "object" == typeof e && (this.endDate = t(e)),
          this.timePicker || (this.endDate = this.endDate.endOf("day")),
          this.timePicker &&
            this.timePickerIncrement &&
            this.endDate.minute(
              Math.round(this.endDate.minute() / this.timePickerIncrement) *
                this.timePickerIncrement
            ),
          this.endDate.isBefore(this.startDate) &&
            (this.endDate = this.startDate.clone()),
          this.maxDate &&
            this.endDate.isAfter(this.maxDate) &&
            (this.endDate = this.maxDate.clone()),
          this.maxSpan &&
            this.startDate.clone().add(this.maxSpan).isBefore(this.endDate) &&
            (this.endDate = this.startDate.clone().add(this.maxSpan)),
          (this.previousRightTime = this.endDate.clone()),
          this.container
            .find(".drp-selected")
            .html(
              this.startDate.format(this.locale.format) +
                this.locale.separator +
                this.endDate.format(this.locale.format)
            ),
          this.isShowing || this.updateElement(),
          this.updateMonthsInView();
      },
      isInvalidDate: function () {
        return !1;
      },
      isCustomDate: function () {
        return !1;
      },
      updateView: function () {
        this.timePicker &&
          (this.renderTimePicker("left"),
          this.renderTimePicker("right"),
          this.endDate
            ? this.container
                .find(".right .calendar-time select")
                .prop("disabled", !1)
                .removeClass("disabled")
            : this.container
                .find(".right .calendar-time select")
                .prop("disabled", !0)
                .addClass("disabled")),
          this.endDate &&
            this.container
              .find(".drp-selected")
              .html(
                this.startDate.format(this.locale.format) +
                  this.locale.separator +
                  this.endDate.format(this.locale.format)
              ),
          this.updateMonthsInView(),
          this.updateCalendars(),
          this.updateFormInputs();
      },
      updateMonthsInView: function () {
        if (this.endDate) {
          if (
            !this.singleDatePicker &&
            this.leftCalendar.month &&
            this.rightCalendar.month &&
            (this.startDate.format("YYYY-MM") ==
              this.leftCalendar.month.format("YYYY-MM") ||
              this.startDate.format("YYYY-MM") ==
                this.rightCalendar.month.format("YYYY-MM")) &&
            (this.endDate.format("YYYY-MM") ==
              this.leftCalendar.month.format("YYYY-MM") ||
              this.endDate.format("YYYY-MM") ==
                this.rightCalendar.month.format("YYYY-MM"))
          )
            return;
          (this.leftCalendar.month = this.startDate.clone().date(2)),
            this.linkedCalendars ||
            (this.endDate.month() == this.startDate.month() &&
              this.endDate.year() == this.startDate.year())
              ? (this.rightCalendar.month = this.startDate
                  .clone()
                  .date(2)
                  .add(1, "month"))
              : (this.rightCalendar.month = this.endDate.clone().date(2));
        } else
          this.leftCalendar.month.format("YYYY-MM") !=
            this.startDate.format("YYYY-MM") &&
            this.rightCalendar.month.format("YYYY-MM") !=
              this.startDate.format("YYYY-MM") &&
            ((this.leftCalendar.month = this.startDate.clone().date(2)),
            (this.rightCalendar.month = this.startDate
              .clone()
              .date(2)
              .add(1, "month")));
        this.maxDate &&
          this.linkedCalendars &&
          !this.singleDatePicker &&
          this.rightCalendar.month > this.maxDate &&
          ((this.rightCalendar.month = this.maxDate.clone().date(2)),
          (this.leftCalendar.month = this.maxDate
            .clone()
            .date(2)
            .subtract(1, "month")));
      },
      updateCalendars: function () {
        var t, e, a, i;
        this.timePicker &&
          (this.endDate
            ? ((t = parseInt(
                this.container.find(".left .hourselect").val(),
                10
              )),
              (e = parseInt(
                this.container.find(".left .minuteselect").val(),
                10
              )),
              isNaN(e) &&
                (e = parseInt(
                  this.container.find(".left .minuteselect option:last").val(),
                  10
                )),
              (a = this.timePickerSeconds
                ? parseInt(this.container.find(".left .secondselect").val(), 10)
                : 0),
              this.timePicker24Hour ||
                ("PM" ===
                  (i = this.container.find(".left .ampmselect").val()) &&
                  t < 12 &&
                  (t += 12),
                "AM" === i && 12 === t && (t = 0)))
            : ((t = parseInt(
                this.container.find(".right .hourselect").val(),
                10
              )),
              (e = parseInt(
                this.container.find(".right .minuteselect").val(),
                10
              )),
              isNaN(e) &&
                (e = parseInt(
                  this.container.find(".right .minuteselect option:last").val(),
                  10
                )),
              (a = this.timePickerSeconds
                ? parseInt(
                    this.container.find(".right .secondselect").val(),
                    10
                  )
                : 0),
              this.timePicker24Hour ||
                ("PM" ===
                  (i = this.container.find(".right .ampmselect").val()) &&
                  t < 12 &&
                  (t += 12),
                "AM" === i && 12 === t && (t = 0))),
          this.leftCalendar.month.hour(t).minute(e).second(a),
          this.rightCalendar.month.hour(t).minute(e).second(a));
        this.renderCalendar("left"),
          this.renderCalendar("right"),
          this.container.find(".ranges li").removeClass("active"),
          null != this.endDate && this.calculateChosenLabel();
      },
      renderCalendar: function (a) {
        var i,
          s = (i =
            "left" == a ? this.leftCalendar : this.rightCalendar).month.month(),
          n = i.month.year(),
          r = i.month.hour(),
          o = i.month.minute(),
          h = i.month.second(),
          l = t([n, s]).daysInMonth(),
          c = t([n, s, 1]),
          d = t([n, s, l]),
          m = t(c).subtract(1, "month").month(),
          p = t(c).subtract(1, "month").year(),
          f = t([p, m]).daysInMonth(),
          u = c.day();
        ((i = []).firstDay = c), (i.lastDay = d);
        for (var D = 0; D < 6; D++) i[D] = [];
        var g = f - u + this.locale.firstDay + 1;
        g > f && (g -= 7), u == this.locale.firstDay && (g = f - 6);
        for (
          var y = t([p, m, g, 12, o, h]), k = ((D = 0), 0), b = 0;
          D < 42;
          D++, k++, y = t(y).add(24, "hour")
        )
          D > 0 && k % 7 == 0 && ((k = 0), b++),
            (i[b][k] = y.clone().hour(r).minute(o).second(h)),
            y.hour(12),
            this.minDate &&
              i[b][k].format("YYYY-MM-DD") ==
                this.minDate.format("YYYY-MM-DD") &&
              i[b][k].isBefore(this.minDate) &&
              "left" == a &&
              (i[b][k] = this.minDate.clone()),
            this.maxDate &&
              i[b][k].format("YYYY-MM-DD") ==
                this.maxDate.format("YYYY-MM-DD") &&
              i[b][k].isAfter(this.maxDate) &&
              "right" == a &&
              (i[b][k] = this.maxDate.clone());
        "left" == a
          ? (this.leftCalendar.calendar = i)
          : (this.rightCalendar.calendar = i);
        var v = "left" == a ? this.minDate : this.startDate,
          C = this.maxDate,
          Y =
            ("left" == a ? this.startDate : this.endDate,
            this.locale.direction,
            '<table class="table-condensed">');
        (Y += "<thead>"),
          (Y += "<tr>"),
          (this.showWeekNumbers || this.showISOWeekNumbers) &&
            (Y += "<th></th>"),
          (v && !v.isBefore(i.firstDay)) ||
          (this.linkedCalendars && "left" != a)
            ? (Y += "<th></th>")
            : (Y += '<th class="prev available"><span></span></th>');
        var w =
          this.locale.monthNames[i[1][1].month()] + i[1][1].format(" YYYY");
        if (this.showDropdowns) {
          for (
            var P = i[1][1].month(),
              x = i[1][1].year(),
              M = (C && C.year()) || this.maxYear,
              I = (v && v.year()) || this.minYear,
              S = x == I,
              B = x == M,
              A = '<select class="monthselect">',
              L = 0;
            L < 12;
            L++
          )
            (!S || (v && L >= v.month())) && (!B || (C && L <= C.month()))
              ? (A +=
                  "<option value='" +
                  L +
                  "'" +
                  (L === P ? " selected='selected'" : "") +
                  ">" +
                  this.locale.monthNames[L] +
                  "</option>")
              : (A +=
                  "<option value='" +
                  L +
                  "'" +
                  (L === P ? " selected='selected'" : "") +
                  " disabled='disabled'>" +
                  this.locale.monthNames[L] +
                  "</option>");
          A += "</select>";
          for (var N = '<select class="yearselect">', E = I; E <= M; E++)
            N +=
              '<option value="' +
              E +
              '"' +
              (E === x ? ' selected="selected"' : "") +
              ">" +
              E +
              "</option>";
          w = A + (N += "</select>");
        }
        if (
          ((Y += '<th colspan="5" class="month">' + w + "</th>"),
          (C && !C.isAfter(i.lastDay)) ||
          (this.linkedCalendars && "right" != a && !this.singleDatePicker)
            ? (Y += "<th></th>")
            : (Y += '<th class="next available"><span></span></th>'),
          (Y += "</tr>"),
          (Y += "<tr>"),
          (this.showWeekNumbers || this.showISOWeekNumbers) &&
            (Y += '<th class="week">' + this.locale.weekLabel + "</th>"),
          e.each(this.locale.daysOfWeek, function (t, e) {
            Y += "<th>" + e + "</th>";
          }),
          (Y += "</tr>"),
          (Y += "</thead>"),
          (Y += "<tbody>"),
          null == this.endDate && this.maxSpan)
        ) {
          var O = this.startDate.clone().add(this.maxSpan).endOf("day");
          (C && !O.isBefore(C)) || (C = O);
        }
        for (b = 0; b < 6; b++) {
          for (
            Y += "<tr>",
              this.showWeekNumbers
                ? (Y += '<td class="week">' + i[b][0].week() + "</td>")
                : this.showISOWeekNumbers &&
                  (Y += '<td class="week">' + i[b][0].isoWeek() + "</td>"),
              k = 0;
            k < 7;
            k++
          ) {
            var W = [];
            i[b][k].isSame(new Date(), "day") && W.push("today"),
              i[b][k].isoWeekday() > 5 && W.push("weekend"),
              i[b][k].month() != i[1][1].month() && W.push("off", "ends"),
              this.minDate &&
                i[b][k].isBefore(this.minDate, "day") &&
                W.push("off", "disabled"),
              C && i[b][k].isAfter(C, "day") && W.push("off", "disabled"),
              this.isInvalidDate(i[b][k]) && W.push("off", "disabled"),
              i[b][k].format("YYYY-MM-DD") ==
                this.startDate.format("YYYY-MM-DD") &&
                W.push("active", "start-date"),
              null != this.endDate &&
                i[b][k].format("YYYY-MM-DD") ==
                  this.endDate.format("YYYY-MM-DD") &&
                W.push("active", "end-date"),
              null != this.endDate &&
                i[b][k] > this.startDate &&
                i[b][k] < this.endDate &&
                W.push("in-range");
            var H = this.isCustomDate(i[b][k]);
            !1 !== H &&
              ("string" == typeof H
                ? W.push(H)
                : Array.prototype.push.apply(W, H));
            var j = "",
              R = !1;
            for (D = 0; D < W.length; D++)
              (j += W[D] + " "), "disabled" == W[D] && (R = !0);
            R || (j += "available"),
              (Y +=
                '<td class="' +
                j.replace(/^\s+|\s+$/g, "") +
                '" data-title="r' +
                b +
                "c" +
                k +
                '">' +
                i[b][k].date() +
                "</td>");
          }
          Y += "</tr>";
        }
        (Y += "</tbody>"),
          (Y += "</table>"),
          this.container
            .find(".drp-calendar." + a + " .calendar-table")
            .html(Y);
      },
      renderTimePicker: function (t) {
        if ("right" != t || this.endDate) {
          var e,
            a,
            i,
            s = this.maxDate;
          if (
            (!this.maxSpan ||
              (this.maxDate &&
                !this.startDate
                  .clone()
                  .add(this.maxSpan)
                  .isBefore(this.maxDate)) ||
              (s = this.startDate.clone().add(this.maxSpan)),
            "left" == t)
          )
            (a = this.startDate.clone()), (i = this.minDate);
          else if ("right" == t) {
            (a = this.endDate.clone()), (i = this.startDate);
            var n = this.container.find(".drp-calendar.right .calendar-time");
            if (
              "" != n.html() &&
              (a.hour(
                isNaN(a.hour())
                  ? n.find(".hourselect option:selected").val()
                  : a.hour()
              ),
              a.minute(
                isNaN(a.minute())
                  ? n.find(".minuteselect option:selected").val()
                  : a.minute()
              ),
              a.second(
                isNaN(a.second())
                  ? n.find(".secondselect option:selected").val()
                  : a.second()
              ),
              !this.timePicker24Hour)
            ) {
              var r = n.find(".ampmselect option:selected").val();
              "PM" === r && a.hour() < 12 && a.hour(a.hour() + 12),
                "AM" === r && 12 === a.hour() && a.hour(0);
            }
            a.isBefore(this.startDate) && (a = this.startDate.clone()),
              s && a.isAfter(s) && (a = s.clone());
          }
          e = '<select class="hourselect">';
          for (
            var o = this.timePicker24Hour ? 0 : 1,
              h = this.timePicker24Hour ? 23 : 12,
              l = o;
            l <= h;
            l++
          ) {
            var c = l;
            this.timePicker24Hour ||
              (c = a.hour() >= 12 ? (12 == l ? 12 : l + 12) : 12 == l ? 0 : l);
            var d = a.clone().hour(c),
              m = !1;
            i && d.minute(59).isBefore(i) && (m = !0),
              s && d.minute(0).isAfter(s) && (m = !0),
              c != a.hour() || m
                ? (e += m
                    ? '<option value="' +
                      l +
                      '" disabled="disabled" class="disabled">' +
                      l +
                      "</option>"
                    : '<option value="' + l + '">' + l + "</option>")
                : (e +=
                    '<option value="' +
                    l +
                    '" selected="selected">' +
                    l +
                    "</option>");
          }
          for (
            e += "</select> ", e += ': <select class="minuteselect">', l = 0;
            l < 60;
            l += this.timePickerIncrement
          ) {
            var p = l < 10 ? "0" + l : l;
            (d = a.clone().minute(l)),
              (m = !1),
              i && d.second(59).isBefore(i) && (m = !0),
              s && d.second(0).isAfter(s) && (m = !0),
              a.minute() != l || m
                ? (e += m
                    ? '<option value="' +
                      l +
                      '" disabled="disabled" class="disabled">' +
                      p +
                      "</option>"
                    : '<option value="' + l + '">' + p + "</option>")
                : (e +=
                    '<option value="' +
                    l +
                    '" selected="selected">' +
                    p +
                    "</option>");
          }
          if (((e += "</select> "), this.timePickerSeconds)) {
            for (e += ': <select class="secondselect">', l = 0; l < 60; l++)
              (p = l < 10 ? "0" + l : l),
                (d = a.clone().second(l)),
                (m = !1),
                i && d.isBefore(i) && (m = !0),
                s && d.isAfter(s) && (m = !0),
                a.second() != l || m
                  ? (e += m
                      ? '<option value="' +
                        l +
                        '" disabled="disabled" class="disabled">' +
                        p +
                        "</option>"
                      : '<option value="' + l + '">' + p + "</option>")
                  : (e +=
                      '<option value="' +
                      l +
                      '" selected="selected">' +
                      p +
                      "</option>");
            e += "</select> ";
          }
          if (!this.timePicker24Hour) {
            e += '<select class="ampmselect">';
            var f = "",
              u = "";
            i &&
              a.clone().hour(12).minute(0).second(0).isBefore(i) &&
              (f = ' disabled="disabled" class="disabled"'),
              s &&
                a.clone().hour(0).minute(0).second(0).isAfter(s) &&
                (u = ' disabled="disabled" class="disabled"'),
              a.hour() >= 12
                ? (e +=
                    '<option value="AM"' +
                    f +
                    '>AM</option><option value="PM" selected="selected"' +
                    u +
                    ">PM</option>")
                : (e +=
                    '<option value="AM" selected="selected"' +
                    f +
                    '>AM</option><option value="PM"' +
                    u +
                    ">PM</option>"),
              (e += "</select>");
          }
          this.container.find(".drp-calendar." + t + " .calendar-time").html(e);
        }
      },
      updateFormInputs: function () {
        this.singleDatePicker ||
        (this.endDate &&
          (this.startDate.isBefore(this.endDate) ||
            this.startDate.isSame(this.endDate)))
          ? this.container.find("button.applyBtn").prop("disabled", !1)
          : this.container.find("button.applyBtn").prop("disabled", !0);
      },
      move: function () {
        var t,
          a = { top: 0, left: 0 },
          i = this.drops,
          s = e(window).width();
        switch (
          (this.parentEl.is("body") ||
            ((a = {
              top: this.parentEl.offset().top - this.parentEl.scrollTop(),
              left: this.parentEl.offset().left - this.parentEl.scrollLeft(),
            }),
            (s = this.parentEl[0].clientWidth + this.parentEl.offset().left)),
          i)
        ) {
          case "auto":
            (t =
              this.element.offset().top + this.element.outerHeight() - a.top) +
              this.container.outerHeight() >=
              this.parentEl[0].scrollHeight &&
              ((t =
                this.element.offset().top -
                this.container.outerHeight() -
                a.top),
              (i = "up"));
            break;
          case "up":
            t =
              this.element.offset().top - this.container.outerHeight() - a.top;
            break;
          default:
            t = this.element.offset().top + this.element.outerHeight() - a.top;
        }
        this.container.css({ top: 0, left: 0, right: "auto" });
        var n = this.container.outerWidth();
        if (
          (this.container.toggleClass("drop-up", "up" == i),
          "left" == this.opens)
        ) {
          var r = s - this.element.offset().left - this.element.outerWidth();
          n + r > e(window).width()
            ? this.container.css({ top: t, right: "auto", left: 9 })
            : this.container.css({ top: t, right: r, left: "auto" });
        } else if ("center" == this.opens)
          (o =
            this.element.offset().left -
            a.left +
            this.element.outerWidth() / 2 -
            n / 2) < 0
            ? this.container.css({ top: t, right: "auto", left: 9 })
            : o + n > e(window).width()
            ? this.container.css({ top: t, left: "auto", right: 0 })
            : this.container.css({ top: t, left: o, right: "auto" });
        else {
          var o;
          (o = this.element.offset().left - a.left) + n > e(window).width()
            ? this.container.css({ top: t, left: "auto", right: 0 })
            : this.container.css({ top: t, left: o, right: "auto" });
        }
      },
      show: function (t) {
        this.isShowing ||
          ((this._outsideClickProxy = e.proxy(function (t) {
            this.outsideClick(t);
          }, this)),
          e(document)
            .on("mousedown.daterangepicker", this._outsideClickProxy)
            .on("touchend.daterangepicker", this._outsideClickProxy)
            .on(
              "click.daterangepicker",
              "[data-toggle=dropdown]",
              this._outsideClickProxy
            )
            .on("focusin.daterangepicker", this._outsideClickProxy),
          e(window).on(
            "resize.daterangepicker",
            e.proxy(function (t) {
              this.move(t);
            }, this)
          ),
          (this.oldStartDate = this.startDate.clone()),
          (this.oldEndDate = this.endDate.clone()),
          (this.previousRightTime = this.endDate.clone()),
          this.updateView(),
          this.container.show(),
          this.move(),
          this.element.trigger("show.daterangepicker", this),
          (this.isShowing = !0));
      },
      hide: function (t) {
        this.isShowing &&
          (this.endDate ||
            ((this.startDate = this.oldStartDate.clone()),
            (this.endDate = this.oldEndDate.clone())),
          (this.startDate.isSame(this.oldStartDate) &&
            this.endDate.isSame(this.oldEndDate)) ||
            this.callback(
              this.startDate.clone(),
              this.endDate.clone(),
              this.chosenLabel
            ),
          this.updateElement(),
          e(document).off(".daterangepicker"),
          e(window).off(".daterangepicker"),
          this.container.hide(),
          this.element.trigger("hide.daterangepicker", this),
          (this.isShowing = !1));
      },
      toggle: function (t) {
        this.isShowing ? this.hide() : this.show();
      },
      outsideClick: function (t) {
        var a = e(t.target);
        "focusin" == t.type ||
          a.closest(this.element).length ||
          a.closest(this.container).length ||
          a.closest(".calendar-table").length ||
          (this.hide(),
          this.element.trigger("outsideClick.daterangepicker", this));
      },
      showCalendars: function () {
        this.container.addClass("show-calendar"),
          this.move(),
          this.element.trigger("showCalendar.daterangepicker", this);
      },
      hideCalendars: function () {
        this.container.removeClass("show-calendar"),
          this.element.trigger("hideCalendar.daterangepicker", this);
      },
      clickRange: function (t) {
        var e = t.target.getAttribute("data-range-key");
        if (((this.chosenLabel = e), e == this.locale.customRangeLabel))
          this.showCalendars();
        else {
          var a = this.ranges[e];
          (this.startDate = a[0]),
            (this.endDate = a[1]),
            this.timePicker ||
              (this.startDate.startOf("day"), this.endDate.endOf("day")),
            this.alwaysShowCalendars || this.hideCalendars(),
            this.clickApply();
        }
      },
      clickPrev: function (t) {
        e(t.target).parents(".drp-calendar").hasClass("left")
          ? (this.leftCalendar.month.subtract(1, "month"),
            this.linkedCalendars &&
              this.rightCalendar.month.subtract(1, "month"))
          : this.rightCalendar.month.subtract(1, "month"),
          this.updateCalendars();
      },
      clickNext: function (t) {
        e(t.target).parents(".drp-calendar").hasClass("left")
          ? this.leftCalendar.month.add(1, "month")
          : (this.rightCalendar.month.add(1, "month"),
            this.linkedCalendars && this.leftCalendar.month.add(1, "month")),
          this.updateCalendars();
      },
      hoverDate: function (t) {
        if (e(t.target).hasClass("available")) {
          var a = e(t.target).attr("data-title"),
            i = a.substr(1, 1),
            s = a.substr(3, 1),
            n = e(t.target).parents(".drp-calendar").hasClass("left")
              ? this.leftCalendar.calendar[i][s]
              : this.rightCalendar.calendar[i][s],
            r = this.leftCalendar,
            o = this.rightCalendar,
            h = this.startDate;
          this.endDate ||
            this.container.find(".drp-calendar tbody td").each(function (t, a) {
              if (!e(a).hasClass("week")) {
                var i = e(a).attr("data-title"),
                  s = i.substr(1, 1),
                  l = i.substr(3, 1),
                  c = e(a).parents(".drp-calendar").hasClass("left")
                    ? r.calendar[s][l]
                    : o.calendar[s][l];
                (c.isAfter(h) && c.isBefore(n)) || c.isSame(n, "day")
                  ? e(a).addClass("in-range")
                  : e(a).removeClass("in-range");
              }
            });
        }
      },
      clickDate: function (t) {
        if (e(t.target).hasClass("available")) {
          var a = e(t.target).attr("data-title"),
            i = a.substr(1, 1),
            s = a.substr(3, 1),
            n = e(t.target).parents(".drp-calendar").hasClass("left")
              ? this.leftCalendar.calendar[i][s]
              : this.rightCalendar.calendar[i][s];
          if (this.endDate || n.isBefore(this.startDate, "day")) {
            if (this.timePicker) {
              var r = parseInt(
                this.container.find(".left .hourselect").val(),
                10
              );
              this.timePicker24Hour ||
                ("PM" ===
                  (l = this.container.find(".left .ampmselect").val()) &&
                  r < 12 &&
                  (r += 12),
                "AM" === l && 12 === r && (r = 0));
              var o = parseInt(
                this.container.find(".left .minuteselect").val(),
                10
              );
              isNaN(o) &&
                (o = parseInt(
                  this.container.find(".left .minuteselect option:last").val(),
                  10
                ));
              var h = this.timePickerSeconds
                ? parseInt(this.container.find(".left .secondselect").val(), 10)
                : 0;
              n = n.clone().hour(r).minute(o).second(h);
            }
            (this.endDate = null), this.setStartDate(n.clone());
          } else if (!this.endDate && n.isBefore(this.startDate))
            this.setEndDate(this.startDate.clone());
          else {
            var l;
            if (this.timePicker)
              (r = parseInt(
                this.container.find(".right .hourselect").val(),
                10
              )),
                this.timePicker24Hour ||
                  ("PM" ===
                    (l = this.container.find(".right .ampmselect").val()) &&
                    r < 12 &&
                    (r += 12),
                  "AM" === l && 12 === r && (r = 0)),
                (o = parseInt(
                  this.container.find(".right .minuteselect").val(),
                  10
                )),
                isNaN(o) &&
                  (o = parseInt(
                    this.container
                      .find(".right .minuteselect option:last")
                      .val(),
                    10
                  )),
                (h = this.timePickerSeconds
                  ? parseInt(
                      this.container.find(".right .secondselect").val(),
                      10
                    )
                  : 0),
                (n = n.clone().hour(r).minute(o).second(h));
            this.setEndDate(n.clone()),
              this.autoApply &&
                (this.calculateChosenLabel(), this.clickApply());
          }
          this.singleDatePicker &&
            (this.setEndDate(this.startDate),
            !this.timePicker && this.autoApply && this.clickApply()),
            this.updateView(),
            t.stopPropagation();
        }
      },
      calculateChosenLabel: function () {
        var t = !0,
          e = 0;
        for (var a in this.ranges) {
          if (this.timePicker) {
            var i = this.timePickerSeconds
              ? "YYYY-MM-DD HH:mm:ss"
              : "YYYY-MM-DD HH:mm";
            if (
              this.startDate.format(i) == this.ranges[a][0].format(i) &&
              this.endDate.format(i) == this.ranges[a][1].format(i)
            ) {
              (t = !1),
                (this.chosenLabel = this.container
                  .find(".ranges li:eq(" + e + ")")
                  .addClass("active")
                  .attr("data-range-key"));
              break;
            }
          } else if (
            this.startDate.format("YYYY-MM-DD") ==
              this.ranges[a][0].format("YYYY-MM-DD") &&
            this.endDate.format("YYYY-MM-DD") ==
              this.ranges[a][1].format("YYYY-MM-DD")
          ) {
            (t = !1),
              (this.chosenLabel = this.container
                .find(".ranges li:eq(" + e + ")")
                .addClass("active")
                .attr("data-range-key"));
            break;
          }
          e++;
        }
        t &&
          (this.showCustomRangeLabel
            ? (this.chosenLabel = this.container
                .find(".ranges li:last")
                .addClass("active")
                .attr("data-range-key"))
            : (this.chosenLabel = null),
          this.showCalendars());
      },
      clickApply: function (t) {
        this.hide(), this.element.trigger("apply.daterangepicker", this);
      },
      clickCancel: function (t) {
        (this.startDate = this.oldStartDate),
          (this.endDate = this.oldEndDate),
          this.hide(),
          this.element.trigger("cancel.daterangepicker", this);
      },
      monthOrYearChanged: function (t) {
        var a = e(t.target).closest(".drp-calendar").hasClass("left"),
          i = a ? "left" : "right",
          s = this.container.find(".drp-calendar." + i),
          n = parseInt(s.find(".monthselect").val(), 10),
          r = s.find(".yearselect").val();
        a ||
          ((r < this.startDate.year() ||
            (r == this.startDate.year() && n < this.startDate.month())) &&
            ((n = this.startDate.month()), (r = this.startDate.year()))),
          this.minDate &&
            (r < this.minDate.year() ||
              (r == this.minDate.year() && n < this.minDate.month())) &&
            ((n = this.minDate.month()), (r = this.minDate.year())),
          this.maxDate &&
            (r > this.maxDate.year() ||
              (r == this.maxDate.year() && n > this.maxDate.month())) &&
            ((n = this.maxDate.month()), (r = this.maxDate.year())),
          a
            ? (this.leftCalendar.month.month(n).year(r),
              this.linkedCalendars &&
                (this.rightCalendar.month = this.leftCalendar.month
                  .clone()
                  .add(1, "month")))
            : (this.rightCalendar.month.month(n).year(r),
              this.linkedCalendars &&
                (this.leftCalendar.month = this.rightCalendar.month
                  .clone()
                  .subtract(1, "month"))),
          this.updateCalendars();
      },
      timeChanged: function (t) {
        var a = e(t.target).closest(".drp-calendar"),
          i = a.hasClass("left"),
          s = parseInt(a.find(".hourselect").val(), 10),
          n = parseInt(a.find(".minuteselect").val(), 10);
        isNaN(n) &&
          (n = parseInt(a.find(".minuteselect option:last").val(), 10));
        var r = this.timePickerSeconds
          ? parseInt(a.find(".secondselect").val(), 10)
          : 0;
        if (!this.timePicker24Hour) {
          var o = a.find(".ampmselect").val();
          "PM" === o && s < 12 && (s += 12), "AM" === o && 12 === s && (s = 0);
        }
        if (i) {
          var h = this.startDate.clone();
          h.hour(s),
            h.minute(n),
            h.second(r),
            this.setStartDate(h),
            this.singleDatePicker
              ? (this.endDate = this.startDate.clone())
              : this.endDate &&
                this.endDate.format("YYYY-MM-DD") == h.format("YYYY-MM-DD") &&
                this.endDate.isBefore(h) &&
                this.setEndDate(h.clone());
        } else if (this.endDate) {
          var l = this.endDate.clone();
          l.hour(s), l.minute(n), l.second(r), this.setEndDate(l);
        }
        this.updateCalendars(),
          this.updateFormInputs(),
          this.renderTimePicker("left"),
          this.renderTimePicker("right");
      },
      elementChanged: function () {
        if (this.element.is("input") && this.element.val().length) {
          var e = this.element.val().split(this.locale.separator),
            a = null,
            i = null;
          2 === e.length &&
            ((a = t(e[0], this.locale.format)),
            (i = t(e[1], this.locale.format))),
            (this.singleDatePicker || null === a || null === i) &&
              (i = a = t(this.element.val(), this.locale.format)),
            a.isValid() &&
              i.isValid() &&
              (this.setStartDate(a), this.setEndDate(i), this.updateView());
        }
      },
      keydown: function (t) {
        (9 !== t.keyCode && 13 !== t.keyCode) || this.hide(),
          27 === t.keyCode &&
            (t.preventDefault(), t.stopPropagation(), this.hide());
      },
      updateElement: function () {
        if (this.element.is("input") && this.autoUpdateInput) {
          var t = this.startDate.format(this.locale.format);
          this.singleDatePicker ||
            (t +=
              this.locale.separator + this.endDate.format(this.locale.format)),
            t !== this.element.val() && this.element.val(t).trigger("change");
        }
      },
      remove: function () {
        this.container.remove(),
          this.element.off(".daterangepicker"),
          this.element.removeData();
      },
    }),
    (e.fn.daterangepicker = function (t, i) {
      var s = e.extend(!0, {}, e.fn.daterangepicker.defaultOptions, t);
      return (
        this.each(function () {
          var t = e(this);
          t.data("daterangepicker") && t.data("daterangepicker").remove(),
            t.data("daterangepicker", new a(t, s, i));
        }),
        this
      );
    }),
    a
  );
});
/*! jQuery Validation Plugin - v1.19.3 - 1/9/2021
 * https://jqueryvalidation.org/
 * Copyright (c) 2021 Jörn Zaefferer; Licensed MIT */
!(function (t) {
  "function" == typeof define && define.amd
    ? define(["jquery"], t)
    : "object" == typeof module && module.exports
    ? (module.exports = t(require("jquery")))
    : t(jQuery);
})(function (t) {
  t.extend(t.fn, {
    validate: function (e) {
      if (this.length) {
        var i = t.data(this[0], "validator");
        return (
          i ||
          (this.attr("novalidate", "novalidate"),
          (i = new t.validator(e, this[0])),
          t.data(this[0], "validator", i),
          i.settings.onsubmit &&
            (this.on("click.validate", ":submit", function (e) {
              (i.submitButton = e.currentTarget),
                t(this).hasClass("cancel") && (i.cancelSubmit = !0),
                void 0 !== t(this).attr("formnovalidate") &&
                  (i.cancelSubmit = !0);
            }),
            this.on("submit.validate", function (e) {
              function s() {
                var s, n;
                return (
                  i.submitButton &&
                    (i.settings.submitHandler || i.formSubmitted) &&
                    (s = t("<input type='hidden'/>")
                      .attr("name", i.submitButton.name)
                      .val(t(i.submitButton).val())
                      .appendTo(i.currentForm)),
                  !(i.settings.submitHandler && !i.settings.debug) ||
                    ((n = i.settings.submitHandler.call(i, i.currentForm, e)),
                    s && s.remove(),
                    void 0 !== n && n)
                );
              }
              return (
                i.settings.debug && e.preventDefault(),
                i.cancelSubmit
                  ? ((i.cancelSubmit = !1), s())
                  : i.form()
                  ? i.pendingRequest
                    ? ((i.formSubmitted = !0), !1)
                    : s()
                  : (i.focusInvalid(), !1)
              );
            })),
          i)
        );
      }
      e &&
        e.debug &&
        window.console &&
        console.warn("Nothing selected, can't validate, returning nothing.");
    },
    valid: function () {
      var e, i, s;
      return (
        t(this[0]).is("form")
          ? (e = this.validate().form())
          : ((s = []),
            (e = !0),
            (i = t(this[0].form).validate()),
            this.each(function () {
              (e = i.element(this) && e) || (s = s.concat(i.errorList));
            }),
            (i.errorList = s)),
        e
      );
    },
    rules: function (e, i) {
      var s,
        n,
        r,
        a,
        o,
        l,
        h = this[0],
        d =
          void 0 !== this.attr("contenteditable") &&
          "false" !== this.attr("contenteditable");
      if (
        null != h &&
        (!h.form &&
          d &&
          ((h.form = this.closest("form")[0]), (h.name = this.attr("name"))),
        null != h.form)
      ) {
        if (e)
          switch (
            ((s = t.data(h.form, "validator").settings),
            (n = s.rules),
            (r = t.validator.staticRules(h)),
            e)
          ) {
            case "add":
              t.extend(r, t.validator.normalizeRule(i)),
                delete r.messages,
                (n[h.name] = r),
                i.messages &&
                  (s.messages[h.name] = t.extend(
                    s.messages[h.name],
                    i.messages
                  ));
              break;
            case "remove":
              return i
                ? ((l = {}),
                  t.each(i.split(/\s/), function (t, e) {
                    (l[e] = r[e]), delete r[e];
                  }),
                  l)
                : (delete n[h.name], r);
          }
        return (
          (a = t.validator.normalizeRules(
            t.extend(
              {},
              t.validator.classRules(h),
              t.validator.attributeRules(h),
              t.validator.dataRules(h),
              t.validator.staticRules(h)
            ),
            h
          )).required &&
            ((o = a.required),
            delete a.required,
            (a = t.extend({ required: o }, a))),
          a.remote &&
            ((o = a.remote), delete a.remote, (a = t.extend(a, { remote: o }))),
          a
        );
      }
    },
  });
  var e = function (t) {
    return t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  };
  t.extend(t.expr.pseudos || t.expr[":"], {
    blank: function (i) {
      return !e("" + t(i).val());
    },
    filled: function (i) {
      var s = t(i).val();
      return null !== s && !!e("" + s);
    },
    unchecked: function (e) {
      return !t(e).prop("checked");
    },
  }),
    (t.validator = function (e, i) {
      (this.settings = t.extend(!0, {}, t.validator.defaults, e)),
        (this.currentForm = i),
        this.init();
    }),
    (t.validator.format = function (e, i) {
      return 1 === arguments.length
        ? function () {
            var i = t.makeArray(arguments);
            return i.unshift(e), t.validator.format.apply(this, i);
          }
        : (void 0 === i ||
            (arguments.length > 2 &&
              i.constructor !== Array &&
              (i = t.makeArray(arguments).slice(1)),
            i.constructor !== Array && (i = [i]),
            t.each(i, function (t, i) {
              e = e.replace(new RegExp("\\{" + t + "\\}", "g"), function () {
                return i;
              });
            })),
          e);
    }),
    t.extend(t.validator, {
      defaults: {
        messages: {},
        groups: {},
        rules: {},
        errorClass: "error",
        pendingClass: "pending",
        validClass: "valid",
        errorElement: "label",
        focusCleanup: !1,
        focusInvalid: !0,
        errorContainer: t([]),
        errorLabelContainer: t([]),
        onsubmit: !0,
        ignore: ":hidden",
        ignoreTitle: !1,
        onfocusin: function (t) {
          (this.lastActive = t),
            this.settings.focusCleanup &&
              (this.settings.unhighlight &&
                this.settings.unhighlight.call(
                  this,
                  t,
                  this.settings.errorClass,
                  this.settings.validClass
                ),
              this.hideThese(this.errorsFor(t)));
        },
        onfocusout: function (t) {
          this.checkable(t) ||
            (!(t.name in this.submitted) && this.optional(t)) ||
            this.element(t);
        },
        onkeyup: function (e, i) {
          (9 === i.which && "" === this.elementValue(e)) ||
            -1 !==
              t.inArray(
                i.keyCode,
                [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225]
              ) ||
            ((e.name in this.submitted || e.name in this.invalid) &&
              this.element(e));
        },
        onclick: function (t) {
          t.name in this.submitted
            ? this.element(t)
            : t.parentNode.name in this.submitted && this.element(t.parentNode);
        },
        highlight: function (e, i, s) {
          "radio" === e.type
            ? this.findByName(e.name).addClass(i).removeClass(s)
            : t(e).addClass(i).removeClass(s);
        },
        unhighlight: function (e, i, s) {
          "radio" === e.type
            ? this.findByName(e.name).removeClass(i).addClass(s)
            : t(e).removeClass(i).addClass(s);
        },
      },
      setDefaults: function (e) {
        t.extend(t.validator.defaults, e);
      },
      messages: {
        required: "This field is required.",
        remote: "Please fix this field.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        equalTo: "Please enter the same value again.",
        maxlength: t.validator.format(
          "Please enter no more than {0} characters."
        ),
        minlength: t.validator.format("Please enter at least {0} characters."),
        rangelength: t.validator.format(
          "Please enter a value between {0} and {1} characters long."
        ),
        range: t.validator.format("Please enter a value between {0} and {1}."),
        max: t.validator.format(
          "Please enter a value less than or equal to {0}."
        ),
        min: t.validator.format(
          "Please enter a value greater than or equal to {0}."
        ),
        step: t.validator.format("Please enter a multiple of {0}."),
      },
      autoCreateRanges: !1,
      prototype: {
        init: function () {
          function e(e) {
            var i =
              void 0 !== t(this).attr("contenteditable") &&
              "false" !== t(this).attr("contenteditable");
            if (
              (!this.form &&
                i &&
                ((this.form = t(this).closest("form")[0]),
                (this.name = t(this).attr("name"))),
              s === this.form)
            ) {
              var n = t.data(this.form, "validator"),
                r = "on" + e.type.replace(/^validate/, ""),
                a = n.settings;
              a[r] && !t(this).is(a.ignore) && a[r].call(n, this, e);
            }
          }
          (this.labelContainer = t(this.settings.errorLabelContainer)),
            (this.errorContext =
              (this.labelContainer.length && this.labelContainer) ||
              t(this.currentForm)),
            (this.containers = t(this.settings.errorContainer).add(
              this.settings.errorLabelContainer
            )),
            (this.submitted = {}),
            (this.valueCache = {}),
            (this.pendingRequest = 0),
            (this.pending = {}),
            (this.invalid = {}),
            this.reset();
          var i,
            s = this.currentForm,
            n = (this.groups = {});
          t.each(this.settings.groups, function (e, i) {
            "string" == typeof i && (i = i.split(/\s/)),
              t.each(i, function (t, i) {
                n[i] = e;
              });
          }),
            (i = this.settings.rules),
            t.each(i, function (e, s) {
              i[e] = t.validator.normalizeRule(s);
            }),
            t(this.currentForm)
              .on(
                "focusin.validate focusout.validate keyup.validate",
                ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",
                e
              )
              .on(
                "click.validate",
                "select, option, [type='radio'], [type='checkbox']",
                e
              ),
            this.settings.invalidHandler &&
              t(this.currentForm).on(
                "invalid-form.validate",
                this.settings.invalidHandler
              );
        },
        form: function () {
          return (
            this.checkForm(),
            t.extend(this.submitted, this.errorMap),
            (this.invalid = t.extend({}, this.errorMap)),
            this.valid() ||
              t(this.currentForm).triggerHandler("invalid-form", [this]),
            this.showErrors(),
            this.valid()
          );
        },
        checkForm: function () {
          this.prepareForm();
          for (
            var t = 0, e = (this.currentElements = this.elements());
            e[t];
            t++
          )
            this.check(e[t]);
          return this.valid();
        },
        element: function (e) {
          var i,
            s,
            n = this.clean(e),
            r = this.validationTargetFor(n),
            a = this,
            o = !0;
          return (
            void 0 === r
              ? delete this.invalid[n.name]
              : (this.prepareElement(r),
                (this.currentElements = t(r)),
                (s = this.groups[r.name]) &&
                  t.each(this.groups, function (t, e) {
                    e === s &&
                      t !== r.name &&
                      (n = a.validationTargetFor(a.clean(a.findByName(t)))) &&
                      n.name in a.invalid &&
                      (a.currentElements.push(n), (o = a.check(n) && o));
                  }),
                (i = !1 !== this.check(r)),
                (o = o && i),
                (this.invalid[r.name] = !i),
                this.numberOfInvalids() ||
                  (this.toHide = this.toHide.add(this.containers)),
                this.showErrors(),
                t(e).attr("aria-invalid", !i)),
            o
          );
        },
        showErrors: function (e) {
          if (e) {
            var i = this;
            t.extend(this.errorMap, e),
              (this.errorList = t.map(this.errorMap, function (t, e) {
                return { message: t, element: i.findByName(e)[0] };
              })),
              (this.successList = t.grep(this.successList, function (t) {
                return !(t.name in e);
              }));
          }
          this.settings.showErrors
            ? this.settings.showErrors.call(this, this.errorMap, this.errorList)
            : this.defaultShowErrors();
        },
        resetForm: function () {
          t.fn.resetForm && t(this.currentForm).resetForm(),
            (this.invalid = {}),
            (this.submitted = {}),
            this.prepareForm(),
            this.hideErrors();
          var e = this.elements()
            .removeData("previousValue")
            .removeAttr("aria-invalid");
          this.resetElements(e);
        },
        resetElements: function (t) {
          var e;
          if (this.settings.unhighlight)
            for (e = 0; t[e]; e++)
              this.settings.unhighlight.call(
                this,
                t[e],
                this.settings.errorClass,
                ""
              ),
                this.findByName(t[e].name).removeClass(
                  this.settings.validClass
                );
          else
            t.removeClass(this.settings.errorClass).removeClass(
              this.settings.validClass
            );
        },
        numberOfInvalids: function () {
          return this.objectLength(this.invalid);
        },
        objectLength: function (t) {
          var e,
            i = 0;
          for (e in t) void 0 !== t[e] && null !== t[e] && !1 !== t[e] && i++;
          return i;
        },
        hideErrors: function () {
          this.hideThese(this.toHide);
        },
        hideThese: function (t) {
          t.not(this.containers).text(""), this.addWrapper(t).hide();
        },
        valid: function () {
          return 0 === this.size();
        },
        size: function () {
          return this.errorList.length;
        },
        focusInvalid: function () {
          if (this.settings.focusInvalid)
            try {
              t(
                this.findLastActive() ||
                  (this.errorList.length && this.errorList[0].element) ||
                  []
              )
                .filter(":visible")
                .trigger("focus")
                .trigger("focusin");
            } catch (t) {}
        },
        findLastActive: function () {
          var e = this.lastActive;
          return (
            e &&
            1 ===
              t.grep(this.errorList, function (t) {
                return t.element.name === e.name;
              }).length &&
            e
          );
        },
        elements: function () {
          var e = this,
            i = {};
          return t(this.currentForm)
            .find("input, select, textarea, [contenteditable]")
            .not(":submit, :reset, :image, :disabled")
            .not(this.settings.ignore)
            .filter(function () {
              var s = this.name || t(this).attr("name"),
                n =
                  void 0 !== t(this).attr("contenteditable") &&
                  "false" !== t(this).attr("contenteditable");
              return (
                !s &&
                  e.settings.debug &&
                  window.console &&
                  console.error("%o has no name assigned", this),
                n &&
                  ((this.form = t(this).closest("form")[0]), (this.name = s)),
                !(
                  this.form !== e.currentForm ||
                  s in i ||
                  !e.objectLength(t(this).rules()) ||
                  ((i[s] = !0), 0)
                )
              );
            });
        },
        clean: function (e) {
          return t(e)[0];
        },
        errors: function () {
          var e = this.settings.errorClass.split(" ").join(".");
          return t(this.settings.errorElement + "." + e, this.errorContext);
        },
        resetInternals: function () {
          (this.successList = []),
            (this.errorList = []),
            (this.errorMap = {}),
            (this.toShow = t([])),
            (this.toHide = t([]));
        },
        reset: function () {
          this.resetInternals(), (this.currentElements = t([]));
        },
        prepareForm: function () {
          this.reset(), (this.toHide = this.errors().add(this.containers));
        },
        prepareElement: function (t) {
          this.reset(), (this.toHide = this.errorsFor(t));
        },
        elementValue: function (e) {
          var i,
            s,
            n = t(e),
            r = e.type,
            a =
              void 0 !== n.attr("contenteditable") &&
              "false" !== n.attr("contenteditable");
          return "radio" === r || "checkbox" === r
            ? this.findByName(e.name).filter(":checked").val()
            : "number" === r && void 0 !== e.validity
            ? e.validity.badInput
              ? "NaN"
              : n.val()
            : ((i = a ? n.text() : n.val()),
              "file" === r
                ? "C:\\fakepath\\" === i.substr(0, 12)
                  ? i.substr(12)
                  : (s = i.lastIndexOf("/")) >= 0
                  ? i.substr(s + 1)
                  : (s = i.lastIndexOf("\\")) >= 0
                  ? i.substr(s + 1)
                  : i
                : "string" == typeof i
                ? i.replace(/\r/g, "")
                : i);
        },
        check: function (e) {
          e = this.validationTargetFor(this.clean(e));
          var i,
            s,
            n,
            r,
            a = t(e).rules(),
            o = t.map(a, function (t, e) {
              return e;
            }).length,
            l = !1,
            h = this.elementValue(e);
          for (s in ("function" == typeof a.normalizer
            ? (r = a.normalizer)
            : "function" == typeof this.settings.normalizer &&
              (r = this.settings.normalizer),
          r && ((h = r.call(e, h)), delete a.normalizer),
          a)) {
            n = { method: s, parameters: a[s] };
            try {
              if (
                "dependency-mismatch" ===
                  (i = t.validator.methods[s].call(this, h, e, n.parameters)) &&
                1 === o
              ) {
                l = !0;
                continue;
              }
              if (((l = !1), "pending" === i))
                return void (this.toHide = this.toHide.not(this.errorsFor(e)));
              if (!i) return this.formatAndAdd(e, n), !1;
            } catch (t) {
              throw (
                (this.settings.debug &&
                  window.console &&
                  console.log(
                    "Exception occurred when checking element " +
                      e.id +
                      ", check the '" +
                      n.method +
                      "' method.",
                    t
                  ),
                t instanceof TypeError &&
                  (t.message +=
                    ".  Exception occurred when checking element " +
                    e.id +
                    ", check the '" +
                    n.method +
                    "' method."),
                t)
              );
            }
          }
          if (!l) return this.objectLength(a) && this.successList.push(e), !0;
        },
        customDataMessage: function (e, i) {
          return (
            t(e).data(
              "msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()
            ) || t(e).data("msg")
          );
        },
        customMessage: function (t, e) {
          var i = this.settings.messages[t];
          return i && (i.constructor === String ? i : i[e]);
        },
        findDefined: function () {
          for (var t = 0; t < arguments.length; t++)
            if (void 0 !== arguments[t]) return arguments[t];
        },
        defaultMessage: function (e, i) {
          "string" == typeof i && (i = { method: i });
          var s = this.findDefined(
              this.customMessage(e.name, i.method),
              this.customDataMessage(e, i.method),
              (!this.settings.ignoreTitle && e.title) || void 0,
              t.validator.messages[i.method],
              "<strong>Warning: No message defined for " + e.name + "</strong>"
            ),
            n = /\$?\{(\d+)\}/g;
          return (
            "function" == typeof s
              ? (s = s.call(this, i.parameters, e))
              : n.test(s) &&
                (s = t.validator.format(s.replace(n, "{$1}"), i.parameters)),
            s
          );
        },
        formatAndAdd: function (t, e) {
          var i = this.defaultMessage(t, e);
          this.errorList.push({ message: i, element: t, method: e.method }),
            (this.errorMap[t.name] = i),
            (this.submitted[t.name] = i);
        },
        addWrapper: function (t) {
          return (
            this.settings.wrapper &&
              (t = t.add(t.parent(this.settings.wrapper))),
            t
          );
        },
        defaultShowErrors: function () {
          var t, e, i;
          for (t = 0; this.errorList[t]; t++)
            (i = this.errorList[t]),
              this.settings.highlight &&
                this.settings.highlight.call(
                  this,
                  i.element,
                  this.settings.errorClass,
                  this.settings.validClass
                ),
              this.showLabel(i.element, i.message);
          if (
            (this.errorList.length &&
              (this.toShow = this.toShow.add(this.containers)),
            this.settings.success)
          )
            for (t = 0; this.successList[t]; t++)
              this.showLabel(this.successList[t]);
          if (this.settings.unhighlight)
            for (t = 0, e = this.validElements(); e[t]; t++)
              this.settings.unhighlight.call(
                this,
                e[t],
                this.settings.errorClass,
                this.settings.validClass
              );
          (this.toHide = this.toHide.not(this.toShow)),
            this.hideErrors(),
            this.addWrapper(this.toShow).show();
        },
        validElements: function () {
          return this.currentElements.not(this.invalidElements());
        },
        invalidElements: function () {
          return t(this.errorList).map(function () {
            return this.element;
          });
        },
        showLabel: function (e, i) {
          var s,
            n,
            r,
            a,
            o = this.errorsFor(e),
            l = this.idOrName(e),
            h = t(e).attr("aria-describedby");
          o.length
            ? (o
                .removeClass(this.settings.validClass)
                .addClass(this.settings.errorClass),
              o.html(i))
            : ((s = o =
                t("<" + this.settings.errorElement + ">")
                  .attr("id", l + "-error")
                  .addClass(this.settings.errorClass)
                  .html(i || "")),
              this.settings.wrapper &&
                (s = o
                  .hide()
                  .show()
                  .wrap("<" + this.settings.wrapper + "/>")
                  .parent()),
              this.labelContainer.length
                ? this.labelContainer.append(s)
                : this.settings.errorPlacement
                ? this.settings.errorPlacement.call(this, s, t(e))
                : s.insertAfter(e),
              o.is("label")
                ? o.attr("for", l)
                : 0 ===
                    o.parents("label[for='" + this.escapeCssMeta(l) + "']")
                      .length &&
                  ((r = o.attr("id")),
                  h
                    ? h.match(
                        new RegExp("\\b" + this.escapeCssMeta(r) + "\\b")
                      ) || (h += " " + r)
                    : (h = r),
                  t(e).attr("aria-describedby", h),
                  (n = this.groups[e.name]) &&
                    ((a = this),
                    t.each(a.groups, function (e, i) {
                      i === n &&
                        t(
                          "[name='" + a.escapeCssMeta(e) + "']",
                          a.currentForm
                        ).attr("aria-describedby", o.attr("id"));
                    })))),
            !i &&
              this.settings.success &&
              (o.text(""),
              "string" == typeof this.settings.success
                ? o.addClass(this.settings.success)
                : this.settings.success(o, e)),
            (this.toShow = this.toShow.add(o));
        },
        errorsFor: function (e) {
          var i = this.escapeCssMeta(this.idOrName(e)),
            s = t(e).attr("aria-describedby"),
            n = "label[for='" + i + "'], label[for='" + i + "'] *";
          return (
            s && (n = n + ", #" + this.escapeCssMeta(s).replace(/\s+/g, ", #")),
            this.errors().filter(n)
          );
        },
        escapeCssMeta: function (t) {
          return t.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1");
        },
        idOrName: function (t) {
          return (
            this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
          );
        },
        validationTargetFor: function (e) {
          return (
            this.checkable(e) && (e = this.findByName(e.name)),
            t(e).not(this.settings.ignore)[0]
          );
        },
        checkable: function (t) {
          return /radio|checkbox/i.test(t.type);
        },
        findByName: function (e) {
          return t(this.currentForm).find(
            "[name='" + this.escapeCssMeta(e) + "']"
          );
        },
        getLength: function (e, i) {
          switch (i.nodeName.toLowerCase()) {
            case "select":
              return t("option:selected", i).length;
            case "input":
              if (this.checkable(i))
                return this.findByName(i.name).filter(":checked").length;
          }
          return e.length;
        },
        depend: function (t, e) {
          return (
            !this.dependTypes[typeof t] || this.dependTypes[typeof t](t, e)
          );
        },
        dependTypes: {
          boolean: function (t) {
            return t;
          },
          string: function (e, i) {
            return !!t(e, i.form).length;
          },
          function: function (t, e) {
            return t(e);
          },
        },
        optional: function (e) {
          var i = this.elementValue(e);
          return (
            !t.validator.methods.required.call(this, i, e) &&
            "dependency-mismatch"
          );
        },
        startRequest: function (e) {
          this.pending[e.name] ||
            (this.pendingRequest++,
            t(e).addClass(this.settings.pendingClass),
            (this.pending[e.name] = !0));
        },
        stopRequest: function (e, i) {
          this.pendingRequest--,
            this.pendingRequest < 0 && (this.pendingRequest = 0),
            delete this.pending[e.name],
            t(e).removeClass(this.settings.pendingClass),
            i && 0 === this.pendingRequest && this.formSubmitted && this.form()
              ? (t(this.currentForm).submit(),
                this.submitButton &&
                  t(
                    "input:hidden[name='" + this.submitButton.name + "']",
                    this.currentForm
                  ).remove(),
                (this.formSubmitted = !1))
              : !i &&
                0 === this.pendingRequest &&
                this.formSubmitted &&
                (t(this.currentForm).triggerHandler("invalid-form", [this]),
                (this.formSubmitted = !1));
        },
        previousValue: function (e, i) {
          return (
            (i = ("string" == typeof i && i) || "remote"),
            t.data(e, "previousValue") ||
              t.data(e, "previousValue", {
                old: null,
                valid: !0,
                message: this.defaultMessage(e, { method: i }),
              })
          );
        },
        destroy: function () {
          this.resetForm(),
            t(this.currentForm)
              .off(".validate")
              .removeData("validator")
              .find(".validate-equalTo-blur")
              .off(".validate-equalTo")
              .removeClass("validate-equalTo-blur")
              .find(".validate-lessThan-blur")
              .off(".validate-lessThan")
              .removeClass("validate-lessThan-blur")
              .find(".validate-lessThanEqual-blur")
              .off(".validate-lessThanEqual")
              .removeClass("validate-lessThanEqual-blur")
              .find(".validate-greaterThanEqual-blur")
              .off(".validate-greaterThanEqual")
              .removeClass("validate-greaterThanEqual-blur")
              .find(".validate-greaterThan-blur")
              .off(".validate-greaterThan")
              .removeClass("validate-greaterThan-blur");
        },
      },
      classRuleSettings: {
        required: { required: !0 },
        email: { email: !0 },
        url: { url: !0 },
        date: { date: !0 },
        dateISO: { dateISO: !0 },
        number: { number: !0 },
        digits: { digits: !0 },
        creditcard: { creditcard: !0 },
      },
      addClassRules: function (e, i) {
        e.constructor === String
          ? (this.classRuleSettings[e] = i)
          : t.extend(this.classRuleSettings, e);
      },
      classRules: function (e) {
        var i = {},
          s = t(e).attr("class");
        return (
          s &&
            t.each(s.split(" "), function () {
              this in t.validator.classRuleSettings &&
                t.extend(i, t.validator.classRuleSettings[this]);
            }),
          i
        );
      },
      normalizeAttributeRule: function (t, e, i, s) {
        /min|max|step/.test(i) &&
          (null === e || /number|range|text/.test(e)) &&
          ((s = Number(s)), isNaN(s) && (s = void 0)),
          s || 0 === s ? (t[i] = s) : e === i && "range" !== e && (t[i] = !0);
      },
      attributeRules: function (e) {
        var i,
          s,
          n = {},
          r = t(e),
          a = e.getAttribute("type");
        for (i in t.validator.methods)
          "required" === i
            ? ("" === (s = e.getAttribute(i)) && (s = !0), (s = !!s))
            : (s = r.attr(i)),
            this.normalizeAttributeRule(n, a, i, s);
        return (
          n.maxlength &&
            /-1|2147483647|524288/.test(n.maxlength) &&
            delete n.maxlength,
          n
        );
      },
      dataRules: function (e) {
        var i,
          s,
          n = {},
          r = t(e),
          a = e.getAttribute("type");
        for (i in t.validator.methods)
          "" ===
            (s = r.data(
              "rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()
            )) && (s = !0),
            this.normalizeAttributeRule(n, a, i, s);
        return n;
      },
      staticRules: function (e) {
        var i = {},
          s = t.data(e.form, "validator");
        return (
          s.settings.rules &&
            (i = t.validator.normalizeRule(s.settings.rules[e.name]) || {}),
          i
        );
      },
      normalizeRules: function (e, i) {
        return (
          t.each(e, function (s, n) {
            if (!1 !== n) {
              if (n.param || n.depends) {
                var r = !0;
                switch (typeof n.depends) {
                  case "string":
                    r = !!t(n.depends, i.form).length;
                    break;
                  case "function":
                    r = n.depends.call(i, i);
                }
                r
                  ? (e[s] = void 0 === n.param || n.param)
                  : (t.data(i.form, "validator").resetElements(t(i)),
                    delete e[s]);
              }
            } else delete e[s];
          }),
          t.each(e, function (t, s) {
            e[t] = "function" == typeof s && "normalizer" !== t ? s(i) : s;
          }),
          t.each(["minlength", "maxlength"], function () {
            e[this] && (e[this] = Number(e[this]));
          }),
          t.each(["rangelength", "range"], function () {
            var t;
            e[this] &&
              (Array.isArray(e[this])
                ? (e[this] = [Number(e[this][0]), Number(e[this][1])])
                : "string" == typeof e[this] &&
                  ((t = e[this].replace(/[\[\]]/g, "").split(/[\s,]+/)),
                  (e[this] = [Number(t[0]), Number(t[1])])));
          }),
          t.validator.autoCreateRanges &&
            (null != e.min &&
              null != e.max &&
              ((e.range = [e.min, e.max]), delete e.min, delete e.max),
            null != e.minlength &&
              null != e.maxlength &&
              ((e.rangelength = [e.minlength, e.maxlength]),
              delete e.minlength,
              delete e.maxlength)),
          e
        );
      },
      normalizeRule: function (e) {
        if ("string" == typeof e) {
          var i = {};
          t.each(e.split(/\s/), function () {
            i[this] = !0;
          }),
            (e = i);
        }
        return e;
      },
      addMethod: function (e, i, s) {
        (t.validator.methods[e] = i),
          (t.validator.messages[e] =
            void 0 !== s ? s : t.validator.messages[e]),
          i.length < 3 &&
            t.validator.addClassRules(e, t.validator.normalizeRule(e));
      },
      methods: {
        required: function (e, i, s) {
          if (!this.depend(s, i)) return "dependency-mismatch";
          if ("select" === i.nodeName.toLowerCase()) {
            var n = t(i).val();
            return n && n.length > 0;
          }
          return this.checkable(i)
            ? this.getLength(e, i) > 0
            : null != e && e.length > 0;
        },
        email: function (t, e) {
          return (
            this.optional(e) ||
            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
              t
            )
          );
        },
        url: function (t, e) {
          return (
            this.optional(e) ||
            /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(
              t
            )
          );
        },
        date: (function () {
          var t = !1;
          return function (e, i) {
            return (
              t ||
                ((t = !0),
                this.settings.debug &&
                  window.console &&
                  console.warn(
                    "The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`."
                  )),
              this.optional(i) || !/Invalid|NaN/.test(new Date(e).toString())
            );
          };
        })(),
        dateISO: function (t, e) {
          return (
            this.optional(e) ||
            /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(
              t
            )
          );
        },
        number: function (t, e) {
          return (
            this.optional(e) ||
            /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
          );
        },
        digits: function (t, e) {
          return this.optional(e) || /^\d+$/.test(t);
        },
        minlength: function (t, e, i) {
          var s = Array.isArray(t) ? t.length : this.getLength(t, e);
          return this.optional(e) || s >= i;
        },
        maxlength: function (t, e, i) {
          var s = Array.isArray(t) ? t.length : this.getLength(t, e);
          return this.optional(e) || s <= i;
        },
        rangelength: function (t, e, i) {
          var s = Array.isArray(t) ? t.length : this.getLength(t, e);
          return this.optional(e) || (s >= i[0] && s <= i[1]);
        },
        min: function (t, e, i) {
          return this.optional(e) || t >= i;
        },
        max: function (t, e, i) {
          return this.optional(e) || t <= i;
        },
        range: function (t, e, i) {
          return this.optional(e) || (t >= i[0] && t <= i[1]);
        },
        step: function (e, i, s) {
          var n,
            r = t(i).attr("type"),
            a = "Step attribute on input type " + r + " is not supported.",
            o = new RegExp("\\b" + r + "\\b"),
            l = function (t) {
              var e = ("" + t).match(/(?:\.(\d+))?$/);
              return e && e[1] ? e[1].length : 0;
            },
            h = function (t) {
              return Math.round(t * Math.pow(10, n));
            },
            d = !0;
          if (r && !o.test(["text", "number", "range"].join()))
            throw new Error(a);
          return (
            (n = l(s)),
            (l(e) > n || h(e) % h(s) != 0) && (d = !1),
            this.optional(i) || d
          );
        },
        equalTo: function (e, i, s) {
          var n = t(s);
          return (
            this.settings.onfocusout &&
              n.not(".validate-equalTo-blur").length &&
              n
                .addClass("validate-equalTo-blur")
                .on("blur.validate-equalTo", function () {
                  t(i).valid();
                }),
            e === n.val()
          );
        },
        remote: function (e, i, s, n) {
          if (this.optional(i)) return "dependency-mismatch";
          n = ("string" == typeof n && n) || "remote";
          var r,
            a,
            o,
            l = this.previousValue(i, n);
          return (
            this.settings.messages[i.name] ||
              (this.settings.messages[i.name] = {}),
            (l.originalMessage =
              l.originalMessage || this.settings.messages[i.name][n]),
            (this.settings.messages[i.name][n] = l.message),
            (s = ("string" == typeof s && { url: s }) || s),
            (o = t.param(t.extend({ data: e }, s.data))),
            l.old === o
              ? l.valid
              : ((l.old = o),
                (r = this),
                this.startRequest(i),
                ((a = {})[i.name] = e),
                t.ajax(
                  t.extend(
                    !0,
                    {
                      mode: "abort",
                      port: "validate" + i.name,
                      dataType: "json",
                      data: a,
                      context: r.currentForm,
                      success: function (t) {
                        var s,
                          a,
                          o,
                          h = !0 === t || "true" === t;
                        (r.settings.messages[i.name][n] = l.originalMessage),
                          h
                            ? ((o = r.formSubmitted),
                              r.resetInternals(),
                              (r.toHide = r.errorsFor(i)),
                              (r.formSubmitted = o),
                              r.successList.push(i),
                              (r.invalid[i.name] = !1),
                              r.showErrors())
                            : ((s = {}),
                              (a =
                                t ||
                                r.defaultMessage(i, {
                                  method: n,
                                  parameters: e,
                                })),
                              (s[i.name] = l.message = a),
                              (r.invalid[i.name] = !0),
                              r.showErrors(s)),
                          (l.valid = h),
                          r.stopRequest(i, h);
                      },
                    },
                    s
                  )
                ),
                "pending")
          );
        },
      },
    });
  var i,
    s = {};
  return (
    t.ajaxPrefilter
      ? t.ajaxPrefilter(function (t, e, i) {
          var n = t.port;
          "abort" === t.mode && (s[n] && s[n].abort(), (s[n] = i));
        })
      : ((i = t.ajax),
        (t.ajax = function (e) {
          var n = ("mode" in e ? e : t.ajaxSettings).mode,
            r = ("port" in e ? e : t.ajaxSettings).port;
          return "abort" === n
            ? (s[r] && s[r].abort(), (s[r] = i.apply(this, arguments)), s[r])
            : i.apply(this, arguments);
        })),
    t
  );
});
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(
        ((t =
          "undefined" != typeof globalThis
            ? globalThis
            : t || self).noUiSlider = {})
      );
})(this, function (t) {
  "use strict";
  function e(t) {
    return "object" == typeof t && "function" == typeof t.to;
  }
  function r(t) {
    t.parentElement.removeChild(t);
  }
  function n(t) {
    return null != t;
  }
  function i(t) {
    t.preventDefault();
  }
  function o(t) {
    return "number" == typeof t && !isNaN(t) && isFinite(t);
  }
  function s(t, e, r) {
    0 < r &&
      (c(t, e),
      setTimeout(function () {
        p(t, e);
      }, r));
  }
  function a(t) {
    return Math.max(Math.min(t, 100), 0);
  }
  function l(t) {
    return Array.isArray(t) ? t : [t];
  }
  function u(t) {
    return 1 < (t = (t = String(t)).split(".")).length ? t[1].length : 0;
  }
  function c(t, e) {
    t.classList && !/\s/.test(e)
      ? t.classList.add(e)
      : (t.className += " " + e);
  }
  function p(t, e) {
    t.classList && !/\s/.test(e)
      ? t.classList.remove(e)
      : (t.className = t.className.replace(
          new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"),
          " "
        ));
  }
  function f(t) {
    var e = void 0 !== window.pageXOffset,
      r = "CSS1Compat" === (t.compatMode || "");
    return {
      x: e ? window.pageXOffset : (r ? t.documentElement : t.body).scrollLeft,
      y: e ? window.pageYOffset : (r ? t.documentElement : t.body).scrollTop,
    };
  }
  function d(t, e) {
    return 100 / (e - t);
  }
  function h(t, e, r) {
    return (100 * e) / (t[r + 1] - t[r]);
  }
  function m(t, e) {
    for (var r = 1; t >= e[r]; ) r += 1;
    return r;
  }
  (t.PipsMode = void 0),
    ((G = t.PipsMode || (t.PipsMode = {})).Range = "range"),
    (G.Steps = "steps"),
    (G.Positions = "positions"),
    (G.Count = "count"),
    (G.Values = "values"),
    (t.PipsType = void 0),
    ((G = t.PipsType || (t.PipsType = {}))[(G.None = -1)] = "None"),
    (G[(G.NoValue = 0)] = "NoValue"),
    (G[(G.LargeValue = 1)] = "LargeValue"),
    (G[(G.SmallValue = 2)] = "SmallValue");
  var g =
    ((v.prototype.getDistance = function (t) {
      for (var e = [], r = 0; r < this.xNumSteps.length - 1; r++) {
        var n = this.xNumSteps[r];
        if (n && (t / n) % 1 != 0)
          throw new Error(
            "noUiSlider: 'limit', 'margin' and 'padding' of " +
              this.xPct[r] +
              "% range must be divisible by step."
          );
        e[r] = h(this.xVal, t, r);
      }
      return e;
    }),
    (v.prototype.getAbsoluteDistance = function (t, e, r) {
      var n = 0;
      if (t < this.xPct[this.xPct.length - 1])
        for (; t > this.xPct[n + 1]; ) n++;
      else t === this.xPct[this.xPct.length - 1] && (n = this.xPct.length - 2);
      r || t !== this.xPct[n + 1] || n++;
      for (
        var i,
          o = 1,
          s = (e = null === e ? [] : e)[n],
          a = 0,
          l = 0,
          u = 0,
          c = r
            ? (t - this.xPct[n]) / (this.xPct[n + 1] - this.xPct[n])
            : (this.xPct[n + 1] - t) / (this.xPct[n + 1] - this.xPct[n]);
        0 < s;

      )
        (i = this.xPct[n + 1 + u] - this.xPct[n + u]),
          100 < e[n + u] * o + 100 - 100 * c
            ? ((a = i * c), (o = (s - 100 * c) / e[n + u]), (c = 1))
            : ((a = ((e[n + u] * i) / 100) * o), (o = 0)),
          r
            ? ((l -= a), 1 <= this.xPct.length + u && u--)
            : ((l += a), 1 <= this.xPct.length - u && u++),
          (s = e[n + u] * o);
      return t + l;
    }),
    (v.prototype.toStepping = function (t) {
      return (function (t, e, r) {
        if (r >= t.slice(-1)[0]) return 100;
        var n = t[(o = m(r, t)) - 1],
          i = t[o],
          o = ((t = e[o - 1]), e[o]);
        return (
          t +
          ((r = r),
          h((i = [n, i]), i[0] < 0 ? r + Math.abs(i[0]) : r - i[0], 0) /
            d(t, o))
        );
      })(this.xVal, this.xPct, t);
    }),
    (v.prototype.fromStepping = function (t) {
      return (function (t, e, r) {
        if (100 <= r) return t.slice(-1)[0];
        var n,
          i = t[(n = m(r, e)) - 1],
          o = t[n];
        return (
          ((r - (t = e[n - 1])) * d(t, (n = e[n])) * ((o = [i, o])[1] - o[0])) /
            100 +
          o[0]
        );
      })(this.xVal, this.xPct, t);
    }),
    (v.prototype.getStep = function (t) {
      return (function (t, e, r, n) {
        if (100 === n) return n;
        var i = m(n, t),
          o = t[i - 1],
          s = t[i];
        return r
          ? (s - o) / 2 < n - o
            ? s
            : o
          : e[i - 1]
          ? t[i - 1] +
            ((t = n - t[i - 1]), (i = e[i - 1]), Math.round(t / i) * i)
          : n;
      })(this.xPct, this.xSteps, this.snap, t);
    }),
    (v.prototype.getDefaultStep = function (t, e, r) {
      var n = m(t, this.xPct);
      return (
        (100 === t || (e && t === this.xPct[n - 1])) &&
          (n = Math.max(n - 1, 1)),
        (this.xVal[n] - this.xVal[n - 1]) / r
      );
    }),
    (v.prototype.getNearbySteps = function (t) {
      return (
        (t = m(t, this.xPct)),
        {
          stepBefore: {
            startValue: this.xVal[t - 2],
            step: this.xNumSteps[t - 2],
            highestStep: this.xHighestCompleteStep[t - 2],
          },
          thisStep: {
            startValue: this.xVal[t - 1],
            step: this.xNumSteps[t - 1],
            highestStep: this.xHighestCompleteStep[t - 1],
          },
          stepAfter: {
            startValue: this.xVal[t],
            step: this.xNumSteps[t],
            highestStep: this.xHighestCompleteStep[t],
          },
        }
      );
    }),
    (v.prototype.countStepDecimals = function () {
      var t = this.xNumSteps.map(u);
      return Math.max.apply(null, t);
    }),
    (v.prototype.hasNoSize = function () {
      return this.xVal[0] === this.xVal[this.xVal.length - 1];
    }),
    (v.prototype.convert = function (t) {
      return this.getStep(this.toStepping(t));
    }),
    (v.prototype.handleEntryPoint = function (t, e) {
      if (
        !o((t = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t))) ||
        !o(e[0])
      )
        throw new Error("noUiSlider: 'range' value isn't numeric.");
      this.xPct.push(t),
        this.xVal.push(e[0]),
        (e = Number(e[1])),
        t ? this.xSteps.push(!isNaN(e) && e) : isNaN(e) || (this.xSteps[0] = e),
        this.xHighestCompleteStep.push(0);
    }),
    (v.prototype.handleStepPoint = function (t, e) {
      e &&
        (this.xVal[t] !== this.xVal[t + 1]
          ? ((this.xSteps[t] =
              h([this.xVal[t], this.xVal[t + 1]], e, 0) /
              d(this.xPct[t], this.xPct[t + 1])),
            (e = (this.xVal[t + 1] - this.xVal[t]) / this.xNumSteps[t]),
            (e = Math.ceil(Number(e.toFixed(3)) - 1)),
            (e = this.xVal[t] + this.xNumSteps[t] * e),
            (this.xHighestCompleteStep[t] = e))
          : (this.xSteps[t] = this.xHighestCompleteStep[t] = this.xVal[t]));
    }),
    v);
  function v(t, e, r) {
    var n;
    (this.xPct = []),
      (this.xVal = []),
      (this.xSteps = []),
      (this.xNumSteps = []),
      (this.xHighestCompleteStep = []),
      (this.xSteps = [r || !1]),
      (this.xNumSteps = [!1]),
      (this.snap = e);
    var i = [];
    for (
      Object.keys(t).forEach(function (e) {
        i.push([l(t[e]), e]);
      }),
        i.sort(function (t, e) {
          return t[0][0] - e[0][0];
        }),
        n = 0;
      n < i.length;
      n++
    )
      this.handleEntryPoint(i[n][1], i[n][0]);
    for (
      this.xNumSteps = this.xSteps.slice(0), n = 0;
      n < this.xNumSteps.length;
      n++
    )
      this.handleStepPoint(n, this.xNumSteps[n]);
  }
  var b = {
      to: function (t) {
        return void 0 === t ? "" : t.toFixed(2);
      },
      from: Number,
    },
    S = {
      target: "target",
      base: "base",
      origin: "origin",
      handle: "handle",
      handleLower: "handle-lower",
      handleUpper: "handle-upper",
      touchArea: "touch-area",
      horizontal: "horizontal",
      vertical: "vertical",
      background: "background",
      connect: "connect",
      connects: "connects",
      ltr: "ltr",
      rtl: "rtl",
      textDirectionLtr: "txt-dir-ltr",
      textDirectionRtl: "txt-dir-rtl",
      draggable: "draggable",
      drag: "state-drag",
      tap: "state-tap",
      active: "active",
      tooltip: "tooltip",
      pips: "pips",
      pipsHorizontal: "pips-horizontal",
      pipsVertical: "pips-vertical",
      marker: "marker",
      markerHorizontal: "marker-horizontal",
      markerVertical: "marker-vertical",
      markerNormal: "marker-normal",
      markerLarge: "marker-large",
      markerSub: "marker-sub",
      value: "value",
      valueHorizontal: "value-horizontal",
      valueVertical: "value-vertical",
      valueNormal: "value-normal",
      valueLarge: "value-large",
      valueSub: "value-sub",
    },
    x = ".__tooltips",
    y = ".__aria";
  function w(t, e) {
    if (!o(e)) throw new Error("noUiSlider: 'step' is not numeric.");
    t.singleStep = e;
  }
  function E(t, e) {
    if (!o(e))
      throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
    t.keyboardPageMultiplier = e;
  }
  function P(t, e) {
    if (!o(e))
      throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
    t.keyboardMultiplier = e;
  }
  function C(t, e) {
    if (!o(e))
      throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
    t.keyboardDefaultStep = e;
  }
  function N(t, e) {
    if ("object" != typeof e || Array.isArray(e))
      throw new Error("noUiSlider: 'range' is not an object.");
    if (void 0 === e.min || void 0 === e.max)
      throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
    t.spectrum = new g(e, t.snap || !1, t.singleStep);
  }
  function V(t, e) {
    if (((e = l(e)), !Array.isArray(e) || !e.length))
      throw new Error("noUiSlider: 'start' option is incorrect.");
    (t.handles = e.length), (t.start = e);
  }
  function k(t, e) {
    if ("boolean" != typeof e)
      throw new Error("noUiSlider: 'snap' option must be a boolean.");
    t.snap = e;
  }
  function M(t, e) {
    if ("boolean" != typeof e)
      throw new Error("noUiSlider: 'animate' option must be a boolean.");
    t.animate = e;
  }
  function A(t, e) {
    if ("number" != typeof e)
      throw new Error(
        "noUiSlider: 'animationDuration' option must be a number."
      );
    t.animationDuration = e;
  }
  function U(t, e) {
    var r,
      n = [!1];
    if (
      ("lower" === e ? (e = [!0, !1]) : "upper" === e && (e = [!1, !0]),
      !0 === e || !1 === e)
    ) {
      for (r = 1; r < t.handles; r++) n.push(e);
      n.push(!1);
    } else {
      if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1)
        throw new Error(
          "noUiSlider: 'connect' option doesn't match handle count."
        );
      n = e;
    }
    t.connect = n;
  }
  function D(t, e) {
    switch (e) {
      case "horizontal":
        t.ort = 0;
        break;
      case "vertical":
        t.ort = 1;
        break;
      default:
        throw new Error("noUiSlider: 'orientation' option is invalid.");
    }
  }
  function O(t, e) {
    if (!o(e)) throw new Error("noUiSlider: 'margin' option must be numeric.");
    0 !== e && (t.margin = t.spectrum.getDistance(e));
  }
  function L(t, e) {
    if (!o(e)) throw new Error("noUiSlider: 'limit' option must be numeric.");
    if (((t.limit = t.spectrum.getDistance(e)), !t.limit || t.handles < 2))
      throw new Error(
        "noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles."
      );
  }
  function T(t, e) {
    var r;
    if (!o(e) && !Array.isArray(e))
      throw new Error(
        "noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers."
      );
    if (Array.isArray(e) && 2 !== e.length && !o(e[0]) && !o(e[1]))
      throw new Error(
        "noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers."
      );
    if (0 !== e) {
      for (
        Array.isArray(e) || (e = [e, e]),
          t.padding = [
            t.spectrum.getDistance(e[0]),
            t.spectrum.getDistance(e[1]),
          ],
          r = 0;
        r < t.spectrum.xNumSteps.length - 1;
        r++
      )
        if (t.padding[0][r] < 0 || t.padding[1][r] < 0)
          throw new Error(
            "noUiSlider: 'padding' option must be a positive number(s)."
          );
      var n = e[0] + e[1];
      e = t.spectrum.xVal[0];
      if (1 < n / (t.spectrum.xVal[t.spectrum.xVal.length - 1] - e))
        throw new Error(
          "noUiSlider: 'padding' option must not exceed 100% of the range."
        );
    }
  }
  function j(t, e) {
    switch (e) {
      case "ltr":
        t.dir = 0;
        break;
      case "rtl":
        t.dir = 1;
        break;
      default:
        throw new Error("noUiSlider: 'direction' option was not recognized.");
    }
  }
  function z(t, e) {
    if ("string" != typeof e)
      throw new Error(
        "noUiSlider: 'behaviour' must be a string containing options."
      );
    var r = 0 <= e.indexOf("tap"),
      n = 0 <= e.indexOf("drag"),
      i = 0 <= e.indexOf("fixed"),
      o = 0 <= e.indexOf("snap"),
      s = 0 <= e.indexOf("hover"),
      a = 0 <= e.indexOf("unconstrained");
    e = 0 <= e.indexOf("drag-all");
    if (i) {
      if (2 !== t.handles)
        throw new Error(
          "noUiSlider: 'fixed' behaviour must be used with 2 handles"
        );
      O(t, t.start[1] - t.start[0]);
    }
    if (a && (t.margin || t.limit))
      throw new Error(
        "noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit"
      );
    t.events = {
      tap: r || o,
      drag: n,
      dragAll: e,
      fixed: i,
      snap: o,
      hover: s,
      unconstrained: a,
    };
  }
  function H(t, r) {
    if (!1 !== r)
      if (!0 === r || e(r)) {
        t.tooltips = [];
        for (var n = 0; n < t.handles; n++) t.tooltips.push(r);
      } else {
        if ((r = l(r)).length !== t.handles)
          throw new Error("noUiSlider: must pass a formatter for all handles.");
        r.forEach(function (t) {
          if ("boolean" != typeof t && !e(t))
            throw new Error(
              "noUiSlider: 'tooltips' must be passed a formatter or 'false'."
            );
        }),
          (t.tooltips = r);
      }
  }
  function F(t, e) {
    if (e.length !== t.handles)
      throw new Error("noUiSlider: must pass a attributes for all handles.");
    t.handleAttributes = e;
  }
  function R(t, r) {
    if (!e(r))
      throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
    t.ariaFormat = r;
  }
  function _(t, r) {
    if (!e((n = r)) || "function" != typeof n.from)
      throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
    var n;
    t.format = r;
  }
  function B(t, e) {
    if ("boolean" != typeof e)
      throw new Error(
        "noUiSlider: 'keyboardSupport' option must be a boolean."
      );
    t.keyboardSupport = e;
  }
  function q(t, e) {
    t.documentElement = e;
  }
  function X(t, e) {
    if ("string" != typeof e && !1 !== e)
      throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
    t.cssPrefix = e;
  }
  function Y(t, e) {
    if ("object" != typeof e)
      throw new Error("noUiSlider: 'cssClasses' must be an object.");
    "string" == typeof t.cssPrefix
      ? ((t.cssClasses = {}),
        Object.keys(e).forEach(function (r) {
          t.cssClasses[r] = t.cssPrefix + e[r];
        }))
      : (t.cssClasses = e);
  }
  function I(t) {
    var e = {
        margin: null,
        limit: null,
        padding: null,
        animate: !0,
        animationDuration: 300,
        ariaFormat: b,
        format: b,
      },
      r = {
        step: { r: !1, t: w },
        keyboardPageMultiplier: { r: !1, t: E },
        keyboardMultiplier: { r: !1, t: P },
        keyboardDefaultStep: { r: !1, t: C },
        start: { r: !0, t: V },
        connect: { r: !0, t: U },
        direction: { r: !0, t: j },
        snap: { r: !1, t: k },
        animate: { r: !1, t: M },
        animationDuration: { r: !1, t: A },
        range: { r: !0, t: N },
        orientation: { r: !1, t: D },
        margin: { r: !1, t: O },
        limit: { r: !1, t: L },
        padding: { r: !1, t: T },
        behaviour: { r: !0, t: z },
        ariaFormat: { r: !1, t: R },
        format: { r: !1, t: _ },
        tooltips: { r: !1, t: H },
        keyboardSupport: { r: !0, t: B },
        documentElement: { r: !1, t: q },
        cssPrefix: { r: !0, t: X },
        cssClasses: { r: !0, t: Y },
        handleAttributes: { r: !1, t: F },
      },
      i = {
        connect: !1,
        direction: "ltr",
        behaviour: "tap",
        orientation: "horizontal",
        keyboardSupport: !0,
        cssPrefix: "noUi-",
        cssClasses: S,
        keyboardPageMultiplier: 5,
        keyboardMultiplier: 1,
        keyboardDefaultStep: 10,
      };
    t.format && !t.ariaFormat && (t.ariaFormat = t.format),
      Object.keys(r).forEach(function (o) {
        if (n(t[o]) || void 0 !== i[o]) r[o].t(e, (n(t[o]) ? t : i)[o]);
        else if (r[o].r)
          throw new Error("noUiSlider: '" + o + "' is required.");
      }),
      (e.pips = t.pips);
    var o = void 0 !== (s = document.createElement("div")).style.msTransform,
      s = void 0 !== s.style.transform;
    return (
      (e.transformRule = s
        ? "transform"
        : o
        ? "msTransform"
        : "webkitTransform"),
      (e.style = [
        ["left", "top"],
        ["right", "bottom"],
      ][e.dir][e.ort]),
      e
    );
  }
  function W(e, o, u) {
    var d,
      h,
      m,
      g,
      v,
      b,
      S,
      w = window.navigator.pointerEnabled
        ? { start: "pointerdown", move: "pointermove", end: "pointerup" }
        : window.navigator.msPointerEnabled
        ? { start: "MSPointerDown", move: "MSPointerMove", end: "MSPointerUp" }
        : {
            start: "mousedown touchstart",
            move: "mousemove touchmove",
            end: "mouseup touchend",
          },
      E =
        window.CSS &&
        CSS.supports &&
        CSS.supports("touch-action", "none") &&
        (function () {
          var t = !1;
          try {
            var e = Object.defineProperty({}, "passive", {
              get: function () {
                t = !0;
              },
            });
            window.addEventListener("test", null, e);
          } catch (t) {}
          return t;
        })(),
      P = e,
      C = o.spectrum,
      N = [],
      V = [],
      k = [],
      M = 0,
      A = {},
      U = e.ownerDocument,
      D = o.documentElement || U.documentElement,
      O = U.body,
      L = "rtl" === U.dir || 1 === o.ort ? 0 : 100;
    function T(t, e) {
      var r = U.createElement("div");
      return e && c(r, e), t.appendChild(r), r;
    }
    function j(t, e) {
      t = T(t, o.cssClasses.origin);
      var r,
        n = T(t, o.cssClasses.handle);
      return (
        T(n, o.cssClasses.touchArea),
        n.setAttribute("data-handle", String(e)),
        o.keyboardSupport &&
          (n.setAttribute("tabindex", "0"),
          n.addEventListener("keydown", function (t) {
            return (function (t, e) {
              if (F() || R(e)) return !1;
              var r = ["Left", "Right"],
                n = ["Down", "Up"],
                i = ["PageDown", "PageUp"],
                s = ["Home", "End"];
              o.dir && !o.ort
                ? r.reverse()
                : o.ort && !o.dir && (n.reverse(), i.reverse());
              var a = t.key.replace("Arrow", ""),
                l = a === i[0],
                u = a === i[1];
              (i = a === n[0] || a === r[0] || l),
                (n = a === n[1] || a === r[1] || u),
                (r = a === s[0]),
                (s = a === s[1]);
              if (!(i || n || r || s)) return !0;
              if ((t.preventDefault(), n || i)) {
                var c = i ? 0 : 1;
                if (null === (c = dt(e)[c])) return !1;
                !1 === c &&
                  (c = C.getDefaultStep(V[e], i, o.keyboardDefaultStep)),
                  (c *=
                    u || l ? o.keyboardPageMultiplier : o.keyboardMultiplier),
                  (c = Math.max(c, 1e-7)),
                  (c *= i ? -1 : 1),
                  (c = N[e] + c);
              } else c = s ? o.spectrum.xVal[o.spectrum.xVal.length - 1] : o.spectrum.xVal[0];
              return (
                lt(e, C.toStepping(c), !0, !0),
                rt("slide", e),
                rt("update", e),
                rt("change", e),
                rt("set", e),
                !1
              );
            })(t, e);
          })),
        void 0 !== o.handleAttributes &&
          ((r = o.handleAttributes[e]),
          Object.keys(r).forEach(function (t) {
            n.setAttribute(t, r[t]);
          })),
        n.setAttribute("role", "slider"),
        n.setAttribute("aria-orientation", o.ort ? "vertical" : "horizontal"),
        0 === e
          ? c(n, o.cssClasses.handleLower)
          : e === o.handles - 1 && c(n, o.cssClasses.handleUpper),
        t
      );
    }
    function z(t, e) {
      return !!e && T(t, o.cssClasses.connect);
    }
    function H(t, e) {
      return (
        !(!o.tooltips || !o.tooltips[e]) &&
        T(t.firstChild, o.cssClasses.tooltip)
      );
    }
    function F() {
      return P.hasAttribute("disabled");
    }
    function R(t) {
      return h[t].hasAttribute("disabled");
    }
    function _() {
      v &&
        (et("update" + x),
        v.forEach(function (t) {
          t && r(t);
        }),
        (v = null));
    }
    function B() {
      _(),
        (v = h.map(H)),
        tt("update" + x, function (t, e, r) {
          v &&
            o.tooltips &&
            !1 !== v[e] &&
            ((t = t[e]),
            !0 !== o.tooltips[e] && (t = o.tooltips[e].to(r[e])),
            (v[e].innerHTML = t));
        });
    }
    function q(t, e) {
      return t.map(function (t) {
        return C.fromStepping(e ? C.getStep(t) : t);
      });
    }
    function X() {
      g && (r(g), (g = null));
    }
    function Y(e) {
      X();
      var r = (function (e) {
          var r = (function (e) {
              if (e.mode === t.PipsMode.Range || e.mode === t.PipsMode.Steps)
                return C.xVal;
              if (e.mode !== t.PipsMode.Count)
                return e.mode === t.PipsMode.Positions
                  ? q(e.values, e.stepped)
                  : e.mode === t.PipsMode.Values
                  ? e.stepped
                    ? e.values.map(function (t) {
                        return C.fromStepping(C.getStep(C.toStepping(t)));
                      })
                    : e.values
                  : [];
              if (e.values < 2)
                throw new Error(
                  "noUiSlider: 'values' (>= 2) required for mode 'count'."
                );
              for (var r = e.values - 1, n = 100 / r, i = []; r--; )
                i[r] = r * n;
              return i.push(100), q(i, e.stepped);
            })(e),
            n = {},
            i = C.xVal[0],
            o = C.xVal[C.xVal.length - 1],
            s = !1,
            a = !1,
            l = 0;
          return (
            (r = r
              .slice()
              .sort(function (t, e) {
                return t - e;
              })
              .filter(function (t) {
                return !this[t] && (this[t] = !0);
              }, {}))[0] !== i && (r.unshift(i), (s = !0)),
            r[r.length - 1] !== o && (r.push(o), (a = !0)),
            r.forEach(function (i, o) {
              i = i;
              var u,
                c,
                p,
                f,
                d,
                h,
                m,
                g,
                v = r[o + 1],
                b = e.mode === t.PipsMode.Steps,
                S = (S = b ? C.xNumSteps[o] : S) || v - i;
              for (
                void 0 === v && (v = i), S = Math.max(S, 1e-7), u = i;
                u <= v;
                u = Number((u + S).toFixed(7))
              ) {
                for (
                  h = (f = (p = C.toStepping(u)) - l) / (e.density || 1),
                    g = f / (m = Math.round(h)),
                    c = 1;
                  c <= m;
                  c += 1
                )
                  n[(d = l + c * g).toFixed(5)] = [C.fromStepping(d), 0];
                (h =
                  -1 < r.indexOf(u)
                    ? t.PipsType.LargeValue
                    : b
                    ? t.PipsType.SmallValue
                    : t.PipsType.NoValue),
                  !o && s && u !== v && (h = 0),
                  (u === v && a) || (n[p.toFixed(5)] = [u, h]),
                  (l = p);
              }
            }),
            n
          );
        })(e),
        n = e.filter;
      e = e.format || {
        to: function (t) {
          return String(Math.round(t));
        },
      };
      return (g = P.appendChild(
        (function (e, r, n) {
          var i,
            s = U.createElement("div"),
            a =
              (((i = {})[t.PipsType.None] = ""),
              (i[t.PipsType.NoValue] = o.cssClasses.valueNormal),
              (i[t.PipsType.LargeValue] = o.cssClasses.valueLarge),
              (i[t.PipsType.SmallValue] = o.cssClasses.valueSub),
              i),
            l =
              (((i = {})[t.PipsType.None] = ""),
              (i[t.PipsType.NoValue] = o.cssClasses.markerNormal),
              (i[t.PipsType.LargeValue] = o.cssClasses.markerLarge),
              (i[t.PipsType.SmallValue] = o.cssClasses.markerSub),
              i),
            u = [o.cssClasses.valueHorizontal, o.cssClasses.valueVertical],
            p = [o.cssClasses.markerHorizontal, o.cssClasses.markerVertical];
          function f(t, e) {
            var r = e === o.cssClasses.value;
            return e + " " + (r ? u : p)[o.ort] + " " + (r ? a : l)[t];
          }
          return (
            c(s, o.cssClasses.pips),
            c(
              s,
              0 === o.ort
                ? o.cssClasses.pipsHorizontal
                : o.cssClasses.pipsVertical
            ),
            Object.keys(e).forEach(function (i) {
              var a, l, u;
              (l = e[(a = i)][0]),
                (u = e[i][1]),
                (u = r ? r(l, u) : u) !== t.PipsType.None &&
                  (((i = T(s, !1)).className = f(u, o.cssClasses.marker)),
                  (i.style[o.style] = a + "%"),
                  u > t.PipsType.NoValue &&
                    (((i = T(s, !1)).className = f(u, o.cssClasses.value)),
                    i.setAttribute("data-value", String(l)),
                    (i.style[o.style] = a + "%"),
                    (i.innerHTML = String(n.to(l)))));
            }),
            s
          );
        })(r, n, e)
      ));
    }
    function W() {
      var t = d.getBoundingClientRect(),
        e = "offset" + ["Width", "Height"][o.ort];
      return 0 === o.ort ? t.width || d[e] : t.height || d[e];
    }
    function $(t, e, r, n) {
      function i(i) {
        var s,
          a = (function (t, e, r) {
            var n = 0 === t.type.indexOf("touch"),
              i = 0 === t.type.indexOf("mouse"),
              o = 0 === t.type.indexOf("pointer"),
              s = 0,
              a = 0;
            if (
              (0 === t.type.indexOf("MSPointer") && (o = !0),
              "mousedown" === t.type && !t.buttons && !t.touches)
            )
              return !1;
            if (n) {
              var l = function (e) {
                return (
                  (e = e.target) === r ||
                  r.contains(e) ||
                  (t.composed && t.composedPath().shift() === r)
                );
              };
              if ("touchstart" === t.type) {
                if (1 < (n = Array.prototype.filter.call(t.touches, l)).length)
                  return !1;
                (s = n[0].pageX), (a = n[0].pageY);
              } else {
                if (!(l = Array.prototype.find.call(t.changedTouches, l)))
                  return !1;
                (s = l.pageX), (a = l.pageY);
              }
            }
            return (
              (e = e || f(U)),
              (i || o) && ((s = t.clientX + e.x), (a = t.clientY + e.y)),
              (t.pageOffset = e),
              (t.points = [s, a]),
              (t.cursor = i || o),
              t
            );
          })(i, n.pageOffset, n.target || e);
        return (
          !!a &&
          !(F() && !n.doNotReject) &&
          ((s = P),
          (i = o.cssClasses.tap),
          !(
            (s.classList
              ? s.classList.contains(i)
              : new RegExp("\\b" + i + "\\b").test(s.className)) &&
            !n.doNotReject
          ) &&
            !(t === w.start && void 0 !== a.buttons && 1 < a.buttons) &&
            (!n.hover || !a.buttons) &&
            (E || a.preventDefault(),
            (a.calcPoint = a.points[o.ort]),
            void r(a, n)))
        );
      }
      var s = [];
      return (
        t.split(" ").forEach(function (t) {
          e.addEventListener(t, i, !!E && { passive: !0 }), s.push([t, i]);
        }),
        s
      );
    }
    function G(t) {
      var e,
        r,
        n = a(
          (n =
            (100 *
              (t -
                ((n = d),
                (e = o.ort),
                (r = n.getBoundingClientRect()),
                (n = (t = n.ownerDocument).documentElement),
                (t = f(t)),
                /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) &&
                  (t.x = 0),
                e ? r.top + t.y - n.clientTop : r.left + t.x - n.clientLeft))) /
            W())
        );
      return o.dir ? 100 - n : n;
    }
    function J(t, e) {
      "mouseout" === t.type &&
        "HTML" === t.target.nodeName &&
        null === t.relatedTarget &&
        Q(t, e);
    }
    function K(t, e) {
      if (
        -1 === navigator.appVersion.indexOf("MSIE 9") &&
        0 === t.buttons &&
        0 !== e.buttonsProperty
      )
        return Q(t, e);
      ot(
        0 < (t = (o.dir ? -1 : 1) * (t.calcPoint - e.startCalcPoint)),
        (100 * t) / e.baseSize,
        e.locations,
        e.handleNumbers,
        e.connect
      );
    }
    function Q(t, e) {
      e.handle && (p(e.handle, o.cssClasses.active), --M),
        e.listeners.forEach(function (t) {
          D.removeEventListener(t[0], t[1]);
        }),
        0 === M &&
          (p(P, o.cssClasses.drag),
          at(),
          t.cursor &&
            ((O.style.cursor = ""), O.removeEventListener("selectstart", i))),
        e.handleNumbers.forEach(function (t) {
          rt("change", t), rt("set", t), rt("end", t);
        });
    }
    function Z(t, e) {
      var r, n, s, a;
      e.handleNumbers.some(R) ||
        (1 === e.handleNumbers.length &&
          ((a = h[e.handleNumbers[0]].children[0]),
          (M += 1),
          c(a, o.cssClasses.active)),
        t.stopPropagation(),
        (n = $(w.move, D, K, {
          target: t.target,
          handle: a,
          connect: e.connect,
          listeners: (r = []),
          startCalcPoint: t.calcPoint,
          baseSize: W(),
          pageOffset: t.pageOffset,
          handleNumbers: e.handleNumbers,
          buttonsProperty: t.buttons,
          locations: V.slice(),
        })),
        (s = $(w.end, D, Q, {
          target: t.target,
          handle: a,
          listeners: r,
          doNotReject: !0,
          handleNumbers: e.handleNumbers,
        })),
        (a = $("mouseout", D, J, {
          target: t.target,
          handle: a,
          listeners: r,
          doNotReject: !0,
          handleNumbers: e.handleNumbers,
        })),
        r.push.apply(r, n.concat(s, a)),
        t.cursor &&
          ((O.style.cursor = getComputedStyle(t.target).cursor),
          1 < h.length && c(P, o.cssClasses.drag),
          O.addEventListener("selectstart", i, !1)),
        e.handleNumbers.forEach(function (t) {
          rt("start", t);
        }));
    }
    function tt(t, e) {
      (A[t] = A[t] || []),
        A[t].push(e),
        "update" === t.split(".")[0] &&
          h.forEach(function (t, e) {
            rt("update", e);
          });
    }
    function et(t) {
      var e = t && t.split(".")[0],
        r = e ? t.substring(e.length) : t;
      Object.keys(A).forEach(function (t) {
        var n = t.split(".")[0],
          i = t.substring(n.length);
        (e && e !== n) ||
          (r && r !== i) ||
          ((((n = i) !== y && n !== x) || r === i) && delete A[t]);
      });
    }
    function rt(t, e, r) {
      Object.keys(A).forEach(function (n) {
        var i = n.split(".")[0];
        t === i &&
          A[n].forEach(function (t) {
            t.call(
              ht,
              N.map(o.format.to),
              e,
              N.slice(),
              r || !1,
              V.slice(),
              ht
            );
          });
      });
    }
    function nt(t, e, r, n, i, s) {
      var l;
      return (
        1 < h.length &&
          !o.events.unconstrained &&
          (n &&
            0 < e &&
            ((l = C.getAbsoluteDistance(t[e - 1], o.margin, !1)),
            (r = Math.max(r, l))),
          i &&
            e < h.length - 1 &&
            ((l = C.getAbsoluteDistance(t[e + 1], o.margin, !0)),
            (r = Math.min(r, l)))),
        1 < h.length &&
          o.limit &&
          (n &&
            0 < e &&
            ((l = C.getAbsoluteDistance(t[e - 1], o.limit, !1)),
            (r = Math.min(r, l))),
          i &&
            e < h.length - 1 &&
            ((l = C.getAbsoluteDistance(t[e + 1], o.limit, !0)),
            (r = Math.max(r, l)))),
        o.padding &&
          (0 === e &&
            ((l = C.getAbsoluteDistance(0, o.padding[0], !1)),
            (r = Math.max(r, l))),
          e === h.length - 1 &&
            ((l = C.getAbsoluteDistance(100, o.padding[1], !0)),
            (r = Math.min(r, l)))),
        !((r = a((r = C.getStep(r)))) === t[e] && !s) && r
      );
    }
    function it(t, e) {
      var r = o.ort;
      return (r ? e : t) + ", " + (r ? t : e);
    }
    function ot(t, e, r, n, i) {
      var o = r.slice(),
        s = n[0],
        a = [!t, t],
        l = [t, !t];
      (n = n.slice()),
        t && n.reverse(),
        1 < n.length
          ? n.forEach(function (t, r) {
              !1 === (r = nt(o, t, o[t] + e, a[r], l[r], !1))
                ? (e = 0)
                : ((e = r - o[t]), (o[t] = r));
            })
          : (a = l = [!0]);
      var u = !1;
      n.forEach(function (t, n) {
        u = lt(t, r[t] + e, a[n], l[n]) || u;
      }),
        u &&
          (n.forEach(function (t) {
            rt("update", t), rt("slide", t);
          }),
          null != i && rt("drag", s));
    }
    function st(t, e) {
      return o.dir ? 100 - t - e : t;
    }
    function at() {
      k.forEach(function (t) {
        var e = 50 < V[t] ? -1 : 1;
        e = 3 + (h.length + e * t);
        h[t].style.zIndex = String(e);
      });
    }
    function lt(t, e, r, n, i) {
      return (
        !1 !== (e = i ? e : nt(V, t, e, r, n, !1)) &&
        ((e = e),
        (V[(t = t)] = e),
        (N[t] = C.fromStepping(e)),
        (e = "translate(" + it(10 * (st(e, 0) - L) + "%", "0") + ")"),
        (h[t].style[o.transformRule] = e),
        ut(t),
        ut(t + 1),
        !0)
      );
    }
    function ut(t) {
      var e, r;
      m[t] &&
        ((r = 100),
        (e =
          "translate(" +
          it(
            st(
              (e = (e = 0) !== t ? V[t - 1] : e),
              (r = (r = t !== m.length - 1 ? V[t] : r) - e)
            ) + "%",
            "0"
          ) +
          ")"),
        (r = "scale(" + it(r / 100, "1") + ")"),
        (m[t].style[o.transformRule] = e + " " + r));
    }
    function ct(t, e) {
      return null === t || !1 === t || void 0 === t
        ? V[e]
        : ("number" == typeof t && (t = String(t)),
          !1 === (t = !1 !== (t = o.format.from(t)) ? C.toStepping(t) : t) ||
          isNaN(t)
            ? V[e]
            : t);
    }
    function pt(t, e, r) {
      var n = l(t);
      t = void 0 === V[0];
      (e = void 0 === e || e),
        o.animate && !t && s(P, o.cssClasses.tap, o.animationDuration),
        k.forEach(function (t) {
          lt(t, ct(n[t], t), !0, !1, r);
        });
      var i,
        a = 1 === k.length ? 0 : 1;
      for (
        t &&
        C.hasNoSize() &&
        ((r = !0),
        (V[0] = 0),
        1 < k.length &&
          ((i = 100 / (k.length - 1)),
          k.forEach(function (t) {
            V[t] = t * i;
          })));
        a < k.length;
        ++a
      )
        k.forEach(function (t) {
          lt(t, V[t], !0, !0, r);
        });
      at(),
        k.forEach(function (t) {
          rt("update", t), null !== n[t] && e && rt("set", t);
        });
    }
    function ft(t) {
      return (t = void 0 !== t && t)
        ? 1 === N.length
          ? N[0]
          : N.slice(0)
        : 1 === (t = N.map(o.format.to)).length
        ? t[0]
        : t;
    }
    function dt(t) {
      var e = V[t],
        r = C.getNearbySteps(e),
        n = N[t],
        i = r.thisStep.step;
      t = null;
      return o.snap
        ? [
            n - r.stepBefore.startValue || null,
            r.stepAfter.startValue - n || null,
          ]
        : (!1 !== i &&
            n + i > r.stepAfter.startValue &&
            (i = r.stepAfter.startValue - n),
          (t =
            n > r.thisStep.startValue
              ? r.thisStep.step
              : !1 !== r.stepBefore.step && n - r.stepBefore.highestStep),
          100 === e ? (i = null) : 0 === e && (t = null),
          (e = C.countStepDecimals()),
          null !== i && !1 !== i && (i = Number(i.toFixed(e))),
          [(t = null !== t && !1 !== t ? Number(t.toFixed(e)) : t), i]);
    }
    c((b = P), o.cssClasses.target),
      0 === o.dir ? c(b, o.cssClasses.ltr) : c(b, o.cssClasses.rtl),
      0 === o.ort ? c(b, o.cssClasses.horizontal) : c(b, o.cssClasses.vertical),
      c(
        b,
        "rtl" === getComputedStyle(b).direction
          ? o.cssClasses.textDirectionRtl
          : o.cssClasses.textDirectionLtr
      ),
      (d = T(b, o.cssClasses.base)),
      (function (t, e) {
        var r = T(e, o.cssClasses.connects);
        (h = []), (m = []).push(z(r, t[0]));
        for (var n = 0; n < o.handles; n++)
          h.push(j(e, n)), (k[n] = n), m.push(z(r, t[n + 1]));
      })(o.connect, d),
      (S = o.events).fixed ||
        h.forEach(function (t, e) {
          $(w.start, t.children[0], Z, { handleNumbers: [e] });
        }),
      S.tap &&
        $(
          w.start,
          d,
          function (t) {
            t.stopPropagation();
            var e,
              r,
              n,
              i = G(t.calcPoint),
              a =
                ((e = i),
                (n = !(r = 100)),
                h.forEach(function (t, i) {
                  var o, s;
                  R(i) ||
                    ((o = V[i]),
                    ((s = Math.abs(o - e)) < r ||
                      (s <= r && o < e) ||
                      (100 === s && 100 === r)) &&
                      ((n = i), (r = s)));
                }),
                n);
            !1 !== a &&
              (o.events.snap || s(P, o.cssClasses.tap, o.animationDuration),
              lt(a, i, !0, !0),
              at(),
              rt("slide", a, !0),
              rt("update", a, !0),
              o.events.snap
                ? Z(t, { handleNumbers: [a] })
                : (rt("change", a, !0), rt("set", a, !0)));
          },
          {}
        ),
      S.hover &&
        $(
          w.move,
          d,
          function (t) {
            (t = G(t.calcPoint)), (t = C.getStep(t));
            var e = C.fromStepping(t);
            Object.keys(A).forEach(function (t) {
              "hover" === t.split(".")[0] &&
                A[t].forEach(function (t) {
                  t.call(ht, e);
                });
            });
          },
          { hover: !0 }
        ),
      S.drag &&
        m.forEach(function (t, e) {
          var r, n, i, s, a;
          !1 !== t &&
            0 !== e &&
            e !== m.length - 1 &&
            ((r = h[e - 1]),
            (n = h[e]),
            (i = [t]),
            (s = [r, n]),
            (a = [e - 1, e]),
            c(t, o.cssClasses.draggable),
            S.fixed && (i.push(r.children[0]), i.push(n.children[0])),
            S.dragAll && ((s = h), (a = k)),
            i.forEach(function (e) {
              $(w.start, e, Z, { handles: s, handleNumbers: a, connect: t });
            }));
        }),
      pt(o.start),
      o.pips && Y(o.pips),
      o.tooltips && B(),
      et("update" + y),
      tt("update" + y, function (t, e, r, n, i) {
        k.forEach(function (t) {
          var e = h[t],
            n = nt(V, t, 0, !0, !0, !0),
            s = nt(V, t, 100, !0, !0, !0),
            a = i[t];
          (t = String(o.ariaFormat.to(r[t]))),
            (n = C.fromStepping(n).toFixed(1)),
            (s = C.fromStepping(s).toFixed(1)),
            (a = C.fromStepping(a).toFixed(1));
          e.children[0].setAttribute("aria-valuemin", n),
            e.children[0].setAttribute("aria-valuemax", s),
            e.children[0].setAttribute("aria-valuenow", a),
            e.children[0].setAttribute("aria-valuetext", t);
        });
      });
    var ht = {
      destroy: function () {
        for (
          et(y),
            et(x),
            Object.keys(o.cssClasses).forEach(function (t) {
              p(P, o.cssClasses[t]);
            });
          P.firstChild;

        )
          P.removeChild(P.firstChild);
        delete P.noUiSlider;
      },
      steps: function () {
        return k.map(dt);
      },
      on: tt,
      off: et,
      get: ft,
      set: pt,
      setHandle: function (t, e, r, n) {
        if (!(0 <= (t = Number(t)) && t < k.length))
          throw new Error("noUiSlider: invalid handle number, got: " + t);
        lt(t, ct(e, t), !0, !0, n), rt("update", t), r && rt("set", t);
      },
      reset: function (t) {
        pt(o.start, t);
      },
      __moveHandles: function (t, e, r) {
        ot(t, e, V, r);
      },
      options: u,
      updateOptions: function (t, e) {
        var r = ft(),
          i = [
            "margin",
            "limit",
            "padding",
            "range",
            "animate",
            "snap",
            "step",
            "format",
            "pips",
            "tooltips",
          ];
        i.forEach(function (e) {
          void 0 !== t[e] && (u[e] = t[e]);
        });
        var s = I(u);
        i.forEach(function (e) {
          void 0 !== t[e] && (o[e] = s[e]);
        }),
          (C = s.spectrum),
          (o.margin = s.margin),
          (o.limit = s.limit),
          (o.padding = s.padding),
          o.pips ? Y(o.pips) : X(),
          (o.tooltips ? B : _)(),
          (V = []),
          pt(n(t.start) ? t.start : r, e);
      },
      target: P,
      removePips: X,
      removeTooltips: _,
      getPositions: function () {
        return V.slice();
      },
      getTooltips: function () {
        return v;
      },
      getOrigins: function () {
        return h;
      },
      pips: Y,
    };
    return ht;
  }
  function $(t, e) {
    if (!t || !t.nodeName)
      throw new Error(
        "noUiSlider: create requires a single element, got: " + t
      );
    if (t.noUiSlider)
      throw new Error("noUiSlider: Slider was already initialized.");
    return (e = W(t, I(e), e)), (t.noUiSlider = e);
  }
  var G = { __spectrum: g, cssClasses: S, create: $ };
  (t.create = $),
    (t.cssClasses = S),
    (t.default = G),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
/*! Select2 4.1.0-rc.0 | https://github.com/select2/select2/blob/master/LICENSE.md */
!(function (e) {
  "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : "object" == typeof module && module.exports
    ? (module.exports = function (t, n) {
        return (
          void 0 === n &&
            (n =
              "undefined" != typeof window
                ? require("jquery")
                : require("jquery")(t)),
          e(n),
          n
        );
      })
    : e(jQuery);
})(function (e) {
  var t, n, s, i, r, o, a, l, c, u, d, p, h, f, g;
  function m(e, t) {
    return p.call(e, t);
  }
  function y(e, t) {
    var n,
      s,
      i,
      r,
      o,
      a,
      l,
      c,
      d,
      p,
      h = t && t.split("/"),
      g = u.map,
      m = (g && g["*"]) || {};
    if (e) {
      for (
        t = (e = e.split("/")).length - 1,
          u.nodeIdCompat && f.test(e[t]) && (e[t] = e[t].replace(f, "")),
          "." === e[0].charAt(0) &&
            h &&
            (e = h.slice(0, h.length - 1).concat(e)),
          c = 0;
        c < e.length;
        c++
      )
        "." === (p = e[c])
          ? (e.splice(c, 1), --c)
          : ".." === p &&
            (0 === c ||
              (1 === c && ".." === e[2]) ||
              ".." === e[c - 1] ||
              (0 < c && (e.splice(c - 1, 2), (c -= 2))));
      e = e.join("/");
    }
    if ((h || m) && g) {
      for (c = (n = e.split("/")).length; 0 < c; --c) {
        if (((s = n.slice(0, c).join("/")), h))
          for (d = h.length; 0 < d; --d)
            if ((i = (i = g[h.slice(0, d).join("/")]) && i[s])) {
              (r = i), (o = c);
              break;
            }
        if (r) break;
        !a && m && m[s] && ((a = m[s]), (l = c));
      }
      !r && a && ((r = a), (o = l)),
        r && (n.splice(0, o, r), (e = n.join("/")));
    }
    return e;
  }
  function v(e, t) {
    return function () {
      var n = h.call(arguments, 0);
      return (
        "string" != typeof n[0] && 1 === n.length && n.push(null),
        r.apply(s, n.concat([e, t]))
      );
    };
  }
  function _(e) {
    var t;
    if (
      (m(c, e) && ((t = c[e]), delete c[e], (d[e] = !0), i.apply(s, t)),
      !m(l, e) && !m(d, e))
    )
      throw new Error("No " + e);
    return l[e];
  }
  function b(e) {
    var t,
      n = e ? e.indexOf("!") : -1;
    return (
      -1 < n && ((t = e.substring(0, n)), (e = e.substring(n + 1, e.length))),
      [t, e]
    );
  }
  function w(e) {
    return e ? b(e) : [];
  }
  var x = (g =
    (((x =
      e && e.fn && e.fn.select2 && e.fn.select2.amd ? e.fn.select2.amd : x) &&
      x.requirejs) ||
      (x ? (n = x) : (x = {}),
      (l = {}),
      (c = {}),
      (u = {}),
      (d = {}),
      (p = Object.prototype.hasOwnProperty),
      (h = [].slice),
      (f = /\.js$/),
      (o = function (e, t) {
        var n,
          s,
          i = b(e),
          r = i[0];
        t = t[1];
        return (
          (e = i[1]),
          r && (n = _((r = y(r, t)))),
          r
            ? (e =
                n && n.normalize
                  ? n.normalize(
                      e,
                      ((s = t),
                      function (e) {
                        return y(e, s);
                      })
                    )
                  : y(e, t))
            : ((r = (i = b((e = y(e, t))))[0]), (e = i[1]), r && (n = _(r))),
          { f: r ? r + "!" + e : e, n: e, pr: r, p: n }
        );
      }),
      (a = {
        require: function (e) {
          return v(e);
        },
        exports: function (e) {
          var t = l[e];
          return void 0 !== t ? t : (l[e] = {});
        },
        module: function (e) {
          return {
            id: e,
            uri: "",
            exports: l[e],
            config:
              ((t = e),
              function () {
                return (u && u.config && u.config[t]) || {};
              }),
          };
          var t;
        },
      }),
      (i = function (e, t, n, i) {
        var r,
          u,
          p,
          h,
          f,
          g = [],
          y = typeof n,
          b = w((i = i || e));
        if ("undefined" == y || "function" == y) {
          for (
            t = !t.length && n.length ? ["require", "exports", "module"] : t,
              h = 0;
            h < t.length;
            h += 1
          )
            if ("require" === (u = (p = o(t[h], b)).f)) g[h] = a.require(e);
            else if ("exports" === u) (g[h] = a.exports(e)), (f = !0);
            else if ("module" === u) r = g[h] = a.module(e);
            else if (m(l, u) || m(c, u) || m(d, u)) g[h] = _(u);
            else {
              if (!p.p) throw new Error(e + " missing " + u);
              p.p.load(
                p.n,
                v(i, !0),
                (function (e) {
                  return function (t) {
                    l[e] = t;
                  };
                })(u),
                {}
              ),
                (g[h] = l[u]);
            }
          (y = n ? n.apply(l[e], g) : void 0),
            e &&
              (r && r.exports !== s && r.exports !== l[e]
                ? (l[e] = r.exports)
                : (y === s && f) || (l[e] = y));
        } else e && (l[e] = n);
      }),
      (t =
        n =
        r =
          function (e, t, n, l, c) {
            if ("string" == typeof e) return a[e] ? a[e](t) : _(o(e, w(t)).f);
            if (!e.splice) {
              if (((u = e).deps && r(u.deps, u.callback), !t)) return;
              t.splice ? ((e = t), (t = n), (n = null)) : (e = s);
            }
            return (
              (t = t || function () {}),
              "function" == typeof n && ((n = l), (l = c)),
              l
                ? i(s, e, t, n)
                : setTimeout(function () {
                    i(s, e, t, n);
                  }, 4),
              r
            );
          }),
      (r.config = function (e) {
        return r(e);
      }),
      (t._defined = l),
      ((g = function (e, t, n) {
        if ("string" != typeof e)
          throw new Error(
            "See almond README: incorrect module build, no module name"
          );
        t.splice || ((n = t), (t = [])),
          m(l, e) || m(c, e) || (c[e] = [e, t, n]);
      }).amd = { jQuery: !0 }),
      (x.requirejs = t),
      (x.require = n),
      (x.define = g)),
    x.define("almond", function () {}),
    x.define("jquery", [], function () {
      var t = e || $;
      return (
        null == t &&
          console &&
          console.error &&
          console.error(
            "Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."
          ),
        t
      );
    }),
    x.define("select2/utils", ["jquery"], function (e) {
      var t = {};
      function n(e) {
        var t,
          n = e.prototype,
          s = [];
        for (t in n)
          "function" == typeof n[t] && "constructor" !== t && s.push(t);
        return s;
      }
      function s() {
        this.listeners = {};
      }
      (t.Extend = function (e, t) {
        var n,
          s = {}.hasOwnProperty;
        function i() {
          this.constructor = e;
        }
        for (n in t) s.call(t, n) && (e[n] = t[n]);
        return (
          (i.prototype = t.prototype),
          (e.prototype = new i()),
          (e.__super__ = t.prototype),
          e
        );
      }),
        (t.Decorate = function (e, t) {
          var s = n(t),
            i = n(e);
          function r() {
            var n = Array.prototype.unshift,
              s = t.prototype.constructor.length,
              i = e.prototype.constructor;
            0 < s &&
              (n.call(arguments, e.prototype.constructor),
              (i = t.prototype.constructor)),
              i.apply(this, arguments);
          }
          (t.displayName = e.displayName),
            (r.prototype = new (function () {
              this.constructor = r;
            })());
          for (var o = 0; o < i.length; o++) {
            var a = i[o];
            r.prototype[a] = e.prototype[a];
          }
          for (var l = 0; l < s.length; l++) {
            var c = s[l];
            r.prototype[c] = (function (e) {
              var n = function () {};
              e in r.prototype && (n = r.prototype[e]);
              var s = t.prototype[e];
              return function () {
                return (
                  Array.prototype.unshift.call(arguments, n),
                  s.apply(this, arguments)
                );
              };
            })(c);
          }
          return r;
        }),
        (s.prototype.on = function (e, t) {
          (this.listeners = this.listeners || {}),
            e in this.listeners
              ? this.listeners[e].push(t)
              : (this.listeners[e] = [t]);
        }),
        (s.prototype.trigger = function (e) {
          var t = Array.prototype.slice,
            n = t.call(arguments, 1);
          (this.listeners = this.listeners || {}),
            0 === (n = null == n ? [] : n).length && n.push({}),
            (n[0]._type = e) in this.listeners &&
              this.invoke(this.listeners[e], t.call(arguments, 1)),
            "*" in this.listeners &&
              this.invoke(this.listeners["*"], arguments);
        }),
        (s.prototype.invoke = function (e, t) {
          for (var n = 0, s = e.length; n < s; n++) e[n].apply(this, t);
        }),
        (t.Observable = s),
        (t.generateChars = function (e) {
          for (var t = "", n = 0; n < e; n++)
            t += Math.floor(36 * Math.random()).toString(36);
          return t;
        }),
        (t.bind = function (e, t) {
          return function () {
            e.apply(t, arguments);
          };
        }),
        (t._convertData = function (e) {
          for (var t in e) {
            var n = t.split("-"),
              s = e;
            if (1 !== n.length) {
              for (var i = 0; i < n.length; i++) {
                var r = n[i];
                (r = r.substring(0, 1).toLowerCase() + r.substring(1)) in s ||
                  (s[r] = {}),
                  i == n.length - 1 && (s[r] = e[t]),
                  (s = s[r]);
              }
              delete e[t];
            }
          }
          return e;
        }),
        (t.hasScroll = function (t, n) {
          var s = e(n),
            i = n.style.overflowX,
            r = n.style.overflowY;
          return (
            (i !== r || ("hidden" !== r && "visible" !== r)) &&
            ("scroll" === i ||
              "scroll" === r ||
              s.innerHeight() < n.scrollHeight ||
              s.innerWidth() < n.scrollWidth)
          );
        }),
        (t.escapeMarkup = function (e) {
          var t = {
            "\\": "&#92;",
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#47;",
          };
          return "string" != typeof e
            ? e
            : String(e).replace(/[&<>"'\/\\]/g, function (e) {
                return t[e];
              });
        }),
        (t.__cache = {});
      var i = 0;
      return (
        (t.GetUniqueElementId = function (e) {
          var n = e.getAttribute("data-select2-id");
          return (
            null != n ||
              ((n = e.id
                ? "select2-data-" + e.id
                : "select2-data-" +
                  (++i).toString() +
                  "-" +
                  t.generateChars(4)),
              e.setAttribute("data-select2-id", n)),
            n
          );
        }),
        (t.StoreData = function (e, n, s) {
          (e = t.GetUniqueElementId(e)),
            t.__cache[e] || (t.__cache[e] = {}),
            (t.__cache[e][n] = s);
        }),
        (t.GetData = function (n, s) {
          var i = t.GetUniqueElementId(n);
          return s
            ? t.__cache[i] && null != t.__cache[i][s]
              ? t.__cache[i][s]
              : e(n).data(s)
            : t.__cache[i];
        }),
        (t.RemoveData = function (e) {
          var n = t.GetUniqueElementId(e);
          null != t.__cache[n] && delete t.__cache[n],
            e.removeAttribute("data-select2-id");
        }),
        (t.copyNonInternalCssClasses = function (e, t) {
          var n = (n = e.getAttribute("class").trim().split(/\s+/)).filter(
            function (e) {
              return 0 === e.indexOf("select2-");
            }
          );
          (t = (t = t.getAttribute("class").trim().split(/\s+/)).filter(
            function (e) {
              return 0 !== e.indexOf("select2-");
            }
          )),
            (t = n.concat(t));
          e.setAttribute("class", t.join(" "));
        }),
        t
      );
    }),
    x.define("select2/results", ["jquery", "./utils"], function (e, t) {
      function n(e, t, s) {
        (this.$element = e),
          (this.data = s),
          (this.options = t),
          n.__super__.constructor.call(this);
      }
      return (
        t.Extend(n, t.Observable),
        (n.prototype.render = function () {
          var t = e(
            '<ul class="select2-results__options" role="listbox"></ul>'
          );
          return (
            this.options.get("multiple") &&
              t.attr("aria-multiselectable", "true"),
            (this.$results = t)
          );
        }),
        (n.prototype.clear = function () {
          this.$results.empty();
        }),
        (n.prototype.displayMessage = function (t) {
          var n = this.options.get("escapeMarkup");
          this.clear(), this.hideLoading();
          var s = e(
              '<li role="alert" aria-live="assertive" class="select2-results__option"></li>'
            ),
            i = this.options.get("translations").get(t.message);
          s.append(n(i(t.args))),
            (s[0].className += " select2-results__message"),
            this.$results.append(s);
        }),
        (n.prototype.hideMessages = function () {
          this.$results.find(".select2-results__message").remove();
        }),
        (n.prototype.append = function (e) {
          this.hideLoading();
          var t = [];
          if (null != e.results && 0 !== e.results.length) {
            e.results = this.sort(e.results);
            for (var n = 0; n < e.results.length; n++) {
              var s = e.results[n];
              s = this.option(s);
              t.push(s);
            }
            this.$results.append(t);
          } else
            0 === this.$results.children().length &&
              this.trigger("results:message", { message: "noResults" });
        }),
        (n.prototype.position = function (e, t) {
          t.find(".select2-results").append(e);
        }),
        (n.prototype.sort = function (e) {
          return this.options.get("sorter")(e);
        }),
        (n.prototype.highlightFirstItem = function () {
          var e = this.$results.find(".select2-results__option--selectable"),
            t = e.filter(".select2-results__option--selected");
          (0 < t.length ? t : e).first().trigger("mouseenter"),
            this.ensureHighlightVisible();
        }),
        (n.prototype.setClasses = function () {
          var n = this;
          this.data.current(function (s) {
            var i = s.map(function (e) {
              return e.id.toString();
            });
            n.$results
              .find(".select2-results__option--selectable")
              .each(function () {
                var n = e(this),
                  s = t.GetData(this, "data"),
                  r = "" + s.id;
                (null != s.element && s.element.selected) ||
                (null == s.element && -1 < i.indexOf(r))
                  ? (this.classList.add("select2-results__option--selected"),
                    n.attr("aria-selected", "true"))
                  : (this.classList.remove("select2-results__option--selected"),
                    n.attr("aria-selected", "false"));
              });
          });
        }),
        (n.prototype.showLoading = function (e) {
          this.hideLoading(),
            (e = {
              disabled: !0,
              loading: !0,
              text: this.options.get("translations").get("searching")(e),
            }),
            ((e = this.option(e)).className += " loading-results"),
            this.$results.prepend(e);
        }),
        (n.prototype.hideLoading = function () {
          this.$results.find(".loading-results").remove();
        }),
        (n.prototype.option = function (n) {
          var s = document.createElement("li");
          s.classList.add("select2-results__option"),
            s.classList.add("select2-results__option--selectable");
          var i,
            r = { role: "option" },
            o =
              window.Element.prototype.matches ||
              window.Element.prototype.msMatchesSelector ||
              window.Element.prototype.webkitMatchesSelector;
          for (i in (((null != n.element && o.call(n.element, ":disabled")) ||
            (null == n.element && n.disabled)) &&
            ((r["aria-disabled"] = "true"),
            s.classList.remove("select2-results__option--selectable"),
            s.classList.add("select2-results__option--disabled")),
          null == n.id &&
            s.classList.remove("select2-results__option--selectable"),
          null != n._resultId && (s.id = n._resultId),
          n.title && (s.title = n.title),
          n.children &&
            ((r.role = "group"),
            (r["aria-label"] = n.text),
            s.classList.remove("select2-results__option--selectable"),
            s.classList.add("select2-results__option--group")),
          r)) {
            var a = r[i];
            s.setAttribute(i, a);
          }
          if (n.children) {
            var l = e(s),
              c = document.createElement("strong");
            (c.className = "select2-results__group"), this.template(n, c);
            for (var u = [], d = 0; d < n.children.length; d++) {
              var p = n.children[d];
              p = this.option(p);
              u.push(p);
            }
            (o = e("<ul></ul>", {
              class:
                "select2-results__options select2-results__options--nested",
              role: "none",
            })).append(u),
              l.append(c),
              l.append(o);
          } else this.template(n, s);
          return t.StoreData(s, "data", n), s;
        }),
        (n.prototype.bind = function (n, s) {
          var i = this,
            r = n.id + "-results";
          this.$results.attr("id", r),
            n.on("results:all", function (e) {
              i.clear(),
                i.append(e.data),
                n.isOpen() && (i.setClasses(), i.highlightFirstItem());
            }),
            n.on("results:append", function (e) {
              i.append(e.data), n.isOpen() && i.setClasses();
            }),
            n.on("query", function (e) {
              i.hideMessages(), i.showLoading(e);
            }),
            n.on("select", function () {
              n.isOpen() &&
                (i.setClasses(),
                i.options.get("scrollAfterSelect") && i.highlightFirstItem());
            }),
            n.on("unselect", function () {
              n.isOpen() &&
                (i.setClasses(),
                i.options.get("scrollAfterSelect") && i.highlightFirstItem());
            }),
            n.on("open", function () {
              i.$results.attr("aria-expanded", "true"),
                i.$results.attr("aria-hidden", "false"),
                i.setClasses(),
                i.ensureHighlightVisible();
            }),
            n.on("close", function () {
              i.$results.attr("aria-expanded", "false"),
                i.$results.attr("aria-hidden", "true"),
                i.$results.removeAttr("aria-activedescendant");
            }),
            n.on("results:toggle", function () {
              var e = i.getHighlightedResults();
              0 !== e.length && e.trigger("mouseup");
            }),
            n.on("results:select", function () {
              var e,
                n = i.getHighlightedResults();
              0 !== n.length &&
                ((e = t.GetData(n[0], "data")),
                n.hasClass("select2-results__option--selected")
                  ? i.trigger("close", {})
                  : i.trigger("select", { data: e }));
            }),
            n.on("results:previous", function () {
              var e,
                t = i.getHighlightedResults(),
                n = i.$results.find(".select2-results__option--selectable"),
                s = n.index(t);
              s <= 0 ||
                ((e = s - 1),
                0 === t.length && (e = 0),
                (s = n.eq(e)).trigger("mouseenter"),
                (t = i.$results.offset().top),
                (n = s.offset().top),
                (s = i.$results.scrollTop() + (n - t)),
                0 === e
                  ? i.$results.scrollTop(0)
                  : n - t < 0 && i.$results.scrollTop(s));
            }),
            n.on("results:next", function () {
              var e,
                t = i.getHighlightedResults(),
                n = i.$results.find(".select2-results__option--selectable"),
                s = n.index(t) + 1;
              s >= n.length ||
                ((e = n.eq(s)).trigger("mouseenter"),
                (t = i.$results.offset().top + i.$results.outerHeight(!1)),
                (n = e.offset().top + e.outerHeight(!1)),
                (e = i.$results.scrollTop() + n - t),
                0 === s
                  ? i.$results.scrollTop(0)
                  : t < n && i.$results.scrollTop(e));
            }),
            n.on("results:focus", function (e) {
              e.element[0].classList.add(
                "select2-results__option--highlighted"
              ),
                e.element[0].setAttribute("aria-selected", "true");
            }),
            n.on("results:message", function (e) {
              i.displayMessage(e);
            }),
            e.fn.mousewheel &&
              this.$results.on("mousewheel", function (e) {
                var t = i.$results.scrollTop(),
                  n = i.$results.get(0).scrollHeight - t + e.deltaY;
                (t = 0 < e.deltaY && t - e.deltaY <= 0),
                  (n = e.deltaY < 0 && n <= i.$results.height());
                t
                  ? (i.$results.scrollTop(0),
                    e.preventDefault(),
                    e.stopPropagation())
                  : n &&
                    (i.$results.scrollTop(
                      i.$results.get(0).scrollHeight - i.$results.height()
                    ),
                    e.preventDefault(),
                    e.stopPropagation());
              }),
            this.$results.on(
              "mouseup",
              ".select2-results__option--selectable",
              function (n) {
                var s = e(this),
                  r = t.GetData(this, "data");
                s.hasClass("select2-results__option--selected")
                  ? i.options.get("multiple")
                    ? i.trigger("unselect", { originalEvent: n, data: r })
                    : i.trigger("close", {})
                  : i.trigger("select", { originalEvent: n, data: r });
              }
            ),
            this.$results.on(
              "mouseenter",
              ".select2-results__option--selectable",
              function (n) {
                var s = t.GetData(this, "data");
                i
                  .getHighlightedResults()
                  .removeClass("select2-results__option--highlighted")
                  .attr("aria-selected", "false"),
                  i.trigger("results:focus", { data: s, element: e(this) });
              }
            );
        }),
        (n.prototype.getHighlightedResults = function () {
          return this.$results.find(".select2-results__option--highlighted");
        }),
        (n.prototype.destroy = function () {
          this.$results.remove();
        }),
        (n.prototype.ensureHighlightVisible = function () {
          var e,
            t,
            n,
            s,
            i = this.getHighlightedResults();
          0 !== i.length &&
            ((e = this.$results
              .find(".select2-results__option--selectable")
              .index(i)),
            (s = this.$results.offset().top),
            (t = i.offset().top),
            (n = this.$results.scrollTop() + (t - s)),
            (s = t - s),
            (n -= 2 * i.outerHeight(!1)),
            e <= 2
              ? this.$results.scrollTop(0)
              : (s > this.$results.outerHeight() || s < 0) &&
                this.$results.scrollTop(n));
        }),
        (n.prototype.template = function (t, n) {
          var s = this.options.get("templateResult"),
            i = this.options.get("escapeMarkup");
          null == (t = s(t, n))
            ? (n.style.display = "none")
            : "string" == typeof t
            ? (n.innerHTML = i(t))
            : e(n).append(t);
        }),
        n
      );
    }),
    x.define("select2/keys", [], function () {
      return {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46,
      };
    }),
    x.define(
      "select2/selection/base",
      ["jquery", "../utils", "../keys"],
      function (e, t, n) {
        function s(e, t) {
          (this.$element = e),
            (this.options = t),
            s.__super__.constructor.call(this);
        }
        return (
          t.Extend(s, t.Observable),
          (s.prototype.render = function () {
            var n = e(
              '<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>'
            );
            return (
              (this._tabindex = 0),
              null != t.GetData(this.$element[0], "old-tabindex")
                ? (this._tabindex = t.GetData(this.$element[0], "old-tabindex"))
                : null != this.$element.attr("tabindex") &&
                  (this._tabindex = this.$element.attr("tabindex")),
              n.attr("title", this.$element.attr("title")),
              n.attr("tabindex", this._tabindex),
              n.attr("aria-disabled", "false"),
              (this.$selection = n)
            );
          }),
          (s.prototype.bind = function (e, t) {
            var s = this,
              i = e.id + "-results";
            (this.container = e),
              this.$selection.on("focus", function (e) {
                s.trigger("focus", e);
              }),
              this.$selection.on("blur", function (e) {
                s._handleBlur(e);
              }),
              this.$selection.on("keydown", function (e) {
                s.trigger("keypress", e),
                  e.which === n.SPACE && e.preventDefault();
              }),
              e.on("results:focus", function (e) {
                s.$selection.attr("aria-activedescendant", e.data._resultId);
              }),
              e.on("selection:update", function (e) {
                s.update(e.data);
              }),
              e.on("open", function () {
                s.$selection.attr("aria-expanded", "true"),
                  s.$selection.attr("aria-owns", i),
                  s._attachCloseHandler(e);
              }),
              e.on("close", function () {
                s.$selection.attr("aria-expanded", "false"),
                  s.$selection.removeAttr("aria-activedescendant"),
                  s.$selection.removeAttr("aria-owns"),
                  s.$selection.trigger("focus"),
                  s._detachCloseHandler(e);
              }),
              e.on("enable", function () {
                s.$selection.attr("tabindex", s._tabindex),
                  s.$selection.attr("aria-disabled", "false");
              }),
              e.on("disable", function () {
                s.$selection.attr("tabindex", "-1"),
                  s.$selection.attr("aria-disabled", "true");
              });
          }),
          (s.prototype._handleBlur = function (t) {
            var n = this;
            window.setTimeout(function () {
              document.activeElement == n.$selection[0] ||
                e.contains(n.$selection[0], document.activeElement) ||
                n.trigger("blur", t);
            }, 1);
          }),
          (s.prototype._attachCloseHandler = function (n) {
            e(document.body).on("mousedown.select2." + n.id, function (n) {
              var s = e(n.target).closest(".select2");
              e(".select2.select2-container--open").each(function () {
                this != s[0] && t.GetData(this, "element").select2("close");
              });
            });
          }),
          (s.prototype._detachCloseHandler = function (t) {
            e(document.body).off("mousedown.select2." + t.id);
          }),
          (s.prototype.position = function (e, t) {
            t.find(".selection").append(e);
          }),
          (s.prototype.destroy = function () {
            this._detachCloseHandler(this.container);
          }),
          (s.prototype.update = function (e) {
            throw new Error(
              "The `update` method must be defined in child classes."
            );
          }),
          (s.prototype.isEnabled = function () {
            return !this.isDisabled();
          }),
          (s.prototype.isDisabled = function () {
            return this.options.get("disabled");
          }),
          s
        );
      }
    ),
    x.define(
      "select2/selection/single",
      ["jquery", "./base", "../utils", "../keys"],
      function (e, t, n, s) {
        function i() {
          i.__super__.constructor.apply(this, arguments);
        }
        return (
          n.Extend(i, t),
          (i.prototype.render = function () {
            var e = i.__super__.render.call(this);
            return (
              e[0].classList.add("select2-selection--single"),
              e.html(
                '<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'
              ),
              e
            );
          }),
          (i.prototype.bind = function (e, t) {
            var n = this;
            i.__super__.bind.apply(this, arguments);
            var s = e.id + "-container";
            this.$selection
              .find(".select2-selection__rendered")
              .attr("id", s)
              .attr("role", "textbox")
              .attr("aria-readonly", "true"),
              this.$selection.attr("aria-labelledby", s),
              this.$selection.attr("aria-controls", s),
              this.$selection.on("mousedown", function (e) {
                1 === e.which && n.trigger("toggle", { originalEvent: e });
              }),
              this.$selection.on("focus", function (e) {}),
              this.$selection.on("blur", function (e) {}),
              e.on("focus", function (t) {
                e.isOpen() || n.$selection.trigger("focus");
              });
          }),
          (i.prototype.clear = function () {
            var e = this.$selection.find(".select2-selection__rendered");
            e.empty(), e.removeAttr("title");
          }),
          (i.prototype.display = function (e, t) {
            var n = this.options.get("templateSelection");
            return this.options.get("escapeMarkup")(n(e, t));
          }),
          (i.prototype.selectionContainer = function () {
            return e("<span></span>");
          }),
          (i.prototype.update = function (e) {
            var t, n;
            0 !== e.length
              ? ((n = e[0]),
                (t = this.$selection.find(".select2-selection__rendered")),
                (e = this.display(n, t)),
                t.empty().append(e),
                (n = n.title || n.text)
                  ? t.attr("title", n)
                  : t.removeAttr("title"))
              : this.clear();
          }),
          i
        );
      }
    ),
    x.define(
      "select2/selection/multiple",
      ["jquery", "./base", "../utils"],
      function (e, t, n) {
        function s(e, t) {
          s.__super__.constructor.apply(this, arguments);
        }
        return (
          n.Extend(s, t),
          (s.prototype.render = function () {
            var e = s.__super__.render.call(this);
            return (
              e[0].classList.add("select2-selection--multiple"),
              e.html('<ul class="select2-selection__rendered"></ul>'),
              e
            );
          }),
          (s.prototype.bind = function (t, i) {
            var r = this;
            s.__super__.bind.apply(this, arguments);
            var o = t.id + "-container";
            this.$selection.find(".select2-selection__rendered").attr("id", o),
              this.$selection.on("click", function (e) {
                r.trigger("toggle", { originalEvent: e });
              }),
              this.$selection.on(
                "click",
                ".select2-selection__choice__remove",
                function (t) {
                  var s;
                  r.isDisabled() ||
                    ((s = e(this).parent()),
                    (s = n.GetData(s[0], "data")),
                    r.trigger("unselect", { originalEvent: t, data: s }));
                }
              ),
              this.$selection.on(
                "keydown",
                ".select2-selection__choice__remove",
                function (e) {
                  r.isDisabled() || e.stopPropagation();
                }
              );
          }),
          (s.prototype.clear = function () {
            var e = this.$selection.find(".select2-selection__rendered");
            e.empty(), e.removeAttr("title");
          }),
          (s.prototype.display = function (e, t) {
            var n = this.options.get("templateSelection");
            return this.options.get("escapeMarkup")(n(e, t));
          }),
          (s.prototype.selectionContainer = function () {
            return e(
              '<li class="select2-selection__choice"><button type="button" class="select2-selection__choice__remove" tabindex="-1"><span aria-hidden="true">&times;</span></button><span class="select2-selection__choice__display"></span></li>'
            );
          }),
          (s.prototype.update = function (e) {
            if ((this.clear(), 0 !== e.length)) {
              for (
                var t = [],
                  s =
                    this.$selection
                      .find(".select2-selection__rendered")
                      .attr("id") + "-choice-",
                  i = 0;
                i < e.length;
                i++
              ) {
                var r = e[i],
                  o = this.selectionContainer(),
                  a = this.display(r, o),
                  l = s + n.generateChars(4) + "-";
                r.id ? (l += r.id) : (l += n.generateChars(4)),
                  o
                    .find(".select2-selection__choice__display")
                    .append(a)
                    .attr("id", l);
                var c = r.title || r.text;
                c && o.attr("title", c),
                  (a = this.options.get("translations").get("removeItem")),
                  (c = o.find(".select2-selection__choice__remove")).attr(
                    "title",
                    a()
                  ),
                  c.attr("aria-label", a()),
                  c.attr("aria-describedby", l),
                  n.StoreData(o[0], "data", r),
                  t.push(o);
              }
              this.$selection.find(".select2-selection__rendered").append(t);
            }
          }),
          s
        );
      }
    ),
    x.define("select2/selection/placeholder", [], function () {
      function e(e, t, n) {
        (this.placeholder = this.normalizePlaceholder(n.get("placeholder"))),
          e.call(this, t, n);
      }
      return (
        (e.prototype.normalizePlaceholder = function (e, t) {
          return "string" == typeof t ? { id: "", text: t } : t;
        }),
        (e.prototype.createPlaceholder = function (e, t) {
          var n = this.selectionContainer();
          return (
            n.html(this.display(t)),
            n[0].classList.add("select2-selection__placeholder"),
            n[0].classList.remove("select2-selection__choice"),
            (t = t.title || t.text || n.text()),
            this.$selection
              .find(".select2-selection__rendered")
              .attr("title", t),
            n
          );
        }),
        (e.prototype.update = function (e, t) {
          var n = 1 == t.length && t[0].id != this.placeholder.id;
          if (1 < t.length || n) return e.call(this, t);
          this.clear(),
            (t = this.createPlaceholder(this.placeholder)),
            this.$selection.find(".select2-selection__rendered").append(t);
        }),
        e
      );
    }),
    x.define(
      "select2/selection/allowClear",
      ["jquery", "../keys", "../utils"],
      function (e, t, n) {
        function s() {}
        return (
          (s.prototype.bind = function (e, t, n) {
            var s = this;
            e.call(this, t, n),
              null == this.placeholder &&
                this.options.get("debug") &&
                window.console &&
                console.error &&
                console.error(
                  "Select2: The `allowClear` option should be used in combination with the `placeholder` option."
                ),
              this.$selection.on(
                "mousedown",
                ".select2-selection__clear",
                function (e) {
                  s._handleClear(e);
                }
              ),
              t.on("keypress", function (e) {
                s._handleKeyboardClear(e, t);
              });
          }),
          (s.prototype._handleClear = function (e, t) {
            if (!this.isDisabled()) {
              var s = this.$selection.find(".select2-selection__clear");
              if (0 !== s.length) {
                t.stopPropagation();
                var i = n.GetData(s[0], "data"),
                  r = this.$element.val();
                this.$element.val(this.placeholder.id);
                var o = { data: i };
                if ((this.trigger("clear", o), o.prevented))
                  this.$element.val(r);
                else {
                  for (var a = 0; a < i.length; a++)
                    if (
                      ((o = { data: i[a] }),
                      this.trigger("unselect", o),
                      o.prevented)
                    )
                      return void this.$element.val(r);
                  this.$element.trigger("input").trigger("change"),
                    this.trigger("toggle", {});
                }
              }
            }
          }),
          (s.prototype._handleKeyboardClear = function (e, n, s) {
            s.isOpen() ||
              (n.which != t.DELETE && n.which != t.BACKSPACE) ||
              this._handleClear(n);
          }),
          (s.prototype.update = function (t, s) {
            var i, r;
            t.call(this, s),
              this.$selection.find(".select2-selection__clear").remove(),
              this.$selection[0].classList.remove(
                "select2-selection--clearable"
              ),
              0 <
                this.$selection.find(".select2-selection__placeholder")
                  .length ||
                0 === s.length ||
                ((i = this.$selection
                  .find(".select2-selection__rendered")
                  .attr("id")),
                (r = this.options.get("translations").get("removeAllItems")),
                (t = e(
                  '<button type="button" class="select2-selection__clear" tabindex="-1"><span aria-hidden="true">&times;</span></button>'
                )).attr("title", r()),
                t.attr("aria-label", r()),
                t.attr("aria-describedby", i),
                n.StoreData(t[0], "data", s),
                this.$selection.prepend(t),
                this.$selection[0].classList.add(
                  "select2-selection--clearable"
                ));
          }),
          s
        );
      }
    ),
    x.define(
      "select2/selection/search",
      ["jquery", "../utils", "../keys"],
      function (e, t, n) {
        function s(e, t, n) {
          e.call(this, t, n);
        }
        return (
          (s.prototype.render = function (t) {
            var n = this.options.get("translations").get("search"),
              s = e(
                '<span class="select2-search select2-search--inline"><textarea class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" ></textarea></span>'
              );
            return (
              (this.$searchContainer = s),
              (this.$search = s.find("textarea")),
              this.$search.prop(
                "autocomplete",
                this.options.get("autocomplete")
              ),
              this.$search.attr("aria-label", n()),
              (t = t.call(this)),
              this._transferTabIndex(),
              t.append(this.$searchContainer),
              t
            );
          }),
          (s.prototype.bind = function (e, s, i) {
            var r = this,
              o = s.id + "-results",
              a = s.id + "-container";
            e.call(this, s, i),
              r.$search.attr("aria-describedby", a),
              s.on("open", function () {
                r.$search.attr("aria-controls", o), r.$search.trigger("focus");
              }),
              s.on("close", function () {
                r.$search.val(""),
                  r.resizeSearch(),
                  r.$search.removeAttr("aria-controls"),
                  r.$search.removeAttr("aria-activedescendant"),
                  r.$search.trigger("focus");
              }),
              s.on("enable", function () {
                r.$search.prop("disabled", !1), r._transferTabIndex();
              }),
              s.on("disable", function () {
                r.$search.prop("disabled", !0);
              }),
              s.on("focus", function (e) {
                r.$search.trigger("focus");
              }),
              s.on("results:focus", function (e) {
                e.data._resultId
                  ? r.$search.attr("aria-activedescendant", e.data._resultId)
                  : r.$search.removeAttr("aria-activedescendant");
              }),
              this.$selection.on(
                "focusin",
                ".select2-search--inline",
                function (e) {
                  r.trigger("focus", e);
                }
              ),
              this.$selection.on(
                "focusout",
                ".select2-search--inline",
                function (e) {
                  r._handleBlur(e);
                }
              ),
              this.$selection.on(
                "keydown",
                ".select2-search--inline",
                function (e) {
                  var s;
                  e.stopPropagation(),
                    r.trigger("keypress", e),
                    (r._keyUpPrevented = e.isDefaultPrevented()),
                    e.which !== n.BACKSPACE ||
                      "" !== r.$search.val() ||
                      (0 <
                        (s = r.$selection
                          .find(".select2-selection__choice")
                          .last()).length &&
                        ((s = t.GetData(s[0], "data")),
                        r.searchRemoveChoice(s),
                        e.preventDefault()));
                }
              ),
              this.$selection.on(
                "click",
                ".select2-search--inline",
                function (e) {
                  r.$search.val() && e.stopPropagation();
                }
              );
            var l = (s = document.documentMode) && s <= 11;
            this.$selection.on(
              "input.searchcheck",
              ".select2-search--inline",
              function (e) {
                l
                  ? r.$selection.off("input.search input.searchcheck")
                  : r.$selection.off("keyup.search");
              }
            ),
              this.$selection.on(
                "keyup.search input.search",
                ".select2-search--inline",
                function (e) {
                  var t;
                  l && "input" === e.type
                    ? r.$selection.off("input.search input.searchcheck")
                    : (t = e.which) != n.SHIFT &&
                      t != n.CTRL &&
                      t != n.ALT &&
                      t != n.TAB &&
                      r.handleSearch(e);
                }
              );
          }),
          (s.prototype._transferTabIndex = function (e) {
            this.$search.attr("tabindex", this.$selection.attr("tabindex")),
              this.$selection.attr("tabindex", "-1");
          }),
          (s.prototype.createPlaceholder = function (e, t) {
            this.$search.attr("placeholder", t.text);
          }),
          (s.prototype.update = function (e, t) {
            var n = this.$search[0] == document.activeElement;
            this.$search.attr("placeholder", ""),
              e.call(this, t),
              this.resizeSearch(),
              n && this.$search.trigger("focus");
          }),
          (s.prototype.handleSearch = function () {
            var e;
            this.resizeSearch(),
              this._keyUpPrevented ||
                ((e = this.$search.val()), this.trigger("query", { term: e })),
              (this._keyUpPrevented = !1);
          }),
          (s.prototype.searchRemoveChoice = function (e, t) {
            this.trigger("unselect", { data: t }),
              this.$search.val(t.text),
              this.handleSearch();
          }),
          (s.prototype.resizeSearch = function () {
            this.$search.css("width", "25px");
            var e = "100%";
            "" === this.$search.attr("placeholder") &&
              (e = 0.75 * (this.$search.val().length + 1) + "em"),
              this.$search.css("width", e);
          }),
          s
        );
      }
    ),
    x.define("select2/selection/selectionCss", ["../utils"], function (e) {
      function t() {}
      return (
        (t.prototype.render = function (t) {
          var n = t.call(this);
          return (
            -1 !==
              (t = this.options.get("selectionCssClass") || "").indexOf(
                ":all:"
              ) &&
              ((t = t.replace(":all:", "")),
              e.copyNonInternalCssClasses(n[0], this.$element[0])),
            n.addClass(t),
            n
          );
        }),
        t
      );
    }),
    x.define("select2/selection/eventRelay", ["jquery"], function (e) {
      function t() {}
      return (
        (t.prototype.bind = function (t, n, s) {
          var i = this,
            r = [
              "open",
              "opening",
              "close",
              "closing",
              "select",
              "selecting",
              "unselect",
              "unselecting",
              "clear",
              "clearing",
            ],
            o = ["opening", "closing", "selecting", "unselecting", "clearing"];
          t.call(this, n, s),
            n.on("*", function (t, n) {
              var s;
              -1 !== r.indexOf(t) &&
                ((n = n || {}),
                (s = e.Event("select2:" + t, { params: n })),
                i.$element.trigger(s),
                -1 !== o.indexOf(t) && (n.prevented = s.isDefaultPrevented()));
            });
        }),
        t
      );
    }),
    x.define("select2/translation", ["jquery", "require"], function (e, t) {
      function n(e) {
        this.dict = e || {};
      }
      return (
        (n.prototype.all = function () {
          return this.dict;
        }),
        (n.prototype.get = function (e) {
          return this.dict[e];
        }),
        (n.prototype.extend = function (t) {
          this.dict = e.extend({}, t.all(), this.dict);
        }),
        (n._cache = {}),
        (n.loadPath = function (e) {
          var s;
          return (
            e in n._cache || ((s = t(e)), (n._cache[e] = s)), new n(n._cache[e])
          );
        }),
        n
      );
    }),
    x.define("select2/diacritics", [], function () {
      return {
        "Ⓐ": "A",
        Ａ: "A",
        À: "A",
        Á: "A",
        Â: "A",
        Ầ: "A",
        Ấ: "A",
        Ẫ: "A",
        Ẩ: "A",
        Ã: "A",
        Ā: "A",
        Ă: "A",
        Ằ: "A",
        Ắ: "A",
        Ẵ: "A",
        Ẳ: "A",
        Ȧ: "A",
        Ǡ: "A",
        Ä: "A",
        Ǟ: "A",
        Ả: "A",
        Å: "A",
        Ǻ: "A",
        Ǎ: "A",
        Ȁ: "A",
        Ȃ: "A",
        Ạ: "A",
        Ậ: "A",
        Ặ: "A",
        Ḁ: "A",
        Ą: "A",
        Ⱥ: "A",
        Ɐ: "A",
        Ꜳ: "AA",
        Æ: "AE",
        Ǽ: "AE",
        Ǣ: "AE",
        Ꜵ: "AO",
        Ꜷ: "AU",
        Ꜹ: "AV",
        Ꜻ: "AV",
        Ꜽ: "AY",
        "Ⓑ": "B",
        Ｂ: "B",
        Ḃ: "B",
        Ḅ: "B",
        Ḇ: "B",
        Ƀ: "B",
        Ƃ: "B",
        Ɓ: "B",
        "Ⓒ": "C",
        Ｃ: "C",
        Ć: "C",
        Ĉ: "C",
        Ċ: "C",
        Č: "C",
        Ç: "C",
        Ḉ: "C",
        Ƈ: "C",
        Ȼ: "C",
        Ꜿ: "C",
        "Ⓓ": "D",
        Ｄ: "D",
        Ḋ: "D",
        Ď: "D",
        Ḍ: "D",
        Ḑ: "D",
        Ḓ: "D",
        Ḏ: "D",
        Đ: "D",
        Ƌ: "D",
        Ɗ: "D",
        Ɖ: "D",
        Ꝺ: "D",
        Ǳ: "DZ",
        Ǆ: "DZ",
        ǲ: "Dz",
        ǅ: "Dz",
        "Ⓔ": "E",
        Ｅ: "E",
        È: "E",
        É: "E",
        Ê: "E",
        Ề: "E",
        Ế: "E",
        Ễ: "E",
        Ể: "E",
        Ẽ: "E",
        Ē: "E",
        Ḕ: "E",
        Ḗ: "E",
        Ĕ: "E",
        Ė: "E",
        Ë: "E",
        Ẻ: "E",
        Ě: "E",
        Ȅ: "E",
        Ȇ: "E",
        Ẹ: "E",
        Ệ: "E",
        Ȩ: "E",
        Ḝ: "E",
        Ę: "E",
        Ḙ: "E",
        Ḛ: "E",
        Ɛ: "E",
        Ǝ: "E",
        "Ⓕ": "F",
        Ｆ: "F",
        Ḟ: "F",
        Ƒ: "F",
        Ꝼ: "F",
        "Ⓖ": "G",
        Ｇ: "G",
        Ǵ: "G",
        Ĝ: "G",
        Ḡ: "G",
        Ğ: "G",
        Ġ: "G",
        Ǧ: "G",
        Ģ: "G",
        Ǥ: "G",
        Ɠ: "G",
        Ꞡ: "G",
        Ᵹ: "G",
        Ꝿ: "G",
        "Ⓗ": "H",
        Ｈ: "H",
        Ĥ: "H",
        Ḣ: "H",
        Ḧ: "H",
        Ȟ: "H",
        Ḥ: "H",
        Ḩ: "H",
        Ḫ: "H",
        Ħ: "H",
        Ⱨ: "H",
        Ⱶ: "H",
        Ɥ: "H",
        "Ⓘ": "I",
        Ｉ: "I",
        Ì: "I",
        Í: "I",
        Î: "I",
        Ĩ: "I",
        Ī: "I",
        Ĭ: "I",
        İ: "I",
        Ï: "I",
        Ḯ: "I",
        Ỉ: "I",
        Ǐ: "I",
        Ȉ: "I",
        Ȋ: "I",
        Ị: "I",
        Į: "I",
        Ḭ: "I",
        Ɨ: "I",
        "Ⓙ": "J",
        Ｊ: "J",
        Ĵ: "J",
        Ɉ: "J",
        "Ⓚ": "K",
        Ｋ: "K",
        Ḱ: "K",
        Ǩ: "K",
        Ḳ: "K",
        Ķ: "K",
        Ḵ: "K",
        Ƙ: "K",
        Ⱪ: "K",
        Ꝁ: "K",
        Ꝃ: "K",
        Ꝅ: "K",
        Ꞣ: "K",
        "Ⓛ": "L",
        Ｌ: "L",
        Ŀ: "L",
        Ĺ: "L",
        Ľ: "L",
        Ḷ: "L",
        Ḹ: "L",
        Ļ: "L",
        Ḽ: "L",
        Ḻ: "L",
        Ł: "L",
        Ƚ: "L",
        Ɫ: "L",
        Ⱡ: "L",
        Ꝉ: "L",
        Ꝇ: "L",
        Ꞁ: "L",
        Ǉ: "LJ",
        ǈ: "Lj",
        "Ⓜ": "M",
        Ｍ: "M",
        Ḿ: "M",
        Ṁ: "M",
        Ṃ: "M",
        Ɱ: "M",
        Ɯ: "M",
        "Ⓝ": "N",
        Ｎ: "N",
        Ǹ: "N",
        Ń: "N",
        Ñ: "N",
        Ṅ: "N",
        Ň: "N",
        Ṇ: "N",
        Ņ: "N",
        Ṋ: "N",
        Ṉ: "N",
        Ƞ: "N",
        Ɲ: "N",
        Ꞑ: "N",
        Ꞥ: "N",
        Ǌ: "NJ",
        ǋ: "Nj",
        "Ⓞ": "O",
        Ｏ: "O",
        Ò: "O",
        Ó: "O",
        Ô: "O",
        Ồ: "O",
        Ố: "O",
        Ỗ: "O",
        Ổ: "O",
        Õ: "O",
        Ṍ: "O",
        Ȭ: "O",
        Ṏ: "O",
        Ō: "O",
        Ṑ: "O",
        Ṓ: "O",
        Ŏ: "O",
        Ȯ: "O",
        Ȱ: "O",
        Ö: "O",
        Ȫ: "O",
        Ỏ: "O",
        Ő: "O",
        Ǒ: "O",
        Ȍ: "O",
        Ȏ: "O",
        Ơ: "O",
        Ờ: "O",
        Ớ: "O",
        Ỡ: "O",
        Ở: "O",
        Ợ: "O",
        Ọ: "O",
        Ộ: "O",
        Ǫ: "O",
        Ǭ: "O",
        Ø: "O",
        Ǿ: "O",
        Ɔ: "O",
        Ɵ: "O",
        Ꝋ: "O",
        Ꝍ: "O",
        Œ: "OE",
        Ƣ: "OI",
        Ꝏ: "OO",
        Ȣ: "OU",
        "Ⓟ": "P",
        Ｐ: "P",
        Ṕ: "P",
        Ṗ: "P",
        Ƥ: "P",
        Ᵽ: "P",
        Ꝑ: "P",
        Ꝓ: "P",
        Ꝕ: "P",
        "Ⓠ": "Q",
        Ｑ: "Q",
        Ꝗ: "Q",
        Ꝙ: "Q",
        Ɋ: "Q",
        "Ⓡ": "R",
        Ｒ: "R",
        Ŕ: "R",
        Ṙ: "R",
        Ř: "R",
        Ȑ: "R",
        Ȓ: "R",
        Ṛ: "R",
        Ṝ: "R",
        Ŗ: "R",
        Ṟ: "R",
        Ɍ: "R",
        Ɽ: "R",
        Ꝛ: "R",
        Ꞧ: "R",
        Ꞃ: "R",
        "Ⓢ": "S",
        Ｓ: "S",
        ẞ: "S",
        Ś: "S",
        Ṥ: "S",
        Ŝ: "S",
        Ṡ: "S",
        Š: "S",
        Ṧ: "S",
        Ṣ: "S",
        Ṩ: "S",
        Ș: "S",
        Ş: "S",
        Ȿ: "S",
        Ꞩ: "S",
        Ꞅ: "S",
        "Ⓣ": "T",
        Ｔ: "T",
        Ṫ: "T",
        Ť: "T",
        Ṭ: "T",
        Ț: "T",
        Ţ: "T",
        Ṱ: "T",
        Ṯ: "T",
        Ŧ: "T",
        Ƭ: "T",
        Ʈ: "T",
        Ⱦ: "T",
        Ꞇ: "T",
        Ꜩ: "TZ",
        "Ⓤ": "U",
        Ｕ: "U",
        Ù: "U",
        Ú: "U",
        Û: "U",
        Ũ: "U",
        Ṹ: "U",
        Ū: "U",
        Ṻ: "U",
        Ŭ: "U",
        Ü: "U",
        Ǜ: "U",
        Ǘ: "U",
        Ǖ: "U",
        Ǚ: "U",
        Ủ: "U",
        Ů: "U",
        Ű: "U",
        Ǔ: "U",
        Ȕ: "U",
        Ȗ: "U",
        Ư: "U",
        Ừ: "U",
        Ứ: "U",
        Ữ: "U",
        Ử: "U",
        Ự: "U",
        Ụ: "U",
        Ṳ: "U",
        Ų: "U",
        Ṷ: "U",
        Ṵ: "U",
        Ʉ: "U",
        "Ⓥ": "V",
        Ｖ: "V",
        Ṽ: "V",
        Ṿ: "V",
        Ʋ: "V",
        Ꝟ: "V",
        Ʌ: "V",
        Ꝡ: "VY",
        "Ⓦ": "W",
        Ｗ: "W",
        Ẁ: "W",
        Ẃ: "W",
        Ŵ: "W",
        Ẇ: "W",
        Ẅ: "W",
        Ẉ: "W",
        Ⱳ: "W",
        "Ⓧ": "X",
        Ｘ: "X",
        Ẋ: "X",
        Ẍ: "X",
        "Ⓨ": "Y",
        Ｙ: "Y",
        Ỳ: "Y",
        Ý: "Y",
        Ŷ: "Y",
        Ỹ: "Y",
        Ȳ: "Y",
        Ẏ: "Y",
        Ÿ: "Y",
        Ỷ: "Y",
        Ỵ: "Y",
        Ƴ: "Y",
        Ɏ: "Y",
        Ỿ: "Y",
        "Ⓩ": "Z",
        Ｚ: "Z",
        Ź: "Z",
        Ẑ: "Z",
        Ż: "Z",
        Ž: "Z",
        Ẓ: "Z",
        Ẕ: "Z",
        Ƶ: "Z",
        Ȥ: "Z",
        Ɀ: "Z",
        Ⱬ: "Z",
        Ꝣ: "Z",
        "ⓐ": "a",
        ａ: "a",
        ẚ: "a",
        à: "a",
        á: "a",
        â: "a",
        ầ: "a",
        ấ: "a",
        ẫ: "a",
        ẩ: "a",
        ã: "a",
        ā: "a",
        ă: "a",
        ằ: "a",
        ắ: "a",
        ẵ: "a",
        ẳ: "a",
        ȧ: "a",
        ǡ: "a",
        ä: "a",
        ǟ: "a",
        ả: "a",
        å: "a",
        ǻ: "a",
        ǎ: "a",
        ȁ: "a",
        ȃ: "a",
        ạ: "a",
        ậ: "a",
        ặ: "a",
        ḁ: "a",
        ą: "a",
        ⱥ: "a",
        ɐ: "a",
        ꜳ: "aa",
        æ: "ae",
        ǽ: "ae",
        ǣ: "ae",
        ꜵ: "ao",
        ꜷ: "au",
        ꜹ: "av",
        ꜻ: "av",
        ꜽ: "ay",
        "ⓑ": "b",
        ｂ: "b",
        ḃ: "b",
        ḅ: "b",
        ḇ: "b",
        ƀ: "b",
        ƃ: "b",
        ɓ: "b",
        "ⓒ": "c",
        ｃ: "c",
        ć: "c",
        ĉ: "c",
        ċ: "c",
        č: "c",
        ç: "c",
        ḉ: "c",
        ƈ: "c",
        ȼ: "c",
        ꜿ: "c",
        ↄ: "c",
        "ⓓ": "d",
        ｄ: "d",
        ḋ: "d",
        ď: "d",
        ḍ: "d",
        ḑ: "d",
        ḓ: "d",
        ḏ: "d",
        đ: "d",
        ƌ: "d",
        ɖ: "d",
        ɗ: "d",
        ꝺ: "d",
        ǳ: "dz",
        ǆ: "dz",
        "ⓔ": "e",
        ｅ: "e",
        è: "e",
        é: "e",
        ê: "e",
        ề: "e",
        ế: "e",
        ễ: "e",
        ể: "e",
        ẽ: "e",
        ē: "e",
        ḕ: "e",
        ḗ: "e",
        ĕ: "e",
        ė: "e",
        ë: "e",
        ẻ: "e",
        ě: "e",
        ȅ: "e",
        ȇ: "e",
        ẹ: "e",
        ệ: "e",
        ȩ: "e",
        ḝ: "e",
        ę: "e",
        ḙ: "e",
        ḛ: "e",
        ɇ: "e",
        ɛ: "e",
        ǝ: "e",
        "ⓕ": "f",
        ｆ: "f",
        ḟ: "f",
        ƒ: "f",
        ꝼ: "f",
        "ⓖ": "g",
        ｇ: "g",
        ǵ: "g",
        ĝ: "g",
        ḡ: "g",
        ğ: "g",
        ġ: "g",
        ǧ: "g",
        ģ: "g",
        ǥ: "g",
        ɠ: "g",
        ꞡ: "g",
        ᵹ: "g",
        ꝿ: "g",
        "ⓗ": "h",
        ｈ: "h",
        ĥ: "h",
        ḣ: "h",
        ḧ: "h",
        ȟ: "h",
        ḥ: "h",
        ḩ: "h",
        ḫ: "h",
        ẖ: "h",
        ħ: "h",
        ⱨ: "h",
        ⱶ: "h",
        ɥ: "h",
        ƕ: "hv",
        "ⓘ": "i",
        ｉ: "i",
        ì: "i",
        í: "i",
        î: "i",
        ĩ: "i",
        ī: "i",
        ĭ: "i",
        ï: "i",
        ḯ: "i",
        ỉ: "i",
        ǐ: "i",
        ȉ: "i",
        ȋ: "i",
        ị: "i",
        į: "i",
        ḭ: "i",
        ɨ: "i",
        ı: "i",
        "ⓙ": "j",
        ｊ: "j",
        ĵ: "j",
        ǰ: "j",
        ɉ: "j",
        "ⓚ": "k",
        ｋ: "k",
        ḱ: "k",
        ǩ: "k",
        ḳ: "k",
        ķ: "k",
        ḵ: "k",
        ƙ: "k",
        ⱪ: "k",
        ꝁ: "k",
        ꝃ: "k",
        ꝅ: "k",
        ꞣ: "k",
        "ⓛ": "l",
        ｌ: "l",
        ŀ: "l",
        ĺ: "l",
        ľ: "l",
        ḷ: "l",
        ḹ: "l",
        ļ: "l",
        ḽ: "l",
        ḻ: "l",
        ſ: "l",
        ł: "l",
        ƚ: "l",
        ɫ: "l",
        ⱡ: "l",
        ꝉ: "l",
        ꞁ: "l",
        ꝇ: "l",
        ǉ: "lj",
        "ⓜ": "m",
        ｍ: "m",
        ḿ: "m",
        ṁ: "m",
        ṃ: "m",
        ɱ: "m",
        ɯ: "m",
        "ⓝ": "n",
        ｎ: "n",
        ǹ: "n",
        ń: "n",
        ñ: "n",
        ṅ: "n",
        ň: "n",
        ṇ: "n",
        ņ: "n",
        ṋ: "n",
        ṉ: "n",
        ƞ: "n",
        ɲ: "n",
        ŉ: "n",
        ꞑ: "n",
        ꞥ: "n",
        ǌ: "nj",
        "ⓞ": "o",
        ｏ: "o",
        ò: "o",
        ó: "o",
        ô: "o",
        ồ: "o",
        ố: "o",
        ỗ: "o",
        ổ: "o",
        õ: "o",
        ṍ: "o",
        ȭ: "o",
        ṏ: "o",
        ō: "o",
        ṑ: "o",
        ṓ: "o",
        ŏ: "o",
        ȯ: "o",
        ȱ: "o",
        ö: "o",
        ȫ: "o",
        ỏ: "o",
        ő: "o",
        ǒ: "o",
        ȍ: "o",
        ȏ: "o",
        ơ: "o",
        ờ: "o",
        ớ: "o",
        ỡ: "o",
        ở: "o",
        ợ: "o",
        ọ: "o",
        ộ: "o",
        ǫ: "o",
        ǭ: "o",
        ø: "o",
        ǿ: "o",
        ɔ: "o",
        ꝋ: "o",
        ꝍ: "o",
        ɵ: "o",
        œ: "oe",
        ƣ: "oi",
        ȣ: "ou",
        ꝏ: "oo",
        "ⓟ": "p",
        ｐ: "p",
        ṕ: "p",
        ṗ: "p",
        ƥ: "p",
        ᵽ: "p",
        ꝑ: "p",
        ꝓ: "p",
        ꝕ: "p",
        "ⓠ": "q",
        ｑ: "q",
        ɋ: "q",
        ꝗ: "q",
        ꝙ: "q",
        "ⓡ": "r",
        ｒ: "r",
        ŕ: "r",
        ṙ: "r",
        ř: "r",
        ȑ: "r",
        ȓ: "r",
        ṛ: "r",
        ṝ: "r",
        ŗ: "r",
        ṟ: "r",
        ɍ: "r",
        ɽ: "r",
        ꝛ: "r",
        ꞧ: "r",
        ꞃ: "r",
        "ⓢ": "s",
        ｓ: "s",
        ß: "s",
        ś: "s",
        ṥ: "s",
        ŝ: "s",
        ṡ: "s",
        š: "s",
        ṧ: "s",
        ṣ: "s",
        ṩ: "s",
        ș: "s",
        ş: "s",
        ȿ: "s",
        ꞩ: "s",
        ꞅ: "s",
        ẛ: "s",
        "ⓣ": "t",
        ｔ: "t",
        ṫ: "t",
        ẗ: "t",
        ť: "t",
        ṭ: "t",
        ț: "t",
        ţ: "t",
        ṱ: "t",
        ṯ: "t",
        ŧ: "t",
        ƭ: "t",
        ʈ: "t",
        ⱦ: "t",
        ꞇ: "t",
        ꜩ: "tz",
        "ⓤ": "u",
        ｕ: "u",
        ù: "u",
        ú: "u",
        û: "u",
        ũ: "u",
        ṹ: "u",
        ū: "u",
        ṻ: "u",
        ŭ: "u",
        ü: "u",
        ǜ: "u",
        ǘ: "u",
        ǖ: "u",
        ǚ: "u",
        ủ: "u",
        ů: "u",
        ű: "u",
        ǔ: "u",
        ȕ: "u",
        ȗ: "u",
        ư: "u",
        ừ: "u",
        ứ: "u",
        ữ: "u",
        ử: "u",
        ự: "u",
        ụ: "u",
        ṳ: "u",
        ų: "u",
        ṷ: "u",
        ṵ: "u",
        ʉ: "u",
        "ⓥ": "v",
        ｖ: "v",
        ṽ: "v",
        ṿ: "v",
        ʋ: "v",
        ꝟ: "v",
        ʌ: "v",
        ꝡ: "vy",
        "ⓦ": "w",
        ｗ: "w",
        ẁ: "w",
        ẃ: "w",
        ŵ: "w",
        ẇ: "w",
        ẅ: "w",
        ẘ: "w",
        ẉ: "w",
        ⱳ: "w",
        "ⓧ": "x",
        ｘ: "x",
        ẋ: "x",
        ẍ: "x",
        "ⓨ": "y",
        ｙ: "y",
        ỳ: "y",
        ý: "y",
        ŷ: "y",
        ỹ: "y",
        ȳ: "y",
        ẏ: "y",
        ÿ: "y",
        ỷ: "y",
        ẙ: "y",
        ỵ: "y",
        ƴ: "y",
        ɏ: "y",
        ỿ: "y",
        "ⓩ": "z",
        ｚ: "z",
        ź: "z",
        ẑ: "z",
        ż: "z",
        ž: "z",
        ẓ: "z",
        ẕ: "z",
        ƶ: "z",
        ȥ: "z",
        ɀ: "z",
        ⱬ: "z",
        ꝣ: "z",
        Ά: "Α",
        Έ: "Ε",
        Ή: "Η",
        Ί: "Ι",
        Ϊ: "Ι",
        Ό: "Ο",
        Ύ: "Υ",
        Ϋ: "Υ",
        Ώ: "Ω",
        ά: "α",
        έ: "ε",
        ή: "η",
        ί: "ι",
        ϊ: "ι",
        ΐ: "ι",
        ό: "ο",
        ύ: "υ",
        ϋ: "υ",
        ΰ: "υ",
        ώ: "ω",
        ς: "σ",
        "’": "'",
      };
    }),
    x.define("select2/data/base", ["../utils"], function (e) {
      function t(e, n) {
        t.__super__.constructor.call(this);
      }
      return (
        e.Extend(t, e.Observable),
        (t.prototype.current = function (e) {
          throw new Error(
            "The `current` method must be defined in child classes."
          );
        }),
        (t.prototype.query = function (e, t) {
          throw new Error(
            "The `query` method must be defined in child classes."
          );
        }),
        (t.prototype.bind = function (e, t) {}),
        (t.prototype.destroy = function () {}),
        (t.prototype.generateResultId = function (t, n) {
          return (
            (t = t.id + "-result-"),
            (t += e.generateChars(4)),
            null != n.id
              ? (t += "-" + n.id.toString())
              : (t += "-" + e.generateChars(4)),
            t
          );
        }),
        t
      );
    }),
    x.define(
      "select2/data/select",
      ["./base", "../utils", "jquery"],
      function (e, t, n) {
        function s(e, t) {
          (this.$element = e),
            (this.options = t),
            s.__super__.constructor.call(this);
        }
        return (
          t.Extend(s, e),
          (s.prototype.current = function (e) {
            var t = this;
            e(
              Array.prototype.map.call(
                this.$element[0].querySelectorAll(":checked"),
                function (e) {
                  return t.item(n(e));
                }
              )
            );
          }),
          (s.prototype.select = function (e) {
            var t,
              n = this;
            if (
              ((e.selected = !0),
              null != e.element && "option" === e.element.tagName.toLowerCase())
            )
              return (
                (e.element.selected = !0),
                void this.$element.trigger("input").trigger("change")
              );
            this.$element.prop("multiple")
              ? this.current(function (t) {
                  var s = [];
                  (e = [e]).push.apply(e, t);
                  for (var i = 0; i < e.length; i++) {
                    var r = e[i].id;
                    -1 === s.indexOf(r) && s.push(r);
                  }
                  n.$element.val(s),
                    n.$element.trigger("input").trigger("change");
                })
              : ((t = e.id),
                this.$element.val(t),
                this.$element.trigger("input").trigger("change"));
          }),
          (s.prototype.unselect = function (e) {
            var t = this;
            if (this.$element.prop("multiple")) {
              if (
                ((e.selected = !1),
                null != e.element &&
                  "option" === e.element.tagName.toLowerCase())
              )
                return (
                  (e.element.selected = !1),
                  void this.$element.trigger("input").trigger("change")
                );
              this.current(function (n) {
                for (var s = [], i = 0; i < n.length; i++) {
                  var r = n[i].id;
                  r !== e.id && -1 === s.indexOf(r) && s.push(r);
                }
                t.$element.val(s),
                  t.$element.trigger("input").trigger("change");
              });
            }
          }),
          (s.prototype.bind = function (e, t) {
            var n = this;
            (this.container = e).on("select", function (e) {
              n.select(e.data);
            }),
              e.on("unselect", function (e) {
                n.unselect(e.data);
              });
          }),
          (s.prototype.destroy = function () {
            this.$element.find("*").each(function () {
              t.RemoveData(this);
            });
          }),
          (s.prototype.query = function (e, t) {
            var s = [],
              i = this;
            this.$element.children().each(function () {
              var t;
              ("option" !== this.tagName.toLowerCase() &&
                "optgroup" !== this.tagName.toLowerCase()) ||
                ((t = n(this)),
                (t = i.item(t)),
                null !== (t = i.matches(e, t)) && s.push(t));
            }),
              t({ results: s });
          }),
          (s.prototype.addOptions = function (e) {
            this.$element.append(e);
          }),
          (s.prototype.option = function (e) {
            var s;
            return (
              e.children
                ? ((s = document.createElement("optgroup")).label = e.text)
                : void 0 !== (s = document.createElement("option")).textContent
                ? (s.textContent = e.text)
                : (s.innerText = e.text),
              void 0 !== e.id && (s.value = e.id),
              e.disabled && (s.disabled = !0),
              e.selected && (s.selected = !0),
              e.title && (s.title = e.title),
              ((e = this._normalizeItem(e)).element = s),
              t.StoreData(s, "data", e),
              n(s)
            );
          }),
          (s.prototype.item = function (e) {
            var s = {};
            if (null != (s = t.GetData(e[0], "data"))) return s;
            var i = e[0];
            if ("option" === i.tagName.toLowerCase())
              s = {
                id: e.val(),
                text: e.text(),
                disabled: e.prop("disabled"),
                selected: e.prop("selected"),
                title: e.prop("title"),
              };
            else if ("optgroup" === i.tagName.toLowerCase()) {
              s = {
                text: e.prop("label"),
                children: [],
                title: e.prop("title"),
              };
              for (
                var r = e.children("option"), o = [], a = 0;
                a < r.length;
                a++
              ) {
                var l = n(r[a]);
                l = this.item(l);
                o.push(l);
              }
              s.children = o;
            }
            return (
              ((s = this._normalizeItem(s)).element = e[0]),
              t.StoreData(e[0], "data", s),
              s
            );
          }),
          (s.prototype._normalizeItem = function (e) {
            return (
              e !== Object(e) && (e = { id: e, text: e }),
              null != (e = n.extend({}, { text: "" }, e)).id &&
                (e.id = e.id.toString()),
              null != e.text && (e.text = e.text.toString()),
              null == e._resultId &&
                e.id &&
                null != this.container &&
                (e._resultId = this.generateResultId(this.container, e)),
              n.extend({}, { selected: !1, disabled: !1 }, e)
            );
          }),
          (s.prototype.matches = function (e, t) {
            return this.options.get("matcher")(e, t);
          }),
          s
        );
      }
    ),
    x.define(
      "select2/data/array",
      ["./select", "../utils", "jquery"],
      function (e, t, n) {
        function s(e, t) {
          (this._dataToConvert = t.get("data") || []),
            s.__super__.constructor.call(this, e, t);
        }
        return (
          t.Extend(s, e),
          (s.prototype.bind = function (e, t) {
            s.__super__.bind.call(this, e, t),
              this.addOptions(this.convertToOptions(this._dataToConvert));
          }),
          (s.prototype.select = function (e) {
            var t = this.$element.find("option").filter(function (t, n) {
              return n.value == e.id.toString();
            });
            0 === t.length && ((t = this.option(e)), this.addOptions(t)),
              s.__super__.select.call(this, e);
          }),
          (s.prototype.convertToOptions = function (e) {
            for (
              var t = this,
                s = this.$element.find("option"),
                i = s
                  .map(function () {
                    return t.item(n(this)).id;
                  })
                  .get(),
                r = [],
                o = 0;
              o < e.length;
              o++
            ) {
              var a,
                l,
                c = this._normalizeItem(e[o]);
              0 <= i.indexOf(c.id)
                ? ((a = s.filter(
                    (function (e) {
                      return function () {
                        return n(this).val() == e.id;
                      };
                    })(c)
                  )),
                  (l = this.item(a)),
                  (l = n.extend(!0, {}, c, l)),
                  (l = this.option(l)),
                  a.replaceWith(l))
                : ((l = this.option(c)),
                  c.children &&
                    ((c = this.convertToOptions(c.children)), l.append(c)),
                  r.push(l));
            }
            return r;
          }),
          s
        );
      }
    ),
    x.define(
      "select2/data/ajax",
      ["./array", "../utils", "jquery"],
      function (e, t, n) {
        function s(e, t) {
          (this.ajaxOptions = this._applyDefaults(t.get("ajax"))),
            null != this.ajaxOptions.processResults &&
              (this.processResults = this.ajaxOptions.processResults),
            s.__super__.constructor.call(this, e, t);
        }
        return (
          t.Extend(s, e),
          (s.prototype._applyDefaults = function (e) {
            var t = {
              data: function (e) {
                return n.extend({}, e, { q: e.term });
              },
              transport: function (e, t, s) {
                return (e = n.ajax(e)).then(t), e.fail(s), e;
              },
            };
            return n.extend({}, t, e, !0);
          }),
          (s.prototype.processResults = function (e) {
            return e;
          }),
          (s.prototype.query = function (e, t) {
            var s = this;
            null != this._request &&
              ("function" == typeof this._request.abort &&
                this._request.abort(),
              (this._request = null));
            var i = n.extend({ type: "GET" }, this.ajaxOptions);
            function r() {
              var n = i.transport(
                i,
                function (n) {
                  (n = s.processResults(n, e)),
                    s.options.get("debug") &&
                      window.console &&
                      console.error &&
                      ((n && n.results && Array.isArray(n.results)) ||
                        console.error(
                          "Select2: The AJAX results did not return an array in the `results` key of the response."
                        )),
                    t(n);
                },
                function () {
                  ("status" in n && (0 === n.status || "0" === n.status)) ||
                    s.trigger("results:message", { message: "errorLoading" });
                }
              );
              s._request = n;
            }
            "function" == typeof i.url &&
              (i.url = i.url.call(this.$element, e)),
              "function" == typeof i.data &&
                (i.data = i.data.call(this.$element, e)),
              this.ajaxOptions.delay && null != e.term
                ? (this._queryTimeout &&
                    window.clearTimeout(this._queryTimeout),
                  (this._queryTimeout = window.setTimeout(
                    r,
                    this.ajaxOptions.delay
                  )))
                : r();
          }),
          s
        );
      }
    ),
    x.define("select2/data/tags", ["jquery"], function (e) {
      function t(e, t, n) {
        var s = n.get("tags"),
          i = n.get("createTag");
        if (
          (void 0 !== i && (this.createTag = i),
          void 0 !== (i = n.get("insertTag")) && (this.insertTag = i),
          e.call(this, t, n),
          Array.isArray(s))
        )
          for (var r = 0; r < s.length; r++) {
            var o = s[r];
            (o = this._normalizeItem(o)), (o = this.option(o));
            this.$element.append(o);
          }
      }
      return (
        (t.prototype.query = function (e, t, n) {
          var s = this;
          this._removeOldTags(),
            null != t.term && null == t.page
              ? e.call(this, t, function e(i, r) {
                  for (var o = i.results, a = 0; a < o.length; a++) {
                    var l = o[a],
                      c = null != l.children && !e({ results: l.children }, !0);
                    if (
                      (l.text || "").toUpperCase() ===
                        (t.term || "").toUpperCase() ||
                      c
                    )
                      return !r && ((i.data = o), void n(i));
                  }
                  if (r) return !0;
                  var u,
                    d = s.createTag(t);
                  null != d &&
                    ((u = s.option(d)).attr("data-select2-tag", "true"),
                    s.addOptions([u]),
                    s.insertTag(o, d)),
                    (i.results = o),
                    n(i);
                })
              : e.call(this, t, n);
        }),
        (t.prototype.createTag = function (e, t) {
          return null == t.term || "" === (t = t.term.trim())
            ? null
            : { id: t, text: t };
        }),
        (t.prototype.insertTag = function (e, t, n) {
          t.unshift(n);
        }),
        (t.prototype._removeOldTags = function (t) {
          this.$element.find("option[data-select2-tag]").each(function () {
            this.selected || e(this).remove();
          });
        }),
        t
      );
    }),
    x.define("select2/data/tokenizer", ["jquery"], function (e) {
      function t(e, t, n) {
        var s = n.get("tokenizer");
        void 0 !== s && (this.tokenizer = s), e.call(this, t, n);
      }
      return (
        (t.prototype.bind = function (e, t, n) {
          e.call(this, t, n),
            (this.$search =
              t.dropdown.$search ||
              t.selection.$search ||
              n.find(".select2-search__field"));
        }),
        (t.prototype.query = function (t, n, s) {
          var i = this;
          n.term = n.term || "";
          var r = this.tokenizer(n, this.options, function (t) {
            var n,
              s = i._normalizeItem(t);
            i.$element.find("option").filter(function () {
              return e(this).val() === s.id;
            }).length ||
              ((n = i.option(s)).attr("data-select2-tag", !0),
              i._removeOldTags(),
              i.addOptions([n])),
              (n = s),
              i.trigger("select", { data: n });
          });
          r.term !== n.term &&
            (this.$search.length &&
              (this.$search.val(r.term), this.$search.trigger("focus")),
            (n.term = r.term)),
            t.call(this, n, s);
        }),
        (t.prototype.tokenizer = function (t, n, s, i) {
          for (
            var r = s.get("tokenSeparators") || [],
              o = n.term,
              a = 0,
              l =
                this.createTag ||
                function (e) {
                  return { id: e.term, text: e.term };
                };
            a < o.length;

          ) {
            var c = o[a];
            -1 !== r.indexOf(c)
              ? ((c = o.substr(0, a)),
                null != (c = l(e.extend({}, n, { term: c })))
                  ? (i(c), (o = o.substr(a + 1) || ""), (a = 0))
                  : a++)
              : a++;
          }
          return { term: o };
        }),
        t
      );
    }),
    x.define("select2/data/minimumInputLength", [], function () {
      function e(e, t, n) {
        (this.minimumInputLength = n.get("minimumInputLength")),
          e.call(this, t, n);
      }
      return (
        (e.prototype.query = function (e, t, n) {
          (t.term = t.term || ""),
            t.term.length < this.minimumInputLength
              ? this.trigger("results:message", {
                  message: "inputTooShort",
                  args: {
                    minimum: this.minimumInputLength,
                    input: t.term,
                    params: t,
                  },
                })
              : e.call(this, t, n);
        }),
        e
      );
    }),
    x.define("select2/data/maximumInputLength", [], function () {
      function e(e, t, n) {
        (this.maximumInputLength = n.get("maximumInputLength")),
          e.call(this, t, n);
      }
      return (
        (e.prototype.query = function (e, t, n) {
          (t.term = t.term || ""),
            0 < this.maximumInputLength &&
            t.term.length > this.maximumInputLength
              ? this.trigger("results:message", {
                  message: "inputTooLong",
                  args: {
                    maximum: this.maximumInputLength,
                    input: t.term,
                    params: t,
                  },
                })
              : e.call(this, t, n);
        }),
        e
      );
    }),
    x.define("select2/data/maximumSelectionLength", [], function () {
      function e(e, t, n) {
        (this.maximumSelectionLength = n.get("maximumSelectionLength")),
          e.call(this, t, n);
      }
      return (
        (e.prototype.bind = function (e, t, n) {
          var s = this;
          e.call(this, t, n),
            t.on("select", function () {
              s._checkIfMaximumSelected();
            });
        }),
        (e.prototype.query = function (e, t, n) {
          var s = this;
          this._checkIfMaximumSelected(function () {
            e.call(s, t, n);
          });
        }),
        (e.prototype._checkIfMaximumSelected = function (e, t) {
          var n = this;
          this.current(function (e) {
            (e = null != e ? e.length : 0),
              0 < n.maximumSelectionLength && e >= n.maximumSelectionLength
                ? n.trigger("results:message", {
                    message: "maximumSelected",
                    args: { maximum: n.maximumSelectionLength },
                  })
                : t && t();
          });
        }),
        e
      );
    }),
    x.define("select2/dropdown", ["jquery", "./utils"], function (e, t) {
      function n(e, t) {
        (this.$element = e),
          (this.options = t),
          n.__super__.constructor.call(this);
      }
      return (
        t.Extend(n, t.Observable),
        (n.prototype.render = function () {
          var t = e(
            '<span class="select2-dropdown"><span class="select2-results"></span></span>'
          );
          return t.attr("dir", this.options.get("dir")), (this.$dropdown = t);
        }),
        (n.prototype.bind = function () {}),
        (n.prototype.position = function (e, t) {}),
        (n.prototype.destroy = function () {
          this.$dropdown.remove();
        }),
        n
      );
    }),
    x.define("select2/dropdown/search", ["jquery"], function (e) {
      function t() {}
      return (
        (t.prototype.render = function (t) {
          var n = t.call(this),
            s = this.options.get("translations").get("search");
          t = e(
            '<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>'
          );
          return (
            (this.$searchContainer = t),
            (this.$search = t.find("input")),
            this.$search.prop("autocomplete", this.options.get("autocomplete")),
            this.$search.attr("aria-label", s()),
            n.prepend(t),
            n
          );
        }),
        (t.prototype.bind = function (t, n, s) {
          var i = this,
            r = n.id + "-results";
          t.call(this, n, s),
            this.$search.on("keydown", function (e) {
              i.trigger("keypress", e),
                (i._keyUpPrevented = e.isDefaultPrevented());
            }),
            this.$search.on("input", function (t) {
              e(this).off("keyup");
            }),
            this.$search.on("keyup input", function (e) {
              i.handleSearch(e);
            }),
            n.on("open", function () {
              i.$search.attr("tabindex", 0),
                i.$search.attr("aria-controls", r),
                i.$search.trigger("focus"),
                window.setTimeout(function () {
                  i.$search.trigger("focus");
                }, 0);
            }),
            n.on("close", function () {
              i.$search.attr("tabindex", -1),
                i.$search.removeAttr("aria-controls"),
                i.$search.removeAttr("aria-activedescendant"),
                i.$search.val(""),
                i.$search.trigger("blur");
            }),
            n.on("focus", function () {
              n.isOpen() || i.$search.trigger("focus");
            }),
            n.on("results:all", function (e) {
              (null != e.query.term && "" !== e.query.term) ||
                (i.showSearch(e)
                  ? i.$searchContainer[0].classList.remove(
                      "select2-search--hide"
                    )
                  : i.$searchContainer[0].classList.add(
                      "select2-search--hide"
                    ));
            }),
            n.on("results:focus", function (e) {
              e.data._resultId
                ? i.$search.attr("aria-activedescendant", e.data._resultId)
                : i.$search.removeAttr("aria-activedescendant");
            });
        }),
        (t.prototype.handleSearch = function (e) {
          var t;
          this._keyUpPrevented ||
            ((t = this.$search.val()), this.trigger("query", { term: t })),
            (this._keyUpPrevented = !1);
        }),
        (t.prototype.showSearch = function (e, t) {
          return !0;
        }),
        t
      );
    }),
    x.define("select2/dropdown/hidePlaceholder", [], function () {
      function e(e, t, n, s) {
        (this.placeholder = this.normalizePlaceholder(n.get("placeholder"))),
          e.call(this, t, n, s);
      }
      return (
        (e.prototype.append = function (e, t) {
          (t.results = this.removePlaceholder(t.results)), e.call(this, t);
        }),
        (e.prototype.normalizePlaceholder = function (e, t) {
          return "string" == typeof t ? { id: "", text: t } : t;
        }),
        (e.prototype.removePlaceholder = function (e, t) {
          for (var n = t.slice(0), s = t.length - 1; 0 <= s; s--) {
            var i = t[s];
            this.placeholder.id === i.id && n.splice(s, 1);
          }
          return n;
        }),
        e
      );
    }),
    x.define("select2/dropdown/infiniteScroll", ["jquery"], function (e) {
      function t(e, t, n, s) {
        (this.lastParams = {}),
          e.call(this, t, n, s),
          (this.$loadingMore = this.createLoadingMore()),
          (this.loading = !1);
      }
      return (
        (t.prototype.append = function (e, t) {
          this.$loadingMore.remove(),
            (this.loading = !1),
            e.call(this, t),
            this.showLoadingMore(t) &&
              (this.$results.append(this.$loadingMore),
              this.loadMoreIfNeeded());
        }),
        (t.prototype.bind = function (e, t, n) {
          var s = this;
          e.call(this, t, n),
            t.on("query", function (e) {
              (s.lastParams = e), (s.loading = !0);
            }),
            t.on("query:append", function (e) {
              (s.lastParams = e), (s.loading = !0);
            }),
            this.$results.on("scroll", this.loadMoreIfNeeded.bind(this));
        }),
        (t.prototype.loadMoreIfNeeded = function () {
          var t = e.contains(document.documentElement, this.$loadingMore[0]);
          !this.loading &&
            t &&
            ((t = this.$results.offset().top + this.$results.outerHeight(!1)),
            this.$loadingMore.offset().top +
              this.$loadingMore.outerHeight(!1) <=
              t + 50 && this.loadMore());
        }),
        (t.prototype.loadMore = function () {
          this.loading = !0;
          var t = e.extend({}, { page: 1 }, this.lastParams);
          t.page++, this.trigger("query:append", t);
        }),
        (t.prototype.showLoadingMore = function (e, t) {
          return t.pagination && t.pagination.more;
        }),
        (t.prototype.createLoadingMore = function () {
          var t = e(
              '<li class="select2-results__option select2-results__option--load-more"role="option" aria-disabled="true"></li>'
            ),
            n = this.options.get("translations").get("loadingMore");
          return t.html(n(this.lastParams)), t;
        }),
        t
      );
    }),
    x.define(
      "select2/dropdown/attachBody",
      ["jquery", "../utils"],
      function (e, t) {
        function n(t, n, s) {
          (this.$dropdownParent = e(s.get("dropdownParent") || document.body)),
            t.call(this, n, s);
        }
        return (
          (n.prototype.bind = function (e, t, n) {
            var s = this;
            e.call(this, t, n),
              t.on("open", function () {
                s._showDropdown(),
                  s._attachPositioningHandler(t),
                  s._bindContainerResultHandlers(t);
              }),
              t.on("close", function () {
                s._hideDropdown(), s._detachPositioningHandler(t);
              }),
              this.$dropdownContainer.on("mousedown", function (e) {
                e.stopPropagation();
              });
          }),
          (n.prototype.destroy = function (e) {
            e.call(this), this.$dropdownContainer.remove();
          }),
          (n.prototype.position = function (e, t, n) {
            t.attr("class", n.attr("class")),
              t[0].classList.remove("select2"),
              t[0].classList.add("select2-container--open"),
              t.css({ position: "absolute", top: -999999 }),
              (this.$container = n);
          }),
          (n.prototype.render = function (t) {
            var n = e("<span></span>");
            t = t.call(this);
            return n.append(t), (this.$dropdownContainer = n);
          }),
          (n.prototype._hideDropdown = function (e) {
            this.$dropdownContainer.detach();
          }),
          (n.prototype._bindContainerResultHandlers = function (e, t) {
            var n;
            this._containerResultsHandlersBound ||
              ((n = this),
              t.on("results:all", function () {
                n._positionDropdown(), n._resizeDropdown();
              }),
              t.on("results:append", function () {
                n._positionDropdown(), n._resizeDropdown();
              }),
              t.on("results:message", function () {
                n._positionDropdown(), n._resizeDropdown();
              }),
              t.on("select", function () {
                n._positionDropdown(), n._resizeDropdown();
              }),
              t.on("unselect", function () {
                n._positionDropdown(), n._resizeDropdown();
              }),
              (this._containerResultsHandlersBound = !0));
          }),
          (n.prototype._attachPositioningHandler = function (n, s) {
            var i = this,
              r = "scroll.select2." + s.id,
              o = "resize.select2." + s.id,
              a = "orientationchange.select2." + s.id;
            (s = this.$container.parents().filter(t.hasScroll)).each(
              function () {
                t.StoreData(this, "select2-scroll-position", {
                  x: e(this).scrollLeft(),
                  y: e(this).scrollTop(),
                });
              }
            ),
              s.on(r, function (n) {
                var s = t.GetData(this, "select2-scroll-position");
                e(this).scrollTop(s.y);
              }),
              e(window).on(r + " " + o + " " + a, function (e) {
                i._positionDropdown(), i._resizeDropdown();
              });
          }),
          (n.prototype._detachPositioningHandler = function (n, s) {
            var i = "scroll.select2." + s.id,
              r = "resize.select2." + s.id;
            s = "orientationchange.select2." + s.id;
            this.$container.parents().filter(t.hasScroll).off(i),
              e(window).off(i + " " + r + " " + s);
          }),
          (n.prototype._positionDropdown = function () {
            var t = e(window),
              n = this.$dropdown[0].classList.contains(
                "select2-dropdown--above"
              ),
              s = this.$dropdown[0].classList.contains(
                "select2-dropdown--below"
              ),
              i = null,
              r = this.$container.offset();
            r.bottom = r.top + this.$container.outerHeight(!1);
            var o = { height: this.$container.outerHeight(!1) };
            (o.top = r.top), (o.bottom = r.top + o.height);
            var a = this.$dropdown.outerHeight(!1),
              l = t.scrollTop(),
              c = t.scrollTop() + t.height(),
              u = l < r.top - a;
            (t = c > r.bottom + a), (l = { left: r.left, top: o.bottom });
            "static" === (c = this.$dropdownParent).css("position") &&
              (c = c.offsetParent()),
              (r = { top: 0, left: 0 }),
              (e.contains(document.body, c[0]) || c[0].isConnected) &&
                (r = c.offset()),
              (l.top -= r.top),
              (l.left -= r.left),
              n || s || (i = "below"),
              t || !u || n ? !u && t && n && (i = "below") : (i = "above"),
              ("above" == i || (n && "below" !== i)) &&
                (l.top = o.top - r.top - a),
              null != i &&
                (this.$dropdown[0].classList.remove("select2-dropdown--below"),
                this.$dropdown[0].classList.remove("select2-dropdown--above"),
                this.$dropdown[0].classList.add("select2-dropdown--" + i),
                this.$container[0].classList.remove("select2-container--below"),
                this.$container[0].classList.remove("select2-container--above"),
                this.$container[0].classList.add("select2-container--" + i)),
              this.$dropdownContainer.css(l);
          }),
          (n.prototype._resizeDropdown = function () {
            var e = { width: this.$container.outerWidth(!1) + "px" };
            this.options.get("dropdownAutoWidth") &&
              ((e.minWidth = e.width),
              (e.position = "relative"),
              (e.width = "auto")),
              this.$dropdown.css(e);
          }),
          (n.prototype._showDropdown = function (e) {
            this.$dropdownContainer.appendTo(this.$dropdownParent),
              this._positionDropdown(),
              this._resizeDropdown();
          }),
          n
        );
      }
    ),
    x.define("select2/dropdown/minimumResultsForSearch", [], function () {
      function e(e, t, n, s) {
        (this.minimumResultsForSearch = n.get("minimumResultsForSearch")),
          this.minimumResultsForSearch < 0 &&
            (this.minimumResultsForSearch = 1 / 0),
          e.call(this, t, n, s);
      }
      return (
        (e.prototype.showSearch = function (e, t) {
          return (
            !(
              (function e(t) {
                for (var n = 0, s = 0; s < t.length; s++) {
                  var i = t[s];
                  i.children ? (n += e(i.children)) : n++;
                }
                return n;
              })(t.data.results) < this.minimumResultsForSearch
            ) && e.call(this, t)
          );
        }),
        e
      );
    }),
    x.define("select2/dropdown/selectOnClose", ["../utils"], function (e) {
      function t() {}
      return (
        (t.prototype.bind = function (e, t, n) {
          var s = this;
          e.call(this, t, n),
            t.on("close", function (e) {
              s._handleSelectOnClose(e);
            });
        }),
        (t.prototype._handleSelectOnClose = function (t, n) {
          if (n && null != n.originalSelect2Event) {
            var s = n.originalSelect2Event;
            if ("select" === s._type || "unselect" === s._type) return;
          }
          (s = this.getHighlightedResults()).length < 1 ||
            (null != (s = e.GetData(s[0], "data")).element &&
              s.element.selected) ||
            (null == s.element && s.selected) ||
            this.trigger("select", { data: s });
        }),
        t
      );
    }),
    x.define("select2/dropdown/closeOnSelect", [], function () {
      function e() {}
      return (
        (e.prototype.bind = function (e, t, n) {
          var s = this;
          e.call(this, t, n),
            t.on("select", function (e) {
              s._selectTriggered(e);
            }),
            t.on("unselect", function (e) {
              s._selectTriggered(e);
            });
        }),
        (e.prototype._selectTriggered = function (e, t) {
          var n = t.originalEvent;
          (n && (n.ctrlKey || n.metaKey)) ||
            this.trigger("close", {
              originalEvent: n,
              originalSelect2Event: t,
            });
        }),
        e
      );
    }),
    x.define("select2/dropdown/dropdownCss", ["../utils"], function (e) {
      function t() {}
      return (
        (t.prototype.render = function (t) {
          var n = t.call(this);
          return (
            -1 !==
              (t = this.options.get("dropdownCssClass") || "").indexOf(
                ":all:"
              ) &&
              ((t = t.replace(":all:", "")),
              e.copyNonInternalCssClasses(n[0], this.$element[0])),
            n.addClass(t),
            n
          );
        }),
        t
      );
    }),
    x.define(
      "select2/dropdown/tagsSearchHighlight",
      ["../utils"],
      function (e) {
        function t() {}
        return (
          (t.prototype.highlightFirstItem = function (t) {
            if (
              0 <
              (n = this.$results.find(
                ".select2-results__option--selectable:not(.select2-results__option--selected)"
              )).length
            ) {
              var n,
                s = n.first();
              if (
                (n = e.GetData(s[0], "data").element) &&
                n.getAttribute &&
                "true" === n.getAttribute("data-select2-tag")
              )
                return void s.trigger("mouseenter");
            }
            t.call(this);
          }),
          t
        );
      }
    ),
    x.define("select2/i18n/en", [], function () {
      return {
        errorLoading: function () {
          return "The results could not be loaded.";
        },
        inputTooLong: function (e) {
          var t = e.input.length - e.maximum;
          e = "Please delete " + t + " character";
          return 1 != t && (e += "s"), e;
        },
        inputTooShort: function (e) {
          return (
            "Please enter " +
            (e.minimum - e.input.length) +
            " or more characters"
          );
        },
        loadingMore: function () {
          return "Loading more results…";
        },
        maximumSelected: function (e) {
          var t = "You can only select " + e.maximum + " item";
          return 1 != e.maximum && (t += "s"), t;
        },
        noResults: function () {
          return "No results found";
        },
        searching: function () {
          return "Searching…";
        },
        removeAllItems: function () {
          return "Remove all items";
        },
        removeItem: function () {
          return "Remove item";
        },
        search: function () {
          return "Search";
        },
      };
    }),
    x.define(
      "select2/defaults",
      [
        "jquery",
        "./results",
        "./selection/single",
        "./selection/multiple",
        "./selection/placeholder",
        "./selection/allowClear",
        "./selection/search",
        "./selection/selectionCss",
        "./selection/eventRelay",
        "./utils",
        "./translation",
        "./diacritics",
        "./data/select",
        "./data/array",
        "./data/ajax",
        "./data/tags",
        "./data/tokenizer",
        "./data/minimumInputLength",
        "./data/maximumInputLength",
        "./data/maximumSelectionLength",
        "./dropdown",
        "./dropdown/search",
        "./dropdown/hidePlaceholder",
        "./dropdown/infiniteScroll",
        "./dropdown/attachBody",
        "./dropdown/minimumResultsForSearch",
        "./dropdown/selectOnClose",
        "./dropdown/closeOnSelect",
        "./dropdown/dropdownCss",
        "./dropdown/tagsSearchHighlight",
        "./i18n/en",
      ],
      function (
        e,
        t,
        n,
        s,
        i,
        r,
        o,
        a,
        l,
        c,
        u,
        d,
        p,
        h,
        f,
        g,
        m,
        y,
        v,
        _,
        b,
        $,
        w,
        x,
        A,
        D,
        S,
        E,
        O,
        C,
        L
      ) {
        function T() {
          this.reset();
        }
        return (
          (T.prototype.apply = function (u) {
            var d;
            null == (u = e.extend(!0, {}, this.defaults, u)).dataAdapter &&
              (null != u.ajax
                ? (u.dataAdapter = f)
                : null != u.data
                ? (u.dataAdapter = h)
                : (u.dataAdapter = p),
              0 < u.minimumInputLength &&
                (u.dataAdapter = c.Decorate(u.dataAdapter, y)),
              0 < u.maximumInputLength &&
                (u.dataAdapter = c.Decorate(u.dataAdapter, v)),
              0 < u.maximumSelectionLength &&
                (u.dataAdapter = c.Decorate(u.dataAdapter, _)),
              u.tags && (u.dataAdapter = c.Decorate(u.dataAdapter, g)),
              (null == u.tokenSeparators && null == u.tokenizer) ||
                (u.dataAdapter = c.Decorate(u.dataAdapter, m))),
              null == u.resultsAdapter &&
                ((u.resultsAdapter = t),
                null != u.ajax &&
                  (u.resultsAdapter = c.Decorate(u.resultsAdapter, x)),
                null != u.placeholder &&
                  (u.resultsAdapter = c.Decorate(u.resultsAdapter, w)),
                u.selectOnClose &&
                  (u.resultsAdapter = c.Decorate(u.resultsAdapter, S)),
                u.tags && (u.resultsAdapter = c.Decorate(u.resultsAdapter, C))),
              null == u.dropdownAdapter &&
                (u.multiple
                  ? (u.dropdownAdapter = b)
                  : ((d = c.Decorate(b, $)), (u.dropdownAdapter = d)),
                0 !== u.minimumResultsForSearch &&
                  (u.dropdownAdapter = c.Decorate(u.dropdownAdapter, D)),
                u.closeOnSelect &&
                  (u.dropdownAdapter = c.Decorate(u.dropdownAdapter, E)),
                null != u.dropdownCssClass &&
                  (u.dropdownAdapter = c.Decorate(u.dropdownAdapter, O)),
                (u.dropdownAdapter = c.Decorate(u.dropdownAdapter, A))),
              null == u.selectionAdapter &&
                (u.multiple
                  ? (u.selectionAdapter = s)
                  : (u.selectionAdapter = n),
                null != u.placeholder &&
                  (u.selectionAdapter = c.Decorate(u.selectionAdapter, i)),
                u.allowClear &&
                  (u.selectionAdapter = c.Decorate(u.selectionAdapter, r)),
                u.multiple &&
                  (u.selectionAdapter = c.Decorate(u.selectionAdapter, o)),
                null != u.selectionCssClass &&
                  (u.selectionAdapter = c.Decorate(u.selectionAdapter, a)),
                (u.selectionAdapter = c.Decorate(u.selectionAdapter, l))),
              (u.language = this._resolveLanguage(u.language)),
              u.language.push("en");
            for (var L = [], T = 0; T < u.language.length; T++) {
              var q = u.language[T];
              -1 === L.indexOf(q) && L.push(q);
            }
            return (
              (u.language = L),
              (u.translations = this._processTranslations(u.language, u.debug)),
              u
            );
          }),
          (T.prototype.reset = function () {
            function t(e) {
              return e.replace(/[^\u0000-\u007E]/g, function (e) {
                return d[e] || e;
              });
            }
            this.defaults = {
              amdLanguageBase: "./i18n/",
              autocomplete: "off",
              closeOnSelect: !0,
              debug: !1,
              dropdownAutoWidth: !1,
              escapeMarkup: c.escapeMarkup,
              language: {},
              matcher: function n(s, i) {
                if (null == s.term || "" === s.term.trim()) return i;
                if (i.children && 0 < i.children.length) {
                  for (
                    var r = e.extend(!0, {}, i), o = i.children.length - 1;
                    0 <= o;
                    o--
                  )
                    null == n(s, i.children[o]) && r.children.splice(o, 1);
                  return 0 < r.children.length ? r : n(s, r);
                }
                var a = t(i.text).toUpperCase(),
                  l = t(s.term).toUpperCase();
                return -1 < a.indexOf(l) ? i : null;
              },
              minimumInputLength: 0,
              maximumInputLength: 0,
              maximumSelectionLength: 0,
              minimumResultsForSearch: 0,
              selectOnClose: !1,
              scrollAfterSelect: !1,
              sorter: function (e) {
                return e;
              },
              templateResult: function (e) {
                return e.text;
              },
              templateSelection: function (e) {
                return e.text;
              },
              theme: "default",
              width: "resolve",
            };
          }),
          (T.prototype.applyFromElement = function (e, t) {
            var n = e.language,
              s = this.defaults.language,
              i = t.prop("lang");
            (t = t.closest("[lang]").prop("lang")),
              (t = Array.prototype.concat.call(
                this._resolveLanguage(i),
                this._resolveLanguage(n),
                this._resolveLanguage(s),
                this._resolveLanguage(t)
              ));
            return (e.language = t), e;
          }),
          (T.prototype._resolveLanguage = function (t) {
            if (!t) return [];
            if (e.isEmptyObject(t)) return [];
            if (e.isPlainObject(t)) return [t];
            for (
              var n, s = Array.isArray(t) ? t : [t], i = [], r = 0;
              r < s.length;
              r++
            )
              i.push(s[r]),
                "string" == typeof s[r] &&
                  0 < s[r].indexOf("-") &&
                  ((n = s[r].split("-")[0]), i.push(n));
            return i;
          }),
          (T.prototype._processTranslations = function (t, n) {
            for (var s = new u(), i = 0; i < t.length; i++) {
              var r = new u(),
                o = t[i];
              if ("string" == typeof o)
                try {
                  r = u.loadPath(o);
                } catch (t) {
                  try {
                    (o = this.defaults.amdLanguageBase + o),
                      (r = u.loadPath(o));
                  } catch (t) {
                    n &&
                      window.console &&
                      console.warn &&
                      console.warn(
                        'Select2: The language file for "' +
                          o +
                          '" could not be automatically loaded. A fallback will be used instead.'
                      );
                  }
                }
              else r = e.isPlainObject(o) ? new u(o) : o;
              s.extend(r);
            }
            return s;
          }),
          (T.prototype.set = function (t, n) {
            var s = {};
            (s[e.camelCase(t)] = n),
              (s = c._convertData(s)),
              e.extend(!0, this.defaults, s);
          }),
          new T()
        );
      }
    ),
    x.define(
      "select2/options",
      ["jquery", "./defaults", "./utils"],
      function (e, t, n) {
        function s(e, n) {
          (this.options = e),
            null != n && this.fromElement(n),
            null != n && (this.options = t.applyFromElement(this.options, n)),
            (this.options = t.apply(this.options));
        }
        return (
          (s.prototype.fromElement = function (t) {
            var s = ["select2"];
            null == this.options.multiple &&
              (this.options.multiple = t.prop("multiple")),
              null == this.options.disabled &&
                (this.options.disabled = t.prop("disabled")),
              null == this.options.autocomplete &&
                t.prop("autocomplete") &&
                (this.options.autocomplete = t.prop("autocomplete")),
              null == this.options.dir &&
                (t.prop("dir")
                  ? (this.options.dir = t.prop("dir"))
                  : t.closest("[dir]").prop("dir")
                  ? (this.options.dir = t.closest("[dir]").prop("dir"))
                  : (this.options.dir = "ltr")),
              t.prop("disabled", this.options.disabled),
              t.prop("multiple", this.options.multiple),
              n.GetData(t[0], "select2Tags") &&
                (this.options.debug &&
                  window.console &&
                  console.warn &&
                  console.warn(
                    'Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'
                  ),
                n.StoreData(t[0], "data", n.GetData(t[0], "select2Tags")),
                n.StoreData(t[0], "tags", !0)),
              n.GetData(t[0], "ajaxUrl") &&
                (this.options.debug &&
                  window.console &&
                  console.warn &&
                  console.warn(
                    "Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."
                  ),
                t.attr("ajax--url", n.GetData(t[0], "ajaxUrl")),
                n.StoreData(t[0], "ajax-Url", n.GetData(t[0], "ajaxUrl")));
            var i = {};
            function r(e, t) {
              return t.toUpperCase();
            }
            for (var o = 0; o < t[0].attributes.length; o++) {
              var a = t[0].attributes[o].name,
                l = "data-";
              a.substr(0, l.length) == l &&
                ((a = a.substring(l.length)),
                (l = n.GetData(t[0], a)),
                (i[a.replace(/-([a-z])/g, r)] = l));
            }
            e.fn.jquery &&
              "1." == e.fn.jquery.substr(0, 2) &&
              t[0].dataset &&
              (i = e.extend(!0, {}, t[0].dataset, i));
            var c,
              u = e.extend(!0, {}, n.GetData(t[0]), i);
            for (c in (u = n._convertData(u)))
              -1 < s.indexOf(c) ||
                (e.isPlainObject(this.options[c])
                  ? e.extend(this.options[c], u[c])
                  : (this.options[c] = u[c]));
            return this;
          }),
          (s.prototype.get = function (e) {
            return this.options[e];
          }),
          (s.prototype.set = function (e, t) {
            this.options[e] = t;
          }),
          s
        );
      }
    ),
    x.define(
      "select2/core",
      ["jquery", "./options", "./utils", "./keys"],
      function (e, t, n, s) {
        var i = function (e, s) {
          null != n.GetData(e[0], "select2") &&
            n.GetData(e[0], "select2").destroy(),
            (this.$element = e),
            (this.id = this._generateId(e)),
            (s = s || {}),
            (this.options = new t(s, e)),
            i.__super__.constructor.call(this);
          var r = e.attr("tabindex") || 0;
          n.StoreData(e[0], "old-tabindex", r),
            e.attr("tabindex", "-1"),
            (s = this.options.get("dataAdapter")),
            (this.dataAdapter = new s(e, this.options)),
            (r = this.render()),
            this._placeContainer(r),
            (s = this.options.get("selectionAdapter")),
            (this.selection = new s(e, this.options)),
            (this.$selection = this.selection.render()),
            this.selection.position(this.$selection, r),
            (s = this.options.get("dropdownAdapter")),
            (this.dropdown = new s(e, this.options)),
            (this.$dropdown = this.dropdown.render()),
            this.dropdown.position(this.$dropdown, r),
            (r = this.options.get("resultsAdapter")),
            (this.results = new r(e, this.options, this.dataAdapter)),
            (this.$results = this.results.render()),
            this.results.position(this.$results, this.$dropdown);
          var o = this;
          this._bindAdapters(),
            this._registerDomEvents(),
            this._registerDataEvents(),
            this._registerSelectionEvents(),
            this._registerDropdownEvents(),
            this._registerResultsEvents(),
            this._registerEvents(),
            this.dataAdapter.current(function (e) {
              o.trigger("selection:update", { data: e });
            }),
            e[0].classList.add("select2-hidden-accessible"),
            e.attr("aria-hidden", "true"),
            this._syncAttributes(),
            n.StoreData(e[0], "select2", this),
            e.data("select2", this);
        };
        return (
          n.Extend(i, n.Observable),
          (i.prototype._generateId = function (e) {
            return (
              "select2-" +
              (null != e.attr("id")
                ? e.attr("id")
                : null != e.attr("name")
                ? e.attr("name") + "-" + n.generateChars(2)
                : n.generateChars(4)
              ).replace(/(:|\.|\[|\]|,)/g, "")
            );
          }),
          (i.prototype._placeContainer = function (e) {
            e.insertAfter(this.$element);
            var t = this._resolveWidth(
              this.$element,
              this.options.get("width")
            );
            null != t && e.css("width", t);
          }),
          (i.prototype._resolveWidth = function (e, t) {
            var n =
              /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
            if ("resolve" == t) {
              var s = this._resolveWidth(e, "style");
              return null != s ? s : this._resolveWidth(e, "element");
            }
            if ("element" == t)
              return (s = e.outerWidth(!1)) <= 0 ? "auto" : s + "px";
            if ("style" != t)
              return "computedstyle" != t
                ? t
                : window.getComputedStyle(e[0]).width;
            if ("string" != typeof (e = e.attr("style"))) return null;
            for (var i = e.split(";"), r = 0, o = i.length; r < o; r += 1) {
              var a = i[r].replace(/\s/g, "").match(n);
              if (null !== a && 1 <= a.length) return a[1];
            }
            return null;
          }),
          (i.prototype._bindAdapters = function () {
            this.dataAdapter.bind(this, this.$container),
              this.selection.bind(this, this.$container),
              this.dropdown.bind(this, this.$container),
              this.results.bind(this, this.$container);
          }),
          (i.prototype._registerDomEvents = function () {
            var e = this;
            this.$element.on("change.select2", function () {
              e.dataAdapter.current(function (t) {
                e.trigger("selection:update", { data: t });
              });
            }),
              this.$element.on("focus.select2", function (t) {
                e.trigger("focus", t);
              }),
              (this._syncA = n.bind(this._syncAttributes, this)),
              (this._syncS = n.bind(this._syncSubtree, this)),
              (this._observer = new window.MutationObserver(function (t) {
                e._syncA(), e._syncS(t);
              })),
              this._observer.observe(this.$element[0], {
                attributes: !0,
                childList: !0,
                subtree: !1,
              });
          }),
          (i.prototype._registerDataEvents = function () {
            var e = this;
            this.dataAdapter.on("*", function (t, n) {
              e.trigger(t, n);
            });
          }),
          (i.prototype._registerSelectionEvents = function () {
            var e = this,
              t = ["toggle", "focus"];
            this.selection.on("toggle", function () {
              e.toggleDropdown();
            }),
              this.selection.on("focus", function (t) {
                e.focus(t);
              }),
              this.selection.on("*", function (n, s) {
                -1 === t.indexOf(n) && e.trigger(n, s);
              });
          }),
          (i.prototype._registerDropdownEvents = function () {
            var e = this;
            this.dropdown.on("*", function (t, n) {
              e.trigger(t, n);
            });
          }),
          (i.prototype._registerResultsEvents = function () {
            var e = this;
            this.results.on("*", function (t, n) {
              e.trigger(t, n);
            });
          }),
          (i.prototype._registerEvents = function () {
            var e = this;
            this.on("open", function () {
              e.$container[0].classList.add("select2-container--open");
            }),
              this.on("close", function () {
                e.$container[0].classList.remove("select2-container--open");
              }),
              this.on("enable", function () {
                e.$container[0].classList.remove("select2-container--disabled");
              }),
              this.on("disable", function () {
                e.$container[0].classList.add("select2-container--disabled");
              }),
              this.on("blur", function () {
                e.$container[0].classList.remove("select2-container--focus");
              }),
              this.on("query", function (t) {
                e.isOpen() || e.trigger("open", {}),
                  this.dataAdapter.query(t, function (n) {
                    e.trigger("results:all", { data: n, query: t });
                  });
              }),
              this.on("query:append", function (t) {
                this.dataAdapter.query(t, function (n) {
                  e.trigger("results:append", { data: n, query: t });
                });
              }),
              this.on("keypress", function (t) {
                var n = t.which;
                e.isOpen()
                  ? n === s.ESC || (n === s.UP && t.altKey)
                    ? (e.close(t), t.preventDefault())
                    : n === s.ENTER || n === s.TAB
                    ? (e.trigger("results:select", {}), t.preventDefault())
                    : n === s.SPACE && t.ctrlKey
                    ? (e.trigger("results:toggle", {}), t.preventDefault())
                    : n === s.UP
                    ? (e.trigger("results:previous", {}), t.preventDefault())
                    : n === s.DOWN &&
                      (e.trigger("results:next", {}), t.preventDefault())
                  : (n === s.ENTER ||
                      n === s.SPACE ||
                      (n === s.DOWN && t.altKey)) &&
                    (e.open(), t.preventDefault());
              });
          }),
          (i.prototype._syncAttributes = function () {
            this.options.set("disabled", this.$element.prop("disabled")),
              this.isDisabled()
                ? (this.isOpen() && this.close(), this.trigger("disable", {}))
                : this.trigger("enable", {});
          }),
          (i.prototype._isChangeMutation = function (e) {
            var t = this;
            if (e.addedNodes && 0 < e.addedNodes.length) {
              for (var n = 0; n < e.addedNodes.length; n++)
                if (e.addedNodes[n].selected) return !0;
            } else {
              if (e.removedNodes && 0 < e.removedNodes.length) return !0;
              if (Array.isArray(e))
                return e.some(function (e) {
                  return t._isChangeMutation(e);
                });
            }
            return !1;
          }),
          (i.prototype._syncSubtree = function (e) {
            e = this._isChangeMutation(e);
            var t = this;
            e &&
              this.dataAdapter.current(function (e) {
                t.trigger("selection:update", { data: e });
              });
          }),
          (i.prototype.trigger = function (e, t) {
            var n = i.__super__.trigger;
            if (
              (void 0 === t && (t = {}),
              e in
                (r = {
                  open: "opening",
                  close: "closing",
                  select: "selecting",
                  unselect: "unselecting",
                  clear: "clearing",
                }))
            ) {
              var s = r[e],
                r = { prevented: !1, name: e, args: t };
              if ((n.call(this, s, r), r.prevented))
                return void (t.prevented = !0);
            }
            n.call(this, e, t);
          }),
          (i.prototype.toggleDropdown = function () {
            this.isDisabled() || (this.isOpen() ? this.close() : this.open());
          }),
          (i.prototype.open = function () {
            this.isOpen() || this.isDisabled() || this.trigger("query", {});
          }),
          (i.prototype.close = function (e) {
            this.isOpen() && this.trigger("close", { originalEvent: e });
          }),
          (i.prototype.isEnabled = function () {
            return !this.isDisabled();
          }),
          (i.prototype.isDisabled = function () {
            return this.options.get("disabled");
          }),
          (i.prototype.isOpen = function () {
            return this.$container[0].classList.contains(
              "select2-container--open"
            );
          }),
          (i.prototype.hasFocus = function () {
            return this.$container[0].classList.contains(
              "select2-container--focus"
            );
          }),
          (i.prototype.focus = function (e) {
            this.hasFocus() ||
              (this.$container[0].classList.add("select2-container--focus"),
              this.trigger("focus", {}));
          }),
          (i.prototype.enable = function (e) {
            this.options.get("debug") &&
              window.console &&
              console.warn &&
              console.warn(
                'Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'
              ),
              (e = !(e = null == e || 0 === e.length ? [!0] : e)[0]),
              this.$element.prop("disabled", e);
          }),
          (i.prototype.data = function () {
            this.options.get("debug") &&
              0 < arguments.length &&
              window.console &&
              console.warn &&
              console.warn(
                'Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.'
              );
            var e = [];
            return (
              this.dataAdapter.current(function (t) {
                e = t;
              }),
              e
            );
          }),
          (i.prototype.val = function (e) {
            if (
              (this.options.get("debug") &&
                window.console &&
                console.warn &&
                console.warn(
                  'Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'
                ),
              null == e || 0 === e.length)
            )
              return this.$element.val();
            (e = e[0]),
              Array.isArray(e) &&
                (e = e.map(function (e) {
                  return e.toString();
                })),
              this.$element.val(e).trigger("input").trigger("change");
          }),
          (i.prototype.destroy = function () {
            n.RemoveData(this.$container[0]),
              this.$container.remove(),
              this._observer.disconnect(),
              (this._observer = null),
              (this._syncA = null),
              (this._syncS = null),
              this.$element.off(".select2"),
              this.$element.attr(
                "tabindex",
                n.GetData(this.$element[0], "old-tabindex")
              ),
              this.$element[0].classList.remove("select2-hidden-accessible"),
              this.$element.attr("aria-hidden", "false"),
              n.RemoveData(this.$element[0]),
              this.$element.removeData("select2"),
              this.dataAdapter.destroy(),
              this.selection.destroy(),
              this.dropdown.destroy(),
              this.results.destroy(),
              (this.dataAdapter = null),
              (this.selection = null),
              (this.dropdown = null),
              (this.results = null);
          }),
          (i.prototype.render = function () {
            var t = e(
              '<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>'
            );
            return (
              t.attr("dir", this.options.get("dir")),
              (this.$container = t),
              this.$container[0].classList.add(
                "select2-container--" + this.options.get("theme")
              ),
              n.StoreData(t[0], "element", this.$element),
              t
            );
          }),
          i
        );
      }
    ),
    x.define("jquery-mousewheel", ["jquery"], function (e) {
      return e;
    }),
    x.define(
      "jquery.select2",
      [
        "jquery",
        "jquery-mousewheel",
        "./select2/core",
        "./select2/defaults",
        "./select2/utils",
      ],
      function (e, t, n, s, i) {
        var r;
        return (
          null == e.fn.select2 &&
            ((r = ["open", "close", "destroy"]),
            (e.fn.select2 = function (t) {
              if ("object" == typeof (t = t || {}))
                return (
                  this.each(function () {
                    var s = e.extend(!0, {}, t);
                    new n(e(this), s);
                  }),
                  this
                );
              if ("string" != typeof t)
                throw new Error("Invalid arguments for Select2: " + t);
              var s,
                o = Array.prototype.slice.call(arguments, 1);
              return (
                this.each(function () {
                  var e = i.GetData(this, "select2");
                  null == e &&
                    window.console &&
                    console.error &&
                    console.error(
                      "The select2('" +
                        t +
                        "') method was called on an element that is not using Select2."
                    ),
                    (s = e[t].apply(e, o));
                }),
                -1 < r.indexOf(t) ? this : s
              );
            })),
          null == e.fn.select2.defaults && (e.fn.select2.defaults = s),
          n
        );
      }
    ),
    { define: x.define, require: x.require })).require("jquery.select2");
  return (e.fn.select2.amd = g), x;
});
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t = t || self).SimpleBar = e());
})(this, function () {
  "use strict";
  var t =
    "undefined" != typeof globalThis
      ? globalThis
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : {};
  function e(t, e) {
    return t((e = { exports: {} }), e.exports), e.exports;
  }
  var r,
    i,
    n,
    o = "object",
    s = function (t) {
      return t && t.Math == Math && t;
    },
    a =
      s(typeof globalThis == o && globalThis) ||
      s(typeof window == o && window) ||
      s(typeof self == o && self) ||
      s(typeof t == o && t) ||
      Function("return this")(),
    c = function (t) {
      try {
        return !!t();
      } catch (t) {
        return !0;
      }
    },
    l = !c(function () {
      return (
        7 !=
        Object.defineProperty({}, "a", {
          get: function () {
            return 7;
          },
        }).a
      );
    }),
    u = {}.propertyIsEnumerable,
    f = Object.getOwnPropertyDescriptor,
    h = {
      f:
        f && !u.call({ 1: 2 }, 1)
          ? function (t) {
              var e = f(this, t);
              return !!e && e.enumerable;
            }
          : u,
    },
    d = function (t, e) {
      return {
        enumerable: !(1 & t),
        configurable: !(2 & t),
        writable: !(4 & t),
        value: e,
      };
    },
    p = {}.toString,
    v = function (t) {
      return p.call(t).slice(8, -1);
    },
    g = "".split,
    b = c(function () {
      return !Object("z").propertyIsEnumerable(0);
    })
      ? function (t) {
          return "String" == v(t) ? g.call(t, "") : Object(t);
        }
      : Object,
    y = function (t) {
      if (null == t) throw TypeError("Can't call method on " + t);
      return t;
    },
    m = function (t) {
      return b(y(t));
    },
    x = function (t) {
      return "object" == typeof t ? null !== t : "function" == typeof t;
    },
    E = function (t, e) {
      if (!x(t)) return t;
      var r, i;
      if (e && "function" == typeof (r = t.toString) && !x((i = r.call(t))))
        return i;
      if ("function" == typeof (r = t.valueOf) && !x((i = r.call(t)))) return i;
      if (!e && "function" == typeof (r = t.toString) && !x((i = r.call(t))))
        return i;
      throw TypeError("Can't convert object to primitive value");
    },
    w = {}.hasOwnProperty,
    S = function (t, e) {
      return w.call(t, e);
    },
    O = a.document,
    k = x(O) && x(O.createElement),
    A = function (t) {
      return k ? O.createElement(t) : {};
    },
    T =
      !l &&
      !c(function () {
        return (
          7 !=
          Object.defineProperty(A("div"), "a", {
            get: function () {
              return 7;
            },
          }).a
        );
      }),
    L = Object.getOwnPropertyDescriptor,
    z = {
      f: l
        ? L
        : function (t, e) {
            if (((t = m(t)), (e = E(e, !0)), T))
              try {
                return L(t, e);
              } catch (t) {}
            if (S(t, e)) return d(!h.f.call(t, e), t[e]);
          },
    },
    R = function (t) {
      if (!x(t)) throw TypeError(String(t) + " is not an object");
      return t;
    },
    _ = Object.defineProperty,
    M = {
      f: l
        ? _
        : function (t, e, r) {
            if ((R(t), (e = E(e, !0)), R(r), T))
              try {
                return _(t, e, r);
              } catch (t) {}
            if ("get" in r || "set" in r)
              throw TypeError("Accessors not supported");
            return "value" in r && (t[e] = r.value), t;
          },
    },
    C = l
      ? function (t, e, r) {
          return M.f(t, e, d(1, r));
        }
      : function (t, e, r) {
          return (t[e] = r), t;
        },
    j = function (t, e) {
      try {
        C(a, t, e);
      } catch (r) {
        a[t] = e;
      }
      return e;
    },
    W = e(function (t) {
      var e = a["__core-js_shared__"] || j("__core-js_shared__", {});
      (t.exports = function (t, r) {
        return e[t] || (e[t] = void 0 !== r ? r : {});
      })("versions", []).push({
        version: "3.2.1",
        mode: "global",
        copyright: "© 2019 Denis Pushkarev (zloirock.ru)",
      });
    }),
    N = W("native-function-to-string", Function.toString),
    I = a.WeakMap,
    B = "function" == typeof I && /native code/.test(N.call(I)),
    D = 0,
    P = Math.random(),
    F = function (t) {
      return (
        "Symbol(" +
        String(void 0 === t ? "" : t) +
        ")_" +
        (++D + P).toString(36)
      );
    },
    V = W("keys"),
    X = function (t) {
      return V[t] || (V[t] = F(t));
    },
    H = {},
    q = a.WeakMap;
  if (B) {
    var $ = new q(),
      Y = $.get,
      G = $.has,
      U = $.set;
    (r = function (t, e) {
      return U.call($, t, e), e;
    }),
      (i = function (t) {
        return Y.call($, t) || {};
      }),
      (n = function (t) {
        return G.call($, t);
      });
  } else {
    var Q = X("state");
    (H[Q] = !0),
      (r = function (t, e) {
        return C(t, Q, e), e;
      }),
      (i = function (t) {
        return S(t, Q) ? t[Q] : {};
      }),
      (n = function (t) {
        return S(t, Q);
      });
  }
  var K = {
      set: r,
      get: i,
      has: n,
      enforce: function (t) {
        return n(t) ? i(t) : r(t, {});
      },
      getterFor: function (t) {
        return function (e) {
          var r;
          if (!x(e) || (r = i(e)).type !== t)
            throw TypeError("Incompatible receiver, " + t + " required");
          return r;
        };
      },
    },
    J = e(function (t) {
      var e = K.get,
        r = K.enforce,
        i = String(N).split("toString");
      W("inspectSource", function (t) {
        return N.call(t);
      }),
        (t.exports = function (t, e, n, o) {
          var s = !!o && !!o.unsafe,
            c = !!o && !!o.enumerable,
            l = !!o && !!o.noTargetGet;
          "function" == typeof n &&
            ("string" != typeof e || S(n, "name") || C(n, "name", e),
            (r(n).source = i.join("string" == typeof e ? e : ""))),
            t !== a
              ? (s ? !l && t[e] && (c = !0) : delete t[e],
                c ? (t[e] = n) : C(t, e, n))
              : c
              ? (t[e] = n)
              : j(e, n);
        })(Function.prototype, "toString", function () {
          return ("function" == typeof this && e(this).source) || N.call(this);
        });
    }),
    Z = a,
    tt = function (t) {
      return "function" == typeof t ? t : void 0;
    },
    et = function (t, e) {
      return arguments.length < 2
        ? tt(Z[t]) || tt(a[t])
        : (Z[t] && Z[t][e]) || (a[t] && a[t][e]);
    },
    rt = Math.ceil,
    it = Math.floor,
    nt = function (t) {
      return isNaN((t = +t)) ? 0 : (t > 0 ? it : rt)(t);
    },
    ot = Math.min,
    st = function (t) {
      return t > 0 ? ot(nt(t), 9007199254740991) : 0;
    },
    at = Math.max,
    ct = Math.min,
    lt = function (t) {
      return function (e, r, i) {
        var n,
          o = m(e),
          s = st(o.length),
          a = (function (t, e) {
            var r = nt(t);
            return r < 0 ? at(r + e, 0) : ct(r, e);
          })(i, s);
        if (t && r != r) {
          for (; s > a; ) if ((n = o[a++]) != n) return !0;
        } else
          for (; s > a; a++)
            if ((t || a in o) && o[a] === r) return t || a || 0;
        return !t && -1;
      };
    },
    ut = (lt(!0), lt(!1)),
    ft = function (t, e) {
      var r,
        i = m(t),
        n = 0,
        o = [];
      for (r in i) !S(H, r) && S(i, r) && o.push(r);
      for (; e.length > n; ) S(i, (r = e[n++])) && (~ut(o, r) || o.push(r));
      return o;
    },
    ht = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ],
    dt = ht.concat("length", "prototype"),
    pt = {
      f:
        Object.getOwnPropertyNames ||
        function (t) {
          return ft(t, dt);
        },
    },
    vt = { f: Object.getOwnPropertySymbols },
    gt =
      et("Reflect", "ownKeys") ||
      function (t) {
        var e = pt.f(R(t)),
          r = vt.f;
        return r ? e.concat(r(t)) : e;
      },
    bt = function (t, e) {
      for (var r = gt(e), i = M.f, n = z.f, o = 0; o < r.length; o++) {
        var s = r[o];
        S(t, s) || i(t, s, n(e, s));
      }
    },
    yt = /#|\.prototype\./,
    mt = function (t, e) {
      var r = Et[xt(t)];
      return r == St || (r != wt && ("function" == typeof e ? c(e) : !!e));
    },
    xt = (mt.normalize = function (t) {
      return String(t).replace(yt, ".").toLowerCase();
    }),
    Et = (mt.data = {}),
    wt = (mt.NATIVE = "N"),
    St = (mt.POLYFILL = "P"),
    Ot = mt,
    kt = z.f,
    At = function (t, e) {
      var r,
        i,
        n,
        o,
        s,
        c = t.target,
        l = t.global,
        u = t.stat;
      if ((r = l ? a : u ? a[c] || j(c, {}) : (a[c] || {}).prototype))
        for (i in e) {
          if (
            ((o = e[i]),
            (n = t.noTargetGet ? (s = kt(r, i)) && s.value : r[i]),
            !Ot(l ? i : c + (u ? "." : "#") + i, t.forced) && void 0 !== n)
          ) {
            if (typeof o == typeof n) continue;
            bt(o, n);
          }
          (t.sham || (n && n.sham)) && C(o, "sham", !0), J(r, i, o, t);
        }
    },
    Tt = function (t) {
      if ("function" != typeof t)
        throw TypeError(String(t) + " is not a function");
      return t;
    },
    Lt = function (t, e, r) {
      if ((Tt(t), void 0 === e)) return t;
      switch (r) {
        case 0:
          return function () {
            return t.call(e);
          };
        case 1:
          return function (r) {
            return t.call(e, r);
          };
        case 2:
          return function (r, i) {
            return t.call(e, r, i);
          };
        case 3:
          return function (r, i, n) {
            return t.call(e, r, i, n);
          };
      }
      return function () {
        return t.apply(e, arguments);
      };
    },
    zt = function (t) {
      return Object(y(t));
    },
    Rt =
      Array.isArray ||
      function (t) {
        return "Array" == v(t);
      },
    _t =
      !!Object.getOwnPropertySymbols &&
      !c(function () {
        return !String(Symbol());
      }),
    Mt = a.Symbol,
    Ct = W("wks"),
    jt = function (t) {
      return Ct[t] || (Ct[t] = (_t && Mt[t]) || (_t ? Mt : F)("Symbol." + t));
    },
    Wt = jt("species"),
    Nt = function (t, e) {
      var r;
      return (
        Rt(t) &&
          ("function" != typeof (r = t.constructor) ||
          (r !== Array && !Rt(r.prototype))
            ? x(r) && null === (r = r[Wt]) && (r = void 0)
            : (r = void 0)),
        new (void 0 === r ? Array : r)(0 === e ? 0 : e)
      );
    },
    It = [].push,
    Bt = function (t) {
      var e = 1 == t,
        r = 2 == t,
        i = 3 == t,
        n = 4 == t,
        o = 6 == t,
        s = 5 == t || o;
      return function (a, c, l, u) {
        for (
          var f,
            h,
            d = zt(a),
            p = b(d),
            v = Lt(c, l, 3),
            g = st(p.length),
            y = 0,
            m = u || Nt,
            x = e ? m(a, g) : r ? m(a, 0) : void 0;
          g > y;
          y++
        )
          if ((s || y in p) && ((h = v((f = p[y]), y, d)), t))
            if (e) x[y] = h;
            else if (h)
              switch (t) {
                case 3:
                  return !0;
                case 5:
                  return f;
                case 6:
                  return y;
                case 2:
                  It.call(x, f);
              }
            else if (n) return !1;
        return o ? -1 : i || n ? n : x;
      };
    },
    Dt = {
      forEach: Bt(0),
      map: Bt(1),
      filter: Bt(2),
      some: Bt(3),
      every: Bt(4),
      find: Bt(5),
      findIndex: Bt(6),
    },
    Pt = function (t, e) {
      var r = [][t];
      return (
        !r ||
        !c(function () {
          r.call(
            null,
            e ||
              function () {
                throw 1;
              },
            1
          );
        })
      );
    },
    Ft = Dt.forEach,
    Vt = Pt("forEach")
      ? function (t) {
          return Ft(this, t, arguments.length > 1 ? arguments[1] : void 0);
        }
      : [].forEach;
  At({ target: "Array", proto: !0, forced: [].forEach != Vt }, { forEach: Vt });
  var Xt = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0,
  };
  for (var Ht in Xt) {
    var qt = a[Ht],
      $t = qt && qt.prototype;
    if ($t && $t.forEach !== Vt)
      try {
        C($t, "forEach", Vt);
      } catch (t) {
        $t.forEach = Vt;
      }
  }
  var Yt = !(
      "undefined" == typeof window ||
      !window.document ||
      !window.document.createElement
    ),
    Gt = jt("species"),
    Ut = Dt.filter;
  At(
    {
      target: "Array",
      proto: !0,
      forced: !!c(function () {
        var t = [];
        return (
          ((t.constructor = {})[Gt] = function () {
            return { foo: 1 };
          }),
          1 !== t.filter(Boolean).foo
        );
      }),
    },
    {
      filter: function (t) {
        return Ut(this, t, arguments.length > 1 ? arguments[1] : void 0);
      },
    }
  );
  var Qt =
      Object.keys ||
      function (t) {
        return ft(t, ht);
      },
    Kt = l
      ? Object.defineProperties
      : function (t, e) {
          R(t);
          for (var r, i = Qt(e), n = i.length, o = 0; n > o; )
            M.f(t, (r = i[o++]), e[r]);
          return t;
        },
    Jt = et("document", "documentElement"),
    Zt = X("IE_PROTO"),
    te = function () {},
    ee = function () {
      var t,
        e = A("iframe"),
        r = ht.length;
      for (
        e.style.display = "none",
          Jt.appendChild(e),
          e.src = String("javascript:"),
          (t = e.contentWindow.document).open(),
          t.write("<script>document.F=Object</script>"),
          t.close(),
          ee = t.F;
        r--;

      )
        delete ee.prototype[ht[r]];
      return ee();
    },
    re =
      Object.create ||
      function (t, e) {
        var r;
        return (
          null !== t
            ? ((te.prototype = R(t)),
              (r = new te()),
              (te.prototype = null),
              (r[Zt] = t))
            : (r = ee()),
          void 0 === e ? r : Kt(r, e)
        );
      };
  H[Zt] = !0;
  var ie = jt("unscopables"),
    ne = Array.prototype;
  null == ne[ie] && C(ne, ie, re(null));
  var oe,
    se,
    ae,
    ce = function (t) {
      ne[ie][t] = !0;
    },
    le = {},
    ue = !c(function () {
      function t() {}
      return (
        (t.prototype.constructor = null),
        Object.getPrototypeOf(new t()) !== t.prototype
      );
    }),
    fe = X("IE_PROTO"),
    he = Object.prototype,
    de = ue
      ? Object.getPrototypeOf
      : function (t) {
          return (
            (t = zt(t)),
            S(t, fe)
              ? t[fe]
              : "function" == typeof t.constructor && t instanceof t.constructor
              ? t.constructor.prototype
              : t instanceof Object
              ? he
              : null
          );
        },
    pe = jt("iterator"),
    ve = !1;
  [].keys &&
    ("next" in (ae = [].keys())
      ? (se = de(de(ae))) !== Object.prototype && (oe = se)
      : (ve = !0)),
    null == oe && (oe = {}),
    S(oe, pe) ||
      C(oe, pe, function () {
        return this;
      });
  var ge = { IteratorPrototype: oe, BUGGY_SAFARI_ITERATORS: ve },
    be = M.f,
    ye = jt("toStringTag"),
    me = function (t, e, r) {
      t &&
        !S((t = r ? t : t.prototype), ye) &&
        be(t, ye, { configurable: !0, value: e });
    },
    xe = ge.IteratorPrototype,
    Ee = function () {
      return this;
    },
    we =
      Object.setPrototypeOf ||
      ("__proto__" in {}
        ? (function () {
            var t,
              e = !1,
              r = {};
            try {
              (t = Object.getOwnPropertyDescriptor(
                Object.prototype,
                "__proto__"
              ).set).call(r, []),
                (e = r instanceof Array);
            } catch (t) {}
            return function (r, i) {
              return (
                R(r),
                (function (t) {
                  if (!x(t) && null !== t)
                    throw TypeError(
                      "Can't set " + String(t) + " as a prototype"
                    );
                })(i),
                e ? t.call(r, i) : (r.__proto__ = i),
                r
              );
            };
          })()
        : void 0),
    Se = ge.IteratorPrototype,
    Oe = ge.BUGGY_SAFARI_ITERATORS,
    ke = jt("iterator"),
    Ae = function () {
      return this;
    },
    Te = function (t, e, r, i, n, o, s) {
      !(function (t, e, r) {
        var i = e + " Iterator";
        (t.prototype = re(xe, { next: d(1, r) })), me(t, i, !1), (le[i] = Ee);
      })(r, e, i);
      var a,
        c,
        l,
        u = function (t) {
          if (t === n && g) return g;
          if (!Oe && t in p) return p[t];
          switch (t) {
            case "keys":
            case "values":
            case "entries":
              return function () {
                return new r(this, t);
              };
          }
          return function () {
            return new r(this);
          };
        },
        f = e + " Iterator",
        h = !1,
        p = t.prototype,
        v = p[ke] || p["@@iterator"] || (n && p[n]),
        g = (!Oe && v) || u(n),
        b = ("Array" == e && p.entries) || v;
      if (
        (b &&
          ((a = de(b.call(new t()))),
          Se !== Object.prototype &&
            a.next &&
            (de(a) !== Se &&
              (we ? we(a, Se) : "function" != typeof a[ke] && C(a, ke, Ae)),
            me(a, f, !0))),
        "values" == n &&
          v &&
          "values" !== v.name &&
          ((h = !0),
          (g = function () {
            return v.call(this);
          })),
        p[ke] !== g && C(p, ke, g),
        (le[e] = g),
        n)
      )
        if (
          ((c = {
            values: u("values"),
            keys: o ? g : u("keys"),
            entries: u("entries"),
          }),
          s)
        )
          for (l in c) (!Oe && !h && l in p) || J(p, l, c[l]);
        else At({ target: e, proto: !0, forced: Oe || h }, c);
      return c;
    },
    Le = K.set,
    ze = K.getterFor("Array Iterator"),
    Re = Te(
      Array,
      "Array",
      function (t, e) {
        Le(this, { type: "Array Iterator", target: m(t), index: 0, kind: e });
      },
      function () {
        var t = ze(this),
          e = t.target,
          r = t.kind,
          i = t.index++;
        return !e || i >= e.length
          ? ((t.target = void 0), { value: void 0, done: !0 })
          : "keys" == r
          ? { value: i, done: !1 }
          : "values" == r
          ? { value: e[i], done: !1 }
          : { value: [i, e[i]], done: !1 };
      },
      "values"
    );
  (le.Arguments = le.Array), ce("keys"), ce("values"), ce("entries");
  var _e = Object.assign,
    Me =
      !_e ||
      c(function () {
        var t = {},
          e = {},
          r = Symbol();
        return (
          (t[r] = 7),
          "abcdefghijklmnopqrst".split("").forEach(function (t) {
            e[t] = t;
          }),
          7 != _e({}, t)[r] || "abcdefghijklmnopqrst" != Qt(_e({}, e)).join("")
        );
      })
        ? function (t, e) {
            for (
              var r = zt(t), i = arguments.length, n = 1, o = vt.f, s = h.f;
              i > n;

            )
              for (
                var a,
                  c = b(arguments[n++]),
                  u = o ? Qt(c).concat(o(c)) : Qt(c),
                  f = u.length,
                  d = 0;
                f > d;

              )
                (a = u[d++]), (l && !s.call(c, a)) || (r[a] = c[a]);
            return r;
          }
        : _e;
  At(
    { target: "Object", stat: !0, forced: Object.assign !== Me },
    { assign: Me }
  );
  var Ce = jt("toStringTag"),
    je =
      "Arguments" ==
      v(
        (function () {
          return arguments;
        })()
      ),
    We = function (t) {
      var e, r, i;
      return void 0 === t
        ? "Undefined"
        : null === t
        ? "Null"
        : "string" ==
          typeof (r = (function (t, e) {
            try {
              return t[e];
            } catch (t) {}
          })((e = Object(t)), Ce))
        ? r
        : je
        ? v(e)
        : "Object" == (i = v(e)) && "function" == typeof e.callee
        ? "Arguments"
        : i;
    },
    Ne = {};
  Ne[jt("toStringTag")] = "z";
  var Ie =
      "[object z]" !== String(Ne)
        ? function () {
            return "[object " + We(this) + "]";
          }
        : Ne.toString,
    Be = Object.prototype;
  Ie !== Be.toString && J(Be, "toString", Ie, { unsafe: !0 });
  var De = "\t\n\v\f\r                　\u2028\u2029\ufeff",
    Pe = "[" + De + "]",
    Fe = RegExp("^" + Pe + Pe + "*"),
    Ve = RegExp(Pe + Pe + "*$"),
    Xe = function (t) {
      return function (e) {
        var r = String(y(e));
        return (
          1 & t && (r = r.replace(Fe, "")), 2 & t && (r = r.replace(Ve, "")), r
        );
      };
    },
    He = (Xe(1), Xe(2), Xe(3)),
    qe = a.parseInt,
    $e = /^[+-]?0[Xx]/,
    Ye =
      8 !== qe(De + "08") || 22 !== qe(De + "0x16")
        ? function (t, e) {
            var r = He(String(t));
            return qe(r, e >>> 0 || ($e.test(r) ? 16 : 10));
          }
        : qe;
  At({ global: !0, forced: parseInt != Ye }, { parseInt: Ye });
  var Ge = function (t) {
      return function (e, r) {
        var i,
          n,
          o = String(y(e)),
          s = nt(r),
          a = o.length;
        return s < 0 || s >= a
          ? t
            ? ""
            : void 0
          : (i = o.charCodeAt(s)) < 55296 ||
            i > 56319 ||
            s + 1 === a ||
            (n = o.charCodeAt(s + 1)) < 56320 ||
            n > 57343
          ? t
            ? o.charAt(s)
            : i
          : t
          ? o.slice(s, s + 2)
          : n - 56320 + ((i - 55296) << 10) + 65536;
      };
    },
    Ue = { codeAt: Ge(!1), charAt: Ge(!0) },
    Qe = Ue.charAt,
    Ke = K.set,
    Je = K.getterFor("String Iterator");
  Te(
    String,
    "String",
    function (t) {
      Ke(this, { type: "String Iterator", string: String(t), index: 0 });
    },
    function () {
      var t,
        e = Je(this),
        r = e.string,
        i = e.index;
      return i >= r.length
        ? { value: void 0, done: !0 }
        : ((t = Qe(r, i)), (e.index += t.length), { value: t, done: !1 });
    }
  );
  var Ze = function (t, e, r) {
      for (var i in e) J(t, i, e[i], r);
      return t;
    },
    tr = !c(function () {
      return Object.isExtensible(Object.preventExtensions({}));
    }),
    er = e(function (t) {
      var e = M.f,
        r = F("meta"),
        i = 0,
        n =
          Object.isExtensible ||
          function () {
            return !0;
          },
        o = function (t) {
          e(t, r, { value: { objectID: "O" + ++i, weakData: {} } });
        },
        s = (t.exports = {
          REQUIRED: !1,
          fastKey: function (t, e) {
            if (!x(t))
              return "symbol" == typeof t
                ? t
                : ("string" == typeof t ? "S" : "P") + t;
            if (!S(t, r)) {
              if (!n(t)) return "F";
              if (!e) return "E";
              o(t);
            }
            return t[r].objectID;
          },
          getWeakData: function (t, e) {
            if (!S(t, r)) {
              if (!n(t)) return !0;
              if (!e) return !1;
              o(t);
            }
            return t[r].weakData;
          },
          onFreeze: function (t) {
            return tr && s.REQUIRED && n(t) && !S(t, r) && o(t), t;
          },
        });
      H[r] = !0;
    }),
    rr = (er.REQUIRED, er.fastKey, er.getWeakData, er.onFreeze, jt("iterator")),
    ir = Array.prototype,
    nr = jt("iterator"),
    or = function (t, e, r, i) {
      try {
        return i ? e(R(r)[0], r[1]) : e(r);
      } catch (e) {
        var n = t.return;
        throw (void 0 !== n && R(n.call(t)), e);
      }
    },
    sr = e(function (t) {
      var e = function (t, e) {
        (this.stopped = t), (this.result = e);
      };
      (t.exports = function (t, r, i, n, o) {
        var s,
          a,
          c,
          l,
          u,
          f,
          h,
          d = Lt(r, i, n ? 2 : 1);
        if (o) s = t;
        else {
          if (
            "function" !=
            typeof (a = (function (t) {
              if (null != t) return t[nr] || t["@@iterator"] || le[We(t)];
            })(t))
          )
            throw TypeError("Target is not iterable");
          if (void 0 !== (h = a) && (le.Array === h || ir[rr] === h)) {
            for (c = 0, l = st(t.length); l > c; c++)
              if (
                (u = n ? d(R((f = t[c]))[0], f[1]) : d(t[c])) &&
                u instanceof e
              )
                return u;
            return new e(!1);
          }
          s = a.call(t);
        }
        for (; !(f = s.next()).done; )
          if ((u = or(s, d, f.value, n)) && u instanceof e) return u;
        return new e(!1);
      }).stop = function (t) {
        return new e(!0, t);
      };
    }),
    ar = function (t, e, r) {
      if (!(t instanceof e))
        throw TypeError("Incorrect " + (r ? r + " " : "") + "invocation");
      return t;
    },
    cr = jt("iterator"),
    lr = !1;
  try {
    var ur = 0,
      fr = {
        next: function () {
          return { done: !!ur++ };
        },
        return: function () {
          lr = !0;
        },
      };
    (fr[cr] = function () {
      return this;
    }),
      Array.from(fr, function () {
        throw 2;
      });
  } catch (t) {}
  var hr = function (t, e, r, i, n) {
      var o = a[t],
        s = o && o.prototype,
        l = o,
        u = i ? "set" : "add",
        f = {},
        h = function (t) {
          var e = s[t];
          J(
            s,
            t,
            "add" == t
              ? function (t) {
                  return e.call(this, 0 === t ? 0 : t), this;
                }
              : "delete" == t
              ? function (t) {
                  return !(n && !x(t)) && e.call(this, 0 === t ? 0 : t);
                }
              : "get" == t
              ? function (t) {
                  return n && !x(t) ? void 0 : e.call(this, 0 === t ? 0 : t);
                }
              : "has" == t
              ? function (t) {
                  return !(n && !x(t)) && e.call(this, 0 === t ? 0 : t);
                }
              : function (t, r) {
                  return e.call(this, 0 === t ? 0 : t, r), this;
                }
          );
        };
      if (
        Ot(
          t,
          "function" != typeof o ||
            !(
              n ||
              (s.forEach &&
                !c(function () {
                  new o().entries().next();
                }))
            )
        )
      )
        (l = r.getConstructor(e, t, i, u)), (er.REQUIRED = !0);
      else if (Ot(t, !0)) {
        var d = new l(),
          p = d[u](n ? {} : -0, 1) != d,
          v = c(function () {
            d.has(1);
          }),
          g = (function (t, e) {
            if (!lr) return !1;
            var r = !1;
            try {
              var i = {};
              (i[cr] = function () {
                return {
                  next: function () {
                    return { done: (r = !0) };
                  },
                };
              }),
                (function (t) {
                  new o(t);
                })(i);
            } catch (t) {}
            return r;
          })(),
          b =
            !n &&
            c(function () {
              for (var t = new o(), e = 5; e--; ) t[u](e, e);
              return !t.has(-0);
            });
        g ||
          (((l = e(function (e, r) {
            ar(e, l, t);
            var n = (function (t, e, r) {
              var i, n;
              return (
                we &&
                  "function" == typeof (i = e.constructor) &&
                  i !== r &&
                  x((n = i.prototype)) &&
                  n !== r.prototype &&
                  we(t, n),
                t
              );
            })(new o(), e, l);
            return null != r && sr(r, n[u], n, i), n;
          })).prototype = s),
          (s.constructor = l)),
          (v || b) && (h("delete"), h("has"), i && h("get")),
          (b || p) && h(u),
          n && s.clear && delete s.clear;
      }
      return (
        (f[t] = l),
        At({ global: !0, forced: l != o }, f),
        me(l, t),
        n || r.setStrong(l, t, i),
        l
      );
    },
    dr = er.getWeakData,
    pr = K.set,
    vr = K.getterFor,
    gr = Dt.find,
    br = Dt.findIndex,
    yr = 0,
    mr = function (t) {
      return t.frozen || (t.frozen = new xr());
    },
    xr = function () {
      this.entries = [];
    },
    Er = function (t, e) {
      return gr(t.entries, function (t) {
        return t[0] === e;
      });
    };
  xr.prototype = {
    get: function (t) {
      var e = Er(this, t);
      if (e) return e[1];
    },
    has: function (t) {
      return !!Er(this, t);
    },
    set: function (t, e) {
      var r = Er(this, t);
      r ? (r[1] = e) : this.entries.push([t, e]);
    },
    delete: function (t) {
      var e = br(this.entries, function (e) {
        return e[0] === t;
      });
      return ~e && this.entries.splice(e, 1), !!~e;
    },
  };
  var wr = {
      getConstructor: function (t, e, r, i) {
        var n = t(function (t, o) {
            ar(t, n, e),
              pr(t, { type: e, id: yr++, frozen: void 0 }),
              null != o && sr(o, t[i], t, r);
          }),
          o = vr(e),
          s = function (t, e, r) {
            var i = o(t),
              n = dr(R(e), !0);
            return !0 === n ? mr(i).set(e, r) : (n[i.id] = r), t;
          };
        return (
          Ze(n.prototype, {
            delete: function (t) {
              var e = o(this);
              if (!x(t)) return !1;
              var r = dr(t);
              return !0 === r
                ? mr(e).delete(t)
                : r && S(r, e.id) && delete r[e.id];
            },
            has: function (t) {
              var e = o(this);
              if (!x(t)) return !1;
              var r = dr(t);
              return !0 === r ? mr(e).has(t) : r && S(r, e.id);
            },
          }),
          Ze(
            n.prototype,
            r
              ? {
                  get: function (t) {
                    var e = o(this);
                    if (x(t)) {
                      var r = dr(t);
                      return !0 === r ? mr(e).get(t) : r ? r[e.id] : void 0;
                    }
                  },
                  set: function (t, e) {
                    return s(this, t, e);
                  },
                }
              : {
                  add: function (t) {
                    return s(this, t, !0);
                  },
                }
          ),
          n
        );
      },
    },
    Sr =
      (e(function (t) {
        var e,
          r = K.enforce,
          i = !a.ActiveXObject && "ActiveXObject" in a,
          n = Object.isExtensible,
          o = function (t) {
            return function () {
              return t(this, arguments.length ? arguments[0] : void 0);
            };
          },
          s = (t.exports = hr("WeakMap", o, wr, !0, !0));
        if (B && i) {
          (e = wr.getConstructor(o, "WeakMap", !0)), (er.REQUIRED = !0);
          var c = s.prototype,
            l = c.delete,
            u = c.has,
            f = c.get,
            h = c.set;
          Ze(c, {
            delete: function (t) {
              if (x(t) && !n(t)) {
                var i = r(this);
                return (
                  i.frozen || (i.frozen = new e()),
                  l.call(this, t) || i.frozen.delete(t)
                );
              }
              return l.call(this, t);
            },
            has: function (t) {
              if (x(t) && !n(t)) {
                var i = r(this);
                return (
                  i.frozen || (i.frozen = new e()),
                  u.call(this, t) || i.frozen.has(t)
                );
              }
              return u.call(this, t);
            },
            get: function (t) {
              if (x(t) && !n(t)) {
                var i = r(this);
                return (
                  i.frozen || (i.frozen = new e()),
                  u.call(this, t) ? f.call(this, t) : i.frozen.get(t)
                );
              }
              return f.call(this, t);
            },
            set: function (t, i) {
              if (x(t) && !n(t)) {
                var o = r(this);
                o.frozen || (o.frozen = new e()),
                  u.call(this, t) ? h.call(this, t, i) : o.frozen.set(t, i);
              } else h.call(this, t, i);
              return this;
            },
          });
        }
      }),
      jt("iterator")),
    Or = jt("toStringTag"),
    kr = Re.values;
  for (var Ar in Xt) {
    var Tr = a[Ar],
      Lr = Tr && Tr.prototype;
    if (Lr) {
      if (Lr[Sr] !== kr)
        try {
          C(Lr, Sr, kr);
        } catch (t) {
          Lr[Sr] = kr;
        }
      if ((Lr[Or] || C(Lr, Or, Ar), Xt[Ar]))
        for (var zr in Re)
          if (Lr[zr] !== Re[zr])
            try {
              C(Lr, zr, Re[zr]);
            } catch (t) {
              Lr[zr] = Re[zr];
            }
    }
  }
  var Rr = "Expected a function",
    _r = /^\s+|\s+$/g,
    Mr = /^[-+]0x[0-9a-f]+$/i,
    Cr = /^0b[01]+$/i,
    jr = /^0o[0-7]+$/i,
    Wr = parseInt,
    Nr = "object" == typeof t && t && t.Object === Object && t,
    Ir = "object" == typeof self && self && self.Object === Object && self,
    Br = Nr || Ir || Function("return this")(),
    Dr = Object.prototype.toString,
    Pr = Math.max,
    Fr = Math.min,
    Vr = function () {
      return Br.Date.now();
    };
  function Xr(t) {
    var e = typeof t;
    return !!t && ("object" == e || "function" == e);
  }
  function Hr(t) {
    if ("number" == typeof t) return t;
    if (
      (function (t) {
        return (
          "symbol" == typeof t ||
          ((function (t) {
            return !!t && "object" == typeof t;
          })(t) &&
            "[object Symbol]" == Dr.call(t))
        );
      })(t)
    )
      return NaN;
    if (Xr(t)) {
      var e = "function" == typeof t.valueOf ? t.valueOf() : t;
      t = Xr(e) ? e + "" : e;
    }
    if ("string" != typeof t) return 0 === t ? t : +t;
    t = t.replace(_r, "");
    var r = Cr.test(t);
    return r || jr.test(t) ? Wr(t.slice(2), r ? 2 : 8) : Mr.test(t) ? NaN : +t;
  }
  var qr = function (t, e, r) {
      var i = !0,
        n = !0;
      if ("function" != typeof t) throw new TypeError(Rr);
      return (
        Xr(r) &&
          ((i = "leading" in r ? !!r.leading : i),
          (n = "trailing" in r ? !!r.trailing : n)),
        (function (t, e, r) {
          var i,
            n,
            o,
            s,
            a,
            c,
            l = 0,
            u = !1,
            f = !1,
            h = !0;
          if ("function" != typeof t) throw new TypeError(Rr);
          function d(e) {
            var r = i,
              o = n;
            return (i = n = void 0), (l = e), (s = t.apply(o, r));
          }
          function p(t) {
            var r = t - c;
            return void 0 === c || r >= e || r < 0 || (f && t - l >= o);
          }
          function v() {
            var t = Vr();
            if (p(t)) return g(t);
            a = setTimeout(
              v,
              (function (t) {
                var r = e - (t - c);
                return f ? Fr(r, o - (t - l)) : r;
              })(t)
            );
          }
          function g(t) {
            return (a = void 0), h && i ? d(t) : ((i = n = void 0), s);
          }
          function b() {
            var t = Vr(),
              r = p(t);
            if (((i = arguments), (n = this), (c = t), r)) {
              if (void 0 === a)
                return (function (t) {
                  return (l = t), (a = setTimeout(v, e)), u ? d(t) : s;
                })(c);
              if (f) return (a = setTimeout(v, e)), d(c);
            }
            return void 0 === a && (a = setTimeout(v, e)), s;
          }
          return (
            (e = Hr(e) || 0),
            Xr(r) &&
              ((u = !!r.leading),
              (o = (f = "maxWait" in r) ? Pr(Hr(r.maxWait) || 0, e) : o),
              (h = "trailing" in r ? !!r.trailing : h)),
            (b.cancel = function () {
              void 0 !== a && clearTimeout(a),
                (l = 0),
                (i = c = n = a = void 0);
            }),
            (b.flush = function () {
              return void 0 === a ? s : g(Vr());
            }),
            b
          );
        })(t, e, { leading: i, maxWait: e, trailing: n })
      );
    },
    $r = /^\s+|\s+$/g,
    Yr = /^[-+]0x[0-9a-f]+$/i,
    Gr = /^0b[01]+$/i,
    Ur = /^0o[0-7]+$/i,
    Qr = parseInt,
    Kr = "object" == typeof t && t && t.Object === Object && t,
    Jr = "object" == typeof self && self && self.Object === Object && self,
    Zr = Kr || Jr || Function("return this")(),
    ti = Object.prototype.toString,
    ei = Math.max,
    ri = Math.min,
    ii = function () {
      return Zr.Date.now();
    };
  function ni(t) {
    var e = typeof t;
    return !!t && ("object" == e || "function" == e);
  }
  function oi(t) {
    if ("number" == typeof t) return t;
    if (
      (function (t) {
        return (
          "symbol" == typeof t ||
          ((function (t) {
            return !!t && "object" == typeof t;
          })(t) &&
            "[object Symbol]" == ti.call(t))
        );
      })(t)
    )
      return NaN;
    if (ni(t)) {
      var e = "function" == typeof t.valueOf ? t.valueOf() : t;
      t = ni(e) ? e + "" : e;
    }
    if ("string" != typeof t) return 0 === t ? t : +t;
    t = t.replace($r, "");
    var r = Gr.test(t);
    return r || Ur.test(t) ? Qr(t.slice(2), r ? 2 : 8) : Yr.test(t) ? NaN : +t;
  }
  var si = function (t, e, r) {
      var i,
        n,
        o,
        s,
        a,
        c,
        l = 0,
        u = !1,
        f = !1,
        h = !0;
      if ("function" != typeof t) throw new TypeError("Expected a function");
      function d(e) {
        var r = i,
          o = n;
        return (i = n = void 0), (l = e), (s = t.apply(o, r));
      }
      function p(t) {
        var r = t - c;
        return void 0 === c || r >= e || r < 0 || (f && t - l >= o);
      }
      function v() {
        var t = ii();
        if (p(t)) return g(t);
        a = setTimeout(
          v,
          (function (t) {
            var r = e - (t - c);
            return f ? ri(r, o - (t - l)) : r;
          })(t)
        );
      }
      function g(t) {
        return (a = void 0), h && i ? d(t) : ((i = n = void 0), s);
      }
      function b() {
        var t = ii(),
          r = p(t);
        if (((i = arguments), (n = this), (c = t), r)) {
          if (void 0 === a)
            return (function (t) {
              return (l = t), (a = setTimeout(v, e)), u ? d(t) : s;
            })(c);
          if (f) return (a = setTimeout(v, e)), d(c);
        }
        return void 0 === a && (a = setTimeout(v, e)), s;
      }
      return (
        (e = oi(e) || 0),
        ni(r) &&
          ((u = !!r.leading),
          (o = (f = "maxWait" in r) ? ei(oi(r.maxWait) || 0, e) : o),
          (h = "trailing" in r ? !!r.trailing : h)),
        (b.cancel = function () {
          void 0 !== a && clearTimeout(a), (l = 0), (i = c = n = a = void 0);
        }),
        (b.flush = function () {
          return void 0 === a ? s : g(ii());
        }),
        b
      );
    },
    ai = "__lodash_hash_undefined__",
    ci = /^\[object .+?Constructor\]$/,
    li = "object" == typeof t && t && t.Object === Object && t,
    ui = "object" == typeof self && self && self.Object === Object && self,
    fi = li || ui || Function("return this")(),
    hi = Array.prototype,
    di = Function.prototype,
    pi = Object.prototype,
    vi = fi["__core-js_shared__"],
    gi = (function () {
      var t = /[^.]+$/.exec((vi && vi.keys && vi.keys.IE_PROTO) || "");
      return t ? "Symbol(src)_1." + t : "";
    })(),
    bi = di.toString,
    yi = pi.hasOwnProperty,
    mi = pi.toString,
    xi = RegExp(
      "^" +
        bi
          .call(yi)
          .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    ),
    Ei = hi.splice,
    wi = zi(fi, "Map"),
    Si = zi(Object, "create");
  function Oi(t) {
    var e = -1,
      r = t ? t.length : 0;
    for (this.clear(); ++e < r; ) {
      var i = t[e];
      this.set(i[0], i[1]);
    }
  }
  function ki(t) {
    var e = -1,
      r = t ? t.length : 0;
    for (this.clear(); ++e < r; ) {
      var i = t[e];
      this.set(i[0], i[1]);
    }
  }
  function Ai(t) {
    var e = -1,
      r = t ? t.length : 0;
    for (this.clear(); ++e < r; ) {
      var i = t[e];
      this.set(i[0], i[1]);
    }
  }
  function Ti(t, e) {
    for (var r, i, n = t.length; n--; )
      if ((r = t[n][0]) === (i = e) || (r != r && i != i)) return n;
    return -1;
  }
  function Li(t, e) {
    var r,
      i,
      n = t.__data__;
    return (
      "string" == (i = typeof (r = e)) ||
      "number" == i ||
      "symbol" == i ||
      "boolean" == i
        ? "__proto__" !== r
        : null === r
    )
      ? n["string" == typeof e ? "string" : "hash"]
      : n.map;
  }
  function zi(t, e) {
    var r = (function (t, e) {
      return null == t ? void 0 : t[e];
    })(t, e);
    return (function (t) {
      return (
        !(!_i(t) || ((e = t), gi && gi in e)) &&
        ((function (t) {
          var e = _i(t) ? mi.call(t) : "";
          return "[object Function]" == e || "[object GeneratorFunction]" == e;
        })(t) ||
        (function (t) {
          var e = !1;
          if (null != t && "function" != typeof t.toString)
            try {
              e = !!(t + "");
            } catch (t) {}
          return e;
        })(t)
          ? xi
          : ci
        ).test(
          (function (t) {
            if (null != t) {
              try {
                return bi.call(t);
              } catch (t) {}
              try {
                return t + "";
              } catch (t) {}
            }
            return "";
          })(t)
        )
      );
      var e;
    })(r)
      ? r
      : void 0;
  }
  function Ri(t, e) {
    if ("function" != typeof t || (e && "function" != typeof e))
      throw new TypeError("Expected a function");
    var r = function () {
      var i = arguments,
        n = e ? e.apply(this, i) : i[0],
        o = r.cache;
      if (o.has(n)) return o.get(n);
      var s = t.apply(this, i);
      return (r.cache = o.set(n, s)), s;
    };
    return (r.cache = new (Ri.Cache || Ai)()), r;
  }
  function _i(t) {
    var e = typeof t;
    return !!t && ("object" == e || "function" == e);
  }
  (Oi.prototype.clear = function () {
    this.__data__ = Si ? Si(null) : {};
  }),
    (Oi.prototype.delete = function (t) {
      return this.has(t) && delete this.__data__[t];
    }),
    (Oi.prototype.get = function (t) {
      var e = this.__data__;
      if (Si) {
        var r = e[t];
        return r === ai ? void 0 : r;
      }
      return yi.call(e, t) ? e[t] : void 0;
    }),
    (Oi.prototype.has = function (t) {
      var e = this.__data__;
      return Si ? void 0 !== e[t] : yi.call(e, t);
    }),
    (Oi.prototype.set = function (t, e) {
      return (this.__data__[t] = Si && void 0 === e ? ai : e), this;
    }),
    (ki.prototype.clear = function () {
      this.__data__ = [];
    }),
    (ki.prototype.delete = function (t) {
      var e = this.__data__,
        r = Ti(e, t);
      return !(r < 0 || (r == e.length - 1 ? e.pop() : Ei.call(e, r, 1), 0));
    }),
    (ki.prototype.get = function (t) {
      var e = this.__data__,
        r = Ti(e, t);
      return r < 0 ? void 0 : e[r][1];
    }),
    (ki.prototype.has = function (t) {
      return Ti(this.__data__, t) > -1;
    }),
    (ki.prototype.set = function (t, e) {
      var r = this.__data__,
        i = Ti(r, t);
      return i < 0 ? r.push([t, e]) : (r[i][1] = e), this;
    }),
    (Ai.prototype.clear = function () {
      this.__data__ = {
        hash: new Oi(),
        map: new (wi || ki)(),
        string: new Oi(),
      };
    }),
    (Ai.prototype.delete = function (t) {
      return Li(this, t).delete(t);
    }),
    (Ai.prototype.get = function (t) {
      return Li(this, t).get(t);
    }),
    (Ai.prototype.has = function (t) {
      return Li(this, t).has(t);
    }),
    (Ai.prototype.set = function (t, e) {
      return Li(this, t).set(t, e), this;
    }),
    (Ri.Cache = Ai);
  var Mi,
    Ci = Ri,
    ji = [],
    Wi = "ResizeObserver loop completed with undelivered notifications.";
  !(function (t) {
    (t.BORDER_BOX = "border-box"),
      (t.CONTENT_BOX = "content-box"),
      (t.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box");
  })(Mi || (Mi = {}));
  var Ni,
    Ii = function (t) {
      return Object.freeze(t);
    },
    Bi = function (t, e) {
      (this.inlineSize = t), (this.blockSize = e), Ii(this);
    },
    Di = (function () {
      function t(t, e, r, i) {
        return (
          (this.x = t),
          (this.y = e),
          (this.width = r),
          (this.height = i),
          (this.top = this.y),
          (this.left = this.x),
          (this.bottom = this.top + this.height),
          (this.right = this.left + this.width),
          Ii(this)
        );
      }
      return (
        (t.prototype.toJSON = function () {
          var t = this;
          return {
            x: t.x,
            y: t.y,
            top: t.top,
            right: t.right,
            bottom: t.bottom,
            left: t.left,
            width: t.width,
            height: t.height,
          };
        }),
        (t.fromRect = function (e) {
          return new t(e.x, e.y, e.width, e.height);
        }),
        t
      );
    })(),
    Pi = function (t) {
      return t instanceof SVGElement && "getBBox" in t;
    },
    Fi = function (t) {
      if (Pi(t)) {
        var e = t.getBBox(),
          r = e.width,
          i = e.height;
        return !r && !i;
      }
      var n = t,
        o = n.offsetWidth,
        s = n.offsetHeight;
      return !(o || s || t.getClientRects().length);
    },
    Vi = function (t) {
      var e, r;
      if (t instanceof Element) return !0;
      var i =
        null ===
          (r = null === (e = t) || void 0 === e ? void 0 : e.ownerDocument) ||
        void 0 === r
          ? void 0
          : r.defaultView;
      return !!(i && t instanceof i.Element);
    },
    Xi = "undefined" != typeof window ? window : {},
    Hi = new WeakMap(),
    qi = /auto|scroll/,
    $i = /^tb|vertical/,
    Yi = /msie|trident/i.test(Xi.navigator && Xi.navigator.userAgent),
    Gi = function (t) {
      return parseFloat(t || "0");
    },
    Ui = function (t, e, r) {
      return (
        void 0 === t && (t = 0),
        void 0 === e && (e = 0),
        void 0 === r && (r = !1),
        new Bi((r ? e : t) || 0, (r ? t : e) || 0)
      );
    },
    Qi = Ii({
      devicePixelContentBoxSize: Ui(),
      borderBoxSize: Ui(),
      contentBoxSize: Ui(),
      contentRect: new Di(0, 0, 0, 0),
    }),
    Ki = function (t, e) {
      if ((void 0 === e && (e = !1), Hi.has(t) && !e)) return Hi.get(t);
      if (Fi(t)) return Hi.set(t, Qi), Qi;
      var r = getComputedStyle(t),
        i = Pi(t) && t.ownerSVGElement && t.getBBox(),
        n = !Yi && "border-box" === r.boxSizing,
        o = $i.test(r.writingMode || ""),
        s = !i && qi.test(r.overflowY || ""),
        a = !i && qi.test(r.overflowX || ""),
        c = i ? 0 : Gi(r.paddingTop),
        l = i ? 0 : Gi(r.paddingRight),
        u = i ? 0 : Gi(r.paddingBottom),
        f = i ? 0 : Gi(r.paddingLeft),
        h = i ? 0 : Gi(r.borderTopWidth),
        d = i ? 0 : Gi(r.borderRightWidth),
        p = i ? 0 : Gi(r.borderBottomWidth),
        v = f + l,
        g = c + u,
        b = (i ? 0 : Gi(r.borderLeftWidth)) + d,
        y = h + p,
        m = a ? t.offsetHeight - y - t.clientHeight : 0,
        x = s ? t.offsetWidth - b - t.clientWidth : 0,
        E = n ? v + b : 0,
        w = n ? g + y : 0,
        S = i ? i.width : Gi(r.width) - E - x,
        O = i ? i.height : Gi(r.height) - w - m,
        k = S + v + x + b,
        A = O + g + m + y,
        T = Ii({
          devicePixelContentBoxSize: Ui(
            Math.round(S * devicePixelRatio),
            Math.round(O * devicePixelRatio),
            o
          ),
          borderBoxSize: Ui(k, A, o),
          contentBoxSize: Ui(S, O, o),
          contentRect: new Di(f, c, S, O),
        });
      return Hi.set(t, T), T;
    },
    Ji = function (t, e, r) {
      var i = Ki(t, r),
        n = i.borderBoxSize,
        o = i.contentBoxSize,
        s = i.devicePixelContentBoxSize;
      switch (e) {
        case Mi.DEVICE_PIXEL_CONTENT_BOX:
          return s;
        case Mi.BORDER_BOX:
          return n;
        default:
          return o;
      }
    },
    Zi = function (t) {
      var e = Ki(t);
      (this.target = t),
        (this.contentRect = e.contentRect),
        (this.borderBoxSize = Ii([e.borderBoxSize])),
        (this.contentBoxSize = Ii([e.contentBoxSize])),
        (this.devicePixelContentBoxSize = Ii([e.devicePixelContentBoxSize]));
    },
    tn = function (t) {
      if (Fi(t)) return 1 / 0;
      for (var e = 0, r = t.parentNode; r; ) (e += 1), (r = r.parentNode);
      return e;
    },
    en = function () {
      var t = 1 / 0,
        e = [];
      ji.forEach(function (r) {
        if (0 !== r.activeTargets.length) {
          var i = [];
          r.activeTargets.forEach(function (e) {
            var r = new Zi(e.target),
              n = tn(e.target);
            i.push(r),
              (e.lastReportedSize = Ji(e.target, e.observedBox)),
              n < t && (t = n);
          }),
            e.push(function () {
              r.callback.call(r.observer, i, r.observer);
            }),
            r.activeTargets.splice(0, r.activeTargets.length);
        }
      });
      for (var r = 0, i = e; r < i.length; r++) (0, i[r])();
      return t;
    },
    rn = function (t) {
      ji.forEach(function (e) {
        e.activeTargets.splice(0, e.activeTargets.length),
          e.skippedTargets.splice(0, e.skippedTargets.length),
          e.observationTargets.forEach(function (r) {
            r.isActive() &&
              (tn(r.target) > t
                ? e.activeTargets.push(r)
                : e.skippedTargets.push(r));
          });
      });
    },
    nn = [],
    on = 0,
    sn = { attributes: !0, characterData: !0, childList: !0, subtree: !0 },
    an = [
      "resize",
      "load",
      "transitionend",
      "animationend",
      "animationstart",
      "animationiteration",
      "keyup",
      "keydown",
      "mouseup",
      "mousedown",
      "mouseover",
      "mouseout",
      "blur",
      "focus",
    ],
    cn = function (t) {
      return void 0 === t && (t = 0), Date.now() + t;
    },
    ln = !1,
    un = new ((function () {
      function t() {
        var t = this;
        (this.stopped = !0),
          (this.listener = function () {
            return t.schedule();
          });
      }
      return (
        (t.prototype.run = function (t) {
          var e = this;
          if ((void 0 === t && (t = 250), !ln)) {
            ln = !0;
            var r,
              i = cn(t);
            (r = function () {
              var r = !1;
              try {
                r = (function () {
                  var t,
                    e = 0;
                  for (
                    rn(e);
                    ji.some(function (t) {
                      return t.activeTargets.length > 0;
                    });

                  )
                    (e = en()), rn(e);
                  return (
                    ji.some(function (t) {
                      return t.skippedTargets.length > 0;
                    }) &&
                      ("function" == typeof ErrorEvent
                        ? (t = new ErrorEvent("error", { message: Wi }))
                        : ((t = document.createEvent("Event")).initEvent(
                            "error",
                            !1,
                            !1
                          ),
                          (t.message = Wi)),
                      window.dispatchEvent(t)),
                    e > 0
                  );
                })();
              } finally {
                if (((ln = !1), (t = i - cn()), !on)) return;
                r ? e.run(1e3) : t > 0 ? e.run(t) : e.start();
              }
            }),
              (function (t) {
                if (!Ni) {
                  var e = 0,
                    r = document.createTextNode("");
                  new MutationObserver(function () {
                    return nn.splice(0).forEach(function (t) {
                      return t();
                    });
                  }).observe(r, { characterData: !0 }),
                    (Ni = function () {
                      r.textContent = "" + (e ? e-- : e++);
                    });
                }
                nn.push(t), Ni();
              })(function () {
                requestAnimationFrame(r);
              });
          }
        }),
        (t.prototype.schedule = function () {
          this.stop(), this.run();
        }),
        (t.prototype.observe = function () {
          var t = this,
            e = function () {
              return t.observer && t.observer.observe(document.body, sn);
            };
          document.body ? e() : Xi.addEventListener("DOMContentLoaded", e);
        }),
        (t.prototype.start = function () {
          var t = this;
          this.stopped &&
            ((this.stopped = !1),
            (this.observer = new MutationObserver(this.listener)),
            this.observe(),
            an.forEach(function (e) {
              return Xi.addEventListener(e, t.listener, !0);
            }));
        }),
        (t.prototype.stop = function () {
          var t = this;
          this.stopped ||
            (this.observer && this.observer.disconnect(),
            an.forEach(function (e) {
              return Xi.removeEventListener(e, t.listener, !0);
            }),
            (this.stopped = !0));
        }),
        t
      );
    })())(),
    fn = function (t) {
      !on && t > 0 && un.start(), !(on += t) && un.stop();
    },
    hn = (function () {
      function t(t, e) {
        (this.target = t),
          (this.observedBox = e || Mi.CONTENT_BOX),
          (this.lastReportedSize = { inlineSize: 0, blockSize: 0 });
      }
      return (
        (t.prototype.isActive = function () {
          var t,
            e = Ji(this.target, this.observedBox, !0);
          return (
            (t = this.target),
            Pi(t) ||
              (function (t) {
                switch (t.tagName) {
                  case "INPUT":
                    if ("image" !== t.type) break;
                  case "VIDEO":
                  case "AUDIO":
                  case "EMBED":
                  case "OBJECT":
                  case "CANVAS":
                  case "IFRAME":
                  case "IMG":
                    return !0;
                }
                return !1;
              })(t) ||
              "inline" !== getComputedStyle(t).display ||
              (this.lastReportedSize = e),
            this.lastReportedSize.inlineSize !== e.inlineSize ||
              this.lastReportedSize.blockSize !== e.blockSize
          );
        }),
        t
      );
    })(),
    dn = function (t, e) {
      (this.activeTargets = []),
        (this.skippedTargets = []),
        (this.observationTargets = []),
        (this.observer = t),
        (this.callback = e);
    },
    pn = new WeakMap(),
    vn = function (t, e) {
      for (var r = 0; r < t.length; r += 1) if (t[r].target === e) return r;
      return -1;
    },
    gn = (function () {
      function t() {}
      return (
        (t.connect = function (t, e) {
          var r = new dn(t, e);
          pn.set(t, r);
        }),
        (t.observe = function (t, e, r) {
          var i = pn.get(t),
            n = 0 === i.observationTargets.length;
          vn(i.observationTargets, e) < 0 &&
            (n && ji.push(i),
            i.observationTargets.push(new hn(e, r && r.box)),
            fn(1),
            un.schedule());
        }),
        (t.unobserve = function (t, e) {
          var r = pn.get(t),
            i = vn(r.observationTargets, e),
            n = 1 === r.observationTargets.length;
          i >= 0 &&
            (n && ji.splice(ji.indexOf(r), 1),
            r.observationTargets.splice(i, 1),
            fn(-1));
        }),
        (t.disconnect = function (t) {
          var e = this,
            r = pn.get(t);
          r.observationTargets.slice().forEach(function (r) {
            return e.unobserve(t, r.target);
          }),
            r.activeTargets.splice(0, r.activeTargets.length);
        }),
        t
      );
    })(),
    bn = (function () {
      function t(t) {
        if (0 === arguments.length)
          throw new TypeError(
            "Failed to construct 'ResizeObserver': 1 argument required, but only 0 present."
          );
        if ("function" != typeof t)
          throw new TypeError(
            "Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function."
          );
        gn.connect(this, t);
      }
      return (
        (t.prototype.observe = function (t, e) {
          if (0 === arguments.length)
            throw new TypeError(
              "Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present."
            );
          if (!Vi(t))
            throw new TypeError(
              "Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element"
            );
          gn.observe(this, t, e);
        }),
        (t.prototype.unobserve = function (t) {
          if (0 === arguments.length)
            throw new TypeError(
              "Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present."
            );
          if (!Vi(t))
            throw new TypeError(
              "Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element"
            );
          gn.unobserve(this, t);
        }),
        (t.prototype.disconnect = function () {
          gn.disconnect(this);
        }),
        (t.toString = function () {
          return "function ResizeObserver () { [polyfill code] }";
        }),
        t
      );
    })(),
    yn = function (t) {
      return function (e, r, i, n) {
        Tt(r);
        var o = zt(e),
          s = b(o),
          a = st(o.length),
          c = t ? a - 1 : 0,
          l = t ? -1 : 1;
        if (i < 2)
          for (;;) {
            if (c in s) {
              (n = s[c]), (c += l);
              break;
            }
            if (((c += l), t ? c < 0 : a <= c))
              throw TypeError("Reduce of empty array with no initial value");
          }
        for (; t ? c >= 0 : a > c; c += l) c in s && (n = r(n, s[c], c, o));
        return n;
      };
    },
    mn = [yn(!1), yn(!0)][0];
  At(
    { target: "Array", proto: !0, forced: Pt("reduce") },
    {
      reduce: function (t) {
        return mn(
          this,
          t,
          arguments.length,
          arguments.length > 1 ? arguments[1] : void 0
        );
      },
    }
  );
  var xn = M.f,
    En = Function.prototype,
    wn = En.toString,
    Sn = /^\s*function ([^ (]*)/;
  !l ||
    "name" in En ||
    xn(En, "name", {
      configurable: !0,
      get: function () {
        try {
          return wn.call(this).match(Sn)[1];
        } catch (t) {
          return "";
        }
      },
    });
  var On,
    kn,
    An = function () {
      var t = R(this),
        e = "";
      return (
        t.global && (e += "g"),
        t.ignoreCase && (e += "i"),
        t.multiline && (e += "m"),
        t.dotAll && (e += "s"),
        t.unicode && (e += "u"),
        t.sticky && (e += "y"),
        e
      );
    },
    Tn = RegExp.prototype.exec,
    Ln = String.prototype.replace,
    zn = Tn,
    Rn =
      ((On = /a/),
      (kn = /b*/g),
      Tn.call(On, "a"),
      Tn.call(kn, "a"),
      0 !== On.lastIndex || 0 !== kn.lastIndex),
    _n = void 0 !== /()??/.exec("")[1];
  (Rn || _n) &&
    (zn = function (t) {
      var e,
        r,
        i,
        n,
        o = this;
      return (
        _n && (r = new RegExp("^" + o.source + "$(?!\\s)", An.call(o))),
        Rn && (e = o.lastIndex),
        (i = Tn.call(o, t)),
        Rn && i && (o.lastIndex = o.global ? i.index + i[0].length : e),
        _n &&
          i &&
          i.length > 1 &&
          Ln.call(i[0], r, function () {
            for (n = 1; n < arguments.length - 2; n++)
              void 0 === arguments[n] && (i[n] = void 0);
          }),
        i
      );
    });
  var Mn = zn;
  At({ target: "RegExp", proto: !0, forced: /./.exec !== Mn }, { exec: Mn });
  var Cn = jt("species"),
    jn = !c(function () {
      var t = /./;
      return (
        (t.exec = function () {
          var t = [];
          return (t.groups = { a: "7" }), t;
        }),
        "7" !== "".replace(t, "$<a>")
      );
    }),
    Wn = !c(function () {
      var t = /(?:)/,
        e = t.exec;
      t.exec = function () {
        return e.apply(this, arguments);
      };
      var r = "ab".split(t);
      return 2 !== r.length || "a" !== r[0] || "b" !== r[1];
    }),
    Nn = function (t, e, r, i) {
      var n = jt(t),
        o = !c(function () {
          var e = {};
          return (
            (e[n] = function () {
              return 7;
            }),
            7 != ""[t](e)
          );
        }),
        s =
          o &&
          !c(function () {
            var e = !1,
              r = /a/;
            return (
              (r.exec = function () {
                return (e = !0), null;
              }),
              "split" === t &&
                ((r.constructor = {}),
                (r.constructor[Cn] = function () {
                  return r;
                })),
              r[n](""),
              !e
            );
          });
      if (!o || !s || ("replace" === t && !jn) || ("split" === t && !Wn)) {
        var a = /./[n],
          l = r(n, ""[t], function (t, e, r, i, n) {
            return e.exec === Mn
              ? o && !n
                ? { done: !0, value: a.call(e, r, i) }
                : { done: !0, value: t.call(r, e, i) }
              : { done: !1 };
          }),
          u = l[0],
          f = l[1];
        J(String.prototype, t, u),
          J(
            RegExp.prototype,
            n,
            2 == e
              ? function (t, e) {
                  return f.call(t, this, e);
                }
              : function (t) {
                  return f.call(t, this);
                }
          ),
          i && C(RegExp.prototype[n], "sham", !0);
      }
    },
    In = Ue.charAt,
    Bn = function (t, e, r) {
      return e + (r ? In(t, e).length : 1);
    },
    Dn = function (t, e) {
      var r = t.exec;
      if ("function" == typeof r) {
        var i = r.call(t, e);
        if ("object" != typeof i)
          throw TypeError(
            "RegExp exec method returned something other than an Object or null"
          );
        return i;
      }
      if ("RegExp" !== v(t))
        throw TypeError("RegExp#exec called on incompatible receiver");
      return Mn.call(t, e);
    };
  Nn("match", 1, function (t, e, r) {
    return [
      function (e) {
        var r = y(this),
          i = null == e ? void 0 : e[t];
        return void 0 !== i ? i.call(e, r) : new RegExp(e)[t](String(r));
      },
      function (t) {
        var i = r(e, t, this);
        if (i.done) return i.value;
        var n = R(t),
          o = String(this);
        if (!n.global) return Dn(n, o);
        var s = n.unicode;
        n.lastIndex = 0;
        for (var a, c = [], l = 0; null !== (a = Dn(n, o)); ) {
          var u = String(a[0]);
          (c[l] = u),
            "" === u && (n.lastIndex = Bn(o, st(n.lastIndex), s)),
            l++;
        }
        return 0 === l ? null : c;
      },
    ];
  });
  var Pn = Math.max,
    Fn = Math.min,
    Vn = Math.floor,
    Xn = /\$([$&'`]|\d\d?|<[^>]*>)/g,
    Hn = /\$([$&'`]|\d\d?)/g;
  Nn("replace", 2, function (t, e, r) {
    return [
      function (r, i) {
        var n = y(this),
          o = null == r ? void 0 : r[t];
        return void 0 !== o ? o.call(r, n, i) : e.call(String(n), r, i);
      },
      function (t, n) {
        var o = r(e, t, this, n);
        if (o.done) return o.value;
        var s = R(t),
          a = String(this),
          c = "function" == typeof n;
        c || (n = String(n));
        var l = s.global;
        if (l) {
          var u = s.unicode;
          s.lastIndex = 0;
        }
        for (var f = []; ; ) {
          var h = Dn(s, a);
          if (null === h) break;
          if ((f.push(h), !l)) break;
          "" === String(h[0]) && (s.lastIndex = Bn(a, st(s.lastIndex), u));
        }
        for (var d, p = "", v = 0, g = 0; g < f.length; g++) {
          h = f[g];
          for (
            var b = String(h[0]),
              y = Pn(Fn(nt(h.index), a.length), 0),
              m = [],
              x = 1;
            x < h.length;
            x++
          )
            m.push(void 0 === (d = h[x]) ? d : String(d));
          var E = h.groups;
          if (c) {
            var w = [b].concat(m, y, a);
            void 0 !== E && w.push(E);
            var S = String(n.apply(void 0, w));
          } else S = i(b, a, y, m, E, n);
          y >= v && ((p += a.slice(v, y) + S), (v = y + b.length));
        }
        return p + a.slice(v);
      },
    ];
    function i(t, r, i, n, o, s) {
      var a = i + t.length,
        c = n.length,
        l = Hn;
      return (
        void 0 !== o && ((o = zt(o)), (l = Xn)),
        e.call(s, l, function (e, s) {
          var l;
          switch (s.charAt(0)) {
            case "$":
              return "$";
            case "&":
              return t;
            case "`":
              return r.slice(0, i);
            case "'":
              return r.slice(a);
            case "<":
              l = o[s.slice(1, -1)];
              break;
            default:
              var u = +s;
              if (0 === u) return e;
              if (u > c) {
                var f = Vn(u / 10);
                return 0 === f
                  ? e
                  : f <= c
                  ? void 0 === n[f - 1]
                    ? s.charAt(1)
                    : n[f - 1] + s.charAt(1)
                  : e;
              }
              l = n[u - 1];
          }
          return void 0 === l ? "" : l;
        })
      );
    }
  });
  var qn = function (t) {
    return Array.prototype.reduce.call(
      t,
      function (t, e) {
        var r = e.name.match(/data-simplebar-(.+)/);
        if (r) {
          var i = r[1].replace(/\W+(.)/g, function (t, e) {
            return e.toUpperCase();
          });
          switch (e.value) {
            case "true":
              t[i] = !0;
              break;
            case "false":
              t[i] = !1;
              break;
            case void 0:
              t[i] = !0;
              break;
            default:
              t[i] = e.value;
          }
        }
        return t;
      },
      {}
    );
  };
  function $n(t) {
    return t && t.ownerDocument && t.ownerDocument.defaultView
      ? t.ownerDocument.defaultView
      : window;
  }
  function Yn(t) {
    return t && t.ownerDocument ? t.ownerDocument : document;
  }
  var Gn = null,
    Un = null;
  function Qn(t) {
    if (null === Gn) {
      var e = Yn(t);
      if (void 0 === e) return (Gn = 0);
      var r = e.body,
        i = e.createElement("div");
      i.classList.add("simplebar-hide-scrollbar"), r.appendChild(i);
      var n = i.getBoundingClientRect().right;
      r.removeChild(i), (Gn = n);
    }
    return Gn;
  }
  Yt &&
    window.addEventListener("resize", function () {
      Un !== window.devicePixelRatio &&
        ((Un = window.devicePixelRatio), (Gn = null));
    });
  var Kn = (function () {
    function t(e, r) {
      var i = this;
      (this.onScroll = function () {
        var t = $n(i.el);
        i.scrollXTicking ||
          (t.requestAnimationFrame(i.scrollX), (i.scrollXTicking = !0)),
          i.scrollYTicking ||
            (t.requestAnimationFrame(i.scrollY), (i.scrollYTicking = !0));
      }),
        (this.scrollX = function () {
          i.axis.x.isOverflowing &&
            (i.showScrollbar("x"), i.positionScrollbar("x")),
            (i.scrollXTicking = !1);
        }),
        (this.scrollY = function () {
          i.axis.y.isOverflowing &&
            (i.showScrollbar("y"), i.positionScrollbar("y")),
            (i.scrollYTicking = !1);
        }),
        (this.onMouseEnter = function () {
          i.showScrollbar("x"), i.showScrollbar("y");
        }),
        (this.onMouseMove = function (t) {
          (i.mouseX = t.clientX),
            (i.mouseY = t.clientY),
            (i.axis.x.isOverflowing || i.axis.x.forceVisible) &&
              i.onMouseMoveForAxis("x"),
            (i.axis.y.isOverflowing || i.axis.y.forceVisible) &&
              i.onMouseMoveForAxis("y");
        }),
        (this.onMouseLeave = function () {
          i.onMouseMove.cancel(),
            (i.axis.x.isOverflowing || i.axis.x.forceVisible) &&
              i.onMouseLeaveForAxis("x"),
            (i.axis.y.isOverflowing || i.axis.y.forceVisible) &&
              i.onMouseLeaveForAxis("y"),
            (i.mouseX = -1),
            (i.mouseY = -1);
        }),
        (this.onWindowResize = function () {
          (i.scrollbarWidth = i.getScrollbarWidth()), i.hideNativeScrollbar();
        }),
        (this.hideScrollbars = function () {
          (i.axis.x.track.rect = i.axis.x.track.el.getBoundingClientRect()),
            (i.axis.y.track.rect = i.axis.y.track.el.getBoundingClientRect()),
            i.isWithinBounds(i.axis.y.track.rect) ||
              (i.axis.y.scrollbar.el.classList.remove(i.classNames.visible),
              (i.axis.y.isVisible = !1)),
            i.isWithinBounds(i.axis.x.track.rect) ||
              (i.axis.x.scrollbar.el.classList.remove(i.classNames.visible),
              (i.axis.x.isVisible = !1));
        }),
        (this.onPointerEvent = function (t) {
          var e, r;
          (i.axis.x.track.rect = i.axis.x.track.el.getBoundingClientRect()),
            (i.axis.y.track.rect = i.axis.y.track.el.getBoundingClientRect()),
            (i.axis.x.isOverflowing || i.axis.x.forceVisible) &&
              (e = i.isWithinBounds(i.axis.x.track.rect)),
            (i.axis.y.isOverflowing || i.axis.y.forceVisible) &&
              (r = i.isWithinBounds(i.axis.y.track.rect)),
            (e || r) &&
              (t.preventDefault(),
              t.stopPropagation(),
              "mousedown" === t.type &&
                (e &&
                  ((i.axis.x.scrollbar.rect =
                    i.axis.x.scrollbar.el.getBoundingClientRect()),
                  i.isWithinBounds(i.axis.x.scrollbar.rect)
                    ? i.onDragStart(t, "x")
                    : i.onTrackClick(t, "x")),
                r &&
                  ((i.axis.y.scrollbar.rect =
                    i.axis.y.scrollbar.el.getBoundingClientRect()),
                  i.isWithinBounds(i.axis.y.scrollbar.rect)
                    ? i.onDragStart(t, "y")
                    : i.onTrackClick(t, "y"))));
        }),
        (this.drag = function (e) {
          var r = i.axis[i.draggedAxis].track,
            n = r.rect[i.axis[i.draggedAxis].sizeAttr],
            o = i.axis[i.draggedAxis].scrollbar,
            s = i.contentWrapperEl[i.axis[i.draggedAxis].scrollSizeAttr],
            a = parseInt(i.elStyles[i.axis[i.draggedAxis].sizeAttr], 10);
          e.preventDefault(), e.stopPropagation();
          var c =
            ((("y" === i.draggedAxis ? e.pageY : e.pageX) -
              r.rect[i.axis[i.draggedAxis].offsetAttr] -
              i.axis[i.draggedAxis].dragOffset) /
              (n - o.size)) *
            (s - a);
          "x" === i.draggedAxis &&
            ((c =
              i.isRtl && t.getRtlHelpers().isRtlScrollbarInverted
                ? c - (n + o.size)
                : c),
            (c = i.isRtl && t.getRtlHelpers().isRtlScrollingInverted ? -c : c)),
            (i.contentWrapperEl[i.axis[i.draggedAxis].scrollOffsetAttr] = c);
        }),
        (this.onEndDrag = function (t) {
          var e = Yn(i.el),
            r = $n(i.el);
          t.preventDefault(),
            t.stopPropagation(),
            i.el.classList.remove(i.classNames.dragging),
            e.removeEventListener("mousemove", i.drag, !0),
            e.removeEventListener("mouseup", i.onEndDrag, !0),
            (i.removePreventClickId = r.setTimeout(function () {
              e.removeEventListener("click", i.preventClick, !0),
                e.removeEventListener("dblclick", i.preventClick, !0),
                (i.removePreventClickId = null);
            }));
        }),
        (this.preventClick = function (t) {
          t.preventDefault(), t.stopPropagation();
        }),
        (this.el = e),
        (this.minScrollbarWidth = 20),
        (this.options = Object.assign({}, t.defaultOptions, {}, r)),
        (this.classNames = Object.assign(
          {},
          t.defaultOptions.classNames,
          {},
          this.options.classNames
        )),
        (this.axis = {
          x: {
            scrollOffsetAttr: "scrollLeft",
            sizeAttr: "width",
            scrollSizeAttr: "scrollWidth",
            offsetSizeAttr: "offsetWidth",
            offsetAttr: "left",
            overflowAttr: "overflowX",
            dragOffset: 0,
            isOverflowing: !0,
            isVisible: !1,
            forceVisible: !1,
            track: {},
            scrollbar: {},
          },
          y: {
            scrollOffsetAttr: "scrollTop",
            sizeAttr: "height",
            scrollSizeAttr: "scrollHeight",
            offsetSizeAttr: "offsetHeight",
            offsetAttr: "top",
            overflowAttr: "overflowY",
            dragOffset: 0,
            isOverflowing: !0,
            isVisible: !1,
            forceVisible: !1,
            track: {},
            scrollbar: {},
          },
        }),
        (this.removePreventClickId = null),
        t.instances.has(this.el) ||
          ((this.recalculate = qr(this.recalculate.bind(this), 64)),
          (this.onMouseMove = qr(this.onMouseMove.bind(this), 64)),
          (this.hideScrollbars = si(
            this.hideScrollbars.bind(this),
            this.options.timeout
          )),
          (this.onWindowResize = si(this.onWindowResize.bind(this), 64, {
            leading: !0,
          })),
          (t.getRtlHelpers = Ci(t.getRtlHelpers)),
          this.init());
    }
    (t.getRtlHelpers = function () {
      var e = document.createElement("div");
      e.innerHTML =
        '<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>';
      var r = e.firstElementChild;
      document.body.appendChild(r);
      var i = r.firstElementChild;
      r.scrollLeft = 0;
      var n = t.getOffset(r),
        o = t.getOffset(i);
      r.scrollLeft = 999;
      var s = t.getOffset(i);
      return {
        isRtlScrollingInverted: n.left !== o.left && o.left - s.left != 0,
        isRtlScrollbarInverted: n.left !== o.left,
      };
    }),
      (t.getOffset = function (t) {
        var e = t.getBoundingClientRect(),
          r = Yn(t),
          i = $n(t);
        return {
          top: e.top + (i.pageYOffset || r.documentElement.scrollTop),
          left: e.left + (i.pageXOffset || r.documentElement.scrollLeft),
        };
      });
    var e = t.prototype;
    return (
      (e.init = function () {
        t.instances.set(this.el, this),
          Yt &&
            (this.initDOM(),
            (this.scrollbarWidth = this.getScrollbarWidth()),
            this.recalculate(),
            this.initListeners());
      }),
      (e.initDOM = function () {
        var t = this;
        if (
          Array.prototype.filter.call(this.el.children, function (e) {
            return e.classList.contains(t.classNames.wrapper);
          }).length
        )
          (this.wrapperEl = this.el.querySelector(
            "." + this.classNames.wrapper
          )),
            (this.contentWrapperEl =
              this.options.scrollableNode ||
              this.el.querySelector("." + this.classNames.contentWrapper)),
            (this.contentEl =
              this.options.contentNode ||
              this.el.querySelector("." + this.classNames.contentEl)),
            (this.offsetEl = this.el.querySelector(
              "." + this.classNames.offset
            )),
            (this.maskEl = this.el.querySelector("." + this.classNames.mask)),
            (this.placeholderEl = this.findChild(
              this.wrapperEl,
              "." + this.classNames.placeholder
            )),
            (this.heightAutoObserverWrapperEl = this.el.querySelector(
              "." + this.classNames.heightAutoObserverWrapperEl
            )),
            (this.heightAutoObserverEl = this.el.querySelector(
              "." + this.classNames.heightAutoObserverEl
            )),
            (this.axis.x.track.el = this.findChild(
              this.el,
              "." + this.classNames.track + "." + this.classNames.horizontal
            )),
            (this.axis.y.track.el = this.findChild(
              this.el,
              "." + this.classNames.track + "." + this.classNames.vertical
            ));
        else {
          for (
            this.wrapperEl = document.createElement("div"),
              this.contentWrapperEl = document.createElement("div"),
              this.offsetEl = document.createElement("div"),
              this.maskEl = document.createElement("div"),
              this.contentEl = document.createElement("div"),
              this.placeholderEl = document.createElement("div"),
              this.heightAutoObserverWrapperEl = document.createElement("div"),
              this.heightAutoObserverEl = document.createElement("div"),
              this.wrapperEl.classList.add(this.classNames.wrapper),
              this.contentWrapperEl.classList.add(
                this.classNames.contentWrapper
              ),
              this.offsetEl.classList.add(this.classNames.offset),
              this.maskEl.classList.add(this.classNames.mask),
              this.contentEl.classList.add(this.classNames.contentEl),
              this.placeholderEl.classList.add(this.classNames.placeholder),
              this.heightAutoObserverWrapperEl.classList.add(
                this.classNames.heightAutoObserverWrapperEl
              ),
              this.heightAutoObserverEl.classList.add(
                this.classNames.heightAutoObserverEl
              );
            this.el.firstChild;

          )
            this.contentEl.appendChild(this.el.firstChild);
          this.contentWrapperEl.appendChild(this.contentEl),
            this.offsetEl.appendChild(this.contentWrapperEl),
            this.maskEl.appendChild(this.offsetEl),
            this.heightAutoObserverWrapperEl.appendChild(
              this.heightAutoObserverEl
            ),
            this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl),
            this.wrapperEl.appendChild(this.maskEl),
            this.wrapperEl.appendChild(this.placeholderEl),
            this.el.appendChild(this.wrapperEl);
        }
        if (!this.axis.x.track.el || !this.axis.y.track.el) {
          var e = document.createElement("div"),
            r = document.createElement("div");
          e.classList.add(this.classNames.track),
            r.classList.add(this.classNames.scrollbar),
            e.appendChild(r),
            (this.axis.x.track.el = e.cloneNode(!0)),
            this.axis.x.track.el.classList.add(this.classNames.horizontal),
            (this.axis.y.track.el = e.cloneNode(!0)),
            this.axis.y.track.el.classList.add(this.classNames.vertical),
            this.el.appendChild(this.axis.x.track.el),
            this.el.appendChild(this.axis.y.track.el);
        }
        (this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector(
          "." + this.classNames.scrollbar
        )),
          (this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector(
            "." + this.classNames.scrollbar
          )),
          this.options.autoHide ||
            (this.axis.x.scrollbar.el.classList.add(this.classNames.visible),
            this.axis.y.scrollbar.el.classList.add(this.classNames.visible)),
          this.el.setAttribute("data-simplebar", "init");
      }),
      (e.initListeners = function () {
        var t = this,
          e = $n(this.el);
        this.options.autoHide &&
          this.el.addEventListener("mouseenter", this.onMouseEnter),
          ["mousedown", "click", "dblclick"].forEach(function (e) {
            t.el.addEventListener(e, t.onPointerEvent, !0);
          }),
          ["touchstart", "touchend", "touchmove"].forEach(function (e) {
            t.el.addEventListener(e, t.onPointerEvent, {
              capture: !0,
              passive: !0,
            });
          }),
          this.el.addEventListener("mousemove", this.onMouseMove),
          this.el.addEventListener("mouseleave", this.onMouseLeave),
          this.contentWrapperEl.addEventListener("scroll", this.onScroll),
          e.addEventListener("resize", this.onWindowResize);
        var r = !1,
          i = e.ResizeObserver || bn;
        (this.resizeObserver = new i(function () {
          r && t.recalculate();
        })),
          this.resizeObserver.observe(this.el),
          this.resizeObserver.observe(this.contentEl),
          e.requestAnimationFrame(function () {
            r = !0;
          }),
          (this.mutationObserver = new e.MutationObserver(this.recalculate)),
          this.mutationObserver.observe(this.contentEl, {
            childList: !0,
            subtree: !0,
            characterData: !0,
          });
      }),
      (e.recalculate = function () {
        var t = $n(this.el);
        (this.elStyles = t.getComputedStyle(this.el)),
          (this.isRtl = "rtl" === this.elStyles.direction);
        var e = this.heightAutoObserverEl.offsetHeight <= 1,
          r = this.heightAutoObserverEl.offsetWidth <= 1,
          i = this.contentEl.offsetWidth,
          n = this.contentWrapperEl.offsetWidth,
          o = this.elStyles.overflowX,
          s = this.elStyles.overflowY;
        (this.contentEl.style.padding =
          this.elStyles.paddingTop +
          " " +
          this.elStyles.paddingRight +
          " " +
          this.elStyles.paddingBottom +
          " " +
          this.elStyles.paddingLeft),
          (this.wrapperEl.style.margin =
            "-" +
            this.elStyles.paddingTop +
            " -" +
            this.elStyles.paddingRight +
            " -" +
            this.elStyles.paddingBottom +
            " -" +
            this.elStyles.paddingLeft);
        var a = this.contentEl.scrollHeight,
          c = this.contentEl.scrollWidth;
        (this.contentWrapperEl.style.height = e ? "auto" : "100%"),
          (this.placeholderEl.style.width = r ? i + "px" : "auto"),
          (this.placeholderEl.style.height = a + "px");
        var l = this.contentWrapperEl.offsetHeight;
        (this.axis.x.isOverflowing = c > i),
          (this.axis.y.isOverflowing = a > l),
          (this.axis.x.isOverflowing =
            "hidden" !== o && this.axis.x.isOverflowing),
          (this.axis.y.isOverflowing =
            "hidden" !== s && this.axis.y.isOverflowing),
          (this.axis.x.forceVisible =
            "x" === this.options.forceVisible ||
            !0 === this.options.forceVisible),
          (this.axis.y.forceVisible =
            "y" === this.options.forceVisible ||
            !0 === this.options.forceVisible),
          this.hideNativeScrollbar();
        var u = this.axis.x.isOverflowing ? this.scrollbarWidth : 0,
          f = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
        (this.axis.x.isOverflowing = this.axis.x.isOverflowing && c > n - f),
          (this.axis.y.isOverflowing = this.axis.y.isOverflowing && a > l - u),
          (this.axis.x.scrollbar.size = this.getScrollbarSize("x")),
          (this.axis.y.scrollbar.size = this.getScrollbarSize("y")),
          (this.axis.x.scrollbar.el.style.width =
            this.axis.x.scrollbar.size + "px"),
          (this.axis.y.scrollbar.el.style.height =
            this.axis.y.scrollbar.size + "px"),
          this.positionScrollbar("x"),
          this.positionScrollbar("y"),
          this.toggleTrackVisibility("x"),
          this.toggleTrackVisibility("y");
      }),
      (e.getScrollbarSize = function (t) {
        if ((void 0 === t && (t = "y"), !this.axis[t].isOverflowing)) return 0;
        var e,
          r = this.contentEl[this.axis[t].scrollSizeAttr],
          i = this.axis[t].track.el[this.axis[t].offsetSizeAttr],
          n = i / r;
        return (
          (e = Math.max(~~(n * i), this.options.scrollbarMinSize)),
          this.options.scrollbarMaxSize &&
            (e = Math.min(e, this.options.scrollbarMaxSize)),
          e
        );
      }),
      (e.positionScrollbar = function (e) {
        if ((void 0 === e && (e = "y"), this.axis[e].isOverflowing)) {
          var r = this.contentWrapperEl[this.axis[e].scrollSizeAttr],
            i = this.axis[e].track.el[this.axis[e].offsetSizeAttr],
            n = parseInt(this.elStyles[this.axis[e].sizeAttr], 10),
            o = this.axis[e].scrollbar,
            s = this.contentWrapperEl[this.axis[e].scrollOffsetAttr],
            a =
              (s =
                "x" === e &&
                this.isRtl &&
                t.getRtlHelpers().isRtlScrollingInverted
                  ? -s
                  : s) /
              (r - n),
            c = ~~((i - o.size) * a);
          (c =
            "x" === e && this.isRtl && t.getRtlHelpers().isRtlScrollbarInverted
              ? c + (i - o.size)
              : c),
            (o.el.style.transform =
              "x" === e
                ? "translate3d(" + c + "px, 0, 0)"
                : "translate3d(0, " + c + "px, 0)");
        }
      }),
      (e.toggleTrackVisibility = function (t) {
        void 0 === t && (t = "y");
        var e = this.axis[t].track.el,
          r = this.axis[t].scrollbar.el;
        this.axis[t].isOverflowing || this.axis[t].forceVisible
          ? ((e.style.visibility = "visible"),
            (this.contentWrapperEl.style[this.axis[t].overflowAttr] = "scroll"))
          : ((e.style.visibility = "hidden"),
            (this.contentWrapperEl.style[this.axis[t].overflowAttr] =
              "hidden")),
          this.axis[t].isOverflowing
            ? (r.style.display = "block")
            : (r.style.display = "none");
      }),
      (e.hideNativeScrollbar = function () {
        (this.offsetEl.style[this.isRtl ? "left" : "right"] =
          this.axis.y.isOverflowing || this.axis.y.forceVisible
            ? "-" + this.scrollbarWidth + "px"
            : 0),
          (this.offsetEl.style.bottom =
            this.axis.x.isOverflowing || this.axis.x.forceVisible
              ? "-" + this.scrollbarWidth + "px"
              : 0);
      }),
      (e.onMouseMoveForAxis = function (t) {
        void 0 === t && (t = "y"),
          (this.axis[t].track.rect =
            this.axis[t].track.el.getBoundingClientRect()),
          (this.axis[t].scrollbar.rect =
            this.axis[t].scrollbar.el.getBoundingClientRect()),
          this.isWithinBounds(this.axis[t].scrollbar.rect)
            ? this.axis[t].scrollbar.el.classList.add(this.classNames.hover)
            : this.axis[t].scrollbar.el.classList.remove(this.classNames.hover),
          this.isWithinBounds(this.axis[t].track.rect)
            ? (this.showScrollbar(t),
              this.axis[t].track.el.classList.add(this.classNames.hover))
            : this.axis[t].track.el.classList.remove(this.classNames.hover);
      }),
      (e.onMouseLeaveForAxis = function (t) {
        void 0 === t && (t = "y"),
          this.axis[t].track.el.classList.remove(this.classNames.hover),
          this.axis[t].scrollbar.el.classList.remove(this.classNames.hover);
      }),
      (e.showScrollbar = function (t) {
        void 0 === t && (t = "y");
        var e = this.axis[t].scrollbar.el;
        this.axis[t].isVisible ||
          (e.classList.add(this.classNames.visible),
          (this.axis[t].isVisible = !0)),
          this.options.autoHide && this.hideScrollbars();
      }),
      (e.onDragStart = function (t, e) {
        void 0 === e && (e = "y");
        var r = Yn(this.el),
          i = $n(this.el),
          n = this.axis[e].scrollbar,
          o = "y" === e ? t.pageY : t.pageX;
        (this.axis[e].dragOffset = o - n.rect[this.axis[e].offsetAttr]),
          (this.draggedAxis = e),
          this.el.classList.add(this.classNames.dragging),
          r.addEventListener("mousemove", this.drag, !0),
          r.addEventListener("mouseup", this.onEndDrag, !0),
          null === this.removePreventClickId
            ? (r.addEventListener("click", this.preventClick, !0),
              r.addEventListener("dblclick", this.preventClick, !0))
            : (i.clearTimeout(this.removePreventClickId),
              (this.removePreventClickId = null));
      }),
      (e.onTrackClick = function (t, e) {
        var r = this;
        if ((void 0 === e && (e = "y"), this.options.clickOnTrack)) {
          var i = $n(this.el);
          this.axis[e].scrollbar.rect =
            this.axis[e].scrollbar.el.getBoundingClientRect();
          var n = this.axis[e].scrollbar.rect[this.axis[e].offsetAttr],
            o = parseInt(this.elStyles[this.axis[e].sizeAttr], 10),
            s = this.contentWrapperEl[this.axis[e].scrollOffsetAttr],
            a = ("y" === e ? this.mouseY - n : this.mouseX - n) < 0 ? -1 : 1,
            c = -1 === a ? s - o : s + o;
          !(function t() {
            var n, o;
            -1 === a
              ? s > c &&
                ((s -= r.options.clickOnTrackSpeed),
                r.contentWrapperEl.scrollTo(
                  (((n = {})[r.axis[e].offsetAttr] = s), n)
                ),
                i.requestAnimationFrame(t))
              : s < c &&
                ((s += r.options.clickOnTrackSpeed),
                r.contentWrapperEl.scrollTo(
                  (((o = {})[r.axis[e].offsetAttr] = s), o)
                ),
                i.requestAnimationFrame(t));
          })();
        }
      }),
      (e.getContentElement = function () {
        return this.contentEl;
      }),
      (e.getScrollElement = function () {
        return this.contentWrapperEl;
      }),
      (e.getScrollbarWidth = function () {
        try {
          return "none" ===
            getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar")
              .display ||
            "scrollbarWidth" in document.documentElement.style ||
            "-ms-overflow-style" in document.documentElement.style
            ? 0
            : Qn(this.el);
        } catch (t) {
          return Qn(this.el);
        }
      }),
      (e.removeListeners = function () {
        var t = this,
          e = $n(this.el);
        this.options.autoHide &&
          this.el.removeEventListener("mouseenter", this.onMouseEnter),
          ["mousedown", "click", "dblclick"].forEach(function (e) {
            t.el.removeEventListener(e, t.onPointerEvent, !0);
          }),
          ["touchstart", "touchend", "touchmove"].forEach(function (e) {
            t.el.removeEventListener(e, t.onPointerEvent, {
              capture: !0,
              passive: !0,
            });
          }),
          this.el.removeEventListener("mousemove", this.onMouseMove),
          this.el.removeEventListener("mouseleave", this.onMouseLeave),
          this.contentWrapperEl &&
            this.contentWrapperEl.removeEventListener("scroll", this.onScroll),
          e.removeEventListener("resize", this.onWindowResize),
          this.mutationObserver && this.mutationObserver.disconnect(),
          this.resizeObserver && this.resizeObserver.disconnect(),
          this.recalculate.cancel(),
          this.onMouseMove.cancel(),
          this.hideScrollbars.cancel(),
          this.onWindowResize.cancel();
      }),
      (e.unMount = function () {
        this.removeListeners(), t.instances.delete(this.el);
      }),
      (e.isWithinBounds = function (t) {
        return (
          this.mouseX >= t.left &&
          this.mouseX <= t.left + t.width &&
          this.mouseY >= t.top &&
          this.mouseY <= t.top + t.height
        );
      }),
      (e.findChild = function (t, e) {
        var r =
          t.matches ||
          t.webkitMatchesSelector ||
          t.mozMatchesSelector ||
          t.msMatchesSelector;
        return Array.prototype.filter.call(t.children, function (t) {
          return r.call(t, e);
        })[0];
      }),
      t
    );
  })();
  return (
    (Kn.defaultOptions = {
      autoHide: !0,
      forceVisible: !1,
      clickOnTrack: !0,
      clickOnTrackSpeed: 40,
      classNames: {
        contentEl: "simplebar-content",
        contentWrapper: "simplebar-content-wrapper",
        offset: "simplebar-offset",
        mask: "simplebar-mask",
        wrapper: "simplebar-wrapper",
        placeholder: "simplebar-placeholder",
        scrollbar: "simplebar-scrollbar",
        track: "simplebar-track",
        heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
        heightAutoObserverEl: "simplebar-height-auto-observer",
        visible: "simplebar-visible",
        horizontal: "simplebar-horizontal",
        vertical: "simplebar-vertical",
        hover: "simplebar-hover",
        dragging: "simplebar-dragging",
      },
      scrollbarMinSize: 25,
      scrollbarMaxSize: 0,
      timeout: 1e3,
    }),
    (Kn.instances = new WeakMap()),
    (Kn.initDOMLoadedElements = function () {
      document.removeEventListener(
        "DOMContentLoaded",
        this.initDOMLoadedElements
      ),
        window.removeEventListener("load", this.initDOMLoadedElements),
        Array.prototype.forEach.call(
          document.querySelectorAll("[data-simplebar]"),
          function (t) {
            "init" === t.getAttribute("data-simplebar") ||
              Kn.instances.has(t) ||
              new Kn(t, qn(t.attributes));
          }
        );
    }),
    (Kn.removeObserver = function () {
      this.globalObserver.disconnect();
    }),
    (Kn.initHtmlApi = function () {
      (this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this)),
        "undefined" != typeof MutationObserver &&
          ((this.globalObserver = new MutationObserver(Kn.handleMutations)),
          this.globalObserver.observe(document, {
            childList: !0,
            subtree: !0,
          })),
        "complete" === document.readyState ||
        ("loading" !== document.readyState &&
          !document.documentElement.doScroll)
          ? window.setTimeout(this.initDOMLoadedElements)
          : (document.addEventListener(
              "DOMContentLoaded",
              this.initDOMLoadedElements
            ),
            window.addEventListener("load", this.initDOMLoadedElements));
    }),
    (Kn.handleMutations = function (t) {
      t.forEach(function (t) {
        Array.prototype.forEach.call(t.addedNodes, function (t) {
          1 === t.nodeType &&
            (t.hasAttribute("data-simplebar")
              ? !Kn.instances.has(t) &&
                document.documentElement.contains(t) &&
                new Kn(t, qn(t.attributes))
              : Array.prototype.forEach.call(
                  t.querySelectorAll("[data-simplebar]"),
                  function (t) {
                    "init" !== t.getAttribute("data-simplebar") &&
                      !Kn.instances.has(t) &&
                      document.documentElement.contains(t) &&
                      new Kn(t, qn(t.attributes));
                  }
                ));
        }),
          Array.prototype.forEach.call(t.removedNodes, function (t) {
            1 === t.nodeType &&
              ("init" === t.getAttribute("data-simplebar")
                ? Kn.instances.has(t) &&
                  !document.documentElement.contains(t) &&
                  Kn.instances.get(t).unMount()
                : Array.prototype.forEach.call(
                    t.querySelectorAll('[data-simplebar="init"]'),
                    function (t) {
                      Kn.instances.has(t) &&
                        !document.documentElement.contains(t) &&
                        Kn.instances.get(t).unMount();
                    }
                  ));
          });
      });
    }),
    (Kn.getOptions = qn),
    Yt && Kn.initHtmlApi(),
    Kn
  );
});
!(function (i) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], i)
    : "undefined" != typeof exports
    ? (module.exports = i(require("jquery")))
    : i(jQuery);
})(function (i) {
  "use strict";
  var e = window.Slick || {};
  ((e = (function () {
    var e = 0;
    return function (t, o) {
      var s,
        n = this;
      (n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: i(t),
        appendDots: i(t),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow:
          '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (e, t) {
          return i('<button type="button" />').text(t + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3,
      }),
        (n.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1,
        }),
        i.extend(n, n.initials),
        (n.activeBreakpoint = null),
        (n.animType = null),
        (n.animProp = null),
        (n.breakpoints = []),
        (n.breakpointSettings = []),
        (n.cssTransitions = !1),
        (n.focussed = !1),
        (n.interrupted = !1),
        (n.hidden = "hidden"),
        (n.paused = !0),
        (n.positionProp = null),
        (n.respondTo = null),
        (n.rowCount = 1),
        (n.shouldClick = !0),
        (n.$slider = i(t)),
        (n.$slidesCache = null),
        (n.transformType = null),
        (n.transitionType = null),
        (n.visibilityChange = "visibilitychange"),
        (n.windowWidth = 0),
        (n.windowTimer = null),
        (s = i(t).data("slick") || {}),
        (n.options = i.extend({}, n.defaults, o, s)),
        (n.currentSlide = n.options.initialSlide),
        (n.originalSettings = n.options),
        void 0 !== document.mozHidden
          ? ((n.hidden = "mozHidden"),
            (n.visibilityChange = "mozvisibilitychange"))
          : void 0 !== document.webkitHidden &&
            ((n.hidden = "webkitHidden"),
            (n.visibilityChange = "webkitvisibilitychange")),
        (n.autoPlay = i.proxy(n.autoPlay, n)),
        (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
        (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
        (n.changeSlide = i.proxy(n.changeSlide, n)),
        (n.clickHandler = i.proxy(n.clickHandler, n)),
        (n.selectHandler = i.proxy(n.selectHandler, n)),
        (n.setPosition = i.proxy(n.setPosition, n)),
        (n.swipeHandler = i.proxy(n.swipeHandler, n)),
        (n.dragHandler = i.proxy(n.dragHandler, n)),
        (n.keyHandler = i.proxy(n.keyHandler, n)),
        (n.instanceUid = e++),
        (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        n.registerBreakpoints(),
        n.init(!0);
    };
  })()).prototype.activateADA = function () {
    this.$slideTrack
      .find(".slick-active")
      .attr({ "aria-hidden": "false" })
      .find("a, input, button, select")
      .attr({ tabindex: "0" });
  }),
    (e.prototype.addSlide = e.prototype.slickAdd =
      function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t) (o = t), (t = null);
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(),
          "number" == typeof t
            ? 0 === t && 0 === s.$slides.length
              ? i(e).appendTo(s.$slideTrack)
              : o
              ? i(e).insertBefore(s.$slides.eq(t))
              : i(e).insertAfter(s.$slides.eq(t))
            : !0 === o
            ? i(e).prependTo(s.$slideTrack)
            : i(e).appendTo(s.$slideTrack),
          (s.$slides = s.$slideTrack.children(this.options.slide)),
          s.$slideTrack.children(this.options.slide).detach(),
          s.$slideTrack.append(s.$slides),
          s.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e);
          }),
          (s.$slidesCache = s.$slides),
          s.reinit();
      }),
    (e.prototype.animateHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.animate({ height: e }, i.options.speed);
      }
    }),
    (e.prototype.animateSlide = function (e, t) {
      var o = {},
        s = this;
      s.animateHeight(),
        !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
        !1 === s.transformsEnabled
          ? !1 === s.options.vertical
            ? s.$slideTrack.animate(
                { left: e },
                s.options.speed,
                s.options.easing,
                t
              )
            : s.$slideTrack.animate(
                { top: e },
                s.options.speed,
                s.options.easing,
                t
              )
          : !1 === s.cssTransitions
          ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
            i({ animStart: s.currentLeft }).animate(
              { animStart: e },
              {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function (i) {
                  (i = Math.ceil(i)),
                    !1 === s.options.vertical
                      ? ((o[s.animType] = "translate(" + i + "px, 0px)"),
                        s.$slideTrack.css(o))
                      : ((o[s.animType] = "translate(0px," + i + "px)"),
                        s.$slideTrack.css(o));
                },
                complete: function () {
                  t && t.call();
                },
              }
            ))
          : (s.applyTransition(),
            (e = Math.ceil(e)),
            !1 === s.options.vertical
              ? (o[s.animType] = "translate3d(" + e + "px, 0px, 0px)")
              : (o[s.animType] = "translate3d(0px," + e + "px, 0px)"),
            s.$slideTrack.css(o),
            t &&
              setTimeout(function () {
                s.disableTransition(), t.call();
              }, s.options.speed));
    }),
    (e.prototype.getNavTarget = function () {
      var e = this.options.asNavFor;
      return e && null !== e && (e = i(e).not(this.$slider)), e;
    }),
    (e.prototype.asNavFor = function (e) {
      var t = this.getNavTarget();
      null !== t &&
        "object" == typeof t &&
        t.each(function () {
          var t = i(this).slick("getSlick");
          t.unslicked || t.slideHandler(e, !0);
        });
    }),
    (e.prototype.applyTransition = function (i) {
      var e = this,
        t = {};
      !1 === e.options.fade
        ? (t[e.transitionType] =
            e.transformType + " " + e.options.speed + "ms " + e.options.cssEase)
        : (t[e.transitionType] =
            "opacity " + e.options.speed + "ms " + e.options.cssEase),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.autoPlay = function () {
      var i = this;
      i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow &&
          (i.autoPlayTimer = setInterval(
            i.autoPlayIterator,
            i.options.autoplaySpeed
          ));
    }),
    (e.prototype.autoPlayClear = function () {
      this.autoPlayTimer && clearInterval(this.autoPlayTimer);
    }),
    (e.prototype.autoPlayIterator = function () {
      var i = this,
        e = i.currentSlide + i.options.slidesToScroll;
      i.paused ||
        i.interrupted ||
        i.focussed ||
        (!1 === i.options.infinite &&
          (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1
            ? (i.direction = 0)
            : 0 === i.direction &&
              ((e = i.currentSlide - i.options.slidesToScroll),
              i.currentSlide - 1 == 0 && (i.direction = 1))),
        i.slideHandler(e));
    }),
    (e.prototype.buildArrows = function () {
      var e = this;
      !0 === e.options.arrows &&
        ((e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow")),
        (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
        e.slideCount > e.options.slidesToShow
          ? (e.$prevArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.$nextArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.htmlExpr.test(e.options.prevArrow) &&
              e.$prevArrow.prependTo(e.options.appendArrows),
            e.htmlExpr.test(e.options.nextArrow) &&
              e.$nextArrow.appendTo(e.options.appendArrows),
            !0 !== e.options.infinite &&
              e.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"))
          : e.$prevArrow
              .add(e.$nextArrow)
              .addClass("slick-hidden")
              .attr({ "aria-disabled": "true", tabindex: "-1" }));
    }),
    (e.prototype.buildDots = function () {
      var e,
        t,
        o = this;
      if (!0 === o.options.dots) {
        for (
          o.$slider.addClass("slick-dotted"),
            t = i("<ul />").addClass(o.options.dotsClass),
            e = 0;
          e <= o.getDotCount();
          e += 1
        )
          t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
        (o.$dots = t.appendTo(o.options.appendDots)),
          o.$dots.find("li").first().addClass("slick-active");
      }
    }),
    (e.prototype.buildOut = function () {
      var e = this;
      (e.$slides = e.$slider
        .children(e.options.slide + ":not(.slick-cloned)")
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.$slides.each(function (e, t) {
          i(t)
            .attr("data-slick-index", e)
            .data("originalStyling", i(t).attr("style") || "");
        }),
        e.$slider.addClass("slick-slider"),
        (e.$slideTrack =
          0 === e.slideCount
            ? i('<div class="slick-track"/>').appendTo(e.$slider)
            : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
        e.$slideTrack.css("opacity", 0),
        (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) ||
          (e.options.slidesToScroll = 1),
        i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        !0 === e.options.draggable && e.$list.addClass("draggable");
    }),
    (e.prototype.buildRows = function () {
      var i,
        e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      if (
        ((o = document.createDocumentFragment()),
        (n = l.$slider.children()),
        l.options.rows > 1)
      ) {
        for (
          r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            i = 0;
          i < s;
          i++
        ) {
          var d = document.createElement("div");
          for (e = 0; e < l.options.rows; e++) {
            var a = document.createElement("div");
            for (t = 0; t < l.options.slidesPerRow; t++) {
              var c = i * r + (e * l.options.slidesPerRow + t);
              n.get(c) && a.appendChild(n.get(c));
            }
            d.appendChild(a);
          }
          o.appendChild(d);
        }
        l.$slider.empty().append(o),
          l.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / l.options.slidesPerRow + "%",
              display: "inline-block",
            });
      }
    }),
    (e.prototype.checkResponsive = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = !1,
        d = r.$slider.width(),
        a = window.innerWidth || i(window).width();
      if (
        ("window" === r.respondTo
          ? (n = a)
          : "slider" === r.respondTo
          ? (n = d)
          : "min" === r.respondTo && (n = Math.min(a, d)),
        r.options.responsive &&
          r.options.responsive.length &&
          null !== r.options.responsive)
      ) {
        for (o in ((s = null), r.breakpoints))
          r.breakpoints.hasOwnProperty(o) &&
            (!1 === r.originalSettings.mobileFirst
              ? n < r.breakpoints[o] && (s = r.breakpoints[o])
              : n > r.breakpoints[o] && (s = r.breakpoints[o]));
        null !== s
          ? null !== r.activeBreakpoint
            ? (s !== r.activeBreakpoint || t) &&
              ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
            : ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
          : null !== r.activeBreakpoint &&
            ((r.activeBreakpoint = null),
            (r.options = r.originalSettings),
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e),
            (l = s)),
          e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
      }
    }),
    (e.prototype.changeSlide = function (e, t) {
      var o,
        s,
        n = this,
        r = i(e.currentTarget);
      switch (
        (r.is("a") && e.preventDefault(),
        r.is("li") || (r = r.closest("li")),
        (o =
          n.slideCount % n.options.slidesToScroll != 0
            ? 0
            : (n.slideCount - n.currentSlide) % n.options.slidesToScroll),
        e.data.message)
      ) {
        case "previous":
          (s = 0 === o ? n.options.slidesToScroll : n.options.slidesToShow - o),
            n.slideCount > n.options.slidesToShow &&
              n.slideHandler(n.currentSlide - s, !1, t);
          break;
        case "next":
          (s = 0 === o ? n.options.slidesToScroll : o),
            n.slideCount > n.options.slidesToShow &&
              n.slideHandler(n.currentSlide + s, !1, t);
          break;
        case "index":
          var l =
            0 === e.data.index
              ? 0
              : e.data.index || r.index() * n.options.slidesToScroll;
          n.slideHandler(n.checkNavigable(l), !1, t),
            r.children().trigger("focus");
          break;
        default:
          return;
      }
    }),
    (e.prototype.checkNavigable = function (i) {
      var e, t;
      if (((t = 0), i > (e = this.getNavigableIndexes())[e.length - 1]))
        i = e[e.length - 1];
      else
        for (var o in e) {
          if (i < e[o]) {
            i = t;
            break;
          }
          t = e[o];
        }
      return i;
    }),
    (e.prototype.cleanUpEvents = function () {
      var e = this;
      e.options.dots &&
        null !== e.$dots &&
        (i("li", e.$dots)
          .off("click.slick", e.changeSlide)
          .off("mouseenter.slick", i.proxy(e.interrupt, e, !0))
          .off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
        !0 === e.options.accessibility &&
          e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
          e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
          !0 === e.options.accessibility &&
            (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
            e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        i(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        !0 === e.options.accessibility &&
          e.$list.off("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().off("click.slick", e.selectHandler),
        i(window).off(
          "orientationchange.slick.slick-" + e.instanceUid,
          e.orientationChange
        ),
        i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        i("[draggable!=true]", e.$slideTrack).off(
          "dragstart",
          e.preventDefault
        ),
        i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
    }),
    (e.prototype.cleanUpSlideEvents = function () {
      var e = this;
      e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.cleanUpRows = function () {
      var i,
        e = this;
      e.options.rows > 1 &&
        ((i = e.$slides.children().children()).removeAttr("style"),
        e.$slider.empty().append(i));
    }),
    (e.prototype.clickHandler = function (i) {
      !1 === this.shouldClick &&
        (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
    }),
    (e.prototype.destroy = function (e) {
      var t = this;
      t.autoPlayClear(),
        (t.touchObject = {}),
        t.cleanUpEvents(),
        i(".slick-cloned", t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow &&
          t.$prevArrow.length &&
          (t.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow &&
          t.$nextArrow.length &&
          (t.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides &&
          (t.$slides
            .removeClass(
              "slick-slide slick-active slick-center slick-visible slick-current"
            )
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function () {
              i(this).attr("style", i(this).data("originalStyling"));
            }),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slideTrack.detach(),
          t.$list.detach(),
          t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass("slick-slider"),
        t.$slider.removeClass("slick-initialized"),
        t.$slider.removeClass("slick-dotted"),
        (t.unslicked = !0),
        e || t.$slider.trigger("destroy", [t]);
    }),
    (e.prototype.disableTransition = function (i) {
      var e = this,
        t = {};
      (t[e.transitionType] = ""),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.fadeSlide = function (i, e) {
      var t = this;
      !1 === t.cssTransitions
        ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
          t.$slides
            .eq(i)
            .animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
        : (t.applyTransition(i),
          t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
          e &&
            setTimeout(function () {
              t.disableTransition(i), e.call();
            }, t.options.speed));
    }),
    (e.prototype.fadeSlideOut = function (i) {
      var e = this;
      !1 === e.cssTransitions
        ? e.$slides
            .eq(i)
            .animate(
              { opacity: 0, zIndex: e.options.zIndex - 2 },
              e.options.speed,
              e.options.easing
            )
        : (e.applyTransition(i),
          e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
    }),
    (e.prototype.filterSlides = e.prototype.slickFilter =
      function (i) {
        var e = this;
        null !== i &&
          ((e.$slidesCache = e.$slides),
          e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.filter(i).appendTo(e.$slideTrack),
          e.reinit());
      }),
    (e.prototype.focusHandler = function () {
      var e = this;
      e.$slider
        .off("focus.slick blur.slick")
        .on("focus.slick blur.slick", "*", function (t) {
          t.stopImmediatePropagation();
          var o = i(this);
          setTimeout(function () {
            e.options.pauseOnFocus &&
              ((e.focussed = o.is(":focus")), e.autoPlay());
          }, 0);
        });
    }),
    (e.prototype.getCurrent = e.prototype.slickCurrentSlide =
      function () {
        return this.currentSlide;
      }),
    (e.prototype.getDotCount = function () {
      var i = this,
        e = 0,
        t = 0,
        o = 0;
      if (!0 === i.options.infinite)
        if (i.slideCount <= i.options.slidesToShow) ++o;
        else
          for (; e < i.slideCount; )
            ++o,
              (e = t + i.options.slidesToScroll),
              (t +=
                i.options.slidesToScroll <= i.options.slidesToShow
                  ? i.options.slidesToScroll
                  : i.options.slidesToShow);
      else if (!0 === i.options.centerMode) o = i.slideCount;
      else if (i.options.asNavFor)
        for (; e < i.slideCount; )
          ++o,
            (e = t + i.options.slidesToScroll),
            (t +=
              i.options.slidesToScroll <= i.options.slidesToShow
                ? i.options.slidesToScroll
                : i.options.slidesToShow);
      else
        o =
          1 +
          Math.ceil(
            (i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll
          );
      return o - 1;
    }),
    (e.prototype.getLeft = function (i) {
      var e,
        t,
        o,
        s,
        n = this,
        r = 0;
      return (
        (n.slideOffset = 0),
        (t = n.$slides.first().outerHeight(!0)),
        !0 === n.options.infinite
          ? (n.slideCount > n.options.slidesToShow &&
              ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
              (s = -1),
              !0 === n.options.vertical &&
                !0 === n.options.centerMode &&
                (2 === n.options.slidesToShow
                  ? (s = -1.5)
                  : 1 === n.options.slidesToShow && (s = -2)),
              (r = t * n.options.slidesToShow * s)),
            n.slideCount % n.options.slidesToScroll != 0 &&
              i + n.options.slidesToScroll > n.slideCount &&
              n.slideCount > n.options.slidesToShow &&
              (i > n.slideCount
                ? ((n.slideOffset =
                    (n.options.slidesToShow - (i - n.slideCount)) *
                    n.slideWidth *
                    -1),
                  (r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                : ((n.slideOffset =
                    (n.slideCount % n.options.slidesToScroll) *
                    n.slideWidth *
                    -1),
                  (r = (n.slideCount % n.options.slidesToScroll) * t * -1))))
          : i + n.options.slidesToShow > n.slideCount &&
            ((n.slideOffset =
              (i + n.options.slidesToShow - n.slideCount) * n.slideWidth),
            (r = (i + n.options.slidesToShow - n.slideCount) * t)),
        n.slideCount <= n.options.slidesToShow &&
          ((n.slideOffset = 0), (r = 0)),
        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow
          ? (n.slideOffset =
              (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
              (n.slideWidth * n.slideCount) / 2)
          : !0 === n.options.centerMode && !0 === n.options.infinite
          ? (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
              n.slideWidth)
          : !0 === n.options.centerMode &&
            ((n.slideOffset = 0),
            (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
        (e =
          !1 === n.options.vertical
            ? i * n.slideWidth * -1 + n.slideOffset
            : i * t * -1 + r),
        !0 === n.options.variableWidth &&
          ((o =
            n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite
              ? n.$slideTrack.children(".slick-slide").eq(i)
              : n.$slideTrack
                  .children(".slick-slide")
                  .eq(i + n.options.slidesToShow)),
          (e =
            !0 === n.options.rtl
              ? o[0]
                ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                : 0
              : o[0]
              ? -1 * o[0].offsetLeft
              : 0),
          !0 === n.options.centerMode &&
            ((o =
              n.slideCount <= n.options.slidesToShow ||
              !1 === n.options.infinite
                ? n.$slideTrack.children(".slick-slide").eq(i)
                : n.$slideTrack
                    .children(".slick-slide")
                    .eq(i + n.options.slidesToShow + 1)),
            (e =
              !0 === n.options.rtl
                ? o[0]
                  ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                  : 0
                : o[0]
                ? -1 * o[0].offsetLeft
                : 0),
            (e += (n.$list.width() - o.outerWidth()) / 2))),
        e
      );
    }),
    (e.prototype.getOption = e.prototype.slickGetOption =
      function (i) {
        return this.options[i];
      }),
    (e.prototype.getNavigableIndexes = function () {
      var i,
        e = this,
        t = 0,
        o = 0,
        s = [];
      for (
        !1 === e.options.infinite
          ? (i = e.slideCount)
          : ((t = -1 * e.options.slidesToScroll),
            (o = -1 * e.options.slidesToScroll),
            (i = 2 * e.slideCount));
        t < i;

      )
        s.push(t),
          (t = o + e.options.slidesToScroll),
          (o +=
            e.options.slidesToScroll <= e.options.slidesToShow
              ? e.options.slidesToScroll
              : e.options.slidesToShow);
      return s;
    }),
    (e.prototype.getSlick = function () {
      return this;
    }),
    (e.prototype.getSlideCount = function () {
      var e,
        t,
        o = this;
      return (
        (t =
          !0 === o.options.centerMode
            ? o.slideWidth * Math.floor(o.options.slidesToShow / 2)
            : 0),
        !0 === o.options.swipeToSlide
          ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
              if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft)
                return (e = n), !1;
            }),
            Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1)
          : o.options.slidesToScroll
      );
    }),
    (e.prototype.goTo = e.prototype.slickGoTo =
      function (i, e) {
        this.changeSlide({ data: { message: "index", index: parseInt(i) } }, e);
      }),
    (e.prototype.init = function (e) {
      var t = this;
      i(t.$slider).hasClass("slick-initialized") ||
        (i(t.$slider).addClass("slick-initialized"),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger("init", [t]),
        !0 === t.options.accessibility && t.initADA(),
        t.options.autoplay && ((t.paused = !1), t.autoPlay());
    }),
    (e.prototype.initADA = function () {
      var e = this,
        t = Math.ceil(e.slideCount / e.options.slidesToShow),
        o = e.getNavigableIndexes().filter(function (i) {
          return i >= 0 && i < e.slideCount;
        });
      e.$slides
        .add(e.$slideTrack.find(".slick-cloned"))
        .attr({ "aria-hidden": "true", tabindex: "-1" })
        .find("a, input, button, select")
        .attr({ tabindex: "-1" }),
        null !== e.$dots &&
          (e.$slides
            .not(e.$slideTrack.find(".slick-cloned"))
            .each(function (t) {
              var s = o.indexOf(t);
              i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1,
              }),
                -1 !== s &&
                  i(this).attr({
                    "aria-describedby":
                      "slick-slide-control" + e.instanceUid + s,
                  });
            }),
          e.$dots
            .attr("role", "tablist")
            .find("li")
            .each(function (s) {
              var n = o[s];
              i(this).attr({ role: "presentation" }),
                i(this)
                  .find("button")
                  .first()
                  .attr({
                    role: "tab",
                    id: "slick-slide-control" + e.instanceUid + s,
                    "aria-controls": "slick-slide" + e.instanceUid + n,
                    "aria-label": s + 1 + " of " + t,
                    "aria-selected": null,
                    tabindex: "-1",
                  });
            })
            .eq(e.currentSlide)
            .find("button")
            .attr({ "aria-selected": "true", tabindex: "0" })
            .end());
      for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
        e.$slides.eq(s).attr("tabindex", 0);
      e.activateADA();
    }),
    (e.prototype.initArrowEvents = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow
          .off("click.slick")
          .on("click.slick", { message: "previous" }, i.changeSlide),
        i.$nextArrow
          .off("click.slick")
          .on("click.slick", { message: "next" }, i.changeSlide),
        !0 === i.options.accessibility &&
          (i.$prevArrow.on("keydown.slick", i.keyHandler),
          i.$nextArrow.on("keydown.slick", i.keyHandler)));
    }),
    (e.prototype.initDotEvents = function () {
      var e = this;
      !0 === e.options.dots &&
        (i("li", e.$dots).on(
          "click.slick",
          { message: "index" },
          e.changeSlide
        ),
        !0 === e.options.accessibility &&
          e.$dots.on("keydown.slick", e.keyHandler)),
        !0 === e.options.dots &&
          !0 === e.options.pauseOnDotsHover &&
          i("li", e.$dots)
            .on("mouseenter.slick", i.proxy(e.interrupt, e, !0))
            .on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.initSlideEvents = function () {
      var e = this;
      e.options.pauseOnHover &&
        (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
    }),
    (e.prototype.initializeEvents = function () {
      var e = this;
      e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on(
          "touchstart.slick mousedown.slick",
          { action: "start" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchmove.slick mousemove.slick",
          { action: "move" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchend.slick mouseup.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchcancel.slick mouseleave.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on("click.slick", e.clickHandler),
        i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
        !0 === e.options.accessibility &&
          e.$list.on("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        i(window).on(
          "orientationchange.slick.slick-" + e.instanceUid,
          i.proxy(e.orientationChange, e)
        ),
        i(window).on(
          "resize.slick.slick-" + e.instanceUid,
          i.proxy(e.resize, e)
        ),
        i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        i(e.setPosition);
    }),
    (e.prototype.initUI = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.show(), i.$nextArrow.show()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.show();
    }),
    (e.prototype.keyHandler = function (i) {
      var e = this;
      i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
        (37 === i.keyCode && !0 === e.options.accessibility
          ? e.changeSlide({
              data: { message: !0 === e.options.rtl ? "next" : "previous" },
            })
          : 39 === i.keyCode &&
            !0 === e.options.accessibility &&
            e.changeSlide({
              data: { message: !0 === e.options.rtl ? "previous" : "next" },
            }));
    }),
    (e.prototype.lazyLoad = function () {
      function e(e) {
        i("img[data-lazy]", e).each(function () {
          var e = i(this),
            t = i(this).attr("data-lazy"),
            o = i(this).attr("data-srcset"),
            s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
            r = document.createElement("img");
          (r.onload = function () {
            e.animate({ opacity: 0 }, 100, function () {
              o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                  e.removeAttr("data-lazy data-srcset data-sizes").removeClass(
                    "slick-loading"
                  );
                }),
                n.$slider.trigger("lazyLoaded", [n, e, t]);
            });
          }),
            (r.onerror = function () {
              e
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                n.$slider.trigger("lazyLoadError", [n, e, t]);
            }),
            (r.src = t);
        });
      }
      var t,
        o,
        s,
        n = this;
      if (
        (!0 === n.options.centerMode
          ? !0 === n.options.infinite
            ? (s =
                (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) +
                n.options.slidesToShow +
                2)
            : ((o = Math.max(
                0,
                n.currentSlide - (n.options.slidesToShow / 2 + 1)
              )),
              (s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
          : ((o = n.options.infinite
              ? n.options.slidesToShow + n.currentSlide
              : n.currentSlide),
            (s = Math.ceil(o + n.options.slidesToShow)),
            !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)),
        (t = n.$slider.find(".slick-slide").slice(o, s)),
        "anticipated" === n.options.lazyLoad)
      )
        for (
          var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0;
          a < n.options.slidesToScroll;
          a++
        )
          r < 0 && (r = n.slideCount - 1),
            (t = (t = t.add(d.eq(r))).add(d.eq(l))),
            r--,
            l++;
      e(t),
        n.slideCount <= n.options.slidesToShow
          ? e(n.$slider.find(".slick-slide"))
          : n.currentSlide >= n.slideCount - n.options.slidesToShow
          ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow))
          : 0 === n.currentSlide &&
            e(
              n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow)
            );
    }),
    (e.prototype.loadSlider = function () {
      var i = this;
      i.setPosition(),
        i.$slideTrack.css({ opacity: 1 }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
    }),
    (e.prototype.next = e.prototype.slickNext =
      function () {
        this.changeSlide({ data: { message: "next" } });
      }),
    (e.prototype.orientationChange = function () {
      this.checkResponsive(), this.setPosition();
    }),
    (e.prototype.pause = e.prototype.slickPause =
      function () {
        this.autoPlayClear(), (this.paused = !0);
      }),
    (e.prototype.play = e.prototype.slickPlay =
      function () {
        var i = this;
        i.autoPlay(),
          (i.options.autoplay = !0),
          (i.paused = !1),
          (i.focussed = !1),
          (i.interrupted = !1);
      }),
    (e.prototype.postSlide = function (e) {
      var t = this;
      t.unslicked ||
        (t.$slider.trigger("afterChange", [t, e]),
        (t.animating = !1),
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        (t.swipeLeft = null),
        t.options.autoplay && t.autoPlay(),
        !0 === t.options.accessibility &&
          (t.initADA(),
          t.options.focusOnChange &&
            i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
    }),
    (e.prototype.prev = e.prototype.slickPrev =
      function () {
        this.changeSlide({ data: { message: "previous" } });
      }),
    (e.prototype.preventDefault = function (i) {
      i.preventDefault();
    }),
    (e.prototype.progressiveLazyLoad = function (e) {
      e = e || 1;
      var t,
        o,
        s,
        n,
        r,
        l = this,
        d = i("img[data-lazy]", l.$slider);
      d.length
        ? ((t = d.first()),
          (o = t.attr("data-lazy")),
          (s = t.attr("data-srcset")),
          (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
          ((r = document.createElement("img")).onload = function () {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)),
              t
                .attr("src", o)
                .removeAttr("data-lazy data-srcset data-sizes")
                .removeClass("slick-loading"),
              !0 === l.options.adaptiveHeight && l.setPosition(),
              l.$slider.trigger("lazyLoaded", [l, t, o]),
              l.progressiveLazyLoad();
          }),
          (r.onerror = function () {
            e < 3
              ? setTimeout(function () {
                  l.progressiveLazyLoad(e + 1);
                }, 500)
              : (t
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                l.$slider.trigger("lazyLoadError", [l, t, o]),
                l.progressiveLazyLoad());
          }),
          (r.src = o))
        : l.$slider.trigger("allImagesLoaded", [l]);
    }),
    (e.prototype.refresh = function (e) {
      var t,
        o,
        s = this;
      (o = s.slideCount - s.options.slidesToShow),
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        (t = s.currentSlide),
        s.destroy(!0),
        i.extend(s, s.initials, { currentSlide: t }),
        s.init(),
        e || s.changeSlide({ data: { message: "index", index: t } }, !1);
    }),
    (e.prototype.registerBreakpoints = function () {
      var e,
        t,
        o,
        s = this,
        n = s.options.responsive || null;
      if ("array" === i.type(n) && n.length) {
        for (e in ((s.respondTo = s.options.respondTo || "window"), n))
          if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
            for (t = n[e].breakpoint; o >= 0; )
              s.breakpoints[o] &&
                s.breakpoints[o] === t &&
                s.breakpoints.splice(o, 1),
                o--;
            s.breakpoints.push(t), (s.breakpointSettings[t] = n[e].settings);
          }
        s.breakpoints.sort(function (i, e) {
          return s.options.mobileFirst ? i - e : e - i;
        });
      }
    }),
    (e.prototype.reinit = function () {
      var e = this;
      (e.$slides = e.$slideTrack
        .children(e.options.slide)
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.currentSlide >= e.slideCount &&
          0 !== e.currentSlide &&
          (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        e.setPosition(),
        e.focusHandler(),
        (e.paused = !e.options.autoplay),
        e.autoPlay(),
        e.$slider.trigger("reInit", [e]);
    }),
    (e.prototype.resize = function () {
      var e = this;
      i(window).width() !== e.windowWidth &&
        (clearTimeout(e.windowDelay),
        (e.windowDelay = window.setTimeout(function () {
          (e.windowWidth = i(window).width()),
            e.checkResponsive(),
            e.unslicked || e.setPosition();
        }, 50)));
    }),
    (e.prototype.removeSlide = e.prototype.slickRemove =
      function (i, e, t) {
        var o = this;
        if (
          ((i =
            "boolean" == typeof i
              ? !0 === (e = i)
                ? 0
                : o.slideCount - 1
              : !0 === e
              ? --i
              : i),
          o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
        )
          return !1;
        o.unload(),
          !0 === t
            ? o.$slideTrack.children().remove()
            : o.$slideTrack.children(this.options.slide).eq(i).remove(),
          (o.$slides = o.$slideTrack.children(this.options.slide)),
          o.$slideTrack.children(this.options.slide).detach(),
          o.$slideTrack.append(o.$slides),
          (o.$slidesCache = o.$slides),
          o.reinit();
      }),
    (e.prototype.setCSS = function (i) {
      var e,
        t,
        o = this,
        s = {};
      !0 === o.options.rtl && (i = -i),
        (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (s[o.positionProp] = i),
        !1 === o.transformsEnabled
          ? o.$slideTrack.css(s)
          : ((s = {}),
            !1 === o.cssTransitions
              ? ((s[o.animType] = "translate(" + e + ", " + t + ")"),
                o.$slideTrack.css(s))
              : ((s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"),
                o.$slideTrack.css(s)));
    }),
    (e.prototype.setDimensions = function () {
      var i = this;
      !1 === i.options.vertical
        ? !0 === i.options.centerMode &&
          i.$list.css({ padding: "0px " + i.options.centerPadding })
        : (i.$list.height(
            i.$slides.first().outerHeight(!0) * i.options.slidesToShow
          ),
          !0 === i.options.centerMode &&
            i.$list.css({ padding: i.options.centerPadding + " 0px" })),
        (i.listWidth = i.$list.width()),
        (i.listHeight = i.$list.height()),
        !1 === i.options.vertical && !1 === i.options.variableWidth
          ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)),
            i.$slideTrack.width(
              Math.ceil(
                i.slideWidth * i.$slideTrack.children(".slick-slide").length
              )
            ))
          : !0 === i.options.variableWidth
          ? i.$slideTrack.width(5e3 * i.slideCount)
          : ((i.slideWidth = Math.ceil(i.listWidth)),
            i.$slideTrack.height(
              Math.ceil(
                i.$slides.first().outerHeight(!0) *
                  i.$slideTrack.children(".slick-slide").length
              )
            ));
      var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
      !1 === i.options.variableWidth &&
        i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
    }),
    (e.prototype.setFade = function () {
      var e,
        t = this;
      t.$slides.each(function (o, s) {
        (e = t.slideWidth * o * -1),
          !0 === t.options.rtl
            ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              })
            : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              });
      }),
        t.$slides
          .eq(t.currentSlide)
          .css({ zIndex: t.options.zIndex - 1, opacity: 1 });
    }),
    (e.prototype.setHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.css("height", e);
      }
    }),
    (e.prototype.setOption = e.prototype.slickSetOption =
      function () {
        var e,
          t,
          o,
          s,
          n,
          r = this,
          l = !1;
        if (
          ("object" === i.type(arguments[0])
            ? ((o = arguments[0]), (l = arguments[1]), (n = "multiple"))
            : "string" === i.type(arguments[0]) &&
              ((o = arguments[0]),
              (s = arguments[1]),
              (l = arguments[2]),
              "responsive" === arguments[0] && "array" === i.type(arguments[1])
                ? (n = "responsive")
                : void 0 !== arguments[1] && (n = "single")),
          "single" === n)
        )
          r.options[o] = s;
        else if ("multiple" === n)
          i.each(o, function (i, e) {
            r.options[i] = e;
          });
        else if ("responsive" === n)
          for (t in s)
            if ("array" !== i.type(r.options.responsive))
              r.options.responsive = [s[t]];
            else {
              for (e = r.options.responsive.length - 1; e >= 0; )
                r.options.responsive[e].breakpoint === s[t].breakpoint &&
                  r.options.responsive.splice(e, 1),
                  e--;
              r.options.responsive.push(s[t]);
            }
        l && (r.unload(), r.reinit());
      }),
    (e.prototype.setPosition = function () {
      var i = this;
      i.setDimensions(),
        i.setHeight(),
        !1 === i.options.fade
          ? i.setCSS(i.getLeft(i.currentSlide))
          : i.setFade(),
        i.$slider.trigger("setPosition", [i]);
    }),
    (e.prototype.setProps = function () {
      var i = this,
        e = document.body.style;
      (i.positionProp = !0 === i.options.vertical ? "top" : "left"),
        "top" === i.positionProp
          ? i.$slider.addClass("slick-vertical")
          : i.$slider.removeClass("slick-vertical"),
        (void 0 === e.WebkitTransition &&
          void 0 === e.MozTransition &&
          void 0 === e.msTransition) ||
          (!0 === i.options.useCSS && (i.cssTransitions = !0)),
        i.options.fade &&
          ("number" == typeof i.options.zIndex
            ? i.options.zIndex < 3 && (i.options.zIndex = 3)
            : (i.options.zIndex = i.defaults.zIndex)),
        void 0 !== e.OTransform &&
          ((i.animType = "OTransform"),
          (i.transformType = "-o-transform"),
          (i.transitionType = "OTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.MozTransform &&
          ((i.animType = "MozTransform"),
          (i.transformType = "-moz-transform"),
          (i.transitionType = "MozTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.MozPerspective &&
            (i.animType = !1)),
        void 0 !== e.webkitTransform &&
          ((i.animType = "webkitTransform"),
          (i.transformType = "-webkit-transform"),
          (i.transitionType = "webkitTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.msTransform &&
          ((i.animType = "msTransform"),
          (i.transformType = "-ms-transform"),
          (i.transitionType = "msTransition"),
          void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform &&
          !1 !== i.animType &&
          ((i.animType = "transform"),
          (i.transformType = "transform"),
          (i.transitionType = "transition")),
        (i.transformsEnabled =
          i.options.useTransform && null !== i.animType && !1 !== i.animType);
    }),
    (e.prototype.setSlideClasses = function (i) {
      var e,
        t,
        o,
        s,
        n = this;
      if (
        ((t = n.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")),
        n.$slides.eq(i).addClass("slick-current"),
        !0 === n.options.centerMode)
      ) {
        var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
        (e = Math.floor(n.options.slidesToShow / 2)),
          !0 === n.options.infinite &&
            (i >= e && i <= n.slideCount - 1 - e
              ? n.$slides
                  .slice(i - e + r, i + e + 1)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : ((o = n.options.slidesToShow + i),
                t
                  .slice(o - e + 1 + r, o + e + 2)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
            0 === i
              ? t
                  .eq(t.length - 1 - n.options.slidesToShow)
                  .addClass("slick-center")
              : i === n.slideCount - 1 &&
                t.eq(n.options.slidesToShow).addClass("slick-center")),
          n.$slides.eq(i).addClass("slick-center");
      } else
        i >= 0 && i <= n.slideCount - n.options.slidesToShow
          ? n.$slides
              .slice(i, i + n.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : t.length <= n.options.slidesToShow
          ? t.addClass("slick-active").attr("aria-hidden", "false")
          : ((s = n.slideCount % n.options.slidesToShow),
            (o = !0 === n.options.infinite ? n.options.slidesToShow + i : i),
            n.options.slidesToShow == n.options.slidesToScroll &&
            n.slideCount - i < n.options.slidesToShow
              ? t
                  .slice(o - (n.options.slidesToShow - s), o + s)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : t
                  .slice(o, o + n.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false"));
      ("ondemand" !== n.options.lazyLoad &&
        "anticipated" !== n.options.lazyLoad) ||
        n.lazyLoad();
    }),
    (e.prototype.setupInfinite = function () {
      var e,
        t,
        o,
        s = this;
      if (
        (!0 === s.options.fade && (s.options.centerMode = !1),
        !0 === s.options.infinite &&
          !1 === s.options.fade &&
          ((t = null), s.slideCount > s.options.slidesToShow))
      ) {
        for (
          o =
            !0 === s.options.centerMode
              ? s.options.slidesToShow + 1
              : s.options.slidesToShow,
            e = s.slideCount;
          e > s.slideCount - o;
          e -= 1
        )
          (t = e - 1),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t - s.slideCount)
              .prependTo(s.$slideTrack)
              .addClass("slick-cloned");
        for (e = 0; e < o + s.slideCount; e += 1)
          (t = e),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t + s.slideCount)
              .appendTo(s.$slideTrack)
              .addClass("slick-cloned");
        s.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            i(this).attr("id", "");
          });
      }
    }),
    (e.prototype.interrupt = function (i) {
      i || this.autoPlay(), (this.interrupted = i);
    }),
    (e.prototype.selectHandler = function (e) {
      var t = this,
        o = i(e.target).is(".slick-slide")
          ? i(e.target)
          : i(e.target).parents(".slick-slide"),
        s = parseInt(o.attr("data-slick-index"));
      s || (s = 0),
        t.slideCount <= t.options.slidesToShow
          ? t.slideHandler(s, !1, !0)
          : t.slideHandler(s);
    }),
    (e.prototype.slideHandler = function (i, e, t) {
      var o,
        s,
        n,
        r,
        l,
        d = null,
        a = this;
      if (
        ((e = e || !1),
        !(
          (!0 === a.animating && !0 === a.options.waitForAnimate) ||
          (!0 === a.options.fade && a.currentSlide === i)
        ))
      )
        if (
          (!1 === e && a.asNavFor(i),
          (o = i),
          (d = a.getLeft(o)),
          (r = a.getLeft(a.currentSlide)),
          (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
          !1 === a.options.infinite &&
            !1 === a.options.centerMode &&
            (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o);
                })
              : a.postSlide(o));
        else if (
          !1 === a.options.infinite &&
          !0 === a.options.centerMode &&
          (i < 0 || i > a.slideCount - a.options.slidesToScroll)
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o);
                })
              : a.postSlide(o));
        else {
          if (
            (a.options.autoplay && clearInterval(a.autoPlayTimer),
            (s =
              o < 0
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                  : a.slideCount + o
                : o >= a.slideCount
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? 0
                  : o - a.slideCount
                : o),
            (a.animating = !0),
            a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
            (n = a.currentSlide),
            (a.currentSlide = s),
            a.setSlideClasses(a.currentSlide),
            a.options.asNavFor &&
              (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <=
                l.options.slidesToShow &&
              l.setSlideClasses(a.currentSlide),
            a.updateDots(),
            a.updateArrows(),
            !0 === a.options.fade)
          )
            return (
              !0 !== t
                ? (a.fadeSlideOut(n),
                  a.fadeSlide(s, function () {
                    a.postSlide(s);
                  }))
                : a.postSlide(s),
              void a.animateHeight()
            );
          !0 !== t
            ? a.animateSlide(d, function () {
                a.postSlide(s);
              })
            : a.postSlide(s);
        }
    }),
    (e.prototype.startLoad = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.hide(), i.$nextArrow.hide()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.hide(),
        i.$slider.addClass("slick-loading");
    }),
    (e.prototype.swipeDirection = function () {
      var i,
        e,
        t,
        o,
        s = this;
      return (
        (i = s.touchObject.startX - s.touchObject.curX),
        (e = s.touchObject.startY - s.touchObject.curY),
        (t = Math.atan2(e, i)),
        (o = Math.round((180 * t) / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
        (o <= 45 && o >= 0) || (o <= 360 && o >= 315)
          ? !1 === s.options.rtl
            ? "left"
            : "right"
          : o >= 135 && o <= 225
          ? !1 === s.options.rtl
            ? "right"
            : "left"
          : !0 === s.options.verticalSwiping
          ? o >= 35 && o <= 135
            ? "down"
            : "up"
          : "vertical"
      );
    }),
    (e.prototype.swipeEnd = function (i) {
      var e,
        t,
        o = this;
      if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
        return (o.scrolling = !1), !1;
      if (
        ((o.interrupted = !1),
        (o.shouldClick = !(o.touchObject.swipeLength > 10)),
        void 0 === o.touchObject.curX)
      )
        return !1;
      if (
        (!0 === o.touchObject.edgeHit &&
          o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe)
      ) {
        switch ((t = o.swipeDirection())) {
          case "left":
          case "down":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide + o.getSlideCount())
              : o.currentSlide + o.getSlideCount()),
              (o.currentDirection = 0);
            break;
          case "right":
          case "up":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide - o.getSlideCount())
              : o.currentSlide - o.getSlideCount()),
              (o.currentDirection = 1);
        }
        "vertical" != t &&
          (o.slideHandler(e),
          (o.touchObject = {}),
          o.$slider.trigger("swipe", [o, t]));
      } else
        o.touchObject.startX !== o.touchObject.curX &&
          (o.slideHandler(o.currentSlide), (o.touchObject = {}));
    }),
    (e.prototype.swipeHandler = function (i) {
      var e = this;
      if (
        !(
          !1 === e.options.swipe ||
          ("ontouchend" in document && !1 === e.options.swipe) ||
          (!1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))
        )
      )
        switch (
          ((e.touchObject.fingerCount =
            i.originalEvent && void 0 !== i.originalEvent.touches
              ? i.originalEvent.touches.length
              : 1),
          (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
          !0 === e.options.verticalSwiping &&
            (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
          i.data.action)
        ) {
          case "start":
            e.swipeStart(i);
            break;
          case "move":
            e.swipeMove(i);
            break;
          case "end":
            e.swipeEnd(i);
        }
    }),
    (e.prototype.swipeMove = function (i) {
      var e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      return (
        (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
        !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
          ((e = l.getLeft(l.currentSlide)),
          (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
          (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
          (l.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))
          )),
          (r = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))
          )),
          !l.options.verticalSwiping && !l.swiping && r > 4
            ? ((l.scrolling = !0), !1)
            : (!0 === l.options.verticalSwiping &&
                (l.touchObject.swipeLength = r),
              (t = l.swipeDirection()),
              void 0 !== i.originalEvent &&
                l.touchObject.swipeLength > 4 &&
                ((l.swiping = !0), i.preventDefault()),
              (s =
                (!1 === l.options.rtl ? 1 : -1) *
                (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
              !0 === l.options.verticalSwiping &&
                (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
              (o = l.touchObject.swipeLength),
              (l.touchObject.edgeHit = !1),
              !1 === l.options.infinite &&
                ((0 === l.currentSlide && "right" === t) ||
                  (l.currentSlide >= l.getDotCount() && "left" === t)) &&
                ((o = l.touchObject.swipeLength * l.options.edgeFriction),
                (l.touchObject.edgeHit = !0)),
              !1 === l.options.vertical
                ? (l.swipeLeft = e + o * s)
                : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
              !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
              !0 !== l.options.fade &&
                !1 !== l.options.touchMove &&
                (!0 === l.animating
                  ? ((l.swipeLeft = null), !1)
                  : void l.setCSS(l.swipeLeft))))
      );
    }),
    (e.prototype.swipeStart = function (i) {
      var e,
        t = this;
      if (
        ((t.interrupted = !0),
        1 !== t.touchObject.fingerCount ||
          t.slideCount <= t.options.slidesToShow)
      )
        return (t.touchObject = {}), !1;
      void 0 !== i.originalEvent &&
        void 0 !== i.originalEvent.touches &&
        (e = i.originalEvent.touches[0]),
        (t.touchObject.startX = t.touchObject.curX =
          void 0 !== e ? e.pageX : i.clientX),
        (t.touchObject.startY = t.touchObject.curY =
          void 0 !== e ? e.pageY : i.clientY),
        (t.dragging = !0);
    }),
    (e.prototype.unfilterSlides = e.prototype.slickUnfilter =
      function () {
        var i = this;
        null !== i.$slidesCache &&
          (i.unload(),
          i.$slideTrack.children(this.options.slide).detach(),
          i.$slidesCache.appendTo(i.$slideTrack),
          i.reinit());
      }),
    (e.prototype.unload = function () {
      var e = this;
      i(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow &&
          e.htmlExpr.test(e.options.prevArrow) &&
          e.$prevArrow.remove(),
        e.$nextArrow &&
          e.htmlExpr.test(e.options.nextArrow) &&
          e.$nextArrow.remove(),
        e.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (e.prototype.unslick = function (i) {
      var e = this;
      e.$slider.trigger("unslick", [e, i]), e.destroy();
    }),
    (e.prototype.updateArrows = function () {
      var i = this;
      Math.floor(i.options.slidesToShow / 2),
        !0 === i.options.arrows &&
          i.slideCount > i.options.slidesToShow &&
          !i.options.infinite &&
          (i.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          i.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === i.currentSlide
            ? (i.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : ((i.currentSlide >= i.slideCount - i.options.slidesToShow &&
                !1 === i.options.centerMode) ||
                (i.currentSlide >= i.slideCount - 1 &&
                  !0 === i.options.centerMode)) &&
              (i.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false")));
    }),
    (e.prototype.updateDots = function () {
      var i = this;
      null !== i.$dots &&
        (i.$dots.find("li").removeClass("slick-active").end(),
        i.$dots
          .find("li")
          .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
          .addClass("slick-active"));
    }),
    (e.prototype.visibility = function () {
      var i = this;
      i.options.autoplay &&
        (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1));
    }),
    (i.fn.slick = function () {
      var i,
        t,
        o = this,
        s = arguments[0],
        n = Array.prototype.slice.call(arguments, 1),
        r = o.length;
      for (i = 0; i < r; i++)
        if (
          ("object" == typeof s || void 0 === s
            ? (o[i].slick = new e(o[i], s))
            : (t = o[i].slick[s].apply(o[i].slick, n)),
          void 0 !== t)
        )
          return t;
      return o;
    });
});
/*!
 * sweetalert2 v11.1.2
 * Released under the MIT License.
 */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = e || self).Sweetalert2 = t());
})(this, function () {
  "use strict";
  const e = Object.freeze({
      cancel: "cancel",
      backdrop: "backdrop",
      close: "close",
      esc: "esc",
      timer: "timer",
    }),
    t = "SweetAlert2:",
    o = (e) => e.charAt(0).toUpperCase() + e.slice(1),
    s = (e) => Array.prototype.slice.call(e),
    n = (e) => {
      console.warn(
        "".concat(t, " ").concat("object" == typeof e ? e.join(" ") : e)
      );
    },
    a = (e) => {
      console.error("".concat(t, " ").concat(e));
    },
    i = [],
    r = (e, t) => {
      var o;
      (o = '"'
        .concat(
          e,
          '" is deprecated and will be removed in the next major release. Please use "'
        )
        .concat(t, '" instead.')),
        i.includes(o) || (i.push(o), n(o));
    },
    l = (e) => ("function" == typeof e ? e() : e),
    c = (e) => e && "function" == typeof e.toPromise,
    d = (e) => (c(e) ? e.toPromise() : Promise.resolve(e)),
    u = (e) => e && Promise.resolve(e) === e,
    p = (e) =>
      e instanceof Element || ((e) => "object" == typeof e && e.jquery)(e),
    m = (e) => {
      const t = {};
      for (const o in e) t[e[o]] = "swal2-" + e[o];
      return t;
    },
    w = m([
      "container",
      "shown",
      "height-auto",
      "iosfix",
      "popup",
      "modal",
      "no-backdrop",
      "no-transition",
      "toast",
      "toast-shown",
      "show",
      "hide",
      "close",
      "title",
      "html-container",
      "actions",
      "confirm",
      "deny",
      "cancel",
      "default-outline",
      "footer",
      "icon",
      "icon-content",
      "image",
      "input",
      "file",
      "range",
      "select",
      "radio",
      "checkbox",
      "label",
      "textarea",
      "inputerror",
      "input-label",
      "validation-message",
      "progress-steps",
      "active-progress-step",
      "progress-step",
      "progress-step-line",
      "loader",
      "loading",
      "styled",
      "top",
      "top-start",
      "top-end",
      "top-left",
      "top-right",
      "center",
      "center-start",
      "center-end",
      "center-left",
      "center-right",
      "bottom",
      "bottom-start",
      "bottom-end",
      "bottom-left",
      "bottom-right",
      "grow-row",
      "grow-column",
      "grow-fullscreen",
      "rtl",
      "timer-progress-bar",
      "timer-progress-bar-container",
      "scrollbar-measure",
      "icon-success",
      "icon-warning",
      "icon-info",
      "icon-question",
      "icon-error",
    ]),
    g = m(["success", "warning", "info", "question", "error"]),
    h = () => document.body.querySelector(".".concat(w.container)),
    f = (e) => {
      const t = h();
      return t ? t.querySelector(e) : null;
    },
    b = (e) => f(".".concat(e)),
    y = () => b(w.popup),
    v = () => b(w.icon),
    k = () => b(w.title),
    x = () => b(w["html-container"]),
    C = () => b(w.image),
    A = () => b(w["progress-steps"]),
    B = () => b(w["validation-message"]),
    P = () => f(".".concat(w.actions, " .").concat(w.confirm)),
    E = () => f(".".concat(w.actions, " .").concat(w.deny)),
    S = () => f(".".concat(w.loader)),
    T = () => f(".".concat(w.actions, " .").concat(w.cancel)),
    L = () => b(w.actions),
    O = () => b(w.footer),
    j = () => b(w["timer-progress-bar"]),
    z = () => b(w.close),
    M = () => {
      const e = s(
          y().querySelectorAll(
            '[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'
          )
        ).sort((e, t) =>
          (e = parseInt(e.getAttribute("tabindex"))) >
          (t = parseInt(t.getAttribute("tabindex")))
            ? 1
            : e < t
            ? -1
            : 0
        ),
        t = s(
          y().querySelectorAll(
            '\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n'
          )
        ).filter((e) => "-1" !== e.getAttribute("tabindex"));
      return ((e) => {
        const t = [];
        for (let o = 0; o < e.length; o++)
          -1 === t.indexOf(e[o]) && t.push(e[o]);
        return t;
      })(e.concat(t)).filter((e) => G(e));
    },
    D = () => !I() && !document.body.classList.contains(w["no-backdrop"]),
    I = () => document.body.classList.contains(w["toast-shown"]),
    H = { previousBodyPadding: null },
    q = (e, t) => {
      if (((e.textContent = ""), t)) {
        const o = new DOMParser().parseFromString(t, "text/html");
        s(o.querySelector("head").childNodes).forEach((t) => {
          e.appendChild(t);
        }),
          s(o.querySelector("body").childNodes).forEach((t) => {
            e.appendChild(t);
          });
      }
    },
    V = (e, t) => {
      if (!t) return !1;
      const o = t.split(/\s+/);
      for (let t = 0; t < o.length; t++)
        if (!e.classList.contains(o[t])) return !1;
      return !0;
    },
    N = (e, t, o) => {
      if (
        (((e, t) => {
          s(e.classList).forEach((o) => {
            Object.values(w).includes(o) ||
              Object.values(g).includes(o) ||
              Object.values(t.showClass).includes(o) ||
              e.classList.remove(o);
          });
        })(e, t),
        t.customClass && t.customClass[o])
      ) {
        if ("string" != typeof t.customClass[o] && !t.customClass[o].forEach)
          return n(
            "Invalid type of customClass."
              .concat(o, '! Expected string or iterable object, got "')
              .concat(typeof t.customClass[o], '"')
          );
        Y(e, t.customClass[o]);
      }
    },
    U = (e, t) => {
      if (!t) return null;
      switch (t) {
        case "select":
        case "textarea":
        case "file":
          return $(e, w[t]);
        case "checkbox":
          return e.querySelector(".".concat(w.checkbox, " input"));
        case "radio":
          return (
            e.querySelector(".".concat(w.radio, " input:checked")) ||
            e.querySelector(".".concat(w.radio, " input:first-child"))
          );
        case "range":
          return e.querySelector(".".concat(w.range, " input"));
        default:
          return $(e, w.input);
      }
    },
    F = (e) => {
      if ((e.focus(), "file" !== e.type)) {
        const t = e.value;
        (e.value = ""), (e.value = t);
      }
    },
    R = (e, t, o) => {
      e &&
        t &&
        ("string" == typeof t && (t = t.split(/\s+/).filter(Boolean)),
        t.forEach((t) => {
          e.forEach
            ? e.forEach((e) => {
                o ? e.classList.add(t) : e.classList.remove(t);
              })
            : o
            ? e.classList.add(t)
            : e.classList.remove(t);
        }));
    },
    Y = (e, t) => {
      R(e, t, !0);
    },
    Z = (e, t) => {
      R(e, t, !1);
    },
    $ = (e, t) => {
      for (let o = 0; o < e.childNodes.length; o++)
        if (V(e.childNodes[o], t)) return e.childNodes[o];
    },
    W = (e, t, o) => {
      o === "".concat(parseInt(o)) && (o = parseInt(o)),
        o || 0 === parseInt(o)
          ? (e.style[t] = "number" == typeof o ? "".concat(o, "px") : o)
          : e.style.removeProperty(t);
    },
    _ = (e, t = "flex") => {
      e.style.display = t;
    },
    K = (e) => {
      e.style.display = "none";
    },
    X = (e, t, o, s) => {
      const n = e.querySelector(t);
      n && (n.style[o] = s);
    },
    J = (e, t, o) => {
      t ? _(e, o) : K(e);
    },
    G = (e) =>
      !(!e || !(e.offsetWidth || e.offsetHeight || e.getClientRects().length)),
    Q = (e) => !!(e.scrollHeight > e.clientHeight),
    ee = (e) => {
      const t = window.getComputedStyle(e),
        o = parseFloat(t.getPropertyValue("animation-duration") || "0"),
        s = parseFloat(t.getPropertyValue("transition-duration") || "0");
      return o > 0 || s > 0;
    },
    te = (e, t = !1) => {
      const o = j();
      G(o) &&
        (t && ((o.style.transition = "none"), (o.style.width = "100%")),
        setTimeout(() => {
          (o.style.transition = "width ".concat(e / 1e3, "s linear")),
            (o.style.width = "0%");
        }, 10));
    },
    oe = () => "undefined" == typeof window || "undefined" == typeof document,
    se = '\n <div aria-labelledby="'
      .concat(w.title, '" aria-describedby="')
      .concat(w["html-container"], '" class="')
      .concat(w.popup, '" tabindex="-1">\n   <button type="button" class="')
      .concat(w.close, '"></button>\n   <ul class="')
      .concat(w["progress-steps"], '"></ul>\n   <div class="')
      .concat(w.icon, '"></div>\n   <img class="')
      .concat(w.image, '" />\n   <h2 class="')
      .concat(w.title, '" id="')
      .concat(w.title, '"></h2>\n   <div class="')
      .concat(w["html-container"], '" id="')
      .concat(w["html-container"], '"></div>\n   <input class="')
      .concat(w.input, '" />\n   <input type="file" class="')
      .concat(w.file, '" />\n   <div class="')
      .concat(
        w.range,
        '">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="'
      )
      .concat(w.select, '"></select>\n   <div class="')
      .concat(w.radio, '"></div>\n   <label for="')
      .concat(w.checkbox, '" class="')
      .concat(
        w.checkbox,
        '">\n     <input type="checkbox" />\n     <span class="'
      )
      .concat(w.label, '"></span>\n   </label>\n   <textarea class="')
      .concat(w.textarea, '"></textarea>\n   <div class="')
      .concat(w["validation-message"], '" id="')
      .concat(w["validation-message"], '"></div>\n   <div class="')
      .concat(w.actions, '">\n     <div class="')
      .concat(w.loader, '"></div>\n     <button type="button" class="')
      .concat(w.confirm, '"></button>\n     <button type="button" class="')
      .concat(w.deny, '"></button>\n     <button type="button" class="')
      .concat(w.cancel, '"></button>\n   </div>\n   <div class="')
      .concat(w.footer, '"></div>\n   <div class="')
      .concat(w["timer-progress-bar-container"], '">\n     <div class="')
      .concat(w["timer-progress-bar"], '"></div>\n   </div>\n </div>\n')
      .replace(/(^|\n)\s*/g, ""),
    ne = () => {
      fo.isVisible() && fo.resetValidationMessage();
    },
    ae = (e) => {
      const t = (() => {
        const e = h();
        return (
          !!e &&
          (e.remove(),
          Z(
            [document.documentElement, document.body],
            [w["no-backdrop"], w["toast-shown"], w["has-column"]]
          ),
          !0)
        );
      })();
      if (oe()) return void a("SweetAlert2 requires document to initialize");
      const o = document.createElement("div");
      (o.className = w.container), t && Y(o, w["no-transition"]), q(o, se);
      const s =
        "string" == typeof (n = e.target) ? document.querySelector(n) : n;
      var n;
      s.appendChild(o),
        ((e) => {
          const t = y();
          t.setAttribute("role", e.toast ? "alert" : "dialog"),
            t.setAttribute("aria-live", e.toast ? "polite" : "assertive"),
            e.toast || t.setAttribute("aria-modal", "true");
        })(e),
        ((e) => {
          "rtl" === window.getComputedStyle(e).direction && Y(h(), w.rtl);
        })(s),
        (() => {
          const e = y(),
            t = $(e, w.input),
            o = $(e, w.file),
            s = e.querySelector(".".concat(w.range, " input")),
            n = e.querySelector(".".concat(w.range, " output")),
            a = $(e, w.select),
            i = e.querySelector(".".concat(w.checkbox, " input")),
            r = $(e, w.textarea);
          (t.oninput = ne),
            (o.onchange = ne),
            (a.onchange = ne),
            (i.onchange = ne),
            (r.oninput = ne),
            (s.oninput = () => {
              ne(), (n.value = s.value);
            }),
            (s.onchange = () => {
              ne(), (s.nextSibling.value = s.value);
            });
        })();
    },
    ie = (e, t) => {
      e instanceof HTMLElement
        ? t.appendChild(e)
        : "object" == typeof e
        ? re(e, t)
        : e && q(t, e);
    },
    re = (e, t) => {
      e.jquery ? le(t, e) : q(t, e.toString());
    },
    le = (e, t) => {
      if (((e.textContent = ""), 0 in t))
        for (let o = 0; o in t; o++) e.appendChild(t[o].cloneNode(!0));
      else e.appendChild(t.cloneNode(!0));
    },
    ce = (() => {
      if (oe()) return !1;
      const e = document.createElement("div"),
        t = {
          WebkitAnimation: "webkitAnimationEnd",
          OAnimation: "oAnimationEnd oanimationend",
          animation: "animationend",
        };
      for (const o in t)
        if (Object.prototype.hasOwnProperty.call(t, o) && void 0 !== e.style[o])
          return t[o];
      return !1;
    })(),
    de = (e, t) => {
      const o = L(),
        s = S(),
        n = P(),
        a = E(),
        i = T();
      t.showConfirmButton || t.showDenyButton || t.showCancelButton
        ? _(o)
        : K(o),
        N(o, t, "actions"),
        ue(n, "confirm", t),
        ue(a, "deny", t),
        ue(i, "cancel", t),
        (function (e, t, o, s) {
          if (!s.buttonsStyling) return Z([e, t, o], w.styled);
          Y([e, t, o], w.styled),
            s.confirmButtonColor &&
              ((e.style.backgroundColor = s.confirmButtonColor),
              Y(e, w["default-outline"]));
          s.denyButtonColor &&
            ((t.style.backgroundColor = s.denyButtonColor),
            Y(t, w["default-outline"]));
          s.cancelButtonColor &&
            ((o.style.backgroundColor = s.cancelButtonColor),
            Y(o, w["default-outline"]));
        })(n, a, i, t),
        t.reverseButtons &&
          (o.insertBefore(i, s), o.insertBefore(a, s), o.insertBefore(n, s)),
        q(s, t.loaderHtml),
        N(s, t, "loader");
    };
  function ue(e, t, s) {
    J(e, s["show".concat(o(t), "Button")], "inline-block"),
      q(e, s["".concat(t, "ButtonText")]),
      e.setAttribute("aria-label", s["".concat(t, "ButtonAriaLabel")]),
      (e.className = w[t]),
      N(e, s, "".concat(t, "Button")),
      Y(e, s["".concat(t, "ButtonClass")]);
  }
  const pe = (e, t) => {
    const o = h();
    o &&
      (!(function (e, t) {
        "string" == typeof t
          ? (e.style.background = t)
          : t || Y([document.documentElement, document.body], w["no-backdrop"]);
      })(o, t.backdrop),
      (function (e, t) {
        t in w
          ? Y(e, w[t])
          : (n('The "position" parameter is not valid, defaulting to "center"'),
            Y(e, w.center));
      })(o, t.position),
      (function (e, t) {
        if (t && "string" == typeof t) {
          const o = "grow-".concat(t);
          o in w && Y(e, w[o]);
        }
      })(o, t.grow),
      N(o, t, "container"));
  };
  var me = {
    promise: new WeakMap(),
    innerParams: new WeakMap(),
    domCache: new WeakMap(),
  };
  const we = [
      "input",
      "file",
      "range",
      "select",
      "radio",
      "checkbox",
      "textarea",
    ],
    ge = (e) => {
      if (!ke[e.input])
        return a(
          'Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(
            e.input,
            '"'
          )
        );
      const t = ve(e.input),
        o = ke[e.input](t, e);
      _(o),
        setTimeout(() => {
          F(o);
        });
    },
    he = (e, t) => {
      const o = U(y(), e);
      if (o) {
        ((e) => {
          for (let t = 0; t < e.attributes.length; t++) {
            const o = e.attributes[t].name;
            ["type", "value", "style"].includes(o) || e.removeAttribute(o);
          }
        })(o);
        for (const e in t) o.setAttribute(e, t[e]);
      }
    },
    fe = (e) => {
      const t = ve(e.input);
      e.customClass && Y(t, e.customClass.input);
    },
    be = (e, t) => {
      (e.placeholder && !t.inputPlaceholder) ||
        (e.placeholder = t.inputPlaceholder);
    },
    ye = (e, t, o) => {
      if (o.inputLabel) {
        e.id = w.input;
        const s = document.createElement("label"),
          n = w["input-label"];
        s.setAttribute("for", e.id),
          (s.className = n),
          Y(s, o.customClass.inputLabel),
          (s.innerText = o.inputLabel),
          t.insertAdjacentElement("beforebegin", s);
      }
    },
    ve = (e) => {
      const t = w[e] ? w[e] : w.input;
      return $(y(), t);
    },
    ke = {};
  (ke.text =
    ke.email =
    ke.password =
    ke.number =
    ke.tel =
    ke.url =
      (e, t) => (
        "string" == typeof t.inputValue || "number" == typeof t.inputValue
          ? (e.value = t.inputValue)
          : u(t.inputValue) ||
            n(
              'Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(
                typeof t.inputValue,
                '"'
              )
            ),
        ye(e, e, t),
        be(e, t),
        (e.type = t.input),
        e
      )),
    (ke.file = (e, t) => (ye(e, e, t), be(e, t), e)),
    (ke.range = (e, t) => {
      const o = e.querySelector("input"),
        s = e.querySelector("output");
      return (
        (o.value = t.inputValue),
        (o.type = t.input),
        (s.value = t.inputValue),
        ye(o, e, t),
        e
      );
    }),
    (ke.select = (e, t) => {
      if (((e.textContent = ""), t.inputPlaceholder)) {
        const o = document.createElement("option");
        q(o, t.inputPlaceholder),
          (o.value = ""),
          (o.disabled = !0),
          (o.selected = !0),
          e.appendChild(o);
      }
      return ye(e, e, t), e;
    }),
    (ke.radio = (e) => ((e.textContent = ""), e)),
    (ke.checkbox = (e, t) => {
      const o = U(y(), "checkbox");
      (o.value = 1), (o.id = w.checkbox), (o.checked = Boolean(t.inputValue));
      const s = e.querySelector("span");
      return q(s, t.inputPlaceholder), e;
    }),
    (ke.textarea = (e, t) => {
      (e.value = t.inputValue), be(e, t), ye(e, e, t);
      return (
        setTimeout(() => {
          if ("MutationObserver" in window) {
            const t = parseInt(window.getComputedStyle(y()).width);
            new MutationObserver(() => {
              const o =
                e.offsetWidth +
                ((s = e),
                parseInt(window.getComputedStyle(s).marginLeft) +
                  parseInt(window.getComputedStyle(s).marginRight));
              var s;
              y().style.width = o > t ? "".concat(o, "px") : null;
            }).observe(e, { attributes: !0, attributeFilter: ["style"] });
          }
        }),
        e
      );
    });
  const xe = (e, t) => {
      const o = x();
      N(o, t, "htmlContainer"),
        t.html
          ? (ie(t.html, o), _(o, "block"))
          : t.text
          ? ((o.textContent = t.text), _(o, "block"))
          : K(o),
        ((e, t) => {
          const o = y(),
            s = me.innerParams.get(e),
            n = !s || t.input !== s.input;
          we.forEach((e) => {
            const s = w[e],
              a = $(o, s);
            he(e, t.inputAttributes), (a.className = s), n && K(a);
          }),
            t.input && (n && ge(t), fe(t));
        })(e, t);
    },
    Ce = (e, t) => {
      for (const o in g) t.icon !== o && Z(e, g[o]);
      Y(e, g[t.icon]), Pe(e, t), Ae(), N(e, t, "icon");
    },
    Ae = () => {
      const e = y(),
        t = window.getComputedStyle(e).getPropertyValue("background-color"),
        o = e.querySelectorAll(
          "[class^=swal2-success-circular-line], .swal2-success-fix"
        );
      for (let e = 0; e < o.length; e++) o[e].style.backgroundColor = t;
    },
    Be = (e, t) => {
      if (((e.textContent = ""), t.iconHtml)) q(e, Ee(t.iconHtml));
      else if ("success" === t.icon)
        q(
          e,
          '\n      <div class="swal2-success-circular-line-left"></div>\n      <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n      <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n      <div class="swal2-success-circular-line-right"></div>\n    '
        );
      else if ("error" === t.icon)
        q(
          e,
          '\n      <span class="swal2-x-mark">\n        <span class="swal2-x-mark-line-left"></span>\n        <span class="swal2-x-mark-line-right"></span>\n      </span>\n    '
        );
      else {
        q(e, Ee({ question: "?", warning: "!", info: "i" }[t.icon]));
      }
    },
    Pe = (e, t) => {
      if (t.iconColor) {
        (e.style.color = t.iconColor), (e.style.borderColor = t.iconColor);
        for (const o of [
          ".swal2-success-line-tip",
          ".swal2-success-line-long",
          ".swal2-x-mark-line-left",
          ".swal2-x-mark-line-right",
        ])
          X(e, o, "backgroundColor", t.iconColor);
        X(e, ".swal2-success-ring", "borderColor", t.iconColor);
      }
    },
    Ee = (e) =>
      '<div class="'.concat(w["icon-content"], '">').concat(e, "</div>"),
    Se = (e, t) => {
      const o = A();
      if (!t.progressSteps || 0 === t.progressSteps.length) return K(o);
      _(o),
        (o.textContent = ""),
        t.currentProgressStep >= t.progressSteps.length &&
          n(
            "Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"
          ),
        t.progressSteps.forEach((e, s) => {
          const n = ((e) => {
            const t = document.createElement("li");
            return Y(t, w["progress-step"]), q(t, e), t;
          })(e);
          if (
            (o.appendChild(n),
            s === t.currentProgressStep && Y(n, w["active-progress-step"]),
            s !== t.progressSteps.length - 1)
          ) {
            const e = ((e) => {
              const t = document.createElement("li");
              return (
                Y(t, w["progress-step-line"]),
                e.progressStepsDistance &&
                  (t.style.width = e.progressStepsDistance),
                t
              );
            })(t);
            o.appendChild(e);
          }
        });
    },
    Te = (e, t) => {
      (e.className = ""
        .concat(w.popup, " ")
        .concat(G(e) ? t.showClass.popup : "")),
        t.toast
          ? (Y([document.documentElement, document.body], w["toast-shown"]),
            Y(e, w.toast))
          : Y(e, w.modal),
        N(e, t, "popup"),
        "string" == typeof t.customClass && Y(e, t.customClass),
        t.icon && Y(e, w["icon-".concat(t.icon)]);
    },
    Le = (e, t) => {
      ((e, t) => {
        const o = h(),
          s = y();
        t.toast
          ? (W(o, "width", t.width),
            (s.style.width = "100%"),
            s.insertBefore(S(), v()))
          : W(s, "width", t.width),
          W(s, "padding", t.padding),
          t.background && (s.style.background = t.background),
          K(B()),
          Te(s, t);
      })(0, t),
        pe(0, t),
        Se(0, t),
        ((e, t) => {
          const o = me.innerParams.get(e),
            s = v();
          o && t.icon === o.icon
            ? (Be(s, t), Ce(s, t))
            : t.icon || t.iconHtml
            ? t.icon && -1 === Object.keys(g).indexOf(t.icon)
              ? (a(
                  'Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(
                    t.icon,
                    '"'
                  )
                ),
                K(s))
              : (_(s), Be(s, t), Ce(s, t), Y(s, t.showClass.icon))
            : K(s);
        })(e, t),
        ((e, t) => {
          const o = C();
          if (!t.imageUrl) return K(o);
          _(o, ""),
            o.setAttribute("src", t.imageUrl),
            o.setAttribute("alt", t.imageAlt),
            W(o, "width", t.imageWidth),
            W(o, "height", t.imageHeight),
            (o.className = w.image),
            N(o, t, "image");
        })(0, t),
        ((e, t) => {
          const o = k();
          J(o, t.title || t.titleText, "block"),
            t.title && ie(t.title, o),
            t.titleText && (o.innerText = t.titleText),
            N(o, t, "title");
        })(0, t),
        ((e, t) => {
          const o = z();
          q(o, t.closeButtonHtml),
            N(o, t, "closeButton"),
            J(o, t.showCloseButton),
            o.setAttribute("aria-label", t.closeButtonAriaLabel);
        })(0, t),
        xe(e, t),
        de(0, t),
        ((e, t) => {
          const o = O();
          J(o, t.footer), t.footer && ie(t.footer, o), N(o, t, "footer");
        })(0, t),
        "function" == typeof t.didRender && t.didRender(y());
    },
    Oe = () => P() && P().click();
  const je = (e) => {
      let t = y();
      t || fo.fire(), (t = y());
      const o = S();
      I() ? K(v()) : ze(t, e),
        _(o),
        t.setAttribute("data-loading", !0),
        t.setAttribute("aria-busy", !0),
        t.focus();
    },
    ze = (e, t) => {
      const o = L(),
        s = S();
      !t && G(P()) && (t = P()),
        _(o),
        t && (K(t), s.setAttribute("data-button-to-replace", t.className)),
        s.parentNode.insertBefore(s, t),
        Y([e, o], w.loading);
    },
    Me = {},
    De = (e) =>
      new Promise((t) => {
        if (!e) return t();
        const o = window.scrollX,
          s = window.scrollY;
        (Me.restoreFocusTimeout = setTimeout(() => {
          Me.previousActiveElement && Me.previousActiveElement.focus
            ? (Me.previousActiveElement.focus(),
              (Me.previousActiveElement = null))
            : document.body && document.body.focus(),
            t();
        }, 100)),
          window.scrollTo(o, s);
      }),
    Ie = () => {
      if (Me.timeout)
        return (
          (() => {
            const e = j(),
              t = parseInt(window.getComputedStyle(e).width);
            e.style.removeProperty("transition"), (e.style.width = "100%");
            const o = parseInt(window.getComputedStyle(e).width),
              s = parseInt((t / o) * 100);
            e.style.removeProperty("transition"),
              (e.style.width = "".concat(s, "%"));
          })(),
          Me.timeout.stop()
        );
    },
    He = () => {
      if (Me.timeout) {
        const e = Me.timeout.start();
        return te(e), e;
      }
    };
  let qe = !1;
  const Ve = {};
  const Ne = (e) => {
      for (let t = e.target; t && t !== document; t = t.parentNode)
        for (const e in Ve) {
          const o = t.getAttribute(e);
          if (o) return void Ve[e].fire({ template: o });
        }
    },
    Ue = {
      title: "",
      titleText: "",
      text: "",
      html: "",
      footer: "",
      icon: void 0,
      iconColor: void 0,
      iconHtml: void 0,
      template: void 0,
      toast: !1,
      showClass: {
        popup: "swal2-show",
        backdrop: "swal2-backdrop-show",
        icon: "swal2-icon-show",
      },
      hideClass: {
        popup: "swal2-hide",
        backdrop: "swal2-backdrop-hide",
        icon: "swal2-icon-hide",
      },
      customClass: {},
      target: "body",
      backdrop: !0,
      heightAuto: !0,
      allowOutsideClick: !0,
      allowEscapeKey: !0,
      allowEnterKey: !0,
      stopKeydownPropagation: !0,
      keydownListenerCapture: !1,
      showConfirmButton: !0,
      showDenyButton: !1,
      showCancelButton: !1,
      preConfirm: void 0,
      preDeny: void 0,
      confirmButtonText: "OK",
      confirmButtonAriaLabel: "",
      confirmButtonColor: void 0,
      denyButtonText: "No",
      denyButtonAriaLabel: "",
      denyButtonColor: void 0,
      cancelButtonText: "Cancel",
      cancelButtonAriaLabel: "",
      cancelButtonColor: void 0,
      buttonsStyling: !0,
      reverseButtons: !1,
      focusConfirm: !0,
      focusDeny: !1,
      focusCancel: !1,
      returnFocus: !0,
      showCloseButton: !1,
      closeButtonHtml: "&times;",
      closeButtonAriaLabel: "Close this dialog",
      loaderHtml: "",
      showLoaderOnConfirm: !1,
      showLoaderOnDeny: !1,
      imageUrl: void 0,
      imageWidth: void 0,
      imageHeight: void 0,
      imageAlt: "",
      timer: void 0,
      timerProgressBar: !1,
      width: void 0,
      padding: void 0,
      background: void 0,
      input: void 0,
      inputPlaceholder: "",
      inputLabel: "",
      inputValue: "",
      inputOptions: {},
      inputAutoTrim: !0,
      inputAttributes: {},
      inputValidator: void 0,
      returnInputValueOnDeny: !1,
      validationMessage: void 0,
      grow: !1,
      position: "center",
      progressSteps: [],
      currentProgressStep: void 0,
      progressStepsDistance: void 0,
      willOpen: void 0,
      didOpen: void 0,
      didRender: void 0,
      willClose: void 0,
      didClose: void 0,
      didDestroy: void 0,
      scrollbarPadding: !0,
    },
    Fe = [
      "allowEscapeKey",
      "allowOutsideClick",
      "background",
      "buttonsStyling",
      "cancelButtonAriaLabel",
      "cancelButtonColor",
      "cancelButtonText",
      "closeButtonAriaLabel",
      "closeButtonHtml",
      "confirmButtonAriaLabel",
      "confirmButtonColor",
      "confirmButtonText",
      "currentProgressStep",
      "customClass",
      "denyButtonAriaLabel",
      "denyButtonColor",
      "denyButtonText",
      "didClose",
      "didDestroy",
      "footer",
      "hideClass",
      "html",
      "icon",
      "iconColor",
      "iconHtml",
      "imageAlt",
      "imageHeight",
      "imageUrl",
      "imageWidth",
      "preConfirm",
      "preDeny",
      "progressSteps",
      "returnFocus",
      "reverseButtons",
      "showCancelButton",
      "showCloseButton",
      "showConfirmButton",
      "showDenyButton",
      "text",
      "title",
      "titleText",
      "willClose",
    ],
    Re = {},
    Ye = [
      "allowOutsideClick",
      "allowEnterKey",
      "backdrop",
      "focusConfirm",
      "focusDeny",
      "focusCancel",
      "returnFocus",
      "heightAuto",
      "keydownListenerCapture",
    ],
    Ze = (e) => Object.prototype.hasOwnProperty.call(Ue, e),
    $e = (e) => Re[e],
    We = (e) => {
      Ze(e) || n('Unknown parameter "'.concat(e, '"'));
    },
    _e = (e) => {
      Ye.includes(e) &&
        n('The parameter "'.concat(e, '" is incompatible with toasts'));
    },
    Ke = (e) => {
      $e(e) && r(e, $e(e));
    };
  var Xe = Object.freeze({
    isValidParameter: Ze,
    isUpdatableParameter: (e) => -1 !== Fe.indexOf(e),
    isDeprecatedParameter: $e,
    argsToParams: (e) => {
      const t = {};
      return (
        "object" != typeof e[0] || p(e[0])
          ? ["title", "html", "icon"].forEach((o, s) => {
              const n = e[s];
              "string" == typeof n || p(n)
                ? (t[o] = n)
                : void 0 !== n &&
                  a(
                    "Unexpected type of "
                      .concat(o, '! Expected "string" or "Element", got ')
                      .concat(typeof n)
                  );
            })
          : Object.assign(t, e[0]),
        t
      );
    },
    isVisible: () => G(y()),
    clickConfirm: Oe,
    clickDeny: () => E() && E().click(),
    clickCancel: () => T() && T().click(),
    getContainer: h,
    getPopup: y,
    getTitle: k,
    getHtmlContainer: x,
    getImage: C,
    getIcon: v,
    getInputLabel: () => b(w["input-label"]),
    getCloseButton: z,
    getActions: L,
    getConfirmButton: P,
    getDenyButton: E,
    getCancelButton: T,
    getLoader: S,
    getFooter: O,
    getTimerProgressBar: j,
    getFocusableElements: M,
    getValidationMessage: B,
    isLoading: () => y().hasAttribute("data-loading"),
    fire: function (...e) {
      return new this(...e);
    },
    mixin: function (e) {
      return class extends this {
        _main(t, o) {
          return super._main(t, Object.assign({}, e, o));
        }
      };
    },
    showLoading: je,
    enableLoading: je,
    getTimerLeft: () => Me.timeout && Me.timeout.getTimerLeft(),
    stopTimer: Ie,
    resumeTimer: He,
    toggleTimer: () => {
      const e = Me.timeout;
      return e && (e.running ? Ie() : He());
    },
    increaseTimer: (e) => {
      if (Me.timeout) {
        const t = Me.timeout.increase(e);
        return te(t, !0), t;
      }
    },
    isTimerRunning: () => Me.timeout && Me.timeout.isRunning(),
    bindClickHandler: function (e = "data-swal-template") {
      (Ve[e] = this),
        qe || (document.body.addEventListener("click", Ne), (qe = !0));
    },
  });
  function Je() {
    const e = me.innerParams.get(this);
    if (!e) return;
    const t = me.domCache.get(this);
    K(t.loader),
      I() ? e.icon && _(v()) : Ge(t),
      Z([t.popup, t.actions], w.loading),
      t.popup.removeAttribute("aria-busy"),
      t.popup.removeAttribute("data-loading"),
      (t.confirmButton.disabled = !1),
      (t.denyButton.disabled = !1),
      (t.cancelButton.disabled = !1);
  }
  const Ge = (e) => {
    const t = e.popup.getElementsByClassName(
      e.loader.getAttribute("data-button-to-replace")
    );
    t.length
      ? _(t[0], "inline-block")
      : G(P()) || G(E()) || G(T()) || K(e.actions);
  };
  const Qe = () => {
      null === H.previousBodyPadding &&
        document.body.scrollHeight > window.innerHeight &&
        ((H.previousBodyPadding = parseInt(
          window
            .getComputedStyle(document.body)
            .getPropertyValue("padding-right")
        )),
        (document.body.style.paddingRight = "".concat(
          H.previousBodyPadding +
            (() => {
              const e = document.createElement("div");
              (e.className = w["scrollbar-measure"]),
                document.body.appendChild(e);
              const t = e.getBoundingClientRect().width - e.clientWidth;
              return document.body.removeChild(e), t;
            })(),
          "px"
        )));
    },
    et = () => {
      if (
        !navigator.userAgent.match(/(CriOS|FxiOS|EdgiOS|YaBrowser|UCBrowser)/i)
      ) {
        const e = 44;
        y().scrollHeight > window.innerHeight - e &&
          (h().style.paddingBottom = "".concat(e, "px"));
      }
    },
    tt = () => {
      const e = h();
      let t;
      (e.ontouchstart = (e) => {
        t = ot(e);
      }),
        (e.ontouchmove = (e) => {
          t && (e.preventDefault(), e.stopPropagation());
        });
    },
    ot = (e) => {
      const t = e.target,
        o = h();
      return (
        !st(e) &&
        !nt(e) &&
        (t === o ||
          !(
            Q(o) ||
            "INPUT" === t.tagName ||
            "TEXTAREA" === t.tagName ||
            (Q(x()) && x().contains(t))
          ))
      );
    },
    st = (e) =>
      e.touches && e.touches.length && "stylus" === e.touches[0].touchType,
    nt = (e) => e.touches && e.touches.length > 1,
    at = () => {
      s(document.body.children).forEach((e) => {
        e.hasAttribute("data-previous-aria-hidden")
          ? (e.setAttribute(
              "aria-hidden",
              e.getAttribute("data-previous-aria-hidden")
            ),
            e.removeAttribute("data-previous-aria-hidden"))
          : e.removeAttribute("aria-hidden");
      });
    };
  var it = { swalPromiseResolve: new WeakMap() };
  function rt(e, t, o, s) {
    I()
      ? pt(e, s)
      : (De(o).then(() => pt(e, s)),
        Me.keydownTarget.removeEventListener("keydown", Me.keydownHandler, {
          capture: Me.keydownListenerCapture,
        }),
        (Me.keydownHandlerAdded = !1));
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      ? (t.setAttribute("style", "display:none !important"),
        t.removeAttribute("class"),
        (t.innerHTML = ""))
      : t.remove(),
      D() &&
        (null !== H.previousBodyPadding &&
          ((document.body.style.paddingRight = "".concat(
            H.previousBodyPadding,
            "px"
          )),
          (H.previousBodyPadding = null)),
        (() => {
          if (V(document.body, w.iosfix)) {
            const e = parseInt(document.body.style.top, 10);
            Z(document.body, w.iosfix),
              (document.body.style.top = ""),
              (document.body.scrollTop = -1 * e);
          }
        })(),
        at()),
      Z(
        [document.documentElement, document.body],
        [w.shown, w["height-auto"], w["no-backdrop"], w["toast-shown"]]
      );
  }
  function lt(e) {
    const t = y();
    if (!t) return;
    e = ct(e);
    const o = me.innerParams.get(this);
    if (!o || V(t, o.hideClass.popup)) return;
    const s = it.swalPromiseResolve.get(this);
    Z(t, o.showClass.popup), Y(t, o.hideClass.popup);
    const n = h();
    Z(n, o.showClass.backdrop),
      Y(n, o.hideClass.backdrop),
      dt(this, t, o),
      s(e);
  }
  const ct = (e) =>
      void 0 === e
        ? { isConfirmed: !1, isDenied: !1, isDismissed: !0 }
        : Object.assign({ isConfirmed: !1, isDenied: !1, isDismissed: !1 }, e),
    dt = (e, t, o) => {
      const s = h(),
        n = ce && ee(t);
      "function" == typeof o.willClose && o.willClose(t),
        n
          ? ut(e, t, s, o.returnFocus, o.didClose)
          : rt(e, s, o.returnFocus, o.didClose);
    },
    ut = (e, t, o, s, n) => {
      (Me.swalCloseEventFinishedCallback = rt.bind(null, e, o, s, n)),
        t.addEventListener(ce, function (e) {
          e.target === t &&
            (Me.swalCloseEventFinishedCallback(),
            delete Me.swalCloseEventFinishedCallback);
        });
    },
    pt = (e, t) => {
      setTimeout(() => {
        "function" == typeof t && t.bind(e.params)(), e._destroy();
      });
    };
  function mt(e, t, o) {
    const s = me.domCache.get(e);
    t.forEach((e) => {
      s[e].disabled = o;
    });
  }
  function wt(e, t) {
    if (!e) return !1;
    if ("radio" === e.type) {
      const o = e.parentNode.parentNode.querySelectorAll("input");
      for (let e = 0; e < o.length; e++) o[e].disabled = t;
    } else e.disabled = t;
  }
  class gt {
    constructor(e, t) {
      (this.callback = e),
        (this.remaining = t),
        (this.running = !1),
        this.start();
    }
    start() {
      return (
        this.running ||
          ((this.running = !0),
          (this.started = new Date()),
          (this.id = setTimeout(this.callback, this.remaining))),
        this.remaining
      );
    }
    stop() {
      return (
        this.running &&
          ((this.running = !1),
          clearTimeout(this.id),
          (this.remaining -= new Date() - this.started)),
        this.remaining
      );
    }
    increase(e) {
      const t = this.running;
      return (
        t && this.stop(),
        (this.remaining += e),
        t && this.start(),
        this.remaining
      );
    }
    getTimerLeft() {
      return this.running && (this.stop(), this.start()), this.remaining;
    }
    isRunning() {
      return this.running;
    }
  }
  var ht = {
    email: (e, t) =>
      /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e)
        ? Promise.resolve()
        : Promise.resolve(t || "Invalid email address"),
    url: (e, t) =>
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(
        e
      )
        ? Promise.resolve()
        : Promise.resolve(t || "Invalid URL"),
  };
  function ft(e) {
    !(function (e) {
      e.inputValidator ||
        Object.keys(ht).forEach((t) => {
          e.input === t && (e.inputValidator = ht[t]);
        });
    })(e),
      e.showLoaderOnConfirm &&
        !e.preConfirm &&
        n(
          "showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"
        ),
      (function (e) {
        (!e.target ||
          ("string" == typeof e.target && !document.querySelector(e.target)) ||
          ("string" != typeof e.target && !e.target.appendChild)) &&
          (n('Target parameter is not valid, defaulting to "body"'),
          (e.target = "body"));
      })(e),
      "string" == typeof e.title &&
        (e.title = e.title.split("\n").join("<br />")),
      ae(e);
  }
  const bt = ["swal-title", "swal-html", "swal-footer"],
    yt = (e) => {
      const t = {};
      return (
        s(e.querySelectorAll("swal-param")).forEach((e) => {
          Pt(e, ["name", "value"]);
          const o = e.getAttribute("name");
          let s = e.getAttribute("value");
          "boolean" == typeof Ue[o] && "false" === s && (s = !1),
            "object" == typeof Ue[o] && (s = JSON.parse(s)),
            (t[o] = s);
        }),
        t
      );
    },
    vt = (e) => {
      const t = {};
      return (
        s(e.querySelectorAll("swal-button")).forEach((e) => {
          Pt(e, ["type", "color", "aria-label"]);
          const s = e.getAttribute("type");
          (t["".concat(s, "ButtonText")] = e.innerHTML),
            (t["show".concat(o(s), "Button")] = !0),
            e.hasAttribute("color") &&
              (t["".concat(s, "ButtonColor")] = e.getAttribute("color")),
            e.hasAttribute("aria-label") &&
              (t["".concat(s, "ButtonAriaLabel")] =
                e.getAttribute("aria-label"));
        }),
        t
      );
    },
    kt = (e) => {
      const t = {},
        o = e.querySelector("swal-image");
      return (
        o &&
          (Pt(o, ["src", "width", "height", "alt"]),
          o.hasAttribute("src") && (t.imageUrl = o.getAttribute("src")),
          o.hasAttribute("width") && (t.imageWidth = o.getAttribute("width")),
          o.hasAttribute("height") &&
            (t.imageHeight = o.getAttribute("height")),
          o.hasAttribute("alt") && (t.imageAlt = o.getAttribute("alt"))),
        t
      );
    },
    xt = (e) => {
      const t = {},
        o = e.querySelector("swal-icon");
      return (
        o &&
          (Pt(o, ["type", "color"]),
          o.hasAttribute("type") && (t.icon = o.getAttribute("type")),
          o.hasAttribute("color") && (t.iconColor = o.getAttribute("color")),
          (t.iconHtml = o.innerHTML)),
        t
      );
    },
    Ct = (e) => {
      const t = {},
        o = e.querySelector("swal-input");
      o &&
        (Pt(o, ["type", "label", "placeholder", "value"]),
        (t.input = o.getAttribute("type") || "text"),
        o.hasAttribute("label") && (t.inputLabel = o.getAttribute("label")),
        o.hasAttribute("placeholder") &&
          (t.inputPlaceholder = o.getAttribute("placeholder")),
        o.hasAttribute("value") && (t.inputValue = o.getAttribute("value")));
      const n = e.querySelectorAll("swal-input-option");
      return (
        n.length &&
          ((t.inputOptions = {}),
          s(n).forEach((e) => {
            Pt(e, ["value"]);
            const o = e.getAttribute("value"),
              s = e.innerHTML;
            t.inputOptions[o] = s;
          })),
        t
      );
    },
    At = (e, t) => {
      const o = {};
      for (const s in t) {
        const n = t[s],
          a = e.querySelector(n);
        a && (Pt(a, []), (o[n.replace(/^swal-/, "")] = a.innerHTML.trim()));
      }
      return o;
    },
    Bt = (e) => {
      const t = bt.concat([
        "swal-param",
        "swal-button",
        "swal-image",
        "swal-icon",
        "swal-input",
        "swal-input-option",
      ]);
      s(e.children).forEach((e) => {
        const o = e.tagName.toLowerCase();
        -1 === t.indexOf(o) && n("Unrecognized element <".concat(o, ">"));
      });
    },
    Pt = (e, t) => {
      s(e.attributes).forEach((o) => {
        -1 === t.indexOf(o.name) &&
          n([
            'Unrecognized attribute "'
              .concat(o.name, '" on <')
              .concat(e.tagName.toLowerCase(), ">."),
            "".concat(
              t.length
                ? "Allowed attributes are: ".concat(t.join(", "))
                : "To set the value, use HTML within the element."
            ),
          ]);
      });
    },
    Et = (e) => {
      const t = h(),
        o = y();
      "function" == typeof e.willOpen && e.willOpen(o);
      const n = window.getComputedStyle(document.body).overflowY;
      Ot(t, o, e),
        setTimeout(() => {
          Tt(t, o);
        }, 10),
        D() &&
          (Lt(t, e.scrollbarPadding, n),
          s(document.body.children).forEach((e) => {
            e === h() ||
              e.contains(h()) ||
              (e.hasAttribute("aria-hidden") &&
                e.setAttribute(
                  "data-previous-aria-hidden",
                  e.getAttribute("aria-hidden")
                ),
              e.setAttribute("aria-hidden", "true"));
          })),
        I() ||
          Me.previousActiveElement ||
          (Me.previousActiveElement = document.activeElement),
        "function" == typeof e.didOpen && setTimeout(() => e.didOpen(o)),
        Z(t, w["no-transition"]);
    },
    St = (e) => {
      const t = y();
      if (e.target !== t) return;
      const o = h();
      t.removeEventListener(ce, St), (o.style.overflowY = "auto");
    },
    Tt = (e, t) => {
      ce && ee(t)
        ? ((e.style.overflowY = "hidden"), t.addEventListener(ce, St))
        : (e.style.overflowY = "auto");
    },
    Lt = (e, t, o) => {
      (() => {
        if (
          ((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) ||
            ("MacIntel" === navigator.platform &&
              navigator.maxTouchPoints > 1)) &&
          !V(document.body, w.iosfix)
        ) {
          const e = document.body.scrollTop;
          (document.body.style.top = "".concat(-1 * e, "px")),
            Y(document.body, w.iosfix),
            tt(),
            et();
        }
      })(),
        t && "hidden" !== o && Qe(),
        setTimeout(() => {
          e.scrollTop = 0;
        });
    },
    Ot = (e, t, o) => {
      Y(e, o.showClass.backdrop),
        t.style.setProperty("opacity", "0", "important"),
        _(t, "grid"),
        setTimeout(() => {
          Y(t, o.showClass.popup), t.style.removeProperty("opacity");
        }, 10),
        Y([document.documentElement, document.body], w.shown),
        o.heightAuto &&
          o.backdrop &&
          !o.toast &&
          Y([document.documentElement, document.body], w["height-auto"]);
    },
    jt = (e) => (e.checked ? 1 : 0),
    zt = (e) => (e.checked ? e.value : null),
    Mt = (e) =>
      e.files.length
        ? null !== e.getAttribute("multiple")
          ? e.files
          : e.files[0]
        : null,
    Dt = (e, t) => {
      const o = y(),
        s = (e) => Ht[t.input](o, qt(e), t);
      c(t.inputOptions) || u(t.inputOptions)
        ? (je(P()),
          d(t.inputOptions).then((t) => {
            e.hideLoading(), s(t);
          }))
        : "object" == typeof t.inputOptions
        ? s(t.inputOptions)
        : a(
            "Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(
              typeof t.inputOptions
            )
          );
    },
    It = (e, t) => {
      const o = e.getInput();
      K(o),
        d(t.inputValue)
          .then((s) => {
            (o.value =
              "number" === t.input ? parseFloat(s) || 0 : "".concat(s)),
              _(o),
              o.focus(),
              e.hideLoading();
          })
          .catch((t) => {
            a("Error in inputValue promise: ".concat(t)),
              (o.value = ""),
              _(o),
              o.focus(),
              e.hideLoading();
          });
    },
    Ht = {
      select: (e, t, o) => {
        const s = $(e, w.select),
          n = (e, t, s) => {
            const n = document.createElement("option");
            (n.value = s),
              q(n, t),
              (n.selected = Vt(s, o.inputValue)),
              e.appendChild(n);
          };
        t.forEach((e) => {
          const t = e[0],
            o = e[1];
          if (Array.isArray(o)) {
            const e = document.createElement("optgroup");
            (e.label = t),
              (e.disabled = !1),
              s.appendChild(e),
              o.forEach((t) => n(e, t[1], t[0]));
          } else n(s, o, t);
        }),
          s.focus();
      },
      radio: (e, t, o) => {
        const s = $(e, w.radio);
        t.forEach((e) => {
          const t = e[0],
            n = e[1],
            a = document.createElement("input"),
            i = document.createElement("label");
          (a.type = "radio"),
            (a.name = w.radio),
            (a.value = t),
            Vt(t, o.inputValue) && (a.checked = !0);
          const r = document.createElement("span");
          q(r, n),
            (r.className = w.label),
            i.appendChild(a),
            i.appendChild(r),
            s.appendChild(i);
        });
        const n = s.querySelectorAll("input");
        n.length && n[0].focus();
      },
    },
    qt = (e) => {
      const t = [];
      return (
        "undefined" != typeof Map && e instanceof Map
          ? e.forEach((e, o) => {
              let s = e;
              "object" == typeof s && (s = qt(s)), t.push([o, s]);
            })
          : Object.keys(e).forEach((o) => {
              let s = e[o];
              "object" == typeof s && (s = qt(s)), t.push([o, s]);
            }),
        t
      );
    },
    Vt = (e, t) => t && t.toString() === e.toString(),
    Nt = (e, t) => {
      const o = me.innerParams.get(e),
        s = ((e, t) => {
          const o = e.getInput();
          if (!o) return null;
          switch (t.input) {
            case "checkbox":
              return jt(o);
            case "radio":
              return zt(o);
            case "file":
              return Mt(o);
            default:
              return t.inputAutoTrim ? o.value.trim() : o.value;
          }
        })(e, o);
      o.inputValidator
        ? Ut(e, s, t)
        : e.getInput().checkValidity()
        ? "deny" === t
          ? Ft(e, s)
          : Yt(e, s)
        : (e.enableButtons(), e.showValidationMessage(o.validationMessage));
    },
    Ut = (e, t, o) => {
      const s = me.innerParams.get(e);
      e.disableInput();
      Promise.resolve()
        .then(() => d(s.inputValidator(t, s.validationMessage)))
        .then((s) => {
          e.enableButtons(),
            e.enableInput(),
            s ? e.showValidationMessage(s) : "deny" === o ? Ft(e, t) : Yt(e, t);
        });
    },
    Ft = (e, t) => {
      const o = me.innerParams.get(e || void 0);
      if ((o.showLoaderOnDeny && je(E()), o.preDeny)) {
        Promise.resolve()
          .then(() => d(o.preDeny(t, o.validationMessage)))
          .then((o) => {
            !1 === o
              ? e.hideLoading()
              : e.closePopup({ isDenied: !0, value: void 0 === o ? t : o });
          });
      } else e.closePopup({ isDenied: !0, value: t });
    },
    Rt = (e, t) => {
      e.closePopup({ isConfirmed: !0, value: t });
    },
    Yt = (e, t) => {
      const o = me.innerParams.get(e || void 0);
      if ((o.showLoaderOnConfirm && je(), o.preConfirm)) {
        e.resetValidationMessage();
        Promise.resolve()
          .then(() => d(o.preConfirm(t, o.validationMessage)))
          .then((o) => {
            G(B()) || !1 === o ? e.hideLoading() : Rt(e, void 0 === o ? t : o);
          });
      } else Rt(e, t);
    },
    Zt = (e, t, o) => {
      const s = M();
      if (s.length)
        return (
          (t += o) === s.length ? (t = 0) : -1 === t && (t = s.length - 1),
          s[t].focus()
        );
      y().focus();
    },
    $t = ["ArrowRight", "ArrowDown"],
    Wt = ["ArrowLeft", "ArrowUp"],
    _t = (e, t, o) => {
      const s = me.innerParams.get(e);
      s &&
        (s.stopKeydownPropagation && t.stopPropagation(),
        "Enter" === t.key
          ? Kt(e, t, s)
          : "Tab" === t.key
          ? Xt(t, s)
          : [...$t, ...Wt].includes(t.key)
          ? Jt(t.key)
          : "Escape" === t.key && Gt(t, s, o));
    },
    Kt = (e, t, o) => {
      if (
        !t.isComposing &&
        t.target &&
        e.getInput() &&
        t.target.outerHTML === e.getInput().outerHTML
      ) {
        if (["textarea", "file"].includes(o.input)) return;
        Oe(), t.preventDefault();
      }
    },
    Xt = (e, t) => {
      const o = e.target,
        s = M();
      let n = -1;
      for (let e = 0; e < s.length; e++)
        if (o === s[e]) {
          n = e;
          break;
        }
      e.shiftKey ? Zt(0, n, -1) : Zt(0, n, 1),
        e.stopPropagation(),
        e.preventDefault();
    },
    Jt = (e) => {
      if (![P(), E(), T()].includes(document.activeElement)) return;
      const t = $t.includes(e)
          ? "nextElementSibling"
          : "previousElementSibling",
        o = document.activeElement[t];
      o && o.focus();
    },
    Gt = (t, o, s) => {
      l(o.allowEscapeKey) && (t.preventDefault(), s(e.esc));
    },
    Qt = (t, o, s) => {
      o.popup.onclick = () => {
        const o = me.innerParams.get(t);
        o.showConfirmButton ||
          o.showDenyButton ||
          o.showCancelButton ||
          o.showCloseButton ||
          o.timer ||
          o.input ||
          s(e.close);
      };
    };
  let eo = !1;
  const to = (e) => {
      e.popup.onmousedown = () => {
        e.container.onmouseup = function (t) {
          (e.container.onmouseup = void 0),
            t.target === e.container && (eo = !0);
        };
      };
    },
    oo = (e) => {
      e.container.onmousedown = () => {
        e.popup.onmouseup = function (t) {
          (e.popup.onmouseup = void 0),
            (t.target === e.popup || e.popup.contains(t.target)) && (eo = !0);
        };
      };
    },
    so = (t, o, s) => {
      o.container.onclick = (n) => {
        const a = me.innerParams.get(t);
        eo
          ? (eo = !1)
          : n.target === o.container && l(a.allowOutsideClick) && s(e.backdrop);
      };
    };
  const no = (e, t) => {
      const o = ((e) => {
          const t =
            "string" == typeof e.template
              ? document.querySelector(e.template)
              : e.template;
          if (!t) return {};
          const o = t.content;
          return (
            Bt(o), Object.assign(yt(o), vt(o), kt(o), xt(o), Ct(o), At(o, bt))
          );
        })(e),
        s = Object.assign({}, Ue, t, o, e);
      return (
        (s.showClass = Object.assign({}, Ue.showClass, s.showClass)),
        (s.hideClass = Object.assign({}, Ue.hideClass, s.hideClass)),
        s
      );
    },
    ao = (t, o, s) =>
      new Promise((n) => {
        const a = (e) => {
          t.closePopup({ isDismissed: !0, dismiss: e });
        };
        it.swalPromiseResolve.set(t, n),
          (o.confirmButton.onclick = () =>
            ((e) => {
              const t = me.innerParams.get(e);
              e.disableButtons(), t.input ? Nt(e, "confirm") : Yt(e, !0);
            })(t)),
          (o.denyButton.onclick = () =>
            ((e) => {
              const t = me.innerParams.get(e);
              e.disableButtons(),
                t.returnInputValueOnDeny ? Nt(e, "deny") : Ft(e, !1);
            })(t)),
          (o.cancelButton.onclick = () =>
            ((t, o) => {
              t.disableButtons(), o(e.cancel);
            })(t, a)),
          (o.closeButton.onclick = () => a(e.close)),
          ((e, t, o) => {
            me.innerParams.get(e).toast
              ? Qt(e, t, o)
              : (to(t), oo(t), so(e, t, o));
          })(t, o, a),
          ((e, t, o, s) => {
            t.keydownTarget &&
              t.keydownHandlerAdded &&
              (t.keydownTarget.removeEventListener(
                "keydown",
                t.keydownHandler,
                { capture: t.keydownListenerCapture }
              ),
              (t.keydownHandlerAdded = !1)),
              o.toast ||
                ((t.keydownHandler = (t) => _t(e, t, s)),
                (t.keydownTarget = o.keydownListenerCapture ? window : y()),
                (t.keydownListenerCapture = o.keydownListenerCapture),
                t.keydownTarget.addEventListener("keydown", t.keydownHandler, {
                  capture: t.keydownListenerCapture,
                }),
                (t.keydownHandlerAdded = !0));
          })(t, Me, s, a),
          ((e, t) => {
            "select" === t.input || "radio" === t.input
              ? Dt(e, t)
              : ["text", "email", "number", "tel", "textarea"].includes(
                  t.input
                ) &&
                (c(t.inputValue) || u(t.inputValue)) &&
                (je(P()), It(e, t));
          })(t, s),
          Et(s),
          ro(Me, s, a),
          lo(o, s),
          setTimeout(() => {
            o.container.scrollTop = 0;
          });
      }),
    io = (e) => {
      const t = {
        popup: y(),
        container: h(),
        actions: L(),
        confirmButton: P(),
        denyButton: E(),
        cancelButton: T(),
        loader: S(),
        closeButton: z(),
        validationMessage: B(),
        progressSteps: A(),
      };
      return me.domCache.set(e, t), t;
    },
    ro = (e, t, o) => {
      const s = j();
      K(s),
        t.timer &&
          ((e.timeout = new gt(() => {
            o("timer"), delete e.timeout;
          }, t.timer)),
          t.timerProgressBar &&
            (_(s),
            setTimeout(() => {
              e.timeout && e.timeout.running && te(t.timer);
            })));
    },
    lo = (e, t) => {
      if (!t.toast)
        return l(t.allowEnterKey) ? void (co(e, t) || Zt(0, -1, 1)) : uo();
    },
    co = (e, t) =>
      t.focusDeny && G(e.denyButton)
        ? (e.denyButton.focus(), !0)
        : t.focusCancel && G(e.cancelButton)
        ? (e.cancelButton.focus(), !0)
        : !(!t.focusConfirm || !G(e.confirmButton)) &&
          (e.confirmButton.focus(), !0),
    uo = () => {
      document.activeElement &&
        "function" == typeof document.activeElement.blur &&
        document.activeElement.blur();
    };
  const po = (e) => {
      delete e.params,
        delete Me.keydownHandler,
        delete Me.keydownTarget,
        mo(me),
        mo(it),
        delete Me.currentInstance;
    },
    mo = (e) => {
      for (const t in e) e[t] = new WeakMap();
    };
  var wo = Object.freeze({
    hideLoading: Je,
    disableLoading: Je,
    getInput: function (e) {
      const t = me.innerParams.get(e || this),
        o = me.domCache.get(e || this);
      return o ? U(o.popup, t.input) : null;
    },
    close: lt,
    closePopup: lt,
    closeModal: lt,
    closeToast: lt,
    enableButtons: function () {
      mt(this, ["confirmButton", "denyButton", "cancelButton"], !1);
    },
    disableButtons: function () {
      mt(this, ["confirmButton", "denyButton", "cancelButton"], !0);
    },
    enableInput: function () {
      return wt(this.getInput(), !1);
    },
    disableInput: function () {
      return wt(this.getInput(), !0);
    },
    showValidationMessage: function (e) {
      const t = me.domCache.get(this),
        o = me.innerParams.get(this);
      q(t.validationMessage, e),
        (t.validationMessage.className = w["validation-message"]),
        o.customClass &&
          o.customClass.validationMessage &&
          Y(t.validationMessage, o.customClass.validationMessage),
        _(t.validationMessage);
      const s = this.getInput();
      s &&
        (s.setAttribute("aria-invalid", !0),
        s.setAttribute("aria-describedby", w["validation-message"]),
        F(s),
        Y(s, w.inputerror));
    },
    resetValidationMessage: function () {
      const e = me.domCache.get(this);
      e.validationMessage && K(e.validationMessage);
      const t = this.getInput();
      t &&
        (t.removeAttribute("aria-invalid"),
        t.removeAttribute("aria-describedby"),
        Z(t, w.inputerror));
    },
    getProgressSteps: function () {
      return me.domCache.get(this).progressSteps;
    },
    _main: function (e, t = {}) {
      ((e) => {
        !e.backdrop &&
          e.allowOutsideClick &&
          n(
            '"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'
          );
        for (const t in e) We(t), e.toast && _e(t), Ke(t);
      })(Object.assign({}, t, e)),
        Me.currentInstance && (Me.currentInstance._destroy(), D() && at()),
        (Me.currentInstance = this);
      const o = no(e, t);
      ft(o),
        Object.freeze(o),
        Me.timeout && (Me.timeout.stop(), delete Me.timeout),
        clearTimeout(Me.restoreFocusTimeout);
      const s = io(this);
      return Le(this, o), me.innerParams.set(this, o), ao(this, s, o);
    },
    update: function (e) {
      const t = y(),
        o = me.innerParams.get(this);
      if (!t || V(t, o.hideClass.popup))
        return n(
          "You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup."
        );
      const s = {};
      Object.keys(e).forEach((t) => {
        fo.isUpdatableParameter(t)
          ? (s[t] = e[t])
          : n(
              'Invalid parameter to update: "'.concat(
                t,
                '". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js\n\nIf you think this parameter should be updatable, request it here: https://github.com/sweetalert2/sweetalert2/issues/new?template=02_feature_request.md'
              )
            );
      });
      const a = Object.assign({}, o, s);
      Le(this, a),
        me.innerParams.set(this, a),
        Object.defineProperties(this, {
          params: {
            value: Object.assign({}, this.params, e),
            writable: !1,
            enumerable: !0,
          },
        });
    },
    _destroy: function () {
      const e = me.domCache.get(this),
        t = me.innerParams.get(this);
      t &&
        (e.popup &&
          Me.swalCloseEventFinishedCallback &&
          (Me.swalCloseEventFinishedCallback(),
          delete Me.swalCloseEventFinishedCallback),
        Me.deferDisposalTimer &&
          (clearTimeout(Me.deferDisposalTimer), delete Me.deferDisposalTimer),
        "function" == typeof t.didDestroy && t.didDestroy(),
        po(this));
    },
  });
  let go;
  class ho {
    constructor(...e) {
      if ("undefined" == typeof window) return;
      go = this;
      const t = Object.freeze(this.constructor.argsToParams(e));
      Object.defineProperties(this, {
        params: { value: t, writable: !1, enumerable: !0, configurable: !0 },
      });
      const o = this._main(this.params);
      me.promise.set(this, o);
    }
    then(e) {
      return me.promise.get(this).then(e);
    }
    finally(e) {
      return me.promise.get(this).finally(e);
    }
  }
  Object.assign(ho.prototype, wo),
    Object.assign(ho, Xe),
    Object.keys(wo).forEach((e) => {
      ho[e] = function (...t) {
        if (go) return go[e](...t);
      };
    }),
    (ho.DismissReason = e),
    (ho.version = "11.1.2");
  const fo = ho;
  return (fo.default = fo), fo;
}),
  void 0 !== this &&
    this.Sweetalert2 &&
    (this.swal =
      this.sweetAlert =
      this.Swal =
      this.SweetAlert =
        this.Sweetalert2),
  "undefined" != typeof document &&
    (function (e, t) {
      var o = e.createElement("style");
      if ((e.getElementsByTagName("head")[0].appendChild(o), o.styleSheet))
        o.styleSheet.disabled || (o.styleSheet.cssText = t);
      else
        try {
          o.innerHTML = t;
        } catch (e) {
          o.innerText = t;
        }
    })(
      document,
      '.swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4!important;grid-row:1/4!important;grid-template-columns:1fr 99fr 1fr;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 .625em #d9d9d9;pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:700}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.3125em;padding:0}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(100,150,200,.5)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-container{display:grid;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;box-sizing:border-box;grid-template-areas:"top-start     top            top-end" "center-start  center         center-end" "bottom-start  bottom-center  bottom-end" "gap gap gap";grid-template-rows:auto auto auto .625em;height:100%;padding:.625em .625em 0;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container::after{content:"";grid-column:1/4;grid-row:4;height:.625em}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-bottom-start,.swal2-container.swal2-center-start,.swal2-container.swal2-top-start{grid-template-columns:minmax(0,1fr) auto auto}.swal2-container.swal2-bottom,.swal2-container.swal2-center,.swal2-container.swal2-top{grid-template-columns:auto minmax(0,1fr) auto}.swal2-container.swal2-bottom-end,.swal2-container.swal2-center-end,.swal2-container.swal2-top-end{grid-template-columns:auto auto minmax(0,1fr)}.swal2-container.swal2-top-start>.swal2-popup{align-self:start}.swal2-container.swal2-top>.swal2-popup{grid-column:2;align-self:start;justify-self:center}.swal2-container.swal2-top-end>.swal2-popup,.swal2-container.swal2-top-right>.swal2-popup{grid-column:3;align-self:start;justify-self:end}.swal2-container.swal2-center-left>.swal2-popup,.swal2-container.swal2-center-start>.swal2-popup{grid-row:2;align-self:center}.swal2-container.swal2-center>.swal2-popup{grid-column:2;grid-row:2;align-self:center;justify-self:center}.swal2-container.swal2-center-end>.swal2-popup,.swal2-container.swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;align-self:center;justify-self:end}.swal2-container.swal2-bottom-left>.swal2-popup,.swal2-container.swal2-bottom-start>.swal2-popup{grid-column:1;grid-row:3;align-self:end}.swal2-container.swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;justify-self:center;align-self:end}.swal2-container.swal2-bottom-end>.swal2-popup,.swal2-container.swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;align-self:end;justify-self:end}.swal2-container.swal2-grow-fullscreen>.swal2-popup,.swal2-container.swal2-grow-row>.swal2-popup{grid-column:1/4;width:100%}.swal2-container.swal2-grow-column>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}.swal2-container.swal2-no-transition{transition:none!important}.swal2-popup{display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0,100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-title{position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:100%;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 transparent #2778c4 transparent}.swal2-styled{margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px transparent;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7367f0;color:#fff;font-size:1em}.swal2-styled.swal2-confirm:focus{box-shadow:0 0 0 3px rgba(115,103,240,.5)}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#ea5455;color:#fff;font-size:1em}.swal2-styled.swal2-deny:focus{box-shadow:0 0 0 3px rgba(234,84,85,.5)}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7d88;color:#fff;font-size:1em}.swal2-styled.swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,125,136,.5)}.swal2-styled.swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled:focus{outline:0}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto!important;height:.25em;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:2em auto 1em}.swal2-close{z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:0 0;color:#ccc;font-family:serif;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-close:focus{outline:0;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:#545454;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em 2em 0}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px transparent;color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em 2em 0;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-input[type=number]{max-width:10em}.swal2-file{width:75%;margin-right:auto;margin-left:auto;background:inherit;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto 0}.swal2-validation-message{align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:.25em solid transparent;border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@-webkit-keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@-webkit-keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@-webkit-keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{background-color:transparent!important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:transparent;pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}'
    );
!(function (e) {
  e(["jquery"], function (e) {
    return (function () {
      function t(t, n) {
        return (
          t || (t = a()),
          (l = e("#" + t.containerId)).length ||
            (n &&
              (l = (function (t) {
                return (
                  (l = e("<div/>")
                    .attr("id", t.containerId)
                    .addClass(t.positionClass)).appendTo(e(t.target)),
                  l
                );
              })(t))),
          l
        );
      }
      function n(t) {
        for (var n = l.children(), o = n.length - 1; o >= 0; o--) s(e(n[o]), t);
      }
      function s(t, n, s) {
        var o = !(!s || !s.force) && s.force;
        return !(
          !t ||
          (!o && 0 !== e(":focus", t).length) ||
          (t[n.hideMethod]({
            duration: n.hideDuration,
            easing: n.hideEasing,
            complete: function () {
              r(t);
            },
          }),
          0)
        );
      }
      function o(e) {
        c && c(e);
      }
      function i(n) {
        function s(e) {
          return (
            null == e && (e = ""),
            e
              .replace(/&/g, "&amp;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#39;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
          );
        }
        function i(t) {
          var n = t && !1 !== m.closeMethod ? m.closeMethod : m.hideMethod,
            s = t && !1 !== m.closeDuration ? m.closeDuration : m.hideDuration,
            i = t && !1 !== m.closeEasing ? m.closeEasing : m.hideEasing;
          if (!e(":focus", v).length || t)
            return (
              clearTimeout(b.intervalId),
              v[n]({
                duration: s,
                easing: i,
                complete: function () {
                  r(v),
                    clearTimeout(h),
                    m.onHidden && "hidden" !== D.state && m.onHidden(),
                    (D.state = "hidden"),
                    (D.endTime = new Date()),
                    o(D);
                },
              })
            );
        }
        function c() {
          (m.timeOut > 0 || m.extendedTimeOut > 0) &&
            ((h = setTimeout(i, m.extendedTimeOut)),
            (b.maxHideTime = parseFloat(m.extendedTimeOut)),
            (b.hideEta = new Date().getTime() + b.maxHideTime));
        }
        function p() {
          clearTimeout(h),
            (b.hideEta = 0),
            v
              .stop(!0, !0)
              [m.showMethod]({
                duration: m.showDuration,
                easing: m.showEasing,
              });
        }
        function g() {
          var e = ((b.hideEta - new Date().getTime()) / b.maxHideTime) * 100;
          T.width(e + "%");
        }
        var m = a(),
          f = n.iconClass || m.iconClass;
        if (
          (void 0 !== n.optionsOverride &&
            ((m = e.extend(m, n.optionsOverride)),
            (f = n.optionsOverride.iconClass || f)),
          !(function (e, t) {
            if (e.preventDuplicates) {
              if (t.message === d) return !0;
              d = t.message;
            }
            return !1;
          })(m, n))
        ) {
          u++, (l = t(m, !0));
          var h = null,
            v = e("<div/>"),
            C = e("<div/>"),
            w = e("<div/>"),
            T = e("<div/>"),
            O = e(m.closeHtml),
            b = { intervalId: null, hideEta: null, maxHideTime: null },
            D = {
              toastId: u,
              state: "visible",
              startTime: new Date(),
              options: m,
              map: n,
            };
          return (
            n.iconClass && v.addClass(m.toastClass).addClass(f),
            (function () {
              if (n.title) {
                var e = n.title;
                m.escapeHtml && (e = s(n.title)),
                  C.append(e).addClass(m.titleClass),
                  v.append(C);
              }
            })(),
            (function () {
              if (n.message) {
                var e = n.message;
                m.escapeHtml && (e = s(n.message)),
                  w.append(e).addClass(m.messageClass),
                  v.append(w);
              }
            })(),
            m.closeButton &&
              (O.addClass(m.closeClass).attr("role", "button"), v.prepend(O)),
            m.progressBar && (T.addClass(m.progressClass), v.prepend(T)),
            m.rtl && v.addClass("rtl"),
            m.newestOnTop ? l.prepend(v) : l.append(v),
            (function () {
              var e = "";
              switch (n.iconClass) {
                case "toast-success":
                case "toast-info":
                  e = "polite";
                  break;
                default:
                  e = "assertive";
              }
              v.attr("aria-live", e);
            })(),
            v.hide(),
            v[m.showMethod]({
              duration: m.showDuration,
              easing: m.showEasing,
              complete: m.onShown,
            }),
            m.timeOut > 0 &&
              ((h = setTimeout(i, m.timeOut)),
              (b.maxHideTime = parseFloat(m.timeOut)),
              (b.hideEta = new Date().getTime() + b.maxHideTime),
              m.progressBar && (b.intervalId = setInterval(g, 10))),
            m.closeOnHover && v.hover(p, c),
            !m.onclick && m.tapToDismiss && v.click(i),
            m.closeButton &&
              O &&
              O.click(function (e) {
                e.stopPropagation
                  ? e.stopPropagation()
                  : void 0 !== e.cancelBubble &&
                    !0 !== e.cancelBubble &&
                    (e.cancelBubble = !0),
                  m.onCloseClick && m.onCloseClick(e),
                  i(!0);
              }),
            m.onclick &&
              v.click(function (e) {
                m.onclick(e), i();
              }),
            o(D),
            m.debug && console && console.log(D),
            v
          );
        }
      }
      function a() {
        return e.extend(
          {},
          {
            tapToDismiss: !0,
            toastClass: "toast",
            containerId: "toast-container",
            debug: !1,
            showMethod: "fadeIn",
            showDuration: 300,
            showEasing: "swing",
            onShown: void 0,
            hideMethod: "fadeOut",
            hideDuration: 1e3,
            hideEasing: "swing",
            onHidden: void 0,
            closeMethod: !1,
            closeDuration: !1,
            closeEasing: !1,
            closeOnHover: !0,
            extendedTimeOut: 1e3,
            iconClasses: {
              error: "toast-error",
              info: "toast-info",
              success: "toast-success",
              warning: "toast-warning",
            },
            iconClass: "toast-info",
            positionClass: "toast-top-right",
            timeOut: 5e3,
            titleClass: "toast-title",
            messageClass: "toast-message",
            escapeHtml: !1,
            target: "body",
            closeHtml: '<button type="button">&times;</button>',
            closeClass: "toast-close-button",
            newestOnTop: !0,
            preventDuplicates: !1,
            progressBar: !1,
            progressClass: "toast-progress",
            rtl: !1,
          },
          g.options
        );
      }
      function r(e) {
        l || (l = t()),
          e.is(":visible") ||
            (e.remove(),
            (e = null),
            0 === l.children().length && (l.remove(), (d = void 0)));
      }
      var l,
        c,
        d,
        u = 0,
        p = {
          error: "error",
          info: "info",
          success: "success",
          warning: "warning",
        },
        g = {
          clear: function (e, o) {
            var i = a();
            l || t(i), s(e, i, o) || n(i);
          },
          remove: function (n) {
            var s = a();
            return (
              l || t(s),
              n && 0 === e(":focus", n).length
                ? void r(n)
                : void (l.children().length && l.remove())
            );
          },
          error: function (e, t, n) {
            return i({
              type: p.error,
              iconClass: a().iconClasses.error,
              message: e,
              optionsOverride: n,
              title: t,
            });
          },
          getContainer: t,
          info: function (e, t, n) {
            return i({
              type: p.info,
              iconClass: a().iconClasses.info,
              message: e,
              optionsOverride: n,
              title: t,
            });
          },
          options: {},
          subscribe: function (e) {
            c = e;
          },
          success: function (e, t, n) {
            return i({
              type: p.success,
              iconClass: a().iconClasses.success,
              message: e,
              optionsOverride: n,
              title: t,
            });
          },
          version: "2.1.3",
          warning: function (e, t, n) {
            return i({
              type: p.warning,
              iconClass: a().iconClasses.warning,
              message: e,
              optionsOverride: n,
              title: t,
            });
          },
        };
      return g;
    })();
  });
})(
  "function" == typeof define && define.amd
    ? define
    : function (e, t) {
        "undefined" != typeof module && module.exports
          ? (module.exports = t(require("jquery")))
          : (window.toastr = t(window.jQuery));
      }
);
