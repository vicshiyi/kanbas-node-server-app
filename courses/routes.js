import Database from "../Database/index.js";

function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.json(courses);
  });
}
export default CourseRoutes;