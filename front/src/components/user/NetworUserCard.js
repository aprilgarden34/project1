import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

function NetworkUserCard({ user, isNetwork }) {
  const navigate = useNavigate();

  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <img className="mb-4" src={require("./image.jpg")} alt="물음표" />
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>

        {isNetwork && (
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            포트폴리오
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default NetworkUserCard;
