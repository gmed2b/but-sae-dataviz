/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		fontFamily: {
			jetbrains: ['JetBrains Mono', 'monospace']
		},
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
}
