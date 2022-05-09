import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams, NavLink, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";

import Movie from "../components/Movie";

const GET_MOVIES = gql`
  query Movies(
    $limit: Int
    $rating: Float
    $sort_by: String
    $order_by: String
  ) {
    movies(
      limit: $limit
      rating: $rating
      sort_by: $sort_by
      order_by: $order_by
    ) {
      id
      title
      medium_cover_image
      rating
      year
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
  background-color: #ffeccc;
  display: flex;
  justify-content: center;
  justify-items: center;
  top: 0px;
`;

const Side = styled.aside`
  background-color: #00a15b;
  //background-color: #ffa801;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 75vh;
  position: fixed;
  left: 0;
  padding-bottom: 10vh;
`;

const Option = styled.li`
  font-size: 20px;
  list-style: none;
  flex: 2;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-weight: 800;
  //background-color: yellow;
`;

const Order = styled.div`
  font-size: 20px;
  flex: 1;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-weight: 800;
  //background-color: skyblue;
`;

const OptionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${(props) => (props.active ? "black" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
`;

const Footer = styled.footer`
  background-color: #005248;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 35px;
  bottom: 0px;
  position: sticky;
`;

const Title = styled.h1`
  font-size: 80px;
  font-weight: 300;
`;

const Loading = styled.div`
  display: flex;
  width: 100%;
  height: 75vh;
  font-size: 50px;
  justify-content: center;
  align-items: center;
  padding-left: 21vw;
  padding-right: 1vw;
`;

const Error = styled.div`
  display: flex;
  width: 100%;
  height: 75vh;
  font-size: 50px;
  justify-content: center;
  align-items: center;
  padding-left: 21vw;
  padding-right: 1vw;
`;

const Movies = styled.div`
  display: grid;
  width: 100%;
  padding-top: 10px;

  padding-left: 200px;
  justify-content: space-evenly;
  justify-items: center;

  @media only screen and (min-width: 450px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media only screen and (min-width: 740px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (min-width: 1030px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (min-width: 1320px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (min-width: 1610px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media only screen and (min-width: 1900px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media only screen and (min-width: 2190px) {
    grid-template-columns: repeat(7, 1fr);
  }
`;

const Home = () => {
  const navigate = useNavigate();
  let location = useLocation();

  // console.log("location:", location);

  const { minimum_rating, option, order } = useParams();

  const [desc, setDesc] = useState(order === "asc" ? false : true);
  const [nameDesc, setNameDesc] = useState(order === "asc" ? false : true);
  const [ratingDesc, setRatingDesc] = useState(order === "asc" ? false : true);
  const [yearDesc, setYearDesc] = useState(order === "asc" ? false : true);

  // console.log("minimum_rating", minimum_rating);
  // console.log("option", option);
  // console.log("order", order);

  let variables = {};
  if (minimum_rating) {
    variables.rating = +minimum_rating;
  } else if (option) {
    variables.sort_by = option;
  }
  if (order) {
    variables.order_by = order;
  } else {
    variables.order_by = "desc";
  }

  // console.log("variables", variables);
  const { loading, error, data } = useQuery(GET_MOVIES, {
    variables: variables,
  });

  const toggleOrder = (criterion, path) => {
    let criterion_desc;
    switch (criterion) {
      case "name":
        criterion_desc = nameDesc;
        setNameDesc(!nameDesc);
        break;
      case "rating":
        criterion_desc = ratingDesc;
        setRatingDesc(!ratingDesc);
        break;
      case "year":
        criterion_desc = yearDesc;
        setYearDesc(!yearDesc);
        break;
      default:
        criterion_desc = desc;
        setDesc(!desc);
        break;
    }

    if (criterion_desc) {
      navigate(path + "/order_by/asc");
    } else {
      navigate(path);
    }
  };

  // route that it links to is currently selected.
  let activeStyle = {
    textDecoration: "none",
    color: "white",
    backgroundColor: "black",
    width: "100%",
  };
  let inactiveStyle = {
    textDecoration: "none",
    color: "black",
    backgroundColor: "white",
    width: "100%",
  };

  //if (loading) return "Loading...";
  // if (error) return `Error! ${error.message}`;
  // else {
  // if (data) {
  //   console.log(data.movies);
  // }

  //console.log("error", error);
  //console.log("loading", loading);
  return (
    <>
      <Header>
        <Title>MOVIE</Title>
      </Header>

      <Main>
        <Side>
          <OptionBox
            onClick={() => toggleOrder("", "")}
            active={
              location.pathname === "/" || location.pathname === "/order_by/asc"
            }
          >
            <Option>기본순</Option>
            <Order>
              {desc ? (
                <BsFillCaretDownFill size={20} />
              ) : (
                <BsFillCaretUpFill size={20} />
              )}
            </Order>
          </OptionBox>

          <OptionBox
            onClick={() => toggleOrder("name", "/sort_by/title")}
            active={
              location.pathname === "/sort_by/title" ||
              location.pathname === "/sort_by/title/order_by/asc"
            }
          >
            <Option>이름순</Option>
            <Order>
              {nameDesc ? (
                <BsFillCaretDownFill size={20} />
              ) : (
                <BsFillCaretUpFill size={20} />
              )}
            </Order>
          </OptionBox>

          <OptionBox
            onClick={() => toggleOrder("rating", "/sort_by/rating")}
            active={
              location.pathname === "/sort_by/rating" ||
              location.pathname === "/sort_by/rating/order_by/asc"
            }
          >
            <Option>평점순</Option>
            <Order>
              {ratingDesc ? (
                <BsFillCaretDownFill size={20} />
              ) : (
                <BsFillCaretUpFill size={20} />
              )}
            </Order>
          </OptionBox>

          <OptionBox
            onClick={() => toggleOrder("year", "/sort_by/year")}
            active={
              location.pathname === "/sort_by/year" ||
              location.pathname === "/sort_by/year/order_by/asc"
            }
          >
            <Option>연도순</Option>
            <Order>
              {yearDesc ? (
                <BsFillCaretDownFill size={20} />
              ) : (
                <BsFillCaretUpFill size={20} />
              )}
            </Order>
          </OptionBox>

          <NavLink
            to={`rating/5`}
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            <Option>최소 평점</Option>
          </NavLink>
        </Side>
        {loading ? (
          <Loading>Loading...</Loading>
        ) : error ? (
          <Error>Error! {error.message}</Error>
        ) : (
          <Movies>
            {data?.movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                rating={movie.rating}
                year={movie.year}
                bg={movie.medium_cover_image}
              />
            ))}
          </Movies>
        )}
      </Main>
      <Footer>
        <p>©Copyright 2022 by HoWWWWWhy. All rights reversed.</p>
      </Footer>
    </>
  );
  //}
};

export default Home;
