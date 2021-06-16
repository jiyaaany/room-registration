import React from 'react';
import { Card } from 'react-bootstrap';
import { Room, RealEstates } from '../types/instances';

type P = {
  room: Room
};

const RoomCard: React.FC<P> = ({ room }: P) => {
  const realEstates: RealEstates = {
    'ONE_ROOM': '원룸',
    'TWO_ROOM': '투룸',
    'APARTMENT': '아파트',
    'EFFICIENCY_APARTMENT': '오피스텔',
  };

  return (
    <Card>
      <Card.Img variant="top" src={room.thumbnail} />
      <Card.Body>
        <Card.Title>{room.address}</Card.Title>
        <Card.Text>
          [{realEstates[room.realEstate]}] {Number(room.depositAmount).toLocaleString()} 원
          {
            !!room.rentAmount &&
            <>/ {Number(room.rentAmount).toLocaleString()}</>
          }
          {
            !!room.maintenanceFee &&
            <> (관리비: {Number(room.maintenanceFee).toLocaleString()} 원)</>
          }
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RoomCard;