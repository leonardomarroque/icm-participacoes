import Grupo from "@/core/grupo/Grupo";

export default interface GrupoRepository {
    salvar(grupo: Grupo): Promise<Grupo>
    excluir(grupo: Grupo): Promise<void>
    listar(): Promise<Grupo[]>
}