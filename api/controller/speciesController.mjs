import { query } from '../helpers/mySQL.mjs'

const speciesController = {}

speciesController.index = async (req, res) => {
	try {
		const sql = `SELECT * FROM species`

		const species = await query(sql)

		res.json(species)
	} catch (error) {
		res.send(error)
	}
}

export default speciesController