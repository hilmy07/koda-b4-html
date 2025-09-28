define(["storage", "render"], function (storage, render) {
  function renameTask(index) {
    const tasks = storage.getTasks();
    const newName = prompt("Masukkan nama baru:", tasks[index].name);
    if (newName) {
      tasks[index].name = newName;
      storage.saveTasks(tasks);
      render.renderTasks();
    }
  }

  return { renameTask };
});
