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








$(document).ready(function (event) {

  /* SUBMIT FUNCTION
    - listen to a click event on submit & prevent the default behaviour of the submit event
    - validate the userInput and add it to the list by calling (addTask f)
  */
  function configureSubmitBehaviour () {
    $('#add-btn').on('click', function (e) {
      e.preventDefault()

      // store userInput in a variable
      let userInput = $('#new-task').val().trim() // $.trim has been deprecated in jquery 3.5

      // check if the input is valid
      if (userInput !== '') {
        addTask(userInput)
      } else {
        alert('Input cannot be empty. Please enter a valid task.')
      }
    })
  }

  /* Add a list title
    // have an editable input tag in the index.html file with a placeholder "New List Tittle"
    // the user can enter an input
    // on enter or focusout out of the input element the text should be saved as an h tag
  // on dblcick the h tag will turn into an input field again and the user can edit the title

  */
  // function addListTitle () {

  function onEdit(result) {
    // console.log(
    //   'onEdit()',
    //   'this:', this,
    //   'result:', result,
    // ),
    return result
  }

  $('.editable').editable(onEdit, {
    tooltip: 'Click to edit..'
  })

  //   $('#new-list-title').on('keyup', function (e) {
  //     if (e.keyCode === 13) {
  //       console.log('pressed enter') // this works
  //       console.log('this in addListTitle:', $(this)) // the input field

  //       // store the list title entered by the user
  //       const listTitleInput = $('#new-list-title').val().trim()
  //       console.log('listTitle:', listTitleInput)

  //       const titleEl = $('<h3 id="list-heading"></h3>')
  //       console.log('titleEl', titleEl)

  //       $('ol').append(titleEl)

  //       titleEl.html($(this).val())
  //       console.log('titleEl this', $(this))
  //       // const $newListTitle = $(`<h3 id="list-heading"> ${listTitleInput} </h3>`)
  //       // console.log('newListTitle:', $newListTitle)

  //       $(this).replaceWith(titleEl) // replace the actual el = input => h3

  //     }
  //   })

  //   $("#list-heading").on('dblclick', function () {
  //     console.log('h3', $(this))
  //     console.log('this is working')

  //     // let $input = $('<input type="text" data-id="editable-list-item">')

  //     // $input.val($(this).html()) // replace the content of the el
  //     // console.log('this editable:', $(this)) // this = span

  //     // $(this).replaceWith($input) // replace the actual el
  //     // $input.focus()
  //   })
  // }

  // addListTitle()



  /* ADD TASK FUNCTION
    - add the user input to the list
    - clear the input field
    - function is called upon submit
  */
  function addTask(task) {
    // store userInput in a variable
    let userInput = $('#new-task').val().trim() // $.trim has been deprecated in jquery 3.5

    // create aa btn to remove an element from the list
    let removeItem = '<button id="remove">x</button>'

    // create a checkbox to use for checking completed items
    let checkbox = '<input type="checkbox">'

    // append the added element from the list
    $('ol').append(`<li>${checkbox} <span data-id="editable-list-item">${userInput}</span> ${removeItem}</li>`);
    // clear the input field once the item is appended to the list
    $('#new-task').val('')
    configureEditableListItems()

    // drag & drop - need to look into accessability in order to use it
    // $(".sortable").sortable()

  }

  // Using jQuery Editable library - alternative to configureEditableListItems
  // function onEdit(result) {
  //   console.log(
  //     'onEdit()',
  //     'this:', this,
  //     'result:', result,
  //   )
  //   return result
  // }
  //$('.editable').editable(onEdit)


  /* EDIT LIST ITEMS FUNCTION
    - replace the span content with the input value entered by the user
    - replace the span element with the input element
    - reverse on focusout event
  */
  function configureEditableListItems () {
    // from https://stackoverflow.com/questions/45985601/how-do-i-make-an-editable-ul-li-list-using-jquery
    // can be done with editable as well
    $("#to-do-list li").on('dblclick', 'span[data-id="editable-list-item"]', function () {
      let $input = $('<input type="text" data-id="editable-list-item">')

      $input.val($(this).html()) // replace the content of the el
      console.log('this editable:', $(this)) // this = span

      $(this).replaceWith($input) // replace the actual el
      $input.focus()
    })

    $("#to-do-list li").on('keyup focusout', 'input[data-id="editable-list-item"]', function (e) {
      if(e.keyCode === 13 || e.type ==='focusout') {

        let $span = $('<span data-id="editable-list-item">')

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
