import * as React from "react";
import { connect } from 'react-redux'
import ReactTable from "react-table";
import "react-table/react-table.css";
import { filterCaseInsensitive } from "../filterCaseInsensitive";

interface MyProps {
    executivesCA100?;
  }
interface MyState {

  }

export const get_columns=(data)=>{
    const columns=[
        {
            Header: "Date",
            accessor: "Date"
        },
        {
            Header: "index",
            accessor: "index"
        },
        {
            Header: "CompanyName",
            accessor: "CompanyName",
        },
        {
            Header: "country",
            accessor: "country",
        },
        {
            Header: "EO Name",
            accessor: "EO_Name"
        },
        {
            Header: "Gender",
            accessor: "gender"
        },
        {
            Header: "EO Title",
            accessor: "EO_Title"
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
            Header: "isCEO",
            accessor: "isCEO"
        }
    
    ]    
    return columns
} 
const companyColumns =[
    {
        Header: "companyName",
        accessor: "companyName"
    },
    {
        Header: "Total Number of EOs",
        accessor: "numberExec"
    },
    {
        Header: "Number of Female EOs",
        accessor: "numberFemale"
    },
    {
        Header: "Female EO %",
        accessor: "femalePercentage"
    },
]
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
export class DisplayExecutivesCl extends React.Component <MyProps, MyState>{
    createData(data) {
        let output = [];
        console.log('data', data)
        for (let i = 0; i < data.length; i++) {
          output.push({
            index: data[i][0],
            CompanyName: data[i][1],
            ISIN: data[i][2],
            LEI:data[i][3],
            country:data[i][4],
            website:data[i][5],
            Date:String(data[i][8])+'/'+String(data[i][7]),
            EO_Name:String(data[i][9])+' '+String(data[i][10])+' '+String(data[i][11])+' '+String(data[i][12])+' '+String(data[i][13])+' '+String(data[i][14]),
            gender:data[i][18],
            EO_Title: (data[i][19]),
            isCEO: data[i][20]
          });
        }
        return output;
      }
    getGenderbyCompany(data){
        let output = []
        let uniqueLEI = data.map(e=>e.ISIN).filter(onlyUnique)
        console.log('uniqueLEI', uniqueLEI)
        for (let i = 0;i < uniqueLEI.length; i++){
            let companyName = data.filter(e=>e.ISIN==uniqueLEI[i]).map(e=>e.CompanyName)[0]
            let genderList = data.filter(e=>e.ISIN==uniqueLEI[i]).map(e=>e.gender)
            let numberFemale = genderList.filter(e=>e=='F').length
            let femalePercentage = numberFemale/genderList.length
            output.push({
                companyName:companyName,
                numberExec:genderList.length,
                numberFemale:numberFemale,
                femalePercentage:femalePercentage.toFixed(4)
            })
        }
        return output

      }
    render() {
        let execuCA100=this.props.executivesCA100 && this.createData(this.props.executivesCA100)
        let companiesCA100 = execuCA100 && this.getGenderbyCompany(execuCA100)
        console.log('companiesCA100', companiesCA100)
        return (
            <div>
                <ReactTable
                  columns={execuCA100&&get_columns(execuCA100)}
                  data={execuCA100}
                  filterable
                  defaultFilterMethod={filterCaseInsensitive}
                  defaultSorted={[{ id: "Date", desc: true }]}
                  pageSize={10}
                />
                <br/>
                <h3>Number of Executives per Company</h3>
                 <ReactTable
                  columns={companyColumns}
                  data={companiesCA100}
                  filterable
                  defaultFilterMethod={filterCaseInsensitive}
                  pageSize={10}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    executivesCA100: state.demoReducer.execuSheCA100,

  });

const mapDispatchToProps = {
    
}


export const DisplayExecutives = connect(
    mapStateToProps,
    mapDispatchToProps
  )(DisplayExecutivesCl);