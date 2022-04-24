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
  height: 800px;
  width: 800px;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 25%;
  weight: 50%;
  background-size: cover;
  background-position: center center;
`;

const Details = () => {
  const { id } = useParams();
  //console.log("id:", id);
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  //console.log(data.movie);
  if (data?.movie) {
    const {
      title,
      imdb_code,
      rating,
      description_full,
      medium_cover_image,
      cast,
    } = data.movie;
    return (
      <>
        <Container>
          <div>
            <h1>
              {title} {imdb_code} {rating}
            </h1>
          </div>
          <div>{description_full}</div>
          {cast && <h1>{cast[0].name}</h1>}
          <Poster bg={medium_cover_image}></Poster>
        </Container>
      </>
    );
  }
};

export default Details;
