import { useHttp } from "../hooks/http.hook";

const useMarvelService=()=>{
    const {loading,request,error,clearError}=useHttp()

    const _APIBASE = 'https://gateway.marvel.com:443/v1/public/';
    const _APIKEY = 'apikey=10eea6a8fe08f0658ffaad79e1d3c638';
    const _BASEOFFSET=210;

    const getAllCharacters = async(offset=_BASEOFFSET) => {
       const res=await request(`${_APIBASE}characters?limit=9&offset=${offset}&${_APIKEY}`);
       return res.data.results.map(_transformCharacter)
    }
    const getCharacter = async (id) => {
        const res= await request(`${_APIBASE}characters/${id}?&${_APIKEY}`);
        return _transformCharacter(res.data.results[0]);
    }
    const getAllComics=async(offset = 0)=>{
        const res= await request(`${_APIBASE}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_APIKEY}`);
        return res.data.results.map(_transformComics)
    }
    const getComic = async (id) => {
        const res= await request(`${_APIBASE}comics/${id}?&${_APIKEY}`);
        return _transformComics(res.data.results[0]);
    }
    const getCharacterName=async(name)=>{
        const res = await request(`${_APIBASE}characters?name=${name}&${_APIKEY}`);
        return res.data.results.map(_transformCharacter)
    }

 
    const _transformCharacter=(char)=>{
        return {
            id:char.id,
            name:char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail:char.thumbnail.path+'.'+char.thumbnail.extension ,
            homepage:char.urls[0].url,
            wiki:char.urls[1].url,
            comics:char.comics.items
        }
    }
    const  _transformComics=(comics)=>{
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || ' No description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }
    return {loading,error,getAllCharacters,getCharacter,getComic,clearError,getAllComics,getCharacterName}
}
export default useMarvelService;