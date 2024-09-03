using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Re_Gift.Server.Dto;
using Re_Gift.Server.IService;
using Re_Gift.Server.Models;

namespace Re_Gift.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TradeController : ControllerBase
    {
        private readonly ITradeService _tradeService;
        private readonly IUserService _userService;
        private readonly IGiftCardService _giftCardService;
        private readonly IMapper _mapper;

        // Constructor to inject services and AutoMapper
        public TradeController(ITradeService tradeService, IGiftCardService giftCardService, IUserService userService, IMapper mapper)
        {
            _tradeService = tradeService;
            _giftCardService = giftCardService;
            _userService = userService;
            _mapper = mapper;
        }

        // GET: api/Trade
        // Retrieves all trades and maps them to TradeDto before returning
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var trades = await _tradeService.GetTradesAsync();  // Fetch all trades from the service
            var mappedTrades = _mapper.Map<List<TradeDto>>(trades);  // Map Trade objects to TradeDto

            return Ok(mappedTrades);  // Return the mapped DTOs as the response
        }

        // GET: api/Trade/{id}
        // Retrieves a specific trade by ID and maps it to TradeDto before returning
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var trade = await _tradeService.GetTradeAsync(id);  // Fetch the trade by ID from the service
            if (trade == null)
            {
                return NotFound();  // Return 404 if the trade is not found
            }
            var mappedTrade = _mapper.Map<TradeDto>(trade);  // Map the Trade object to TradeDto
            return Ok(mappedTrade);  // Return the mapped DTO as the response
        }

        // POST: api/Trade
        // Creates a new trade based on the TradeDto input
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TradeDto tradeDto)
        {
            // Fetch users involved in the trade based on User1Id and User2Id from DTO
            var users = new List<User>
            {
                await _userService.GetUserAsync(tradeDto.User1Id),
                await _userService.GetUserAsync(tradeDto.User2Id)
            };

            // Fetch gift cards involved in the trade based on GF1Id and GF2Id from DTO
            var giftCards = new List<GiftCard>
            {
                await _giftCardService.GetGiftCardAsync(tradeDto.GF1Id),
                await _giftCardService.GetGiftCardAsync(tradeDto.GF2Id)
            };

            // Perform the trade using the fetched users and gift cards
            await _tradeService.TradeDoneAsync(users, giftCards);
            return Ok();  // Return a 200 OK response after the trade is completed
        }

        // PUT: api/Trade/{id}
        // Updates an existing trade based on the TradeDto input
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TradeDto tradeDto)
        {
            var existingTrade = await _tradeService.GetTradeAsync(id);  // Fetch the existing trade by ID
            if (existingTrade == null)
            {
                return NotFound();  // Return 404 if the trade is not found
            }

            // Map updated values from TradeDto to the existing Trade entity
            _mapper.Map(tradeDto, existingTrade);
            var updatedTrade = await _tradeService.UpdateTradeAsync(existingTrade);  // Update the trade in the database

            return Ok(updatedTrade);  // Return the updated trade as the response
        }

        // DELETE: api/Trade/{id}
        // Deletes a specific trade by ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var trade = await _tradeService.GetTradeAsync(id);  // Fetch the trade by ID from the service
            if (trade == null)
            {
                return NotFound();  // Return 404 if the trade is not found
            }

            await _tradeService.DeleteTradeAsync(trade);  // Delete the trade from the database
            return Ok();  // Return a 200 OK response after the trade is deleted
        }
    }
}
