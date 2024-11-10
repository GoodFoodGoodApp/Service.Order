import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import { authentication, random } from "../helpers";

export const register = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { email, password, username } = req.body;

    // Input validation
    if (!email || !password || !username) {
      res.status(400).json({
        error: "Missing required fields",
        details: {
          email: !email ? "Email is required" : null,
          password: !password ? "Password is required" : null,
          username: !username ? "Username is required" : null,
        },
      });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        error: "Invalid email format",
      });
      return;
    }

    // Password strength validation
    if (password.length < 8) {
      res.status(400).json({
        error: "Password must be at least 8 characters long",
      });
      return;
    }

    // Check for existing user
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(409).json({
        error: "User already exists",
      });
      return;
    }

    // Create new user
    const salt = random();
    const hashedPassword = authentication(salt, password);

    const user = await createUser({
      email: email.toLowerCase(), // Normalize email
      username: username.trim(), // Remove whitespace
      authentication: {
        salt,
        password: hashedPassword,
      },
    });

    // Remove sensitive data before sending response
    const userResponse = {
    //   id: user.id,
      email: user.email,
      username: user.username,
    //   createdAt: user.createdAt,
    };

    res.status(201).json({
      message: "User successfully created",
      user: userResponse,
    });
    return;
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "An error occurred while creating the user",
    });
    return;
  }
};

export const login = async (
    req: express.Request,
    res: express.Response
): Promise<void> =>
{
    try
    {
        const { email, password } = req.body;
        if (!email || !password)
        {
            res.status(400).json({
                error: "Missing required fields",
                details: {
                    email: !email ? "Email is required" : null,
                    password: !password ? "Password is required" : null,
                },
            });
            return;
        }
        const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");

        if (!user)
        {
            res.status(404).json({
                error: "User not found",
            });
            return;
        }

        const expectedHash = authentication(user.authentication.salt, password);
        // bad password
        if (user.authentication.password !== expectedHash)
        {
            res.status(403);
            return;
        }
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();
        res.cookie("GF-AUTH", user.authentication.sessionToken, {
            domain: "localhost",
            path: "/",
        });

        res.status(200).json(user).end();
        return;
    } catch (error)
    {
        console.error("Login error:", error);
        res.status(500).json({
            error: "Internal server error",
            message: "An error occurred while logging in",
        });
        return;
    }
};