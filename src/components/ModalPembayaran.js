import React from 'react';
import { Col, Button, Row, Modal } from 'react-bootstrap';

export default function ModalPembayaran({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} style={{ marginTop:130 }}>
      <Modal.Header closeButton>
        <Modal.Title>Pembayaraan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Button className="w-100 mb-2">Bayar Sekarang</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
