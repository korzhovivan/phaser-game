
export default class ChooseLevelScene extends Phaser.Scene{

    constructor(){
        super('ChooseLevelScene')
    }
    
    preload(){
        this.load.image('lvl_select', 'assets/level-select.png');
        this.load.image('lvl_bg', 'assets/lvl_bg.png');
        this.load.image('lvl_1', 'assets/lvl_1.png');
        this.load.image('lvl_2', 'assets/lvl_2.png');
        this.load.image('lvl_3', 'assets/lvl_3.png');
        this.load.image('lvl_close', 'assets/lvl_close.png');

        this.levels = []
    }
    create(){
        
        this.add.image(400,330,'lvl_bg').setScale(1.3)

        this.levels.push(this.add.image(150,400,'lvl_1'))
        this.levels.push(this.add.image(270,400,'lvl_2'))
        this.levels.push(this.add.image(390,400,'lvl_3'))
        this.levels.push(this.add.image(510,400,'lvl_close'))
        this.add.image(400,245,'lvl_select').setScale(0.8)
        
        this.levels.forEach((item, index) => {
            item.setInteractive()
            item.on('pointerover', () => {
                this.levels[index].setScale(1.1)
                
            })
            item.on('pointerout', () => {
                this.levels[index].setScale(1)
                
            })
        })
    }
    update(){

    }
}