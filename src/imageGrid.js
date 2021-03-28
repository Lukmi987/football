import React from 'react';
import useFirestore from './hooks/useFirestore';

const ImageGrid = () => {
    const {docs} = useFirestore('gallery-images');
    console.log('moje docs',docs);
    return (
    <div className="img-grid">

            {docs && docs.map( doc => (
                <div className="img-wrap">
            < img src={doc.url} alt="uploaded pic" />
                </div>
            ))
            }

    </div>
    )
}
export default ImageGrid;