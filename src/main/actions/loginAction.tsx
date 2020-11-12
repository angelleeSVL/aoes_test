
export const loginAction =(loginInfo)=>{
    return(dispatch,getState)=>{
       
        //console.log(loginInfo);
        if(loginInfo.status==='LoginSuccess'){
            localStorage.setItem('LoggedIn','true')
            localStorage.setItem('token',loginInfo.token)
            
            dispatch({
                type:'LOGIN_SUCCESS',
                loginInfo:loginInfo
            })
        }else{
            dispatch({
                type:'LOGIN_FAIL',
                loginInfo:loginInfo
            })
        }
    }
}
export const logoutAction=()=>{
    return(dispatch,getState)=>{
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('token');
        localStorage.removeItem('userStatus');
        localStorage.setItem('LoggedIn','false')
        // console.log('localStorage',localStorage)
        window.location.reload();
        dispatch({
            type:'LOGOUT',
            logoutStatus:'LoggedOut'
        })
    }
}