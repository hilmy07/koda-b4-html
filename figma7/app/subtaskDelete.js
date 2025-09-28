define(["storage"], function (storage) {
  function setup($subtaskElem, taskIndex, subtaskName) {
    $subtaskElem.find(".subtask-delete").on("click", () => {
      const tasks = storage.getTasks();
      tasks[taskIndex].subtasks = tasks[taskIndex].subtasks.filter(
        (st) => st.name !== subtaskName
      );
      storage.saveTasks(tasks);
      $subtaskElem.remove();
    });
  }

  return { setup };
});
