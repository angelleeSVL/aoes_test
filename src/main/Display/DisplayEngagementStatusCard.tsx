import * as React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Icon
} from "react-materialize";
import { server } from "../../common/api/query";
import Collapsible from 'react-collapsible';
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import {engagementStatusAction} from '../actions/engagementAction'
import "react-table/react-table.css";
import "../../style.css"

interface MyState {
  status;
  submitted;
  objective;
  strategy;
  tactic;
  corpResponse;
  rating;
  failedMsg;
}
interface MyProps {
  selectedEngagement;
  currentUser;
  engagementStatus;
  engagementStatusAction;
}

const demoStatus = [
  // {
  //   name: "The Company Name",
  //   objective: "50% women on board",
  //   strategy: "attend quarter meetings",
  //   tactic: "initiate motion to raise awareness",
  //   corpResponse: "N/A",
  //   ratingForResponse: 5,
  //   updatedTime: "2020.09.10 18:35:20"
  // }
];

export class DisplayEngagementStatusCard extends React.Component<
  MyProps,
  MyState
> {
  constructor(props) {
    super(props);
    this.state = {
        status: demoStatus,
        submitted:false,
        objective:'',
        strategy:'',
        tactic:'',
        corpResponse:null,
        rating:'',
        failedMsg:''
    };
  }
  onChange = e => {
    this.setState<never>({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let newStatusCard
    if(this.state.corpResponse&&this.state.objective&&this.state.tactic&&this.state.rating&&this.state.strategy){
        // console.log('SUBMITTED')
        this.setState({
            submitted: true,
          });
        newStatusCard={
            name: this.props.selectedEngagement.Company,
            objective: this.state.objective,
            strategy: this.state.strategy,
            tactic: this.state.tactic,
            corpResponse: this.state.corpResponse,
            ratingForResponse: this.state.rating,
            engagement_id:this.props.selectedEngagement.EngagementId,
            updatedTime: '2020-09-15'
        }
        // console.log('newStatusCard', newStatusCard)
        this.setState( prevState => ({
            status: [newStatusCard,...prevState.status  ]
        }));
        let url = server + "submitEngagementStatusCard";
        let object = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.props.currentUser.token
          },
          body: JSON.stringify({
            userid: this.props.currentUser.userid,
            engagement_id:this.props.selectedEngagement.EngagementId,
            objective: this.state.objective,
            strategy: this.state.strategy,
            tactic: this.state.tactic,
            corpResponse: this.state.corpResponse,
            ratingForResponse: this.state.rating,
          })
        };
        fetch(url, object)
          .then(response => response.text())
          .then(responseData => {
            let myObj = JSON.parse(responseData);
            // console.log("myObj", myObj);
            if (myObj.now !== undefined) {
                let objToArr=[
                  this.props.currentUser.userid, 
                  this.props.selectedEngagement.EngagementId, 
                  // this.props.selectedEngagement.Company,
                  this.state.objective, 
                  this.state.strategy,
                  this.state.tactic,
                  this.state.corpResponse,
                  this.state.rating,
                  myObj.now]
                this.props.engagementStatusAction(objToArr);
                this.setState({
                  failedMsg: " Create request SUCCESS"
                });
            } else {
                this.setState({
                    failedMsg:' Submission FAILED, please check connection'
                })
            }
          })
          .catch(error => console.error("Error:", error));
    }else{
        this.setState({
            failedMsg:' Submission FAILED, please fill in the blanks'
        })
    }
  };
  createCardComponent = (status,selectedEngagement) => {
    let statusObj=[]
    let selectedStatus = status.filter(e=>e[1]==selectedEngagement.EngagementId)
    for (let i = 0; i < selectedStatus.length; i++) {    
        statusObj.push({
            count:selectedStatus.length-i,
            engagement_id: selectedStatus[i][1],
            name: selectedEngagement.Company,
            objective: selectedStatus[i][2],
            strategy: selectedStatus[i][3],
            tactic: selectedStatus[i][4],
            corpResponse: selectedStatus[i][5],
            ratingForResponse: selectedStatus[i][6],
            updatedTime: selectedStatus[i][7]
          })
      }
    return statusObj;
  };
  componentDidUpdate(prevProps,prevState){
    let statusCards = this.props.engagementStatus&&this.createCardComponent(this.props.engagementStatus, this.props.selectedEngagement)
    if (this.props.selectedEngagement !== prevProps.selectedEngagement) {
      this.setState({
        status: statusCards
      });
    }
    if (this.props.engagementStatus !== prevProps.engagementStatus){
      this.setState({
        status: statusCards
      });
    }
  }
  componentDidMount(){
    let statusCards=this.props.engagementStatus&&this.createCardComponent(this.props.engagementStatus, this.props.selectedEngagement)
    this.setState({
      status:statusCards
    })
  }
  render() {
    // let statusCards = this.props.selectedEngagement && this.props.engagementStatus&&
    //   this.createCardComponent(this.props.engagementStatus, this.props.selectedEngagement);
    
      // console.log("statusCards", statusCards);
    // console.log('this.props.selectedEngagement', this.props.selectedEngagement)
    // console.log('this.state.status', this.state.status)
    // console.log('this.props.engagementStatus', this.props.engagementStatus)
    return (
      <div >
        {this.state.status != undefined && (
          <div className='status-card-components'>
            <div>
            
            
            <Collapsible 
                    trigger={<p>New status update</p>}        
                    // onOpening={() => this.onOpenPortfolio()}
                    // onClosing={() => this.onClosePortfolio()}
                    > 
                <br/>
                <form onSubmit={this.handleSubmit}>
                
              
                objective: 
                <input
                    type="text"
                    id="objective"
                    onChange={this.onChange}
                />
                strategy:
                <br/>
                <input
                    type="text"
                    id="strategy"
                    onChange={this.onChange}
                />
                tactic:
                <br/>
                <input
                    type="text"
                    id="tactic"
                    onChange={this.onChange}
                />
                corp response:
                <br/>
                <input
                    type="text"
                    id="corpResponse"
                    onChange={this.onChange}
                />
                rate:
                <br/>
                <input
                    type="number"
                    id="rating"
                    onChange={this.onChange}
                />
                <br/>
                <button>Submit  </button>{this.state.failedMsg}
                </form>
            </Collapsible>
            
            </div>
            <Row>
              <Col m={12}>
                {this.state.status.map(e => {
                  return (
                    <Card
                      className="blue-grey darken-1 "
                      closeIcon={<Icon>close</Icon>}
                      revealIcon={<Icon>more_vert</Icon>}
                      textClassName="white-text"
                      title={e.name}
                    >
                      <h3>Stage #{e.count}</h3>
                      <h4>objective : {e.objective}</h4>
                      <h4>strategy : {e.strategy}</h4>
                      <h4>tactic : {e.tactic}</h4>
                      <h4>corp response: {e.corpResponse}</h4>
                      <h4>rating for the response: {e.ratingForResponse}</h4>
                      <h4>time status updated: {e.updatedTime}</h4>
                    </Card>
                  );
                })}
                {this.state.status.length==0 &&
                <h3>No status! Please add new status!</h3>
                }
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
    currentUser: state.authReducer,
    engagementStatus: state.demoReducer.engagementStatus,
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  engagementStatusAction: new_engagement_status => dispatch(engagementStatusAction(new_engagement_status))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayEngagementStatusCard);
