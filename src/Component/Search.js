import React from 'react';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let repoToSearch = event.target.value;
    this.props.handleChange(repoToSearch);
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Row>
            <Col xs='4'>
              <Input 
                name='repo' 
                id='repo' 
                placeholder='Repo to search'
                onChange={this.handleChange} />
            </Col>
          </Row>
        </FormGroup>
      </Form>
    ) 
  }
}

export default Search;