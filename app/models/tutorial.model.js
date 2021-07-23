
module.exports = mongoose => {
  const Employer = mongoose.model(
    "employers",
    mongoose.Schema(
      {
        employer: String,
        email: String,
        job_title: String
      },
      {
          versionKey: false
      }
    )
  );

  return Employer;
};