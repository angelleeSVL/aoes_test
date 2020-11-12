

const initialState = {
  username:null,
  status:null,
  token:null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      //console.log('login success:action.loginInfo',action.loginInfo)
      return {
          username:action.loginInfo.username,
          status:action.loginInfo.status,
          token:action.loginInfo.token,
          userid:action.loginInfo.userid,
          email:action.loginInfo.email,
      };
    case 'LOGIN_FAIL':
      //console.log('login fail:action.loginInfo',action.loginInfo)
      return {
          username:action.loginInfo.username,
          status:action.loginInfo.status,
          token:action.loginInfo.token,
          userid:action.loginInfo.userid
      };

    case 'LOGOUT':
        return {
            ...state,
            username:null,
            token:null,
            status:'LoggedOut',
        };

    default:
      return state;
  }
};


