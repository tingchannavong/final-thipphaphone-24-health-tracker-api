import { updateUser } from "../services/user.service.js";

export async function getMeController(re, res) {
   const { id, username } = re.userData;
    
   // payload alrd have user info, so no need service
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
        
        res.status(200).json({
            success: true,
            message: "Profile udpated successfully",
            user: result 
        });
    } catch (error) {
        next(error);
    }

}