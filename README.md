# Music-Streaming-Flatform

## Introduction

This is an online music streaming platform developed with Node.js and TypeScript. This application allows users to discover, listen to, and interact with music from various artists and genres.

## Key Features

- **Online Music Streaming**: Play and listen to songs from a diverse music library
- **Song Search**: Search for songs by title, artist, or genre
- **Playlists**: Create and manage personal playlists
- **Song Interaction**: Like, comment, and view lyrics
- **Music Discovery**: Browse featured, new releases, and most liked songs

## Technologies Used

- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (with Mongoose)
- **Frontend**: Pug (Template Engine), HTML/CSS, JavaScript

## System Requirements

- Node.js (version 14.x or higher)
- MongoDB
- npm or yarn

## Installation and Setup

### Install Dependencies

```bash
# Clone the repository
git clone https://github.com/trinhtd-dev/Music-Streaming-Flatform

# Navigate to the project directory
cd Music-Streaming-Flatform

# Install dependencies
npm install
```

### Environment Configuration

Create a `.env` file in the root directory with the following content:

```
PORT=3000
MONGO_URI=[MongoDB connection string]
CLOUD_NAME=[Cloudinary name]
API_KEY=[Cloudinary API key]
API_SECRET=[Cloudinary API secret]
```

### Launch the Application

```bash
# Run the application with nodemon (hot reload)
npm start
```

Access the application at `http://localhost:3000`

## Project Structure

```
Melody_Stream/
├── config/         # Configuration (database, cloudinary,...)
├── controllers/    # Business logic handlers
├── helpers/        # Helper functions
├── middewares/     # Express middlewares
├── models/         # MongoDB data models
├── public/         # Static resources (CSS, JS, images)
├── routes/         # API routes
├── views/          # Pug templates
├── .env            # Environment variables
├── .gitignore      # Files and directories to ignore when committing
├── index.ts        # Application entry point
├── package.json    # Project configuration and dependencies
└── tsconfig.json   # TypeScript configuration
```
## Author

- Tran Duc Trinh

## Contact

If you have any questions or suggestions, please contact via email: tranductrinh2k4@gmail.com

## References

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Pug](https://pugjs.org/)
