import './App.css';
import Navbar from './components/Navbar/Navbar';
import DisplayArea from './components/DisplayArea/DisplayArea';
import Footer from './components/Footer/Footer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddMovieForm from './components/AddMovieForm/AddMovieForm';
import VideoArea from './components/VideoArea/VideoArea';
import NotFound  from './components/NotFound/NotFound';

function App() {
  return (
    <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={DisplayArea} />
          <Route  path='/AddMovie' component={AddMovieForm} />
          <Route path='/view/:id' component={VideoArea} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer/>
    </Router>
  );
}

export default App;
