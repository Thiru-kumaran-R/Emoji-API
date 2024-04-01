import { z } from "https://deno.land/x/zod/mod.ts";
import { ZodError } from "https://deno.land/x/zod@v3.22.4/ZodError.ts";

const emojiQuestion = z.object({
    unicode : z.string().trim().max(1).emoji(),
    name : z.string(),
    category : z.string(),
    description : z.string(),
    keywords : z.array( z.string() ).nonempty({ message : 'Key' }).min(3)
})
.strict();

type SuccesResponse = {
    success: boolean;
    data: {
        unicode: string;
        name: string;
        category: string;
        description: string;
        keywords: string[];
    }
}

type ErrorResponse = {
    success: boolean;
    error: ZodError;
}

type Response = ErrorResponse | SuccesResponse ;

export const validator = (ctx : any) => {
    const isError : Response  = emojiQuestion.safeParse(ctx.request.body.json());
    if(!isError.success){
        return ctx.response.body = {
            message : {
                unicode : 'Unicode must be an emoji',
                name : 'Name should be a single string',
                category : 'Make sure you provide a valid category',
                description : 'Provide a precise defination of the unicode',
                keywords : 'Keywords should be an array with minimum of 3 words'
            }
        }
    }
}

