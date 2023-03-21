export default class Grupo {
    #id: string
    #nome: string
    #quantidadeEventos: number

    constructor(nome: string, quantidadeEventos: number, id: string = "") {
        this.#nome = nome
        this.#quantidadeEventos = quantidadeEventos
        this.#id = id
    }
    
    static vazio() {
        return new Grupo('', 0)
    }

    get id() {
        return this.#id
    }

    get nome() {
        return this.#nome
    }

    get quantidadeEventos() {
        return this.#quantidadeEventos
    }

}