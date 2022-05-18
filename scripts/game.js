/*  Students: Please use this week's project for Week 16: Assignment 19: Beta. 
     You will need to replace the contents of this JavaScript file with your own work, 
     and create any other files, if any, required for the assignment.
     When you are done, be certain to submit the assignment in Canvas to be graded. */
// 1) credits to Professor
// 2) credits for assets/images/meadow.jpg: https://opengameart.org/content/meadow-background
// 3) credits for assets/sounds/cute.mp3 to migfus20: https://opengameart.org/content/cute-intro-music
// 4) credits for assets/sounds/thatsItFortoday.mp3 - unable to find for now
// 5) credits for assets/sprites/rabbitBig.png: https://opengameart.org/content/mascot-bunny-character
// 6) credits for assets/sprites/carrot1.png: https://opengameart.org/content/mascot-bunny-character
// 7) credits for assets/sprites/platform.png: https://opengameart.org/content/dark-ground
// 8) credits for assets/sounds/: https://opengameart.org/content/7-eating-crunches
// 9) credits to StumpyStrust for ui sounds (on/off): https://opengameart.org/content/ui-sounds
// 10) credits to p0ss for Interface Sounds Starter Pack (appear-online.ogg): https://opengameart.org/content/interface-sounds-starter-pack
// 11) credits to wobbleboxx for assets/sounds/wrong.mp3 and ../.../levelUp.mp3: https://opengameart.org/content/level-up-power-up-coin-get-13-sounds
// 12) credits to jalastram - Jesús Lastra - for assets/sounds/enter.wav: https://opengameart.org/content/gui-sound-effects-4
// 13) credits to full screen: https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/assets/ui/fullscreen-white.png
// 14) credits to assets/sounds/clock.wav: https://opengameart.org/content/ticking-clock-0
// 15) credits to assets/sounds/completeTask.mp3: https://opengameart.org/content/completion-sound
// 16) credits to By Zeyu Ren 任泽宇 for assets/images/clouds.png: https://opengameart.org/content/backgrounds-for-2d-platformers

// Meeting 2, thank you to Professor: https://stackoverflow.com/questions/7060750/detect-the-enter-key-in-a-text-input-field
// the keyup() method returns a value to your function. In the example, they capture that value in a local parameter variable they name e. That variable contains a object value with properties. the keyCode property returns number corresponding to key pressed. Enter is number 13.
// Meeting 2, thank you to Professor: https://stackoverflow.com/questions/65854300/how-to-add-a-word-per-minute-calculator-to-a-website-using-javascript-html-or

// May 3, 2022
// issue #1: restart doesn't work - please fix
// issue #2: full screen works only on menu screen - done May 8, 2022
// issue #3: can't stop sound when mute is true - please fix

// Missing:
// 1) move Zoom Zoom on each character input that is correct
// 2) WPM score - done May 8, 2022

// Restart scene: https://phaser.discourse.group/t/safely-restarting-a-scene/11557

// credits to icons: https://www.figma.com/file/awrmHskj79PjSAJZnGgPfk/Flex-Icon-Set-(Community)?node-id=901%3A1077

// define scene 1
let scene1 = {
    key: "scene1",
    active: true,
    preload: scene1Preload,
    create: scene1Create,
    update: scene1Update,
  };
  
  // define scene 2 (actual game) configuration in its own variable
  let scene2 = {
    key: "scene2",
    active: false,
    preload: scene2Preload,
    create: scene2Create,
    update: scene2Update,
  };
  // define scene 3 (end)
  let scene3 = {
    key: "scene3",
    active: false,
    preload: scene3Preload,
    create: scene3Create,
    update: scene3Update,
  };
// define scene 4
let scene4 = {
    key: "scene4",
    active: false,
    preload: scene4Preload,
    create: scene4Create,
    update: scene4Update,
  };
