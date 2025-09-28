define(["storage", "render"], function (storage, render) {
  function deleteTask(index) {
    if (!confirm("Hapus task ini?")) return;

    const tasks = storage.getTasks();
    tasks.splice(index, 1);
    storage.saveTasks(tasks);

    render.renderTasks();
  }

  return { deleteTask };
});
