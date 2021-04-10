module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
  borderRadius: { none: 0, sm: '6px', md: '12px', lg: '16px' },
  flexGrow: {
    DEFAULT: 1,
        2: 2,
  },
  fontSize: {
    xs: '12px',
        sm: '13px',
        base: '14px',
        lg: '16px',
  },
  screens: {
    sm: { max: '1023px' },
    lg: '1024px',
  },
  extend: {
    colors: {
      transparent: 'transparent!important',
          neutral: {
        black: '#000',
            gray: '#5E7181',
            gray2: '#92A4AD',
            gray3: '#C0D2DB',
            graylight: '#EFF2F3',
            white: '#FFF',
      },
      primary: {
        yellow: '#FABB00',
            yellowlight: '#FFD866',
            yellowlight2: '#FFE1A4',
            yellowlight3: '#FFEECA',
            yellowlight4: '#FFF6E4',
            blue: '#00519E',
            bluelight: '#C6E3FF',
            bluelight2: '#C6E3FF',
            bluelight3: '#EFF7FF',
      },
      secondary: {
        red: '#E2003B',
            redwarn: '#FF0F1D',
            redlight: '#FF8C8C',
            redlight2: '#FFA8AD',
            redlight3: '#FFE2E4',
            reddark: '#F20210',
            green: '#039900',
            greenfresh: '#77C676',
            greenlight: '#B3EDB3',
            greenlight2: '#E6F9D9',
            greendark: '#026F00',
            blue: '#219FC7',
            bluedark: '#1C2D4D',
            bluedark2: '#004180',
            tyrquoise: '#4EB3D3',
            orange: '#FF8600',
            orangedark: '#D26E00',
            orangelight: '#F9E9D9',
      },
    },
    outline: {
      selected: '2px solid #00519E',
    },
    spacing: {
      0.5: '4px',
          0.75: '6px',
          1: '8px',
          1.5: '12px',
          2: '16px',
          2.5: '20px',
          3: '24px',
          4: '32px',
          5: '40px',
          10: '80px',
    },
  },
},
};
