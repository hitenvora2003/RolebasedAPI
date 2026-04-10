const user = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.pageview = async (req, res) => {
    try {
        const role = req.user.role

        if (role !== "subAdmin" && role !== "superAdmin") {
            return res.status(403).json({ 
                   message: "Access denied" });
        }
        const alldata = await user.find()

        res.status(200).json({
            status: "success",
            message: "data find successfull",
            data: alldata
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message

        })
    }
}
exports.createdata = async (req, res) => {
    try {
        let passdata = req.body
        passdata.password = await bcrypt.hash(passdata.password, 10)

        if (!passdata.role) {
            passdata.role = "user";
        }
        const data = await user.create(passdata)

        res.status(200).json({
            status: "success",
            message: "data create successfull",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message

        })
    }
}
exports.deletedata = async (req, res) => {
    try {
        const deleteid = req.params.deleteid
        const deletedata = await user.findByIdAndDelete(deleteid)
        console.log(deletedata)


        res.status(200).json({
            status: "success",
            message: "data delete successfull",
            data: deletedata
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message

        })
    }
}
exports.login = async (req, res) => {
    try {
        let passdata = req.body
        const emailverify = await user.findOne({
            $or: [
                { name: passdata.name },
                { email: passdata.email },

            ]
        })
        console.log(emailverify);
        if (!emailverify) throw new Error('invalid name or email');

        const passverify = await bcrypt.compare(
            passdata.password,
            emailverify.password
        )
        console.log(passverify);

        if (!passverify) throw new Error('invalid password')

        const token = jwt.sign({ id: emailverify._id }, 'ten')

        res.status(200).json({
            status: "success",
            message: "User login successfull",
            role: emailverify.role,
            data: emailverify, token
        })


    }catch(error) {

        res.status(401).json({
            status: "fail",
            message: error.message

        })
    }
}



