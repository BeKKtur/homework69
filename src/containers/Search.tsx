import {useCallback, useEffect, useState} from "react";
import {RootState} from "../app/store";
import {filmName} from "../store/FilmsSlice";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {Film} from "../types";
import axiosApi from "../axiosApi";

const Search = () => {
    const value = useAppSelector((state:RootState) => state.film.value);
    const films = useAppSelector(state => state.film.films);
    const dispatch = useAppDispatch();
    const [film, setFilm] = useState<Film[]>([]);
    console.log(films);
    const searchItem = (e:React.ChangeEvent <HTMLInputElement>) => {
        const search = e.target.value;
        dispatch(filmName(search));
    };

    const onSubmit = (e:React.FormEvent) => {
        e.preventDefault();
    };

    const fetchFilm = useCallback( async () => {
        const {data: films} = await axiosApi.get(value);
        if (films){
            setFilm(Object.keys(films).map(id => ({
                ...films[id],
                id
            })));
        } else {
            setFilm([]);
        }

    },[value]);

    useEffect(() => {
        if (value !== ''){
            void fetchFilm();
        }
    }, [fetchFilm]);


    return (
        <>
            <div className='container-fluid text-lg-center'>
                <form className='d-flex align-items-center flex-wrap mb-3' onSubmit={onSubmit}>
                    <label className='me-2'>Search from TV show</label>
                    <input
                        type="text"
                        name='name'
                        id='name'
                        className='form-control'
                        value={value}
                        onChange={searchItem}
                    />
                </form>
            </div>
            {film.map(film => (
                <div key={film.id} className='d-flex align-items-center gap-2 flex-wrap text-lg-center'>
                    <img src={film.show.image?.medium} alt="photo"/>
                    <div className='text-lg-start w-50'>
                        <p>{film.show.name}</p>
                        <p>{film.show.summary}</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Search;