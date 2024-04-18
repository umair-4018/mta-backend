import * as GuestUserController from "../controller/guestController/GuestUserController.js";

export const CreateGuestUser = async (req, res) => {
  try {
    const resp = await GuestUserController.CreateGuestUser(req, res);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
