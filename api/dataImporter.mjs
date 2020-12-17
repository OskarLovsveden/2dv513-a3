import axios from 'axios'
import { getDBConnection } from './mySQL.mjs'

const url = 'https://swapi.dev/api/'

export const importData = async () => {
    const connection = getDBConnection()

    console.log("adsfsdf")

    const createTableSQL1 = 'CREATE TABLE IF NOT EXISTS thing (name VARCHAR(69), age VARCHAR(420))'

    query(createTableSQL1, connection)
   

    connection.end((err) => {
        if (err) {
            console.log(err)
        }
    })

    const people = await getPeople()

    console.log("Done with you people")

    const planets = await getPlanets()

    console.log("Done with them planets")
}

const getPeople = async () => {
    let peopleURL = `${url}people/`
    let mahPeople = []

    do {
        const { data: { results, next } } = await axios.get(peopleURL)

        results.forEach((p) => mahPeople.push({ name: p.name, homeworld: p.homeworld}))
        peopleURL = next
    } while (peopleURL);
 
    return Promise.all(mahPeople.map(async (per) => ({ ...per, homeworld: (await axios.get(per.homeworld)).data.name })))
}

const getPlanets = async () => {
    let planetsURL = `${url}planets/`
    let planets = []

    do {
        const { data: { results, next } } = await axios.get(planetsURL)

        results.forEach((p) => planets.push({ name: p.name, diameter: p.diameter, population: p.population }))
        planetsURL = next
    } while (planetsURL);

    return planets
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