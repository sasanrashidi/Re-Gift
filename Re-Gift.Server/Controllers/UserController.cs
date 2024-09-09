using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Re_Gift.Server.Dto;
using Re_Gift.Server.IService;
using Re_Gift.Server.Models;

namespace Re_Gift.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public UserController(IUserService userService, IMapper mapper)
    {
        _userService = userService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var users = await _userService.GetUsersAsync();

        var mappedUsers = _mapper.Map<List<UserDto>>(users);

        return Ok(mappedUsers);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var user = await _userService.GetUserAsync(id);

        var mappedUser = _mapper.Map<UserDto>(user);

        return Ok(mappedUser);
    }



    [HttpGet("login")]
    public async Task<IActionResult> Login(string email, string password)
    {
        try
        {
            var isSuccess = await _userService.UserLoginAsync(email, password);

            if (isSuccess)
            {
                return Ok(new { Message = "Login successful" });
            }
            else
            {
                return Unauthorized(new { Message = "Invalid email or password" });
            }
        }
        catch (ArgumentException ex)
        {
            return NotFound(new { Message = ex.Message });
        }
        catch (Exception ex)
        {
            // Log the exception here if needed.
            return StatusCode(500, new { Message = "An error occurred during login." });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] UserDto user)
    {
        var mappedUser = _mapper.Map<User>(user);

        var createdUser = await _userService.AddUserAsync(mappedUser);

        return Ok(user);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(UserDto user, int id)
    {
        if (user.Id == 0 || user.Id != id)
        {
            return BadRequest("Id cannot be 0 or does not match the requested id");
        }

        var existingUser = await _userService.GetUserAsync(id);

        if (existingUser == null)
        {
            return NotFound();
        }

        var mappedUser = _mapper.Map<User>(user);

        var updatedUser = await _userService.UpdateUserAsync(mappedUser);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deletedUser = await _userService.GetUserAsync(id);
        await _userService.DeleteUserAsync(deletedUser);

        return Ok();
    }
}