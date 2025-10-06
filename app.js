require.config({
  baseUrl: "app",
  paths: {
    jquery: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min",
    storage: "storage",
    render: "render",
    taskAdd: "taskAdd",
    taskDelete: "taskDelete",
    taskRename: "taskRename",
    subtaskAdd: "subtaskAdd",
    subtaskDelete: "subtaskDelete",
  },
});

require(["main"], function () {
  console.log("Main loaded");
});
