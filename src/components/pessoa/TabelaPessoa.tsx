import Pessoa from "@/core/pessoa/Pessoa"
import { IconeDetalhar, IconeEditar, IconeExcluir } from "../Icones"

interface TabelaPessoaProps {
    pessoas: Pessoa[]
    editarPessoa?: (pessoa: Pessoa) => void
    excluirPessoa?: (pessoa: Pessoa) => void
    detalharPessoa?: (pessoa: Pessoa) => void
}

export default function TabelaPessoa (props: TabelaPessoaProps) {

    const exibirAcoes = props.excluirPessoa || props.editarPessoa || props.detalharPessoa

    function renderizarCabecalho() {
        return (
            <tr>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Data de Entrada</th>
                {exibirAcoes ? <th className="p-4">Ações</th> : false}
            </tr>
        )
    }

    function renderizarDados() {
        return props.pessoas?.map((pessoa, i) => {
            return (
                <tr key={pessoa.id}
                    className={`m-auto ${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
                    <td className="text-left p-4">{pessoa.nome}</td>
                    <td className="text-left p-4">{pessoa.dataEntrada.toString()}</td>
                    {exibirAcoes ? renderizarAcoes(pessoa) : false}
                </tr>
            )
        })
    }

    function renderizarAcoes(pessoa: Pessoa) {
        return (
            <td>
                <div className="flex justify-center items-center">
                    {props.detalharPessoa ? (
                        <button onClick={() => props.detalharPessoa?.(pessoa)} className={`
                            flex justify-center items-center text-gray-800
                            rounded-full hover:bg-purple-50 p-2 m-1
                        `}>
                            {IconeDetalhar}
                        </button>
                    ) : false}
                    {props.editarPessoa ? (
                        <button onClick={() => props.editarPessoa?.(pessoa)} className={`
                            flex justify-center items-center text-green-600
                            rounded-full hover:bg-purple-50 p-2 m-1
                        `}>
                            {IconeEditar}
                        </button>
                    ) : false}
                    {props.excluirPessoa ? (
                        <button onClick={() => props.excluirPessoa?.(pessoa)} className={`
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