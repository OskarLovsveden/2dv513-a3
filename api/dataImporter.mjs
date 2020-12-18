import axios from 'axios'
import { getDBConnection } from './helpers/mySQL.mjs'

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
        home_planet VARCHAR(50) NOT NULL, 
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
	createTable(sqlArr)

	const films = await getFilms()
	console.table(films)
	console.log('Done wiz ze filmz')

	const planets = await getPlanets()
	console.table(planets)
	console.log('Done with them planets')

	const species = await getSpecies()
	console.table(species)
	console.log('That was nothing speciesal')

	const people = await getPeople()
	console.table(people)
	console.log('Done with you people')

	const appearsIn = getAppearsIn(people, films)
	console.table(appearsIn)
	console.log('I now know that Luke Skywalker was in Star Wars')

	// PUT IN DB :^)
	putInDB(films, planets, species, people, appearsIn)
}

const putInDB = (films, planets, species, people, appearsIn) => {
	const movieSQL = 'INSERT INTO movie (name, release_date, id) VALUES ?'
	films = films.map(f => [f[0], f[1], f[2]])

	const planetSQL = 'INSERT INTO planet (name, diameter, population) VALUES ?'

	const speciesSQL =
		'INSERT INTO species (name, classification, home_planet) VALUES ?'

	const charSQL =
		'INSERT INTO movie_character (name, birth_planet, species) VALUES ?'
	people = people.map(f => [f[0], f[1], f[2]])
	console.table(people)

	const aiSQL = 'INSERT INTO appears_in (character_name, movie_id) VALUES ?'

	// WARNING! RUN AT OWN RISK - ONE AT THE TIME OR ELSE
	/* queryIntoDB(movieSQL, films) */
	/* queryIntoDB(planetSQL, planets) */
	/* queryIntoDB(speciesSQL, species) */
	/* queryIntoDB(charSQL, people) */
	/* queryIntoDB(aiSQL, appearsIn) */
}

const queryIntoDB = (sql, array) => {
	const connection = getDBConnection()

	connection.query(sql, [array], err => {
		if (err) {
			console.log(err)
		}
	})

	connection.end(err => {
		if (err) {
			console.log(err)
		}
	})
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
