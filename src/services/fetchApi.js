const fetchApi = async function ({url, method, headers, body}) {
    let opt = {
        method: method,
        headers: headers
    }
    if(body){
        opt.body = JSON.stringify(body)
    }
    try {
        let res = await fetch(url, opt)
        res = await res.json()
        console.log(res);
        return res
    }
    catch (e){
        console.log(e);
    }

}
export default fetchApi