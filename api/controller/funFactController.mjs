import { query } from '../helpers/mySQL.mjs'

const funFactController = {}


funFactController.index = async (req, res) => {

	try {
		

		res.json({haha: "haha hackeded!! JK Great LOL xD!!!"})
	} catch (error) {
		res.send(error)
	}    
}

export default funFactController