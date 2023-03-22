export default class Evento {
    #id: string
    #titulo: string
    #data: Date

    constructor(titulo: string, data: Date, id: string = "") {
        this.#titulo = titulo
        this.#data = data
        this.#id = id
    }
    
    static vazio() {
        return new Evento('', new Date())
    }

    get id() {
        return this.#id
    }

    get titulo() {
        return this.#titulo
    }

    get data() {
        return this.#data
    }

}