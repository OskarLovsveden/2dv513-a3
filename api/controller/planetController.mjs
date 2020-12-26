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

const getPlanets = async () => {
	let sql = `SELECT * FROM planet`
	return query(sql)
}

export default planetController