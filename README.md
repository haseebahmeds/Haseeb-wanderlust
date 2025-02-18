# Wanderlust

Wanderlust is a travel listing web application that allows users to explore and add travel destinations.

## Features
- View all travel listings
- Add new listings with title, description, image, price, country, and location
- Interactive UI built with EJS templates
- MongoDB for database management

## Technologies Used
- Node.js
- Express.js
- MongoDB
- EJS (Embedded JavaScript)
- Bootstrap (for styling)

## Installation
### Prerequisites
Make sure you have **Node.js** and **MongoDB** installed on your system.

### Steps to Run the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/haseebahmeds/Haseeb-wanderlust.git
   ```
2. Navigate to the project folder:
   ```sh
   cd Haseeb-wanderlust
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the MongoDB server (if not already running):
   ```sh
   mongod
   ```
5. Run the application:
   ```sh
   node app.js
   ```
6. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Project Structure
```
Haseeb-wanderlust/
│-- models/
│   ├── listing.js   # MongoDB Schema for Listings
│-- views/
│   ├── index.ejs    # Home page displaying all listings
│   ├── new.ejs      # Form to add new listing
│-- public/
│-- routes/
│-- app.js          # Main application file
│-- package.json
│-- README.md
```

## Future Improvements
- User authentication for adding/editing listings
- Implement reviews and ratings
- Improve UI with better design

## Contributing
Feel free to contribute by forking the repo and creating a pull request!

## License
This project is licensed under the MIT License.

