import * as React from "react";
import { connect } from "react-redux";
import Plot from "react-plotly.js";
import Select from "react-select";

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
    let indexArr = [];
    if (selectedOption != null) {
      for (let i = 0; i < selectedOption.length; i++) {
        indexArr.push(selectedOption[i].value);
      }
      this.setState({
        selectedIndex: indexArr,
      });
    }
  };
  
  render() {
    return (
      <div>
        {console.log("this.state.selectedIndex", this.state.selectedIndex)}
        <Select
          id="select-index"
          options={this.createOptionsIndex()}
          onChange={this.handleSelectIndex}
          isMulti
        />
        <Plot
          data={[
            {
              x: [1, 2, 3],
              y: [2, 6, 3],
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
            },
            {
              type: "bar",
              x: [1, 2, 3],
              y: [2, 5, 3],
            },
          ]}
          layout={{ width: 600, height: 600, title: "Female EO Plot" }}
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
