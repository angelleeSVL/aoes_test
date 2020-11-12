export const engagementAction =(engagement)=>{
    return(dispatch,getState)=>{
        dispatch({
            type:'SUBMIT_ENGAGEMENT_MESSAGE',
            data:engagement
        })
    }
    
}
export const newEngagementAction =(engagement)=>{
    // console.log('engagement', engagement)
    return(dispatch,getState)=>{
        dispatch({
            type:'UPDATE_ENGAGEMENT_DATA',
            data:engagement
        })
    }
    
}
export const engagementStatusAction =(status)=>{
    return(dispatch,getState)=>{
        dispatch({
            type:'NEW_ENGAGEMENT_STATUS',
            data:status
        })
    }
    
}