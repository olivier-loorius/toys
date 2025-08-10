import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../config/supabase';
import type { AuthUser } from '../config/supabase';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, nom: string, prenom: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Récupérer la session initiale
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Récupérer les données utilisateur depuis la base de données
        supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data: userData, error }) => {
            if (userData && !error) {
              const authUser: AuthUser = {
                id: userData.id,
                email: userData.email,
                nom: userData.nom,
                prenom: userData.prenom,
                created_at: userData.created_at
              };
              setUser(authUser);
              setToken(session.access_token || null);
            }
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    });

    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        if (session?.user) {
          // Récupérer les données utilisateur depuis la base de données
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (userData && !error) {
            const authUser: AuthUser = {
              id: userData.id,
              email: userData.email,
              nom: userData.nom,
              prenom: userData.prenom,
              created_at: userData.created_at
            };
            setUser(authUser);
            setToken(session.access_token || null);
          }
        } else {
          setUser(null);
          setToken(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        // Récupérer les données utilisateur depuis la base de données
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (userError) {
          throw new Error('Erreur lors de la récupération des données utilisateur');
        }

        const authUser: AuthUser = {
          id: userData.id,
          email: userData.email,
          nom: userData.nom,
          prenom: userData.prenom,
          created_at: userData.created_at
        };

        setUser(authUser);
        setToken(data.session?.access_token || null);
        localStorage.setItem('user', JSON.stringify(authUser));
        if (data.session?.access_token) {
          localStorage.setItem('token', data.session.access_token);
        }
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, nom: string, prenom: string) => {
    try {
      // Créer l'utilisateur dans Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Erreur Supabase Auth:', error);
        throw new Error(error.message);
      }

      if (data.user) {
        // Attendre un peu pour que le trigger se déclenche
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mettre à jour les données utilisateur dans la table users
        const { error: updateError } = await supabase
          .from('users')
          .update({
            nom: nom,
            prenom: prenom,
            email: email
          })
          .eq('id', data.user.id);

        if (updateError) {
          console.error('Erreur mise à jour utilisateur:', updateError);
          // Si la mise à jour échoue, essayer d'insérer
          const { error: insertError } = await supabase
            .from('users')
            .insert([
              {
                id: data.user.id,
                email: email,
                nom: nom,
                prenom: prenom,
                created_at: new Date().toISOString()
              }
            ]);

          if (insertError) {
            console.error('Erreur insertion utilisateur:', insertError);
            throw new Error('Erreur lors de la création du profil utilisateur');
          }
        }

        const authUser: AuthUser = {
          id: data.user.id,
          email: email,
          nom: nom,
          prenom: prenom,
          created_at: new Date().toISOString()
        };

        setUser(authUser);
        setToken(data.session?.access_token || null);
        localStorage.setItem('user', JSON.stringify(authUser));
        if (data.session?.access_token) {
          localStorage.setItem('token', data.session.access_token);
        }
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook useAuth exporté après la définition du contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 