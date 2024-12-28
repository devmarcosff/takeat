/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        takeat: {
          primary: {
            50: '#e0f7fa',
            500: '#00bcd4',
            700: '#0097a7',
            800: '#00838f'
          },
          black: {
            500: '#0A0F1D',
          },
          white: {
            50: '#FFFFFF',
          },
          gray: {
            300: '#FAFAFA',
            400: '#EFEFEF',
            500: '#E1E1E1',
            600: '#A6A7AC',
            700: '#757980',
          },
          orange: {
            500: '#EA5232',
          },
          attention: {
            50: '#F9F2EA',
            500: '#F7931A',
          },
          success: {
            50: '#E9F7F3',
            500: '#4BD281',
          },
          error: {
            50: '#F8ECEE',
            400: '#ef5350 ',
            500: '#D12100',
          },
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        transformLeft: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0%)' },
        },
        transformRight: {
          '0%': { opacity: '0', transform: 'translateX(0)' },
          '100%': { opacity: '1', transform: 'translateX(100%)' },
        },
        'slide-up-fade': {
          '0%': { opacity: 0, transform: 'translateY(2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-right-fade': {
          '0%': { opacity: 0, transform: 'translateX(-2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        'slide-down-fade': {
          '0%': { opacity: 0, transform: 'translateY(-2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-left-fade': {
          '0%': { opacity: 0, transform: 'translateX(2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },

      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        scaleIn: 'scaleIn 0.3s ease-out forwards',
        fadeOut: 'fadeOut 0.3s ease-in forwards',
        scaleOut: 'scaleOut 0.3s ease-in forwards',
        transformLeft: 'transformLeft 0.3s ease-in forwards',
        transformRight: 'transformRight 0.3s ease-in forwards',
        'slide-up-fade': 'slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right-fade': 'slide-right-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade': 'slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left-fade': 'slide-left-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    }
  },
  plugins: [],
}

