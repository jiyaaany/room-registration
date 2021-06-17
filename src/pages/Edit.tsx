import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import RoomForm from '../components/RoomForm';
import { Room } from '../types/instances';
import { MatchParams } from '../types/params';

const Edit: React.FC<RouteComponentProps<MatchParams>> = ({ match, history }: RouteComponentProps<MatchParams>) => {
  const [roomItems, setRoomItems] = useState<Room[]>(JSON.parse(localStorage.getItem('roomItems') || '[]'));
  const [formData, setFormData] = useState<Room | undefined>(roomItems.find(item => item.pk.toString() === match.params.roomPK));
  const [hasMaintenanceFee, setHasMaintenanceFee] = useState<boolean>(true);
  const [showCompleteModal, setShowCompleteModal] = useState<boolean>(false);

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setFormData(prevFormData => {
      if (prevFormData) {
        return {
          ...prevFormData,
          [target.name]: target.name === 'pet' ? JSON.parse(target.value) : target.value,
        };
      }
    });
  };

  const toggleMaintenanceFee = () => {
    setHasMaintenanceFee(!hasMaintenanceFee);
  };

  const onSubmit = () => {
    if (formData) {
      setRoomItems(prevRoomItems =>
        prevRoomItems.map(item =>
          item.pk === formData.pk
            ? formData
            : item
        )
      );
    }

    setShowCompleteModal(true);
  };

  const addMaintenanceFeeItems = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.checked) {
      setFormData(prevFormData => {
        if (prevFormData) {
          return {
            ...prevFormData,
            maintenanceFeeItems: prevFormData.maintenanceFeeItems.concat(target.value)
          };
        }
      });
    } else {
      setFormData(prevFormData => {
        if (prevFormData) {
          return {
            ...prevFormData,
            maintenanceFeeItems: prevFormData.maintenanceFeeItems.filter(item => item !== target.value)
          };
        }
      });
    }
  };

  const setLeasableArea = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setFormData(prevFormData => {
      if (prevFormData) {
        return {
          ...prevFormData,
          leasableArea: target.name === 'pyeong' ? Number(target.value) * 3.30579 : Number(target.value),
        }
      }
    });
  };

  const changeMaintenanceFee = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setFormData(prevFormData => {
      if (prevFormData) {
        return {
          ...prevFormData,
          maintenanceFee: value === 'SELLING' ? 0 : prevFormData.maintenanceFee,
          rentAmount: value !== 'MONTHLY' ? 0 : prevFormData.rentAmount,
          [name]: value,
        }
      }
    });
  };

  const registerRoom = () => {
    if (formData) {
      localStorage.setItem('roomItems', JSON.stringify(roomItems.map(item =>
        item.pk === formData.pk
          ? {
            ...formData,
            canceled: !formData.canceled
          }
          : item
      )));

      history.push('/rooms');
    }
  };

  useEffect(() => {
    if (!hasMaintenanceFee) {
      setFormData(prevFormData => {
        if (prevFormData) {
          return {
            ...prevFormData,
            maintenanceFee: 0,
          }
        }
      });
    }
  }, [hasMaintenanceFee, setFormData]);

  if (!formData) {
    return null;
  }

  return (
    <>
      <h2 className="font-weight-bold text-center">방 수정하기</h2>
      <RoomForm
        onChange={onChange}
        onSubmit={onSubmit}
        formData={formData}
        changeMaintenanceFee={changeMaintenanceFee}
        toggleMaintenanceFee={toggleMaintenanceFee}
        hasMaintenanceFee={hasMaintenanceFee}
        addMaintenanceFeeItems={addMaintenanceFeeItems}
        setLeasableArea={setLeasableArea}
        buttonText="수정하기"
      />

      <Modal show={showCompleteModal} onHide={() => setShowCompleteModal(false)} backdrop="static" centered>
        <Modal.Body>
          <p>방이 수정되었습니다.</p>
        </Modal.Body>

        <Modal.Footer>
          <Link to="/rooms">
            <Button variant="secondary">목록으로 가기</Button>
          </Link>
          <Button variant="primary" onClick={registerRoom}>방 올리기</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;