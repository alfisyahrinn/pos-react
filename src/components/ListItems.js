import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { BeakerIcon, CommandLineIcon, HomeModernIcon } from '@heroicons/react/24/solid';
export default function ListItems({ children, selectCategori, ...props }) {
  const Icon = ({ nama }) => {
    if (nama === 'Makanan') return <CommandLineIcon style={{ height: '42px', width: '42px' }} />;
    if (nama === 'Minuman') return <BeakerIcon style={{ height: '42px', width: '42px' }} />;
    if (nama === 'Cemilan') return <HomeModernIcon style={{ height: '42px', width: '42px' }} />;
  };
  return (
    <>
      <ListGroup.Item {...props} active={children.nama === selectCategori && true} style={{ cursor: 'pointer' }}>
        <Icon nama={children.nama} />
        <strong> {children.nama}</strong>
      </ListGroup.Item>
    </>
  );
}
