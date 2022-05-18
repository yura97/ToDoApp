using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaskGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TaskGroupName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskGroups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TaskName = table.Column<string>(type: "TEXT", nullable: true),
                    IsDone = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ToDos",
                columns: table => new
                {
                    TaskGroupId = table.Column<int>(type: "INTEGER", nullable: false),
                    TaskId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToDos", x => new { x.TaskId, x.TaskGroupId });
                });

            migrationBuilder.CreateTable(
                name: "TaskDbToDoDb",
                columns: table => new
                {
                    TasksId = table.Column<int>(type: "INTEGER", nullable: false),
                    ToDosTaskId = table.Column<int>(type: "INTEGER", nullable: false),
                    ToDosTaskGroupId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskDbToDoDb", x => new { x.TasksId, x.ToDosTaskId, x.ToDosTaskGroupId });
                    table.ForeignKey(
                        name: "FK_TaskDbToDoDb_Tasks_TasksId",
                        column: x => x.TasksId,
                        principalTable: "Tasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskDbToDoDb_ToDos_ToDosTaskId_ToDosTaskGroupId",
                        columns: x => new { x.ToDosTaskId, x.ToDosTaskGroupId },
                        principalTable: "ToDos",
                        principalColumns: new[] { "TaskId", "TaskGroupId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaskGroupDbToDoDb",
                columns: table => new
                {
                    TaskGroupsId = table.Column<int>(type: "INTEGER", nullable: false),
                    ToDosTaskId = table.Column<int>(type: "INTEGER", nullable: false),
                    ToDosTaskGroupId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskGroupDbToDoDb", x => new { x.TaskGroupsId, x.ToDosTaskId, x.ToDosTaskGroupId });
                    table.ForeignKey(
                        name: "FK_TaskGroupDbToDoDb_TaskGroups_TaskGroupsId",
                        column: x => x.TaskGroupsId,
                        principalTable: "TaskGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskGroupDbToDoDb_ToDos_ToDosTaskId_ToDosTaskGroupId",
                        columns: x => new { x.ToDosTaskId, x.ToDosTaskGroupId },
                        principalTable: "ToDos",
                        principalColumns: new[] { "TaskId", "TaskGroupId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "TaskGroups",
                columns: new[] { "Id", "TaskGroupName" },
                values: new object[] { 1, "Homework" });

            migrationBuilder.InsertData(
                table: "TaskGroups",
                columns: new[] { "Id", "TaskGroupName" },
                values: new object[] { 2, "To Buy" });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "IsDone", "TaskName" },
                values: new object[] { 1, false, "Docker" });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "IsDone", "TaskName" },
                values: new object[] { 2, true, "ToDo App" });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "IsDone", "TaskName" },
                values: new object[] { 3, false, "Something" });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "IsDone", "TaskName" },
                values: new object[] { 4, false, "Bread" });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "IsDone", "TaskName" },
                values: new object[] { 5, false, "Eggs" });

            migrationBuilder.InsertData(
                table: "ToDos",
                columns: new[] { "TaskGroupId", "TaskId" },
                values: new object[] { 1, 1 });

            migrationBuilder.InsertData(
                table: "ToDos",
                columns: new[] { "TaskGroupId", "TaskId" },
                values: new object[] { 1, 2 });

            migrationBuilder.InsertData(
                table: "ToDos",
                columns: new[] { "TaskGroupId", "TaskId" },
                values: new object[] { 1, 3 });

            migrationBuilder.InsertData(
                table: "ToDos",
                columns: new[] { "TaskGroupId", "TaskId" },
                values: new object[] { 2, 4 });

            migrationBuilder.InsertData(
                table: "ToDos",
                columns: new[] { "TaskGroupId", "TaskId" },
                values: new object[] { 2, 5 });

            migrationBuilder.CreateIndex(
                name: "IX_TaskDbToDoDb_ToDosTaskId_ToDosTaskGroupId",
                table: "TaskDbToDoDb",
                columns: new[] { "ToDosTaskId", "ToDosTaskGroupId" });

            migrationBuilder.CreateIndex(
                name: "IX_TaskGroupDbToDoDb_ToDosTaskId_ToDosTaskGroupId",
                table: "TaskGroupDbToDoDb",
                columns: new[] { "ToDosTaskId", "ToDosTaskGroupId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaskDbToDoDb");

            migrationBuilder.DropTable(
                name: "TaskGroupDbToDoDb");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "TaskGroups");

            migrationBuilder.DropTable(
                name: "ToDos");
        }
    }
}
