import React, { useState } from 'react';
import { Navigate, redirect, useNavigate, Button } from 'react-router-dom';

export default function Testing() {
  const navigate = useNavigate();
  var traveler = [
    { description: 'Senior', amount: 25 },
    { description: 'Senior', amount: 50 },
    { description: 'Adult', amount: 75 },
    { description: 'Child', amount: 50 },
    { description: 'Infant', amount: 0 },
  ];
  const arr = [
    { id: 1, salary: 10 },
    { id: 2, salary: 20 },
    { id: 3, salary: 30 },
  ];

  const sum = traveler.reduce((accumulator, object) => {
    return accumulator + object.amount;
  }, 0);

  const mantap = () => {
    navigate('../sukses');
  };
  const [jumlah, setJumlah] = useState(0);
  const tambah = () => {
    setJumlah(jumlah + 1);
  };
  const kurang = () => {
    if (jumlah !== 1) {
      setJumlah(jumlah - 1);
    }
  };
  const anjas = (e) => {
    console.log('input : ', e);
  };
  return (
    <>
      <div className="d-flex w-25">
        <button onClick={kurang}>-</button>
        <p className="m-auto">{jumlah}</p>
        <button onClick={tambah}>+</button>
      </div>
      <input
        type="text"
        onChange={(e) => {
          anjas(e.target.value);
        }}
      />
    </>
  );
}
