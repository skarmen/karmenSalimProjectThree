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
// When a user clicks on the list item’s checkbox icon, the checkbox icon will change to clicked and / or the text color will be greyed out or scratched - DONE
// Automatically move completed items to the bottom of the list - DONE
// When a user clicks on the list item’s garbage icon, the item will be removed from the list
// When a user clicks on the ‘Clear” btn at the bottom of the list the entire content of the list will be removed.

$(document).ready(function (event) {

  /* SUBMIT FUNCTION
    - listen to a click event on submit & prevent the default behaviour of the submit event
    - validate the userInput and add it to the list by calling (addTask f)
  */
  function configureSubmitBehaviour () {
    $('#add-btn').on('click', function (e) {
      e.preventDefault()

      // store userInput in a variable
      let userInput = $('input').val().trim() // $.trim has been deprecated in jquery 3.5

      // check if the input is valid
      if (userInput !== '') {
        addTask(userInput)
      } else {
        alert('Input cannot be empty. Please enter a valid task.')
      }
    })
  }


  /* ADD TASK FUNCTION
    - add the user input to the list
    - clear the input field
    - function is called upon submit
  */
  function addTask(task) {
    // store userInput in a variable
    let userInput = $('input').val().trim() // $.trim has been deprecated in jquery 3.5

    // create an icon to remove an element from the list
    // let removeItemEl = '<span id="remove-item" class="remove-item">x(remove item)</span>'
    let removeItem = '<button id="remove">x</button>'

    //
    let checkbox = '<input type="checkbox">'
    // append the added element from the list
    $('ol').append(`<li>${checkbox} ${userInput} ${removeItem}</li>`);

    // clear the input field once the item is appended to the list
    $('input').val('')

  }


  /* MARK ITEM AS COMPLETED FUNCTION
    - mark item as completed & move to the bottom of the list (call moveToBottom)
    - configure the click behaviour
  */
  function markItemAsCompleted () {
    let checkboxSelector = 'input[type=checkbox]'
    $(document).on('click', 'li', function (e) {

      if ($(checkboxSelector ).is(':checked')) {
        $(this).toggleClass('completed')
        console.log('toggle class this:' , $(this))


        // store completed item in a variable
        let completedItem = $(this)

        let itemCompleted = completedItem.hasClass('completed') // returns a boolean

        if (itemCompleted) {
          // let completedItem = $(this)
          console.log('item is completed - move to the bottom', completedItem)
          moveToBottom(completedItem)
        }
      } else {
        $(this).removeClass('completed')

      }
    })
  }



  // MOVE COMPLETED ITEMS TO THE BOTTOM OF THE LIST
  function moveToBottom(item) {
    item.fadeOut(function () {
      item.appendTo($('ol'))
      item.fadeIn()
    })
  }

  /* REMOVE ITEM FROM THE LIST */
  function removeTask () {
    $(document).on('click', '#remove', function () {
      let taskToRemove = $(this).parent() // btn parent -> li
      // console.log('taskToRemove this:', $(this))

      console.log('taskToRemove:', taskToRemove)
      taskToRemove.remove()

    })
  }

  /* CLEAR ENTIRE LIST */
  function clearList () {
    $('#clear-btn').on('click', function () {
      $('ol').empty()
    })
  }

  // Function Calls
  configureSubmitBehaviour()
  markItemAsCompleted()
  removeTask()
  clearList()




  // End of Doc ready function
})
