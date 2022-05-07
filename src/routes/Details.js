import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const GET_MOVIE = gql`
  query Movie($id: Int!) {
    movie(id: $id) {
      imdb_code
      title
      rating
      language
      description_full
      medium_cover_image
      cast {
        name
        character_name
      }
    }
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #40739e;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 1200px;
  height: 600px;
  background-color: #192a56;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  @media only screen and (max-width: 1300px) {
    width: 600px;
    height: 800px;
    flex-direction: column;
  }
`;

const Board = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (max-width: 1300px) {
    order: 2;
    flex: 3;
  }
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  width: 230px;
  height: 345px;
  background-size: cover;
  background-position: center center;
  margin: 20px;
  @media only screen and (max-width: 1300px) {
    order: 1;
  }
`;

const Title = styled.div`
  font-size: 20px;
`;

const Rating = styled.div`
  font-size: 20px;
  margin: 10px 0px;
`;

const Description = styled.div`
  font-size: 20px;
`;

const Loading = styled.div`
  font-size: 50px;
  color: white;
`;

const Error = styled.div`
  font-size: 50px;
  color: white;
`;

const Details = () => {
  const { id } = useParams();
  //console.log("id:", id);
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  });

  //if (loading) return "Loading...";
  //if (error) return `Error! ${error.message}`;

  console.log("error", error);
  console.log("loading", loading);
  if (data) {
    console.log(data.movie);
  }
  // if (!loading) {
  //   const {
  //     title,
  //     imdb_code,
  //     rating,
  //     description_full,
  //     medium_cover_image,
  //     cast,
  //   } = data.movie;
  // }
  return (
    <>
      <Container>
        <Card>
          {loading ? (
            <Loading>Loading...</Loading>
          ) : error ? (
            <Error>Error! {error.message}</Error>
          ) : (
            <>
              <Board>
                <Title>{data?.movie.title}</Title>
                <Rating>{data?.movie.rating}</Rating>
                <Description>{data?.movie.description_full}</Description>
              </Board>
              <Poster bg={data?.movie.medium_cover_image}></Poster>
            </>
          )}
        </Card>
      </Container>
    </>
  );
};

export default Details;
// {data?.movie.cast && <h1>{data?.movie.cast[0].name}</h1>}
