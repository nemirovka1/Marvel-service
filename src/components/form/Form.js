import './form.scss';
import {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useMarvelService from '../../service/MarvelService';
import *as Yup from "yup"
import { Link } from 'react-router-dom';


const CustomForm=()=>{
    const [name ,setName]=useState(null)
    const {loading, error, getCharacterName,clearError} = useMarvelService();
    
    const loadedName=(name)=>{
        setName(name);
    }

    const updateName=(names)=>{
        clearError();
        getCharacterName(names)
            .then(loadedName)
    }
    const errorMessage=error?<ErrorMessage />:null;
    const result=!name ? null:name.length>0 ?
                <div className="char__search-wrapper">
                    <div className="char__search-success">There is! Visit {name[0].name} page?</div>
                    <Link to={`/characters/${name[0].id}`} className="button button__secondary">
                        <div className="inner" >To page</div>
                    </Link>
                </div> : 
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>

    return (
        <div className="char__search-form">
        <Formik 
            initialValues={{
                charName:'',
            }}
            validationSchema={Yup.object({
                charName:Yup.string()
                        .required('This field is required!')
            })}
            onSubmit={({charName})=>{
                updateName(charName)
            }}>
        <Form>
            <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>
                       
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={loading}>
                            <div className="inner">find</div>
                        </button>
                    </div> 
                    <ErrorMessage className="char__search-critical-error" name='charName' component='div'/>
            </Form>
        </Formik>
        {result}
        {errorMessage}
        </div>
    )
 }
   
export default CustomForm;