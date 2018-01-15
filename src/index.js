/**
 * Created by SamMFFL on 2017/9/23.
 */

import 'flexible';
import './assets/styles/index.scss';
import Game from './utils/game';

let game = new Game({needAlias: false});
game.startGame();


document.querySelector('#newGame').addEventListener('click', function bindNewGameSubmit() {
    game.startGame();
}, false);