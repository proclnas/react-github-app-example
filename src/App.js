import React from 'react';
import './App.css';
import axios from 'axios';
import { Container } from 'reactstrap';
import Search from './Component/Search';
import Repo from './Component/Repo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repoToSearch: '',
      searching: false,
      repos: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchRepo = this.searchRepo.bind(this);
  }

  handleChange(repoToSearch) {
    this.setState({repoToSearch: repoToSearch});

    if (repoToSearch.length % 3 === 0) {
      this.searchRepo();
    }
  } 

  handleSubmit(event) {
    event.preventDefault();
    this.searchRepo();
  }

  searchRepo() {
    this.setState({searching: true});

    axios.request({
      url: 'https://api.github.com/search/repositories?q=' + this.state.repoToSearch + '&sort=stars',
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    }).then(response => {
      //console.log(response);
      this.setState({repos: response.data.items, searching: false});
    });
  }

  render() {
    return (
      <Container>
        <h2>Github repo search</h2>
        <Search handleChange={this.handleChange} />
        <h2>Results</h2>
        <h1 className='text-muted'>{this.state.searching ? 'Searching...' : ''}</h1>
        <Repo repos={this.state.repos} />
      </Container>
    )
  }
}

export default App