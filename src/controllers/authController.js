import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {

    const { name, email, password } = req.body;

    const emailExists = await prisma.user.findUnique({ where: { email } })

    if(emailExists) {
        res.status(400).json({ message: "Email already exists" });
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = await prisma.user.create({
        data: {
            name, 
            email,
            password: hashedPassword
        }
    });

    res.status(201)
        .json({ 
            status: "success", 
            data: 
                { 
                    user: {
                        id: user.id,
                        name: name,
                        email: email,
                    }
                }
    });

}

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email: email } })

    if(!user) {
        res.status(401).json({ message: "Email doesn't exist" });
        return;
    }

    if(!await bcrypt.compare(password, user.password)) {
        res.status(401).json({ message: "Invalid password or email" });
    }

    const token = generateToken(user.id, res)

    res.status(200).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token
        }
    })
}

export const logout = (req, res) => {

    res.clearCookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({
        status: "success",
        message: "Logged out successfully"
    })
}

