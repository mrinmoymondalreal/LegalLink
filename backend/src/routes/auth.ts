import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";
import { PrismaClient } from "../../generated/prisma";
import { getUser } from "../middlewares/getUser";

const router = Router();
const prisma = new PrismaClient();

router.all("/api/auth/sign-up/email", async (req, res) => {
  const { userType, ...data } = req.body;

  if (!userType || ["client", "advocate"].includes(userType) === false) {
    return res
      .status(400)
      .json({ code: "INVALID_USER_TYPE", message: "Invalid user type" });
  }

  const result = await auth.api.signUpEmail({
    body: data,
    asResponse: true,
  });

  res.status(result.status);
  res.setHeader("set-cookie", result.headers.get("set-cookie"));

  if (result.ok) {
    const resp = await result.json();
    const { user } = resp;
    const id = user.id;
    await prisma.user.update({
      where: { id },
      data: {
        userType,
      },
    });
    return res.json(resp);
  }
  res.json(await result.json());
});

router.all("/api/auth/update-user", getUser, async (req, res) => {
  const { image, name, ...extra } = req.body;
  const result = await auth.api.updateUser({
    body: req.body,
    asResponse: true,
    //@ts-ignore
    headers: req.headers,
    //@ts-ignore
    method: req.method,
  });
  if (Object.keys(extra).length > 0) {
    const id = res.locals.user.id;
    const { city, district, state, location } = extra;
    const updateData: { [key: string]: string } = {};
    if (city) updateData.city = city;
    if (district) updateData.district = district;
    if (state) updateData.state = state;
    if (location) updateData.location = location;
    await prisma.user.update({
      where: { id },
      data: updateData,
    });
  }
  res.status(result.status);
  res.setHeader("set-cookie", result.headers.get("set-cookie"));
  res.json(await result.json());
});

router.get("/api/auth/profile", getUser, async (req, res) => {
  const userId = res.locals.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        userType: true,
        city: true,
        district: true,
        state: true,
        location: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

router.all("/api/auth/*", toNodeHandler(auth));

export default router;
