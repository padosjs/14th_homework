import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/commons/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
			// Gray Palette
			gray: {
				50: '#f2f2f2',
				100: '#e4e4e4',
				200: '#d4d3d3',
				300: '#c7c7c7',
				400: '#ababab',
				500: '#919191',
				600: '#777777',
				700: '#5f5f5f',
				800: '#333333',
				900: '#1c1c1c',
				950: '#000000',
			},
  			// Brand Colors
  			brand: {
  				primary: '#2974e5',
  				success: '#00b341',
  				error: '#f66a6a',
  				warning: '#ffa500',
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			pretendard: ['"Pretendard"', 'sans-serif'],
  			pretendardVariable: ['"Pretendard Variable"', 'sans-serif'],
  		},
  		fontSize: {
  			// Bold typography
  			'b-28-36': ['28px', { lineHeight: '36px', fontWeight: '700' }],
  			'b-24-32': ['24px', { lineHeight: '32px', fontWeight: '700' }],
  			'b-20-28': ['20px', { lineHeight: '28px', fontWeight: '700' }],
  			'b-16-24': ['16px', { lineHeight: '24px', fontWeight: '700' }],
  			'b-14-20': ['14px', { lineHeight: '20px', fontWeight: '700' }],
  			// SemiBold typography
  			'sb-18-24': ['18px', { lineHeight: '24px', fontWeight: '600' }],
  			'sb-16-24': ['16px', { lineHeight: '24px', fontWeight: '600' }],
  			'sb-14-20': ['14px', { lineHeight: '20px', fontWeight: '600' }],
  			// Medium typography
  			'me-20-24': ['20px', { lineHeight: '24px', fontWeight: '500' }],
  			'me-16-24': ['16px', { lineHeight: '24px', fontWeight: '500' }],
  			'me-16-20': ['16px', { lineHeight: '20px', fontWeight: '500' }],
  			'me-14-20': ['14px', { lineHeight: '20px', fontWeight: '500' }],
  			'me-13-20': ['13px', { lineHeight: '20px', fontWeight: '500' }],
  			'me-12-20': ['12px', { lineHeight: '20px', fontWeight: '500' }],
  			'me-11-12': ['11px', { lineHeight: '12px', fontWeight: '500' }],
  			// Regular typography
  			'r-20-24': ['20px', { lineHeight: '24px', fontWeight: '400' }],
  			'r-16-24': ['16px', { lineHeight: '24px', fontWeight: '400' }],
  			'r-14-20': ['14px', { lineHeight: '20px', fontWeight: '400' }],
  			'r-12-20': ['12px', { lineHeight: '20px', fontWeight: '400' }],
  			'r-11-12': ['11px', { lineHeight: '12px', fontWeight: '400' }],
  			// Light typography
  			'l-14-20': ['14px', { lineHeight: '20px', fontWeight: '300' }],
  			'l-12-20': ['12px', { lineHeight: '20px', fontWeight: '300' }],
		},
		boxShadow: {
			'custom': '0 0 20px 0 rgba(0, 0, 0, 0.08)',
		}
	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
