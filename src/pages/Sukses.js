import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/constans';

export default function Sukses() {
  useEffect(() => {
    axios
      .get(API_URL + 'keranjangs')
      .then((response) => {
        const keranjang = response.data;
        keranjang.map((item) => {
          return axios
            .delete(API_URL + 'keranjangs/' + item.id)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: '80vh' }}>
      <h1>Pembelian Sukses</h1>
      <Link to="/" className="btn btn-primary warna">
        Back
      </Link>
    </div>
  );
}
