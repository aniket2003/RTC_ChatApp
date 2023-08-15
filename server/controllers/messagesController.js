const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req,res, next) => {

    try{

        const {from , to , message} = req.body;
        const data = await messageModel.create({

            message: {text: message},
            users: [from , to],
            sender: from,
        });

        if(data){
            return res.json({msg: "Message added successfully."});
        }else{
            return res.json({msg: "Failed to add message to the database."});
        }

    }catch(err){
        next(err);
    }

};

module.exports.getAllMessage = async (req,res, next) => {
    //  console.log(req);

    try{


        const { from , to } = req.body;
        // console.log("from: ", from, " to: ", to);
        const messages = await messageModel.find({
            users: {
                $all: [from,to],
            },
        })
        .sort({updateAt: 1});
        const projectMessages = messages.map((msg)=>{
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        // console.log(projectMessages);
        res.json(projectMessages);

    }catch(err){
        next(err);
    }
};