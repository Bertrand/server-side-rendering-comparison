'use strict';

/**
 * compare renderToString
 */

const Benchmark = require('benchmark');



const Rax = require('rax');
const raxRenderToString = require('rax-server-renderer').renderToString;
const React = require('../assets/build/server.react.bundle').react
const ReactDOMServer = require('../assets/build/server.react.bundle').dom_react_server
const Vue = require('vue');
const vueRenderToString = require('vue-server-renderer').createRenderer().renderToString;
const Preact = require('preact');
const preactRenderToString = require('preact-render-to-string');


const ReactApp = require('../assets/build/server.react.bundle').react_app;
const RaxApp = require('../assets/build/server.rax.bundle').default;
const VueApp = require('../assets/build/server.vue.bundle').default;
const PreactApp = require('../assets/build/server.preact.bundle').default;

const data = {
  listData: require('../mock/list'),
  bannerData: require('../mock/banner')
};

const vueVm = new Vue({
  render(h) {
    return h(VueApp, {
      attrs: {
        listData: data.listData,
        bannerData: data.bannerData
      }
    });
  }
});

const suite = new Benchmark.Suite;

suite
  .add('Rax#renderToString', function() {
    raxRenderToString(Rax.createElement(RaxApp, data));
  })
  .add('React#renderToString', function() {
    ReactDOMServer.renderToString(React.createElement(ReactApp, data));
  })
  .add('Preact#renderToString', function() {
    preactRenderToString(Preact.h(PreactApp, data));
  })
  .add('Vue#renderToString', function(deferred) {
    vueRenderToString(vueVm, (err, html) => {
      if(err) {
        throw err;
      } else {
        deferred.resolve();
      }
    });
  }, {defer: true})
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': true });
