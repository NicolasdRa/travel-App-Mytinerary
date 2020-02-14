import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Logout } from '../../store/actions/authActions'

export class Logout extends Component {
  render () {
    return (
      <Fragment>
        <NavLink onClick={this.props.Logout} href='#'>
          Log out
        </NavLink>
      </Fragment>
    )
  }
}

export default connect(null, { Logout })(Logout)
