import { Inter } from 'next/font/google'
import Layout from '@/components/Layout';
import Botao from '@/components/Botao';
import usePessoas from '../../hooks/pessoa/usePessoas';
import TabelaPessoa from '../../components/pessoa/TabelaPessoa';
import FormularioPessoa from '@/components/pessoa/FormularioPessoa';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const {
    pessoa,
    pessoas,
    editarPessoa,
    novaPessoa,
    salvarPessoa,
    excluirPessoa,
    detalharPessoa,
    tabelaVisivel,
    exibirTabela,
    titulo
  } = usePessoas()

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
                onClick={() => novaPessoa()}>
                  Nova Pessoa
              </Botao>
            </div>
            <TabelaPessoa pessoas={pessoas}
              detalharPessoa={detalharPessoa}
              editarPessoa={editarPessoa}
              excluirPessoa={excluirPessoa}
            />
          </>
        ) : (
          <FormularioPessoa
            pessoa={pessoa}
            cancelado={() => exibirTabela('Pessoas')}
            pessoaMudou={salvarPessoa}
          />
        )}
      </Layout>
    </div>
  )
}
