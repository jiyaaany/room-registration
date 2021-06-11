import React from 'react';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import RoomCard from '../components/RoomCard';
import { roomItems } from '../roomItems';
import { Link } from 'react-router-dom';

const List: React.FC = () => {
  return (
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="uncancelled" title="올린 방">
        <Row xs={1} md={2} className="g-4">
          {
            roomItems.filter(room => !room.canceled)
              .map(uncancelledRoom => (
                <Col>
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
                <Col>
                  <Link to={`/room/${cancelledRoom.pk}`}>
                    <RoomCard key={cancelledRoom.pk} room={cancelledRoom}></RoomCard>
                  </Link>
                </Col>
              ))
          }
        </Row>
      </Tab>
    </Tabs >
  );
};

export default List;