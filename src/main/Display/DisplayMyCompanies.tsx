import * as React from "react";
import ReactTable from 'react-table'
import "react-table/react-table.css";
import { connect } from "react-redux";
import {filterCaseInsensitive} from '../filterCaseInsensitive'
interface MyState{

}
interface MyProps{
  portfolio?;
  engagement?;
}
const columns=[
  {
    Header: "Company Legalname",
    accessor: "legalname"
  },
    {
    Header: "LEI",
    accessor: "LEI"
  },
    {
    Header: "Ultimate Parent LEI",
    accessor: "ultiParentLEI"
  },
  {
    Header: "ISIN",
    accessor: "ISIN"
  },
  {
    Header: "Number of all related Engagements",
    accessor: "details"
  },

]
const demoData = [
    {
      LEI:'HWUPKR0MPOU8FGXBT394',
      legalname: "APPLE INC.",
      details:<button>Details</button>
    },
    {
      LEI:'INR2EJN1ERAN0W5ZP974',
      legalname: "MICROSOFT CORPORATION",
      details:<button>Details</button>
    },
    {
      LEI:'2138002X3H5UHJMZY848',
      legalname: "MUNICH RE SYNDICATE LABUAN LTD",
      details:<button>Details</button>
    },
    {
      LEI:'2138009EZ5GGI9J6JL60',
      legalname: "MUNICH RE SPECIALTY GROUP LIMITED",
      details:<button>Details</button>
    }

]
export class DisplayMyCompanies extends React.Component <MyProps,MyState>{
  countEngagement(ultiParentLEI){
    let count=this.props.engagement.filter(e=>e[9]==ultiParentLEI).length
    // console.log('count', count)
    return count

  }
  createCompanies(data){
    let output=[]
    for (let i=0;i<data.length;i++){
      let count=this.countEngagement(data[i][5])
      output.push({
        LEI:data[i][0],
        ISIN:data[i][1],
        legalname:data[i][2],
        details:count,
        ultiParentLEI:data[i][5]
      })
    }
    return output
  }
  render() {
    let urth_portfolio=this.props.portfolio&&this.createCompanies(this.props.portfolio)
        return (
            <div>
                <div>
                    <ReactTable
                    data={urth_portfolio}
                    columns={columns}
                    filterable
                    defaultFilterMethod={filterCaseInsensitive}
                    defaultSorted={[{ id: "details", desc: true }]}
                    />
                </div>
                
            </div>
        )
    }
}


const mapStateToProps = state => ({
  portfolio:state.demoReducer.urth_portfolio,
  engagement: state.demoReducer.engagement,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  
  });

export const DisplayMyCompaniesCl= connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayMyCompanies);