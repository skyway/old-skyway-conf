module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      // XXX: need to load as external to avoid multiple instance issue
      './node_modules/mobx/lib/mobx.umd.js',
      './__tests__/**/*.test.js',
    ],
    preprocessors: {
      './__tests__/**/*.test.js': ['rollup'],
    },
    rollupPreprocessor: {
      plugins: [
        require('rollup-plugin-node-resolve')(),
        require('rollup-plugin-commonjs')(),
      ],
      output: {
        format: 'iife',
        globals: {
          mobx: 'mobx',
        },
      },
      external: ['mobx'],
    },
    singleRun: true,
    reporters: ['mocha'],
    port: 9876,
    browsers: ['ChromeHeadless'],
  });
};
