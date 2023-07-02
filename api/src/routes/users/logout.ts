import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  res.cookie('secretoken', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
});

export { router as signoutRouter };
