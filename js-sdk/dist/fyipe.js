!(function(e, t) {
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = t())
        : 'function' == typeof define && define.amd
        ? define([], t)
        : 'object' == typeof exports
        ? (exports.Fyipe = t())
        : (e.Fyipe = t());
})(this, function() {
    return (function(e) {
        const t = {};
        function r(n) {
            if (t[n]) return t[n].exports;
            const o = (t[n] = { i: n, l: !1, exports: {} });
            return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
        }
        return (
            (r.m = e),
            (r.c = t),
            (r.d = function(e, t, n) {
                r.o(e, t) ||
                    Object.defineProperty(e, t, { enumerable: !0, get: n });
            }),
            (r.r = function(e) {
                'undefined' != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(e, Symbol.toStringTag, {
                        value: 'Module',
                    }),
                    Object.defineProperty(e, '__esModule', { value: !0 });
            }),
            (r.t = function(e, t) {
                if ((1 & t && (e = r(e)), 8 & t)) return e;
                if (4 & t && 'object' == typeof e && e && e.__esModule)
                    return e;
                const n = Object.create(null);
                if (
                    (r.r(n),
                    Object.defineProperty(n, 'default', {
                        enumerable: !0,
                        value: e,
                    }),
                    2 & t && 'string' != typeof e)
                )
                    for (const o in e)
                        r.d(
                            n,
                            o,
                            function(t) {
                                return e[t];
                            }.bind(null, o)
                        );
                return n;
            }),
            (r.n = function(e) {
                const t =
                    e && e.__esModule
                        ? function() {
                              return e.default;
                          }
                        : function() {
                              return e;
                          };
                return r.d(t, 'a', t), t;
            }),
            (r.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (r.p = ''),
            r((r.s = 68))
        );
    })([
        function(e, t) {
            e.exports = function(e, t) {
                const r = t.get(e);
                if (!r)
                    throw new TypeError(
                        'attempted to get private field on non-instance'
                    );
                return r.get ? r.get.call(e) : r.value;
            };
        },
        function(e, t) {
            e.exports = function(e, t, r) {
                const n = t.get(e);
                if (!n)
                    throw new TypeError(
                        'attempted to set private field on non-instance'
                    );
                if (n.set) n.set.call(e, r);
                else {
                    if (!n.writable)
                        throw new TypeError(
                            'attempted to set read only private field'
                        );
                    n.value = r;
                }
                return r;
            };
        },
        function(e, t, r) {
            'use strict';
            const n = r(16),
                o = Object.prototype.toString;
            function i(e) {
                return '[object Array]' === o.call(e);
            }
            function s(e) {
                return void 0 === e;
            }
            function a(e) {
                return null !== e && 'object' == typeof e;
            }
            function u(e) {
                if ('[object Object]' !== o.call(e)) return !1;
                const t = Object.getPrototypeOf(e);
                return null === t || t === Object.prototype;
            }
            function c(e) {
                return '[object Function]' === o.call(e);
            }
            function f(e, t) {
                if (null != e)
                    if (('object' != typeof e && (e = [e]), i(e)))
                        for (let r = 0, n = e.length; r < n; r++)
                            t.call(null, e[r], r, e);
                    else
                        for (const o in e)
                            Object.prototype.hasOwnProperty.call(e, o) &&
                                t.call(null, e[o], o, e);
            }
            e.exports = {
                isArray: i,
                isArrayBuffer: function(e) {
                    return '[object ArrayBuffer]' === o.call(e);
                },
                isBuffer: function(e) {
                    return (
                        null !== e &&
                        !s(e) &&
                        null !== e.constructor &&
                        !s(e.constructor) &&
                        'function' == typeof e.constructor.isBuffer &&
                        e.constructor.isBuffer(e)
                    );
                },
                isFormData: function(e) {
                    return (
                        'undefined' != typeof FormData && e instanceof FormData
                    );
                },
                isArrayBufferView: function(e) {
                    return 'undefined' != typeof ArrayBuffer &&
                        ArrayBuffer.isView
                        ? ArrayBuffer.isView(e)
                        : e && e.buffer && e.buffer instanceof ArrayBuffer;
                },
                isString: function(e) {
                    return 'string' == typeof e;
                },
                isNumber: function(e) {
                    return 'number' == typeof e;
                },
                isObject: a,
                isPlainObject: u,
                isUndefined: s,
                isDate: function(e) {
                    return '[object Date]' === o.call(e);
                },
                isFile: function(e) {
                    return '[object File]' === o.call(e);
                },
                isBlob: function(e) {
                    return '[object Blob]' === o.call(e);
                },
                isFunction: c,
                isStream: function(e) {
                    return a(e) && c(e.pipe);
                },
                isURLSearchParams: function(e) {
                    return (
                        'undefined' != typeof URLSearchParams &&
                        e instanceof URLSearchParams
                    );
                },
                isStandardBrowserEnv: function() {
                    return (
                        ('undefined' == typeof navigator ||
                            ('ReactNative' !== navigator.product &&
                                'NativeScript' !== navigator.product &&
                                'NS' !== navigator.product)) &&
                        'undefined' != typeof window &&
                        'undefined' != typeof document
                    );
                },
                forEach: f,
                merge: function e() {
                    const t = {};
                    function r(r, n) {
                        u(t[n]) && u(r)
                            ? (t[n] = e(t[n], r))
                            : u(r)
                            ? (t[n] = e({}, r))
                            : i(r)
                            ? (t[n] = r.slice())
                            : (t[n] = r);
                    }
                    for (let n = 0, o = arguments.length; n < o; n++)
                        f(arguments[n], r);
                    return t;
                },
                extend: function(e, t, r) {
                    return (
                        f(t, function(t, o) {
                            e[o] = r && 'function' == typeof t ? n(t, r) : t;
                        }),
                        e
                    );
                },
                trim: function(e) {
                    return e.replace(/^\s*/, '').replace(/\s*$/, '');
                },
                stripBOM: function(e) {
                    return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e;
                },
            };
        },
        function(e, t) {
            e.exports = function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function');
            };
        },
        function(e, t) {
            function r(e, t) {
                for (let r = 0; r < t.length; r++) {
                    const n = t[r];
                    (n.enumerable = n.enumerable || !1),
                        (n.configurable = !0),
                        'value' in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n);
                }
            }
            e.exports = function(e, t, n) {
                return t && r(e.prototype, t), n && r(e, n), e;
            };
        },
        function(e, t, r) {
            e.exports = r(31);
        },
        function(e, t) {
            function r(e, t, r, n, o, i, s) {
                try {
                    var a = e[i](s),
                        u = a.value;
                } catch (e) {
                    return void r(e);
                }
                a.done ? t(u) : Promise.resolve(u).then(n, o);
            }
            e.exports = function(e) {
                return function() {
                    const t = this,
                        n = arguments;
                    return new Promise(function(o, i) {
                        const s = e.apply(t, n);
                        function a(e) {
                            r(s, o, i, a, u, 'next', e);
                        }
                        function u(e) {
                            r(s, o, i, a, u, 'throw', e);
                        }
                        a(void 0);
                    });
                };
            };
        },
        function(e, t) {
            e.exports = require('http');
        },
        function(e, t) {
            e.exports = require('https');
        },
        function(e, t, r) {
            e.exports = r(32);
        },
        function(e, t, r) {
            const n = r(65),
                o = r(66),
                i = r(28),
                s = r(67);
            e.exports = function(e, t) {
                return n(e) || o(e, t) || i(e, t) || s();
            };
        },
        function(e, t) {
            function r(t) {
                return (
                    'function' == typeof Symbol &&
                    'symbol' == typeof Symbol.iterator
                        ? (e.exports = r = function(e) {
                              return typeof e;
                          })
                        : (e.exports = r = function(e) {
                              return e &&
                                  'function' == typeof Symbol &&
                                  e.constructor === Symbol &&
                                  e !== Symbol.prototype
                                  ? 'symbol'
                                  : typeof e;
                          }),
                    r(t)
                );
            }
            e.exports = r;
        },
        function(e, t, r) {
            'use strict';
            const n = r(2);
            function o(e) {
                return encodeURIComponent(e)
                    .replace(/%3A/gi, ':')
                    .replace(/%24/g, '$')
                    .replace(/%2C/gi, ',')
                    .replace(/%20/g, '+')
                    .replace(/%5B/gi, '[')
                    .replace(/%5D/gi, ']');
            }
            e.exports = function(e, t, r) {
                if (!t) return e;
                let i;
                if (r) i = r(t);
                else if (n.isURLSearchParams(t)) i = t.toString();
                else {
                    const s = [];
                    n.forEach(t, function(e, t) {
                        null != e &&
                            (n.isArray(e) ? (t += '[]') : (e = [e]),
                            n.forEach(e, function(e) {
                                n.isDate(e)
                                    ? (e = e.toISOString())
                                    : n.isObject(e) && (e = JSON.stringify(e)),
                                    s.push(o(t) + '=' + o(e));
                            }));
                    }),
                        (i = s.join('&'));
                }
                if (i) {
                    const a = e.indexOf('#');
                    -1 !== a && (e = e.slice(0, a)),
                        (e += (-1 === e.indexOf('?') ? '?' : '&') + i);
                }
                return e;
            };
        },
        function(e, t, r) {
            'use strict';
            const n = r(20);
            e.exports = function(e, t, r, o, i) {
                const s = new Error(e);
                return n(s, t, r, o, i);
            };
        },
        function(e, t) {
            e.exports = function(e, t, r) {
                return (
                    t in e
                        ? Object.defineProperty(e, t, {
                              value: r,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0,
                          })
                        : (e[t] = r),
                    e
                );
            };
        },
        function(e) {
            e.exports = JSON.parse('{"a":"fyipe","b":"3.0.1"}');
        },
        function(e, t, r) {
            'use strict';
            e.exports = function(e, t) {
                return function() {
                    for (
                        var r = new Array(arguments.length), n = 0;
                        n < r.length;
                        n++
                    )
                        r[n] = arguments[n];
                    return e.apply(t, r);
                };
            };
        },
        function(e, t, r) {
            'use strict';
            e.exports = function(e) {
                return !(!e || !e.__CANCEL__);
            };
        },
        function(e, t, r) {
            'use strict';
            const n = r(2),
                o = r(37),
                i = { 'Content-Type': 'application/x-www-form-urlencoded' };
            function s(e, t) {
                !n.isUndefined(e) &&
                    n.isUndefined(e['Content-Type']) &&
                    (e['Content-Type'] = t);
            }
            let a,
                u = {
                    adapter:
                        ('undefined' != typeof XMLHttpRequest
                            ? (a = r(38))
                            : 'undefined' != typeof process &&
                              '[object process]' ===
                                  Object.prototype.toString.call(process) &&
                              (a = r(44)),
                        a),
                    transformRequest: [
                        function(e, t) {
                            return (
                                o(t, 'Accept'),
                                o(t, 'Content-Type'),
                                n.isFormData(e) ||
                                n.isArrayBuffer(e) ||
                                n.isBuffer(e) ||
                                n.isStream(e) ||
                                n.isFile(e) ||
                                n.isBlob(e)
                                    ? e
                                    : n.isArrayBufferView(e)
                                    ? e.buffer
                                    : n.isURLSearchParams(e)
                                    ? (s(
                                          t,
                                          'application/x-www-form-urlencoded;charset=utf-8'
                                      ),
                                      e.toString())
                                    : n.isObject(e)
                                    ? (s(t, 'application/json;charset=utf-8'),
                                      JSON.stringify(e))
                                    : e
                            );
                        },
                    ],
                    transformResponse: [
                        function(e) {
                            if ('string' == typeof e)
                                try {
                                    e = JSON.parse(e);
                                } catch (e) {}
                            return e;
                        },
                    ],
                    timeout: 0,
                    xsrfCookieName: 'XSRF-TOKEN',
                    xsrfHeaderName: 'X-XSRF-TOKEN',
                    maxContentLength: -1,
                    maxBodyLength: -1,
                    validateStatus: function(e) {
                        return e >= 200 && e < 300;
                    },
                };
            (u.headers = {
                common: { Accept: 'application/json, text/plain, */*' },
            }),
                n.forEach(['delete', 'get', 'head'], function(e) {
                    u.headers[e] = {};
                }),
                n.forEach(['post', 'put', 'patch'], function(e) {
                    u.headers[e] = n.merge(i);
                }),
                (e.exports = u);
        },
        function(e, t, r) {
            'use strict';
            const n = r(13);
            e.exports = function(e, t, r) {
                const o = r.config.validateStatus;
                r.status && o && !o(r.status)
                    ? t(
                          n(
                              'Request failed with status code ' + r.status,
                              r.config,
                              null,
                              r.request,
                              r
                          )
                      )
                    : e(r);
            };
        },
        function(e, t, r) {
            'use strict';
            e.exports = function(e, t, r, n, o) {
                return (
                    (e.config = t),
                    r && (e.code = r),
                    (e.request = n),
                    (e.response = o),
                    (e.isAxiosError = !0),
                    (e.toJSON = function() {
                        return {
                            message: this.message,
                            name: this.name,
                            description: this.description,
                            number: this.number,
                            fileName: this.fileName,
                            lineNumber: this.lineNumber,
                            columnNumber: this.columnNumber,
                            stack: this.stack,
                            config: this.config,
                            code: this.code,
                        };
                    }),
                    e
                );
            };
        },
        function(e, t, r) {
            'use strict';
            const n = r(40),
                o = r(41);
            e.exports = function(e, t) {
                return e && !n(t) ? o(e, t) : t;
            };
        },
        function(e, t, r) {
            const n = r(23),
                o = n.URL,
                i = r(7),
                s = r(8),
                a = r(45).Writable,
                u = r(46),
                c = r(47),
                f = Object.create(null);
            [
                'abort',
                'aborted',
                'connect',
                'error',
                'socket',
                'timeout',
            ].forEach(function(e) {
                f[e] = function(t, r, n) {
                    this._redirectable.emit(e, t, r, n);
                };
            });
            const l = E('ERR_FR_REDIRECTION_FAILURE', ''),
                p = E(
                    'ERR_FR_TOO_MANY_REDIRECTS',
                    'Maximum number of redirects exceeded'
                ),
                h = E(
                    'ERR_FR_MAX_BODY_LENGTH_EXCEEDED',
                    'Request body larger than maxBodyLength limit'
                ),
                d = E('ERR_STREAM_WRITE_AFTER_END', 'write after end');
            function m(e, t) {
                a.call(this),
                    this._sanitizeOptions(e),
                    (this._options = e),
                    (this._ended = !1),
                    (this._ending = !1),
                    (this._redirectCount = 0),
                    (this._redirects = []),
                    (this._requestBodyLength = 0),
                    (this._requestBodyBuffers = []),
                    t && this.on('response', t);
                const r = this;
                (this._onNativeResponse = function(e) {
                    r._processResponse(e);
                }),
                    this._performRequest();
            }
            function v(e, t) {
                clearTimeout(e._timeout),
                    (e._timeout = setTimeout(function() {
                        e.emit('timeout');
                    }, t));
            }
            function g() {
                clearTimeout(this._timeout);
            }
            function y(e) {
                const t = { maxRedirects: 21, maxBodyLength: 10485760 },
                    r = {};
                return (
                    Object.keys(e).forEach(function(i) {
                        const s = i + ':',
                            a = (r[s] = e[i]),
                            f = (t[i] = Object.create(a));
                        Object.defineProperties(f, {
                            request: {
                                value: function(e, i, a) {
                                    if ('string' == typeof e) {
                                        const f = e;
                                        try {
                                            e = w(new o(f));
                                        } catch (t) {
                                            e = n.parse(f);
                                        }
                                    } else
                                        o && e instanceof o
                                            ? (e = w(e))
                                            : ((a = i),
                                              (i = e),
                                              (e = { protocol: s }));
                                    return (
                                        'function' == typeof i &&
                                            ((a = i), (i = null)),
                                        ((i = Object.assign(
                                            {
                                                maxRedirects: t.maxRedirects,
                                                maxBodyLength: t.maxBodyLength,
                                            },
                                            e,
                                            i
                                        )).nativeProtocols = r),
                                        u.equal(
                                            i.protocol,
                                            s,
                                            'protocol mismatch'
                                        ),
                                        c('options', i),
                                        new m(i, a)
                                    );
                                },
                                configurable: !0,
                                enumerable: !0,
                                writable: !0,
                            },
                            get: {
                                value: function(e, t, r) {
                                    const n = f.request(e, t, r);
                                    return n.end(), n;
                                },
                                configurable: !0,
                                enumerable: !0,
                                writable: !0,
                            },
                        });
                    }),
                    t
                );
            }
            function b() {}
            function w(e) {
                const t = {
                    protocol: e.protocol,
                    hostname: e.hostname.startsWith('[')
                        ? e.hostname.slice(1, -1)
                        : e.hostname,
                    hash: e.hash,
                    search: e.search,
                    pathname: e.pathname,
                    path: e.pathname + e.search,
                    href: e.href,
                };
                return '' !== e.port && (t.port = Number(e.port)), t;
            }
            function x(e, t) {
                let r;
                for (const n in t) e.test(n) && ((r = t[n]), delete t[n]);
                return r;
            }
            function E(e, t) {
                function r(e) {
                    Error.captureStackTrace(this, this.constructor),
                        (this.message = e || t);
                }
                return (
                    (r.prototype = new Error()),
                    (r.prototype.constructor = r),
                    (r.prototype.name = 'Error [' + e + ']'),
                    (r.prototype.code = e),
                    r
                );
            }
            (m.prototype = Object.create(a.prototype)),
                (m.prototype.write = function(e, t, r) {
                    if (this._ending) throw new d();
                    if (
                        !(
                            'string' == typeof e ||
                            ('object' == typeof e && 'length' in e)
                        )
                    )
                        throw new TypeError(
                            'data should be a string, Buffer or Uint8Array'
                        );
                    'function' == typeof t && ((r = t), (t = null)),
                        0 !== e.length
                            ? this._requestBodyLength + e.length <=
                              this._options.maxBodyLength
                                ? ((this._requestBodyLength += e.length),
                                  this._requestBodyBuffers.push({
                                      data: e,
                                      encoding: t,
                                  }),
                                  this._currentRequest.write(e, t, r))
                                : (this.emit('error', new h()), this.abort())
                            : r && r();
                }),
                (m.prototype.end = function(e, t, r) {
                    if (
                        ('function' == typeof e
                            ? ((r = e), (e = t = null))
                            : 'function' == typeof t && ((r = t), (t = null)),
                        e)
                    ) {
                        const n = this,
                            o = this._currentRequest;
                        this.write(e, t, function() {
                            (n._ended = !0), o.end(null, null, r);
                        }),
                            (this._ending = !0);
                    } else
                        (this._ended = this._ending = !0),
                            this._currentRequest.end(null, null, r);
                }),
                (m.prototype.setHeader = function(e, t) {
                    (this._options.headers[e] = t),
                        this._currentRequest.setHeader(e, t);
                }),
                (m.prototype.removeHeader = function(e) {
                    delete this._options.headers[e],
                        this._currentRequest.removeHeader(e);
                }),
                (m.prototype.setTimeout = function(e, t) {
                    if ((t && this.once('timeout', t), this.socket)) v(this, e);
                    else {
                        const r = this;
                        this._currentRequest.once('socket', function() {
                            v(r, e);
                        });
                    }
                    return (
                        this.once('response', g), this.once('error', g), this
                    );
                }),
                [
                    'abort',
                    'flushHeaders',
                    'getHeader',
                    'setNoDelay',
                    'setSocketKeepAlive',
                ].forEach(function(e) {
                    m.prototype[e] = function(t, r) {
                        return this._currentRequest[e](t, r);
                    };
                }),
                ['aborted', 'connection', 'socket'].forEach(function(e) {
                    Object.defineProperty(m.prototype, e, {
                        get: function() {
                            return this._currentRequest[e];
                        },
                    });
                }),
                (m.prototype._sanitizeOptions = function(e) {
                    if (
                        (e.headers || (e.headers = {}),
                        e.host &&
                            (e.hostname || (e.hostname = e.host),
                            delete e.host),
                        !e.pathname && e.path)
                    ) {
                        const t = e.path.indexOf('?');
                        t < 0
                            ? (e.pathname = e.path)
                            : ((e.pathname = e.path.substring(0, t)),
                              (e.search = e.path.substring(t)));
                    }
                }),
                (m.prototype._performRequest = function() {
                    const e = this._options.protocol,
                        t = this._options.nativeProtocols[e];
                    if (t) {
                        if (this._options.agents) {
                            const r = e.substr(0, e.length - 1);
                            this._options.agent = this._options.agents[r];
                        }
                        const o = (this._currentRequest = t.request(
                            this._options,
                            this._onNativeResponse
                        ));
                        for (const i in ((this._currentUrl = n.format(
                            this._options
                        )),
                        (o._redirectable = this),
                        f))
                            i && o.on(i, f[i]);
                        if (this._isRedirect) {
                            let s = 0,
                                a = this,
                                u = this._requestBodyBuffers;
                            !(function e(t) {
                                if (o === a._currentRequest)
                                    if (t) a.emit('error', t);
                                    else if (s < u.length) {
                                        const r = u[s++];
                                        o.finished ||
                                            o.write(r.data, r.encoding, e);
                                    } else a._ended && o.end();
                            })();
                        }
                    } else
                        this.emit(
                            'error',
                            new TypeError('Unsupported protocol ' + e)
                        );
                }),
                (m.prototype._processResponse = function(e) {
                    const t = e.statusCode;
                    this._options.trackRedirects &&
                        this._redirects.push({
                            url: this._currentUrl,
                            headers: e.headers,
                            statusCode: t,
                        });
                    const r = e.headers.location;
                    if (
                        r &&
                        !1 !== this._options.followRedirects &&
                        t >= 300 &&
                        t < 400
                    ) {
                        if (
                            (this._currentRequest.removeAllListeners(),
                            this._currentRequest.on('error', b),
                            this._currentRequest.abort(),
                            e.destroy(),
                            ++this._redirectCount > this._options.maxRedirects)
                        )
                            return void this.emit('error', new p());
                        (((301 === t || 302 === t) &&
                            'POST' === this._options.method) ||
                            (303 === t &&
                                !/^(?:GET|HEAD)$/.test(
                                    this._options.method
                                ))) &&
                            ((this._options.method = 'GET'),
                            (this._requestBodyBuffers = []),
                            x(/^content-/i, this._options.headers));
                        const o =
                                x(/^host$/i, this._options.headers) ||
                                n.parse(this._currentUrl).hostname,
                            i = n.resolve(this._currentUrl, r);
                        c('redirecting to', i), (this._isRedirect = !0);
                        const s = n.parse(i);
                        if (
                            (Object.assign(this._options, s),
                            s.hostname !== o &&
                                x(/^authorization$/i, this._options.headers),
                            'function' == typeof this._options.beforeRedirect)
                        ) {
                            const a = { headers: e.headers };
                            try {
                                this._options.beforeRedirect.call(
                                    null,
                                    this._options,
                                    a
                                );
                            } catch (e) {
                                return void this.emit('error', e);
                            }
                            this._sanitizeOptions(this._options);
                        }
                        try {
                            this._performRequest();
                        } catch (e) {
                            const u = new l(
                                'Redirected request failed: ' + e.message
                            );
                            (u.cause = e), this.emit('error', u);
                        }
                    } else
                        (e.responseUrl = this._currentUrl),
                            (e.redirects = this._redirects),
                            this.emit('response', e),
                            (this._requestBodyBuffers = []);
                }),
                (e.exports = y({ http: i, https: s })),
                (e.exports.wrap = y);
        },
        function(e, t) {
            e.exports = require('url');
        },
        function(e, t, r) {
            e.exports = function(e) {
                function t(e) {
                    let t = 0;
                    for (let r = 0; r < e.length; r++)
                        (t = (t << 5) - t + e.charCodeAt(r)), (t |= 0);
                    return n.colors[Math.abs(t) % n.colors.length];
                }
                function n(e) {
                    let r;
                    function s(...e) {
                        if (!s.enabled) return;
                        const t = s,
                            o = Number(new Date()),
                            i = o - (r || o);
                        (t.diff = i),
                            (t.prev = r),
                            (t.curr = o),
                            (r = o),
                            (e[0] = n.coerce(e[0])),
                            'string' != typeof e[0] && e.unshift('%O');
                        let a = 0;
                        (e[0] = e[0].replace(/%([a-zA-Z%])/g, (r, o) => {
                            if ('%%' === r) return r;
                            a++;
                            const i = n.formatters[o];
                            if ('function' == typeof i) {
                                const n = e[a];
                                (r = i.call(t, n)), e.splice(a, 1), a--;
                            }
                            return r;
                        })),
                            n.formatArgs.call(t, e);
                        (t.log || n.log).apply(t, e);
                    }
                    return (
                        (s.namespace = e),
                        (s.enabled = n.enabled(e)),
                        (s.useColors = n.useColors()),
                        (s.color = t(e)),
                        (s.destroy = o),
                        (s.extend = i),
                        'function' == typeof n.init && n.init(s),
                        n.instances.push(s),
                        s
                    );
                }
                function o() {
                    const e = n.instances.indexOf(this);
                    return -1 !== e && (n.instances.splice(e, 1), !0);
                }
                function i(e, t) {
                    const r = n(this.namespace + (void 0 === t ? ':' : t) + e);
                    return (r.log = this.log), r;
                }
                function s(e) {
                    return e
                        .toString()
                        .substring(2, e.toString().length - 2)
                        .replace(/\.\*\?$/, '*');
                }
                return (
                    (n.debug = n),
                    (n.default = n),
                    (n.coerce = function(e) {
                        if (e instanceof Error) return e.stack || e.message;
                        return e;
                    }),
                    (n.disable = function() {
                        const e = [
                            ...n.names.map(s),
                            ...n.skips.map(s).map(e => '-' + e),
                        ].join(',');
                        return n.enable(''), e;
                    }),
                    (n.enable = function(e) {
                        let t;
                        n.save(e), (n.names = []), (n.skips = []);
                        const r = ('string' == typeof e ? e : '').split(
                                /[\s,]+/
                            ),
                            o = r.length;
                        for (t = 0; t < o; t++)
                            r[t] &&
                                ('-' === (e = r[t].replace(/\*/g, '.*?'))[0]
                                    ? n.skips.push(
                                          new RegExp('^' + e.substr(1) + '$')
                                      )
                                    : n.names.push(new RegExp('^' + e + '$')));
                        for (t = 0; t < n.instances.length; t++) {
                            const e = n.instances[t];
                            e.enabled = n.enabled(e.namespace);
                        }
                    }),
                    (n.enabled = function(e) {
                        if ('*' === e[e.length - 1]) return !0;
                        let t, r;
                        for (t = 0, r = n.skips.length; t < r; t++)
                            if (n.skips[t].test(e)) return !1;
                        for (t = 0, r = n.names.length; t < r; t++)
                            if (n.names[t].test(e)) return !0;
                        return !1;
                    }),
                    (n.humanize = r(50)),
                    Object.keys(e).forEach(t => {
                        n[t] = e[t];
                    }),
                    (n.instances = []),
                    (n.names = []),
                    (n.skips = []),
                    (n.formatters = {}),
                    (n.selectColor = t),
                    n.enable(n.load()),
                    n
                );
            };
        },
        function(e, t, r) {
            'use strict';
            const n = r(2);
            e.exports = function(e, t) {
                t = t || {};
                const r = {},
                    o = ['url', 'method', 'data'],
                    i = ['headers', 'auth', 'proxy', 'params'],
                    s = [
                        'baseURL',
                        'transformRequest',
                        'transformResponse',
                        'paramsSerializer',
                        'timeout',
                        'timeoutMessage',
                        'withCredentials',
                        'adapter',
                        'responseType',
                        'xsrfCookieName',
                        'xsrfHeaderName',
                        'onUploadProgress',
                        'onDownloadProgress',
                        'decompress',
                        'maxContentLength',
                        'maxBodyLength',
                        'maxRedirects',
                        'transport',
                        'httpAgent',
                        'httpsAgent',
                        'cancelToken',
                        'socketPath',
                        'responseEncoding',
                    ],
                    a = ['validateStatus'];
                function u(e, t) {
                    return n.isPlainObject(e) && n.isPlainObject(t)
                        ? n.merge(e, t)
                        : n.isPlainObject(t)
                        ? n.merge({}, t)
                        : n.isArray(t)
                        ? t.slice()
                        : t;
                }
                function c(o) {
                    n.isUndefined(t[o])
                        ? n.isUndefined(e[o]) || (r[o] = u(void 0, e[o]))
                        : (r[o] = u(e[o], t[o]));
                }
                n.forEach(o, function(e) {
                    n.isUndefined(t[e]) || (r[e] = u(void 0, t[e]));
                }),
                    n.forEach(i, c),
                    n.forEach(s, function(o) {
                        n.isUndefined(t[o])
                            ? n.isUndefined(e[o]) || (r[o] = u(void 0, e[o]))
                            : (r[o] = u(void 0, t[o]));
                    }),
                    n.forEach(a, function(n) {
                        n in t
                            ? (r[n] = u(e[n], t[n]))
                            : n in e && (r[n] = u(void 0, e[n]));
                    });
                const f = o
                        .concat(i)
                        .concat(s)
                        .concat(a),
                    l = Object.keys(e)
                        .concat(Object.keys(t))
                        .filter(function(e) {
                            return -1 === f.indexOf(e);
                        });
                return n.forEach(l, c), r;
            };
        },
        function(e, t, r) {
            'use strict';
            function n(e) {
                this.message = e;
            }
            (n.prototype.toString = function() {
                return 'Cancel' + (this.message ? ': ' + this.message : '');
            }),
                (n.prototype.__CANCEL__ = !0),
                (e.exports = n);
        },
        function(e, t) {
            e.exports = function(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
                return n;
            };
        },
        function(e, t, r) {
            const n = r(27);
            e.exports = function(e, t) {
                if (e) {
                    if ('string' == typeof e) return n(e, t);
                    let r = Object.prototype.toString.call(e).slice(8, -1);
                    return (
                        'Object' === r &&
                            e.constructor &&
                            (r = e.constructor.name),
                        'Map' === r || 'Set' === r
                            ? Array.from(e)
                            : 'Arguments' === r ||
                              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                            ? n(e, t)
                            : void 0
                    );
                }
            };
        },
        function(e, t, r) {
            const n = r(62),
                o = r(63),
                i = r(28),
                s = r(64);
            e.exports = function(e) {
                return n(e) || o(e) || i(e) || s();
            };
        },
        function(e, t) {
            e.exports = require('crypto');
        },
        function(e, t, r) {
            const n = (function(e) {
                'use strict';
                const t = Object.prototype,
                    r = t.hasOwnProperty,
                    n = 'function' == typeof Symbol ? Symbol : {},
                    o = n.iterator || '@@iterator',
                    i = n.asyncIterator || '@@asyncIterator',
                    s = n.toStringTag || '@@toStringTag';
                function a(e, t, r) {
                    return (
                        Object.defineProperty(e, t, {
                            value: r,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                        }),
                        e[t]
                    );
                }
                try {
                    a({}, '');
                } catch (e) {
                    a = function(e, t, r) {
                        return (e[t] = r);
                    };
                }
                function u(e, t, r, n) {
                    const o = t && t.prototype instanceof l ? t : l,
                        i = Object.create(o.prototype),
                        s = new _(n || []);
                    return (
                        (i._invoke = (function(e, t, r) {
                            let n = 'suspendedStart';
                            return function(o, i) {
                                if ('executing' === n)
                                    throw new Error(
                                        'Generator is already running'
                                    );
                                if ('completed' === n) {
                                    if ('throw' === o) throw i;
                                    return k();
                                }
                                for (r.method = o, r.arg = i; ; ) {
                                    const s = r.delegate;
                                    if (s) {
                                        const a = w(s, r);
                                        if (a) {
                                            if (a === f) continue;
                                            return a;
                                        }
                                    }
                                    if ('next' === r.method)
                                        r.sent = r._sent = r.arg;
                                    else if ('throw' === r.method) {
                                        if ('suspendedStart' === n)
                                            throw ((n = 'completed'), r.arg);
                                        r.dispatchException(r.arg);
                                    } else
                                        'return' === r.method &&
                                            r.abrupt('return', r.arg);
                                    n = 'executing';
                                    const u = c(e, t, r);
                                    if ('normal' === u.type) {
                                        if (
                                            ((n = r.done
                                                ? 'completed'
                                                : 'suspendedYield'),
                                            u.arg === f)
                                        )
                                            continue;
                                        return { value: u.arg, done: r.done };
                                    }
                                    'throw' === u.type &&
                                        ((n = 'completed'),
                                        (r.method = 'throw'),
                                        (r.arg = u.arg));
                                }
                            };
                        })(e, r, s)),
                        i
                    );
                }
                function c(e, t, r) {
                    try {
                        return { type: 'normal', arg: e.call(t, r) };
                    } catch (e) {
                        return { type: 'throw', arg: e };
                    }
                }
                e.wrap = u;
                var f = {};
                function l() {}
                function p() {}
                function h() {}
                let d = {};
                d[o] = function() {
                    return this;
                };
                const m = Object.getPrototypeOf,
                    v = m && m(m(C([])));
                v && v !== t && r.call(v, o) && (d = v);
                const g = (h.prototype = l.prototype = Object.create(d));
                function y(e) {
                    ['next', 'throw', 'return'].forEach(function(t) {
                        a(e, t, function(e) {
                            return this._invoke(t, e);
                        });
                    });
                }
                function b(e, t) {
                    let n;
                    this._invoke = function(o, i) {
                        function s() {
                            return new t(function(n, s) {
                                !(function n(o, i, s, a) {
                                    const u = c(e[o], e, i);
                                    if ('throw' !== u.type) {
                                        const f = u.arg,
                                            l = f.value;
                                        return l &&
                                            'object' == typeof l &&
                                            r.call(l, '__await')
                                            ? t.resolve(l.__await).then(
                                                  function(e) {
                                                      n('next', e, s, a);
                                                  },
                                                  function(e) {
                                                      n('throw', e, s, a);
                                                  }
                                              )
                                            : t.resolve(l).then(
                                                  function(e) {
                                                      (f.value = e), s(f);
                                                  },
                                                  function(e) {
                                                      return n(
                                                          'throw',
                                                          e,
                                                          s,
                                                          a
                                                      );
                                                  }
                                              );
                                    }
                                    a(u.arg);
                                })(o, i, n, s);
                            });
                        }
                        return (n = n ? n.then(s, s) : s());
                    };
                }
                function w(e, t) {
                    const r = e.iterator[t.method];
                    if (void 0 === r) {
                        if (((t.delegate = null), 'throw' === t.method)) {
                            if (
                                e.iterator.return &&
                                ((t.method = 'return'),
                                (t.arg = void 0),
                                w(e, t),
                                'throw' === t.method)
                            )
                                return f;
                            (t.method = 'throw'),
                                (t.arg = new TypeError(
                                    "The iterator does not provide a 'throw' method"
                                ));
                        }
                        return f;
                    }
                    const n = c(r, e.iterator, t.arg);
                    if ('throw' === n.type)
                        return (
                            (t.method = 'throw'),
                            (t.arg = n.arg),
                            (t.delegate = null),
                            f
                        );
                    const o = n.arg;
                    return o
                        ? o.done
                            ? ((t[e.resultName] = o.value),
                              (t.next = e.nextLoc),
                              'return' !== t.method &&
                                  ((t.method = 'next'), (t.arg = void 0)),
                              (t.delegate = null),
                              f)
                            : o
                        : ((t.method = 'throw'),
                          (t.arg = new TypeError(
                              'iterator result is not an object'
                          )),
                          (t.delegate = null),
                          f);
                }
                function x(e) {
                    const t = { tryLoc: e[0] };
                    1 in e && (t.catchLoc = e[1]),
                        2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
                        this.tryEntries.push(t);
                }
                function E(e) {
                    const t = e.completion || {};
                    (t.type = 'normal'), delete t.arg, (e.completion = t);
                }
                function _(e) {
                    (this.tryEntries = [{ tryLoc: 'root' }]),
                        e.forEach(x, this),
                        this.reset(!0);
                }
                function C(e) {
                    if (e) {
                        const t = e[o];
                        if (t) return t.call(e);
                        if ('function' == typeof e.next) return e;
                        if (!isNaN(e.length)) {
                            let n = -1,
                                i = function t() {
                                    for (; ++n < e.length; )
                                        if (r.call(e, n))
                                            return (
                                                (t.value = e[n]),
                                                (t.done = !1),
                                                t
                                            );
                                    return (t.value = void 0), (t.done = !0), t;
                                };
                            return (i.next = i);
                        }
                    }
                    return { next: k };
                }
                function k() {
                    return { value: void 0, done: !0 };
                }
                return (
                    (p.prototype = g.constructor = h),
                    (h.constructor = p),
                    (p.displayName = a(h, s, 'GeneratorFunction')),
                    (e.isGeneratorFunction = function(e) {
                        const t = 'function' == typeof e && e.constructor;
                        return (
                            !!t &&
                            (t === p ||
                                'GeneratorFunction' ===
                                    (t.displayName || t.name))
                        );
                    }),
                    (e.mark = function(e) {
                        return (
                            Object.setPrototypeOf
                                ? Object.setPrototypeOf(e, h)
                                : ((e.__proto__ = h),
                                  a(e, s, 'GeneratorFunction')),
                            (e.prototype = Object.create(g)),
                            e
                        );
                    }),
                    (e.awrap = function(e) {
                        return { __await: e };
                    }),
                    y(b.prototype),
                    (b.prototype[i] = function() {
                        return this;
                    }),
                    (e.AsyncIterator = b),
                    (e.async = function(t, r, n, o, i) {
                        void 0 === i && (i = Promise);
                        const s = new b(u(t, r, n, o), i);
                        return e.isGeneratorFunction(r)
                            ? s
                            : s.next().then(function(e) {
                                  return e.done ? e.value : s.next();
                              });
                    }),
                    y(g),
                    a(g, s, 'Generator'),
                    (g[o] = function() {
                        return this;
                    }),
                    (g.toString = function() {
                        return '[object Generator]';
                    }),
                    (e.keys = function(e) {
                        const t = [];
                        for (const r in e) t.push(r);
                        return (
                            t.reverse(),
                            function r() {
                                for (; t.length; ) {
                                    const n = t.pop();
                                    if (n in e)
                                        return (r.value = n), (r.done = !1), r;
                                }
                                return (r.done = !0), r;
                            }
                        );
                    }),
                    (e.values = C),
                    (_.prototype = {
                        constructor: _,
                        reset: function(e) {
                            if (
                                ((this.prev = 0),
                                (this.next = 0),
                                (this.sent = this._sent = void 0),
                                (this.done = !1),
                                (this.delegate = null),
                                (this.method = 'next'),
                                (this.arg = void 0),
                                this.tryEntries.forEach(E),
                                !e)
                            )
                                for (const t in this)
                                    't' === t.charAt(0) &&
                                        r.call(this, t) &&
                                        !isNaN(+t.slice(1)) &&
                                        (this[t] = void 0);
                        },
                        stop: function() {
                            this.done = !0;
                            const e = this.tryEntries[0].completion;
                            if ('throw' === e.type) throw e.arg;
                            return this.rval;
                        },
                        dispatchException: function(e) {
                            if (this.done) throw e;
                            const t = this;
                            function n(r, n) {
                                return (
                                    (s.type = 'throw'),
                                    (s.arg = e),
                                    (t.next = r),
                                    n &&
                                        ((t.method = 'next'), (t.arg = void 0)),
                                    !!n
                                );
                            }
                            for (
                                let o = this.tryEntries.length - 1;
                                o >= 0;
                                --o
                            ) {
                                var i = this.tryEntries[o],
                                    s = i.completion;
                                if ('root' === i.tryLoc) return n('end');
                                if (i.tryLoc <= this.prev) {
                                    const a = r.call(i, 'catchLoc'),
                                        u = r.call(i, 'finallyLoc');
                                    if (a && u) {
                                        if (this.prev < i.catchLoc)
                                            return n(i.catchLoc, !0);
                                        if (this.prev < i.finallyLoc)
                                            return n(i.finallyLoc);
                                    } else if (a) {
                                        if (this.prev < i.catchLoc)
                                            return n(i.catchLoc, !0);
                                    } else {
                                        if (!u)
                                            throw new Error(
                                                'try statement without catch or finally'
                                            );
                                        if (this.prev < i.finallyLoc)
                                            return n(i.finallyLoc);
                                    }
                                }
                            }
                        },
                        abrupt: function(e, t) {
                            for (
                                let n = this.tryEntries.length - 1;
                                n >= 0;
                                --n
                            ) {
                                const o = this.tryEntries[n];
                                if (
                                    o.tryLoc <= this.prev &&
                                    r.call(o, 'finallyLoc') &&
                                    this.prev < o.finallyLoc
                                ) {
                                    var i = o;
                                    break;
                                }
                            }
                            i &&
                                ('break' === e || 'continue' === e) &&
                                i.tryLoc <= t &&
                                t <= i.finallyLoc &&
                                (i = null);
                            const s = i ? i.completion : {};
                            return (
                                (s.type = e),
                                (s.arg = t),
                                i
                                    ? ((this.method = 'next'),
                                      (this.next = i.finallyLoc),
                                      f)
                                    : this.complete(s)
                            );
                        },
                        complete: function(e, t) {
                            if ('throw' === e.type) throw e.arg;
                            return (
                                'break' === e.type || 'continue' === e.type
                                    ? (this.next = e.arg)
                                    : 'return' === e.type
                                    ? ((this.rval = this.arg = e.arg),
                                      (this.method = 'return'),
                                      (this.next = 'end'))
                                    : 'normal' === e.type &&
                                      t &&
                                      (this.next = t),
                                f
                            );
                        },
                        finish: function(e) {
                            for (
                                let t = this.tryEntries.length - 1;
                                t >= 0;
                                --t
                            ) {
                                const r = this.tryEntries[t];
                                if (r.finallyLoc === e)
                                    return (
                                        this.complete(r.completion, r.afterLoc),
                                        E(r),
                                        f
                                    );
                            }
                        },
                        catch: function(e) {
                            for (
                                let t = this.tryEntries.length - 1;
                                t >= 0;
                                --t
                            ) {
                                const r = this.tryEntries[t];
                                if (r.tryLoc === e) {
                                    const n = r.completion;
                                    if ('throw' === n.type) {
                                        var o = n.arg;
                                        E(r);
                                    }
                                    return o;
                                }
                            }
                            throw new Error('illegal catch attempt');
                        },
                        delegateYield: function(e, t, r) {
                            return (
                                (this.delegate = {
                                    iterator: C(e),
                                    resultName: t,
                                    nextLoc: r,
                                }),
                                'next' === this.method && (this.arg = void 0),
                                f
                            );
                        },
                    }),
                    e
                );
            })(e.exports);
            try {
                regeneratorRuntime = n;
            } catch (e) {
                Function('r', 'regeneratorRuntime = r')(n);
            }
        },
        function(e, t, r) {
            'use strict';
            const n = r(2),
                o = r(16),
                i = r(33),
                s = r(25);
            function a(e) {
                const t = new i(e),
                    r = o(i.prototype.request, t);
                return n.extend(r, i.prototype, t), n.extend(r, t), r;
            }
            const u = a(r(18));
            (u.Axios = i),
                (u.create = function(e) {
                    return a(s(u.defaults, e));
                }),
                (u.Cancel = r(26)),
                (u.CancelToken = r(59)),
                (u.isCancel = r(17)),
                (u.all = function(e) {
                    return Promise.all(e);
                }),
                (u.spread = r(60)),
                (u.isAxiosError = r(61)),
                (e.exports = u),
                (e.exports.default = u);
        },
        function(e, t, r) {
            'use strict';
            const n = r(2),
                o = r(12),
                i = r(34),
                s = r(35),
                a = r(25);
            function u(e) {
                (this.defaults = e),
                    (this.interceptors = {
                        request: new i(),
                        response: new i(),
                    });
            }
            (u.prototype.request = function(e) {
                'string' == typeof e
                    ? ((e = arguments[1] || {}).url = arguments[0])
                    : (e = e || {}),
                    (e = a(this.defaults, e)).method
                        ? (e.method = e.method.toLowerCase())
                        : this.defaults.method
                        ? (e.method = this.defaults.method.toLowerCase())
                        : (e.method = 'get');
                let t = [s, void 0],
                    r = Promise.resolve(e);
                for (
                    this.interceptors.request.forEach(function(e) {
                        t.unshift(e.fulfilled, e.rejected);
                    }),
                        this.interceptors.response.forEach(function(e) {
                            t.push(e.fulfilled, e.rejected);
                        });
                    t.length;

                )
                    r = r.then(t.shift(), t.shift());
                return r;
            }),
                (u.prototype.getUri = function(e) {
                    return (
                        (e = a(this.defaults, e)),
                        o(e.url, e.params, e.paramsSerializer).replace(
                            /^\?/,
                            ''
                        )
                    );
                }),
                n.forEach(['delete', 'get', 'head', 'options'], function(e) {
                    u.prototype[e] = function(t, r) {
                        return this.request(
                            a(r || {}, {
                                method: e,
                                url: t,
                                data: (r || {}).data,
                            })
                        );
                    };
                }),
                n.forEach(['post', 'put', 'patch'], function(e) {
                    u.prototype[e] = function(t, r, n) {
                        return this.request(
                            a(n || {}, { method: e, url: t, data: r })
                        );
                    };
                }),
                (e.exports = u);
        },
        function(e, t, r) {
            'use strict';
            const n = r(2);
            function o() {
                this.handlers = [];
            }
            (o.prototype.use = function(e, t) {
                return (
                    this.handlers.push({ fulfilled: e, rejected: t }),
                    this.handlers.length - 1
                );
            }),
                (o.prototype.eject = function(e) {
                    this.handlers[e] && (this.handlers[e] = null);
                }),
                (o.prototype.forEach = function(e) {
                    n.forEach(this.handlers, function(t) {
                        null !== t && e(t);
                    });
                }),
                (e.exports = o);
        },
        function(e, t, r) {
            'use strict';
            const n = r(2),
                o = r(36),
                i = r(17),
                s = r(18);
            function a(e) {
                e.cancelToken && e.cancelToken.throwIfRequested();
            }
            e.exports = function(e) {
                return (
                    a(e),
                    (e.headers = e.headers || {}),
                    (e.data = o(e.data, e.headers, e.transformRequest)),
                    (e.headers = n.merge(
                        e.headers.common || {},
                        e.headers[e.method] || {},
                        e.headers
                    )),
                    n.forEach(
                        [
                            'delete',
                            'get',
                            'head',
                            'post',
                            'put',
                            'patch',
                            'common',
                        ],
                        function(t) {
                            delete e.headers[t];
                        }
                    ),
                    (e.adapter || s.adapter)(e).then(
                        function(t) {
                            return (
                                a(e),
                                (t.data = o(
                                    t.data,
                                    t.headers,
                                    e.transformResponse
                                )),
                                t
                            );
                        },
                        function(t) {
                            return (
                                i(t) ||
                                    (a(e),
                                    t &&
                                        t.response &&
                                        (t.response.data = o(
                                            t.response.data,
                                            t.response.headers,
                                            e.transformResponse
                                        ))),
                                Promise.reject(t)
                            );
                        }
                    )
                );
            };
        },
        function(e, t, r) {
            'use strict';
            const n = r(2);
            e.exports = function(e, t, r) {
                return (
                    n.forEach(r, function(r) {
                        e = r(e, t);
                    }),
                    e
                );
            };
        },
        function(e, t, r) {
            'use strict';
            const n = r(2);
            e.exports = function(e, t) {
                n.forEach(e, function(r, n) {
                    n !== t &&
                        n.toUpperCase() === t.toUpperCase() &&
                        ((e[t] = r), delete e[n]);
                });
            };
        },
        function(e, t, r) {
            'use strict';
            const n = r(2),
                o = r(19),
                i = r(39),
                s = r(12),
                a = r(21),
                u = r(42),
                c = r(43),
                f = r(13);
            e.exports = function(e) {
                return new Promise(function(t, r) {
                    let l = e.data,
                        p = e.headers;
                    n.isFormData(l) && delete p['Content-Type'];
                    let h = new XMLHttpRequest();
                    if (e.auth) {
                        const d = e.auth.username || '',
                            m = e.auth.password
                                ? unescape(encodeURIComponent(e.auth.password))
                                : '';
                        p.Authorization = 'Basic ' + btoa(d + ':' + m);
                    }
                    const v = a(e.baseURL, e.url);
                    if (
                        (h.open(
                            e.method.toUpperCase(),
                            s(v, e.params, e.paramsSerializer),
                            !0
                        ),
                        (h.timeout = e.timeout),
                        (h.onreadystatechange = function() {
                            if (
                                h &&
                                4 === h.readyState &&
                                (0 !== h.status ||
                                    (h.responseURL &&
                                        0 === h.responseURL.indexOf('file:')))
                            ) {
                                const n =
                                        'getAllResponseHeaders' in h
                                            ? u(h.getAllResponseHeaders())
                                            : null,
                                    i = {
                                        data:
                                            e.responseType &&
                                            'text' !== e.responseType
                                                ? h.response
                                                : h.responseText,
                                        status: h.status,
                                        statusText: h.statusText,
                                        headers: n,
                                        config: e,
                                        request: h,
                                    };
                                o(t, r, i), (h = null);
                            }
                        }),
                        (h.onabort = function() {
                            h &&
                                (r(f('Request aborted', e, 'ECONNABORTED', h)),
                                (h = null));
                        }),
                        (h.onerror = function() {
                            r(f('Network Error', e, null, h)), (h = null);
                        }),
                        (h.ontimeout = function() {
                            let t = 'timeout of ' + e.timeout + 'ms exceeded';
                            e.timeoutErrorMessage &&
                                (t = e.timeoutErrorMessage),
                                r(f(t, e, 'ECONNABORTED', h)),
                                (h = null);
                        }),
                        n.isStandardBrowserEnv())
                    ) {
                        const g =
                            (e.withCredentials || c(v)) && e.xsrfCookieName
                                ? i.read(e.xsrfCookieName)
                                : void 0;
                        g && (p[e.xsrfHeaderName] = g);
                    }
                    if (
                        ('setRequestHeader' in h &&
                            n.forEach(p, function(e, t) {
                                void 0 === l &&
                                'content-type' === t.toLowerCase()
                                    ? delete p[t]
                                    : h.setRequestHeader(t, e);
                            }),
                        n.isUndefined(e.withCredentials) ||
                            (h.withCredentials = !!e.withCredentials),
                        e.responseType)
                    )
                        try {
                            h.responseType = e.responseType;
                        } catch (t) {
                            if ('json' !== e.responseType) throw t;
                        }
                    'function' == typeof e.onDownloadProgress &&
                        h.addEventListener('progress', e.onDownloadProgress),
                        'function' == typeof e.onUploadProgress &&
                            h.upload &&
                            h.upload.addEventListener(
                                'progress',
                                e.onUploadProgress
                            ),
                        e.cancelToken &&
                            e.cancelToken.promise.then(function(e) {
                                h && (h.abort(), r(e), (h = null));
                            }),
                        l || (l = null),
                        h.send(l);
                });
            };
        },
        function(e, t, r) {
            'use strict';
            const n = r(2);
            e.exports = n.isStandardBrowserEnv()
                ? {
                      write: function(e, t, r, o, i, s) {
                          const a = [];
                          a.push(e + '=' + encodeURIComponent(t)),
                              n.isNumber(r) &&
                                  a.push(
                                      'expires=' + new Date(r).toGMTString()
                                  ),
                              n.isString(o) && a.push('path=' + o),
                              n.isString(i) && a.push('domain=' + i),
                              !0 === s && a.push('secure'),
                              (document.cookie = a.join('; '));
                      },
                      read: function(e) {
                          const t = document.cookie.match(
                              new RegExp('(^|;\\s*)(' + e + ')=([^;]*)')
                          );
                          return t ? decodeURIComponent(t[3]) : null;
                      },
                      remove: function(e) {
                          this.write(e, '', Date.now() - 864e5);
                      },
                  }
                : {
                      write: function() {},
                      read: function() {
                          return null;
                      },
                      remove: function() {},
                  };
        },
        function(e, t, r) {
            'use strict';
            e.exports = function(e) {
                return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
            };
        },
        function(e, t, r) {
            'use strict';
            e.exports = function(e, t) {
                return t
                    ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '')
                    : e;
            };
        },
        function(e, t, r) {
            'use strict';
            const n = r(2),
                o = [
                    'age',
                    'authorization',
                    'content-length',
                    'content-type',
                    'etag',
                    'expires',
                    'from',
                    'host',
                    'if-modified-since',
                    'if-unmodified-since',
                    'last-modified',
                    'location',
                    'max-forwards',
                    'proxy-authorization',
                    'referer',
                    'retry-after',
                    'user-agent',
                ];
            e.exports = function(e) {
                let t,
                    r,
                    i,
                    s = {};
                return e
                    ? (n.forEach(e.split('\n'), function(e) {
                          if (
                              ((i = e.indexOf(':')),
                              (t = n.trim(e.substr(0, i)).toLowerCase()),
                              (r = n.trim(e.substr(i + 1))),
                              t)
                          ) {
                              if (s[t] && o.indexOf(t) >= 0) return;
                              s[t] =
                                  'set-cookie' === t
                                      ? (s[t] ? s[t] : []).concat([r])
                                      : s[t]
                                      ? s[t] + ', ' + r
                                      : r;
                          }
                      }),
                      s)
                    : s;
            };
        },
        function(e, t, r) {
            'use strict';
            const n = r(2);
            e.exports = n.isStandardBrowserEnv()
                ? (function() {
                      let e,
                          t = /(msie|trident)/i.test(navigator.userAgent),
                          r = document.createElement('a');
                      function o(e) {
                          let n = e;
                          return (
                              t && (r.setAttribute('href', n), (n = r.href)),
                              r.setAttribute('href', n),
                              {
                                  href: r.href,
                                  protocol: r.protocol
                                      ? r.protocol.replace(/:$/, '')
                                      : '',
                                  host: r.host,
                                  search: r.search
                                      ? r.search.replace(/^\?/, '')
                                      : '',
                                  hash: r.hash ? r.hash.replace(/^#/, '') : '',
                                  hostname: r.hostname,
                                  port: r.port,
                                  pathname:
                                      '/' === r.pathname.charAt(0)
                                          ? r.pathname
                                          : '/' + r.pathname,
                              }
                          );
                      }
                      return (
                          (e = o(window.location.href)),
                          function(t) {
                              const r = n.isString(t) ? o(t) : t;
                              return (
                                  r.protocol === e.protocol && r.host === e.host
                              );
                          }
                      );
                  })()
                : function() {
                      return !0;
                  };
        },
        function(e, t, r) {
            'use strict';
            const n = r(2),
                o = r(19),
                i = r(21),
                s = r(12),
                a = r(7),
                u = r(8),
                c = r(22).http,
                f = r(22).https,
                l = r(23),
                p = r(57),
                h = r(58),
                d = r(13),
                m = r(20),
                v = /https:?/;
            e.exports = function(e) {
                return new Promise(function(t, r) {
                    let g = function(e) {
                            t(e);
                        },
                        y = function(e) {
                            r(e);
                        },
                        b = e.data,
                        w = e.headers;
                    if (
                        (w['User-Agent'] ||
                            w['user-agent'] ||
                            (w['User-Agent'] = 'axios/' + h.version),
                        b && !n.isStream(b))
                    ) {
                        if (Buffer.isBuffer(b));
                        else if (n.isArrayBuffer(b))
                            b = Buffer.from(new Uint8Array(b));
                        else {
                            if (!n.isString(b))
                                return y(
                                    d(
                                        'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
                                        e
                                    )
                                );
                            b = Buffer.from(b, 'utf-8');
                        }
                        w['Content-Length'] = b.length;
                    }
                    let x = void 0;
                    e.auth &&
                        (x =
                            (e.auth.username || '') +
                            ':' +
                            (e.auth.password || ''));
                    const E = i(e.baseURL, e.url),
                        _ = l.parse(E),
                        C = _.protocol || 'http:';
                    if (!x && _.auth) {
                        const k = _.auth.split(':');
                        x = (k[0] || '') + ':' + (k[1] || '');
                    }
                    x && delete w.Authorization;
                    const O = v.test(C),
                        T = O ? e.httpsAgent : e.httpAgent,
                        R = {
                            path: s(
                                _.path,
                                e.params,
                                e.paramsSerializer
                            ).replace(/^\?/, ''),
                            method: e.method.toUpperCase(),
                            headers: w,
                            agent: T,
                            agents: { http: e.httpAgent, https: e.httpsAgent },
                            auth: x,
                        };
                    e.socketPath
                        ? (R.socketPath = e.socketPath)
                        : ((R.hostname = _.hostname), (R.port = _.port));
                    let j,
                        A = e.proxy;
                    if (!A && !1 !== A) {
                        const F = C.slice(0, -1) + '_proxy',
                            L = process.env[F] || process.env[F.toUpperCase()];
                        if (L) {
                            let S = l.parse(L),
                                N =
                                    process.env.no_proxy ||
                                    process.env.NO_PROXY,
                                I = !0;
                            if (N)
                                I = !N.split(',')
                                    .map(function(e) {
                                        return e.trim();
                                    })
                                    .some(function(e) {
                                        return (
                                            !!e &&
                                            ('*' === e ||
                                                ('.' === e[0] &&
                                                    _.hostname.substr(
                                                        _.hostname.length -
                                                            e.length
                                                    ) === e) ||
                                                _.hostname === e)
                                        );
                                    });
                            if (
                                I &&
                                ((A = {
                                    host: S.hostname,
                                    port: S.port,
                                    protocol: S.protocol,
                                }),
                                S.auth)
                            ) {
                                const U = S.auth.split(':');
                                A.auth = { username: U[0], password: U[1] };
                            }
                        }
                    }
                    A &&
                        ((R.headers.host =
                            _.hostname + (_.port ? ':' + _.port : '')),
                        (function e(t, r, n) {
                            if (
                                ((t.hostname = r.host),
                                (t.host = r.host),
                                (t.port = r.port),
                                (t.path = n),
                                r.auth)
                            ) {
                                const o = Buffer.from(
                                    r.auth.username + ':' + r.auth.password,
                                    'utf8'
                                ).toString('base64');
                                t.headers['Proxy-Authorization'] = 'Basic ' + o;
                            }
                            t.beforeRedirect = function(t) {
                                (t.headers.host = t.host), e(t, r, t.href);
                            };
                        })(
                            R,
                            A,
                            C +
                                '//' +
                                _.hostname +
                                (_.port ? ':' + _.port : '') +
                                R.path
                        ));
                    const q = O && (!A || v.test(A.protocol));
                    e.transport
                        ? (j = e.transport)
                        : 0 === e.maxRedirects
                        ? (j = q ? u : a)
                        : (e.maxRedirects && (R.maxRedirects = e.maxRedirects),
                          (j = q ? f : c)),
                        e.maxBodyLength > -1 &&
                            (R.maxBodyLength = e.maxBodyLength);
                    var M = j.request(R, function(t) {
                        if (!M.aborted) {
                            let r = t,
                                i = t.req || M;
                            if (
                                204 !== t.statusCode &&
                                'HEAD' !== i.method &&
                                !1 !== e.decompress
                            )
                                switch (t.headers['content-encoding']) {
                                    case 'gzip':
                                    case 'compress':
                                    case 'deflate':
                                        (r = r.pipe(p.createUnzip())),
                                            delete t.headers[
                                                'content-encoding'
                                            ];
                                }
                            const s = {
                                status: t.statusCode,
                                statusText: t.statusMessage,
                                headers: t.headers,
                                config: e,
                                request: i,
                            };
                            if ('stream' === e.responseType)
                                (s.data = r), o(g, y, s);
                            else {
                                const a = [];
                                r.on('data', function(t) {
                                    a.push(t),
                                        e.maxContentLength > -1 &&
                                            Buffer.concat(a).length >
                                                e.maxContentLength &&
                                            (r.destroy(),
                                            y(
                                                d(
                                                    'maxContentLength size of ' +
                                                        e.maxContentLength +
                                                        ' exceeded',
                                                    e,
                                                    null,
                                                    i
                                                )
                                            ));
                                }),
                                    r.on('error', function(t) {
                                        M.aborted || y(m(t, e, null, i));
                                    }),
                                    r.on('end', function() {
                                        let t = Buffer.concat(a);
                                        'arraybuffer' !== e.responseType &&
                                            ((t = t.toString(
                                                e.responseEncoding
                                            )),
                                            (e.responseEncoding &&
                                                'utf8' !==
                                                    e.responseEncoding) ||
                                                (t = n.stripBOM(t))),
                                            (s.data = t),
                                            o(g, y, s);
                                    });
                            }
                        }
                    });
                    M.on('error', function(t) {
                        (M.aborted && 'ERR_FR_TOO_MANY_REDIRECTS' !== t.code) ||
                            y(m(t, e, null, M));
                    }),
                        e.timeout &&
                            M.setTimeout(e.timeout, function() {
                                M.abort(),
                                    y(
                                        d(
                                            'timeout of ' +
                                                e.timeout +
                                                'ms exceeded',
                                            e,
                                            'ECONNABORTED',
                                            M
                                        )
                                    );
                            }),
                        e.cancelToken &&
                            e.cancelToken.promise.then(function(e) {
                                M.aborted || (M.abort(), y(e));
                            }),
                        n.isStream(b)
                            ? b
                                  .on('error', function(t) {
                                      y(m(t, e, null, M));
                                  })
                                  .pipe(M)
                            : M.end(b);
                });
            };
        },
        function(e, t) {
            e.exports = require('stream');
        },
        function(e, t) {
            e.exports = require('assert');
        },
        function(e, t, r) {
            let n;
            try {
                n = r(48)('follow-redirects');
            } catch (e) {
                n = function() {};
            }
            e.exports = n;
        },
        function(e, t, r) {
            'undefined' == typeof process ||
            'renderer' === process.type ||
            !0 === process.browser ||
            process.__nwjs
                ? (e.exports = r(49))
                : (e.exports = r(51));
        },
        function(e, t, r) {
            (t.log = function(...e) {
                return (
                    'object' == typeof console &&
                    console.log &&
                    console.log(...e)
                );
            }),
                (t.formatArgs = function(t) {
                    if (
                        ((t[0] =
                            (this.useColors ? '%c' : '') +
                            this.namespace +
                            (this.useColors ? ' %c' : ' ') +
                            t[0] +
                            (this.useColors ? '%c ' : ' ') +
                            '+' +
                            e.exports.humanize(this.diff)),
                        !this.useColors)
                    )
                        return;
                    const r = 'color: ' + this.color;
                    t.splice(1, 0, r, 'color: inherit');
                    let n = 0,
                        o = 0;
                    t[0].replace(/%[a-zA-Z%]/g, e => {
                        '%%' !== e && (n++, '%c' === e && (o = n));
                    }),
                        t.splice(o, 0, r);
                }),
                (t.save = function(e) {
                    try {
                        e
                            ? t.storage.setItem('debug', e)
                            : t.storage.removeItem('debug');
                    } catch (e) {}
                }),
                (t.load = function() {
                    let e;
                    try {
                        e = t.storage.getItem('debug');
                    } catch (e) {}
                    !e &&
                        'undefined' != typeof process &&
                        'env' in process &&
                        (e = process.env.DEBUG);
                    return e;
                }),
                (t.useColors = function() {
                    if (
                        'undefined' != typeof window &&
                        window.process &&
                        ('renderer' === window.process.type ||
                            window.process.__nwjs)
                    )
                        return !0;
                    if (
                        'undefined' != typeof navigator &&
                        navigator.userAgent &&
                        navigator.userAgent
                            .toLowerCase()
                            .match(/(edge|trident)\/(\d+)/)
                    )
                        return !1;
                    return (
                        ('undefined' != typeof document &&
                            document.documentElement &&
                            document.documentElement.style &&
                            document.documentElement.style.WebkitAppearance) ||
                        ('undefined' != typeof window &&
                            window.console &&
                            (window.console.firebug ||
                                (window.console.exception &&
                                    window.console.table))) ||
                        ('undefined' != typeof navigator &&
                            navigator.userAgent &&
                            navigator.userAgent
                                .toLowerCase()
                                .match(/firefox\/(\d+)/) &&
                            parseInt(RegExp.$1, 10) >= 31) ||
                        ('undefined' != typeof navigator &&
                            navigator.userAgent &&
                            navigator.userAgent
                                .toLowerCase()
                                .match(/applewebkit\/(\d+)/))
                    );
                }),
                (t.storage = (function() {
                    try {
                        return localStorage;
                    } catch (e) {}
                })()),
                (t.colors = [
                    '#0000CC',
                    '#0000FF',
                    '#0033CC',
                    '#0033FF',
                    '#0066CC',
                    '#0066FF',
                    '#0099CC',
                    '#0099FF',
                    '#00CC00',
                    '#00CC33',
                    '#00CC66',
                    '#00CC99',
                    '#00CCCC',
                    '#00CCFF',
                    '#3300CC',
                    '#3300FF',
                    '#3333CC',
                    '#3333FF',
                    '#3366CC',
                    '#3366FF',
                    '#3399CC',
                    '#3399FF',
                    '#33CC00',
                    '#33CC33',
                    '#33CC66',
                    '#33CC99',
                    '#33CCCC',
                    '#33CCFF',
                    '#6600CC',
                    '#6600FF',
                    '#6633CC',
                    '#6633FF',
                    '#66CC00',
                    '#66CC33',
                    '#9900CC',
                    '#9900FF',
                    '#9933CC',
                    '#9933FF',
                    '#99CC00',
                    '#99CC33',
                    '#CC0000',
                    '#CC0033',
                    '#CC0066',
                    '#CC0099',
                    '#CC00CC',
                    '#CC00FF',
                    '#CC3300',
                    '#CC3333',
                    '#CC3366',
                    '#CC3399',
                    '#CC33CC',
                    '#CC33FF',
                    '#CC6600',
                    '#CC6633',
                    '#CC9900',
                    '#CC9933',
                    '#CCCC00',
                    '#CCCC33',
                    '#FF0000',
                    '#FF0033',
                    '#FF0066',
                    '#FF0099',
                    '#FF00CC',
                    '#FF00FF',
                    '#FF3300',
                    '#FF3333',
                    '#FF3366',
                    '#FF3399',
                    '#FF33CC',
                    '#FF33FF',
                    '#FF6600',
                    '#FF6633',
                    '#FF9900',
                    '#FF9933',
                    '#FFCC00',
                    '#FFCC33',
                ]),
                (e.exports = r(24)(t));
            const { formatters: n } = e.exports;
            n.j = function(e) {
                try {
                    return JSON.stringify(e);
                } catch (e) {
                    return '[UnexpectedJSONParseError]: ' + e.message;
                }
            };
        },
        function(e, t) {
            const r = 1e3,
                n = 6e4,
                o = 60 * n,
                i = 24 * o;
            function s(e, t, r, n) {
                const o = t >= 1.5 * r;
                return Math.round(e / r) + ' ' + n + (o ? 's' : '');
            }
            e.exports = function(e, t) {
                t = t || {};
                const a = typeof e;
                if ('string' === a && e.length > 0)
                    return (function(e) {
                        if ((e = String(e)).length > 100) return;
                        const t = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                            e
                        );
                        if (!t) return;
                        const s = parseFloat(t[1]);
                        switch ((t[2] || 'ms').toLowerCase()) {
                            case 'years':
                            case 'year':
                            case 'yrs':
                            case 'yr':
                            case 'y':
                                return 315576e5 * s;
                            case 'weeks':
                            case 'week':
                            case 'w':
                                return 6048e5 * s;
                            case 'days':
                            case 'day':
                            case 'd':
                                return s * i;
                            case 'hours':
                            case 'hour':
                            case 'hrs':
                            case 'hr':
                            case 'h':
                                return s * o;
                            case 'minutes':
                            case 'minute':
                            case 'mins':
                            case 'min':
                            case 'm':
                                return s * n;
                            case 'seconds':
                            case 'second':
                            case 'secs':
                            case 'sec':
                            case 's':
                                return s * r;
                            case 'milliseconds':
                            case 'millisecond':
                            case 'msecs':
                            case 'msec':
                            case 'ms':
                                return s;
                            default:
                                return;
                        }
                    })(e);
                if ('number' === a && isFinite(e))
                    return t.long
                        ? (function(e) {
                              const t = Math.abs(e);
                              if (t >= i) return s(e, t, i, 'day');
                              if (t >= o) return s(e, t, o, 'hour');
                              if (t >= n) return s(e, t, n, 'minute');
                              if (t >= r) return s(e, t, r, 'second');
                              return e + ' ms';
                          })(e)
                        : (function(e) {
                              const t = Math.abs(e);
                              if (t >= i) return Math.round(e / i) + 'd';
                              if (t >= o) return Math.round(e / o) + 'h';
                              if (t >= n) return Math.round(e / n) + 'm';
                              if (t >= r) return Math.round(e / r) + 's';
                              return e + 'ms';
                          })(e);
                throw new Error(
                    'val is not a non-empty string or a valid number. val=' +
                        JSON.stringify(e)
                );
            };
        },
        function(e, t, r) {
            const n = r(52),
                o = r(53);
            (t.init = function(e) {
                e.inspectOpts = {};
                const r = Object.keys(t.inspectOpts);
                for (let n = 0; n < r.length; n++)
                    e.inspectOpts[r[n]] = t.inspectOpts[r[n]];
            }),
                (t.log = function(...e) {
                    return process.stderr.write(o.format(...e) + '\n');
                }),
                (t.formatArgs = function(r) {
                    const { namespace: n, useColors: o } = this;
                    if (o) {
                        const t = this.color,
                            o = '[3' + (t < 8 ? t : '8;5;' + t),
                            i = `  ${o};1m${n} [0m`;
                        (r[0] = i + r[0].split('\n').join('\n' + i)),
                            r.push(
                                o + 'm+' + e.exports.humanize(this.diff) + '[0m'
                            );
                    } else
                        r[0] =
                            (function() {
                                if (t.inspectOpts.hideDate) return '';
                                return new Date().toISOString() + ' ';
                            })() +
                            n +
                            ' ' +
                            r[0];
                }),
                (t.save = function(e) {
                    e ? (process.env.DEBUG = e) : delete process.env.DEBUG;
                }),
                (t.load = function() {
                    return process.env.DEBUG;
                }),
                (t.useColors = function() {
                    return 'colors' in t.inspectOpts
                        ? Boolean(t.inspectOpts.colors)
                        : n.isatty(process.stderr.fd);
                }),
                (t.colors = [6, 2, 3, 4, 5, 1]);
            try {
                const e = r(54);
                e &&
                    (e.stderr || e).level >= 2 &&
                    (t.colors = [
                        20,
                        21,
                        26,
                        27,
                        32,
                        33,
                        38,
                        39,
                        40,
                        41,
                        42,
                        43,
                        44,
                        45,
                        56,
                        57,
                        62,
                        63,
                        68,
                        69,
                        74,
                        75,
                        76,
                        77,
                        78,
                        79,
                        80,
                        81,
                        92,
                        93,
                        98,
                        99,
                        112,
                        113,
                        128,
                        129,
                        134,
                        135,
                        148,
                        149,
                        160,
                        161,
                        162,
                        163,
                        164,
                        165,
                        166,
                        167,
                        168,
                        169,
                        170,
                        171,
                        172,
                        173,
                        178,
                        179,
                        184,
                        185,
                        196,
                        197,
                        198,
                        199,
                        200,
                        201,
                        202,
                        203,
                        204,
                        205,
                        206,
                        207,
                        208,
                        209,
                        214,
                        215,
                        220,
                        221,
                    ]);
            } catch (e) {}
            (t.inspectOpts = Object.keys(process.env)
                .filter(e => /^debug_/i.test(e))
                .reduce((e, t) => {
                    const r = t
                        .substring(6)
                        .toLowerCase()
                        .replace(/_([a-z])/g, (e, t) => t.toUpperCase());
                    let n = process.env[t];
                    return (
                        (n =
                            !!/^(yes|on|true|enabled)$/i.test(n) ||
                            (!/^(no|off|false|disabled)$/i.test(n) &&
                                ('null' === n ? null : Number(n)))),
                        (e[r] = n),
                        e
                    );
                }, {})),
                (e.exports = r(24)(t));
            const { formatters: i } = e.exports;
            (i.o = function(e) {
                return (
                    (this.inspectOpts.colors = this.useColors),
                    o.inspect(e, this.inspectOpts).replace(/\s*\n\s*/g, ' ')
                );
            }),
                (i.O = function(e) {
                    return (
                        (this.inspectOpts.colors = this.useColors),
                        o.inspect(e, this.inspectOpts)
                    );
                });
        },
        function(e, t) {
            e.exports = require('tty');
        },
        function(e, t) {
            e.exports = require('util');
        },
        function(e, t, r) {
            'use strict';
            const n = r(55),
                o = r(56),
                i = process.env;
            let s;
            function a(e) {
                return (function(e) {
                    return (
                        0 !== e && {
                            level: e,
                            hasBasic: !0,
                            has256: e >= 2,
                            has16m: e >= 3,
                        }
                    );
                })(
                    (function(e) {
                        if (!1 === s) return 0;
                        if (
                            o('color=16m') ||
                            o('color=full') ||
                            o('color=truecolor')
                        )
                            return 3;
                        if (o('color=256')) return 2;
                        if (e && !e.isTTY && !0 !== s) return 0;
                        const t = s ? 1 : 0;
                        if ('win32' === process.platform) {
                            const e = n.release().split('.');
                            return Number(
                                process.versions.node.split('.')[0]
                            ) >= 8 &&
                                Number(e[0]) >= 10 &&
                                Number(e[2]) >= 10586
                                ? Number(e[2]) >= 14931
                                    ? 3
                                    : 2
                                : 1;
                        }
                        if ('CI' in i)
                            return [
                                'TRAVIS',
                                'CIRCLECI',
                                'APPVEYOR',
                                'GITLAB_CI',
                            ].some(e => e in i) || 'codeship' === i.CI_NAME
                                ? 1
                                : t;
                        if ('TEAMCITY_VERSION' in i)
                            return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(
                                i.TEAMCITY_VERSION
                            )
                                ? 1
                                : 0;
                        if ('truecolor' === i.COLORTERM) return 3;
                        if ('TERM_PROGRAM' in i) {
                            const e = parseInt(
                                (i.TERM_PROGRAM_VERSION || '').split('.')[0],
                                10
                            );
                            switch (i.TERM_PROGRAM) {
                                case 'iTerm.app':
                                    return e >= 3 ? 3 : 2;
                                case 'Apple_Terminal':
                                    return 2;
                            }
                        }
                        return /-256(color)?$/i.test(i.TERM)
                            ? 2
                            : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
                                  i.TERM
                              ) || 'COLORTERM' in i
                            ? 1
                            : (i.TERM, t);
                    })(e)
                );
            }
            o('no-color') || o('no-colors') || o('color=false')
                ? (s = !1)
                : (o('color') ||
                      o('colors') ||
                      o('color=true') ||
                      o('color=always')) &&
                  (s = !0),
                'FORCE_COLOR' in i &&
                    (s =
                        0 === i.FORCE_COLOR.length ||
                        0 !== parseInt(i.FORCE_COLOR, 10)),
                (e.exports = {
                    supportsColor: a,
                    stdout: a(process.stdout),
                    stderr: a(process.stderr),
                });
        },
        function(e, t) {
            e.exports = require('os');
        },
        function(e, t, r) {
            'use strict';
            e.exports = (e, t) => {
                t = t || process.argv;
                const r = e.startsWith('-') ? '' : 1 === e.length ? '-' : '--',
                    n = t.indexOf(r + e),
                    o = t.indexOf('--');
                return -1 !== n && (-1 === o || n < o);
            };
        },
        function(e, t) {
            e.exports = require('zlib');
        },
        function(e) {
            e.exports = JSON.parse(
                '{"_args":[["axios@0.21.1","/Users/zadat/hackerbay/app/js-sdk"]],"_from":"axios@0.21.1","_id":"axios@0.21.1","_inBundle":false,"_integrity":"sha512-dKQiRHxGD9PPRIUNIWvZhPTPpl1rf/OxTYKsqKUDjBwYylTvV7SjSHJb9ratfyzM6wCdLCOYLzs73qpg5c4iGA==","_location":"/axios","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"axios@0.21.1","name":"axios","escapedName":"axios","rawSpec":"0.21.1","saveSpec":null,"fetchSpec":"0.21.1"},"_requiredBy":["/"],"_resolved":"https://registry.npmjs.org/axios/-/axios-0.21.1.tgz","_spec":"0.21.1","_where":"/Users/zadat/hackerbay/app/js-sdk","author":{"name":"Matt Zabriskie"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"bugs":{"url":"https://github.com/axios/axios/issues"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}],"dependencies":{"follow-redirects":"^1.10.0"},"description":"Promise based HTTP client for the browser and node.js","devDependencies":{"bundlesize":"^0.17.0","coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.0.2","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^20.1.0","grunt-karma":"^2.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^1.0.18","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^1.3.0","karma-chrome-launcher":"^2.2.0","karma-coverage":"^1.1.1","karma-firefox-launcher":"^1.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-opera-launcher":"^1.0.0","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^1.2.0","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.7","karma-webpack":"^1.7.0","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^5.2.0","sinon":"^4.5.0","typescript":"^2.8.1","url-search-params":"^0.10.0","webpack":"^1.13.1","webpack-dev-server":"^1.14.1"},"homepage":"https://github.com/axios/axios","jsdelivr":"dist/axios.min.js","keywords":["xhr","http","ajax","promise","node"],"license":"MIT","main":"index.js","name":"axios","repository":{"type":"git","url":"git+https://github.com/axios/axios.git"},"scripts":{"build":"NODE_ENV=production grunt build","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","examples":"node ./examples/server.js","fix":"eslint --fix lib/**/*.js","postversion":"git push && git push --tags","preversion":"npm test","start":"node ./sandbox/server.js","test":"grunt test && bundlesize","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"},"typings":"./index.d.ts","unpkg":"dist/axios.min.js","version":"0.21.1"}'
            );
        },
        function(e, t, r) {
            'use strict';
            const n = r(26);
            function o(e) {
                if ('function' != typeof e)
                    throw new TypeError('executor must be a function.');
                let t;
                this.promise = new Promise(function(e) {
                    t = e;
                });
                const r = this;
                e(function(e) {
                    r.reason || ((r.reason = new n(e)), t(r.reason));
                });
            }
            (o.prototype.throwIfRequested = function() {
                if (this.reason) throw this.reason;
            }),
                (o.source = function() {
                    let e;
                    return {
                        token: new o(function(t) {
                            e = t;
                        }),
                        cancel: e,
                    };
                }),
                (e.exports = o);
        },
        function(e, t, r) {
            'use strict';
            e.exports = function(e) {
                return function(t) {
                    return e.apply(null, t);
                };
            };
        },
        function(e, t, r) {
            'use strict';
            e.exports = function(e) {
                return 'object' == typeof e && !0 === e.isAxiosError;
            };
        },
        function(e, t, r) {
            const n = r(27);
            e.exports = function(e) {
                if (Array.isArray(e)) return n(e);
            };
        },
        function(e, t) {
            e.exports = function(e) {
                if (
                    'undefined' != typeof Symbol &&
                    Symbol.iterator in Object(e)
                )
                    return Array.from(e);
            };
        },
        function(e, t) {
            e.exports = function() {
                throw new TypeError(
                    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                );
            };
        },
        function(e, t) {
            e.exports = function(e) {
                if (Array.isArray(e)) return e;
            };
        },
        function(e, t) {
            e.exports = function(e, t) {
                if (
                    'undefined' != typeof Symbol &&
                    Symbol.iterator in Object(e)
                ) {
                    let r = [],
                        n = !0,
                        o = !1,
                        i = void 0;
                    try {
                        for (
                            var s, a = e[Symbol.iterator]();
                            !(n = (s = a.next()).done) &&
                            (r.push(s.value), !t || r.length !== t);
                            n = !0
                        );
                    } catch (e) {
                        (o = !0), (i = e);
                    } finally {
                        try {
                            n || null == a.return || a.return();
                        } finally {
                            if (o) throw i;
                        }
                    }
                    return r;
                }
            };
        },
        function(e, t) {
            e.exports = function() {
                throw new TypeError(
                    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                );
            };
        },
        function(e, t, r) {
            'use strict';
            r.r(t);
            var n = r(5),
                o = r.n(n),
                i = r(11),
                s = r.n(i),
                a = r(6),
                u = r.n(a),
                c = r(3),
                f = r.n(c),
                l = r(4),
                p = r.n(l),
                h = r(0),
                d = r.n(h),
                m = r(1),
                v = r.n(m),
                g = r(9),
                y = r.n(g),
                b = (function() {
                    function e(t, r, n) {
                        f()(this, e),
                            w.set(this, { writable: !0, value: void 0 }),
                            x.set(this, { writable: !0, value: void 0 }),
                            E.set(this, { writable: !0, value: void 0 }),
                            this._setApplicationLogId(r),
                            this._setApiUrl(t),
                            this._setApplicationLogKey(n);
                    }
                    let t, r, n;
                    return (
                        p()(e, [
                            {
                                key: '_setApplicationLogId',
                                value: function(e) {
                                    v()(this, w, e);
                                },
                            },
                            {
                                key: '_setApplicationLogKey',
                                value: function(e) {
                                    v()(this, x, e);
                                },
                            },
                            {
                                key: '_setApiUrl',
                                value: function(e) {
                                    v()(
                                        this,
                                        E,
                                        ''
                                            .concat(e, '/application-log/')
                                            .concat(d()(this, w), '/log')
                                    );
                                },
                            },
                            {
                                key: 'log',
                                value:
                                    ((n = u()(
                                        o.a.mark(function e(t) {
                                            let r,
                                                n,
                                                i,
                                                a = arguments;
                                            return o.a.wrap(
                                                function(e) {
                                                    for (;;)
                                                        switch (
                                                            (e.prev = e.next)
                                                        ) {
                                                            case 0:
                                                                if (
                                                                    ((r =
                                                                        a.length >
                                                                            1 &&
                                                                        void 0 !==
                                                                            a[1]
                                                                            ? a[1]
                                                                            : null),
                                                                    (n = s()(
                                                                        t
                                                                    )),
                                                                    t &&
                                                                        ('object' ===
                                                                            n ||
                                                                            'string' ===
                                                                                n))
                                                                ) {
                                                                    e.next = 4;
                                                                    break;
                                                                }
                                                                return e.abrupt(
                                                                    'return',
                                                                    'Invalid Content to be logged'
                                                                );
                                                            case 4:
                                                                if (!r) {
                                                                    e.next = 7;
                                                                    break;
                                                                }
                                                                if (
                                                                    'string' ==
                                                                        typeof r ||
                                                                    Array.isArray(
                                                                        r
                                                                    )
                                                                ) {
                                                                    e.next = 7;
                                                                    break;
                                                                }
                                                                return e.abrupt(
                                                                    'return',
                                                                    'Invalid Content Tags to be logged'
                                                                );
                                                            case 7:
                                                                return (
                                                                    (i =
                                                                        'info'),
                                                                    (e.next = 10),
                                                                    this._makeApiRequest(
                                                                        t,
                                                                        i,
                                                                        r
                                                                    )
                                                                );
                                                            case 10:
                                                                return e.abrupt(
                                                                    'return',
                                                                    e.sent
                                                                );
                                                            case 11:
                                                            case 'end':
                                                                return e.stop();
                                                        }
                                                },
                                                e,
                                                this
                                            );
                                        })
                                    )),
                                    function(e) {
                                        return n.apply(this, arguments);
                                    }),
                            },
                            {
                                key: 'warning',
                                value:
                                    ((r = u()(
                                        o.a.mark(function e(t) {
                                            let r,
                                                n,
                                                i,
                                                a = arguments;
                                            return o.a.wrap(
                                                function(e) {
                                                    for (;;)
                                                        switch (
                                                            (e.prev = e.next)
                                                        ) {
                                                            case 0:
                                                                if (
                                                                    ((r =
                                                                        a.length >
                                                                            1 &&
                                                                        void 0 !==
                                                                            a[1]
                                                                            ? a[1]
                                                                            : null),
                                                                    (n = s()(
                                                                        t
                                                                    )),
                                                                    t &&
                                                                        ('object' ===
                                                                            n ||
                                                                            'string' ===
                                                                                n))
                                                                ) {
                                                                    e.next = 4;
                                                                    break;
                                                                }
                                                                return e.abrupt(
                                                                    'return',
                                                                    'Invalid Content to be logged'
                                                                );
                                                            case 4:
                                                                if (!r) {
                                                                    e.next = 7;
                                                                    break;
                                                                }
                                                                if (
                                                                    'string' ==
                                                                        typeof r ||
                                                                    Array.isArray(
                                                                        r
                                                                    )
                                                                ) {
                                                                    e.next = 7;
                                                                    break;
                                                                }
                                                                return e.abrupt(
                                                                    'return',
                                                                    'Invalid Content Tags to be logged'
                                                                );
                                                            case 7:
                                                                return (
                                                                    (i =
                                                                        'warning'),
                                                                    (e.next = 10),
                                                                    this._makeApiRequest(
                                                                        t,
                                                                        i,
                                                                        r
                                                                    )
                                                                );
                                                            case 10:
                                                                return e.abrupt(
                                                                    'return',
                                                                    e.sent
                                                                );
                                                            case 11:
                                                            case 'end':
                                                                return e.stop();
                                                        }
                                                },
                                                e,
                                                this
                                            );
                                        })
                                    )),
                                    function(e) {
                                        return r.apply(this, arguments);
                                    }),
                            },
                            {
                                key: 'error',
                                value:
                                    ((t = u()(
                                        o.a.mark(function e(t) {
                                            let r,
                                                n,
                                                i,
                                                a = arguments;
                                            return o.a.wrap(
                                                function(e) {
                                                    for (;;)
                                                        switch (
                                                            (e.prev = e.next)
                                                        ) {
                                                            case 0:
                                                                if (
                                                                    ((r =
                                                                        a.length >
                                                                            1 &&
                                                                        void 0 !==
                                                                            a[1]
                                                                            ? a[1]
                                                                            : null),
                                                                    (n = s()(
                                                                        t
                                                                    )),
                                                                    t &&
                                                                        ('object' ===
                                                                            n ||
                                                                            'string' ===
                                                                                n))
                                                                ) {
                                                                    e.next = 4;
                                                                    break;
                                                                }
                                                                return e.abrupt(
                                                                    'return',
                                                                    'Invalid Content to be logged'
                                                                );
                                                            case 4:
                                                                if (!r) {
                                                                    e.next = 7;
                                                                    break;
                                                                }
                                                                if (
                                                                    'string' ==
                                                                        typeof r ||
                                                                    Array.isArray(
                                                                        r
                                                                    )
                                                                ) {
                                                                    e.next = 7;
                                                                    break;
                                                                }
                                                                return e.abrupt(
                                                                    'return',
                                                                    'Invalid Content Tags to be logged'
                                                                );
                                                            case 7:
                                                                return (
                                                                    (i =
                                                                        'error'),
                                                                    (e.next = 10),
                                                                    this._makeApiRequest(
                                                                        t,
                                                                        i,
                                                                        r
                                                                    )
                                                                );
                                                            case 10:
                                                                return e.abrupt(
                                                                    'return',
                                                                    e.sent
                                                                );
                                                            case 11:
                                                            case 'end':
                                                                return e.stop();
                                                        }
                                                },
                                                e,
                                                this
                                            );
                                        })
                                    )),
                                    function(e) {
                                        return t.apply(this, arguments);
                                    }),
                            },
                            {
                                key: '_makeApiRequest',
                                value: function(e, t) {
                                    const r = this,
                                        n =
                                            arguments.length > 2 &&
                                            void 0 !== arguments[2]
                                                ? arguments[2]
                                                : null,
                                        o = {
                                            content: e,
                                            applicationLogKey: d()(this, x),
                                            type: t,
                                        };
                                    return (
                                        n && (o.tags = n),
                                        new Promise(function(e, t) {
                                            y.a
                                                .post(d()(r, E), o)
                                                .then(function(t) {
                                                    e(t);
                                                })
                                                .catch(function(e) {
                                                    t(e);
                                                });
                                        })
                                    );
                                },
                            },
                        ]),
                        e
                    );
                })(),
                w = new WeakMap(),
                x = new WeakMap(),
                E = new WeakMap(),
                _ = b,
                C = r(14),
                k = r.n(C),
                O = r(29),
                T = r.n(O),
                R = r(10),
                j = r.n(R),
                A = (function() {
                    function e(t) {
                        f()(this, e),
                            F.set(this, { writable: !0, value: [] }),
                            L.set(this, { writable: !0, value: void 0 }),
                            v()(this, L, t);
                    }
                    return (
                        p()(e, [
                            {
                                key: '_addItemToTimeline',
                                value: function(e) {
                                    if (
                                        d()(this, F).length !==
                                        d()(this, L).maxTimeline
                                    )
                                        return (
                                            (e.timestamp = Date.now()),
                                            d()(this, F).push(e),
                                            !0
                                        );
                                },
                            },
                            {
                                key: 'addToTimeline',
                                value: function(e) {
                                    this._addItemToTimeline(e);
                                },
                            },
                            {
                                key: 'getTimeline',
                                value: function() {
                                    return d()(this, F);
                                },
                            },
                            {
                                key: 'clearTimeline',
                                value: function() {
                                    v()(this, F, []);
                                },
                            },
                        ]),
                        e
                    );
                })(),
                F = new WeakMap(),
                L = new WeakMap(),
                S = A,
                N = (function() {
                    function e() {
                        f()(this, e);
                    }
                    return (
                        p()(e, [
                            {
                                key: 'getErrorType',
                                value: function() {
                                    return {
                                        INFO: 'info',
                                        WARNING: 'warning',
                                        ERROR: 'error',
                                    };
                                },
                            },
                            {
                                key: '_getErrorStackTrace',
                                value: function(e) {
                                    for (
                                        var t = [],
                                            r = (e.stack
                                                ? e.stack
                                                : e.error.stack
                                                ? e.error.stack
                                                : e.error
                                            ).split('\n'),
                                            n = {
                                                type: r[0].split(':')[0],
                                                message: e.message
                                                    ? e.message
                                                    : e.error,
                                                stacktrace: null,
                                                lineNumber: e.line || e.lineno,
                                                columnNumber: e.col,
                                            },
                                            o = 1;
                                        o < r.length;
                                        o++
                                    ) {
                                        for (
                                            var i = r[o],
                                                s = i.substring(
                                                    0,
                                                    i.indexOf('(') - 1
                                                ),
                                                a = s
                                                    .substring(
                                                        s.lastIndexOf(' ')
                                                    )
                                                    .replace(/\s+/g, ''),
                                                u = i.substring(i.indexOf('(')),
                                                c = (u = (u = (u = u.substring(
                                                    1
                                                )).substring(
                                                    0,
                                                    u.length - 1
                                                )).split(':'))[u.length - 2],
                                                f = u[u.length - 1],
                                                l = '',
                                                p = 0;
                                            p < u.length - 2;

                                        )
                                            (l += ''.concat(u[p])),
                                                p !== u.length - 3 &&
                                                    (l += ':'),
                                                (p += 1);
                                        t.push({
                                            methodName: a,
                                            lineNumber: c,
                                            columnNumber: f,
                                            fileName: l,
                                        });
                                    }
                                    const h = { frames: t };
                                    return (n.stacktrace = h), n;
                                },
                            },
                            {
                                key: '_getUserDeviceDetails',
                                value: function() {
                                    const e = { device: null, browser: null };
                                    if ('undefined' != typeof window) {
                                        const t = window.navigator.appVersion,
                                            r = t
                                                .substring(
                                                    t.indexOf('(') + 1,
                                                    t.indexOf(')')
                                                )
                                                .split(';'),
                                            n = t
                                                .substring(
                                                    t.lastIndexOf(')') + 1
                                                )
                                                .trim()
                                                .split(' ')[0],
                                            o = {
                                                name: n.substring(
                                                    0,
                                                    n.indexOf('/')
                                                ),
                                                version: n.substring(
                                                    n.indexOf('/') + 1
                                                ),
                                            };
                                        (e.device = r), (e.browser = o);
                                    }
                                    return e;
                                },
                            },
                        ]),
                        e
                    );
                })(),
                I = r(7),
                U = r.n(I),
                q = r(8),
                M = r.n(q),
                B = (function() {
                    function e(t, r, n) {
                        f()(this, e),
                            P.set(this, {
                                writable: !0,
                                value: 'http://localhost:3002/api',
                            }),
                            D.set(this, { writable: !0, value: void 0 }),
                            W.set(this, { writable: !0, value: 1e3 }),
                            z.set(this, { writable: !0, value: void 0 }),
                            H.set(this, { writable: !0, value: void 0 }),
                            G.set(this, { writable: !0, value: void 0 }),
                            $.set(this, { writable: !0, value: void 0 }),
                            X.set(this, { writable: !0, value: void 0 }),
                            K.set(this, { writable: !0, value: void 0 }),
                            v()(this, K, n),
                            v()(this, X, r),
                            v()(this, D, new S(n)),
                            v()(this, $, new N()),
                            v()(this, G, t),
                            this._setUpConsoleListener(),
                            d()(this, X)
                                ? this._init()
                                : this._setUpHttpsListener();
                    }
                    return (
                        p()(e, [
                            {
                                key: '_init',
                                value: function() {
                                    this._setUpDomListener(),
                                        this._setUpFetchListener(),
                                        this._setUpXhrListener();
                                },
                            },
                            {
                                key: 'getTimeline',
                                value: function() {
                                    return d()(this, D).getTimeline();
                                },
                            },
                            {
                                key: 'clearTimeline',
                                value: function(e) {
                                    return (
                                        v()(this, G, e),
                                        d()(this, D).clearTimeline()
                                    );
                                },
                            },
                            {
                                key: '_setUpConsoleListener',
                                value: function() {
                                    let e,
                                        t = this,
                                        r =
                                            ((e = global.console),
                                            {
                                                log: function(t) {
                                                    e.log(t);
                                                },
                                                info: function(r) {
                                                    e.info(r),
                                                        t._logConsoleEvent(
                                                            r,
                                                            d()(
                                                                t,
                                                                $
                                                            ).getErrorType()
                                                                .INFO
                                                        );
                                                },
                                                warn: function(r) {
                                                    e.warn(r),
                                                        t._logConsoleEvent(
                                                            r,
                                                            d()(
                                                                t,
                                                                $
                                                            ).getErrorType()
                                                                .WARNING
                                                        );
                                                },
                                                error: function(r) {
                                                    e.error(r),
                                                        t._logConsoleEvent(
                                                            r,
                                                            d()(
                                                                t,
                                                                $
                                                            ).getErrorType()
                                                                .ERROR
                                                        );
                                                },
                                            });
                                    global.console = r;
                                },
                            },
                            {
                                key: '_setUpDomListener',
                                value: function() {
                                    const e = this,
                                        t = this;
                                    Object.keys(window).forEach(function(r) {
                                        /^on(keypress|click)/.test(r) &&
                                            window.addEventListener(
                                                r.slice(2),
                                                function(r) {
                                                    if (d()(t, z))
                                                        console.log(
                                                            'not logging'
                                                        );
                                                    else {
                                                        if (d()(t, H) === r)
                                                            return;
                                                        v()(t, H, r),
                                                            e._logClickEvent(
                                                                r,
                                                                d()(
                                                                    e,
                                                                    $
                                                                ).getErrorType()
                                                                    .INFO
                                                            );
                                                    }
                                                    clearTimeout(d()(t, z)),
                                                        v()(
                                                            t,
                                                            z,
                                                            setTimeout(
                                                                function() {
                                                                    v()(
                                                                        t,
                                                                        z,
                                                                        void 0
                                                                    );
                                                                },
                                                                d()(t, W)
                                                            )
                                                        );
                                                }
                                            );
                                    });
                                },
                            },
                            {
                                key: '_setUpXhrListener',
                                value: function() {
                                    const e =
                                            window.XMLHttpRequest.prototype
                                                .open,
                                        t = this;
                                    window.XMLHttpRequest.prototype.open = function(
                                        r,
                                        n
                                    ) {
                                        const o = {
                                            method: r,
                                            url: n,
                                            status_code: '',
                                        };
                                        return (
                                            this.addEventListener(
                                                'load',
                                                function() {
                                                    n.startsWith(d()(t, P)) ||
                                                        ((o.status_code = this.status),
                                                        t._logXHREvent(
                                                            o,
                                                            d()(
                                                                t,
                                                                $
                                                            ).getErrorType()
                                                                .INFO
                                                        ));
                                                }
                                            ),
                                            this.addEventListener(
                                                'error',
                                                function() {
                                                    n.startsWith(d()(t, P)) ||
                                                        ((o.status_code = this.status),
                                                        t._logXHREvent(
                                                            o,
                                                            d()(
                                                                t,
                                                                $
                                                            ).getErrorType()
                                                                .INFO
                                                        ));
                                                }
                                            ),
                                            e.apply(this, arguments)
                                        );
                                    };
                                },
                            },
                            {
                                key: '_setUpFetchListener',
                                value: function() {
                                    const e = global.fetch,
                                        t = this;
                                    global.fetch = function(r, n) {
                                        const o = {
                                                url: r,
                                                method: n ? n.method : 'GET',
                                                status_code: '',
                                            },
                                            i = e(r, n);
                                        return (
                                            i.then(
                                                function(e) {
                                                    o.status_code = e.status;
                                                },
                                                function(e) {
                                                    o.status_code = e.status;
                                                }
                                            ),
                                            r.startsWith(d()(t, P)) ||
                                                t._logFetchEvent(
                                                    o,
                                                    d()(t, $).getErrorType()
                                                        .INFO
                                                ),
                                            i
                                        );
                                    };
                                },
                            },
                            {
                                key: '_setUpHttpsListener',
                                value: function() {
                                    t(U.a), t(M.a);
                                    const e = this;
                                    function t(t) {
                                        const n = t.request;
                                        t.request = function(t) {
                                            const o = n.apply(this, arguments),
                                                i = r(t),
                                                s = o.emit;
                                            return (
                                                (o.emit = function(t, r) {
                                                    switch (t) {
                                                        case 'response':
                                                            r.on(
                                                                'end',
                                                                function() {
                                                                    (i.status =
                                                                        r.statusCode),
                                                                        i.url.startsWith(
                                                                            d()(
                                                                                e,
                                                                                P
                                                                            )
                                                                        ) ||
                                                                            e._logHttpRequestEvent(
                                                                                i,
                                                                                d()(
                                                                                    e,
                                                                                    $
                                                                                ).getErrorType()
                                                                                    .INFO
                                                                            );
                                                                }
                                                            );
                                                    }
                                                    return s.apply(
                                                        this,
                                                        arguments
                                                    );
                                                }),
                                                o
                                            );
                                        };
                                    }
                                    function r(e) {
                                        const t = {
                                                method: e.method || 'GET',
                                                host:
                                                    e.host ||
                                                    e.hostname ||
                                                    '<no host>',
                                                port: e.port || '',
                                                path:
                                                    e.pathname || e.path || '/',
                                                headers: e.headers || {},
                                                protocol: e.protocol,
                                                status: '',
                                                url: '',
                                            },
                                            r =
                                                '' !== t.port
                                                    ? ':'.concat(t.port)
                                                    : '',
                                            n = ''
                                                .concat(t.protocol, '//')
                                                .concat(t.host)
                                                .concat(r)
                                                .concat(t.path);
                                        return (t.url = n), t;
                                    }
                                },
                            },
                            {
                                key: '_logConsoleEvent',
                                value: function(e, t) {
                                    const r = {
                                        category: 'console',
                                        data: { content: e },
                                        type: t,
                                        eventId: d()(this, G),
                                    };
                                    d()(this, D).addToTimeline(r);
                                },
                            },
                            {
                                key: '_logXHREvent',
                                value: function(e, t) {
                                    const r = {
                                        category: 'xhr',
                                        data: { content: e },
                                        type: t,
                                        eventId: d()(this, G),
                                    };
                                    d()(this, D).addToTimeline(r);
                                },
                            },
                            {
                                key: '_logFetchEvent',
                                value: function(e, t) {
                                    const r = {
                                        category: 'fetch',
                                        data: { content: e },
                                        type: t,
                                        eventId: d()(this, G),
                                    };
                                    d()(this, D).addToTimeline(r);
                                },
                            },
                            {
                                key: '_logHttpRequestEvent',
                                value: function(e, t) {
                                    const r = {
                                        category: t,
                                        data: { content: e },
                                        type: t,
                                        eventId: d()(this, G),
                                    };
                                    d()(this, D).addToTimeline(r);
                                },
                            },
                            {
                                key: 'logErrorEvent',
                                value: function(e) {
                                    const t = {
                                        category: 'exception',
                                        data: { content: e },
                                        type: d()(this, $).getErrorType().ERROR,
                                        eventId: d()(this, G),
                                    };
                                    d()(this, D).addToTimeline(t);
                                },
                            },
                            {
                                key: 'logCustomTimelineEvent',
                                value: function(e) {
                                    (e.eventId = d()(this, G)),
                                        d()(this, D).addToTimeline(e);
                                },
                            },
                            {
                                key: '_logClickEvent',
                                value: function(e, t) {
                                    const r = this._getEventTree(e),
                                        n = {
                                            category: 'ui.'.concat(e.type),
                                            data: { content: r },
                                            type: t,
                                            eventId: d()(this, G),
                                        };
                                    d()(this, D).addToTimeline(n);
                                },
                            },
                            {
                                key: '_getEventTree',
                                value: function(e) {
                                    for (
                                        var t = [], r = 0, n = [];
                                        r < 5 && e.path[r];

                                    ) {
                                        const o = e.path[r];
                                        if ('html' !== o.localName) {
                                            let i = '';
                                            (i += ''.concat(o.localName)),
                                                o.id && (i += '#'.concat(o.id));
                                            let s = [];
                                            s = o.classList;
                                            var a = '';
                                            s.forEach(function(e) {
                                                a += '.'.concat(e);
                                            }),
                                                (i += a);
                                            const u = this._getElementAttributes(
                                                o
                                            );
                                            if (u.length > 0) {
                                                var c = '';
                                                u.forEach(function(e) {
                                                    'id' !== e.key &&
                                                        (c += ''
                                                            .concat(e.key, '=')
                                                            .concat(
                                                                e.value,
                                                                ','
                                                            ));
                                                }),
                                                    '' !== c &&
                                                        ((c = c.substring(
                                                            0,
                                                            c.length - 1
                                                        )),
                                                        (i += '['.concat(
                                                            c,
                                                            ']'
                                                        )));
                                            }
                                            n.push(i),
                                                t.push({
                                                    name: o.localName,
                                                    class: s,
                                                    attribute: u,
                                                });
                                        }
                                        r += 1;
                                    }
                                    let f = n.reverse();
                                    return {
                                        tree: t,
                                        path: (f = f.join(' > ')),
                                    };
                                },
                            },
                            {
                                key: '_getElementAttributes',
                                value: function(e) {
                                    for (
                                        var t = [],
                                            r = e.attributes,
                                            n = ['class', 'value'],
                                            o = 0,
                                            i = Object.entries(r);
                                        o < i.length;
                                        o++
                                    ) {
                                        const s = j()(i[o], 2),
                                            a = (s[0], s[1]);
                                        if (!n.includes(a.name)) {
                                            const u = e[a.name];
                                            t.push({ key: a.name, value: u });
                                        }
                                    }
                                    return t;
                                },
                            },
                        ]),
                        e
                    );
                })(),
                P = new WeakMap(),
                D = new WeakMap(),
                W = new WeakMap(),
                z = new WeakMap(),
                H = new WeakMap(),
                G = new WeakMap(),
                $ = new WeakMap(),
                X = new WeakMap(),
                K = new WeakMap(),
                Y = B,
                V = r(30),
                J = r.n(V);
            const Z = new Uint8Array(256);
            let Q = Z.length;
            function ee() {
                return (
                    Q > Z.length - 16 && (J.a.randomFillSync(Z), (Q = 0)),
                    Z.slice(Q, (Q += 16))
                );
            }
            const te = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
            const re = function(e) {
                return 'string' == typeof e && te.test(e);
            };
            const ne = [];
            for (let e = 0; e < 256; ++e)
                ne.push((e + 256).toString(16).substr(1));
            const oe = function(e, t = 0) {
                const r = (
                    ne[e[t + 0]] +
                    ne[e[t + 1]] +
                    ne[e[t + 2]] +
                    ne[e[t + 3]] +
                    '-' +
                    ne[e[t + 4]] +
                    ne[e[t + 5]] +
                    '-' +
                    ne[e[t + 6]] +
                    ne[e[t + 7]] +
                    '-' +
                    ne[e[t + 8]] +
                    ne[e[t + 9]] +
                    '-' +
                    ne[e[t + 10]] +
                    ne[e[t + 11]] +
                    ne[e[t + 12]] +
                    ne[e[t + 13]] +
                    ne[e[t + 14]] +
                    ne[e[t + 15]]
                ).toLowerCase();
                if (!re(r)) throw TypeError('Stringified UUID is invalid');
                return r;
            };
            const ie = function(e, t, r) {
                    const n = (e = e || {}).random || (e.rng || ee)();
                    if (
                        ((n[6] = (15 & n[6]) | 64),
                        (n[8] = (63 & n[8]) | 128),
                        t)
                    ) {
                        r = r || 0;
                        for (let e = 0; e < 16; ++e) t[r + e] = n[e];
                        return t;
                    }
                    return oe(n);
                },
                se = r(15);
            function ae(e, t) {
                const r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    let n = Object.getOwnPropertySymbols(e);
                    t &&
                        (n = n.filter(function(t) {
                            return Object.getOwnPropertyDescriptor(
                                e,
                                t
                            ).enumerable;
                        })),
                        r.push.apply(r, n);
                }
                return r;
            }
            function ue(e) {
                for (let t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2
                        ? ae(Object(r), !0).forEach(function(t) {
                              k()(e, t, r[t]);
                          })
                        : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(
                              e,
                              Object.getOwnPropertyDescriptors(r)
                          )
                        : ae(Object(r)).forEach(function(t) {
                              Object.defineProperty(
                                  e,
                                  t,
                                  Object.getOwnPropertyDescriptor(r, t)
                              );
                          });
                }
                return e;
            }
            var ce = (function() {
                    function e(t, r, n) {
                        const o =
                            arguments.length > 3 && void 0 !== arguments[3]
                                ? arguments[3]
                                : {};
                        f()(this, e),
                            fe.set(this, { writable: !0, value: void 0 }),
                            le.set(this, { writable: !0, value: void 0 }),
                            pe.set(this, { writable: !0, value: void 0 }),
                            he.set(this, { writable: !0, value: [] }),
                            de.set(this, { writable: !0, value: [] }),
                            me.set(this, { writable: !0, value: !1 }),
                            ve.set(this, { writable: !0, value: [] }),
                            ge.set(this, {
                                writable: !0,
                                value: { maxTimeline: 5 },
                            }),
                            ye.set(this, { writable: !0, value: 100 }),
                            be.set(this, { writable: !0, value: ['baseUrl'] }),
                            we.set(this, { writable: !0, value: void 0 }),
                            xe.set(this, { writable: !0, value: void 0 }),
                            Ee.set(this, { writable: !0, value: void 0 }),
                            _e.set(this, { writable: !0, value: void 0 }),
                            this._setErrorTrackerId(r),
                            this._setApiUrl(t),
                            this._setErrorTrackerKey(n),
                            this._setUpOptions(o),
                            this._setEventId(),
                            v()(this, me, 'undefined' != typeof window),
                            v()(
                                this,
                                le,
                                new Y(
                                    this.getEventId(),
                                    d()(this, me),
                                    d()(this, ge)
                                )
                            ),
                            v()(this, fe, new N()),
                            d()(this, me)
                                ? this._setUpErrorListener()
                                : this._setUpNodeErrorListener();
                    }
                    let t;
                    return (
                        p()(e, [
                            {
                                key: '_setErrorTrackerId',
                                value: function(e) {
                                    v()(this, xe, e);
                                },
                            },
                            {
                                key: '_setErrorTrackerKey',
                                value: function(e) {
                                    v()(this, Ee, e);
                                },
                            },
                            {
                                key: '_setApiUrl',
                                value: function(e) {
                                    v()(
                                        this,
                                        _e,
                                        ''
                                            .concat(e, '/error-tracker/')
                                            .concat(d()(this, xe), '/track')
                                    );
                                },
                            },
                            {
                                key: '_setUpOptions',
                                value: function(e) {
                                    for (
                                        let t = 0, r = Object.entries(e);
                                        t < r.length;
                                        t++
                                    ) {
                                        const n = j()(r[t], 2),
                                            o = n[0],
                                            i = n[1];
                                        d()(this, be).includes(o) ||
                                            (d()(this, ge)[o] &&
                                                ('maxTimeline' === o &&
                                                (i > d()(this, ye) || i < 1)
                                                    ? (d()(this, ge)[o] = d()(
                                                          this,
                                                          ye
                                                      ))
                                                    : (d()(this, ge)[o] = i)));
                                    }
                                },
                            },
                            {
                                key: '_setEventId',
                                value: function() {
                                    v()(this, pe, ie());
                                },
                            },
                            {
                                key: 'getEventId',
                                value: function() {
                                    return d()(this, pe);
                                },
                            },
                            {
                                key: 'setTag',
                                value: function(e, t) {
                                    if (
                                        'string' != typeof e ||
                                        'string' != typeof t
                                    )
                                        return 'Invalid Tags type';
                                    const r = d()(this, he).findIndex(function(
                                        t
                                    ) {
                                        return t.key === e;
                                    });
                                    -1 !== r
                                        ? (d()(this, he)[r].value = t)
                                        : v()(
                                              this,
                                              he,
                                              [].concat(T()(d()(this, he)), [
                                                  { key: e, value: t },
                                              ])
                                          );
                                },
                            },
                            {
                                key: 'setTags',
                                value: function(e) {
                                    const t = this;
                                    if (!Array.isArray(e))
                                        return 'Invalid Tags type';
                                    e.forEach(function(e) {
                                        e.key &&
                                            e.value &&
                                            t.setTag(e.key, e.value);
                                    });
                                },
                            },
                            {
                                key: '_getTags',
                                value: function() {
                                    return d()(this, he);
                                },
                            },
                            {
                                key: 'setExtras',
                                value: function(e) {
                                    const t = this;
                                    e.forEach(function(e) {
                                        e.key &&
                                            e.extra &&
                                            t.setExtra(e.key, e.extra);
                                    });
                                },
                            },
                            {
                                key: 'setExtra',
                                value: function(e, t) {
                                    v()(
                                        this,
                                        de,
                                        ue(
                                            ue({}, d()(this, de)),
                                            {},
                                            k()({}, e, t)
                                        )
                                    );
                                },
                            },
                            {
                                key: 'setFingerprint',
                                value: function(e) {
                                    if (
                                        'string' != typeof e &&
                                        !Array.isArray(e)
                                    )
                                        return 'Invalid Fingerprint Format';
                                    v()(
                                        this,
                                        ve,
                                        e ? (Array.isArray(e) ? e : [e]) : []
                                    );
                                },
                            },
                            {
                                key: '_getFingerprint',
                                value: function(e) {
                                    return (
                                        d()(this, ve).length < 1 &&
                                            this.setFingerprint(e),
                                        d()(this, ve)
                                    );
                                },
                            },
                            {
                                key: '_setUpErrorListener',
                                value: function() {
                                    const e = this;
                                    window.onerror = function(t, r, n, o, i) {
                                        const s = {
                                            message: t,
                                            file: r,
                                            line: n,
                                            col: o,
                                            error: i,
                                        };
                                        if (
                                            !(
                                                (s.message
                                                    ? s.message.toLowerCase()
                                                    : s.toLowerCase()
                                                ).indexOf('script error') > -1
                                            )
                                        ) {
                                            const a = d()(
                                                    e,
                                                    fe
                                                )._getErrorStackTrace(s),
                                                u = { message: a.message };
                                            d()(e, le).logErrorEvent(u),
                                                e.setTag('handled', 'false'),
                                                e.prepareErrorObject(
                                                    'error',
                                                    a
                                                ),
                                                e.sendErrorEventToServer();
                                        }
                                    };
                                },
                            },
                            {
                                key: '_setUpNodeErrorListener',
                                value: function() {
                                    const e = this;
                                    process
                                        .on('uncaughtException', function(t) {
                                            console.log(''.concat(t)),
                                                e._manageErrorNode(t);
                                        })
                                        .on('unhandledRejection', function(t) {
                                            console.log(
                                                'UnhandledPromiseRejectionWarning: '.concat(
                                                    t.stack
                                                )
                                            ),
                                                e._manageErrorNode(t);
                                        });
                                },
                            },
                            {
                                key: '_manageErrorNode',
                                value: function(e) {
                                    const t = d()(this, fe)._getErrorStackTrace(
                                            e
                                        ),
                                        r = { message: t.message };
                                    return (
                                        d()(this, le).logErrorEvent(r),
                                        this.setTag('handled', 'false'),
                                        this.prepareErrorObject('error', t),
                                        this.sendErrorEventToServer()
                                    );
                                },
                            },
                            {
                                key: 'addToTimeline',
                                value: function(e, t, r) {
                                    const n = {
                                        category: e,
                                        data: { content: t },
                                        type: r,
                                    };
                                    d()(this, le).logCustomTimelineEvent(n);
                                },
                            },
                            {
                                key: 'getTimeline',
                                value: function() {
                                    return d()(this, le).getTimeline();
                                },
                            },
                            {
                                key: 'captureMessage',
                                value: function(e) {
                                    return (
                                        this.setTag('handled', 'true'),
                                        this.prepareErrorObject('message', {
                                            message: e,
                                        }),
                                        this.sendErrorEventToServer()
                                    );
                                },
                            },
                            {
                                key: 'captureException',
                                value: function(e) {
                                    const t = d()(this, fe)._getErrorStackTrace(
                                        e
                                    );
                                    return (
                                        this.setTag('handled', 'true'),
                                        this.prepareErrorObject('exception', t),
                                        this.sendErrorEventToServer()
                                    );
                                },
                            },
                            {
                                key: 'prepareErrorObject',
                                value: function(e, t) {
                                    const r = this.getTimeline(),
                                        n = d()(
                                            this,
                                            fe
                                        )._getUserDeviceDetails(),
                                        o = this._getTags(),
                                        i = this._getFingerprint(t.message);
                                    v()(this, we, {
                                        type: e,
                                        timeline: r,
                                        exception: t,
                                        deviceDetails: n,
                                        eventId: this.getEventId(),
                                        tags: o,
                                        fingerprint: i,
                                        errorTrackerKey: d()(this, Ee),
                                        sdk: this.getSDKDetails(),
                                    });
                                },
                            },
                            {
                                key: 'sendErrorEventToServer',
                                value:
                                    ((t = u()(
                                        o.a.mark(function e() {
                                            let t,
                                                r = this;
                                            return o.a.wrap(
                                                function(e) {
                                                    for (;;)
                                                        switch (
                                                            (e.prev = e.next)
                                                        ) {
                                                            case 0:
                                                                return (
                                                                    (e.next = 2),
                                                                    this._makeApiRequest(
                                                                        d()(
                                                                            this,
                                                                            we
                                                                        )
                                                                    )
                                                                        .then(
                                                                            function(
                                                                                e
                                                                            ) {
                                                                                (t = e),
                                                                                    r._setEventId(),
                                                                                    r._clear(
                                                                                        r.getEventId()
                                                                                    );
                                                                            }
                                                                        )
                                                                        .catch(
                                                                            function(
                                                                                e
                                                                            ) {
                                                                                return (t = e);
                                                                            }
                                                                        )
                                                                );
                                                            case 2:
                                                                return e.abrupt(
                                                                    'return',
                                                                    t
                                                                );
                                                            case 3:
                                                            case 'end':
                                                                return e.stop();
                                                        }
                                                },
                                                e,
                                                this
                                            );
                                        })
                                    )),
                                    function() {
                                        return t.apply(this, arguments);
                                    }),
                            },
                            {
                                key: '_makeApiRequest',
                                value: function(e) {
                                    const t = this;
                                    return new Promise(function(r, n) {
                                        y.a
                                            .post(d()(t, _e), e)
                                            .then(function(e) {
                                                r(e);
                                            })
                                            .catch(function(e) {
                                                n(e);
                                            });
                                    });
                                },
                            },
                            {
                                key: 'getCurrentEvent',
                                value: function() {
                                    return d()(this, we);
                                },
                            },
                            {
                                key: 'getSDKDetails',
                                value: function() {
                                    return { name: se.a, version: se.b };
                                },
                            },
                            {
                                key: '_clear',
                                value: function(e) {
                                    v()(this, he, []),
                                        v()(this, de, []),
                                        v()(this, ve, []),
                                        d()(this, le).clearTimeline(e);
                                },
                            },
                        ]),
                        e
                    );
                })(),
                fe = new WeakMap(),
                le = new WeakMap(),
                pe = new WeakMap(),
                he = new WeakMap(),
                de = new WeakMap(),
                me = new WeakMap(),
                ve = new WeakMap(),
                ge = new WeakMap(),
                ye = new WeakMap(),
                be = new WeakMap(),
                we = new WeakMap(),
                xe = new WeakMap(),
                Ee = new WeakMap(),
                _e = new WeakMap(),
                Ce = ce;
            t.default = { Logger: _, ErrorTracker: Ce };
        },
    ]).default;
});
