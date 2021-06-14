import React, { useState, useEffect } from 'react';
import { InputGroup, Form, ButtonGroup, Button, Col } from 'react-bootstrap';

type FormData = {
  address: string,
  detailAddress: string,
  realEstate: string,
  realEstatePriceType: string,
  depositAmount: number,
  rentAmount: number,
  maintenanceFee: number,
  maintenanceFeeItems: string[],
  floor: string,
  sunlightDirection: string,
  leasableArea: number,
  pet: boolean,
};

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [hasMaintenanceFee, setHasMaintenanceFee] = useState<boolean>(true);

  const changeFormData = ({ target }: any) => {
    
    setFormData({
      ...formData,
      [target.name]: target.value
    })
  };

  const toggleMaintenanceFee = () => {
    setHasMaintenanceFee(!hasMaintenanceFee);
  };

  useEffect(() => {
    if (!hasMaintenanceFee) {
      setFormData({
        ...formData,
        maintenanceFee: 0,
      });
    }
  }, [hasMaintenanceFee])

  return (
    <Form.Group onChange={changeFormData}>
      <h4>주소</h4>
      <InputGroup size="lg">
        <Form.Control size="lg" name="address" type="text" placeholder="건물주소 또는 건물명을 검색하세요." />
      </InputGroup>
      <Form.Control size="lg" name="detailAddress" type="text" placeholder="상세 주소(동/호수를 입력해주세요.)" />
  
      <h4>종류</h4>
      <Form.Group>
        <Form.Control as="select" size="lg" name="realEstate">
          <option>매물종류를 선택해주세요.</option>
          <option value="ONE_ROOM">원룸</option>
          <option value="TWO_ROOM">투룸</option>
          <option value="APARTMENT">아파트</option>
          <option value="EFFICIENCY_APARTMENT">오피스텔</option>
        </Form.Control>
      </Form.Group>
  
      <h4>가격</h4>
      <div>
        <Form.Check
          inline
          name="realEstatePriceType"
          type="radio"
          id="MONTHLY"
          value="MONTHLY"
          label="월세"
        />
        <Form.Check
          inline
          name="realEstatePriceType"
          type="radio"
          id="JEONSE"
          value="JEONSE"
          label="전세"
        />
        <Form.Check
          inline
          name="realEstatePriceType"
          type="radio"
          id="SELLING"
          value="SELLING"
          label="매매"
        />
        
        <Form.Row>
          <Col>
            <Form.Control size="lg" name="depositAmount" type="number" placeholder="보증금" />
          </Col>
          <Col>
            <Form.Control size="lg" name="rentAmount" type="number" placeholder="임대료" />
          </Col>
        </Form.Row>
      </div>
  
      <h4>관리비</h4>
      <Form.Row>
        <Col>
          <Form.Control size="lg" name="maintenanceFee" placeholder="관리비" type="number" disabled={!hasMaintenanceFee} value={formData.maintenanceFee} onChange={changeFormData} />
        </Col>
        <Col>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="관리비 없음" onClick={toggleMaintenanceFee} />
          </Form.Group>
        </Col>
      </Form.Row>
  
      <h4>관리비 항목<span>(중복선택)</span></h4>
      <Form.Check
        inline
        name="maintenanceFeeItems"
        type="checkbox"
        id="ELECTRIC"
        value="ELECTRIC"
        label="전기"
      />
      <Form.Check
        inline
        name="maintenanceFeeItems"
        type="checkbox"
        id="GAS"
        value="GAS"
        label="가스"
      />
      <Form.Check
        inline
        name="maintenanceFeeItems"
        type="checkbox"
        id="WATERWORKS"
        value="WATERWORKS"
        label="수도"
      />
      <Form.Check
        inline
        name="maintenanceFeeItems"
        type="checkbox"
        id="INTERNET"
        value="INTERNET"
        label="인터넷"
      />
      <Form.Check
        inline
        name="maintenanceFeeItems"
        type="checkbox"
        id="TV"
        value="TV"
        label="TV"
      />
  
      {/* 층수 */}
      <h4>층수</h4>
      <div>
        <Form.Check
          inline
          name="floor"
          type="radio"
          id="floors"
          value="floors"
          label="층수"
        />
        <Form.Check
          inline
          name="floor"
          type="radio"
          id="ROOFTOP"
          value="ROOFTOP"
          label="옥탑"
        />
        <Form.Check
          inline
          name="floor"
          type="radio"
          id="SEMI_BASEMENT"
          value="SEMI_BASEMENT"
          label="반지하"
        />
      </div>
  
      {/* 방향 */}
      <h4>방향</h4>
      <div>
        <Form.Check
          inline
          name="sunlightDirection"
          type="radio"
          id="EAST"
          value="EAST"
          label="동"
        />
        <Form.Check
          inline
          name="sunlightDirection"
          type="radio"
          id="WEST"
          value="WEST"
          label="서"
        />
        <Form.Check
          inline
          name="sunlightDirection"
          type="radio"
          id="SOUTH"
          value="SOUTH"
          label="남"
        />
        <Form.Check
          inline
          name="sunlightDirection"
          type="radio"
          id="NORTH"
          value="NORTH"
          label="북"
        />
        <Form.Check
          inline
          name="sunlightDirection"
          type="radio"
          id="SOUTH_EAST"
          value="SOUTH_EAST"
          label="남동"
        />
        <Form.Check
          inline
          name="sunlightDirection"
          type="radio"
          id="SOUTH_WEST"
          value="SOUTH_WEST"
          label="남서"
        />
        <Form.Check
          inline
          name="sunlightDirection"
          type="radio"
          id="NORTH_WEST"
          value="NORTH_WEST"
          label="북서"
        />
        <Form.Check
          inline
          name="sunlightDirection"
          type="radio"
          id="NORTH_EAST"
          value="NORTH_EAST"
          label="북동"
        />
      </div>
  
      {/* 전용면적 */}
      <h4>전용면적</h4>
      <div>
        <Form.Control size="lg" type="number" placeholder="전용 면적을 입력해주세요. (평)" />
        <Form.Control size="lg" name="leasableArea" type="number" placeholder="전용 면적을 입력해주세요. (m2)" />
      </div>
  
      {/* 반려동물 */}
      <h4>반려동물</h4>
      <div>
        <Form.Check
          inline
          name="pet"
          type="radio"
          value="true"
          label="가능"
        />
        <Form.Check
          inline
          name="pet"
          type="radio"
          value="false"
          label="불가능"
        />
      </div>

      <Button>등록하기</Button>
    </Form.Group>
  );
}

const initialState = {
  address: '',
  detailAddress: '',
  realEstate: '',
  realEstatePriceType: '',
  depositAmount: 0,
  rentAmount: 0,
  maintenanceFee: 0,
  maintenanceFeeItems: [],
  floor: '',
  sunlightDirection: '',
  leasableArea: 0,
  pet: true,
};

export default Register;