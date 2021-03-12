const validRoutes = (routes) => {
    return routes.every((route) => {
        return route.hasOwnProperty('name')
            && route.hasOwnProperty('path')
            && route.hasOwnProperty('accept');
    });
}

const router = function () {
    this.callbacks = {};
    this.routes = [];
    this.prefix = false;

    this.setRoutes = (routes) => {
        this.routes = routes.map(e => {
            return {
                ...e,
                path: `${this.prefix ? `/${this.prefix}` : ''}${e.path}`
            }
        });
    }

    this.useMap = (callbacks) => {
        Object.keys(callbacks).forEach((name) => {
            if (this.callbacks[name]) {
                throw new Error('Duplicate route name');
            }

            this._at(name, callbacks[name]);
        });
    }

    this.match = (url, method) => {
        const prefix = `${this.prefix ? `/${this.prefix}` : ''}`;
        if (prefix) {
            url = url.substr(`/${this.prefix}`.length);
        }

        const explode = url.split('/');

        let routes = this.routes
            .filter(e => {
                return e.path.startsWith(`${prefix}/${explode[1]}`)
                    && e.accept.includes(method);
            });

        let params = {};
        if (explode[2]) {
            params = { id: explode[2] };

            routes = routes
                .filter(e => {
                    return e.path.includes('-id');
                });
        }

        const matches = routes.length;

        if (!matches) { throw 'No route found'; }

        return {
            route: routes[0],
            callback: this.callbacks[routes[0].name],
            params
        };
    }

    this.setPrefix = (prefix) => {
        this.prefix = prefix;
    }
}

router.prototype._at = function (routeName, callback) {
    this.callbacks = {
        ...this.callbacks,
        [routeName]: callback
    };

    return this;
}

module.exports = router;
