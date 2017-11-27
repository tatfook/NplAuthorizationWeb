/**
Author: leio
Date: 2017/10/19
 */

(function () {
    var nplcad_config = window.global_config || {};
    var hostname = window.location.hostname;
    var pathPrefix = nplcad_config.webroot;
    var bustVersion = nplcad_config.bustVersion;
    config = {
        pathPrefix: pathPrefix,
        bustVersion: bustVersion
    };
    config.isDebugEnv = function () {
        if (window.location.hostname.indexOf("localhost") >= 0) {
            return true;
        }
        return false;
    }
    config.loadMainContent = function (cb, errcb) {
        var mod_name = config.util.getModName();
        var pageurl = "application/mods/" + mod_name + "/controller/" + mod_name + "Controller";
        if (pageurl) {
            require([pageurl], function (mainContent) {
                if (typeof (mainContent) == "object") {
                    config.mainContent = mainContent.render({});
                } else {
                    config.mainContent = mainContent;
                }
                cb && cb();
            }, function () {
                errcb && errcb();
            });
        } else {
            cb && cb();
        }
    }
    window.config = config;
})();
