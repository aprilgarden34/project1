
  import React, { useEffect, useState } from "react";
  import { Card, Button, Row, Col } from "react-bootstrap";
  import * as Api from "../../api";
  import Award from "./Award";
  import AwardAddForm from "./AwardAddForm";
  
  function Awards({ portfolioOwnerId, isEditable }) {
    //useState로 awards 상태 생성
    const [awards, setAwards] = useState([]);
    //useState로 isAdding 상태 생성함. 기본값은 false
    const [isAdding, setIsAdding] = useState(false);
  
    useEffect(() => {
      // "awardlist/유저id"로 GET 요청, response의 data로 awards를 세팅함.
      Api.get("awardlist", portfolioOwnerId)
      .then((res) => setAwards(res.data));
    }, [portfolioOwnerId]);
  
    return (
      <Card
        style={{
          marginTop: '30px'
        }}
      >
        <Card.Body>
          <Card.Title
            style={{
              backgroundColor: '#D9D7F1',
              fontSize: '30px',
              color: 'black'
            }}
          >수상이력</Card.Title>
          {awards.map((award) => (
            <Award
              portfolioOwnerId={portfolioOwnerId}
              key={award.id}
              award={award}
              setAwards={setAwards}
              isEditable={isEditable}
            />
          ))}
          {isEditable && (
            <Row className="mt-3 text-center mb-4">
              <Col sm={{ span: 20 }}>
                <Button onClick={() => setIsAdding(true)}>+</Button>
              </Col>
            </Row>
          )}
          {isAdding && (
            <AwardAddForm
              portfolioOwnerId={portfolioOwnerId}
              setAwards={setAwards}
              setIsAdding={setIsAdding}
            />
          )}
        </Card.Body>
      </Card>
    );
  }
  
  export default Awards;
  