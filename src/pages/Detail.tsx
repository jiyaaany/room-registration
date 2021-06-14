import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { roomItems } from '../roomItems';
import { RouteComponentProps } from 'react-router-dom';
import { Room, RealEstate, RealEstatePriceType, MaintenanceFeeItems, SunlightDirection, Floor } from '../types/instances';

type MatchParams = {
  roomPK: string
}

const Detail: React.FC<RouteComponentProps<MatchParams>> = ({ match }: RouteComponentProps<MatchParams>) => {

  const realEstates: RealEstate = {
    'ONE_ROOM': '원룸',
    'TWO_ROOM': '투룸',
    'APARTMENT': '아파트',
    'EFFICIENCY_APARTMENT': '오피스텔',
  };

  const realEstatePriceTypes: RealEstatePriceType = {
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

  const sunlightDirections: SunlightDirection = {
    'EAST': '동',
    'WEST': '서',
    'SOUTH': '남',
    'NORTH': '북',
    'SOUTH_EAST': '남동',
    'SOUTH_WEST': '남서',
    'NORTH_WEST': '북서',
    'NORTH_EAST': '북동',
  };

  const floors: Floor = {
    'ROOFTOP': '옥탑',
    'SEMI_BASEMENT': '반지하',
  };

  const [room, setRoom] = useState<Room | undefined>();

  const toggleCancel = () => {
    if (room) {
      setRoom({
        ...room,
        canceled: !room?.canceled
      });
    }
  };

  useEffect(() => {
    setRoom(roomItems.find(room => room.pk === parseInt(match.params.roomPK)));
  }, [match.params.roomPK]);

  return (
    <div>
      {
        !!room &&
        <>
          <Card>
            <Card.Img variant="top" src={room.thumbnail} />
            <Card.Body>
              <Card.Text>
                <span>주소: {room.address}</span><br />
                <span>상세주소: {room.detailAddress}</span><br />
                <span>매물종류: {realEstates[room.realEstate]}</span><br />
                <span>가격: [{realEstatePriceTypes[room.realEstatePriceType]}]</span>
                <span>{room.depositAmount}</span>
                {
                  room.rentAmount
                    ? <span> / {room.rentAmount}</span>
                    : null
                }
                <br />
                <span>관리비: {room.maintenanceFee}</span> <br />
                <span>관리비 포함 항목: {
                  room.maintenanceFeeItems.forEach((item, index) => {
                    if (index !== room.maintenanceFeeItems.length - 1) {
                      return maintenanceFeeItems[item] + ', '
                    } else {
                      return maintenanceFeeItems[item];
                    }
                  })
                }</span><br />
                <span>층수: {
                  isNaN(parseInt(room.floor)) ? floors[room.floor] : room.floor + '층'
                }</span> <br />
                <span>방향: {sunlightDirections[room.sunlightDirection]}</span> <br />
                <span>전용면적: {room.leasableArea} m2</span> <br />
                <span>반려동물: {room.pet ? '가능' : '불가능'}</span>
              </Card.Text>
              {
                room.canceled
                  ? <Button variant="outline-dark" onClick={toggleCancel}>방 올리기</Button>
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