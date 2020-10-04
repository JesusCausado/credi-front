import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import Routes from "./routes/index";
import 'semantic-ui-css/semantic.min.css'

const App = () => (  
    <Routes/>
);

ReactDOM.render(
    <App/>,
  document.getElementById("root")
);
