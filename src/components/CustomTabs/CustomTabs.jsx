import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import Button from "components/CustomButtons/Button.jsx";
import Add from "@material-ui/icons/AddCircle";
import customTabsStyle from "assets/jss/material-dashboard-react/components/customTabsStyle.jsx";

class CustomTabs extends React.Component {
  state = {
    value: 0
  };
  
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleCreateQuestionnaire = () => {
    document.location.href = "/creator/";
  };
  render() {
    const {
      classes,
      headerColor,
      plainTabs,
      tabs,
      title,
      rtlActive
    } = this.props;
    const cardTitle = classNames({
      [classes.cardTitle]: true,
      [classes.cardTitleRTL]: rtlActive
    });
    return (
      <Card plain={plainTabs}>
        <CardHeader color={headerColor} plain={plainTabs}>
          {title !== undefined ? (
            <div className={cardTitle}>{title}</div>
          ) : null}
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            classes={{
              root: classes.tabsRoot,
              indicator: classes.displayNone,
              scrollButtons: classes.displayNone
            }}
            variant="scrollable"
            scrollButtons="auto"
          >
        
           
            {tabs.map((prop, key) => {
              var icon = {};
              if (prop.tabIcon) {
                icon = {
                  icon: <prop.tabIcon />
                };
              }
              return (
                <Tab
                  classes={{
                    root: classes.tabRootButton,
                    selected: classes.tabSelected,
                    wrapper: classes.tabWrapper
                  }}
                  key={key}
                  label={prop.tabName}
                  {...icon}
                />
              );
            })}
            
            {/* <Button color="info" round onClick={() => this.props.onCreateNewClicked()}><Add /> Create
            </Button> */}
        </Tabs>
        </CardHeader>
        <CardBody>
          {tabs.map((prop, key) => {
            if (key === this.state.value) {
              return <div key={key}>{prop.tabContent}</div>;
            }
            return null;
          })}
        </CardBody>
      </Card>
    );
  }
}

CustomTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  headerColor: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.object,
      // tabContent: PropTypes.node.isRequired
      tabContent: PropTypes.node
    })
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool
};

export default withStyles(customTabsStyle)(CustomTabs);
