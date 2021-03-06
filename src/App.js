import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Layout from './Layout.js';
import Choice from './Choice';
import { Route, Switch } from 'react-router-dom';
import Folder from './Folder';
import Login from './Login';
import { withCookies, Cookies } from 'react-cookie';
import Admin from './Admin';

function App(props) {
  return (
    <Layout>
      <Route exact path="/" component={Choice} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
      <Switch>
        <Route path="/folder" component={Folder} />
        <Route path="/folder/:code" component={Folder} />
      </Switch>
    </Layout>
  );
}

export default App;
