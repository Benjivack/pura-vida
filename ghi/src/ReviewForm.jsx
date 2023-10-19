import { useEffect, useState } from "react";


function ReviewForm() {
    const [review, setReview] = useState([])

    const getData = async () => {

    if (response.ok) {
      const data = await response.json();
      setReview(data.review);
    }
    }

    useEffect(() => {
      getData();
    }, []);

    
}