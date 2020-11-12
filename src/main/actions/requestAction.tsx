export const requestAction =(requestInfo)=>{
    return(dispatch,getState)=>{
        console.log('requestInfo',requestInfo)
        dispatch({
            type:'CREATE_REQUEST',
            requestInfo:requestInfo
        })
    }
    
}


