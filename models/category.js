module.exports = (sequelize, DataTypes) => {
  let Category = sequelize.define("Category", {
    name: DataTypes.STRING
  });

  Category.associate = models => {
    // Associating Category with Food/Drink items
    // When Category is deleted, also delete any associated food items
    Category.hasMany(models.FoodMenu, {
      onDelete: "cascade"
    });
    Category.hasMany(models.DrinkMenu, {
      onDelete: "cascade"
    });
  };

  return Category;
};

$(document).ready(function() {
  // Reference to input field for new category
  var $newItemInput = $('input.new-item');
  // New categories go inside categories-container
  var $categoryContainer = $('.category-container');
  // Event listeners for adding, editing, and deleting categories
  $(document).on('submit' , '#category-form', insertCategory);
  $(document).on('click' , '.category-item', editCategory);
  $(document).on("keyup", ".category-item", finishEdit);
  $(document).on("blur", ".category-item", cancelEdit);
  $(document).on('click' , 'button.delete' , deleteCategory);

  // Initial category array
  var categories = [];

  // Get all existing categories from the database
  getCategories();

  // Refreshes categories displayed
  function initializeRows() {
    $categoryContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < categories; i++) {
      rowsToAdd.push(createNewRow(categories[i]));
    }
    $categoryContainer.prepend(rowsToAdd);
  }

  // grabs categories from the database and updates the view
  function getCategories () {
    $.ajax({
      method: 'GET',
      url: '/categories'
    }).then(function(res) {
      categories = res;
      initializeRows();
    });
  }

  function editCategory() {
    var currentCategory = $(this).data('category');
    $(this).children().hide();
    $(this).children("input.edit").val(currentCategory.name);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  function finishEdit(event) {
    var updatedCategory = $(this).data('category');
    if (event.which === 13) {
      updatedCategory.name = $(this).children("input").val().trim();
      $(this).blur();
      updateCategory(updatedCategory);
    }
  } 
  
  function updateCategory(category) {
    $.ajax({
      method: 'PUT',
      url: '/categories',
      data: category
    }).then(getCategories);
  }

  function cancelEdit() {
    var currentCategory = $(this).data("todo");
    if (currentCategory) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentCategory.name);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

    // This function makes a category row
    function createNewRow(todo) {
      var $newInputRow = $(
        [
          "<li class='list-group-item todo-item'>",
          "<span>",
          todo.text,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "<button class='complete btn btn-primary'>✓</button>",
          "</li>"
        ].join("")
      );
  
      $newInputRow.find("button.delete").data("id", todo.id);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("todo", todo);
    }

    // Inserts a category into the database and updates the view
    function insertCategory(event) {
      event.preventDefault();
      var category = {
        name: $newItemInput.val().trim(),
      };
      $.ajax({
        method: 'POST',
        url: '/categories',
        data: category
      }).then(getCategories);
      $newItemInput.val("");
    }
});