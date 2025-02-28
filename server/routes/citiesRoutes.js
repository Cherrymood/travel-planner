import express from "express";
import {
  getCities,
  getCity,
  createCity,
  deleteCity,
  updateCity,
} from "../controllers/getCities.js";


const citiesRouter = express.Router();
/**
* @swagger
* tags:
*   name: Cities
*   description: API for managing cities
*/

/**
* @swagger
* /api/cities:
*   get:
*     tags: [Cities]
*     summary: Get all cities for a user
*     responses:
*       200:
*         description: Successful retrieval of cities
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 cities:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       _id:
*                         type: string
*                         example: "605c72b3a4b36c001f2e2d1e"
*                       name:
*                         type: string
*                         example: "New York"
*                       createdBy:
*                         type: string
*                         example: "605c72b3a4b36c001f2e2d1f"
*                       createdAt:
*                         type: string
*                         format: date-time
*                         example: "2021-03-22T12:00:00Z"
*                 count:
*                   type: integer
*                   example: 1
*       404:
*         description: No cities found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: "Cities not found"

*   post:
*     tags: [Cities]
*     summary: Create a new city
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 example: "Los Angeles"
*               notes:
*                 type: string
*                 example: "A city in California"
*               date:
*                 type: string
*                 format: date
*                 example: "2023-01-01"
*     responses:
*       201:
*         description: City created successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 city:
*                   type: object
*                   properties:
*                     _id:
*                       type: string
*                       example: "605c72b3a4b36c001f2e2d20"
*                     name:
*                       type: string
*                       example: "Los Angeles"
*                     createdBy:
*                       type: string
*                       example: "605c72b3a4b36c001f2e2d1f"
*       400:
*         description: Invalid input data
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: "Invalid input data"

* /api/cities/{id}:
*   get:
*     tags: [Cities]
*     summary: Get a city by ID
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: The ID of the city
*         schema:
*           type: string
*     responses:
*       200:
*         description: Successful retrieval of city
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 city:
*                   type: object
*                   properties:
*                     _id:
*                       type: string
*                       example: "605c72b3a4b36c001f2e2d1e"
*                     name:
*                       type: string
*                       example: "New York"
*                     createdBy:
*                       type: string
*                       example: "605c72b3a4b36c001f2e2d1f"
*       404:
*         description: City not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: "No city with ID 605c72b3a4b36c001f2e2d1e"

*   patch:
*     tags: [Cities]
*     summary: Update a city by ID
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: The ID of the city
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               notes:
*                 type: string
*                 example: "Updated notes"
*               date:
*                 type: string
*                 format: date
*                 example: "2023-01-01"
*     responses:
*       200:
*         description: City updated successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: "City updated successfully"
*       400:
*         description: Invalid input data
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: "Notes or Date fields cannot be empty"
*       404:
*         description: City not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: "No city found with ID 605c72b3a4b36c001f2e2d1e"

*   delete:
*     tags: [Cities]
*     summary: Delete a city by ID
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: The ID of the city
*         schema:
*           type: string
*     responses:
*       200:
*         description: City deleted successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: "City deleted successfully"
*       404:
*         description: City not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: "No city found with ID 605c72b3a4b36c001f2e2d1e"
*/

citiesRouter.route("/").get(getCities).post(createCity);
citiesRouter.route("/:id").get(getCity).delete(deleteCity).patch(updateCity);

export default citiesRouter;
