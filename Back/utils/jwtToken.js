const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();
    // Determine the cookie name based on the user's role
    let cookieName;
    switch (user.role) {
        case 'Supplier':
            cookieName = 'supplierToken';
            break;
        case 'Manager':
            cookieName = 'managerToken';
            break;            
        case 'Employee':
            cookieName = 'employeeToken';
            break;  
        default:
            cookieName = 'token';
    }
    const cookieExpire = process.env.COOKIE_EXPIRE || 7;
    res
    
      .status(statusCode)
      .cookie(cookieName, token, {
        expires: new Date(
          
          Date.now() + cookieExpire * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .json({
        user,
        token,
      });
  };


module.exports = generateToken;