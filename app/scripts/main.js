var socket = io.connect('http://localhost:5000/');  
var baseUrl = "http://theshepherd.herokuapp.com/api/";

var keymap = {
  87: {
    event: 'move',
    action: 'front'
  },
  83: {
    event: 'move',
    action: 'back'
  },
  65: {
    event: 'move',
    action: 'left'
  },
  68: {
    event: 'move',
    action: 'right'
  },
  38: {
    event: 'move',
    action: 'up'
  },
  40: {
    event: 'move',
    action: 'down'
  },
  37: {
    event: 'move',
    action: 'counterClockwise'
  },
  39: {
    event: 'move',
    action: 'clockwise'
  },
  32: {
    event: 'drone',
    action: 'takeoff'
  },
  27: {
    event: 'drone',
    action: 'land'
  },
};