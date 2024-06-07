import { Router } from "https://deno.land/x/oak@14.2.0/router.ts";
import { validator } from '../validation/validation.ts'
import * as emojiController from '../controller/controller.ts';

const router = new Router();

router.get('/random', emojiController.getRandom );

router.get('/:unicode', emojiController.getEmoji );

router.post('/', emojiController.postEmoji );

router.patch('/:id', emojiController.patchEmoji )

router.delete('/:id', emojiController.deleteEmoji );

export default router;