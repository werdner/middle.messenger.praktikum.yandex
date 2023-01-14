import {router} from '../../src/utils/Router'
import './index.css'
import {NavBar} from "../../src/common/components/ui/navBar/navBar";

const body = document.querySelector('body')
body.prepend(new NavBar().render())

router.start('/sign-in')
