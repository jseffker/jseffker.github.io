// 1. Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function generatePitch(frequency, duration) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

  // Smooth fade out to avoid clicks
  gainNode.gain.setValueAtTime(1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);

  // CRITICAL: Cleanup after the sound finishes
  oscillator.onended = () => {
    gainNode.disconnect();
    oscillator.disconnect();
  };
}

// scale degree
const scale_degree = [1, 9 / 8, 5 / 4, 4 / 3, 3 / 2, 5 / 3, 15 / 8, 2]
const chord_set = {
  1: [0, 2, 4],
  2: [1, 3, 5],
  3: [2, 4, 6],
  4: [3, 5, 7],
  5: [4, 6, 1],
  6: [5, 7, 2],
  7: [6, 1, 3]
}

// Example usage: Play a 440 Hz tone (A4) for 1 second
function play_note(scale_degree_multiplier) {
  generatePitch(tonic * scale_degree_multiplier, 0.5);
}

let play_ID;
let chord_switch_ID;
function play_chord() {
  let chord_index = 0
  let chord_switch = false
  chord_switch_ID = setInterval(() => {
    chord_switch = true
  }, 4000)
  play_ID = setInterval(() => {
    if (chord_switch === true) {
      chord_index = (chord_index + 1) % chords.length
      chord_switch = false;
    }
    let current_chord_degree = chords[chord_index]
    let current_chord_numbers = chord_set[current_chord_degree]
    let random_0_thru_2 = Math.floor(Math.random() * current_chord_numbers.length)
    let note = current_chord_numbers[random_0_thru_2]
    console.log(note)

    play_note(scale_degree[note])
  }, 500)
}
tonic = 440
setInterval(()=> {
  tonic = Math.random() * 660 + 220
}, 5000)
chords = [1, 4, 5, 1]

// setInterval(() => {
//   play_note(1)
// }, 500)
let start_button = document.getElementById("start")
start_button.onclick = ()=>{
  clearInterval(play_ID);
  clearInterval(chord_switch_ID);
  play_chord()
}

let end_button = document.getElementById("end")
end_button.onclick = ()=>{
  clearInterval(play_ID);
  clearInterval(chord_switch_ID);
}

// next: see what God wants you to do.
// Create in a way that creates quick value as much as possible. Writing is great and some coding but not all coding.
// - Maybe next you can have multiple chord patterns playing at a time and overlapping and things.
// - create a different tonic at random times