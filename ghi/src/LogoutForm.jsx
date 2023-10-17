import useToken from "@galvanize-inc/jwtdown-for-react";

const LogoutForm = () => {
  const { logout } = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
    e.target.reset();
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Logout</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input className="btn btn-primary" type="submit" value="Logout" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogoutForm;
