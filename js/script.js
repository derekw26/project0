// $(document).ready(function() {

const gameBoard = [
  [$('#1-1'), $('#1-2'), $('#1-3')],
  [$('#2-1'), $('#2-2'), $('#2-3')],
  [$('#3-1'), $('#3-2'), $('#3-3')]
];

// board display functions

const displayX = function($cell) {


  if ($cell.hasClass('Oclicked')) {
    return false;
  } else {
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        if ($cell[0] === gameBoard[i][j][0]) {
            $(`#x${i+1}-${j+1}`).addClass('clicked');
            $(`#${i+1}-${j+1}`).addClass('Xclicked');
        }
      }
    }
  }
}

const displayO = function($cell) {

  if ($cell.hasClass('Xclicked')) {
    return false;
  } else {
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        if ($cell[0] === gameBoard[i][j][0]) {
            $(`#o${i+1}-${j+1}`).addClass('clicked');
            $(`#${i+1}-${j+1}`).addClass('Oclicked');
        }
      }
    }
  }
}

// end game functions

let winCounterX = 0;
let winCounterO = 0;

const winCheckX = function() {

  // horizontal
  for (let i = 0; i < gameBoard.length; i++) {
    if ( gameBoard[i][0].hasClass('Xclicked') && gameBoard[i][1].hasClass('Xclicked') && gameBoard[i][2].hasClass('Xclicked')) {
      winCounterX++;
      return true;
    }
  }
  // vertical
  for (let i = 0; i < gameBoard.length; i++) {
    if ( gameBoard[0][i].hasClass('Xclicked') && gameBoard[1][i].hasClass('Xclicked') && gameBoard[2][i].hasClass('Xclicked')) {
      winCounterX++;
      return true;
    }
  }
  // diagonals
  if ( gameBoard[0][0].hasClass('Xclicked') && gameBoard[1][1].hasClass('Xclicked') && gameBoard[2][2].hasClass('Xclicked')) {
    winCounterX++;
    return true;

  }
  if ( gameBoard[0][2].hasClass('Xclicked') && gameBoard[1][1].hasClass('Xclicked') && gameBoard[2][0].hasClass('Xclicked')) {
    winCounterX++;
    return true;
  }
  return false;
}

const winCheckO = function() {

  // horizontal
  for (let i = 0; i < gameBoard.length; i++) {
    if ( gameBoard[i][0].hasClass('Oclicked') && gameBoard[i][1].hasClass('Oclicked') && gameBoard[i][2].hasClass('Oclicked')) {
      winCounterO++;
      return true;
    }
  }
  // vertical
  for (let i = 0; i < gameBoard.length; i++) {
    if ( gameBoard[0][i].hasClass('Oclicked') && gameBoard[1][i].hasClass('Oclicked') && gameBoard[2][i].hasClass('Oclicked')) {
      winCounterO++;
      return true;
    }
  }
  // diagonals
  if ( gameBoard[0][0].hasClass('Oclicked') && gameBoard[1][1].hasClass('Oclicked') && gameBoard[2][2].hasClass('Oclicked')) {
    winCounterO++;
    return true;
  }
  if ( gameBoard[0][2].hasClass('Oclicked') && gameBoard[1][1].hasClass('Oclicked') && gameBoard[2][0].hasClass('Oclicked')) {
    winCounterO++;
    return true;
  }
  return false;
}

const drawCheck = function() {
  if (winCheckX() || winCheckO()) {
    return false;
  } else {
    return true;
  }
}

// button click functions

$('#X-button').on('click', function() {
  $('#X-button').addClass('active');
  $('#O-button').removeClass('active');
});

$('#O-button').on('click', function() {
  $('#O-button').addClass('active');
  $('#X-button').removeClass('active');
});

$('#reset-button').on('click', function() {
  $('.x-image').removeClass('clicked');
  $('.o-image').removeClass('clicked');
  $('#O-button').removeClass('active').prop('disabled', false);
  $('#X-button').removeClass('active').prop('disabled', false);
  $('.cell').removeClass('Xclicked Oclicked')
  $('#info').html('Select who goes first:');
  $('#reset-button').removeClass('active');
});

// board click functions

for (let i = 0; i < gameBoard.length; i++) {
  for (let j = 0; j < gameBoard[i].length; j++) {

      $(`#${i+1}-${j+1}`).on('click', function() {

        // first click of the board after X or O is selected to go first
        if (!$(`#${i+1}-${j+1}`).is('.Xclicked, .Oclicked') && ($('#X-button').is('.active') || $('#O-button').is('.active'))) {
          $('#X-button').addClass('unclickable');
          $('#O-button').addClass('unclickable');
          $('#info').html('Current turn:');
        }

        // prevents a cell from changing if it already has an X or O in it
        // prevents the board from changing if neither X or O has been selected to start or when the game is finished
        if ($(`#${i+1}-${j+1}`).is('.Xclicked, .Oclicked') || !($('#X-button').is('.active') || $('#O-button').is('.active'))) {
          return false;

        // subsequent clicks of the board after the first X or O has been placed
        } else {
          if ($("#X-button").hasClass('active')) {
            displayX($(`#${i+1}-${j+1}`));
            $("#X-button").removeClass('active');
            $("#O-button").addClass('active');
            if (winCheckX()) {
              $('#info').html('X wins!');
              $("#O-button").removeClass('active');
              $('#reset-button').addClass('active');
            }
          } else {
            displayO($(`#${i+1}-${j+1}`));
            $("#O-button").removeClass('active');
            $("#X-button").addClass('active');
            if (winCheckO()) {
              $('#info').html('O wins!');
              $("#X-button").removeClass('active');
              $('#reset-button').addClass('active');
            }
          }
        }

        // disables X and O buttons after first X or O has been placed
        if ($('#X-button').is('.unclickable') || $('#O-button').is('.unclickable')) {
          $('#X-button').prop('disabled', true);
          $('#O-button').prop('disabled', true);
        }

        // check for draw after grid is full
        if ($('.cell').length === $('.Xclicked').length + $('.Oclicked').length) {
          if (drawCheck()) {
            $('#info').html(`DRAW`);
            $("#O-button").removeClass('active');
            $("#X-button").removeClass('active');
            $('#reset-button').addClass('active');
          }
        }
        // update score counter
        $('#X-score').html(winCounterX);
        $('#O-score').html(winCounterO);

      });
  }
}

// });

// HIGH PRIORITY
// display visual line through win path
// scale game for different screen sizes

// LOW PRIORITY
// add game round indicator
// direct user to reset button
// add LocalStorage functionality
// add half opacity for X and O when cursor hovers over grid cell
// alter visual button display according to X or O win or draw
// add fade out transition for X and O button when turn switches
// change font type
// can replace .hasClass('classname') with .is('.classname')
