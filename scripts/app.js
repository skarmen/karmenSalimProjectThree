// MVP Goals
// Add task - DONE
// Edit task - DONE
// Delete task - DONE
// Clear all tasks - DONE
// Mark task as completed - DONE
// Automatically move completed items at the bottom of the list - DONE



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
// When a user clicks on the list item’s checkbox icon, the checkbox icon will change to clicked and the text color (or background-color of the element) will be changed - DONE
// - look into different styling options
// Automatically move completed items to the bottom of the list - DONE
// When a user clicks on the list item’s remove btn, the item will be removed from the list - DONE
// When a user clicks on the ‘Clear” btn at the bottom of the list the entire content of the list will be removed. - DONE
// Edit tasks in the list - save the edit on enter or focus out of the field - DONE


// Task 3 - insert a new list on user input


// Stretch Goals
// Allow for the creation of multiple lists(e.g Personal, Work, Entertainment)
// Possibly dropdown menu to select which category you want to open a list for
// Implement Due date on tasks(alert user / change colors of overdue tasks)
// Move tasks to and from different lists
// Edit task(change the task or add more details)
// Move tasks order in the list(Drag & Drop) - DONE
//  - figure out how to implement this across lists
// Name Each Taskboard




const toDoApp = {}

/* SUBMIT FUNCTION
   - listen to a click event on submit & prevent the default behaviour of the submit event
   - validate the userInput and add it to the list by calling (addTask f)
 */
toDoApp.configureSubmitBehaviour = function () {
  // $('.add-new-task-btn').off('click') // turn off any click event listeners
  $('.main').on('click', '.add-new-task-btn', function (e) {
    e.preventDefault()

    const $addTaskBtn = $(e.target)
    console.log('addBtn:', $addTaskBtn)

    const $eventTargetPreviousEl = $(e.target).prev() // e target = btn, so we are looking for the input field before the add task btn
    console.log('e target:', e.target, 'this:', $(this))

    console.log('evenTargetPreviousEl:', $eventTargetPreviousEl)

    // store userInput in a variable
    const $userInput = $($eventTargetPreviousEl).val().trim() // $.trim has been deprecated in jquery 3.5
    console.log('userInput:', $userInput)


    // check if the input is valid
    if ($userInput !== '') {
      toDoApp.addTask($userInput, $addTaskBtn)
    } else {
      alert('Input cannot be empty. Please enter a valid task.')
    }
  })
}


 /* CONFIGURE ADD CARD BEHAVIOUR
  - on btn click calls the addCard() function to create a new card on the page
  -
*/
toDoApp.configureAddCardBehaviour = function () {
  $('#add-new-card-btn').on('click', function (e) {
    e.preventDefault()

    // creates a new card
    toDoApp.addCard()
    // toDoApp.configureSubmitBehaviour()
  })
}
/* ADD NEW CARD FUNCTION
  - dynamically creates a div with the html elements to be inserted on the page
  - appends that div to the page
*/
toDoApp.addCard = function () {
  const $taskCardContainer = $(`
     <div class="task-card">
        <h2 class="editable"></h2>
        <!-- Input New Task  -->
        <form>
          <label for="new-task" class="sr-only">New Task</label>
          <input class="new-task" type="text" placeholder="New Task" name="new-task"/>
          <button type="submit" class="btn add-new-task-btn">Add</button>
        </form>


        <!-- Task List -->
        <ol class="to-do-list">

          <!-- To do items added dynamically here -->
        </ol>
        <button class="btn clear-list-btn">Clear</button>
      </div>
      <!-- Task Card ENDS -->
    `)

  $('.task-board-container').append($taskCardContainer)
  console.log('addList works')

  // Add editable title on all new cards
  toDoApp.configureCardTitle()




}


/* ADD TASK FUNCTION
    - add the user input to the list
    - clear the input field
    - function is called upon submit
  */
toDoApp.addTask = function ($userInput, $addTaskBtn) {

  console.log('addBtn parent next', $($addTaskBtn).parent())

  // create aa btn to remove an element from the list
  const removeItem = '<button id="remove">x</button>'

  // create a checkbox to use for checking completed items
  const checkbox = '<input type="checkbox">'

  // append the added element from the list
  $($addTaskBtn).parent().next('ol').append(`<li>${checkbox} <span data-id="editable-list-item">${$userInput}</span> ${removeItem}</li>`);
  // clear the input field once the item is appended to the list
  $('.new-task').val('')
  toDoApp.configureEditableListItems()

  // drag & drop - need to look into accessability in order to use it
  // $(".sortable").sortable()
}


