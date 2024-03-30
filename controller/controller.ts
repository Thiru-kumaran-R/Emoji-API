import { Context } from "https://deno.land/x/oak@14.2.0/context.ts";

import emojipedia from "../model/emoji.js";

export const getEmoji = async (ctx: any) => {
  try {
    const unicode = ctx.params.unicode;
    const requestedEmoji = await emojipedia.findOne({ unicode : unicode });

    if (requestedEmoji) {
      return (ctx.response.body = { 
        unicode : requestedEmoji.unicode,
        name : requestedEmoji.name,
        category : requestedEmoji.category,
        description : requestedEmoji.description,
        keywords : requestedEmoji.keywords,
       });
    }
    if (!requestedEmoji) {
      return (ctx.response.body = {
        unicode : unicode ,
        meaning:
          "Emoji does not exist! Try posting this emoji along with its meaning",
      });
    }
  } catch (err) {
    return (ctx.response.body = {
      message: err.message,
      statusCode: ctx.response.status,
    });
  }
};

export const postEmoji = async (ctx: Context) => {
  try {
    if (!ctx.request.hasBody) {
      return (ctx.response.body = {
        unicode : "Emoji is required !",
        message : "Name, Description, Category, keywords of the corresponding emoji should be included.",
      });
    }
    const { unicode, name, category, description, keywords } = await ctx.request.body.json();
    const newEmoji = new emojipedia({
      unicode : unicode,
      name : name,
      category : category,
      description : description,
      keywords : keywords
    });
    await newEmoji.save();
    return (ctx.response.body = {
        unicode : newEmoji.unicode,
        name : newEmoji.name,
        category : newEmoji.category,
        description : newEmoji.description,
        keywords : newEmoji.keywords,
        statusCode: 200,
    });
  } catch (err) {
    return (ctx.response.body = {
      message: err.message,
      statusCode: 500,
    });
  }
};

export const deleteEmoji = async ( ctx: any ) => {
  try {
    const unicode = ctx.params.unicode;
    const deletedEmoji = await emojipedia.findOneAndRemove({ unicode : unicode });

    if (deletedEmoji) {
      return (ctx.response.body = {
        unicode: unicode,
        message: "Emoji has been deleted successfully",
        statusCode: 200,
      });
    }

    if (!deletedEmoji) {
      return (ctx.response.body = {
        unicode : unicode,
        meaning: "Emoji does not exists! ",
        statusCode: 404,
      });
    }
  } catch (err) {
    return ctx.response.body = {
        message: err.message,
        statusCode: 500,
    };
  }
};

export const patchEmoji = async(ctx : any ) => {
    try {
        const {unicode, name, category, description, keywords } = await ctx.request.body.json();
        const tobeUpdatedUnicode = ctx.params.unicode;
        const updatedUnicode = await emojipedia.findOneAndUpdate({unicode : tobeUpdatedUnicode});
        
        if(!updatedUnicode){
            return ctx.reponse.body = {
                unicode : unicode,
                message : `${unicode} does not exist! Try adding and updating it.`
            }
        }

        if(updatedUnicode){
            updatedUnicode!.unicode = unicode;
            updatedUnicode!.name = name;
            updatedUnicode!.category = category;
            updatedUnicode!.description = description;
            updatedUnicode!.keywords = keywords
        }
        await updatedUnicode!.save()

        return ctx.response.body = {
            unicode : updatedUnicode.unicode,
            name : updatedUnicode.name,
            category : updatedUnicode.category,
            description : updatedUnicode.description,
            keywords : updatedUnicode.keywords,
            statusCode: 200,
        }

    }catch (err) {
        return ctx.response.body = {
            message: err.message,
            statusCode: 500,
        };
    }
}