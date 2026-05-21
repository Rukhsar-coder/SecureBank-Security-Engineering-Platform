const jwt = require("jsonwebtoken");

const { protect } = require("./authMiddleware");
process.env.JWT_SECRET = "testsecret";

describe("Auth Middleware", () => {
  test("Should reject request with missing token", () => {
    const req = {
      headers: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),

      json: jest.fn(),
    };

    const next = jest.fn();

    protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "No token provided",
    });

    expect(next).not.toHaveBeenCalled();
  });

  test("Should reject invalid token", () => {
    const req = {
      headers: {
        authorization: "Bearer invalidtoken",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),

      json: jest.fn(),
    };

    const next = jest.fn();

    protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid token",
    });

    expect(next).not.toHaveBeenCalled();
  });

  test("Should allow valid token", () => {
    const token = jwt.sign(
      {
        username: "admin_user",
        role: "admin",
      },

      process.env.JWT_SECRET,
    );

    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),

      json: jest.fn(),
    };

    const next = jest.fn();

    protect(req, res, next);

    expect(next).toHaveBeenCalled();

    expect(req.user.username).toBe("admin_user");

    expect(req.user.role).toBe("admin");
  });
});
