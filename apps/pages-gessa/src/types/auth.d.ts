interface IAuth {
  isLoggedIn: boolean;
  user_id?: string;
}

type AuthContextType = {
  auth: IAuth;
  setAuth: (auth: IAuth) => void;
};
