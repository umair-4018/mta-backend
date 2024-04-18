import GuestUser from "../../model/GuestUser.js";

export const CreateGuestUser = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const guestUser = await GuestUser.create({
        name: req.body.first_name,
        email: req.body.email,
        contact_Info: req.body.contact_Info,
      });

      if (guestUser) {
        return resolve({
          user: guestUser,
          code: 201,
          message: "Guest User Created Successfully",
        });
      } else {
        return reject({
          code: 400,
          message: "Guest User does not Created Successfully",
        });
      }
    } catch (error) {
      console.log(error);
      return reject({ code: 500, message: "Internal server error." });
    }
  });
};
