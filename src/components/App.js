import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";

const App = (props) =>  {
    return (
        <>
            <GlobalStyles />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/game">
                        <Game />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
