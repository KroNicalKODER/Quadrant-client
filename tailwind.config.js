const themes = require('./src/Constants/Themes.json');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Ensure Tailwind scans all your files
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        light: {
          background: themes.light.background,
          sidebar_bg: themes.light.sidebar_bg,
          sidebar_text: themes.light.sidebar_text,
          sidebar_tabs_bg: themes.light.sidebar_tabs_bg,
          sidebar_selected_bg: themes.light.sidebar_selected_bg,
          sidebar_selected_text: themes.light.sidebar_selected_text,
          sidebar_chart_pending: themes.light.sidebar_chart_pending,
          sidebar_chart_completed: themes.light.sidebar_chart_completed,
          checkbox_bg: themes.light.checkbox_bg,
          add_task_btn: themes.light.add_task_btn,
          add_task_btn_text: themes.light.add_task_btn_text,
        },
        dark: {
          background: themes.dark.background,
          sidebar_bg: themes.dark.sidebar_bg,
          sidebar_text: themes.dark.sidebar_text,
          sidebar_tabs_bg: themes.dark.sidebar_tabs_bg,
          sidebar_selected_bg: themes.dark.sidebar_selected_bg,
          sidebar_selected_text: themes.dark.sidebar_selected_text,
          sidebar_chart_pending: themes.dark.sidebar_chart_pending,
          sidebar_chart_completed: themes.dark.sidebar_chart_completed,
          checkbox_bg: themes.dark.checkbox_bg,
          add_task_btn: themes.dark.add_task_btn,
          add_task_btn_text: themes.dark.add_task_btn_text,
        },
      },
    },
  },
  plugins: [],
};
