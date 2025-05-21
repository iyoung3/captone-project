/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
        },
        extend: {
            colors: {
                primary: '#7ab5bb',
                secondary: '#f0ead0',
            }
        },
    },
    plugins: [],
}