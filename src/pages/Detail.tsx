import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Room, RealEstates, RealEstatePriceTypes, MaintenanceFeeItems, SunlightDirections, Floors } from '../types/instances';
import { MatchParams } from '../types/params';

const Detail: React.FC<RouteComponentProps<MatchParams>> = ({ match }: RouteComponentProps<MatchParams>) => {
  const realEstates: RealEstates = {
    'ONE_ROOM': '원룸',
    'TWO_ROOM': '투룸',
    'APARTMENT': '아파트',
    'EFFICIENCY_APARTMENT': '오피스텔',
  };

  const realEstatePriceTypes: RealEstatePriceTypes = {
    'MONTHLY': '월세',
    'JEONSE': '전세',
    'SELLING': '매매',
  };

  const maintenanceFeeItems: MaintenanceFeeItems = {
    'ELECTRIC': '전기',
    'GAS': '가스',
    'WATERWORKS': '수도',
    'INTERNET': '인터넷',
    'TV': 'TV',
  };

  const sunlightDirections: SunlightDirections = {
    'EAST': '동',
    'WEST': '서',
    'SOUTH': '남',
    'NORTH': '북',
    'SOUTH_EAST': '남동',
    'SOUTH_WEST': '남서',
    'NORTH_WEST': '북서',
    'NORTH_EAST': '북동',
  };

  const floors: Floors = {
    'ROOFTOP': '옥탑',
    'SEMI_BASEMENT': '반지하',
  };

  const [roomItems, setRoomItems] = useState<Room[]>(JSON.parse(localStorage.getItem('roomItems') || '[]'));
  const [room, setRoom] = useState<Room | undefined>(roomItems.find(room => room.pk === match.params.roomPK));

  const toggleCancel = () => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        const nextRoom: Room = {
          ...prevRoom,
          canceled: !prevRoom.canceled
        };

        setRoomItems((prevRoomItems) =>
          prevRoomItems.map(item =>
            item.pk === prevRoom.pk
              ? nextRoom
              : item
          )
        );
        return nextRoom;
      }
    });
  };

  useEffect(() => {
    localStorage.setItem('roomItems', JSON.stringify(roomItems));
  }, [roomItems]);

  return (
    <div>
      {
        !!room &&
        <>
          <Card>
            <Card.Img variant="top" src={room.thumbnail} />
            <Card.Body>
              <Card.Text>
                <span><b>주소:</b> {room.address}</span><br />
                <span><b>상세주소:</b> {room.detailAddress}</span><br />
                <span><b>매물종류</b>: {realEstates[room.realEstate]}</span><br />
                <span><b>가격</b>: [{realEstatePriceTypes[room.realEstatePriceType]}]</span>
                <span>{Number(room.depositAmount).toLocaleString()} 원</span>
                {
                  !!room.rentAmount &&
                  <span> / {Number(room.rentAmount).toLocaleString()} 원</span>
                }
                <br />
                {
                  !!room.maintenanceFee &&
                  <span><b>관리비</b>: {Number(room.maintenanceFee).toLocaleString()} 원</span>
                }
                <br />
                {
                  !!room.maintenanceFeeItems.length &&
                  <span><b>관리비 포함 항목:</b> {
                    room.maintenanceFeeItems.map(item => maintenanceFeeItems[item]).join(', ')
                  }</span>
                }
                <br />

                <span><b>층수</b>: {
                  isNaN(parseInt(room.floor)) ? floors[room.floor] : room.floor + '층'
                }</span> <br />
                <span><b>방향</b>: {sunlightDirections[room.sunlightDirection]}</span> <br />
                <span><b>전용면적</b>: {room.leasableArea} m2</span> <br />
                <span><b>반려동물</b>: {room.pet ? '가능' : '불가능'}</span>
              </Card.Text>
              {
                room.canceled
                  ? <>
                    <Button className="mr-2" variant="outline-dark" onClick={toggleCancel}>방 올리기</Button>
                    <Link to={`/room/edit/${room.pk}`}>
                      <Button variant="outline-secondary">방 정보 수정</Button>
                    </Link>
                  </>
                  : <Button variant="dark" onClick={toggleCancel}>방 내리기</Button>
              }
            </Card.Body>
          </Card>
        </>
      }
    </div>
  );
}

export default Detail;