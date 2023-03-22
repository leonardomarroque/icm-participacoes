import Grupo from "@/core/grupo/Grupo"
import { IconeEditar, IconeExcluir, IconePessoas } from '../Icones';

interface TabelaGrupoProps {
    grupos: Grupo[]
    editarGrupo?: (grupo: Grupo) => void
    excluirGrupo?: (grupo: Grupo) => void
    detalharGrupo?: (grupo: Grupo) => void
}

export default function TabelaGrupo (props: TabelaGrupoProps) {

    const exibirAcoes = props.excluirGrupo || props.editarGrupo || props.detalharGrupo

    function renderizarCabecalho() {
        return (
            <tr>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Quantidade de Eventos</th>
                {exibirAcoes ? <th className="p-4">Ações</th> : false}
            </tr>
        )
    }

    function renderizarDados() {
        return props.grupos?.map((grupo, i) => {
            return (
                <tr key={grupo.id}
                    className={`m-auto ${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
                    <td className="text-left p-4">{grupo.nome}</td>
                    <td className="text-left p-4">{grupo.quantidadeEventos}</td>
                    {exibirAcoes ? renderizarAcoes(grupo) : false}
                </tr>
            )
        })
    }

    function renderizarAcoes(grupo: Grupo) {
        return (
            <td>
                <div className="flex justify-center items-center">
                    {props.detalharGrupo ? (
                        <a href="/pessoa">
                            <button title="Detalhar" className={`
                                flex justify-center items-center text-gray-800
                                rounded-full hover:bg-purple-50 p-2 m-1
                            `}>
                                {IconePessoas}
                            </button>
                        </a>
                    ) : false}
                    {props.editarGrupo ? (
                        <button title="Editar" onClick={() => props.editarGrupo?.(grupo)} className={`
                            flex justify-center items-center text-green-600
                            rounded-full hover:bg-purple-50 p-2 m-1
                        `}>
                            {IconeEditar}
                        </button>
                    ) : false}
                    {props.excluirGrupo ? (
                        <button title="Excluir" onClick={() => props.excluirGrupo?.(grupo)} className={`
                            flex justify-center items-center text-red-500
                            rounded-full hover:bg-purple-50 p-2 m-1
                        `}>
                            {IconeExcluir}
                        </button>
                    ) : false}
                </div>
            </td>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full rounded-xl overflow-hidden">
                <thead className={`
                    bg-gradient-to-r from-purple-500 to-purple-800
                    text-gray-100
                `}>
                    {renderizarCabecalho()}
                </thead>
                <tbody>
                    {renderizarDados()}
                </tbody>
            </table>
        </div>
    )
}