export type KeyValueType<T> = {
	[key: string]: T
}

export const FireNatureType: KeyValueType<string> = {
	'0': 'Inconnue',
	'1': 'Foudre',
	'2': 'Accidentelle',
	'3': 'Malveillance',
	'4': 'Travaux',
	'5': 'Particulier'
}

export type Fire = {
	annee: string
	id: string
	type_feu: string
	departement: string
	code_insee: string
	commune: string
	lieu_dit: string
	code_du_carreau_dfci: string
	alerte: string
	origine_alerte: string
	surface: string
	nature: string
}

export type FirePerDay = {
	[date: string]: Fire[]
}
