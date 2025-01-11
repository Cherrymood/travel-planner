Travel Planner

This is a full-stack application for managing travel destinations, built using Express.js for the backend and React for the frontend. The app allows users to manage a list of cities they have visited, along with geolocation features and detailed city information. Users can view, add, delete, and get detailed information about cities, along with authentication for login and signup.

Features

City Management:
View a list of cities.
Get detailed information on individual cities.
Add new cities.
Delete cities from the list.

Geolocation:
Automatically fetch the user’s current geographical location.
Display cities on an interactive map.

Authentication:
Login and signup functionalities for secure access to city-related data.

Routing:
Client-side routing with React Router for smooth navigation.
Nested routing to handle different views and layouts.

Map Integration:
Interactive map with React-Leaflet to display cities.
Support for clicking on the map to add new cities at specific latitudes and longitudes.
Display of user’s current position on the map with a button to retrieve it.

Technologies Used

Backend:
Express.js: Web framework for building the REST API.
Morgan: HTTP request logger middleware for node.js.
Cors: Middleware for enabling Cross-Origin Resource Sharing.
Cookie-Parser: Middleware for parsing cookies.
Frontend:
React: JavaScript library for building user interfaces.
React Router: Client-side routing library for navigation between pages.
Context API & useReducer: State management for handling cities data.
Geolocation API: For accessing user’s current geographical location.
React-Leaflet: For embedding and interacting with maps in React.
Setup and Installation

Backend:
Clone the repository:
git clone <repository-url>
cd city-management-app
Install dependencies:
npm install
Start the server:
npm start
The backend will be available at http://localhost:3000.
Frontend:
Navigate to the frontend directory:
cd client
Install dependencies:
npm install
Start the frontend development server:
npm start
The frontend will be available at http://localhost:5173.
API Endpoints

Cities:
GET /cities: Fetch the list of all cities.
GET /cities/:id: Fetch detailed data of a specific city.
POST /cities: Create a new city.
DELETE /cities/:id: Delete a city.
Authentication:
POST /login: Login to your account.
POST /signup: Create a new user account.
Running Locally

To run both the frontend and backend locally, make sure both servers are running on their respective ports (3000 for backend and 5173 for frontend). This allows the frontend to make requests to the backend via the configured API endpoints.

License

This project is licensed under the MIT License - see the LICENSE file for details.

Description of Components and Features
Map Component

The Map component provides an interactive map using React-Leaflet that:

Displays markers for each city based on its coordinates (latitude and longitude).
Allows users to click on the map to add a new city by navigating to the "form" page with the clicked latitude and longitude as URL parameters.
Provides a button to use the user's current geolocation and center the map at that position.
City Component

The City component displays detailed information about a single city. It fetches city data from the context and presents the following:

City Name & Emoji: Displays the name and emoji of the city.
Visit Date: Displays the date the user visited the city.
User Notes: If available, shows any notes the user added for the city.
Wikipedia Link: A link to the Wikipedia page of the city.
Back Button: Allows users to navigate back to the previous page.
CityItem Component

The CityItem component represents a list item for a city. It displays a summary of each city with the following:

City Name & Emoji: Displays the name and emoji of the city.
Visit Date: Displays the visit date of the city in a formatted form.
Delete Button: Allows users to delete a city from the list. When clicked, the city item navigates to the detailed city view, passing the city's id and coordinates as query parameters in the URL.
CityList Component

The CityList component renders a list of cities. It includes:

A loading spinner while cities are being fetched.
A message prompting the user to add their first city if the list is empty.
A list of CityItem components, each representing a city in the context's cities array.
CountriesList Component

The CountriesList component displays a list of countries based on the cities in the user's list. It includes:

A loading spinner while the cities are being fetched.
A message prompting the user to add their first city if the list is empty.
A list of unique countries derived from the cities, each represented by the CountryItem component. Each country is displayed with its corresponding emoji.
Helper Functions and Utility

formatDate: A utility function to format the city visit date into a readable format ("Day, Month Date, Year").
Spinner: A reusable loading spinner component that is displayed while data is being fetched.
BackButton: A button that allows users to navigate back to the previous page.
Context API
The CitiesContext provides global state management for the city data, including:

Fetching all cities.
Fetching a single city by ID.
Creating a new city.
Deleting a city.
Routing
URL Structure: The application uses React Router to manage routes. The URL includes id, lat, and lng query parameters to pass the necessary data for city details and geolocation.
