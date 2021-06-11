import React from 'react';
import { InputGroup, Form, ButtonGroup, Button, Col } from 'react-bootstrap';

const Register: React.FC = () => (
  <>
    <h4>주소</h4>
    <InputGroup size="lg">
      <Form.Control size="lg" type="text" placeholder="건물주소 또는 건물명을 검색하세요." />
    </InputGroup>
    <Form.Control size="lg" type="text" placeholder="상세 주소(동/호수를 입력해주세요.)" />

    <h4>종류</h4>
    <Form.Group>
      <Form.Control as="select" size="lg">
        <option>매물종류를 선택해주세요.</option>
        <option value="ONE_ROOM">원룸</option>
        <option value="TWO_ROOM">투룸</option>
        <option value="APARTMENT">아파트</option>
        <option value="EFFICIENCY_APARTMENT">오피스텔</option>
      </Form.Control>
    </Form.Group>

    <h4>가격</h4>
    <div>
      <Form>
        <Form.Check
          inline
          name="price"
          type="radio"
          id="MONTHLY"
          label="월세"
        />
        <Form.Check
          inline
          name="price"
          type="radio"
          id="JEONSE"
          label="전세"
        />
        <Form.Check
          inline
          name="price"
          type="radio"
          id="SELLING"
          label="매매"
        />
      </Form>
      <ButtonGroup size="lg" className="mb-2">
        <Button>월세</Button>
        <Button>전세</Button>
        <Button>매매</Button>
      </ButtonGroup>

      <Form.Row>
        <Col>
          <Form.Control size="lg" type="number" placeholder="보증금" />
        </Col>
        <Col>
          <Form.Control size="lg" type="number" placeholder="임대료" />
        </Col>
      </Form.Row>
    </div>

    <h4>관리비</h4>
    <Form.Row>
      <Col>
        <Form.Control size="lg" placeholder="관리비" type="number" />
      </Col>
      <Col>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="관리비 없음" />
        </Form.Group>
      </Col>
    </Form.Row>

    <h4>관리비 항목<span>(중복선택)</span></h4>
    <Form.Check
      inline
      name="administration"
      type="checkbox"
      id="ELECTRIC"
      label="전기"
    />
    <Form.Check
      inline
      name="administration"
      type="checkbox"
      id="ELECTRIC"
      label="전기"
    />
    <Form.Check
      inline
      name="administration"
      type="checkbox"
      id="GAS"
      label="가스"
    />
    <Form.Check
      inline
      name="administration"
      type="checkbox"
      id="WATERWORKS"
      label="수도"
    />
    <Form.Check
      inline
      name="administration"
      type="checkbox"
      id="INTERNET"
      label="인터넷"
    />
    <Form.Check
      inline
      name="administration"
      type="checkbox"
      id="TV"
      label="TV"
    />

    <ButtonGroup size="lg">
      <Button>전기</Button>
      <Button>가스</Button>
      <Button>수도</Button>
    </ButtonGroup>
    <ButtonGroup size="lg" className="mb-2">
      <Button>인터넷</Button>
      <Button>TV</Button>
      <Button>청소</Button>
    </ButtonGroup>

    {/* 층수 */}
    <h4>층수</h4>
    <div>
      <Form.Check
        inline
        name="floors"
        type="radio"
        id="floors"
        label="층수"
      />
      <Form.Check
        inline
        name="floors"
        type="radio"
        id="ROOFTOP"
        label="옥탑"
      />
      <Form.Check
        inline
        name="floors"
        type="radio"
        id="SEMI_BASEMENT"
        label="반지하"
      />
    </div>

    {/* 방향 */}
    <h4>방향</h4>
    <div>
      <Form.Check
        inline
        name="direction"
        type="radio"
        id="EAST"
        label="동"
      />
      <Form.Check
        inline
        name="direction"
        type="radio"
        id="WEST"
        label="서"
      />
      <Form.Check
        inline
        name="direction"
        type="radio"
        id="SOUTH"
        label="남"
      />
      <Form.Check
        inline
        name="direction"
        type="radio"
        id="NORTH"
        label="북"
      />
      <Form.Check
        inline
        name="direction"
        type="radio"
        id="SOUTH_EAST"
        label="남동"
      />
      <Form.Check
        inline
        name="direction"
        type="radio"
        id="SOUTH_WEST"
        label="남서"
      />
      <Form.Check
        inline
        name="direction"
        type="radio"
        id="NORTH_WEST"
        label="북서"
      />
      <Form.Check
        inline
        name="direction"
        type="radio"
        id="NORTH_EAST"
        label="북동"
      />
    </div>

    {/* 전용면적 */}
    <h4>전용면적</h4>
    <div>
      <Form.Control size="lg" type="number" placeholder="전용 면적을 입력해주세요. (평)" />
      <Form.Control size="lg" type="number" placeholder="전용 면적을 입력해주세요. (m2)" />
    </div>

    {/* 반려동물 */}
    <h4>반려동물</h4>
    <div>
      <Form.Check
        inline
        name="pet"
        type="radio"
        id=""
        label="가능"
      />
      <Form.Check
        inline
        name="pet"
        type="radio"
        id=""
        label="불가능"
      />
    </div>
  </>
);

export default Register;