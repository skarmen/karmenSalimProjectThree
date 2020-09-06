// Task 1 - create the basic functionality:
// Users can enter tasks into the input field and press add btn to add the task to an unordered list - DONE
// Upon submission, the inputted task will be added to an unordered list below the input field - DONE
// - use conditional here to check if the input is valid - DONE
// Listen to a submit event on the btn - DONE
// Prevent the default behaviour on submit - DONE
// Store the input value in a variable - DONE
// Append that variable to the unordered list - DONE
// Append a list item to the unordered list(can use font - awesome icon for checkbox and garbage can - should be append inside the li) - DONE
// Clear the input field once the form is submitted by setting the input field value to ‘’ (empty quotes) once the form has been submitted - DONE

// Task 2 - manipulate the tasks in the unordered list:
// When a user clicks on the list item’s checkbox icon, the checkbox icon will change to clicked and / or the text color will be greyed out or scratched
// Automatically move completed items to the bottom of the list
// When a user clicks on the list item’s garbage icon, the item will be removed from the list
// When a user clicks on the ‘Clear” btn at the bottom of the list the entire content of the list will be removed.

$(document).ready(function (event) {

  // SUBMIT FUNCTION
  // listen to a click event on the submit btn and prevent the default behaviour of reloading the page
  $('#add-btn').on('click', function (e) {
    console.log('add btn was clicked')
    e.preventDefault()

    // store userInput in a variable
    let userInput = $('input').val().trim() // $.trim has been deprecated in jquery 3.5
    console.log('userInput:', userInput)
    // check if the input is valid
    if (userInput !== '') {
      addTask(userInput)
    }
  })
  // END OF SUBMIT FUNCTION

  
  // ADD TASK FUNCTION
  function addTask(task) {
    // store userInput in a variable
    let userInput = $('input').val().trim() // $.trim has been deprecated in jquery 3.5
    console.log('userInput:', userInput)
    // check if the input is valid
    if (userInput !== '') {

      // create an icon to remove an element from the list
      let removeItemEl = '<span id="remove-item" class="remove-item">x(remove item)</span>'

      // append the added element from the list
      $('ol').append(`<li>${userInput} ${removeItemEl}</li>`);

      // clear the input field once the item is appended to the list
      $('input').val('')

    } else {
      alert('Input cannot be empty. Please enter a valid task.')
    }
  }
  // END OF ADD TASK FUNCTION


  // MARK ITEM AS COMPLETED FUNCTION
  // Task 2 - Manipulate the list items
  // double click doesn't work consistently, i.e. consecutive double-clicks
  // only work if you move the mouse in between them
  let numClicks = 0
  $(document).on('click', 'li', function (e) {
    console.log('click this:', this)
    if (numClicks % 2) {
      $(this).toggleClass('completed') //.fadeOut('slow');
    }
    numClicks += 1;
  });
  // END OF MARK ITEM AS COMPLETED FUNCTION



  // End of Doc ready function
})
