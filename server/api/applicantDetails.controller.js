import applicantDetailsDAO from "../dao/applicantDetailsDAO";

export default class applicantDetailsController {
  static async apiGetApplicantDetails(req, res, next) { // when this is called from a url there can be a query string in which we specify certain parameters
    const applicantsPerPage = req.query.applicantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20 // check if query exists in url, if so convert it to an int 
    const page = req.query.page ? parseInt(req.query.page, 10) : 0 // check if page number is passed in, if so convert to an int

    let filters = {}
    if (req.query.email) {
      filters.email = req.query.email
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { applicantDetailsList, totalNumApplicants } = await RestaurantsDAO.getRestaurants({ // call the getApplicantDetails method and pass in filters, it will return list of applicant details 
      filters,
      page,
      restaurantsPerPage,
    })

    let response = { // now we return this info to whoever called this url
      restaurants: restaurantsList,
      page: page,
      filters: filters,
      entries_per_page: restaurantsPerPage,
      total_results: totalNumRestaurants,
    }
    res.json(response)
  }
  static async apiGetRestaurantById(req, res, next) {
    try {
      let id = req.params.id || {}
      let restaurant = await RestaurantsDAO.getRestaurantByID(id)
      if (!restaurant) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(restaurant)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetRestaurantCuisines(req, res, next) {
    try {
      let cuisines = await RestaurantsDAO.getCuisines()
      res.json(cuisines)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}