import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${(props) => props.bgImage}) center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background: url(${(props) => props.bgImage}) center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const ImdbLink = styled.a`
  display: inline-block;
  width: 40px;
  background: url(${require("assets/imdbIcon.png").default}) no-repeat center;
  background-size: cover;
  text-indent: -9999px;
`;

const CompaniesContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const Company = styled.img`
  width: 100px;
  :not(:last-child) {
    margin-right: 15px;
  }
`;

const VideoContainer = styled.div``;

const Video = styled.iframe`
  width: 700px;
  height: 350px;
`;

const DetailPresenter = ({ result, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Naflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Naflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("assets/noPosterSmall.png").default
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>&middot;</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>&middot;</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {result.imdb_id && (
              <>
                <Divider>&middot;</Divider>
                <ImdbLink
                  href={`https://www.imdb.com/title/${result.imdb_id}`}
                  target="_blank"
                >
                  IMDB
                </ImdbLink>
              </>
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <CompaniesContainer>
            {result.production_companies &&
              result.production_companies.map((company) =>
                company.logo_path ? (
                  <Company
                    key={company.id}
                    src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                    alt={company.name}
                  />
                ) : null
              )}
          </CompaniesContainer>
          <VideoContainer>
            {result.videos && (
              <Video
                src={`https://www.youtube.com/embed/${result.videos.results[0].key}`}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            )}
          </VideoContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
