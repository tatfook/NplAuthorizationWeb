/**
Author: leio
Date: 2017/10/24
*/

define([
    'app',
    'helper/util',
    'text!application/mods/main/html/main.html',
], function (app, util, htmlContent) {
    app.controller('mainController', [
        '$auth',
        '$scope',
        '$rootScope',
        '$location',
        '$http',
        function ($auth, $scope, $rootScope, $location, $http) {
            $scope.OnLoginKeepwork = function () {
                $auth.authenticate("keepwork").then(function (response) {
                    var data = response.data || {};
                    var token = data.token;
                    var error = data.error;
                    console.log(data.info);
                    if (token) {
                        console.log("login successfully", token);
                        $auth.setToken(token);
                    } else {
                        console.log("login error", error);
                    }
                    
                }, function (response) {
                    console.log("»œ÷§ ß∞‹!!!");
                });
            }
            $scope.OnLoginGithub = function () {
                $auth.authenticate("github").then(function (response) {
                    var data = response.data || {};
                    var token = data.token;
                    var error = data.error;
                    console.log("============data",data);
                    if (token) {
                        console.log("login successfully", token);
                        $auth.setToken(token);
                    } else {
                        console.log("login error", error);
                    }

                }, function (response) {
                    console.log("error:", response);
                });
            }
            $scope.OnTest = function () {
                $http.get("editor/model/build/helloworld?a=2")
            }
            $scope.repos = function () {
                $http.get("/users/zhangleio/repos")
            }
        }]);

    return htmlContent;

});
