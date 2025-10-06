define([
  "jquery",
  "storage",
  "render",
  "taskAdd",
  "taskDelete",
  "taskRename",
  "subtaskAdd",
  "subtaskDelete",
], function (
  $,
  storage,
  render,
  taskAdd,
  taskDelete,
  taskRename,
  subtaskAdd,
  subtaskDelete
) {
  const $btnAddTask = $("#btn-add-task");
  const $btnSaveTask = $("#btn-save-task");
  const $pendingContainer = $("#pending-container");
  const $btnSort = $("#btn-sort");
  const $sortPopup = $("#sort-popup");
  const $toggleCompleted = $("#toggle-completed");
  const $completedTasks = $("#completed-tasks");
  const $arrow = $toggleCompleted.find(".arrow");
  const $taskContainer = $("#dynamic-tasks");

  // Setup all event handlers and connect with modules
  function setupEvents() {
    const totalTasks = storage.getTasks().length;
    console.log(`Total tasks: ${totalTasks}`);

    $btnAddTask.on("click", () => {
      $pendingContainer.toggleClass("hidden");
    });

    $btnSaveTask.on("click", () => {
      taskAdd.addNewTask();
      render.renderTasks(); // refresh after add
    });

    $btnSort.on("click", () => {
      $sortPopup.toggleClass("hidden");
    });

    $(document).on("click", (e) => {
      if (!$(e.target).closest("#btn-sort, #sort-popup").length) {
        $sortPopup.addClass("hidden");
      }
    });

    $toggleCompleted.on("click", () => {
      $completedTasks.toggleClass("hidden");
      $arrow.toggleClass("rotate-90");
    });

    // Delegated event listeners for dynamic tasks inside taskContainer
    $taskContainer.on("click", ".btn-delete", function () {
      const index = $(this).closest(".task-item").data("index");
      taskDelete.deleteTask(index);
      render.renderTasks();
    });

    $taskContainer.on("click", ".btn-rename", function () {
      const index = $(this).closest(".task-item").data("index");
      taskRename.renameTask(index);
      render.renderTasks();
    });

    $taskContainer.on("click", ".btn-add-subtask", function () {
      const index = $(this).closest(".task-item").data("index");
      subtaskAdd.add(index);
      render.renderTasks();
    });

    $taskContainer.on("click", ".btn-subtask-delete", function () {
      const $taskItem = $(this).closest(".task-item");
      const taskIndex = $taskItem.data("index");
      const subtaskName = $(this)
        .closest(".subtask-item")
        .find(".subtask-name")
        .text();
      subtaskDelete.deleteSubtask(taskIndex, subtaskName);
      render.renderTasks();
    });
  }

  function init() {
    render.renderTasks();
    setupEvents();
  }

  init();
});
