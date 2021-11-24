import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Layout from './Layout.js';
import Choice from './Choice';
import { Route, Switch } from 'react-router-dom';
import Folder from './Folder';

function App() {
  return (
      <Layout>
        <Route exact path="/" component={Choice} />
        <Switch>
          <Route path="/folder" component={Folder} />
          <Route path="/folder/:code" component={Folder} />
        </Switch>
      </Layout>
  );
}

export default App;
