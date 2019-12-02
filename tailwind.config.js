module.exports = {
  plugins: [
    function({ e, addUtilities, config }) {
      let newUtilities = {};
      let margins = config("theme.margin", {});

      for (const rawKey in margins) {
        if (!margins.hasOwnProperty(rawKey)) { continue; }
        const marginTop = margins[rawKey];

        if (marginTop === "auto") {
          continue;
        }
        const isMinus = rawKey.startsWith("-");
        const key = isMinus ? rawKey.slice(1) : rawKey;
        const className = `${isMinus ? "-" : ""}omt-${key}`;
        const entry = `.${e(className)} > * + *`;
        newUtilities[entry] = { marginTop };
      }

      addUtilities(newUtilities, { variants: ["responsive"] });
    },
  ],
  theme: {
    fontSize: {
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "base": "1rem",
      "lg": "1.125rem",
      "sm": ".875rem",
      "xl": "1.25rem",
      "xs": ".75rem",
    },
  },
  variants: {},
};
