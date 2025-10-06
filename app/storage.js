define(function () {
  const KEY = "tasks";

  function getTasks() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  }

  function saveTasks(tasks) {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  }

  return {
    getTasks,
    saveTasks,
  };
});
