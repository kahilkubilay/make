var c, cc, ucak, player, enemyArr,
	enemyIndex, skor, playerYazi, 
	mermiArr, mermiIndex, arkaplan,
	meteorArr, meteorIndex, hazir, megaEnemy;

class game{
	constructor(){
		c = document.getElementById('canvas');
		c.width = 400;
		c.height = 600;
		cc = c.getContext('2d');
		document.addEventListener('keydown', this.kontrolDown.bind(this));
		document.addEventListener('keyup', this.kontrolUp.bind(this));
		document.addEventListener('mousedown', this.mouseDown.bind(this));
		//zamanlayıcı
		this.timer = setInterval(this.animate.bind(this), 60);
	}
	init(){

		this.sayac = 0;
		skor = 1;

		//set up ayarları
		let x,y, w, h;
		
		w = 75;
		h = 75;
		x = c.width/2-w/2;
		y = c.height-h;
		player = new nesne( x, y, w, h, 'player', 'resimler/player.png');
		
		// dusman tanımı set up
		enemyArr = [];
		enemyIndex = 0;

		//mermi tanımı set up
		mermiArr = [];
		mermiIndex = 0;

		//gezegen tanımı
		meteorArr = [];
		meteorIndex = 0;

		playerYazi = new yazi('Health:' + skor , 3, 3, 'red', '25px Arial', 'left', 'hanging');

		arkaplan = new nesne(0, -300, 400, 900, 'arkaplan', 'resimler/arkaplan.png');
	
		//big boss karsilasmasi
		hazir = false;
		let mx, my, mw, mh;
		mw = 200;
		mh = 170;
		mx = random(0, c.width-mw);
		my = -mh;
		megaEnemy = new nesne(mx, my, mw, mh, 'megaEnemy', 'resimler/bigEnemy.png');

	}
	draw(){
		player.draw();
	}
	update(){
		player.update();
	}
	clear(){
		cc.clearRect(0, 0, c.width, c.height);
	}
	kontrolDown(event){
		if( event.keyCode === 65 ){ // a tusu
			player.vx = -10;
			player.vy = 0;
		}
		if( event.keyCode === 87 ){ // w tusu
			player.vy = -10;
			player.vx = 0;
		}
		if( event.keyCode === 68 ){ // d tusu
			player.vx = 10;
			player.vy = 0;
		}
		if( event.keyCode === 83 ){ // s tusu
			player.vy = 10;
			player.vx = 0;
		}
		if( event.keyCode === 32 ){ // space tusu
			//kanat mermileri
			this.kanatMermi();

		}


	}
	kontrolUp(){
		player.vx = 0;
		player.vy = 0;
	}
	stop(){
		clearInterval(this.timer);
	}
	mouseDown(){
		let x, y, w, h;
		w = 10;
		h = 20;
		x = player.x + player.w / 2 - w / 2;
		y = player.y;

		new nesne(x, y, w, h, 'mermi', 'resimler/mermi.png');

	}
	kanatMermi(){
		let x, y, w, h;
		w = 10;
		h = 20;
		x = player.x + 5;
		y = player.y + 70;

		let x1, y1, w1, h1;
		w1 = 10;
		h1 = 20;
		x1 = player.x + 60;
		y1 = player.y + 70;


		new nesne(x, y, w, h, 'mermi', 'resimler/mermi.png');
		new nesne(x1, y1, w1, h1, 'mermi', 'resimler/mermi.png');

	}
	animate(){
		//sayacı arttır
		this.sayac++;

		this.clear();

		arkaplan.update();

		//player yazısı
		playerYazi.update();

		//meteor ve gezegenler
		if( sure(240) ){
			let x, y, boyut;
			boyut = random(50, 100);
			x = random(0, c.width-boyut);
			y = -boyut;

			new nesne(x, y, boyut, boyut, 'meteor', 'resimler/meteor' + random(1, 7) + '.png');

		}

		meteorArr.forEach( meteor => {
			meteor.update();
		});
		
		//mermi güncelleme
		mermiArr.forEach( mermi => {
			mermi.update();
		});

		if( hazir === true ){

			megaEnemy.update();

		}else{
			enemyArr.forEach(enemy => {

				mermiArr.forEach(mermi => {
					if( carpisma(enemy, mermi) ){
						enemy.delete();
						mermi.delete();
						skor += 1;
						playerYazi.text = 'Health:' + skor;
						
						carpismaResmi(enemy.x, enemy.y, enemy.w, enemy.h);
					}
				});
			});

		//düşman oluşturma 10 saniyede
		

		if( sure(100) ){
			let x, y, w, h;
			w = 50;
			h = 75;
			x = random(0, c.width-w);
			y = -h;

			new nesne(x, y, w, h, 'enemy', 'resimler/enemy' + random(1, 6) + '.png')

		}

		enemyArr.forEach(enemy => {
			enemy.update();
			if( carpisma(enemy, player) ){
				enemy.delete();
				skor -= 1;
				playerYazi.text = 'Health:' + skor;
				carpismaResmi(player.x, player.y, player.w, player.h);
			}
			});
		}

		

		if( skor >= 3 ){
			hazir = true;
		}
		if( skor == 0 ){
			this.stop();
		}

		player.update();

	}
}

ucak = new game();
ucak.init();	
