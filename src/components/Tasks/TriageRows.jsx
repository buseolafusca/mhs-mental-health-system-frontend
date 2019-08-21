import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import View from "@material-ui/icons/RemoveRedEye";
import Face from "@material-ui/icons/Face";
import Descending from "@material-ui/icons/ArrowDownward";
import Ascending from "@material-ui/icons/ArrowUpward";
import Filter from "@material-ui/icons/FilterList";
import Add from "@material-ui/icons/AddCircle";
// core components
import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";
// import { TableHead } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import 'assets/css/floatingbutton.css'
import CollapsableList from './CollapsableList'

class TriageRows extends React.Component {
  state = {
    checked: this.props.checkedIndexes,
    answers: {}
  };
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  redirectToAnswers = (tableHead, tasks, index) => {
    var selectedRow = tasks[index];
    var questionnaireResponseId = selectedRow[selectedRow.length - 2];
    this.props.onRowClicked(questionnaireResponseId);
  }

  redirectToUser = (tableHead, tasks, index) => {
    var selectedRow = tasks[index];
    var questionnaireResponseId = selectedRow[selectedRow.length - 1];
    this.props.onViewItemClicked(questionnaireResponseId);
  }



  render() {
    
    const { classes, tableHeaderColor, tableHead, tasks, rtlActive } = this.props;
    var answers = { BLUE: [], GREEN: [], RED: [], UNKNOWN: [] }
    sessionStorage.setItem('questionnaires',JSON.stringify(this.props.tasks))
    this.props.tasks.forEach(element => {
      answers[element[1]].push(element)
    });
    console.log(tableHead);
    const tableCellClasses = classnames(classes.tableCell, {
      [classes.tableCellRTL]: rtlActive
    });

    var floatingButtonStyle = {
      'margin-top': '25px',
      'height': '40px',
      'width': '40px',
      'color': '#005eb8'
    };


    return (
      <div>
        {/* <Table className={classes.table}> */}
          <CollapsableList props={this.props} tasks={answers['RED']}
            onRowClicked={this.props.onRowClicked}
            onViewItemClicked={this.props.onViewItemClicked}
            title={"Red"} />
          <CollapsableList
            onRowClicked={this.props.onRowClicked}
            onViewItemClicked={this.props.onViewItemClicked}
            props={this.props} tasks={answers['GREEN']} title={"Green"} />
          <CollapsableList onRowClicked={this.props.onRowClicked}
            onViewItemClicked={this.props.onViewItemClicked}
            props={this.props} tasks={answers['BLUE']} title={"Blue"} />
          <CollapsableList onRowClicked={this.props.onRowClicked}
            onViewItemClicked={this.props.onViewItemClicked}
            props={this.props} tasks={answers['UNKNOWN']} title={"Unknown"} />
        {/* </Table> */}

        {/* <div class="add-float">
          <Tooltip
            id="tooltip-top-start"
            title="Create New"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Create New"
              onClick={() => this.createNew()}
              className={classes.tableActionButton}
            >

              <Add className={classes.tableActionButtonIcon + " " + classes.add}
                style={floatingButtonStyle} />

            </IconButton>
          </Tooltip>

        </div> */}
      </div>
    );
  }
}

TriageRows.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tasks: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  rtlActive: PropTypes.bool,
  checkedIndexes: PropTypes.array

};

export default withStyles(tasksStyle)(TriageRows);

