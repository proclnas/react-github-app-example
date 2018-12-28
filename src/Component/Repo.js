import React from 'react';
import { Row, Col, Card, CardText, 
  CardBody, CardLink,
  CardTitle, CardSubtitle, CardFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Repo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cards = this.props.repos.map((repo, index) => {
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
      <div>
        <Row>
          {cards}
        </Row>
      </div>
    );
  }
}

export default Repo;