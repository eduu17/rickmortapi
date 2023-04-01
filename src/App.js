import React, { Component } from "react";
import { GlobalStyles } from "./GlobalStyles";
import axios from "axios";

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export default class App extends Component {
  state = {
    characters: [],
    loading: false,
  };

  getNumber = async () => {
    const listId = [];
    for (let number = 0; number <= 20; number++) {
      listId.push(Math.floor(Math.random() * (826 - 1) + 1));
    }
    return listId;
  };

  loadData = async () => {
    const array = await this.getNumber();
    const response = await api.get(`/character/${array}`);
    this.setState({
      characters: response.data,
      loading: true,
    });
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { characters, loading } = this.state;
    return (
      <>
        {loading
          ? characters.map((item) => (
              <box key={item.id}>
                <img src={item.image} alt={item.name} />
                <h1>{item.name}</h1>
                <p>{item.status}</p>
                <p>{item.species}</p>
                <p>{item.type}</p>
                <p>{item.gender}</p>
                <p>{item.location.name}</p>
              </box>
            ))
          : "loading..."}
        <GlobalStyles />
      </>
    );
  }
}
