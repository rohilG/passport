module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        auth_modal: {
          DEFAULT: "rgb(255, 255, 255)",
        },
        nft_card:{
          DEFAULT: "#303339",
          info: '#e4e8eb',
          collection_name: "#8a939b",
          price_tag: "#8a939b",
        },
        ticket_purchase:{
          DEFAULT: "rgb(0, 21, 255)",
          owned_by: "#8a939b",
          accent: "#2081e2",
          button: "#2081e2",
        },
        auth_modal_text: {
          DEFAULT: "rgb(0, 0, 0)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
