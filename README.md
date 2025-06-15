# Melody Stream

## Introduction

Melody Stream is an online music streaming platform developed with Node.js, Express, and TypeScript. This application allows users to discover, listen to, and interact with music from various artists and genres, featuring a server-side rendered frontend using the Pug template engine.

## Key Features

- **User Authentication**: Secure user registration and login system using JWT and httpOnly cookies.
- **Global Music Player**: A persistent player bar that allows continuous music playback while browsing.
- **Music Discovery**: Browse new releases, most liked songs, and admin-curated featured tracks.
- **Dynamic Search**: Real-time search for songs, artists, and topics.
- **Personalized Library**: Registered users can view their personal playlists in the "Your Library" section.
- **Playlist Management**: Full CRUD API for creating and managing personal playlists.
- **Song Interaction**: Like songs, view lyrics, and see play counts.
- **Admin Panel**: Basic CRUD operations for managing songs.

## Technologies Used

![Technologies](https://skillicons.dev/icons?i=nodejs,express,typescript,mongodb,pug,css,javascript,jwt)

- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (with Mongoose)
- **Frontend**: Pug (Template Engine), CSS, Client-side JavaScript
- **Authentication**: JSON Web Tokens (JWT), bcrypt, cookie-parser

## System Requirements

- Node.js (version 14.x or higher)
- MongoDB
- npm or yarn

## Installation and Setup

### Install Dependencies

```bash
# Clone the repository
git clone [URL_repository]

# Navigate to the project directory
cd Melody_Stream

# Install dependencies
npm install
```

### Environment Configuration

Create a `.env` file in the root directory with the following content:

```
PORT=3000
MONGO_URI=[MongoDB connection string]
JWT_SECRET=your_super_secret_key_for_jwt

# Optional for future cloud storage integration
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
├── public/            # Static resources (CSS, JS, images)
├── views/             # Pug templates for the frontend
│   ├── layouts/       # Main layout files
│   └── pages/         # Specific pages (home, auth, library, etc.)
├── controllers/
│   ├── admin/         # Handlers for admin-specific logic
│   ├── pages/         # Controllers for rendering Pug pages
│   └── ...            # Root controllers for the JSON API
├── middlewares/       # Express middlewares (auth, user session)
├── models/            # MongoDB data models (Song, User, Playlist, etc.)
├── routes/
│   ├── admin/         # Routes for the admin panel
│   ├── pages/         # Routes for rendering Pug pages
│   └── ...            # Root routes for the JSON API
├── .env               # Environment variables
├── index.ts           # Application entry point
├── package.json       # Project configuration and dependencies
└── tsconfig.json      # TypeScript configuration
```

## API Endpoints

The application exposes a RESTful API for fetching data. Main endpoints include:

- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Log in a user and set auth cookie.
- `GET /api/users/me` - Get the profile of the currently logged-in user.
- `GET /api/music/songs` - Get a list of all songs.
- `GET /api/music/songs/:slug` - Get details for a single song.
- `POST /api/music/songs/:id/like` - Like a song.
- `GET /api/music/featured` - Get featured songs.
- `GET /api/playlists` - Get user's playlists (protected).
- `POST /api/playlists` - Create a new playlist (protected).
- `GET /api/search?q=<query>` - Search for songs, artists, and topics.
- `POST /api/admin/songs` - Create a new song (admin only).

## Contributing

We welcome contributions from the community:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is distributed under the ISC License. See the `LICENSE` file for more information.

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
