import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),

  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
        <style type="text/css">
            {`
            
        h1, h2, h3 {
        font-family: 'Courier New';
        color: white;
        }
        body {
        background-color: #282828;
        }
        h1, h2 {
        letter-spacing: 0.1em;  
        }

        h3 {
        letter-spacing: 0.2em;  
        }
        div{
          padding-bottom: 8px;
        }

        .container {
          background-color: #282828;
          color: #1DB954;
          font-size: 2rem;
          display: inline-block;
          margin:  0.25rem;
          padding:  1rem;
          width:  100%; 
          
        }

        .col {
          background-color: #282828;
        }

        .header {
        background-size: cover;
        padding: 4rem 2rem;
        text-align: left;
        grid-area: header;
        }

        .header {
        font-size: 2rem;
        padding-bottom: 1rem;
        }
        .btn-success {
            background-color: #1DB954;
            color: white;
          }
        `}
  </style>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/profile/:username">
              <Profile />
            </Route>
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
