import { router } from '../../src/core/Router';
import './index.css';

const body = document.querySelector('body');
const main = document.querySelector('main');

if (body && main) {
    body.append(main);
}

router.start();
