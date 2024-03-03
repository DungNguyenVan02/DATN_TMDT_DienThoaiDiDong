/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		fontFamily: {
			main: ["Outfit", "sans-serif"],
		},
		extend: {
			maxWidth: {
				main: "1200px",
			},

			height: {
				header: "74px",
				headerBottom: "66px",
			},
		},
	},
	plugins: [],
};
