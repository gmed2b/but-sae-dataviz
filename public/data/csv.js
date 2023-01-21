import fs from 'fs'

const HEADER_ROW = 0
const SPLITER = ';'

function csvToJson(csv) {
	// Split the CSV string into an array of rows
	const rows = csv.split('\n')

	// Get the column names from the first row
	const headers = rows[HEADER_ROW].split(SPLITER)

	// Create an array to hold the JSON objects
	const json = []

	// Loop through the rows, starting at the second row (index 1)
	for (let i = 1; i < rows.length; i++) {
		// Create an object to represent this row of data
		const data = {}
		if (rows[i] === '') continue
		// Split the row into an array of values
		const values = rows[i].split(SPLITER)

		// Loop through the values and assign them to the corresponding property of the data object
		for (let j = 0; j < values.length; j++) {
			data[headers[j]] = values[j]
		}

		// Push the data object to the json array
		json.push(data)
	}

	// Return the json array
	return json
}

let file = 'all.csv'

// Read the contents of the CSV file
let csv = fs.readFileSync(`${file}.csv`, 'utf8')
// Check if the file starts with the BOM and remove it if it does
if (csv.charCodeAt(0) === 0xfeff) {
	csv = csv.slice(1)
}

// Convert the CSV string to JSON
const json = csvToJson(csv)

fs.writeFileSync(`${file}.json`, JSON.stringify(json), 'utf8')
