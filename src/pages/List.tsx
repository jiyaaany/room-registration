import React from 'react';
import { Tabs, Tab, Row, Col, Button } from 'react-bootstrap';
import RoomCard from '../components/RoomCard';
import { Link } from 'react-router-dom';
import { Room } from '../types/instances';

const List: React.FC = () => {
  const roomItems: Room[] = JSON.parse(localStorage.getItem('roomItems') || '[]');

  return (
    <>
      <Tabs defaultActiveKey="uncancelled" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="uncancelled" title="올린 방">
          <Row xs={1} md={2} className="g-4">
            {
              roomItems.filter(room => !room.canceled)
                .map(uncancelledRoom => (
                  <Col key={uncancelledRoom.pk}>
                    <Link to={`/room/${uncancelledRoom.pk}`}>
                      <RoomCard key={uncancelledRoom.pk} room={uncancelledRoom}></RoomCard>
                    </Link>
                  </Col>
                ))
            }
          </Row>
        </Tab>
        <Tab eventKey="cancelled" title="내린 방">
          <Row xs={1} md={2} className="g-4">
            {
              roomItems.filter(room => room.canceled)
                .map(cancelledRoom => (
                  <Col key={cancelledRoom.pk}>
                    <Link to={`/room/${cancelledRoom.pk}`}>
                      <RoomCard key={cancelledRoom.pk} room={cancelledRoom}></RoomCard>
                    </Link>
                  </Col>
                ))
            }
          </Row>
        </Tab>
      </Tabs >
      <Link to="/room/register">
        <Button variant="success" size="lg" style={{ position: 'fixed', bottom: 60, left: '50%', transform: 'translateX(-50%)' }}>방 등록하기</Button>
      </Link>
    </>
  );
};

export default List;