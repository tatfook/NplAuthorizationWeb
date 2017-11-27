/**
Author: leio
Date: 2017/10/23
 */

define([
    'jquery',
	"js-base32"
], function ($) {
    var util = {
    };
    util.setAngularServices = function (angularServices) {
        this.angularServices = angularServices;
    }
    // $html
    util.html = function (selector, htmlStr, $scope, isCompile) {
        htmlStr = htmlStr || '<div></div>';

        var $compile = util.angularServices.$compile;
        htmlStr = $compile(htmlStr)($scope);

        $(selector).html(htmlStr);
        setTimeout(function () {
            $scope.$apply();
        });
    }
    util.getModName = function () {
        var hostname = config.hostname || window.location.hostname;
        var pathname = window.location.pathname;
        pathname = decodeURI(pathname);
        var mod_name = "main";
        if (pathname) {
            var paths = pathname.split('/');
            if (paths.length > 1 && paths[1] != "") {
                mod_name = paths[1];
            }
        }
        return mod_name;
    }
    util.popupCenter = function (url, title, w, h) {
        // Fixes dual-screen position                         Most browsers      Firefox
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;
        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        // Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus();
        }
    }
    config.util = util;
    return util;
});
