// Object Pattern : Pseudoclassical Pattern

// objet "Class"
var objet = function( px, py, w, h){

	this.pos    = {x:px, y:py};
	this.width  = w;
	this.height = h;
}

objet.prototype.xmove = function( amount ){
	this.pos.x += amount;
	
	if(this.pos.x < 0){
		this.pos.x = 0;
	}
	if(this.pos.x > 1024){
		this.pos.x = 824;
	}
	return this; // enable cascading code style (optional)
}

objet.prototype.ymove = function( amount ){
	this.pos.y += amount;
	return this; 
}



objet.prototype.collision = function( pos ){
	return pos.x>= this.pos.x && pos.x <= this.pos.x+this.width && pos.y >= this.pos.y && pos.y <= this.pos.y+this.height;
}

objet.prototype.getPosition = function(){
	return this.pos;
}


// brique "Class"
var brique = function(px, py){
	this.pos    = {x:px, y:py};
	this.width  = 70;
	this.height = 50;
	this.dead   = false;
	this.nbrVie = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
	this.incassable = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
	this.bonus = Math.floor(Math.random() * (16 - 1 + 1)) + 1;
}
brique.prototype.constructor = brique;

brique.prototype.collision = function( pos ){
	return pos.x>= this.pos.x && pos.x <= this.pos.x+this.width && pos.y >= this.pos.y && pos.y <= this.pos.y+this.height;
}

brique.prototype.getPosition = function(){
	return this.pos;
}


// barre "subclass", inherite from objet
var barre = function( width ){
	objet.call(this, (1024-200)/2, 780-50, width , 50);
	this.nbrVie = 2;
}
barre.prototype = Object.create(objet.prototype);
barre.prototype.constructor = barre;

// Balle "subclass", inherit from objet
var Balle = function( from ){
	objet.call(this);
	this.pos.y = from.pos.y -from.height;
	this.pos.x = (from.pos.x+0.5*from.width);
	this.bougeX = 5;
	this.bougeY = -5;
	this.dead   = false;
}
Balle.prototype = Object.create(objet.prototype);
Balle.prototype.fly = function(){
	if(this.pos.y < 0){
		this.bougeY = 5;
		if(octopus.vitesseAugmente == true){
			this.bougeY = this.bougeY*2;
		}
	}
	if(this.pos.y > 780){
		this.bougeY = -5;
		if(octopus.vitesseAugmente == true){
			this.bougeY = this.bougeY*2;
		}
	}
	if(this.pos.x < 0){
		this.bougeX = 5;
		if(octopus.vitesseAugmente == true){
			this.bougeX = this.bougeX*2;
		}
	}
	if(this.pos.x > 1004){
		this.bougeX = -5;
		if(octopus.vitesseAugmente == true){
			this.bougeX = this.bougeX*2;
		}
	}
	this.ymove( this.bougeY);
	this.xmove( this.bougeX);
}
Balle.prototype.out = function(){
	return this.pos.y<-100;
}
Balle.prototype.xmove = function( amount ){
	this.pos.x += amount;
	return this; 
}

Balle.prototype.collision = function( pos ){
	return pos.x>= this.pos.x && pos.x <= this.pos.x+this.width && pos.y >= this.pos.y && pos.y <= this.pos.y+this.height;
}


// Missile "subclass", inherit from objet
var Missile = function( from, position = 0 ){
	objet.call(this);
	this.pos.y = from.pos.y -from.height;
	this.pos.x = (from.pos.x+position*from.width);
	this.bougeY = -5;
	this.dead   = false;
}
Missile.prototype = Object.create(objet.prototype);
Missile.prototype.constructor = Missile;
Missile.prototype.fly = function(){
	if(this.pos.y > 780){
		this.bougeY = -5;
	}
	this.ymove( this.bougeY);
}
Missile.prototype.out = function(){
	return this.pos.y<-100;
}
Missile.prototype.ymove = function( amount ){
	this.pos.y += amount;
	return this; 
}

Missile.prototype.collision = function( pos ){
	return pos.x>= this.pos.x && pos.x <= this.pos.x+this.width && pos.y >= this.pos.y && pos.y <= this.pos.y+this.height;
}





