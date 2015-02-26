window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
	
	var P2Game = {};
	
	P2Game.StateA = function (game) {

		this.message;
		this.cursors;
		this.logo;
		this.background;
		this.text;
		this.style;
	};
	
	P2Game.StateA.prototype = 
	{
		
		
		 gotoStateB: function () 
		{

			this.state.start('StateB');

		},
		
		preload: function()
		{
			this.load.image('worldBack','assets/metal.png')
			
		},
		
		update: function()
		{
			this.background=this.game.add.tileSprite(0, 0,800,600, 'worldBack');
			
			this.style = {font: "25px Arial", fill: "#00FF0A", align: "center" };
			this.text = this.add.text( this.world.centerX, 150, "Once upon a time phaser-dude bob " +
				"lost his dog.\n He searched and he searched but to no avail.\n Until one day, a message showed up at his house\n" +
				" if you want you dog back, go to the Lair of the Monsters,\n find the 3 hidden keys and only then will you get" + 
				"back you dog!\n So Bob went....... \n\n(Press the Left Arrow, <- , to begin)", this.style );
			this.text.anchor.setTo( 0.5, 0.0 );
			
			
			this.cursors = this.input.keyboard.createCursorKeys();
			if (this.cursors.left.isDown)
			{
				this.gotoStateB();
			}
		}
	
	}
	
	
	P2Game.StateD=function(game){
		this.cursors;
		this.style;
		this.text;
	}
	
	P2Game.StateD.prototype=
	{
		gotoStateA: function () 
		{

			this.state.start('StateA');

		},
		
		update: function()
		{
			
			this.cursors = this.input.keyboard.createCursorKeys();
			
			this.style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
			this.text = this.add.text( this.world.centerX, 15, "You Win!\nTo play the next level please\nSend your credit card info to mahmad15@gmu.edu\n(To Restart press the left arrow)", this.style );
			this.text.anchor.setTo( 0.5, 0.0 );
			
			if (this.cursors.left.isDown)
			{
				this.gotoStateA();
			}
			
			
		}
	
	}
	
	P2Game.StateC = function (game) {

		this.message;
		this.cursors;
		this.logo;
		this.text;
		this.style;
		
	};
	
	P2Game.StateC.prototype = 
	{
		
		
		 gotoStateB: function () 
		{

			this.state.start('StateB');

		},
		
		
	
		
		update: function()
		{
			
			this.cursors = this.input.keyboard.createCursorKeys();
			
			this.style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
			this.text = this.add.text( this.world.centerX, 15, "You Lose! Want to Play Again? Press The Left Arrow!", this.style );
			this.text.anchor.setTo( 0.5, 0.0 );
			
			if (this.cursors.left.isDown)
			{
				this.gotoStateB();
			}
		
		}
	
	}
    
	
	P2Game.StateB = function(game)
		{
			this.mummies;
			this.bob;
			this.keys;
			this.text;
			this.style;
			this.key;
		}
	
	P2Game.StateB.prototype=
	{
		preload: function() 
		{
        //pre-loading the zombies
			this.load.spritesheet('bob', 'assets/phaser-dude.png');
			this.load.spritesheet('mummy', 'assets/metalslug_monster39x40.png',39,40,16);
			this.load.spritesheet('key','assets/key.png',32,24);
			this.game.stage.backgroundColor = '#000000';
		},
    

	
		create: function() 
		{
			
		//world boundary
			this.world.setBounds(0,0,800,600);
			
		//starting physics:
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		//creating mummies
			this.mummies = this.add.group();
		//and bob
			this.bob = this.add.sprite(300,100,'bob');
		//adding the key
			this.key=this.add.sprite(600,200,'key');
			this.key.exists=false;
			
		
		//Creating 10 mummies, each initially dead
			this.mummies.createMultiple(50,"mummy",0,false);
		
			this.game.physics.enable(this.key,Phaser.Physics.ARCADE);
			this.game.physics.enable(this.mummies,Phaser.Physics.ARCADE);
			this.game.physics.enable(this.bob,Phaser.Physics.ARCADE);
		
		//bringing mummies to life!
			
			this.game.time.events.repeat(Phaser.Timer.SECOND/2, 100, this.resurrect,this );
			this.game.time.events.repeat(Phaser.Timer.SECOND,100,this.randKey,this)
 
        //getting the key to move around and bounce
			this.key.body.collideWorldBounds=true;
			this.key.body.velocity.setTo(200,200);
			
			this.physics.arcade.collide(this.mummies,this.key);
			this.key.body.bounce.set(1);
	
	
			// Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
			this.style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
			this.text = this.add.text( this.world.centerX, 15, "Don't Let the Monsters Get You!.", this.style );
			this.text.anchor.setTo( 0.5, 0.0 );
		
		
			this.keys = this.input.keyboard.createCursorKeys();
		
			
		},
	
		randKey: function(){
			
			if(!this.key.exists)
			{
				this.key.exists=true;
			}
			
			this.key.x=this.rnd.integerInRange(0,800);
			this.key.y=this.rnd.integerInRange(0,600);
			
		},
	
	
		resurrect: function()
		{
			
		
			
		 //Get a dead item
			var item = this.mummies.getFirstDead();
			
			if (item)
			{
			 //And bring it back to life
				item.reset((this.world.randomX + (this.key.x)), (this.world.randomY+(this.key.y)));

			 //This just changes its frame
				item.frame = this.rnd.integerInRange(0, 36);
			
			//getting the mummies to run
				item.animations.add('walk');

				item.animations.play('walk', 30, true);
			
			//and move towards cursor
				item.rotation = this.physics.arcade.moveToObject( item,this.bob, 200+this.rnd.integerInRange(10,200) );
				item.checkWorldBounds=true;
			}

			
		},
	
		update: function()
		{
			//window.alert("here?");
		
		
		
			
				
			//inital bob speed
			this.bob.body.velocity.x=0;
			this.bob.body.velocity.y=0;
			
			if (this.keys.left.isDown)
			{
				this.bob.body.velocity.x=-200;	
			}
		
			if (this.keys.right.isDown)
			{
				this.bob.body.velocity.x=200;	
			}
		
			if (this.keys.up.isDown)
			{	
				this.bob.body.velocity.y=-200;	
			}
		
			if (this.keys.down.isDown)
			{	
				this.bob.body.velocity.y=200;
			}
	
			if(this.physics.arcade.overlap(this.bob,this.mummies,null,null,this))
			{
				this.bob.kill();
				this.bob.exists=false;	
				this.goToStateC();
			}
			
			if(this.physics.arcade.overlap(this.bob,this.key,null,null,this))
			{
				this.goToStateD();
			}
			
			
				
			
		
		},
		
		goToStateC: function () 
		{

			this.state.start('StateC');

		},
		
		goToStateD: function () 
		{

			this.state.start('StateD');

		}
	}
	var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );
    
	game.state.add('StateA', P2Game.StateA);
	game.state.add('StateB', P2Game.StateB);
	game.state.add('StateC', P2Game.StateC);
	game.state.add('StateD', P2Game.StateD);
	game.state.start('StateA');
    
    
 };
