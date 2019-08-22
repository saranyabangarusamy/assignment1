import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Col,
  Row,
  Container,
  InputGroup,
  FormControl,
  Button
} from "react-bootstrap";

import * as serviceWorker from "./serviceWorker";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      qty:2
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: parseInt(event.target.value) });
  }
  handelQty = event => {
    this.setState({ qty:event.target.value });
    console.log(event.target.value)
  };

  render() {
    const imgStyle = {
      height: "200px",
    }
    return (
      <Col md={3}>
        <Card>
          <Card.Header>{this.props.info.discount}% Discount</Card.Header>
          <Card.Img variant="top" style={imgStyle} src={this.props.info.imgsrc} />
          <Card.Body>
            <Card.Title>{this.props.info.name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <select
                className="form-control"
                value={this.state.value}
                onChange={this.handleChange}
              >
                {this.props.info.variants.map((item, index) => (
                  <option key={index} value={index}>
                    {item.wg}| {item.price}Rs.
                  </option>
                ))}
              </select>
            </ListGroupItem>
            <ListGroupItem>
              MRP : {this.props.info.variants[this.state.value].price} Rs.
            </ListGroupItem>
            <ListGroupItem>Standard Delivery : Tomorrow</ListGroupItem>
            <ListGroupItem>Express Delivery : N/A</ListGroupItem>
            <ListGroupItem>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    QTY
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={this.state.qty}
                  onChange={this.handelQty}
                />
                <InputGroup.Append>
                  <Button variant="warning">Add</Button>
                </InputGroup.Append>
              </InputGroup>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    );
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  renderItem(item,index) {
    return <Item info={item} key={index}/>;
  }

  render() {
    var items = [];
    fetch("http://localhost:3001")
      .then(res => res.json())
      .then(data => {
        this.setState({items:data})
      })
      .catch(err => {
        console.log(err);
      });
    return (
      <div>
        <div className="board-row" />
        <Container>
          <Row>{this.state.items.map((item,index) => this.renderItem(item,index))}</Row>
        </Container>
      </div>
    );
  }
}

class Food extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 4
    };
  }

  render() {
    const count = this.state.count;

    return (
      <div className="game">
        <div className="game-board">
          <List count={count} />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Food />, document.getElementById("root"));
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
