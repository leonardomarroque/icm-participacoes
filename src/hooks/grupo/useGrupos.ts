import Grupo from "@/core/grupo/Grupo"
import GrupoRepository from "@/core/grupo/GrupoRepository"
import { useState, useEffect } from "react"
import GrupoCollection from "../../server/db/GrupoCollection"
import useTabelaOuFormulario from '../useTabelaOuFormulario';

export default function useGrupos() {

    const repo: GrupoRepository = new GrupoCollection()

    const { titulo, tabelaVisivel, formularioVisivel, exibirTabela, exibirFormulario } = useTabelaOuFormulario()

    const [grupo, setGrupo] = useState<Grupo>(Grupo.vazio())
    const [grupos, setGrupos] = useState<Grupo[]>([])
  
    useEffect(listarGrupos, [])
  
    function listarGrupos() {
      repo.listar().then(grupos => {
        setGrupos(grupos)
        exibirTabela('Grupos')
      })
    }

    function detalharGrupo(grupo: Grupo) {
      exibirFormulario('Detalhar Grupo')
      setGrupo(grupo)
    }
  
    function editarGrupo(grupo: Grupo) {
      exibirFormulario('Editar Grupo')
      setGrupo(grupo)
    }
  
    async function excluirGrupo(grupo: Grupo) {
      await repo.excluir(grupo)
      listarGrupos()
    }
  
    async function salvarGrupo(grupo: Grupo) {
      repo.salvar(grupo)
      listarGrupos()
    }
  
    function novoGrupo() {
      exibirFormulario('Cadastrar Grupo')
      setGrupo(Grupo.vazio())
    }

    return {
        grupo,
        grupos,
        novoGrupo,
        salvarGrupo,
        excluirGrupo,
        editarGrupo,
        listarGrupos,
        detalharGrupo,
        tabelaVisivel,
        exibirTabela,
        titulo
    }
}