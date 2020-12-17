import mysql from 'mysql'

export const getDBConnection = () => {
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'admin',
		password: 'root',
		database: 'starwars'
	})

	connection.connect(function (err) {
		if (err) {
			console.error('error connecting: ' + err.stack)
			return
		}

		console.log('connected as id ' + connection.threadId)
	})

	return connection
}
