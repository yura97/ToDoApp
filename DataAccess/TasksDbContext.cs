using System;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    internal class TasksDbContext : DbContext
    {
        public DbSet<TaskDb> Tasks { get; set; }
        public DbSet<TaskGroupDb> TaskGroups { get; set; }
        public DbSet<ToDoDb> ToDos { get; set; }

        public TasksDbContext()
        {
            
        }

        public TasksDbContext(DbContextOptions<TasksDbContext> options) : base(options)
        {
            // Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ToDoDb>()
                .HasKey(c => new { c.TaskId, c.TaskGroupId });
            
            modelBuilder.Entity<TaskDb>().HasData(
                new TaskDb[] 
                {
                    new TaskDb { Id = 1, TaskName = "Docker", IsDone = false},
                    new TaskDb { Id = 2, TaskName = "ToDo App", IsDone = true},
                    new TaskDb { Id = 3, TaskName = "Something", IsDone = false},
                    new TaskDb { Id = 4, TaskName = "Bread", IsDone = false},
                    new TaskDb { Id = 5, TaskName = "Eggs", IsDone = false},
                });
            
            modelBuilder.Entity<TaskGroupDb>().HasData(
                new TaskGroupDb[] 
                {
                    new TaskGroupDb { Id = 1, TaskGroupName = "Homework"},
                    new TaskGroupDb { Id = 2, TaskGroupName = "To Buy"},
                });
            
            modelBuilder.Entity<ToDoDb>().HasData(
                new ToDoDb[] 
                {
                    new ToDoDb { TaskGroupId = 1, TaskId = 1},
                    new ToDoDb { TaskGroupId = 1, TaskId = 2},
                    new ToDoDb { TaskGroupId = 1, TaskId = 3},
                    new ToDoDb { TaskGroupId = 2, TaskId = 4},
                    new ToDoDb { TaskGroupId = 2, TaskId = 5},
                });
        }
    }
}