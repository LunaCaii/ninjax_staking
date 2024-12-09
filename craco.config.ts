const path = require("path");

export default {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or 'modern'
        },
      },
    },
  },
};
