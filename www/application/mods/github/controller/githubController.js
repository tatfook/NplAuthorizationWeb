/**
Author: leio
Date: 2017/10/24
*/

define([
    'app',
    'helper/util',
    'text!application/mods/github/html/github.html',
], function (app, util, htmlContent) {
    app.controller('githubController', [
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
                $auth.authenticate("github").then(function (response) {
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
                    url: "mods/github/model/github/getProfile",
                    header: defaultHttpHeader,

                }
                $http(config).then(function (response) {
                    console.log("=============getProfile", response);
                    if (response.data && response.data.data && response.data.data.login) {
                        $scope.owner = response.data.data.login;
                        console.log("============$scope.owner", $scope.owner);
                        $scope.getRepos();
                    }
                })
            }
            
            $scope.getContent = function (path) {
                var config = {
                    url: "mods/github/model/github/getContent",
                    header: defaultHttpHeader,
                    params: {
                        owner: $scope.owner,
                        repo: $scope.seleted_repo,
                        path: path,
                    },

                }
                $scope.seleted_file = path;
                $http(config).then(function (response) {
                    console.log("=============getContent", response);
                    if (response.data && response.data.content) {
                        $scope.seleted_content = response.data.content;
                        console.log("=============$scope.seleted_content", $scope.seleted_content);
                    }
                })
            }
            $scope.createFile = function () {
                var config = {
                    url: "mods/github/model/github/createFile",
                    header: defaultHttpHeader,
                    params: {
                        owner: $scope.owner,
                        repo: $scope.seleted_repo,
                        path: "Test/test2.lua",
                        content:"Hello 世界"
                    },

                }
                $http(config).then(function (response) {
                    console.log("=============createFile", response);
                })
            }
            $scope.updateFile = function () {
                var config = {
                    url: "mods/github/model/github/updateFile",
                    header: defaultHttpHeader,
                    params: {
                        owner: $scope.owner,
                        repo: $scope.seleted_repo,
                        path: "Test/test2.lua",
                        content: "Hello 世界世界世界世界"
                    },

                }
                $http(config).then(function (response) {
                    console.log("=============updateFile", response);
                })
            }
            $scope.deleteFile = function () {
                var config = {
                    url: "mods/github/model/github/deleteFile",
                    header: defaultHttpHeader,
                    params: {
                        owner: $scope.owner,
                        repo: $scope.seleted_repo,
                        path: "Test/test2.lua",
                    },

                }
                $http(config).then(function (response) {
                    console.log("=============deleteFile", response);
                })
            }
            $scope.getRootTree = function (repo) {
                var config = {
                    url: "mods/github/model/github/getRootTree",
                    header: defaultHttpHeader,
                    params: {
                        owner: $scope.owner,
                        repo: repo,
                    },

                }
                $http(config).then(function (response) {
                    console.log("=============getRootTree", response);
                    $scope.seleted_repo = repo;
                    if (response.data && response.data.data) {
                        $scope.files = response.data.data.tree;
                    }
                })
            }
            $scope.listHooks = function () {
                var config = {
                    url: "mods/github/model/github/listHooks",
                    header: defaultHttpHeader,
                    params: {
                        owner: $scope.owner,
                        repo: $scope.seleted_repo,
                    },

                }
                $http(config).then(function (response) {
                    console.log("=============listHooks", response);
                })
            }

            $scope.createHook = function () {
                var config = {
                    url: "mods/github/model/github/createHook",
                    header: defaultHttpHeader,
                    params: {
                        owner: $scope.owner,
                        repo: $scope.seleted_repo,
                        callback_url: "http://localhost:8099/models/auth/githubwebhook",
                    },

                }
                $http(config).then(function (response) {
                    console.log("=============createHook", response);
                })
            }
            $scope.getRepos = function () {
                var config = {
                    url: "mods/github/model/github/getRepos",
                    header: defaultHttpHeader,
                }
                $http(config).then(function (response) {
                    console.log("=============getRepos", response);
                    if (response.data && response.data.data) {
                        $scope.repos = response.data.data;
                    }
                })
            }
            $scope.createRepos = function () {
                var config = {
                    url: "mods/github/model/github/createRepos",
                    header: defaultHttpHeader,
                    params: {
                        name: test_create_repo_name,
                    },
                }
                $http(config).then(function (response) {
                    console.log("=============createRepos", response);
                })
            }
            $scope.deleteRepos = function () {
                var config = {
                    url: "mods/github/model/github/deleteRepos",
                    header: defaultHttpHeader,
                    params: {
                        owner: $scope.owner,
                        name: test_create_repo_name,
                    },
                }
                $http(config).then(function (response) {
                    console.log("=============deleteRepos", response);
                })
            }

            if ($auth.isAuthenticated()) {
                $scope.getProfile();
            }
        }]);

    return htmlContent;

});
