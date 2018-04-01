process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = config => {
  config.set({
    basePath: './src',
    browsers: [ 'ChromeHeadless' ],
    files: '**/*.spec.js',
    frameworks: [ 'jasmine', 'jasmine-expect-jsx' ],
    reporters: [ 'jasmine-expect-jsx' ],
    plugins: [ 'karma-jasmine', 'karma-chrome-launcher' ]
  })
}
