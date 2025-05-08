# 🐞 Bug Tracker – 30 Minute Build Challenge

This is my submission for the React + Django 30 Minute Build Challenge.

---

## ✅ Done

- Created the `Bug` model with the necessary fields (`title`, `description`, `severity`, `created_at`).
- Set up Django REST Framework integration to support listing and creating bugs via API.
- Implemented form handling in the React frontend.
- Connected the React form with the backend API.

---

## ❌ Missing

- An error occurred when accessing the `/bugs` URL, which I only identified after the 30-minute timer.  
  The issue was that the Docker container didn’t reflect the latest changes because I forgot to rebuild it.
- I was not able to apply any styling to the form due to time constraints.

---

## 🔜 Next Steps

- Rebuild the Docker container to apply all backend changes.
- Finalize the frontend form styling for a better user experience.
- Add tests and improve error handling.
