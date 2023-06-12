import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { PriceFormat } from '../utils/PriceFormat';
export default function ModalKeranjang({ show, handleClose, keranjangDetail, jumlah, tambah, kurang, handleDelete, handleSubmit, setKeterangan }) {
  const handleKeterangan = (e) => {
    setKeterangan(e);
  };
  {
    if (keranjangDetail) {
      return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {keranjangDetail.product.nama}
              {''}
              <small>(Rp.{PriceFormat(keranjangDetail.product.harga)})</small>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Total Harga</Form.Label>
                <p>Rp.{PriceFormat(keranjangDetail.product.harga * jumlah)}</p>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <p>Jumlah</p>
                <div className="d-flex w-25">
                  <Button variant="dark" onClick={kurang}>
                    -
                  </Button>
                  <p className="m-auto">{jumlah}</p>
                  <Button variant="dark" onClick={tambah}>
                    +
                  </Button>
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Keterangan</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Contoh : Pedas, Manis, Gula Sedikit"
                  name="keterangan"
                  onChange={(e) => {
                    handleKeterangan(e.target.value);
                  }}
                />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                handleDelete(keranjangDetail.id);
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Kosong</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
}
