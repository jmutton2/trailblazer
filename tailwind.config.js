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
                    },

                    "50%": {
                        "background-color": "#a2d8ff",
                    },

                    "100%": {
                        transform: "scale(1)",
                        "background-color": "#006197",
                    },
                },
                pathFinding: {
                    "0%": {
                        transform: "scale(0.3)",
                        "background-color": "#ee2242",
                        opacity: "60%",
                        "border-radius": "100%",
                    },
                    "10%": {
                        transform: "scale(0.3)",
                        "background-color": "#ffffff",
                        opacity: "60%",
                        "border-radius": "100%",
                    },

                    "50%": {
                        "background-color": "#c1e5ff",
                    },

                    "75%": {
                        transform: "scale(1.1)",
                        "background-color": "#a2eaff",
                    },

                    "100%": {
                        transform: "scale(1)",
                        "background-color": "#82cbff",
                    },
                },
                quickestNode: {
                    "0%": {
                        "background-color": "#82cbff",
                    },
                    "50%": {
                        "background-color": "#c1e5ff",
                    },
                    "50%": {
                        "background-color": "#f1bfc7",
                    },
                    "75%": {
                        transform: "scale(1.1)",
                        "background-color": "#ee2242",
                    },
                    "100%": {
                        transform: "scale(1)",
                        "background-color": "#f2546c",
                    },
                },
            },
            animation: {
                "node-clicked": "nodeClicked .2s linear",
                "node-visited": "pathFinding .75s linear",
                "node-quickest": "quickestNode 1s linear",
            },
            backgroundImage: {
                "start-node": "url('./assets/start-node.png')",
                "end-node": "url('./assets/end-node.png')",
            },
        },
    },
    plugins: [],
};
