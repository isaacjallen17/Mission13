using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11Backend.Data;

namespace Mission11Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private BookstoreDbContext _bookstoreContext;

        public BookstoreController(BookstoreDbContext temp)
        {
            _bookstoreContext = temp;
        }
        [HttpGet("check")]
        public IActionResult Get(int numBooks, int pageNum, string order, [FromQuery] List<string>? categories = null)
        {
            IEnumerable<Book> variable;

            var query = _bookstoreContext.Books.AsQueryable();

            if (categories != null && categories.Any())
            {
                query = query.Where(b => categories.Contains(b.Category));
            }

            if (order == "title")
            {
                variable = query.OrderBy(b => b.Title).Skip(pageNum * numBooks).Take(numBooks);
            }

            else if (order == "pagesHighLow")
            {
                variable = query.OrderByDescending(b => b.PageCount).Skip(pageNum * numBooks).Take(numBooks);
            }

            else if (order == "pagesLowHigh")
            {
                variable = query.OrderBy(b => b.PageCount).Skip(pageNum * numBooks).Take(numBooks);
            }

            else if (order == "price")
            {
                variable = query.OrderBy(b => b.Price).Skip(pageNum * numBooks).Take(numBooks);
            }

            else
            {
                variable = query.Skip(pageNum * numBooks).Take(numBooks);

            }

            var listOBooks = variable.ToList();

            var totNumBooks = query.Count();

            return Ok(new
            {
                ListOfBooks = listOBooks,
                TotNumBooks = totNumBooks
            });

        }
        [HttpGet("catgories")]
        public IActionResult GetCatgories()
        {
            var categories = _bookstoreContext.Books.Select(b => b.Category).Distinct().ToList();

            return Ok(categories);
        }
    }
}
