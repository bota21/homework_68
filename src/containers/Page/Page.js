import { useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AppBar from "@material-ui/core/AppBar";
import { Button } from "@material-ui/core";
import axios from "../../axiosTV";
import Spinner from "../../components/UI/Spinner/Spinner";
import "./Page.css";

const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_REQUEST_SUCCESS = "FETCH_REQUEST_SUCCESS";
const FETCH_REQUEST_ERROR = "FETCH_REQUEST_ERROR";
const SEND_REQUEST_SUCCESS = "SEND_REQUEST_SUCCESS";
const CURRENT_VALUE = "CURRENT_VALUE";

const initialState = {
  movies: [],
  nameMovie: "",
  movieSearch: [],
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case CURRENT_VALUE:
      return { ...state, nameMovie: action.value };
    case FETCH_REQUEST:
      return { ...state, loading: true };
    case FETCH_REQUEST_SUCCESS:
      return { ...state, movies: action.data, loading: false };
    case FETCH_REQUEST_ERROR:
      return { ...state, error: action.error, loading: false };
    case SEND_REQUEST_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
};
const inputValue = (value) => {
  return { type: CURRENT_VALUE, value };
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
const sendRequestSuccess = (data) => {
  return { type: SEND_REQUEST_SUCCESS, data };
};

const Page = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movies, loading, nameMovie } = state;

  const searchShow = (e) => {
    dispatch(inputValue(e.target.value));
  };

  useEffect(() => {
    let newData = [];
    const FetchData = async () => {
      if (nameMovie !== undefined) {
        dispatch(fetchRequest());
        try {
          let response = await axios.get("?q=" + nameMovie);
          response.data.map((item) => {
            newData.push(item.show.name);
            return dispatch(fetchRequestSuccess(newData));
          });
        } catch (e) {
          dispatch(fetchRequestError(e));
        }
      }
    };
    FetchData();
  }, [nameMovie]);

  const showMovie = async (e) => {
    e.preventDefault();
    dispatch(fetchRequest());
    try {
      let response = await axios.get("?q=" + movies[0]);
      dispatch(sendRequestSuccess(response.data[0].show));
      return history.push("/shows/" + movies[0]);
    } catch (e) {
      dispatch(fetchRequestError(e));
    }
  };

  const history = useHistory();
  return (
    <>
      {loading ? <Spinner /> : null}
      <AppBar>TV Shows</AppBar>
      <form onSubmit={(e) => showMovie(e)}>
        <div className='page_form'>
          <label htmlFor='tv-show'>Search for TV Show: </label>
          <Autocomplete
            freeSolo
            id='tv-show'
            disableClearable
            onInputChange={(e) => searchShow(e)}
            options={movies.map((option) => option)}
            renderInput={(params) => (
              <TextField
                {...params}
                label='TV Show'
                margin='normal'
                variant='outlined'
                InputProps={{ ...params.InputProps, type: "search" }}
              />
            )}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={(e) => showMovie(e)}>
            Show
          </Button>
        </div>
      </form>
    </>
  );
};

export default Page;
