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
import ListRows from 'components/Tasks/ListRows.jsx'
import AnswerTabs from 'components/CustomTabs/AnswerTabs.jsx'
import TrustServiceFrom from 'views/Forms/TrustServiceForm.jsx'
import Grade from '@material-ui/icons/Grade'
import Code from '@material-ui/icons/Code'
import { fetchUserAnswers, getPersonnel } from '../../services/BackendService'
import { getAnsweredQuestionnaire,getOrganization, getQuestionnaire, getAuthenticationToken, getQuestionnaireWithoutToken, getQuestionnaireWithToken } from '../../services/BackendService'


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
    const{id}=this.props.match.params
    this.state = { id:id,personelList:''
    }
  }

  componentWillMount () {
    getPersonnel().then(response=>{
      console.log("response"+ response)
      var i=1;
      var thelist=new
       Array()
      response.forEach((map)=>{
        thelist.push([
          i,map.first_name,map.last_name,map.email,map.trust,map._id
        ])
        i++
       // console.log(thelist)
        this.setState({personelList:thelist})
      })
    })



  }

  redirectToManagerDetails = (managerId) => {
   console.log("ManagerID "+managerId)
   this.props.history.push(this.props.history.location.pathname + "/" + managerId)
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
                    <TrustServiceFrom hasDetails={true} organization={"trust"} id={this.state.id} />
                )
              },
              {
                tabName: 'MANAGERS',
                tabIcon: Code,
                tabContent: (
                  <ListRows
                     onRowClicked={(managerId) => this.redirectToManagerDetails(managerId)}
                    tableHeaderColor='primary'
                    tableHead={['S/N', 'First Name', 'Last Name', 'Email', 'Trust Name']}
                    checkedIndexes={[]}
                    tasks={this.state.personelList}
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
