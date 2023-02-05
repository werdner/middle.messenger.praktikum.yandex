import { router } from '../../src/core/Router';
import { NavBar } from '../../src/common/components/ui/navBar/index';
import { render } from '../../src/core/vdom/render';
import './index.css';

const body = document.querySelector('body');
const main = document.querySelector('main')
const nav = render(new NavBar().getContent())

main.prepend(nav)
body.append(main)

router.start('/sign-in');
