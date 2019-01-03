(function () {
    var _viewElement = null,
        _defaultRoute = null,
        _rendered = false;

    var Framework = function () {
        this._routeMap = {};
    }

    var routeObj = function (c, r, t) {
        this.controller = c;
        this.route = r;
        this.template = t;
    }

    Framework.prototype.AddRoute = function (controller, route, template) {
        this._routeMap[route] = new routeObj(controller, route, template);
    }

    Framework.prototype.Initialize = function () {
        var delegate = startMvc.bind(this);

        _viewElement = document.querySelector('[view]');
        if (!_viewElement) return;

        _defaultRoute = this._routeMap[Object.getOwnPropertyNames(this._routeMap)[0]];

        window.onhashchange = delegate;
        delegate();
    }

    Framework.prototype.Start = function () {
        var startMvcDelegate = startMvc.bind(this);
        startMvcDelegate();
        window.onhashchange = startMvcDelegate;
    }

    function loadTemplate(routeObject, view) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                loadView(routeObject, view, xmlhttp.responseText);
            }
        }
        xmlhttp.open('GET', routeObject.template, true);
        xmlhttp.send();
    }

    function loadView(routeObject, viewElement, viewHtml) {

        var model = {},
            renderViewDelegate = renderView.bind(null, viewElement, viewHtml, model),
            view = new viewContainer(renderViewDelegate);

        routeObject.controller(view, model);

        viewHtml = replaceToken(viewHtml, model);

        viewElement.innerHTML = viewHtml;


        if (!view.isAsync && !_rendered) {
            renderView(viewElement, viewHtml, model);
        }
    }

    function renderView(viewElement, viewHtml, model) {
        viewHtml = replaceToken(viewHtml, model);

        viewElement.innerHTML = viewHtml;

        _rendered = true;
    }

    //View Container Object
    /** @constructor */
    var viewContainer = function (renderDelegate) {
        this.render = renderDelegate;
        this.isAsync = false;
        this.removeLastCssLink = function () {
            var links = document.getElementsByTagName('link');
            links = Array.from(links);
            links.forEach(link => {
                if (link.href != 'css/menu.css') {
                    link.parentNode.removeChild(link);
                }

            })
        }
        this.addCssLink = function (url) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            if (!this.checkIfFileIsLoaded(url, 'link')) {
                document.getElementsByTagName('head')[0].appendChild(link);
            }
        }
        this.addScript = function (source) {
            var s = document.createElement('script');
            s.src = source;
            if (!this.checkIfFileIsLoaded(source, 'script')) {
                document.body.appendChild(s);
            }
        }
        this.checkIfFileIsLoaded = function (s, type) {
            var files = document.getElementsByTagName(type);
            for (var i = 0; i < files.length; i++) {
                if (type == 'script') {
                    if (files[i].getAttribute('src') == s) return true;
                }
                else if (type == 'link') {
                    if (files[i].getAttribute('href') == s) return true;
                }
            }
            return false;
        }
        this.removeLastScripts = function (pageName) {
            var scripts = document.getElementsByTagName('script');
            scripts = Array.from(scripts);
            scripts.forEach(script => {
                if (!script.src.includes(pageName)) {
                    script.parentNode.removeChild(script);
                }
            })
        }
    }

    function replaceToken(viewHtml, model) {
        var modelProps = Object.getOwnPropertyNames(model);

        modelProps.forEach(function (element, index, array) {
            viewHtml = viewHtml.replace('{{' + element + '}}', model[element]);
        });
        return viewHtml;
    }
    window['Framework'] = new Framework();

    function startMvc() {
        var pageHash = window.location.hash.replace('#', ''),
            routeName = null,
            routeObj = null;

        routeName = pageHash.replace('/', '');
        routeObj = this._routeMap[routeName];

        if (!routeObj)
            routeObj = _defaultRoute;
        loadTemplate(routeObj, _viewElement, pageHash);
    }

})();