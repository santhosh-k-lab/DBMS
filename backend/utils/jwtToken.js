export const generateToken = (user, message, statusCode, res) => {
  // Generate JWT token with 1-day expiration
  const token = user.generateJsonWebToken({
    expiresIn: '1d',  // Set token to expire in 1 day
  });

  const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';2

  const cookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // One day expiration for the cookie
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  res.status(statusCode)
    .cookie(cookieName, token, cookieOptions)
    .json({
      success: true,
      message,
      user,
      token,
    });
};
