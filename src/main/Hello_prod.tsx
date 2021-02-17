import * as React from "react";
import ReactDom from "react-dom";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { connect } from "react-redux";
import { getRoute, rawGet } from "../common/api/query";
import { AV, AsyncValue } from "../common/store/AsyncValue";
import { object, array } from "prop-types";
import "../style.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { ReactTableDefaults } from "react-table";
import "react-table/react-table.css";
import {DisplayEngageCl} from "./Display/DisplayEngage"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircle,faInfoCircle, faUser, faUserCircle} from '@fortawesome/free-solid-svg-icons'
library.add(faCircle,faInfoCircle,faUser, faUserCircle);

Object.assign(ReactTableDefaults, {
  defaultPageSize: 5,
  showPageSizeOptions:true,
  pageSizeOptions: [5, 10, 20, 25, 50, 100],
  minRows : 0
});

import { loginAction, logoutAction } from "./actions/loginAction";

import {fetchGetData,fetchGetPostData} from './fetchData';
import { store } from "../index";
import {server} from '../common/api/query'



export interface HelloProps {
  compiler: string;
  framework: string;
  serverMessage: AsyncValue<{ message: string }>;
  currentUser;
  loginAction;
  logoutAction;

  requestList;
  fullData;
  kpxFullData;
}
interface MyState {
  status;
  userid:string;
  role;
  username;
  password;
  token;
  email;
  submitted;
  pressedKey;
  tabIndex;
  selectedId1;
  selectedId2;
  selectedUser;
  activeButton: any;
}


