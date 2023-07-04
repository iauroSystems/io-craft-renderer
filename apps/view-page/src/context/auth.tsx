import { createContext, useState, FC, ReactNode } from 'react';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<ReactNode> | any = ({ children }: any) => {
  const [auth, setAuth] = useState<IAuth>({
    isLoggedIn: true,
    user_id: '7f90df6e-b832-44e2-b624-3143d428001f',
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
