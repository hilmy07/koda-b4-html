define(["storage", "render"], function (storage, render) {
  function add(taskIndex) {
    const subtaskName = prompt("Masukkan nama subtask:");
    if (!subtaskName || !subtaskName.trim()) return;

    const tasks = storage.getTasks();
    if (!tasks[taskIndex].subtasks) {
      tasks[taskIndex].subtasks = [];
    }

    tasks[taskIndex].subtasks.push({
      name: subtaskName.trim(),
      completed: false,
    });

    storage.saveTasks(tasks);

    // Notifikasi sukses (alert biasa)
    alert("Subtask berhasil ditambahkan!");

    // Render ulang untuk menampilkan perubahan
    render.renderTasks();
  }

  return { add };
});
