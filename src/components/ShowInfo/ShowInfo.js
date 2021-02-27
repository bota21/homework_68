import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./ShowInfo.css";

const ShowInfo = (props) => {
  return (
    <Card>
      <CardActionArea>
        <img className='card_img' src={props.img} alt={props.alt} />
        <CardContent>
          <Typography>{props.title}</Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ShowInfo;
