export default class Level_1 extends Phaser.Scene{
    constructor(){
        super('Scene lvl 1')
    }
    
    preload (){
        this.load.image('sky', 'assets/podzemele.png');
        this.load.image('platform', 'assets/grass.png');
        this.load.image('ground', 'assets/grass-ground.png');
        this.load.image('blue-star', 'assets/blue-star.png');
        this.load.image('red-star', 'assets/red-star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('red-dude', 'assets/red-dude.png', { frameWidth: 31.5, frameHeight: 40 });
        this.load.spritesheet('blue-dude', 'assets/blue-dude.png', { frameWidth: 31.5, frameHeight: 40 });
        this.load.image('batut', 'assets/trampoline.png');
        //this.load.audio('menu-song', '../assets/menu-song.mp3');
    }
    create ()
    {
        function addKey (code)
        {
            var key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[code]);
            return key;
        }
        this.keyA = addKey.call(this, 'A');
        this.keyW = addKey.call(this, 'W');
        this.keyS = addKey.call(this, 'S');
        this.keyD = addKey.call(this, 'D');
        //SKY
        this.add.image(400, 300, 'sky');

        //PLATFORMS
        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 590, 'ground').setScale(3).refreshBody();

        this.platforms.create(320, 450, 'platform').setScale(0.3).refreshBody();
        this.platforms.create(70, 380, 'platform').setScale(0.5).refreshBody();
        //platforms.create(750, 260, 'platform').setScale(0.5).refreshBody();

        //batut
        this.batuts = this.physics.add.staticGroup();

        this.batuts.create(450, 506, 'batut').setScale(0.1).refreshBody();


        this.batuts.children.iterate(function (batut) {
            batut.body.setSize(batut.body.width,10);
            batut.body.collideWorldBounds = true;

            batut.body.checkCollision.down = false;
            batut.body.checkCollision.left = false;
            batut.body.checkCollision.right = false;
        });


        //PLAYER 1
        this.player1 = this.physics.add.sprite(100, 450, 'blue-dude');
        this.player1.score = 0;

        this.player1.setBounce(0.2);
        this.player1.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('blue-dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'blue-dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('blue-dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //PLAYER 2
        this.player2 = this.physics.add.sprite(700, 450, 'red-dude');
        this.player2.score = 0;
        this.player2.setBounce(0.2);
        this.player2.setCollideWorldBounds(true);
        

        this.anims.create({
            key: 'a_anim',
            frames: this.anims.generateFrameNumbers('red-dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'w_anim',
            frames: [ { key: 'red-dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'd_anim',
            frames: this.anims.generateFrameNumbers('red-dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //stars
        this.blue_stars = this.physics.add.group({
            key: 'blue-star',
            repeat: 5,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        this.red_stars = this.physics.add.group({
            key: 'red-star',
            repeat: 5,
            setXY: { x:420, y: 0, stepX: 70 }
        });
        this.red_stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.body.checkCollision.up = false;
        });
        this.blue_stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.body.checkCollision.up = false;
        });

        //colider
        this.physics.add.collider(this.player1,  this.platforms, this.jump_default_physic);
        this.physics.add.collider(this.player2,  this.platforms, this.jump_default_physic);

        this.physics.add.collider( this.blue_stars,  this.platforms);
        this.physics.add.collider( this.red_stars,  this.platforms);

        this.physics.add.collider(this.player2,  this.batuts, this.jump_physic);
        this.physics.add.collider(this.player1,  this.batuts, this.jump_physic);

        //collection stars
        this.physics.add.overlap(this.player2,  this.red_stars, this.collectStar, null, this);
        this.physics.add.overlap(this.player1,  this.blue_stars, this.collectStar, null, this);

        

        //CONTROL
        this.cursors = this.input.keyboard.createCursorKeys();


        //score
        this.scoreText1 = this.add.text(16, 16, 'score1: 0', { fontSize: '32px', fill: '#000' });
        this.scoreText2 = this.add.text(16, 40, 'score2: 0', { fontSize: '32px', fill: '#000' });
    }
    update ()
    {
        
        //first player
        if (this.cursors.left.isDown)
        {
            this.player1.setVelocityX(-160);

            this.player1.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player1.setVelocityX(160);

            this.player1.anims.play('right', true);
        }
        else
        {
            this.player1.setVelocityX(0);

            this.player1.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player1.body.touching.down)
        {
            this.player1.setVelocityY(-330);
        }

        //second player
        if (this.keyA.isDown)
        {
            this.player2.setVelocityX(-160);

            this.player2.anims.play('a_anim', true);
        }
        else if (this.keyD.isDown)
        {
            this.player2.setVelocityX(160);

            this.player2.anims.play('d_anim', true);
        }
        else
        {
            this.player2.setVelocityX(0);
            this.player2.anims.play('w_anim');
        }

        if (this.keyW.isDown && this.player2.body.touching.down)
        {
            this.player2.setVelocityY(-330);
        }
    }
    collectStar (player, star)
    {
        star.disableBody(true, true);

        player.score+=1;

        this.scoreText1.text = 'score1: '+ this.player1.score;
        this.scoreText2.text = 'score2: '+ this.player2.score;
    }
    jump_physic(player, batut){
        player.body.setBounceY(0.7);
        player.body.gravity.set(0, -330);
    }
    jump_default_physic(player){
        player.body.setBounceY(0.2);
        player.body.gravity.set(0, 0);
    }
}