import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const Item = styled.article`
  margin-right: 10px;
  margin-bottom: 10px;
`;

const Title = styled.h4`
  margin-bottom: 10px;
  font-size: 14px;
`;

const SLink = styled(Link)`
  display: block;
  width: 100px;
  height: 150px;
  background: url(${(props) => props.bgimage}) no-repeat center;
  background-size: cover;
`;

const Seasons = ({ seasons }) => (
  <Container>
    {seasons &&
      seasons.map((season) => (
        <Item key={season.id}>
          {console.log(season)}
          <Title>{season.name}</Title>
          <SLink
            bgimage={
              season.poster_path
                ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                : require("assets/noPosterSmall.png").default
            }
            to={`/collection/${season.id}`}
            replace={true}
          />
        </Item>
      ))}
  </Container>
);

Seasons.propTypes = {
  seasons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    }).isRequired
  ),
};

export default Seasons;
