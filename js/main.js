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
			this.load.image('traffic','assets/traffic.png')
			this.load.bitmapFont('carrier_font', 'assets/carrier_command.png', 'assets/carrier_command.xml');
			this.load.image('road','assets/road.png')
			
		},
		
		update: function()
		{
			this.background=this.game.add.tileSprite(0, 0,1024,600, 'traffic');
			this.game.add.image(150,1,'road');
			
			this.logo=this.game.add.bitmapText(230, 450, 'carrier_font','Traffic',52);
			this.logo.tint=0xFFFF00;
			
			
			//story lines
			this.game.add.bitmapText(400,150,'carrier_font','You are',14);
			this.game.add.bitmapText(350,190,'carrier_font','running late',14);
			this.game.add.bitmapText(320,230,'carrier_font','for an interview',14);
			this.game.add.bitmapText(289,270,'carrier_font','As you get on Rt. 7',14)
			this.game.add.bitmapText(300,310,'carrier_font','You have one goal:',14)
			this.game.add.bitmapText(400,395,'carrier_font','Avoid',18)
			
			
			//instructions to start
			this.game.add.bitmapText(250,550,'carrier_font','Left Arrow key to start',14)
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
			this.mainCar;
			this.traffic;
			this.road;
			this.keys;
			this.potHoles;
			this.time=100;
		}
		
	
	P2Game.StateB.prototype=
	{
		preload: function() 
		{
        //pre-loading the zombies
			this.load.image('mainRoad', 'assets/mainRoad.png');
			this.load.image('mainCar', 'assets/mainCar.png');
			this.load.image('car','assets/car.png')
			this.load.bitmapFont('carrier_font', 'assets/carrier_command.png', 'assets/carrier_command.xml');
		},
    

	
		create: function() 
		{
			
		//world boundary
			this.world.setBounds(0,0,800,600);
			this.game.add.image(0,0,'mainRoad');
			
			// starting physics:
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			this.game.add.bitmapText(300, 50, 'carrier_font','Time Left to Interview:',15);
			this.game.add.bitmapText(350, 150, 'carrier_font',this.time,30);
			// creating potholes
			//this.potHoles = this.add.group();
			
			//main character car
			this.mainCar = this.add.sprite(300,350,'mainCar');
			this.traffic=this.add.group();
			// adding the key
				// // this.key=this.add.sprite(600,200,'key');
				// // this.key.exists=false;
				
			
			// Creating 10 mummies, each initially dead
			this.traffic.createMultiple(50,"car",0,false);
			
			
			
			this.game.physics.enable(this.mainCar,Phaser.Physics.ARCADE);
			
				
			
			// bringing mummies to life!
				
			this.game.time.events.repeat(Phaser.Timer.SECOND*3, 100, this.resurrect,this );
			this.game.time.events.repeat(Phaser.Timer.SECOND,100,this.randKey,this)
	 
			// getting the key to move around and bounce
				// // this.key.body.collideWorldBounds=true;
				// // this.key.body.velocity.setTo(200,200);
				
				// // this.physics.arcade.collide(this.mummies,this.key);
				// // this.key.body.bounce.set(1);
		
		
				// Add some text using a CSS style.
			// Center it in X, and position its top 15 pixels from the top of the world.
				// // this.style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
				// // this.text = this.add.text( this.world.centerX, 15, "Don't Let the Monsters Get You!.", this.style );
				// // this.text.anchor.setTo( 0.5, 0.0 );
			
			
			this.keys = this.input.keyboard.createCursorKeys();
			
				
			
		
			
		
		
			
		},
		
		resurrect: function()
		{
			this.traffic.create(game.rnd.integerInRange(90,700), 50, 'car', null)
			this.traffic.y+=50;
		},
		
		randKey: function(){
				
				this.time-=1;
			},
		
		update: function()
		{
			//window.alert("here?");
		
		
		
			
				
			//inital bob speed
			// this.bob.body.velocity.x=0;
			// this.bob.body.velocity.y=0;
			
			if (this.keys.left.isDown)
			{
				this.mainCar.x-=50;	
			}
		
			if (this.keys.right.isDown)
			{
				this.mainCar.x+=50;	
			}
		
		
			
			if(this.physics.arcade.overlap(this.mainCar,this.traffic,null,null,this))
			{
				this.time-=10;
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
