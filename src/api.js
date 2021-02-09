export const fetchPost = async (url) =>{
    try{
        const res = await fetch(url);
        if(res.ok){
            const data = await res.json();
            return data;
        }
        throw new Error(res.statusText);
    }catch(err){
        console.log(err.message);
    }
};