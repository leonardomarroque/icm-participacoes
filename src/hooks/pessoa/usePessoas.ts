import PessoaRepository from "@/core/pessoa/PessoaRepository"
import PessoaCollection from "@/server/db/PessoaCollection"
import { useState, useEffect } from "react"
import useTabelaOuFormulario from "../useTabelaOuFormulario"
import Pessoa from "@/core/pessoa/Pessoa"
import { useRouter } from "next/router"

export default function usePessoas() {

    const repo: PessoaRepository = new PessoaCollection()

    const { titulo, tabelaVisivel, formularioVisivel, exibirTabela, exibirFormulario } = useTabelaOuFormulario()

    const [pessoa, setPessoa] = useState<Pessoa>(Pessoa.vazio())
    const [pessoas, setPessoas] = useState<Pessoa[]>([])

    const { query } = useRouter()
    const grupoId = query.grupoId as string
    
    useEffect(listarPessoas, [])
    
    function listarPessoas() {
      if(!grupoId) {
        return
      } else {
        repo.listar(grupoId).then(pessoas => {
          setPessoas(pessoas)
          exibirTabela('Pessoas')
        })
      }
   }

    function detalharPessoa(pessoa: Pessoa) {
      exibirFormulario('Detalhar Pessoa')
      setPessoa(pessoa)
      console.log(pessoa)
    }
  
    function editarPessoa(pessoa: Pessoa) {
      exibirFormulario('Editar Pessoa')
      setPessoa(pessoa)
      console.log(pessoa)
    }
  
    async function excluirPessoa(pessoa: Pessoa) {
      await repo.excluir(pessoa)
      listarPessoas()
    }
  
    async function salvarPessoa(pessoa: Pessoa) {
      repo.salvar(pessoa)
      listarPessoas()
    }
  
    function novaPessoa() {
      exibirFormulario('Cadastrar Pessoa')
      setPessoa(Pessoa.vazio())
    }

    return {
        pessoa,
        pessoas,
        novaPessoa,
        salvarPessoa,
        excluirPessoa,
        editarPessoa,
        listarPessoas,
        detalharPessoa,
        tabelaVisivel,
        exibirTabela,
        titulo
    }
}