import { useParams } from "react-router-dom";

const ReviewDetail = () => {
  let param = useParams();
  console.log(param);
  console.log("HIII THIS IS THE REVIEW DETAIL!!!");
  return;
};

export default ReviewDetail;
