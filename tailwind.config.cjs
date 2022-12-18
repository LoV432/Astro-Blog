/** @type {import('tailwindcss').Config} */
module.exports = {
	daisyui: {
		themes: ["dark"],
	  },
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'rubik': ['"Rubik Vinyl"'],
			  },
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require("daisyui")
	],
}
