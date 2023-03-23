import Pessoa from "@/core/pessoa/Pessoa";
import { useState } from 'react';
import Botao from "../Botao";
import Entrada from "../Entrada";
import { Timestamp } from 'firebase/firestore';

interface FormularioPessoaProps {
    pessoa: Pessoa
    cancelado?: () => void
    pessoaMudou?: (pessoa: Pessoa) => void
}

export default function FormularioPessoa (props: FormularioPessoaProps) {
    const id = props.pessoa?.id ?? null
    const [nome, setNome] = useState(props.pessoa?.nome ?? '')
    const [dataEntrada, setDataEntrada] = useState(props.pessoa?.dataEntrada.toDate().toISOString().substring(0, 10))

    function timezone(): string {
        const timeZero = "T00:00:00"
        const timezone = -(new Date().getTimezoneOffset())
        const timezoneHour = Math.abs(Math.trunc(timezone / 60)).toString().padStart(2, '0')
        const timezoneMinute = Math.abs(timezone % 60).toString().padStart(2, '0')
        const dif = timezone >= 0 ? '+' : '-'

        const timeWithTimezone = timeZero + dif + timezoneHour + ':' + timezoneMinute

        return timeWithTimezone
    }

    return (
        <div>
            <div>
                {id ? (
                    <Entrada somenteLeitura texto="Código" valor={id} className="mb-5" />
                ) : false}
                <Entrada texto="Nome" valor={nome} onChange={setNome} className="mb-5" />
                <Entrada texto="Data de Entrada" tipo="date" valor={dataEntrada} onChange={setDataEntrada} />
            </div>
            <div className="flex justify-end mt-5">
                <Botao cor="blue" className="mr-2"
                    onClick={() => props.pessoaMudou?.(
                        new Pessoa(
                            nome,
                            Timestamp.fromDate(new Date(dataEntrada + timezone())),
                            id)
                        )
                    }
                >
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )
}