import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import Grade from "@material-ui/icons/Grade";
import Code from "@material-ui/icons/Code";
import All from "@material-ui/icons/AllInboxOutlined";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import AdminTabs from "components/CustomTabs/AdminTabs.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Swal from 'sweetalert2';
import InformationCard from 'components/DashboardComponent/InformationCard.jsx';
import LineGraph from 'components/DashboardComponent/LineGraph.jsx';

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { fetchQuestionnaires, deleteQuestionnaire, fetchWeeklyResult,getOrganizations } from "../../services/BackendService";


class QuestionnaireAdmin extends React.Component{
    state = {
        idPublishedList: [],
        questionnairePublishedList: [],
        idDraftList: [],
        questionnaireDraftList: [],
      };
 
    componentWillMount() {
        fetchQuestionnaires().then( //!!! AWAIT HERE
            response => {
             this.setState({'totalPublishedQuestionnaire': response.idPublishedList.length, 'totalDraftQuestionnaire': response.idDraftList.length,
             'idDraftList': response.idDraftList, 'idPublishedList': response.idPublishedList, 
                   'questionnaireDraftList': response.questionnaireDraftList, 'questionnairePublishedList': response.questionnairePublishedList});
           }
         );
    }
    
    handleEditQuestionnaireClick = (index, status) => {
        console.log(index);
        if(status === 'DRAFT'){
          const questionnaireId = this.state.idDraftList[index];
          this.props.question.push(this.props.question.location.pathname + "/questionnaire/" + questionnaireId)
        }
        else if(status === 'PUBLISHED'){
          const questionnaireId = this.state.idPublishedList[index];
          this.props.question.push(this.props.question.location.pathname + "/questionnaire/" + questionnaireId)
        }
      };
    
      handleDeleteQuestionnaireClick = (index, status) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "The questionnaire cannot retrieve",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Delete'
        })
        .then((result) => {
          if (result.value) {
            Swal.fire(
              'Deleted!',
              'The questionnaire has been deleted',
              'success'
            );
            if(status === 'DRAFT'){
              const questionnaireId = this.state.idDraftList[index];
              deleteQuestionnaire(questionnaireId).then(
                
                response => {
                  const idListBuffer = this.state.idDraftList.slice();
                  idListBuffer.splice(index, 1);
                  const questionnaireListBuffer = this.state.questionnaireDraftList.slice();
                  questionnaireListBuffer.splice(index, 1);
                  this.setState({idDraftList: idListBuffer, questionnaireDraftList: questionnaireListBuffer });
                }
              );
            }
            else if(status === 'PUBLISHED'){
              const questionnaireId = this.state.idPublishedList[index];
              deleteQuestionnaire(questionnaireId).then(
                response => {
                  const idListBuffer = this.state.idPublishedList.slice();
                  idListBuffer.splice(index, 1);
                  const questionnaireListBuffer = this.state.questionnairePublishedList.slice();
                  questionnaireListBuffer.splice(index, 1);
                  this.setState({idPublishedList: idListBuffer, questionnairePublishedList: questionnaireListBuffer });
                }
              );
            }
          }
        });
      };
    
      handleCreateNewQuestionnaireClicked = () => {
        this.props.question.push(this.props.question.location.pathname + "/questionnaire")
      };

    render(){
        return(
            <GridItem xs={12} sm={12} md={this.props.value}>
            <AdminTabs
              title="Questionnaires :"
              headerColor="info"
              onCreateNewClicked={() => this.handleCreateNewQuestionnaireClicked()}
              tabs={[
                {
                  tabName: "PUBLISHED",
                  tabIcon: Grade,
                  tabContent: (
                    <Tasks
                      tableHeaderColor="info"
                      tableHead={["Name", "Description", "Status", "Modify"]}
                      checkedIndexes={[]}
                      tasks={this.state.questionnairePublishedList}
                      onEditClicked={(index) => this.handleEditQuestionnaireClick(index, 'PUBLISHED')}
                      onDeleteClicked={(index) => this.handleDeleteQuestionnaireClick(index, 'PUBLISHED')}
                    />
                  )
                },
                { 
                  tabName: "DRAFT",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      tableHeaderColor="info"
                      tableHead={["Name", "Description", "Status", "Modify"]}
                      checkedIndexes={[]}
                      tasks={this.state.questionnaireDraftList}
                      onEditClicked={(index) => this.handleEditQuestionnaireClick(index, 'DRAFT')}
                      onDeleteClicked={(index) => this.handleDeleteQuestionnaireClick(index, 'DRAFT')}
                    />
                  )
                }, 
              ]}
            />
          </GridItem>
        )
    }
  }
  
  QuestionnaireAdmin.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(dashboardStyle)(QuestionnaireAdmin);