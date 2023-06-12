import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import { API_URL } from '../utils/constans';
import ListItems from './ListItems';
import { BeakerIcon, CommandLineIcon } from '@heroicons/react/24/solid';

export default function ListCategories(props) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { changeCategori, selectCategori } = props;
  useEffect(() => {
    axios
      .get(API_URL + 'categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <Col md={2} mt="2">
        <h4 className="text-center">
          <strong>Daftar Kategories</strong>
        </h4>
        <hr />
        <ListGroup>
          {categories.map((categori) => (
            <ListItems
              key={categori.id}
              onClick={() => {
                changeCategori(categori.nama);
              }}
              selectCategori={selectCategori}
            >
              {categori}
            </ListItems>
          ))}
        </ListGroup>
      </Col>
    </>
  );
}
