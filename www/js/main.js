/**
Author: leio
Date: 2017/10/19
 */
'use strict';
(function (win) {
    var pathPrefix = config.pathPrefix;
    var jsPathPrefix = pathPrefix + 'js/';
    var depsPathPrefix = pathPrefix + 'deps/';
    function configRequireJs() {
        requirejs.config({
            baseUrl: '',
            paths: {
                'js': jsPathPrefix,
                'jquery': depsPathPrefix + 'jquery/jquery.min',
                'angular': depsPathPrefix + 'angular/angular.min',
                'bootstrap': depsPathPrefix + "bootstrap/js/bootstrap.min",
                'satellizer': depsPathPrefix + 'satellizer/satellizer.min',
                'js-base64': depsPathPrefix + 'js-base64/base64.min',
                'js-base32': depsPathPrefix + 'js-base32/base32.min',
                
                'domReady': depsPathPrefix + 'requirejs/domReady',

                'text': depsPathPrefix + 'requirejs/text',
                'app': jsPathPrefix + 'app',
                'preload': jsPathPrefix + 'preload',
                'helper': jsPathPrefix + 'helper',
                'mods': pathPrefix + 'mods',
                'root': pathPrefix,
                'deps': pathPrefix + 'deps',
            },
            shim: {
                'angular': {
                    deps: ['jquery'],
                    exports: 'angular'
                },
                
                'satellizer': {
                    deps: ['angular']
                },
                'bootstrap': {
                    deps: ['jquery']
                }
            },
            deps: ['bootstrap'],
            waitSeconds: 10,
            // urlArgs: "bust=" + (new Date()).getTime()  //防止读取缓存，调试用
            urlArgs: "bust=" + (config.isDebugEnv() ? ((new Date()).getTime()) : (config.bustVersion || ''))   //防止读取缓存，调试用
        });
    }
    function load() {
        require(['domReady'], function (domReady) {
            domReady(function () {
                // ***在angular启动之前加载页面内容，目的是内容js完全兼容之前angular书写方式，否则angular启动后，之前书写方式很多功能失效***
                require(['angular', 'app', 'preload'], function (angular, app) {
                    config.loadMainContent(function () {
                        angular.bootstrap(document, ['webapp']);
                    }, function () {
                        angular.bootstrap(document, ['webapp']);
                    });
                });
            });
        });
    }
    configRequireJs();
    load();
})(window);



