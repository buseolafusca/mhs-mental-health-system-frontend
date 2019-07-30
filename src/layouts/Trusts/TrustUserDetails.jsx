import React, { Component } from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import PersonForm from 'views/Forms/PersonForm.jsx'

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

class UserDetails extends Component {
  constructor (props) {
    super(props)
    const { id } = this.props.match.params
    this.state = { id: id
    }
  }

  componentWillMount () {

  }

  render () {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <PersonForm id={this.state.id} hasDetails />
        </GridItem>
      </GridContainer>
    )
  }
}

UserDetails.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(UserDetails)