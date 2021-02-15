import React from "react";
import { collectionsApi } from "api";
import CollectionPresenter from "./CollectionPresenter";

export default class extends React.Component {
  state = {
    result: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;

    if (isNaN(id)) {
      return push("/");
    }
    let result = null;
    try {
      ({ data: result } = await collectionsApi.collectionDetail(id));
    } catch {
      this.setState({ error: "Can't find any Collection" });
    } finally {
      this.setState({ loading: false, result });
    }
  }

  render() {
    const { result, error, loading } = this.state;
    return (
      <CollectionPresenter result={result} error={error} loading={loading} />
    );
  }
}
