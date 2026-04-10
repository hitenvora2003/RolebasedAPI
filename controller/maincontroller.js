const user = require('../model/user')
const task = require('../model/task')

exports.getalldata = async(req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit

       const type = req.query.type?.toLowerCase();

       if(!type){
         const[users,tasks,totalusers,totaltasks,] = await Promise.all([
           user.find().sort({createdAt : -1}).skip(skip).limit(limit),
           task.find().sort({createdAt : -1}).skip(skip).limit(limit),

           user.countDocuments(),
           task.countDocuments(),
         ])
         return res.status(200).json({
            status : 'success',
            message : 'pagination successfull',
            page,limit,
            totalusers,totaltasks,
            data :{users,tasks}
         })
        }
        if(type === 'user'){
            const users = await user.find()
            .sort({createdAt : -1})
            .skip(skip)
            .limit(limit)

        const totalusers = await user.countDocuments()
        
         return res.status(200).json({
            status : 'success',
            page,limit,
            totalusers,
            data :users
         })

            
        }
        if(type === 'task'){
            const tasks = await task.find()
            .sort({createdAt : -1})
            .skip(skip)
            .limit(limit)

        const totaltasks = await task.countDocuments()
        
         return res.status(200).json({
            status : 'success',
            page,limit,
            totaltasks,
            data :tasks
         })

            
        }
}catch(error){
    res.status(500).json({
            status : 'fail',
            message : error.message
           
         })
    
}

}