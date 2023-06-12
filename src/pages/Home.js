import { Col, Row } from 'react-bootstrap';
import { Hasil, ListCategories, Menus } from '../components/index';
import { useEffect, useState } from 'react';
import { API_URL } from '../utils/constans';
import axios from 'axios';
import Loading from '../components/Loading';
import { BeakerIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';

export default function App() {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectCategori, setSelectCategori] = useState('Makanan');
  const [keranjangs, setKeranjangs] = useState([]);

  const getKeranjangs = async () => {
    try {
      const response = await axios.get(API_URL + 'keranjangs');
      setKeranjangs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(API_URL + 'products?category.nama=' + selectCategori);
        setMenus(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
    getKeranjangs();
  }, []);

  const changeCategori = (value) => {
    setSelectCategori(value);
    setMenus([]);
    const getData = async () => {
      try {
        const response = await axios.get(API_URL + 'products?category.nama=' + value);
        setMenus(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  };
  const masukKeranjang = (value) => {
    axios
      .get(API_URL + 'keranjangs?product.id=' + value.id)
      .then((response) => {
        if (response.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + 'keranjangs', keranjang)
            .then((response) => {
              getListKeranjang();
              Swal.fire({
                title: 'Sukses Memasukkan ke Keranjangs',
                icon: 'success',
                timer: 1000,
                showConfirmButton: false,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
        else {
          const keranjang = {
            jumlah: response.data[0].jumlah + 1,
            total_harga: response.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + 'keranjangs/' + response.data[0].id, keranjang)
            .then((response) => {
              getListKeranjang();
              Swal.fire({
                title: 'Sukses Memasukkan ke Keranjangs',
                icon: 'success',
                timer: 1000,
                showConfirmButton: false,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getListKeranjang = () => {
    getKeranjangs();
  };

  return (
    <>
      <div className="container-fluit mt-4 px-3">
        <Row>
          <ListCategories changeCategori={changeCategori} selectCategori={selectCategori} />
          <Col>
            <h4>
              <strong>Daftar Kategories</strong>
            </h4>
            <hr />
            <Row>{isLoading ? <Loading /> : menus.map((menu) => <Menus masukKeranjang={masukKeranjang} menu={menu} key={menu.id} />)}</Row>
          </Col>
          <Hasil keranjangs={keranjangs} getListKeranjang={getListKeranjang} getKeranjangs={getKeranjangs} />
        </Row>
      </div>
    </>
  );
}
