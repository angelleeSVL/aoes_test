import * as React from "react";
import { connect } from "react-redux";
import { server } from "../../common/api/query";
import Select from "react-select";
import {newEngagementAction} from '../actions/engagementAction'
import "../../style.css";
interface MyState {
  company;
  LEI;
  type;
  title;
  due;
  submitted;
  responseStatus;
  share_with_values;
  share_with_person;
  portfolio_id;
  fruites;
  ISIN;
}
interface MyProps {
  currentUser?;
  newEngagementAction?;
  LEIdata?;
  viewPortfolio?;
  data?;
  assetMngers?;
}
let today = new Date().toISOString().substr(0, 10);

const distinct=(value, index, self)=>{
  return self.indexOf(value)===index
}

let share_with_options = [
  { label: "All Asset Owners", value: 1 },
  { label: "AM managing this portfolio", value: 2 },
  { label: "AMs I trust", value: 3 },
  { label: "other AMs", value: 4 },
];
const engagement_type_options = [
  { value: 'Financial', label: 'Financial' },
  { value: 'Environmental', label: 'Environmental' },
  { value: 'Governmental', label: 'Governmental' },
  { value: 'Social', label: 'Social' },
  { value: 'Others', label: 'Others' }
]

const CheckBox = props => {
  return (
    <li className='mnger-checkbox-list'>
      <label className='container-checkbox-checkall'>
      <input
        className='mnger-checkbox'
        key={props.id}
        onChange={props.handleCheckChildElement}
        type="checkbox"
        checked={props.isChecked}
        value={props.value}
      />{" "}
      <span className="checkmark"></span>
      {props.label}
      </label>
    </li>
  );
};
export class DisplayNewEngagementForm extends React.Component<
  MyProps,
  MyState
