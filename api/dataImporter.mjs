import axios from 'axios'
import { getDBConnection } from './mySQL.mjs'

const url = 'https://swapi.dev/api/'

export const importData = () => {
    const connection = getDBConnection()

    console.log("adsfsdf")

    const createTableSQL1 = 'CREATE TABLE IF NOT EXISTS thing (name VARCHAR(69), age VARCHAR(420))'

    query(createTableSQL1, connection)
   

    connection.end((err) => {
        if (err) {
            console.log(err)
        }
    })

    getStarWarsInfo()
}

const getStarWarsInfo = async () => {
    let peopleURL = `${url}people/`
    let mahPeople = []

    do {
        const { data: { results, next } } = await axios.get(peopleURL)

        results.forEach((p) => mahPeople.push({ name: p.name, homeworld: p.homeworld}))
        peopleURL = next
    } while (peopleURL);

    const yeah = await Promise.all(mahPeople.map(async (per) => {
        return {
            ...per,
            homeworld: (await axios.get(per.homeworld)).data.name
        }
    }))

    /* console.log(mahPeople) */
    console.log(yeah)
}

const query = (sql, connection) => {
    connection.query(sql, (error, results, fields) => {
        if (error) {
            throw error
        }
        if (results) {
            console.log(results)
        }
    })
}