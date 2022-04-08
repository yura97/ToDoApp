using DataAccess.Repositories;
using Domain.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public static class Bootstapper
    {
        public static IServiceCollection AddDataAccess(this IServiceCollection services, string connectionString)
        {
            return services
                .AddAutoMapper(typeof(MapperProfile))
                .AddDbContext<TasksDbContext>(options => options.UseNpgsql(connectionString))
                .AddScoped<ITaskRepository, TaskRepository>()
                .AddScoped<ITaskGroupRepository, TaskGroupRepository>()
                .AddScoped<IToDoRepository, ToDoRepository>();
        }
    }
}