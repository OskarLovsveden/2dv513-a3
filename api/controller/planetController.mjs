import { query } from '../helpers/mySQL.mjs'

const planetController = {}


planetController.index = async (req, res) => {
	try {
		const planets = await getPlanets()

		res.json(planets)
	} catch (error) {
		res.send(error)
	}    
}

planetController.show = async (req, res) => {
	try {
		const selectedPlanet = await (req.query.verbose 
		? getSelectedPlanetVerbose([req.params.name])
		: getSelectedPlanet([req.params.name]))

		res.json(selectedPlanet)
	} catch (error) {
		res.send(error)
	}    
}

const getPlanets = async () => {
	let sql = `SELECT * FROM planet`
	return query(sql)
}

const getSelectedPlanet = async (selectedPlanet) => {
	const sql = `SELECT * FROM planet WHERE name = ?`
	return (await query(sql, [selectedPlanet]))[0]
}

const getSelectedPlanetVerbose = async (selectedPlanet) => {
	const characterSQL = `SELECT name FROM movie_character WHERE birth_planet = ?`
	const speciesSQL = `SELECT name FROM species WHERE home_planet = ?`
	const planet = await getSelectedPlanet(selectedPlanet)

	planet.home_planet_to_characters = await query(characterSQL, [selectedPlanet])
	planet.home_planet_to_species = await query(speciesSQL, [selectedPlanet])

	return planet
}

export default planetController