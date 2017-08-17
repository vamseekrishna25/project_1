import angular from 'angular';
import 'angular-mocks';

import ngLoad from './index';

describe('service angularLoad', function () {
	beforeEach(angular.mock.module(ngLoad));

	var mockDocument;
	var $timeout, angularLoad;

	beforeEach(angular.mock.module(function($provide) {
		mockDocument = {
			createElement: angular.bind(document, document.createElement),
			head: jasmine.createSpyObj('document.head', ['appendChild', 'querySelector']),
			body: jasmine.createSpyObj('document.body', ['appendChild'])
		};
		spyOn(mockDocument, 'createElement').and.callThrough();
		$provide.value('$document', [mockDocument]);
	}));

	beforeEach(inject(function(_$timeout_, _angularLoad_) {
		$timeout = _$timeout_;
		angularLoad = _angularLoad_;
	}));

	describe('#loadScript', function() {
		it('should append a new <' + 'script> element to the document body', function() {
			angularLoad.loadScript('https://www.test.org/somescript.js');
			expect(mockDocument.createElement).toHaveBeenCalledWith('script');
			expect(mockDocument.body.appendChild).toHaveBeenCalled();
			var scriptElement = mockDocument.body.appendChild.calls.mostRecent().args[0];
			expect(scriptElement.tagName.toLowerCase()).toEqual('script');
			expect(scriptElement.src).toEqual('https://www.test.org/somescript.js');
		});

		it('should resolve the returned promise as soon as the script has finished loading when `onload` callback is fired', function() {
			var resolved = false;
			angularLoad.loadScript('https://www.test.org/somescript.js').then(function() {
				resolved = true;
			});
			var scriptElement = mockDocument.body.appendChild.calls.mostRecent().args[0];
			scriptElement.onload({});
			expect(resolved).toBeFalsy();
			$timeout.flush();
			expect(resolved).toBeTruthy();
		});

		it('should resolve the returned promise as soon as the script has finished loading when `onreadystatechange` callback is fired', function() {
			var resolved = false;
			angularLoad.loadScript('https://www.test.org/somescript.js').then(function() {
				resolved = true;
			});
			var scriptElement = mockDocument.body.appendChild.calls.mostRecent().args[0];
			scriptElement.readyState = 'loading';
			scriptElement.onreadystatechange({});
			expect(resolved).toBeFalsy();
			scriptElement.readyState = 'complete';
			scriptElement.onreadystatechange({});
			$timeout.flush();
			expect(resolved).toBeTruthy();
		});

		it('should resolve the returned promise as soon as the script has finished loading when `onreadystatechange` callback is fired in IE8', function() {
			var resolved = false;
			angularLoad.loadScript('https://www.test.org/somescript.js').then(function() {
				resolved = true;
			});
			var scriptElement = mockDocument.body.appendChild.calls.mostRecent().args[0];
			scriptElement.readyState = 'loading';
			scriptElement.onreadystatechange({});
			expect(resolved).toBeFalsy();
			scriptElement.readyState = 'loaded';
			scriptElement.onreadystatechange({});
			$timeout.flush();
			expect(resolved).toBeTruthy();
		});

		it('should reject the returned promise if the script failed to load', function() {
			var rejected = false;
			angularLoad.loadScript('https://www.test.org/somescript.js').catch(function() {
				rejected = true;
			});
			var scriptElement = mockDocument.body.appendChild.calls.mostRecent().args[0];
			scriptElement.onerror({});
			expect(rejected).toBeFalsy();
			$timeout.flush();
			expect(rejected).toBeTruthy();
		});

		it('should only append the script tag once', function() {
			angularLoad.loadScript('https://www.test.org/somescript.js');
			angularLoad.loadScript('https://www.test.org/somescript.js');
			expect(mockDocument.body.appendChild.calls.all().length).toBe(1);
		});
	});

	describe('#unloadCSS', function() {
		it('should remove the <' + 'link> element from the document head when exist and return true', function() {
			var styleTag = {
					//Style tag is found in the head
					id: 'ElementObject',
					remove: function(){}
			};
			spyOn(styleTag, 'remove');
			mockDocument.head.querySelector.and.callFake(function() {
    			return styleTag;
			});
			var removed = angularLoad.unloadCSS('https://www.test.org/styles.css');
			expect(removed).toBe(true);
			expect(styleTag.remove).toHaveBeenCalled();
		});

		it('should not remove the <' + 'link> element from the document head when not exist and return false', function() {
			mockDocument.head.querySelector.and.callFake(function() {
    			return null; //Style tag not found in the head
			});
			var removed = angularLoad.unloadCSS('https://www.test.org/styles.css');
			expect(removed).toBe(false);
		});

		it('should not remove the <' + 'link> element from the document head when document head is empty and return false', function() {
			mockDocument.head = null;
			var removed = angularLoad.unloadCSS('https://www.test.org/styles.css');
			expect(removed).toBe(false);
		});
	});

	describe('#loadCSS', function() {
		it('should append a new <' + 'link> element to the document head', function() {
			angularLoad.loadCSS('https://www.test.org/styles.css');
			expect(mockDocument.createElement).toHaveBeenCalledWith('link');
			expect(mockDocument.head.appendChild).toHaveBeenCalled();
			var linkElement = mockDocument.head.appendChild.calls.mostRecent().args[0];
			expect(linkElement.tagName.toLowerCase()).toEqual('link');
			expect(linkElement.rel).toEqual('stylesheet');
			expect(linkElement.type).toEqual('text/css');
			expect(linkElement.href).toEqual('https://www.test.org/styles.css');
		});

		it('should resolve the returned promise as soon as the script has finished loading', function() {
			var resolved = false;
			angularLoad.loadCSS('https://www.test.org/styles.css').then(function() {
				resolved = true;
			});
			var linkElement = mockDocument.head.appendChild.calls.mostRecent().args[0];
			linkElement.onload({});
			expect(resolved).toBeFalsy();
			$timeout.flush();
			expect(resolved).toBeTruthy();
		});

		it('should reject the returned promise if the script failed to load', function() {
			var rejected = false;
			angularLoad.loadCSS('https://www.test.org/styles.css').catch(function() {
				rejected = true;
			});
			var linkElement = mockDocument.head.appendChild.calls.mostRecent().args[0];
			linkElement.onerror({});
			expect(rejected).toBeFalsy();
			$timeout.flush();
			expect(rejected).toBeTruthy();
		});

		it('should only append the stylesheet link once', function() {
			angularLoad.loadCSS('https://www.test.org/styles.css');
			angularLoad.loadCSS('https://www.test.org/styles.css');
			expect(mockDocument.head.appendChild.calls.all().length).toBe(1);
		});
	});
});
