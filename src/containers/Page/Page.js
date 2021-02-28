import { useEffect, useReducer, useState } from "react";
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

const initialState = {
  movies: [],
  movieSearch: [],
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
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
  const [nameMovie, setNameMovie] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movies, loading } = state;

  const searchShow = (e) => {
    let value = e.target.value;
    setNameMovie({ ...nameMovie, value });
  };

  useEffect(() => {
    let newData = [];
    const FetchData = async () => {
      if (nameMovie.value !== undefined) {
        dispatch(fetchRequest());
        try {
          let response = await axios.get("?q=" + nameMovie.value);
          response.data.map((item) => {
            newData.push(item.show.name);
            dispatch(fetchRequestSuccess(newData));
          });
        } catch (e) {
          dispatch(fetchRequestError(e));
        }
      }
    };
    FetchData();
  }, [nameMovie]);

  console.log(movies);
  const showMovie = async (e) => {
    e.preventDefault();
    dispatch(fetchRequest());
    try {
      console.log(movies[0]);
      let response = await axios.get("?q=" + movies[0]);
      console.log(response.data[0].show);
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
            variant='outlined'
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
