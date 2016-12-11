webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// user require with a reference to bundle the file and use it in this file
	// var example = require('./example');

	__webpack_require__(1);
	// load manifests
	// scripts
	__webpack_require__(3);

	// styles
	__webpack_require__(27);

	// attach jQuery globally
	__webpack_require__(36);
	__webpack_require__(37);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/* =========================================================
	 * bootstrap-datepicker.js
	 * Repo: https://github.com/eternicode/bootstrap-datepicker/
	 * Demo: https://eternicode.github.io/bootstrap-datepicker/
	 * Docs: https://bootstrap-datepicker.readthedocs.org/
	 * Forked from http://www.eyecon.ro/bootstrap-datepicker
	 * =========================================================
	 * Started by Stefan Petre; improvements by Andrew Rowls + contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 * ========================================================= */
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DPGlobal = {};
	var localeOpts = ['format', 'rtl', 'weekStart'];

	var dates = {
	    en: {
	        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	        daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	        daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
	        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	        today: 'Today',
	        clear: 'Clear',
	        titleFormat: 'MM yyyy'
	    }
	};

	var defaults = {
	    assumeNearbyYear: false,
	    autoclose: false,
	    beforeShowDay: $.noop,
	    beforeShowMonth: $.noop,
	    beforeShowYear: $.noop,
	    beforeShowDecade: $.noop,
	    beforeShowCentury: $.noop,
	    calendarWeeks: false,
	    clearBtn: false,
	    toggleActive: false,
	    daysOfWeekDisabled: [],
	    daysOfWeekHighlighted: [],
	    datesDisabled: [],
	    endDate: Infinity,
	    forceParse: true,
	    format: 'mm/dd/yyyy',
	    keepEmptyValues: false,
	    keyboardNavigation: true,
	    language: 'en',
	    minViewMode: 0,
	    maxViewMode: 4,
	    multidate: false,
	    multidateSeparator: ',',
	    orientation: 'auto',
	    rtl: false,
	    startDate: -Infinity,
	    startView: 0,
	    todayBtn: false,
	    todayHighlight: false,
	    weekStart: 0,
	    disableTouchKeyboard: false,
	    enableOnReadonly: true,
	    showOnFocus: true,
	    zIndexOffset: 10,
	    container: 'body',
	    immediateUpdates: false,
	    dateCells: false,
	    title: '',
	    templates: {
	        leftArrow: '&laquo;',
	        rightArrow: '&raquo;'
	    }
	};

	function UTCDate() {
	    return new Date(Date.UTC.apply(Date, arguments));
	}

	function UTCToday() {
	    var today = new Date();
	    return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
	}

	function isUTCEquals(date1, date2) {
	    return date1.getUTCFullYear() === date2.getUTCFullYear() && date1.getUTCMonth() === date2.getUTCMonth() && date1.getUTCDate() === date2.getUTCDate();
	}

	function alias(method) {
	    return function () {
	        return this[method].apply(this, arguments);
	    };
	}

	function isValidDate(d) {
	    return d && !isNaN(d.getTime());
	}

	var DateArray = function () {
	    var extras = {
	        get: function get(i) {
	            return this.slice(i)[0];
	        },
	        contains: function contains(d) {
	            // Array.indexOf is not cross-browser;
	            // $.inArray doesn't work with Dates
	            var val = d && d.valueOf();
	            for (var i = 0, l = this.length; i < l; i++) {
	                if (this[i].valueOf() - val >= 0 && this[i].valueOf() - val < 1000 * 60 * 60 * 24) {
	                    return i;
	                }
	            }
	            // Use date arithmetic to allow dates with different times to match
	            return -1;
	        },
	        remove: function remove(i) {
	            this.splice(i, 1);
	        },
	        replace: function replace(newArray) {
	            if (!newArray) {
	                return;
	            }
	            if (!$.isArray(newArray)) {
	                newArray = [newArray];
	            }
	            this.clear();
	            this.push.apply(this, newArray);
	        },
	        clear: function clear() {
	            this.length = 0;
	        },
	        copy: function copy() {
	            var a = new DateArray();
	            a.replace(this);
	            return a;
	        }
	    };

	    return function () {
	        var a = [];
	        a.push.apply(a, arguments);
	        $.extend(a, extras);
	        return a;
	    };
	}();

	var Datepicker = function () {
	    function Datepicker(element, options) {
	        _classCallCheck(this, Datepicker);

	        $(element).data('datepicker', this);
	        this._processOptions(options);

	        this.dates = new DateArray();
	        this.viewDate = this.o.defaultViewDate;
	        this.focusDate = null;

	        this.element = $(element);
	        this.isInput = this.element.is('input');
	        this.inputField = this.isInput ? this.element : this.element.find('input');
	        this.component = this.element.hasClass('date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
	        this.hasInput = this.component && this.inputField.length;
	        if (this.component && this.component.length === 0) {
	            this.component = false;
	        }

	        this.isInline = !this.component && this.element.is('div');

	        this.picker = $(DPGlobal.template);

	        // Checking templates and inserting
	        if (this._checkTemplate(this.o.templates.leftArrow)) {
	            this.picker.find('.prev').html(this.o.templates.leftArrow);
	        }
	        if (this._checkTemplate(this.o.templates.rightArrow)) {
	            this.picker.find('.next').html(this.o.templates.rightArrow);
	        }

	        this._buildEvents();
	        this._attachEvents();

	        if (this.isInline) {
	            this.picker.addClass('datepicker-inline').appendTo(this.element);
	        } else {
	            this.picker.addClass('datepicker-dropdown dropdown-menu');
	        }

	        if (this.o.rtl) {
	            this.picker.addClass('datepicker-rtl');
	        }

	        this.viewMode = this.o.startView;

	        if (this.o.calendarWeeks) {
	            this.picker.find('thead .datepicker-title, tfoot .today, tfoot .clear').attr('colspan', function (i, val) {
	                return parseInt(val, 10) + 1;
	            });
	        }

	        this._allow_update = false;

	        this.setStartDate(this._o.startDate);
	        this.setEndDate(this._o.endDate);
	        this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);
	        this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted);
	        this.setDatesDisabled(this.o.datesDisabled);

	        this.fillDow();
	        this.fillMonths();

	        this._allow_update = true;

	        this.update();
	        this.showMode();

	        if (this.isInline) {
	            this.show();
	        }
	    }

	    _createClass(Datepicker, [{
	        key: '_resolveViewName',
	        value: function _resolveViewName(view, defaultValue) {
	            if (view === 0 || view === 'days' || view === 'month') {
	                return 0;
	            }
	            if (view === 1 || view === 'months' || view === 'year') {
	                return 1;
	            }
	            if (view === 2 || view === 'years' || view === 'decade') {
	                return 2;
	            }
	            if (view === 3 || view === 'decades' || view === 'century') {
	                return 3;
	            }
	            if (view === 4 || view === 'centuries' || view === 'millennium') {
	                return 4;
	            }
	            return defaultValue === undefined ? false : defaultValue;
	        }
	    }, {
	        key: '_checkTemplate',
	        value: function _checkTemplate(tmp) {
	            try {
	                // If empty
	                if (tmp === undefined || tmp === '') {
	                    return false;
	                }
	                // If no html, everything ok
	                if ((tmp.match(/[<>]/g) || []).length <= 0) {
	                    return true;
	                }
	                // Checking if html is fine
	                var jDom = $(tmp);
	                return jDom.length > 0;
	            } catch (ex) {
	                return false;
	            }
	        }
	    }, {
	        key: '_processOptions',
	        value: function _processOptions(opts) {
	            // Store raw options for reference
	            this._o = $.extend({}, this._o, opts);
	            // Processed options
	            var o = this.o = $.extend({}, this._o);

	            // Check if "de-DE" style date is available, if not language should
	            // fallback to 2 letter code eg "de"
	            var lang = o.language;
	            if (!dates[lang]) {
	                lang = lang.split('-')[0];
	                if (!dates[lang]) {
	                    lang = defaults.language;
	                }
	            }
	            o.language = lang;

	            // Retrieve view index from any aliases
	            o.startView = this._resolveViewName(o.startView, 0);
	            o.minViewMode = this._resolveViewName(o.minViewMode, 0);
	            o.maxViewMode = this._resolveViewName(o.maxViewMode, 4);

	            // Check that the start view is between min and max
	            o.startView = Math.min(o.startView, o.maxViewMode);
	            o.startView = Math.max(o.startView, o.minViewMode);

	            // true, false, or Number > 0
	            if (o.multidate !== true) {
	                o.multidate = Number(o.multidate) || false;
	                if (o.multidate !== false) {
	                    o.multidate = Math.max(0, o.multidate);
	                }
	            }
	            o.multidateSeparator = String(o.multidateSeparator);

	            o.weekStart %= 7;
	            o.weekEnd = (o.weekStart + 6) % 7;

	            var format = DPGlobal.parseFormat(o.format);
	            if (o.startDate !== -Infinity) {
	                if (!!o.startDate) {
	                    if (o.startDate instanceof Date) {
	                        o.startDate = this._localToUtc(this._zeroTime(o.startDate));
	                    } else {
	                        o.startDate = DPGlobal.parseDate(o.startDate, format, o.language, o.assumeNearbyYear);
	                    }
	                } else {
	                    o.startDate = -Infinity;
	                }
	            }
	            if (o.endDate !== Infinity) {
	                if (!!o.endDate) {
	                    if (o.endDate instanceof Date) {
	                        o.endDate = this._localToUtc(this._zeroTime(o.endDate));
	                    } else {
	                        o.endDate = DPGlobal.parseDate(o.endDate, format, o.language, o.assumeNearbyYear);
	                    }
	                } else {
	                    o.endDate = Infinity;
	                }
	            }

	            o.daysOfWeekDisabled = o.daysOfWeekDisabled || [];
	            if (!$.isArray(o.daysOfWeekDisabled)) {
	                o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
	            }
	            o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function (d) {
	                return parseInt(d, 10);
	            });

	            o.daysOfWeekHighlighted = o.daysOfWeekHighlighted || [];
	            if (!$.isArray(o.daysOfWeekHighlighted)) {
	                o.daysOfWeekHighlighted = o.daysOfWeekHighlighted.split(/[,\s]*/);
	            }
	            o.daysOfWeekHighlighted = $.map(o.daysOfWeekHighlighted, function (d) {
	                return parseInt(d, 10);
	            });

	            o.datesDisabled = o.datesDisabled || [];
	            if (!$.isArray(o.datesDisabled)) {
	                o.datesDisabled = [o.datesDisabled];
	            }
	            o.datesDisabled = $.map(o.datesDisabled, function (d) {
	                return DPGlobal.parseDate(d, format, o.language, o.assumeNearbyYear);
	            });

	            var plc = String(o.orientation).toLowerCase().split(/\s+/g);
	            var _plc = o.orientation.toLowerCase();
	            plc = $.grep(plc, function (word) {
	                return (/^auto|left|right|top|bottom$/.test(word)
	                );
	            });
	            o.orientation = { x: 'auto', y: 'auto' };
	            if (!_plc || _plc === 'auto') {
	                // no action
	            } else if (plc.length === 1) {
	                switch (plc[0]) {
	                    case 'top':
	                    case 'bottom':
	                        o.orientation.y = plc[0];
	                        break;
	                    case 'left':
	                    case 'right':
	                        o.orientation.x = plc[0];
	                        break;
	                }
	            } else {
	                _plc = $.grep(plc, function (word) {
	                    return (/^left|right$/.test(word)
	                    );
	                });
	                o.orientation.x = _plc[0] || 'auto';

	                _plc = $.grep(plc, function (word) {
	                    return (/^top|bottom$/.test(word)
	                    );
	                });
	                o.orientation.y = _plc[0] || 'auto';
	            }
	            if (o.defaultViewDate) {
	                var year = o.defaultViewDate.year || new Date().getFullYear();
	                var month = o.defaultViewDate.month || 0;
	                var day = o.defaultViewDate.day || 1;
	                o.defaultViewDate = UTCDate(year, month, day);
	            } else {
	                o.defaultViewDate = UTCToday();
	            }
	        }
	    }, {
	        key: '_applyEvents',
	        value: function _applyEvents(evs) {
	            for (var i = 0, el, ch, ev; i < evs.length; i++) {
	                el = evs[i][0];
	                if (evs[i].length === 2) {
	                    ch = undefined;
	                    ev = evs[i][1];
	                } else if (evs[i].length === 3) {
	                    ch = evs[i][1];
	                    ev = evs[i][2];
	                }
	                el.on(ev, ch);
	            }
	        }
	    }, {
	        key: '_unapplyEvents',
	        value: function _unapplyEvents(evs) {
	            for (var i = 0, el, ev, ch; i < evs.length; i++) {
	                el = evs[i][0];
	                if (evs[i].length === 2) {
	                    ch = undefined;
	                    ev = evs[i][1];
	                } else if (evs[i].length === 3) {
	                    ch = evs[i][1];
	                    ev = evs[i][2];
	                }
	                el.off(ev, ch);
	            }
	        }
	    }, {
	        key: '_buildEvents',
	        value: function _buildEvents() {
	            var events = {
	                keyup: $.proxy(function (e) {
	                    if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1) {
	                        this.update();
	                    }
	                }, this),
	                keydown: $.proxy(this.keydown, this),
	                paste: $.proxy(this.paste, this)
	            };

	            if (this.o.showOnFocus === true) {
	                events.focus = $.proxy(this.show, this);
	            }

	            if (this.isInput) {
	                // single input
	                this._events = [[this.element, events]];
	            } else if (this.component && this.hasInput) {
	                // component: input + button
	                this._events = [
	                // For components that are not readonly, allow keyboard nav
	                [this.inputField, events], [this.component, {
	                    click: $.proxy(this.show, this)
	                }]];
	            } else {
	                this._events = [[this.element, {
	                    click: $.proxy(this.show, this),
	                    keydown: $.proxy(this.keydown, this)
	                }]];
	            }
	            this._events.push(
	            // Component: listen for blur on element descendants
	            [this.element, '*', {
	                blur: $.proxy(function (e) {
	                    this._focused_from = e.target;
	                }, this)
	            }],
	            // Input: listen for blur on element
	            [this.element, {
	                blur: $.proxy(function (e) {
	                    this._focused_from = e.target;
	                }, this)
	            }]);

	            if (this.o.immediateUpdates) {
	                // Trigger input updates immediately on changed year/month
	                this._events.push([this.element, {
	                    'changeYear changeMonth': $.proxy(function (e) {
	                        this.update(e.date);
	                    }, this)
	                }]);
	            }

	            this._secondaryEvents = [[this.picker, {
	                click: $.proxy(this.click, this)
	            }], [$(window), {
	                resize: $.proxy(this.place, this)
	            }], [$(document), {
	                mousedown: $.proxy(function (e) {
	                    // Clicked outside the datepicker, hide it
	                    if (!(this.element.is(e.target) || this.element.find(e.target).length || this.picker.is(e.target) || this.picker.find(e.target).length || this.isInline)) {
	                        this.hide();
	                    }
	                }, this)
	            }]];
	        }
	    }, {
	        key: '_attachEvents',
	        value: function _attachEvents() {
	            this._detachEvents();
	            this._applyEvents(this._events);
	        }
	    }, {
	        key: '_detachEvents',
	        value: function _detachEvents() {
	            this._unapplyEvents(this._events);
	        }
	    }, {
	        key: '_attachSecondaryEvents',
	        value: function _attachSecondaryEvents() {
	            this._detachSecondaryEvents();
	            this._applyEvents(this._secondaryEvents);
	        }
	    }, {
	        key: '_detachSecondaryEvents',
	        value: function _detachSecondaryEvents() {
	            this._unapplyEvents(this._secondaryEvents);
	        }
	    }, {
	        key: '_trigger',
	        value: function _trigger(event, altdate) {
	            var date = altdate || this.dates.get(-1);
	            var localDate = this._utcToLocal(date);

	            this.element.trigger({
	                type: event,
	                date: localDate,
	                dates: $.map(this.dates, this._utcToLocal),
	                format: $.proxy(function (ix, format) {
	                    if (arguments.length === 0) {
	                        ix = this.dates.length - 1;
	                        format = this.o.format;
	                    } else if (typeof ix === 'string') {
	                        format = ix;
	                        ix = this.dates.length - 1;
	                    }
	                    format = format || this.o.format;
	                    return DPGlobal.formatDate(this.dates.get(ix), format, this.o.language);
	                }, this)
	            });
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            if (this.inputField.prop('disabled') || this.inputField.prop('readonly') && this.o.enableOnReadonly === false) {
	                return;
	            }
	            if (!this.isInline) {
	                this.picker.appendTo(this.o.container);
	            }
	            this.place();
	            this.picker.show();
	            this._attachSecondaryEvents();
	            this._trigger('show');
	            if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && this.o.disableTouchKeyboard) {
	                $(this.element).blur();
	            }
	            return this;
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            if (this.isInline || !this.picker.is(':visible')) {
	                return this;
	            }
	            this.focusDate = null;
	            this.picker.hide().detach();
	            this._detachSecondaryEvents();
	            this.viewMode = this.o.startView;
	            this.showMode();

	            if (this.o.forceParse && this.inputField.val()) {
	                this.setValue();
	            }
	            this._trigger('hide');
	            return this;
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.hide();
	            this._detachEvents();
	            this._detachSecondaryEvents();
	            this.picker.remove();
	            delete this.element.data().datepicker;
	            if (!this.isInput) {
	                delete this.element.data().date;
	            }
	            return this;
	        }
	    }, {
	        key: 'paste',
	        value: function paste(evt) {
	            var dateString;
	            if (evt.originalEvent.clipboardData && evt.originalEvent.clipboardData.types && $.inArray('text/plain', evt.originalEvent.clipboardData.types) !== -1) {
	                dateString = evt.originalEvent.clipboardData.getData('text/plain');
	            } else if (window.clipboardData) {
	                dateString = window.clipboardData.getData('Text');
	            } else {
	                return;
	            }
	            this.setDate(dateString);
	            this.update();
	            evt.preventDefault();
	        }
	    }, {
	        key: '_utcToLocal',
	        value: function _utcToLocal(utc) {
	            return utc && new Date(utc.getTime() + utc.getTimezoneOffset() * 60000);
	        }
	    }, {
	        key: '_localToUtc',
	        value: function _localToUtc(local) {
	            return local && new Date(local.getTime() - local.getTimezoneOffset() * 60000);
	        }
	    }, {
	        key: '_zeroTime',
	        value: function _zeroTime(local) {
	            return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
	        }
	    }, {
	        key: '_zeroUtcTime',
	        value: function _zeroUtcTime(utc) {
	            return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
	        }
	    }, {
	        key: 'getDates',
	        value: function getDates() {
	            return $.map(this.dates, this._utcToLocal);
	        }
	    }, {
	        key: 'getUTCDates',
	        value: function getUTCDates() {
	            return $.map(this.dates, function (d) {
	                return new Date(d);
	            });
	        }
	    }, {
	        key: 'getDate',
	        value: function getDate() {
	            return this._utcToLocal(this.getUTCDate());
	        }

	        /**
	         * Return the currently used internal date.
	         */

	    }, {
	        key: 'getUTCDate',
	        value: function getUTCDate() {
	            var selectedDate = this.dates.get(-1);
	            if (typeof selectedDate !== 'undefined') {
	                return new Date(selectedDate);
	            }
	            throw new Error('this.dates should be set!');
	        }
	    }, {
	        key: 'clearDates',
	        value: function clearDates() {
	            if (this.inputField) {
	                this.inputField.val('');
	            }

	            this.update();
	            this._trigger('changeDate');

	            if (this.o.autoclose) {
	                this.hide();
	            }
	        }
	    }, {
	        key: 'setDates',
	        value: function setDates() {
	            var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
	            this.update.apply(this, args);
	            this._trigger('changeDate');
	            this.setValue();
	            return this;
	        }
	    }, {
	        key: 'setUTCDates',
	        value: function setUTCDates() {
	            var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
	            this.update.apply(this, $.map(args, this._utcToLocal));
	            this._trigger('changeDate');
	            this.setValue();
	            return this;
	        }
	    }, {
	        key: 'setValue',
	        value: function setValue() {
	            var formatted = this.getFormattedDate();
	            this.inputField.val(formatted);
	            return this;
	        }
	    }, {
	        key: 'getFormattedDate',
	        value: function getFormattedDate(format) {
	            var _this = this;

	            if (format === undefined) {
	                format = this.o.format;
	            }

	            return $.map(this.dates, function (d) {
	                return DPGlobal.formatDate(d, format, _this.o.language);
	            }).join(this.o.multidateSeparator);
	        }
	    }, {
	        key: 'getStartDate',
	        value: function getStartDate() {
	            return this.o.startDate;
	        }
	    }, {
	        key: 'setStartDate',
	        value: function setStartDate(startDate) {
	            this._processOptions({ startDate: startDate });
	            this.update();
	            this.updateNavArrows();
	            return this;
	        }
	    }, {
	        key: 'getEndDate',
	        value: function getEndDate() {
	            return this.o.endDate;
	        }
	    }, {
	        key: 'setEndDate',
	        value: function setEndDate(endDate) {
	            this._processOptions({ endDate: endDate });
	            this.update();
	            this.updateNavArrows();
	            return this;
	        }
	    }, {
	        key: 'setDaysOfWeekDisabled',
	        value: function setDaysOfWeekDisabled(daysOfWeekDisabled) {
	            this._processOptions({ daysOfWeekDisabled: daysOfWeekDisabled });
	            this.update();
	            this.updateNavArrows();
	            return this;
	        }
	    }, {
	        key: 'setDaysOfWeekHighlighted',
	        value: function setDaysOfWeekHighlighted(daysOfWeekHighlighted) {
	            this._processOptions({ daysOfWeekHighlighted: daysOfWeekHighlighted });
	            this.update();
	            return this;
	        }
	    }, {
	        key: 'setDatesDisabled',
	        value: function setDatesDisabled(datesDisabled) {
	            this._processOptions({ datesDisabled: datesDisabled });
	            this.update();
	            this.updateNavArrows();
	            return this;
	        }
	    }, {
	        key: 'place',
	        value: function place() {
	            if (this.isInline) {
	                return this;
	            }
	            var calendarWidth = this.picker.outerWidth();
	            var calendarHeight = this.picker.outerHeight();
	            var visualPadding = 10;
	            var container = $(this.o.container);
	            var windowWidth = container.width();
	            var scrollTop = this.o.container === 'body' ? $(document).scrollTop() : container.scrollTop();
	            var appendOffset = container.offset();

	            var parentsZindex = [];
	            this.element.parents().each(function () {
	                var itemZIndex = $(this).css('z-index');
	                if (itemZIndex !== 'auto' && itemZIndex !== 0) {
	                    parentsZindex.push(parseInt(itemZIndex, 10));
	                }
	            });
	            var zIndex = Math.max.apply(Math, parentsZindex) + this.o.zIndexOffset;
	            var offset = this.component ? this.component.parent().offset() : this.element.offset();
	            var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
	            var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
	            var left = offset.left - appendOffset.left;
	            var top = offset.top - appendOffset.top;

	            if (this.o.container !== 'body') {
	                top += scrollTop;
	            }

	            this.picker.removeClass('datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left');

	            if (this.o.orientation.x !== 'auto') {
	                this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
	                if (this.o.orientation.x === 'right') {
	                    left -= calendarWidth - width;
	                }
	            } else {
	                // auto x orientation is best-placement: if it crosses a window
	                // edge, fudge it sideways
	                if (offset.left < 0) {
	                    // component is outside the window on the left side. Move it into visible range
	                    this.picker.addClass('datepicker-orient-left');
	                    left -= offset.left - visualPadding;
	                } else if (left + calendarWidth > windowWidth) {
	                    // the calendar passes the widow right edge. Align it to component right side
	                    this.picker.addClass('datepicker-orient-right');
	                    left += width - calendarWidth;
	                } else {
	                    // Default to left
	                    this.picker.addClass('datepicker-orient-left');
	                }
	            }

	            // auto y orientation is best-situation: top or bottom, no fudging,
	            // decision based on which shows more of the calendar
	            var yorient = this.o.orientation.y;
	            var topOverflow = void 0;
	            if (yorient === 'auto') {
	                topOverflow = -scrollTop + top - calendarHeight;
	                yorient = topOverflow < 0 ? 'bottom' : 'top';
	            }

	            this.picker.addClass('datepicker-orient-' + yorient);
	            if (yorient === 'top') {
	                top -= calendarHeight + parseInt(this.picker.css('padding-top'), 10);
	            } else {
	                top += height;
	            }

	            if (this.o.rtl) {
	                var right = windowWidth - (left + width);
	                this.picker.css({
	                    top: top,
	                    right: right,
	                    zIndex: zIndex
	                });
	            } else {
	                this.picker.css({
	                    top: top,
	                    left: left,
	                    zIndex: zIndex
	                });
	            }
	            return this;
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            if (!this._allow_update) {
	                return this;
	            }

	            var oldDates = this.dates.copy();
	            var _dates = [];
	            var fromArgs = false;

	            if (arguments.length) {
	                $.each(arguments, $.proxy(function (i, date) {
	                    if (date instanceof Date) {
	                        date = this._localToUtc(date);
	                    }
	                    _dates.push(date);
	                }, this));
	                fromArgs = true;
	            } else {
	                _dates = this.isInput ? this.element.val() : this.element.data('date') || this.inputField.val();
	                if (_dates && this.o.multidate) {
	                    _dates = _dates.split(this.o.multidateSeparator);
	                } else {
	                    _dates = [_dates];
	                }
	                delete this.element.data().date;
	            }

	            _dates = $.map(_dates, $.proxy(function (date) {
	                return DPGlobal.parseDate(date, this.o.format, this.o.language, this.o.assumeNearbyYear);
	            }, this));
	            _dates = $.grep(_dates, $.proxy(function (date) {
	                return !this.dateWithinRange(date) || !date;
	            }, this), true);
	            this.dates.replace(_dates);

	            if (this.dates.length) {
	                this.viewDate = new Date(this.dates.get(-1));
	            } else if (this.viewDate < this.o.startDate) {
	                this.viewDate = new Date(this.o.startDate);
	            } else if (this.viewDate > this.o.endDate) {
	                this.viewDate = new Date(this.o.endDate);
	            } else {
	                this.viewDate = this.o.defaultViewDate;
	            }
	            if (fromArgs) {
	                // setting date by clicking
	                this.setValue();
	            } else if (_dates.length) {
	                // setting date by typing
	                if (String(oldDates) !== String(this.dates)) {
	                    this._trigger('changeDate');
	                }
	            }
	            if (!this.dates.length && oldDates.length) {
	                this._trigger('clearDate');
	            }

	            this.fill();
	            this.element.change();
	            return this;
	        }
	    }, {
	        key: 'fillDow',
	        value: function fillDow() {
	            var dowCnt = this.o.weekStart;
	            var html = '<tr class="header dow-row">';

	            if (this.o.calendarWeeks) {
	                this.picker.find('.datepicker-days .datepicker-switch').attr('colspan', function (i, val) {
	                    return parseInt(val, 10) + 1;
	                });
	                html += '<th class="cw">&#160;</th>';
	            }
	            while (dowCnt < this.o.weekStart + 7) {
	                html += '<th class="dow';
	                if ($.inArray(dowCnt, this.o.daysOfWeekDisabled) > -1) {
	                    html += ' disabled';
	                }
	                html += '">' + dates[this.o.language].daysMin[dowCnt++ % 7] + '</th>';
	            }
	            html += '</tr>';
	            this.picker.find('.datepicker-days thead').append(html);
	        }
	    }, {
	        key: 'fillMonths',
	        value: function fillMonths() {
	            var localDate = this._utcToLocal(this.viewDate);
	            var html = '';
	            var i = 0;
	            while (i < 12) {
	                var focused = localDate && localDate.getMonth() === i ? ' focused' : '';
	                html += '<span class="month' + focused + '">' + dates[this.o.language].monthsShort[i++] + '</span>';
	            }
	            this.picker.find('.datepicker-months td').html(html);
	        }
	    }, {
	        key: 'setRange',
	        value: function setRange(range) {
	            if (!range || !range.length) {
	                delete this.range;
	            } else {
	                this.range = $.map(range, function (d) {
	                    return d.valueOf();
	                });
	            }
	            this.fill();
	        }
	    }, {
	        key: 'getClassNames',
	        value: function getClassNames(date) {
	            var cls = [];
	            var year = this.viewDate.getUTCFullYear();
	            var month = this.viewDate.getUTCMonth();
	            var today = new Date();
	            if (date.getUTCFullYear() < year || date.getUTCFullYear() === year && date.getUTCMonth() < month) {
	                cls.push('old');
	            } else if (date.getUTCFullYear() > year || date.getUTCFullYear() === year && date.getUTCMonth() > month) {
	                cls.push('new');
	            }

	            if (this.focusDate && date.valueOf() === this.focusDate.valueOf()) {
	                cls.push('focused');
	            }
	            // Compare internal UTC date with local today, not UTC today
	            if (this.o.todayHighlight && date.getUTCFullYear() === today.getFullYear() && date.getUTCMonth() === today.getMonth() && date.getUTCDate() === today.getDate()) {
	                cls.push('today');
	            }
	            if (this.dates.contains(date) !== -1) {
	                cls.push('active');
	            }
	            if (!this.dateWithinRange(date)) {
	                cls.push('disabled');
	            }
	            if (this.dateIsDisabled(date)) {
	                cls.push('disabled', 'disabled-date');
	            }
	            if ($.inArray(date.getUTCDay(), this.o.daysOfWeekHighlighted) !== -1) {
	                cls.push('highlighted');
	            }

	            if (this.range) {
	                if (date > this.range[0] && date < this.range[this.range.length - 1]) {
	                    cls.push('range');
	                }
	                if ($.inArray(date.valueOf(), this.range) !== -1) {
	                    cls.push('selected');
	                }
	                if (date.valueOf() === this.range[0]) {
	                    cls.push('range-start');
	                }
	                if (date.valueOf() === this.range[this.range.length - 1]) {
	                    cls.push('range-end');
	                }
	            }
	            return cls;
	        }
	    }, {
	        key: '_fillYearsView',
	        value: function _fillYearsView(selector, cssClass, factor, step, currentYear, startYear, endYear, callback) {
	            var html, view, year, steps, startStep, endStep, thisYear, i, classes, tooltip, before;

	            html = '';
	            view = this.picker.find(selector);
	            year = parseInt(currentYear / factor, 10) * factor;
	            startStep = parseInt(startYear / step, 10) * step;
	            endStep = parseInt(endYear / step, 10) * step;
	            steps = $.map(this.dates, function (d) {
	                return parseInt(d.getUTCFullYear() / step, 10) * step;
	            });

	            view.find('.datepicker-switch').text(year + '-' + (year + step * 9));

	            thisYear = year - step;
	            for (i = -1; i < 11; i += 1) {
	                classes = [cssClass];
	                tooltip = null;

	                if (i === -1) {
	                    classes.push('old');
	                } else if (i === 10) {
	                    classes.push('new');
	                }
	                if ($.inArray(thisYear, steps) !== -1) {
	                    classes.push('active');
	                }
	                if (thisYear < startStep || thisYear > endStep) {
	                    classes.push('disabled');
	                }
	                if (thisYear === this.viewDate.getFullYear()) {
	                    classes.push('focused');
	                }

	                if (callback !== $.noop) {
	                    before = callback(new Date(thisYear, 0, 1));
	                    if (before === undefined) {
	                        before = {};
	                    } else if (typeof before === 'boolean') {
	                        before = { enabled: before };
	                    } else if (typeof before === 'string') {
	                        before = { classes: before };
	                    }
	                    if (before.enabled === false) {
	                        classes.push('disabled');
	                    }
	                    if (before.classes) {
	                        classes = classes.concat(before.classes.split(/\s+/));
	                    }
	                    if (before.tooltip) {
	                        tooltip = before.tooltip;
	                    }
	                }

	                html += '<span class="' + classes.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + '>' + thisYear + '</span>';
	                thisYear += step;
	            }
	            view.find('td').html(html);
	        }
	    }, {
	        key: 'fill',
	        value: function fill() {
	            var _this2 = this;

	            var clsName = void 0,
	                tooltip = void 0,
	                before = void 0;
	            var d = new Date(this.viewDate);
	            var year = d.getUTCFullYear();
	            var month = d.getUTCMonth();
	            var startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity;
	            var startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity;
	            var endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity;
	            var endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity;
	            var todaytxt = dates[this.o.language].today || dates['en'].today || '';
	            var cleartxt = dates[this.o.language].clear || dates['en'].clear || '';
	            var titleFormat = dates[this.o.language].titleFormat || dates['en'].titleFormat;

	            if (isNaN(year) || isNaN(month)) {
	                return;
	            }
	            this.picker.find('.datepicker-days .datepicker-switch').text(DPGlobal.formatDate(d, titleFormat, this.o.language));
	            this.picker.find('tfoot .today').text(todaytxt).toggle(this.o.todayBtn !== false);
	            this.picker.find('tfoot .clear').text(cleartxt).toggle(this.o.clearBtn !== false);
	            this.picker.find('thead .datepicker-title').text(this.o.title).toggle(this.o.title !== '');

	            this.updateNavArrows();
	            this.fillMonths();
	            var prevMonth = UTCDate(year, month - 1, 28);
	            var day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
	            prevMonth.setUTCDate(day);
	            prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7) % 7);
	            var nextMonth = new Date(prevMonth);
	            if (prevMonth.getUTCFullYear() < 100) {
	                nextMonth.setUTCFullYear(prevMonth.getUTCFullYear());
	            }
	            nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
	            nextMonth = nextMonth.valueOf();
	            var html = [];

	            while (prevMonth.valueOf() < nextMonth) {
	                if (prevMonth.getUTCDay() === this.o.weekStart) {
	                    html.push('<tr>');
	                    if (this.o.calendarWeeks) {
	                        // ISO 8601: First week contains first thursday.
	                        // ISO also states week starts on Monday, but we can be more abstract here.
	                        // Start of current week: based on weekstart/current date
	                        var ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5);
	                        // Thursday of this week
	                        var th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5);
	                        // First Thursday of year, year from thursday
	                        var yth = void 0;
	                        yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay()) % 7 * 864e5);
	                        // Calendar week: ms between thursdays, div ms per day, div 7 days
	                        var calWeek = (th - yth) / 864e5 / 7 + 1;
	                        html.push('<td class="cw">' + calWeek + '</td>');
	                    }
	                }
	                clsName = this.getClassNames(prevMonth);
	                clsName.push('day');

	                if (this.o.beforeShowDay !== $.noop) {
	                    before = this.o.beforeShowDay(this._utcToLocal(prevMonth));
	                    if (before === undefined) {
	                        before = {};
	                    } else if (typeof before === 'boolean') {
	                        before = { enabled: before };
	                    } else if (typeof before === 'string') {
	                        before = { classes: before };
	                    }
	                    if (before.enabled === false) {
	                        clsName.push('disabled');
	                    }
	                    if (before.classes) {
	                        clsName = clsName.concat(before.classes.split(/\s+/));
	                    }
	                    if (before.tooltip) {
	                        tooltip = before.tooltip;
	                    }
	                }

	                clsName = $.unique(clsName);

	                html.push('<td class="' + clsName.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + (this.o.dateCells ? ' data-date="' + prevMonth.getTime().toString() + '"' : '') + '>' + prevMonth.getUTCDate() + '</td>');
	                tooltip = null;
	                if (prevMonth.getUTCDay() === this.o.weekEnd) {
	                    html.push('</tr>');
	                }
	                prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
	            }

	            this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
	            var monthsTitle = dates[this.o.language].monthsTitle || dates['en'].monthsTitle || 'Months';
	            var months = this.picker.find('.datepicker-months').find('.datepicker-switch').text(this.o.maxViewMode < 2 ? monthsTitle : year).end().find('tbody span').removeClass('active');

	            $.each(this.dates, function (i, _d) {
	                if (_d.getUTCFullYear() === year) {
	                    months.eq(_d.getUTCMonth()).addClass('active');
	                }
	            });

	            if (year < startYear || year > endYear) {
	                months.addClass('disabled');
	            }
	            if (year === startYear) {
	                months.slice(0, startMonth).addClass('disabled');
	            }
	            if (year === endYear) {
	                months.slice(endMonth + 1).addClass('disabled');
	            }

	            if (this.o.beforeShowMonth !== $.noop) {
	                $.each(months, function (i, _month) {
	                    var moDate = new Date(year, i, 1);
	                    var _before = _this2.o.beforeShowMonth(moDate);
	                    if (_before === undefined) {
	                        _before = {};
	                    } else if (typeof _before === 'boolean') {
	                        _before = { enabled: _before };
	                    } else if (typeof _before === 'string') {
	                        _before = { classes: _before };
	                    }
	                    if (_before.enabled === false && !$(_month).hasClass('disabled')) {
	                        $(_month).addClass('disabled');
	                    }
	                    if (_before.classes) {
	                        $(_month).addClass(_before.classes);
	                    }
	                    if (_before.tooltip) {
	                        $(_month).prop('title', _before.tooltip);
	                    }
	                });
	            }

	            // Generating decade/years picker
	            this._fillYearsView('.datepicker-years', 'year', 10, 1, year, startYear, endYear, this.o.beforeShowYear);
	            // Generating century/decades picker
	            this._fillYearsView('.datepicker-decades', 'decade', 100, 10, year, startYear, endYear, this.o.beforeShowDecade);
	            // Generating millennium/centuries picker
	            this._fillYearsView('.datepicker-centuries', 'century', 1000, 100, year, startYear, endYear, this.o.beforeShowCentury);
	        }
	    }, {
	        key: 'updateNavArrows',
	        value: function updateNavArrows() {
	            if (!this._allow_update) {
	                return;
	            }

	            var d = new Date(this.viewDate);
	            var year = d.getUTCFullYear();
	            var month = d.getUTCMonth();
	            switch (this.viewMode) {
	                case 0:
	                    if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()) {
	                        this.picker.find('.prev').addClass('disabled');
	                    } else {
	                        this.picker.find('.prev').removeClass('disabled');
	                    }
	                    if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()) {
	                        this.picker.find('.next').addClass('disabled');
	                    } else {
	                        this.picker.find('.next').removeClass('disabled');
	                    }
	                    break;
	                case 1:
	                case 2:
	                case 3:
	                case 4:
	                    if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() || this.o.maxViewMode < 2) {
	                        this.picker.find('.prev').addClass('disabled');
	                    } else {
	                        this.picker.find('.prev').removeClass('disabled');
	                    }
	                    if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() || this.o.maxViewMode < 2) {
	                        this.picker.find('.next').addClass('disabled');
	                    } else {
	                        this.picker.find('.next').removeClass('disabled');
	                    }
	                    break;
	            }
	        }
	    }, {
	        key: 'getDateOfWeek',
	        value: function getDateOfWeek(weekNumber, year) {
	            //Create a date object starting january first of chosen year, plus the number of days in a week multiplied by the week number to get the right date.
	            return new Date(year, 0, 1 + (weekNumber - 1) * 7);
	        }

	        /**
	         * Source: http://stackoverflow.com/questions/7580824/how-to-convert-a-week-number-to-a-date-in-javascript
	         */

	    }, {
	        key: 'firstDayOfWeek',
	        value: function firstDayOfWeek(week, year) {
	            // Jan 1 of 'year'
	            var d = new Date(year, 0, 1);
	            var offset = d.getTimezoneOffset();

	            // ISO: week 1 is the one with the year's first Thursday
	            // so nearest Thursday: current date + 4 - current day number
	            // Sunday is converted from 0 to 7
	            d.setDate(d.getDate() + 4 - (d.getDay() || 7));
	            // 7 days * (week - overlapping first week)
	            d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000 * (week + (year === d.getFullYear() ? -1 : 0)));
	            // daylight savings fix
	            d.setTime(d.getTime() + (d.getTimezoneOffset() - offset) * 60 * 1000);
	            // back to Monday (from Thursday)
	            d.setDate(d.getDate() - 3);
	            return d;
	        }

	        /**
	         * General Datepicker click handler.
	         */

	    }, {
	        key: 'click',
	        value: function click(e) {
	            var dir = void 0,
	                day = void 0,
	                year = void 0,
	                month = void 0,
	                monthChanged = void 0,
	                yearChanged = void 0;
	            e.preventDefault();
	            var target = $(e.target);

	            // In week-mode, we skip the rest of the click handler when clicking on
	            // a day or week number.
	            if ($(e.currentTarget).hasClass('week-select')) {
	                // A week number was clicked directly.
	                if (target.hasClass('cw') || target.hasClass('day')) {
	                    var weekNumber = void 0,
	                        weekSelector = void 0;
	                    target.hasClass('cw') ? weekSelector = target : weekSelector = target.siblings().first();
	                    weekNumber = parseInt(weekSelector.text(), 10);
	                    this.viewDate = this.firstDayOfWeek(weekNumber, new Date().getFullYear());
	                    // Sometimes this.dates is not set yet. Force it here.
	                    if (!this.dates.length) {
	                        this.dates.push(this.viewDate);
	                    }
	                    return;
	                }
	            }

	            // From here, no more events are picked up by datepicker.
	            e.stopPropagation();

	            // Clicked on the switch
	            if (target.hasClass('datepicker-switch')) {
	                this.showMode(1);
	            }

	            // Clicked on prev or next
	            var navArrow = target.closest('.prev, .next');
	            if (navArrow.length > 0) {
	                dir = DPGlobal.modes[this.viewMode].navStep * (navArrow.hasClass('prev') ? -1 : 1);
	                if (this.viewMode === 0) {
	                    this.viewDate = this.moveMonth(this.viewDate, dir);
	                    this._trigger('changeMonth', this.viewDate);
	                } else {
	                    this.viewDate = this.moveYear(this.viewDate, dir);
	                    if (this.viewMode === 1) {
	                        this._trigger('changeYear', this.viewDate);
	                    }
	                }
	                this.fill();
	            }

	            // Clicked on today button
	            if (target.hasClass('today') && !target.hasClass('day')) {
	                this.showMode(-2);
	                this._setDate(UTCToday(), this.o.todayBtn === 'linked' ? null : 'view');
	            }

	            // Clicked on tomorrow button.
	            if (target.hasClass('tomorrow')) {
	                this.showMode(-2);
	                var today = new Date();
	                this._setDate(UTCDate(today.getFullYear(), today.getMonth(), today.getDate() + 1), 'date');
	            }

	            // Clicked on next month button.
	            if (target.hasClass('first-day-next-month')) {
	                this.showMode(-2);
	                var _today = new Date();
	                this._setDate(UTCDate(_today.getFullYear(), _today.getMonth() + 1, 1), 'date');
	            }

	            // Clicked on clear button
	            if (target.hasClass('clear')) {
	                this.clearDates();
	            }

	            if (!target.hasClass('disabled')) {
	                // Clicked on a day
	                if (target.hasClass('day')) {
	                    day = parseInt(target.text(), 10) || 1;
	                    year = this.viewDate.getUTCFullYear();
	                    month = this.viewDate.getUTCMonth();

	                    // From last month
	                    if (target.hasClass('old')) {
	                        if (month === 0) {
	                            month = 11;
	                            year = year - 1;
	                            monthChanged = true;
	                            yearChanged = true;
	                        } else {
	                            month = month - 1;
	                            monthChanged = true;
	                        }
	                    }

	                    // From next month
	                    if (target.hasClass('new')) {
	                        if (month === 11) {
	                            month = 0;
	                            year = year + 1;
	                            monthChanged = true;
	                            yearChanged = true;
	                        } else {
	                            month = month + 1;
	                            monthChanged = true;
	                        }
	                    }
	                    this._setDate(UTCDate(year, month, day));
	                    if (yearChanged) {
	                        this._trigger('changeYear', this.viewDate);
	                    }
	                    if (monthChanged) {
	                        this._trigger('changeMonth', this.viewDate);
	                    }
	                }

	                // Clicked on a month
	                if (target.hasClass('month')) {
	                    this.viewDate.setUTCDate(1);
	                    day = 1;
	                    month = target.parent().find('span').index(target);
	                    year = this.viewDate.getUTCFullYear();
	                    this.viewDate.setUTCMonth(month);
	                    this._trigger('changeMonth', this.viewDate);
	                    if (this.o.minViewMode === 1) {
	                        this._setDate(UTCDate(year, month, day));
	                        this.showMode();
	                    } else {
	                        this.showMode(-1);
	                    }
	                    this.fill();
	                }

	                // Clicked on a year
	                if (target.hasClass('year') || target.hasClass('decade') || target.hasClass('century')) {
	                    this.viewDate.setUTCDate(1);

	                    day = 1;
	                    month = 0;
	                    year = parseInt(target.text(), 10) || 0;
	                    this.viewDate.setUTCFullYear(year);

	                    if (target.hasClass('year')) {
	                        this._trigger('changeYear', this.viewDate);
	                        if (this.o.minViewMode === 2) {
	                            this._setDate(UTCDate(year, month, day));
	                        }
	                    }
	                    if (target.hasClass('decade')) {
	                        this._trigger('changeDecade', this.viewDate);
	                        if (this.o.minViewMode === 3) {
	                            this._setDate(UTCDate(year, month, day));
	                        }
	                    }
	                    if (target.hasClass('century')) {
	                        this._trigger('changeCentury', this.viewDate);
	                        if (this.o.minViewMode === 4) {
	                            this._setDate(UTCDate(year, month, day));
	                        }
	                    }

	                    this.showMode(-1);
	                    this.fill();
	                }
	            }

	            if (this.picker.is(':visible') && this._focused_from) {
	                $(this._focused_from).focus();
	            }
	            delete this._focused_from;
	        }
	    }, {
	        key: '_toggleMultidate',
	        value: function _toggleMultidate(date) {
	            var ix = this.dates.contains(date);
	            if (!date) {
	                this.dates.clear();
	            }

	            if (ix !== -1) {
	                if (this.o.multidate === true || this.o.multidate > 1 || this.o.toggleActive) {
	                    this.dates.remove(ix);
	                }
	            } else if (this.o.multidate === false) {
	                this.dates.clear();
	                this.dates.push(date);
	            } else {
	                this.dates.push(date);
	            }

	            if (typeof this.o.multidate === 'number') {
	                while (this.dates.length > this.o.multidate) {
	                    this.dates.remove(0);
	                }
	            }
	        }
	    }, {
	        key: '_setDate',
	        value: function _setDate(date, which) {
	            if (!which || which === 'date') {
	                this._toggleMultidate(date && new Date(date));
	            }
	            if (!which || which === 'view') {
	                this.viewDate = date && new Date(date);
	            }

	            this.fill();
	            this.setValue();
	            if (!which || which !== 'view') {
	                this._trigger('changeDate');
	            }
	            if (this.inputField) {
	                this.inputField.change();
	            }
	            if (this.o.autoclose && (!which || which === 'date')) {
	                this.hide();
	            }
	        }
	    }, {
	        key: 'moveDay',
	        value: function moveDay(date, dir) {
	            var newDate = new Date(date);
	            newDate.setUTCDate(date.getUTCDate() + dir);

	            return newDate;
	        }
	    }, {
	        key: 'moveWeek',
	        value: function moveWeek(date, dir) {
	            return this.moveDay(date, dir * 7);
	        }
	    }, {
	        key: 'moveMonth',
	        value: function moveMonth(date, dir) {
	            if (!isValidDate(date)) {
	                return this.o.defaultViewDate;
	            }
	            if (!dir) {
	                return date;
	            }
	            var newDate = new Date(date.valueOf());
	            var day = newDate.getUTCDate();
	            var month = newDate.getUTCMonth();
	            var mag = Math.abs(dir);
	            var newMonth = void 0,
	                test = void 0;

	            dir = dir > 0 ? 1 : -1;
	            if (mag === 1) {
	                test = dir === -1
	                // If going back one month, make sure month is not current month
	                // (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
	                ? function () {
	                    return newDate.getUTCMonth() === month;
	                }
	                // If going forward one month, make sure month is as expected
	                // (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
	                : function () {
	                    return newDate.getUTCMonth() !== newMonth;
	                };
	                newMonth = month + dir;
	                newDate.setUTCMonth(newMonth);
	                // Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
	                if (newMonth < 0 || newMonth > 11) {
	                    newMonth = (newMonth + 12) % 12;
	                }
	            } else {
	                // For magnitudes >1, move one month at a time...
	                for (var i = 0; i < mag; i++) {
	                    // ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
	                    newDate = this.moveMonth(newDate, dir);
	                }
	                // ...then reset the day, keeping it in the new month
	                newMonth = newDate.getUTCMonth();
	                newDate.setUTCDate(day);
	                test = function test() {
	                    return newMonth !== newDate.getUTCMonth();
	                };
	            }
	            // Common date-resetting loop -- if date is beyond end of month, make it
	            // end of month
	            while (test()) {
	                newDate.setUTCDate(--day);
	                newDate.setUTCMonth(newMonth);
	            }
	            return newDate;
	        }
	    }, {
	        key: 'moveYear',
	        value: function moveYear(date, dir) {
	            return this.moveMonth(date, dir * 12);
	        }
	    }, {
	        key: 'moveAvailableDate',
	        value: function moveAvailableDate(date, dir, fn) {
	            do {
	                date = this[fn](date, dir);
	                if (!this.dateWithinRange(date)) {
	                    return false;
	                }

	                fn = 'moveDay';
	            } while (this.dateIsDisabled(date));

	            return date;
	        }
	    }, {
	        key: 'weekOfDateIsDisabled',
	        value: function weekOfDateIsDisabled(date) {
	            return $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1;
	        }
	    }, {
	        key: 'dateIsDisabled',
	        value: function dateIsDisabled(date) {
	            return this.weekOfDateIsDisabled(date) || $.grep(this.o.datesDisabled, function (d) {
	                return isUTCEquals(date, d);
	            }).length > 0;
	        }
	    }, {
	        key: 'dateWithinRange',
	        value: function dateWithinRange(date) {
	            return date >= this.o.startDate && date <= this.o.endDate;
	        }
	    }, {
	        key: 'keydown',
	        value: function keydown(e) {
	            if (!this.picker.is(':visible')) {
	                if (e.keyCode === 40 || e.keyCode === 27) {
	                    // allow down to re-show picker
	                    this.show();
	                    e.stopPropagation();
	                }
	                return;
	            }
	            var dateChanged = false;
	            var dir = void 0,
	                newViewDate = void 0;
	            var focusDate = this.focusDate || this.viewDate;
	            switch (e.keyCode) {
	                case 27:
	                    // escape
	                    if (this.focusDate) {
	                        this.focusDate = null;
	                        this.viewDate = this.dates.get(-1) || this.viewDate;
	                        this.fill();
	                    } else this.hide();
	                    e.preventDefault();
	                    e.stopPropagation();
	                    break;
	                case 37: // left
	                case 38: // up
	                case 39: // right
	                case 40:
	                    // down
	                    if (!this.o.keyboardNavigation || this.o.daysOfWeekDisabled.length === 7) {
	                        break;
	                    }
	                    dir = e.keyCode === 37 || e.keyCode === 38 ? -1 : 1;
	                    if (this.viewMode === 0) {
	                        if (e.ctrlKey) {
	                            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');
	                            if (newViewDate) {
	                                this._trigger('changeYear', this.viewDate);
	                            }
	                        } else if (e.shiftKey) {
	                            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');
	                            if (newViewDate) {
	                                this._trigger('changeMonth', this.viewDate);
	                            }
	                        } else if (e.keyCode === 37 || e.keyCode === 39) {
	                            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveDay');
	                        } else if (!this.weekOfDateIsDisabled(focusDate)) {
	                            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveWeek');
	                        }
	                    } else if (this.viewMode === 1) {
	                        if (e.keyCode === 38 || e.keyCode === 40) {
	                            dir = dir * 4;
	                        }
	                        newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');
	                    } else if (this.viewMode === 2) {
	                        if (e.keyCode === 38 || e.keyCode === 40) {
	                            dir = dir * 4;
	                        }
	                        newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');
	                    }

	                    if (newViewDate) {
	                        this.focusDate = this.viewDate = newViewDate;
	                        this.setValue();
	                        this.fill();
	                        e.preventDefault();
	                    }
	                    break;
	                case 13:
	                    // enter
	                    if (!this.o.forceParse) {
	                        break;
	                    }
	                    focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
	                    if (this.o.keyboardNavigation) {
	                        this._toggleMultidate(focusDate);
	                        dateChanged = true;
	                    }
	                    this.focusDate = null;
	                    this.viewDate = this.dates.get(-1) || this.viewDate;
	                    this.setValue();
	                    this.fill();
	                    if (this.picker.is(':visible')) {
	                        e.preventDefault();
	                        e.stopPropagation();
	                        if (this.o.autoclose) {
	                            this.hide();
	                        }
	                    }
	                    break;
	                case 9:
	                    // tab
	                    this.focusDate = null;
	                    this.viewDate = this.dates.get(-1) || this.viewDate;
	                    this.fill();
	                    this.hide();
	                    break;
	            }
	            if (dateChanged) {
	                if (this.dates.length) {
	                    this._trigger('changeDate');
	                } else {
	                    this._trigger('clearDate');
	                }
	                if (this.inputField) {
	                    this.inputField.change();
	                }
	            }
	        }
	    }, {
	        key: 'showMode',
	        value: function showMode(dir) {
	            if (dir) {
	                this.viewMode = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, this.viewMode + dir));
	            }
	            this.picker.children('div').hide().filter('.datepicker-' + DPGlobal.modes[this.viewMode].clsName).show();
	            this.updateNavArrows();
	        }
	    }]);

	    return Datepicker;
	}();

	Datepicker._events = [];
	Datepicker._secondaryEvents = [];
	Datepicker._allow_update = true;
	Datepicker.setDate = alias('setDates');
	Datepicker.setUTCDate = alias('setUTCDates');
	Datepicker.remove = alias('destroy');

	var DateRangePicker = function () {
	    function DateRangePicker(element, options) {
	        _classCallCheck(this, DateRangePicker);

	        $(element).data('datepicker', this);
	        this.element = $(element);
	        this.inputs = $.map(options.inputs, function (i) {
	            return i.jquery ? i[0] : i;
	        });
	        delete options.inputs;

	        this.keepEmptyValues = options.keepEmptyValues;
	        delete options.keepEmptyValues;

	        datepickerPlugin.call($(this.inputs), options).on('changeDate', $.proxy(this.dateUpdated, this));
	        this.pickers = $.map(this.inputs, function (i) {
	            return $(i).data('datepicker');
	        });
	        this.updateDates();
	    }

	    _createClass(DateRangePicker, [{
	        key: 'updateDates',
	        value: function updateDates() {
	            this.dates = $.map(this.pickers, function (i) {
	                return i.getUTCDate();
	            });
	            this.updateRanges();
	        }
	    }, {
	        key: 'updateRanges',
	        value: function updateRanges() {
	            var range = $.map(this.dates, function (d) {
	                return d.valueOf();
	            });
	            $.each(this.pickers, function (i, p) {
	                p.setRange(range);
	            });
	        }
	    }, {
	        key: 'dateUpdated',
	        value: function dateUpdated(e) {
	            // `this.updating` is a workaround for preventing infinite recursion
	            // between `changeDate` triggering and `setUTCDate` calling.  Until
	            // there is a better mechanism.
	            if (this.updating) {
	                return;
	            }
	            this.updating = true;

	            var dp = $(e.target).data('datepicker');

	            if (typeof dp === 'undefined') {
	                return;
	            }

	            var newDate = dp.getUTCDate();
	            var keepEmptyValues = this.keepEmptyValues;
	            var i = $.inArray(e.target, this.inputs);
	            var j = i - 1;
	            var k = i + 1;
	            var l = this.inputs.length;
	            if (i === -1) {
	                return;
	            }

	            $.each(this.pickers, function (_i, p) {
	                if (!p.getUTCDate() && (p === dp || !keepEmptyValues)) {
	                    p.setUTCDate(newDate);
	                }
	            });

	            if (newDate < this.dates[j]) {
	                // Date being moved earlier/left
	                while (j >= 0 && newDate < this.dates[j]) {
	                    this.pickers[j--].setUTCDate(newDate);
	                }
	            } else if (newDate > this.dates[k]) {
	                // Date being moved later/right
	                while (k < l && newDate > this.dates[k]) {
	                    this.pickers[k++].setUTCDate(newDate);
	                }
	            }
	            this.updateDates();

	            delete this.updating;
	        }
	    }, {
	        key: 'remove',
	        value: function remove() {
	            $.map(this.pickers, function (p) {
	                p.remove();
	            });
	            delete this.element.data().datepicker;
	        }
	    }]);

	    return DateRangePicker;
	}();

	function optsFromEl(el, prefix) {
	    // Derive options from element data-attrs
	    var inkey = void 0;
	    var data = $(el).data();
	    var out = {};
	    var replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
	    prefix = new RegExp('^' + prefix.toLowerCase());
	    function reLower(_, a) {
	        return a.toLowerCase();
	    }
	    for (var key in data) {
	        if (prefix.test(key)) {
	            inkey = key.replace(replace, reLower);
	            out[inkey] = data[key];
	        }
	    }
	    return out;
	}

	function optsFromLocale(lang) {
	    // Derive options from locale plugins
	    var out = {};
	    // Check if "de-DE" style date is available, if not language should
	    // fallback to 2 letter code eg "de"
	    if (!dates[lang]) {
	        lang = lang.split('-')[0];
	        if (!dates[lang]) {
	            return;
	        }
	    }
	    var d = dates[lang];
	    $.each(localeOpts, function (i, k) {
	        if (k in d) {
	            out[k] = d[k];
	        }
	    });
	    return out;
	}

	var datepickerPlugin = function datepickerPlugin(option) {
	    var args = Array.apply(null, arguments);
	    args.shift();
	    var internalReturn = void 0;
	    this.each(function () {
	        var $this = $(this);
	        var data = $this.data('datepicker');
	        var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' && option;
	        if (!data) {
	            var elopts = optsFromEl(this, 'date');
	            // Preliminary otions
	            var xopts = $.extend({}, defaults, elopts, options);
	            var locopts = optsFromLocale(xopts.language);
	            // Options priority: js args, data-attrs, locales, default.
	            var opts = $.extend({}, defaults, locopts, elopts, options);
	            if ($this.hasClass('input-daterange') || opts.inputs) {
	                $.extend(opts, {
	                    inputs: opts.inputs || $this.find('input').toArray()
	                });
	                data = new DateRangePicker(this, opts);
	            } else {
	                data = new Datepicker(this, opts);
	            }
	            $this.data('datepicker', data);
	        }
	        if (typeof option === 'string' && typeof data[option] === 'function') {
	            internalReturn = data[option].apply(data, args);
	        }
	    });

	    if (internalReturn === undefined || internalReturn instanceof Datepicker || internalReturn instanceof DateRangePicker) {
	        return this;
	    }

	    if (this.length > 1) {
	        throw new Error('Using only allowed for the collection of a single element (' + option + ' function)');
	    } else {
	        return internalReturn;
	    }
	};

	$.fn.datepicker = datepickerPlugin;
	$.fn.datepicker.defaults = defaults;
	$.fn.datepicker.localeOpts = localeOpts;
	$.fn.datepicker.dates = dates;

	DPGlobal = {
	    modes: [{
	        clsName: 'days',
	        navFnc: 'Month',
	        navStep: 1
	    }, {
	        clsName: 'months',
	        navFnc: 'FullYear',
	        navStep: 1
	    }, {
	        clsName: 'years',
	        navFnc: 'FullYear',
	        navStep: 10
	    }, {
	        clsName: 'decades',
	        navFnc: 'FullDecade',
	        navStep: 100
	    }, {
	        clsName: 'centuries',
	        navFnc: 'FullCentury',
	        navStep: 1000
	    }],
	    isLeapYear: function isLeapYear(year) {
	        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	    },

	    getDaysInMonth: function getDaysInMonth(year, month) {
	        return [31, DPGlobal.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	    },

	    validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,

	    nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,

	    parseFormat: function parseFormat(format) {
	        if (typeof format.toValue === 'function' && typeof format.toDisplay === 'function') {
	            return format;
	        }
	        // IE treats \0 as a string end in inputs (truncating the value),
	        // so it's a bad format delimiter, anyway
	        var separators = format.replace(this.validParts, '\0').split('\0');
	        var parts = format.match(this.validParts);
	        if (!separators || !separators.length || !parts || parts.length === 0) {
	            throw new Error('Invalid date format.');
	        }
	        return { separators: separators, parts: parts };
	    },

	    parseDate: function parseDate(date, format, language, assumeNearby) {
	        var val = void 0,
	            filtered = void 0,
	            part = void 0,
	            dir = void 0,
	            i = void 0,
	            fn = void 0;
	        if (!date) {
	            return undefined;
	        }
	        if (date instanceof Date) {
	            return date;
	        }
	        if (typeof format === 'string') {
	            format = DPGlobal.parseFormat(format);
	        }
	        if (format.toValue) {
	            return format.toValue(date, format, language);
	        }
	        var partRe = /([\-+]\d+)([dmwy])/;
	        var parts = date.match(/([\-+]\d+)([dmwy])/g);
	        var fnMap = {
	            d: 'moveDay',
	            m: 'moveMonth',
	            w: 'moveWeek',
	            y: 'moveYear'
	        };
	        var dateAliases = {
	            yesterday: '-1d',
	            today: '+0d',
	            tomorrow: '+1d'
	        };

	        if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
	            date = new Date();

	            for (i = 0; i < parts.length; i++) {
	                part = partRe.exec(parts[i]);
	                dir = parseInt(part[1], 10);
	                fn = fnMap[part[2]];
	                date = Datepicker.prototype[fn](date, dir);
	            }
	            return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
	        }

	        if (typeof dateAliases[date] !== 'undefined') {
	            date = dateAliases[date];
	            parts = date.match(/([\-+]\d+)([dmwy])/g);

	            if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
	                date = new Date();
	                for (i = 0; i < parts.length; i++) {
	                    part = partRe.exec(parts[i]);
	                    dir = parseInt(part[1], 10);
	                    fn = fnMap[part[2]];
	                    date = Datepicker.prototype[fn](date, dir);
	                }

	                return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
	            }
	        }

	        parts = date && date.match(this.nonpunctuation) || [];
	        date = new Date();

	        function applyNearbyYear(year, threshold) {
	            if (threshold === true) {
	                threshold = 10;
	            }

	            // if year is 2 digits or less, than the user most likely is trying to get a recent century
	            if (year < 100) {
	                year += 2000;
	                // if the new year is more than threshold years in advance, use last century
	                if (year > new Date().getFullYear() + threshold) {
	                    year -= 100;
	                }
	            }

	            return year;
	        }

	        var parsed = {};
	        var settersOrder = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'];
	        var settersMap = {
	            yyyy: function yyyy(d, v) {
	                return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
	            },
	            yy: function yy(d, v) {
	                return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
	            },
	            m: function m(d, v) {
	                if (isNaN(d)) {
	                    return d;
	                }
	                v -= 1;
	                while (v < 0) {
	                    v += 12;
	                }v %= 12;
	                d.setUTCMonth(v);
	                while (d.getUTCMonth() !== v) {
	                    d.setUTCDate(d.getUTCDate() - 1);
	                }
	                return d;
	            },
	            d: function d(_d2, v) {
	                return _d2.setUTCDate(v);
	            }
	        };

	        settersMap['M'] = settersMap['MM'] = settersMap['mm'] = settersMap['m'];
	        settersMap['dd'] = settersMap['d'];
	        date = UTCToday();
	        var fparts = format.parts.slice();
	        // Remove noop parts
	        if (parts.length !== fparts.length) {
	            fparts = $(fparts).filter(function (i, p) {
	                return $.inArray(p, settersOrder) !== -1;
	            }).toArray();
	        }
	        // Process remainder
	        function matchPart() {
	            var m = this.slice(0, parts[i].length),
	                p = parts[i].slice(0, m.length);
	            return m.toLowerCase() === p.toLowerCase();
	        }
	        if (parts.length === fparts.length) {
	            var cnt = void 0,
	                _date = void 0,
	                s = void 0;
	            for (i = 0, cnt = fparts.length; i < cnt; i++) {
	                val = parseInt(parts[i], 10);
	                part = fparts[i];
	                if (isNaN(val)) {
	                    switch (part) {
	                        case 'MM':
	                            filtered = $(dates[language].months).filter(matchPart);
	                            val = $.inArray(filtered[0], dates[language].months) + 1;
	                            break;
	                        case 'M':
	                            filtered = $(dates[language].monthsShort).filter(matchPart);
	                            val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
	                            break;
	                    }
	                }
	                parsed[part] = val;
	            }
	            for (i = 0; i < settersOrder.length; i++) {
	                s = settersOrder[i];
	                if (s in parsed && !isNaN(parsed[s])) {
	                    _date = new Date(date);
	                    settersMap[s](_date, parsed[s]);
	                    if (!isNaN(_date)) {
	                        date = _date;
	                    }
	                }
	            }
	        }
	        return date;
	    },

	    formatDate: function formatDate(date, format, language) {
	        if (!date) {
	            return '';
	        }
	        if (typeof format === 'string') {
	            format = DPGlobal.parseFormat(format);
	        }
	        if (format.toDisplay) {
	            return format.toDisplay(date, format, language);
	        }

	        var val = {
	            d: date.getUTCDate(),
	            D: dates[language].daysShort[date.getUTCDay()],
	            DD: dates[language].days[date.getUTCDay()],
	            m: date.getUTCMonth() + 1,
	            M: dates[language].monthsShort[date.getUTCMonth()],
	            MM: dates[language].months[date.getUTCMonth()],
	            yy: date.getUTCFullYear().toString().substring(2),
	            yyyy: date.getUTCFullYear()
	        };
	        val.dd = (val.d < 10 ? '0' : '') + val.d;
	        val.mm = (val.m < 10 ? '0' : '') + val.m;
	        date = [];
	        var seps = $.extend([], format.separators);

	        for (var i = 0, cnt = format.parts.length; i <= cnt; i++) {
	            if (seps.length) {
	                date.push(seps.shift());
	            }
	            date.push(val[format.parts[i]]);
	        }
	        return date.join('');
	    },
	    headTemplate: '<thead>' + '<tr>' + '<th colspan="7" class="datepicker-title"></th>' + '</tr>' + '<tr class="header navigation-row">' + '<th class="prev">&laquo;</th>' + '<th colspan="5" class="datepicker-switch"></th>' + '<th class="next">&raquo;</th>' + '</tr>' + '</thead>',
	    contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
	    footTemplate: '<tfoot>' + '<tr>' + '<th colspan="7" class="today"></th>' + '</tr>' + '<tr>' + '<th colspan="7" class="clear"></th>' + '</tr>' + '</tfoot>'
	};
	DPGlobal.template = '<div class="datepicker">' + '<div class="datepicker-days">' + '<table class="table-condensed">' + DPGlobal.headTemplate + '<tbody></tbody>' + DPGlobal.footTemplate + '</table>' + '</div>' + '<div class="datepicker-months">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table>' + '</div>' + '<div class="datepicker-years">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table>' + '</div>' + '<div class="datepicker-decades">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table>' + '</div>' + '<div class="datepicker-centuries">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table>' + '</div>' + '</div>';

	$.fn.datepicker.version = '0.1.0';
	$.fn.datepicker.DPGlobal = DPGlobal;

	$(document).on('focus.datepicker.data-api click.datepicker.data-api', '[data-provide="datepicker"]', function (e) {
	    var $this = $(this);
	    if ($this.data('datepicker')) {
	        return;
	    }

	    e.preventDefault();
	    // component click requires us to explicitly show it
	    datepickerPlugin.call($this, 'show');
	});

	$(function () {
	    datepickerPlugin.call($('[data-provide="datepicker-inline"]'));
	});

	module.exports = Datepicker;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	// user require with a reference to bundle the file and use it in this file
	// var example = require('./example');

	// use require without a reference to ensure a file is bundled

	__webpack_require__(4);
	var authEvents = __webpack_require__(5);
	var addItems = __webpack_require__(11);
	var delItems = __webpack_require__(14);
	var searchItems = __webpack_require__(17);
	var requestItems = __webpack_require__(21);
	var requests = __webpack_require__(24);
	// const deleteItems = require('./inbox/deleteitems/deleteitems');

	$(function () {
	  authEvents.addHandlers();
	  addItems.addHandlers();
	  delItems.addHandlers();
	  searchItems.addHandlers();
	  requestItems.addHandlers();
	  requests.addHandlers();
	  // deleteItems.addHandlers();
	  $('#change-pw').hide();
	  $('#sign-out').hide();
	  $('.inbox').hide();
	  $('.add-books-div').hide();
	  $('.delete-books-div').hide();
	  // $('.search-div').hide();
	  $('.search-books-div').hide();
	  $('.search-form').hide();
	  $('.inbox-div').hide();
	  $('#d-picker').datepicker({
	    format: 'yyyy-mm-dd'
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var getFormFields = __webpack_require__(6);
	var api = __webpack_require__(7);
	var ui = __webpack_require__(10);

	var onSignUp = function onSignUp(event) {
	  var data = getFormFields(this);
	  event.preventDefault();
	  api.signUp(data).then(ui.success).catch(ui.onSignUpFailure);
	};

	var onSignIn = function onSignIn(event) {
	  var data = getFormFields(this);
	  event.preventDefault();
	  api.signIn(data).then(ui.signInSuccess).catch(ui.onSignInFailure);
	};

	var onUpdatePassword = function onUpdatePassword(event) {
	  var data = getFormFields(this);
	  event.preventDefault();
	  api.updatePassword(data).then(ui.success).catch(ui.onUpdatePasswordFailure);
	};

	var onSignOut = function onSignOut(event) {
	  event.preventDefault();
	  api.signOut().then(ui.signOutSuccess).catch(ui.failure);
	};

	var addHandlers = function addHandlers() {
	  $('.sign-up-form').on('submit', onSignUp);
	  $('.sign-in-form').on('submit', onSignIn);
	  $('.change-pw-form').on('submit', onUpdatePassword);
	  $('#sign-out').on('click', onSignOut);
	};

	module.exports = {
	  addHandlers: addHandlers
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var addFormField = function addFormField(target, names, value) {
	  var name = names.shift();
	  var next = names[0];
	  if (next === '') {
	    // name is an array
	    target[name] = target[name] || [];
	    target[name].push(value);
	  } else if (next) {
	    // name is a parent key
	    target[name] = target[name] || {};
	    addFormField(target[name], names, value);
	  } else {
	    // name is the key for value
	    target[name] = value;
	  }

	  return target;
	};

	var getFormFields = function getFormFields(form) {
	  var target = {};

	  var elements = form.elements || [];
	  for (var i = 0; i < elements.length; i++) {
	    var e = elements[i];
	    if (!e.hasAttribute('name')) {
	      continue;
	    }

	    var type = 'TEXT';
	    switch (e.nodeName.toUpperCase()) {
	      case 'SELECT':
	        type = e.hasAttribute('multiple') ? 'MULTIPLE' : type;
	        break;
	      case 'INPUT':
	        type = e.getAttribute('type').toUpperCase();
	        break;
	    }

	    var names = e.getAttribute('name').split('[').map(function (k) {
	      return k.replace(/]$/, '');
	    });

	    if (type === 'MULTIPLE') {
	      for (var _i = 0; _i < e.length; _i++) {
	        if (e[_i].selected) {
	          addFormField(target, names.slice(), e[_i].value);
	        }
	      }
	    } else if (type !== 'RADIO' && type !== 'CHECKBOX' || e.checked) {
	      addFormField(target, names, e.value);
	    }
	  }

	  return target;
	};

	module.exports = getFormFields;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var config = __webpack_require__(8);
	var store = __webpack_require__(9);

	var signUp = function signUp(data) {
	  return $.ajax({
	    url: config.host + '/sign-up',
	    method: 'POST',
	    data: data
	  });
	};

	var signIn = function signIn(data) {
	  return $.ajax({
	    url: config.host + '/sign-in',
	    method: 'POST',
	    data: data
	  });
	};

	var updatePassword = function updatePassword(data) {
	  return $.ajax({
	    url: config.host + '/change-password/' + store.user.id,
	    method: 'PATCH',
	    data: data,
	    headers: {
	      Authorization: 'Token token=' + store.user.token
	    }
	  });
	};

	var signOut = function signOut() {
	  return $.ajax({
	    url: config.host + '/sign-out/' + store.user.id,
	    method: 'DELETE',
	    headers: {
	      Authorization: 'Token token=' + store.user.token
	    }
	  });
	};

	module.exports = {
	  signUp: signUp,
	  signIn: signIn,
	  updatePassword: updatePassword,
	  signOut: signOut
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	var config = {
	  host: 'http://localhost:4741'
	};

	module.exports = config;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var store = {};

	module.exports = store;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var store = __webpack_require__(9);

	var success = function success() /*data*/{};

	var signInSuccess = function signInSuccess(data) {
	  store.user = data.user;
	  $('#user-id-form').val(store.user.id);
	  $('#search-user-id-form').val(store.user.id);
	  $('#requesting-user-id').val(store.user.id);
	  success(data);
	  // console.log(data);
	  $('#change-pw').show();
	  $('#sign-out').show();
	  $('#sign-in').hide();
	  $('#sign-up').hide();
	  $('#sign-in-error').hide();
	  $('.inbox').show();
	  $('.inbox-div').hide();
	  $('.add-books-div').hide();
	  $('.delete-books-div').hide();
	  $('.search-books-div').hide();
	  $('.search-form').hide();
	};

	var signOutSuccess = function signOutSuccess() /*data*/{
	  store.user = null;
	  store.game = null;
	  $('#change-pw').hide();
	  $('#sign-out').hide();
	  $('#sign-in').show();
	  $('#sign-up').show();
	  $('.inbox').hide();
	};

	var failure = function failure() /*error*/{};

	var onSignUpFailure = function onSignUpFailure() /*error*/{};

	var onSignInFailure = function onSignInFailure() /*error*/{
	  $('#sign-in-error').show();
	  $('#sign-in-error').text("oops! something went wrong.. check the password");
	};

	var onUpdatePasswordFailure = function onUpdatePasswordFailure() {};

	module.exports = {
	  failure: failure,
	  success: success,
	  signInSuccess: signInSuccess,
	  signOutSuccess: signOutSuccess,
	  onSignUpFailure: onSignUpFailure,
	  onSignInFailure: onSignInFailure,
	  onUpdatePasswordFailure: onUpdatePasswordFailure
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var getFormFields = __webpack_require__(6);
	var api = __webpack_require__(12);
	var ui = __webpack_require__(13);

	var onAddItemLink = function onAddItemLink() {
	  $('.add-books-div').show();
	  $('.delete-books-div').hide();
	  $('.search-books-div').hide();
	  $('.search-form').hide();
	  $('.inbox-div').hide();
	};

	var onAddItem = function onAddItem(event) {
	  $('#user-item-status').val('Available');
	  var data = getFormFields(this);
	  if (!data.item.name) {
	    return;
	  }
	  event.preventDefault();
	  api.addItem(data).then(ui.onAddItemSuccess).catch(ui.failure);
	};

	var addHandlers = function addHandlers() {
	  $('.addb').on('click', onAddItemLink);
	  $('.add-books-form').on('submit', onAddItem);
	};

	module.exports = {
	  addHandlers: addHandlers
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var config = __webpack_require__(8);
	var store = __webpack_require__(9);

	var addItem = function addItem(data) {
	  return $.ajax({
	    url: config.host + '/add-user-item',
	    method: 'POST',
	    data: data,
	    headers: {
	      Authorization: 'Token token=' + store.user.token
	    }
	  });
	};

	module.exports = {
	  addItem: addItem
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	// const store = require('../../store');

	var onAddItemSuccess = function onAddItemSuccess(data) {
	  // console.log(data);
	};

	var failure = function failure() /*error*/{};

	module.exports = {
	  failure: failure,
	  onAddItemSuccess: onAddItemSuccess
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	// const getFormFields = require(`../../../../lib/get-form-fields`);

	var api = __webpack_require__(15);
	var ui = __webpack_require__(16);

	var onViewItemLink = function onViewItemLink(event) {
	  // debugger;
	  event.preventDefault();
	  $('.add-books-div').hide();
	  $('.search-books-div').hide();
	  $('.delete-books-div').show();
	  $('.search-form').hide();
	  $('.inbox-div').hide();
	  api.viewItems().then(ui.onViewItemsSuccess).catch(ui.failure);
	};

	var addHandlers = function addHandlers() {
	  $('.delb').on('click', onViewItemLink);
	};

	module.exports = {
	  addHandlers: addHandlers
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var config = __webpack_require__(8);
	var store = __webpack_require__(9);

	var viewItems = function viewItems() {
	  return $.ajax({
	    url: config.host + '/retrieve_user_items/' + store.user.id,
	    method: 'GET',
	    headers: {
	      Authorization: 'Token token=' + store.user.token
	    }
	  });
	};

	var deleteItems = function deleteItems(data) {
	  return $.ajax({
	    url: config.host + '/delete-user-item/' + data,
	    method: 'DELETE',
	    data: data,
	    headers: {
	      Authorization: 'Token token=' + store.user.token
	    }
	  });
	};

	var updateItem = function updateItem(data) {
	  return $.ajax({
	    url: config.host + '/edit-user-item/' + data.edit.id,
	    method: 'PATCH',
	    data: data,
	    headers: {
	      Authorization: 'Token token=' + store.user.token
	    }
	  });
	};

	module.exports = {
	  viewItems: viewItems,
	  deleteItems: deleteItems,
	  updateItem: updateItem
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var api = __webpack_require__(15);
	var getFormFields = __webpack_require__(6);

	var failure = function failure() {
	  // console.log('fixxit');
	};

	var deleteTable = function deleteTable() {
	  // debugger;
	  var table = document.getElementById("del-table");
	  var rowCount = table.rows.length;
	  for (var i = 1; i < rowCount; i++) {
	    table.deleteRow(1);
	  }
	};

	var onViewItemsSuccess = function onViewItemsSuccess(data) {
	  deleteTable();
	  //debugger;
	  // console.log(data);
	  if (data) {
	    var len = data.user_items.length;
	    var txt = '';
	    // debugger;
	    if (len > 0) {
	      for (var i = 0; i < len; i++) {
	        if (data.user_items[i].name) {
	          // txt += "<tr><td>"+data.user_items[i].name+"</td><td>"+data.user_items[i].description+"</td><td><a href='#' class='del-items' id="+data.user_items[i].id+">Edit</a></td></tr>";
	          txt += "<tr><td class='tabd'>" + data.user_items[i].name + "</td><td class='tabd'>" + data.user_items[i].description + "</td><td class='tabd'><a href='#' class='edit-items' id=" + data.user_items[i].id + "'>Edit</a></td><td class='tabd'><a href='#' class='del-items' id=" + data.user_items[i].id + ">Delete</a></td></tr>";
	        }
	      }
	      if (txt !== '') {
	        $('.deltable').append(txt).removeClass('hidden');
	      }
	    }
	  }

	  addHandlers();
	};

	var onDeleteItemsSuccess = function onDeleteItemsSuccess(data) {
	  // debugger;
	  // console.log(data);
	  api.viewItems().then(onViewItemsSuccess).catch(failure);
	};

	var onDeleteItems = function onDeleteItems(event) {
	  // debugger;
	  event.preventDefault();
	  // let data = $(event.target).data('id');
	  var data = this.id;
	  api.deleteItems(data).then(onDeleteItemsSuccess).catch(failure);
	};

	var onUpdateItemsSuccess = function onUpdateItemsSuccess(data) {
	  // console.log(data);
	  api.viewItems().then(onViewItemsSuccess).catch(failure);
	};

	var onUpdateItems = function onUpdateItems(event) {
	  event.preventDefault();
	  // debugger;
	  // let edit = $(event.target).data('id');
	  var data = getFormFields(this);
	  // console.log(data);
	  api.updateItem(data).then(onUpdateItemsSuccess).catch(failure);
	};

	var onEditClick = function onEditClick(event) {
	  event.preventDefault();
	  // debugger;
	  $('#edit-item-modal').modal('show');
	  var id = this.id;
	  var len = this.id.length;
	  var editId = id.substring(4, len);
	  $('#edit-item-modal #edit_id').val(editId);
	};

	var addHandlers = function addHandlers() {
	  $('.del-items').on('click', onDeleteItems);
	  $('.edit-items').on('click', onEditClick);
	  $('.edit-item-form').on('submit', onUpdateItems);
	};

	module.exports = {
	  onViewItemsSuccess: onViewItemsSuccess,
	  onDeleteItemsSuccess: onDeleteItemsSuccess,
	  failure: failure
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var getFormFields = __webpack_require__(6);
	var api = __webpack_require__(18);
	var ui = __webpack_require__(19);
	var edit = __webpack_require__(20);

	var onSearchItemLink = function onSearchItemLink(event) {
	  // debugger;
	  event.preventDefault();
	  $('.add-books-div').hide();
	  $('.delete-books-div').hide();
	  $('.search-form').show();
	  $('.search-books-div').hide();
	  $('.inbox-div').hide();
	};

	var onSearchItems = function onSearchItems(event) {
	  // debugger;
	  $('.search-form').hide();
	  var data = getFormFields(this);
	  edit.item = data.item;
	  // console.log(data);
	  event.preventDefault();
	  $('.search-form').hide();
	  $('.search-div').show();
	  $('.search-books-div').show();
	  // debugger;
	  api.searchItem(data).then(ui.onSearchItemSuccess).catch(ui.failure);
	};

	var addHandlers = function addHandlers() {
	  $('.searchb').on('click', onSearchItemLink);
	  $('.search-form').on('submit', onSearchItems);
	};

	module.exports = {
	  addHandlers: addHandlers
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var config = __webpack_require__(8);
	var store = __webpack_require__(9);

	var searchItem = function searchItem(data) {
	  return $.ajax({
	    url: config.host + '/search-items',
	    method: 'GET',
	    data: data,
	    headers: {
	      Authorization: 'Token token=' + store.user.token
	    }
	  });
	};

	// const requestItem = function(data) {
	//   return $.ajax({
	//     url: config.host + '/request-item',
	//     method: 'GET',
	//     data,
	//     headers: {
	//       Authorization: 'Token token=' + store.user.token,
	//     },
	//   });
	// };

	module.exports = {
	  searchItem: searchItem
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	// const api = require('./api');
	// const requestItems = require('./../requestitems/requestitems');

	var deleteTable = function deleteTable() {
	  // debugger;
	  var table = document.getElementById('search-table');
	  var rowCount = table.rows.length;
	  for (var i = 1; i < rowCount; i++) {
	    table.deleteRow(1);
	  }
	};

	var failure = function failure() {
	  // console.log('fail');
	};

	var onRequestClick = function onRequestClick(event) {
	  event.preventDefault();
	  // debugger;
	  $('#request-item-modal').modal('show');
	  var id = this.id;
	  $('#request-item-modal #requested-user_item_id').val(id);
	  // $('.d-picker').datepicker({
	  //     format: 'yyyy-mm-dd'
	  //   });
	};

	var addHandlers = function addHandlers() {
	  $('.request-items').on('click', onRequestClick);
	};

	// const onRequestItemSuccess = function(data) {
	//   console.log(data);
	// };

	// const onRequestItem = function(event) {
	//     event.preventDefault();
	//     debugger;
	//     $('.request-item').text('Requested');
	//     let data = this.id;
	//     api.requestItem(data)
	//       .then(onRequestItemSuccess)
	//       .catch(failure);
	// };

	// const addHandlers = function() {
	//   $('.request-item').on('click', onRequestItem);
	// };

	var onSearchItemSuccess = function onSearchItemSuccess(data) {
	  deleteTable();
	  // console.log(data);
	  // debugger;
	  if (data) {
	    var len = data.user_items.length;
	    var txt = '';
	    if (len > 0) {
	      for (var i = 0; i < len; i++) {
	        if (data.user_items[i].name) {
	          // txt += "<tr><td>"+data.user_items[i].name+"</td><td>"+data.user_items[i].description+"</td><td>"+data.user_items[i].user_name+"</td><td><a href='#' class='request-item' id="+data.user_items[i].id+">Request</a></td></tr>";
	          txt += "<tr><td class='tabd'>" + data.user_items[i].name + "</td><td class='tabd'>" + data.user_items[i].description + "</td><td class='tabd'>" + data.user_items[i].user_name + "</td><td class='tabd'>" + data.user_items[i].status + "</td><td class='tabd'><a href='#' class='request-items' id=" + data.user_items[i].id + ">Select</a></td></tr>";
	          // $('#request-id').val(data.user_items[i].id);
	          // $('#requested-user-id2').val(data.user_items[i].user_name);
	        }
	      }
	      if (txt !== '') {
	        $('.searchtable').append(txt).removeClass('hidden');
	      }
	    }
	  }
	  addHandlers();
	};

	module.exports = {
	  onSearchItemSuccess: onSearchItemSuccess,
	  failure: failure
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	var edit = {};

	module.exports = edit;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var api = __webpack_require__(22);
	var ui = __webpack_require__(23);
	var getFormFields = __webpack_require__(6);

	var onRequestItem = function onRequestItem(event) {
	  var data = getFormFields(this);
	  event.preventDefault();
	  // $('#request-name').val(data.)
	  // debugger;
	  // let data = this.id;
	  // console.log(data);
	  api.requestItem(data).then(ui.onRequestItemSuccess).catch(ui.failure);
	};

	var addHandlers = function addHandlers() {
	  $('.request-item-form').on('submit', onRequestItem);
	};

	module.exports = {
	  addHandlers: addHandlers
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var config = __webpack_require__(8);
	var store = __webpack_require__(9);

	var requestItem = function requestItem(data) {
	  return $.ajax({
	    url: config.host + '/request-item',
	    method: 'POST',
	    data: data,
	    headers: {
	      Authorization: 'Token token=' + store.user.token
	    }
	  });
	};

	module.exports = {
	  requestItem: requestItem
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var searchApi = __webpack_require__(18);
	var searchUi = __webpack_require__(19);
	var edit = __webpack_require__(20);

	var onRequestItemSuccess = function onRequestItemSuccess() {

	  // debugger;
	  // let book_name = document.getElementById('book_name');
	  var data = {};
	  data.item = edit.item;

	  // console.log(data.item);
	  searchApi.searchItem(data).then(searchUi.onSearchItemSuccess).catch(searchUi.failure);
	};

	var failure = function failure() {

	  // console.log("fail");
	};

	module.exports = {
	  onRequestItemSuccess: onRequestItemSuccess,
	  failure: failure
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var api = __webpack_require__(25);
	var ui = __webpack_require__(26);

	var onRequestLink = function onRequestLink() {
	  $('.inbox-div').show();
	  $('.add-books-div').hide();
	  $('.delete-books-div').hide();
	  $('.search-books-div').hide();
	  $('.search-form').hide();
	  api.requestInbox().then(ui.onRequestInboxSuccess).catch(ui.failure);
	};

	var addHandlers = function addHandlers() {
	  $('.inboxb').on('click', onRequestLink);
	};

	module.exports = {
	  addHandlers: addHandlers
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var config = __webpack_require__(8);
	var store = __webpack_require__(9);

	var requestInbox = function requestInbox() {
	  return $.ajax({
	    url: config.host + '/inbox_items/' + store.user.id,
	    method: 'GET',
	    headers: {
	      Authorization: 'Token token=' + store.user.token
	    }
	  });
	};

	var acceptRequest = function acceptRequest(data) {
	  return $.ajax({
	    url: config.host + '/accept-request/' + data,
	    method: 'PATCH',
	    data: data,
	    headers: {
	      Authorization: 'Token token=' + store.user.token
	    }
	  });
	};

	var rejectRequest = function rejectRequest(data) {
	  return $.ajax({
	    url: config.host + '/reject-request/' + data,
	    method: 'DELETE',
	    headers: {
	      Authorization: 'Token token=' + store.user.token
	    }
	  });
	};

	module.exports = {
	  requestInbox: requestInbox,
	  acceptRequest: acceptRequest,
	  rejectRequest: rejectRequest
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var api = __webpack_require__(25);

	var failure = function failure() {
	  // console.log('failure');
	};

	var onAcceptRequestSuccess = function onAcceptRequestSuccess(data) {
	  // console.log('sucess');
	  // console.log(data);
	  api.requestInbox().then(onRequestInboxSuccess).catch(failure);
	};

	var onAccept = function onAccept(event) {
	  event.preventDefault();
	  // debugger;
	  var id = this.id;
	  var len = this.id.length;
	  var acceptUserItemId = id.substring(6, len);
	  api.acceptRequest(acceptUserItemId).then(onAcceptRequestSuccess).catch(failure);
	};

	var onRejectedRequestSuccess = function onRejectedRequestSuccess() {
	  // console.log('sucess');
	  api.requestInbox().then(onRequestInboxSuccess).catch(failure);
	};

	var onReject = function onReject() {
	  event.preventDefault();
	  // debugger;
	  api.rejectRequest(this.id).then(onRejectedRequestSuccess).catch(failure);
	};

	var addHandlers = function addHandlers() {
	  $('.accept-req').on('click', onAccept);
	  $('.reject-req').on('click', onReject);
	};

	var deleteTable = function deleteTable() {
	  // debugger;
	  var table = document.getElementById('inbox-table');
	  var rowCount = table.rows.length;
	  for (var i = 1; i < rowCount; i++) {
	    table.deleteRow(1);
	  }
	};

	var onRequestInboxSuccess = function onRequestInboxSuccess(data) {
	  deleteTable();
	  // debugger;
	  // console.log(data);
	  if (data) {
	    var len = data.requests.length;
	    var txt = '';
	    // debugger;
	    if (len > 0) {
	      for (var i = 0; i < len; i++) {
	        if (data.requests[i].name && data.requests[i].description) {
	          // txt += "<tr><td>"+data.user_items[i].name+"</td><td>"+data.user_items[i].description+"</td><td><a href='#' class='del-items' id="+data.user_items[i].id+">Edit</a></td></tr>";
	          txt += "<tr><td class='tabd'>" + data.requests[i].name + "</td><td class='tabd'>" + data.requests[i].description + "</td><td class='tabd'>" + data.requests[i].user_name + "</td><td class='tabd'>" + data.requests[i].mailing_address + "</td><td class='tabd'>" + data.requests[i].return_date + "</td><td class='tabd'><a href='#' class='accept-req' id='Accept" + data.requests[i].user_items_id + "'>Accept</a></td><td class='tabd'><a href='#' class='reject-req' id=" + data.requests[i].user_items_id + ">Reject</a></td></tr>";
	        }
	      }
	      if (txt !== '') {
	        $('.inboxtable').append(txt).removeClass('hidden');
	      }
	    }
	  }
	  addHandlers();
	};

	module.exports = {
	  onRequestInboxSuccess: onRequestInboxSuccess
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(28);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(35)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(29)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\n/*!\n * Bootstrap v3.3.7 (http://getbootstrap.com)\n * Copyright 2011-2016 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block; }\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n[hidden],\ntemplate {\n  display: none; }\n\na {\n  background-color: transparent; }\n\na:active,\na:hover {\n  outline: 0; }\n\nabbr[title] {\n  border-bottom: 1px dotted; }\n\nb,\nstrong {\n  font-weight: bold; }\n\ndfn {\n  font-style: italic; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nmark {\n  background: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\nimg {\n  border: 0; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  box-sizing: content-box;\n  height: 0; }\n\npre {\n  overflow: auto; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0; }\n\nbutton {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer; }\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default; }\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n\ninput {\n  line-height: normal; }\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  box-sizing: content-box; }\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  border: 0;\n  padding: 0; }\n\ntextarea {\n  overflow: auto; }\n\noptgroup {\n  font-weight: bold; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0; }\n\n/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */\n@media print {\n  *,\n  *:before,\n  *:after {\n    background: transparent !important;\n    color: #000 !important;\n    box-shadow: none !important;\n    text-shadow: none !important; }\n  a,\n  a:visited {\n    text-decoration: underline; }\n  a[href]:after {\n    content: \" (\" attr(href) \")\"; }\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\"; }\n  a[href^=\"#\"]:after,\n  a[href^=\"javascript:\"]:after {\n    content: \"\"; }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid; }\n  thead {\n    display: table-header-group; }\n  tr,\n  img {\n    page-break-inside: avoid; }\n  img {\n    max-width: 100% !important; }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3; }\n  h2,\n  h3 {\n    page-break-after: avoid; }\n  .navbar {\n    display: none; }\n  .btn > .caret,\n  .dropup > .btn > .caret {\n    border-top-color: #000 !important; }\n  .label {\n    border: 1px solid #000; }\n  .table {\n    border-collapse: collapse !important; }\n    .table td,\n    .table th {\n      background-color: #fff !important; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important; } }\n\n@font-face {\n  font-family: 'Glyphicons Halflings';\n  src: url(" + __webpack_require__(30) + ");\n  src: url(" + __webpack_require__(30) + "?#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__(31) + ") format(\"woff2\"), url(" + __webpack_require__(32) + ") format(\"woff\"), url(" + __webpack_require__(33) + ") format(\"truetype\"), url(" + __webpack_require__(34) + "#glyphicons_halflingsregular) format(\"svg\"); }\n\n.glyphicon {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  font-family: 'Glyphicons Halflings';\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.glyphicon-asterisk:before {\n  content: \"*\"; }\n\n.glyphicon-plus:before {\n  content: \"+\"; }\n\n.glyphicon-euro:before,\n.glyphicon-eur:before {\n  content: \"\\20AC\"; }\n\n.glyphicon-minus:before {\n  content: \"\\2212\"; }\n\n.glyphicon-cloud:before {\n  content: \"\\2601\"; }\n\n.glyphicon-envelope:before {\n  content: \"\\2709\"; }\n\n.glyphicon-pencil:before {\n  content: \"\\270F\"; }\n\n.glyphicon-glass:before {\n  content: \"\\E001\"; }\n\n.glyphicon-music:before {\n  content: \"\\E002\"; }\n\n.glyphicon-search:before {\n  content: \"\\E003\"; }\n\n.glyphicon-heart:before {\n  content: \"\\E005\"; }\n\n.glyphicon-star:before {\n  content: \"\\E006\"; }\n\n.glyphicon-star-empty:before {\n  content: \"\\E007\"; }\n\n.glyphicon-user:before {\n  content: \"\\E008\"; }\n\n.glyphicon-film:before {\n  content: \"\\E009\"; }\n\n.glyphicon-th-large:before {\n  content: \"\\E010\"; }\n\n.glyphicon-th:before {\n  content: \"\\E011\"; }\n\n.glyphicon-th-list:before {\n  content: \"\\E012\"; }\n\n.glyphicon-ok:before {\n  content: \"\\E013\"; }\n\n.glyphicon-remove:before {\n  content: \"\\E014\"; }\n\n.glyphicon-zoom-in:before {\n  content: \"\\E015\"; }\n\n.glyphicon-zoom-out:before {\n  content: \"\\E016\"; }\n\n.glyphicon-off:before {\n  content: \"\\E017\"; }\n\n.glyphicon-signal:before {\n  content: \"\\E018\"; }\n\n.glyphicon-cog:before {\n  content: \"\\E019\"; }\n\n.glyphicon-trash:before {\n  content: \"\\E020\"; }\n\n.glyphicon-home:before {\n  content: \"\\E021\"; }\n\n.glyphicon-file:before {\n  content: \"\\E022\"; }\n\n.glyphicon-time:before {\n  content: \"\\E023\"; }\n\n.glyphicon-road:before {\n  content: \"\\E024\"; }\n\n.glyphicon-download-alt:before {\n  content: \"\\E025\"; }\n\n.glyphicon-download:before {\n  content: \"\\E026\"; }\n\n.glyphicon-upload:before {\n  content: \"\\E027\"; }\n\n.glyphicon-inbox:before {\n  content: \"\\E028\"; }\n\n.glyphicon-play-circle:before {\n  content: \"\\E029\"; }\n\n.glyphicon-repeat:before {\n  content: \"\\E030\"; }\n\n.glyphicon-refresh:before {\n  content: \"\\E031\"; }\n\n.glyphicon-list-alt:before {\n  content: \"\\E032\"; }\n\n.glyphicon-lock:before {\n  content: \"\\E033\"; }\n\n.glyphicon-flag:before {\n  content: \"\\E034\"; }\n\n.glyphicon-headphones:before {\n  content: \"\\E035\"; }\n\n.glyphicon-volume-off:before {\n  content: \"\\E036\"; }\n\n.glyphicon-volume-down:before {\n  content: \"\\E037\"; }\n\n.glyphicon-volume-up:before {\n  content: \"\\E038\"; }\n\n.glyphicon-qrcode:before {\n  content: \"\\E039\"; }\n\n.glyphicon-barcode:before {\n  content: \"\\E040\"; }\n\n.glyphicon-tag:before {\n  content: \"\\E041\"; }\n\n.glyphicon-tags:before {\n  content: \"\\E042\"; }\n\n.glyphicon-book:before {\n  content: \"\\E043\"; }\n\n.glyphicon-bookmark:before {\n  content: \"\\E044\"; }\n\n.glyphicon-print:before {\n  content: \"\\E045\"; }\n\n.glyphicon-camera:before {\n  content: \"\\E046\"; }\n\n.glyphicon-font:before {\n  content: \"\\E047\"; }\n\n.glyphicon-bold:before {\n  content: \"\\E048\"; }\n\n.glyphicon-italic:before {\n  content: \"\\E049\"; }\n\n.glyphicon-text-height:before {\n  content: \"\\E050\"; }\n\n.glyphicon-text-width:before {\n  content: \"\\E051\"; }\n\n.glyphicon-align-left:before {\n  content: \"\\E052\"; }\n\n.glyphicon-align-center:before {\n  content: \"\\E053\"; }\n\n.glyphicon-align-right:before {\n  content: \"\\E054\"; }\n\n.glyphicon-align-justify:before {\n  content: \"\\E055\"; }\n\n.glyphicon-list:before {\n  content: \"\\E056\"; }\n\n.glyphicon-indent-left:before {\n  content: \"\\E057\"; }\n\n.glyphicon-indent-right:before {\n  content: \"\\E058\"; }\n\n.glyphicon-facetime-video:before {\n  content: \"\\E059\"; }\n\n.glyphicon-picture:before {\n  content: \"\\E060\"; }\n\n.glyphicon-map-marker:before {\n  content: \"\\E062\"; }\n\n.glyphicon-adjust:before {\n  content: \"\\E063\"; }\n\n.glyphicon-tint:before {\n  content: \"\\E064\"; }\n\n.glyphicon-edit:before {\n  content: \"\\E065\"; }\n\n.glyphicon-share:before {\n  content: \"\\E066\"; }\n\n.glyphicon-check:before {\n  content: \"\\E067\"; }\n\n.glyphicon-move:before {\n  content: \"\\E068\"; }\n\n.glyphicon-step-backward:before {\n  content: \"\\E069\"; }\n\n.glyphicon-fast-backward:before {\n  content: \"\\E070\"; }\n\n.glyphicon-backward:before {\n  content: \"\\E071\"; }\n\n.glyphicon-play:before {\n  content: \"\\E072\"; }\n\n.glyphicon-pause:before {\n  content: \"\\E073\"; }\n\n.glyphicon-stop:before {\n  content: \"\\E074\"; }\n\n.glyphicon-forward:before {\n  content: \"\\E075\"; }\n\n.glyphicon-fast-forward:before {\n  content: \"\\E076\"; }\n\n.glyphicon-step-forward:before {\n  content: \"\\E077\"; }\n\n.glyphicon-eject:before {\n  content: \"\\E078\"; }\n\n.glyphicon-chevron-left:before {\n  content: \"\\E079\"; }\n\n.glyphicon-chevron-right:before {\n  content: \"\\E080\"; }\n\n.glyphicon-plus-sign:before {\n  content: \"\\E081\"; }\n\n.glyphicon-minus-sign:before {\n  content: \"\\E082\"; }\n\n.glyphicon-remove-sign:before {\n  content: \"\\E083\"; }\n\n.glyphicon-ok-sign:before {\n  content: \"\\E084\"; }\n\n.glyphicon-question-sign:before {\n  content: \"\\E085\"; }\n\n.glyphicon-info-sign:before {\n  content: \"\\E086\"; }\n\n.glyphicon-screenshot:before {\n  content: \"\\E087\"; }\n\n.glyphicon-remove-circle:before {\n  content: \"\\E088\"; }\n\n.glyphicon-ok-circle:before {\n  content: \"\\E089\"; }\n\n.glyphicon-ban-circle:before {\n  content: \"\\E090\"; }\n\n.glyphicon-arrow-left:before {\n  content: \"\\E091\"; }\n\n.glyphicon-arrow-right:before {\n  content: \"\\E092\"; }\n\n.glyphicon-arrow-up:before {\n  content: \"\\E093\"; }\n\n.glyphicon-arrow-down:before {\n  content: \"\\E094\"; }\n\n.glyphicon-share-alt:before {\n  content: \"\\E095\"; }\n\n.glyphicon-resize-full:before {\n  content: \"\\E096\"; }\n\n.glyphicon-resize-small:before {\n  content: \"\\E097\"; }\n\n.glyphicon-exclamation-sign:before {\n  content: \"\\E101\"; }\n\n.glyphicon-gift:before {\n  content: \"\\E102\"; }\n\n.glyphicon-leaf:before {\n  content: \"\\E103\"; }\n\n.glyphicon-fire:before {\n  content: \"\\E104\"; }\n\n.glyphicon-eye-open:before {\n  content: \"\\E105\"; }\n\n.glyphicon-eye-close:before {\n  content: \"\\E106\"; }\n\n.glyphicon-warning-sign:before {\n  content: \"\\E107\"; }\n\n.glyphicon-plane:before {\n  content: \"\\E108\"; }\n\n.glyphicon-calendar:before {\n  content: \"\\E109\"; }\n\n.glyphicon-random:before {\n  content: \"\\E110\"; }\n\n.glyphicon-comment:before {\n  content: \"\\E111\"; }\n\n.glyphicon-magnet:before {\n  content: \"\\E112\"; }\n\n.glyphicon-chevron-up:before {\n  content: \"\\E113\"; }\n\n.glyphicon-chevron-down:before {\n  content: \"\\E114\"; }\n\n.glyphicon-retweet:before {\n  content: \"\\E115\"; }\n\n.glyphicon-shopping-cart:before {\n  content: \"\\E116\"; }\n\n.glyphicon-folder-close:before {\n  content: \"\\E117\"; }\n\n.glyphicon-folder-open:before {\n  content: \"\\E118\"; }\n\n.glyphicon-resize-vertical:before {\n  content: \"\\E119\"; }\n\n.glyphicon-resize-horizontal:before {\n  content: \"\\E120\"; }\n\n.glyphicon-hdd:before {\n  content: \"\\E121\"; }\n\n.glyphicon-bullhorn:before {\n  content: \"\\E122\"; }\n\n.glyphicon-bell:before {\n  content: \"\\E123\"; }\n\n.glyphicon-certificate:before {\n  content: \"\\E124\"; }\n\n.glyphicon-thumbs-up:before {\n  content: \"\\E125\"; }\n\n.glyphicon-thumbs-down:before {\n  content: \"\\E126\"; }\n\n.glyphicon-hand-right:before {\n  content: \"\\E127\"; }\n\n.glyphicon-hand-left:before {\n  content: \"\\E128\"; }\n\n.glyphicon-hand-up:before {\n  content: \"\\E129\"; }\n\n.glyphicon-hand-down:before {\n  content: \"\\E130\"; }\n\n.glyphicon-circle-arrow-right:before {\n  content: \"\\E131\"; }\n\n.glyphicon-circle-arrow-left:before {\n  content: \"\\E132\"; }\n\n.glyphicon-circle-arrow-up:before {\n  content: \"\\E133\"; }\n\n.glyphicon-circle-arrow-down:before {\n  content: \"\\E134\"; }\n\n.glyphicon-globe:before {\n  content: \"\\E135\"; }\n\n.glyphicon-wrench:before {\n  content: \"\\E136\"; }\n\n.glyphicon-tasks:before {\n  content: \"\\E137\"; }\n\n.glyphicon-filter:before {\n  content: \"\\E138\"; }\n\n.glyphicon-briefcase:before {\n  content: \"\\E139\"; }\n\n.glyphicon-fullscreen:before {\n  content: \"\\E140\"; }\n\n.glyphicon-dashboard:before {\n  content: \"\\E141\"; }\n\n.glyphicon-paperclip:before {\n  content: \"\\E142\"; }\n\n.glyphicon-heart-empty:before {\n  content: \"\\E143\"; }\n\n.glyphicon-link:before {\n  content: \"\\E144\"; }\n\n.glyphicon-phone:before {\n  content: \"\\E145\"; }\n\n.glyphicon-pushpin:before {\n  content: \"\\E146\"; }\n\n.glyphicon-usd:before {\n  content: \"\\E148\"; }\n\n.glyphicon-gbp:before {\n  content: \"\\E149\"; }\n\n.glyphicon-sort:before {\n  content: \"\\E150\"; }\n\n.glyphicon-sort-by-alphabet:before {\n  content: \"\\E151\"; }\n\n.glyphicon-sort-by-alphabet-alt:before {\n  content: \"\\E152\"; }\n\n.glyphicon-sort-by-order:before {\n  content: \"\\E153\"; }\n\n.glyphicon-sort-by-order-alt:before {\n  content: \"\\E154\"; }\n\n.glyphicon-sort-by-attributes:before {\n  content: \"\\E155\"; }\n\n.glyphicon-sort-by-attributes-alt:before {\n  content: \"\\E156\"; }\n\n.glyphicon-unchecked:before {\n  content: \"\\E157\"; }\n\n.glyphicon-expand:before {\n  content: \"\\E158\"; }\n\n.glyphicon-collapse-down:before {\n  content: \"\\E159\"; }\n\n.glyphicon-collapse-up:before {\n  content: \"\\E160\"; }\n\n.glyphicon-log-in:before {\n  content: \"\\E161\"; }\n\n.glyphicon-flash:before {\n  content: \"\\E162\"; }\n\n.glyphicon-log-out:before {\n  content: \"\\E163\"; }\n\n.glyphicon-new-window:before {\n  content: \"\\E164\"; }\n\n.glyphicon-record:before {\n  content: \"\\E165\"; }\n\n.glyphicon-save:before {\n  content: \"\\E166\"; }\n\n.glyphicon-open:before {\n  content: \"\\E167\"; }\n\n.glyphicon-saved:before {\n  content: \"\\E168\"; }\n\n.glyphicon-import:before {\n  content: \"\\E169\"; }\n\n.glyphicon-export:before {\n  content: \"\\E170\"; }\n\n.glyphicon-send:before {\n  content: \"\\E171\"; }\n\n.glyphicon-floppy-disk:before {\n  content: \"\\E172\"; }\n\n.glyphicon-floppy-saved:before {\n  content: \"\\E173\"; }\n\n.glyphicon-floppy-remove:before {\n  content: \"\\E174\"; }\n\n.glyphicon-floppy-save:before {\n  content: \"\\E175\"; }\n\n.glyphicon-floppy-open:before {\n  content: \"\\E176\"; }\n\n.glyphicon-credit-card:before {\n  content: \"\\E177\"; }\n\n.glyphicon-transfer:before {\n  content: \"\\E178\"; }\n\n.glyphicon-cutlery:before {\n  content: \"\\E179\"; }\n\n.glyphicon-header:before {\n  content: \"\\E180\"; }\n\n.glyphicon-compressed:before {\n  content: \"\\E181\"; }\n\n.glyphicon-earphone:before {\n  content: \"\\E182\"; }\n\n.glyphicon-phone-alt:before {\n  content: \"\\E183\"; }\n\n.glyphicon-tower:before {\n  content: \"\\E184\"; }\n\n.glyphicon-stats:before {\n  content: \"\\E185\"; }\n\n.glyphicon-sd-video:before {\n  content: \"\\E186\"; }\n\n.glyphicon-hd-video:before {\n  content: \"\\E187\"; }\n\n.glyphicon-subtitles:before {\n  content: \"\\E188\"; }\n\n.glyphicon-sound-stereo:before {\n  content: \"\\E189\"; }\n\n.glyphicon-sound-dolby:before {\n  content: \"\\E190\"; }\n\n.glyphicon-sound-5-1:before {\n  content: \"\\E191\"; }\n\n.glyphicon-sound-6-1:before {\n  content: \"\\E192\"; }\n\n.glyphicon-sound-7-1:before {\n  content: \"\\E193\"; }\n\n.glyphicon-copyright-mark:before {\n  content: \"\\E194\"; }\n\n.glyphicon-registration-mark:before {\n  content: \"\\E195\"; }\n\n.glyphicon-cloud-download:before {\n  content: \"\\E197\"; }\n\n.glyphicon-cloud-upload:before {\n  content: \"\\E198\"; }\n\n.glyphicon-tree-conifer:before {\n  content: \"\\E199\"; }\n\n.glyphicon-tree-deciduous:before {\n  content: \"\\E200\"; }\n\n.glyphicon-cd:before {\n  content: \"\\E201\"; }\n\n.glyphicon-save-file:before {\n  content: \"\\E202\"; }\n\n.glyphicon-open-file:before {\n  content: \"\\E203\"; }\n\n.glyphicon-level-up:before {\n  content: \"\\E204\"; }\n\n.glyphicon-copy:before {\n  content: \"\\E205\"; }\n\n.glyphicon-paste:before {\n  content: \"\\E206\"; }\n\n.glyphicon-alert:before {\n  content: \"\\E209\"; }\n\n.glyphicon-equalizer:before {\n  content: \"\\E210\"; }\n\n.glyphicon-king:before {\n  content: \"\\E211\"; }\n\n.glyphicon-queen:before {\n  content: \"\\E212\"; }\n\n.glyphicon-pawn:before {\n  content: \"\\E213\"; }\n\n.glyphicon-bishop:before {\n  content: \"\\E214\"; }\n\n.glyphicon-knight:before {\n  content: \"\\E215\"; }\n\n.glyphicon-baby-formula:before {\n  content: \"\\E216\"; }\n\n.glyphicon-tent:before {\n  content: \"\\26FA\"; }\n\n.glyphicon-blackboard:before {\n  content: \"\\E218\"; }\n\n.glyphicon-bed:before {\n  content: \"\\E219\"; }\n\n.glyphicon-apple:before {\n  content: \"\\F8FF\"; }\n\n.glyphicon-erase:before {\n  content: \"\\E221\"; }\n\n.glyphicon-hourglass:before {\n  content: \"\\231B\"; }\n\n.glyphicon-lamp:before {\n  content: \"\\E223\"; }\n\n.glyphicon-duplicate:before {\n  content: \"\\E224\"; }\n\n.glyphicon-piggy-bank:before {\n  content: \"\\E225\"; }\n\n.glyphicon-scissors:before {\n  content: \"\\E226\"; }\n\n.glyphicon-bitcoin:before {\n  content: \"\\E227\"; }\n\n.glyphicon-btc:before {\n  content: \"\\E227\"; }\n\n.glyphicon-xbt:before {\n  content: \"\\E227\"; }\n\n.glyphicon-yen:before {\n  content: \"\\A5\"; }\n\n.glyphicon-jpy:before {\n  content: \"\\A5\"; }\n\n.glyphicon-ruble:before {\n  content: \"\\20BD\"; }\n\n.glyphicon-rub:before {\n  content: \"\\20BD\"; }\n\n.glyphicon-scale:before {\n  content: \"\\E230\"; }\n\n.glyphicon-ice-lolly:before {\n  content: \"\\E231\"; }\n\n.glyphicon-ice-lolly-tasted:before {\n  content: \"\\E232\"; }\n\n.glyphicon-education:before {\n  content: \"\\E233\"; }\n\n.glyphicon-option-horizontal:before {\n  content: \"\\E234\"; }\n\n.glyphicon-option-vertical:before {\n  content: \"\\E235\"; }\n\n.glyphicon-menu-hamburger:before {\n  content: \"\\E236\"; }\n\n.glyphicon-modal-window:before {\n  content: \"\\E237\"; }\n\n.glyphicon-oil:before {\n  content: \"\\E238\"; }\n\n.glyphicon-grain:before {\n  content: \"\\E239\"; }\n\n.glyphicon-sunglasses:before {\n  content: \"\\E240\"; }\n\n.glyphicon-text-size:before {\n  content: \"\\E241\"; }\n\n.glyphicon-text-color:before {\n  content: \"\\E242\"; }\n\n.glyphicon-text-background:before {\n  content: \"\\E243\"; }\n\n.glyphicon-object-align-top:before {\n  content: \"\\E244\"; }\n\n.glyphicon-object-align-bottom:before {\n  content: \"\\E245\"; }\n\n.glyphicon-object-align-horizontal:before {\n  content: \"\\E246\"; }\n\n.glyphicon-object-align-left:before {\n  content: \"\\E247\"; }\n\n.glyphicon-object-align-vertical:before {\n  content: \"\\E248\"; }\n\n.glyphicon-object-align-right:before {\n  content: \"\\E249\"; }\n\n.glyphicon-triangle-right:before {\n  content: \"\\E250\"; }\n\n.glyphicon-triangle-left:before {\n  content: \"\\E251\"; }\n\n.glyphicon-triangle-bottom:before {\n  content: \"\\E252\"; }\n\n.glyphicon-triangle-top:before {\n  content: \"\\E253\"; }\n\n.glyphicon-console:before {\n  content: \"\\E254\"; }\n\n.glyphicon-superscript:before {\n  content: \"\\E255\"; }\n\n.glyphicon-subscript:before {\n  content: \"\\E256\"; }\n\n.glyphicon-menu-left:before {\n  content: \"\\E257\"; }\n\n.glyphicon-menu-right:before {\n  content: \"\\E258\"; }\n\n.glyphicon-menu-down:before {\n  content: \"\\E259\"; }\n\n.glyphicon-menu-up:before {\n  content: \"\\E260\"; }\n\n* {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\n*:before,\n*:after {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\nhtml {\n  font-size: 10px;\n  -webkit-tap-highlight-color: transparent; }\n\nbody {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: #333333;\n  background-color: #fff; }\n\ninput,\nbutton,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit; }\n\na {\n  color: #337ab7;\n  text-decoration: none; }\n  a:hover, a:focus {\n    color: #23527c;\n    text-decoration: underline; }\n  a:focus {\n    outline: 5px auto -webkit-focus-ring-color;\n    outline-offset: -2px; }\n\nfigure {\n  margin: 0; }\n\nimg {\n  vertical-align: middle; }\n\n.img-responsive {\n  display: block;\n  max-width: 100%;\n  height: auto; }\n\n.img-rounded {\n  border-radius: 6px; }\n\n.img-thumbnail {\n  padding: 4px;\n  line-height: 1.42857;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  -webkit-transition: all 0.2s ease-in-out;\n  -o-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n  display: inline-block;\n  max-width: 100%;\n  height: auto; }\n\n.img-circle {\n  border-radius: 50%; }\n\nhr {\n  margin-top: 20px;\n  margin-bottom: 20px;\n  border: 0;\n  border-top: 1px solid #eeeeee; }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto; }\n\n[role=\"button\"] {\n  cursor: pointer; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.1;\n  color: inherit; }\n  h1 small,\n  h1 .small, h2 small,\n  h2 .small, h3 small,\n  h3 .small, h4 small,\n  h4 .small, h5 small,\n  h5 .small, h6 small,\n  h6 .small,\n  .h1 small,\n  .h1 .small, .h2 small,\n  .h2 .small, .h3 small,\n  .h3 .small, .h4 small,\n  .h4 .small, .h5 small,\n  .h5 .small, .h6 small,\n  .h6 .small {\n    font-weight: normal;\n    line-height: 1;\n    color: #777777; }\n\nh1, .h1,\nh2, .h2,\nh3, .h3 {\n  margin-top: 20px;\n  margin-bottom: 10px; }\n  h1 small,\n  h1 .small, .h1 small,\n  .h1 .small,\n  h2 small,\n  h2 .small, .h2 small,\n  .h2 .small,\n  h3 small,\n  h3 .small, .h3 small,\n  .h3 .small {\n    font-size: 65%; }\n\nh4, .h4,\nh5, .h5,\nh6, .h6 {\n  margin-top: 10px;\n  margin-bottom: 10px; }\n  h4 small,\n  h4 .small, .h4 small,\n  .h4 .small,\n  h5 small,\n  h5 .small, .h5 small,\n  .h5 .small,\n  h6 small,\n  h6 .small, .h6 small,\n  .h6 .small {\n    font-size: 75%; }\n\nh1, .h1 {\n  font-size: 36px; }\n\nh2, .h2 {\n  font-size: 30px; }\n\nh3, .h3 {\n  font-size: 24px; }\n\nh4, .h4 {\n  font-size: 18px; }\n\nh5, .h5 {\n  font-size: 14px; }\n\nh6, .h6 {\n  font-size: 12px; }\n\np {\n  margin: 0 0 10px; }\n\n.lead {\n  margin-bottom: 20px;\n  font-size: 16px;\n  font-weight: 300;\n  line-height: 1.4; }\n  @media (min-width: 768px) {\n    .lead {\n      font-size: 21px; } }\n\nsmall,\n.small {\n  font-size: 85%; }\n\nmark,\n.mark {\n  background-color: #fcf8e3;\n  padding: .2em; }\n\n.text-left {\n  text-align: left; }\n\n.text-right {\n  text-align: right; }\n\n.text-center {\n  text-align: center; }\n\n.text-justify {\n  text-align: justify; }\n\n.text-nowrap {\n  white-space: nowrap; }\n\n.text-lowercase {\n  text-transform: lowercase; }\n\n.text-uppercase, .initialism {\n  text-transform: uppercase; }\n\n.text-capitalize {\n  text-transform: capitalize; }\n\n.text-muted {\n  color: #777777; }\n\n.text-primary {\n  color: #337ab7; }\n\na.text-primary:hover,\na.text-primary:focus {\n  color: #286090; }\n\n.text-success {\n  color: #3c763d; }\n\na.text-success:hover,\na.text-success:focus {\n  color: #2b542c; }\n\n.text-info {\n  color: #31708f; }\n\na.text-info:hover,\na.text-info:focus {\n  color: #245269; }\n\n.text-warning {\n  color: #8a6d3b; }\n\na.text-warning:hover,\na.text-warning:focus {\n  color: #66512c; }\n\n.text-danger {\n  color: #a94442; }\n\na.text-danger:hover,\na.text-danger:focus {\n  color: #843534; }\n\n.bg-primary {\n  color: #fff; }\n\n.bg-primary {\n  background-color: #337ab7; }\n\na.bg-primary:hover,\na.bg-primary:focus {\n  background-color: #286090; }\n\n.bg-success {\n  background-color: #dff0d8; }\n\na.bg-success:hover,\na.bg-success:focus {\n  background-color: #c1e2b3; }\n\n.bg-info {\n  background-color: #d9edf7; }\n\na.bg-info:hover,\na.bg-info:focus {\n  background-color: #afd9ee; }\n\n.bg-warning {\n  background-color: #fcf8e3; }\n\na.bg-warning:hover,\na.bg-warning:focus {\n  background-color: #f7ecb5; }\n\n.bg-danger {\n  background-color: #f2dede; }\n\na.bg-danger:hover,\na.bg-danger:focus {\n  background-color: #e4b9b9; }\n\n.page-header {\n  padding-bottom: 9px;\n  margin: 40px 0 20px;\n  border-bottom: 1px solid #eeeeee; }\n\nul,\nol {\n  margin-top: 0;\n  margin-bottom: 10px; }\n  ul ul,\n  ul ol,\n  ol ul,\n  ol ol {\n    margin-bottom: 0; }\n\n.list-unstyled {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline {\n  padding-left: 0;\n  list-style: none;\n  margin-left: -5px; }\n  .list-inline > li {\n    display: inline-block;\n    padding-left: 5px;\n    padding-right: 5px; }\n\ndl {\n  margin-top: 0;\n  margin-bottom: 20px; }\n\ndt,\ndd {\n  line-height: 1.42857; }\n\ndt {\n  font-weight: bold; }\n\ndd {\n  margin-left: 0; }\n\n.dl-horizontal dd:before, .dl-horizontal dd:after {\n  content: \" \";\n  display: table; }\n\n.dl-horizontal dd:after {\n  clear: both; }\n\n@media (min-width: 768px) {\n  .dl-horizontal dt {\n    float: left;\n    width: 160px;\n    clear: left;\n    text-align: right;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n  .dl-horizontal dd {\n    margin-left: 180px; } }\n\nabbr[title],\nabbr[data-original-title] {\n  cursor: help;\n  border-bottom: 1px dotted #777777; }\n\n.initialism {\n  font-size: 90%; }\n\nblockquote {\n  padding: 10px 20px;\n  margin: 0 0 20px;\n  font-size: 17.5px;\n  border-left: 5px solid #eeeeee; }\n  blockquote p:last-child,\n  blockquote ul:last-child,\n  blockquote ol:last-child {\n    margin-bottom: 0; }\n  blockquote footer,\n  blockquote small,\n  blockquote .small {\n    display: block;\n    font-size: 80%;\n    line-height: 1.42857;\n    color: #777777; }\n    blockquote footer:before,\n    blockquote small:before,\n    blockquote .small:before {\n      content: '\\2014   \\A0'; }\n\n.blockquote-reverse,\nblockquote.pull-right {\n  padding-right: 15px;\n  padding-left: 0;\n  border-right: 5px solid #eeeeee;\n  border-left: 0;\n  text-align: right; }\n  .blockquote-reverse footer:before,\n  .blockquote-reverse small:before,\n  .blockquote-reverse .small:before,\n  blockquote.pull-right footer:before,\n  blockquote.pull-right small:before,\n  blockquote.pull-right .small:before {\n    content: ''; }\n  .blockquote-reverse footer:after,\n  .blockquote-reverse small:after,\n  .blockquote-reverse .small:after,\n  blockquote.pull-right footer:after,\n  blockquote.pull-right small:after,\n  blockquote.pull-right .small:after {\n    content: '\\A0   \\2014'; }\n\naddress {\n  margin-bottom: 20px;\n  font-style: normal;\n  line-height: 1.42857; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Courier New\", monospace; }\n\ncode {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #c7254e;\n  background-color: #f9f2f4;\n  border-radius: 4px; }\n\nkbd {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #fff;\n  background-color: #333;\n  border-radius: 3px;\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25); }\n  kbd kbd {\n    padding: 0;\n    font-size: 100%;\n    font-weight: bold;\n    box-shadow: none; }\n\npre {\n  display: block;\n  padding: 9.5px;\n  margin: 0 0 10px;\n  font-size: 13px;\n  line-height: 1.42857;\n  word-break: break-all;\n  word-wrap: break-word;\n  color: #333333;\n  background-color: #f5f5f5;\n  border: 1px solid #ccc;\n  border-radius: 4px; }\n  pre code {\n    padding: 0;\n    font-size: inherit;\n    color: inherit;\n    white-space: pre-wrap;\n    background-color: transparent;\n    border-radius: 0; }\n\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll; }\n\n.container {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 15px;\n  padding-right: 15px; }\n  .container:before, .container:after {\n    content: \" \";\n    display: table; }\n  .container:after {\n    clear: both; }\n  @media (min-width: 768px) {\n    .container {\n      width: 750px; } }\n  @media (min-width: 992px) {\n    .container {\n      width: 970px; } }\n  @media (min-width: 1200px) {\n    .container {\n      width: 1170px; } }\n\n.container-fluid {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 15px;\n  padding-right: 15px; }\n  .container-fluid:before, .container-fluid:after {\n    content: \" \";\n    display: table; }\n  .container-fluid:after {\n    clear: both; }\n\n.row {\n  margin-left: -15px;\n  margin-right: -15px; }\n  .row:before, .row:after {\n    content: \" \";\n    display: table; }\n  .row:after {\n    clear: both; }\n\n.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {\n  position: relative;\n  min-height: 1px;\n  padding-left: 15px;\n  padding-right: 15px; }\n\n.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {\n  float: left; }\n\n.col-xs-1 {\n  width: 8.33333%; }\n\n.col-xs-2 {\n  width: 16.66667%; }\n\n.col-xs-3 {\n  width: 25%; }\n\n.col-xs-4 {\n  width: 33.33333%; }\n\n.col-xs-5 {\n  width: 41.66667%; }\n\n.col-xs-6 {\n  width: 50%; }\n\n.col-xs-7 {\n  width: 58.33333%; }\n\n.col-xs-8 {\n  width: 66.66667%; }\n\n.col-xs-9 {\n  width: 75%; }\n\n.col-xs-10 {\n  width: 83.33333%; }\n\n.col-xs-11 {\n  width: 91.66667%; }\n\n.col-xs-12 {\n  width: 100%; }\n\n.col-xs-pull-0 {\n  right: auto; }\n\n.col-xs-pull-1 {\n  right: 8.33333%; }\n\n.col-xs-pull-2 {\n  right: 16.66667%; }\n\n.col-xs-pull-3 {\n  right: 25%; }\n\n.col-xs-pull-4 {\n  right: 33.33333%; }\n\n.col-xs-pull-5 {\n  right: 41.66667%; }\n\n.col-xs-pull-6 {\n  right: 50%; }\n\n.col-xs-pull-7 {\n  right: 58.33333%; }\n\n.col-xs-pull-8 {\n  right: 66.66667%; }\n\n.col-xs-pull-9 {\n  right: 75%; }\n\n.col-xs-pull-10 {\n  right: 83.33333%; }\n\n.col-xs-pull-11 {\n  right: 91.66667%; }\n\n.col-xs-pull-12 {\n  right: 100%; }\n\n.col-xs-push-0 {\n  left: auto; }\n\n.col-xs-push-1 {\n  left: 8.33333%; }\n\n.col-xs-push-2 {\n  left: 16.66667%; }\n\n.col-xs-push-3 {\n  left: 25%; }\n\n.col-xs-push-4 {\n  left: 33.33333%; }\n\n.col-xs-push-5 {\n  left: 41.66667%; }\n\n.col-xs-push-6 {\n  left: 50%; }\n\n.col-xs-push-7 {\n  left: 58.33333%; }\n\n.col-xs-push-8 {\n  left: 66.66667%; }\n\n.col-xs-push-9 {\n  left: 75%; }\n\n.col-xs-push-10 {\n  left: 83.33333%; }\n\n.col-xs-push-11 {\n  left: 91.66667%; }\n\n.col-xs-push-12 {\n  left: 100%; }\n\n.col-xs-offset-0 {\n  margin-left: 0%; }\n\n.col-xs-offset-1 {\n  margin-left: 8.33333%; }\n\n.col-xs-offset-2 {\n  margin-left: 16.66667%; }\n\n.col-xs-offset-3 {\n  margin-left: 25%; }\n\n.col-xs-offset-4 {\n  margin-left: 33.33333%; }\n\n.col-xs-offset-5 {\n  margin-left: 41.66667%; }\n\n.col-xs-offset-6 {\n  margin-left: 50%; }\n\n.col-xs-offset-7 {\n  margin-left: 58.33333%; }\n\n.col-xs-offset-8 {\n  margin-left: 66.66667%; }\n\n.col-xs-offset-9 {\n  margin-left: 75%; }\n\n.col-xs-offset-10 {\n  margin-left: 83.33333%; }\n\n.col-xs-offset-11 {\n  margin-left: 91.66667%; }\n\n.col-xs-offset-12 {\n  margin-left: 100%; }\n\n@media (min-width: 768px) {\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {\n    float: left; }\n  .col-sm-1 {\n    width: 8.33333%; }\n  .col-sm-2 {\n    width: 16.66667%; }\n  .col-sm-3 {\n    width: 25%; }\n  .col-sm-4 {\n    width: 33.33333%; }\n  .col-sm-5 {\n    width: 41.66667%; }\n  .col-sm-6 {\n    width: 50%; }\n  .col-sm-7 {\n    width: 58.33333%; }\n  .col-sm-8 {\n    width: 66.66667%; }\n  .col-sm-9 {\n    width: 75%; }\n  .col-sm-10 {\n    width: 83.33333%; }\n  .col-sm-11 {\n    width: 91.66667%; }\n  .col-sm-12 {\n    width: 100%; }\n  .col-sm-pull-0 {\n    right: auto; }\n  .col-sm-pull-1 {\n    right: 8.33333%; }\n  .col-sm-pull-2 {\n    right: 16.66667%; }\n  .col-sm-pull-3 {\n    right: 25%; }\n  .col-sm-pull-4 {\n    right: 33.33333%; }\n  .col-sm-pull-5 {\n    right: 41.66667%; }\n  .col-sm-pull-6 {\n    right: 50%; }\n  .col-sm-pull-7 {\n    right: 58.33333%; }\n  .col-sm-pull-8 {\n    right: 66.66667%; }\n  .col-sm-pull-9 {\n    right: 75%; }\n  .col-sm-pull-10 {\n    right: 83.33333%; }\n  .col-sm-pull-11 {\n    right: 91.66667%; }\n  .col-sm-pull-12 {\n    right: 100%; }\n  .col-sm-push-0 {\n    left: auto; }\n  .col-sm-push-1 {\n    left: 8.33333%; }\n  .col-sm-push-2 {\n    left: 16.66667%; }\n  .col-sm-push-3 {\n    left: 25%; }\n  .col-sm-push-4 {\n    left: 33.33333%; }\n  .col-sm-push-5 {\n    left: 41.66667%; }\n  .col-sm-push-6 {\n    left: 50%; }\n  .col-sm-push-7 {\n    left: 58.33333%; }\n  .col-sm-push-8 {\n    left: 66.66667%; }\n  .col-sm-push-9 {\n    left: 75%; }\n  .col-sm-push-10 {\n    left: 83.33333%; }\n  .col-sm-push-11 {\n    left: 91.66667%; }\n  .col-sm-push-12 {\n    left: 100%; }\n  .col-sm-offset-0 {\n    margin-left: 0%; }\n  .col-sm-offset-1 {\n    margin-left: 8.33333%; }\n  .col-sm-offset-2 {\n    margin-left: 16.66667%; }\n  .col-sm-offset-3 {\n    margin-left: 25%; }\n  .col-sm-offset-4 {\n    margin-left: 33.33333%; }\n  .col-sm-offset-5 {\n    margin-left: 41.66667%; }\n  .col-sm-offset-6 {\n    margin-left: 50%; }\n  .col-sm-offset-7 {\n    margin-left: 58.33333%; }\n  .col-sm-offset-8 {\n    margin-left: 66.66667%; }\n  .col-sm-offset-9 {\n    margin-left: 75%; }\n  .col-sm-offset-10 {\n    margin-left: 83.33333%; }\n  .col-sm-offset-11 {\n    margin-left: 91.66667%; }\n  .col-sm-offset-12 {\n    margin-left: 100%; } }\n\n@media (min-width: 992px) {\n  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {\n    float: left; }\n  .col-md-1 {\n    width: 8.33333%; }\n  .col-md-2 {\n    width: 16.66667%; }\n  .col-md-3 {\n    width: 25%; }\n  .col-md-4 {\n    width: 33.33333%; }\n  .col-md-5 {\n    width: 41.66667%; }\n  .col-md-6 {\n    width: 50%; }\n  .col-md-7 {\n    width: 58.33333%; }\n  .col-md-8 {\n    width: 66.66667%; }\n  .col-md-9 {\n    width: 75%; }\n  .col-md-10 {\n    width: 83.33333%; }\n  .col-md-11 {\n    width: 91.66667%; }\n  .col-md-12 {\n    width: 100%; }\n  .col-md-pull-0 {\n    right: auto; }\n  .col-md-pull-1 {\n    right: 8.33333%; }\n  .col-md-pull-2 {\n    right: 16.66667%; }\n  .col-md-pull-3 {\n    right: 25%; }\n  .col-md-pull-4 {\n    right: 33.33333%; }\n  .col-md-pull-5 {\n    right: 41.66667%; }\n  .col-md-pull-6 {\n    right: 50%; }\n  .col-md-pull-7 {\n    right: 58.33333%; }\n  .col-md-pull-8 {\n    right: 66.66667%; }\n  .col-md-pull-9 {\n    right: 75%; }\n  .col-md-pull-10 {\n    right: 83.33333%; }\n  .col-md-pull-11 {\n    right: 91.66667%; }\n  .col-md-pull-12 {\n    right: 100%; }\n  .col-md-push-0 {\n    left: auto; }\n  .col-md-push-1 {\n    left: 8.33333%; }\n  .col-md-push-2 {\n    left: 16.66667%; }\n  .col-md-push-3 {\n    left: 25%; }\n  .col-md-push-4 {\n    left: 33.33333%; }\n  .col-md-push-5 {\n    left: 41.66667%; }\n  .col-md-push-6 {\n    left: 50%; }\n  .col-md-push-7 {\n    left: 58.33333%; }\n  .col-md-push-8 {\n    left: 66.66667%; }\n  .col-md-push-9 {\n    left: 75%; }\n  .col-md-push-10 {\n    left: 83.33333%; }\n  .col-md-push-11 {\n    left: 91.66667%; }\n  .col-md-push-12 {\n    left: 100%; }\n  .col-md-offset-0 {\n    margin-left: 0%; }\n  .col-md-offset-1 {\n    margin-left: 8.33333%; }\n  .col-md-offset-2 {\n    margin-left: 16.66667%; }\n  .col-md-offset-3 {\n    margin-left: 25%; }\n  .col-md-offset-4 {\n    margin-left: 33.33333%; }\n  .col-md-offset-5 {\n    margin-left: 41.66667%; }\n  .col-md-offset-6 {\n    margin-left: 50%; }\n  .col-md-offset-7 {\n    margin-left: 58.33333%; }\n  .col-md-offset-8 {\n    margin-left: 66.66667%; }\n  .col-md-offset-9 {\n    margin-left: 75%; }\n  .col-md-offset-10 {\n    margin-left: 83.33333%; }\n  .col-md-offset-11 {\n    margin-left: 91.66667%; }\n  .col-md-offset-12 {\n    margin-left: 100%; } }\n\n@media (min-width: 1200px) {\n  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {\n    float: left; }\n  .col-lg-1 {\n    width: 8.33333%; }\n  .col-lg-2 {\n    width: 16.66667%; }\n  .col-lg-3 {\n    width: 25%; }\n  .col-lg-4 {\n    width: 33.33333%; }\n  .col-lg-5 {\n    width: 41.66667%; }\n  .col-lg-6 {\n    width: 50%; }\n  .col-lg-7 {\n    width: 58.33333%; }\n  .col-lg-8 {\n    width: 66.66667%; }\n  .col-lg-9 {\n    width: 75%; }\n  .col-lg-10 {\n    width: 83.33333%; }\n  .col-lg-11 {\n    width: 91.66667%; }\n  .col-lg-12 {\n    width: 100%; }\n  .col-lg-pull-0 {\n    right: auto; }\n  .col-lg-pull-1 {\n    right: 8.33333%; }\n  .col-lg-pull-2 {\n    right: 16.66667%; }\n  .col-lg-pull-3 {\n    right: 25%; }\n  .col-lg-pull-4 {\n    right: 33.33333%; }\n  .col-lg-pull-5 {\n    right: 41.66667%; }\n  .col-lg-pull-6 {\n    right: 50%; }\n  .col-lg-pull-7 {\n    right: 58.33333%; }\n  .col-lg-pull-8 {\n    right: 66.66667%; }\n  .col-lg-pull-9 {\n    right: 75%; }\n  .col-lg-pull-10 {\n    right: 83.33333%; }\n  .col-lg-pull-11 {\n    right: 91.66667%; }\n  .col-lg-pull-12 {\n    right: 100%; }\n  .col-lg-push-0 {\n    left: auto; }\n  .col-lg-push-1 {\n    left: 8.33333%; }\n  .col-lg-push-2 {\n    left: 16.66667%; }\n  .col-lg-push-3 {\n    left: 25%; }\n  .col-lg-push-4 {\n    left: 33.33333%; }\n  .col-lg-push-5 {\n    left: 41.66667%; }\n  .col-lg-push-6 {\n    left: 50%; }\n  .col-lg-push-7 {\n    left: 58.33333%; }\n  .col-lg-push-8 {\n    left: 66.66667%; }\n  .col-lg-push-9 {\n    left: 75%; }\n  .col-lg-push-10 {\n    left: 83.33333%; }\n  .col-lg-push-11 {\n    left: 91.66667%; }\n  .col-lg-push-12 {\n    left: 100%; }\n  .col-lg-offset-0 {\n    margin-left: 0%; }\n  .col-lg-offset-1 {\n    margin-left: 8.33333%; }\n  .col-lg-offset-2 {\n    margin-left: 16.66667%; }\n  .col-lg-offset-3 {\n    margin-left: 25%; }\n  .col-lg-offset-4 {\n    margin-left: 33.33333%; }\n  .col-lg-offset-5 {\n    margin-left: 41.66667%; }\n  .col-lg-offset-6 {\n    margin-left: 50%; }\n  .col-lg-offset-7 {\n    margin-left: 58.33333%; }\n  .col-lg-offset-8 {\n    margin-left: 66.66667%; }\n  .col-lg-offset-9 {\n    margin-left: 75%; }\n  .col-lg-offset-10 {\n    margin-left: 83.33333%; }\n  .col-lg-offset-11 {\n    margin-left: 91.66667%; }\n  .col-lg-offset-12 {\n    margin-left: 100%; } }\n\ntable {\n  background-color: transparent; }\n\ncaption {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  color: #777777;\n  text-align: left; }\n\nth {\n  text-align: left; }\n\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 20px; }\n  .table > thead > tr > th,\n  .table > thead > tr > td,\n  .table > tbody > tr > th,\n  .table > tbody > tr > td,\n  .table > tfoot > tr > th,\n  .table > tfoot > tr > td {\n    padding: 8px;\n    line-height: 1.42857;\n    vertical-align: top;\n    border-top: 1px solid #ddd; }\n  .table > thead > tr > th {\n    vertical-align: bottom;\n    border-bottom: 2px solid #ddd; }\n  .table > caption + thead > tr:first-child > th,\n  .table > caption + thead > tr:first-child > td,\n  .table > colgroup + thead > tr:first-child > th,\n  .table > colgroup + thead > tr:first-child > td,\n  .table > thead:first-child > tr:first-child > th,\n  .table > thead:first-child > tr:first-child > td {\n    border-top: 0; }\n  .table > tbody + tbody {\n    border-top: 2px solid #ddd; }\n  .table .table {\n    background-color: #fff; }\n\n.table-condensed > thead > tr > th,\n.table-condensed > thead > tr > td,\n.table-condensed > tbody > tr > th,\n.table-condensed > tbody > tr > td,\n.table-condensed > tfoot > tr > th,\n.table-condensed > tfoot > tr > td {\n  padding: 5px; }\n\n.table-bordered {\n  border: 1px solid #ddd; }\n  .table-bordered > thead > tr > th,\n  .table-bordered > thead > tr > td,\n  .table-bordered > tbody > tr > th,\n  .table-bordered > tbody > tr > td,\n  .table-bordered > tfoot > tr > th,\n  .table-bordered > tfoot > tr > td {\n    border: 1px solid #ddd; }\n  .table-bordered > thead > tr > th,\n  .table-bordered > thead > tr > td {\n    border-bottom-width: 2px; }\n\n.table-striped > tbody > tr:nth-of-type(odd) {\n  background-color: #f9f9f9; }\n\n.table-hover > tbody > tr:hover {\n  background-color: #f5f5f5; }\n\ntable col[class*=\"col-\"] {\n  position: static;\n  float: none;\n  display: table-column; }\n\ntable td[class*=\"col-\"],\ntable th[class*=\"col-\"] {\n  position: static;\n  float: none;\n  display: table-cell; }\n\n.table > thead > tr > td.active,\n.table > thead > tr > th.active,\n.table > thead > tr.active > td,\n.table > thead > tr.active > th,\n.table > tbody > tr > td.active,\n.table > tbody > tr > th.active,\n.table > tbody > tr.active > td,\n.table > tbody > tr.active > th,\n.table > tfoot > tr > td.active,\n.table > tfoot > tr > th.active,\n.table > tfoot > tr.active > td,\n.table > tfoot > tr.active > th {\n  background-color: #f5f5f5; }\n\n.table-hover > tbody > tr > td.active:hover,\n.table-hover > tbody > tr > th.active:hover,\n.table-hover > tbody > tr.active:hover > td,\n.table-hover > tbody > tr:hover > .active,\n.table-hover > tbody > tr.active:hover > th {\n  background-color: #e8e8e8; }\n\n.table > thead > tr > td.success,\n.table > thead > tr > th.success,\n.table > thead > tr.success > td,\n.table > thead > tr.success > th,\n.table > tbody > tr > td.success,\n.table > tbody > tr > th.success,\n.table > tbody > tr.success > td,\n.table > tbody > tr.success > th,\n.table > tfoot > tr > td.success,\n.table > tfoot > tr > th.success,\n.table > tfoot > tr.success > td,\n.table > tfoot > tr.success > th {\n  background-color: #dff0d8; }\n\n.table-hover > tbody > tr > td.success:hover,\n.table-hover > tbody > tr > th.success:hover,\n.table-hover > tbody > tr.success:hover > td,\n.table-hover > tbody > tr:hover > .success,\n.table-hover > tbody > tr.success:hover > th {\n  background-color: #d0e9c6; }\n\n.table > thead > tr > td.info,\n.table > thead > tr > th.info,\n.table > thead > tr.info > td,\n.table > thead > tr.info > th,\n.table > tbody > tr > td.info,\n.table > tbody > tr > th.info,\n.table > tbody > tr.info > td,\n.table > tbody > tr.info > th,\n.table > tfoot > tr > td.info,\n.table > tfoot > tr > th.info,\n.table > tfoot > tr.info > td,\n.table > tfoot > tr.info > th {\n  background-color: #d9edf7; }\n\n.table-hover > tbody > tr > td.info:hover,\n.table-hover > tbody > tr > th.info:hover,\n.table-hover > tbody > tr.info:hover > td,\n.table-hover > tbody > tr:hover > .info,\n.table-hover > tbody > tr.info:hover > th {\n  background-color: #c4e3f3; }\n\n.table > thead > tr > td.warning,\n.table > thead > tr > th.warning,\n.table > thead > tr.warning > td,\n.table > thead > tr.warning > th,\n.table > tbody > tr > td.warning,\n.table > tbody > tr > th.warning,\n.table > tbody > tr.warning > td,\n.table > tbody > tr.warning > th,\n.table > tfoot > tr > td.warning,\n.table > tfoot > tr > th.warning,\n.table > tfoot > tr.warning > td,\n.table > tfoot > tr.warning > th {\n  background-color: #fcf8e3; }\n\n.table-hover > tbody > tr > td.warning:hover,\n.table-hover > tbody > tr > th.warning:hover,\n.table-hover > tbody > tr.warning:hover > td,\n.table-hover > tbody > tr:hover > .warning,\n.table-hover > tbody > tr.warning:hover > th {\n  background-color: #faf2cc; }\n\n.table > thead > tr > td.danger,\n.table > thead > tr > th.danger,\n.table > thead > tr.danger > td,\n.table > thead > tr.danger > th,\n.table > tbody > tr > td.danger,\n.table > tbody > tr > th.danger,\n.table > tbody > tr.danger > td,\n.table > tbody > tr.danger > th,\n.table > tfoot > tr > td.danger,\n.table > tfoot > tr > th.danger,\n.table > tfoot > tr.danger > td,\n.table > tfoot > tr.danger > th {\n  background-color: #f2dede; }\n\n.table-hover > tbody > tr > td.danger:hover,\n.table-hover > tbody > tr > th.danger:hover,\n.table-hover > tbody > tr.danger:hover > td,\n.table-hover > tbody > tr:hover > .danger,\n.table-hover > tbody > tr.danger:hover > th {\n  background-color: #ebcccc; }\n\n.table-responsive {\n  overflow-x: auto;\n  min-height: 0.01%; }\n  @media screen and (max-width: 767px) {\n    .table-responsive {\n      width: 100%;\n      margin-bottom: 15px;\n      overflow-y: hidden;\n      -ms-overflow-style: -ms-autohiding-scrollbar;\n      border: 1px solid #ddd; }\n      .table-responsive > .table {\n        margin-bottom: 0; }\n        .table-responsive > .table > thead > tr > th,\n        .table-responsive > .table > thead > tr > td,\n        .table-responsive > .table > tbody > tr > th,\n        .table-responsive > .table > tbody > tr > td,\n        .table-responsive > .table > tfoot > tr > th,\n        .table-responsive > .table > tfoot > tr > td {\n          white-space: nowrap; }\n      .table-responsive > .table-bordered {\n        border: 0; }\n        .table-responsive > .table-bordered > thead > tr > th:first-child,\n        .table-responsive > .table-bordered > thead > tr > td:first-child,\n        .table-responsive > .table-bordered > tbody > tr > th:first-child,\n        .table-responsive > .table-bordered > tbody > tr > td:first-child,\n        .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n        .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n          border-left: 0; }\n        .table-responsive > .table-bordered > thead > tr > th:last-child,\n        .table-responsive > .table-bordered > thead > tr > td:last-child,\n        .table-responsive > .table-bordered > tbody > tr > th:last-child,\n        .table-responsive > .table-bordered > tbody > tr > td:last-child,\n        .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n        .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n          border-right: 0; }\n        .table-responsive > .table-bordered > tbody > tr:last-child > th,\n        .table-responsive > .table-bordered > tbody > tr:last-child > td,\n        .table-responsive > .table-bordered > tfoot > tr:last-child > th,\n        .table-responsive > .table-bordered > tfoot > tr:last-child > td {\n          border-bottom: 0; } }\n\nfieldset {\n  padding: 0;\n  margin: 0;\n  border: 0;\n  min-width: 0; }\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: 20px;\n  font-size: 21px;\n  line-height: inherit;\n  color: #333333;\n  border: 0;\n  border-bottom: 1px solid #e5e5e5; }\n\nlabel {\n  display: inline-block;\n  max-width: 100%;\n  margin-bottom: 5px;\n  font-weight: bold; }\n\ninput[type=\"search\"] {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  margin: 4px 0 0;\n  margin-top: 1px \\9;\n  line-height: normal; }\n\ninput[type=\"file\"] {\n  display: block; }\n\ninput[type=\"range\"] {\n  display: block;\n  width: 100%; }\n\nselect[multiple],\nselect[size] {\n  height: auto; }\n\ninput[type=\"file\"]:focus,\ninput[type=\"radio\"]:focus,\ninput[type=\"checkbox\"]:focus {\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px; }\n\noutput {\n  display: block;\n  padding-top: 7px;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: #555555; }\n\n.form-control {\n  display: block;\n  width: 100%;\n  height: 34px;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857;\n  color: #555555;\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; }\n  .form-control:focus {\n    border-color: #66afe9;\n    outline: 0;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6); }\n  .form-control::-moz-placeholder {\n    color: #999;\n    opacity: 1; }\n  .form-control:-ms-input-placeholder {\n    color: #999; }\n  .form-control::-webkit-input-placeholder {\n    color: #999; }\n  .form-control::-ms-expand {\n    border: 0;\n    background-color: transparent; }\n  .form-control[disabled], .form-control[readonly],\n  fieldset[disabled] .form-control {\n    background-color: #eeeeee;\n    opacity: 1; }\n  .form-control[disabled],\n  fieldset[disabled] .form-control {\n    cursor: not-allowed; }\n\ntextarea.form-control {\n  height: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: none; }\n\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\n  input[type=\"date\"].form-control,\n  input[type=\"time\"].form-control,\n  input[type=\"datetime-local\"].form-control,\n  input[type=\"month\"].form-control {\n    line-height: 34px; }\n  input[type=\"date\"].input-sm, .input-group-sm > input[type=\"date\"].form-control,\n  .input-group-sm > input[type=\"date\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"date\"].btn,\n  .input-group-sm input[type=\"date\"],\n  input[type=\"time\"].input-sm,\n  .input-group-sm > input[type=\"time\"].form-control,\n  .input-group-sm > input[type=\"time\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"time\"].btn,\n  .input-group-sm\n  input[type=\"time\"],\n  input[type=\"datetime-local\"].input-sm,\n  .input-group-sm > input[type=\"datetime-local\"].form-control,\n  .input-group-sm > input[type=\"datetime-local\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"datetime-local\"].btn,\n  .input-group-sm\n  input[type=\"datetime-local\"],\n  input[type=\"month\"].input-sm,\n  .input-group-sm > input[type=\"month\"].form-control,\n  .input-group-sm > input[type=\"month\"].input-group-addon,\n  .input-group-sm > .input-group-btn > input[type=\"month\"].btn,\n  .input-group-sm\n  input[type=\"month\"] {\n    line-height: 30px; }\n  input[type=\"date\"].input-lg, .input-group-lg > input[type=\"date\"].form-control,\n  .input-group-lg > input[type=\"date\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"date\"].btn,\n  .input-group-lg input[type=\"date\"],\n  input[type=\"time\"].input-lg,\n  .input-group-lg > input[type=\"time\"].form-control,\n  .input-group-lg > input[type=\"time\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"time\"].btn,\n  .input-group-lg\n  input[type=\"time\"],\n  input[type=\"datetime-local\"].input-lg,\n  .input-group-lg > input[type=\"datetime-local\"].form-control,\n  .input-group-lg > input[type=\"datetime-local\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"datetime-local\"].btn,\n  .input-group-lg\n  input[type=\"datetime-local\"],\n  input[type=\"month\"].input-lg,\n  .input-group-lg > input[type=\"month\"].form-control,\n  .input-group-lg > input[type=\"month\"].input-group-addon,\n  .input-group-lg > .input-group-btn > input[type=\"month\"].btn,\n  .input-group-lg\n  input[type=\"month\"] {\n    line-height: 46px; } }\n\n.form-group {\n  margin-bottom: 15px; }\n\n.radio,\n.checkbox {\n  position: relative;\n  display: block;\n  margin-top: 10px;\n  margin-bottom: 10px; }\n  .radio label,\n  .checkbox label {\n    min-height: 20px;\n    padding-left: 20px;\n    margin-bottom: 0;\n    font-weight: normal;\n    cursor: pointer; }\n\n.radio input[type=\"radio\"],\n.radio-inline input[type=\"radio\"],\n.checkbox input[type=\"checkbox\"],\n.checkbox-inline input[type=\"checkbox\"] {\n  position: absolute;\n  margin-left: -20px;\n  margin-top: 4px \\9; }\n\n.radio + .radio,\n.checkbox + .checkbox {\n  margin-top: -5px; }\n\n.radio-inline,\n.checkbox-inline {\n  position: relative;\n  display: inline-block;\n  padding-left: 20px;\n  margin-bottom: 0;\n  vertical-align: middle;\n  font-weight: normal;\n  cursor: pointer; }\n\n.radio-inline + .radio-inline,\n.checkbox-inline + .checkbox-inline {\n  margin-top: 0;\n  margin-left: 10px; }\n\ninput[type=\"radio\"][disabled], input[type=\"radio\"].disabled,\nfieldset[disabled] input[type=\"radio\"],\ninput[type=\"checkbox\"][disabled],\ninput[type=\"checkbox\"].disabled,\nfieldset[disabled]\ninput[type=\"checkbox\"] {\n  cursor: not-allowed; }\n\n.radio-inline.disabled,\nfieldset[disabled] .radio-inline,\n.checkbox-inline.disabled,\nfieldset[disabled]\n.checkbox-inline {\n  cursor: not-allowed; }\n\n.radio.disabled label,\nfieldset[disabled] .radio label,\n.checkbox.disabled label,\nfieldset[disabled]\n.checkbox label {\n  cursor: not-allowed; }\n\n.form-control-static {\n  padding-top: 7px;\n  padding-bottom: 7px;\n  margin-bottom: 0;\n  min-height: 34px; }\n  .form-control-static.input-lg, .input-group-lg > .form-control-static.form-control,\n  .input-group-lg > .form-control-static.input-group-addon,\n  .input-group-lg > .input-group-btn > .form-control-static.btn, .form-control-static.input-sm, .input-group-sm > .form-control-static.form-control,\n  .input-group-sm > .form-control-static.input-group-addon,\n  .input-group-sm > .input-group-btn > .form-control-static.btn {\n    padding-left: 0;\n    padding-right: 0; }\n\n.input-sm, .input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px; }\n\nselect.input-sm, .input-group-sm > select.form-control,\n.input-group-sm > select.input-group-addon,\n.input-group-sm > .input-group-btn > select.btn {\n  height: 30px;\n  line-height: 30px; }\n\ntextarea.input-sm, .input-group-sm > textarea.form-control,\n.input-group-sm > textarea.input-group-addon,\n.input-group-sm > .input-group-btn > textarea.btn,\nselect[multiple].input-sm,\n.input-group-sm > select[multiple].form-control,\n.input-group-sm > select[multiple].input-group-addon,\n.input-group-sm > .input-group-btn > select[multiple].btn {\n  height: auto; }\n\n.form-group-sm .form-control {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px; }\n\n.form-group-sm select.form-control {\n  height: 30px;\n  line-height: 30px; }\n\n.form-group-sm textarea.form-control,\n.form-group-sm select[multiple].form-control {\n  height: auto; }\n\n.form-group-sm .form-control-static {\n  height: 30px;\n  min-height: 32px;\n  padding: 6px 10px;\n  font-size: 12px;\n  line-height: 1.5; }\n\n.input-lg, .input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33333;\n  border-radius: 6px; }\n\nselect.input-lg, .input-group-lg > select.form-control,\n.input-group-lg > select.input-group-addon,\n.input-group-lg > .input-group-btn > select.btn {\n  height: 46px;\n  line-height: 46px; }\n\ntextarea.input-lg, .input-group-lg > textarea.form-control,\n.input-group-lg > textarea.input-group-addon,\n.input-group-lg > .input-group-btn > textarea.btn,\nselect[multiple].input-lg,\n.input-group-lg > select[multiple].form-control,\n.input-group-lg > select[multiple].input-group-addon,\n.input-group-lg > .input-group-btn > select[multiple].btn {\n  height: auto; }\n\n.form-group-lg .form-control {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33333;\n  border-radius: 6px; }\n\n.form-group-lg select.form-control {\n  height: 46px;\n  line-height: 46px; }\n\n.form-group-lg textarea.form-control,\n.form-group-lg select[multiple].form-control {\n  height: auto; }\n\n.form-group-lg .form-control-static {\n  height: 46px;\n  min-height: 38px;\n  padding: 11px 16px;\n  font-size: 18px;\n  line-height: 1.33333; }\n\n.has-feedback {\n  position: relative; }\n  .has-feedback .form-control {\n    padding-right: 42.5px; }\n\n.form-control-feedback {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 2;\n  display: block;\n  width: 34px;\n  height: 34px;\n  line-height: 34px;\n  text-align: center;\n  pointer-events: none; }\n\n.input-lg + .form-control-feedback, .input-group-lg > .form-control + .form-control-feedback,\n.input-group-lg > .input-group-addon + .form-control-feedback,\n.input-group-lg > .input-group-btn > .btn + .form-control-feedback,\n.input-group-lg + .form-control-feedback,\n.form-group-lg .form-control + .form-control-feedback {\n  width: 46px;\n  height: 46px;\n  line-height: 46px; }\n\n.input-sm + .form-control-feedback, .input-group-sm > .form-control + .form-control-feedback,\n.input-group-sm > .input-group-addon + .form-control-feedback,\n.input-group-sm > .input-group-btn > .btn + .form-control-feedback,\n.input-group-sm + .form-control-feedback,\n.form-group-sm .form-control + .form-control-feedback {\n  width: 30px;\n  height: 30px;\n  line-height: 30px; }\n\n.has-success .help-block,\n.has-success .control-label,\n.has-success .radio,\n.has-success .checkbox,\n.has-success .radio-inline,\n.has-success .checkbox-inline,\n.has-success.radio label,\n.has-success.checkbox label,\n.has-success.radio-inline label,\n.has-success.checkbox-inline label {\n  color: #3c763d; }\n\n.has-success .form-control {\n  border-color: #3c763d;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .has-success .form-control:focus {\n    border-color: #2b542c;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168; }\n\n.has-success .input-group-addon {\n  color: #3c763d;\n  border-color: #3c763d;\n  background-color: #dff0d8; }\n\n.has-success .form-control-feedback {\n  color: #3c763d; }\n\n.has-warning .help-block,\n.has-warning .control-label,\n.has-warning .radio,\n.has-warning .checkbox,\n.has-warning .radio-inline,\n.has-warning .checkbox-inline,\n.has-warning.radio label,\n.has-warning.checkbox label,\n.has-warning.radio-inline label,\n.has-warning.checkbox-inline label {\n  color: #8a6d3b; }\n\n.has-warning .form-control {\n  border-color: #8a6d3b;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .has-warning .form-control:focus {\n    border-color: #66512c;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b; }\n\n.has-warning .input-group-addon {\n  color: #8a6d3b;\n  border-color: #8a6d3b;\n  background-color: #fcf8e3; }\n\n.has-warning .form-control-feedback {\n  color: #8a6d3b; }\n\n.has-error .help-block,\n.has-error .control-label,\n.has-error .radio,\n.has-error .checkbox,\n.has-error .radio-inline,\n.has-error .checkbox-inline,\n.has-error.radio label,\n.has-error.checkbox label,\n.has-error.radio-inline label,\n.has-error.checkbox-inline label {\n  color: #a94442; }\n\n.has-error .form-control {\n  border-color: #a94442;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\n  .has-error .form-control:focus {\n    border-color: #843534;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483; }\n\n.has-error .input-group-addon {\n  color: #a94442;\n  border-color: #a94442;\n  background-color: #f2dede; }\n\n.has-error .form-control-feedback {\n  color: #a94442; }\n\n.has-feedback label ~ .form-control-feedback {\n  top: 25px; }\n\n.has-feedback label.sr-only ~ .form-control-feedback {\n  top: 0; }\n\n.help-block {\n  display: block;\n  margin-top: 5px;\n  margin-bottom: 10px;\n  color: #737373; }\n\n@media (min-width: 768px) {\n  .form-inline .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle; }\n  .form-inline .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle; }\n  .form-inline .form-control-static {\n    display: inline-block; }\n  .form-inline .input-group {\n    display: inline-table;\n    vertical-align: middle; }\n    .form-inline .input-group .input-group-addon,\n    .form-inline .input-group .input-group-btn,\n    .form-inline .input-group .form-control {\n      width: auto; }\n  .form-inline .input-group > .form-control {\n    width: 100%; }\n  .form-inline .control-label {\n    margin-bottom: 0;\n    vertical-align: middle; }\n  .form-inline .radio,\n  .form-inline .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle; }\n    .form-inline .radio label,\n    .form-inline .checkbox label {\n      padding-left: 0; }\n  .form-inline .radio input[type=\"radio\"],\n  .form-inline .checkbox input[type=\"checkbox\"] {\n    position: relative;\n    margin-left: 0; }\n  .form-inline .has-feedback .form-control-feedback {\n    top: 0; } }\n\n.form-horizontal .radio,\n.form-horizontal .checkbox,\n.form-horizontal .radio-inline,\n.form-horizontal .checkbox-inline {\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-top: 7px; }\n\n.form-horizontal .radio,\n.form-horizontal .checkbox {\n  min-height: 27px; }\n\n.form-horizontal .form-group {\n  margin-left: -15px;\n  margin-right: -15px; }\n  .form-horizontal .form-group:before, .form-horizontal .form-group:after {\n    content: \" \";\n    display: table; }\n  .form-horizontal .form-group:after {\n    clear: both; }\n\n@media (min-width: 768px) {\n  .form-horizontal .control-label {\n    text-align: right;\n    margin-bottom: 0;\n    padding-top: 7px; } }\n\n.form-horizontal .has-feedback .form-control-feedback {\n  right: 15px; }\n\n@media (min-width: 768px) {\n  .form-horizontal .form-group-lg .control-label {\n    padding-top: 11px;\n    font-size: 18px; } }\n\n@media (min-width: 768px) {\n  .form-horizontal .form-group-sm .control-label {\n    padding-top: 6px;\n    font-size: 12px; } }\n\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  font-weight: normal;\n  text-align: center;\n  vertical-align: middle;\n  touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857;\n  border-radius: 4px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n  .btn:focus, .btn.focus, .btn:active:focus, .btn:active.focus, .btn.active:focus, .btn.active.focus {\n    outline: 5px auto -webkit-focus-ring-color;\n    outline-offset: -2px; }\n  .btn:hover, .btn:focus, .btn.focus {\n    color: #333;\n    text-decoration: none; }\n  .btn:active, .btn.active {\n    outline: 0;\n    background-image: none;\n    -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n  .btn.disabled, .btn[disabled],\n  fieldset[disabled] .btn {\n    cursor: not-allowed;\n    opacity: 0.65;\n    filter: alpha(opacity=65);\n    -webkit-box-shadow: none;\n    box-shadow: none; }\n\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none; }\n\n.btn-default {\n  color: #333;\n  background-color: #fff;\n  border-color: #ccc; }\n  .btn-default:focus, .btn-default.focus {\n    color: #333;\n    background-color: #e6e6e6;\n    border-color: #8c8c8c; }\n  .btn-default:hover {\n    color: #333;\n    background-color: #e6e6e6;\n    border-color: #adadad; }\n  .btn-default:active, .btn-default.active,\n  .open > .btn-default.dropdown-toggle {\n    color: #333;\n    background-color: #e6e6e6;\n    border-color: #adadad; }\n    .btn-default:active:hover, .btn-default:active:focus, .btn-default:active.focus, .btn-default.active:hover, .btn-default.active:focus, .btn-default.active.focus,\n    .open > .btn-default.dropdown-toggle:hover,\n    .open > .btn-default.dropdown-toggle:focus,\n    .open > .btn-default.dropdown-toggle.focus {\n      color: #333;\n      background-color: #d4d4d4;\n      border-color: #8c8c8c; }\n  .btn-default:active, .btn-default.active,\n  .open > .btn-default.dropdown-toggle {\n    background-image: none; }\n  .btn-default.disabled:hover, .btn-default.disabled:focus, .btn-default.disabled.focus, .btn-default[disabled]:hover, .btn-default[disabled]:focus, .btn-default[disabled].focus,\n  fieldset[disabled] .btn-default:hover,\n  fieldset[disabled] .btn-default:focus,\n  fieldset[disabled] .btn-default.focus {\n    background-color: #fff;\n    border-color: #ccc; }\n  .btn-default .badge {\n    color: #fff;\n    background-color: #333; }\n\n.btn-primary {\n  color: #fff;\n  background-color: #337ab7;\n  border-color: #2e6da4; }\n  .btn-primary:focus, .btn-primary.focus {\n    color: #fff;\n    background-color: #286090;\n    border-color: #122b40; }\n  .btn-primary:hover {\n    color: #fff;\n    background-color: #286090;\n    border-color: #204d74; }\n  .btn-primary:active, .btn-primary.active,\n  .open > .btn-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #286090;\n    border-color: #204d74; }\n    .btn-primary:active:hover, .btn-primary:active:focus, .btn-primary:active.focus, .btn-primary.active:hover, .btn-primary.active:focus, .btn-primary.active.focus,\n    .open > .btn-primary.dropdown-toggle:hover,\n    .open > .btn-primary.dropdown-toggle:focus,\n    .open > .btn-primary.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #204d74;\n      border-color: #122b40; }\n  .btn-primary:active, .btn-primary.active,\n  .open > .btn-primary.dropdown-toggle {\n    background-image: none; }\n  .btn-primary.disabled:hover, .btn-primary.disabled:focus, .btn-primary.disabled.focus, .btn-primary[disabled]:hover, .btn-primary[disabled]:focus, .btn-primary[disabled].focus,\n  fieldset[disabled] .btn-primary:hover,\n  fieldset[disabled] .btn-primary:focus,\n  fieldset[disabled] .btn-primary.focus {\n    background-color: #337ab7;\n    border-color: #2e6da4; }\n  .btn-primary .badge {\n    color: #337ab7;\n    background-color: #fff; }\n\n.btn-success {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #4cae4c; }\n  .btn-success:focus, .btn-success.focus {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #255625; }\n  .btn-success:hover {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #398439; }\n  .btn-success:active, .btn-success.active,\n  .open > .btn-success.dropdown-toggle {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #398439; }\n    .btn-success:active:hover, .btn-success:active:focus, .btn-success:active.focus, .btn-success.active:hover, .btn-success.active:focus, .btn-success.active.focus,\n    .open > .btn-success.dropdown-toggle:hover,\n    .open > .btn-success.dropdown-toggle:focus,\n    .open > .btn-success.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #398439;\n      border-color: #255625; }\n  .btn-success:active, .btn-success.active,\n  .open > .btn-success.dropdown-toggle {\n    background-image: none; }\n  .btn-success.disabled:hover, .btn-success.disabled:focus, .btn-success.disabled.focus, .btn-success[disabled]:hover, .btn-success[disabled]:focus, .btn-success[disabled].focus,\n  fieldset[disabled] .btn-success:hover,\n  fieldset[disabled] .btn-success:focus,\n  fieldset[disabled] .btn-success.focus {\n    background-color: #5cb85c;\n    border-color: #4cae4c; }\n  .btn-success .badge {\n    color: #5cb85c;\n    background-color: #fff; }\n\n.btn-info {\n  color: #fff;\n  background-color: #5bc0de;\n  border-color: #46b8da; }\n  .btn-info:focus, .btn-info.focus {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #1b6d85; }\n  .btn-info:hover {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #269abc; }\n  .btn-info:active, .btn-info.active,\n  .open > .btn-info.dropdown-toggle {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #269abc; }\n    .btn-info:active:hover, .btn-info:active:focus, .btn-info:active.focus, .btn-info.active:hover, .btn-info.active:focus, .btn-info.active.focus,\n    .open > .btn-info.dropdown-toggle:hover,\n    .open > .btn-info.dropdown-toggle:focus,\n    .open > .btn-info.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #269abc;\n      border-color: #1b6d85; }\n  .btn-info:active, .btn-info.active,\n  .open > .btn-info.dropdown-toggle {\n    background-image: none; }\n  .btn-info.disabled:hover, .btn-info.disabled:focus, .btn-info.disabled.focus, .btn-info[disabled]:hover, .btn-info[disabled]:focus, .btn-info[disabled].focus,\n  fieldset[disabled] .btn-info:hover,\n  fieldset[disabled] .btn-info:focus,\n  fieldset[disabled] .btn-info.focus {\n    background-color: #5bc0de;\n    border-color: #46b8da; }\n  .btn-info .badge {\n    color: #5bc0de;\n    background-color: #fff; }\n\n.btn-warning {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #eea236; }\n  .btn-warning:focus, .btn-warning.focus {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #985f0d; }\n  .btn-warning:hover {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #d58512; }\n  .btn-warning:active, .btn-warning.active,\n  .open > .btn-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #d58512; }\n    .btn-warning:active:hover, .btn-warning:active:focus, .btn-warning:active.focus, .btn-warning.active:hover, .btn-warning.active:focus, .btn-warning.active.focus,\n    .open > .btn-warning.dropdown-toggle:hover,\n    .open > .btn-warning.dropdown-toggle:focus,\n    .open > .btn-warning.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #d58512;\n      border-color: #985f0d; }\n  .btn-warning:active, .btn-warning.active,\n  .open > .btn-warning.dropdown-toggle {\n    background-image: none; }\n  .btn-warning.disabled:hover, .btn-warning.disabled:focus, .btn-warning.disabled.focus, .btn-warning[disabled]:hover, .btn-warning[disabled]:focus, .btn-warning[disabled].focus,\n  fieldset[disabled] .btn-warning:hover,\n  fieldset[disabled] .btn-warning:focus,\n  fieldset[disabled] .btn-warning.focus {\n    background-color: #f0ad4e;\n    border-color: #eea236; }\n  .btn-warning .badge {\n    color: #f0ad4e;\n    background-color: #fff; }\n\n.btn-danger {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d43f3a; }\n  .btn-danger:focus, .btn-danger.focus {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #761c19; }\n  .btn-danger:hover {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #ac2925; }\n  .btn-danger:active, .btn-danger.active,\n  .open > .btn-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #ac2925; }\n    .btn-danger:active:hover, .btn-danger:active:focus, .btn-danger:active.focus, .btn-danger.active:hover, .btn-danger.active:focus, .btn-danger.active.focus,\n    .open > .btn-danger.dropdown-toggle:hover,\n    .open > .btn-danger.dropdown-toggle:focus,\n    .open > .btn-danger.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #ac2925;\n      border-color: #761c19; }\n  .btn-danger:active, .btn-danger.active,\n  .open > .btn-danger.dropdown-toggle {\n    background-image: none; }\n  .btn-danger.disabled:hover, .btn-danger.disabled:focus, .btn-danger.disabled.focus, .btn-danger[disabled]:hover, .btn-danger[disabled]:focus, .btn-danger[disabled].focus,\n  fieldset[disabled] .btn-danger:hover,\n  fieldset[disabled] .btn-danger:focus,\n  fieldset[disabled] .btn-danger.focus {\n    background-color: #d9534f;\n    border-color: #d43f3a; }\n  .btn-danger .badge {\n    color: #d9534f;\n    background-color: #fff; }\n\n.btn-link {\n  color: #337ab7;\n  font-weight: normal;\n  border-radius: 0; }\n  .btn-link, .btn-link:active, .btn-link.active, .btn-link[disabled],\n  fieldset[disabled] .btn-link {\n    background-color: transparent;\n    -webkit-box-shadow: none;\n    box-shadow: none; }\n  .btn-link, .btn-link:hover, .btn-link:focus, .btn-link:active {\n    border-color: transparent; }\n  .btn-link:hover, .btn-link:focus {\n    color: #23527c;\n    text-decoration: underline;\n    background-color: transparent; }\n  .btn-link[disabled]:hover, .btn-link[disabled]:focus,\n  fieldset[disabled] .btn-link:hover,\n  fieldset[disabled] .btn-link:focus {\n    color: #777777;\n    text-decoration: none; }\n\n.btn-lg, .btn-group-lg > .btn {\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33333;\n  border-radius: 6px; }\n\n.btn-sm, .btn-group-sm > .btn {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px; }\n\n.btn-xs, .btn-group-xs > .btn {\n  padding: 1px 5px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px; }\n\n.btn-block {\n  display: block;\n  width: 100%; }\n\n.btn-block + .btn-block {\n  margin-top: 5px; }\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%; }\n\n.fade {\n  opacity: 0;\n  -webkit-transition: opacity 0.15s linear;\n  -o-transition: opacity 0.15s linear;\n  transition: opacity 0.15s linear; }\n  .fade.in {\n    opacity: 1; }\n\n.collapse {\n  display: none; }\n  .collapse.in {\n    display: block; }\n\ntr.collapse.in {\n  display: table-row; }\n\ntbody.collapse.in {\n  display: table-row-group; }\n\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  -webkit-transition-property: height, visibility;\n  transition-property: height, visibility;\n  -webkit-transition-duration: 0.35s;\n  transition-duration: 0.35s;\n  -webkit-transition-timing-function: ease;\n  transition-timing-function: ease; }\n\n.caret {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 2px;\n  vertical-align: middle;\n  border-top: 4px dashed;\n  border-top: 4px solid \\9;\n  border-right: 4px solid transparent;\n  border-left: 4px solid transparent; }\n\n.dropup,\n.dropdown {\n  position: relative; }\n\n.dropdown-toggle:focus {\n  outline: 0; }\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 160px;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  list-style: none;\n  font-size: 14px;\n  text-align: left;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  background-clip: padding-box; }\n  .dropdown-menu.pull-right {\n    right: 0;\n    left: auto; }\n  .dropdown-menu .divider {\n    height: 1px;\n    margin: 9px 0;\n    overflow: hidden;\n    background-color: #e5e5e5; }\n  .dropdown-menu > li > a {\n    display: block;\n    padding: 3px 20px;\n    clear: both;\n    font-weight: normal;\n    line-height: 1.42857;\n    color: #333333;\n    white-space: nowrap; }\n\n.dropdown-menu > li > a:hover, .dropdown-menu > li > a:focus {\n  text-decoration: none;\n  color: #262626;\n  background-color: #f5f5f5; }\n\n.dropdown-menu > .active > a, .dropdown-menu > .active > a:hover, .dropdown-menu > .active > a:focus {\n  color: #fff;\n  text-decoration: none;\n  outline: 0;\n  background-color: #337ab7; }\n\n.dropdown-menu > .disabled > a, .dropdown-menu > .disabled > a:hover, .dropdown-menu > .disabled > a:focus {\n  color: #777777; }\n\n.dropdown-menu > .disabled > a:hover, .dropdown-menu > .disabled > a:focus {\n  text-decoration: none;\n  background-color: transparent;\n  background-image: none;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);\n  cursor: not-allowed; }\n\n.open > .dropdown-menu {\n  display: block; }\n\n.open > a {\n  outline: 0; }\n\n.dropdown-menu-right {\n  left: auto;\n  right: 0; }\n\n.dropdown-menu-left {\n  left: 0;\n  right: auto; }\n\n.dropdown-header {\n  display: block;\n  padding: 3px 20px;\n  font-size: 12px;\n  line-height: 1.42857;\n  color: #777777;\n  white-space: nowrap; }\n\n.dropdown-backdrop {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  z-index: 990; }\n\n.pull-right > .dropdown-menu {\n  right: 0;\n  left: auto; }\n\n.dropup .caret,\n.navbar-fixed-bottom .dropdown .caret {\n  border-top: 0;\n  border-bottom: 4px dashed;\n  border-bottom: 4px solid \\9;\n  content: \"\"; }\n\n.dropup .dropdown-menu,\n.navbar-fixed-bottom .dropdown .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 2px; }\n\n@media (min-width: 768px) {\n  .navbar-right .dropdown-menu {\n    right: 0;\n    left: auto; }\n  .navbar-right .dropdown-menu-left {\n    left: 0;\n    right: auto; } }\n\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle; }\n  .btn-group > .btn,\n  .btn-group-vertical > .btn {\n    position: relative;\n    float: left; }\n    .btn-group > .btn:hover, .btn-group > .btn:focus, .btn-group > .btn:active, .btn-group > .btn.active,\n    .btn-group-vertical > .btn:hover,\n    .btn-group-vertical > .btn:focus,\n    .btn-group-vertical > .btn:active,\n    .btn-group-vertical > .btn.active {\n      z-index: 2; }\n\n.btn-group .btn + .btn,\n.btn-group .btn + .btn-group,\n.btn-group .btn-group + .btn,\n.btn-group .btn-group + .btn-group {\n  margin-left: -1px; }\n\n.btn-toolbar {\n  margin-left: -5px; }\n  .btn-toolbar:before, .btn-toolbar:after {\n    content: \" \";\n    display: table; }\n  .btn-toolbar:after {\n    clear: both; }\n  .btn-toolbar .btn,\n  .btn-toolbar .btn-group,\n  .btn-toolbar .input-group {\n    float: left; }\n  .btn-toolbar > .btn,\n  .btn-toolbar > .btn-group,\n  .btn-toolbar > .input-group {\n    margin-left: 5px; }\n\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0; }\n\n.btn-group > .btn:first-child {\n  margin-left: 0; }\n  .btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0; }\n\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group > .btn-group {\n  float: left; }\n\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0; }\n\n.btn-group > .btn + .dropdown-toggle {\n  padding-left: 8px;\n  padding-right: 8px; }\n\n.btn-group > .btn-lg + .dropdown-toggle, .btn-group-lg.btn-group > .btn + .dropdown-toggle {\n  padding-left: 12px;\n  padding-right: 12px; }\n\n.btn-group.open .dropdown-toggle {\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n  .btn-group.open .dropdown-toggle.btn-link {\n    -webkit-box-shadow: none;\n    box-shadow: none; }\n\n.btn .caret {\n  margin-left: 0; }\n\n.btn-lg .caret, .btn-group-lg > .btn .caret {\n  border-width: 5px 5px 0;\n  border-bottom-width: 0; }\n\n.dropup .btn-lg .caret, .dropup .btn-group-lg > .btn .caret {\n  border-width: 0 5px 5px; }\n\n.btn-group-vertical > .btn,\n.btn-group-vertical > .btn-group,\n.btn-group-vertical > .btn-group > .btn {\n  display: block;\n  float: none;\n  width: 100%;\n  max-width: 100%; }\n\n.btn-group-vertical > .btn-group:before, .btn-group-vertical > .btn-group:after {\n  content: \" \";\n  display: table; }\n\n.btn-group-vertical > .btn-group:after {\n  clear: both; }\n\n.btn-group-vertical > .btn-group > .btn {\n  float: none; }\n\n.btn-group-vertical > .btn + .btn,\n.btn-group-vertical > .btn + .btn-group,\n.btn-group-vertical > .btn-group + .btn,\n.btn-group-vertical > .btn-group + .btn-group {\n  margin-top: -1px;\n  margin-left: 0; }\n\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn:first-child:not(:last-child) {\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn:last-child:not(:first-child) {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px; }\n\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group-justified {\n  display: table;\n  width: 100%;\n  table-layout: fixed;\n  border-collapse: separate; }\n  .btn-group-justified > .btn,\n  .btn-group-justified > .btn-group {\n    float: none;\n    display: table-cell;\n    width: 1%; }\n  .btn-group-justified > .btn-group .btn {\n    width: 100%; }\n  .btn-group-justified > .btn-group .dropdown-menu {\n    left: auto; }\n\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none; }\n\n.input-group {\n  position: relative;\n  display: table;\n  border-collapse: separate; }\n  .input-group[class*=\"col-\"] {\n    float: none;\n    padding-left: 0;\n    padding-right: 0; }\n  .input-group .form-control {\n    position: relative;\n    z-index: 2;\n    float: left;\n    width: 100%;\n    margin-bottom: 0; }\n    .input-group .form-control:focus {\n      z-index: 3; }\n\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: table-cell; }\n  .input-group-addon:not(:first-child):not(:last-child),\n  .input-group-btn:not(:first-child):not(:last-child),\n  .input-group .form-control:not(:first-child):not(:last-child) {\n    border-radius: 0; }\n\n.input-group-addon,\n.input-group-btn {\n  width: 1%;\n  white-space: nowrap;\n  vertical-align: middle; }\n\n.input-group-addon {\n  padding: 6px 12px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 1;\n  color: #555555;\n  text-align: center;\n  background-color: #eeeeee;\n  border: 1px solid #ccc;\n  border-radius: 4px; }\n  .input-group-addon.input-sm,\n  .input-group-sm > .input-group-addon,\n  .input-group-sm > .input-group-btn > .input-group-addon.btn {\n    padding: 5px 10px;\n    font-size: 12px;\n    border-radius: 3px; }\n  .input-group-addon.input-lg,\n  .input-group-lg > .input-group-addon,\n  .input-group-lg > .input-group-btn > .input-group-addon.btn {\n    padding: 10px 16px;\n    font-size: 18px;\n    border-radius: 6px; }\n  .input-group-addon input[type=\"radio\"],\n  .input-group-addon input[type=\"checkbox\"] {\n    margin-top: 0; }\n\n.input-group .form-control:first-child,\n.input-group-addon:first-child,\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .btn-group > .btn,\n.input-group-btn:first-child > .dropdown-toggle,\n.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.input-group-addon:first-child {\n  border-right: 0; }\n\n.input-group .form-control:last-child,\n.input-group-addon:last-child,\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .btn-group > .btn,\n.input-group-btn:last-child > .dropdown-toggle,\n.input-group-btn:first-child > .btn:not(:first-child),\n.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.input-group-addon:last-child {\n  border-left: 0; }\n\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap; }\n  .input-group-btn > .btn {\n    position: relative; }\n    .input-group-btn > .btn + .btn {\n      margin-left: -1px; }\n    .input-group-btn > .btn:hover, .input-group-btn > .btn:focus, .input-group-btn > .btn:active {\n      z-index: 2; }\n  .input-group-btn:first-child > .btn,\n  .input-group-btn:first-child > .btn-group {\n    margin-right: -1px; }\n  .input-group-btn:last-child > .btn,\n  .input-group-btn:last-child > .btn-group {\n    z-index: 2;\n    margin-left: -1px; }\n\n.nav {\n  margin-bottom: 0;\n  padding-left: 0;\n  list-style: none; }\n  .nav:before, .nav:after {\n    content: \" \";\n    display: table; }\n  .nav:after {\n    clear: both; }\n  .nav > li {\n    position: relative;\n    display: block; }\n    .nav > li > a {\n      position: relative;\n      display: block;\n      padding: 10px 15px; }\n      .nav > li > a:hover, .nav > li > a:focus {\n        text-decoration: none;\n        background-color: #eeeeee; }\n    .nav > li.disabled > a {\n      color: #777777; }\n      .nav > li.disabled > a:hover, .nav > li.disabled > a:focus {\n        color: #777777;\n        text-decoration: none;\n        background-color: transparent;\n        cursor: not-allowed; }\n  .nav .open > a, .nav .open > a:hover, .nav .open > a:focus {\n    background-color: #eeeeee;\n    border-color: #337ab7; }\n  .nav .nav-divider {\n    height: 1px;\n    margin: 9px 0;\n    overflow: hidden;\n    background-color: #e5e5e5; }\n  .nav > li > a > img {\n    max-width: none; }\n\n.nav-tabs {\n  border-bottom: 1px solid #ddd; }\n  .nav-tabs > li {\n    float: left;\n    margin-bottom: -1px; }\n    .nav-tabs > li > a {\n      margin-right: 2px;\n      line-height: 1.42857;\n      border: 1px solid transparent;\n      border-radius: 4px 4px 0 0; }\n      .nav-tabs > li > a:hover {\n        border-color: #eeeeee #eeeeee #ddd; }\n    .nav-tabs > li.active > a, .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus {\n      color: #555555;\n      background-color: #fff;\n      border: 1px solid #ddd;\n      border-bottom-color: transparent;\n      cursor: default; }\n\n.nav-pills > li {\n  float: left; }\n  .nav-pills > li > a {\n    border-radius: 4px; }\n  .nav-pills > li + li {\n    margin-left: 2px; }\n  .nav-pills > li.active > a, .nav-pills > li.active > a:hover, .nav-pills > li.active > a:focus {\n    color: #fff;\n    background-color: #337ab7; }\n\n.nav-stacked > li {\n  float: none; }\n  .nav-stacked > li + li {\n    margin-top: 2px;\n    margin-left: 0; }\n\n.nav-justified, .nav-tabs.nav-justified {\n  width: 100%; }\n  .nav-justified > li, .nav-tabs.nav-justified > li {\n    float: none; }\n    .nav-justified > li > a, .nav-tabs.nav-justified > li > a {\n      text-align: center;\n      margin-bottom: 5px; }\n  .nav-justified > .dropdown .dropdown-menu {\n    top: auto;\n    left: auto; }\n  @media (min-width: 768px) {\n    .nav-justified > li, .nav-tabs.nav-justified > li {\n      display: table-cell;\n      width: 1%; }\n      .nav-justified > li > a, .nav-tabs.nav-justified > li > a {\n        margin-bottom: 0; } }\n\n.nav-tabs-justified, .nav-tabs.nav-justified {\n  border-bottom: 0; }\n  .nav-tabs-justified > li > a, .nav-tabs.nav-justified > li > a {\n    margin-right: 0;\n    border-radius: 4px; }\n  .nav-tabs-justified > .active > a, .nav-tabs.nav-justified > .active > a,\n  .nav-tabs-justified > .active > a:hover, .nav-tabs.nav-justified > .active > a:hover,\n  .nav-tabs-justified > .active > a:focus, .nav-tabs.nav-justified > .active > a:focus {\n    border: 1px solid #ddd; }\n  @media (min-width: 768px) {\n    .nav-tabs-justified > li > a, .nav-tabs.nav-justified > li > a {\n      border-bottom: 1px solid #ddd;\n      border-radius: 4px 4px 0 0; }\n    .nav-tabs-justified > .active > a, .nav-tabs.nav-justified > .active > a,\n    .nav-tabs-justified > .active > a:hover, .nav-tabs.nav-justified > .active > a:hover,\n    .nav-tabs-justified > .active > a:focus, .nav-tabs.nav-justified > .active > a:focus {\n      border-bottom-color: #fff; } }\n\n.tab-content > .tab-pane {\n  display: none; }\n\n.tab-content > .active {\n  display: block; }\n\n.nav-tabs .dropdown-menu {\n  margin-top: -1px;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.navbar {\n  position: relative;\n  min-height: 50px;\n  margin-bottom: 20px;\n  border: 1px solid transparent; }\n  .navbar:before, .navbar:after {\n    content: \" \";\n    display: table; }\n  .navbar:after {\n    clear: both; }\n  @media (min-width: 768px) {\n    .navbar {\n      border-radius: 4px; } }\n\n.navbar-header:before, .navbar-header:after {\n  content: \" \";\n  display: table; }\n\n.navbar-header:after {\n  clear: both; }\n\n@media (min-width: 768px) {\n  .navbar-header {\n    float: left; } }\n\n.navbar-collapse {\n  overflow-x: visible;\n  padding-right: 15px;\n  padding-left: 15px;\n  border-top: 1px solid transparent;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);\n  -webkit-overflow-scrolling: touch; }\n  .navbar-collapse:before, .navbar-collapse:after {\n    content: \" \";\n    display: table; }\n  .navbar-collapse:after {\n    clear: both; }\n  .navbar-collapse.in {\n    overflow-y: auto; }\n  @media (min-width: 768px) {\n    .navbar-collapse {\n      width: auto;\n      border-top: 0;\n      box-shadow: none; }\n      .navbar-collapse.collapse {\n        display: block !important;\n        height: auto !important;\n        padding-bottom: 0;\n        overflow: visible !important; }\n      .navbar-collapse.in {\n        overflow-y: visible; }\n      .navbar-fixed-top .navbar-collapse,\n      .navbar-static-top .navbar-collapse,\n      .navbar-fixed-bottom .navbar-collapse {\n        padding-left: 0;\n        padding-right: 0; } }\n\n.navbar-fixed-top .navbar-collapse,\n.navbar-fixed-bottom .navbar-collapse {\n  max-height: 340px; }\n  @media (max-device-width: 480px) and (orientation: landscape) {\n    .navbar-fixed-top .navbar-collapse,\n    .navbar-fixed-bottom .navbar-collapse {\n      max-height: 200px; } }\n\n.container > .navbar-header,\n.container > .navbar-collapse,\n.container-fluid > .navbar-header,\n.container-fluid > .navbar-collapse {\n  margin-right: -15px;\n  margin-left: -15px; }\n  @media (min-width: 768px) {\n    .container > .navbar-header,\n    .container > .navbar-collapse,\n    .container-fluid > .navbar-header,\n    .container-fluid > .navbar-collapse {\n      margin-right: 0;\n      margin-left: 0; } }\n\n.navbar-static-top {\n  z-index: 1000;\n  border-width: 0 0 1px; }\n  @media (min-width: 768px) {\n    .navbar-static-top {\n      border-radius: 0; } }\n\n.navbar-fixed-top,\n.navbar-fixed-bottom {\n  position: fixed;\n  right: 0;\n  left: 0;\n  z-index: 1030; }\n  @media (min-width: 768px) {\n    .navbar-fixed-top,\n    .navbar-fixed-bottom {\n      border-radius: 0; } }\n\n.navbar-fixed-top {\n  top: 0;\n  border-width: 0 0 1px; }\n\n.navbar-fixed-bottom {\n  bottom: 0;\n  margin-bottom: 0;\n  border-width: 1px 0 0; }\n\n.navbar-brand {\n  float: left;\n  padding: 15px 15px;\n  font-size: 18px;\n  line-height: 20px;\n  height: 50px; }\n  .navbar-brand:hover, .navbar-brand:focus {\n    text-decoration: none; }\n  .navbar-brand > img {\n    display: block; }\n  @media (min-width: 768px) {\n    .navbar > .container .navbar-brand,\n    .navbar > .container-fluid .navbar-brand {\n      margin-left: -15px; } }\n\n.navbar-toggle {\n  position: relative;\n  float: right;\n  margin-right: 15px;\n  padding: 9px 10px;\n  margin-top: 8px;\n  margin-bottom: 8px;\n  background-color: transparent;\n  background-image: none;\n  border: 1px solid transparent;\n  border-radius: 4px; }\n  .navbar-toggle:focus {\n    outline: 0; }\n  .navbar-toggle .icon-bar {\n    display: block;\n    width: 22px;\n    height: 2px;\n    border-radius: 1px; }\n  .navbar-toggle .icon-bar + .icon-bar {\n    margin-top: 4px; }\n  @media (min-width: 768px) {\n    .navbar-toggle {\n      display: none; } }\n\n.navbar-nav {\n  margin: 7.5px -15px; }\n  .navbar-nav > li > a {\n    padding-top: 10px;\n    padding-bottom: 10px;\n    line-height: 20px; }\n  @media (max-width: 767px) {\n    .navbar-nav .open .dropdown-menu {\n      position: static;\n      float: none;\n      width: auto;\n      margin-top: 0;\n      background-color: transparent;\n      border: 0;\n      box-shadow: none; }\n      .navbar-nav .open .dropdown-menu > li > a,\n      .navbar-nav .open .dropdown-menu .dropdown-header {\n        padding: 5px 15px 5px 25px; }\n      .navbar-nav .open .dropdown-menu > li > a {\n        line-height: 20px; }\n        .navbar-nav .open .dropdown-menu > li > a:hover, .navbar-nav .open .dropdown-menu > li > a:focus {\n          background-image: none; } }\n  @media (min-width: 768px) {\n    .navbar-nav {\n      float: left;\n      margin: 0; }\n      .navbar-nav > li {\n        float: left; }\n        .navbar-nav > li > a {\n          padding-top: 15px;\n          padding-bottom: 15px; } }\n\n.navbar-form {\n  margin-left: -15px;\n  margin-right: -15px;\n  padding: 10px 15px;\n  border-top: 1px solid transparent;\n  border-bottom: 1px solid transparent;\n  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\n  margin-top: 8px;\n  margin-bottom: 8px; }\n  @media (min-width: 768px) {\n    .navbar-form .form-group {\n      display: inline-block;\n      margin-bottom: 0;\n      vertical-align: middle; }\n    .navbar-form .form-control {\n      display: inline-block;\n      width: auto;\n      vertical-align: middle; }\n    .navbar-form .form-control-static {\n      display: inline-block; }\n    .navbar-form .input-group {\n      display: inline-table;\n      vertical-align: middle; }\n      .navbar-form .input-group .input-group-addon,\n      .navbar-form .input-group .input-group-btn,\n      .navbar-form .input-group .form-control {\n        width: auto; }\n    .navbar-form .input-group > .form-control {\n      width: 100%; }\n    .navbar-form .control-label {\n      margin-bottom: 0;\n      vertical-align: middle; }\n    .navbar-form .radio,\n    .navbar-form .checkbox {\n      display: inline-block;\n      margin-top: 0;\n      margin-bottom: 0;\n      vertical-align: middle; }\n      .navbar-form .radio label,\n      .navbar-form .checkbox label {\n        padding-left: 0; }\n    .navbar-form .radio input[type=\"radio\"],\n    .navbar-form .checkbox input[type=\"checkbox\"] {\n      position: relative;\n      margin-left: 0; }\n    .navbar-form .has-feedback .form-control-feedback {\n      top: 0; } }\n  @media (max-width: 767px) {\n    .navbar-form .form-group {\n      margin-bottom: 5px; }\n      .navbar-form .form-group:last-child {\n        margin-bottom: 0; } }\n  @media (min-width: 768px) {\n    .navbar-form {\n      width: auto;\n      border: 0;\n      margin-left: 0;\n      margin-right: 0;\n      padding-top: 0;\n      padding-bottom: 0;\n      -webkit-box-shadow: none;\n      box-shadow: none; } }\n\n.navbar-nav > li > .dropdown-menu {\n  margin-top: 0;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {\n  margin-bottom: 0;\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.navbar-btn {\n  margin-top: 8px;\n  margin-bottom: 8px; }\n  .navbar-btn.btn-sm, .btn-group-sm > .navbar-btn.btn {\n    margin-top: 10px;\n    margin-bottom: 10px; }\n  .navbar-btn.btn-xs, .btn-group-xs > .navbar-btn.btn {\n    margin-top: 14px;\n    margin-bottom: 14px; }\n\n.navbar-text {\n  margin-top: 15px;\n  margin-bottom: 15px; }\n  @media (min-width: 768px) {\n    .navbar-text {\n      float: left;\n      margin-left: 15px;\n      margin-right: 15px; } }\n\n@media (min-width: 768px) {\n  .navbar-left {\n    float: left !important; }\n  .navbar-right {\n    float: right !important;\n    margin-right: -15px; }\n    .navbar-right ~ .navbar-right {\n      margin-right: 0; } }\n\n.navbar-default {\n  background-color: #f8f8f8;\n  border-color: #e7e7e7; }\n  .navbar-default .navbar-brand {\n    color: #777; }\n    .navbar-default .navbar-brand:hover, .navbar-default .navbar-brand:focus {\n      color: #5e5e5e;\n      background-color: transparent; }\n  .navbar-default .navbar-text {\n    color: #777; }\n  .navbar-default .navbar-nav > li > a {\n    color: #777; }\n    .navbar-default .navbar-nav > li > a:hover, .navbar-default .navbar-nav > li > a:focus {\n      color: #333;\n      background-color: transparent; }\n  .navbar-default .navbar-nav > .active > a, .navbar-default .navbar-nav > .active > a:hover, .navbar-default .navbar-nav > .active > a:focus {\n    color: #555;\n    background-color: #e7e7e7; }\n  .navbar-default .navbar-nav > .disabled > a, .navbar-default .navbar-nav > .disabled > a:hover, .navbar-default .navbar-nav > .disabled > a:focus {\n    color: #ccc;\n    background-color: transparent; }\n  .navbar-default .navbar-toggle {\n    border-color: #ddd; }\n    .navbar-default .navbar-toggle:hover, .navbar-default .navbar-toggle:focus {\n      background-color: #ddd; }\n    .navbar-default .navbar-toggle .icon-bar {\n      background-color: #888; }\n  .navbar-default .navbar-collapse,\n  .navbar-default .navbar-form {\n    border-color: #e7e7e7; }\n  .navbar-default .navbar-nav > .open > a, .navbar-default .navbar-nav > .open > a:hover, .navbar-default .navbar-nav > .open > a:focus {\n    background-color: #e7e7e7;\n    color: #555; }\n  @media (max-width: 767px) {\n    .navbar-default .navbar-nav .open .dropdown-menu > li > a {\n      color: #777; }\n      .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover, .navbar-default .navbar-nav .open .dropdown-menu > li > a:focus {\n        color: #333;\n        background-color: transparent; }\n    .navbar-default .navbar-nav .open .dropdown-menu > .active > a, .navbar-default .navbar-nav .open .dropdown-menu > .active > a:hover, .navbar-default .navbar-nav .open .dropdown-menu > .active > a:focus {\n      color: #555;\n      background-color: #e7e7e7; }\n    .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a, .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:hover, .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n      color: #ccc;\n      background-color: transparent; } }\n  .navbar-default .navbar-link {\n    color: #777; }\n    .navbar-default .navbar-link:hover {\n      color: #333; }\n  .navbar-default .btn-link {\n    color: #777; }\n    .navbar-default .btn-link:hover, .navbar-default .btn-link:focus {\n      color: #333; }\n    .navbar-default .btn-link[disabled]:hover, .navbar-default .btn-link[disabled]:focus,\n    fieldset[disabled] .navbar-default .btn-link:hover,\n    fieldset[disabled] .navbar-default .btn-link:focus {\n      color: #ccc; }\n\n.navbar-inverse {\n  background-color: #222;\n  border-color: #090909; }\n  .navbar-inverse .navbar-brand {\n    color: #9d9d9d; }\n    .navbar-inverse .navbar-brand:hover, .navbar-inverse .navbar-brand:focus {\n      color: #fff;\n      background-color: transparent; }\n  .navbar-inverse .navbar-text {\n    color: #9d9d9d; }\n  .navbar-inverse .navbar-nav > li > a {\n    color: #9d9d9d; }\n    .navbar-inverse .navbar-nav > li > a:hover, .navbar-inverse .navbar-nav > li > a:focus {\n      color: #fff;\n      background-color: transparent; }\n  .navbar-inverse .navbar-nav > .active > a, .navbar-inverse .navbar-nav > .active > a:hover, .navbar-inverse .navbar-nav > .active > a:focus {\n    color: #fff;\n    background-color: #090909; }\n  .navbar-inverse .navbar-nav > .disabled > a, .navbar-inverse .navbar-nav > .disabled > a:hover, .navbar-inverse .navbar-nav > .disabled > a:focus {\n    color: #444;\n    background-color: transparent; }\n  .navbar-inverse .navbar-toggle {\n    border-color: #333; }\n    .navbar-inverse .navbar-toggle:hover, .navbar-inverse .navbar-toggle:focus {\n      background-color: #333; }\n    .navbar-inverse .navbar-toggle .icon-bar {\n      background-color: #fff; }\n  .navbar-inverse .navbar-collapse,\n  .navbar-inverse .navbar-form {\n    border-color: #101010; }\n  .navbar-inverse .navbar-nav > .open > a, .navbar-inverse .navbar-nav > .open > a:hover, .navbar-inverse .navbar-nav > .open > a:focus {\n    background-color: #090909;\n    color: #fff; }\n  @media (max-width: 767px) {\n    .navbar-inverse .navbar-nav .open .dropdown-menu > .dropdown-header {\n      border-color: #090909; }\n    .navbar-inverse .navbar-nav .open .dropdown-menu .divider {\n      background-color: #090909; }\n    .navbar-inverse .navbar-nav .open .dropdown-menu > li > a {\n      color: #9d9d9d; }\n      .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover, .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus {\n        color: #fff;\n        background-color: transparent; }\n    .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a, .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover, .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus {\n      color: #fff;\n      background-color: #090909; }\n    .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a, .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:hover, .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n      color: #444;\n      background-color: transparent; } }\n  .navbar-inverse .navbar-link {\n    color: #9d9d9d; }\n    .navbar-inverse .navbar-link:hover {\n      color: #fff; }\n  .navbar-inverse .btn-link {\n    color: #9d9d9d; }\n    .navbar-inverse .btn-link:hover, .navbar-inverse .btn-link:focus {\n      color: #fff; }\n    .navbar-inverse .btn-link[disabled]:hover, .navbar-inverse .btn-link[disabled]:focus,\n    fieldset[disabled] .navbar-inverse .btn-link:hover,\n    fieldset[disabled] .navbar-inverse .btn-link:focus {\n      color: #444; }\n\n.breadcrumb {\n  padding: 8px 15px;\n  margin-bottom: 20px;\n  list-style: none;\n  background-color: #f5f5f5;\n  border-radius: 4px; }\n  .breadcrumb > li {\n    display: inline-block; }\n    .breadcrumb > li + li:before {\n      content: \"/\\A0\";\n      padding: 0 5px;\n      color: #ccc; }\n  .breadcrumb > .active {\n    color: #777777; }\n\n.pagination {\n  display: inline-block;\n  padding-left: 0;\n  margin: 20px 0;\n  border-radius: 4px; }\n  .pagination > li {\n    display: inline; }\n    .pagination > li > a,\n    .pagination > li > span {\n      position: relative;\n      float: left;\n      padding: 6px 12px;\n      line-height: 1.42857;\n      text-decoration: none;\n      color: #337ab7;\n      background-color: #fff;\n      border: 1px solid #ddd;\n      margin-left: -1px; }\n    .pagination > li:first-child > a,\n    .pagination > li:first-child > span {\n      margin-left: 0;\n      border-bottom-left-radius: 4px;\n      border-top-left-radius: 4px; }\n    .pagination > li:last-child > a,\n    .pagination > li:last-child > span {\n      border-bottom-right-radius: 4px;\n      border-top-right-radius: 4px; }\n  .pagination > li > a:hover, .pagination > li > a:focus,\n  .pagination > li > span:hover,\n  .pagination > li > span:focus {\n    z-index: 2;\n    color: #23527c;\n    background-color: #eeeeee;\n    border-color: #ddd; }\n  .pagination > .active > a, .pagination > .active > a:hover, .pagination > .active > a:focus,\n  .pagination > .active > span,\n  .pagination > .active > span:hover,\n  .pagination > .active > span:focus {\n    z-index: 3;\n    color: #fff;\n    background-color: #337ab7;\n    border-color: #337ab7;\n    cursor: default; }\n  .pagination > .disabled > span,\n  .pagination > .disabled > span:hover,\n  .pagination > .disabled > span:focus,\n  .pagination > .disabled > a,\n  .pagination > .disabled > a:hover,\n  .pagination > .disabled > a:focus {\n    color: #777777;\n    background-color: #fff;\n    border-color: #ddd;\n    cursor: not-allowed; }\n\n.pagination-lg > li > a,\n.pagination-lg > li > span {\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33333; }\n\n.pagination-lg > li:first-child > a,\n.pagination-lg > li:first-child > span {\n  border-bottom-left-radius: 6px;\n  border-top-left-radius: 6px; }\n\n.pagination-lg > li:last-child > a,\n.pagination-lg > li:last-child > span {\n  border-bottom-right-radius: 6px;\n  border-top-right-radius: 6px; }\n\n.pagination-sm > li > a,\n.pagination-sm > li > span {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5; }\n\n.pagination-sm > li:first-child > a,\n.pagination-sm > li:first-child > span {\n  border-bottom-left-radius: 3px;\n  border-top-left-radius: 3px; }\n\n.pagination-sm > li:last-child > a,\n.pagination-sm > li:last-child > span {\n  border-bottom-right-radius: 3px;\n  border-top-right-radius: 3px; }\n\n.pager {\n  padding-left: 0;\n  margin: 20px 0;\n  list-style: none;\n  text-align: center; }\n  .pager:before, .pager:after {\n    content: \" \";\n    display: table; }\n  .pager:after {\n    clear: both; }\n  .pager li {\n    display: inline; }\n    .pager li > a,\n    .pager li > span {\n      display: inline-block;\n      padding: 5px 14px;\n      background-color: #fff;\n      border: 1px solid #ddd;\n      border-radius: 15px; }\n    .pager li > a:hover,\n    .pager li > a:focus {\n      text-decoration: none;\n      background-color: #eeeeee; }\n  .pager .next > a,\n  .pager .next > span {\n    float: right; }\n  .pager .previous > a,\n  .pager .previous > span {\n    float: left; }\n  .pager .disabled > a,\n  .pager .disabled > a:hover,\n  .pager .disabled > a:focus,\n  .pager .disabled > span {\n    color: #777777;\n    background-color: #fff;\n    cursor: not-allowed; }\n\n.label {\n  display: inline;\n  padding: .2em .6em .3em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: .25em; }\n  .label:empty {\n    display: none; }\n  .btn .label {\n    position: relative;\n    top: -1px; }\n\na.label:hover, a.label:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.label-default {\n  background-color: #777777; }\n  .label-default[href]:hover, .label-default[href]:focus {\n    background-color: #5e5e5e; }\n\n.label-primary {\n  background-color: #337ab7; }\n  .label-primary[href]:hover, .label-primary[href]:focus {\n    background-color: #286090; }\n\n.label-success {\n  background-color: #5cb85c; }\n  .label-success[href]:hover, .label-success[href]:focus {\n    background-color: #449d44; }\n\n.label-info {\n  background-color: #5bc0de; }\n  .label-info[href]:hover, .label-info[href]:focus {\n    background-color: #31b0d5; }\n\n.label-warning {\n  background-color: #f0ad4e; }\n  .label-warning[href]:hover, .label-warning[href]:focus {\n    background-color: #ec971f; }\n\n.label-danger {\n  background-color: #d9534f; }\n  .label-danger[href]:hover, .label-danger[href]:focus {\n    background-color: #c9302c; }\n\n.badge {\n  display: inline-block;\n  min-width: 10px;\n  padding: 3px 7px;\n  font-size: 12px;\n  font-weight: bold;\n  color: #fff;\n  line-height: 1;\n  vertical-align: middle;\n  white-space: nowrap;\n  text-align: center;\n  background-color: #777777;\n  border-radius: 10px; }\n  .badge:empty {\n    display: none; }\n  .btn .badge {\n    position: relative;\n    top: -1px; }\n  .btn-xs .badge, .btn-group-xs > .btn .badge,\n  .btn-group-xs > .btn .badge {\n    top: 0;\n    padding: 1px 5px; }\n  .list-group-item.active > .badge,\n  .nav-pills > .active > a > .badge {\n    color: #337ab7;\n    background-color: #fff; }\n  .list-group-item > .badge {\n    float: right; }\n  .list-group-item > .badge + .badge {\n    margin-right: 5px; }\n  .nav-pills > li > a > .badge {\n    margin-left: 3px; }\n\na.badge:hover, a.badge:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.jumbotron {\n  padding-top: 30px;\n  padding-bottom: 30px;\n  margin-bottom: 30px;\n  color: inherit;\n  background-color: #eeeeee; }\n  .jumbotron h1,\n  .jumbotron .h1 {\n    color: inherit; }\n  .jumbotron p {\n    margin-bottom: 15px;\n    font-size: 21px;\n    font-weight: 200; }\n  .jumbotron > hr {\n    border-top-color: #d5d5d5; }\n  .container .jumbotron,\n  .container-fluid .jumbotron {\n    border-radius: 6px;\n    padding-left: 15px;\n    padding-right: 15px; }\n  .jumbotron .container {\n    max-width: 100%; }\n  @media screen and (min-width: 768px) {\n    .jumbotron {\n      padding-top: 48px;\n      padding-bottom: 48px; }\n      .container .jumbotron,\n      .container-fluid .jumbotron {\n        padding-left: 60px;\n        padding-right: 60px; }\n      .jumbotron h1,\n      .jumbotron .h1 {\n        font-size: 63px; } }\n\n.thumbnail {\n  display: block;\n  padding: 4px;\n  margin-bottom: 20px;\n  line-height: 1.42857;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  -webkit-transition: border 0.2s ease-in-out;\n  -o-transition: border 0.2s ease-in-out;\n  transition: border 0.2s ease-in-out; }\n  .thumbnail > img,\n  .thumbnail a > img {\n    display: block;\n    max-width: 100%;\n    height: auto;\n    margin-left: auto;\n    margin-right: auto; }\n  .thumbnail .caption {\n    padding: 9px;\n    color: #333333; }\n\na.thumbnail:hover,\na.thumbnail:focus,\na.thumbnail.active {\n  border-color: #337ab7; }\n\n.alert {\n  padding: 15px;\n  margin-bottom: 20px;\n  border: 1px solid transparent;\n  border-radius: 4px; }\n  .alert h4 {\n    margin-top: 0;\n    color: inherit; }\n  .alert .alert-link {\n    font-weight: bold; }\n  .alert > p,\n  .alert > ul {\n    margin-bottom: 0; }\n  .alert > p + p {\n    margin-top: 5px; }\n\n.alert-dismissable,\n.alert-dismissible {\n  padding-right: 35px; }\n  .alert-dismissable .close,\n  .alert-dismissible .close {\n    position: relative;\n    top: -2px;\n    right: -21px;\n    color: inherit; }\n\n.alert-success {\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n  color: #3c763d; }\n  .alert-success hr {\n    border-top-color: #c9e2b3; }\n  .alert-success .alert-link {\n    color: #2b542c; }\n\n.alert-info {\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n  color: #31708f; }\n  .alert-info hr {\n    border-top-color: #a6e1ec; }\n  .alert-info .alert-link {\n    color: #245269; }\n\n.alert-warning {\n  background-color: #fcf8e3;\n  border-color: #faebcc;\n  color: #8a6d3b; }\n  .alert-warning hr {\n    border-top-color: #f7e1b5; }\n  .alert-warning .alert-link {\n    color: #66512c; }\n\n.alert-danger {\n  background-color: #f2dede;\n  border-color: #ebccd1;\n  color: #a94442; }\n  .alert-danger hr {\n    border-top-color: #e4b9c0; }\n  .alert-danger .alert-link {\n    color: #843534; }\n\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0; }\n  to {\n    background-position: 0 0; } }\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0; }\n  to {\n    background-position: 0 0; } }\n\n.progress {\n  overflow: hidden;\n  height: 20px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1); }\n\n.progress-bar {\n  float: left;\n  width: 0%;\n  height: 100%;\n  font-size: 12px;\n  line-height: 20px;\n  color: #fff;\n  text-align: center;\n  background-color: #337ab7;\n  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  -webkit-transition: width 0.6s ease;\n  -o-transition: width 0.6s ease;\n  transition: width 0.6s ease; }\n\n.progress-striped .progress-bar,\n.progress-bar-striped {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 40px 40px; }\n\n.progress.active .progress-bar,\n.progress-bar.active {\n  -webkit-animation: progress-bar-stripes 2s linear infinite;\n  -o-animation: progress-bar-stripes 2s linear infinite;\n  animation: progress-bar-stripes 2s linear infinite; }\n\n.progress-bar-success {\n  background-color: #5cb85c; }\n  .progress-striped .progress-bar-success {\n    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }\n\n.progress-bar-info {\n  background-color: #5bc0de; }\n  .progress-striped .progress-bar-info {\n    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }\n\n.progress-bar-warning {\n  background-color: #f0ad4e; }\n  .progress-striped .progress-bar-warning {\n    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }\n\n.progress-bar-danger {\n  background-color: #d9534f; }\n  .progress-striped .progress-bar-danger {\n    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }\n\n.media {\n  margin-top: 15px; }\n  .media:first-child {\n    margin-top: 0; }\n\n.media,\n.media-body {\n  zoom: 1;\n  overflow: hidden; }\n\n.media-body {\n  width: 10000px; }\n\n.media-object {\n  display: block; }\n  .media-object.img-thumbnail {\n    max-width: none; }\n\n.media-right,\n.media > .pull-right {\n  padding-left: 10px; }\n\n.media-left,\n.media > .pull-left {\n  padding-right: 10px; }\n\n.media-left,\n.media-right,\n.media-body {\n  display: table-cell;\n  vertical-align: top; }\n\n.media-middle {\n  vertical-align: middle; }\n\n.media-bottom {\n  vertical-align: bottom; }\n\n.media-heading {\n  margin-top: 0;\n  margin-bottom: 5px; }\n\n.media-list {\n  padding-left: 0;\n  list-style: none; }\n\n.list-group {\n  margin-bottom: 20px;\n  padding-left: 0; }\n\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid #ddd; }\n  .list-group-item:first-child {\n    border-top-right-radius: 4px;\n    border-top-left-radius: 4px; }\n  .list-group-item:last-child {\n    margin-bottom: 0;\n    border-bottom-right-radius: 4px;\n    border-bottom-left-radius: 4px; }\n\na.list-group-item,\nbutton.list-group-item {\n  color: #555; }\n  a.list-group-item .list-group-item-heading,\n  button.list-group-item .list-group-item-heading {\n    color: #333; }\n  a.list-group-item:hover, a.list-group-item:focus,\n  button.list-group-item:hover,\n  button.list-group-item:focus {\n    text-decoration: none;\n    color: #555;\n    background-color: #f5f5f5; }\n\nbutton.list-group-item {\n  width: 100%;\n  text-align: left; }\n\n.list-group-item.disabled, .list-group-item.disabled:hover, .list-group-item.disabled:focus {\n  background-color: #eeeeee;\n  color: #777777;\n  cursor: not-allowed; }\n  .list-group-item.disabled .list-group-item-heading, .list-group-item.disabled:hover .list-group-item-heading, .list-group-item.disabled:focus .list-group-item-heading {\n    color: inherit; }\n  .list-group-item.disabled .list-group-item-text, .list-group-item.disabled:hover .list-group-item-text, .list-group-item.disabled:focus .list-group-item-text {\n    color: #777777; }\n\n.list-group-item.active, .list-group-item.active:hover, .list-group-item.active:focus {\n  z-index: 2;\n  color: #fff;\n  background-color: #337ab7;\n  border-color: #337ab7; }\n  .list-group-item.active .list-group-item-heading,\n  .list-group-item.active .list-group-item-heading > small,\n  .list-group-item.active .list-group-item-heading > .small, .list-group-item.active:hover .list-group-item-heading,\n  .list-group-item.active:hover .list-group-item-heading > small,\n  .list-group-item.active:hover .list-group-item-heading > .small, .list-group-item.active:focus .list-group-item-heading,\n  .list-group-item.active:focus .list-group-item-heading > small,\n  .list-group-item.active:focus .list-group-item-heading > .small {\n    color: inherit; }\n  .list-group-item.active .list-group-item-text, .list-group-item.active:hover .list-group-item-text, .list-group-item.active:focus .list-group-item-text {\n    color: #c7ddef; }\n\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #dff0d8; }\n\na.list-group-item-success,\nbutton.list-group-item-success {\n  color: #3c763d; }\n  a.list-group-item-success .list-group-item-heading,\n  button.list-group-item-success .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-success:hover, a.list-group-item-success:focus,\n  button.list-group-item-success:hover,\n  button.list-group-item-success:focus {\n    color: #3c763d;\n    background-color: #d0e9c6; }\n  a.list-group-item-success.active, a.list-group-item-success.active:hover, a.list-group-item-success.active:focus,\n  button.list-group-item-success.active,\n  button.list-group-item-success.active:hover,\n  button.list-group-item-success.active:focus {\n    color: #fff;\n    background-color: #3c763d;\n    border-color: #3c763d; }\n\n.list-group-item-info {\n  color: #31708f;\n  background-color: #d9edf7; }\n\na.list-group-item-info,\nbutton.list-group-item-info {\n  color: #31708f; }\n  a.list-group-item-info .list-group-item-heading,\n  button.list-group-item-info .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-info:hover, a.list-group-item-info:focus,\n  button.list-group-item-info:hover,\n  button.list-group-item-info:focus {\n    color: #31708f;\n    background-color: #c4e3f3; }\n  a.list-group-item-info.active, a.list-group-item-info.active:hover, a.list-group-item-info.active:focus,\n  button.list-group-item-info.active,\n  button.list-group-item-info.active:hover,\n  button.list-group-item-info.active:focus {\n    color: #fff;\n    background-color: #31708f;\n    border-color: #31708f; }\n\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3; }\n\na.list-group-item-warning,\nbutton.list-group-item-warning {\n  color: #8a6d3b; }\n  a.list-group-item-warning .list-group-item-heading,\n  button.list-group-item-warning .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-warning:hover, a.list-group-item-warning:focus,\n  button.list-group-item-warning:hover,\n  button.list-group-item-warning:focus {\n    color: #8a6d3b;\n    background-color: #faf2cc; }\n  a.list-group-item-warning.active, a.list-group-item-warning.active:hover, a.list-group-item-warning.active:focus,\n  button.list-group-item-warning.active,\n  button.list-group-item-warning.active:hover,\n  button.list-group-item-warning.active:focus {\n    color: #fff;\n    background-color: #8a6d3b;\n    border-color: #8a6d3b; }\n\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #f2dede; }\n\na.list-group-item-danger,\nbutton.list-group-item-danger {\n  color: #a94442; }\n  a.list-group-item-danger .list-group-item-heading,\n  button.list-group-item-danger .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-danger:hover, a.list-group-item-danger:focus,\n  button.list-group-item-danger:hover,\n  button.list-group-item-danger:focus {\n    color: #a94442;\n    background-color: #ebcccc; }\n  a.list-group-item-danger.active, a.list-group-item-danger.active:hover, a.list-group-item-danger.active:focus,\n  button.list-group-item-danger.active,\n  button.list-group-item-danger.active:hover,\n  button.list-group-item-danger.active:focus {\n    color: #fff;\n    background-color: #a94442;\n    border-color: #a94442; }\n\n.list-group-item-heading {\n  margin-top: 0;\n  margin-bottom: 5px; }\n\n.list-group-item-text {\n  margin-bottom: 0;\n  line-height: 1.3; }\n\n.panel {\n  margin-bottom: 20px;\n  background-color: #fff;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05); }\n\n.panel-body {\n  padding: 15px; }\n  .panel-body:before, .panel-body:after {\n    content: \" \";\n    display: table; }\n  .panel-body:after {\n    clear: both; }\n\n.panel-heading {\n  padding: 10px 15px;\n  border-bottom: 1px solid transparent;\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px; }\n  .panel-heading > .dropdown .dropdown-toggle {\n    color: inherit; }\n\n.panel-title {\n  margin-top: 0;\n  margin-bottom: 0;\n  font-size: 16px;\n  color: inherit; }\n  .panel-title > a,\n  .panel-title > small,\n  .panel-title > .small,\n  .panel-title > small > a,\n  .panel-title > .small > a {\n    color: inherit; }\n\n.panel-footer {\n  padding: 10px 15px;\n  background-color: #f5f5f5;\n  border-top: 1px solid #ddd;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px; }\n\n.panel > .list-group,\n.panel > .panel-collapse > .list-group {\n  margin-bottom: 0; }\n  .panel > .list-group .list-group-item,\n  .panel > .panel-collapse > .list-group .list-group-item {\n    border-width: 1px 0;\n    border-radius: 0; }\n  .panel > .list-group:first-child .list-group-item:first-child,\n  .panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {\n    border-top: 0;\n    border-top-right-radius: 3px;\n    border-top-left-radius: 3px; }\n  .panel > .list-group:last-child .list-group-item:last-child,\n  .panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {\n    border-bottom: 0;\n    border-bottom-right-radius: 3px;\n    border-bottom-left-radius: 3px; }\n\n.panel > .panel-heading + .panel-collapse > .list-group .list-group-item:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.panel-heading + .list-group .list-group-item:first-child {\n  border-top-width: 0; }\n\n.list-group + .panel-footer {\n  border-top-width: 0; }\n\n.panel > .table,\n.panel > .table-responsive > .table,\n.panel > .panel-collapse > .table {\n  margin-bottom: 0; }\n  .panel > .table caption,\n  .panel > .table-responsive > .table caption,\n  .panel > .panel-collapse > .table caption {\n    padding-left: 15px;\n    padding-right: 15px; }\n\n.panel > .table:first-child,\n.panel > .table-responsive:first-child > .table:first-child {\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px; }\n  .panel > .table:first-child > thead:first-child > tr:first-child,\n  .panel > .table:first-child > tbody:first-child > tr:first-child,\n  .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child,\n  .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child {\n    border-top-left-radius: 3px;\n    border-top-right-radius: 3px; }\n    .panel > .table:first-child > thead:first-child > tr:first-child td:first-child,\n    .panel > .table:first-child > thead:first-child > tr:first-child th:first-child,\n    .panel > .table:first-child > tbody:first-child > tr:first-child td:first-child,\n    .panel > .table:first-child > tbody:first-child > tr:first-child th:first-child,\n    .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child,\n    .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child,\n    .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child,\n    .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {\n      border-top-left-radius: 3px; }\n    .panel > .table:first-child > thead:first-child > tr:first-child td:last-child,\n    .panel > .table:first-child > thead:first-child > tr:first-child th:last-child,\n    .panel > .table:first-child > tbody:first-child > tr:first-child td:last-child,\n    .panel > .table:first-child > tbody:first-child > tr:first-child th:last-child,\n    .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child,\n    .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child,\n    .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child,\n    .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {\n      border-top-right-radius: 3px; }\n\n.panel > .table:last-child,\n.panel > .table-responsive:last-child > .table:last-child {\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px; }\n  .panel > .table:last-child > tbody:last-child > tr:last-child,\n  .panel > .table:last-child > tfoot:last-child > tr:last-child,\n  .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child,\n  .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child {\n    border-bottom-left-radius: 3px;\n    border-bottom-right-radius: 3px; }\n    .panel > .table:last-child > tbody:last-child > tr:last-child td:first-child,\n    .panel > .table:last-child > tbody:last-child > tr:last-child th:first-child,\n    .panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\n    .panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child,\n    .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child,\n    .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child,\n    .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\n    .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {\n      border-bottom-left-radius: 3px; }\n    .panel > .table:last-child > tbody:last-child > tr:last-child td:last-child,\n    .panel > .table:last-child > tbody:last-child > tr:last-child th:last-child,\n    .panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\n    .panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child,\n    .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child,\n    .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child,\n    .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\n    .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {\n      border-bottom-right-radius: 3px; }\n\n.panel > .panel-body + .table,\n.panel > .panel-body + .table-responsive,\n.panel > .table + .panel-body,\n.panel > .table-responsive + .panel-body {\n  border-top: 1px solid #ddd; }\n\n.panel > .table > tbody:first-child > tr:first-child th,\n.panel > .table > tbody:first-child > tr:first-child td {\n  border-top: 0; }\n\n.panel > .table-bordered,\n.panel > .table-responsive > .table-bordered {\n  border: 0; }\n  .panel > .table-bordered > thead > tr > th:first-child,\n  .panel > .table-bordered > thead > tr > td:first-child,\n  .panel > .table-bordered > tbody > tr > th:first-child,\n  .panel > .table-bordered > tbody > tr > td:first-child,\n  .panel > .table-bordered > tfoot > tr > th:first-child,\n  .panel > .table-bordered > tfoot > tr > td:first-child,\n  .panel > .table-responsive > .table-bordered > thead > tr > th:first-child,\n  .panel > .table-responsive > .table-bordered > thead > tr > td:first-child,\n  .panel > .table-responsive > .table-bordered > tbody > tr > th:first-child,\n  .panel > .table-responsive > .table-bordered > tbody > tr > td:first-child,\n  .panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n  .panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n    border-left: 0; }\n  .panel > .table-bordered > thead > tr > th:last-child,\n  .panel > .table-bordered > thead > tr > td:last-child,\n  .panel > .table-bordered > tbody > tr > th:last-child,\n  .panel > .table-bordered > tbody > tr > td:last-child,\n  .panel > .table-bordered > tfoot > tr > th:last-child,\n  .panel > .table-bordered > tfoot > tr > td:last-child,\n  .panel > .table-responsive > .table-bordered > thead > tr > th:last-child,\n  .panel > .table-responsive > .table-bordered > thead > tr > td:last-child,\n  .panel > .table-responsive > .table-bordered > tbody > tr > th:last-child,\n  .panel > .table-responsive > .table-bordered > tbody > tr > td:last-child,\n  .panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n  .panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n    border-right: 0; }\n  .panel > .table-bordered > thead > tr:first-child > td,\n  .panel > .table-bordered > thead > tr:first-child > th,\n  .panel > .table-bordered > tbody > tr:first-child > td,\n  .panel > .table-bordered > tbody > tr:first-child > th,\n  .panel > .table-responsive > .table-bordered > thead > tr:first-child > td,\n  .panel > .table-responsive > .table-bordered > thead > tr:first-child > th,\n  .panel > .table-responsive > .table-bordered > tbody > tr:first-child > td,\n  .panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {\n    border-bottom: 0; }\n  .panel > .table-bordered > tbody > tr:last-child > td,\n  .panel > .table-bordered > tbody > tr:last-child > th,\n  .panel > .table-bordered > tfoot > tr:last-child > td,\n  .panel > .table-bordered > tfoot > tr:last-child > th,\n  .panel > .table-responsive > .table-bordered > tbody > tr:last-child > td,\n  .panel > .table-responsive > .table-bordered > tbody > tr:last-child > th,\n  .panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td,\n  .panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {\n    border-bottom: 0; }\n\n.panel > .table-responsive {\n  border: 0;\n  margin-bottom: 0; }\n\n.panel-group {\n  margin-bottom: 20px; }\n  .panel-group .panel {\n    margin-bottom: 0;\n    border-radius: 4px; }\n    .panel-group .panel + .panel {\n      margin-top: 5px; }\n  .panel-group .panel-heading {\n    border-bottom: 0; }\n    .panel-group .panel-heading + .panel-collapse > .panel-body,\n    .panel-group .panel-heading + .panel-collapse > .list-group {\n      border-top: 1px solid #ddd; }\n  .panel-group .panel-footer {\n    border-top: 0; }\n    .panel-group .panel-footer + .panel-collapse .panel-body {\n      border-bottom: 1px solid #ddd; }\n\n.panel-default {\n  border-color: #ddd; }\n  .panel-default > .panel-heading {\n    color: #333333;\n    background-color: #f5f5f5;\n    border-color: #ddd; }\n    .panel-default > .panel-heading + .panel-collapse > .panel-body {\n      border-top-color: #ddd; }\n    .panel-default > .panel-heading .badge {\n      color: #f5f5f5;\n      background-color: #333333; }\n  .panel-default > .panel-footer + .panel-collapse > .panel-body {\n    border-bottom-color: #ddd; }\n\n.panel-primary {\n  border-color: #337ab7; }\n  .panel-primary > .panel-heading {\n    color: #fff;\n    background-color: #337ab7;\n    border-color: #337ab7; }\n    .panel-primary > .panel-heading + .panel-collapse > .panel-body {\n      border-top-color: #337ab7; }\n    .panel-primary > .panel-heading .badge {\n      color: #337ab7;\n      background-color: #fff; }\n  .panel-primary > .panel-footer + .panel-collapse > .panel-body {\n    border-bottom-color: #337ab7; }\n\n.panel-success {\n  border-color: #d6e9c6; }\n  .panel-success > .panel-heading {\n    color: #3c763d;\n    background-color: #dff0d8;\n    border-color: #d6e9c6; }\n    .panel-success > .panel-heading + .panel-collapse > .panel-body {\n      border-top-color: #d6e9c6; }\n    .panel-success > .panel-heading .badge {\n      color: #dff0d8;\n      background-color: #3c763d; }\n  .panel-success > .panel-footer + .panel-collapse > .panel-body {\n    border-bottom-color: #d6e9c6; }\n\n.panel-info {\n  border-color: #bce8f1; }\n  .panel-info > .panel-heading {\n    color: #31708f;\n    background-color: #d9edf7;\n    border-color: #bce8f1; }\n    .panel-info > .panel-heading + .panel-collapse > .panel-body {\n      border-top-color: #bce8f1; }\n    .panel-info > .panel-heading .badge {\n      color: #d9edf7;\n      background-color: #31708f; }\n  .panel-info > .panel-footer + .panel-collapse > .panel-body {\n    border-bottom-color: #bce8f1; }\n\n.panel-warning {\n  border-color: #faebcc; }\n  .panel-warning > .panel-heading {\n    color: #8a6d3b;\n    background-color: #fcf8e3;\n    border-color: #faebcc; }\n    .panel-warning > .panel-heading + .panel-collapse > .panel-body {\n      border-top-color: #faebcc; }\n    .panel-warning > .panel-heading .badge {\n      color: #fcf8e3;\n      background-color: #8a6d3b; }\n  .panel-warning > .panel-footer + .panel-collapse > .panel-body {\n    border-bottom-color: #faebcc; }\n\n.panel-danger {\n  border-color: #ebccd1; }\n  .panel-danger > .panel-heading {\n    color: #a94442;\n    background-color: #f2dede;\n    border-color: #ebccd1; }\n    .panel-danger > .panel-heading + .panel-collapse > .panel-body {\n      border-top-color: #ebccd1; }\n    .panel-danger > .panel-heading .badge {\n      color: #f2dede;\n      background-color: #a94442; }\n  .panel-danger > .panel-footer + .panel-collapse > .panel-body {\n    border-bottom-color: #ebccd1; }\n\n.embed-responsive {\n  position: relative;\n  display: block;\n  height: 0;\n  padding: 0;\n  overflow: hidden; }\n  .embed-responsive .embed-responsive-item,\n  .embed-responsive iframe,\n  .embed-responsive embed,\n  .embed-responsive object,\n  .embed-responsive video {\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    height: 100%;\n    width: 100%;\n    border: 0; }\n\n.embed-responsive-16by9 {\n  padding-bottom: 56.25%; }\n\n.embed-responsive-4by3 {\n  padding-bottom: 75%; }\n\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border: 1px solid #e3e3e3;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05); }\n  .well blockquote {\n    border-color: #ddd;\n    border-color: rgba(0, 0, 0, 0.15); }\n\n.well-lg {\n  padding: 24px;\n  border-radius: 6px; }\n\n.well-sm {\n  padding: 9px;\n  border-radius: 3px; }\n\n.close {\n  float: right;\n  font-size: 21px;\n  font-weight: bold;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: 0.2;\n  filter: alpha(opacity=20); }\n  .close:hover, .close:focus {\n    color: #000;\n    text-decoration: none;\n    cursor: pointer;\n    opacity: 0.5;\n    filter: alpha(opacity=50); }\n\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none; }\n\n.modal-open {\n  overflow: hidden; }\n\n.modal {\n  display: none;\n  overflow: hidden;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  -webkit-overflow-scrolling: touch;\n  outline: 0; }\n  .modal.fade .modal-dialog {\n    -webkit-transform: translate(0, -25%);\n    -ms-transform: translate(0, -25%);\n    -o-transform: translate(0, -25%);\n    transform: translate(0, -25%);\n    -webkit-transition: -webkit-transform 0.3s ease-out;\n    -moz-transition: -moz-transform 0.3s ease-out;\n    -o-transition: -o-transform 0.3s ease-out;\n    transition: transform 0.3s ease-out; }\n  .modal.in .modal-dialog {\n    -webkit-transform: translate(0, 0);\n    -ms-transform: translate(0, 0);\n    -o-transform: translate(0, 0);\n    transform: translate(0, 0); }\n\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto; }\n\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 10px; }\n\n.modal-content {\n  position: relative;\n  background-color: #fff;\n  border: 1px solid #999;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  background-clip: padding-box;\n  outline: 0; }\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000; }\n  .modal-backdrop.fade {\n    opacity: 0;\n    filter: alpha(opacity=0); }\n  .modal-backdrop.in {\n    opacity: 0.5;\n    filter: alpha(opacity=50); }\n\n.modal-header {\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5; }\n  .modal-header:before, .modal-header:after {\n    content: \" \";\n    display: table; }\n  .modal-header:after {\n    clear: both; }\n\n.modal-header .close {\n  margin-top: -2px; }\n\n.modal-title {\n  margin: 0;\n  line-height: 1.42857; }\n\n.modal-body {\n  position: relative;\n  padding: 15px; }\n\n.modal-footer {\n  padding: 15px;\n  text-align: right;\n  border-top: 1px solid #e5e5e5; }\n  .modal-footer:before, .modal-footer:after {\n    content: \" \";\n    display: table; }\n  .modal-footer:after {\n    clear: both; }\n  .modal-footer .btn + .btn {\n    margin-left: 5px;\n    margin-bottom: 0; }\n  .modal-footer .btn-group .btn + .btn {\n    margin-left: -1px; }\n  .modal-footer .btn-block + .btn-block {\n    margin-left: 0; }\n\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll; }\n\n@media (min-width: 768px) {\n  .modal-dialog {\n    width: 600px;\n    margin: 30px auto; }\n  .modal-content {\n    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); }\n  .modal-sm {\n    width: 300px; } }\n\n@media (min-width: 992px) {\n  .modal-lg {\n    width: 900px; } }\n\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.42857;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  word-wrap: normal;\n  font-size: 12px;\n  opacity: 0;\n  filter: alpha(opacity=0); }\n  .tooltip.in {\n    opacity: 0.9;\n    filter: alpha(opacity=90); }\n  .tooltip.top {\n    margin-top: -3px;\n    padding: 5px 0; }\n  .tooltip.right {\n    margin-left: 3px;\n    padding: 0 5px; }\n  .tooltip.bottom {\n    margin-top: 3px;\n    padding: 5px 0; }\n  .tooltip.left {\n    margin-left: -3px;\n    padding: 0 5px; }\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 4px; }\n\n.tooltip-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid; }\n\n.tooltip.top .tooltip-arrow {\n  bottom: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000; }\n\n.tooltip.top-left .tooltip-arrow {\n  bottom: 0;\n  right: 5px;\n  margin-bottom: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000; }\n\n.tooltip.top-right .tooltip-arrow {\n  bottom: 0;\n  left: 5px;\n  margin-bottom: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000; }\n\n.tooltip.right .tooltip-arrow {\n  top: 50%;\n  left: 0;\n  margin-top: -5px;\n  border-width: 5px 5px 5px 0;\n  border-right-color: #000; }\n\n.tooltip.left .tooltip-arrow {\n  top: 50%;\n  right: 0;\n  margin-top: -5px;\n  border-width: 5px 0 5px 5px;\n  border-left-color: #000; }\n\n.tooltip.bottom .tooltip-arrow {\n  top: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000; }\n\n.tooltip.bottom-left .tooltip-arrow {\n  top: 0;\n  right: 5px;\n  margin-top: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000; }\n\n.tooltip.bottom-right .tooltip-arrow {\n  top: 0;\n  left: 5px;\n  margin-top: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000; }\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: none;\n  max-width: 276px;\n  padding: 1px;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.42857;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  word-wrap: normal;\n  font-size: 14px;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2); }\n  .popover.top {\n    margin-top: -10px; }\n  .popover.right {\n    margin-left: 10px; }\n  .popover.bottom {\n    margin-top: 10px; }\n  .popover.left {\n    margin-left: -10px; }\n\n.popover-title {\n  margin: 0;\n  padding: 8px 14px;\n  font-size: 14px;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-radius: 5px 5px 0 0; }\n\n.popover-content {\n  padding: 9px 14px; }\n\n.popover > .arrow, .popover > .arrow:after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid; }\n\n.popover > .arrow {\n  border-width: 11px; }\n\n.popover > .arrow:after {\n  border-width: 10px;\n  content: \"\"; }\n\n.popover.top > .arrow {\n  left: 50%;\n  margin-left: -11px;\n  border-bottom-width: 0;\n  border-top-color: #999999;\n  border-top-color: rgba(0, 0, 0, 0.25);\n  bottom: -11px; }\n  .popover.top > .arrow:after {\n    content: \" \";\n    bottom: 1px;\n    margin-left: -10px;\n    border-bottom-width: 0;\n    border-top-color: #fff; }\n\n.popover.right > .arrow {\n  top: 50%;\n  left: -11px;\n  margin-top: -11px;\n  border-left-width: 0;\n  border-right-color: #999999;\n  border-right-color: rgba(0, 0, 0, 0.25); }\n  .popover.right > .arrow:after {\n    content: \" \";\n    left: 1px;\n    bottom: -10px;\n    border-left-width: 0;\n    border-right-color: #fff; }\n\n.popover.bottom > .arrow {\n  left: 50%;\n  margin-left: -11px;\n  border-top-width: 0;\n  border-bottom-color: #999999;\n  border-bottom-color: rgba(0, 0, 0, 0.25);\n  top: -11px; }\n  .popover.bottom > .arrow:after {\n    content: \" \";\n    top: 1px;\n    margin-left: -10px;\n    border-top-width: 0;\n    border-bottom-color: #fff; }\n\n.popover.left > .arrow {\n  top: 50%;\n  right: -11px;\n  margin-top: -11px;\n  border-right-width: 0;\n  border-left-color: #999999;\n  border-left-color: rgba(0, 0, 0, 0.25); }\n  .popover.left > .arrow:after {\n    content: \" \";\n    right: 1px;\n    border-right-width: 0;\n    border-left-color: #fff;\n    bottom: -10px; }\n\n.carousel {\n  position: relative; }\n\n.carousel-inner {\n  position: relative;\n  overflow: hidden;\n  width: 100%; }\n  .carousel-inner > .item {\n    display: none;\n    position: relative;\n    -webkit-transition: 0.6s ease-in-out left;\n    -o-transition: 0.6s ease-in-out left;\n    transition: 0.6s ease-in-out left; }\n    .carousel-inner > .item > img,\n    .carousel-inner > .item > a > img {\n      display: block;\n      max-width: 100%;\n      height: auto;\n      line-height: 1; }\n    @media all and (transform-3d), (-webkit-transform-3d) {\n      .carousel-inner > .item {\n        -webkit-transition: -webkit-transform 0.6s ease-in-out;\n        -moz-transition: -moz-transform 0.6s ease-in-out;\n        -o-transition: -o-transform 0.6s ease-in-out;\n        transition: transform 0.6s ease-in-out;\n        -webkit-backface-visibility: hidden;\n        -moz-backface-visibility: hidden;\n        backface-visibility: hidden;\n        -webkit-perspective: 1000px;\n        -moz-perspective: 1000px;\n        perspective: 1000px; }\n        .carousel-inner > .item.next, .carousel-inner > .item.active.right {\n          -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0);\n          left: 0; }\n        .carousel-inner > .item.prev, .carousel-inner > .item.active.left {\n          -webkit-transform: translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0);\n          left: 0; }\n        .carousel-inner > .item.next.left, .carousel-inner > .item.prev.right, .carousel-inner > .item.active {\n          -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n          left: 0; } }\n  .carousel-inner > .active,\n  .carousel-inner > .next,\n  .carousel-inner > .prev {\n    display: block; }\n  .carousel-inner > .active {\n    left: 0; }\n  .carousel-inner > .next,\n  .carousel-inner > .prev {\n    position: absolute;\n    top: 0;\n    width: 100%; }\n  .carousel-inner > .next {\n    left: 100%; }\n  .carousel-inner > .prev {\n    left: -100%; }\n  .carousel-inner > .next.left,\n  .carousel-inner > .prev.right {\n    left: 0; }\n  .carousel-inner > .active.left {\n    left: -100%; }\n  .carousel-inner > .active.right {\n    left: 100%; }\n\n.carousel-control {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 15%;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n  font-size: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n  background-color: transparent; }\n  .carousel-control.left {\n    background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n    background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1); }\n  .carousel-control.right {\n    left: auto;\n    right: 0;\n    background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n    background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1); }\n  .carousel-control:hover, .carousel-control:focus {\n    outline: 0;\n    color: #fff;\n    text-decoration: none;\n    opacity: 0.9;\n    filter: alpha(opacity=90); }\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next,\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .glyphicon-chevron-right {\n    position: absolute;\n    top: 50%;\n    margin-top: -10px;\n    z-index: 5;\n    display: inline-block; }\n  .carousel-control .icon-prev,\n  .carousel-control .glyphicon-chevron-left {\n    left: 50%;\n    margin-left: -10px; }\n  .carousel-control .icon-next,\n  .carousel-control .glyphicon-chevron-right {\n    right: 50%;\n    margin-right: -10px; }\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    width: 20px;\n    height: 20px;\n    line-height: 1;\n    font-family: serif; }\n  .carousel-control .icon-prev:before {\n    content: '\\2039'; }\n  .carousel-control .icon-next:before {\n    content: '\\203A'; }\n\n.carousel-indicators {\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  z-index: 15;\n  width: 60%;\n  margin-left: -30%;\n  padding-left: 0;\n  list-style: none;\n  text-align: center; }\n  .carousel-indicators li {\n    display: inline-block;\n    width: 10px;\n    height: 10px;\n    margin: 1px;\n    text-indent: -999px;\n    border: 1px solid #fff;\n    border-radius: 10px;\n    cursor: pointer;\n    background-color: #000 \\9;\n    background-color: transparent; }\n  .carousel-indicators .active {\n    margin: 0;\n    width: 12px;\n    height: 12px;\n    background-color: #fff; }\n\n.carousel-caption {\n  position: absolute;\n  left: 15%;\n  right: 15%;\n  bottom: 20px;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6); }\n  .carousel-caption .btn {\n    text-shadow: none; }\n\n@media screen and (min-width: 768px) {\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .glyphicon-chevron-right,\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    width: 30px;\n    height: 30px;\n    margin-top: -10px;\n    font-size: 30px; }\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .icon-prev {\n    margin-left: -10px; }\n  .carousel-control .glyphicon-chevron-right,\n  .carousel-control .icon-next {\n    margin-right: -10px; }\n  .carousel-caption {\n    left: 20%;\n    right: 20%;\n    padding-bottom: 30px; }\n  .carousel-indicators {\n    bottom: 20px; } }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: table; }\n\n.clearfix:after {\n  clear: both; }\n\n.center-block {\n  display: block;\n  margin-left: auto;\n  margin-right: auto; }\n\n.pull-right {\n  float: right !important; }\n\n.pull-left {\n  float: left !important; }\n\n.hide {\n  display: none !important; }\n\n.show {\n  display: block !important; }\n\n.invisible {\n  visibility: hidden; }\n\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0; }\n\n.hidden {\n  display: none !important; }\n\n.affix {\n  position: fixed; }\n\n@-ms-viewport {\n  width: device-width; }\n\n.visible-xs {\n  display: none !important; }\n\n.visible-sm {\n  display: none !important; }\n\n.visible-md {\n  display: none !important; }\n\n.visible-lg {\n  display: none !important; }\n\n.visible-xs-block,\n.visible-xs-inline,\n.visible-xs-inline-block,\n.visible-sm-block,\n.visible-sm-inline,\n.visible-sm-inline-block,\n.visible-md-block,\n.visible-md-inline,\n.visible-md-inline-block,\n.visible-lg-block,\n.visible-lg-inline,\n.visible-lg-inline-block {\n  display: none !important; }\n\n@media (max-width: 767px) {\n  .visible-xs {\n    display: block !important; }\n  table.visible-xs {\n    display: table !important; }\n  tr.visible-xs {\n    display: table-row !important; }\n  th.visible-xs,\n  td.visible-xs {\n    display: table-cell !important; } }\n\n@media (max-width: 767px) {\n  .visible-xs-block {\n    display: block !important; } }\n\n@media (max-width: 767px) {\n  .visible-xs-inline {\n    display: inline !important; } }\n\n@media (max-width: 767px) {\n  .visible-xs-inline-block {\n    display: inline-block !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm {\n    display: block !important; }\n  table.visible-sm {\n    display: table !important; }\n  tr.visible-sm {\n    display: table-row !important; }\n  th.visible-sm,\n  td.visible-sm {\n    display: table-cell !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-block {\n    display: block !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline {\n    display: inline !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline-block {\n    display: inline-block !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md {\n    display: block !important; }\n  table.visible-md {\n    display: table !important; }\n  tr.visible-md {\n    display: table-row !important; }\n  th.visible-md,\n  td.visible-md {\n    display: table-cell !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-block {\n    display: block !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline {\n    display: inline !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline-block {\n    display: inline-block !important; } }\n\n@media (min-width: 1200px) {\n  .visible-lg {\n    display: block !important; }\n  table.visible-lg {\n    display: table !important; }\n  tr.visible-lg {\n    display: table-row !important; }\n  th.visible-lg,\n  td.visible-lg {\n    display: table-cell !important; } }\n\n@media (min-width: 1200px) {\n  .visible-lg-block {\n    display: block !important; } }\n\n@media (min-width: 1200px) {\n  .visible-lg-inline {\n    display: inline !important; } }\n\n@media (min-width: 1200px) {\n  .visible-lg-inline-block {\n    display: inline-block !important; } }\n\n@media (max-width: 767px) {\n  .hidden-xs {\n    display: none !important; } }\n\n@media (min-width: 768px) and (max-width: 991px) {\n  .hidden-sm {\n    display: none !important; } }\n\n@media (min-width: 992px) and (max-width: 1199px) {\n  .hidden-md {\n    display: none !important; } }\n\n@media (min-width: 1200px) {\n  .hidden-lg {\n    display: none !important; } }\n\n.visible-print {\n  display: none !important; }\n\n@media print {\n  .visible-print {\n    display: block !important; }\n  table.visible-print {\n    display: table !important; }\n  tr.visible-print {\n    display: table-row !important; }\n  th.visible-print,\n  td.visible-print {\n    display: table-cell !important; } }\n\n.visible-print-block {\n  display: none !important; }\n  @media print {\n    .visible-print-block {\n      display: block !important; } }\n\n.visible-print-inline {\n  display: none !important; }\n  @media print {\n    .visible-print-inline {\n      display: inline !important; } }\n\n.visible-print-inline-block {\n  display: none !important; }\n  @media print {\n    .visible-print-inline-block {\n      display: inline-block !important; } }\n\n@media print {\n  .hidden-print {\n    display: none !important; } }\n\nh3 {\n  color: #fff; }\n\nbody {\n  background-color: #e5d5b6;\n  background-size: 100%;\n  font-family: 'Shadows Into Light', cursive;\n  font-size: 30px; }\n\n.btns {\n  text-align: center;\n  width: 100%; }\n\n.inbox-div {\n  background: #e5d5b6;\n  background-size: 100%; }\n\na {\n  color: #000; }\n\n.side {\n  background: #baa378;\n  border: 1px solid #000;\n  flex: 1;\n  font-size: 20px;\n  max-width: 10%;\n  min-width: 140px;\n  text-align: justify; }\n\n.side-items {\n  font-size: 30px;\n  margin: 0;\n  margin-top: 50px;\n  padding: 0;\n  text-align: left; }\n\n.side-items li {\n  display: block;\n  padding: 50px 50px 50px 10px; }\n\n.inbox {\n  display: flex; }\n\n.add-books-div,\n.search-form,\n.delete-books-div {\n  min-width: 75%;\n  padding-left: 30px; }\n\n.delete-books-div {\n  min-width: 75%;\n  padding-left: 30px; }\n\n.deltable,\n.search-table,\n.tabh,\n.tabr {\n  border: 1px solid #000;\n  border-collapse: collapse;\n  width: 100%; }\n\n.tabh {\n  padding: 15px;\n  text-align: left;\n  width: 45%; }\n\n.tabd {\n  text-align: left;\n  width: 5%;\n  padding-left: 20px; }\n\n.search-books-div {\n  min-width: 75%;\n  padding-left: 30px; }\n", ""]);

	// exports


/***/ },
/* 29 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f4769f9bdb7466be65088239c12046d1.eot";

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "448c34a56d699c29117adc64c43affeb.woff2";

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fa2772327f55d8198301fdb8bcfc8158.woff";

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "e18bbf611f2a2e43afc071aa2f4e1512.ttf";

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "89889688147bd7575d6327160d64e760.svg";

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["$"] = __webpack_require__(2);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["jQuery"] = __webpack_require__(2);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
]);