import React, { Component } from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import AnswerRows from 'components/Tasks/ListRows.jsx'
import AnswerTabs from 'components/CustomTabs/AnswerTabs.jsx'
import TrustServiceFrom from 'views/Forms/TrustServiceForm.jsx'
import Code from '@material-ui/icons/Code'
import { getPersonnel, deletePersonnel } from '../../services/BackendService'
import swal from 'sweetalert2'

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

class ServiceDetails extends Component {
  constructor(props) {
    super(props)
    const { id } = this.props.match.params //organization's ID
    sessionStorage.setItem('organizationID', id)
    this.state = {
      id: id, personelList: ''
    }
  }

  componentWillMount() {
    getPersonnel().then(response => { //Get the personel list from backend
      console.log("response" + response)
      var counter = 1;
      var thelist = new Array() //list for storing the personnel
      response.forEach((map) => {
        thelist.push([
          counter, map.first_name, map.last_name, map.email, map.trust, map._id
        ])
        counter++
        this.setState({ personelList: thelist })
      })
    })



  }

  redirectToManagerDetails = (managerId) => { //Function that redirects to the edit manager page
    this.props.history.push(this.props.history.location.pathname + "/" + managerId)
  }


  createNewUser = () => {//Function that redirects to the create new manager page 
    this.props.history.push(this.props.history.location.pathname + "/manager/new")

  }

  deleteManager = (managerId) => {
    swal.fire({ //!!!!!!
      title: "Are you sure?",
      text: "Are you sure you want to delete this entry?",
      type: "warning",
      buttons: true,
      dangerMode: true,
    })

      .then((willDelete) => {
        if (willDelete) {
          deletePersonnel(managerId).then(response => {
            swal.fire({
              type: 'success',
              title: 'Success!',
              text: 'The entry has been deleted.! '
            })
            this.componentWillMount();
          })


        } else {
          swal.fire({
            type: 'info',
            title: 'Success',
            text: 'Action canceled.'
          });
        }
      });












  }
  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <AnswerTabs
            headerColor='info'
            tabs={[
              {
                tabName: 'DETAILS',
                tabIcon: Code,
                tabContent: (
                  <TrustServiceFrom hasDetails={true} organization={"service"} id={this.state.id} />
                )
              },
              {
                tabName: 'MANAGERS',
                tabIcon: Code,
                tabContent: (
                  <AnswerRows
                    onDeleteItemClicked={(managerId) => this.deleteManager(managerId)}
                    createNew={() => this.createNewUser() /*Function for create new manager */}
                    onRowClicked={(managerId) => this.redirectToManagerDetails(managerId)/* Function for edit manager */}
                    tableHeaderColor='primary'
                    tableHead={['S/N', 'First Name', 'Last Name', 'Email', 'Trust Name'] /**Table hearders */}
                    checkedIndexes={[]}
                    tasks={this.state.personelList}
                  />
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer>
    )
  }
}

ServiceDetails.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(ServiceDetails)