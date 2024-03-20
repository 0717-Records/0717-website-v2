import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary_yellow_dark: '#535026',
        primary_yellow_dim: '#d6ca26',
        primary_yellow: '#fef567',
        primary_yellow_light: '#fffccd',
      },
    },
  },
  plugins: [],
};
export default config;
