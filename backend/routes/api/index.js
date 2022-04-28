const router = require("express").Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

/************** TESTING IMPORTS *************/
// const asyncHandler = require('express-async-handler');
// const { User } = require('../../db/models');
// const { restoreUser, requireAuth, setTokenCookie } = require('../../utils/auth.js');

/************** TESTING ROUTES **************/
/*
router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'DemoUser'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
}));

// GET /api/restore-user
router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);

// GET /api/require-auth
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);
*/


router.use('/session', sessionRouter);

router.use('/users', usersRouter);


//POST /api/test
router.post("/test", function (req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;
