import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const PostList = () => {
    const[posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const { token } = useToken();

    const fetchData = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/api/posts`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const navigateToPost = async (post_id) => {
        navigate(`/posts/${post_id}`)
    }

    const navigateToCreatePost = async () => {
        navigate(`/post`)
    }

    return (
        <div>
            { token ? <button onClick={() => navigateToCreatePost()}>Create Trail</button> : null}
            <table>
                <thead>
                    <tr>
                        <th>Trail Name</th>
                        <th>View Trail</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => {
                    return (
                        <tr key = { post.id }>
                            <td>
                                { post.title }
                            </td>
                            <td>
                                <button onClick={()=> navigateToPost(post.id)}>View</button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default PostList;