/* ADD/ EDIT A LIST TITLE FUNCTION
  */
toDoApp.onCardTitleEdit = function (result) {
  console.log(
    'onCardTitleEdit()',
    'this:', this,
    'result:', result,
  )
  return result
}

toDoApp.configureCardTitle = function () {
  $('.editable').editable(toDoApp.onCardTitleEdit, {
    tooltip: 'Click to edit list title',
    placeholder: 'Click to edit list title',
  })
}


/* EDIT LIST ITEMS FUNCTION
    - replace the span content with the input value entered by the user
    - replace the span element with the input element
    - reverse on focusout event
  */
toDoApp.configureEditableListItems = function c() {
  // from https://stackoverflow.com/questions/45985601/how-do-i-make-an-editable-ul-li-list-using-jquery
  // can be done with editable as well
  $(".to-do-list li").on('dblclick', 'span[data-id="editable-list-item"]', function () {
    const $input = $('<input type="text" data-id="editable-list-item">')

    $input.val($(this).html()) // replace the content of the el
    console.log('this editable:', $(this)) // this = span

    $(this).replaceWith($input) // replace the actual el
    $input.focus()
  })

  $(".to-do-list li").on('keyup focusout', 'input[data-id="editable-list-item"]', function (e) {
    if (e.keyCode === 13 || e.type === 'focusout') {

      const $span = $('<span data-id="editable-list-item">')

      $span.html($(this).val())
      console.log('focusout this:', $(this)) // this = input

      $(this).replaceWith($span)
    }
  })
}


/* MARK ITEM AS COMPLETED FUNCTION
    - mark item as completed & move to the bottom of the list (call moveToBottom)
    - configure the click behaviour
  */
toDoApp.configureMarkItemAsCompleted = function () {
  const checkboxSelector = 'input[type=checkbox]'
  $('.main').on('click', checkboxSelector, function (e) {
    console.log('click')

    const $toDoItem = $(this).parent() // list item, this = checkbox
    console.log('$toDoItem:', $toDoItem, 'this:', $(this))


    const $listToAppend = $(this).closest('ol')
    console.log('$listToAppend:', $listToAppend)

     // toggle completed class
    $($toDoItem).toggleClass('completed')

    if ($(checkboxSelector).is(':checked')) {
      // store completed item in a variable
      const $completedItem = $($toDoItem)

      const itemCompleted = $completedItem.hasClass('completed') // returns a boolean

      if (itemCompleted) {
        // console.log('item is completed - move to the bottom', completedItem)
        toDoApp.moveToBottom($completedItem, $listToAppend)
      }
    }
  })
}


// MOVE COMPLETED ITEMS TO THE BOTTOM OF THE LIST
toDoApp.moveToBottom = function (item, list) {
  item.fadeOut(function () {
    item.appendTo(list)
    item.fadeIn()
  })
}


/* REMOVE ITEM FROM THE LIST */
toDoApp.configureRemoveTask = function () {
  $('.main').on('click', '#remove', function () {
    const $taskToRemove = $(this).parent() // btn parent -> li
    // console.log('taskToRemove this:', $(this))

    console.log('taskToRemove:', $taskToRemove)
    $taskToRemove.remove()

  })
}


/* CLEAR ENTIRE LIST
  - clear the entire list on btn click
  - find the selected sibling of the event target and clear the content inside
   the sibling element
*/
toDoApp.configureClearList = function () {
  $('.main').on('click', '.clear-list-btn', function (e) {

    console.log('clear list this:', $(this), 'siblings of this: ',
    $(this).siblings('.to-do-list')) // this = clear btn

    // find the sibling on the "Clear" btn and empty that sibling (ol)
    $(this).siblings('ol').empty()
  })
}



// Code to kick off the app
toDoApp.init = function () {
  // Function Calls
  toDoApp.configureAddCardBehaviour()
  toDoApp.configureSubmitBehaviour()
  toDoApp.configureMarkItemAsCompleted()
  toDoApp.configureRemoveTask()
  toDoApp.configureClearList()

}

// Everything that needs to run on page load
$(function () {
  toDoApp.init()
})
