import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Company = styled.img`
  width: 50px;
  :not(:last-child) {
    margin-right: 15px;
  }
`;

const Companies = ({ companies }) => (
  <Container>
    {companies &&
      companies.map((company) => (
        <Company
          key={company.id}
          src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
          alt={company.name}
        />
      ))}
  </Container>
);

Companies.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      logo_path: PropTypes.string,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Companies;
