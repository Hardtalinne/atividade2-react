import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Characters } from "./pages/characters";
import { Home } from "./pages/home";
import { Comics } from "./pages/comics";
import { Series } from "./pages/series";
import { Events } from "./pages/events";


export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/characters/:id?">
          <Characters />
        </Route>
        <Route path="/comics/:id?">
          <Comics />
        </Route>
        <Route path="/series/:id?">
          <Series />
        </Route>
        <Route path="/events/:id?">
          <Events />
        </Route>
      </Switch>
    </Router>
  );
}
