import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostUpdate = () => {
  const [logger, setLogger] = useState('')
  const [postInfo, setPostInfo] = useState('')
  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [zipcode, setZipcode] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  let { post_id } = useParams();


    const fetchData = async () => {
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
        fetchData();
        fetchPostData(post_id);
    }, [post_id]);
    console.log(postInfo)
    console.log(logger)
    console.log(title)

    useEffect(() => {
        if (postInfo !== '') {
            setTitle(postInfo.title);
            setLatitude(postInfo.latitude);
            setLongitude(postInfo.longitude);
            setZipcode(postInfo.zipcode);
            setBody(postInfo.body);
        }
    }, [postInfo]);

  const handleSubmit = async (e, post_id) => {
    e.preventDefault();
    const postData = {
      title: title,
      latitude: latitude,
      longitude: longitude,
      zipcode: zipcode,
      body: body,
      created_by: postInfo.created_by,
      created_at: postInfo.created_at
    };

    const updatePostUrl = `${process.env.REACT_APP_API_HOST}/api/posts/${post_id}`;
    const fetchOption = {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(postData)
    }
    const response = await fetch(updatePostUrl, fetchOption);
    if (response.ok) {
        e.target.reset();
        navigate("/posts");
    }
  };


  if (postInfo.created_by === logger.id) {
      return (
        <div className="card text-bg-light mb-3">
          <h5 className="card-header">Update Post</h5>
          <div className="card-body">
            <form onSubmit={(e) => handleSubmit(e, post_id)}>
              <div className="mb-3">
                <label htmlFor= "title" className="form-label">title</label>
                <input
                  value={title}
                  id="title"
                  name="title"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="latitude" className="form-label">latitude</label>
                <input
                  value={latitude}
                  id="latitude"
                  name="latitude"
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setLatitude(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">longitude</label>
                <input
                  value={longitude}
                  name="longitude"
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setLongitude(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">zipcode</label>
                <input
                  value={zipcode}
                  name="zipcode"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setZipcode(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">body</label>
                <input
                  value={body}
                  name="body"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setBody(e.target.value);
                  }}
                />
              </div>
              <div>
                <input className="btn btn-primary" type="submit" value="Update Post" />
              </div>
            </form>
          </div>
        </div>
      );
  } else {
    return (
        <div>
            THIS IS NOT YOUR POST!
        </div>
    )
  }
};

export default PostUpdate;
