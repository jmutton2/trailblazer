/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx}"],
    mode: "jit",
    theme: {
        extend: {
            colors: {
                primary: "#ffffff",
                primary_dark: "#cecece",
                secondary: "#82cbff",
                secondary_dark: "#006ba6",
                tertiary: "#ee2242",
            },
            screens: {
                xs: "450px",
            },
            keyframes: {
                nodeClicked: {
                    "0%": {
                        transform: "scale(0.3)",
                        "background-color": "#f0f9ff",
                        opacity: "60%",
                        "border-radius": "70%",
                    },

                    "50%": {
                        "background-color": "#a2d8ff",
                    },

                    "75%": {
                        transform: "scale(1.1)",
                        "background-color": "#419bd3",
                    },

                    "100%": {
                        transform: "scale(1)",
                        "background-color": "#006197",
                    },
                },
                nodeUnclicked: {
                    "0%": {
                        transform: "scale(1)",
                        "background-color": "#f0f9ff",
                    },
                    "50%": {
                        transform: "scale(1.1)",
                        "background-color": "#a2d8ff",
                    },
                    "75%": {
                        "background-color": "#419bd3",
                    },
                    "100%": {
                        transform: "scale(0.3)",
                        "background-color": "#006197",
                        opacity: "60%",
                        "border-radius": "70%",
                    },
                },
            },
            animation: {
                "node-clicked": "nodeClicked .5s linear",
                "node-unclicked": "nodeUnclicked .5s linear",
            },
        },
    },
    plugins: [],
};
