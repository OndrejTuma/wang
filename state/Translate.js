import {MobxTranslate} from 'mobx-translate'

import CS from '../locales/CS'
import EN from '../locales/EN'

const translateInstance = new MobxTranslate();

translateInstance.loadStrings('cs', CS);
translateInstance.loadStrings('en', EN);

translateInstance.setLanguage(
    TRANSLATION_LANG
);

export const trans = translateInstance;