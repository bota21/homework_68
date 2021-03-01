import { useEffect, useReducer } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./ShowInfo.css";
import axios from "../../axiosTV";
import Spinner from "../../components/UI/Spinner/Spinner";

const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_REQUEST_SUCCESS = "FETCH_REQUEST_SUCCESS";
const FETCH_REQUEST_ERROR = "FETCH_REQUEST_ERROR";

const initialState = {
  movie: [],
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true };
    case FETCH_REQUEST_SUCCESS:
      return { ...state, movie: action.data, loading: false };
    case FETCH_REQUEST_ERROR:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

const fetchRequest = () => {
  return { type: FETCH_REQUEST };
};
const fetchRequestSuccess = (data) => {
  return { type: FETCH_REQUEST_SUCCESS, data };
};
const fetchRequestError = (error) => {
  return { type: FETCH_REQUEST_ERROR, error };
};

const ShowInfo = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movie, loading } = state;
  let id = props.match.params.id;

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchRequest());
      try {
        let response = await axios.get("?q=" + id);
        dispatch(fetchRequestSuccess(response.data[0].show));
      } catch (e) {
        dispatch(fetchRequestError(e));
      }
    };
    fetchData();
  }, [id]);

  let renderText = () => {
    if (movie.summary) {
      let text = movie.summary.replace(/<[^>]+>/g, "");
      return text;
    }
  };

  return (
    <Card>
      {loading ? <Spinner /> : null}
      <CardActionArea>
        {(movie.image !== undefined && movie.image !== null) ? (
          <img className='card_img' src={movie.image.medium} alt={movie.name} />
        ) : null}
        <CardContent>
          <Typography>{movie.name}</Typography>
          {movie.network !== undefined ? (
            <Typography variant='body2' color='textSecondary' component='p'>
              country: {movie.network.country.name}
            </Typography>
          ) : null}
          <Typography variant='body2' color='textSecondary' component='p'>
            premiered: {movie.premiered}
          </Typography>
          {movie.rating !== undefined ? (
            <Typography variant='body2' color='textSecondary' component='p'>
              rating: {movie.rating.average}
            </Typography>
          ) : null}
          <Typography variant='body2' color='textSecondary' component='p'>
            status: {movie.status}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {renderText()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ShowInfo;
