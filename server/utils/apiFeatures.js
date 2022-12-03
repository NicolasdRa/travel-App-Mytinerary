// API features class
class APIFeatures {
  constructor (query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  filter () {
    const queryObj = { ...this.queryString }
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach(item => delete queryObj[item])

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }

  sort () {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-createdAt')
    }
    return this
  }

  limit () {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ')
      this.query = this.query.select(fields)
    } else {
      this.query.select('-__v')
    }
    return this
  }

  paginate () {
    const page = this.queryString.page * 1 || 1
    const limitValue = this.queryString.limit * 1 || 100
    const skipValue = (page - 1) * limitValue

    this.query = this.query.skip(skipValue).limit(limitValue)
    return this
  }
}

module.exports = APIFeatures
