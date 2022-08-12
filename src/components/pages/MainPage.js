import { useState } from "react";
import {Helmet} from "react-helmet";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';
import CustomForm from "../form/Form";

const MainPage=()=>{
    const [selectedChar,setChar]=useState(null)

    const onCharSelected=(id)=>{
        setChar(id) 
    }

    return (
        <>
        <RandomChar/>
            <div className="char__content">
                <CharList onCharSelected={onCharSelected}/>
               <div>
               <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>   
                </ErrorBoundary>
                <ErrorBoundary>
                    <CustomForm/>
                </ErrorBoundary>
               </div>
               
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}
export default MainPage;