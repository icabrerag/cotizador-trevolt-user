module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1a1a1a', // Fondo oscuro
        green: '#32a852', // Verde personalizado
        light: '#f5f5f5', // Color claro para contraste
      },
    },
  },
  plugins: [],
}
