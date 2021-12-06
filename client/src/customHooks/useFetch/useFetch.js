
import { useEffect, useState } from "react";

const useFetch = (url,req=null)=>{
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [err, setErr] = useState(null);
    
    useEffect(()=>{
      const abortConst = new AbortController();
      if(req!= null){
         req = {
            ...req,
            signal : abortConst.signal
         }
      }
      else{
         req = {
           signal : abortConst.signal
         }
      }
      fetch(url,req)
      .then((res)=> {
         if(!res.ok){
         throw Error("Could not fetch the movie list from the server");
         }
         return res.json();
      })
      .then((data)=>{
         setData(data);
         setIsPending(false);
         setErr(null);
      })
      .catch((err)=>{
         if(err.name === "AbortError"){
            console.log("Fetch aborted");
         }
         else{
            setIsPending(false);
            setErr(err.message);
         }
      })

      return ()=> abortConst.abort();
    },[url,req]);
   

    return {
        data,
        isPending,
        err
    }
}

export default useFetch;