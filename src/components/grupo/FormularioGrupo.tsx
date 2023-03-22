import Grupo from "@/core/grupo/Grupo";
import Entrada from "../Entrada";
import { useState } from 'react';
import Botao from "../Botao";

interface FormularioGrupoProps {
    grupo: Grupo
    cancelado?: () => void
    grupoMudou?: (grupo: Grupo) => void
}

export default function FormularioGrupo (props: FormularioGrupoProps) {
    const id = props.grupo?.id ?? null
    const [nome, setNome] = useState(props.grupo?.nome ?? '')
    const [quantidadeEventos, setQuantidadeEventos] = useState(props.grupo?.quantidadeEventos ?? 0)
    return (
        <div>
            <div>
                {id ? (
                    <Entrada somenteLeitura texto="Código" valor={id} className="mb-5" />
                ) : false}
                <Entrada texto="Nome do Grupo" valor={nome} onChange={setNome} className="mb-5" />
                <Entrada texto="Quantidade de Eventos" tipo="number" valor={quantidadeEventos} onChange={setQuantidadeEventos} />
            </div>
            <div className="flex justify-end mt-5">
                <Botao cor="blue" className="mr-2"
                    onClick={() => props.grupoMudou?.(new Grupo(nome, +quantidadeEventos, id))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )
}