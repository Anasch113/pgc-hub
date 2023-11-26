/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-blue': '#5c5c99',
        'custom-red': '#C13E31',
        'dark-blue' : '#24243e',
        'offWhite' : 'hsl(216, 20%, 97%)',
        'light-gradient' : ' #F3F7FA',
        'light-blue': '#438fda'
        
        
        
      },
      
      textColor: {
        'custom-blue-2': '#5c5c99',
        'custom-red': '#C13E31',
        'dark-blue' : '#24243e'
        ,
        'light-blue': '#438fda'
      },

      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      backgroundImage:{
        'hero-pattern': "url('../assets/cars-bg.svg')",
      }
    },
  },
  plugins: [],
}