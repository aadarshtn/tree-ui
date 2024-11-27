import React from "react";
import PanelView from "./components/PanelView";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/ApolloClient"; // Import the Apollo client instance
import { Provider } from "react-redux";
import store from "./redux/store"; // Import the Redux store

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PanelView />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
