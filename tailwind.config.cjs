/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], //在生产构建中对未使用的样式进行摇树优化
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
