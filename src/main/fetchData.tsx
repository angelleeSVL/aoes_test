import { store } from "../index";
import {server} from '../common/api/query'

export const fetchGetPostData=(
    route:string, 
    dispatchType:string,
    token:string,
    userid:string
    )=> {
    const url = server + route;
    var object = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        user_id: userid
      })
    };
    fetch(url, object)
      .then(response => response.text())
      .then(responseData => {
        var myObj = JSON.parse(responseData);
        if (myObj.length !== undefined) {
          store.dispatch({
            type: dispatchType,
            data: myObj
          });
        } else {
          console.log(responseData);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

export const fetchGetData=(route, dispatchType,token)=> {
    
    const url = server + route;
    var object = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    };
    fetch(url, object)
      .then(response => response.text())
      .then(responseData => {
        var myObj = JSON.parse(responseData);
        if (myObj.length !== undefined) {
          store.dispatch({
            type: dispatchType,
            data: myObj
          });
        } else {
          console.log(responseData);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }