import React, { useState } from 'react';
import { Col, ListGroup, Row, Modal, Button, Card } from 'react-bootstrap';
import { PriceFormat } from '../utils/PriceFormat';
import TotalBayar from './TotalBayar';
import ModalKeranjang from './ModalKeranjang';
import axios from 'axios';
import { API_URL } from '../utils/constans';
export default function Hasil(props) {
  const [show, setShow] = useState(false);
  const [keranjangDetail, setKeranjangDetail] = useState(false);
  const [jumlah, setJumlah] = useState();
  const [keterangan, setKeterangan] = useState('');

  const tambah = () => {
    setJumlah(jumlah + 1);
  };
  const kurang = () => {
    if (jumlah !== 1) {
      setJumlah(jumlah - 1);
    }
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (keranjang) => {
    setShow(true);
    setKeranjangDetail(keranjang);
    setJumlah(keranjang.jumlah);
  };

  const handleDelete = (id) => {
    axios
      .delete(API_URL + 'keranjangs/' + id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => {
        handleClose();
        props.getKeranjangs();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const keranjang = {
      ...keranjangDetail,
      jumlah,
      total_harga: keranjangDetail.product.harga * jumlah,
      keterangan,
    };

    axios
      .put(API_URL + 'keranjangs/' + keranjangDetail.id, keranjang)
      .then((response) => {
        props.getKeranjangs();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        <Card className="overflow-auto" style={{ height: '53vh' }}>
          {props.keranjangs.lenght !== 0 && (
            <ListGroup>
              {props.keranjangs.map((keranjang) => (
                <ListGroup.Item
                  key={keranjang.id}
                  onClick={() => {
                    handleShow(keranjang);
                  }}
                >
                  <Row className="d-flex justify-content-center align-items-center">
                    <Col xs={1}>
                      <p>{keranjang.jumlah}</p>
                    </Col>
                    <Col>
                      <h6> {keranjang.product.nama} </h6>
                      <small>Rp.{PriceFormat(keranjang.product.harga)}</small>
                    </Col>
                    <Col xs={4} className="d-flex me-2">
                      <strong style={{ fontSize: 16 }}>Rp.{PriceFormat(keranjang.total_harga)} </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}

              <ModalKeranjang
                handleClose={handleClose}
                show={show}
                keranjangDetail={keranjangDetail}
                jumlah={jumlah}
                setJumlah={setJumlah}
                tambah={tambah}
                kurang={kurang}
                handleDelete={handleDelete}
                handleSubmit={handleSubmit}
                setKeterangan={setKeterangan}
              />
              <TotalBayar keranjangs={props.keranjangs} />
            </ListGroup>
          )}
        </Card>
      </Col>
    </>
  );
}
