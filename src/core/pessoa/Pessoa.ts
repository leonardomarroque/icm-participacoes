import { Timestamp } from "firebase/firestore"
import Evento from "../evento/Evento"

export default class Pessoa {
    #id: string
    #nome: string
    #dataEntrada: Timestamp
    #grupoId: string
    #dataSaida?: Date
    #subgrupo?: string
    #notas?: string
    #participacoes?: Evento[]

    constructor(nome: string, dataEntrada: Timestamp = Timestamp.now(), id: string = "", grupoId: string = "") {
        this.#nome = nome
        this.#dataEntrada = dataEntrada
        this.#id = id
        this.#grupoId = grupoId
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

    get grupoId() {
        return this.#grupoId
    }
}