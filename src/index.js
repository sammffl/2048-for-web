/**
 * Created by SamMFFL on 2017/9/23.
 */

import 'flexible';
import './assets/styles/index.scss';
import Game from './utils/game';

let game = new Game({needAlias: true});
game.init();


document.querySelector('#newGame').addEventListener('click', function bindNewGameSubmit() {
    game.test();
}, false);