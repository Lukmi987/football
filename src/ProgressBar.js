import React, {useEffect} from "react";
import useStorage from "./hooks/useStorage";


const ProgressBar = ({file, setFile, setUrl, collection}) => {
    const {url, progress, error} = useStorage(file,collection);
    useEffect(() =>{
        //url we get only when file is fully uploaded
        if(url){
            setFile(null);
            setUrl(url);
        }

    }, [url,setFile, setUrl])

    return (
        <div className="progress-bar" style={{width: progress + '%' }} />
    )
}

export default  ProgressBar;