var model = {
	
	briques : [],

	balles : [],

	missiles : [],
	
	barre : null,

	nbrBrique : 0,


	changeLevel : function(level){
		switch(level){
			case 1:
				for (var i=0; i<4; i++){
					for( var j=0; j<8; j++){
						this.briques.push( new brique( 150+j*90, i*90) );
						if(this.briques[this.briques.length-1].incassable != 2 ){
							this.nbrBrique++;
						}
						
					}
				}
    		break;
  			case 2:
				for (var i=0; i<6; i++){
					for( var j=0; j<6; j++){
						this.briques.push( new brique( 150+j*120, i*90) );
						if(this.briques[this.briques.length-1].incassable != 2 ){
							this.nbrBrique++;
						}
					}
				}
			break
  			case 3:
				for (var i=0; i<6; i++){
					for( var j=0; j<3; j++){
						this.briques.push( new brique( 150+j*90, i*90) );
						if(this.briques[this.briques.length-1].incassable != 2 ){
							this.nbrBrique++;
						}
					}
					for( var j=0; j<3; j++){
						this.briques.push( new brique( 600+j*90, i*90) );
						if(this.briques[this.briques.length-1].incassable != 2 ){
							this.nbrBrique++;
						}
					}
				}
    		break;
			case 4:
				for(var j=0; j<2; j++){
					for (var i=0; i<6; i++){
						this.briques.push( new brique( 240+450*j, i*90) );
						if(this.briques[this.briques.length-1].incassable != 2 ){
							this.nbrBrique++;
						}
					}
				}
				for(var j=2; j<7; j++){
					for (var i=0; i<2; i++){
						if(i==1)
							this.briques.push( new brique( 150+90*j, 0) );
						else
							this.briques.push( new brique( 150+90*j, 450) );
						if(this.briques[this.briques.length-1].incassable != 2 ){
							this.nbrBrique++;
						}
					}
				}
    		break;
			case 5 :
				for (var i=0; i<4; i++){
					for( var j=0; j<i+1; j++){
						this.briques.push( new brique( 150+j*90, i*90) );
						if(this.briques[this.briques.length-1].incassable != 2 ){
							this.nbrBrique++;
						}
					}
				}
				for (var i=0; i<4; i++){
					for( var j=0; j<i+1; j++){
						this.briques.push( new brique( 780-j*90, i*90) );
						if(this.briques[this.briques.length-1].incassable != 2 ){
							this.nbrBrique++;
						}
					}
				}
				for (var i=0; i<2; i++){
					for( var j=0; j<8; j++){
						this.briques.push( new brique( 150+j*90, i*90+360) );
						if(this.briques[this.briques.length-1].incassable != 2 ){
							this.nbrBrique++;
						}
					}
				}
			break;
			case 6:
				for (var i=0; i<4; i++){
					for( var j=0; j<i+1; j++){
						this.briques.push( new brique( 150+j*90, i*90) );
						if(this.briques[this.briques.length-1].incassable != 2 ){
							this.nbrBrique++;
						}
					}
				}
				for (var i=0; i<4; i++){
					for( var j=0; j<i+1; j++){
						this.briques.push( new brique( 780-j*90, i*90) );
						if(this.briques[this.briques.length-1].incassable != 2 ){
							this.nbrBrique++;
						}
					}
				}
				for (var i=0; i<3; i++){
					for( var j=0; j<8; j++){
						this.briques.push( new brique( 150+j*90, i*90+360) );
						if(this.briques[this.briques.length-1].incassable != 2 ){
							this.nbrBrique++;
						}
					}
				}
			break

		}
		document.getElementById("niveau").innerHTML = "Niveau : " + level;
	},

	
	init : function(level){
		this.nbrBrique = 0;
		// add a bunch of briques
		model.changeLevel(1);
		this.barre = new barre(200);
	}, 

	updateBalles : function(){
		this.balles.forEach( function(elem){ elem.fly(); } );
		this.balles = this.balles.filter( function(elem){ return !elem.out(); } );
	}, 

	

	findCollision : function(){
		for( var i=0; i<this.balles.length; i++){
			var m = this.balles[i];
			for( var j=0; j<this.briques.length; j++){
				var a = this.briques[j];
				if ( a.collision( m.getPosition() ) ){
					a.nbrVie -= 1;
					if(a.nbrVie == 0 && a.incassable != 2){
						this.nbrBrique--;
						a.dead = true;
						switch (a.bonus) {
							case 1:
								octopus.fire();
								this.balles[this.balles.length-1].bougeX = -5;
								octopus.fire();
								this.balles[this.balles.length-1].bougeX = 5;
								octopus.fire();
								this.balles[this.balles.length-1].bougeX = 2;
						  	break;

							case 2:
								this.barre = new barre(400);
						  	break;

							case 3:
								octopus.fireMissile();
								octopus.fireMissile();
						  	break;
							case 4: 
								octopus.move = octopus.move*4;
								let returnBegin = setTimeout(() => {
									octopus.move = 30;
								}, 30000);
								returnBegin;
							break;
							case 5: 
								octopus.move = octopus.move*0.1;
								let returnBeginMalus = setTimeout(() => {
									octopus.move = 30;
								}, 30000);
								returnBeginMalus;
							break;
							case 6: 
								if(octopus.inverse == false){
									let left = octopus.moveBarreLeftValue;
									let right = octopus.moveBarreRightValue;
									octopus.moveBarreLeftValue = right;
									octopus.moveBarreRightValue = left;
									octopus.inverse = true;
									let returnNormalDirection = setTimeout(() => {
										let left = octopus.moveBarreLeftValue;
										let right = octopus.moveBarreRightValue;
										octopus.moveBarreLeftValue = right;
										octopus.moveBarreRightValue = left;
										octopus.inverse = false;
									}, 15000);
									returnNormalDirection;
								}
							break;
							case 7:
								if(octopus.vitesseAugmente == false){
									octopus.vitesseAugmente = true;
									for(var a = 0; a < model.balles.length; a++){
										this.bougeY = this.bougeY*2;
										this.bougeX = this.bougeX*2;
									}
									let returnNormalVitesse = setTimeout(() => {
										for(var a = 0; a < model.balles.length; a++){
											this.vitesseAugmente = false;
											this.bougeY = this.bougeY/2;
											this.bougeX = this.bougeX/2;
										}
										octopus.vitesseAugmente = false;
									}, 5000);
									returnNormalVitesse;
								}
							break;

					  	}
					}
					if(m.bougeY == -5 || m.bougeY == -10){
						m.bougeY = 5;
						if(octopus.vitesseAugmente == true){
							m.bougeY = m.bougeY*2;
						}
					}else{
						m.bougeY = -5;
						if(octopus.vitesseAugmente == true){
							m.bougeY = m.bougeY*2;
						}
					}
					break;
				}
			}
		}
		this.briques   = this.briques.filter  ( function(elem){ return elem.dead==false;} );

	
	},

	findCollisionBarre : function(){
		for( var i=0; i<this.balles.length; i++){
			var m = this.balles[i];
			
				var a = this.barre;
				if ( a.collision( m.getPosition() ) ){
						m.bougeY = -5;
					break;
				}
			
		}
	}
}


