import { query } from '../helpers/mySQL.mjs'

const funFactController = {}

funFactController.index = async (req, res) => {
	try {
		res.json([await getFactOne(), await getFactTwo(), await getFactThree()])
	} catch (error) {
		res.send(error)
	}
}

const getFactOne = async () => {
	await viewCharactersMovieAppearancesDescending()
	await viewMostCommonBirthPlanetsCharacters()
	await viewMostCommonBirthPlanetsCharactersAppearances()

	const [{ birth_planet }] = await mostCommonBirthPlanet()
	const factOneData = (await mostCommonBirthPlanetsCharactersAppearances()).map(a => ({ data_key: a.name, data_value: a.movie_appearances }))

	return {
		id: 1,
		flavor_text: `${birth_planet} is the planet with the most characters native to it. This is how many times these characters appears in the movies.`,
		data: factOneData
	}
}

const getFactTwo = async () => {
	await viewSpeciesAppearancesCounted()
	const factTwoData = (await speciesAppearancesCounted()).map(s => ({ data_key: s.species, data_value: s.character_amount }))

	return {
		id: 2,
		flavor_text: "This is how many characters there are of each species in the movies.",
		data: factTwoData
	}
}

const getFactThree = async () => {
	await viewCharactersNotBornOnTheirSpeciesHomePlanet()
	const factThreeData = (await charactersNotBornOnTheirSpeciesHomePlanet()).map(s => ({ data_key: s.character_name, data_value: s.character_birth_planet }))

	return {
		id: 3,
		flavor_text: "Some characters are not born on the planet their species is native too. This is where those characters where born instead.",
		data: factThreeData
	}
}

const viewCharactersNotBornOnTheirSpeciesHomePlanet = async () => {
	const sql = `CREATE OR REPLACE VIEW characters_not_born_on_their_species_home_planet AS
	SELECT m.name AS character_name, m.birth_planet AS character_birth_planet
	FROM movie_character m
	JOIN species s ON s.name = m.species
	WHERE m.birth_planet != s.home_planet`

	return query(sql)
}

const viewCharactersMovieAppearancesDescending = () => {
	const sql = `CREATE OR REPLACE VIEW characters_movie_appearances_descending AS
	SELECT character_name, COUNT(character_name) AS movie_appearances 
	FROM appears_in 
	GROUP BY character_name 
	ORDER BY movie_appearances DESC`

	return query(sql)
}

const viewMostCommonBirthPlanetsCharacters = () => {
	const sql = `CREATE OR REPLACE VIEW most_common_birth_planets_characters AS
	SELECT * FROM movie_character
	WHERE birth_planet = (SELECT birth_planet
	FROM movie_character
	GROUP BY birth_planet
	ORDER BY COUNT(birth_planet) DESC
	LIMIT 1)`

	return query(sql)
}

const viewMostCommonBirthPlanetsCharactersAppearances = () => {
	const sql = `CREATE OR REPLACE VIEW most_common_birth_planets_characters_appearances AS
	SELECT t2.name, t1.movie_appearances
	FROM characters_movie_appearances_descending t1
	JOIN most_common_birth_planets_characters t2
	ON t1.character_name = t2.name
	ORDER BY t1.movie_appearances DESC`

	return query(sql)
}

const charactersNotBornOnTheirSpeciesHomePlanet = () => {
	const sql = `SELECT * FROM characters_not_born_on_their_species_home_planet`
	return query(sql)
}

const mostCommonBirthPlanetsCharactersAppearances = () => {
	const sql = `SELECT * FROM most_common_birth_planets_characters_appearances`
	return query(sql)
}

const viewSpeciesAppearancesCounted = () => {
	const sql = `CREATE OR REPLACE VIEW species_appearances_counted AS
	SELECT species, COUNT(species) AS character_amount
	FROM movie_character 
	GROUP BY species
	ORDER BY COUNT(species) DESC`

	return query(sql)
}

const mostCommonBirthPlanet = () => {
	const sql = `SELECT birth_planet
	FROM movie_character
	GROUP BY birth_planet
	ORDER BY COUNT(birth_planet) DESC
	LIMIT 1`

	return query(sql)
}

const speciesAppearancesCounted = () => {
	const sql = `SELECT * FROM species_appearances_counted`

	return query(sql)
}


export default funFactController