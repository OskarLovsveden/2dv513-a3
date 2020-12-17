import axios from 'axios'
import { getDBConnection } from './mySQL.mjs'

const url = 'https://swapi.dev/api/'

export const importData = async () => {
	const connection = getDBConnection()

	console.log('adsfsdf')

	const createTableSQL1 =
		'CREATE TABLE IF NOT EXISTS thing (name VARCHAR(69), age VARCHAR(420))'

	query(createTableSQL1, connection)

	connection.end(err => {
		if (err) {
			console.log(err)
		}
	})

	// const people = await getPeople()
	// console.table(people)
	console.log('Done with you people')

	// const planets = await getPlanets()
	// console.table(planets)
	console.log('Done with them planets')

	// const species = await getSpecies()
	// console.table(species)
	console.log('That was nothing speciesal')

	// const films = await getFilms()
	// console.table(films)
	console.log('Done wiz ze filmz')

	// const appearsIn = getAppearsIn(people, films)
	// console.table(appearsIn)
	console.log('I now know that Luke Skywalker was in Star Wars')
}

const getPeople = async () => {
	let peopleURL = `${url}people/`
	let mahPeople = []

	do {
		const {
			data: { results, next }
		} = await axios.get(peopleURL)

		results.forEach(p =>
			mahPeople.push({ name: p.name, homeworld: p.homeworld, url: p.url })
		)
		peopleURL = next
	} while (peopleURL)

	return Promise.all(
		mahPeople.map(async per => ({
			...per,
			homeworld: (await axios.get(per.homeworld)).data.name
		}))
	)
}

const getPlanets = async () => {
	let planetsURL = `${url}planets/`
	let planets = []

	do {
		const {
			data: { results, next }
		} = await axios.get(planetsURL)

		results.forEach(p =>
			planets.push({
				name: p.name,
				diameter: p.diameter,
				population: p.population
			})
		)
		planetsURL = next
	} while (planetsURL)

	return planets
}

const getSpecies = async () => {
	let speciesURL = `${url}species/`
	let species = []

	do {
		const {
			data: { results, next }
		} = await axios.get(speciesURL)

		results.forEach(s =>
			species.push({
				name: s.name,
				classification: s.classification,
				homeworld: s.homeworld
			})
		)
		speciesURL = next
	} while (speciesURL)

	return Promise.all(
		species.map(async s => ({
			...s,
			homeworld: s.homeworld ? (await axios.get(s.homeworld)).data.name : 'n/a'
		}))
	)
}

const getFilms = async () => {
	let filmsURL = `${url}films/`

	const {
		data: { results }
	} = await axios.get(filmsURL)

	return results.map(f => ({
		title: f.title,
		episode_id: f.episode_id,
		release_date: f.release_date,
		characters: f.characters
	}))
}

const getAppearsIn = (people, films) => {
	let episodeAndCharacters = []

	films.forEach(f => {
		people.forEach(p => {
			if (f.characters.includes(p.url)) {
				episodeAndCharacters = [
					...episodeAndCharacters,
					{ episode_id: f.episode_id, character_name: p.name }
				]
			}
		})
	})

	return episodeAndCharacters
}

const query = (sql, connection) => {
	connection.query(sql, (error, results, fields) => {
		if (error) {
			throw error
		}
		if (results) {
			// console.log(results)
		}
	})
}
