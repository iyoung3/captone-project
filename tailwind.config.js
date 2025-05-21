/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        screens: {
            sm: '640px',
        },
        extend: {
            colors: {
                primary: '#57a0b3',
                secondary: '#d29739',
            }
        },
    },
    plugins: [],
}