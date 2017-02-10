

module.exports = {

    home: function* () {

        const ReactApp = require('../assets/build/server.react.bundle').react_app;
        const React = require('../assets/build/server.react.bundle').react
        const ReactDOMServer = require('../assets/build/server.react.bundle').dom_react_server

        const pageConfig = {
            listData: require('../mock/list'),
            bannerData: require('../mock/banner')
        };

        yield this.render('page', {
            type: 'react',
            content: ReactDOMServer.renderToString(
                        React.createElement(ReactApp, pageConfig)
                    ),
            global: JSON.stringify(pageConfig)
        });

    }

}