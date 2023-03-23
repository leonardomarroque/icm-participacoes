import Pessoa from "@/core/pessoa/Pessoa";

export default interface PessoaRepository {
    salvar(pessoa: Pessoa): Promise<void>
    excluir(pessoa: Pessoa): Promise<void>
    listar(): Promise<Pessoa[]>
}