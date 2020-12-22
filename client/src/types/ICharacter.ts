export default interface ICharacter {
    birth_planet: string,
    name: string,
    species: string,
    appearsIn: Array<AppearsIn>;
}

interface AppearsIn {
    episode: number,
    movie: string
}