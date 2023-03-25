import Grupo from '@/core/grupo/Grupo'
import { database } from '../config'
import Pessoa from '@/core/pessoa/Pessoa'
import PessoaRepository from '@/core/pessoa/PessoaRepository'
import { QueryDocumentSnapshot, SnapshotOptions, collection, addDoc, doc, setDoc, deleteDoc, getDocs, where, query } from "firebase/firestore"

export default class PessoaCollection implements PessoaRepository {

    #conversor = {
        toFirestore(pessoa: Pessoa) {
            return {
                nome: pessoa.nome,
                dataEntrada: pessoa.dataEntrada,
                grupoId: pessoa.grupoId
            }
        },
        fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Pessoa {
            const dados = snapshot.data(options)
            return new Pessoa(dados.nome, dados.dataEntrada,snapshot.id, dados.grupoId)
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

    async excluirPessoasGrupo(grupo: Grupo): Promise<void> {
        const querySnapshot = await getDocs(query(this.#colecao, where("grupoId", "==",grupo.id)))
        querySnapshot.docs.forEach(async document => {
            const pessoaRef = doc(this.#colecao, document.id)
            await deleteDoc(pessoaRef)
        })
    }

    async listar(grupoId: string): Promise<Pessoa[]> {
        const querySnapshot = await getDocs(query(this.#colecao, where("grupoId", "==", grupoId)))
        return querySnapshot.docs.map(doc => doc.data()) ?? []
    }

    #colecao = collection(database, 'pessoas').withConverter(this.#conversor)
}