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

		await getAllAppearances(characters)

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

const getAllAppearances = async (characters) => {
	const sql = `SELECT name, id
	FROM movie 
	JOIN appears_in ON appears_in.movie_id = id 
	WHERE appears_in.character_name = ?`

	for (const c of characters) {
		const appearances = await query(sql, [c.name])

		c.appearsIn = appearances.map(a => ({episode: a.id, movie: a.name}))
	}


	console.log(characters)
	/* for (let index = 0; index < characters.length; index++) {
		console.log(await query(sql, [characters[index].name]))
	} */
}

export default peopleController
