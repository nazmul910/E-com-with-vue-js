/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['selector', '[class*="app-dark"]'],
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    plugins: [require('tailwindcss-primeui')],
    theme: {
        screens: {
            xm: '320px',
            sm: '576px',
            md: '768px',
            lg: '992px',
            lgg: '1024px',
            xl: '1200px',
            '2xl': '1920px'
        }
    }
};
