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
    public class TenboTagController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TenboTagController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/TenboTag
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TenboTag>>> GetTenboTag()
        {
            return await _context.TenboTag.ToListAsync();
        }

        // GET: api/TenboTag/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TenboTag>> GetTenboTag(Guid id)
        {
            var tenboTag = await _context.TenboTag.FindAsync(id);

            if (tenboTag == null)
            {
                return NotFound();
            }

            return tenboTag;
        }

        // PUT: api/TenboTag/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTenboTag(Guid id, TenboTag tenboTag)
        {
            if (id != tenboTag.Id)
            {
                return BadRequest();
            }

            _context.Entry(tenboTag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TenboTagExists(id))
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

        // POST: api/TenboTag
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TenboTag>> PostTenboTag(TenboTag tenboTag)
        {
            _context.TenboTag.Add(tenboTag);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTenboTag", new { id = tenboTag.Id }, tenboTag);
        }

        // DELETE: api/TenboTag/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TenboTag>> DeleteTenboTag(Guid id)
        {
            var tenboTag = await _context.TenboTag.FindAsync(id);
            if (tenboTag == null)
            {
                return NotFound();
            }

            _context.TenboTag.Remove(tenboTag);
            await _context.SaveChangesAsync();

            return tenboTag;
        }

        private bool TenboTagExists(Guid id)
        {
            return _context.TenboTag.Any(e => e.Id == id);
        }
    }
}
