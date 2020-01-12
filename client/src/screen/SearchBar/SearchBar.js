import React from 'react';
import TextField from '@material-ui/core/TextField';

export default class SearchBar extends React.Component {
    
state = {
    string: ""
}

handleChange = (e) => {
    this.setState({
      string: e.target.value.toLowerCase()
    })
    this.props.filterString() 
    console.log(this.state)
  };

handleSubmit = (e) => {
    e.preventDefault()
  }; 

render () {

  return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <TextField id="standard-name" label="Search City"
                    defaultValue={""}
                    onChange={this.handleChange} />
            </form>
        </div>
        );
    }
}