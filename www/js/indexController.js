/**
Author: leio
Date: 2017/10/20
 */

define([
    'app',
    'helper/util',
], function (app, util) {
    app.controller('indexController', [
        '$scope',
        '$rootScope',
        '$location',
        '$http',
        '$compile',
        function ($scope, $rootScope, $location, $http, $compile) {
            util.setAngularServices({
                $rootScope: $rootScope,
                $http: $http,
                $compile: $compile,
                $location: $location,
            });
            function initView() {
                var isFirstLocationChange = true;
                // 注册路由改变事件, 改变路由时清空相关内容
                $rootScope.$on('$locationChangeSuccess', function () {
                    console.log("$locationChangeSuccess change");

                    if (!isFirstLocationChange) {
                        return;
                    }
                    isFirstLocationChange = false;
                    config.loadMainContent(initContentInfo);
                });
            }
            // 加载内容信息
            function initContentInfo() {
                util.html('#__UserSitePageContent__', '<div></div>', $scope);
                if (config.mainContent) {
                        util.html('#__UserSitePageContent__', config.mainContent, $scope);
                }
            }
            function init() {
                initView();
            }
            init();
        }]);

});
