const express = require("express");
const authorizeRoles = require("../middlewares/authorizeRoles");
const ensureAuthenticated = require('../middlewares/googleAuthMiddleware');
const oauth2Client = require('../middlewares/googleAuth'); // Ensure the correct path


const router = express.Router();
const { google } = require('googleapis');
// Admin Route
router.get("/admin", authorizeRoles(["Admin"]), (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

// User Route
router.get("/user", authorizeRoles(["User"]), (req, res) => {
  res.json({ message: "Welcome, User!" });
});

/*router.get('/import-photos', ensureAuthenticated, async (req, res) => {
  try {
    const photosLibrary = google.photoslibrary({ version: 'v1', auth: oauth2Client });

    const response = await photosLibrary.mediaItems.list({
      pageSize: 10, // Number of photos to fetch
    });

    res.json({ photos: response.data.mediaItems || [] });
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).send('Error fetching photos');
  }
}); */

router.get('/import-photos', ensureAuthenticated, async (req, res) => {
  try {
    const photosLibrary = google.photoslibrary({ version: 'v1', auth: oauth2Client });

    const response = await photosLibrary.mediaItems.list({
      pageSize: 10, // Number of photos to fetch
    });

    res.json({ photos: response.data.mediaItems || [] });
  } catch (error) {
    console.error('Error fetching photos:', error.response?.data || error.message);
    res.status(500).send('Error fetching photos');
  }
});



module.exports = router;
