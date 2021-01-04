import * as React from "react";
import { connect } from 'react-redux'
import ReactTable from "react-table";
import "react-table/react-table.css";
import { filterCaseInsensitive } from "../filterCaseInsensitive";
import Collapsible from 'react-collapsible';

interface MyProps {
    femaleAppointed?;
    femaleDroppedout
  }
interface MyState {

  }
export const female_list_columns=(data)=>{
    
    const columns=[
        {
            Header: "Date",
            accessor: "Date"
        },
        {
            Header: "Company",
            accessor: "Company",
        },
        {
            Header: "ISIN",
            accessor: "ISIN"
        },
        {
            Header: "LEI",
            accessor: "LEI"
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
            Header: "Index",
            accessor: "Index"
        },
    ]    
    return columns
} 

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
            Index: data[i][6],
            LEI:data[i][7],
          });
        }
        return output;
      }
    render() {
        let femaleAppointed=this.props.femaleAppointed && this.createData(this.props.femaleAppointed)
        let femaleDroppedout=this.props.femaleDroppedout && this.createData(this.props.femaleDroppedout)

        return (
            <div>
                {femaleAppointed!=undefined&&
                <div>
                <Collapsible 
                    trigger={<p>Recently Appointed Females</p>}     
                    open={true}   
                    // onOpening={() => this.onOpenPortfolio()}
                    // onClosing={() => this.onClosePortfolio()}
                    > 
                    <ReactTable
                    columns={femaleAppointed&&female_list_columns(femaleAppointed)}
                    data={femaleAppointed}
                    filterable
                    defaultFilterMethod={filterCaseInsensitive}
                    defaultSorted={[{ id: "Date", desc: true }]}
                    pageSize={10}
                    />
                </Collapsible>
                </div>
                }
                {femaleDroppedout!=undefined&&
                <div>


                <Collapsible 
                    trigger={<p>Recently Dropped Out Females</p>}
                    open={true}
                    // onOpening={() => this.onOpenPortfolio()}
                    // onClosing={() => this.onClosePortfolio()}
                    > 
                 <ReactTable
                  columns={femaleDroppedout&&female_list_columns(femaleDroppedout)}
                  data={femaleDroppedout}
                  filterable
                  defaultFilterMethod={filterCaseInsensitive}
                  defaultSorted={[{ id: "Date", desc: true }]}
                  pageSize={10}
                />
                
                </Collapsible>
                </div>
                    }
                
            
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    femaleAppointed: state.demoReducer.femaleAppointed,
    femaleDroppedout: state.demoReducer.femaleDroppedout,

  });

const mapDispatchToProps = {
}



export const DisplayFemaleAppointed = connect(
    mapStateToProps,
    mapDispatchToProps
  )(DisplayFemaleAppointedCl);