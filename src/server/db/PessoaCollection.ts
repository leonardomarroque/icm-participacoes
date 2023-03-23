import { database } from '../config'
import Pessoa from '@/core/pessoa/Pessoa'
import PessoaRepository from '@/core/pessoa/PessoaRepository'
import { QueryDocumentSnapshot, SnapshotOptions, collection, addDoc, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore"

export default class PessoaCollection implements PessoaRepository {

    #conversor = {
        toFirestore(pessoa: Pessoa) {
            return {
                nome: pessoa.nome,
                dataEntrada: pessoa.dataEntrada
            }
        },
        fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Pessoa {
            const dados = snapshot.data(options)
            return new Pessoa(dados.nome, dados.dataEntrada, snapshot.id)
        }
    }


    async salvar(pessoa: Pessoa): Promise<void> {
        try {
            if (pessoa?.id) {
                const pessoaRef = doc(this.#colecao, pessoa.id)
                await setDoc(pessoaRef, pessoa)
            } else {
                await addDoc(this.#colecao, pessoa)
            }
        } catch (error) {
            console.error(error)
        }

    }

    async excluir(pessoa: Pessoa): Promise<void> {
        try {
            const pessoaRef = doc(this.#colecao, pessoa.id)
            await deleteDoc(pessoaRef)
        } catch (error) {
            console.error(error)
        }
    }

    async listar(): Promise<Pessoa[]> {
        const query = await getDocs(this.#colecao)
        return query.docs.map(doc => doc.data()) ?? []
    }

    #colecao = collection(database, 'pessoas').withConverter(this.#conversor)
}