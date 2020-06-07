using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tenbo.Data;
using Tenbo.Models;

namespace Tenbo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TenboActionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TenboActionController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/TenboAction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TenboAction>>> GetAction()
        {
            return await _context.Action.ToListAsync();
        }

        // GET: api/TenboAction/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TenboAction>> GetTenboAction(Guid id)
        {
            var tenboAction = await _context.Action.FindAsync(id);

            if (tenboAction == null)
            {
                return NotFound();
            }

            return tenboAction;
        }

        // PUT: api/TenboAction/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTenboAction(Guid id, TenboAction tenboAction)
        {
            if (id != tenboAction.Id)
            {
                return BadRequest();
            }

            _context.Entry(tenboAction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TenboActionExists(id))
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

        // POST: api/TenboAction
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TenboAction>> PostTenboAction(TenboAction tenboAction)
        {
            _context.Action.Add(tenboAction);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTenboAction", new { id = tenboAction.Id }, tenboAction);
        }

        // DELETE: api/TenboAction/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TenboAction>> DeleteTenboAction(Guid id)
        {
            var tenboAction = await _context.Action.FindAsync(id);
            if (tenboAction == null)
            {
                return NotFound();
            }

            _context.Action.Remove(tenboAction);
            await _context.SaveChangesAsync();

            return tenboAction;
        }

        private bool TenboActionExists(Guid id)
        {
            return _context.Action.Any(e => e.Id == id);
        }
    }
}
