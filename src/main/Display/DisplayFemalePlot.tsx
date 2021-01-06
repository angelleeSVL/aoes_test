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

function partsSums(ls){
    let sum = ls[0]
    let res  = [sum]
    for (let i = 1; i <= ls.length; i++){
        sum += ls[i]
        res.push(sum)
    }
    return res
}
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
  countAccumulated = (netchange)=>{
    return partsSums(netchange)
  }
  render() {
    let selectedFemaleAppointedDataByIndex = this.createDataBySelectedIndex(this.props.femaleAppointed,this.state.selectedIndex)
    let selectedFemaleDroppedDataByIndex = this.createDataBySelectedIndex(this.props.femaleDroppedout,this.state.selectedIndex)
    let datesInData = selectedFemaleAppointedDataByIndex.concat(selectedFemaleDroppedDataByIndex).map(e=>e[0]).filter(distinct).sort()
    let countAppointed = this.countDataByDate(datesInData, selectedFemaleAppointedDataByIndex)
    let countDropped = this.countDataByDate(datesInData,selectedFemaleDroppedDataByIndex)
    let countNetChange = this.countNetChange(countAppointed, countDropped) 
    let countAccumulated = this.countAccumulated(countNetChange)
    
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
              y: countAccumulated,
              type: "scatter",
              name:'Accumulated Change',
              marker: { color: "grey" },
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
        {/* <Plot
          data={[
            
            {
                x: ['giraffes', 'orangutans', 'monkeys'],
                y: [12, 18, 29],
                name: 'LA Zoo',
                type: 'bar'
            },
            {
                x: ['giraffes', 'orangutans', 'monkeys'],
                y: [20, 14, 23],
                name: 'SF Zoo',
                type: 'bar'
            },
          ]}
          layout={{ 
              width: 1000, 
              height: 600, 
              title: "Female EO Plot" 
            }}
        /> */}
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
