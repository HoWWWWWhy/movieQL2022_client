import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 435px;
  width: 230px;
  margin: 10px;
`;

const Title = styled.h1`
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 60px;
  weight: 100%;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  text-align: center;
`;

const Info = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 30px;
  weight: 100%;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  text-align: center;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  background-color: #ffa801;
  height: 345px;
  weight: 100%;
  background-size: cover;
  background-position: center center;
`;

const Movie = ({ id, title, rating, bg, year }) => {
  return (
    <>
      <Container>
        <Title>{title}</Title>
        <Link to={`/details/${id}`}>
          <Poster bg={bg} />
        </Link>
        <Info>
          {year} / {rating}
        </Info>
      </Container>
    </>
  );
};

export default Movie;
