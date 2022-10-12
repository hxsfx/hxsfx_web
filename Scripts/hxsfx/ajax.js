(function () {
    window.hxsfx.ajax = {
        loadHTML: function (ele, url) {
            //时间戳用来解决加载页面缓存的问题
            var urlTimeStamp = "timeStamp=" + new Date().getTime();
            url += ((url.indexOf('?') >= 0) ? "&" : "?") + urlTimeStamp;
            const httpRequest = new XMLHttpRequest();
            httpRequest.open('GET', url, true);
            httpRequest.onreadystatechange = function () {
                try {
                    if (httpRequest.readyState === XMLHttpRequest.DONE) {
                        if (httpRequest.status === 200) {
                            ele.innerHTML = httpRequest.responseText;
                            var scriptElements = ele.getElementsByTagName("script");
                            for (var i = 0; i < scriptElements.length; i++) {
                                var scriptElement = document.createElement("script");
                                scriptElement.setAttribute("type", "text/javascript");
                                var src = scriptElements[i].getAttribute("src");
                                if (src) {
                                    src = url.substring(0, url.lastIndexOf('/') + 1)  + src;
                                    src += ((src.indexOf('?') >= 0) ? "&" : "?") + urlTimeStamp;
                                    scriptElement.setAttribute("src", src);
                                }
                                var scriptContent = scriptElements[i].innerHTML;
                                if (scriptContent) {
                                    scriptElement.innerHTML = scriptContent;
                                }
                                //用生成的script元素去替换html中的script标签，以此来激活script代码
                                ele.replaceChild(scriptElement, scriptElements[i]);
                            }
                        }
                        else {
                            console.log("【ajax.get(" + url + ")请求出错】");
                        }
                    }
                }
                catch (ex) {
                    console.log("【ajax.get(" + url + ")异常】" + ex.message);
                }
            };
            httpRequest.send();
        }
    };
})();

