const iconPlugin = require('./src/icons-plugin');

module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [
    iconPlugin, 
  ],
};
