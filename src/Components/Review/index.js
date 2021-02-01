import Form from "../Form";
import { faStar, faLaughWink, faGhost, faPoop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Score from "../UIButtons/Score";

const getStars = (num = 5) => {
    let stars = [];

    for (let i = 1; i <= num; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
    }

    return stars;
}

const Review = ({book}) => {

    const [score, setScore] = useState(0);

    console.log(score);
    return (
        <Form>
            <input type="hidden" name="score" value={score} />
            <Score setScore={setScore} selectedScore={score} />
        </Form>
    );
}

export default Review;