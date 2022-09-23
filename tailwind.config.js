/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx}", "./public/index.html"],
	theme: {
		extend: {
			colors: {
				bg: "hsla(240, 12%, 97%, 1)",
			},
		},
	},
	plugins: [],
};
