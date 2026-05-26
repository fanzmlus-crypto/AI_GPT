module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        worm: {
          bg: '#0d0208',
          card: '#1a0f14',
          green: '#00ff41',
          greenDark: '#00b82e',
          red: '#ff006e',
          border: '#2a1f24',
        }
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
