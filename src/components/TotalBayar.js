import React, { useState } from 'react';
import { Col, Button, Row, Modal } from 'react-bootstrap';
import { PriceFormat } from '../utils/PriceFormat';
import { API_URL } from '../utils/constans';
import axios from 'axios';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import ModalPembayaran from './ModalPembayaran';
import Swal from 'sweetalert2';

export default function TotalBayar(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const total = props.keranjangs.reduce((accumulator, object) => {
    return accumulator + object.total_harga;
  }, 0);

  const handleBayar = async (e) => {
    // setShow(true);
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
        total_bayar: e,
        pembayaran: number,
        kembalian: number - e,
        status: true,
        menus: props.keranjangs,
      };

      axios
        .post(API_URL + 'pesanans', pesananData)
        .then((response) => {
          navigate('/sukses');
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

  const submitTotalBayar = (value) => {
    const pesananData = {
      total_bayar: value,
      status: false,
      menus: props.keranjangs,
    };

    axios
      .post(API_URL + 'pesanans', pesananData)
      .then((response) => {
        navigate('/sukses');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="fixed-bottom">
      <Row>
        <Col className="pb-3" md={{ span: 3, offset: 9 }}>
          <h6 className="px-4">
            Total Harga : {''}
            <strong className="float-end mr-2">Rp.{PriceFormat(total)}</strong>
          </h6>
          <Button className="w-100 mt-2" onClick={() => handleBayar(total)}>
            Bayar Sekarang
          </Button>
          <Button variant="outline-primary" className="w-100 mt-1" onClick={() => submitTotalBayar(total)}>
            Bayar Nanti
          </Button>
          {/* Modal */}
          <ModalPembayaran show={show} handleClose={handleClose} />
        </Col>
      </Row>
    </div>
  );
}
