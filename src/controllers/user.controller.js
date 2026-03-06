import { findUserById, updateUser } from "../services/user.service.js";

export async function getMeController(re, res) {
   // get from database for real
    const {id, username} = await findUserById(re.userData.id);
   
    // cant get from payload in case username gets changed midway
   res.status(200).json({
    id,
    username
   });
}

export async function updateMeController(re, res, next) {
    const { id } = re.userData;
    const { username, password } = re.body;
    
    try {
        // use prisma update service
        const result = await updateUser(id, username, password);
        delete result.password;
        
        res.status(200).json({
            success: true,
            message: "Profile udpated successfully",
            user: result 
        });
    } catch (error) {
        next(error);
    }
}