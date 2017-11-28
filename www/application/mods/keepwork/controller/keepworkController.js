/**
Author: leio
Date: 2017/10/24
*/

define([
    'app',
    'helper/util',
    'text!application/mods/keepwork/html/keepwork.html',
], function (app, util, htmlContent) {
    app.controller('keepworkController', [
        '$auth',
        '$scope',
        '$rootScope',
        '$location',
        '$http',
        function ($auth, $scope, $rootScope, $location, $http) {
            // set cookie
            if (!$auth.isAuthenticated() && $.cookie('token')) {
                $auth.setToken($.cookie('token'));
            }
            var apiBaseUrl = "https://api.github.com";
            var defaultHttpHeader = {
                "Accept": "application/vnd.github.full+json",
            }
            var test_create_repo_name = "Documents2";

            $scope.owner = null;
            $scope.seleted_repo = null;
            $scope.seleted_file = null;
            $scope.seleted_content = null;
            $scope.repos = [];
            $scope.files = [];


            $scope.login = function () {
                $auth.authenticate("keepwork").then(function (response) {
                    var data = response.data || {};
                    var token = data.token;
                    var error = data.error;
                    console.log("============data", data);
                    if (token) {
                        console.log("login successfully", token);
                        $auth.setToken(token);
                        //get user's profile
                        $scope.getProfile();

                        $.cookie('token', token, { path: '/', expires: 365, domain: '.' + config.hostname });
                    } else {
                        console.log("login error", error);
                    }

                }, function (response) {
                    console.log("error:", response);
                });
            }
            $scope.logout = function () {
                $.removeCookie('token', { path: '/', expires: 365, domain: '.' + config.hostname });
                $auth.logout();
                $scope.owner = null;
            }
            $scope.getProfile = function () {
                var config = {
                    url: "mods/keepwork/model/keepwork/getProfile",
                    header: defaultHttpHeader,

                }
                $http(config).then(function (response) {
                    console.log("=============getProfile", response);
                    if (response.data && response.data.data.data) {
                        $scope.owner = response.data.data.data.username;
                    }
                })
            }
            if ($auth.isAuthenticated()) {
                $scope.getProfile();
            }
        }]);

    return htmlContent;

});
