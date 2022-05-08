import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import RatingStar from "../components/RatingStar";

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
  //background: linear-gradient(pink 50%, #40739e 50%);
  background-color: #40739e;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 1200px;
  height: 600px;
  background: linear-gradient(#192a56 10%, #40739e 60%, #192a56 100%);

  //background-color: #192a56;
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
  font-size: 40px;
  font-weight: 600;
  height: 60px;
  //background-color: #192a56;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1300px) {
    height: ${(props) =>
      props.length > 26 || props.length * 20 > props.windowWidth
        ? "100px"
        : "60px"};
  }
`;

// const Rating = styled.div`
//   font-size: 20px;
//   margin: 10px 0px;
// `;

const Description = styled.div`
  font-size: 18px;
  height: 300px;
  overflow: auto;
  line-height: 150%;
  //background-color: white;
  // padding-top: 10px;
  // padding-bottom: 10px;
  @media only screen and (max-width: 1300px) {
    height: ${(props) => (props.titleLength > 26 ? "260px" : "300px")};
  }
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
    console.log("width:", window.innerWidth);
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
                <Title
                  length={data?.movie.title.length}
                  windowWidth={window.innerWidth}
                >
                  {data?.movie.title}
                </Title>
                {/* <Rating>{data?.movie.rating}</Rating> */}
                <RatingStar rating={data?.movie.rating} />
                <Description titleLength={data?.movie.title.length}>
                  {data?.movie.description_full}
                </Description>
              </Board>
              <a
                href={`https://www.imdb.com/title/${data?.movie.imdb_code}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Poster bg={data?.movie.medium_cover_image}></Poster>
              </a>
            </>
          )}
        </Card>
      </Container>
    </>
  );
};

export default Details;
// {data?.movie.cast && <h1>{data?.movie.cast[0].name}</h1>}
//https://www.imdb.com/title/${data?.movie.imdb_code}
