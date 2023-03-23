import { Timestamp } from "firebase/firestore"
import Evento from "../evento/Evento"

export default class Pessoa {
    #id: string
    #nome: string
    #dataEntrada: Timestamp
    #dataSaida?: Date
    #subgrupo?: string
    #notas?: string
    #participacoes?: Evento[]

    constructor(nome: string, dataEntrada: Timestamp = Timestamp.now(), id: string = "") {
        this.#nome = nome
        this.#dataEntrada = dataEntrada
        this.#id = id
    }
    
    static vazio() {
        return new Pessoa('')
    }

    get id() {
        return this.#id
    }

    get nome() {
        return this.#nome
    }

    get dataEntrada() {
        return this.#dataEntrada
    }

    get dataSaida() {
        return this.#dataSaida
    }

    get subgrupo() {
        return this.#subgrupo
    }

    get notas() {
        return this.#notas
    }

    get participacoes() {
        return this.#participacoes
    }
}