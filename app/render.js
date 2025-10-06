define([
  "jquery",
  "storage",
  "taskRename",
  "taskDelete",
  "subtaskAdd",
  "subtaskDelete",
], function ($, storage, taskRename, taskDelete, subtaskAdd, subtaskDelete) {
  function renderTasks() {
    const tasks = storage.getTasks();
    const $container = $("#dynamic-tasks");
    const $template = $("#task-template");

    $container.empty();

    tasks.forEach((task, index) => {
      const $clone = $($template.html());
      const menuToggleId = `menu-toggle-${index}`;

      $clone.find(".task-menu-toggle").attr("id", menuToggleId);
      $clone.find("label[for='menu-toggle-{{id}}']").attr("for", menuToggleId);

      const $details = $clone.find("details");
      $details.data("index", index);

      $clone.find(".task-title").text(task.name);
      $clone.find(".task-date").text(task.date || "Tanpa Tanggal");
      $clone.find(".task-desc").text(task.desc || "");

      // Rename
      $clone
        .find(".btn-rename")
        .on("click", () => taskRename.renameTask(index));

      // Delete
      $clone
        .find(".btn-delete")
        .on("click", () => taskDelete.deleteTask(index));

      // Subtasks
      const $subtaskList = $clone.find(".subtask-list");
      const $subtaskTemplate = $subtaskList.find(".subtask-item.hidden");

      // Clear existing subtasks except template
      $subtaskList.find(".subtask-item:not(.hidden)").remove();

      (task.subtasks || []).forEach((st) => {
        const $stClone = $subtaskTemplate.clone().removeClass("hidden");
        $stClone.find(".subtask-name").text(st.name);
        $stClone
          .find(".subtask-checkbox")
          .prop("checked", st.completed || false);
        subtaskDelete.setup($stClone, index, st.name);
        $subtaskList.append($stClone);
      });

      // Add subtask button
      $clone.find(".btn-add-subtask").on("click", () => subtaskAdd.add(index));

      $container.append($clone);
    });
  }

  return {
    renderTasks,
  };
});
