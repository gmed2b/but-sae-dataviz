import { useEffect, useRef } from 'react'

const LandingHero = () => {
	const author = useRef<HTMLHeadingElement>(null)
	const logoUniversita = useRef<HTMLImageElement>(null)
	const logoIut = useRef<HTMLImageElement>(null)

	useEffect(() => {
		const animateLogo = (logo: Element | null, className: string) => {
			if (logo) {
				logo.classList.remove('hidden')
				logo.classList.add(className)
				setTimeout(() => {
					logo.classList.remove(className)
				}, 1000)
			}
		}
		setTimeout(() => {
			animateLogo(logoUniversita.current, 'logo-universita')
			animateLogo(logoIut.current, 'logo-iut')
		}, 1000)
		setTimeout(() => {
			animateLogo(author.current, 'author')
		}, 2000)
	})

	return (
		<header className='min-h-screen flex items-center justify-center'>
			<img
				id='logo-sae'
				width={800}
				className={'px-8'}
				src={'/sae303.svg'}
				alt='logo'
			/>
			<div className='absolute bottom-0 left-0 p-8'>
				<h1
					ref={author}
					id='author'
					className='hidden font-jetbrains text-xl text-slate-900'
				>
					Fait par Mehdi Ghoulam
				</h1>
			</div>
			<div className='absolute bottom-0 right-0 p-8 overflow-hidden flex gap-20'>
				<img
					ref={logoUniversita}
					src={'/universita-corsica.png'}
					alt='logo'
					className='w-48 hidden'
				/>
				<img
					ref={logoIut}
					src={'/iut-corsica.svg'}
					alt='logo'
					className='w-64 hidden'
				/>
			</div>
		</header>
	)
}

export default LandingHero
