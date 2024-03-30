import { Application } from "https://deno.land/x/oak@14.2.0/application.ts";
import mongoose from "npm:mongoose@^6.7";

import emojiRouter  from './routers/routers.ts';

const app = new Application();

app.use( async (ctx, next) => {
    ctx.response.headers.set('Access-Control-Allow-Origin', '*');
    ctx.response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    await next()
})

app.use(emojiRouter.routes());
app.use(emojiRouter.allowedMethods())

try{
    await mongoose.connect('mongodb+srv://thiru:jjhtrF0HFn55rhrI@firstproject.27hr6ge.mongodb.net/emojis');
    await app.listen( {port : 3000} )
}
catch (err) {
    console.log(err);
}