import React from 'react';
import './App.css';
import axios from 'axios';
import { 
  Container, Button, Form, 
  FormGroup, Input, 
  Row, Col, Card, CardText, 
  CardBody, CardLink,
  CardTitle, CardSubtitle, CardFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  handleChange(event) {
    let repoToSearch = event.target.value;
    this.setState({repoToSearch: event.target.value});

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
    const cards = this.state.repos.map((repo, index) => {
      return (
        <Col xs='3' key={index} style={{marginBottom: '5px'}}>
          <Card>
            <CardBody>
              <CardTitle>{repo.name}</CardTitle>
              <CardSubtitle><small className="text-muted">{repo.full_name}</small></CardSubtitle>
              <CardText>
                {repo.description ? repo.description.substring(0, 60) + '...' : repo.description}
              </CardText>
              <CardLink href={repo.html_url}>Visit Repo</CardLink>
            </CardBody>
            <CardFooter>
              <FontAwesomeIcon icon='star' /> : {repo.stargazers_count}
              {' '}
              <FontAwesomeIcon icon='eye' /> : {repo.watchers_count}
            </CardFooter>
          </Card>
        </Col>
      )
  });

    return (
      <Container>
        <h2>Github repo search</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Row>
              <Col xs='4'>
                <Input 
                  name='repo' 
                  id='repo' 
                  placeholder='Repo to search' 
                  value={this.state.repoToSearch} 
                  onChange={this.handleChange} />
              </Col>
            </Row>
          </FormGroup>
          <Button onClick={this.handleClick}>Submit</Button>
        </Form>

        <h2>Results</h2>
        <h1 className='text-muted'>{this.state.searching ? 'Searching...' : ''}</h1>
        <div>
          <Row>
            {cards}
          </Row>
        </div>
      </Container>
    )
  }
}

export default App