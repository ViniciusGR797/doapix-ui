import { ReactNode, createContext, useContext } from 'react';

const optionsState = ['Todos estados', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
const optionsTime = ['Recentes', 'Antigas'];
const optionsCategory = ['Todas categórias', 'Casa / Moradia', 'Animais / Pets', 'Arte / Entretenimento', 'Educação / Aprendizagem', 'Empreendedorismo / Empresas', 'Esportes / Atletas', 'Eventos / Comemorações', 'Fome / Desnutrição', 'Projetos Sociais / Voluntariado', 'Saúde / Tratamentos', 'Sonhos / Outros', 'Tragédia / Desastres / Acidentes', 'Viagens / Turismo'];

interface IOptionsContext {
  optionsState: string[];
  optionsTime: string[];
  optionsCategory: string[];
}

const OptionsContext = createContext<IOptionsContext>({ optionsState, optionsTime, optionsCategory });

export const OptionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <OptionsContext.Provider value={{ optionsState, optionsTime, optionsCategory }}>
      {children}
    </OptionsContext.Provider>
  );
};

export const useOptions = () => useContext(OptionsContext);
