// DAO means data access object which is what we will use to get info from database

import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let applicantDetails // we store a reference to our db in this variable

export default class ApplicantDetailsDAO {

  static async injectDB(conn) {  // this method initally connects to our db. As soon as server starts this starts
    if (applicantDetails) { // if theres already a reference we just return otherwise create one
      return
    }
    try {
        applicantDetails = await conn.db(process.env.APPLICANTDETAILS_NS).collection("applicantDetails")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in applicantDetailsDAO: ${e}`,
      )
    }
  }

  static async getApplicantDetails({ 
      // the filters,page,and applicantsPerPage are options we created for this method. We can add filters if we want to sort restaurants
      // $eq means equal and $text means anywhere in the text that has a specific value
    filters = null,
    page = 0,
    applicantsPerPage = 20,
  } = {}) {
    let query // this query will be empty unless someone passes in the filters. we set up certain filters below
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } }
      } else if ("email" in filters) {
        query = { "email": { $eq: filters["email"] } }
      }
    }

    let cursor //
    
    try {
      cursor = await applicantDetails // find all that go along with the query we put in
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { restaurantsList: [], totalNumRestaurants: 0 }
    }

    const displayCursor = cursor.limit(applicantsPerPage).skip(applicantsPerPage * page) // we multiply applicants per page by page number to get to a specific page of results

    try {
      const applicantsList = await displayCursor.toArray()
      const totalNumApplicants = await applicantDetails.countDocuments(query) // gets total number of applicants

      return { applicantsList, totalNumApplicants }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { applicantsList: [], totalNumApplicants: 0 }
    }
  }
  static async getApplicantById(id) {
    try {
      const pipeline = [
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
              {
                  $lookup: {
                      from: "reviews",
                      let: {
                          id: "$_id",
                      },
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $eq: ["$restaurant_id", "$$id"],
                                  },
                              },
                          },
                          {
                              $sort: {
                                  date: -1,
                              },
                          },
                      ],
                      as: "reviews",
                  },
              },
              {
                  $addFields: {
                      reviews: "$reviews",
                  },
              },
          ]
      return await restaurants.aggregate(pipeline).next()
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`)
      throw e
    }
  }

  static async getCuisines() {
    let cuisines = []
    try {
      cuisines = await restaurants.distinct("cuisine")
      return cuisines
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`)
      return cuisines
    }
  }
}
