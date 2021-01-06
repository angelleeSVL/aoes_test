import * as React from "react";
import { connect } from "react-redux";
import Plot from "react-plotly.js";
import Select from "react-select";
import { disconnect } from "process";

interface MyProps {
  femaleAppointed?;
  femaleDroppedout;
}
interface MyState {
  selectedIndex;
}
const distinct = (value, index, self) => {
  return self.indexOf(value) === index;
};

export class DisplayFemalePlotCl extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: [],
    };
  }
  createOptionsIndex() {
    let femaleAppointed = this.props.femaleAppointed
      ? this.props.femaleAppointed
      : null;
    let distinctIndex =
      femaleAppointed && femaleAppointed.map((e) => e[6]).filter(distinct);
    let options = [];
    for (let i = 0; i < distinctIndex.length; i++) {
      options.push({
        value: distinctIndex[i],
        label: distinctIndex[i],
      });
    }
    return options;
  }
  handleSelectIndex = (selectedOption) => {
    /* 
        //for isMulti
        let indexArr = [];
        if (selectedOption != null) {
        for (let i = 0; i < selectedOption.length; i++) {
            indexArr.push(selectedOption[i].value);
        }
        this.setState({
            selectedIndex: indexArr,
        });
        }

    */
   this.setState({
        selectedIndex: selectedOption.value,
    })
  };
  createDataBySelectedIndex=(data,selectedIndex)=>{
    // let output=[]
    /*
    // for isMulti
    for (let i=0;i<selectedIndex.length;i++){
      output.push(data.filter(e=>e[6]==selectedIndex[i]))
    }
    */
    return data.filter(e=>e[6]==selectedIndex)
  }
  countDataByDate = (dates, data)=>{
      let output=[]
      for (let i = 0; i < dates.length; i++){
        output.push(data.filter(e=>e[0]==dates[i]).length)
      }
      return output
  }
  countNetChange = (appointed, dropped)=>{
    let output=[]
    for (let i = 0; i<appointed.length;i++){
        output.push(appointed[i]-dropped[i])
    }
    return output
  }
  render() {
    let selectedFemaleAppointedDataByIndex = this.createDataBySelectedIndex(this.props.femaleAppointed,this.state.selectedIndex)
    let selectedFemaleDroppedDataByIndex = this.createDataBySelectedIndex(this.props.femaleDroppedout,this.state.selectedIndex)
    let datesInData = selectedFemaleAppointedDataByIndex.concat(selectedFemaleDroppedDataByIndex).map(e=>e[0]).filter(distinct).sort()
    let countAppointed = this.countDataByDate(datesInData, selectedFemaleAppointedDataByIndex)
    let countDropped = this.countDataByDate(datesInData,selectedFemaleDroppedDataByIndex)
    let countNetChange = this.countNetChange(countAppointed, countDropped) 
    return (
      <div>
        
        <Select
          id="select-index"
          options={this.createOptionsIndex()}
          onChange={this.handleSelectIndex}
        //   isMulti
        />
        <Plot
          data={[
            {
              x: datesInData,
              y: countNetChange,
              type: "scatter",
              name:'Net Change',
              marker: { color: "red" },
            },
            {
              type: "bar",
              name:'Appointed',
              x: datesInData,
              y: countAppointed,
              marker: {
                color: 'green'
              }
            },
            {
              type: "bar",
              name:'Dropped',
              x: datesInData,
              y: countDropped,
              marker: {
                color: 'orange'
              }
            },
          ]}
          layout={{ 
              width: 1000, 
              height: 600, 
              title: "Female EO Plot" 
            }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  femaleAppointed: state.demoReducer.femaleAppointed,
  femaleDroppedout: state.demoReducer.femaleDroppedout,
});

const mapDispatchToProps = {};

export const DisplayFemalePlot = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayFemalePlotCl);
