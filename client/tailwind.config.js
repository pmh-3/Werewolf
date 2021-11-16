module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'spooky': ['carnivalee-freakshow']
    },
    colors: {
      'orange': '#d87d05',
      'teeth': '#FFFFFF',
      'darkOrange': '#b06604',
      'ice': '#074355',
    },
    fontSize: {
      'computer': '10rem',
      'device': '7rem',
      'TV': '15rem',
      'header': '6rem',
      'large': '3rem',
      'medium': '2rem',
      'small': '1rem',
      'button': '2rem',
    },
    screens: {
    'small': '640px',
    },
    extend: {
      inset: {
        '1/5':'20%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
