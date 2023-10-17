import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    e.target.reset();
  };

  return (
    <div>
        <h5>Login</h5>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label htmlFor=""> Username: </label>
                <input
                name="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor=""> Password: </label>
                <input
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <input type="submit" value="Login"/>
            </div>
        </form>
    </div>
  );
};

export default LoginForm;
