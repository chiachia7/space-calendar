// postcss.config.js

module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},  // これが新しい推奨の書き方
    tailwindcss: {},
    autoprefixer: {},
  },
}
