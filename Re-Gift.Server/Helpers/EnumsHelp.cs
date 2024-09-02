namespace Re_Gift.Server.Helpers
{
    public static class EnumsHelp
    {
        public enum CompanyNames
        {
            Nike = 0,
            Adidas = 1,
            Elgiganten = 2,
            BattleNet = 3,
            PSN = 4,
            Steam = 5,
            Ikea = 6

        }

        public static string GetCompanyName(int choice)
        {
            
            if (Enum.IsDefined(typeof(CompanyNames), choice)) // Checkar om choice(Inten) är inom ramen för CompanyNames valen, ifall den är det...
            {
                
                return ((CompanyNames)choice).ToString(); // Ta den ramen, returnera en sträng av det!!!!
            }
            else
            {
                
                return "Invalid company choice";
            }
        }

    }
}
