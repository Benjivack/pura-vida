import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { Main } from "./Main";
import LoginForm from "./LoginForm.jsx";
import SignupForm from "./SignUpForm.jsx";
import PostsForm from "./posts/PostsForm";
import PostList from "./posts/PostsList";
import PostDetail from "./posts/PostDetail";
import ReviewForm from "./reviews/ReviewForm";
import ReviewList from "./reviews/ReviewList";
import ReviewDetail from "./reviews/ReviewDetail";
import StatusForm from "./status/StatusForm";
// import { useEffect, useState } from "react";
// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  // const [launchInfo, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
  //     console.log("fastapi url: ", url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, []);

  return (
    <div>
      <BrowserRouter basename={basename}>
        <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
          {/* <ErrorNotification error={error} />
          <Construct info={launchInfo} /> */}
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/signup" element={<SignupForm />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route exact path="/post" element={<PostsForm />} />
            <Route exact path="/posts/" element={<PostList />} />
            <Route exact path="/posts/:post_id" element={<PostDetail />} />
            <Route
              exact
              path="/posts/:post_id/review"
              element={<ReviewForm />}
            />
            <Route exact path="/reviews" element={<ReviewList />} />
            <Route
              exact
              path="/reviews/:review_id"
              element={<ReviewDetail />}
            />
            <Route exact path="/post" element={<PostsForm />} />
            <Route exact path="/reviews" element={<ReviewList />} />
            <Route
              exact
              path="/reviews/:review_id"
              element={<ReviewDetail />}
            />
            <Route exact path="/post" element={<PostsForm />} />
            <Route
              exact
              path="/post/:post_id/status"
              element={<StatusForm />}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
