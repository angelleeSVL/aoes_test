import * as React from "react";
import { connect } from 'react-redux'
import ReactTable from "react-table";
import "react-table/react-table.css";
import { filterCaseInsensitive } from "../filterCaseInsensitive";

interface MyProps {
    femaleAppointed?
  }
interface MyState {

  }
const columns= [
    {
        Header: "Date",
        accessor: "Date"
    },
    {
        Header: "Company",
        accessor: "Company"
    },
    {
        Header: "ISIN",
        accessor: "ISIN"
    },
    {
        Header: "EO Name",
        accessor: "EO_Name"
    },
    {
        Header: "EO Title",
        accessor: "EO_Title"
    },
    {
        Header: "Portfolio",
        accessor: "Portfolio_Name"
    },
]
export class DisplayFemaleAppointedCl extends React.Component <MyProps, MyState>{
    createData(data) {
        let output = [];
        for (let i = 0; i < data.length; i++) {
          output.push({
            Date: data[i][0],
            Company: data[i][2],
            ISIN: data[i][3],
            EO_Name: data[i][4],
            EO_Title: data[i][5],
            Portfolio_Name: data[i][6]
          });
        }
        return output;
      }
    render() {
        let femaleAppointed=this.props.femaleAppointed && this.createData(this.props.femaleAppointed)

        
        return (
            
            <div>
                Female Table
                 <ReactTable
                  columns={columns}
                  data={femaleAppointed}
                  filterable
                  defaultFilterMethod={filterCaseInsensitive}
                  defaultSorted={[{ id: "Date", desc: true }]}
                />
                
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    femaleAppointed: state.demoReducer.femaleAppointed
  });

const mapDispatchToProps = {
}



export const DisplayFemaleAppointed = connect(
    mapStateToProps,
    mapDispatchToProps
  )(DisplayFemaleAppointedCl);