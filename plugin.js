'use strict'

function MyPlugin() {}

MyPlugin.prototype.apply = function(compiler) {
  compiler.plugin('after-compile', function(compilation) {
    debugger
  })
}

module.exports = MyPlugin
