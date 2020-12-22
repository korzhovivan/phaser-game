
import Level_1 from './Level_1.js';
import LoadScene from './LoadScene.js';
import MenuScene from './MenuScene.js';
import ChooseLevelScene from './ChooseLevelScene.js';
import OptionsScene from './OptionsScene.js';


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 650 },
            debug: false
        }
    },
    parent: 'game',
    scene: [ChooseLevelScene]
    
};

const game = new Phaser.Game(config);

















