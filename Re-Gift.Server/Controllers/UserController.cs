using Microsoft.AspNetCore.Mvc;
using Re_Gift.Server.IService;
using Re_Gift.Server.Models;

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
        var users = await _userService.GetUsersAsync();

        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var user = await _userService.GetUserAsync(id);

        return Ok(user);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] User user)
    {
        var createdUser = await _userService.AddUserAsync(user);

        return Ok(user);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(User user)
    {
        var updatedUser = await _userService.UpdateUserAsync(user);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(User user)
    {
        var deletedUser = await _userService.DeleteUserAsync(user);

        return Ok();
    }
}