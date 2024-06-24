using Microsoft.EntityFrameworkCore;
using RBJChallenge.Model.Class;

namespace RBJChallenge.Data
{
    public class AppDBContext: DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

        public DbSet<Employee> Employees{ get; set; }
    }
}
