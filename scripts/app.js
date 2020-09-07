// MVP Goals
// Enter task - DONE
// Delete task - DONE
// Clear all tasks - DONE
// Mark task as completed - DONE
// Automatically move completed items at the bottom of the list - DONE

// Stretch Goals
// Allow for the creation of multiple lists(e.g Personal, Work, Entertainment)
// Possibly dropdown menu to select which category you want to open a list for
// Implement Due date on tasks(alert user / change colors of overdue tasks)
// Move tasks to and from different lists
// Edit task(change the task or add more details)
// Move tasks order in the list(Drag & Drop)


// Pseudo Code
// Task 1 - create the basic functionality:
// Users can enter tasks into the input field and press enter or add btn to add the task to an ordered list - DONE
// Upon submission, the inputted task will be added to an ordered list below the input field - DONE
//  - use conditional here to check if the input is valid & handle errors - DONE
//  - Listen to a submit event on the btn - DONE
//  - Prevent the default behavior on submit - DONE
// Store the input value in a variable - DONE
// Append a list item to the ordered list - DONE
//  - append the user input variable wrapped in a list item - DONE
//  - include checkbox and remove btn to the list item - DONE
// Clear the input field once the form is submitted by setting the input field value to ‘’ (empty quotes) once the form has been submitted - DONE

// Task 2 - manipulate the tasks in the ordered list:
// When a user clicks on the list item’s checkbox icon, the checkbox icon will change to clicked and the text color (or background-color of the element) will be changed
// Automatically move completed items to the bottom of the list - DONE
// When a user clicks on the list item’s remove btn, the item will be removed from the list - DONE
// When a user clicks on the ‘Clear” btn at the bottom of the list the entire content of the list will be removed. - DONE


















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
    
    let checkbox = '<input type="checkbox">'
    // append the added element from the list
    $('ol').append(`<li>${checkbox} <span data-id="editable-list-item">${userInput}</span> ${removeItem}</li>`);
    // clear the input field once the item is appended to the list
    $('input').val('')
    configureEditableListItems()
  }

  /* EDIT LIST ITEMS FUNCTION */
  function configureEditableListItems () {
    $("#to-do-list li").on('click', 'span[data-id="editable-list-item"]', function () {
      var $input = $('<input type="text" data-id="editable-list-item">')
      console.log('this editable:', $(this))

      $input.val($(this).html());
      $(this).replaceWith($input);
      $input.focus();
    });

    $("#to-do-list li").on('focusout', 'input[data-id="editable-list-item"]', function () {
      var $span = $('<span data-id="editable-list-item">');
      $span.html($(this).val());
      $(this).replaceWith($span);
    });
  }


  /* MARK ITEM AS COMPLETED FUNCTION
    - mark item as completed & move to the bottom of the list (call moveToBottom)
    - configure the click behaviour
  */
  function configureMarkItemAsCompleted () {
    let checkboxSelector = 'input[type=checkbox]'
    $(document).on('click', checkboxSelector, function (e) {
      console.log('click')

      // toggle completed class
      let toDoItem = $(this).parent()
      $(toDoItem).toggleClass('completed')

      if ($(checkboxSelector).is(':checked')) {
        // store completed item in a variable
        let completedItem = $(toDoItem)

        let itemCompleted = completedItem.hasClass('completed') // returns a boolean

        if (itemCompleted) {
          // console.log('item is completed - move to the bottom', completedItem)
          moveToBottom(completedItem)
        }
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
  function configureRemoveTask () {
    $(document).on('click', '#remove', function () {
      let taskToRemove = $(this).parent() // btn parent -> li
      // console.log('taskToRemove this:', $(this))

      console.log('taskToRemove:', taskToRemove)
      taskToRemove.remove()

    })
  }

  /* CLEAR ENTIRE LIST */
  function configureClearList () {
    $('#clear-btn').on('click', function () {
      $('ol').empty()
    })
  }

  // Function Calls
  configureSubmitBehaviour()
  configureMarkItemAsCompleted()
  configureRemoveTask()
  configureClearList()




  // End of Doc ready function
})
