class APIFeatures {
  constructor(query, req_query, req_limit, req_sort) {
    this.query = query;
    this.req_query = req_query;
    this.req_limit = req_limit;
    this.req_sort = req_sort;
  }
  filter() {
    // MAKE AN ARRAY OF QUERIES TO EXCLUDE
    const excludeQueries = ["sort", "page", "fields", "limit"];
    // MAKE A SHALLOW COPY OF REQ.QUERY
    const queryObj = { ...this.req_query };
    // LOOP THROUGH EXCLUDED QUERY ARRAY AND DELETE EACH ITEM FROM THE SHALLOW COPY OF REQ.QUERY
    excludeQueries.forEach((query) => delete queryObj[query]);
    // CONVERT queryObj INTO JSON STRINGS
    let queryStr = JSON.stringify(queryObj);
    // FIX GTE|LTE ETC OPERATORS
    queryStr = queryStr.replace(
      /\b(gte|lte|gt|lt)\b/gi,
      (match) => `$${match}`
    );
    // CONVERT THE FIXED QUERY OBJ INTO JAVASCRIPT OBJECT FOR MONGOOSE
    this.finalObj = JSON.parse(queryStr);
    // PASS THE FIXED QUERY INTO MODEL.FIND()
    this.query = this.query.find(this.finalObj);
    return this;
  }

  sort() {
    if (this.req_query.sort) {
      const sortBy = this.req_query.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else if (this.req_sort) {
      this.query = this.query.sort(this.req_sort);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limit() {
    // LIMITING FIELDS
    if (this.req_query.fields) {
      const fields = this.req_query.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    // PAGINATION
    const page = parseInt(this.req_query.page) || 1;
    const limit = parseInt(this.req_query.limit) || +this.req_limit || 20; // default: 20 blogs per page
    const skip = (page - 1) * limit;
    // const totalMovies = await this.query.countDocuments(this.finalObj);
    // if (skip >= totalMovies && totalMovies !== 0) {
    //   throw new Error("This page is not found!");
    // }
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export { APIFeatures };
