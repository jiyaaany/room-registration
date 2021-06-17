import React, { useState, useEffect, ChangeEvent } from 'react';
import useForm from '../useForm';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Room } from '../types/instances';
import uniqueString from 'unique-string';
import RoomForm from '../components/RoomForm';

const Register: React.FC = () => {
  const [roomItems, setRoomItems] = useState<Room[]>(JSON.parse(localStorage.getItem('roomItems') || '[]'));
  const pk = uniqueString();
  const [formData, setFormData] = useForm({
    address: '',
    detailAddress: '',
    realEstate: '',
    realEstatePriceType: '',
    depositAmount: 0,
    rentAmount: 0,
    maintenanceFee: 0,
    maintenanceFeeItems: [],
    floor: '1',
    sunlightDirection: '',
    leasableArea: 0,
    pet: true,
    canceled: false,
    thumbnail: '',
  });
  const [hasMaintenanceFee, setHasMaintenanceFee] = useState<boolean>(true);
  const [showKeepModal, setShowKeepModal] = useState<boolean>(!!localStorage.getItem('tempRoomItem'));
  const [showCompleteModal, setShowCompleteModal] = useState<boolean>(false);

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [target.name]: target.name === 'pet' ? JSON.parse(target.value) : target.value,
    });
  };

  const toggleMaintenanceFee = () => {
    setHasMaintenanceFee(prevHasMaintenanceFee => !prevHasMaintenanceFee);
  };

  const onSubmit = () => {
    setRoomItems(prevRoomItems => prevRoomItems.concat({
      ...formData,
      pk,
    }));

    setShowCompleteModal(true);

    localStorage.removeItem('tempRoomItem');
  };

  const addMaintenanceFeeItems = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.checked) {
      setFormData(prevFormData => ({
        ...prevFormData,
        maintenanceFeeItems: prevFormData.maintenanceFeeItems.concat(target.value)
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        maintenanceFeeItems: prevFormData.maintenanceFeeItems.filter(item => item !== target.value)
      }));
    }
  };

  const setLeasableArea = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      leasableArea: target.name === 'pyeong' ? Number(target.value) * 3.30579 : Number(target.value),
    }));
  };

  const keepRegister = () => {
    const storageFormData = localStorage.getItem('tempRoomItem');
    setShowKeepModal(false);

    if (storageFormData) {
      setFormData(JSON.parse(storageFormData));
    }
  };

  const changeMaintenanceFee = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      maintenanceFee: value === 'SELLING' ? 0 : prevFormData.maintenanceFee,
      rentAmount: value !== 'MONTHLY' ? 0 : prevFormData.rentAmount,
      [name]: value,
    }));
  }

  useEffect(() => {
    localStorage.setItem('roomItems', JSON.stringify(roomItems));
  }, [roomItems]);

  useEffect(() => {
    if (!hasMaintenanceFee) {
      setFormData(prevFormData => ({
        ...prevFormData,
        maintenanceFee: 0,
      }));
    }
  }, [hasMaintenanceFee, setFormData]);

  return (
    <>
      <h2 className="font-weight-bold text-center">방 등록하기</h2>

      <RoomForm
        onChange={onChange}
        onSubmit={onSubmit}
        formData={formData}
        changeMaintenanceFee={changeMaintenanceFee}
        toggleMaintenanceFee={toggleMaintenanceFee}
        hasMaintenanceFee={hasMaintenanceFee}
        addMaintenanceFeeItems={addMaintenanceFeeItems}
        setLeasableArea={setLeasableArea}
        buttonText="등록하기"
      />

      <Modal show={showKeepModal} onHide={() => setShowKeepModal(false)} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>방 정보가 있음</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>입력된 방 정보가 있습니다. 이어서 등록하실래요 ???</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowKeepModal(false)}>새로 등록</Button>
          <Button variant="primary" onClick={keepRegister}>이어서 등록</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCompleteModal} onHide={() => setShowCompleteModal(false)} backdrop="static" centered>
        <Modal.Body>
          <p>방이 등록되었습니다.</p>
        </Modal.Body>

        <Modal.Footer>
          <Link to="/rooms">
            <Button variant="secondary">목록으로 가기</Button>
          </Link>
          <Link to={`/room/${pk}`}>
            <Button variant="primary">확인</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Register;