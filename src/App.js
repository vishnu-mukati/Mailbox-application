import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import AuthForm from "./components/auth/AuthForm";
import ChangePassword from "./components/pages/ChangePassword";
import store from "./store";
import Welcome from "./components/pages/Welcome";

function App() {
    // const isAuth = useSelector(state => state);
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    return (
        <BrowserRouter>
            <Switch>
                {!isAuth && <Route path='/' exact component={AuthForm} />}
                <Route path='/changepassword' component={ChangePassword} />
                {isAuth && (
                    <Route path="/" exact component={Welcome} />
                )}
                <Route>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
