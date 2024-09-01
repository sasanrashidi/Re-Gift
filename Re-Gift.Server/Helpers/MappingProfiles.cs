using Re_Gift.Server.Dto;
using Re_Gift.Server.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Diagnostics.Metrics;
using AutoMapper;

namespace Re_Gift.Server.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<UserDto, User>().ReverseMap();
            CreateMap<GiftCardDto, GiftCard>().ReverseMap();
            CreateMap<TradeDto, Trade>().ReverseMap();

        }
    }
}
