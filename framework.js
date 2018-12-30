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


        if (!view.isAsync && !_rendered)
            renderView(viewElement, viewHtml, model)
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
        this.addCssLink = function (url) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        this.addScript = function (source) {
            var s = document.createElement('script');
            s.src = source;
            if (!this.checkIfScriptIsLoaded(source)) {
                document.body.appendChild(s);
            }
        }
        this.checkIfScriptIsLoaded = function (s) {
            var scripts = document.getElementsByTagName("script");
            for (var i = 0; i < scripts.length; i++)
                if (scripts[i].getAttribute('src') == src) return true;
            return false;
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