import { Inter } from 'next/font/google'
import Layout from '@/components/Layout';
import Tabela from '@/components/Tabela';
import Botao from '@/components/Botao';
import Formulario from '@/components/Formulario';
import useGrupos from '@/hooks/useGrupos';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const {
    grupo,
    grupos,
    editarGrupo,
    novoGrupo,
    salvarGrupo,
    excluirGrupo,
    detalharGrupo,
    tabelaVisivel,
    exibirTabela,
    titulo
  } = useGrupos()

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layout titulo={titulo}>
        {tabelaVisivel ? (
          <>
            <div className="flex justify-end">
              <Botao cor="green" className="mb-4"
                onClick={() => novoGrupo()}>
                  Novo Grupo
              </Botao>
            </div>
            <Tabela grupos={grupos}
              detalharGrupo={detalharGrupo}
              editarGrupo={editarGrupo}
              excluirGrupo={excluirGrupo}
            />
          </>
        ) : (
          <Formulario
            grupo={grupo}
            cancelado={() => exibirTabela()}
            grupoMudou={salvarGrupo}
          />
        )}
      </Layout>
    </div>
  )
}
