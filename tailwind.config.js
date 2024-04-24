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
                'purple': '#E3D1FF',
                'plighter': "#e9daff",
                'dark': '#6D4B96',
                'darker': '#380B5E',
                'lighter': '#C9AAFF',
                'light': '#A5A4FF',
                'red': '#D22B2B'
            },
            boxShadow: {
                neon: '0 0 5px #E3D1FF, 0 0 10px #6D4B96',
                neon2: '0 0 3px #e9daff, 0 0 7px #E3D1FF'
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