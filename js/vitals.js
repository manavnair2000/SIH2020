function autoSubmit() {
  var form = document.getElementById('vital');
  var submit = document.getElementById('Submit');
  var temp = parseInt(document.getElementById("temperature-value").innerText);
  var hr = parseInt(document.getElementById("heart-rate-value").innerText);
  var temp_field = document.getElementById('temperature');
  var hr_field = document.getElementById('heartrate');
  temp_field.value = temp;
  hr_field.value = hr;
  enable();
  submit.click();
}
function changeSubmit() {
  var form = document.getElementById('vital');
  var submit = document.getElementById('Submit');
  var temp = parseInt(document.getElementById("temperature-value").innerText);
  var hr = parseInt(document.getElementById("heart-rate-value").innerText);
  var temp_field = document.getElementById('temperature');
  var hr_field = document.getElementById('heartrate');
  temp_field.value = temp;
  hr_field.value = hr;
  enable();
  submit.click();
}
function SIRS() {
  var sirs = document.getElementById("sirs");
  var temp = parseInt(document.getElementById("temperature-value").innerText);
  var hr = parseInt(document.getElementById("heart-rate-value").innerText);
  var wbc = document.getElementById('wbc');
  var rr = document.getElementById('respiratoryrate');
  var score = 0;
  if((temp>38 || temp<36)&&(temp)){
    score++;
  }
  if(hr>90 && hr){
    score++;
  }
  if(wbc.value>10 && wbc.value){
    score++;
  }
  if(rr.value>20 && rr.value){
    score++;
  }
  sirs.value = score;
}
function qSOFA() {
  var qsofa = document.getElementById("qsofa");
  var sbp = document.getElementById("systolicbp");
  var am = document.getElementById('alteredmentation');
  var rr = document.getElementById('respiratoryrate');
  var score = 0;
  if(sbp.value<100 && sbp.value){
    score++;
  }
  if(am.value<15 && am.value){
    score++;
  }
  if(rr.value>22 && rr.value){
    score++;
  }
  qsofa.value = score;
}
function enable()
{
	document.getElementById("sirs").disabled = false;
	document.getElementById("qsofa").disabled = false;
	return true;
}

//heartbeat functions ahead


// Keep track of the times draw() has been called
let draw_i = 0;

/**
 * A Heart object will beat, and generate voltage values according to the time
 * the beat started
 *
 * "Duration" values are really pixels. 1 pixel represents 1/60 of a second.
 */
class Heart {
  /**
   * Creates an instance of Heart
   * @param {number} adDuration Duration in pixels of the atria depolarization
   * @param {number} vdDuration Duration in pixels of the ventricle depolarization
   * @param {number} vrDuration Duration in pixels of the ventricle repolarization
   *
   * @property {number} this.beatDuration Duration in pixels of the whole beat
   * @property {number} this.nextBeat Time between last beat, and next beat
   * @property {number} this.nextBeatIn Time remaining for next beat
   * @property {number[]} this.bpm Time between two particular beats
   * @property {number} this.voltage Current voltage value. No units used.
   */
  constructor(adDuration, vdDuration, vrDuration) {
    this.adDuration = adDuration;
    this.vdDuration = vdDuration;
    this.vrDuration = vrDuration;

    this.beatDuration = adDuration + vdDuration + vrDuration;

    this.nextBeat = 70;
    this.nextBeatIn = 70;
    this.bpm = [];
    this.voltage = 0;
  }

  /**
   * Assign the heart a new voltage value, and report that value to the ECG
   * the heart is connected to.
   * @param {number} voltage
   */
  setVoltage(voltage) {
    this.voltage = voltage;
    ecg.addValue({ y: this.voltage });
  }

  /**
   * Generates the voltage values corresponding to the atria depolarization process.
   * This is the process that generates the first part of the curve of every beat.
   *
   * @param {number} time Time in pixels since the atria depolarization process started
   */
  atriaDepolarization(time) {
    // This process is not close to what reality does, but here it is generated using a
    // sin function where only the positive values remain, making a bump followed by a
    // flat section
    let y = randomGaussian(5, 1) * sin(time * (360 / this.adDuration));

    // To compensate for the y-axis inverted direction, return -y when y is over 0
    y = y > 0 ? -y : 0.2 * (1 - y);

    // Update the voltage to whatever value was calculated
    this.setVoltage(y + noise(time));
  }

