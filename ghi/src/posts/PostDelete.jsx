import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'


const PostDelete = () => {
  const [logger, setLogger] = useState('')
  const [postInfo, setPostInfo] = useState('')
  const navigate = useNavigate();
  let { post_id } = useParams();

  const fetchLoggedInUserData = async () => {
      const url = `${process.env.REACT_APP_API_HOST}/api/user`;
      const response = await fetch(url, {credentials: 'include'});
      if (response.ok) {
        const data = await response.json();
        setLogger(data);
      }
  };

  const fetchPostData = async (post_id) => {
      const url = `${process.env.REACT_APP_API_HOST}/api/posts/${post_id}`;
      const response = await fetch(url, {credentials: 'include'});
      if (response.ok) {
        const postData = await response.json();
        console.log(postData)
        setPostInfo(postData);
      }
  };

  useEffect(() => {
      fetchLoggedInUserData();
      fetchPostData(post_id);
  }, [post_id]);

  const DeleteUser = async (post) => {
      const url = `${process.env.REACT_APP_API_HOST}/api/posts/${post.id}`;
      const fetchOption = {
          method: 'DELETE',
          credentials: 'include'
      }

        const response = await fetch(url, fetchOption);
        if (response.ok) {
            alert(`${post.title} has been deleted`)
        }
  };

    const navigateToProfile = async (postInfo) => {
        DeleteUser(postInfo)
        navigate("/profile")
    };

    return (
      <div>
        <h2> Are you sure you want to delete {postInfo.title}? </h2>
        <table>
          <thead>
            <tr>
                <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>---</td>
            </tr>
            <tr>
              <td>
                {postInfo.created_by === logger.id ? (
                    <button className="m-4 bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline" onClick={() => navigateToProfile(postInfo)}>
                        Delete
                    </button>
                ) : null}
              </td>
              <td>        </td>
              <td>        </td>
              <td>
                {postInfo.created_by === logger.id ? (
                    <button className="m-4 bg-gray-300 hover:bg-blue-300 text-black font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline" onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}

export default PostDelete
