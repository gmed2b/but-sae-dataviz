import React from 'react'
import * as echarts from 'echarts/core'
import ReactEChart from 'echarts-for-react'
import LandingHero from './components/landing-hero'
import { getData, getFireCountPerMonth, getAverageFireSizePerYear, getAverageFireSizePerFifthYear, getFireNatureCount } from './lib/functions'
import './app.css'

const App = () => {
	const [pieOption, setPieOption] = React.useState<any>({})
	const [chartOption, setChartOption] = React.useState<any>({})
	const [barOption, setBarOption] = React.useState<any>({})
	const [mapOption, setMapOption] = React.useState<any>({})

	React.useEffect(() => {
		async function fetchData() {
			try {
				// const corsicaMap = await getData('./data/communes-corse.geojson')
				const data = await getData('/data/all.json')

				// const origineIncendies = getAveragePercentageOfOrigin(data)
				const FireNaturePercentage = getFireNatureCount(data)
				setPieOption({
					tooltip: {
						trigger: 'item'
					},
					legend: {
						orient: 'horizontal',
						bottom: 'bottom',
						selected: {
							Inconnu: false
						}
					},
					series: [
						{
							name: 'Origine des incendies',
							type: 'pie',
							radius: ['40%', '80%'],
							center: ['50%', '40%'],
							avoidLabelOverlap: false,
							itemStyle: {
								borderRadius: 10,
								borderColor: '#fff',
								borderWidth: 2
							},
							label: {
								show: false,
								position: 'center'
							},
							emphasis: {
								label: {
									show: true,
									fontSize: 30,
									fontWeight: 'bold'
								}
							},
							labelLine: {
								show: false
							},
							data: Object.entries(FireNaturePercentage).map(([key, value]) => {
								return {
									name: value.name,
									value: value.value
								}
							})
						}
					]
				})

				const FireCountPerMonth = getFireCountPerMonth(data)
				setChartOption({
					tooltip: {
						trigger: 'axis',
						position: function (pt: any[]) {
							return [pt[0], '10%']
						}
					},
					toolbox: {
						feature: {
							restore: {},
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: Object.keys(FireCountPerMonth)
					},
					yAxis: {
						type: 'value',
						boundaryGap: [0, 0.4]
					},
					dataZoom: [
						{
							type: 'inside',
							start: 0,
							end: 100
						},
						{
							start: 0,
							end: 100
						}
					],
					series: [
						{
							name: "Nombre d'incendies depuis 1992",
							type: 'line',
							symbol: 'none',
							sampling: 'lttb',
							itemStyle: {
								color: 'rgb(255, 70, 131)'
							},
							areaStyle: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: 'rgb(255, 158, 68)'
									},
									{
										offset: 1,
										color: 'rgb(255, 70, 131)'
									}
								])
							},
							data: Object.values(FireCountPerMonth)
						}
					]
				})

				const averageFireSizePerYear = getAverageFireSizePerYear(data)
				const averageFireSizePerFiveYears = getAverageFireSizePerFifthYear(averageFireSizePerYear)
				setBarOption({
					xAxis: {
						type: 'value'
					},
					yAxis: {
						type: 'category',
						data: Object.keys(averageFireSizePerYear)
					},
					series: [
						{
							data: Object.values(averageFireSizePerYear),
							type: 'bar',
							emphasis: {
								focus: 'series'
							},
							animationDelay: function (idx: any) {
								return idx * 30
							}
						},
						{
							data: averageFireSizePerFiveYears,
							type: 'line',
							emphasis: {
								focus: 'series'
							},
							animationDelay: function (idx: any) {
								return idx * 10
							},
							smooth: true,
							lineStyle: {
								color: '#f97315',
								width: 5
							}
						}
					]
				})

				// echarts.registerMap('CORSICA', corsicaMap)
				// setMapOption({
				// 	title: {
				// 		text: 'USA Population Estimates (2012)',
				// 		subtext: 'Data from www.census.gov',
				// 		sublink: 'http://www.census.gov/popest/data/datasets.html',
				// 		left: 'right'
				// 	},
				// 	tooltip: {
				// 		trigger: 'item',
				// 		showDelay: 0,
				// 		transitionDuration: 0.2
				// 	},
				// 	visualMap: {
				// 		left: 'right',
				// 		min: 10000,
				// 		max: 300000,
				// 		inRange: {
				// 			color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
				// 		},
				// 		text: ['High', 'Low'], // 文本，默认为数值文本
				// 		calculable: true
				// 	},
				// 	toolbox: {
				// 		show: true,
				// 		//orient: 'vertical',
				// 		left: 'left',
				// 		top: 'top',
				// 		feature: {
				// 			dataView: { readOnly: false },
				// 			restore: {},
				// 			saveAsImage: {}
				// 		}
				// 	},
				// 	series: [
				// 		{
				// 			name: 'USA PopEstimates',
				// 			type: 'map',
				// 			map: 'CORSICA',
				// 			// projection: {
				// 			// 	project: function (point) {
				// 			// 		return projection(point);
				// 			// 	},
				// 			// 	unproject: function (point) {
				// 			// 		return projection.invert(point);
				// 			// 	}
				// 			// },
				// 			emphasis: {
				// 				label: {
				// 					show: true
				// 				}
				// 			},
				// 			data: [
				// 				{ name: 'Alabama', value: 4822023 },
				// 				{ name: 'Alaska', value: 731449 },
				// 				{ name: 'Arizona', value: 6553255 },
				// 				{ name: 'Arkansas', value: 2949131 },
				// 				{ name: 'California', value: 38041430 },
				// 				{ name: 'Colorado', value: 5187582 },
				// 				{ name: 'Connecticut', value: 3590347 },
				// 				{ name: 'Delaware', value: 917092 },
				// 				{ name: 'District of Columbia', value: 632323 },
				// 				{ name: 'Florida', value: 19317568 },
				// 				{ name: 'Georgia', value: 9919945 },
				// 				{ name: 'Hawaii', value: 1392313 },
				// 				{ name: 'Idaho', value: 1595728 },
				// 				{ name: 'Illinois', value: 12875255 },
				// 				{ name: 'Indiana', value: 6537334 },
				// 				{ name: 'Iowa', value: 3074186 },
				// 				{ name: 'Kansas', value: 2885905 },
				// 				{ name: 'Kentucky', value: 4380415 },
				// 				{ name: 'Louisiana', value: 4601893 },
				// 				{ name: 'Maine', value: 1329192 },
				// 				{ name: 'Maryland', value: 5884563 },
				// 				{ name: 'Massachusetts', value: 6646144 },
				// 				{ name: 'Michigan', value: 9883360 },
				// 				{ name: 'Minnesota', value: 5379139 },
				// 				{ name: 'Mississippi', value: 2984926 },
				// 				{ name: 'Missouri', value: 6021988 },
				// 				{ name: 'Montana', value: 1005141 },
				// 				{ name: 'Nebraska', value: 1855525 },
				// 				{ name: 'Nevada', value: 2758931 },
				// 				{ name: 'New Hampshire', value: 1320718 },
				// 				{ name: 'New Jersey', value: 8864590 },
				// 				{ name: 'New Mexico', value: 2085538 },
				// 				{ name: 'New York', value: 19570261 },
				// 				{ name: 'North Carolina', value: 9752073 },
				// 				{ name: 'North Dakota', value: 699628 },
				// 				{ name: 'Ohio', value: 11544225 },
				// 				{ name: 'Oklahoma', value: 3814820 },
				// 				{ name: 'Oregon', value: 3899353 },
				// 				{ name: 'Pennsylvania', value: 12763536 },
				// 				{ name: 'Rhode Island', value: 1050292 },
				// 				{ name: 'South Carolina', value: 4723723 },
				// 				{ name: 'South Dakota', value: 833354 },
				// 				{ name: 'Tennessee', value: 6456243 },
				// 				{ name: 'Texas', value: 26059203 },
				// 				{ name: 'Utah', value: 2855287 },
				// 				{ name: 'Vermont', value: 626011 },
				// 				{ name: 'Virginia', value: 8185867 },
				// 				{ name: 'Washington', value: 6897012 },
				// 				{ name: 'West Virginia', value: 1855413 },
				// 				{ name: 'Wisconsin', value: 5726398 },
				// 				{ name: 'Wyoming', value: 576412 },
				// 				{ name: 'Puerto Rico', value: 3667084 }
				// 			]
				// 		}
				// 	]
				// })
			} catch (error) {
				console.error(error)
			}
		}
		fetchData()
	}, [])

	return (
		<>
			<LandingHero />
			<main>
				<section className='container min-h-screen m-auto px-5 flex flex-col md:flex-row'>
					<aside className='md:w-2/5 pt-48'>
						<h2 className='text-xl sm:text-2xl md:text-3xl mb-8 font-bold hover:underline text-orange-500	'>Nature des incendies</h2>
						<p className='text-lg text-justify mb-3'>
							L'incendie de forêt, qu'il soit hivernal ou estival, peut provenir de diverses origines et prendre différentes formes. Il peut s'agir d'un
							incendie d'origine naturel (foudre), lié à l'activité humaine (origine accidentelle, vehicule, cigarette, etc.) ou encore provoqué par un
							dysfonctionnement d'infrastructures, comme les lignes électriques, ou par acte de malveillance pour divers intérêts.
						</p>
						<p className='text-sm sm:text-base mb-1 text-slate-400'>Source: BD Promethée, de 1992 à 2022</p>
					</aside>
					<ReactEChart
						className='md:mt-52 md:w-2/3'
						option={pieOption}
						style={{ height: '650px' }}
						theme='roma'
					/>
				</section>

				<section className='container min-h-screen m-auto px-5 flex flex-col'>
					<aside className='pt-36'>
						<h2 className='text-xl sm:text-2xl md:text-3xl mb-8 font-bold hover:underline text-orange-500	'>Rescencement des incendies depuis 1992</h2>
						<p className='text-lg text-justify mb-1'>
							Le graphique ci-dessous représente l'évolution du nombre d'incendies par mois depuis 1992. On remarque très clairement que ce chiffre est en
							baisse.
						</p>
						<p className='text-sm sm:text-base mb-1 text-slate-400'>Source: BD Promethée, de 1992 à 2022</p>
					</aside>

					<ReactEChart
						option={chartOption}
						style={{ height: '700px' }}
					/>
				</section>

				<section className='container min-h-screen m-auto px-5 flex flex-col md:flex-row'>
					<ReactEChart
						className='md:mt-44 md:w-2/3'
						option={barOption}
						style={{ height: '900px' }}
					/>
					<aside className='md:w-2/5 pt-32'>
						<h2 className='text-xl sm:text-2xl md:text-3xl mb-8 font-bold hover:underline text-orange-500	'>Surface moyenne des incendies par année</h2>
						<p className='text-sm sm:text-base mb-1'>
							Ici, nous avons représenté la surface moyenne des incendies par année (visible en bleu). Par dessus, nous avons représenté la surface moyenne des
							incendies tout les 5 ans (visible en orange).
						</p>
						<p className='text-sm sm:text-base mb-1 text-slate-400'>Source: BD Promethée, de 1992 à 2022</p>
					</aside>
				</section>
			</main>
		</>
	)
}

export default App
