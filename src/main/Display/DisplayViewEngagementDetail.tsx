import * as React from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { filterCaseInsensitive } from "../filterCaseInsensitive";
import { server } from "../../common/api/query";
import {engagementAction} from '../actions/engagementAction'
import DisplayEngagementStatusCard from './DisplayEngagementStatusCard'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
interface MyProps {
  engagementId;
  data;
  engagement_detail?;
  currentUser?;
  engagementAction?;
  engagementMngerPermission?;
  assetMngers?;
}
interface MyState {
  submitted;
  message;
  responseStatus;
}
const columns = [
  {
    Header: "username",
    accessor: "username"
  },
  {
    Header: "message",
    accessor: "message"
  },
  {
    Header: "submitted time",
    accessor: "time"
  }
];

export class DisplayViewEngagementDetail extends React.Component<
  MyProps,
  MyState
> {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      message: "",
      responseStatus: ""
    };
  }
  onChange = e => {
    this.setState<never>({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      submitted: true
    });
    if (this.state.message) {
      let url = server + "submitEngagementDetailMessage";
      let object = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.currentUser.token
        },
        body: JSON.stringify({
          message: this.state.message,
          engagement_id: this.props.engagementId,
          userid: this.props.currentUser.userid
        })
      };
      fetch(url, object)
        .then(response => response.text())
        .then(responseData => {
          let myObj = JSON.parse(responseData);
          // console.log("myObj", myObj);
          this.setState({
            responseStatus: "Submit Success"
          });

          if (myObj.now !== undefined) {
              let objToArr=[myObj.engagement_id, myObj.username, myObj.message, myObj.now]
            this.props.engagementAction(objToArr);
            // this.setState({
            //   failedMsg: "Create request SUCCESS"
            // });

          } else {
            // alert("Token expired, please login again");
            // this.props.logoutAction();
          }
        })
        .catch(error => console.error("Error:", error));
    }
  };
  createFilteredDetails(data) {
    let output = [];
    for (let i = 0; i < data.length; i++) {
      output.push({
        engagement_id: data[i][0],
        username: data[i][1],
        message: data[i][2],
        time: data[i][3]
      });
    }
    return output;
  }
  getAMname(userid){
    // console.log('this.props.assetMngers', this.props.assetMngers)
    // console.log('userid', userid)
    let output=" "
    for (let i=0;i<userid.length;i++){
        output+=(this.props.assetMngers.filter(e=>e[0]==userid[i])[0][1])+'; '
    }
    if(userid.length==0)output=" None"
    return output
  }
  render() {
    const selectedEngagement =
      this.props.data &&
      this.props.data.filter(e => e.EngagementId == this.props.engagementId)[0];
    const filteredDetailsProps = this.props.engagement_detail.filter(
      e => e[0] == this.props.engagementId
    );
    const filteredDetails =
      filteredDetailsProps && this.createFilteredDetails(filteredDetailsProps);
    let permittedAMid=this.props.engagementMngerPermission.filter(e=>e[0]==this.props.engagementId).map(e=>e[1])
    let permittedAMname=this.getAMname(permittedAMid)
    // console.log('permittedAMname', permittedAMname)

    return (
      <div>
        <Tabs>
          <TabList>
            <Tab>Engagement Status</Tab>
            <Tab>Chat room</Tab>
          </TabList>
          <TabPanel>
          {/* Engagement Status */}
          {selectedEngagement!=undefined?(
            <div>
            <DisplayEngagementStatusCard 
            selectedEngagement={selectedEngagement}
            />
          </div>
          ):
          (
            <div>
              <h3>No Status available, Please select another engagement</h3>
            </div>
          )
          }
          {/* END Engagement Status */}
          </TabPanel>
          <TabPanel>
          {/* Chat room */}
        {selectedEngagement != undefined ? (
          <div className="engagement-detail">
            company={selectedEngagement.Company}
            <br />
            type={selectedEngagement.type}
            <br />
            Title={selectedEngagement.Title}
            <br />
            Asset Managers Permitted={permittedAMname}
            {/* Detail Data Table */}
            <div>
              <ReactTable
                columns={columns}
                data={filteredDetails}
                filterable
                defaultFilterMethod={filterCaseInsensitive}
                defaultSorted={[{ id: "time", desc: true }]}
              />
            </div>
            <div>
              <br />
              <form onSubmit={this.handleSubmit}>
                My Message:
                <input
                  type="text"
                  id="message"
                  onChange={this.onChange}
                ></input>
                <button>Submit</button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <h3>No details available, Please select another engagement</h3>
          </div>
        )}
        {/* END Chat room */}
        </TabPanel>

        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  engagement_detail: state.demoReducer.engagement_detail,
  engagementMngerPermission: state.demoReducer.engagementMngerPermission,
  currentUser: state.authReducer,
  assetMngers:state.demoReducer.assetMngers
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    engagementAction: new_engagement_detail => dispatch(engagementAction(new_engagement_detail))
  });

export const DisplayViewEngagementDetailCl = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayViewEngagementDetail);
