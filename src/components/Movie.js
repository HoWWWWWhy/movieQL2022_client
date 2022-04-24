import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 360px;
  width: 100%;
`;

const Title = styled.h1`
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 60px;
  weight: 100%;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  text-align: center;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 300px;
  weight: 100%;
  background-size: cover;
  background-position: center center;
`;

const Movie = ({ id, title, bg }) => {
  return (
    <>
      <Container>
        <Title>{title}</Title>
        <Link to={`/${id}`}>
          <Poster bg={bg} />
        </Link>
      </Container>
    </>
  );
};

export default Movie;
