const Task = require('../model/task')


exports.pageview = async (req, res) => {
    try {

        const role = req.user.role

        if (role !== "subAdmin" && role !== "superAdmin") {
            return res.status(403).json({ message: "Access denied" });
        }
        const alldata = await Task.find()

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
        const data = await Task.create(passdata)

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
        const deletedata = await Task.findByIdAndDelete(deleteid)
      
        if (!deletedata) {
            res.status(404).json({
                status: "fail",
                message: "data not found"

            })
        }


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
exports.updatedata = async (req, res) => {
    try {
        const updateid = req.params.updateid
        const updatedata = await Task.findByIdAndUpdate(updateid, req.body, { new: true });
        if (!updatedata) {
            res.status(404).json({
                status: "fail",
                message: "data not found"

            })
        }

        res.status(200).json({
            status: "success",
            message: "data update successfull",
            data: updatedata
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message

        })
    }
}
