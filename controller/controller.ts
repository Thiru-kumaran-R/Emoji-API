import { Context } from "https://deno.land/x/oak@14.2.0/context.ts";
import { objectId } from "https://deno.land/x/objectid@0.2.0/mod.ts";
import emojipedia from "../model/emoji.ts";

export const getEmoji = async (ctx: any) => {
  try {
    const unicode = ctx.params.unicode;
    const requestedEmoji = await emojipedia.findOne({ unicode: unicode });

    if (requestedEmoji) {
      return (ctx.response.body = {
        unicode: requestedEmoji.unicode,
        name: requestedEmoji.name,
        category: requestedEmoji.category,
        description: requestedEmoji.description,
        keywords: requestedEmoji.keywords,
      });
    }
    if (!requestedEmoji) {
      return (ctx.response.body = {
        unicode: unicode,
        message:
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

export const getRandom = async (ctx: Context) => {
  try {
    const randomUnicode = await emojipedia.aggregate([
      { $sample: { size: 1 } },
      { $project: { _id: 0, _v: 0 } },
    ]);

    return (ctx.response.body = {
      unicode: randomUnicode[0].unicode,
      name: randomUnicode[0].name,
      category: randomUnicode[0].category,
      description: randomUnicode[0].description,
      keywords: randomUnicode[0].keywords,
    });
  } catch (err) {
    return (ctx.response.body = {
      message: err.message,
      statusCode: 500,
    });
  }
};

export const postEmoji = async (ctx: Context) => {
  try {
    if (!ctx.request.hasBody) {
      return (ctx.response.body = {
        unicode: "Emoji is required !",
        message:
          "Name, Description, Category, keywords of the corresponding emoji should be included.",
      });
    }
    const { unicode, name, category, description, keywords } =
      await ctx.request.body.json();
    const newEmoji = new emojipedia({
      unicode: unicode,
      name: name,
      category: category,
      description: description,
      keywords: keywords,
    });
    await newEmoji.save();
    return (ctx.response.body = {
      id: newEmoji._id,
      unicode: newEmoji.unicode,
      name: newEmoji.name,
      category: newEmoji.category,
      description: newEmoji.description,
      keywords: newEmoji.keywords,
      statusCode: 200,
    });
  } catch (err) {
    return (ctx.response.body = {
      message: err.message,
      statusCode: 500,
    });
  }
};

export const deleteEmoji = async (ctx: any) => {
  try {
    const id = ctx.params.id;
    const deletedEmoji = await emojipedia.findOneAndRemove({
      _id: objectId(id),
    });

    if (deletedEmoji) {
      return (ctx.response.body = {
        unicode: deletedEmoji.unicode,
        message: "Emoji has been deleted successfully",
        statusCode: 200,
      });
    }

    if (!deletedEmoji) {
      return (ctx.response.body = {
        id: id,
        message: "Emoji does not exists! ",
        statusCode: 404,
      });
    }
  } catch (err) {
    return (ctx.response.body = {
      message: err.message,
      statusCode: 500,
    });
  }
};

export const patchEmoji = async (ctx: any) => {
  try {
    const { unicode, name, category, description, keywords } =
      await ctx.request.body.json();
    const tobeUpdatedUnicode = ctx.params.id;
    const updatedUnicode = await emojipedia.findOneAndUpdate({
      _id: objectId(tobeUpdatedUnicode),
    });

    if (!updatedUnicode) {
      return (ctx.reponse.body = {
        id: tobeUpdatedUnicode,
        message: `${unicode} does not exist! Try adding and updating it.`,
      });
    }

    if (updatedUnicode) {
      updatedUnicode!.unicode = unicode;
      updatedUnicode!.name = name;
      updatedUnicode!.category = category;
      updatedUnicode!.description = description;
      updatedUnicode!.keywords = keywords;
    }
    await updatedUnicode!.save();

    return (ctx.response.body = {
      id: tobeUpdatedUnicode,
      unicode: updatedUnicode.unicode,
      name: updatedUnicode.name,
      category: updatedUnicode.category,
      description: updatedUnicode.description,
      keywords: updatedUnicode.keywords,
      statusCode: 200,
    });
  } catch (err) {
    return (ctx.response.body = {
      message: err.message,
      statusCode: 500,
    });
  }
};
