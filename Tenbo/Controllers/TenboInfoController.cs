using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tenbo.Data;
using Tenbo.Models;
using Tenbo.Models.Dto;

namespace Tenbo.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class TenboInfoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TenboInfoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Goal
        [HttpGet(Name = nameof(GetGoalsInfo))]
        [ProducesResponseType(typeof(List<TenboGoalsInfo>), StatusCodes.Status200OK)]
        public async Task<ActionResult<TenboGoalsInfo>> GetGoalsInfo()
        {
            var numberOfGoals = await _context.Goal.CountAsync();
            var numberOfActiveGoals = await _context.Goal.Where(x => x.IsActive).CountAsync();
            var info = new TenboGoalsInfo
            {
                NumberOfGoals = numberOfGoals,
                NumberOfActiveGoals = numberOfActiveGoals
            };
            return Ok(info);
        }
    }
}