module.exports = {
  html: {
    title: 'Tic Tac Toe'
  },
  presets: [
    require('poi-preset-karma')({
      files: ['src/**/*.spec.js'],
      frameworks: [ 'jasmine', 'jasmine-expect-jsx' ],
      reporters: [ 'jasmine-expect-jsx' ],
      headless: true
    })
  ]
}