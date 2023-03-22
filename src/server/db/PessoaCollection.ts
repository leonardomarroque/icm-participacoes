import Pessoa from '@/core/pessoa/Pessoa';
import firebase from '../config';
import PessoaRepository from '@/core/pessoa/PessoaRepository';

export default class PessoaCollection implements PessoaRepository {

    #conversor = {
        toFirestore(pessoa: Pessoa) {
            return {
                nome: pessoa.nome,
                dataEntrada: pessoa.dataEntrada
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Pessoa {
            const dados = snapshot.data(options)
            return new Pessoa(dados.nome, dados.dataEntrada, snapshot.id)
        }
    }

    async salvar(pessoa: Pessoa): Promise<Pessoa> {
        if (pessoa?.id) {
            await this.#colecao().doc(pessoa.id).set(pessoa)
            return pessoa
        } else {
            const docRef = await this.#colecao().add(pessoa)
            const doc = await docRef.get()
            return doc.data()!
        }
    }

    async excluir(pessoa: Pessoa): Promise<void> {
        return this.#colecao().doc(pessoa.id).delete()
    }

    async listar(): Promise<Pessoa[]> {
        const query = await this.#colecao().get()
        return query.docs.map(doc => doc.data()) ?? []
    }

    #colecao() {
        return firebase.firestore().collection('pessoas').withConverter(this.#conversor)
    }
}