import React from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import { AiOutlineHome } from 'react-icons/ai';
import { FaRegListAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <CardDeck className="text-center d-flex align-items-center min-vh-100">
      <Card border="success" className="register-card">
        <Link to="/room/register" className="no-deco-link py-5 home-card">
          <Card.Body>
            <Card.Title><AiOutlineHome /> 방 등록하기</Card.Title>
            <Card.Text>
              방의 정보를 입력해 방을 등록합니다.
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
      <Card border="warning" className="list-card">
        <Link to="/rooms" className="no-deco-link py-5 home-card">
          <Card.Body>
            <Card.Title><FaRegListAlt /> 방 목록으로 가기</Card.Title>
            <Card.Text>
              등록되어 있는 방의 목록 페이지로 이동합니다.
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </CardDeck>
  );
}

export default Home;