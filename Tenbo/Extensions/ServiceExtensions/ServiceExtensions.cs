using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Tenbo.Extensions.ServiceExtensions
{
    public static class ServiceExtensions
    {
        
        public static void ConfigureRepository(this IServiceCollection services)
        {
            // services.AddScoped<IArticleRepository, ArticleRepository>();
        }


        public static void ConfigureSqliteContext(this IServiceCollection services, IConfiguration config)
        {
            // services.AddDbContext<CustomDbContext>(
            //     options =>
            //     {
            //         options.UseSqlite("Data Source=blogging.db");
            //             
            //         options.UseMemoryCache(new MemoryCache(new MemoryCacheOptions()));
            //     }
            // );
        }
    }
}