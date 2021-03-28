import {useEffect, useState} from "react";
import { projectFirestore} from "./config";

const useFirestore = (collection) => {
    const [docs, setDocs] = useState([]);
    //it will fire whenever dependency change
    useEffect(() => {
      const unsub =  projectFirestore.collection(collection)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id});
                });
                setDocs(documents);
            });
      //unsubscribe from the collection when we no longer use it
      return () => unsub();
    },[collection])
    return {docs};
}
export default useFirestore;