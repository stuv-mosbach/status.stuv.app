module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './util/**/*.{js,ts}'
    ],
    darkMode: 'class',
    plugins: [
        require('@tailwindcss/custom-forms'),
    ],
}
