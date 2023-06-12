import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { PriceFormat } from '../utils/PriceFormat';

export default function Menus(props) {
  return (
    <Col sm={12} md={6} lg={4} className="mb-3">
      <Card
        style={{ width: '13rem', cursor: 'pointer' }}
        onClick={() => {
          props.masukKeranjang(props.menu);
        }}
      >
        <Card.Img variant="top" src={'assets/images/' + props.menu.category.nama + '/' + props.menu.gambar} />
        <Card.Body>
          <small>{props.menu.category.nama}</small>
          <h4>{props.menu.nama}</h4>
          <Card.Text>Rp. {PriceFormat(props.menu.harga)} </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
