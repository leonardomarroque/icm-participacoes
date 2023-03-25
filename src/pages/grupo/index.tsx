import { Inter } from 'next/font/google'
import Layout from '@/components/Layout';
import TabelaGrupo from '@/components/grupo/TabelaGrupo';
import Botao from '@/components/Botao';
import FormularioGrupo from '@/components/grupo/FormularioGrupo';
import useGrupos from '@/hooks/grupo/useGrupos';

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
            <TabelaGrupo grupos={grupos}
              detalharGrupo={detalharGrupo}
              editarGrupo={editarGrupo}
              excluirGrupo={excluirGrupo}
            />
          </>
        ) : (
          <FormularioGrupo
            grupo={grupo}
            cancelado={() => exibirTabela('Grupos')}
            grupoMudou={salvarGrupo}
          />
        )}
      </Layout>
    </div>
  )
}
