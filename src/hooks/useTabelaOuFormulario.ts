import { useState } from 'react';

export default function useTabelaOuFormulario() {
    const [visivel, setVisivel] = useState<'tabela' | 'formulario'>('tabela')
    const [titulo, setTitulo] = useState('')

    const exibirTabela = (titulo: string) => {
        setTitulo(titulo)
        setVisivel('tabela')
    }

    const exibirFormulario = (titulo: string) => {
        setTitulo(titulo)
        setVisivel('formulario')
    }

    return {
        formularioVisivel: visivel === 'formulario',
        tabelaVisivel: visivel === 'tabela',
        exibirTabela,
        exibirFormulario,
        titulo
    }
}