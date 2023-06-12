import axios from 'axios';
import React, { useEffect } from 'react';
import { Toast, Container, Row } from 'react-bootstrap';
import { API_URL } from '../utils/constans';
import { useState } from 'react';
import { PriceFormat } from '../utils/PriceFormat';
import { ModalPesanan } from '../components/pesanan';

export default function Pesanans() {
  const [pesanans, setPesanans] = useState([]);
  const [detailPesanans, setDetailPesanans] = useState(false);
  const [jumlah, setJumlah] = useState(0);
  const [show, setShow] = useState(false);
  const getPesanans = () => {
    axios
      .get(API_URL + 'pesanans')
      .then((res) => {
        setPesanans(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPesanans();
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (pesanan) => {
    setDetailPesanans(pesanan);
    setShow(true);
  };
  return (
    <Container className="mt-3">
      <Row className="gap-4">
        {pesanans.map((pesanan) => {
          const total = pesanan.menus.reduce((accumulator, object) => {
            return accumulator + object.jumlah;
          }, 0);
          return (
            <Toast
              key={pesanan.id}
              className={!pesanan.status ? null : 'opacity-50'}
              onClick={() => {
                handleShow(pesanan);
              }}
            >
              <Toast.Body>
                <div className="d-flex my-auto justify-content-between align-content-center">
                  <small className="my-auto">Bootstrap</small>
                  {pesanan.status ? (
                    <strong style={{ fontSize: 16 }} className="text-success">
                      Sukses
                    </strong>
                  ) : (
                    <strong style={{ fontSize: 16 }} className="text-danger">
                      Belum
                    </strong>
                  )}
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p>
                    Total Pesanan : <strong>{total}</strong>
                  </p>
                  <p>
                    Total Harga : <strong>Rp.{PriceFormat(pesanan.total_bayar)}</strong>
                  </p>
                </div>
              </Toast.Body>
            </Toast>
          );
        })}
        <ModalPesanan handleClose={handleClose} show={show} detailPesanans={detailPesanans} getPesanans={getPesanans}/>
      </Row>
    </Container>
  );
}
