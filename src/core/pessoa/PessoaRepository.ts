import Pessoa from "@/core/pessoa/Pessoa";
import Grupo from "../grupo/Grupo";

export default interface PessoaRepository {
    salvar(pessoa: Pessoa): Promise<void>
    excluir(pessoa: Pessoa): Promise<void>
    listar(grupoId: string): Promise<Pessoa[]>
    excluirPessoasGrupo(grupo: Grupo): Promise<void>
}