import { query } from '../helpers/mySQL.mjs'

const movieController = {}

movieController.index = async (req, res) => {
	try {
		const sql = `SELECT * FROM movie`
		const movies = await query(sql)

		res.json(movies)
	} catch (error) {
		res.send(error)
	}
}

export default movieController