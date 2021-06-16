import React, { useState, useEffect, ChangeEvent } from 'react';
import useForm from '../useForm';
import { Form, Button, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FormData, Room } from '../types/instances';
import uniqueString from 'unique-string';

const Register: React.FC = () => {
  const [roomItems, setRoomItems] = useState<Room[]>(JSON.parse(localStorage.getItem('roomItems') || '[]'));
  const pk = uniqueString();
  const [formData, setFormData] = useForm(initialState);
  const [hasMaintenanceFee, setHasMaintenanceFee] = useState<boolean>(true);
  const [showKeepModal, setShowKeepModal] = useState<boolean>(!!localStorage.getItem('tempRoomItem'));
  const [showCompleteModal, setShowCompleteModal] = useState<boolean>(false);

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [target.name]: target.value
    });
  };

  const toggleMaintenanceFee = () => {
    setHasMaintenanceFee(!hasMaintenanceFee);
  };

  const onSubmit = () => {
    setRoomItems([
      ...roomItems,
      {
        ...formData,
        pk,
      }
    ]);

    setShowCompleteModal(true);

    localStorage.removeItem('tempRoomItem');
  };

  const addMaintenanceFeeItems = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.checked) {
      setFormData({
        ...formData,
        maintenanceFeeItems: formData.maintenanceFeeItems.concat(target.value)
      });
    } else {
      setFormData({
        ...formData,
        maintenanceFeeItems: formData.maintenanceFeeItems.filter(item => item !== target.value)
      });
    }
  };

  const setLeasableArea = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      leasableArea: target.name === 'pyeong' ? target.value * 3.30579 : target.value,
    });
  };

  const keepRegister = () => {
    const storageFormData = localStorage.getItem('tempRoomItem');
    setShowKeepModal(false);

    if (storageFormData) {
      setFormData(JSON.parse(storageFormData));
    }
  };

  const changeMaintenanceFee = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setFormData((prevFormData: FormData) => ({
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
      setFormData((prevFormData: FormData) => ({
        ...prevFormData,
        maintenanceFee: 0,
      }));
    }
  }, [hasMaintenanceFee, setFormData]);

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h4>주소</h4>
        <Form.Control size="lg" name="address" onChange={onChange} value={formData.address} type="text" placeholder="건물주소 또는 건물명을 검색하세요." />
        <Form.Control size="lg" name="detailAddress" onChange={onChange} value={formData.detailAddress} type="text" placeholder="상세 주소(동/호수를 입력해주세요.)" />

        <h4>종류</h4>
        <Form.Control as="select" size="lg" name="realEstate" onChange={onChange} value={formData.realEstate}>
          <option>매물종류를 선택해주세요.</option>
          <option value="ONE_ROOM">원룸</option>
          <option value="TWO_ROOM">투룸</option>
          <option value="APARTMENT">아파트</option>
          <option value="EFFICIENCY_APARTMENT">오피스텔</option>
        </Form.Control>

        <h4>가격</h4>
        <Form.Check
          inline
          name="realEstatePriceType"
          type="radio"
          id="MONTHLY"
          value="MONTHLY"
          label="월세"
          checked={formData.realEstatePriceType === 'MONTHLY'}
          onChange={changeMaintenanceFee}
        />
        <Form.Check
          inline
          name="realEstatePriceType"
          type="radio"
          id="JEONSE"
          value="JEONSE"
          label="전세"
          checked={formData.realEstatePriceType === 'JEONSE'}
          onChange={changeMaintenanceFee}
        />
        <Form.Check
          inline
          name="realEstatePriceType"
          type="radio"
          id="SELLING"
          value="SELLING"
          label="매매"
          checked={formData.realEstatePriceType === 'SELLING'}
          onChange={changeMaintenanceFee}
        />

        <Form.Row>
          <Col>
            <Form.Control size="lg" name="depositAmount" type="number" value={formData.depositAmount ? formData.depositAmount : undefined} placeholder="보증금" onChange={onChange} />
          </Col>
          {
            formData.realEstatePriceType === 'MONTHLY' &&
            <Col>
              <Form.Control size="lg" name="rentAmount" type="number" value={formData.rentAmount ? formData.rentAmount : undefined} placeholder="임대료" onChange={onChange} />
            </Col>
          }

        </Form.Row>

        {
          formData.realEstatePriceType !== 'SELLING' &&
          (
            <>
              <h4>관리비</h4>
              <Form.Row onChange={onChange}>
                <Col>
                  <Form.Control size="lg" name="maintenanceFee" placeholder="관리비" type="number" disabled={!hasMaintenanceFee} value={formData.maintenanceFee ? formData.maintenanceFee : undefined} onChange={onChange} />
                </Col>
                <Col>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="관리비 없음" onClick={toggleMaintenanceFee} />
                  </Form.Group>
                </Col>
              </Form.Row>

              <h4>관리비 항목 (중복선택)</h4>
              <Form.Check
                inline
                name="maintenanceFeeItems"
                type="checkbox"
                id="ELECTRIC"
                value="ELECTRIC"
                label="전기"
                checked={formData.maintenanceFeeItems.includes('ELECTRIC')}
                onChange={addMaintenanceFeeItems}
              />
              <Form.Check
                inline
                name="maintenanceFeeItems"
                type="checkbox"
                id="GAS"
                value="GAS"
                label="가스"
                checked={formData.maintenanceFeeItems.includes('GAS')}
                onChange={addMaintenanceFeeItems}
              />
              <Form.Check
                inline
                name="maintenanceFeeItems"
                type="checkbox"
                id="WATERWORKS"
                value="WATERWORKS"
                label="수도"
                checked={formData.maintenanceFeeItems.includes('WATERWORKS')}
                onChange={addMaintenanceFeeItems}
              />
              <Form.Check
                inline
                name="maintenanceFeeItems"
                type="checkbox"
                id="INTERNET"
                value="INTERNET"
                label="인터넷"
                checked={formData.maintenanceFeeItems.includes('INTERNET')}
                onChange={addMaintenanceFeeItems}
              />
              <Form.Check
                inline
                name="maintenanceFeeItems"
                type="checkbox"
                id="TV"
                value="TV"
                label="TV"
                checked={formData.maintenanceFeeItems.includes('TV')}
                onChange={addMaintenanceFeeItems}
              />
            </>
          )
        }

        {/* 층수 */}
        <h4>층수</h4>
        <Form.Group>
          <Form.Check
            inline
            name="floor"
            type="radio"
            id="floors"
            value="1"
            label="층수"
            checked={!isNaN(parseInt(formData.floor))}
            onChange={onChange}
          />
          <Form.Check
            inline
            name="floor"
            type="radio"
            id="ROOFTOP"
            value="ROOFTOP"
            label="옥탑"
            checked={formData.floor === 'ROOFTOP'}
            onChange={onChange}
          />
          <Form.Check
            inline
            name="floor"
            type="radio"
            id="SEMI_BASEMENT"
            value="SEMI_BASEMENT"
            label="반지하"
            checked={formData.floor === 'SEMI_BASEMENT'}
            onChange={onChange}
          />
          {
            !['ROOFTOP', 'SEMI_BASEMENT'].includes(formData.floor) &&
            <Form.Control as="select" size="lg" name="floor" onChange={onChange} value={formData.floor}>
              {[...Array(80).keys()].map(v => v + 1).map(floor => <option key={floor} value={`${floor}`}>{floor}층</option>)}
            </Form.Control>
          }
        </Form.Group>

        {/* 방향 */}
        <h4>방향</h4>
        <Form.Check
          inline
          name="sunlightDirection"
          type="radio"
          id="EAST"
          value="EAST"
          label="동"
          checked={formData.sunlightDirection === 'EAST'}
          onChange={onChange}
        />
        <Form.Check
          inline
          name="sunlightDirection"
          type="radio"
          id="WEST"
          value="WEST"
          label="서"
          checked={formData.sunlightDirection === 'WEST'}
          onChange={onChange}
        />
        <Form.Check
          inline
          name="sunlightDirection"
          type="radio"
          id="SOUTH"
          value="SOUTH"
          label="남"
          checked={formData.sunlightDirection === 'SOUTH'}
          onChange={onChange}
        />
        <Form.Check
          inline
          name="sunlightDirection"
          type="radio"
          id="NORTH"
          value="NORTH"
          label="북"
          checked={formData.sunlightDirection === 'NORTH'}
          onChange={onChange}
        />
        <Form.Check
          inline
          name="sunlightDirection"
          type="radio"
          id="SOUTH_EAST"
          value="SOUTH_EAST"
          label="남동"
          checked={formData.sunlightDirection === 'SOUTH_EAST'}
          onChange={onChange}
        />
        <Form.Check
          inline
          name="sunlightDirection"
          type="radio"
          id="SOUTH_WEST"
          value="SOUTH_WEST"
          label="남서"
          checked={formData.sunlightDirection === 'SOUTH_WEST'}
          onChange={onChange}
        />
        <Form.Check
          inline
          name="sunlightDirection"
          type="radio"
          id="NORTH_WEST"
          value="NORTH_WEST"
          label="북서"
          checked={formData.sunlightDirection === 'NORTH_WEST'}
          onChange={onChange}
        />
        <Form.Check
          inline
          name="sunlightDirection"
          type="radio"
          id="NORTH_EAST"
          value="NORTH_EAST"
          label="북동"
          checked={formData.sunlightDirection === 'NORTH_EAST'}
          onChange={onChange}
        />

        {/* 전용면적 */}
        <h4>전용면적</h4>
        <Form.Control size="lg" name="pyeong" onChange={setLeasableArea} value={formData.leasableArea ? Math.round(formData.leasableArea / 3.30579) : undefined} type="number" placeholder="전용 면적을 입력해주세요. (평)" min={0} />
        <Form.Control size="lg" name="leasableArea" onChange={setLeasableArea} value={formData.leasableArea ? Number(formData.leasableArea).toFixed(3) : undefined} type="number" placeholder="전용 면적을 입력해주세요. (m2)" min={0} />

        {/* 반려동물 */}
        <h4>반려동물</h4>
        <Form.Check
          inline
          name="pet"
          type="radio"
          value="true"
          label="가능"
          checked={formData.pet ? true : false}
          onChange={onChange}
        />
        <Form.Check
          inline
          name="pet"
          type="radio"
          value="false"
          label="불가능"
          checked={formData.pet ? true : false}
          onChange={onChange}
        />

        <Button onClick={onSubmit}>등록하기</Button>
      </Form>

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

const initialState: FormData = {
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
};

export default Register;