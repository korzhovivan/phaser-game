
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
        this.load.image('lvl_star_complete', 'assets/lvl_star_complete.png');
        this.load.image('lvl_star', 'assets/lvl_star.png');


        this.levels = []
    }
    create(){
        
        this.add.image(400,330,'lvl_bg').setScale(1.3)

        this.levels.push({image: this.add.image(150,400,'lvl_1'), completed: false, closed: false, stars: 0})
        this.levels.push({image: this.add.image(280,400,'lvl_close'), completed: false,closed:true, stars: 0})
        this.levels.push({image: this.add.image(410,400,'lvl_close'), completed: false,closed:true, stars: 0})
        this.levels.push({image: this.add.image(540,400,'lvl_close'), completed: false,closed:true, stars: 0})
        this.add.image(400,245,'lvl_select').setScale(0.8)
        
        this.levels.forEach((item, index) => {
            item.image.setInteractive()
        
            //Animation on hover
            item.image.on('pointerover', () => {
                this.levels[index].image.setScale(1.1)
                
            })
            item.image.on('pointerout', () => {
                this.levels[index].image.setScale(1) 
            })

            //Select lvl: Click
            if (!item.closed) {
                item.image.on('pointerup',()=>{
                    if (!item.closed) {
                        this.scene.start('SceneLvl_'  + (index + 1))
                    }
                    
                })
            }
            
            //If LVL is open: Drawing star
            if (!item.closed) {
                let imageName = 'lvl_star_complete';
                let xPlus = -40, yPlus = 70;

                for (let i = 0; i < 3; i++) {
                    if (item.stars == i) {
                        imageName = 'lvl_star'
                    }
                    this.add.image(item.image.x + xPlus, item.image.y + yPlus, imageName).setScale(0.4)

                    xPlus+=38;
                }
            }
            
        })
    }
    update(){
        
    }
    
}