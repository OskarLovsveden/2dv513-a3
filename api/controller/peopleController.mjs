import { query } from '../helpers/mySQL.mjs'

const peopleController = {}


peopleController.index = async (req, res) => {

	try {
		let params = []
		let sql = `SELECT * FROM movie_character`

		if (req.query.species) {
			sql = sql + ` WHERE species = ?`
			params = [req.query.species]
		}

		const characters = await query(sql, params)

		res.json(characters)
	} catch (error) {
		res.send(error)
	}    
}

peopleController.show = async (req, res) => {

	try {
		const sql = `SELECT * FROM movie_character WHERE name = ?`

		const characters = await query(sql, [req.params.name])

		res.json(characters)
	} catch (error) {
		res.send(error)
	}    
}

export default peopleController