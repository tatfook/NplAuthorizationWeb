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
                // ע��·�ɸı��¼�, �ı�·��ʱ����������
                $rootScope.$on('$locationChangeSuccess', function () {
                    console.log("$locationChangeSuccess change");

                    if (!isFirstLocationChange) {
                        return;
                    }
                    isFirstLocationChange = false;
                    config.loadMainContent(initContentInfo);
                });
            }
            // ����������Ϣ
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
