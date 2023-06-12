import React, { useState } from 'react';
import { ListGroup, Modal, Button, Card, Row, Col, Spinner } from 'react-bootstrap';
import { PriceFormat } from '../../utils/PriceFormat';
import Swal from 'sweetalert2';
import axios from 'axios';
import { API_URL } from '../../utils/constans';
import { redirect, useNavigate } from 'react-router-dom';
export default function ModalPesanan({ show, handleClose, detailPesanans, getPesanans }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleBayar = async (e) => {
    handleClose();
    const { value: number } = await Swal.fire({
      title: 'Pembayaraan',
      input: 'number',
      inputLabel: 'Total Bayar Rp.' + PriceFormat(e),
      inputPlaceholder: 'Masukkan Jumlah Uang Anda',
    });

    if (number >= e) {
      Swal.fire({
        title: `Pembayaraan Success`,
        html: 'Total HargaRp.' + PriceFormat(e) + '<br>' + 'Pembayaran Rp.' + PriceFormat(number) + '<br>' + '<b>Kembalian : Rp. ' + PriceFormat(number - e) + '</b>',
        icon: 'success',
      });

      const pesananData = {
        ...detailPesanans,
        total_bayar: e,
        pembayaran: number,
        kembalian: number - e,
        status: true,
      };

      axios
        .put(API_URL + 'pesanans/' + detailPesanans.id, pesananData)
        .then((response) => {
          getPesanans();
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (number < e) {
      Swal.fire({
        title: `Uang Anda tidak Cukup`,
        html: 'Anda Perlu Membayar <b>Rp.' + PriceFormat(e) + '</b> <br> Masih Kurang Rp.' + PriceFormat(number - e),
        icon: 'error',
      });
    }
  };
  const handleEdit = (e) => {
    e.menus.map((item) => {
      return axios
        .post(API_URL + 'keranjangs', item)
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(true);
          axios
            .delete(API_URL + 'pesanans/' + e.id)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
            .finally(() => {
              navigate('/');
            });
        });
    });
  };
  if (detailPesanans) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <Card className="overflow-auto" style={{ height: '60vh' }}>
            <ListGroup>
              {detailPesanans.menus.map((menu) => (
                <ListGroup.Item key={menu.id}>
                  <Row className="d-flex justify-content-center align-items-center">
                    <Col xs={1}>
                      <p>{menu.jumlah}</p>
                    </Col>
                    <Col>
                      <h6> {menu.product.nama} </h6>
                      <small>Rp.{PriceFormat(menu.product.harga)}</small>
                    </Col>
                    <Col xs={4} className="me-3">
                      <strong style={{ fontSize: 18 }}>Rp.{PriceFormat(menu.total_harga)} </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <ListGroup className="w-100">
            <Row className="d-flex justify-content-center align-items-center">
              <Col xs={1}>
                <p>10</p>
              </Col>
              <Col>
                <small>Total Bayar</small>
                <h6>Rp.{PriceFormat(detailPesanans.total_bayar)} </h6>
              </Col>
              <Col xs={4} className="me-3">
                <div>
                  <Button onClick={() => handleEdit(detailPesanans)} variant={isLoading === true ? 'outline-warning' : 'warning'} className="me-2">
                    {isLoading === true ? <Spinner className="d-flex" animation="border" variant="warning" /> : 'edit'}
                  </Button>
                  <Button
                    onClick={() => {
                      handleBayar(detailPesanans.total_bayar);
                    }}
                  >
                    Bayar
                  </Button>
                </div>
              </Col>
            </Row>
          </ListGroup>
        </Modal.Footer>
      </Modal>
    );
  } else {
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Kosong</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>;
  }
}
