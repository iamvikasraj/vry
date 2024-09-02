window.onload = function () {
  // Initiate digital rain
  var rain = new DigitalRain("#DigitalRain");

  // Get the stop and play buttons
  var stopButton = document.getElementById("stopButton");
  var playButton = document.getElementById("playButton");

  // Stop button functionality
  stopButton.addEventListener("click", function () {
    if (rain.running) {
      rain.stop();
      stopButton.style.display = "none";
      playButton.style.display = "inline-block";
    }
  });

  // Play button functionality
  playButton.addEventListener("click", function () {
    if (!rain.running) {
      rain.start();
      playButton.style.display = "none";
      stopButton.style.display = "inline-block";
    }
  });
};

// Digital Rain constructor
function DigitalRain(selector) {
  var self = this;

  // Some helper variables
  this.bgColor = "#000";
  this.rainColor = "#444";
  this.baseFontSize = 14;
  this.fps = 24;
  this.running = true;

  // Layer factors (for scaling + opacity)
  this.layers = [0.25, 0.5, 1];

  // Detect high-dpi displays
  this.retina = Boolean(
    "devicePixelRatio" in window && window.devicePixelRatio > 1
  );

  // Array for holding stream positions
  this.streams = [];

  // Initialize canvas and context
  this.canvas = document.querySelector(selector);
  this.ctx = this.canvas.getContext("2d");

  // Adjust after resizing window
  window.addEventListener("resize", function () {
    self.size();
  });
  this.size();

  // Wrap draw function as "render" to retain access to object
  this.render = function () {
    if (self.running) {
      self.draw();
    }
  };

  // Start the animation
  requestAnimationFrame(this.render);
}

// Handle resizing of canvas
DigitalRain.prototype.size = function () {
  // Save contents before resizing canvas
  if (this.canvas.width) {
    var buffer = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  var ww = window.innerWidth,
    wh = window.innerHeight;

  // Resize canvas to fill window
  this.canvas.width = this.retina ? ww * 1.5 : ww;
  this.canvas.height = this.retina ? wh * 1.5 : wh;
  this.canvas.style.width = ww + "px";

  this.fontSize = this.retina ? this.baseFontSize * 1.5 : this.baseFontSize;

  // Calculate number of columns
  this.columns = Math.round(this.canvas.width / (this.fontSize / 2));

  // Redraw (canvas clears on resize)
  if (buffer) {
    this.ctx.putImageData(buffer, 0, 0);
  }
};

DigitalRain.prototype.draw = function () {
  var self = this;

  // Call rAF after timeout to maintain framerate
  setTimeout(function () {
    requestAnimationFrame(self.render);
  }, 1000 / this.fps);

  // Add a variable number of streams per frame
  this.addStream(Math.round((Math.random() * this.columns * 1) / 3));

  // Draw overlay to fade out existing characters
  this.ctx.globalAlpha = 0.2;
  this.ctx.shadowColor = "transparent";
  this.ctx.shadowBlur = 0;
  this.ctx.fillStyle = this.bgColor;

  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  // Prepare canvas to draw characters
  this.ctx.fillStyle = this.rainColor;
  this.ctx.shadowColor = this.rainColor;
  this.ctx.shadowBlur = 10;

  // Draw bottom character for each stream
  for (var i = this.streams.length - 1; i >= 0; i--) {
    var stream = this.streams[i];

    if (stream.y <= this.canvas.height + stream.size) {
      // '0' or '1'
      var char = String(Math.round(Math.random()));

      // Adjust based on layer
      this.ctx.globalAlpha = stream.z;
      this.ctx.font = stream.size + "px Courier New, Courier";

      // Draw character
      this.ctx.fillText(char, stream.x, stream.y);

      // Update y-position
      stream.y += stream.size;
    } else {
      // Remove stream if offscreen
      this.streams.splice(i, 1);
    }
  }
};

// Generate one or more streams of rain
DigitalRain.prototype.addStream = function (n) {
  n = n || 1;

  for (var i = 0; i < n; i++) {
    this.streams.push(new DigitalRainStream(this));
  }
};

// Create a stream at a random position
function DigitalRainStream(Rain) {
  // Pick a layer
  this.z = Rain.layers[Math.floor(Math.random() * Rain.layers.length)];
  this.size = Rain.fontSize * this.z;

  // Pick a position
  this.x = Math.round(Math.random() * (Rain.columns / this.z)) * this.size;
  this.y = 0;
}

// Add methods to start and stop the rain
DigitalRain.prototype.start = function () {
  if (!this.running) {
    this.running = true;
    requestAnimationFrame(this.render);
  }
};

DigitalRain.prototype.stop = function () {
  this.running = false;
};
