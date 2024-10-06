/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Shades of Purple
        lavenderPurpleReplica: '#007AB6',
        lavenderPurple: '#7F56D9',
        RoyalPurple: '#7138DF',
        rotalPurple: '#6941C6',
        // Whites and Grays
        snowWhite: '#FFF',
        lightyGray: '#90A0B7',
        mistyWhite: '#E7E7E7',
        nastyWhite: '#FCFCFD',
        lightGrayishBlue: '#E3E8EF',
        paleGrayishWhite: '#FBFBFE',
        cloudWhite: '#F4EBFF',
        cloudWhite2: '#F8F8F8',
        pearlWhite: '#F5F6FA',
        cosmicGray: '#F9F5FF',
        celestialGray: '#D0D5DD',
        nebulaGray: '#EAECF0',
        coolGray: '#98A2B3',
        silverGray: '#F0F1F3',
        silverFoil: '#AEAEAE',
        silver: '#BDBDBD',
        paleblueGray: '#F9FAFB',
        alabasterWhite: '#F5F6F8',
        doveGray: '#D0D0D0',
        elboneyGray: '#E9E9E9',
        ebonyGray: '#101828',
        slateGray: '#475467',
        graphiteGray: '#344054',
        charcoalGray: '#6A6A6A',
        steelGray: '#667085',
        midnightBlue: '#192A3E',
        lightSteelGray: '#E8E8E8',
        ashGray: '#868686',
        lightGrayish: '#F2F4F7',
        silverGray: '#F6F6F6',
        Gainsboro: '#DFDFDF',
        graylittle: '#ECECEC',
        graylighty: '#E5E1E6',
        darkgrayish: '#464646',
        darkGray: '#8B8B8B',
        blueOrchid: '#3348FF',
        // Deep and Dark Colors
        royalIndigo: '#036',
        obsidianBlack: '#1A141F',
        midnightBlue2: '#001556',
        pitchBlack: '#181818',
        goldenrodYellow: '#EF9F28',
        abyssalBlack: '#202020',
        emeraldGreen: '#027A48',
        mintGreen: '#ECFDF3',
        darkSteelBlue: '#364153',
        strongBlue: '#0079C2',
        lightBlueGray: '#E7EAEE',
        greenishGreen: '#36B37E',
        lightdark: 'rgba(4, 4, 4, 0.50)',
        lightdark2: 'rgba(0, 0, 0, 0.60)',
        lightGray: '#F7F9FF',
        lightyGrayish: '#6A6A6A',
        lightblue: 'rgba(49, 89, 254, 0.10)',
        darkblue: '#3159FE',
        lightenGreyish: '#949494',
        pattensBlue: '#DBF4FF',
        paleBlueLily: '#CCECFB',
        wedgeWood: '#5A7184',
        vividRed: '#EC2224',
        ebonyClay: '#1D2939',
        monsoon: '#84818A',
        rangoonGreen: '#1C1C1C',
        osloGrey: '#848C9D',
        stormGrey: '#67727E',
        // Schesti Color Palette
        schestiPrimary: '#007AB6',
        schestiLightPrimary: '#E6F2F8',
        schestiSuccess: '#36B37E',
        schestiLightSuccess: '#ECFDF3',
        schestiWarning: '#FFC107',
        schestiPrimaryBlack: '#475467',
        schestiLightBlack: '#667085',
        schestiLightGray: '#EAECF0',
        schestiPrimaryBG: '#F8F8F8',
        mercury: '#E1E5EA',
        
        // blue: '[#007AB6]',
        // Slate_Blue: '#718096',
        // blue_dark: '#002B40',
        // blue_gray: '#404B5A',
        // gray: '#161C2D',
        // white_gray: '#E6F2F8',
        // white_light: '#FAFAFA',
        // gray_dark: '#161C2D',
        // white: '#FFFFFF',
        // dark_black: '#181D25',
        // dark_gray: '#474C59',
        // lite_black: '#4A5568',
        // dark_blue: '#27303F',
        // gray_white: '#F5F6FA',
        // charcoal_gray: '#1A202C',
        // gray_900: '#181D25',
        // light_gray: '#404B5A',
      },
      // fontWeight: {
      //   light: '300',
      //   regular: '400',
      //   medium: '500',
      //   bold: '700',
      //   heavy: '900',
      // },
      boxShadow: {
        // Soft Glow for Primary Element
        primaryGlow: '0px 0px 30px 0px rgba(47, 45, 107, 0.10)',
        // Subtle Shadow for Secondary Element
        secondaryShadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.08)',
        // Mysterious Tertiary Shadow
        tertiaryMystery: '0px 0px 29px 0px rgba(0, 0, 0, 0.08)',
        // Another Subtle Shadow for Quinary Element
        quinary: '0px 0px 16px 0px rgba(0, 0, 0, 0.08)',
        // Dramatic Quaternary Shadow
        quaternaryDrama: '0px 10px 30px 0px rgba(62, 19, 77, 0.47)',
        // Subdued Scenary Shadow
        scenarySubdued: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        // Secondary Element with a Twist
        secondaryTwist: '0px 4px 30px 0px rgba(46, 45, 116, 0.05)',
        // Tertiary Element with Depth
        tertiaryDepth:
          '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
        // Gentle Quinary Shadow
        quinaryGentle: '0px 10px 30px 0px rgba(47, 45, 107, 0.05)',
        quinarGentleDepth: '0px 4px 30px 0px rgba(46, 45, 116, 0.05)',
        depthInset: '0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset',
        instentWhite: ' 0px 0px 20px 0px rgba(52, 73, 92, 0.07)',
        // button: '0px 4px 30px 0px rgba(0, 122, 182, 0.1)',
        // custom: '0px 0px 45px 0px rgba(182, 195, 241, 0.25)',
        // custom2: '0px 4px 40px 0px rgba(43, 62, 133, 0.25)',
        // custom3: '0px 4px 45px 0px #91A0B226',
        // tabsShadow: '0px 2px 40px 4px rgba(56, 87, 102, 0.1)',
      },

      backgroundImage: (theme) => ({
        primaryGradient: 'linear-gradient(180deg, #8449EB 0%, #6A56F6 100%)',
      }),
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      popin: ['Poppins', 'sans-serif'],
      openSans: ['Open Sans', 'sans-serif'],
      lato: ['Lato', 'sans-serif'],
      Gilroy: ['Gilroy', 'sans-serif'],
      Poppins: ['Poppins'],
      manrope: ['Manrope', 'sans-serif'],
      jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
    },
    hovering: {
      custom: 'transition-transform duration-300 hover:scale-105',
    },
    // borderRadius: {
    //   none: '0',
    //   sm: '10px',
    //   md: '39px',
    //   lg: '300px',
    //   full: '9999px',
    // },
    // fontSize: {
    //   h1: ['48px', { lineHeight: '65px' }],
    //   h2: ['19px', { lineHeight: '32px' }], 
    //   h3: ['17px', { lineHeight: '29px' }],
    //   h4: ['16px', { lineHeight: '20px' }],
    //   h5: ['15px', { lineHeight: '26px' }],
    //   h6: ['17px', { lineHeight: '40px' }],
    //   h7: ['18px', { lineHeight: '27px' }],
    //   h8: ['32px', { lineHeight: '48px' }],
    //   h9: ['16px', { lineHeight: '29px' }],
    // },

  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    },
  ],
  corePlugins: {
    preflight: false,
  },
};
