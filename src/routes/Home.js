import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

import Movie from "../components/Movie";

const GET_MOVIES = gql`
  query Movies {
    movies {
      id
      title
      medium_cover_image
    }
  }
`;

const Header = styled.header`
  height: 15vh;
  background-color: #ffa801;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  top: 0px;
  position: sticky;
`;

const Main = styled.main`
  background-color: #ffc048;
  display: flex;
  flex-direction: row;
  justify-content: center;

  top: 0px;
`;

const Side = styled.aside`
  background-color: #e17055;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20vw;
  height: 100%;
  position: fixed;
  left: 0;
  margin-right: 10px;
`;

const Option = styled.h2`
  font-size: 20px;
`;
const Footer = styled.footer`
  background-color: #485460;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 5vh;
  bottom: 0px;
  position: sticky;
`;

const Title = styled.h1`
  font-size: 80px;
  font-weight: 300;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 80%;
  padding-top: 10px;
  padding-left: 21vw;
  padding-right: 1vw;
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (data && data.movies) {
    console.log(data.movies);
    return (
      <>
        <Header>
          <Title>MOVIE</Title>
        </Header>
        <Main>
          <Side>
            <Option>aaaa</Option>
            <Option>dbbbbd</Option>
            <Option>dddddd</Option>
          </Side>
          <Movies>
            {data.movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                bg={movie.medium_cover_image}
              />
            ))}
          </Movies>
        </Main>

        <Footer>
          <p>©Copyright 2022 by HoWWWWWhy. All rights reversed.</p>
        </Footer>
      </>
    );
  }
};

export default Home;
