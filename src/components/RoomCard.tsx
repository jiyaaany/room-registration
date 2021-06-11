import React from 'react';
import { Card } from 'react-bootstrap';
import { Room } from '../types/instances';

type P = {
  room: Room
};

const RoomCard: React.FC<P> = ({ room }: P) => {
  return (
    <Card>
      <Card.Img variant="top" src={room.thumbnail} />
      <Card.Body>
        <Card.Title>{room.address}</Card.Title>
        <Card.Text>
          [{room.realEstate}] {room.depositAmount}
          {
            room.rentAmount &&
            <>/ {room.rentAmount}</>
          }
          (관리비: {room.maintenanceFee})
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RoomCard;