import { findDoctorById, updateDoctor } from "../services/doctor.service.js";

export async function getDoctorController(re, res) {
  const { id, username, specialization } = await findDoctorById(
    re.doctorData.id,
  );

  res.status(200).json({
    id,
    username,
    specialization,
  });
}

export async function updateDoctorController(re, res, next) {
  const { id } = re.doctorData;
  const { username, password, specialization } = re.body;

  try {
    const result = await updateDoctor(id, username, password, specialization);
    delete result.password;

    res.status(200).json({
      success: true,
      message: "Profile udpated successfully",
      user: result,
    });
  } catch (error) {
    next(error);
  }
}
