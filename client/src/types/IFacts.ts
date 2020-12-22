export default interface IFacts {
    id: number,
    title: string,
    flavor_text: string,
    data: data[]
}

interface data {
    data_key: any
    data_value: any
}