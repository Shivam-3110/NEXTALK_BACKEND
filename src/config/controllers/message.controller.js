
//get all user except the current user
export const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({id:{$ne:userId}}).select("-password");
// count unSeen message for each user
     const unseenMessages = {}
     const promises = filteredUsers.map(async (user)=>{
        const messages = await Message.find({senderId:user._id, receiverId:userId, seen:false});
        if(messages.length>0){
            unseenMessages[user._id] = messages.length;

     } })
await Promise.all(promises);
  res.json({users:filteredUsers, unseenMessages});
    } catch (error) {
        console.log(error.message);
        res.json({message:error.message});
    }}

    // get all messages between two users

    export const getMessages = async (req, res) => {
        try {
            
            const{id:selectedUserId} = req.params;
            const myId = req.user._id;

            const messages = await Message.find({
                $or:[
                    {senderId:myId, receiverId:selectedUserId},
                    {senderId:selectedUserId, receiverId:myId}
                ]
            })
            await Message.updateMany({senderId:selectedUserId, receiverId:myId}, {seen:true});
            res.json(messages);



        } catch (error) {
               console.log(error.message);
        res.json({message:error.message});
        }
    }

    // api to mark messages as seen
    export const markMessagesAsSeen = async (req, res) => {
        try {
            const{id } = req.params;
            await Message.findByIdAndUpdate(id, {seen:true});
            res.json({message:"message marked as seen"});
        } catch (error) {
                  console.log(error.message);
        res.json({message:error.message});
        }
    }