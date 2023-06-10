import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/blog-uknow/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "",
      description: "You learn and you know.",
      
    },
    // "/en/": {
    //   lang: "en-US",
    //   title: "UKnow",
    //   description: "You learn and you know.",
    // },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
