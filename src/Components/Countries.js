import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Country = styled.span`
  :not(:last-child) {
    margin-right: 15px;
  }
`;

const Countries = ({ countries }) => (
  <Container>
    {console.log(countries)}
    {countries &&
      countries.map((country) => (
        <Country key={country.iso_3166_1}>
          {`${country.name} ( ${country.iso_3166_1} )`}
        </Country>
      ))}
  </Container>
);

Countries.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      iso_3166_1: PropTypes.string.isRequired,
    })
  ),
};

export default Countries;
