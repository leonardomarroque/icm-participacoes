import firebase from '../config';
import Grupo from '@/core/grupo/Grupo'
import GrupoRepository from '@/core/grupo/GrupoRepository'

export default class GrupoCollection implements GrupoRepository {

    #conversor = {
        toFirestore(grupo: Grupo) {
            return {
                nome: grupo.nome,
                quantidadeEventos: grupo.quantidadeEventos
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Grupo {
            const dados = snapshot.data(options)
            return new Grupo(dados.nome, dados.quantidadeEventos, snapshot.id)
        }
    }

    async salvar(grupo: Grupo): Promise<Grupo> {
        if (grupo?.id) {
            await this.#colecao().doc(grupo.id).set(grupo)
            return grupo
        } else {
            const docRef = await this.#colecao().add(grupo)
            const doc = await docRef.get()
            return doc.data()!
        }
    }

    async excluir(grupo: Grupo): Promise<void> {
        return this.#colecao().doc(grupo.id).delete()
    }

    async listar(): Promise<Grupo[]> {
        const query = await this.#colecao().get()
        return query.docs.map(doc => doc.data()) ?? []
    }

    #colecao() {
        return firebase.firestore().collection('grupos').withConverter(this.#conversor)
    }
}