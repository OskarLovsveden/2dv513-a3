import { query } from '../helpers/mySQL.mjs'

const funFactController = {}

funFactController.index = async (req, res) => {
	try {
		const funFacts = {}

		await viewCharactersMovieAppearancesDescending()
		await viewMostCommonBirthPlanetsCharacters()
		await viewNaboolianAppearances()
		funFacts.naboolian_appearances = await naboolianAppearances()

		await viewSpeciesAppearancesCounted()
		funFacts.species_appearances_counted = await speciesAppearancesCounted()

		res.json(funFacts)
	} catch (error) {
		res.send(error)
	}
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

const viewNaboolianAppearances = () => {
	const sql = `CREATE OR REPLACE VIEW naboolian_appearances AS
	SELECT t2.name, t2.birth_planet, t1.movie_appearances
	FROM characters_movie_appearances_descending t1
	JOIN most_common_birth_planets_characters t2
	ON t1.character_name = t2.name
	ORDER BY t1.movie_appearances DESC`

	return query(sql)
}

const naboolianAppearances = () => {
	const sql = `SELECT * FROM naboolian_appearances`
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

const speciesAppearancesCounted = () => {
	const sql = `SELECT * FROM species_appearances_counted`

	return query(sql)
}


export default funFactController