  /**
   * Generates the voltage values corresponding to the ventricle depolarization process.
   * This is the process that generates the spiky part of the curve of every beat.
   *
   * @param {number} time Time in pixels since the ventricle depolarization process started
   */
  ventricleDepolarization(time) {
    let y;
    // In the first third, the curve has a spike going down
    if (time <= this.vdDuration / 3)
      y = (randomGaussian(8, 2) * (this.vdDuration - time)) / 6;
    // In the second third, the curve has a big spike going up
    else if (time < (2 * this.vdDuration) / 3) {
      // Start producing a sound, going from 0 to 0.5 volume in 0.01 seconds
      osc.amp(0.5, 0.01);
      y = (randomGaussian(70, 2) * abs(1.5 - (this.vdDuration - time))) / 3;
      y = -y;
    }

    // In the last third, the curve has another spike (bigger than the first one) going down
    else {
      y = (randomGaussian(20, 2) * (this.vdDuration - time)) / 3;
      // Stop the sound, going from 0.5 to 0 volume in 0.01 secs
      osc.amp(0, 0.01);
    }

    // Update the voltage to whatever value was calculated
    this.setVoltage(y);
  }

  /**
   * Generates the voltage values corresponding to the ventricle repolarization process.
   * This is the process that generates the last part of the curve of every beat.
   *
   * @param {number} time Time in pixels since the ventricle repolarization process started
   */
  ventricleRepolarization(time) {
    // This process is not close to what reality does, but here it is generated using a
    // sin function where only the positive values remain, but displaced half a turn to
    // make a flat section followed by a bump
    let y = randomGaussian(8, 2) * sin(180 + time * (360 / this.vrDuration));

    // To compensate for the y-axis inverted direction, return -y when y is over 0
    y = y < 0 ? 0.2 * (1 - y) : -y;

    // Update the voltage to whatever value was calculated
    this.setVoltage(y + noise(time));
  }

  updateBPM() {
    // bpm = 3600 / pixel-distance
    this.bpm.push(3600 / this.nextBeat);

    // To make rapid frequency changes meaningful, get the average bpm using only the
    // last 5 values of time, not all of them. So dispose the oldest one when the list
    // length is over 5.
    if (this.bpm.length > 5) this.bpm.splice(0, 1);
    ecg.drawBPM(round(this.bpm.reduce((p, c) => p + c, 0) / this.bpm.length));
  }
  /**
   * Decrease this.nextBeatIn to simulate the pass of time.
   * If necessary, create a new this.nextBeat value
   */
  updateTimeToNextBeat() {
    // This indicates that the next beat will begin in the next iteration
    if (this.nextBeatIn-- === 0) {
      // Then calculate a new "remaining time" for the next beat.
      // Use the x coordinates of the mouse position to modify the heart frequency
      this.nextBeat = abs(ceil(randomGaussian((900 - mouseX) / 10, 3)));

      // It the pixel time between beat and beat is less than 18, force it to be
      // 18. This value makes to a bpm of 200.
      if (this.nextBeat < 18) this.nextBeat = 18;

      // Get new bpm values using the last this.nextBeat
      this.updateBPM();

      // Reset the remaining time to the new calculated time
      this.nextBeatIn = this.nextBeat;
    }
  }

  /**
   * Get voltage values for every second of the beat, even at rest (no-beating time
   * after the ventricle repolarization finished, and before the next atria depolarization)
   * @param {*} time Time in pixels after the atria depolarization started
   */
  beat(time) {
    // Update the time left for the start of the next beat
    this.updateTimeToNextBeat();

    // If according to time, beat is in the atria depolarization process, call that function
    if (time <= this.adDuration) {
      this.atriaDepolarization(time);
      return;
    }

    // If according to time, beat is in the ventricle depolarization process, call that function
    // Update the time so the value sent is relative to the start of the ventricle
    // depolarization process
    time -= this.adDuration;
    if (time <= this.vdDuration) {
      this.ventricleDepolarization(time);
      return;
    }

    // If according to time, beat is in the ventricle repolarization process, call that function
    // Update the time so the value sent is relative to the start of the ventricle
    // repolarization process
    time -= this.vdDuration;
    if (time <= this.vrDuration) {
      this.ventricleRepolarization(time);
      return;
    }

    // If function reached this point, it's not in any of the beat processes, and it's resting.
    // Add a noisy voltage value
    this.setVoltage(0 + noise(draw_i * 0.5) * 5);
  }
}

// Initialize a heart
let heart = new Heart(12, 8, 12);

/**
 *  ECG will receive, process, and draw the health information
 */
class ECG {
  /**
   * @param {Object} graphZero  Coordinates of the {0, 0} value of the graph
   * @param {Object[]} values   Array of {x, y} objects. x plots time, y plots voltage
   * @param {number} maxValuesHistory   Maximum number of values before wiping oldest one
   */
  constructor(graphZero, values, maxValuesHistory) {
    this.graphZero = graphZero;
    this.values = values;
    this.maxValuesHistory = maxValuesHistory;
    this.maximumX = maxValuesHistory;
  }

