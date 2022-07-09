const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // eslint-disable-next-line no-dupe-keys
  transpileDependencies: ['vuex-persist']
})
