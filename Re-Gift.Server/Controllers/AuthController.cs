using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Re_Gift.Server.IService;
using Re_Gift.Server.Services;

namespace Re_Gift.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        private readonly IMapper _mapper;

        public AuthController(IMapper mapper, IUserService userService)
        {
            _mapper = mapper;
            _userService = userService;
        }



       

    }
}
