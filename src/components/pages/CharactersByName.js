import {useParams,Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";

import useMarvelService from '../../service/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import AppBanner from '../appBanner/AppBanner';
import './singleComicPage.scss';

const CharactersByName=()=>{
    const {charId}=useParams();
    const [char,setName]=useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(()=>{
        updateName()
    },[charId])
    
    const updateName =()=>{
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }
    const onCharLoaded=(char)=>{
        setName(char);
    }
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}
const View=({char})=>{
    const {name, description, thumbnail}=char
    
    return (
    <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} characters`}/>
                <title>{name}</title>
            </Helmet>
        <img src={thumbnail} alt={name} className="single-comic__img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{name}</h2>
            <p className="single-comic__descr">{description}</p>
        </div>
        <Link to="/" className="single-comic__back">Back to characters</Link>
    </div>
    )
}

export default CharactersByName;