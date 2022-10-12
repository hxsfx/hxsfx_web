(function () {
    window.hxsfx = {};
    window.hxsfx.ajax = {
        get: function () {
            const httpRequest = new XMLHttpRequest();
            httpRequest.open('GET', 'content.html', true);
            httpRequest.onreadystatechange = function () {
                //console.log("ssss", httpRequest.readyState); // readyState will be 4
                try {
                    if (httpRequest.readyState === XMLHttpRequest.DONE) {
                        if (httpRequest.status === 200) {
                            // 第一步：匹配加载的页面中是否含有js
                            var patternScript = /<script(?:.*?)(src=[\"\'](.+?)[\"\']){0,1}>(.|\r|\n|\r\n)*?(?:<\/script>)/igm;
                            var scripts = httpRequest.responseText.match(patternScript);
                            if (scripts) {
                                for (var i = 0; i < scripts.length; i++) {
                                    console.log(scripts[i]);
                                }
                            }
                            document.getElementById("content").innerHTML = httpRequest.responseText;
                            var secScript = document.createElement("script");  //创建一个script标签
                            secScript.setAttribute("type", "text/javascript");
                            secScript.setAttribute("src", "test.js");
                            document.getElementById("content").insertBefore(secScript, document.getElementById("content").lastChild);
                        } else {
                            alert('There was a problem with the request.');
                        }
                    }
                }
                catch (e) {
                    alert('Caught Exception: ' + e.description);
                }
            };
            httpRequest.send(null);
            //httpRequest.send();
        }
    };
})();