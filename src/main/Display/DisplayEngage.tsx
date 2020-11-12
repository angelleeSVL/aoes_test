import * as React from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { DisplayNewEngagementFormCl } from "./DisplayNewEngagementForm";
import { DisplayViewEngagementDetailCl } from "./DisplayViewEngagementDetail";
import { filterCaseInsensitive } from "../filterCaseInsensitive";
import {DisplayMyCompaniesCl} from './DisplayMyCompanies'
interface MyProps {
  engagement?;
  demoReducer?;
}
interface MyState {
  selectedEngagement;
  currentView;
}
const columns = [
  {
    Header: "Status",
    accessor: "status"
  },
  {
    Header: "Company",
    accessor: "Company"
  },
  {
    Header: "LEI", // Custom header components!
    accessor: "LEI"
  },
  {
    Header: "Ultimate Parent LEI", // Custom header components!
    accessor: "ultiParentLEI"
  },
  {
    Header: "Types of Engagement",
    accessor: "type" // Custom value accessors!
  },
  {
    Header: "Title",
    accessor: "Title" // Custom value accessors!
  },
  {
    Header: "Start Time", // Custom header components!
    accessor: "start"
  },
  {
    Header: "Due", // Custom header components!
    accessor: "due"
  },
  {
    Header: "View Detail", // Custom header components!
    accessor: "detail"
  },
  {
    Header: "owner_id", // Custom header components!
    accessor: "owner_id"
  },
  // {
  //   Header: "Update permission", // Custom header components!
  //   accessor: "updatePermission"
  // },
  
];
const demoData = [
  {
    EngagementId: "1",
    Company: "Volkswagen",
    status: "active",
    type: "Financial",
    Title: "coupon for bonds due 2035",
    start: "June 18, 2020",
    due: "June 30, 2020"
  },
  {
    EngagementId: "2",
    Company: "Volkswagen",
    status: "active",
    type: "Financial",
    Title: "annual carbon emission growth",
    start: "June 18, 2020",
    due: "June 20, 2020"
  },
  {
    EngagementId: "3",
    Company: "Volkswagen",
    status: "Closed",
    type: "Financial",
    Title: "coupon for bonds due 2025",
    start: "May 18, 2020",
    due: "May 25, 2020"
  }
];

class DisplayEngage extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedEngagement: "0",
      currentView: "home"
    };
  }
  onclickButton(e) {
    this.setState({
      selectedEngagement: e
    });
  }
  createData(data) {
    let output = [];
    for (let i = 0; i < data.length; i++) {
      output.push({
        EngagementId: data[i].EngagementId,
        Company: data[i].Company,
        type: data[i].type,
        status: data[i].status,
        Title: data[i].Title,
        start: data[i].start,
        due: data[i].due,
        detail: (
          <button onClick={() => this.onclickButton(data[i].EngagementId)}>
            Detail
          </button>
        ),
        owner_id:data[i].owner_id
      });
    }
    return output;
  }
  createData_temp(data) {
    let output = [];
    for (let i = 0; i < data.length; i++) {
      output.push({
        EngagementId: data[i][6],
        Company: data[i][1],
        type: data[i][2],
        status: data[i][0],
        Title: data[i][3],
        start: data[i][4],
        due: data[i][5],
        owner_id:data[i][7],
        detail: (
          <button onClick={() => this.onclickButton(data[i][6])}>Detail</button>
        ),
        LEI:data[i][8],
        ultiParentLEI:data[i][9],
        updatePermission: <button>update</button>
      });
    }
    return output;
  }

  setCurrentview = e => {
    this.setState<never>({
      currentView: e.target.id
    });
  };
  render() {
    // const tableData = this.createData(demoData);
    const tableData = this.props.engagement
      ? this.createData_temp(this.props.engagement)
      : this.createData(demoData);
    return (
      <div>
        {tableData && (
          <div>
            <button
              className="view-engagement-button"
              id="home"
              onClick={this.setCurrentview}
            >
              Home
            </button>
            <button
              className="view-engagement-button"
              id="View"
              onClick={this.setCurrentview}
            >
              My Engagements
            </button>
            <button
              className="view-engagement-button"
              id="new"
              onClick={this.setCurrentview}
            >
              Add New Engagement
            </button>
            <button
              className="view-engagement-button"
              id="my_companies"
              onClick={this.setCurrentview}
            >
              View My Companies
            </button>

            {this.state.currentView == "View" ? (
              <div>
                <ReactTable
                  columns={columns}
                  data={tableData}
                  filterable
                  defaultFilterMethod={filterCaseInsensitive}
                  defaultSorted={[{ id: "start", desc: true }]}
                />
              </div>
            ) : this.state.currentView == "new" ? (
              <DisplayNewEngagementFormCl />
            ) : this.state.currentView == 'home'?(
              //Home
              <div className="engagement-welcome">
                <h2>Welcome to "I want to Engage"</h2>
                <h3>My Engagements : to view Engagements </h3>
                <h3>Add New Engagement : to initiate new engagements </h3>
                <h3>View My Companies : to view engagements statistics per company </h3>
                
              </div>
            ):<div>
              <DisplayMyCompaniesCl/>
            </div>}
            {this.state.currentView == "View" &&
              this.state.selectedEngagement != "0" && (
                <DisplayViewEngagementDetailCl
                  engagementId={this.state.selectedEngagement}
                  data={tableData}
                />
              )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  engagement: state.demoReducer.engagement,
  demoReducer: state.demoReducer
});

const mapDispatchToProps = {};

export const DisplayEngageCl = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayEngage);
