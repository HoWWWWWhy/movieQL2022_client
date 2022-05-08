import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Container = styled.div`
  height: 30px;
  width: 160px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  //background-color: white;
`;

const Rating = styled.div`
  font-size: 20px;
  margin-left: 5px;
`;

const RatingStar = ({ rating }) => {
  //console.log("rating: ", rating);

  const ICON_SIZE = 24;
  const ICON_COLOR = "#f1c40f";

  let ICON_LIST = [];

  let fullStar = parseInt(rating / 2);
  const halfStar =
    rating / 2 - fullStar <= 0.5 && rating / 2 - fullStar > 0 ? 1 : 0;
  if (halfStar === 0) {
    if (rating / 2 - fullStar > 0.5) fullStar += 1;
  }
  const emptyStar = 5 - fullStar - halfStar;

  let i;
  for (i = 0; i < fullStar; i++) {
    ICON_LIST.push("full");
  }
  for (i = 0; i < halfStar; i++) {
    ICON_LIST.push("half");
  }
  for (i = 0; i < emptyStar; i++) {
    ICON_LIST.push("empty");
  }
  //console.log(ICON_LIST);
  //   console.log("fullStar: ", fullStar);
  //   console.log("halfStar: ", halfStar);
  return (
    <>
      <Container>
        {ICON_LIST.map((icon, index) => {
          if (icon === "full") {
            return (
              <BsStarFill
                key={`${icon}${index}`}
                color={ICON_COLOR}
                size={ICON_SIZE}
              />
            );
          } else if (icon === "half") {
            return (
              <BsStarHalf
                key={`${icon}${index}`}
                color={ICON_COLOR}
                size={ICON_SIZE}
              />
            );
          } else {
            return (
              <BsStar
                key={`${icon}${index}`}
                color={ICON_COLOR}
                size={ICON_SIZE}
              />
            );
          }
        })}
        <Rating>{rating}</Rating>
      </Container>
    </>
  );
};

export default RatingStar;
