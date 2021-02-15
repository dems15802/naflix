import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;
`;

const Title = styled.h4`
  margin-bottom: 10px;
  font-size: 14px;
`;

const SLink = styled(Link)`
  display: block;
  width: 200px;
  height: 300px;
  background: url(${(props) => props.bgimage}) center;
  background-size: cover;
`;

const Collection = ({ collection }) => (
  <Container>
    {collection && (
      <>
        <Title>{collection.name}</Title>
        <SLink
          bgimage={
            collection.poster_path
              ? `https://image.tmdb.org/t/p/original${collection.poster_path}`
              : require("assets/noPosterSmall.png").default
          }
          to={`/collection/${collection.id}`}
          replace={true}
        />
      </>
    )}
  </Container>
);

Collection.propTypes = {
  collection: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
  }).isRequired,
};

export default Collection;
