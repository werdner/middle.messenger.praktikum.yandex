import { router } from '../../src/core/Router';
import './index.css';
import { NavBar } from '../../src/common/components/ui/navBar/navBar';
import { render } from '../../src/core/vdom/render';

const body = document.querySelector('body');
const nav = render(new NavBar().render());
body.prepend(nav);

router.start('/sign-in');
