import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "/index.html",
        about: "/about.html",
        appeals: "/appeals.html",
        nexus: "/nexus.html",
        studios: "/studios.html",
        fund: "/fund.html",
        invest: "/invest.html",
        contact: "/contact.html"
      },
    },
  },
});
