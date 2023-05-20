import { upperFirst } from 'lodash';

import { customToast } from 'components/Toast';

export const showCustomToast = (message: string) => customToast(upperFirst(message));
