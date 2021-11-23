import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Layout from './Layout.js';
import Choice from './Choice';
import { BrowserRouter, Link } from "react-router-dom";


function App() {
  return (
      <Layout>
        <Choice />
        <Link to="/choice">1</Link>
        <Link to="/expenses">2</Link>
      </Layout>
  );
}

export default App;
