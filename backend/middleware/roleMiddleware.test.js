const authorizeRoles = require("./roleMiddleware");

describe("Role Middleware", () => {
  test("Should allow authorized admin user", () => {
    const req = {
      user: {
        username: "admin_user",
        role: "admin",
      },
    };

    const res = {};

    const next = jest.fn();

    const middleware = authorizeRoles("admin");

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("Should deny unauthorized customer user", () => {
    const req = {
      user: {
        username: "customer_user",
        role: "customer",
      },

      originalUrl: "/api/security/events",
    };

    const res = {
      status: jest.fn().mockReturnThis(),

      json: jest.fn(),
    };

    const next = jest.fn();

    const middleware = authorizeRoles("admin");

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);

    expect(res.json).toHaveBeenCalledWith({
      message: "Forbidden: insufficient permissions",
    });

    expect(next).not.toHaveBeenCalled();
  });
});
