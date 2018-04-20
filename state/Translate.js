import {MobxTranslate} from 'mobx-translate'

import CS from '../locales/CS'
import EN from '../locales/EN'

const translateInstance = new MobxTranslate();

translateInstance.loadStrings('CS', CS);
translateInstance.loadStrings('EN', EN);
translateInstance.setLanguage('CS');

export const trans = translateInstance;