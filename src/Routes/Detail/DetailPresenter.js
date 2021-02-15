import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Countries from "Components/Countries";
import Companies from "Components/Companies";
import Trailers from "Components/Trailers";
import Collection from "Components/Collection";
import Seasons from "Components/Seasons";

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

const InsideContainer = styled.section`
  margin-top: 30px;
`;

const InsideMenu = styled.ul`
  display: flex;
`;

const MenuItem = styled.li`
  margin-right: 20px;
  font-size: 15px;
  color: ${(props) => (props.active ? "#f1c40f" : "#fff")};
`;

const DetailPresenter = withRouter(
  ({ location, match, result, error, loading }) =>
    loading ? (
      <>
        <Helmet>
          <title>Loading | Naflix</title>
        </Helmet>
        <Loader />
      </>
    ) : error ? (
      <Message color={"#e74c3c"} text={error} />
    ) : (
      <Container>
        <Helmet>
          <title>
            {result.original_title
              ? result.original_title
              : result.original_name}{" "}
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
                  : result.first_air_date?.substring(0, 4)}
              </Item>
              <Divider>&middot;</Divider>
              <Item>
                {result.runtime ? result.runtime : result.episode_run_time[0]}{" "}
                min
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
            <InsideContainer>
              <InsideMenu>
                <MenuItem active={location.pathname.includes("/countries")}>
                  {location.pathname.includes("/movie") ? (
                    <Link to={`/movie/${match.params.id}/countries`}>
                      Countries
                    </Link>
                  ) : (
                    <Link to={`/show/${match.params.id}/countries`}>
                      Countries
                    </Link>
                  )}
                </MenuItem>
                <MenuItem active={location.pathname.includes("/companies")}>
                  {location.pathname.includes("/movie") ? (
                    <Link to={`/movie/${match.params.id}/companies`}>
                      Companies
                    </Link>
                  ) : (
                    <Link to={`/show/${match.params.id}/companies`}>
                      Companies
                    </Link>
                  )}
                </MenuItem>
                <MenuItem active={location.pathname.includes("/trailers")}>
                  {location.pathname.includes("/movie") ? (
                    <Link to={`/movie/${match.params.id}/trailers`}>
                      Trailers
                    </Link>
                  ) : (
                    <Link to={`/show/${match.params.id}/trailers`}>
                      Trailers
                    </Link>
                  )}
                </MenuItem>
                <MenuItem
                  active={
                    location.pathname.includes("/collection") ||
                    location.pathname.includes("/season")
                  }
                >
                  {location.pathname.includes("/movie") ? (
                    <Link to={`/movie/${match.params.id}/collection`}>
                      Collection
                    </Link>
                  ) : (
                    <Link to={`/show/${match.params.id}/season`}>Season</Link>
                  )}
                </MenuItem>
              </InsideMenu>
              {console.log(result)}

              {location.pathname.includes("/movie") ? (
                <>
                  <Route
                    path="/movie/:id/countries"
                    render={() => (
                      <Countries countries={result.production_countries} />
                    )}
                  />
                  <Route
                    path="/movie/:id/companies"
                    render={() => (
                      <Companies companies={result.production_companies} />
                    )}
                  />
                  <Route
                    path="/movie/:id/trailers"
                    render={() => <Trailers trailers={result.videos.results} />}
                  />
                  <Route
                    path="/movie/:id/collection"
                    render={() => (
                      <Collection collection={result.belongs_to_collection} />
                    )}
                  />
                </>
              ) : (
                <>
                  <Route
                    path="/show/:id/countries"
                    render={() => (
                      <Countries countries={result.production_countries} />
                    )}
                  />
                  <Route
                    path="/show/:id/companies"
                    render={() => (
                      <Companies companies={result.production_companies} />
                    )}
                  />
                  <Route
                    path="/show/:id/trailers"
                    render={() => <Trailers trailers={result.videos.results} />}
                  />
                  <Route
                    path="/show/:id/season"
                    render={() => <Seasons seasons={result.seasons} />}
                  />
                </>
              )}
            </InsideContainer>
          </Data>
        </Content>
      </Container>
    )
);

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
