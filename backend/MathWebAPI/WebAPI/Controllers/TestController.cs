using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet("hello")]
        public async Task<IActionResult> HelloFunction()
        {
            return Ok("Hello Mihnea");
        }
    }
}