class HelloCl extends React.Component<HelloProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      selectedId1: "1",
      selectedId2: "2",
      selectedUser: "",
      activeButton: "",
      pressedKey: "",
      username: "",
      password: "",
      status: "",
      token: null,
      submitted: false,
      userid: "",
      role: "",
      email:''
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onClick(id: string) {
    this.setState({ selectedId1: id });
  }
  onClick2(id: string) {
    this.setState({ selectedId2: id });
  }

  onClickToTab0() {
    this.setState({ tabIndex: 0 });
  }

  onClickUser(userid: string) {
    switch (userid){
      case "1":
        this.setState({
          selectedUser:"3",
          selectedId1: "1",
          selectedId2: "2"
        });
        break;
      case "3":
        this.setState({
          selectedUser: userid,
          selectedId1: "1",
          selectedId2: "2"
        });
        break;
      case "4":
        this.setState({
          selectedUser: userid,
          selectedId1: "4",
          selectedId2: "5"
        });
        break;
      case "5":
        this.setState({
          selectedUser: userid,
          selectedId1: "7",
          selectedId2: "8"
        });
        break;
      case "6":
        this.setState({
          selectedUser: "7",
          selectedId1: "16",
          selectedId2: "16"
        });  
        break;
      case "7":
          this.setState({
            selectedUser: userid,
            selectedId1: "16",
            selectedId2: "16"
          });
        break;
      case "8":
          this.setState({
            selectedUser: userid,
            selectedId1: "17",
            selectedId2: "17"
          });
        break;
      default:
        break;
    }

    this.setState({
        activeButton: !this.state.activeButton
      },
      () => {}
      //console.log('after setState actual',this.state.selectedUser)
    );
  }
  handleKeyPress(e) {
    if (this.props.currentUser.token !== null) {
      if (e.keyCode === 39) {
        if (this.state.tabIndex == 8) {
          this.setState({
            tabIndex: 0
          });
        } else
          this.setState({
            tabIndex: this.state.tabIndex + 1
          });
      }
      if (e.keyCode === 37) {
        if (this.state.tabIndex === 0) {
          this.setState({
            tabIndex: 8
          });
        } else
          this.setState({
            tabIndex: this.state.tabIndex - 1
          });
      }
    }
    return true;
  }
 
  handleChange = e => {
    const name = e.target.name;

    this.setState<never>({
      [e.target.id]: e.target.value
    });
  };
  handleLogin = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    let url = server+"login";
    var object = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    };

    fetch(url, object)
      .then(response => response.text())
      .then(responseData => {
        //responseData: returned status from main.py
        var myObj = JSON.parse(responseData);
        //console.log(myObj);
        this.setState({
          status: myObj.status,
          token: myObj.access_token,
          userid: myObj.userid,
          role: myObj.role,
          email:myObj.email
        });

        this.props.loginAction(this.state);
        //console.log(this.props.currentUser);
        this.onClickUser(String(this.props.currentUser.userid));
        const token=this.props.currentUser.token;
        const userid=this.state.userid
        {myObj.access_token.length>0&&
          // fetchGetPostData("funds", "FUNDS",token,userid);
          // fetchGetPostData("wanttobuy", "WANTTOBUY",token,userid);
          // fetchGetPostData("listRankInform", "LIST_SUM_STOCK_PER_OWNER",token,userid);
          // fetchGetPostData("listAuthRankSector", "LIST_RANK_SECTOR",token,userid);
          // fetchGetPostData("listAuthRankCountry", "LIST_RANK_COUNTRY",token,userid);
          fetchGetPostData("execuSheCA100","EXECUSHE_CA100",token,userid)
          fetchGetPostData("femaleEOAppointed","FEMALE_APPOINTED",token,userid)
          fetchGetPostData("femaleDroppedout","FEMALE_DROPPEDOUT",token,userid)
          fetchGetPostData("viewRequest", "VIEW_REQUESTLIST",token,userid);
          
          fetchGetPostData("engagement", "ENGAGEMENT",token,userid);
          fetchGetPostData("engagementMngerPermission", "ENGAGEMENT_MNGER_PERMISSION",token,userid);
          fetchGetPostData("engagementStatus", "ENGAGEMENT_STATUS",token,userid);
          fetchGetPostData("engagementDetail", "ENGAGEMENT_DETAIL",token,userid);
          fetchGetPostData("assetMngers", "ASSET_MNGERS",token,userid);
          /*
          fetchGetPostData("listPortfolio", "LIST_FULL_PORTFOLIO",token,userid);
          fetchGetPostData("list2Portfolios","LIST_2PORTFOLIOS",token,userid);
          fetchGetPostData("listOverlap", "LIST_OVERLAP",token,userid);
          fetchGetPostData("listPortfolioid", "LIST_PORTFOLIO_ID",token,userid);
          fetchGetPostData("listOwner", "LIST_OWNER",token,userid);
          fetchGetPostData("listRequestOverlap", "LIST_REQUEST_OVERLAP",token,userid);
          fetchGetPostData("listConnectMessage", "LIST_CONNECT_MESSAGE",token,userid);
          fetchGetPostData("leiRelationship", "LIST_LEI_RELATIONSHIP",token,userid);
          fetchGetPostData("leiLegalName", "LIST_LEI_LEGALNAME",token,userid);
        */
          fetchGetPostData("kpxPortfolioid","KPX_Portfolio_id",token,userid)
          fetchGetPostData("kpxlistPortfolios","KPX_LIST_PORTFOLIO",token,userid)
          fetchGetPostData("kpxLeiLegalName", "KPX_LEI_LEGALNAME",token,userid);
          fetchGetPostData("kpxData","KPX_DATA",token,userid)

          /*
          fetchGetPostData("kpxOverlap","KPX_OVERLAP",token,userid)
          fetchGetPostData("kpx2Portfolios","KPX_2Portfolio",token,userid)
          fetchGetPostData("kpxRankCountry","KPX_RANK_COUNTRY",token,userid)
          fetchGetPostData("kpxRankSectorLv1","KPX_RANK_Sector",token,userid)
          fetchGetPostData("kpxRankIndustryLv3","KPX_RANK_Industry",token,userid)
          fetchGetPostData("kpxRequest","KPX_REQUEST",token,userid)
          fetchGetPostData("kpxRankRating","KPX_RANK_RATING",token,userid)
          fetchGetPostData("kpxLeiRelationship", "KPX_LEI_RELATIONSHIP",token,userid);
          fetchGetPostData("kpxUltimateParent", "KPX_ULTIMATE_PARENT",token,userid);
          
          */
        //  fetchGetPostData("transparencyData", "TRANSPARENCY",token,userid);
          // fetchGetPostData("portfolioAndRequestsWithTransparency", "KPX_TRANSPARENCY_DATA",token,userid);
          fetchGetPostData("kpxlistRequestOverlap", "KPX_LIST_REQUEST_OVERLAP",token,userid);
          // fetchGetPostData("kpxTransparencyRatingData", "KPX_TRANSPARENCY_RATING_DATA",token,userid);
          // fetchGetPostData("SVLRealImpactGHG", "SVL_REAL_IMPACT_GHG",token,userid);
          fetchGetPostData("urthLEIRelationship", "URTH_LEI_RELATIONSHIP",token,userid);
          fetchGetPostData("urth_portfolio", "URTH_PORTFOLIO",token,userid);
         
          
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  
  onLogout() {
    this.setState({
      status: "LoggedOut",
      role: null,
      userid: null,
      username: "",
      password: "",
      submitted: false
    });
    this.props.logoutAction();
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser.status !== prevProps.currentUser.status) {
      this.setState({
        status: this.props.currentUser.status
      });
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    return (
      <div>
        <Tabs>
          <TabList>
            {this.props.currentUser.token === null ? 
              <Tab>User Login</Tab>:
                // <Tab>Welcome</Tab>
                <Tab>Engage</Tab>
              }
              
            {this.props.currentUser.token !== null && 
              <Tab onClick={() => this.props.logoutAction()}>Logout</Tab>
              }
          </TabList>

          <TabPanel>
              {/* Login */}
            <div>
              {this.state.status !== "LoginSuccess" && (
                <form className="signin-form" onSubmit={this.handleLogin}>
                  <h5>Sign In</h5>
                  <div className="input-field">
                    <input
                      type="text"
                      id="username"
                      onChange={this.handleChange}
                      placeholder="Username"
                    />
                    {this.state.submitted && !this.state.username && (
                      <div className="red">This is a required field</div>
                    )}
                  </div>
                  <div className="input-field">
                    <input
                      type="password"
                      id="password"
                      onChange={this.handleChange}
                      placeholder="Password"
                    />
                    {this.state.submitted && !this.state.password && (
                      <div className="red">This is a required field</div>
                    )}
                  </div>
                  <div className="input-field">
                    <button className='form'>Login</button>
                  </div>
                  {this.state.status !== "LoginSuccess" && 
                  <div className="red">{this.state.status}</div>
                  }
                  <h5>aoes_test Last updated: 2020.11.25 11:45</h5>
                </form>
              )}
              
            </div>

            <div>
              {/* Engage */}
            {this.state.status === "LoginSuccess" &&
                 (
                  <div>
                    <h2>Welcome {this.props.currentUser.username}!
                    <FontAwesomeIcon 
                      icon="user-circle" 
                      style={{ 
                        color: 'grey',
                        fontSize:36}}/>
                        </h2>
                  <DisplayEngageCl />
                  </div>
                )}
            </div>
          </TabPanel>
            {this.state.status === "LoginSuccess" &&
              <TabPanel>
                (<div>
                  {/* log out */}
                </div>)
              </TabPanel>
            }

        </Tabs>
              <div className="Footer">
                {/* Footer */}
                {/* <FooterPage/> */}
              </div>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  serverMessage: state.helloWorld,
  currentUser: state.authReducer,
  fullData: state.getDataReducer,
  requestList: state.requestListReducer,
  kpxFullData:state.kpxDataReducer,
  demoReducer:state.demoReducer
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    // console.log("dispatch!");
    dispatch(getRoute("helloWorld", {}));
  },
  loginAction: loginInfo => dispatch(loginAction(loginInfo)),
  logoutAction: () => dispatch(logoutAction()),

});

const PagePart1 = props => <div>hi</div>;
const PagePart2 = props => <PagePart1 {...props} />;
const PagePart3 = props => {
  PagePart1(props);
};

export const Hello_prod = connect(
  mapStateToProps,
  mapDispatchToProps
)(HelloCl);
