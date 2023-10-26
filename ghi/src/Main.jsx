import useToken from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./LoginForm";
import LogoutForm from "./LogoutForm";

const ConsoleBanner = () => {
  return (
    <div className="alert alert-info mt-3 mb-3" role="alert">
      <i className="bi bi-info-circle-fill"></i> Open your browser's console to
      see more information.
    </div>
  );
};

export const Main = () => {
  const { token } = useToken();
  return (
    <div className="grid grid-cols-3 gap-4">
      map grid three columns
      <ConsoleBanner />
      {!token && <LoginForm />}
      {/* {token && <TokenCard />} */}
      {token && <LogoutForm />}
      {/* <UserDataCard /> */}
    </div>
  );
};
