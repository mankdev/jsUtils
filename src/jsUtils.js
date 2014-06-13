(function(document, window, undefined) {
	'use strict';

	window.jsUtils = {
		forEach: function(list, fn) {
			Array.prototype.forEach.call(list, fn);
		},
		getAscendantByFilter: function(element, filterFn) {
			while (element && (element !== document) && !filterFn(element)) {
				element = element.parentElement || element.parentNode;
			}

			return (element === document) ? null : element;
		},
		getData: function(element, namespace) {
			var attributes = element.attributes,
				result = {},
				name,
				value,
				attr;

			namespace = "data-" + ((namespace) ? namespace + "-" : "");

			for (var i = attributes.length - 1; i >= 0; i--) {
				attr = attributes[i];
				name = attr.name;
				value = attr.value;

				if (name.indexOf(namespace) === 0) {
					result[name.substring(namespace.length, name.length)] = value;
				}
			}

			return result;
		},
		trigger: function(element, eventType, params) {
			var event;

			params = params || {};
			params.cancelable = true;

			try {
				event = new CustomEvent(eventType, params);
			} catch (e) {
				event = document.createEvent('CustomEvent');
				event.initCustomEvent(eventType, params.bubbles, params.cancelable, params.detail);
			}

			element.dispatchEvent(event);
		}
	};

})(document, window);