import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 400px);
  grid-auto-rows: 200px;
  grid-gap: 10px;
  margin-top: 20px;
`;

const Video = styled.iframe`
  width: 100%;
  height: 100%;
`;

const Trailer = ({ trailers }) => (
  <Container>
    {trailers &&
      trailers.map((trailer) => (
        <Video
          key={trailer.key}
          src={`https://www.youtube.com/embed/${trailer.key}`}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      ))}
  </Container>
);

Trailer.propTypes = {
  trailers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
    }).isRequired
  ),
};

export default Trailer;
