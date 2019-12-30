
  // fetches cities from DB
  componentDidMount() {
    axios.get('http://localhost:5000/cities/all')
      .then(res => { 
        this.setState({
          cities: res.data
        })
      })  
    }