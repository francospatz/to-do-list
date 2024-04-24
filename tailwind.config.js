module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            'sans': ['Inter', 'Arial', 'sans-serif'],
            'serif': ['BookerlyBold', 'Georgia', 'serif']
        },
        screens: {
            xs: '350px',
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1600px",
            "3xl": "1920px"
        },
        extend: {
            colors: {
                'black': '#0d0d0d',
                'white': '#FFFFFF',
                'off-white': '#FCF9F0',
                'light-brown': '#242423',
                'blush': '#DBC9BF',
                'green': '#38d875',
                'blue': '#AEB4BD',
                'red': '#D22B2B'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('tailwindcss'),
        require('autoprefixer')
    ]
}