/**
Author: leio
Date: 2017/10/19
Reference: 
 */
define([
        'jquery',
		'angular',
		'satellizer',
], function (jquery,angular) {
    var app = angular.module('webapp', ['satellizer']).run(function () {
        config.angularBootstrap = true;
    });
    // ◊¢≤·loading¿πΩÿ∆˜
    app.config(['$controllerProvider', '$httpProvider', '$authProvider', '$locationProvider', function ($controllerProvider, $httpProvider, $authProvider, $locationProvider) {
        $httpProvider.interceptors.push('SatellizerInterceptor');
        // github »œ÷§≈‰÷√
        $authProvider.github({
            url: "/mods/github/model/github/logincallback",
            clientId: '1b93854e42d00748154f',
            redirectUri: window.location.origin + '/pages/example',
            scope: ["public_repo", "delete_repo"],
            //scope: ["public_repo"],
        });
        // keepwork
        $authProvider.oauth2({
            name: 'keepwork',
            url: '/models/auth/callback',
            clientId: '1000001',
            redirectUri: window.location.origin + '/pages/example',
            authorizationEndpoint: 'http://keepwork.com/wiki/oauth',
            oauthType: '2.0',
        });
    }]);
    window.app = app;
    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    var attachEvent = document.attachEvent;
    var isIE = navigator.userAgent.match(/Trident/);
    var requestFrame = (function () {
        var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
            function (fn) { return window.setTimeout(fn, 20); };
        return function (fn) { return raf(fn); };
    })();

    var cancelFrame = (function () {
        var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
               window.clearTimeout;
        return function (id) { return cancel(id); };
    })();

    function resizeListener(e) {
        var win = e.target || e.srcElement;
        if (win.__resizeRAF__) cancelFrame(win.__resizeRAF__);
        win.__resizeRAF__ = requestFrame(function () {
            var trigger = win.__resizeTrigger__;
            trigger.__resizeListeners__.forEach(function (fn) {
                fn.call(trigger, e);
            });
        });
    }

    function objectLoad(e) {
        this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__;
        this.contentDocument.defaultView.addEventListener('resize', resizeListener);
    }

    window.addResizeListener = function (element, fn) {
        if (!element.__resizeListeners__) {
            element.__resizeListeners__ = [];
            if (attachEvent) {
                element.__resizeTrigger__ = element;
                element.attachEvent('onresize', resizeListener);
            }
            else {
                if (getComputedStyle(element).position == 'static') element.style.position = 'relative';
                var obj = element.__resizeTrigger__ = document.createElement('object');
                obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
                obj.__resizeElement__ = element;
                obj.onload = objectLoad;
                obj.type = 'text/html';
                if (isIE) element.appendChild(obj);
                obj.data = 'about:blank';
                if (!isIE) element.appendChild(obj);
            }
        }
        element.__resizeListeners__.push(fn);
    };

    window.removeResizeListener = function (element, fn) {
        element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
        if (!element.__resizeListeners__.length) {
            if (attachEvent) element.detachEvent('onresize', resizeListener);
            else {
                element.__resizeTrigger__.contentDocument.defaultView.removeEventListener('resize', resizeListener);
                element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__);
            }
        }
    }
    return app;
});
