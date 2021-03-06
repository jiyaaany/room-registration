import React, { useState, useEffect, ChangeEvent } from 'react';
import useForm from '../hooks/useForm';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Room } from '../types/instances';
import uniqueString from 'unique-string';
import RoomForm from '../components/RoomForm';

const Register: React.FC = () => {
  const [roomItems, setRoomItems] = useState<Room[]>(JSON.parse(localStorage.getItem('roomItems') || '[]'));
  const [pk] = useState<string>(uniqueString());
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
      <h2 className="font-weight-bold text-center">??? ????????????</h2>

      <RoomForm
        onChange={onChange}
        onSubmit={onSubmit}
        formData={formData}
        changeMaintenanceFee={changeMaintenanceFee}
        toggleMaintenanceFee={toggleMaintenanceFee}
        hasMaintenanceFee={hasMaintenanceFee}
        addMaintenanceFeeItems={addMaintenanceFeeItems}
        setLeasableArea={setLeasableArea}
        buttonText="????????????"
      />

      <Modal show={showKeepModal} onHide={() => setShowKeepModal(false)} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>??? ????????? ??????</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>????????? ??? ????????? ????????????. ????????? ?????????????????? ???</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowKeepModal(false)}>?????? ??????</Button>
          <Button variant="primary" onClick={keepRegister}>????????? ??????</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCompleteModal} onHide={() => setShowCompleteModal(false)} backdrop="static" centered>
        <Modal.Body>
          <p>?????? ?????????????????????.</p>
        </Modal.Body>

        <Modal.Footer>
          <Link to="/rooms">
            <Button variant="secondary">???????????? ??????</Button>
          </Link>
          <Link to={`/room/${pk}`}>
            <Button variant="primary">??????</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Register;