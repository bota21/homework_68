import { Card, CardText, CardBody, CardTitle } from "reactstrap";
import "./ShowInfo.css";

const ShowInfo = (props) => {
  return (
    <Card>
      <img className='card_img' src={props.img} alt={props.alt} />
      <CardBody>
        <CardTitle tag='h5'>{props.title}</CardTitle>
        <CardText>{props.content}</CardText>
      </CardBody>
    </Card>
  );
};

export default ShowInfo;