var octopus = {
	pause : false,
	level : 1,
	moveBarreLeftValue : -30,
	moveBarreRightValue : 30,
	barreInverse : false,
	vitesseAugmente : false,
	init : function(){
		model.balles = [];
		model.init(this.level);
		viewBarre.init();
		octopus.animationID = window.requestAnimationFrame(octopus.step);
	}, 

	getBarrePosition : function(){
		return model.barre.pos;
	},

	getBalles : function(){
		return model.balles;
	},

	getBriques : function(){
		return model.briques;
	},

	moveBarre : function( amount ){
		model.barre.xmove( amount );
	},


	fire : function(){
		model.balles.push( new Balle( model.barre ) );
	},

	fireMissile : function(){
		model.missiles.push( new Missile( model.barre, model.barre.pos ) );
	},


	step : function(){
		var lost = false; 
		// check for win or lost
		if(( model.nbrBrique == 0)){
			if(octopus.level == 6){
				var win  = true;
			}else{
				window.cancelAnimationFrame(octopus.animationID);
				var win  = false;
				var mess = "Niveau " + octopus.level + " terminé. Bravo!";
				alert(mess);
				octopus.level++;
				model.balles = [];
				model.changeLevel(octopus.level);
				octopus.animationID = window.requestAnimationFrame(octopus.step);

			}			
		}else{
			for(var a = 0; a < model.balles.length; a++){
				if(model.balles[a].pos.y > 780){	
					model.balles[a].dead = true;
					if(a != 0){
						model.balles.splice(a, a);
					}
					else{
						model.balles.shift();
					}
					if(model.balles.length == 0){
						if(model.barre.nbrVie > 0){
							document.getElementById("nombreVie").innerHTML = "Nombre de vie : " + model.barre.nbrVie;
							model.barre.nbrVie -=1;
						}else{
							document.getElementById("nombreVie").innerHTML = "Nombre de vie : " + model.barre.nbrVie;
							lost = true;
						}
					}
								
				}
			}
		}
		
	

		if ( win || lost ){
			var msg = win ? "You win !" : "Game Over...";
			window.cancelAnimationFrame( octopus.animationID );
			alert(msg)
		}
		else{  // let's play

			// update model
			model.findCollision();
			model.findCollisionBarre();
			model.updateBalles();
			// clear view
			document.getElementById("game").innerHTML = "";
			// render all
			viewBriques.render();
			viewBarre.render();
			viewBalles.render();
			// next frame please
			octopus.animationID = window.requestAnimationFrame(octopus.step);
		}
	},

	stopstart : function(){
		console.log("pause");
		this.pause = !this.pause;
		if ( this.pause )
			window.cancelAnimationFrame(octopus.animationID);
		else
			octopus.animationID = window.requestAnimationFrame( octopus.step );
	}

}


