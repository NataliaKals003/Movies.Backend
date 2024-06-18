const path = require('path');

console.log('Jest configuration loaded');

module.exports = {
  bail: true,
  coverageProvider: "v8",
  testMatch: [
    path.join(__dirname, 'src/**/*.spec.js')
  ],
}