  /**
   * Add a new voltage value to the values array. If it exceeds the maximum number of
   * values allowed to store, remove the oldest one before.
   * @param {Object} value {x, y} object. x represents time, y represents voltage
   */
  addValue(value) {
    // If no x (time) value is received, assume it is the sucessor of the last value
    // in the values array. If the new x exceeds the maximum allowed, make x = 0
    if (this.values.length >= this.maxValuesHistory) this.values.splice(0, 1);
    if (value.x === undefined) {
      value.x = (this.values[this.values.length - 1].x + 1) % this.maximumX;
    }
    this.values.push(value);
  }

  /**
   * Draw lines joining every voltage value throughout time in the screen
   */
  plotValues() {
    push();

    for (let i = 1; i < this.values.length; i++) {
      // If the previous value has a X coordinate higher than the current one,
      // don't draw it, to avoid lines crossing from end to start of the ECG plot area.
      if (this.values[i - 1].x > this.values[i].x) continue;

      // Older values are drawn with a lower alpha
      let alpha = i / this.values.length;

      // Set the color of the drawing
      stroke(121, 239, 150, alpha);
      fill(121, 239, 150, alpha);

      // Line from previous value to current value
      line(
        this.graphZero.x + this.values[i - 1].x,
        this.graphZero.y + this.values[i - 1].y,
        this.graphZero.x + this.values[i].x,
        this.graphZero.y + this.values[i].y
      );

      // For the last 5 values, draw a circle with a radius going in function to
      // its index. This to make the leading line thicker
      if (i + 5 > this.values.length) {
        circle(
          this.graphZero.x + this.values[i].x,
          this.graphZero.y + this.values[i].y,
          this.values.length / i
        );
      }
    }
    pop();
  }

  //// The following methods update the values represented as html elements

  updateInfo() {
    this.updateDate();
    if(draw_i % 50 === 0){
    this.updateBloodPressure();
    this.updateVentilation();
    this.updateTemperature();
    this.updateHemoglobin();
    }
  }

  updateHemoglobin(){
    document.getElementById("hemoglobin-value").innerHTML = randomGaussian(14, .1).toFixed(1)

  }
  updateTemperature(){
    document.getElementById("temperature-value").innerHTML = randomGaussian(98.6, .1).toFixed(1)

  }
  updateVentilation(){
    document.getElementById("minute-ventilation-value").innerHTML = randomGaussian(6, .5).toFixed(2)
  }

  updateBloodPressure(){
    document.getElementById("pressure-value").innerHTML =
    "" + round(randomGaussian(130, 1)) + "/" + round(randomGaussian(90, 1));
  }

  updateDate() {
    let date = new Date();
    date =
      "" +
      date.getFullYear() +
      "-" +
      date.getMonth() +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();
    document.getElementById("date-value").innerHTML = date;
  }

  /**
   * Update the html content of the span containing the bpm info
   * @param {number} bpm
   */
  drawBPM(bpm) {
    document.getElementById("heart-rate-value").innerHTML = bpm;
  }
}

// Initialize the ecg
let ecg = new ECG({ x: 0, y: 110 }, [{ x: 0, y: 0 }], 600);

/**
 * Set the general configuration for the p5js canvas
 */
function setup() {
  // Create a 600x150 canvas and place it inside the div with id "sketch-holder"
  let myCanvas = createCanvas(600, 150);
  myCanvas.parent("sketch-holder");

  // Set the color mode to allow calling RGBA without converting to string
  colorMode(RGB, 255, 255, 255, 1);

  // Work with degrees instead of Radians (sin function used inside Heart Class)
  angleMode(DEGREES);

  // Set the frequency the ecg will emit every heartbeat.
  osc = new p5.Oscillator();
  osc.setType("sine");
  osc.freq(445);
  osc.amp(0);
  osc.start();
}

/**
 *  Draw a rectangle of size (canvas.width - 1, canvas.height - 1)  with dark background
 * and a brilliant green border.
 *
 * The -1 is to allow the border to be seen in the final page.
 */
function drawECGScreenBackground() {
  push();
  fill("#201D1D");
  stroke(121, 239, 150, 1);
  rect(0, 0, 599, 149);
  pop();
}

/**
 * Function to be called until the page is closed
 * Part of p5js
 */
function draw() {
  // Keep track of the number of times draw has been called
  draw_i++;

  // Hide previous ECG line by drawing a background
  drawECGScreenBackground();

  // Get the new voltage values for the ECG from the heart
  heart.beat(heart.nextBeat - heart.nextBeatIn);

  // Draw the line of voltage values over time in the ECG screen
  ecg.plotValues();

  // Update the information values of the ECG
  ecg.updateInfo();
}

// p5.sound variables
let osc;

function touchStarted() {
  // To prevent sound bugs by browsers asking for permission
  getAudioContext().resume();
}
