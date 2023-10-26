import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const LogoutForm = () => {
  const { logout } = useToken();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
    e.target.reset();
    navigate(`/`);
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Are you Sure You Want To Logout</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              value="Logout"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogoutForm;
