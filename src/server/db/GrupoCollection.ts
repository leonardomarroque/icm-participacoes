import { database } from '../config'
import Grupo from '@/core/grupo/Grupo'
import GrupoRepository from '@/core/grupo/GrupoRepository'
import { QueryDocumentSnapshot, SnapshotOptions, collection, addDoc, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore"

export default class GrupoCollection implements GrupoRepository {

    #conversor = {
        toFirestore(grupo: Grupo) {
            return {
                nome: grupo.nome,
                quantidadeEventos: grupo.quantidadeEventos
            }
        },
        fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Grupo {
            const dados = snapshot.data(options)
            return new Grupo(dados.nome, dados.quantidadeEventos, snapshot.id)
        }
    }


    async salvar(grupo: Grupo) {
        try {
            if (grupo?.id) {
                const grupoRef = doc(this.#colecao, grupo.id)
                await setDoc(grupoRef, grupo)
            } else {
                await addDoc(this.#colecao, grupo)
            }
        } catch (error) {
            console.error(error)
        }

    }

    async excluir(grupo: Grupo): Promise<void> {
        try {
            const grupoRef = doc(this.#colecao, grupo.id)
            await deleteDoc(grupoRef)
        } catch (error) {
            console.error(error)
        }
    }

    async listar(): Promise<Grupo[]> {
        const query = await getDocs(this.#colecao)
        return query.docs.map(doc => doc.data()) ?? []
    }

    #colecao = collection(database, 'grupos').withConverter(this.#conversor)
}