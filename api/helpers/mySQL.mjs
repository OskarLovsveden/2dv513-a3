import mysql from 'mysql'

const params = {
	host: 'localhost',
	user: 'admin',
	password: 'root',
	database: 'starwars'
}

const getDBConnection = async () => new Promise(
	(resolve, reject) => {
		const connection = mysql.createConnection(params)
		connection.connect(err => {
			if (err) {
				reject(err)
				return
			}
			console.log('connected as id ' + connection.threadId)
			resolve(connection)
		})
	})

export const query = async (q, params) => new Promise(
	async (resolve, reject) => {
		const conn = await getDBConnection()

		const handler = (err, results) => {
			if (err) {
				reject(err)
				return
			}
			if (results) {
				conn.end()
			}
			resolve(results)
		}
		conn.query(q, params, handler)
	}
)