> {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      LEI:'',
      type: "Financial",
      title: "",
      due: today,
      submitted: false,
      responseStatus: "",
      share_with_values:[share_with_options[0]],
      share_with_person:null,
      portfolio_id:'',
      ISIN:"",
      fruites: [],
    };
  }
  onChange = e => {
    this.setState<never>({
      [e.target.id]: e.target.value
    });
  };
  createPortfolioOptions() {
    const filteredPortfolio = this.props.viewPortfolio
      ? this.props.viewPortfolio
      : null;
    const portfolioLength = filteredPortfolio ? filteredPortfolio.length : null;
    var options = [];
    for (let i = 0; i < portfolioLength; i++) {
      options.push({
        value: filteredPortfolio[i][0],
        label: filteredPortfolio[i][1]
      });
    }
    return options;
  }
  createCompanyOptions() {
    const data = this.props.data;
    let options = [];
    for (let i = 0; i < data.length; i++) {
      options.push({
        value: data[i][1],
        label: data[i][3],
        ISIN:data[i][2]
      });
    }
    let distinctOptions=options.filter(distinct)
    return options;
  }
  createShare_with_person_options(){
    let options=[]
    let data = this.props.assetMngers
    for (let i =0; i<data.length; i++){
      options.push({
        value: data[i][0],
        label: data[i][1]
      });
    }
    return options
  }
  handleSelectPortfolio = selectedOption => {
    this.setState({
      portfolio_id: selectedOption.value,
    });
  };
  updateMngerGroups = ()=>{    
    // TODO!!! filter with same ultimateLEI
    // myMngerWithISIN
    let myMngerWithISIN=this.props.data
      .filter(e=>e[2]==this.state.ISIN&&e[8]==this.props.currentUser.userid)
      .map(e=>e[5])
      .filter((v, i, a) => a.indexOf(v) === i)  

    let mngerList=[]
    for (let i=0; i<myMngerWithISIN.length;i++){
      let filteredMnger = this.props.assetMngers.filter(e=>e[0]==myMngerWithISIN[i])
      let tempMngerState = { 
        groupId: 1, 
        id: 10+i, 
        rolename: 1, 
        value: filteredMnger[0][1], 
        isChecked: false ,
        mngerid:filteredMnger[0][0]
      }
      mngerList.push(tempMngerState)
    }
    // myMngersWithoutISIN
    let myMngers=this.props.viewPortfolio.map(e=>Number(e[2])).filter(distinct)
    let myMngersWithoutISIN=myMngers.filter(e=>!myMngerWithISIN.includes(e))
    for (let i=0; i<myMngersWithoutISIN.length;i++){
      let filteredMnger=this.props.assetMngers.filter(e=>e[0]==myMngersWithoutISIN[i])
      let tempMngerState={ 
        groupId: 2, 
        id: 50+i, 
        rolename: 1, 
        value: filteredMnger[0][1], 
        isChecked: false,
        mngerid:filteredMnger[0][0]
      }
      mngerList.push(tempMngerState)
    }
    // mngersWithoutISIN
    let mngersWithoutISIN = this.props.assetMngers 
      .map(e=>e[0])
      .filter(e=>!myMngers.includes(e))

    for (let i=0; i<mngersWithoutISIN.length;i++){
      let filteredMnger=this.props.assetMngers.filter(e=>e[0]==mngersWithoutISIN[i])
      let tempMngerState={ 
        groupId: 3, 
        id: 100+i, 
        rolename: 1, 
        value: filteredMnger[0][1], 
        isChecked: false,
        mngerid:filteredMnger[0][0]
      }
      mngerList.push(tempMngerState)
    }
    this.setState({
      fruites:mngerList
    })
  }
  handleSelectcompanyName = selectedOption => {
    this.setState({
      company: selectedOption.label,
      LEI: selectedOption.value,
      ISIN:selectedOption.ISIN
    },
    this.updateMngerGroups
    // Update Asset Managers groups here
    )
  };
  handleSelectType = selectedOption => {
    this.setState({
      type: selectedOption.label,
    }
    )
  };
  onChange_share_with = selectedOption => {
    this.setState({
      share_with_values: selectedOption
    });
  };
  onChange_share_with_person = selectedOption => {
    this.setState({
      share_with_person: selectedOption
    });
  };
  handleAllChecked = id => event => {
    let fruites = this.state.fruites;
    // console.log(event.target.checked);
    fruites
      .filter(f => f.groupId === id)
      .forEach(fruite => {
        fruite.isChecked = event.target.checked;
      });
    this.setState({ fruites: fruites });
  };

  handleCheckChildElement = event => {
    // console.log('event', event)
    let fruites = this.state.fruites;
    fruites.forEach(fruite => {
      if (`${fruite.groupId}-${fruite.id}` === event.target.value)
        fruite.isChecked = event.target.checked;
    });
    this.setState({ fruites: fruites });
    let share_with_person_list=[]
    for (let i=0 ;i<fruites.length;i++){
      if(fruites[i].isChecked==true){
        share_with_person_list.push({
          value: fruites[i].mngerid, 
        })
      }
    }
    this.setState({share_with_person:share_with_person_list},
      // ()=>console.log('this.state.share_with_person', this.state.share_with_person)
      )
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      submitted: true
    });
    if (this.state.company&&this.state.type&&this.state.title&&this.state.due){
      // Submit New Engagement
      let url = server + "submitNewEngagement";
      let object = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.currentUser.token
        },
        body: JSON.stringify({
          engagement_id:'engagement_id',
          company: this.state.company,
          type: this.state.type,
          title:this.state.title,
          due:this.state.due,
          userid: this.props.currentUser.userid,
          share_with:this.state.share_with_values,
          LEI:this.state.LEI,
          share_with_person:this.state.share_with_person
        })
      };
      // console.log('object.body', object.body)
      fetch(url, object)
        .then(response => response.text())
        .then(responseData => {
          let myObj = JSON.parse(responseData);
          this.setState({
            responseStatus: "Submit Success"
          });
          if (myObj !== undefined) {
            this.props.newEngagementAction(myObj);
          } 
        })
        .catch(error => console.error("Error:", error));

    }
  };
  render() {
    // console.log('this.state.fruites',this.state.fruites);
    return (
      <form className="want-to-buy-form" onSubmit={this.handleSubmit}>
        <span>Company Name:
          {/* Select Portfolio: 
          <Select
              id="portfolio_id"
              options={this.createPortfolioOptions()}
              onChange={this.handleSelectPortfolio}
            /> */}
          <Select
            id="companyName"
            value={{
              label: this.state.company,
              value: this.state.LEI,
              ISIN:this.state.ISIN
            }}
            options={this.props.LEIdata&&this.createCompanyOptions()}
            onChange={this.handleSelectcompanyName}
          />
        </span>
        
       {/* {console.log('this.state.share_with_person', this.state.share_with_person)} */}
        {this.state.submitted && !this.state.company && (
          <div className="red">Please insert Company Name</div>
        )}
        <br/>
        <span>Engagement Type:
          <Select
            id="type"
            value={{label: this.state.type, value: this.state.type}}
            options={engagement_type_options}
            onChange={this.handleSelectType}
          />

        </span>
        {this.state.submitted && !this.state.type && (
          <div className="red">Please insert Engagement Type</div>
        )}
        <br/><br/><span>
          Engagement Title:
          <input type="text" id="title" onChange={this.onChange} />
        </span>
        {this.state.submitted && !this.state.title && (
          <div className="red">Please insert Engagement Title</div>
        )}

      <br/><br/><span>Due date:
          <input
            type="due"
            id="due"
            defaultValue={today}
            onChange={this.onChange}
          />
        </span>
       
        {this.state.submitted && !this.state.due && (
          <div className="red">Please insert due date</div>
        )}
        <br/>
        {/* Share with: 
        <Select 
          isMulti
          id="share_with"
          value={this.state.share_with_values}
          options={share_with_options}
          onChange={this.onChange_share_with}
        /> */}
        Share with Managers: 
        {/* <Select 
          isMulti
          id="share_with_person"
          value={this.state.share_with_person}
          options={this.props.assetMngers&&this.createShare_with_person_options()}
          onChange={this.onChange_share_with_person}
        /> */}
        {/* {console.log('this.state.share_with_values', this.state.share_with_values)} */}
        
        {[{ id: 1, name: "AMs managing my portfolios WITH this company" }, 
        { id: 2, name: " AMs managing my portfolios WITHOUT this company" },
        { id: 3, name: "Other AMs"}].map(item => (
          <div>
            <label className='container-checkbox-checkall'>

              <input
                type="checkbox"
                onChange={this.handleAllChecked(item.id)}
                value="checkedall"
              />{" "}
              <span className="checkmark"></span>
              {item.name}
            </label>
            <ul>
              {this.state.fruites
                .filter(fruit => fruit.groupId === item.id)
                .map((fruite, index) => {
                  return (
                    <CheckBox
                      className='mnger-checkbox'
                      key={`${item.id}-${fruite.id}`}
                      handleCheckChildElement={this.handleCheckChildElement}
                      {...fruite}
                      value={`${item.id}-${fruite.id}`}
                      label={fruite.value}
                    />
                    
                  );
                })}
            </ul>
          </div>
        ))}
        <span>{this.state.responseStatus}</span>
        <div className="input-field">
          <button className="form">Submit</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  viewPortfolio: state.kpxDataReducer.kpxPortfolioid,
  currentUser: state.authReducer,
  LEIdata: state.kpxDataReducer.kpxLEILegalName,
  data: state.kpxDataReducer.kpxListPortfolio,
  assetMngers:state.demoReducer.assetMngers
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  newEngagementAction: new_engagement_data => dispatch(newEngagementAction(new_engagement_data))
  });

export const DisplayNewEngagementFormCl= connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayNewEngagementForm);
