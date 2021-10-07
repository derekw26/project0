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

const hStrike = [$('#h1'), $('#h2'), $('#h3')];
const vStrike = [$('#v1'), $('#v2'), $('#v3')];
const dStrike = [$('#d1'), $('#d2')];

const winCheckX = function() {

  // horizontal
  for (let i = 0; i < gameBoard.length; i++) {
    if ( gameBoard[i][0].hasClass('Xclicked') && gameBoard[i][1].hasClass('Xclicked') && gameBoard[i][2].hasClass('Xclicked')) {
      hStrike[i].addClass('active Xwin');
      winCounterX++;
      return true;
    }
  }
  // vertical
  for (let i = 0; i < gameBoard.length; i++) {
    if ( gameBoard[0][i].hasClass('Xclicked') && gameBoard[1][i].hasClass('Xclicked') && gameBoard[2][i].hasClass('Xclicked')) {
      vStrike[i].addClass('active Xwin');
      winCounterX++;
      return true;
    }
  }
  // diagonals
  if ( gameBoard[0][0].hasClass('Xclicked') && gameBoard[1][1].hasClass('Xclicked') && gameBoard[2][2].hasClass('Xclicked')) {
    dStrike[0].addClass('active Xwin');
    winCounterX++;
    return true;

  }
  if ( gameBoard[0][2].hasClass('Xclicked') && gameBoard[1][1].hasClass('Xclicked') && gameBoard[2][0].hasClass('Xclicked')) {
    dStrike[1].addClass('active Xwin');
    winCounterX++;
    return true;
  }
  return false;
}

const winCheckO = function() {

  // horizontal
  for (let i = 0; i < gameBoard.length; i++) {
    if ( gameBoard[i][0].hasClass('Oclicked') && gameBoard[i][1].hasClass('Oclicked') && gameBoard[i][2].hasClass('Oclicked')) {
      hStrike[i].addClass('active Owin');
      winCounterO++;
      return true;
    }
  }
  // vertical
  for (let i = 0; i < gameBoard.length; i++) {
    if ( gameBoard[0][i].hasClass('Oclicked') && gameBoard[1][i].hasClass('Oclicked') && gameBoard[2][i].hasClass('Oclicked')) {
      vStrike[i].addClass('active Owin');
      winCounterO++;
      return true;
    }
  }
  // diagonals
  if ( gameBoard[0][0].hasClass('Oclicked') && gameBoard[1][1].hasClass('Oclicked') && gameBoard[2][2].hasClass('Oclicked')) {
    dStrike[0].addClass('active Owin');
    winCounterO++;
    return true;
  }
  if ( gameBoard[0][2].hasClass('Oclicked') && gameBoard[1][1].hasClass('Oclicked') && gameBoard[2][0].hasClass('Oclicked')) {
    dStrike[1].addClass('active Owin');
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
  $('#info').html('Select X or O to go first:');
  $('#reset-button').removeClass('active');
  $('.hstrike').removeClass('active Xwin Owin');
  $('.vstrike').removeClass('active Xwin Owin');
  $('.dstrike').removeClass('active Xwin Owin');
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
            $('#info').html(`It's a draw!`);
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

// upload user tokens for X and O

$('#X-upload').on('change', function () {
    const fileData = $('#X-upload').prop('files')[0];
    let reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = function () {
      $('.x-image').attr('src', reader.result);
    }
    reader.onerror = function (error) {
      prompt('Error: ', error);
    }
});

$('#O-upload').on('change', function () {
    const fileData = $('#O-upload').prop('files')[0];
    let reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = function () {
      $('.o-image').attr('src', reader.result);
    }
    reader.onerror = function (error) {
      prompt('Error: ', error);
    }
});

// });

// HIGH PRIORITY
// scale game for different screen sizes
// add LocalStorage functionality
// add half opacity for X and O when cursor hovers over grid cells
// change font type
