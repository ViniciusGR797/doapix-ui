import { createContext, ReactNode, useState, useEffect } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { api } from '@/services/apiClient';
import { toast } from 'react-toastify';

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credencials: SignUpProps) => Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  pwd: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

type SignUpProps = {
  name: string;
  email: string;
  pwd: string;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
  try{
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  }catch{
    alert("Erro ao deslogar")
  }
}

export function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  useEffect(() => {
    //checar se tem algo no cookie
    const { '@nextauth.token': token } = parseCookies();

    //Carregar as informações do usuario na pagina 
    if(token){
      api.get('/').then(response => {
        const { id, name, email } = response.data;

        setUser({
          id,
          name,
          email
        })
      })
      .catch( () => {
        //Se der algum erro deve deslogar usuario
        signOut();
      })
    }
  }, [])

  async function signIn( { email, pwd }: SignInProps){
    try{
      const response = await api.post('/session', {
        email,
        pwd
      })

      const { id, name, token } = response.data;

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, //1 mes de validação do token
        path: "/" //Quais caminhos terao acesso ao cookie, colocando apenas / todos terão
      })

      setUser({
        id,
        name,
        email 
      })

      //Passar para as outras requisicoes o token junto:
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success("Logado com sucesso!");

      //Depois de logar, redirecionar o usuario até a home do doapix
      Router.push('/home')

    }catch(err){
      toast.error("Erro ao acessar!");
      console.log("ERRO AO ACESSAR ", err)
    }
  }

  async function signUp( {name, email, pwd}: SignUpProps){
    try{
      const response = await api.post('/users/', {
        name,
        email,
        pwd
      })

      toast.success("Cadastrado com sucesso!")

      Router.push('/')

    }catch(err){
      toast.error("Erro ao cadastrar!")
      console.log("ERRO "+err)
    }
  }

  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}