export default interface IFacts {
    naboolian_appearances: INaboolianAppearances[],
    species_appearances_counted: ISpeciesAppearancesCounted[]
}

interface INaboolianAppearances {
    name: string,
    birth_planet: string,
    movie_appearances: number
}

interface ISpeciesAppearancesCounted {
    species: string,
    character_amount: number      
}