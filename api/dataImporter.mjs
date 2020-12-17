import axios from 'axios'
import { getDBConnection } from './mySQL.mjs'

const url = 'https://swapi.dev/api/'

const sqlArr = [
	`CREATE TABLE IF NOT EXISTS movie (
        name VARCHAR(50) UNIQUE NOT NULL, 
        release_date VARCHAR(10) NOT NULL, 
        id INT, 
        PRIMARY KEY (id))`,
	`CREATE TABLE IF NOT EXISTS planet (
        name VARCHAR(50), 
        diameter VARCHAR(50) NOT NULL, 
        population VARCHAR(50) NOT NULL, 
        PRIMARY KEY (name))`,
	`CREATE TABLE IF NOT EXISTS species (
        name VARCHAR(50), 
        classification VARCHAR(50) NOT NULL, 
        home_planet VARCHAR(50) NOT NULL, 
        PRIMARY KEY (name), 
        FOREIGN KEY (home_planet) REFERENCES planet(name))`,
	`CREATE TABLE IF NOT EXISTS movie_character (
        name VARCHAR(50),
        birth_planet VARCHAR(50),
        species VARCHAR(50),
        PRIMARY KEY (name),
        FOREIGN KEY (birth_planet) REFERENCES planet(name),
	    FOREIGN KEY (species) REFERENCES species(name))`,
	`CREATE TABLE IF NOT EXISTS appears_in (
	    character_name VARCHAR(50),
	    movie_id INT,
	    FOREIGN KEY (character_name) REFERENCES movie_character(name),
	    FOREIGN KEY (movie_id) REFERENCES movie(id))`
]

export const importData = async () => {
	// createTable(sqlArr)

	const people = await getPeople()
	console.table(people)
	console.log('Done with you people')

	const planets = await getPlanets()
	console.table(planets)
	console.log('Done with them planets')

	const species = await getSpecies()
	console.table(species)
	console.log('That was nothing speciesal')

	const films = await getFilms()
	console.table(films)
	console.log('Done wiz ze filmz')

	const appearsIn = getAppearsIn(people, films)
	console.table(appearsIn)
	console.log('I now know that Luke Skywalker was in Star Wars')

	// PUT IN DB :^)
	putInDB(people, planets, species, films, appearsIn)
}

const createTable = async sqlArr => {
	const connection = getDBConnection()

	sqlArr.forEach(sa => query(sa, connection))

	connection.end(err => {
		if (err) {
			console.log(err)
		}
	})
}

const getPeople = async () => {
	let peopleURL = `${url}people/`
	let mahPeople = []

	do {
		const {
			data: { results, next }
		} = await axios.get(peopleURL)

		results.forEach(p =>
			mahPeople.push([p.name, p.homeworld, p.species[0], p.url])
		)
		peopleURL = next
	} while (peopleURL)

	await Promise.all(
		mahPeople.map(async p => {
			p[1] = (await axios.get(p[1])).data.name
			return p
		})
	)

	return Promise.all(
		mahPeople.map(async p => {
			p[2] = p[2] ? (await axios.get(p[2])).data.name : 'Human'
			return p
		})
	)
}

const getPlanets = async () => {
	let planetsURL = `${url}planets/`
	let planets = []

	do {
		const {
			data: { results, next }
		} = await axios.get(planetsURL)

		results.forEach(p => planets.push([p.name, p.diameter, p.population]))
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

		results.forEach(s => species.push([s.name, s.classification, s.homeworld]))
		speciesURL = next
	} while (speciesURL)

	return Promise.all(
		species.map(async s => {
			s[2] = s[2] ? (await axios.get(s[2])).data.name : 'n/a'
			return s
		})
	)
}

const getFilms = async () => {
	let filmsURL = `${url}films/`

	const {
		data: { results }
	} = await axios.get(filmsURL)

	return results.map(f => [f.title, f.episode_id, f.release_date, f.characters])
}

const getAppearsIn = (people, films) => {
	let episodeAndCharacters = []

	films.forEach(f => {
		people.forEach(p => {
			if (f[3].includes(p[3])) {
				episodeAndCharacters.push([f[1], p[0]])
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
