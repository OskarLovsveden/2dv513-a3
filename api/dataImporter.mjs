import axios from 'axios'
import { query } from './helpers/mySQL.mjs'

const url = 'https://swapi.dev/api/'

const sqlArr = [
	`CREATE TABLE IF NOT EXISTS movie (
        name VARCHAR(50) UNIQUE NOT NULL, 
        release_date VARCHAR(10) NOT NULL, 
        id INT, 
        PRIMARY KEY (id)) ENGINE=INNODB`,
	`CREATE TABLE IF NOT EXISTS planet (
        name VARCHAR(50), 
        diameter VARCHAR(50) NOT NULL, 
        population VARCHAR(50) NOT NULL, 
        PRIMARY KEY (name)) ENGINE=INNODB`,
	`CREATE TABLE IF NOT EXISTS species (
        name VARCHAR(50), 
        classification VARCHAR(50) NOT NULL, 
        home_planet VARCHAR(50), 
        PRIMARY KEY (name), 
        FOREIGN KEY (home_planet) REFERENCES planet(name)) ENGINE=INNODB`,
	`CREATE TABLE IF NOT EXISTS movie_character (
        name VARCHAR(50),
        birth_planet VARCHAR(50),
        species VARCHAR(50),
        PRIMARY KEY (name),
        FOREIGN KEY (birth_planet) REFERENCES planet(name),
	    FOREIGN KEY (species) REFERENCES species(name)) ENGINE=INNODB`,
	`CREATE TABLE IF NOT EXISTS appears_in (
	    character_name VARCHAR(50),
	    movie_id INT,
	    FOREIGN KEY (character_name) REFERENCES movie_character(name),
	    FOREIGN KEY (movie_id) REFERENCES movie(id)) ENGINE=INNODB`
]

export const importData = async () => {
	for (const sa of sqlArr) {
		await query(sa)
	}
	console.log('Created tables')

	const films = await getFilms()
	const planets = await getPlanets()
	const species = await getSpecies()
	const people = await getPeople()
	const appearsIn = getAppearsIn(people, films)
	console.log('Fetched data')

	putInDB(films, planets, species, people, appearsIn)
	console.log('Put data in DB');
}

const putInDB = async (films, planets, species, people, appearsIn) => {
	const movieSQL = 'INSERT INTO movie (name, release_date, id) VALUES ?'
	films = films.map(f => [f[0], f[1], f[2]])

	const planetSQL = 'INSERT INTO planet (name, diameter, population) VALUES ?'

	const speciesSQL =
		'INSERT INTO species (name, classification, home_planet) VALUES ?'

	const charSQL =
		'INSERT INTO movie_character (name, birth_planet, species) VALUES ?'
	people = people.map(f => [f[0], f[1], f[2]])

	const aiSQL = 'INSERT INTO appears_in (character_name, movie_id) VALUES ?'

	await query(movieSQL, [films])
	await query(planetSQL, [planets])
	await query(speciesSQL, [species])
	await query(charSQL, [people])
	await query(aiSQL, [appearsIn])
}

const getPeople = async () => {
	let peopleURL = `${url}people/`
	let people = []

	do {
		const {
			data: { results, next }
		} = await axios.get(peopleURL)

		results.forEach(p =>
			people.push([p.name, p.homeworld, p.species[0], p.url])
		)
		peopleURL = next
	} while (peopleURL)

	for (const p of people) {
		p[1] = (await axios.get(p[1])).data.name
		p[2] = p[2] ? (await axios.get(p[2])).data.name : 'Human'
	}

	return people
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
			s[2] = s[2] ? (await axios.get(s[2])).data.name : 'unknown'
			return s
		})
	)
}

const getFilms = async () => {
	let filmsURL = `${url}films/`

	const {
		data: { results }
	} = await axios.get(filmsURL)

	return results.map(f => [f.title, f.release_date, f.episode_id, f.characters])
}

const getAppearsIn = (people, films) => {
	let episodeAndCharacters = []

	films.forEach(f => {
		people.forEach(p => {
			if (f[3].includes(p[3])) {
				episodeAndCharacters.push([p[0], f[2]])
			}
		})
	})

	return episodeAndCharacters
}

