using Microsoft.EntityFrameworkCore;
using Tenbo.Models;

namespace Tenbo.Data
{
    public class TenboContext : DbContext
    {
        public TenboContext (DbContextOptions<TenboContext> options)
            : base(options)
        {
        }

        public DbSet<Goal> Goal { get; set; }

        public DbSet<Objective> Objective { get; set; }

        public DbSet<TenboTag> TenboTag { get; set; }

        public DbSet<Tag> Tag { get; set; }

    }
}
