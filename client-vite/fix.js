var require = function(src, success, failure){
    !function(source, success_cb, failure_cb){
        var script = document.createElement('script');
        script.async = true; script.type = 'text/javascript'; script.src = source;
        script.onload = success_cb || function(e){};
        script.onerror = failure_cb || function(e){};
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    }(src, success, failure);
}