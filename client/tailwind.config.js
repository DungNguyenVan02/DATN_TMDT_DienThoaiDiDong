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
			boxShadow: {
				l: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
			},
		},
	},
	plugins: [],
};
