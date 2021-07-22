
module.exports = mongoose => {
  const Test = mongoose.model(
    "test",
    mongoose.Schema(
      {
        additional: String, 
        awards: String, 
        certification: String, 
        contacts: String, 
        courses: String, 
        education: String, 
        email: String, 
        experience: String, 
        hired: Boolean, 
        honors: String, 
        interests: String, 
        interviewed: Boolean, 
        languages: String, 
        name: String, 
        objective: String, 
        offered: Boolean, 
        otherOffer: Boolean, 
        phone: String, 
        positions: String, 
        position : new mongoose.Schema(
              {
                employer: String,
                email: String,
                job_title: Boolean
              }),
        profile: new mongoose.Schema( 
              {
                hardworking: Number,
                experience: Number,
                intelligence: Number,
                leadership: Number,
                organization: Number
              }),
        projects: String, 
        skills: String, 
        summary: String, 
        technology: String
      }, {collection: "test"}
    )
  );

  return Test;
};