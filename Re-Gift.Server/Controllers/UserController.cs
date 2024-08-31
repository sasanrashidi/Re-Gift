using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Re_Gift.Server.IService;

namespace Re_Gift.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var users = await _userService.GetUsers();

        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        // Perform asynchronous operations here
        await Task.Delay(1000); // Example asynchronous operation

        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> Post()
    {
        // Perform asynchronous operations here
        await Task.Delay(1000); // Example asynchronous operation

        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id)
    {
        // Perform asynchronous operations here
        await Task.Delay(1000); // Example asynchronous operation

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        // Perform asynchronous operations here
        await Task.Delay(1000); // Example asynchronous operation

        return Ok();
    }
}