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
				custom: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
			},
			backgroundColor: {
				overlay: "rgba(10, 10, 10, 0.86)",
			},
		},
	},
	plugins: [],
};
