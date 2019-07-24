import React, { Component } from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import Table from 'components/Table/Table.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import Tasks from 'components/Tasks/Tasks.jsx'
import AnswerRows from 'components/Tasks/AnswerRows.jsx'
import AnswerTabs from 'components/CustomTabs/AnswerTabs.jsx'
import TrustServiceFrom from 'views/Forms/TrustServiceForm.jsx'
import Grade from '@material-ui/icons/Grade'
import Code from '@material-ui/icons/Code'
import { fetchUserAnswers } from '../../services/BackendService'
import { getAnsweredQuestionnaire, getQuestionnaire, getAuthenticationToken, getQuestionnaireWithoutToken, getQuestionnaireWithToken } from '../../services/BackendService'


const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF'
    }
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1'
    }
  }
}

class TrustDetails extends Component {
  constructor (props) {
    super(props)
    this.state = { userAnswers: []
      // idList: []
    }
  }

  componentWillMount () {
    // fetchUserAnswers()
    //   .then(response => {
    //     console.log(response)
    //     var rows = []
    //     for (var i = 0; i < response.length; i++) {
    //       console.log(i)
    //       var d = new Date(response[i].createdAt)
    //       var dateString = d.toString()
    //       dateString = dateString.substring(0, dateString.lastIndexOf(':'))
    //       var row = [response[i].title, response[i].patient_name, response[i].score, response[i]._id, 'PENDING', dateString, response[i]._id]
    //       rows.push(row)
    //     }
    //     this.setState({ userAnswers: rows })
    //   })
    //   .catch(error => {
    //     console.error(error)
    //   })
  }

  redirectToTrustDetails = (questionnaireResponseId) => {
    document.location.href = '/patientanswers/'+ questionnaireResponseId;
  }

  render () {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {/* <Card> */}
          {/* <CardHeader color='primary'>
              <h4 className={styles.cardTitleWhite}>Submitted Questionnaires</h4>
              <p className={styles.cardCategoryWhite} />
            </CardHeader> */}
          {/* <CardBody> */}
          <AnswerTabs
            // title="Submitted Questionnaires: "
            headerColor='info'
            onCreateNewClicked={() => this.handleCreateNewQuestionnaireClicked()}
            tabs={[
              {
                tabName: 'DETAILS',
                tabIcon: Code,
                tabContent: (
                    <TrustServiceFrom/>
                )
              },
              {
                tabName: 'MANAGERS',
                tabIcon: Code,
                tabContent: (
                  <AnswerRows
                    tableHeaderColor='primary'
                    tableHead={['S/N', 'Name', 'Email', 'Trust Name']}
                    checkedIndexes={[]}
                    tasks={[['1', 'Busola', 'busola@gmail.com', 'Camden Trust', 'Manager Id'],
                    ['2', 'Nick', 'nick@gmail.com', 'Camden Trust', 'Manager Id'],
                    ['3', 'Chen', 'nick@gmail.com', 'Camden Trust', 'Manager Id'],
                    ['4', 'Yiming', 'nick@gmail.com', 'Camden Trust', 'Manager Id'],
                    ]}
                  />
                )
              }
            ]}
          />
          {/* <Table
                tableHeaderColor='primary'
                // tableHead={["Questionnaire Name", "Patient Name", "Time", "Final Score", "Id", "Questionnaire Id"]}
                tableHead={['Questionnaire Name', 'Patient Name', 'Predicted Score', 'NHS Number', 'Status', 'Time Submitted']}
                tableData={this.state.userAnswers}
              />
            </CardBody>
          </Card> */}
        </GridItem>
      </GridContainer>
    )
  }
}

TrustDetails.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(TrustDetails)