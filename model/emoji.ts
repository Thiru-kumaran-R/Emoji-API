import { model, Schema } from "npm:mongoose@^6.7";

const emojiSchema  = new Schema({
    unicode : {
        type : String,
        unique : true
    },
    name : String ,
    category : String,
    description : String,
    keywords : [String]

});

export default model('emojipedia', emojiSchema )