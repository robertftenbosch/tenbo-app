using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tenbo.Data;
using Tenbo.Models;

namespace Tenbo.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class GoalController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GoalController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Goal
        [HttpGet(Name = nameof(GetGoals) )]
        [ProducesResponseType(typeof(List<Goal>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Goal>>> GetGoals()
        {
            return await _context.Goal.Include(x => x.Objectives).ToListAsync();
        }

        // GET: api/Goal/5
        [HttpGet("{id}", Name = nameof(GetGoal))]
        [ProducesResponseType(typeof(Goal), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Goal>> GetGoal(Guid id)
        {
            var goal = await _context.Goal.FindAsync(id);

            if (goal == null)
            {
                return NotFound();
            }

            return goal;
        }

        // PUT: api/Goal/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpPut("{id}", Name = nameof(PutGoal))]
        public async Task<IActionResult> PutGoal(Guid id, Goal goal)
        {
            if (id != goal.Id)
            {
                return BadRequest();
            }

            _context.Entry(goal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GoalExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost(Name =nameof(PostGoal))]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<Goal>> PostGoal(Goal goal)
        {
            goal.IsActive = true;
            _context.Goal.Add(goal);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGoal", new { id = goal.Id }, goal);
        }

        // DELETE: api/Goal/5
        [HttpDelete("{id}", Name = nameof(DeleteGoal))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Goal>> DeleteGoal(Guid id)
        {
            var goal = await _context.Goal.FindAsync(id);
            if (goal == null)
            {
                return NotFound();
            }

            _context.Goal.Remove(goal);
            await _context.SaveChangesAsync();

            return goal;
        }

        private bool GoalExists(Guid id)
        {
            return _context.Goal.Any(e => e.Id == id);
        }
    }
}
