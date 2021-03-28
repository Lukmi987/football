import React, {useEffect} from "react";
import useStorage from "./hooks/useStorage";


const ProgressBar = ({file, setFile, setUrl, collection}) => {
    const {url, progress} = useStorage(file,collection);
    setUrl(url);
    useEffect(() =>{
        if(url){
            setFile(null);
        }

    }, [url,setFile])
    console.log(progress, url);
    return (
        <div className="progress-bar" style={{width: progress + '%' }}>progress</div>
    )
}

export default  ProgressBar;