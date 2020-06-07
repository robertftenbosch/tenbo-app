using Tenbo.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tenbo.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
        public DbSet<Goal> Goal { get; set; }

        public DbSet<Objective> Objective { get; set; }

        public DbSet<TenboTag> TenboTag { get; set; }

        public DbSet<Tag> Tag { get; set; }

        public DbSet<Tenbo.Models.TenboAction> Action { get; set; }
    }
}