var viewBriques = {
	render : function(){
		var briques  = octopus.getBriques();
		for(var i=0; i<briques.length; i++){
			var tple = document.getElementById("template-brique");
			var frag = document.importNode(tple.content, true);
			var elemBalle = frag.querySelector(".defaultBrique");
			var pos = briques[i].getPosition();
			
			var nbr = briques[i].nbrVie;
			switch (nbr) {
  				case 3:
    			break;
  				case 2:
				break
  				case 1:
    			break;
			}
			if( document.getElementById("briqueI")){
			//	var elem = document.getElementById("briqueI");
			//	elem.setAttribute('src', look);
			}
			elemBalle.style.marginLeft = pos.x + "px";
			elemBalle.style.marginTop  = pos.y + "px";
			document.getElementById("game").appendChild(frag);
		}
	}
}


var viewBarre = {
	init : function(){
		  // keep a reference to the "barre node" in the DOM

		document.body.addEventListener("keydown", function(ev){         // Listen to the key events on the document
			//console.log(ev.keyCode);
			switch( ev.keyCode )
			{
				case 37 :                                           // "Left" move the barre left and update the barre view
				octopus.moveBarre(octopus.moveBarreLeftValue);
				viewBarre.render();
				break;

				case 39 :                                          // "Right" move the barre right and update the barre view
				octopus.moveBarre(octopus.moveBarreRightValue);                           
				viewBarre.render();
				break;

				case 32 : //space -> fire !
				if(model.balles.length == 0){
					octopus.fire();
				}
				break;

				case 80 : // p -> pause/start
				octopus.stopstart();
				break;
			}
		} );

	}, 

	render : function(){
		var tple = document.getElementById("template-barre");        	// load the template barre
		var frag = document.importNode( tple.content, true);            // duplicate its content, a document fragment
		document.getElementById("game").appendChild(frag);              // add the cloned fragment to the game area
		this.elemBarre = document.querySelector(".defaultBarre"); 
		var pos = octopus.getBarrePosition();
		//console.log(pos);
		this.elemBarre.style.marginLeft = pos.x + "px";
		this.elemBarre.style.marginTop  = pos.y + "px";

	}
}


var viewBalles = {
	render : function(){
		var tomahawks  = octopus.getBalles();
		for(var i=0; i<tomahawks.length; i++){
			var tple = document.getElementById("template-balle");
			var frag = document.importNode(tple.content, true);
			var elemBalle = frag.querySelector(".defaultBalle");
			var pos = tomahawks[i].getPosition();
			elemBalle.style.marginLeft = pos.x + "px";
			elemBalle.style.marginTop  = pos.y + "px";
			document.getElementById("game").appendChild(frag);
		}//end for
	}// end render
}



octopus.init();