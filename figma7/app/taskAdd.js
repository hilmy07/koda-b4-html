define(["jquery", "storage", "render"], function ($, storage, render) {
  function addNewTask() {
    const name = $("#task-name").val().trim();
    const desc = $("#task-desc").val().trim();
    const date = $("#task-date").val();

    if (!name) {
      alert("Nama tugas wajib diisi!");
      return;
    }

    const tasks = storage.getTasks();
    tasks.push({ name, desc, date });
    storage.saveTasks(tasks);

    $("#task-name, #task-desc, #task-date").val("");
    $("#pending-container").addClass("hidden");

    render.renderTasks();
  }

  return { addNewTask };
});
