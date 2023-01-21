import { Fire, FireNatureType, KeyValueType } from '../types/Fire'

export const getData = async (url: string) => {
	const response = await fetch(url)
	const data = (await response.json()) as Fire[]
	return data
}

export const getFireNatureCount = (data: Fire[]) => {
	return data.reduce((acc: KeyValueType<{ name: string; value: number }>, item) => {
		let nature = item.nature
		if (nature === undefined) nature = '0'
		if (!acc[nature]) {
			acc[nature] = { name: FireNatureType[nature], value: 0 }
		}
		acc[nature].value++
		return acc
	}, {})
}

export const getFireCountPerMonth = (data: Fire[]) => {
	return data.reduce((acc: KeyValueType<number>, item) => {
		const date = item['alerte'].substring(0, 7)
		if (!acc[date]) {
			acc[date] = 0
		}
		acc[date]++
		return acc
	}, {})
}

export const getAverageFireSizePerYear = (data: Fire[]) => {
	return data.reduce((acc: KeyValueType<number>, item) => {
		const year = item['annee']
		if (!acc[year]) {
			acc[year] = 0
		}
		acc[year] += parseInt(item['surface'])
		return acc
	}, {})
}

export const getAverageFireSizePerFifthYear = (data: KeyValueType<number>) => {
	const result = []
	let newData = Object.values(data)
	const parts = newData.length / 5
	for (let i = 0; i < newData.length; i += parts) {
		const stackOfFive = newData.slice(i, i + parts)
		const average = stackOfFive.reduce((acc, item) => acc + item, 0) / stackOfFive.length
		for (let j = 0; j < stackOfFive.length; j++) {
			result.push(average)
		}
	}
	return result
}