let scene5 = {
    key: "scene5",
    active: false,
    preload: scene5Preload,
    create: scene5Create,
    update: scene5Update,
  };
  // set up configuration for the game
  var config = {
    type: Phaser.CANVAS,
    scale: {
      mode: Phaser.Scale.FIT,
      parent: "app",
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 800,
      height: 600,
      pixelArt: true,
    },
  
    dom: {
      createContainer: true,
    },
    physics: {
      default: "arcade",
      arcade: {
        fps: 120,
       gravity: { y: 300 },
        debug: false,
      },
    },
    scene: [scene1, scene2, scene3, scene4, scene5],
  };
  
  // variables for scene 1
  let scene1image;
  let sound1;
  var offNow;
  var offToggle;
  var isMuted = false;
  var onToggle;
  var clock;
  var completeTask;
  var helpText;
  var meadowThoughts;
  
  // scene 1 preload
  function scene1Preload() {
    // preload our image  file
    this.load.image("title", "assets/images/preGame.png");
   
    // load audio asset files use this.load.audio()
    this.load.audio("music", "assets/sounds/cute.mp3");
    // load help button
    
    this.load.image("help", "assets/sprites/exclude.png");
    // load info button
    this.load.image("info", "assets/sprites/info.png");
    // load full screen button
    this.load.spritesheet("fullscreen", "assets/sprites/fullscreen-white.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    // load sound buttons
    this.load.image("soundOn", "assets/sprites/soundOn.png");
    this.load.image("soundOff", "assets/sprites/soundOff.png");
    // load audio for sound buttons
    this.load.audio("appear", "assets/sounds/appear.ogg");
    this.load.audio("on", "assets/sounds/on.ogg");
    this.load.audio("off", "assets/sounds/off.ogg");
    this.load.audio("enterSound", "assets/sounds/enter.wav");
    // extra
    this.load.audio("meadowThoughts", "assets/sounds/thatsItForToday.mp3");
  }
  
  // scene 1 create
  function scene1Create() {
    this.scale.fullscreenTarget = document.getElementById("app");
  
    // make a image game object to show our bkgnd image
    scene1image = this.add.image(0, 0, "title").setOrigin(0, 0);
    const soundOnButton = this.add
      .image(70, 70, "soundOn")
      .setInteractive({ useHandCursor: true });
    const soundOffButton = this.add
      .image(70, 130, "soundOff")
      .setInteractive({ useHandCursor: true });
    enterSound = this.sound.add("enterSound", { loop: false });
    appear = this.sound.add("appear", { loop: false });
    on = this.sound.add("on", { loop: false });
    off = this.sound.add("off", { loop: false });
  
    soundOnButton.on("pointerup", playsound, this);
  
    soundOffButton.on("pointerup", mutesound, this);
  
    const helpButton = this.add
      .image(740, 531, "help")
      .setInteractive({ useHandCursor: true });
    const infoButton = this.add
      .image(70, 531, "info")
      .setInteractive({ useHandCursor: true });
    // helpButton.on("pointerup", destroyText, this);
    //infoButton.on("pointerup", destroyText, this);
    helpButton.on("pointerdown", showText, this);
    infoButton.on("pointerdown", infoText, this);
    //  helpButton.on("pointerover", destroyText, this);
  
    const startButton = this.add
      .rectangle(400, 500, 177, 77, 0x000)
      .setInteractive({ useHandCursor: true });

    meadowThoughts = this.sound.add("meadowThoughts")
  
    startButton.setInteractive({ useHandCursor: true });
    startButton.on("pointerover", function () {
      startButton.fillColor = 0x2f8085;
    });
    startButton.on("pointerout", function () {
      startButton.fillColor = 0x000;
    });
    startButton.on("pointerdown", function () {
      startButton.fillColor = 0x000;
    });
  
    // thanks to Deisy (classmate for this awesome example)
    startButton.on("pointerup", scene1Transition, this);
    startButton.on("pointerup", enterGame, this);
  
    const startText = this.add
      .text(startButton.x, startButton.y, "Start to play", {
        fontFamily: "Balsamiq Sans",
        fontSize: "20px",
      })
      .setOrigin(0.5);

    
  
    this.input.setDefaultCursor("url(assets/cursors/cursor2.png), pointer");
    this.input.setDefaultCursor("url(assets/images/cursor1.png), default");
  
    helpText = this.add.text(
      650,
      440,
      "Type the words on \n the screen to get points \n and keep Zoom Zoom \n alive",
      {
        fontFamily: "Balsamiq Sans",
  
        color: "#fff",
        fontSize: "12px",
      }
    );
  
    helpText.visible = false;
  
    infoTextStuff = this.add.text(
      30,
      450,
      "Created by nathalie baladejo-reynosa\nfor Spring 2022 CS 42 class",
      {
        fontFamily: "Balsamiq Sans",
  
        color: "#fff",
        fontSize: "12px",
      }
    );
  
    infoTextStuff.visible = false;
    // make a sound audio object (not shown but heard when played)
    sound1 = this.sound.add("music");
    sound1.play({
      volume: 0.2, // set to 50% of volume level
      loop: true, // make audio play repeat over and over
    });
    // credits to :https://labs.phaser.io/edit.html?src=src/scalemanager/full%20screen%20game.js&v=3.55.2
    var button = this.add
      .image(800 - 40, 45, "fullscreen", 0)
      .setOrigin(1, 0)
      .setInteractive();
  
    button.on(
      "pointerup",
      function () {
        if (this.scale.isFullscreen) {
          appear.play();
          button.setFrame(0);
  
          this.scale.stopFullscreen();
        } else {
          appear.play();
          button.setFrame(1);
  
          this.scale.startFullscreen();
        }
      },
      this
    );
  
    // credits to: https://codepen.io/samme/pen/XWbReRd
    // credits to: https://www.thepolyglotdeveloper.com/2020/09/switch-between-scenes-phaser-game/
  
    // credits to: https://codepen.io/samme/pen/XWbReRd
    /*this.input.keyboard.on(
        'keydown_C',
        function() {
          this.scene.switch('scene2');
      
        },
        this
      );
    */
  }
  
  //credits to phoenix studios: https://phaser.discourse.group/t/call-a-phaser-function-from-html-js/11350
  //OUTSIDE CREATE - GLOBAL FUNCTION
  function mutesound() {
    off.play();
    var offToggle = sound1.setMute(true);
    var onToggle2 = meadowThoughts.setMute(true);
    var isMuted = true;
    console.log(isMuted);
  }
  function playsound() {
    on.play();
    var onToggle = sound1.setMute(false);
    var onToggle2 = meadowThoughts.setMute(false);
    var isMuted = false;
    console.log(isMuted);
  }
  function enterGame() {
    enterSound.play();
  }
  
  function showText() {
    appear.play();
    //if (helpText === null) {
    helpText.visible = true;
  
    this.time.addEvent({
      delay: 2000,
      loop: false,
      callback: () => {
        helpText.visible = false;
      },
    });
  
    // } else {
    // helpText.setText("");
    //}
  }
  function infoText() {
    appear.play();
    infoTextStuff.visible = true;
    this.time.addEvent({
      delay: 2000,
      loop: false,
      callback: () => {
        infoTextStuff.visible = false;
      },
    });
  }
  /*function destroyText() {
  
    infoTextStuff.visible = false;
    helpText.visible = false;
    
  }*/
  
  /*let elapsed = (Date.now() - start) / 1000;
          // Get words per seconde
          let wordsPerSecond = map * 60 / elapsed;
          // Round to the fourth decimal
          wordsPerSecond = Math.round(wordsPerSecond * 1000) / 1000;*/
  
  // scene 1 update
  function scene1Update() {}
  
  // scene 1 transition
  function scene1Transition() {
    this.scene.start("scene2", { fadeIn: true });
  }
  // start new game
  var game = new Phaser.Game(config);
  // variables for scene 2
  var score = 0;
  var platforms;
  var crunch;
  var newWord;
  var counterWPM = 0;
  let calculatedWPM;
  let grow = 1;
  var totalCounterWPM;
  var startTime, endTime;
  var carrots;
  var lifeHeartsLeft = 7;
  var totalWPM;
  // scene 2 preload
  function scene2Preload() {
    // load sound buttons
    this.load.image("soundOn", "assets/sprites/soundOn.png");
    this.load.image("soundOff", "assets/sprites/soundOff.png");
    this.load.html("nameform", "assets/html/nameform.html");
    this.load.spritesheet("rabbitBig", "assets/sprites/rabbitBig.png", {
      frameWidth: 78,
      frameHeight: 108,
    });
    this.load.image("life", "assets/sprites/heart.png");
    this.load.audio("clock", "assets/sounds/clock.wav");
    this.load.audio("completeTask", "assets/sounds/completeTask.mp3");
    // load full screen button
    this.load.spritesheet("fullscreen", "assets/sprites/fullscreen-white.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.audio("meadowThoughts", "assets/sounds/thatsItForToday.mp3");
    this.load.audio("levelUp", "assets/sounds/levelUp.mp3");
    this.load.audio("wrong", "assets/sounds/wrong.mp3");
    this.load.audio("crunch", "assets/sounds/crunch.3.ogg");
    this.load.image("meadow", "assets/images/meadow.jpg");
    this.load.image("ground", "assets/sprites/newPlatform.png");
    this.load.image("carrot", "assets/sprites/carrot1.png");
    this.load.audio("pop", "assets/sounds/pop.ogg");
    this.load.audio("goodJob", "assets/sounds/goodJob.mp3");
  }
  // scene 2 create
  function scene2Create() {
    this.scale.fullscreenTarget = document.getElementById("app");
    sound1.stop();
    startTime = performance.now();

    // credits to :https://labs.phaser.io/edit.html?src=src/scalemanager/full%20screen%20game.js&v=3.55.2
    var button = this.add
      .image(800 - 16, 16, "fullscreen", 0)
      .setOrigin(1, 0)
      .setInteractive();
  
    button.on(
      "pointerup",
      function () {
        if (this.scale.isFullscreen) {
          button.setFrame(0);
  
          this.scale.stopFullscreen();
        } else {
          button.setFrame(1);
  
          this.scale.startFullscreen();
        }
      },
      this
    );
    // credits to jjcapellan: https://phaser.discourse.group/t/countdown-timer/2471/4
    //console.log("create timer");
    // 1:30 minute in seconds
   
    
    this.initialTime = 90;
   timedEvent = this.time.addEvent({
      delay: 1000,
      callback: onEvent,
      callbackScope: this,
      loop: true,
      
    });
    
    platforms = this.physics.add.staticGroup();
  
    platforms.create(300, 520, "ground");
  
    meadowThoughts = this.sound.add("meadowThoughts", {
      loop: true,
      volume: 0.2,
    });
    goodJob = this.sound.add("goodJob", {
      loop: false,
      volume: 0.7,
    });
    clock = this.sound.add("clock", { loop: false, volume: 0.7 });
    completeTask = this.sound.add("completeTask", { loop: false, volume: 1 });
    crunch = this.sound.add("crunch", { loop: false });
    levelUp = this.sound.add("levelUp", { loop: false });
    wrong = this.sound.add("wrong", { loop: false });
  
    this.add.image(0, 0, "meadow").setOrigin(0, 0);
    const soundOnButton2 = this.add
      .image(50, 70, "soundOn")
      .setInteractive({ useHandCursor: true });
    const soundOffButton2 = this.add
      .image(50, 130, "soundOff")
      .setInteractive({ useHandCursor: true });

      soundOnButton2.on("pointerup", playsound, this);
  
    soundOffButton2.on("pointerup", mutesound, this);
  
   
  
    // credits to :https://phaser.discourse.group/t/delete-an-item-in-a-group/7613/2
    const lifeHearts = this.add.group({
      key: "life",
      frame: 1,
      frameQuantity: 7,
    });
  
    Phaser.Actions.GridAlign(lifeHearts.getChildren(), {
      width: 10,
      height: 10,
      cellWidth: 40,
      cellHeight: 40,
      x: 277,
      y: 30,
    });
  
    /* scoreText = this.add.text(450, 15, "score: 0", {
      fontFamily: "Balsamiq Sans",
  
      color: "#a579d4",
      fontSize: "20px",
    });*/
    wpmText = this.add.text(250, 15, "", {
      fontFamily: "Balsamiq Sans",
  
      color: "#a579d4",
      fontSize: "20px",
    });
    welcomeText = this.add.text(15, 15, "Type Away", {
      fontFamily: "Balsamiq Sans",
  
      color: "#a579d4",
      fontSize: "20px",
    });
  
    timeText = this.add.text(700, 15, "timer: " + formatTime(this.initialTime), {
      fontFamily: "Balsamiq Sans",
  
      color: "#a579d4",
      fontSize: "20px",
    });
  
    rabbitBig = this.physics.add.sprite(50, 250, "rabbitBig");
  
    //rabbitBig.setBounce(0.2);
    rabbitBig.setScale(0.7);
    rabbitBig.body.setCollideWorldBounds(true);
    /*this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("rabbitBig", { start: 2, end: 4 }),
      frameRate: 7,
      repeat: -1,
    });
  
    this.anims.create({
      key: "turn",
      frames: [{ key: "rabbitBig", frame: 7 }],
      frameRate: 10,
    });
  
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("rabbitBig", { start: 6, end: 8 }),
      frameRate: 7,
      repeat: -1,
    });
  */
    //Food
  
    // We create the group using a GroupConfig object,
    // here the group will run the update method of every child
    /*carrots = this.physics.add.group({
  
      runChildUpdate: true
    });
  
    
    carrots.createMultiple({
  
      key: 'carrot',
      repeat: 1,
    });
  
    carrots.children.iterate((child) => {
  
      let y = Phaser.Math.Between(-200, -2000)
      let x = Phaser.Math.Between(600, 800)
  
      child.setY(y)
      child.setX(x)
      child.setMaxVelocity(200)
  
      // This is run on each child, if it's active.
      // Set a new position as you like
      child.update = function () {
  
          if (this.y > 600) {this.y = 0;}
      };
  
    })*/

    pop = this.sound.add("pop");
    carrots = this.physics.add.group({
      key: "carrot",
      repeat: 7,
      setXY: { stepX: 30 },
    });
  
    carrots.children.iterate(function (child) {
      let y = Phaser.Math.Between(-200, -2000);
      let x = Phaser.Math.Between(200, 700);
      child.setPosition(x, y);
      child.setOrigin(0, 0);
  
     //console.log("new carrot", carrots.x, carrots.y);
    });

    this.physics.add.collider(rabbitBig, platforms, rabbitHitPlatform, null, this);
    this.physics.add.collider(rabbitBig, platforms, check_collision, null, this);
  
    //this.physics.add.collider(rabbitBig, platforms);
  
    this.physics.add.collider(carrots, platforms);
  
    const wordsLevel1 = ["of", "oh", "at", "ok", "go", "hi", "my", "up", "we", "do", "be", "by", "ah"];
    const wordsLevel2 = [
      "dad", "far", "icy",
      "lad",
      "nap",
      "all",
      "has",
      "pop",
      "bee",
      "jam",
    
    ];
    const wordsLevel3 = ["bake",
      "word",
      "list",
      "ease",
      "four",
      "earn", "fact", "kagu", "oars", "race", "safe", "safe", "uber", "udon", "vain", "zeal"]
    const wordsLevel4 = ["aargh", "babka", "cabin", "early", "labor", "macaw", "saber", "eagle", "evens", "extra", "enure", "enemy", "babel", "cabin", "facet", "kabob", "oasis", "rabbi", ];
  
    const wordsLevel5 = [ "babble", "eaglet", "jabiru", "pacify", "xylan", "babies", "fabric", "habits", "nachos", "vacant", "yachts", "xenons", "abacus"];
    const wordsLevel6 = ["abandon", "icefall", "labella", "macadam", "nacelle", "ulexite", "earache", "pacific", "rabbits", "cabbage", "habitat", "iceberg", "icecaps"];
    const wordsLevel7 = ["aardvark", "fabulous", "eardrops", "habitant", "quackery", "habanero", "labelled", "macaroni", "macaroon", "yappiest", "naething", "oatmeals", "tabbying", "waddings", "yakitori", "zamarras"];
    const wordsLevel8 = ["excellence", "magnifying", "obediently", "rabbinical", "tablecloth", "caballero", "obclavate", "quadratic", "tabbouleh", "zapateado", "dachshund", "dacquoise", "fabricant", "obbligato", "quadrants", "sablefish", "tablature", ];
  
    // credits to Phaser: https://labs.phaser.io/edit.html?src=src%5Cgame%20objects%5Cdom%20element%5Cinput%20test.js
    // credits to: https://ourcade.co/tools/phaser3-text-styler/
    var text = this.add.text(320, 510, "Please type: ", {
      color: "white",
      fontSize: "20px ",
      fontFamily: "Balsamiq Sans",
      stroke: '#a579d4',
			strokeThickness: 3,
      resolution: 2
    });
  
    // Generate random array index
    var randIndex = Math.floor(Math.random() * wordsLevel1.length);
    // Output random word
    var currentWord = wordsLevel1[randIndex];
  
    //console.log(currentWord);
  
    text.setText("Please type: " + currentWord);
  
    var element = this.add.dom(400, 577).createFromCache("nameform");
  
    //currentWord = document.querySelector('.form-control').value;
    //console.log(currentWord);
    // getElementsByClassName
  
    element.addListener("click");
  
    // credits to: https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
    // Get the input field
  
    // issue May 3, 2022: on restart, function doesn't work neither one below
    var input = document.getElementById("textField");
  
    // Execute a function when the user presses a key on the keyboard
    input.addEventListener("keypress", function (event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
  
        // Trigger the button element with a click
        document.getElementById("button-addon2").click();
  
        // credits: https://stackoverflow.com/questions/10923719/reset-input-value-after-alert-javascript
        document.getElementById("textField").value = "";
      }
    });
  
    element.on("click", function (event) {
      if (event.target.name === "playButton") {
        var input = document.getElementById("button-addon2");
  
        var inputText = this.getChildByName("nameField");
        // var inputText = document.querySelector('.form-control').value;
  
        //  Have they entered anything?
        if (inputText.value == currentWord || inputText.value == newWord) {
          goodJob.play();
          if (score < 100) {
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            newWord = wordsLevel1[Math.floor(Math.random() * wordsLevel1.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);

            counterWPM++;
            console.log(counterWPM);
          }
          if (score === 100) {
            
     
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            newWord = wordsLevel2[Math.floor(Math.random() * wordsLevel2.length)];
  
            text.setText("Please type: " + newWord);
  
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            // rabbitBig.body.setVelocity(20,0);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
          if (score === 200) {
      
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            newWord = wordsLevel3[Math.floor(Math.random() * wordsLevel3.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
           // rabbitBig.body.setVelocity(20,0);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
          if (score === 300) {
         
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            newWord = wordsLevel4[Math.floor(Math.random() * wordsLevel4.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            //rabbitBig.body.setVelocity(20,0);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
          if (score === 400) {
     
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            newWord = wordsLevel5[Math.floor(Math.random() * wordsLevel5.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            //rabbitBig.body.setVelocity(20,0);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
          if (score === 500) {
   
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            newWord = wordsLevel6[Math.floor(Math.random() * wordsLevel6.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            //rabbitBig.body.setVelocity(20,0);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
          if (score === 600) {
     
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            
            newWord = wordsLevel7[Math.floor(Math.random() * wordsLevel7.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
           rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
     
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
          if (score === 700) {
            
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
    
              newWord = wordsLevel8[Math.floor(Math.random() * wordsLevel8.length)];
          
           // newWord = wordsLevel6[Math.floor(Math.random() * wordsLevel6.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(48, 0);
           // rabbitBig.body.setVelocity(20,0);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
        } else if (score < 100) {
         wrong.play();
          counterWPM--;
          // credits to: https://phaser.discourse.group/t/delete-an-item-in-a-group/7613/2
          lifeHearts.remove(lifeHearts.getLast(true), true);
          pop.play();
          grow -= 0.1;
          rabbitBig.setScale(grow);
          lifeHeartsLeft -= 1;
          
          if (lifeHeartsLeft <= 0) {
            meadowThoughts.stop();
            game.scene.stop("scene2");
            game.scene.start("scene3");
          }
          text.setText("Incorrect! Type: " + currentWord);
          console.log(lifeHeartsLeft);
        } else {
          wrong.play();
          counterWPM--;
          lifeHeartsLeft -= 1;
          
          if (lifeHeartsLeft <= 0) {
            meadowThoughts.stop();
            game.scene.stop("scene2");
            game.scene.start("scene3");
          }
          console.log(lifeHeartsLeft);
          text.setText("Incorrect! Type: " + newWord);
  
          // credits to: https://phaser.discourse.group/t/delete-an-item-in-a-group/7613/2
          lifeHearts.remove(lifeHearts.getLast(true), true);
          pop.play();
          grow -= 0.1;
          rabbitBig.setScale(grow);
        }
      }
    });
    /* creds to: https://www.w3schools.com/howto/howto_js_trigger_button_enter.aspvar inputStuff = document.querySelector('.form-control').value;
  
  // Execute a function when the user presses a key on the keyboard
  inputStuff.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("button-addon2").click();
    }
   }); */
  
    // questions ???? May 8, 2022
    if (isMuted === false) {
      meadowThoughts.play();
      console.log("sound on");
    }
  
    if (isMuted === true) {
      meadowThoughts.stop();
      console.log("sound off");
    }
  
    //  Checks to see if the rabbitBig overlaps with any of the carrots, if she does call the collectcarrot function
    this.physics.add.overlap(rabbitBig, carrots, collectcarrot, null, this);
  
    /*this.time.addEvent({
      delay: 1000000,
      loop: false,
      callback: () => {
        this.scene.start("scene3");
      },
    });*/
  }
  
  function scene2Update() {}
  
  function collectcarrot(rabbitBig, carrots) {
    // credits to: https://cs42-week17-10-kdkups.srjcethanwilde.repl.co/
  
    carrots.disableBody(true, true);
    grow += 0.1;
    // credits to: https://phaser.discourse.group/t/solved-setsize-not-working-on-scaled-sprites/3714
    rabbitBig.body.setSize(grow);
    crunch.play();
  
    /*if (carrots.countActive(true) === 0)
          {
              carrots.children.iterate(function (child) {
  
                  child.enableBody(true, child.x, child.y, true, true);
  
              });
          }		*/
  
    /*if (carrots.countActive(true) === 0)
      {
          carrots.children.iterate(function (child) {
  
              child.enableBody(true, child.x, 0, true, true);
  
          })
      };*/
  
    //  Add and update the score
    score += 100;
    // scoreText.setText("score: " + score);
  
    // credits: https://stackoverflow.com/questions/13306251/jquery-javascript-count-how-many-times-a-key-is-pressed
  
    if (score === 0) {
      welcomeText.setText("");
    }
    if (score === 100) {
      levelUp.play();
      welcomeText.setText("Level 1: passed");
      posx = 50;
      posy = 50;
      rabbitBig.setPosition(posx, posy);
    }
    if (score === 200) {
      levelUp.play();
      welcomeText.setText("Level 2: passed");
  
      var x =
        rabbitBig.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);
  
      posx = 50;
      posy = 50;
      rabbitBig.setPosition(posx, posy);
    }
    if (score === 300) {
      levelUp.play();
      welcomeText.setText("Level 3: passed");
  
      posx = 50;
      posy = 50;
      rabbitBig.setPosition(posx, posy);
    }
    if (score === 400) {
      levelUp.play();
      welcomeText.setText("Level 4: passed");
  
      var x =
        rabbitBig.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);
      posx = 50;
      posy = 50;
      rabbitBig.setPosition(posx, posy);
    }
    if (score === 500) {
      levelUp.play();
      welcomeText.setText("Level 5: passed");
  
      var x =
        rabbitBig.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);
      posx = 50;
       posy = 50;
      rabbitBig.setPosition(posx, posy);
    }
    if (score === 600) {
      levelUp.play();
      welcomeText.setText("Level 6: passed");
  
      var x =
        rabbitBig.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);
      posx = 50;
       posy = 50;
      rabbitBig.setPosition(posx, posy);
    }
    if (score === 700) {
      levelUp.play();
  
      welcomeText.setText("You won!");
  
      clock.stop();
      this.physics.pause();
  
      //credits to Weedoze for WPM: https://stackoverflow.com/questions/41632942/how-to-measure-time-elapsed-on-javascript
      endTime = performance.now();
  
      var timeDiff = endTime - startTime; //in ms
      // strip the ms
      timeDiff /= 1000;
  
      // get seconds
      var seconds = Math.round(timeDiff);
      console.log(seconds + " seconds");
      var grossWPM = totalCounterWPM / 5 / (seconds / 10 / 60);
      totalWPM = Math.round(grossWPM * 100) / 100;
      console.log(totalWPM);
  
      byeBye = true;
      meadowThoughts.stop();
      wpmText.setText("");
      this.time.addEvent({
        delay: 2000,
        loop: false,
        callback: () => {
          this.scene.start("scene3");
        },
      });
    }
  
    var x =
      rabbitBig.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
  }

var candosomething = false;
function rabbitHitPlatform() { console.log('bunny on platform'); 
                             // credits to: https://phaser.discourse.group/t/how-to-check-collider-and-not-collider-between-two-objects/9273/2
                             }

function check_collision (rabbitBig, platforms)
{
    candosomething = true;
}


  // credits to: https://phaser.discourse.group/t/countdown-timer/2471/4
  
  // credits to jjcapellan: https://phaser.discourse.group/t/countdown-timer/2471/4
  // formatTime function to format the way the time looks
  var minutes;
  function formatTime(seconds) {
    // Minutes
    var minutes = Math.floor(seconds / 60);
    // Seconds
    var partInSeconds = seconds % 60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2, "0");
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
  }
  
  // credits to jjcapellan: https://phaser.discourse.group/t/countdown-timer/2471/4
  // onEvent function
  function onEvent() {
    this.initialTime -= 1; // One second
    timeText.setText("timer: " + formatTime(this.initialTime));
   
    if (this.initialTime < 10) {
      this.initialTime -= 1;
      clock.play();
    }
    
    if (this.initialTime < 0) {
      timeText.setText("game over ");
      clock.stop();
      completeTask.play();
      game.scene.stop("scene2");
      game.scene.start("scene3");
    }
  }
  
  // scene 3 Preload
  function scene3Preload() {
    // load restart button
    this.load.image("restart", "assets/sprites/purple-restart.png");
    // load menu button
    this.load.image("menu", "assets/sprites/purple-menu.png");
    this.load.image("babyHeart", "assets/sprites/purple-heart.png");
    this.load.audio("enterSound", "assets/sounds/enter.wav");
    this.load.image("clouds", "assets/images/clouds.png");
  }
  // scene 3 Create
  function scene3Create() {
      this.add.image(0, 0, "clouds").setOrigin(0, 0);
    this.scale.fullscreenTarget = document.getElementById("app");
    enterSound = this.sound.add("enterSound", { loop: false });
    //meadowThoughts.stop();
    const restartButton = this.add
      .image(200, 500, "restart")
      .setInteractive({ useHandCursor: true });
    //restartButton.on("pointerup", destroyGame, this);
    restartButton.on("pointerup", restartGame, this);
    restartButton.on("pointerup", goBackToScene2, this);
    restartButton.on("pointerup", enterSoundNow, this);
    restartText = this.add.text(100, 400, "Play again - n/work", {
      fontFamily: "Balsamiq Sans",
  
      color: "#a579d4",
      fontSize: "20px",
    });
    const menuButton = this.add
      .image(550, 500, "menu")
      .setInteractive({ useHandCursor: true });
    const creditsButton = this.add
      .image(377, 500, "babyHeart")
      .setInteractive({ useHandCursor: true });
    creditsButton.on("pointerup", scene3Transition, this);
    menuButton.on("pointerup", backToMenu, this);
    menuButton.on("pointerup", enterSoundNow, this);
  
    menuText = this.add.text(487, 400, "Back to menu", {
      fontFamily: "Balsamiq Sans",
  
      color: "#a579d4",
      fontSize: "20px",
    });
    // credits: https://stackoverflow.com/questions/42679712/why-does-the-red-heart-emoji-require-two-code-points-but-the-other-colored-hear/42680595

    var key_stroke = String.fromCodePoint(0x2764) 	;
    creditsButtonText = this.add.text(330, 400, "Credits " + key_stroke, {
      fontFamily: "Balsamiq Sans",
  
      color: "#a579d4",
      fontSize: "20px",
    });
    byeByeText = this.add.text(140, 100, "Thank you for playing Type Away, bye!", {
      fontFamily: "Balsamiq Sans",
  
      color: "#a579d4",
      fontSize: "32px",
    });
    scoreText = this.add.text(350, 200, "score: " + score, {
      fontFamily: "Balsamiq Sans",
  
      color: "#a579d4",
      fontSize: "17px",
    });
    if (totalWPM === undefined) {
      totalWPM = "not calculated, try again";
    }
    wpmText = this.add.text(350, 250, "WPM: " + totalWPM, {
      fontFamily: "Balsamiq Sans",
  
      color: "#a579d4",
      fontSize: "17px",
    });
  }
  // scene 3 Upload
  function scene3Update() {}
  // scene 3 transition
  function scene2Transition() {
    this.scene.start("scene3", { fadeIn: true });
  }
// scene 4 Preload
  function scene4Preload() {
  
    this.load.audio("enterSound", "assets/sounds/enter.wav");
    this.load.audio("creditsMusic", "assets/sounds/chip.mp3");
    // load baby heart button
    this.load.image("white-menu", "assets/sprites/white-menu.png");
    this.load.image("bg-none", "assets/images/bg-none.png")

  }
// scene 4 Create
  function scene4Create() {
    this.add.image(0, 0, "bg-none").setOrigin(0, 0);
    this.scale.fullscreenTarget = document.getElementById("app");
    enterSound = this.sound.add("enterSound", { loop: false });
    creditsSound = this.sound.add("creditsMusic", { loop: false,
      volume: 0.7,
    });
    creditsSound.play();
    creditsTextMenu = this.add.text(657, 430, "Back to menu", {
      fontFamily: "Balsamiq Sans",
  
      color: "#fff",
      fontSize: "17px",
    });
    const creditsButton = this.add
      .image(700, 500, "menu")
      .setInteractive({ useHandCursor: true });

    creditsButton.on("pointerup", backToMenu, this);
    creditsButton.on("pointerup", enterSoundNow, this);
   // credits to: https://phaser.discourse.group/t/auto-scrolling-text-issue-phaser-3/2984
   creditText = `Credits:\n1) credits to CS 42 Professor Ethan Wilde\n2) credits for meadow.jpg: https://opengameart.org/content/meadow-background\n3) credits to migfus20: https://opengameart.org/content/cute-intro-music\n4) credits for thatsItFortoday.mp3 - unable to find for now\n5) credits to: https://opengameart.org/content/mascot-bunny-character\n6) credits to: https://opengameart.org/content/mascot-bunny-character\n7) credits to: https://opengameart.org/content/dark-ground\n8) credits for: https://opengameart.org/content/7-eating-crunches\n9) credits to StumpyStrust for ui sounds (on/off): https://opengameart.org/content/ui-sounds\n10) credits to p0ss for Interface Sounds Starter Pack: https://opengameart.org/content/interface-sounds-starter-pack\n11) credits to wobbleboxx for wrong.mp3 and levelUp.mp3: https://opengameart.org/content/level-up-power-up-coin-get-13-sounds\n12) credits to jalastram - Jesús Lastra: https://opengameart.org/content/gui-sound-effects-4\n13) credits to full screen: https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/assets/ui/fullscreen-white.png\n14) credits to clock.wav: https://opengameart.org/content/ticking-clock-0\n15) credits to completeTask.mp3: https://opengameart.org/content/completion-sound\n16) Little Robot Sound Factory - www.littlerobotsoundfactory.com\n17) By Zeyu Ren 任泽宇: https://opengameart.org/content/backgrounds-for-2d-platformers\n18) credits to BBandRage: https://opengameart.org/content/rpg-towntravel-or-credits-song\n19) Thank you to everyone who helped from the CS 42 Class and the CS 42 TA Benjamin\n20) Thank you to my Madre\n21)`
   
    let arrayText = creditText.split('\n')
    let text = this.add.text(0, 0, '', {
      fontFamily: "Balsamiq Sans",
  
      color: "#fff",
      fontSize: "17px",
      align: 'left',
      padding: 40,
      lineSpacing: 7,

      // credits :https://github.com/photonstorm/phaser3-examples/blob/e5ec94a68a9393082d797645d0e830e2f6112bf1/public/src/3.24/game%20objects/text/word%20wrap%20by%20width.js
       wordWrap: { width: 477 }
    })

    for (let i = 0; i < arrayText.length - 1; i++) {
      this.time.addEvent({
        delay: 1000 * i,
        callback: () => {
          text
            .setX(0)
            .setY(0 + i * 20)
            .setText(arrayText[i].trim())

        }
      })
    }
  }

  
  // scene 4 Upload
  function scene4Update() {}
  // scene 4 transition
  function scene3Transition() {
    this.scene.start("scene4", { fadeIn: true });
  }
  // scene 5 transition
  function scene4Transition() {
    this.scene.start("scene5", { fadeIn: true });
  }
  // scene 5 Preload
  function scene5Preload() {
  // load sound buttons
    this.load.image("soundOn", "assets/sprites/soundOn.png");
    this.load.image("soundOff", "assets/sprites/soundOff.png");
    this.load.html("nameform", "assets/html/nameform.html");
    this.load.spritesheet("rabbitBig", "assets/sprites/rabbitBig.png", {
      frameWidth: 78,
      frameHeight: 108,
    });
    this.load.image("life", "assets/sprites/heart.png");
    this.load.audio("clock", "assets/sounds/clock.wav");
    this.load.audio("completeTask", "assets/sounds/completeTask.mp3");
    // load full screen button
    this.load.spritesheet("fullscreen", "assets/sprites/fullscreen-white.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.audio("meadowThoughts", "assets/sounds/thatsItForToday.mp3");
    this.load.audio("levelUp", "assets/sounds/levelUp.mp3");
    this.load.audio("wrong", "assets/sounds/wrong.mp3");
    this.load.audio("crunch", "assets/sounds/crunch.3.ogg");
    this.load.image("meadow", "assets/images/meadow.jpg");
    this.load.image("ground", "assets/sprites/platform.png");
    this.load.image("carrot", "assets/sprites/carrot1.png");
    this.load.audio("pop", "assets/sounds/pop.ogg");
  }
  // scene 5 Create
  function scene5Create() {
  
    this.scale.fullscreenTarget = document.getElementById("app");
    sound1.stop();
    startTime = performance.now();

    const soundOnButton2 = this.add
      .image(70, 70, "soundOn")
      .setInteractive({ useHandCursor: true });
    const soundOffButton2 = this.add
      .image(70, 130, "soundOff")
      .setInteractive({ useHandCursor: true });

      soundOnButton2.on("pointerup", playsound, this);
  
    soundOffButton2.on("pointerup", mutesound, this);
  
    /* credits to :https://labs.phaser.io/edit.html?src=src/scalemanager/full%20screen%20game.js&v=3.55.2
    var button = this.add
      .image(800 - 16, 16, "fullscreen", 0)
      .setOrigin(1, 0)
      .setInteractive();
  
    button.on(
      "pointerup",
      function () {
        if (this.scale.isFullscreen) {
          button.setFrame(0);
  
          this.scale.stopFullscreen();
        } else {
          button.setFrame(1);
  
          this.scale.startFullscreen();
        }
      },
      this
    );*/
  
    // credits to jjcapellan: https://phaser.discourse.group/t/countdown-timer/2471/4
    //console.log("create timer");
    // 1:30 minute in seconds
   
    
    this.initialTime = 90;
   timedEvent = this.time.addEvent({
      delay: 1000,
      callback: onEvent,
      callbackScope: this,
      loop: true,
      
    });
    
    platforms = this.physics.add.staticGroup();
  
    platforms.create(640, 560, "ground").setScale(3).refreshBody();
  
    meadowThoughts = this.sound.add("meadowThoughts", {
      loop: true,
      volume: 0.2,
    });
    clock = this.sound.add("clock", { loop: false, volume: 0.7 });
    completeTask = this.sound.add("completeTask", { loop: false, volume: 1 });
    crunch = this.sound.add("crunch", { loop: false });
    levelUp = this.sound.add("levelUp", { loop: false });
    wrong = this.sound.add("wrong", { loop: false });
  
    this.add.image(0, 0, "meadow").setOrigin(0, 0);
    // credits to :https://phaser.discourse.group/t/delete-an-item-in-a-group/7613/2
    const lifeHearts = this.add.group({
      key: "life",
      frame: 1,
      frameQuantity: 7,
    });
  
    Phaser.Actions.GridAlign(lifeHearts.getChildren(), {
      width: 10,
      height: 10,
      cellWidth: 40,
      cellHeight: 40,
      x: 277,
      y: 30,
    });
  
    /* scoreText = this.add.text(450, 15, "score: 0", {
      fontFamily: "Balsamiq Sans",
  
      color: "#a579d4",
      fontSize: "20px",
    });*/
    wpmText = this.add.text(250, 15, "", {
      fontFamily: "Balsamiq Sans",
  
      color: "#a579d4",
      fontSize: "20px",
    });
    welcomeText = this.add.text(15, 15, "Type Away", {
      fontFamily: "Balsamiq Sans",
  
      color: "#a579d4",
      fontSize: "20px",
    });
  
    timeText = this.add.text(700, 15, "timer: " + formatTime(this.initialTime), {
      fontFamily: "Balsamiq Sans",
  
      color: "#a579d4",
      fontSize: "20px",
    });
  
    rabbitBig = this.physics.add.sprite(50, 250, "rabbitBig");
  
   // rabbitBig.setBounce(0.2);
    rabbitBig.setScale(0.7);
    rabbitBig.body.setCollideWorldBounds(true);
    /*this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("rabbitBig", { start: 2, end: 4 }),
      frameRate: 7,
      repeat: -1,
    });
  
    this.anims.create({
      key: "turn",
      frames: [{ key: "rabbitBig", frame: 7 }],
      frameRate: 10,
    });
  
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("rabbitBig", { start: 6, end: 8 }),
      frameRate: 7,
      repeat: -1,
    });
  */
    //Food
  
    // We create the group using a GroupConfig object,
    // here the group will run the update method of every child
    /*carrots = this.physics.add.group({
  
      runChildUpdate: true
    });
  
    
    carrots.createMultiple({
  
      key: 'carrot',
      repeat: 1,
    });
  
    carrots.children.iterate((child) => {
  
      let y = Phaser.Math.Between(-200, -2000)
      let x = Phaser.Math.Between(600, 800)
  
      child.setY(y)
      child.setX(x)
      child.setMaxVelocity(200)
  
      // This is run on each child, if it's active.
      // Set a new position as you like
      child.update = function () {
  
          if (this.y > 600) {this.y = 0;}
      };
  
    })*/

    pop = this.sound.add("pop");
    carrots = this.physics.add.group({
      key: "carrot",
      repeat: 7,
      setXY: { stepX: 30 },
    });
  
    carrots.children.iterate(function (child) {
      let y = Phaser.Math.Between(-200, -2000);
      let x = Phaser.Math.Between(200, 700);
      child.setPosition(x, y);
      child.setOrigin(0, 0);
  
     //console.log("new carrot", carrots.x, carrots.y);
    });
  
    this.physics.add.collider(rabbitBig, platforms);
  
    this.physics.add.collider(carrots, platforms);
  
    const wordsLevel1 = ["of", "oh", "at", "ok", "go", "hi", "my", "up", "we" ];
    const wordsLevel2 = [
      "all",
      "has",
      "pop",
      "bee",
      "jam",
      "bake",
      "word",
      "list",
      "four",
    ];
    const wordsLevel3 = ["eagle", "evens", "extra", "enure", "enemy", "babel", "cabin", "facet", "kabob", "oasis", "rabbi"];
  
    const wordsLevel4 = ["babies", "fabric", "habits", "nachos", "vacant", "yachts", "xenons", "abacus"];
    const wordsLevel5 = ["abandon", "earache", "pacific", "rabbits", "cabbage", "habitat", "iceberg", "icecaps"];
    const wordsLevel6 = ["aardvark", "eardrops", "habitant", "quackery", "habanero", "labelled", "macaroni", "macaroon", "yappiest"];
    const wordsLevel7 = ["excellence", "magnifying", "obediently", "rabbinical", "tablecloth", "caballero", "obclavate", "quadratic", "tabbouleh", "zapateado" ];
    const wordsLevel8 = ["abandonees", "daffodilly", "earthbound", "macadamias", "rabbitlike", "yardsticks", "zealotries" ];
    // credits to Phaser: https://labs.phaser.io/edit.html?src=src%5Cgame%20objects%5Cdom%20element%5Cinput%20test.js
    var text = this.add.text(320, 510, "Please type: ", {
      color: "white",
      fontSize: "20px ",
      fontFamily: "Balsamiq Sans",
    });
  
    // Generate random array index
    var randIndex = Math.floor(Math.random() * wordsLevel1.length);
    // Output random word
    var currentWord = wordsLevel1[randIndex];
  
    //console.log(currentWord);
  
    text.setText("Please type: " + currentWord);
  
    var element = this.add.dom(400, 577).createFromCache("nameform");
  
    //currentWord = document.querySelector('.form-control').value;
    //console.log(currentWord);
    // getElementsByClassName
  
    element.addListener("click");
  
    // credits to: https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
    // Get the input field
  
    // issue May 3, 2022: on restart, function doesn't work neither one below
    var input = document.getElementById("textField");
  
    // Execute a function when the user presses a key on the keyboard
    input.addEventListener("keypress", function (event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
  
        // Trigger the button element with a click
        document.getElementById("button-addon2").click();
  
        // credits: https://stackoverflow.com/questions/10923719/reset-input-value-after-alert-javascript
        document.getElementById("textField").value = "";
      }
    });
  
    element.on("click", function (event) {
      if (event.target.name === "playButton") {
        var input = document.getElementById("button-addon2");
  
        var inputText = this.getChildByName("nameField");
        // var inputText = document.querySelector('.form-control').value;
  
        //  Have they entered anything?
        if (inputText.value == currentWord || inputText.value == newWord) {
          if (score < 100) {
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            newWord = wordsLevel1[Math.floor(Math.random() * wordsLevel1.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            counterWPM++;
            console.log(counterWPM);
          }
          if (score === 100) {
     
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            newWord = wordsLevel2[Math.floor(Math.random() * wordsLevel2.length)];
  
            text.setText("Please type: " + newWord);
  
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
          if (score === 200) {
      
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            newWord = wordsLevel3[Math.floor(Math.random() * wordsLevel3.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
          if (score === 300) {
         
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            newWord = wordsLevel4[Math.floor(Math.random() * wordsLevel4.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
          if (score === 400) {
     
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            newWord = wordsLevel5[Math.floor(Math.random() * wordsLevel5.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
          if (score === 500) {
   
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            newWord = wordsLevel6[Math.floor(Math.random() * wordsLevel6.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
          if (score === 600) {
     
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            
            newWord = wordsLevel7[Math.floor(Math.random() * wordsLevel7.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
          if (score === 700) {
            
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
    
              newWord = wordsLevel8[Math.floor(Math.random() * wordsLevel8.length)];
          
           // newWord = wordsLevel6[Math.floor(Math.random() * wordsLevel6.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
        } else if (score < 100) {
         wrong.play();
          counterWPM--;
          // credits to: https://phaser.discourse.group/t/delete-an-item-in-a-group/7613/2
          lifeHearts.remove(lifeHearts.getLast(true), true);
          pop.play();
          grow -= 0.1;
          rabbitBig.setScale(grow);
          lifeHeartsLeft -= 1;
          
          if (lifeHeartsLeft <= 0) {
            meadowThoughts.stop();
            game.scene.stop("scene2");
            game.scene.start("scene3");
          }
          text.setText("Incorrect! Type: " + currentWord);
          console.log(lifeHeartsLeft);
        } else {
          wrong.play();
          counterWPM--;
          lifeHeartsLeft -= 1;
          
          if (lifeHeartsLeft <= 0) {
            meadowThoughts.stop();
            game.scene.stop("scene2");
            game.scene.start("scene3");
          }
          console.log(lifeHeartsLeft);
          text.setText("Incorrect! Type: " + newWord);
  
          // credits to: https://phaser.discourse.group/t/delete-an-item-in-a-group/7613/2
          lifeHearts.remove(lifeHearts.getLast(true), true);
          pop.play();
          grow -= 0.1;
          rabbitBig.setScale(grow);
        }
      }
    });
    /* creds to: https://www.w3schools.com/howto/howto_js_trigger_button_enter.aspvar inputStuff = document.querySelector('.form-control').value;
  
  // Execute a function when the user presses a key on the keyboard
  inputStuff.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("button-addon2").click();
    }
   }); */
  
    // questions ???? May 8, 2022
    if (isMuted === false) {
      meadowThoughts.play();
      console.log("sound on");
    }
  
    if (isMuted === true) {
      meadowThoughts.stop();
      console.log("sound off");
    }
  
    //  Checks to see if the rabbitBig overlaps with any of the carrots, if she does call the collectcarrot function
    this.physics.add.overlap(rabbitBig, carrots, collectcarrot, null, this);
  
    /*this.time.addEvent({
      delay: 1000000,
      loop: false,
      callback: () => {
        this.scene.start("scene3");
      },
    });*/
  }
  
  function scene2Update() {
   
  /* if (candosomething) {
    }*/
    
   // candosomething = false;
  }
  
  function collectcarrot(rabbitBig, carrots) {
    // credits to: https://cs42-week17-10-kdkups.srjcethanwilde.repl.co/
  
    carrots.disableBody(true, true);
    grow += 0.1;
    rabbitBig.setScale(grow);
    crunch.play();
  
    /*if (carrots.countActive(true) === 0)
          {
              carrots.children.iterate(function (child) {
  
                  child.enableBody(true, child.x, child.y, true, true);
  
              });
          }		*/
  
    /*if (carrots.countActive(true) === 0)
      {
          carrots.children.iterate(function (child) {
  
              child.enableBody(true, child.x, 0, true, true);
  
          })
      };*/
  
    //  Add and update the score
    score += 100;
    // scoreText.setText("score: " + score);
  
    // credits: https://stackoverflow.com/questions/13306251/jquery-javascript-count-how-many-times-a-key-is-pressed
  
    if (score === 0) {
      welcomeText.setText("");
    }
    if (score === 100) {
      levelUp.play();
      welcomeText.setText("Level 1: passed");
      posx = 50;
      posy = 50;
      rabbitBig.setPosition(posx, posy);
    }
    if (score === 200) {
      levelUp.play();
      welcomeText.setText("Level 2: passed");
  
     
  
  
      posx = 50;
      posy = 50;
      rabbitBig.setPosition(posx, posy);
    }
    if (score === 300) {
      levelUp.play();
      welcomeText.setText("Level 3: passed");
  
      posx = 50;
      posy = 50;
      rabbitBig.setPosition(posx, posy);
    }
    if (score === 400) {
      levelUp.play();
      welcomeText.setText("Level 4: passed");
  
    
      posx = 50;
      posy = 50;
      rabbitBig.setPosition(posx, posy);
    }
    if (score === 500) {
      levelUp.play();
      welcomeText.setText("Level 5: passed");
  

      posx = 50;
      posy = 50;
      rabbitBig.setPosition(posx, posy);
    }
    if (score === 600) {
      levelUp.play();
      welcomeText.setText("Level 6: passed");
  
     
      posx = 50;
      posy = 50;
      rabbitBig.setPosition(posx, posy);
    }
    if (score === 700) {
      levelUp.play();
  
      welcomeText.setText("You won!");
  
      clock.stop();
      this.physics.pause();
  
      //credits to Weedoze for WPM: https://stackoverflow.com/questions/41632942/how-to-measure-time-elapsed-on-javascript
      endTime = performance.now();
  
      var timeDiff = endTime - startTime; //in ms
      // strip the ms
      timeDiff /= 1000;
  
      // get seconds
      var seconds = Math.round(timeDiff);
      console.log(seconds + " seconds");
      var grossWPM = totalCounterWPM / 5 / (seconds / 10 / 60);
      totalWPM = Math.round(grossWPM * 100) / 100;
      console.log(totalWPM);
  
      byeBye = true;
      meadowThoughts.stop();
      wpmText.setText("");
      this.time.addEvent({
        delay: 2000,
        loop: false,
        callback: () => {
          this.scene.start("scene3");
        },
      });
    }
  
    var x =
      rabbitBig.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
  }
  // scene 5 Preload
  function scene5Update() {
  }
  /*function destroyGame() {
  
    // issue May 3, 2022 - scene not restarting well???
     this.scene.stop("scene2");
  
  }*/
  function restartGame() {

    window.location.reload();
    
    
  }
function goBackToScene2() {

  this.scene.start("scene2");
  
    
    
  }
  function backToMenu() {
   window.location.reload();
    this.scene.start("scene1");
  }
  
  function enterSoundNow() {
    enterSound.play();
  }
  
  /* notes for calculating WPM: https://stackoverflow.com/questions/65854300/how-to-add-a-word-per-minute-calculator-to-a-website-using-javascript-html-or
  // Split the string to an array of words
  var words = string.split(" ");
  
  text.innerHTML = "";
  // For each word, add it as a span element in the text
  words.forEach(w => {
      let el = document.createElement("span");
      el.innerText = w;
      text.appendChild(el);
      text.innerHTML += " ";
  });
  
  input.addEventListener("keyup", () => {
      // Split the input to an array of words
      let input_words = input.value.split(" ");
      let good = true;
  
      if (finished)
          return;
      if (!start)
          start = Date.now();
  
      // Iterate over all the words
      for (let i = 0; i < words.length; i++) {
          let element = words[i];
          // If the word is not the same as the word at same position in the input, set 'good' at false
          if (input_words[i] != element)
              good = false;
          // Set the background color for the word, selecting the element
          // by the parent's children index (corresponding to i) to avoid the usage of ids
          text.children[i].style.backgroundColor = good ? "green" : null;
      }
      // If all words are correct, the variable is still true
      if (good)
      {
          finished = true;
          // Get the difference in seonds between start and now
          let elapsed = (Date.now() - start) / 1000;
          // Get words per seconde
          let words_per_seconde = words.length * 60 / elapsed;
          // Round to the fourth decimal
          words_per_seconde = Math.round(words_per_seconde * 1000) / 1000;
          alert(words_per_seconde + " words per minute.");
      }
  });
  
  */
  
  /*
  // Highscore based on score value for Session Storage
    if (typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']) {
      sessionStorage['highscore'] = score;
    } else {
      sessionStorage['highscore'] = sessionStorage['highscore'];
    }
  
    // Prevent display of High Score: -1
    if (sessionStorage['highscore'] >= 0) {
    highscoreDisplay.innerHTML = sessionStorage['highscore'];
    }*/

    
   /* function startGame() {
       const wordsLevel1 = ["of", "oh", "at", "ok", "go", "hi", "my", "up", "we" ];
    const wordsLevel2 = [
      "all",
      "has",
      "pop",
      "bee",
      "jam",
      "bake",
      "word",
      "list",
      "four",
    ];
    const wordsLevel3 = ["eagle", "evens", "extra", "enure", "enemy", "babel", "cabin", "facet", "kabob", "oasis", "rabbi"];
  
    const wordsLevel4 = ["babies", "fabric", "habits", "nachos", "vacant", "yachts", "xenons", "abacus"];
    const wordsLevel5 = ["abandon", "earache", "pacific", "rabbits", "cabbage", "habitat", "iceberg", "icecaps"];
    const wordsLevel6 = ["aardvark", "eardrops", "habitant", "quackery", "habanero", "labelled", "macaroni", "macaroon", "yappiest"];
    const wordsLevel7 = ["excellence", "magnifying", "obediently", "rabbinical", "tablecloth", "caballero", "obclavate", "quadratic", "tabbouleh", "zapateado" ];
    const wordsLevel8 = ["abandonees", "daffodilly", "earthbound", "macadamias", "rabbitlike", "yardsticks", "zealotries" ];
    // credits to Phaser: https://labs.phaser.io/edit.html?src=src%5Cgame%20objects%5Cdom%20element%5Cinput%20test.js
    var text = this.add.text(320, 510, "Please type: ", {
      color: "white",
      fontSize: "20px ",
      fontFamily: "Balsamiq Sans",
    });
  
    // Generate random array index
    var randIndex = Math.floor(Math.random() * wordsLevel1.length);
    // Output random word
    var currentWord = wordsLevel1[randIndex];
  
    //console.log(currentWord);
  
    text.setText("Please type: " + currentWord);
  
    var element = this.add.dom(400, 577).createFromCache("nameform");
  
    //currentWord = document.querySelector('.form-control').value;
    //console.log(currentWord);
    // getElementsByClassName
  
    element.addListener("click");
  
    // credits to: https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
    // Get the input field
  
    // issue May 3, 2022: on restart, function doesn't work neither one below
    var input = document.getElementById("textField");
  
    // Execute a function when the user presses a key on the keyboard
    input.addEventListener("keypress", function (event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
  
        // Trigger the button element with a click
        document.getElementById("button-addon2").click();
  
        // credits: https://stackoverflow.com/questions/10923719/reset-input-value-after-alert-javascript
        document.getElementById("textField").value = "";
      }
    });
  
    element.on("click", function (event) {
      if (event.target.name === "playButton") {
        var input = document.getElementById("button-addon2");
  
        var inputText = this.getChildByName("nameField");
        // var inputText = document.querySelector('.form-control').value;
  
        //  Have they entered anything?
        if (inputText.value == currentWord || inputText.value == newWord) {
          if (score < 100) {
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            newWord = wordsLevel1[Math.floor(Math.random() * wordsLevel1.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            counterWPM++;
            console.log(counterWPM);
          }
          if (score === 100) {
     
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            newWord = wordsLevel2[Math.floor(Math.random() * wordsLevel2.length)];
  
            text.setText("Please type: " + newWord);
  
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
          if (score === 200) {
      
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            newWord = wordsLevel3[Math.floor(Math.random() * wordsLevel3.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
          if (score === 300) {
         
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            newWord = wordsLevel4[Math.floor(Math.random() * wordsLevel4.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
          if (score === 400) {
     
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            newWord = wordsLevel5[Math.floor(Math.random() * wordsLevel5.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
          if (score === 500) {
   
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            newWord = wordsLevel6[Math.floor(Math.random() * wordsLevel6.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
          if (score === 600) {
     
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
            
            newWord = wordsLevel7[Math.floor(Math.random() * wordsLevel7.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
          if (score === 700) {
            
            this.value = "";
  
            //  Hide the login element
            this.setVisible(true);
  
            //  Populate the text with whatever they typed in
    
              newWord = wordsLevel8[Math.floor(Math.random() * wordsLevel8.length)];
          
           // newWord = wordsLevel6[Math.floor(Math.random() * wordsLevel6.length)];
  
            text.setText("Please type: " + newWord);
            //Move rabbit
            rabbitBig.body.x += 77;
            rabbitBig.x += 77;
            rabbitBig.body.setVelocity(0, 48);
            counterWPM++;
            console.log(counterWPM);
            totalCounterWPM = counterWPM;
          }
        } else if (score < 100) {
          wrong.play();
          counterWPM--;
          // credits to: https://phaser.discourse.group/t/delete-an-item-in-a-group/7613/2
          lifeHearts.remove(lifeHearts.getLast(true), true);
          grow -= 0.1;
          rabbitBig.setScale(grow);
          lifeHeartsLeft -= 1;
          if (lifeHeartsLeft <= 0) {
            meadowThoughts.stop();
            game.scene.stop("scene2");
            game.scene.start("scene3");
          }
          text.setText("Incorrect! Type: " + currentWord);
          console.log(lifeHeartsLeft);
        } else {
          wrong.play();
          counterWPM--;
          lifeHeartsLeft -= 1;
          if (lifeHeartsLeft <= 0) {
            meadowThoughts.stop();
            game.scene.stop("scene2");
            game.scene.start("scene3");
          }
          console.log(lifeHeartsLeft);
          text.setText("Incorrect! Type: " + newWord);
  
          // credits to: https://phaser.discourse.group/t/delete-an-item-in-a-group/7613/2
          lifeHearts.remove(lifeHearts.getLast(true), true);
          grow -= 0.1;
          rabbitBig.setScale(grow);
        }
      }
    });
    }*/