/* Copyright Squiz - For full terms see licence.txt */
var HTMLCS = new function () {
        var a = {}, b = [],
            c = {}, d = null,
            e = null,
            f = [],
            g = {};
        this.ERROR = 1;
        this.WARNING = 2;
        this.NOTICE = 3;
        this.process = function (v, u, e) {
            a = {};
            b = [];
            c = {};
            d = null;
            if (!u) return !1;
            a[s(v)] ? HTMLCS.run(e, u) : this.loadStandard(v, function () {
                HTMLCS.run(e, u)
            })
        };
        this.loadStandard = function (a, b) {
            if (!a) return !1;
            i(a, function () {
                d = a;
                b.call(this)
            })
        };
        this.run = function (a, b) {
            var c = null,
                d = !1;
            if ("string" === typeof b) {
                var d = !0,
                    e = document.createElement("iframe");
                e.style.display = "none";
                e = document.body.insertBefore(e, null);
                e.contentDocument ?
                    c = e.contentDocument : c.contentWindow && (c = e.contentWindow.document);
                e.load = function () {
                    this.onload = this.onreadystatechange = null;
                    if (HTMLCS.isFullDoc(b) === false) {
                        c = c.getElementsByTagName("body")[0];
                        var d = c.getElementsByTagName("div")[0];
                        if (d && d.id === "__HTMLCS-source-wrap") {
                            d.id = "";
                            c = d
                        }
                    }
                    d = w(c);
                    d.unshift(c);
                    h(d, c, a)
                };
                e.onreadystatechange = function () {
                    if (/^(complete|loaded)$/.test(this.readyState) === true) {
                        this.onreadystatechange = null;
                        this.load()
                    }
                };
                e.onload = e.load;
                !1 === HTMLCS.isFullDoc(b) && -1 === b.indexOf("<body") ?
                    c.write('<div id="__HTMLCS-source-wrap">' + b + "</div>") : c.write(b);
                c.close()
            } else c = b;
            c ? (a = a || function () {}, f = [], e = w(c), e.unshift(c), !1 === d && h(e, c, a)) : a.call(this)
        };
        this.isFullDoc = function (a) {
            var b = !1;
            if ("string" === typeof a) - 1 !== a.toLowerCase().indexOf("<html") ? b = !0 : -1 !== a.toLowerCase().indexOf("<head") && -1 !== a.toLowerCase().indexOf("<body") && (b = !0);
            else if ("html" === a.nodeName.toLowerCase() || a.documentElement) b = !0;
            return b
        };
        this.addMessage = function (a, b, c, t, h) {
            t = d + "." + e._name + "." + t;
            f.push({
                type: a,
                element: b,
                msg: g[t] || c,
                code: t,
                data: h
            })
        };
        this.getMessages = function () {
            return f.concat([])
        };
        var h = function (a, b, d) {
            for (var e = []; 0 < a.length;) {
                for (var g = a.shift(), h = g === b ? "_top" : g.tagName.toLowerCase(), i = 0; i < e.length;) g === e[i].element ? (f.push(e[i]), e.splice(i, 1)) : i++;
                c[h] && 0 < c[h].length && (j(g, c[h].concat([]), b), "_top" === h && (e = f, f = []))
            }!0 === d instanceof Function && d.call(this)
        }, j = function (a, b, c, d) {
                for (; 0 < b.length;) {
                    var f = b.shift();
                    e = f;
                    !0 === f.useCallback ? f.process(a, c, function () {
                        j(a, b, c);
                        b = []
                    }) : f.process(a, c)
                }!0 === d instanceof
                Function && d.call(this)
            }, i = function (a, b, c) {
                0 !== a.indexOf("http") && (a = s(a));
                var d = a.split("/");
                window["HTMLCS_" + d[d.length - 2]] ? k(a, b, c) : x(a, function () {
                    k(a, b, c)
                })
            }, k = function (b, c, d) {
                var e = b.split("/"),
                    f = window["HTMLCS_" + e[e.length - 2]],
                    e = {}, g;
                for (g in f)!0 === f.hasOwnProperty(g) && (e[g] = f[g]);
                if (!e) return !1;
                a[b] = e;
                if (d)
                    if (d.include && 0 < d.include.length) e.sniffs = d.include;
                    else if (d.exclude)
                    for (g = 0; g < d.exclude.length; g++) f = e.sniffs.find(d.exclude[g]), 0 <= f && e.sniffs.splice(f, 1);
                d = e.sniffs.slice(0, e.sniffs.length);
                m(b, d, c)
            }, m = function (a, d, e) {
                if (0 === d.length) e.call(this);
                else {
                    var f = d.shift();
                    if ("string" === typeof f) {
                        var h = function () {
                            var g = y(a, f);
                            if (g) {
                                if (g.register) var h = g.register();
                                if (h && 0 < h.length)
                                    for (var i = 0; i < h.length; i++) c[h[i]] || (c[h[i]] = []), c[h[i]].push(g);
                                b.push(g)
                            }
                            m(a, d, e)
                        };
                        if (y(a, f)) h();
                        else {
                            var j;
                            j = a.split("/");
                            j.pop();
                            j = j.join("/") + "/Sniffs/" + f.replace(/\./g, "/") + ".js";
                            x(j, h)
                        }
                    } else i(f.standard, function () {
                        if (f.messages)
                            for (var b in f.messages) g[b] = f.messages[b];
                        m(a, d, e)
                    }, {
                        exclude: f.exclude,
                        include: f.include
                    })
                }
            },
            s = function (a) {
                for (var b = document.getElementsByTagName("script"), c = null, d = 0; d < b.length; d++)
                    if (b[d].src && b[d].src.match(/HTMLCS\.js/)) {
                        c = b[d].src.replace(/HTMLCS\.js/, "");
                        break
                    }
                return c + "Standards/" + a + "/ruleset.js"
            }, y = function (b, c) {
                var d;
                d = "HTMLCS_" + (a[b].name + "_Sniffs_");
                d += c.split(".").join("_");
                if (!window[d]) return null;
                window[d]._name = c;
                return window[d]
            }, x = function (a, b) {
                var c = document.createElement("script");
                c.onload = function () {
                    c.onload = null;
                    c.onreadystatechange = null;
                    b.call(this)
                };
                c.onreadystatechange =
                    function () {
                        !0 === /^(complete|loaded)$/.test(this.readyState) && (c.onreadystatechange = null, c.onload())
                };
                c.src = a;
                document.head ? document.head.appendChild(c) : document.getElementsByTagName("head")[0].appendChild(c)
            }, w = function (a) {
                for (var a = a || document, a = a.getElementsByTagName("*"), b = [], c = 0; c < a.length; c++) b.push(a[c]);
                return b
            };
        this.isStringEmpty = function (a) {
            if (!a) return true;
            var b = !0; - 1 !== a.indexOf(String.fromCharCode(160)) ? b = !1 : !1 === /^\s*$/.test(a) && (b = !1);
            return b
        };
        this.util = new function () {
            this.trim = function (a) {
                return a.replace(/^\s*(.*)\s*$/g,
                    "$1")
            };
            this.isStringEmpty = function (a) {
                if (!a) return true;
                var b = !0; - 1 !== a.indexOf(String.fromCharCode(160)) ? b = !1 : !1 === /^\s*$/.test(a) && (b = !1);
                return b
            };
            this.getElementWindow = function (a) {
                var a = a.ownerDocument ? a.ownerDocument : a,
                    b = null;
                return b = a.defaultView ? a.defaultView : a.parentWindow
            };
            this.style = function (a) {
                var b = null,
                    c = this.getElementWindow(a);
                a.currentStyle ? b = a.currentStyle : c.getComputedStyle && (b = c.getComputedStyle(a, null));
                return b
            };
            this.isHidden = function (a) {
                var b = !1,
                    a = this.style(a);
                if (null !== a) {
                    if ("hidden" === a.visibility ||
                        "none" === a.display) b = !0;
                    0 > parseInt(a.left, 10) + parseInt(a.width, 10) && (b = !0);
                    0 > parseInt(a.top, 10) + parseInt(a.height, 10) && (b = !0)
                }
                return b
            };
            this.isInDocument = function (a) {
                for (a = a.parentNode; a && a.ownerDocument;) a = a.parentNode;
                return null === a ? !1 : !0
            };
            this.contains = function (a, b) {
                var c = !1;
                a !== b && (a.ownerDocument ? a.contains && !0 === a.contains(b) ? c = !0 : a.compareDocumentPosition && 0 < (a.compareDocumentPosition(b) & 16) && (c = !0) : b.ownerDocument && b.ownerDocument === a && (c = !0));
                return c
            };
            this.isLayoutTable = function (a) {
                return null ===
                    a.querySelector("th") ? !0 : !1
            };
            this.contrastRatio = function (a, b) {
                var c = (0.05 + this.relativeLum(a)) / (0.05 + this.relativeLum(b));
                1 > c && (c = 1 / c);
                return c
            };
            this.relativeLum = function (a) {
                a.charAt && (a = this.colourStrToRGB(a));
                var b = {}, c;
                for (c in a) b[c] = 0.03928 >= a[c] ? a[c] / 12.92 : Math.pow((a[c] + 0.055) / 1.055, 2.4);
                return 0.2126 * b.red + 0.7152 * b.green + 0.0722 * b.blue
            };
            this.colourStrToRGB = function (a) {
                a = a.toLowerCase();
                "rgb" === a.substring(0, 3) ? (a = /^rgba?\s*\((\d+),\s*(\d+),\s*(\d+)([^)]*)\)$/.exec(a), a = {
                    red: a[1] / 255,
                    green: a[2] / 255,
                    blue: a[3] / 255
                }) : ("#" === a.charAt(0) && (a = a.substr(1)), 3 === a.length && (a = a.replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3")), a = {
                    red: parseInt(a.substr(0, 2), 16) / 255,
                    green: parseInt(a.substr(2, 2), 16) / 255,
                    blue: parseInt(a.substr(4, 2), 16) / 255
                });
                return a
            };
            this.RGBtoColourStr = function (a) {
                colourStr = "#";
                a.red = Math.round(255 * a.red);
                a.green = Math.round(255 * a.green);
                a.blue = Math.round(255 * a.blue);
                0 === a.red % 17 && 0 === a.green % 17 && 0 === a.blue % 17 ? (colourStr += (a.red / 17).toString(16), colourStr += (a.green / 17).toString(16), colourStr +=
                    (a.blue / 17).toString(16)) : (16 > a.red && (colourStr += "0"), colourStr += a.red.toString(16), 16 > a.green && (colourStr += "0"), colourStr += a.green.toString(16), 16 > a.blue && (colourStr += "0"), colourStr += a.blue.toString(16));
                return colourStr
            };
            this.sRGBtoHSV = function (a) {
                a.charAt && (a = this.colourStrToRGB(a));
                var b = {
                    hue: 0,
                    saturation: 0,
                    value: 0
                }, c = Math.max(a.red, a.green, a.blue),
                    d = Math.min(a.red, a.green, a.blue),
                    d = c - d;
                0 === d ? b.value = a.red : (b.value = c, b.hue = c === a.red ? (a.green - a.blue) / d : c === a.green ? 2 + (a.blue - a.red) / d : 4 + (a.red - a.green) /
                    d, b.hue *= 60, 360 <= b.hue && (b.hue -= 360), b.saturation = d / b.value);
                return b
            };
            this.HSVtosRGB = function (a) {
                var b = {
                    red: 0,
                    green: 0,
                    blue: 0
                };
                if (0 === a.saturation) b.red = a.value, b.green = a.value, b.blue = a.value;
                else {
                    var c = a.value * a.saturation,
                        d = a.value - c,
                        a = a.hue / 60,
                        e = c * (1 - Math.abs(a - 2 * Math.floor(a / 2) - 1));
                    switch (Math.floor(a)) {
                    case 0:
                        b.red = c;
                        b.green = e;
                        break;
                    case 1:
                        b.green = c;
                        b.red = e;
                        break;
                    case 2:
                        b.green = c;
                        b.blue = e;
                        break;
                    case 3:
                        b.blue = c;
                        b.green = e;
                        break;
                    case 4:
                        b.blue = c;
                        b.red = e;
                        break;
                    case 5:
                        b.red = c, b.blue = e
                    }
                    b.red += d;
                    b.green +=
                        d;
                    b.blue += d
                }
                return b
            };
            this.getElementTextContent = function (a, b) {
                void 0 === b && (b = !0);
                for (var a = a.cloneNode(!0), c = [], d = 0; d < a.childNodes.length; d++) c.push(a.childNodes[d]);
                for (var e = []; 0 < c.length;) {
                    var f = c.shift();
                    if (1 === f.nodeType)
                        if ("img" === f.nodeName.toLowerCase())!0 === b && !0 === f.hasAttribute("alt") && e.push(f.getAttribute("alt"));
                    else
                        for (d = 0; d < f.childNodes.length; d++) c.push(f.childNodes[d]);
                    else 3 === f.nodeType && e.push(f.nodeValue)
                }
                return e = e.join("").replace(/^\s+|\s+$/g, "")
            };
            this.testTableHeaders =
                function (a) {
                    for (var b = {
                        required: !0,
                        used: !1,
                        correct: !0,
                        allowScope: !0,
                        missingThId: [],
                        missingTd: [],
                        wrongHeaders: []
                    }, c = a.getElementsByTagName("tr"), d = [], e = [], f = [], g = 0, h = 0, i = 0; i < c.length; i++)
                        for (var j = c[i], k = 0, m = 0; m < j.childNodes.length; m++) {
                            var n = j.childNodes[m];
                            if (1 === n.nodeType) {
                                if (d[i])
                                    for (; d[i][0] === k;) d[i].shift(), k++;
                                var o = n.nodeName.toLowerCase(),
                                    q = Number(n.getAttribute("rowspan")) || 1,
                                    r = Number(n.getAttribute("colspan")) || 1;
                                if (1 < q)
                                    for (var l = i + 1; l < i + q; l++) {
                                        d[l] || (d[l] = []);
                                        for (var p = k; p < k + r; p++) d[l].push(p)
                                    }
                                if ("th" ===
                                    o) {
                                    if ("" === (n.getAttribute("id") || "")) b.correct = !1, b.missingThId.push(n);
                                    1 < q && 1 < r ? b.allowScope = !1 : !0 === b.allowScope && (void 0 === f[k] && (f[k] = 0), void 0 === e[i] && (e[i] = 0), e[i] += r, f[k] += q)
                                } else "td" === o && (!0 === n.hasAttribute("headers") && !1 === /^\s*$/.test(n.getAttribute("headers"))) && (b.used = !0);
                                k += r
                            }
                        }
                    for (l = 0; l < e.length; l++) 1 < e[l] && g++;
                    for (l = 0; l < f.length; l++) 1 < f[l] && h++;
                    if (1 < g || 1 < h) b.allowScope = !1;
                    else if (!0 === b.allowScope && (0 === g || 0 === h)) b.required = !1;
                    a = HTMLCS.util.getCellHeaders(a);
                    for (l = 0; l < a.length; l++) n =
                        a[l].cell, c = a[l].headers, !1 === n.hasAttribute("headers") ? (b.correct = !1, b.missingTd.push(n)) : (d = (n.getAttribute("headers") || "").split(/\s+/), 0 === d.length ? (b.correct = !1, b.missingTd.push(n)) : (d = " " + d.sort().join(" ") + " ", d = d.replace(/\s+/g, " ").replace(/(\w+\s)\1+/g, "$1").replace(/^\s*(.*?)\s*$/g, "$1"), c !== d && (b.correct = !1, n = {
                            element: n,
                            expected: c,
                            actual: n.getAttribute("headers") || ""
                        }, b.wrongHeaders.push(n))));
                    return b
            };
            this.getCellHeaders = function (a) {
                if ("object" !== typeof a || "table" !== a.nodeName.toLowerCase()) return null;
                for (var a = a.getElementsByTagName("tr"), b = [], c = {}, d = {}, e = [], f = ["th", "td"], g = 0; g < f.length; g++)
                    for (var i = f[g], h = 0; h < a.length; h++)
                        for (var k = a[h], j = 0, m = 0; m < k.childNodes.length; m++) {
                            var n = k.childNodes[m];
                            if (1 === n.nodeType) {
                                if (b[h])
                                    for (; b[h][0] === j;) b[h].shift(), j++;
                                var o = n.nodeName.toLowerCase(),
                                    q = Number(n.getAttribute("rowspan")) || 1,
                                    r = Number(n.getAttribute("colspan")) || 1;
                                if (1 < q)
                                    for (var l = h + 1; l < h + q; l++) {
                                        b[l] || (b[l] = []);
                                        for (var p = j; p < j + r; p++) b[l].push(p)
                                    }
                                if (o === i)
                                    if ("th" === o) {
                                        n = n.getAttribute("id") || "";
                                        for (l = h; l < h + q; l++) c[l] = c[l] || {
                                            first: j,
                                            ids: []
                                        }, c[l].ids.push(n);
                                        for (l = j; l < j + r; l++) d[l] = d[l] || {
                                            first: h,
                                            ids: []
                                        }, d[l].ids.push(n)
                                    } else if ("td" === o) {
                                    o = [];
                                    for (l = h; l < h + q; l++)
                                        for (p = j; p < j + r; p++) c[l] && p >= c[l].first && (o = o.concat(c[l].ids)), d[p] && l >= d[p].first && (o = o.concat(d[p].ids));
                                    0 < o.length && (o = " " + o.sort().join(" ") + " ", o = o.replace(/\s+/g, " ").replace(/(\w+\s)\1+/g, "$1").replace(/^\s*(.*?)\s*$/g, "$1"), e.push({
                                        cell: n,
                                        headers: o
                                    }))
                                }
                                j += r
                            }
                        }
                return e
            }
        }
    }, HTMLCS_Section508 = {
        name: "Section508",
        description: "U.S. Section 508 Standard",
        sniffs: "ABCDGHIJKLMNOP".split(""),
        getMsgInfo: function (a) {
            return [["Section", "1194.22 (" + a.split(".", 3)[1].toLowerCase() + ")"]]
        }
    }, HTMLCS_Section508_Sniffs_N = {
        register: function () {
            return ["form"]
        },
        process: function (a) {
            "form" === a.nodeName.toLowerCase() && (HTMLCS.addMessage(HTMLCS.NOTICE, a, "If an input error is automatically detected in this form, check that the item(s) in error are identified and the error(s) are described to the user in text.", "Errors"), HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that descriptive labels or instructions (including for required fields) are provided for user input in this form.",
                "Labels"), HTMLCS.addMessage(HTMLCS.NOTICE, a, "Ensure that this form can be navigated using the keyboard and other accessibility tools.", "KeyboardNav"))
        }
    }, HTMLCS_Section508_Sniffs_B = {
        register: function () {
            return ["object", "applet", "embed", "video"]
        },
        process: function (a) {
            a.nodeName.toLowerCase();
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "For multimedia containing video, ensure a synchronised audio description or text alternative for the video portion is provided.", "Video");
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "For multimedia containing synchronised audio and video, ensure synchronised captions are provided for the audio portion.",
                "Captions")
        }
    }, HTMLCS_Section508_Sniffs_D = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            a === b && (HTMLCS.addMessage(HTMLCS.NOTICE, b, "Ensure that content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.", "Linearised"), this.testPresentationMarkup(b), this.testHeadingOrder(b), 0 < b.querySelectorAll('script, link[rel="stylesheet"]').length && HTMLCS.addMessage(HTMLCS.NOTICE, b, 'If content is hidden and made visible using scripting (such as "click to expand" sections), ensure this content is readable when scripts and style sheets are disabled.',
                "HiddenText"))
        },
        testPresentationMarkup: function (a) {
            for (var b = a.querySelectorAll("b, i, u, s, strike, tt, big, small, center, font"), c = 0; c < b.length; c++) {
                var d = "PresMarkup." + b[c].nodeName.substr(0, 1).toUpperCase() + b[c].nodeName.substr(1).toLowerCase();
                HTMLCS.addMessage(HTMLCS.WARNING, b[c], "Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.", d)
            }
            b = a.querySelectorAll("*[align]");
            for (c = 0; c < b.length; c++) d = "PresMarkup.AlignAttr", HTMLCS.addMessage(HTMLCS.WARNING,
                b[c], "Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.", d)
        },
        testHeadingOrder: function (a) {
            for (var b = 0, a = a.querySelectorAll("h1, h2, h3, h4, h5, h6"), c = 0; c < a.length; c++) {
                var d = parseInt(a[c].nodeName.substr(1, 1));
                if (1 < d - b) {
                    var e = "should be an h" + (b + 1) + " to be properly nested";
                    0 === b && (e = "appears to be the primary document heading, so should be an h1 element");
                    HTMLCS.addMessage(HTMLCS.ERROR, a[c], "The heading structure is not logically nested. This h" +
                        d + " element " + e + ".", "HeadingOrder")
                }
                b = d
            }
        }
    }, HTMLCS_Section508_Sniffs_O = {
        register: function () {
            return ["_top", "a", "area"]
        },
        process: function (a, b) {
            if (a === b) HTMLCS.addMessage(HTMLCS.NOTICE, b, "Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.", "SkipLinks");
            else if (!0 === a.hasAttribute("href")) {
                var c = a.getAttribute("href"),
                    c = HTMLCS.util.trim(c);
                if (1 < c.length && "#" === c.charAt(0)) {
                    c = c.substr(1);
                    try {
                        var d = b;
                        d.ownerDocument && (d =
                            d.ownerDocument);
                        var e = d.getElementById(c);
                        null === e && (e = d.querySelector('a[name="' + c + '"]'));
                        if (null === e || !1 === HTMLCS.util.contains(b, e))!0 === HTMLCS.isFullDoc(b) || "body" === b.nodeName.toLowerCase() ? HTMLCS.addMessage(HTMLCS.ERROR, a, 'This link points to a named anchor "' + c + '" within the document, but no anchor exists with that name.', "NoSuchID") : HTMLCS.addMessage(HTMLCS.WARNING, a, 'This link points to a named anchor "' + c + '" within the document, but no anchor exists with that name in the fragment tested.',
                            "NoSuchIDFragment")
                    } catch (f) {}
                }
            }
        }
    }, HTMLCS_Section508_Sniffs_L = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            a === b && (this.addProcessLinksMessages(b), this.testKeyboard(b))
        },
        addProcessLinksMessages: function (a) {
            for (var a = HTMLCS_WCAG2AAA_Sniffs_Principle4_Guideline4_1_4_1_2.processLinks(a), b = 0; b < a.emptyNoId.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.emptyNoId[b], "Anchor element found with no link content and no name and/or ID attribute.", "EmptyAnchorNoId");
            for (b = 0; b < a.placeholder.length; b++) HTMLCS.addMessage(HTMLCS.WARNING,
                a.placeholder[b], "Anchor element found with link content, but no href, ID, or name attribute has been supplied.", "PlaceholderAnchor");
            for (b = 0; b < a.noContent.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.noContent[b], "Anchor element found with a valid href attribute, but no link content has been supplied.", "NoContentAnchor")
        },
        testKeyboard: function (a) {
            for (var b = a.querySelectorAll("*[ondblclick]"), c = 0; c < b.length; c++) HTMLCS.addMessage(HTMLCS.WARNING, b[c], "Ensure the functionality provided by double-clicking on this element is available through the keyboard.",
                "DblClick");
            b = a.querySelectorAll("*[onmouseover]");
            for (c = 0; c < b.length; c++) HTMLCS.addMessage(HTMLCS.WARNING, b[c], "Ensure the functionality provided by mousing over this element is available through the keyboard; for instance, using the focus event.", "MouseOver");
            b = a.querySelectorAll("*[onmouseout]");
            for (c = 0; c < b.length; c++) HTMLCS.addMessage(HTMLCS.WARNING, b[c], "Ensure the functionality provided by mousing out of this element is available through the keyboard; for instance, using the blur event.", "MouseOut");
            b = a.querySelectorAll("*[onmousemove]");
            for (c = 0; c < b.length; c++) HTMLCS.addMessage(HTMLCS.WARNING, b[c], "Ensure the functionality provided by moving the mouse on this element is available through the keyboard.", "MouseMove");
            b = a.querySelectorAll("*[onmousedown]");
            for (c = 0; c < b.length; c++) HTMLCS.addMessage(HTMLCS.WARNING, b[c], "Ensure the functionality provided by mousing down on this element is available through the keyboard; for instance, using the keydown event.", "MouseDown");
            a = a.querySelectorAll("*[onmouseup]");
            for (c = 0; c < a.length; c++) HTMLCS.addMessage(HTMLCS.WARNING, a[c], "Ensure the functionality provided by mousing up on this element is available through the keyboard; for instance, using the keyup event.", "MouseUp")
        }
    }, HTMLCS_Section508_Sniffs_K = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "If this page cannot be made compliant, a text-only page with equivalent information or functionality should be provided. The alternative page needs to be updated in line with this page's content.",
                "AltVersion")
        }
    }, HTMLCS_Section508_Sniffs_C = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Ensure that any information conveyed using colour alone is also available without colour, such as through context or markup.", "Colour")
        }
    }, HTMLCS_Section508_Sniffs_I = {
        register: function () {
            return ["frame", "iframe", "object"]
        },
        process: function (a, b) {
            var c = a.nodeName.toLowerCase(),
                d = a.hasAttribute("title"),
                e = HTMLCS.util.isStringEmpty(a.getAttribute("title"));
            (!0 === d || !0 ===
                e) && HTMLCS.addMessage(HTMLCS.ERROR, b, "This " + c + " element is missing title text. Frames should be titled with text that facilitates frame identification and navigation.", "Frames")
        }
    }, HTMLCS_Section508_Sniffs_J = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that no component of the content flickers at a rate of greater than 2 and less than 55 times per second.", "Flicker")
        }
    }, HTMLCS_Section508_Sniffs_P = {
        register: function () {
            return ["_top", "meta"]
        },
        process: function (a,
            b) {
            a === b ? HTMLCS.addMessage(HTMLCS.NOTICE, b, "If a timed response is required on this page, alert the user and provide sufficient time to allow them to indicate that more time is required.", "TimeLimit") : !0 === a.hasAttribute("http-equiv") && "refresh" === String(a.getAttribute("http-equiv")).toLowerCase() && !0 === /^[1-9]\d*/.test(a.getAttribute("content").toLowerCase()) && (!0 === /url=/.test(a.getAttribute("content").toLowerCase()) ? HTMLCS.addMessage(HTMLCS.ERROR, a, "Meta refresh tag used to redirect to another page, with a time limit that is not zero. Users cannot control this time limit.",
                "MetaRedirect") : HTMLCS.addMessage(HTMLCS.ERROR, a, "Meta refresh tag used to refresh the current page. Users cannot control the time limit for this refresh.", "MetaRefresh"))
        }
    }, HTMLCS_Section508_Sniffs_H = {
        register: function () {
            return ["table"]
        },
        process: function (a) {
            for (var b = HTMLCS.util.testTableHeaders(a), c = 0; c < b.wrongHeaders.length; c++) HTMLCS.addMessage(HTMLCS.ERROR, b.wrongHeaders[c].element, 'Incorrect headers attribute on this td element. Expected "' + b.wrongHeaders[c].expected + '" but found "' + b.wrongHeaders[c].actual +
                '"', "IncorrectHeadersAttr");
            !0 === b.required && !1 === b.allowScope && (!1 === b.used ? HTMLCS.addMessage(HTMLCS.ERROR, a, "The relationship between td elements and their associated th elements is not defined. As this table has multiple levels of th elements, you must use the headers attribute on td elements.", "MissingHeadersAttrs") : (0 < b.missingThId.length && HTMLCS.addMessage(HTMLCS.ERROR, a, "Not all th elements in this table contain an id attribute. These cells should contain ids so that they may be referenced by td elements' headers attributes.",
                "MissingHeaderIds"), 0 < b.missingTd.length && HTMLCS.addMessage(HTMLCS.ERROR, a, "Not all td elements in this table contain a headers attribute. Each headers attribute should list the ids of all th elements associated with that cell.", "IncompleteHeadersAttrs")))
        }
    }, HTMLCS_Section508_Sniffs_G = {
        register: function () {
            return ["table"]
        },
        process: function (a) {
            !0 === HTMLCS.util.isLayoutTable(a) && HTMLCS.addMessage(HTMLCS.NOTICE, a, "This table has no headers. If this is a data table, ensure row and column headers are identified using th elements.",
                "TableHeaders")
        }
    }, HTMLCS_Section508_Sniffs_M = {
        register: function () {
            return "object applet bgsound embed audio video".split(" ")
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "If external media requires a plugin or application to view, ensure a link is provided to a plugin or application that complies with Section 508 accessibility requirements for applications.", "PluginLink")
        }
    }, HTMLCS_Section508_Sniffs_A = {
        register: function () {
            return "img input area object applet bgsound audio".split(" ")
        },
        process: function (a,
            b) {
            if (a === b) this.addNullAltTextResults(b), this.addMediaAlternativesResults(b);
            else {
                var c = a.nodeName.toLowerCase();
                ("object" === c || "bgsound" === c || "audio" === c) && HTMLCS.addMessage(HTMLCS.NOTICE, a, "For multimedia containing audio only, ensure an alternative is available, such as a full text transcript.", "Audio")
            }
        },
        addNullAltTextResults: function (a) {
            for (var a = HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_1_1_1_1.testNullAltText(a), b = 0; b < a.img.emptyAltInLink.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.img.emptyAltInLink[b],
                "Img element is the only content of the link, but is missing alt text. The alt text should describe the purpose of the link.", "Img.EmptyAltInLink");
            for (b = 0; b < a.img.nullAltWithTitle.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.img.nullAltWithTitle[b], "Img element with empty alt text must have absent or empty title attribute.", "Img.NullAltWithTitle");
            for (b = 0; b < a.img.ignored.length; b++) HTMLCS.addMessage(HTMLCS.WARNING, a.img.ignored[b], "Img element is marked so that it is ignored by Assistive Technology.",
                "Img.Ignored");
            for (b = 0; b < a.img.missingAlt.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.img.missingAlt[b], "Img element missing an alt attribute. Use the alt attribute to specify a short text alternative.", "Img.MissingAlt");
            for (b = 0; b < a.img.generalAlt.length; b++) HTMLCS.addMessage(HTMLCS.NOTICE, a.img.generalAlt[b], "Ensure that the img element's alt text serves the same purpose and presents the same information as the image.", "Img.GeneralAlt");
            for (b = 0; b < a.inputImage.missingAlt.length; b++) HTMLCS.addMessage(HTMLCS.ERROR,
                a.inputImage.missingAlt[b], "Image submit button missing an alt attribute. Specify a text alternative that describes the button's function, using the alt attribute.", "InputImage.MissingAlt");
            for (b = 0; b < a.inputImage.generalAlt.length; b++) HTMLCS.addMessage(HTMLCS.NOTICE, a.inputImage.generalAlt[b], "Ensure that the image submit button's alt text identifies the purpose of the button.", "InputImage.GeneralAlt");
            for (b = 0; b < a.area.missingAlt.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.area.missingAlt[b], "Area element in an image map missing an alt attribute. Each area element must have a text alternative that describes the function of the image map area.",
                "Area.MissingAlt");
            for (b = 0; b < a.area.generalAlt.length; b++) HTMLCS.addMessage(HTMLCS.NOTICE, a.area.generalAlt[b], "Ensure that the area element's text alternative serves the same purpose as the part of image map image it references.", "Area.GeneralAlt")
        },
        addMediaAlternativesResults: function (a) {
            for (var a = HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_1_1_1_1.testMediaTextAlternatives(a), b = 0; b < a.object.missingBody.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.object.missingBody[b], "Object elements must contain a text alternative after all other alternatives are exhausted.",
                "Object.MissingBody");
            for (b = 0; b < a.object.generalAlt.length; b++) HTMLCS.addMessage(HTMLCS.NOTICE, a.object.generalAlt[b], "Check that short (and if appropriate, long) text alternatives are available for non-text content that serve the same purpose and present the same information.", "Object.GeneralAlt");
            for (b = 0; b < a.applet.missingBody.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.applet.missingBody[b], "Applet elements must contain a text alternative in the element's body, for browsers without support for the applet element.",
                "Applet.MissingBody");
            for (b = 0; b < a.applet.missingAlt.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.applet.missingAlt[b], "Applet elements must contain an alt attribute, to provide a text alternative to browsers supporting the element but are unable to load the applet.", "Applet.MissingAlt");
            for (b = 0; b < a.applet.generalAlt.length; b++) HTMLCS.addMessage(HTMLCS.NOTICE, a.applet.generalAlt[b], "Check that short (and if appropriate, long) text alternatives are available for non-text content that serve the same purpose and present the same information.",
                "Applet.GeneralAlt")
        }
    }, HTMLCS_WCAG2AAA = {
        name: "WCAG2AAA",
        description: "Web Content Accessibility Guidelines (WCAG) 2.0 AAA",
        sniffs: "Principle1.Guideline1_1.1_1_1 Principle1.Guideline1_2.1_2_1 Principle1.Guideline1_2.1_2_2 Principle1.Guideline1_2.1_2_4 Principle1.Guideline1_2.1_2_5 Principle1.Guideline1_2.1_2_6 Principle1.Guideline1_2.1_2_7 Principle1.Guideline1_2.1_2_8 Principle1.Guideline1_2.1_2_9 Principle1.Guideline1_3.1_3_1 Principle1.Guideline1_3.1_3_1_AAA Principle1.Guideline1_3.1_3_2 Principle1.Guideline1_3.1_3_3 Principle1.Guideline1_4.1_4_1 Principle1.Guideline1_4.1_4_2 Principle1.Guideline1_4.1_4_3_F24 Principle1.Guideline1_4.1_4_3_Contrast Principle1.Guideline1_4.1_4_6 Principle1.Guideline1_4.1_4_7 Principle1.Guideline1_4.1_4_8 Principle1.Guideline1_4.1_4_9 Principle2.Guideline2_1.2_1_1 Principle2.Guideline2_1.2_1_2 Principle2.Guideline2_2.2_2_2 Principle2.Guideline2_2.2_2_3 Principle2.Guideline2_2.2_2_4 Principle2.Guideline2_2.2_2_5 Principle2.Guideline2_3.2_3_2 Principle2.Guideline2_4.2_4_1 Principle2.Guideline2_4.2_4_2 Principle2.Guideline2_4.2_4_3 Principle2.Guideline2_4.2_4_5 Principle2.Guideline2_4.2_4_6 Principle2.Guideline2_4.2_4_7 Principle2.Guideline2_4.2_4_8 Principle2.Guideline2_4.2_4_9 Principle3.Guideline3_1.3_1_1 Principle3.Guideline3_1.3_1_2 Principle3.Guideline3_1.3_1_3 Principle3.Guideline3_1.3_1_4 Principle3.Guideline3_1.3_1_5 Principle3.Guideline3_1.3_1_6 Principle3.Guideline3_2.3_2_1 Principle3.Guideline3_2.3_2_2 Principle3.Guideline3_2.3_2_3 Principle3.Guideline3_2.3_2_4 Principle3.Guideline3_2.3_2_5 Principle3.Guideline3_3.3_3_1 Principle3.Guideline3_3.3_3_2 Principle3.Guideline3_3.3_3_3 Principle3.Guideline3_3.3_3_5 Principle3.Guideline3_3.3_3_6 Principle4.Guideline4_1.4_1_1 Principle4.Guideline4_1.4_1_2".split(" "),
        getMsgInfo: function (a) {
            for (var b = {
                Principle1: {
                    name: "Perceivable",
                    link: "http://www.w3.org/TR/WCAG20/#perceivable"
                },
                Principle2: {
                    name: "Operable",
                    link: "http://www.w3.org/TR/WCAG20/#operable"
                },
                Principle3: {
                    name: "Understandable",
                    link: "http://www.w3.org/TR/WCAG20/#understandable"
                },
                Principle4: {
                    name: "Robust",
                    link: "http://www.w3.org/TR/WCAG20/#robust"
                }
            }, c = a.split(".", 5), a = c[1], c = c[4].split(","), d = [], e = 0; e < c.length; e++) c[e] = c[e].split("."), d.push('<a href="http://www.w3.org/TR/WCAG20-TECHS/' + c[e][0] + '" target="_blank">' +
                c[e][0] + "</a>");
            return [["Principle", ['<a href="', b[a].link, '" target="_blank">', b[a].name, "</a>"].join("")], ["Techniques", d.join(" ")]]
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_1 = {
        register: function () {
            return ["meta"]
        },
        process: function (a) {
            !0 === a.hasAttribute("http-equiv") && "refresh" === String(a.getAttribute("http-equiv")).toLowerCase() && !0 === /^[1-9]\d*/.test(a.getAttribute("content").toLowerCase()) && (!0 === /url=/.test(a.getAttribute("content").toLowerCase()) ? HTMLCS.addMessage(HTMLCS.ERROR,
                a, "Meta refresh tag used to redirect to another page, with a time limit that is not zero. Users cannot control this time limit.", "F40.2") : HTMLCS.addMessage(HTMLCS.ERROR, a, "Meta refresh tag used to refresh the current page. Users cannot control the time limit for this refresh.", "F41.2"))
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_4 = {
        register: function () {
            return ["_top"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that all interruptions (including updates to content) can be postponed or suppressed by the user, except interruptions involving an emergency.",
                "SCR14")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_2 = {
        register: function () {
            return ["_top", "blink"]
        },
        process: function (a, b) {
            if (a === b) {
                HTMLCS.addMessage(HTMLCS.NOTICE, a, "If any part of the content moves, scrolls or blinks for more than 5 seconds, or auto-updates, check that there is a mechanism available to pause, stop, or hide the content.", "SCR33,SCR22,G187,G152,G186,G191");
                for (var c = b.querySelectorAll("*"), d = 0; d < c.length; d++) {
                    var e = HTMLCS.util.style(c[d]);
                    e && !0 === /blink/.test(e["text-decoration"]) &&
                        HTMLCS.addMessage(HTMLCS.WARNING, c[d], "Ensure there is a mechanism available to stop this blinking element in less than five seconds.", "F4")
                }
            } else "blink" === a.nodeName.toLowerCase() && HTMLCS.addMessage(HTMLCS.ERROR, a, "Blink elements cannot satisfy the requirement that blinking information can be stopped within five seconds.", "F47")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_5 = {
        register: function () {
            return ["_top"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this Web page is part of a set of Web pages with an inactivity time limit, check that an authenticated user can continue the activity without loss of data after re-authenticating.",
                "G105,G181")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_3 = {
        register: function () {
            return ["_top"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.", "G5")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_5 = {
        register: function () {
            return ["_top"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this Web page is not part of a linear process, check that there is more than one way of locating this Web page within a set of Web pages.",
                "G125,G64,G63,G161,G126,G185")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_4 = {
        register: function () {
            return ["a"]
        },
        process: function (a) {
            !0 === a.hasAttribute("title") ? HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that the link text combined with programmatically determined link context, or its title attribute, identifies the purpose of the link.", "H77,H78,H79,H80,H81,H33") : HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that the link text combined with programmatically determined link context identifies the purpose of the link.",
                "H77,H78,H79,H80,H81")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_3 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            a === b && b.querySelector("*[tabindex]") && HTMLCS.addMessage(HTMLCS.NOTICE, a, "If tabindex is used, check that the tab order specified by the tabindex attributes follows relationships in the content.", "H4.2")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_7 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            null !== b.querySelector("input, textarea, button, select, a") &&
                HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that there is at least one mode of operation where the keyboard focus indicator can be visually located on user interface controls.", "G149,G165,G195,C15,SCR31")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_8 = {
        register: function () {
            return ["link"]
        },
        process: function (a) {
            "head" !== a.parentNode.nodeName.toLowerCase() && HTMLCS.addMessage(HTMLCS.ERROR, a, "Link elements can only be located in the head section of the document.", "H59.1");
            (!1 === a.hasAttribute("rel") || !a.getAttribute("rel") || !0 === /^\s*$/.test(a.getAttribute("rel"))) && HTMLCS.addMessage(HTMLCS.ERROR, a, "Link element is missing a non-empty rel attribute identifying the link type.", "H59.2a");
            (!1 === a.hasAttribute("href") || !a.getAttribute("href") || !0 === /^\s*$/.test(a.getAttribute("href"))) && HTMLCS.addMessage(HTMLCS.ERROR, a, "Link element is missing a non-empty href attribute pointing to the resource being linked.", "H59.2b")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_2 = {
        register: function () {
            return ["html"]
        },
        process: function (a) {
            for (var b = a.childNodes, c = null, d = 0; d < b.length; d++)
                if ("head" === b[d].nodeName.toLowerCase()) {
                    c = b[d];
                    break
                }
            if (null === c) HTMLCS.addMessage(HTMLCS.ERROR, a, "There is no head section in which to place a descriptive title element.", "H25.1.NoHeadEl");
            else {
                b = c.childNodes;
                a = null;
                for (d = 0; d < b.length; d++)
                    if ("title" === b[d].nodeName.toLowerCase()) {
                        a = b[d];
                        break
                    }
                null === a ? HTMLCS.addMessage(HTMLCS.ERROR, c, "A title should be provided for the document, using a non-empty title element in the head section.",
                    "H25.1.NoTitleEl") : !0 === /^\s*$/.test(a.innerHTML) ? HTMLCS.addMessage(HTMLCS.ERROR, a, "The title element in the head section should be non-empty.", "H25.1.EmptyTitle") : HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that the title element describes the document.", "H25.2")
            }
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_6 = {
        register: function () {
            return ["_top"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that headings and labels describe topic or purpose.", "G130,G131")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_1 = {
        register: function () {
            return ["iframe", "a", "area", "_top"]
        },
        process: function (a, b) {
            if (a === b) this.testGenericBypassMsg(b);
            else switch (a.nodeName.toLowerCase()) {
            case "iframe":
                this.testIframeTitle(a);
                break;
            case "a":
            case "area":
                this.testSameDocFragmentLinks(a, b)
            }
        },
        testIframeTitle: function (a) {
            if ("iframe" === a.nodeName.toLowerCase()) {
                var b = !1;
                !0 === a.hasAttribute("title") && a.getAttribute("title") && !1 === /^\s+$/.test(a.getAttribute("title")) && (b = !0);
                !1 === b ? HTMLCS.addMessage(HTMLCS.ERROR, a, "Iframe element requires a non-empty title attribute that identifies the frame.",
                    "H64.1") : HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that the title attribute of this element contains text that identifies the frame.", "H64.2")
            }
        },
        testGenericBypassMsg: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.", "G1,G123,G124,H69")
        },
        testSameDocFragmentLinks: function (a, b) {
            if (!0 === a.hasAttribute("href")) {
                var c = a.getAttribute("href"),
                    c = HTMLCS.util.trim(c);
                if (1 < c.length &&
                    "#" === c.charAt(0)) {
                    c = c.substr(1);
                    try {
                        var d = b;
                        d.ownerDocument && (d = d.ownerDocument);
                        var e = d.getElementById(c);
                        null === e && (e = d.querySelector('a[name="' + c + '"]'));
                        if (null === e || !1 === HTMLCS.util.contains(b, e))!0 === HTMLCS.isFullDoc(b) || "body" === b.nodeName.toLowerCase() ? HTMLCS.addMessage(HTMLCS.ERROR, a, 'This link points to a named anchor "' + c + '" within the document, but no anchor exists with that name.', "G1,G123,G124.NoSuchID") : HTMLCS.addMessage(HTMLCS.WARNING, a, 'This link points to a named anchor "' + c + '" within the document, but no anchor exists with that name in the fragment tested.',
                            "G1,G123,G124.NoSuchIDFragment")
                    } catch (f) {}
                }
            }
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_9 = {
        register: function () {
            return ["a"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that text of the link describes the purpose of the link.", "H30")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_1_2_1_2 = {
        register: function () {
            return ["object", "applet", "embed"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.WARNING, a, "Check that this applet or plugin provides the ability to move the focus away from itself when using the keyboard.",
                "F10")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_1_2_1_1 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            if (a === b) {
                for (var c = b.querySelectorAll("*[ondblclick]"), d = 0; d < c.length; d++) HTMLCS.addMessage(HTMLCS.WARNING, c[d], "Ensure the functionality provided by double-clicking on this element is available through the keyboard.", "SCR20.DblClick");
                c = b.querySelectorAll("*[onmouseover]");
                for (d = 0; d < c.length; d++) HTMLCS.addMessage(HTMLCS.WARNING, c[d], "Ensure the functionality provided by mousing over this element is available through the keyboard; for instance, using the focus event.",
                    "SCR20.MouseOver");
                c = b.querySelectorAll("*[onmouseout]");
                for (d = 0; d < c.length; d++) HTMLCS.addMessage(HTMLCS.WARNING, c[d], "Ensure the functionality provided by mousing out of this element is available through the keyboard; for instance, using the blur event.", "SCR20.MouseOut");
                c = b.querySelectorAll("*[onmousemove]");
                for (d = 0; d < c.length; d++) HTMLCS.addMessage(HTMLCS.WARNING, c[d], "Ensure the functionality provided by moving the mouse on this element is available through the keyboard.", "SCR20.MouseMove");
                c =
                    b.querySelectorAll("*[onmousedown]");
                for (d = 0; d < c.length; d++) HTMLCS.addMessage(HTMLCS.WARNING, c[d], "Ensure the functionality provided by mousing down on this element is available through the keyboard; for instance, using the keydown event.", "SCR20.MouseDown");
                c = b.querySelectorAll("*[onmouseup]");
                for (d = 0; d < c.length; d++) HTMLCS.addMessage(HTMLCS.WARNING, c[d], "Ensure the functionality provided by mousing up on this element is available through the keyboard; for instance, using the keyup event.", "SCR20.MouseUp")
            }
        }
    },
    HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_3_2_3_1 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that no component of the content flashes more than three times in any 1-second period, or that the size of any flashing area is sufficiently small.", "G19,G176")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_3_2_3_2 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that no component of the content flashes more than three times in any 1-second period.",
                "G19")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            if (a === b)
                for (var c = HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3_Contrast.testContrastRatio(b, 4.5, 3), d = 0; d < c.length; d++) {
                    var a = c[d].element,
                        e = Math.round(100 * c[d].value) / 100,
                        f = c[d].required,
                        g = c[d].recommendation,
                        h = c[d].hasBgImage || !1;
                    if (4.5 === f) var j = "G18";
                    else 3 === f && (j = "G145");
                    var i = [];
                    g && (g.fore.from !== g.fore.to && i.push("text colour to " + g.fore.to), g.back.from !== g.back.to &&
                        i.push("background to " + g.back.to));
                    0 < i.length && (i = " Recommendation: change " + i.join(", ") + ".");
                    !0 === h ? (j += ".BgImage", HTMLCS.addMessage(HTMLCS.WARNING, a, "This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least " + f + ":1.", j)) : (j += ".Fail", HTMLCS.addMessage(HTMLCS.ERROR, a, "This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least " + f + ":1, but text in this element has a contrast ratio of " +
                        e + ":1." + i, j))
                }
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_7 = {
        register: function () {
            return ["object", "embed", "applet", "bgsound", "audio"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "For pre-recorded audio-only content in this element that is primarily speech (such as narration), any background sounds should be muteable, or be at least 20 dB (or about 4 times) quieter than the speech.", "G56")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_8 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that a mechanism is available for the user to select foreground and background colours for blocks of text, either through the Web page or the browser.", "G148,G156,G175");
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that a mechanism exists to reduce the width of a block of text to no more than 80 characters (or 40 in Chinese, Japanese or Korean script).", "H87,C20");
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that blocks of text are not fully justified - that is, to both left and right edges - or a mechanism exists to remove full justification.",
                "C19,G172,G169");
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that line spacing in blocks of text are at least 150% in paragraphs, and paragraph spacing is at least 1.5 times the line spacing, or that a mechanism is available to achieve this.", "G188,C21");
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that text can be resized without assistive technology up to 200 percent without requiring the user to scroll horizontally on a full-screen window.", "H87,G146,C26")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_2 = {
        register: function () {
            return "object embed applet bgsound audio video".split(" ")
        },
        process: function (a, b) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "If this element contains audio that plays automatically for longer than 3 seconds, check that there is the ability to pause, stop or mute the audio.", "F23")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3_F24 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            for (var c = b.querySelectorAll("*"), d = 0; d < c.length; d++) this.testColourComboFail(c[d])
        },
        testColourComboFail: function (a) {
            var b =
                a.hasAttribute("color"),
                b = (b = (b = b || a.hasAttribute("link")) || a.hasAttribute("vlink")) || a.hasAttribute("alink"),
                c = a.hasAttribute("bgcolor");
            if (a.style) {
                var d = a.style.color,
                    e = a.style.background;
                "" !== d && "auto" !== d && (b = !0);
                "" !== e && "auto" !== e && (c = !0)
            }
            c !== b && (!0 === c ? HTMLCS.addMessage(HTMLCS.WARNING, a, "Check that this element has an inherited foreground colour to complement the corresponding inline background colour or image.", "F24.BGColour") : HTMLCS.addMessage(HTMLCS.WARNING, a, "Check that this element has an inherited background colour or image to complement the corresponding inline foreground colour.",
                "F24.FGColour"))
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3_Contrast = {
        testContrastRatio: function (a, b, c) {
            for (var d = [], a = a.ownerDocument ? [a] : [a.getElementsByTagName("body")[0]]; 0 < a.length;) {
                var e = a.shift();
                if (1 === e.nodeType && !1 === HTMLCS.util.isHidden(e)) {
                    for (var f = !1, g = 0; g < e.childNodes.length; g++) 1 === e.childNodes[g].nodeType ? a.push(e.childNodes[g]) : 3 === e.childNodes[g].nodeType && "" !== HTMLCS.util.trim(e.childNodes[g].nodeValue) && (f = !0);
                    if (!0 === f && (f = HTMLCS.util.style(e))) {
                        var g = f.backgroundColor,
                            h = !1;
                        "none" !== f.backgroundImage && (h = !0);
                        var j = e.parentNode,
                            i = 0.75 * parseInt(f.fontSize, 10),
                            k = 18;
                        if ("bold" === f.fontWeight || 600 <= parseInt(f.fontWeight, 10)) k = 14;
                        var m = b;
                        for (i >= k && (m = c);
                            ("transparent" === g || "rgba(0, 0, 0, 0)" === g) && j && j.ownerDocument;) i = HTMLCS.util.style(j), g = i.backgroundColor, "none" !== i.backgroundImage && (h = !0), j = j.parentNode;
                        !0 === h ? d.push({
                            element: e,
                            colour: f.color,
                            bgColour: void 0,
                            value: void 0,
                            required: m,
                            hasBgImage: !0
                        }) : "transparent" === g || "rgba(0, 0, 0, 0)" === g || (h = HTMLCS.util.contrastRatio(g,
                            f.color), h < m && (j = this.recommendColour(g, f.color, m), d.push({
                            element: e,
                            colour: f.color,
                            bgColour: g,
                            value: h,
                            required: m,
                            recommendation: j
                        })))
                    }
                }
            }
            return d
        },
        recommendColour: function (a, b, c) {
            var b = HTMLCS.util.RGBtoColourStr(HTMLCS.util.colourStrToRGB(b)),
                a = HTMLCS.util.RGBtoColourStr(HTMLCS.util.colourStrToRGB(a)),
                d = HTMLCS.util.contrastRatio(b, a),
                e = Math.abs(HTMLCS.util.relativeLum(b) - 0.5),
                f = Math.abs(HTMLCS.util.relativeLum(a) - 0.5),
                g = null;
            if (d < c) {
                g = 1.0025;
                if (e <= f) {
                    var e = "back",
                        h = a;
                    0.5 > HTMLCS.util.relativeLum(a) &&
                        (g = 1 / g)
                } else e = "fore", h = b, 0.5 > HTMLCS.util.relativeLum(b) && (g = 1 / g);
                for (var f = HTMLCS.util.sRGBtoHSV(h), j = b, i = a, k = !1, m = 0; d < c;) {
                    if ("#fff" === h || "#000" === h)
                        if (!0 === k)
                            if ("fore" === e) {
                                h = i;
                                for (d = 1; i === h;) i = multiplyColour(i, Math.pow(1 / g, d)), d++
                            } else {
                                h = j;
                                for (d = 1; j === h;) j = multiplyColour(j, Math.pow(1 / g, d)), d++
                            } else j = b, i = a, g = 1 / g, "fore" === e ? (e = "back", f = a) : (e = "fore", f = b), f = HTMLCS.util.sRGBtoHSV(f), k = !0;
                    m++;
                    h = HTMLCS.util.HSVtosRGB(f);
                    h = this.multiplyColour(h, Math.pow(g, m));
                    "fore" === e ? j = h : i = h;
                    d = HTMLCS.util.contrastRatio(j,
                        i)
                }
                g = {
                    fore: {
                        from: b,
                        to: j
                    },
                    back: {
                        from: a,
                        to: i
                    }
                }
            }
            return g
        },
        multiplyColour: function (a, b) {
            var c = HTMLCS.util.sRGBtoHSV(a),
                d = c.saturation * c.value;
            0 === c.value && (c.value = 1 / 255);
            c.value *= b;
            c.saturation = 0 === c.value ? 0 : d / c.value;
            c.value = Math.min(1, c.value);
            c.saturation = Math.min(1, c.saturation);
            return HTMLCS.util.RGBtoColourStr(HTMLCS.util.HSVtosRGB(c))
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_4 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that text can be resized without assistive technology up to 200 percent without loss of content or functionality.",
                "G142")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_9 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            null !== b.querySelector("img") && HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that images of text are only used for pure decoration or where a particular presentation of text is essential to the information being conveyed.", "G140,C22,C30.NoException")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_5 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            null !== b.querySelector("img") &&
                HTMLCS.addMessage(HTMLCS.NOTICE, b, "If the technologies being used can achieve the visual presentation, check that text is used to convey information rather than images of text, except when the image of text is essential to the information being conveyed, or can be visually customised to the user's requirements.", "G140,C22,C30.AALevel")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_1 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that any information conveyed using colour alone is also available in text, or through other visual cues.",
                "G14,G182")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_6 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            if (a === b)
                for (var c = HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3_Contrast.testContrastRatio(b, 7, 4.5), d = 0; d < c.length; d++) {
                    var a = c[d].element,
                        e = Math.round(100 * c[d].value) / 100,
                        f = c[d].required,
                        g = c[d].recommendation,
                        h = c[d].hasBgImage || !1;
                    if (4.5 === f) var j = "G18";
                    else 7 === f && (j = "G17");
                    var i = [];
                    g && (g.fore.from !== g.fore.to && i.push("text colour to " + g.fore.to), g.back.from !== g.back.to &&
                        i.push("background to " + g.back.to));
                    0 < i.length && (i = " Recommendation: change " + i.join(", ") + ".");
                    !0 === h ? (j += ".BgImage", HTMLCS.addMessage(HTMLCS.WARNING, a, "This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least " + f + ":1.", j)) : (j += ".Fail", HTMLCS.addMessage(HTMLCS.ERROR, a, "This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least " + f + ":1, but text in this element has a contrast ratio of " +
                        e + ":1." + i, j))
                }
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_9 = {
        register: function () {
            return ["object", "embed", "applet", "bgsound", "audio"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this embedded object contains live audio-only content, check that an alternative text version of the content is provided.", "G150,G151,G157")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_2 = {
        register: function () {
            return ["object", "embed", "applet", "video"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE,
                a, "If this embedded object contains pre-recorded synchronised media and is not provided as an alternative for text content, check that captions are provided for audio content.", "G87,G93")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_6 = {
        register: function () {
            return ["object", "embed", "applet", "video"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this embedded object contains pre-recorded synchronised media, check that a sign language interpretation is provided for its audio.", "G54,G81")
        }
    },
    HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_8 = {
        register: function () {
            return ["object", "embed", "applet", "video"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this embedded object contains pre-recorded synchronised media or video-only content, check that an alternative text version of the content is provided.", "G69,G159")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_7 = {
        register: function () {
            return ["object", "embed", "applet", "video"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE,
                a, "If this embedded object contains synchronised media, and where pauses in foreground audio is not sufficient to allow audio descriptions to convey the sense of pre-recorded video, check that an extended audio description is provided, either through scripting or an alternate version.", "G8")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_1 = {
        register: function () {
            return "object embed applet bgsound audio video".split(" ")
        },
        process: function (a) {
            var b = a.nodeName.toLowerCase();
            "video" !== b && HTMLCS.addMessage(HTMLCS.NOTICE,
                a, "If this embedded object contains pre-recorded audio only, and is not provided as an alternative for text content, check that an alternative text version is available.", "G158");
            "bgsound" !== b && "audio" !== b && HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this embedded object contains pre-recorded video only, and is not provided as an alternative for text content, check that an alternative text version is available, or an audio track is provided that presents equivalent information.", "G159,G166")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_3 = {
        register: function () {
            return ["object", "embed", "applet", "video"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this embedded object contains pre-recorded synchronised media and is not provided as an alternative for text content, check that an audio description of its video, and/or an alternative text version of the content is provided.", "G69,G78,G173,G8")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_4 = {
        register: function () {
            return ["object", "embed", "applet", "video"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE,
                a, "If this embedded object contains synchronised media, check that captions are provided for live audio content.", "G9,G87,G93")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_5 = {
        register: function () {
            return ["object", "embed", "applet", "video"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this embedded object contains pre-recorded synchronised media, check that an audio description is provided for its video content.", "G78,G173,G8")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_1_1_1_1 = {
        register: function () {
            return ["_top", "img"]
        },
        process: function (a, b) {
            if (a === b) this.addNullAltTextResults(b), this.addMediaAlternativesResults(b);
            else switch (a.nodeName.toLowerCase()) {
            case "img":
                this.testLinkStutter(a), this.testLongdesc(a)
            }
        },
        addNullAltTextResults: function (a) {
            for (var a = this.testNullAltText(a), b = 0; b < a.img.emptyAltInLink.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.img.emptyAltInLink[b], "Img element is the only content of the link, but is missing alt text. The alt text should describe the purpose of the link.",
                "H30.2");
            for (b = 0; b < a.img.nullAltWithTitle.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.img.nullAltWithTitle[b], "Img element with empty alt text must have absent or empty title attribute.", "H67.1");
            for (b = 0; b < a.img.ignored.length; b++) HTMLCS.addMessage(HTMLCS.WARNING, a.img.ignored[b], "Img element is marked so that it is ignored by Assistive Technology.", "H67.2");
            for (b = 0; b < a.img.missingAlt.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.img.missingAlt[b], "Img element missing an alt attribute. Use the alt attribute to specify a short text alternative.",
                "H37");
            for (b = 0; b < a.img.generalAlt.length; b++) HTMLCS.addMessage(HTMLCS.NOTICE, a.img.generalAlt[b], "Ensure that the img element's alt text serves the same purpose and presents the same information as the image.", "G94.Image");
            for (b = 0; b < a.inputImage.missingAlt.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.inputImage.missingAlt[b], "Image submit button missing an alt attribute. Specify a text alternative that describes the button's function, using the alt attribute.", "H36");
            for (b = 0; b < a.inputImage.generalAlt.length; b++) HTMLCS.addMessage(HTMLCS.NOTICE,
                a.inputImage.generalAlt[b], "Ensure that the image submit button's alt text identifies the purpose of the button.", "G94.Button");
            for (b = 0; b < a.area.missingAlt.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.area.missingAlt[b], "Area element in an image map missing an alt attribute. Each area element must have a text alternative that describes the function of the image map area.", "H24");
            for (b = 0; b < a.area.generalAlt.length; b++) HTMLCS.addMessage(HTMLCS.NOTICE, a.area.generalAlt[b], "Ensure that the area element's text alternative serves the same purpose as the part of image map image it references.",
                "H24.2")
        },
        testNullAltText: function (a) {
            var b = {
                img: {
                    generalAlt: [],
                    missingAlt: [],
                    ignored: [],
                    nullAltWithTitle: [],
                    emptyAltInLink: []
                },
                inputImage: {
                    generalAlt: [],
                    missingAlt: []
                },
                area: {
                    generalAlt: [],
                    missingAlt: []
                }
            };
            elements = a.querySelectorAll('img, area, input[type="image"]');
            for (a = 0; a < elements.length; a++) {
                var c = elements[a],
                    d = c.nodeName.toLowerCase(),
                    e = !1,
                    f = !1,
                    g = !1;
                if ("a" === c.parentNode.nodeName.toLowerCase()) {
                    var h = this._getPreviousSiblingElement(c, null),
                        j = this._getNextSiblingElement(c, null);
                    null === h && null ===
                        j && (h = c.parentNode.textContent, h = void 0 !== c.parentNode.textContent ? c.parentNode.textContent : c.parentNode.innerText, !0 === HTMLCS.isStringEmpty(h) && (e = !0))
                }
                if (!1 === c.hasAttribute("alt")) f = !0;
                else if (!c.getAttribute("alt") || !0 === HTMLCS.isStringEmpty(c.getAttribute("alt"))) g = !0;
                switch (d) {
                case "img":
                    !0 === e && (!0 === f || !0 === g) ? b.img.emptyAltInLink.push(c.parentNode) : !0 === f ? b.img.missingAlt.push(c) : !0 === g ? !0 === c.hasAttribute("title") && !1 === HTMLCS.isStringEmpty(c.getAttribute("title")) ? b.img.nullAltWithTitle.push(c) :
                        b.img.ignored.push(c) : b.img.generalAlt.push(c);
                    break;
                case "input":
                    !0 === f || !0 === g ? b.inputImage.missingAlt.push(c) : b.inputImage.generalAlt.push(c);
                    break;
                case "area":
                    !0 === f || !0 === g ? b.area.missingAlt.push(c) : b.inputImage.generalAlt.push(c)
                }
            }
            return b
        },
        testLongdesc: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.", "G73,G74")
        },
        testLinkStutter: function (a) {
            if ("a" ===
                a.parentNode.nodeName.toLowerCase()) {
                var b = a.parentNode,
                    c = b.getAttribute("href"),
                    d = HTMLCS.util.getElementTextContent(b, !1),
                    e = this._getLinkAltText(b),
                    f, g;
                null === e && (e = "");
                null !== e && "" !== e && HTMLCS.util.trim(e).toLowerCase() === HTMLCS.util.trim(d).toLowerCase() && HTMLCS.addMessage(HTMLCS.ERROR, a, "Img element inside a link must not use alt text that duplicates the text content of the link.", "H2.EG5");
                "" === d && (d = this._getPreviousSiblingElement(b, "a", !0), b = this._getNextSiblingElement(b, "a", !0), null !== d &&
                    (f = {
                        href: d.getAttribute("href"),
                        text: HTMLCS.util.getElementTextContent(d, !1),
                        alt: this._getLinkAltText(d)
                    }, null === f.alt && (f.alt = "")), null !== b && (g = {
                        href: b.getAttribute("href"),
                        text: HTMLCS.util.getElementTextContent(b, !1),
                        alt: this._getLinkAltText(b)
                    }, null === g.alt && (g.alt = "")), g && ("" !== g.href && null !== g.href && c === g.href) && ("" !== g.text && "" === e ? HTMLCS.addMessage(HTMLCS.ERROR, a, "Img element inside a link has empty or missing alt text when a link beside it contains link text. Consider combining the links.",
                        "H2.EG4") : g.text.toLowerCase() === e.toLowerCase() && HTMLCS.addMessage(HTMLCS.ERROR, a, "Img element inside a link must not use alt text that duplicates the content of a text link beside it.", "H2.EG3")), f && ("" !== f.href && null !== f.href && c === f.href) && ("" !== f.text && "" === e ? HTMLCS.addMessage(HTMLCS.ERROR, a, "Img element inside a link has empty or missing alt text when a link beside it contains link text. Consider combining the links.", "H2.EG4") : f.text.toLowerCase() === e.toLowerCase() && HTMLCS.addMessage(HTMLCS.ERROR,
                        a, "Img element inside a link must not use alt text that duplicates the content of a text link beside it.", "H2.EG3")))
            }
        },
        addMediaAlternativesResults: function (a) {
            for (var a = this.testMediaTextAlternatives(a), b = 0; b < a.object.missingBody.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.object.missingBody[b], "Object elements must contain a text alternative after all other alternatives are exhausted.", "H53");
            for (b = 0; b < a.object.generalAlt.length; b++) HTMLCS.addMessage(HTMLCS.NOTICE, a.object.generalAlt[b], "Check that short (and if appropriate, long) text alternatives are available for non-text content that serve the same purpose and present the same information.",
                "G94,G92.Object");
            for (b = 0; b < a.applet.missingBody.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.applet.missingBody[b], "Applet elements must contain a text alternative in the element's body, for browsers without support for the applet element.", "H35.3");
            for (b = 0; b < a.applet.missingAlt.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.applet.missingAlt[b], "Applet elements must contain an alt attribute, to provide a text alternative to browsers supporting the element but are unable to load the applet.", "H35.2");
            for (b = 0; b < a.applet.generalAlt.length; b++) HTMLCS.addMessage(HTMLCS.NOTICE, a.applet.generalAlt[b], "Check that short (and if appropriate, long) text alternatives are available for non-text content that serve the same purpose and present the same information.", "G94,G92.Applet")
        },
        testMediaTextAlternatives: function (a) {
            for (var b = {
                object: {
                    missingBody: [],
                    generalAlt: []
                },
                applet: {
                    missingBody: [],
                    missingAlt: [],
                    generalAlt: []
                }
            }, c = a.querySelectorAll("object"), d = 0; d < c.length; d++) {
                var e = c[d];
                e.nodeName.toLowerCase();
                var f = e.querySelector("object");
                null === f && (f = HTMLCS.util.getElementTextContent(e, !0), "" === f ? b.object.missingBody.push(e) : b.object.generalAlt.push(e))
            }
            c = a.querySelectorAll("applet");
            for (d = 0; d < c.length; d++) f = e.querySelector("object"), a = !1, null === f && (f = HTMLCS.util.getElementTextContent(e, !0), !0 === HTMLCS.isStringEmpty(f) && (b.applet.missingBody.push(e), a = !0)), f = e.getAttribute("alt") || "", !0 === HTMLCS.isStringEmpty(f) && (b.applet.missingAlt.push(e), a = !0), !1 === a && b.applet.generalAlt.push(e);
            return b
        },
        _getLinkAltText: function (a) {
            for (var a =
                a.cloneNode(!0), b = [], c = 0; c < a.childNodes.length; c++) b.push(a.childNodes[c]);
            for (a = null; 0 < b.length;)
                if (c = b.shift(), 1 === c.nodeType && "img" === c.nodeName.toLowerCase() && !0 === c.hasAttribute("alt")) {
                    a = (a = c.getAttribute("alt")) ? a.replace(/^\s+|\s+$/g, "") : "";
                    break
                }
            return a
        },
        _getPreviousSiblingElement: function (a, b, c) {
            void 0 === b && (b = null);
            void 0 === c && (c = !1);
            for (a = a.previousSibling; null !== a;) {
                if (3 === a.nodeType) {
                    if (!1 === HTMLCS.isStringEmpty(a.nodeValue) && !0 === c) {
                        a = null;
                        break
                    }
                } else if (1 === a.nodeType) {
                    if (null ===
                        b || a.nodeName.toLowerCase() === b) break;
                    else if (!0 === c) {
                        a = null;
                        break
                    }
                    break
                }
                a = a.previousSibling
            }
            return a
        },
        _getNextSiblingElement: function (a, b, c) {
            void 0 === b && (b = null);
            void 0 === c && (c = !1);
            for (a = a.nextSibling; null !== a;) {
                if (3 === a.nodeType) {
                    if (!1 === HTMLCS.isStringEmpty(a.nodeValue) && !0 === c) {
                        a = null;
                        break
                    }
                } else if (1 === a.nodeType) {
                    if (null === b || a.nodeName.toLowerCase() === b) break;
                    else if (!0 === c) {
                        a = null;
                        break
                    }
                    break
                }
                a = a.nextSibling
            }
            return a
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_2 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.", "G57")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1_AAA = {
        _labelNames: null,
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            var c = HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1;
            a === b && c.testHeadingOrder(b, HTMLCS.ERROR)
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1_A = {
        _labelNames: null,
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            var c = HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1;
            a === b && c.testHeadingOrder(b, HTMLCS.WARNING)
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1 = {
        _labelNames: null,
        register: function () {
            return "_top p div input select textarea button table fieldset form h1 h2 h3 h4 h5 h6".split(" ")
        },
        process: function (a, b) {
            var c = a.nodeName.toLowerCase();
            if (a === b) this.testPresentationMarkup(b), this.testEmptyDupeLabelForAttrs(b);
            else switch (c) {
            case "input":
            case "textarea":
            case "button":
                this.testLabelsOnInputs(a,
                    b);
                break;
            case "form":
                this.testRequiredFieldsets(a);
                break;
            case "select":
                this.testLabelsOnInputs(a, b);
                this.testOptgroup(a);
                break;
            case "p":
            case "div":
                this.testNonSemanticHeading(a);
                this.testListsWithBreaks(a);
                this.testUnstructuredNavLinks(a);
                break;
            case "table":
                this.testGeneralTable(a);
                this.testTableHeaders(a);
                this.testTableCaptionSummary(a);
                break;
            case "fieldset":
                this.testFieldsetLegend(a);
                break;
            case "h1":
            case "h2":
            case "h3":
            case "h4":
            case "h5":
            case "h6":
                this.testEmptyHeading(a)
            }
        },
        testEmptyDupeLabelForAttrs: function (a) {
            this._labelNames = {};
            for (var b = a.getElementsByTagName("label"), c = 0; c < b.length; c++)
                if (!0 === b[c].hasAttribute("for") && "" !== b[c].getAttribute("for")) {
                    var d = b[c].getAttribute("for");
                    if (this._labelNames[d] && null !== this._labelNames[d]) HTMLCS.addMessage(HTMLCS.ERROR, b[c], 'Multiple labels exist with the same "for" attribute. If these labels refer to different form controls, the controls should have unique "id" attributes.', "H93"), this._labelNames[d] = null;
                    else if (this._labelNames[d] = b[c], d = a.ownerDocument ? a.ownerDocument.getElementById(d) :
                        a.getElementById(d), null === d) {
                        var d = HTMLCS.ERROR,
                            e = 'This label\'s "for" attribute contains an ID that does not exist in the document.',
                            f = "H44.NonExistent";
                        if (!0 === HTMLCS.isFullDoc(a) || "body" === a.nodeName.toLowerCase()) d = HTMLCS.WARNING, e = 'This label\'s "for" attribute contains an ID that does not exist in the document fragment.', f = "H44.NonExistentFragment";
                        HTMLCS.addMessage(d, b[c], e, f)
                    } else d = d.nodeName.toLowerCase(), "input" !== d && ("select" !== d && "textarea" !== d) && HTMLCS.addMessage(HTMLCS.ERROR, b[c],
                        'This label\'s "for" attribute contains an ID that points to an element that is not a form control.', "H44.NotFormControl")
                } else HTMLCS.addMessage(HTMLCS.ERROR, b[c], 'Label found without a "for" attribute, and therefore not explicitly associated with a form control.', "H44.NoForAttr")
        },
        testLabelsOnInputs: function (a, b) {
            var c = a.nodeName.toLowerCase();
            "input" === c && (c = !0 === a.hasAttribute("type") ? a.getAttribute("type") : "text");
            var d = !1;
            !0 === /^(submit|reset|image|hidden|button)$/.test(c.toLowerCase()) && (d = !0);
            this._labelNames = {};
            for (var e = b.getElementsByTagName("label"), f = 0; f < e.length; f++)
                if (!0 === e[f].hasAttribute("for")) {
                    var g = e[f].getAttribute("for");
                    this._labelNames[g] = e[f]
                }
            if (!1 === a.hasAttribute("id") && !1 === d)!0 === a.hasAttribute("title") ? !0 === /^\s*$/.test(a.getAttribute("title")) && HTMLCS.addMessage(HTMLCS.ERROR, a, "Form control without a label contains an empty title attribute. The title attribute should identify the purpose of the control.", "H65.3") : HTMLCS.addMessage(HTMLCS.ERROR, a, "Form control does not have an ID, therefore it cannot have an explicit label.",
                "H44.NoId");
            else if (e = a.getAttribute("id"), this._labelNames[e])
                if (!0 === d) HTMLCS.addMessage(HTMLCS.ERROR, a, "Label element should not be used for this type of form control.", "H44.NoLabelAllowed");
                else {
                    d = !1;
                    !0 === /^(checkbox|radio)$/.test(c) && (d = !0);
                    if (a.compareDocumentPosition)
                        if (c = a.compareDocumentPosition(this._labelNames[e]), 2 === (c & 2)) var h = 1;
                        else 4 === (c & 4) && (h = -1);
                        else a.sourceIndex && (h = a.sourceIndex - this._labelNames[e].sourceIndex);
                        !0 === d && 0 < h ? HTMLCS.addMessage(HTMLCS.ERROR, a, "The label element for this control should be placed after this element.",
                        "H44.1.After") : !1 === d && 0 > h && HTMLCS.addMessage(HTMLCS.ERROR, a, "The label element for this control should be placed before this element.", "H44.1.Before")
                } else !1 === d && (!0 === a.hasAttribute("title") ? !0 === /^\s*$/.test(a.getAttribute("title")) ? HTMLCS.addMessage(HTMLCS.ERROR, a, "Form control without a label contains an empty title attribute. The title attribute should identify the purpose of the control.", "H65.3") : HTMLCS.addMessage(HTMLCS.WARNING, a, "Check that the title attribute identifies the purpose of the control, and that a label element is not appropriate.",
                "H65") : HTMLCS.addMessage(HTMLCS.ERROR, a, "Form control does not have an explicit label or title attribute, identifying the purpose of the control.", "H44.2"))
        },
        testPresentationMarkup: function (a) {
            for (var b = a.querySelectorAll("b, i, u, s, strike, tt, big, small, center, font"), c = 0; c < b.length; c++) {
                var d = "H49." + b[c].nodeName.substr(0, 1).toUpperCase() + b[c].nodeName.substr(1).toLowerCase();
                HTMLCS.addMessage(HTMLCS.WARNING, b[c], "Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.",
                    d)
            }
            b = a.querySelectorAll("*[align]");
            for (c = 0; c < b.length; c++) d = "H49.AlignAttr", HTMLCS.addMessage(HTMLCS.WARNING, b[c], "Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.", d)
        },
        testNonSemanticHeading: function (a) {
            var b = a.nodeName.toLowerCase();
            if ("p" === b || "div" === b) b = a.childNodes, 1 === b.length && 1 === b[0].nodeType && (b = b[0].nodeName.toLowerCase(), !0 === /^(strong|em|b|i|u)$/.test(b) && HTMLCS.addMessage(HTMLCS.WARNING, a, "Heading markup should be used if this content is intended as a heading.",
                "H42"))
        },
        testTableHeaders: function (a) {
            for (var b = HTMLCS.util.testTableHeaders(a), c = this._testTableScopeAttrs(a), d = 0; d < c.invalid.length; d++) HTMLCS.addMessage(HTMLCS.ERROR, c.invalid[d], "Table cell has an invalid scope attribute. Valid values are row, col, rowgroup, or colgroup.", "H63.3");
            for (d = 0; d < c.obsoleteTd.length; d++) HTMLCS.addMessage(HTMLCS.WARNING, c.obsoleteTd[d], "Scope attributes on td elements that act as headings for other elements are obsolete in HTML5. Use a th element instead.", "H63.2");
            !0 === b.allowScope ? 0 === c.missing.length && !1 === b.required : !0 === c.used && (HTMLCS.addMessage(HTMLCS.WARNING, a, "Scope attributes on th elements are ambiguous in a table with multiple levels of headings. Use the headers attribute on td elements instead.", "H43.ScopeAmbiguous"), c = null);
            for (d = 0; d < b.wrongHeaders.length; d++) HTMLCS.addMessage(HTMLCS.ERROR, b.wrongHeaders[d].element, 'Incorrect headers attribute on this td element. Expected "' + b.wrongHeaders[d].expected + '" but found "' + b.wrongHeaders[d].actual + '"',
                "H43.IncorrectAttr");
            !0 === b.required && !1 === b.allowScope && (!1 === b.used ? HTMLCS.addMessage(HTMLCS.ERROR, a, "The relationship between td elements and their associated th elements is not defined. As this table has multiple levels of th elements, you must use the headers attribute on td elements.", "H43.HeadersRequired") : (0 < b.missingThId.length && HTMLCS.addMessage(HTMLCS.ERROR, a, "Not all th elements in this table contain an id attribute. These cells should contain ids so that they may be referenced by td elements' headers attributes.",
                "H43.MissingHeaderIds"), 0 < b.missingTd.length && HTMLCS.addMessage(HTMLCS.ERROR, a, "Not all td elements in this table contain a headers attribute. Each headers attribute should list the ids of all th elements associated with that cell.", "H43.MissingHeadersAttrs")));
            !0 === b.required && (!0 === b.allowScope && !1 === b.correct && !1 === c.correct) && (!1 === c.used && !1 === b.used ? HTMLCS.addMessage(HTMLCS.ERROR, a, "The relationship between td elements and their associated th elements is not defined. Use either the scope attribute on th elements, or the headers attribute on td elements.",
                "H43,H63") : !1 === c.used && (0 < b.missingThId.length || 0 < b.missingTd.length) ? (0 < b.missingThId.length && HTMLCS.addMessage(HTMLCS.ERROR, a, "Not all th elements in this table contain an id attribute. These cells should contain ids so that they may be referenced by td elements' headers attributes.", "H43.MissingHeaderIds"), 0 < b.missingTd.length && HTMLCS.addMessage(HTMLCS.ERROR, a, "Not all td elements in this table contain a headers attribute. Each headers attribute should list the ids of all th elements associated with that cell.",
                "H43.MissingHeadersAttrs")) : 0 < c.missing.length && !1 === b.used ? HTMLCS.addMessage(HTMLCS.ERROR, a, "Not all th elements in this table have a scope attribute. These cells should contain a scope attribute to identify their association with td elements.", "H63.1") : 0 < c.missing.length && (0 < b.missingThId.length || 0 < b.missingTd.length) && HTMLCS.addMessage(HTMLCS.ERROR, a, "The relationship between td elements and their associated th elements is not defined. Use either the scope attribute on th elements, or the headers attribute on td elements.",
                "H43,H63"))
        },
        _testTableScopeAttrs: function (a) {
            var a = {
                th: a.getElementsByTagName("th"),
                td: a.getElementsByTagName("td")
            }, b = {
                    used: !1,
                    correct: !0,
                    missing: [],
                    invalid: [],
                    obsoleteTd: []
                }, c;
            for (c in a)
                for (var d = 0; d < a[c].length; d++) {
                    element = a[c][d];
                    var e = "";
                    !0 === element.hasAttribute("scope") && (b.used = !0, element.getAttribute("scope") && (e = element.getAttribute("scope")));
                    "th" === element.nodeName.toLowerCase() ? !0 === /^\s*$/.test(e) ? (b.correct = !1, b.missing.push(element)) : !1 === /^(row|col|rowgroup|colgroup)$/.test(e) &&
                        (b.correct = !1, b.invalid.push(element)) : "" !== e && (b.obsoleteTd.push(element), !1 === /^(row|col|rowgroup|colgroup)$/.test(e) && (b.correct = !1, b.invalid.push(element)))
                }
            return b
        },
        testTableCaptionSummary: function (a) {
            var b = a.getAttribute("summary") || "",
                c = a.getElementsByTagName("caption"),
                d = "";
            0 < c.length && (d = c[0].innerHTML.replace(/^\s*(.*?)\s*$/g, "$1"));
            b = b.replace(/^\s*(.*?)\s*$/g, "$1");
            "" !== b ? !0 === HTMLCS.util.isLayoutTable(a) ? HTMLCS.addMessage(HTMLCS.ERROR, a, "This table appears to be used for layout, but contains a summary attribute. Layout tables must not contain summary attributes, or if supplied, must be empty.",
                "H73.3.LayoutTable") : (d === b && HTMLCS.addMessage(HTMLCS.ERROR, a, "If this table is a data table, and both a summary attribute and a caption element are present, the summary should not duplicate the caption.", "H39,H73.4"), HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this table is a data table, check that the summary attribute describes the table's organization or explains how to use the table.", "H73.3.Check")) : !1 === HTMLCS.util.isLayoutTable(a) && HTMLCS.addMessage(HTMLCS.WARNING, a, "If this table is a data table, consider using the summary attribute of the table element to give an overview of this table.",
                "H73.3.NoSummary");
            "" !== d ? !0 === HTMLCS.util.isLayoutTable(a) ? HTMLCS.addMessage(HTMLCS.ERROR, a, "This table appears to be used for layout, but contains a caption element. Layout tables must not contain captions.", "H39.3.LayoutTable") : HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this table is a data table, check that the caption element accurately describes this table.", "H39.3.Check") : !1 === HTMLCS.util.isLayoutTable(a) && HTMLCS.addMessage(HTMLCS.WARNING, a, "If this table is a data table, consider using a caption element to the table element to identify this table.",
                "H39.3.NoCaption")
        },
        testFieldsetLegend: function (a) {
            var b = a.querySelector("legend");
            (null === b || b.parentNode !== a) && HTMLCS.addMessage(HTMLCS.ERROR, a, "Fieldset does not contain a legend element. All fieldsets should contain a legend element that describes a description of the field group.", "H71.NoLegend")
        },
        testOptgroup: function (a) {
            null === a.querySelector("optgroup") && HTMLCS.addMessage(HTMLCS.WARNING, a, "If this selection list contains groups of related options, they should be grouped with optgroup.", "H85.2")
        },
        testRequiredFieldsets: function (a) {
            for (var b = a.querySelectorAll("input[type=radio], input[type=checkbox]"), c = {}, d = 0; d < b.length; d++) {
                var e = b[d];
                if (!0 === e.hasAttribute("name")) {
                    for (var f = e.getAttribute("name"), g = e.parentNode;
                        "fieldset" !== g.nodeName.toLowerCase() && null !== g && g !== a;) g = g.parentNode;
                    "fieldset" !== g.nodeName.toLowerCase() && (g = null)
                }
                if (void 0 === c[f]) c[f] = g;
                else if (null === g || g !== c[f]) {
                    HTMLCS.addMessage(HTMLCS.WARNING, a, "If these radio buttons or check boxes require a further group-level description, they should be contained within a fieldset element.",
                        "H71.SameName");
                    break
                }
            }
        },
        testListsWithBreaks: function (a) {
            var b = [];
            if (null !== a.querySelector("br")) {
                for (var c = [], d = 0; d < a.childNodes.length; d++) c.push(a.childNodes[d]);
                for (var e = []; 0 < c.length;) {
                    var f = c.shift();
                    if (1 === f.nodeType)
                        if ("br" === f.nodeName.toLowerCase()) b.push(e.join(" ").replace(/^\s*(.*?)\s*$/g, "$1")), e = [];
                        else
                            for (d = f.childNodes.length - 1; 0 <= d; --d) c.unshift(f.childNodes[d]);
                        else 3 === f.nodeType && e.push(f.nodeValue)
                }
                0 < e.length && b.push(e.join(" ").replace(/^\s*(.*?)\s*$/g, "$1"));
                for (d = 0; d < b.length; d++) {
                    if (!0 ===
                        /^[\-*]\s+/.test(b[0])) {
                        HTMLCS.addMessage(HTMLCS.WARNING, a, "Content appears to have the visual appearance of a bulleted list. It may be appropriate to mark this content up using a ul element.", "H48.1");
                        break
                    }
                    if (!0 === /^\d+[:\/\-.]?\s+/.test(b[0])) {
                        HTMLCS.addMessage(HTMLCS.WARNING, a, "Content appears to have the visual appearance of a numbered list. It may be appropriate to mark this content up using an ol element.", "H48.2");
                        break
                    }
                }
            }
        },
        testHeadingOrder: function (a, b) {
            for (var c = 0, d = a.querySelectorAll("h1, h2, h3, h4, h5, h6"),
                    e = 0; e < d.length; e++) {
                var f = parseInt(d[e].nodeName.substr(1, 1));
                if (1 < f - c) {
                    var g = "should be an h" + (c + 1) + " to be properly nested";
                    0 === c && (g = "appears to be the primary document heading, so should be an h1 element");
                    HTMLCS.addMessage(b, d[e], "The heading structure is not logically nested. This h" + f + " element " + g + ".", "G141")
                }
                c = f
            }
        },
        testEmptyHeading: function (a) {
            var b = a.textContent;
            void 0 === b && (b = a.innerText);
            !0 === /^\s*$/.test(b) && HTMLCS.addMessage(HTMLCS.ERROR, a, "Heading tag found with no content. Text that is not intended as a heading should not be marked up with heading tags.",
                "H42.2")
        },
        testUnstructuredNavLinks: function (a) {
            a.nodeName.toLowerCase();
            for (var b = 0, c = a.childNodes, d = 0; d < c.length && (!(1 === c[d].nodeType && "a" === c[d].nodeName.toLowerCase()) || !(b++, 1 < b)); d++);
            if (1 < b) {
                for (b = a.parentNode; null !== b && "ul" !== b.nodeName.toLowerCase() && "ol" !== b.nodeName.toLowerCase();) b = b.parentNode;
                null === b && HTMLCS.addMessage(HTMLCS.WARNING, a, "If this element contains a navigation section, it is recommended that it be marked up as a list.", "H48")
            }
        },
        testGeneralTable: function (a) {
            !0 === HTMLCS.util.isLayoutTable(a) ?
                HTMLCS.addMessage(HTMLCS.NOTICE, a, "This table appears to be a layout table. If it is meant to instead be a data table, ensure header cells are identified using th elements.", "LayoutTable") : HTMLCS.addMessage(HTMLCS.NOTICE, a, "This table appears to be a data table. If it is meant to instead be a layout table, ensure there are no th elements, and no summary or caption.", "DataTable")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_3 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            HTMLCS.addMessage(HTMLCS.NOTICE,
                b, "Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.", "G96")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle4_Guideline4_1_4_1_1 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            if (a === b)
                for (var c = b.querySelectorAll("*[id]"), d = {}, e = 0; e < c.length; e++) {
                    var f = c[e].getAttribute("id");
                    void 0 !== d[f] ? HTMLCS.addMessage(HTMLCS.ERROR, c[e], 'Duplicate id attribute value "' + f + '" found on the web page.',
                        "F77") : d[f] = !0
                }
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle4_Guideline4_1_4_1_2 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            if (a === b) {
                for (var c = this.processFormControls(b), d = 0; d < c.length; d++) HTMLCS.addMessage(HTMLCS.ERROR, c[d].element, c[d].msg, "H91." + c[d].subcode);
                this.addProcessLinksMessages(b)
            }
        },
        addProcessLinksMessages: function (a) {
            for (var a = this.processLinks(a), b = 0; b < a.empty.length; b++) HTMLCS.addMessage(HTMLCS.WARNING, a.empty[b], "Anchor element found with an ID but without a href or link text. Consider moving its ID to a parent or nearby element.",
                "H91.A.Empty");
            for (b = 0; b < a.emptyWithName.length; b++) HTMLCS.addMessage(HTMLCS.WARNING, a.emptyWithName[b], "Anchor element found with a name attribute but without a href or link text. Consider moving the name attribute to become an ID of a parent or nearby element.", "H91.A.EmptyWithName");
            for (b = 0; b < a.emptyNoId.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.emptyNoId[b], "Anchor element found with no link content and no name and/or ID attribute.", "H91.A.EmptyNoId");
            for (b = 0; b < a.noHref.length; b++) HTMLCS.addMessage(HTMLCS.WARNING,
                a.noHref[b], "Anchor elements should not be used for defining in-page link targets. If not using the ID for other purposes (such as CSS or scripting), consider moving it to a parent element.", "H91.A.NoHref");
            for (b = 0; b < a.placeholder.length; b++) HTMLCS.addMessage(HTMLCS.WARNING, a.placeholder[b], "Anchor element found with link content, but no href, ID or name attribute has been supplied.", "H91.A.Placeholder");
            for (b = 0; b < a.noContent.length; b++) HTMLCS.addMessage(HTMLCS.ERROR, a.noContent[b], "Anchor element found with a valid href attribute, but no link content has been supplied.",
                "H91.A.NoContent")
        },
        processLinks: function (a) {
            for (var b = {
                empty: [],
                emptyWithName: [],
                emptyNoId: [],
                noHref: [],
                placeholder: [],
                noContent: []
            }, a = a.querySelectorAll("a"), c = 0; c < a.length; c++) {
                var d = a[c],
                    e = !1,
                    f = HTMLCS.util.getElementTextContent(d);
                !0 === d.hasAttribute("title") && !1 === /^\s*$/.test(d.getAttribute("title")) || /^\s*$/.test(f);
                !0 === d.hasAttribute("href") && !1 === /^\s*$/.test(d.getAttribute("href")) && (e = !0);
                !1 === e ? !0 === /^\s*$/.test(f) ? !0 === d.hasAttribute("id") ? b.empty.push(d) : !0 === d.hasAttribute("name") ?
                    b.emptyWithName.push(d) : b.emptyNoId.push(d) : !0 === d.hasAttribute("id") || !0 === d.hasAttribute("name") ? b.noHref.push(d) : b.placeholder.push(d) : !0 === /^\s*$/.test(f) && 0 === d.querySelectorAll("img").length && b.noContent.push(d)
            }
            return b
        },
        processFormControls: function (a) {
            for (var b = a.querySelectorAll("button, fieldset, input, select, textarea"), c = [], d = {
                    button: ["@title", "_content"],
                    fieldset: ["legend"],
                    input_button: ["@value"],
                    input_text: ["label", "@title"],
                    input_file: ["label", "@title"],
                    input_password: ["label", "@title"],
                    input_checkbox: ["label", "@title"],
                    input_radio: ["label", "@title"],
                    input_image: ["@alt", "@title"],
                    select: ["label", "@title"],
                    textarea: ["label", "@title"]
                }, e = {
                    select: "option_selected"
                }, f = 0; f < b.length; f++) {
                var g = b[f],
                    h = g.nodeName.toLowerCase(),
                    j = g.nodeName.substr(0, 1).toUpperCase() + g.nodeName.substr(1).toLowerCase();
                if ("input" === h) {
                    h = !1 === g.hasAttribute("type") ? h + "_text" : h + ("_" + g.getAttribute("type").toLowerCase());
                    if ("input_submit" === h || "input_reset" === h) h = "input_button";
                    j = "Input" + h.substr(6, 1).toUpperCase() +
                        h.substr(7).toLowerCase()
                }
                var i = d[h],
                    k = e[h];
                if (i) {
                    for (k = 0; k < d[h].length; k++)
                        if (i = d[h][k], "_content" === i) {
                            if (i = HTMLCS.util.getElementTextContent(g), !1 === /^\s*$/.test(i)) break
                        } else if ("label" === i) {
                        if (g.hasAttribute("id") && !1 === /^\s*$/.test(g.getAttribute("id")))
                            if (!0 === /^\-?[A-Za-z][A-Za-z0-9\-_]*$/.test(g.getAttribute("id"))) {
                                if (null !== a.querySelector("label[for=" + g.getAttribute("id") + "]")) break
                            } else {
                                for (var i = a.getElementsByTagName("label"), m = !1, s = 0; s < i.length; s++)
                                    if (!0 === i[s].hasAttribute("for") &&
                                        i[s].getAttribute("for") === g.getAttribute("id")) {
                                        m = !0;
                                        break
                                    }
                                if (!0 === m) break
                            }
                    } else if ("@" === i.charAt(0)) {
                        if (i = i.substr(1, i.length), !0 === g.hasAttribute(i) && !1 === /^\s*$/.test(g.getAttribute(i))) break
                    } else if (i = g.querySelector(i), null !== i && (i = HTMLCS.util.getElementTextContent(i), !1 === /^\s*$/.test(i))) break;
                    if (k === d[h].length) {
                        i = h + " element";
                        "input_" === h.substr(0, 6) && (i = h.substr(6) + " input element");
                        k = d[h].slice(0, d[h].length);
                        for (m = 0; m < k.length; m++) k[m] = "_content" === k[m] ? "element content" : "@" === k[m].charAt(0) ?
                            k[m].substr(1) + " attribute" : k[m] + " element";
                        k = "This " + i + " does not have a name available to an accessibility API. Valid names are: " + k.join(", ") + ".";
                        c.push({
                            element: g,
                            msg: k,
                            subcode: j + ".Name"
                        })
                    }
                }
                k = e[h];
                m = !1;
                void 0 === k ? m = !0 : "_content" === k ? (i = HTMLCS.util.getElementTextContent(g), !1 === /^\s*$/.test(i) && (m = !0)) : "option_selected" === k ? !1 === g.hasAttribute("multiple") ? null !== g.querySelector("option[selected]") && (m = !0) : m = !0 : "@" === k.charAt(0) && (k = k.substr(1, k.length), !0 === g.hasAttribute(k) && (m = !0));
                !1 === m &&
                    (i = h + " element", "input_" === h.substr(0, 6) && (i = h.substr(6) + " input element"), h = "", h = "_content" === k ? "by adding content to the element" : "option_selected" === k ? 'by adding a "selected" attribute to one of its options' : "@" === k.charAt(0) ? "using the " + k + " attribute" : "using the " + k + " element", k = "This " + i + " does not have a value available to an accessibility API. Add one " + h + ".", c.push({
                    element: g,
                    msg: k,
                    subcode: j + ".Value"
                }))
            }
            return c
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_5 = {
        register: function () {
            return ["form"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that context-sensitive help is available for this form, at a Web-page and/or control level.", "G71,G184,G193")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_1 = {
        register: function () {
            return ["form"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "If an input error is automatically detected in this form, check that the item(s) in error are identified and the error(s) are described to the user in text.", "G83,G84,G85")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_6 = {
        register: function () {
            return ["form"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that submissions to this form are either reversible, checked for input errors, and/or confirmed by the user.", "G98,G99,G155,G164,G168.AllForms")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_2 = {
        register: function () {
            return ["form"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that descriptive labels or instructions (including for required fields) are provided for user input in this form.",
                "G131,G89,G184,H90")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_3 = {
        register: function () {
            return ["form"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that this form provides suggested corrections to errors in user input, unless it would jeopardize the security or purpose of the content.", "G177")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_4 = {
        register: function () {
            return ["form"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this form would bind a user to a financial or legal commitment, modify/delete user-controllable data, or submit test responses, ensure that submissions are either reversible, checked for input errors, and/or confirmed by the user.",
                "G98,G99,G155,G164,G168.LegalForms")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_3 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.", "G61")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_4 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            HTMLCS.addMessage(HTMLCS.NOTICE,
                b, "Check that components that have the same functionality within this Web page are identified consistently in the set of Web pages to which it belongs.", "G197")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_2 = {
        register: function () {
            return ["form"]
        },
        process: function (a) {
            "form" === a.nodeName.toLowerCase() && this.checkFormSubmitButton(a)
        },
        checkFormSubmitButton: function (a) {
            null === a.querySelector("input[type=submit], input[type=image], button[type=submit]") && HTMLCS.addMessage(HTMLCS.ERROR, a, 'Form does not contain a submit button (input type="submit", input type="image", or button type="submit").',
                "H32.2")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_5 = {
        register: function () {
            return ["a"]
        },
        process: function (a) {
            "a" === a.nodeName.toLowerCase() && this.checkNewWindowTarget(a)
        },
        checkNewWindowTarget: function (a) {
            !0 === a.hasAttribute("target") && "_blank" === (a.getAttribute("target") || "") && !1 === /new window/i.test(a.innerHTML) && HTMLCS.addMessage(HTMLCS.WARNING, a, "Check that this link's link text contains information indicating that the link will open in a new window.", "H83.3")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_1 = {
        register: function () {
            return ["input", "textarea", "button", "select"]
        },
        process: function (a) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that a change of context does not occur when this input field receives focus.", "G107")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_2 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Ensure that any change in language is marked using the lang and/or xml:lang attribute on an element, as appropriate.", "H58");
            for (var c = HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_1,
                    d = b.querySelectorAll("*[lang]"), e = 0; e <= d.length; e++) {
                var f = e === d.length ? b : d[e];
                if (!f.documentElement && "html" !== f.nodeName.toLowerCase()) {
                    if (!0 === f.hasAttribute("lang")) {
                        var g = f.getAttribute("lang");
                        !1 === c.isValidLanguageTag(g) && HTMLCS.addMessage(HTMLCS.ERROR, f, "The language specified in the lang attribute of this element does not appear to be well-formed.", "H58.1.Lang")
                    }!0 === f.hasAttribute("xml:lang") && (g = f.getAttribute("xml:lang"), !1 === c.isValidLanguageTag(g) && HTMLCS.addMessage(HTMLCS.ERROR, f, "The language specified in the xml:lang attribute of this element does not appear to be well-formed.",
                        "H58.1.XmlLang"))
                }
            }
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_6 = {
        register: function () {
            return ["ruby"]
        },
        process: function (a) {
            var b = a.querySelectorAll("rb");
            0 === a.querySelectorAll("rt").length && (0 === b.length ? HTMLCS.addMessage(HTMLCS.ERROR, a, "Ruby element does not contain an rt element containing pronunciation information for its body text.", "H62.1.HTML5") : HTMLCS.addMessage(HTMLCS.ERROR, a, "Ruby element does not contain an rt element containing pronunciation information for the text inside the rb element.",
                "H62.1.XHTML11"));
            0 === a.querySelectorAll("rp").length && HTMLCS.addMessage(HTMLCS.ERROR, a, "Ruby element does not contain rp elements, which provide extra punctuation to browsers not supporting ruby text.", "H62.2")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_5 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Where the content requires reading ability more advanced than the lower secondary education level, supplemental content or an alternative version should be provided.",
                "G86,G103,G79,G153,G160")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_3 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that there is a mechanism available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.", "H40,H54,H60,G62,G70")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_4 = {
        register: function () {
            return ["_top"]
        },
        process: function (a, b) {
            HTMLCS.addMessage(HTMLCS.NOTICE,
                b, "Check that a mechanism for identifying the expanded form or meaning of abbreviations is available.", "G102,G55,G62,H28,G97")
        }
    }, HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_1 = {
        register: function () {
            return ["html"]
        },
        process: function (a, b) {
            if (!1 === a.hasAttribute("lang") && !1 === a.hasAttribute("xml:lang")) HTMLCS.addMessage(HTMLCS.ERROR, a, "The html element should have a lang or xml:lang attribute which describes the language of the document.", "H57.2");
            else {
                if (!0 === a.hasAttribute("lang")) {
                    var c = a.getAttribute("lang");
                    !1 === this.isValidLanguageTag(c) && HTMLCS.addMessage(HTMLCS.ERROR, b, "The language specified in the lang attribute of the document element does not appear to be well-formed.", "H57.3.Lang")
                }!0 === a.hasAttribute("xml:lang") && (c = a.getAttribute("xml:lang"), !1 === this.isValidLanguageTag(c) && HTMLCS.addMessage(HTMLCS.ERROR, b, "The language specified in the xml:lang attribute of the document element does not appear to be well-formed.", "H57.3.XmlLang"))
            }
        },
        isValidLanguageTag: function (a) {
            var b = !0;
            !1 === RegExp("^([ix](-[a-z0-9]{1,8})+)$|^[a-z]{2,8}(-[a-z]{3}){0,3}(-[a-z]{4})?(-[a-z]{2}|-[0-9]{3})?(-[0-9][a-z0-9]{3}|-[a-z0-9]{5,8})*(-[a-wy-z0-9](-[a-z0-9]{2,8})+)*(-x(-[a-z0-9]{1,8})+)?$",
                "i").test(a) && (b = !1);
            return b
        }
    }, HTMLCS_WCAG2AA = {
        name: "WCAG2AA",
        description: "Web Content Accessibility Guidelines (WCAG) 2.0 AA",
        sniffs: [{
            standard: "WCAG2AAA",
            include: "Principle1.Guideline1_1.1_1_1 Principle1.Guideline1_2.1_2_1 Principle1.Guideline1_2.1_2_2 Principle1.Guideline1_2.1_2_4 Principle1.Guideline1_2.1_2_5 Principle1.Guideline1_3.1_3_1 Principle1.Guideline1_3.1_3_1_A Principle1.Guideline1_3.1_3_2 Principle1.Guideline1_3.1_3_3 Principle1.Guideline1_4.1_4_1 Principle1.Guideline1_4.1_4_2 Principle1.Guideline1_4.1_4_3 Principle1.Guideline1_4.1_4_3_F24 Principle1.Guideline1_4.1_4_3_Contrast Principle1.Guideline1_4.1_4_4 Principle1.Guideline1_4.1_4_5 Principle2.Guideline2_1.2_1_1 Principle2.Guideline2_1.2_1_2 Principle2.Guideline2_2.2_2_1 Principle2.Guideline2_2.2_2_2 Principle2.Guideline2_3.2_3_1 Principle2.Guideline2_4.2_4_1 Principle2.Guideline2_4.2_4_2 Principle2.Guideline2_4.2_4_3 Principle2.Guideline2_4.2_4_4 Principle2.Guideline2_4.2_4_5 Principle2.Guideline2_4.2_4_6 Principle2.Guideline2_4.2_4_7 Principle3.Guideline3_1.3_1_1 Principle3.Guideline3_1.3_1_2 Principle3.Guideline3_2.3_2_1 Principle3.Guideline3_2.3_2_2 Principle3.Guideline3_2.3_2_3 Principle3.Guideline3_2.3_2_4 Principle3.Guideline3_3.3_3_1 Principle3.Guideline3_3.3_3_2 Principle3.Guideline3_3.3_3_3 Principle3.Guideline3_3.3_3_4 Principle4.Guideline4_1.4_1_1 Principle4.Guideline4_1.4_1_2".split(" ")
        }],
        getMsgInfo: function (a) {
            return HTMLCS_WCAG2AAA.getMsgInfo(a)
        }
    }, HTMLCS_WCAG2A = {
        name: "WCAG2A",
        description: "Web Content Accessibility Guidelines (WCAG) 2.0 A",
        sniffs: [{
            standard: "WCAG2AAA",
            include: "Principle1.Guideline1_1.1_1_1 Principle1.Guideline1_2.1_2_1 Principle1.Guideline1_2.1_2_2 Principle1.Guideline1_2.1_2_3 Principle1.Guideline1_3.1_3_1 Principle1.Guideline1_3.1_3_1_A Principle1.Guideline1_3.1_3_2 Principle1.Guideline1_3.1_3_3 Principle1.Guideline1_4.1_4_1 Principle1.Guideline1_4.1_4_2 Principle2.Guideline2_1.2_1_1 Principle2.Guideline2_1.2_1_2 Principle2.Guideline2_2.2_2_1 Principle2.Guideline2_2.2_2_2 Principle2.Guideline2_3.2_3_1 Principle2.Guideline2_4.2_4_1 Principle2.Guideline2_4.2_4_2 Principle2.Guideline2_4.2_4_3 Principle2.Guideline2_4.2_4_4 Principle3.Guideline3_1.3_1_1 Principle3.Guideline3_2.3_2_1 Principle3.Guideline3_2.3_2_2 Principle3.Guideline3_3.3_3_1 Principle3.Guideline3_3.3_3_2 Principle4.Guideline4_1.4_1_1 Principle4.Guideline4_1.4_1_2".split(" ")
        }],
        getMsgInfo: function (a) {
            return HTMLCS_WCAG2AAA.getMsgInfo(a)
        }
    };
var HTMLCSAuditor = new function () {
        var z = "",
            v = "",
            x = [],
            l = {}, e = null,
            p = [],
            u = 1,
            s = this;
        this.pointerContainer = null;
        var A = function (b, a, c, d) {
            var k = e.createElement("div");
            k.id = b;
            k.className = "HTMLCS-button";
            k.setAttribute("title", c);
            b = e.createElement("span");
            b.className = "HTMLCS-button-icon HTMLCS-button-" + a;
            k.appendChild(b);
            a = e.createTextNode(String.fromCharCode(160));
            k.appendChild(a);
            !0 === d instanceof Function && (k.onclick = function () {
                !1 === /disabled/.test(k.className) && d(k)
            });
            return k
        }, H = function (b, a, c, d, k) {
                void 0 ===
                    c && (c = !1);
                var f = e.createElement("label");
                f.className = "HTMLCS-checkbox";
                b = '<span class="HTMLCS-checkbox-switch"><span class="HTMLCS-checkbox-slider"></span>' + ('<input id="' + b + '" type="checkbox"');
                !0 === c && (b += ' checked="checked"', f.className += " active");
                !0 === d && (b += ' disabled="disabled"', f.className += " disabled");
                f.innerHTML = b + (' title="' + a + '" /></span>');
                var g = f.getElementsByTagName("input")[0];
                f.onclick = function () {
                    if (d === false) {
                        g.checked = !g.checked;
                        f.className = g.checked === true ? f.className + " active" :
                            f.className.replace("active", "");
                        k instanceof Function === true && k(g)
                    }
                    return false
                };
                return f
            }, D = function (b, a) {
                var c = e.createElement("div");
                c.className = "HTMLCS-header";
                c.innerHTML = "HTML_CodeSniffer by Squiz";
                c.setAttribute("title", "Using standard " + b);
                var d = !1,
                    k = 0,
                    f = 0;
                c.onmousedown = function (a) {
                    a = a || window.event;
                    d = !0;
                    k = a.clientX;
                    f = a.clientY;
                    return !1
                };
                e.onmousemove = function (b) {
                    b = b || window.event;
                    if (!0 === d) {
                        var c = a.offsetTop,
                            e = a.offsetLeft;
                        f < b.clientY ? (c += b.clientY - f, a.style.top = c + "px") : f > b.clientY && (c -=
                            f - b.clientY, a.style.top = c + "px");
                        k < b.clientX ? (e += b.clientX - k, a.style.left = e + "px") : k > b.clientX && (e -= k - b.clientX, a.style.left = e + "px");
                        k = b.clientX;
                        f = b.clientY
                    }
                };
                e.onmouseup = function () {
                    d = !1
                };
                var g = e.createElement("div");
                g.className = "HTMLCS-close";
                g.setAttribute("title", "Close");
                g.onmousedown = function () {
                    s.close.call(s)
                };
                c.appendChild(g);
                return c
            }, y = function (b, a) {
                var c = e.createElement("div");
                c.className = "HTMLCS-summary-detail";
                var d = e.createElement("div");
                d.className = "HTMLCS-summary-left";
                var k = e.createElement("div");
                k.className = "HTMLCS-summary-right";
                var f = e.createElement("ol");
                f.className = "HTMLCS-lineage";
                var g = e.createElement("li");
                g.className = "HTMLCS-lineage-item";
                var j = e.createElement("a");
                j.className = "HTMLCS-lineage-link";
                j.href = "javascript:";
                var h = e.createElement("span");
                h.innerHTML = "Home";
                j.appendChild(h);
                j.onmousedown = function () {
                    s.run(v, x, l)
                };
                h = e.createElement("li");
                h.className = "HTMLCS-lineage-item";
                var m = e.createElement("a");
                m.className = "HTMLCS-lineage-link";
                m.href = "javascript:";
                m.innerHTML = "Report";
                m.setAttribute("title", "Back to Report");
                m.onmousedown = function () {
                    var a = e.querySelectorAll(".HTMLCS-inner-wrapper")[0];
                    a.style.marginLeft = "0px";
                    a.style.maxHeight = null;
                    c.style.display = "none";
                    e.querySelectorAll(".HTMLCS-summary")[0].style.display = "block"
                };
                var n = e.createElement("li");
                n.className = "HTMLCS-lineage-item";
                n.innerHTML = "Issue " + b + " of " + a;
                g.appendChild(j);
                h.appendChild(m);
                f.appendChild(g);
                f.appendChild(h);
                f.appendChild(n);
                d.appendChild(f);
                f = e.createElement("div");
                f.className = "HTMLCS-button-group";
                g = A("HTMLCS-button-previous-issue", "previous", "Previous Issue", function () {
                    var d = Number(b) - 1;
                    if (1 <= d) {
                        B(d - 1);
                        wrapper = c.parentNode;
                        var f = y(d, a);
                        wrapper.replaceChild(f, c);
                        f.style.display = "block";
                        f = e.querySelectorAll(".HTMLCS-issue-detail-list")[0];
                        f.firstChild.style.marginLeft = parseInt(f.firstChild.style.marginLeft, 10) + 300 + "px";
                        C(d - 1)
                    }
                });
                j = A("HTMLCS-button-next-issue", "next", "Next Issue", function () {
                    var d = Number(b) + 1;
                    if (d <= p.length) {
                        B(d - 1);
                        wrapper = c.parentNode;
                        var f = y(d, a);
                        wrapper.replaceChild(f, c);
                        f.style.display =
                            "block";
                        f = e.querySelectorAll(".HTMLCS-issue-detail-list")[0];
                        f.firstChild.style.marginLeft = parseInt(f.firstChild.style.marginLeft, 10) - 300 + "px";
                        C(d - 1)
                    }
                });
                1 === b && (g.className += " disabled");
                b === a && (j.className += " disabled");
                f.appendChild(g);
                f.appendChild(j);
                k.appendChild(f);
                c.appendChild(d);
                c.appendChild(k);
                return c
            }, E = function (b, a) {
                var c = "",
                    d = "",
                    k = "";
                switch (a.type) {
                case HTMLCS.ERROR:
                    d = "Error";
                    break;
                case HTMLCS.WARNING:
                    d = "Warning";
                    break;
                case HTMLCS.NOTICE:
                    d = "Notice"
                }
                var k = d.toLowerCase(),
                    f = a.msg;
                115 <
                    f.length && (f = f.substr(0, 115) + "...");
                c = e.createElement("li");
                c.id = "HTMLCS-msg-" + b;
                var g = e.createElement("span");
                g.className = "HTMLCS-issue-type HTMLCS-" + k;
                g.setAttribute("title", d);
                c.appendChild(g);
                d = e.createElement("span");
                d.className = "HTMLCS-issue-title";
                d.innerHTML = f;
                c.appendChild(d);
                c.onclick = function () {
                    var a = this.id.replace(/HTMLCS-msg-/, "");
                    B(a);
                    var b = e.querySelectorAll(".HTMLCS-issue-detail-list")[0];
                    b.className += " HTMLCS-transition-disabled";
                    b.firstChild.style.marginLeft = -300 * a + "px";
                    C(a);
                    setTimeout(function () {
                        b.className =
                            b.className.replace(/ HTMLCS-transition-disabled/, "")
                    }, 500);
                    var c = e.querySelectorAll(".HTMLCS-inner-wrapper")[0];
                    c.style.marginLeft = "-300px";
                    c.style.maxHeight = "15em";
                    summary = e.querySelectorAll(".HTMLCS-summary-detail")[0];
                    a = y(parseInt(a) + 1, p.length);
                    summary.parentNode.replaceChild(a, summary);
                    a.style.display = "block";
                    e.querySelectorAll(".HTMLCS-summary")[0].style.display = "none"
                };
                return c
            }, B = function (b) {
                for (var a = e.querySelectorAll(".HTMLCS-issue-detail-list")[0].getElementsByTagName("li"), c = 0; c < a.length; c++) a[c].className =
                    a[c].className.replace(/ HTMLCS-current/, "");
                e.getElementById("HTMLCS-msg-detail-" + b).className += " HTMLCS-current";
                l.showIssueCallback && l.showIssueCallback.call(this, b)
            }, F = function (b, a, c) {
                void 0 === c && (c = v);
                var d = "";
                switch (a.type) {
                case HTMLCS.ERROR:
                    d = "Error";
                    break;
                case HTMLCS.WARNING:
                    d = "Warning";
                    break;
                case HTMLCS.NOTICE:
                    d = "Notice"
                }
                var k = "HTMLCS-" + d.toLowerCase(),
                    f = HTMLCS.util.getElementWindow(e)["HTMLCS_" + c],
                    g = [];
                f.getMsgInfo && (g = f.getMsgInfo(a.code));
                f = e.createElement("li");
                f.id = "HTMLCS-msg-detail-" +
                    b;
                var j = e.createElement("div");
                j.className = "HTMLCS-issue-details";
                var h = e.createElement("span");
                h.className = "HTMLCS-issue-type " + k;
                h.setAttribute("title", d);
                d = e.createElement("div");
                d.className = "HTMLCS-issue-title";
                d.innerHTML = a.msg;
                k = e.createElement("div");
                k.className = "HTMLCS-issue-wcag-ref";
                for (var m = "", n = 0; n < g.length; n++) m += "<em>" + g[n][0] + ":</em> " + g[n][1] + "<br/>";
                k.innerHTML = m;
                j.appendChild(h);
                j.appendChild(d);
                j.appendChild(k);
                f.appendChild(j);
                !1 === w.isPointable(a.element) && (g = e.createElement("div"),
                    g.className = "HTMLCS-issue-source", f.appendChild(g), h = e.createElement("div"), h.className = "HTMLCS-issue-source-inner-u2p", d = "Unable to point to the element associated with this issue.", null === a.element.ownerDocument ? d = "Unable to point to this issue, as it relates to the entire document." : (k = a.element.ownerDocument.getElementsByTagName("body")[0], d = !1 === HTMLCS.util.isInDocument(a.element) ? d + "Unable to point to this element as it has been removed from the document since the report was generated." : !1 ===
                        HTMLCS.util.contains(k, a.element) ? "Unable to point to this element because it is located outside the document's body element." : d + "Unable to point to this element because it is hidden from view, or does not have a visual representation."), void 0 !== h.textContent ? h.textContent = d : h.innerText = d, g.appendChild(h));
                if (l.customIssueSource) g = e.createElement("div"), g.className = "HTMLCS-issue-source", f.appendChild(g), l.customIssueSource.call(this, b, a, c, g, j);
                else {
                    g = e.createElement("div");
                    g.className = "HTMLCS-issue-source";
                    c = e.createElement("div");
                    c.className = "HTMLCS-issue-source-header";
                    j = e.createElement("strong");
                    j.innerHTML = "Code Snippet";
                    b = A("HTMLCS-button-point-to-element-" + b, "pointer", "Point to Element", function () {
                        s.pointToElement(a.element)
                    });
                    c.appendChild(j);
                    c.appendChild(b);
                    g.appendChild(c);
                    if (a.element.outerHTML) {
                        c = b = "";
                        j = 31 < a.element.innerHTML.length ? a.element.outerHTML.replace(a.element.innerHTML, a.element.innerHTML.substr(0, 31) + "...") : a.element.outerHTML;
                        for (h = a.element.previousSibling; 31 >= b.length && null !==
                            h;) 1 === h.nodeType ? b = h.outerHTML : 3 === h.nodeType && (b = void 0 !== h.textContent ? h.textContent + b : h.nodeValue + b), 31 < b.length && (b = "..." + b.substr(b.length - 31)), h = h.previousSibling;
                        for (h = a.element.nextSibling; 31 >= c.length && null !== h;) 1 === h.nodeType ? c += h.outerHTML : 3 === h.nodeType && (c = void 0 !== h.textContent ? c + h.textContent : c + h.nodeValue), 31 < c.length && (c = c.substr(0, 31) + "..."), h = h.nextSibling;
                        h = e.createElement("div");
                        h.className = "HTMLCS-issue-source-inner";
                        d = e.createElement("strong");
                        void 0 !== d.textContent ? d.textContent =
                            j : d.innerText = j;
                        h.appendChild(e.createTextNode(b));
                        h.appendChild(d);
                        h.appendChild(e.createTextNode(c))
                    } else h = e.createElement("div"), h.className = "HTMLCS-issue-source-not-supported", h.appendChild(e.createTextNode("The code snippet functionality is not supported in this browser."));
                    g.appendChild(h);
                    f.appendChild(g)
                }
                return f
            }, C = function (b) {
                var a = p[Number(b)];
                if (a.element)
                    if (b = e.getElementById("HTMLCS-button-point-to-element-" + b), w.container = s.pointerContainer || e.getElementById("HTMLCS-wrapper"), !1 ===
                        w.isPointable(a.element)) {
                        if (a = w.getPointer(a.element), w.pointer && (a.className += " HTMLCS-pointer-hidden"), b) b.className += " disabled"
                    } else b && (b.className = b.className.replace(" disabled", "")), w.pointTo(a.element)
            }, G = function (b, a) {
                if (0 === b.length) a.call(this);
                else {
                    var c = b.shift();
                    HTMLCS.loadStandard(c, function () {
                        G(b, a)
                    })
                }
            };
        this.getIssue = function (b) {
            return p[b]
        };
        this.countIssues = function (b) {
            for (var a = {
                error: 0,
                warning: 0,
                notice: 0
            }, c = 0; c < b.length; c++) switch (b[c].type) {
            case HTMLCS.ERROR:
                a.error++;
                break;
            case HTMLCS.WARNING:
                a.warning++;
                break;
            case HTMLCS.NOTICE:
                a.notice++
            }
            return a
        };
        this.build = function (b, a) {
            var c = null;
            e && e.getElementById("HTMLCS-wrapper");
            for (var d = 0, k = 0, f = 0, c = 0; c < a.length; c++) {
                var g = !1;
                switch (a[c].type) {
                case HTMLCS.ERROR:
                    !1 === l.show.error ? g = !0 : d++;
                    break;
                case HTMLCS.WARNING:
                    !1 === l.show.warning ? g = !0 : k++;
                    break;
                case HTMLCS.NOTICE:
                    !1 === l.show.notice ? g = !0 : f++
                }!0 === g && (a.splice(c, 1), c--)
            }
            p = a;
            for (var j = g = "", c = 0; c < a.length; c++) {
                0 === c % 5 && (g += '<ol class="HTMLCS-issue-list"', 0 === c && (g += 'style="margin-left: 0em"'),
                    g += ">");
                g += E(c, a[c]);
                if (4 === c % 5 || c === a.length - 1) g += "</ol>";
                j += F(c, a[c], b)
            }
            c = e.createElement("div");
            c.id = "HTMLCS-wrapper";
            c.className = "showing-issue-list";
            !0 !== l.noHeader && (g = D(b, c), c.appendChild(g));
            var j = d,
                h = k,
                m = f,
                f = e.createElement("div");
            f.className = "HTMLCS-summary";
            k = e.createElement("div");
            k.className = "HTMLCS-summary-left";
            f.appendChild(k);
            d = e.createElement("div");
            d.className = "HTMLCS-summary-right";
            f.appendChild(d);
            g = [];
            if (0 < j) {
                var n = "Errors";
                1 === j && (n = "Error");
                g.push("<strong>" + j + "</strong> " +
                    n)
            }
            0 < h && (n = "Warnings", 1 === h && (n = "Warning"), g.push("<strong>" + h + "</strong> " + n));
            0 < m && (n = "Notices", 1 === m && (n = "Notice"), g.push("<strong>" + m + "</strong> " + n));
            j = e.createElement("ol");
            j.className = "HTMLCS-lineage";
            h = e.createElement("li");
            h.className = "HTMLCS-lineage-item";
            m = e.createElement("a");
            m.className = "HTMLCS-lineage-link";
            m.href = "javascript:";
            n = e.createElement("span");
            n.innerHTML = "Home";
            m.appendChild(n);
            m.onmousedown = function () {
                s.run(v, x, l)
            };
            n = e.createElement("li");
            n.className = "HTMLCS-lineage-item";
            n.innerHTML = g.join(', &#160;<span class="HTMLCS-divider"></span>');
            h.appendChild(m);
            j.appendChild(h);
            j.appendChild(n);
            k.appendChild(j);
            d.appendChild(e.createTextNode(String.fromCharCode(160)));
            k = y(1, a.length);
            d = e.createElement("div");
            d.id = "HTMLCS-issues-wrapper";
            d.className = "HTMLCS-inner-wrapper";
            j = 300 * Math.ceil(a.length / 5);
            g = e.createElement("div");
            g.id = "HTMLCS-issues";
            g.className = "HTMLCS-details";
            g.setAttribute("style", "width: " + j + "px");
            j = e.createElement("ol");
            j.className = "HTMLCS-issue-list";
            j.setAttribute("style",
                "margin-left: 0");
            for (h = 0; h < a.length; h++) 0 < h && 0 === h % 5 && (g.appendChild(j), j = e.createElement("ol"), j.className = "HTMLCS-issue-list"), m = E(h, a[h]), j.appendChild(m);
            g.appendChild(j);
            d.appendChild(g);
            var o = Math.ceil(a.length / 5),
                g = e.createElement("div");
            g.className = "HTMLCS-navigation";
            var r = e.createElement("span");
            r.className = "HTMLCS-nav-button HTMLCS-previous";
            r.innerHTML = String.fromCharCode(160);
            r.className += " HTMLCS-disabled";
            g.appendChild(r);
            var q = e.createElement("span");
            q.className = "HTMLCS-page-number";
            q.innerHTML = "Page 1 of " + o;
            g.appendChild(q);
            var t = e.createElement("span");
            t.className = "HTMLCS-nav-button HTMLCS-next";
            t.innerHTML = String.fromCharCode(160);
            1 === o && (t.className += " HTMLCS-disabled");
            g.appendChild(t);
            r.onclick = function () {
                if (u > 1) {
                    u--;
                    if (u === 1) r.className = r.className + " HTMLCS-disabled"
                }
                if (o > 1) t.className = t.className.replace(/ HTMLCS-disabled/, "");
                q.innerHTML = "";
                q.appendChild(document.createTextNode("Page " + u + " of " + o));
                e.querySelectorAll(".HTMLCS-issue-list")[0].style.marginLeft = (u - 1) * -300 + "px"
            };
            t.onclick = function () {
                if (u < o) {
                    u++;
                    if (u === o) t.className = t.className + " HTMLCS-disabled"
                }
                if (o > 1) r.className = r.className.replace(/ HTMLCS-disabled/, "");
                q.innerHTML = "";
                q.appendChild(document.createTextNode("Page " + u + " of " + o));
                e.querySelectorAll(".HTMLCS-issue-list")[0].style.marginLeft = (u - 1) * -300 + "px"
            };
            d.appendChild(g);
            g = e.createElement("div");
            g.className = "HTMLCS-outer-wrapper";
            g.appendChild(d);
            d = e.createElement("div");
            d.id = "HTMLCS-issues-detail-wrapper";
            d.className = "HTMLCS-inner-wrapper";
            h =
                300 * a.length;
            j = e.createElement("div");
            j.id = "HTMLCS-issues-detail";
            j.className = "HTMLCS-details";
            j.setAttribute("style", "width: " + h + "px");
            h = e.createElement("ol");
            h.className = "HTMLCS-issue-detail-list";
            h.setAttribute("style", "margin-left: 0");
            for (m = 0; m < a.length; m++) n = F(m, a[m]), h.appendChild(n);
            j.appendChild(h);
            d.appendChild(j);
            g.appendChild(d);
            c.appendChild(f);
            c.appendChild(k);
            c.appendChild(g);
            return c
        };
        this.buildSummaryPage = function () {
            var b = e.createElement("div");
            b.id = "HTMLCS-wrapper";
            b.className = "showing-settings";
            if (!0 !== l.noHeader) {
                var a = D(v, b);
                b.appendChild(a)
            }
            a = e.createElement("div");
            a.className = "HTMLCS-settings";
            var c = e.createElement("div");
            c.id = "HTMLCS-settings-use-standard";
            var d = e.createElement("label");
            d.innerHTML = "Standards:";
            d.setAttribute("for", "HTMLCS-settings-use-standard-select");
            var k = e.createElement("select");
            k.id = "HTMLCS-settings-use-standard-select";
            k.innerHTML = "";
            for (var f = HTMLCSAuditor.getStandardList(), g = 0; g < f.length; g++) {
                var j = f[g],
                    h = e.createElement("option");
                h.value = j;
                h.innerHTML = window["HTMLCS_" +
                    j].name;
                j === v && (h.selected = !0);
                k.appendChild(h);
                k.onchange = function () {
                    v = this.options[this.selectedIndex].value;
                    s.run(v, x, l)
                }
            }
            f = e.createElement("div");
            f.id = "HTMLCS-settings-issue-count";
            g = e.createElement("div");
            g.id = "HTMLCS-settings-issue-count-help";
            g.innerHTML = "Select the types of issues to include in the report";
            var m = e.createElement("div");
            m.id = "HTMLCS-settings-view-report";
            m.innerHTML = "View Report";
            m.onclick = function () {
                if (!1 === /disabled/.test(this.className)) {
                    l.show = {
                        error: e.getElementById("HTMLCS-include-error").checked,
                        warning: e.getElementById("HTMLCS-include-warning").checked,
                        notice: e.getElementById("HTMLCS-include-notice").checked
                    };
                    var a = e.getElementById("HTMLCS-wrapper"),
                        b = s.build(v, p, l);
                    l.parentElement ? l.parentElement.replaceChild(b, a) : (b.style.left = a.style.left, b.style.top = a.style.top, e.body.replaceChild(b, a));
                    l.listUpdateCallback && l.listUpdateCallback.call(this, p)
                }
            };
            e.getElementById("HTMLCS-wrapper");
            j = s.countIssues(p);
            void 0 === l.show && 0 < p.length && (l.show = {
                    error: !0,
                    warning: !0,
                    notice: !1
                }, 0 === j.error && 0 === j.warning &&
                (l.show.notice = !0));
            for (var n in j) {
                var o = j[n],
                    h = e.createElement("div");
                h.className = "HTMLCS-issue-tile HTMLCS-" + n.toLowerCase();
                var r = e.createElement("div");
                r.className = "HTMLCS-tile-text";
                var q = "<strong>" + o + "</strong> " + n.substr(0, 1).toUpperCase() + n.substr(1);
                1 !== o && (q += "s");
                r.innerHTML = q;
                if (void 0 === l.show) var q = !1,
                t = !0;
                else q = l.show[n], t = !1, 0 === o && (q = !1, t = !0);
                o = H("HTMLCS-include-" + n, "Toggle display of " + n + " messages", q, t, function () {
                    var a = false;
                    if (e.getElementById("HTMLCS-include-error").disabled ===
                        false) {
                        l.show.error = e.getElementById("HTMLCS-include-error").checked;
                        a = a || l.show.error
                    }
                    if (e.getElementById("HTMLCS-include-warning").disabled === false) {
                        l.show.warning = e.getElementById("HTMLCS-include-warning").checked;
                        a = a || l.show.warning
                    }
                    if (e.getElementById("HTMLCS-include-notice").disabled === false) {
                        l.show.notice = e.getElementById("HTMLCS-include-notice").checked;
                        a = a || l.show.notice
                    }
                    m.className = a === true ? m.className.replace(/ disabled/g, "") : m.className + " disabled"
                });
                h.appendChild(r);
                h.appendChild(o);
                f.appendChild(h)
            }
            if (void 0 !== l.show) {
                if (!1 === (l.show.error || l.show.warning || l.show.notice)) m.className += " disabled"
            } else m.className += " disabled";
            c.appendChild(d);
            c.appendChild(k);
            a.appendChild(c);
            a.appendChild(f);
            a.appendChild(g);
            a.appendChild(m);
            b.appendChild(a);
            return b
        };
        this.changeScreen = function (b) {
            var a = e.getElementById("HTMLCS-wrapper");
            a.className = a.className.replace(RegExp("showing-" + z), "");
            a.className += " showing-" + b;
            a.className = a.className.replace(/\s+/, " ");
            z = b
        };
        this.includeCss = function (b,
            a) {
            if (!1 !== l.includeCss) {
                void 0 === a && (a = e);
                for (var c = a.querySelector("head"), d = c.getElementsByTagName("link"), k = !1, f = 0; f < d.length; f++)
                    if (!0 === RegExp(b + ".css").test(d[f].getAttribute("href"))) {
                        k = !0;
                        break
                    }!1 === k && (d = a.createElement("link"), d.rel = "stylesheet", d.type = "text/css", d.href = l.path + b + ".css", c.appendChild(d))
            }
        };
        this.getStandardList = function () {
            var b = /^HTMLCS_[^_]+$/,
                a = [];
            for (i in window)
                if (!0 === b.test(i)) {
                    var c = window[i];
                    c.sniffs && c.name && a.push(i.substr(7))
                }
            return a
        };
        this.run = function (b, a, c) {
            for (var d =
                this.getStandardList(), k = [], f = 0; f < d.length; f++) window["HTMLCS_" + d[f]] || k.push(d[f]);
            if (0 < k.length) G(k, function () {
                s.run(b, a, c)
            });
            else {
                if (null === a || void 0 === a) {
                    if (a = [], 0 === document.querySelectorAll("frameset").length && a.push(document), 0 < window.frames.length)
                        for (f = 0; f < window.frames.length; f++) try {
                            a.push(window.frames[f].document)
                        } catch (g) {}
                } else a.nodeName && ("input" === a.nodeName.toLowerCase() ? !1 === a.hasAttribute("type") ? a = a.value : "text" === a.getAttribute("type").toLowerCase() && (a = a.value) : "textarea" ===
                    a.nodeName.toLowerCase() && (a = a.value));
                !1 === a instanceof Array && (a = [a]);
                void 0 === c && (c = {});
                v = b;
                x = a;
                l = c;
                u = 1;
                z = "";
                p = [];
                var j = null;
                if (l.parentElement) j = l.parentElement;
                else if (0 < window.frames.length) {
                    d = -1;
                    k = null;
                    for (f = 0; f < window.frames.length; f++) try {
                        if ("frame" === window.frames[f].frameElement.nodeName.toLowerCase() && window.frames[f].document) {
                            var h = window.frames[f].innerWidth * window.frames[f].innerHeight;
                            h > d && (d = h, k = window.frames[f].document.body)
                        }
                    } catch (m) {}
                    j = null === k ? document.body : k
                } else j = document.body;
                e = j;
                e.ownerDocument && (e = e.ownerDocument);
                l.path || (l.path = "./");
                void 0 === l.includeCss && (l.includeCss = !0);
                void 0 === l.ignoreMsgCodes && (l.ignoreMsgCodes = []);
                this.includeCss("HTMLCS");
                var f = e.getElementById("HTMLCS-wrapper"),
                    n = !1,
                    o = s.buildSummaryPage();
                o.className += " HTMLCS-processing";
                f ? (o.style.left = f.style.left, o.style.top = f.style.top, j.replaceChild(o, f)) : (l.openCallback && l.openCallback.call(this), n = !0, j.appendChild(o));
                var r = function () {
                    for (var a = 0; a < p.length; a++) {
                        var d = false;
                        o && (o === p[a].element ? d =
                            true : p[a].element.documentElement ? d = false : o.contains && o.contains(p[a].element) === true ? d = true : o.compareDocumentPosition && (o.compareDocumentPosition(p[a].element) & 16) > 0 && (d = true));
                        for (var f = 0; f < c.ignoreMsgCodes.length; f++)
                            if (RegExp(c.ignoreMsgCodes[f]).test(p[a].code) === true) {
                                d = true;
                                break
                            }
                        if (d === true) {
                            p.splice(a, 1);
                            a--
                        }
                    }
                    a = {
                        uaAcct: "359178.17",
                        self: this,
                        domainHash: function (a) {
                            for (var b = 0, c = 0, d = a.length - 1; d >= 0; d--) {
                                c = a.charCodeAt(d);
                                b = (b << 6 & 268435455) + c + (c << 14);
                                c = b & 266338304;
                                b = c != 0 ? b ^ c >> 21 : b
                            }
                            return b
                        },
                        rand: function () {
                            return Math.floor(Math.random() * 2147483648)
                        },
                        buildUtma: function () {
                            var a = [];
                            a.push(this.domainHash(document.location.hostname));
                            a.push(this.rand());
                            a.push(Math.floor((new Date).getTime() / 1E3));
                            a.push(a[2]);
                            a.push(a[2]);
                            a.push(1);
                            return a.join(".")
                        },
                        renewUtma: function (a, b) {
                            var c = this.getCookie("utmc");
                            if (b === true || !c) {
                                a = a.split(".");
                                a[5]++;
                                a[3] = a[4];
                                a[4] = Math.floor((new Date).getTime() / 1E3);
                                a = a.join(".")
                            }
                            return a
                        },
                        buildCustomVars: function (a, b, c, d) {
                            a = [a, b, c, d];
                            return a = "8(Standard*Errors*Warnings*Notices)" +
                                ("9(" + a.join("*") + ")")
                        },
                        url: function (a, b, c, d, f) {
                            var e = "http://www.google-analytics.com/__utm.gif?";
                            location.protocol === "https:" && (e = "https://ssl.google-analytics.com/__utm.gif?");
                            var k = this.getCookie("utma"),
                                k = k ? this.renewUtma(k, f) : this.buildUtma(),
                                f = new Date;
                            f.setFullYear(f.getFullYear() + 2);
                            this.setCookie("utma", k, f);
                            this.setCookie("utmc", this.domainHash(document.location.hostname));
                            a = {
                                utmwv: "0.0",
                                utmn: this.rand(),
                                utmhn: document.location.hostname,
                                utmp: document.location.pathname,
                                utmac: "UA-" + this.uaAcct.split(".").join("-"),
                                utme: this.buildCustomVars(a, b, c, d),
                                utmcc: "__utma=" + k + ";"
                            };
                            for (varName in a) e = e + (escape(varName) + "=" + escape(a[varName]) + "&");
                            return e
                        },
                        setCookie: function (a, b, c) {
                            a = "__htmlcs." + a + "=" + b + ";path=/";
                            c && (a = a + (";expires=" + escape(c.toString())));
                            document.cookie = a
                        },
                        cookieExists: function (a) {
                            return RegExp("(?:^|;\\s*)" + escape("__htmlcs." + a).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
                        },
                        getCookie: function (a) {
                            return this.cookieExists(a) === false ? null : unescape(document.cookie.replace(RegExp("(?:^|.*;\\s*)" +
                                escape("__htmlcs." + a).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"))
                        }
                    };
                    d = s.countIssues(p);
                    f = e.createElement("img");
                    f.src = a.url(b, d.error, d.warning, d.notice, n);
                    f.style.display = "none";
                    if (l.runCallback) {
                        a = l.runCallback.call(this, p);
                        a instanceof Array === true && (p = a)
                    }
                    setTimeout(function () {
                        var a = e.getElementById("HTMLCS-wrapper"),
                            b = s.buildSummaryPage();
                        b.style.left = a.style.left;
                        b.style.top = a.style.top;
                        j.replaceChild(b, a)
                    }, 400)
                }, q = function (a, b) {
                        for (var c = b.shift(); !c;) {
                            if (b.length ===
                                0) {
                                r();
                                return
                            }
                            c = b.shift()
                        }
                        HTMLCS.process(a, c, function () {
                            p = p.concat(HTMLCS.getMessages());
                            b.length === 0 ? r() : q(a, b)
                        })
                    };
                q(b, x.concat([]))
            }
        };
        this.versionCheck = function (b) {
            if (b && null !== b.currentVersion && b.newVersion > b.currentVersion) {
                var a = e.createElement("div");
                a.id = "HTMLCS-settings-updated-notification";
                e.documentElement.querySelector(".HTMLCS-settings").appendChild(a);
                var c = "HTML_CodeSniffer has been updated to version " + b.newVersion + ".",
                    c = c + (' <a href="http://squizlabs.github.com/HTML_CodeSniffer/patches/' +
                        b.newVersion + '">View the changelog</a>');
                a.innerHTML = c
            }
        };
        this.close = function () {
            if (e) {
                var b = e.getElementById("HTMLCS-wrapper");
                if (b) {
                    var a = w.getPointer(b);
                    a && a.parentNode && a.parentNode.removeChild(a);
                    b.parentNode.removeChild(b);
                    l.closeCallback && (p = l.closeCallback.call(this))
                }
            }
        };
        this.pointToElement = function (b) {
            w.container = s.pointerContainer || e.getElementById("HTMLCS-wrapper");
            w.pointTo(b)
        };
        this.getCurrentStandard = function () {
            return v
        };
        var w = {
            pointerDim: {},
            container: null,
            getBoundingRectangle: function (b) {
                if (!b) return null;
                var a = this.getElementCoords(b),
                    b = this.getElementDimensions(b);
                return {
                    x1: a.x,
                    y1: a.y,
                    x2: a.x + b.width,
                    y2: a.y + b.height
                }
            },
            getElementDimensions: function (b) {
                return {
                    width: b.offsetWidth,
                    height: b.offsetHeight
                }
            },
            getElementCoords: function (b, a) {
                for (var c = 0, d = 0, e = HTMLCS.util.getElementWindow(b), f = !0 === a ? e.top : e;;) {
                    do c += b.offsetLeft, d += b.offsetTop; while (b = b.offsetParent);
                    if (e === f) break;
                    else if (b = e.frameElement, e = e.parent, "frame" === b.nodeName.toLowerCase()) break
                }
                return {
                    x: c,
                    y: d
                }
            },
            getWindowDimensions: function (b) {
                var a =
                    HTMLCS.util.getElementWindow(b),
                    c = b.ownerDocument,
                    d = 0,
                    e = 0;
                if (a.innerWidth) d = a.innerWidth, e = a.innerHeight, b = this.getScrollbarWidth(b), c.documentElement.scrollHeight > e && "number" === typeof b && (d -= b), c.body.scrollWidth > d && "number" === typeof b && (e -= b);
                else if (c.documentElement && (c.documentElement.clientWidth || c.documentElement.clientHeight)) d = c.documentElement.clientWidth, e = c.documentElement.clientHeight;
                else if (c.body && (c.body.clientWidth || c.body.clientHeight)) d = c.body.clientWidth, e = c.body.clientHeight;
                return {
                    width: d,
                    height: e
                }
            },
            getScrollbarWidth: function (b) {
                if (this.scrollBarWidth) return this.scrollBarWidth;
                doc = b.ownerDocument;
                var a = null,
                    c = null,
                    a = b = 0,
                    a = doc.createElement("div");
                a.style.position = "absolute";
                a.style.top = "-1000px";
                a.style.left = "-1000px";
                a.style.width = "100px";
                a.style.height = "50px";
                a.style.overflow = "hidden";
                c = doc.createElement("div");
                c.style.width = "100%";
                c.style.height = "200px";
                a.appendChild(c);
                e.body.appendChild(a);
                b = c.offsetWidth;
                a.style.overflow = "auto";
                a = c.offsetWidth;
                doc.body.removeChild(doc.body.lastChild);
                return this.scrollBarWidth = b -= a
            },
            getScrollCoords: function (b) {
                var a = HTMLCS.util.getElementWindow(b);
                doc = b.ownerDocument;
                var c = b = 0;
                a.pageYOffset ? (b = a.pageXOffset, c = a.pageYOffset) : doc.body && (doc.body.scrollLeft || doc.body.scrollTop) ? (b = doc.body.scrollLeft, c = doc.body.scrollTop) : (b = doc.documentElement.scrollLeft, c = doc.documentElement.scrollTop);
                return {
                    x: b,
                    y: c
                }
            },
            isPointable: function (b) {
                if (null === b.ownerDocument) return !1;
                for (var a = b.parentNode; a && a.ownerDocument;) a = a.parentNode;
                return null === a || !0 === HTMLCS.util.isHidden(b) ||
                    null === this.getPointerDirection(b) ? !1 : !0
            },
            getPointerDirection: function (b) {
                var a = null,
                    c = this.getBoundingRectangle(b),
                    d = this.getPointer(b),
                    e = b.ownerDocument;
                d.className = d.className.replace("HTMLCS-pointer-hidden", "");
                d.className += " HTMLCS-pointer-hidden-block";
                this.pointerDim.height = 62;
                this.pointerDim.width = 62;
                var f = this.getWindowDimensions(b);
                HTMLCS.util.getElementWindow(b);
                b = Math.max(0, Math.min(c.y1 - 100, e.documentElement.offsetHeight - f.height));
                c.y1 - this.pointerDim.height - 20 > b ? a = "down" : c.y2 + this.pointerDim.height <
                    f.height - b ? a = "up" : c.x2 + this.pointerDim.width < f.width ? a = "left" : 0 < c.x1 - this.pointerDim.width && (a = "right");
                d.className = d.className.replace("HTMLCS-pointer-hidden-block", "");
                d.className += " HTMLCS-pointer-hidden";
                return a
            },
            pointTo: function (b) {
                var a = (b.ownerDocument ? b.ownerDocument : b).getElementById("HTMLCS-pointer");
                a && a.parentNode.removeChild(a);
                if (!1 !== this.isPointable(b)) {
                    a = HTMLCS.util.getElementWindow(b).top;
                    this.getWindowDimensions(a.document.documentElement);
                    var c = this.getPointerDirection(b),
                        d = this.getPointer(b);
                    d.className = d.className.replace("HTMLCS-pointer-hidden-block", "");
                    if (null === c) d.className += " HTMLCS-pointer-hidden";
                    else {
                        var e = !1;
                        "fixed" === HTMLCS.util.style(b).position && (e = !0);
                        for (var f = b.parentNode; f.ownerDocument;) {
                            if ("fixed" === HTMLCS.util.style(f).position) {
                                e = !0;
                                break
                            }
                            f = f.parentNode
                        }
                        if (!0 === e) d.style.position = "fixed";
                        else {
                            d.style.position = "absolute";
                            e = this.getElementCoords(b, !0);
                            d = HTMLCS.util.getElementWindow(b);
                            for (e = Math.max(e.y - 100, 0); 0 <= e && !(d.scrollTo(0, e), f = this.getScrollCoords(d.document.documentElement),
                                e -= f.y, e = Math.max(e, 0), d === a);) d = d.parent
                        }
                        this.showPointer(b, c)
                    }
                }
            },
            getPointer: function (b) {
                try {
                    var a = b.ownerDocument;
                    HTMLCSAuditor.includeCss("HTMLCS", a);
                    var c = a.getElementById("HTMLCS-pointer");
                    c || (c = a.createElement("div"), c.id = "HTMLCS-pointer", c.className = "HTMLCS-pointer HTMLCS-pointer-hidden", a.body.appendChild(c))
                } catch (d) {}
                return c
            },
            showPointer: function (b, a) {
                var c = this.getPointer(b);
                this._removeDirectionClasses(c);
                c.className += " HTMLCS-pointer-" + a;
                c.className = c.className.replace("HTMLCS-pointer-hidden",
                    "");
                var d = this.getBoundingRectangle(b),
                    e = 0,
                    f = 0;
                switch (a) {
                case "up":
                    e = d.y2;
                    f = 250 > d.x2 - d.x1 ? this.getRectMidPnt(d) - this.pointerDim.width / 2 : d.x1;
                    break;
                default:
                    e = d.y1 - this.pointerDim.height;
                    f = 250 > d.x2 - d.x1 ? this.getRectMidPnt(d) - this.pointerDim.width / 2 : d.x1;
                    break;
                case "left":
                    f = d.x2;
                    e = this.getRectMidPnt(d, !0) - this.pointerDim.height / 2;
                    break;
                case "right":
                    f = d.x1 - this.pointerDim.width, e = this.getRectMidPnt(d, !0) - this.pointerDim.height / 2
                }
                var g = this.getScrollCoords(b);
                c.style.top = e + "px";
                c.style.left = f + "px";
                e = this.getBoundingRectangle(this.container);
                d = this.getBoundingRectangle(c);
                f = d.x1 + (d.x2 - d.x1) / 2;
                d = d.y1 + (d.y2 - d.y1) / 2;
                "fixed" !== HTMLCS.util.style(c).position && (d -= g.y);
                if (e.x1 <= f && e.x2 >= f && e.y1 <= d && e.y2 >= d) {
                    var j = this;
                    this.container.className += " HTMLCS-translucent";
                    setTimeout(function () {
                        j.container.className = j.container.className.replace("HTMLCS-translucent", "")
                    }, 4E3)
                }
                this.bounce(c, function () {
                    setTimeout(function () {
                        c.parentNode && c.parentNode.removeChild(c)
                    }, 1500)
                }, a)
            },
            bounce: function (b, a, c) {
                var d = c,
                    e = 0,
                    f = "",
                    g = 0;
                switch (c) {
                case "up":
                    d = c + "-op",
                    g = 30;
                case "down":
                    f = "top";
                    break;
                case "left":
                    d = c + "-op", g = 30;
                case "right":
                    f = "left"
                }
                var j = e = Number(b.style[f].replace("px", "")) + g,
                    h = e - 30,
                    l = 0,
                    n = setInterval(function () {
                        d === c ? (j--, b.style[f] = j + "px", j < h && (d = c + "-op", 5 === l && 0 !== g && (clearInterval(n), a.call(this)))) : (j++, b.style[f] = j + "px", j >= e && (d = c, l++, 5 === l && 0 === g && (clearInterval(n), a.call(this))))
                    }, 10)
            },
            getRectMidPnt: function (b, a) {
                var c = 0;
                return c = !0 === a ? b.y1 + (b.y2 - b.y1) / 2 : b.x1 + (b.x2 - b.x1) / 2
            },
            _removeDirectionClasses: function (b) {
                for (var a = ["down", "up", "left",
                    "right"
                ], c = a.length, d = 0; d < c; d++) b.className = b.className.replace("HTMLCS-pointer-" + a[d], "")
            }
        }
    };
