import { Router } from "https://deno.land/x/oak@14.2.0/router.ts";

import * as emojiController from '../controller/controller.ts';

const router = new Router();

router.get('/:unicode', emojiController.getEmoji );

router.post('/', emojiController.postEmoji );

router.patch('/:unicode', emojiController.patchEmoji )

router.delete('/:unicode', emojiController.deleteEmoji );

export default router;