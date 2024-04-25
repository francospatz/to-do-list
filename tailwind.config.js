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
        // Custom colors and shadows
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
                'yellow': '#FFEDBD',
                'red': '#D22B2B'
            },
            boxShadow: {
                neon: '0 0 5px #C9AAFF, 0 0 20px #E3D1FF',
                neon2: '0 0 3px #e9daff, 0 0 7px #E3D1FF'
            },
            keyFreames: {
                gradient: {
                    "0%": { backgroundPosition: "0% 50%" },
                    "100%": { backgroundPosition: "100% 50%" },
                }
            },
            animation: {
                gradient: "gradient 2s linear infinite"
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